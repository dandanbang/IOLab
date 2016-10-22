from flask_wtf import Form
from wtforms import TextField, PasswordField, StringField, SelectField
from wtforms.validators import DataRequired, Length, Optional
from flask_login import current_user
from iraccoon.models import Users

class AddTripForm(Form):
    trip_name = StringField('trip_name', validators = [DataRequired(), Length(max=100)])
    trip_destination = StringField('trip_destination', validators = [DataRequired(), Length(max=100)])
    partner = SelectField('partner', choices=[], coerce=int, validators=[Optional()])
