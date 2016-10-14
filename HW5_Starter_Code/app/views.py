from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm
from .models import *

# Access the models file to use SQL functions


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    if form.validate_on_submit():
        # Get data from the form
        # Send data from form to Database
        company = form.company.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        phone = form.phone.data
        insert_customer(company, email, first_name, last_name, phone)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    # Retreive data from database to display
    customers = retrieve_customers()
    orders = retrieve_orders()
    return render_template('home.html',
                            customers=customers, orders=orders)

@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
    form = OrderForm()
    if form.validate_on_submit():
        # Get data from the form
        # Send data from form to Database
        # return redirect('/customers')
        name_of_part = form.name_of_part.data
        manufacturer_of_part = form.manufacturer_of_part.data
        insert_orders(name_of_part, manufacturer_of_part)
        return redirect('/customers')
    return render_template('order.html', form=form)
