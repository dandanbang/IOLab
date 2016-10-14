from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrdersForm, AddressForm
from .models import *


@app.route('/')
def index():
    return redirect('/create_customers')

@app.route('/create_customers', methods=['GET', 'POST'])
def create_customers():
    form = CustomerForm()
    if form.validate_on_submit():
        first_name = form.first_name.data
        last_name = form.last_name.data
        company = form.company.data
        email = form.email.data
        phone = form.phone.data
        street_address = form.street_address.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zipcode = form.zipcode.data

        insert_customers(first_name, last_name, company, email, phone, street_address, city, state, country, zipcode)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customers():
    customers = retrieve_customers()
    customers_orders = retrieve_orders()
    addresses = retrieve_addresses()
    # print(customers)
    return render_template('home.html',
                            customers=customers, addresses=addresses, orders=customers_orders)

@app.route('/create_address/<int:customer_id>', methods=['GET', 'POST'])
def create_address(customer_id):
    form = AddressForm()
    if form.validate_on_submit():
        street_address = form.street_address.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zipcode = form.zipcode.data
   
        insert_addresses(customer_id, street_address, city, state, country, zipcode)
        return redirect('/customers')
    return render_template('addresses.html', form=form)


@app.route('/create_orders/<int:customer_id>', methods=['GET', 'POST'])
def create_orders(customer_id):
    form = OrdersForm()
    if form.validate_on_submit():
        name_of_part = form.name_of_part.data
        manufacturer_of_part=form.manufacturer_of_part.data

        insert_orders(customer_id,  name_of_part, manufacturer_of_part)
        return redirect('/customers')
    return render_template('orders.html', form=form)
