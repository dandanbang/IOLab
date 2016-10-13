from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm
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
        fname = form.fname.data
        lname = form.lname.data
        company = form.company.data
        email = form.email.data
        phone = form.phone.data
        street = form.street.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zipcode = form.zipcode.data
        models.insert_customer(fname,lname,company,email,phone,street, city, state, country, zipcode)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    # Retreive data from database to display
    customers = models.retrieve_customers()
    print customers
    return render_template('home.html',
                            customers=customers)

@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
        #Get data from the form
        #Send data from form to Database
    orderForm = OrderForm()
    if orderForm.validate_on_submit():
        partname = orderForm.partname.data
        manufacturer = orderForm.manufacturer.data
        models.insert_order(partname,manufacturer)
        return redirect('/customers')
    return render_template('order.html', form=orderForm)

@app.route('/orders')
def display_order():
    orders = models.retrieve_orders()
    print orders
    return render_template('home.html',
                            orders=orders)


