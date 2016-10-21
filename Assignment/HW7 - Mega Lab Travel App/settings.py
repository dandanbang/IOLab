import os

PORT = 8000
HOST = "0.0.0.0"
APP_ENV = "develop"
SECRET_KEY = "my_precious"
SECURITY_PASSWORD_SALT = "DADA"

DB_PATH = os.path.join(os.path.dirname(__file__), 'dev.iraccoon.db')
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(DB_PATH)
