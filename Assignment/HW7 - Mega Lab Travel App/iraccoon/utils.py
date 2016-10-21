from itsdangerous import URLSafeTimedSerializer

from iraccoon import app, mail
from flask_mail import Message
from iraccoon.config import BaseConfig, EnvConfig

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    print(to, subject, app.config['MAIL_DEFAULT_SENDER'])
    mail.send(msg)

def set_config():
    app.config.from_object(EnvConfig)
    # print(app.config['SQLALCHEMY_DATABASE_URI'])
    # app.config.from_object(EnvConfig)
