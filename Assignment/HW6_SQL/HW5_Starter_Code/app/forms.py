from flask.ext.wtf import Form
from wtforms import StringField, IntegerField
from flask_wtf.html5 import EmailField
from wtforms.validators import DataRequired

class CustomerForm(Form):
    company = StringField('company', validators=[DataRequired()])
    email = EmailField('email', validators=[DataRequired()])
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    street_address = StringField('street address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])

class OrdersForm(Form):
	name_of_part = StringField('name of part', validators=[DataRequired()])
	manufacturer_of_part = StringField('manufacturer of part', validators=[DataRequired()])
	