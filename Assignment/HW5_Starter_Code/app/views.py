from flask import render_template, redirect, request
from app import app, models
# from models import *
from .forms import CustomerForm, OrdersForm
# Access the models file to use SQL functions


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    if form.validate_on_submit():
        first_name = form.first_name.data,
        last_name = form.last_name.data,
        company = form.company.data,
        email = form.email.data,
        phone = form.phone.data,
        street_address = form.street_address.data,
        city = form.city.data,
        state = form.state.data,
        country = form.country.data,
        zipcode = form.zipcode.data
        models.insert_customer(company, email, first_name, last_name, phone, street_address, city, state, country, zipcode)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    customers = models.retrieve_customers()
    orders = models.retrieve_orders()
    return render_template('home.html',
                            customers=customers,orders=orders)

@app.route('/create_order<int:value>', methods=['GET', 'POST'])
def create_order(value):
    form = OrdersForm()
    if form.validate_on_submit():
        name_of_part = form.name_of_part.data,
        manufacturer_of_part = form.manufacturer_of_part.data
        customer_id = value
        models.insert_order(name_of_part,manufacturer_of_part,customer_id)
        return redirect('/customers')
    return render_template('order.html', form=form)

# @app.route('/orders')
# def display_order():
#     customers = models.retrieve_customers()
#      orders = models.retrieve_orders()
#      return render_template('order.html',
#                              customers=customers)