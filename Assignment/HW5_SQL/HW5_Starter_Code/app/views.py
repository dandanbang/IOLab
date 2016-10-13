from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm , OrderForm
# from models import *
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
        fname = form.fname.data
        lname = form.lname.data
        phone = form.phone.data
        street = form.street.data
        city = form.city.data
        state = form.state.data
        country = form.country.data
        zipc = form.zipc.data
        models.insert_customer_address(company,email,fname,lname,phone,street,city,state,country,zipc)
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    customers = models.retrieve_customers()
    order = models.retrieve_orders()
    # print (customers)
    # Retreive data from database to display
    return render_template('home.html',
                            customers=customers,orders=order)
    return
@app.route('/create_order/<value>', methods=['GET', 'POST'])
def create_order(value):
    form = OrderForm()
    if form.validate_on_submit():
        n_o_p = form.n_o_p.data
        m_o_p = form.m_o_p.data
        models.insert_order(n_o_p,m_o_p,value)
        return redirect('/customers')
    return render_template('order.html', form=form)
