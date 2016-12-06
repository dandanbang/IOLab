from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm
# Access the models file to use SQL functions


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm(request.form)
    print("Hello!")
    # print(request.method)
    if form.validate_on_submit():
        # Get data from the form
        print(request.method)
        first_name = form.first_name.data
        last_name = form.last_name.data
        company = form.company.data
        email = form.email.data
        phone = form.phone.data
        street_address = form.street_address.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zip_code = form.zip_code.data
        # Send data from form to Database
        models.insert_data(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code)
        return redirect('/customers')
    print(form.errors)
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    # Retreive data from database to display
    customers = models.retrieve_customers()
    orders = models.retrieve_orders()
    print(customers)
    return render_template('home.html',
                            customers=customers, orders=orders)

@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
        # Get data from the form
        # Send data from form to Database
    form = OrderForm()
    if form.validate_on_submit():
        name_of_part = form.name_of_part.data
        manufacturer_of_part = form.manufacturer_of_part.data
        models.insert_orders(name_of_part, manufacturer_of_part, value)
        return redirect('/customers')
    return render_template('orders.html', form=form)
