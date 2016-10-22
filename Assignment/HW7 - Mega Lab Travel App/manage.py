import datetime
from flask_script import Server, Manager
from flask_migrate import Migrate, MigrateCommand
import os

from iraccoon import app, db
from iraccoon.utils import set_config

app.config.from_object('settings')

if app.config['APP_ENV'] in ['production', 'develop']:
    set_config(app.config['APP_ENV'])
else:
    print("No APP Environment found or value error, please check settings.py")
    exit(2)

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server(host=app.config['HOST'], port=app.config['PORT']))

@manager.command
def create_db():
    db.create_all()

@manager.command
def drop_db():
    db.drop_all()

if __name__ == '__main__':
    manager.run()
