import datetime

from flask import render_template, Blueprint, url_for, redirect, flash, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from iraccoon.decorators import check_confirmed
from iraccoon.models import Trips, UsersHasTrips, Users
from iraccoon import db
from .forms import AddTripForm


trip_blueprint = Blueprint('trip', __name__,)

@trip_blueprint.route('/trips', methods=['GET', 'POST'])
@login_required
@check_confirmed
def trips():
    trips = []
    relation = UsersHasTrips.query.filter_by(user_id=current_user.user_id).all()
    for element in relation:
        tmp = {}
        # get partner id
        partners = UsersHasTrips.query.filter_by(trip_id=element.trip_id).all()
        for partner in partners:
            if partner.user_id !=element.user_id:
                partner_id = partner.user_id
        # get partner name
        partner_info = Users.query.filter_by(user_id=partner_id).first()
        partner_name = partner_info.first_name + ',' + partner_info.last_name

        # get trip info
        trip_info = Trips.query.filter_by(trip_id=element.trip_id).first()
        trip_name = trip_info.trip_name
        trip_destination = trip_info.trip_destination
        # append to trips
        tmp = {
            'trip_name': trip_name,
            'trip_destination': trip_destination,
            'partner': partner_name
        }
        trips.append(tmp)
    return render_template('trips/all.html', trips=trips)

@trip_blueprint.route('/addtrip', methods=['GET', 'POST'])
@login_required
@check_confirmed
def add_trip():
    form = AddTripForm(request.form)
    form.partner.choices = [(user.user_id, user.first_name + ',' + user.last_name) for user in Users.query.all() if user.user_id != current_user.user_id]
    if form.validate_on_submit():
        trip = Trips(
            trip_name = form.trip_name.data,
            trip_destination = form.trip_destination.data
        )
        db.session.add(trip)
        db.session.commit()
        tripid = Trips.query.order_by(Trips.trip_id.desc()).first().trip_id
        user_has_trips_1 = UsersHasTrips(
            user_id = current_user.user_id,
            trip_id = tripid
        )
        user_has_trips_2 = UsersHasTrips(
            user_id = form.partner.data,
            trip_id = tripid
        )
        db.session.add(user_has_trips_1)
        db.session.add(user_has_trips_2)
        db.session.commit()
        flash('Trip Added.', 'success')
        return redirect(url_for('trip.trips'))
    return render_template('trips/add.html', form=form)

@trip_blueprint.route('/deletetrip', methods=['POST'])
@login_required
@check_confirmed
def deletetrip():
    trip_name = request.form['trip_name']
    trip_destination = request.form['trip_destination']
    trip = Trips.query.filter_by(trip_name=trip_name, trip_destination=trip_destination).first()
    if trip.trip_id:
        Trips.query.filter_by(trip_name=trip_name, trip_destination=trip_destination).delete()
        UsersHasTrips.query.filter_by(trip_id=trip.trip_id).delete()
        db.session.commit()
        response = {
            'status': 200
        }
    else:
        response = {
            'status': 500
        }
    return jsonify(**response)
