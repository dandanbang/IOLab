from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerDetailsForm, OrderDetailsForm

@app.route('/customers')
def displayCustomerDetails():
    ordersDetails = models.getOrders()
    customersDetails = models.getCustomers()
    return render_template('home.html', customers=customersDetails, orders=ordersDetails)

@app.route('/createCust', methods=['GET', 'POST'])
def createCust():
    form = CustomerDetailsForm()
    if form.validate_on_submit():
        firstName = form.first_name.data
        lastName = form.last_name.data
        companyName = form.company.data
        emailAddress = form.email.data
        phoneNumber = form.phone.data
        streetAddr = form.street_address.data
        cityName = form.city.data
        stateName = form.state.data
        countryName = form.country.data
        zipCode = form.zip_code.data
        models.insertCustomer(firstName,lastName,emailAddress,companyName,phoneNumber,streetAddr,cityName,stateName,countryName,zipCode)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/createOrder/<value>', methods=['GET', 'POST'])
def createOrder(value):
    form = OrderDetailsForm()
    if form.validate_on_submit():
        manufacturer = form.manufacturer_name.data
        partName = form.part_name.data
        customerId = value
        models.insertOrder(manufacturer,partName,customerId)
        return redirect('/customers')
    return render_template('order.html', form=form)

@app.route('/')
def index():
    return redirect('/createCust')
