from flask.ext.wtf import Form
from flask_wtf.html5 import EmailField
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CustomerDetailsForm(Form):
    #These are the customer details
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = EmailField('email', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    company = StringField('company', validators=[DataRequired()])
    street_address = StringField('street_address', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    city =  StringField('city', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])

class OrderDetailsForm(Form):
    manufacturer_name = StringField('manufacturer_name', validators=[DataRequired()])
    part_name = StringField('part_name', validators=[DataRequired()])
