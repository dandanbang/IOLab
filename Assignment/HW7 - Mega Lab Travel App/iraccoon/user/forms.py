from flask_wtf import Form
from wtforms import TextField, PasswordField, StringField
from wtforms.validators import DataRequired, Email, Length, EqualTo

from iraccoon.models import Users


class LoginForm(Form):
    email = TextField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])


class RegisterForm(Form):
    first_name = StringField('first_name', validators = [DataRequired(), Length(max=100)])
    last_name = StringField('first_name', validators = [DataRequired(), Length(max=100)])
    email = TextField('email', validators=[DataRequired(), Email(message=None), Length(min=6, max=255)])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6, max=255)])
    confirm = PasswordField('Repeat password', validators=[DataRequired(), EqualTo('password', message='Passwords does not match.')])

    def validate(self):
        initial_validation = super(RegisterForm, self).validate()
        if not initial_validation:
            return False
        user = Users.query.filter_by(email=self.email.data).first()
        if user:
            self.email.errors.append("Email already registered")
            return False
        return True


class ForgotForm(Form):
    email = TextField('email', validators=[DataRequired(), Email(message=None), Length(min=6, max=255)])

    def validate(self):
        initial_validation = super(ForgotForm, self).validate()
        if not initial_validation:
            return False
        user = Users.query.filter_by(email=self.email.data).first()
        if not user:
            self.email.errors.append("This email is not registered")
            return False
        return True

class ChangePasswordForm(Form):
    password = PasswordField('password', validators=[DataRequired(), Length(min=6, max=255)])
    confirm = PasswordField('Repeat password', validators=[DataRequired(), EqualTo('password', message='Passwords must match.')])

class AddTripForm(Form):
    trip_name = StringField('trip_name', validators = [DataRequired(), Length(max=100)])
    trip_destination = StringField('trip_destination', validators = [DataRequired(), Length(max=100)])
    # trip_date =
