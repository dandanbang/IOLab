from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm
# Access the models file to use SQL functions


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    if form.validate_on_submit():
        company = form.company.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        phone_number = form.phone_number.data
        street_address = form.street_address.data
        city = form.phone_number.data
        state = form.state.data
        country = form.country.data
        zip_code = form.zip_code.data
        models.insert_data(company,email,first_name,last_name,phone_number,street_address,city,state,country,zip_code)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    customers = models.retrieve_customers()
    orders = models.retrieve_orders()
    
    return render_template('home.html',
                            customers=customers, orders =orders)

@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
    form = OrderForm()
    if form.validate_on_submit():
        # Get data from the form
        # Send data from form to Database
        name_of_part = form.name_of_part.data
        manufacturer_of_part = form.manufacturer_of_part.data
        models.insert_order(name_of_part,manufacturer_of_part,value)

        return redirect('/customers')
    return render_template('orders.html', form=form)
