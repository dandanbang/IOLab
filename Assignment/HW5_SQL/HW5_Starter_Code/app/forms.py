from flask.ext.wtf import Form
from wtforms import StringField, IntegerField
from flask_wtf.html5 import EmailField
from wtforms.validators import DataRequired

class CustomerForm(Form):
	fname = StringField('fname', validators=[DataRequired()])
	lname = StringField('lname', validators=[DataRequired()])
	company = StringField('company', validators=[DataRequired()])
	email = EmailField('email', validators=[DataRequired()])
	phone = IntegerField('phone', validators=[DataRequired()])
	street = StringField('street', validators=[DataRequired()])
	city = StringField('city', validators=[DataRequired()])
	state = StringField('state', validators=[DataRequired()])
	country = StringField('country', validators=[DataRequired()])
	zipc = IntegerField('zip', validators=[DataRequired()])

    # Add additional Address fields here

class OrderForm(Form):
	n_o_p = StringField('n_o_p', validators=[DataRequired()])
	m_o_p = StringField('m_o_p', validators=[DataRequired()])
    

