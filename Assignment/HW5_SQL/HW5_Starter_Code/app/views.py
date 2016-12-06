from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm, AddressForm
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
        first_name = form.first_name.data
        last_name = form.last_name.data
        company = form.company.data
        email = form.email.data
        phone = form.phone.data
        customer_id = insert_customer(first_name, last_name, company, email, phone)

        # Customer Address Data
        street = form.street.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zip_code = form.zip_code.data
        insert_address(street, city, state, country, zip_code, customer_id)

        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    # Retreive data from database to display
    customers = retrieve_customers(None)
    orders = retrieve_orders(None)
    addresses = retrieve_addresses(None)
    return render_template('home.html',
                            customers=customers, orders=orders, addresses=addresses)

@app.route('/create_order/<customer_id>', methods=['GET', 'POST'])
def create_order(customer_id):
    form = OrderForm()
    if form.validate_on_submit():
        # Get data from the form
        # Send data from form to Database
        name_of_part = form.name_of_part.data
        manufacturer_of_part = form.manufacturer_of_part.data
        insert_order(name_of_part, manufacturer_of_part, customer_id)
        return redirect('/customers')
    return render_template('order.html', form=form)

@app.route('/add_address/<customer_id>', methods=['GET', 'POST'])
def add_address(customer_id):
    form = AddressForm()
    if form.validate_on_submit():
        # Get data from the form
        # Send data from form to Database
        street = form.street.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zip_code = form.zip_code.data
        insert_address(street, city, state, country, zip_code, customer_id)

        return redirect('/customers')
    return render_template('address.html', form=form)

@app.route('/addresses/<customer_id>') 
def display_addresses(customer_id):
    # Retreive data from database to display
    addresses = retrieve_addresses(customer_id)
    customer = retrieve_customers(customer_id)
    return render_template('home_addresses.html',
                            addresses=addresses, customers=customer)

@app.route('/orders/<customer_id>') 
def display_orders(customer_id):
    # Retreive data from database to display
    orders = retrieve_orders(customer_id)
    customer = retrieve_customers(customer_id)
    return render_template('home_orders.html',
                            orders=orders, customers=customer)

@app.route('/customers/<order_id>') 
def display_order_customers(order_id):
    # print("display_order_customers")
    # Retreive data from database to display
    # orders = retrieve_orders(customer_id)
    print(order_id)
    customer = retrieve_order_customers(order_id)
    return render_template('home_order_customers.html',
                            order_id=order_id, customers=customer)

@app.route('/customers_order/<order_id>')
def assign_other_customer(order_id):
    # print("asign_other_customer")
    # Retreive data from database to display
    customers = retrieve_customers(None)
    print(customers)
    return render_template('home_customers.html',
                            order_id=order_id, customers=customers)

@app.route('/customers/<order_id>/<customer_id>')
def assign_to_order(order_id, customer_id):
    # Retreive data from database to display
    insert_customer_order(order_id, customer_id)
    # return redirect('/customers')
    return redirect('/customers')