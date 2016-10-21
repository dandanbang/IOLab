import datetime
from iraccoon import db, bcrypt

class Users(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    registered_date = db.Column(db.DateTime, nullable=False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    password_reset_token = db.Column(db.String, nullable=True)

    def __init__(self, first_name, last_name, email, password, confirmed, password_reset_token=None):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.registered_date = datetime.datetime.now()
        self.confirmed = confirmed
        self.password_reset_token = password_reset_token

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_id

    def __repr__(self):
        return '<email {}'.format(self.email)


class Trips(db.Model):
    __tablename__ = "trips"

    trip_id = db.Column(db.Integer, primary_key=True)
    trip_name = db.Column(db.String, nullable=False)
    trip_destination = db.Column(db.String, nullable=False)
    trip_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, trip_name, trip_destination, trip_date):
        self.trip_name = trip_name
        self.trip_destination = trip_destination
        self.trip_date = trip_date

class UsersHasTrips(db.Model):
    __tablename__ = "user_has_trips"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.trip_id'), nullable=False)

    def __init__(self, user_id, trip_id):
        self.user_id = user_id
        self.trip_id = trip_id
