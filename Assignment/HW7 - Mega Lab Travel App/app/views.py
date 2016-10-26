from flask import request, render_template, session, redirect, url_for, escape, flash
from app import app, models, db
from .forms import TripsForm, RegisterForm
from .models import *
# import json

@app.route('/')
@app.route('/index')
def index():
    username = ''
    if 'username' in session:
        username = escape(session['username'])
        return redirect(url_for('display_trips'))
    else:
        return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # validate if user exists otherwise say access denied...
        travellers = login_user(request.form.get("username"), request.form.get("password"))  #get username and password from post
        # return json.dumps([dict(ix) for ix in travellers])
        if not travellers:
             return render_template('not_authorized.html')
        else:
            for traveller in travellers:
                session['name'] = traveller['traveller_name']
                session['id'] = traveller['traveller_id']
                session['username'] = traveller['username']
                session['password'] = traveller['password']
    return redirect(url_for('index'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        user = form.name.data
        username = form.username.data
        password = form.password.data
        travellers = login_user(request.form.get("username"), request.form.get("password"))
        if travellers:
            flash("Username has already taken.", 'danger')
            return render_template('signup.html', form=form)
        else:
            user_id = insert_user(user, username, password)
            session['name'] = user
            session['username'] = username
            session['password'] = password
            session['id'] = user_id
            return redirect(url_for('index'))
    return render_template('signup.html', form=form)


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('password', None)
    session.pop('name', None)
    session.pop('id', None)
    return redirect(url_for('index'))

@app.route('/create_trip', methods=['GET', 'POST'])
def create_trip():
    if 'username' in session:
        form = TripsForm(request.form)
        friends = get_friends(session['id'])
        form.friends.choices = [(friend['traveller_id'], friend['traveller_name']) for friend in friends]
        if form.validate_on_submit():
            trip_name = form.trip_name.data
            destination = form.destination.data
            fellow_traveller = form.friends.data
            # return "done"
            insert_trip(trip_name, destination, session['id'], fellow_traveller)
            return redirect('/trips')
        return render_template('create_trip.html', form=form)
    return render_template('login.html')
            # friends = get_friends(session['id'])


@app.route('/trips')
def display_trips():
    print("hello")
    print ("my session id: ", session['id'])
    trips = retrieve_trips(session['id'])
    return render_template('trips.html',
                            trips=trips)

@app.route('/delete_trip', methods=['GET', 'POST'])
def delete():
    if 'username' in session:
        trip_name = request.form['trip_name']
        destination = request.form['destination']
        delete_trip(trip_name, destination)
        return "ok"
    else:
        return "error"
