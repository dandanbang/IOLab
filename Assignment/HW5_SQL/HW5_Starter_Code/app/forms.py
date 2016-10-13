from flask.ext.wtf import Form
from wtforms import StringField, IntegerField
from flask_wtf.html5 import EmailField
from wtforms import validators

class CustomerForm(Form):
    # Customer info
    fname = StringField('first name',
    [validators.required(), validators.length(max=20)])

    lname = StringField('last name',
    [validators.required(), validators.length(max=20)])

    company = StringField('company',
    [validators.required()])

    email = EmailField('email',
    [validators.required()])

    phone = StringField('phone number',
    [validators.optional(), validators.length(max=50)])

    # Address info
    street = StringField('street address',
    [validators.required()])

    city = StringField('city',
    [validators.optional(), validators.length(max=30)])

    state = StringField('state',
    [validators.required(), validators.length(max=30)])

    country = StringField('country',
    [validators.optional(), validators.length(max=30)])

    zip_code = IntegerField('zip code',
    [validators.required()])


class OrderForm(Form):
    # Add order input form fields here
    part_name = StringField('part name',
    [validators.required(), validators.length(max=100)])

    manufacturer_name = StringField('manufacturer name',
    [validators.required(), validators.length(max=100)])
