from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    form = CustomerForm()
    #Capture form data and send to database
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    #Fetch customer data from database
    return render_template('home.html',
                            customers=customers)
