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
        # Get customer's data from the form
        fname = form.fname.data
        lname = form.lname.data
        company = form.company.data
        email = form.email.data
        phone = form.phone.data

        # get address data from the form
        street = form.street.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zip_code = form.zip_code.data

        # Send customer data from form to customers db
        # Send address data from form to addresses db
        # Send customer_address relationship data to customer_address db
        customer_id = models.insert_customer(fname, lname, company, email, phone)
        address_id = models.insert_address(street, city, state, country, zip_code)
        models.insert_customer_address(customer_id, address_id)

        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    # Retreive customer and order data from database to display
    customers = models.retrieve_customers()
    orders = models.retrieve_orders()

    return render_template('home.html',
    customers = customers,
    orders = orders)

@app.route('/create_order/<customer_id>', methods=['GET', 'POST'])
def create_order(customer_id):
    # Get data from the form
    # Send data from form to Database
    # return redirect('/customers')

    customer = models.retrieve_customer(customer_id)[0]

    form = OrderForm()
    if form.validate_on_submit():
        # Get orders data from the form
        part_name = form.part_name.data
        manufacturer_name = form.manufacturer_name.data

        # Send order data from form to orders db
        order_id = models.insert_order(part_name, manufacturer_name)
        
        # Send customer_order relationship data to customer_order db
        models.insert_customer_order(customer_id, order_id)

        return redirect('/customers')

    return render_template('order.html',
    form=form,
    fname = customer['first_name'],
    lname = customer['last_name'])
