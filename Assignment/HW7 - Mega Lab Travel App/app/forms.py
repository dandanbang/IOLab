from flask.ext.wtf import Form
from wtforms import StringField, IntegerField, SelectField, PasswordField
# from flask_wtf.html5 import EmailField
from wtforms.validators import DataRequired, EqualTo

class TripsForm(Form):
    trip_name = StringField('trip_name', validators=[DataRequired()])
    destination = StringField('destination', validators=[DataRequired()])
    friends = SelectField('friends', choices=[], coerce=int, validators=[DataRequired()])


class LoginForm(Form):
    username = StringField('username', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])


class RegisterForm(Form):
    name = StringField('name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    confirm = PasswordField('Confirm password', validators=[DataRequired(), EqualTo('password', message='Passwords not match.')])
