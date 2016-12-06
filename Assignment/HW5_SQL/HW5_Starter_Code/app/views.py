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
        customer_data = [form.first_name.data, form.last_name.data, form.company.data, form.email.data, form.phone.data]
        address_data = [form.street_address.data, form.city.data, form.state.data, form.country.data, form.zipcode.data]
        result = insert_data(customer_data, address_data)
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
    customer = retrieve_customers(value)
    if form.validate_on_submit():
        order_data = [value, form.name_of_part.data, form.manufacturer_of_part.data]
        result = insert_order(order_data)
        return redirect('/customers')
    return render_template('order.html', form=form, customer=customer)
