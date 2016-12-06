from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm
# Access the models file to use SQL functions


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    print('creating customer')
    form = CustomerForm()
    if form.validate_on_submit():
        print('submitting')
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

        models.insert_data(first_name, last_name, company, email, phone, 
                           street_address, city, state, country, zip_code)
    # else:
    #     print(form.errors)
        

        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    customers = models.retrieve_customers()
    orders = models.retrieve_orders()
    return render_template('home.html',
                            customers=customers, orders=orders)

@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
    form = OrderForm()
    if form.validate_on_submit():
        name_of_part = form.name_of_part.data
        manufacturer_of_part = form.manufacturer_of_part.data
        customer_id = value
        print('submitting')
        models.insert_order(name_of_part, manufacturer_of_part, customer_id)
        return redirect('/customers')
        # Get data from the form
        # Send data from form to Database
    # return redirect('/customers')

    first_name, last_name = models.customer_name(value)

    return render_template('order.html', form=form, first_name=first_name, last_name=last_name)