import os
import datetime
from flask_script import Server, Manager
from flask_migrate import Migrate, MigrateCommand

from iraccoon import app, db
from iraccoon.models import Users, Trips, UsersHasTrips

# read confi

app.config.from_object('settings')

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server(host=app.config['HOST'], port=app.config['PORT']))


# @manager.command
# def set_env(env):
#     if env not in ["production", "develop"]:
#         print("Wrong environment, you should provide either production or develop.")
#     else:
#         app.config['APP_ENV'] = env

@manager.command
def create_db():
    db.create_all()

@manager.command
def drop_db():
    db.drop_all()

if __name__ == '__main__':
    manager.run()
