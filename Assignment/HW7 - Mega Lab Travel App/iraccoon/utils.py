from itsdangerous import URLSafeTimedSerializer
from iraccoon import app, mail
from flask_mail import Message
from iraccoon.config import DevelopConfig, ProductionConfig

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(token, salt=app.config['SECURITY_PASSWORD_SALT'], max_age=expiration)
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
    print(to, subject, app.config['MAIL_DEFAULT_SENDER'], app.config['MAIL_USERNAME'])
    mail.send(msg)

def set_config(env):
    if env == "production":
        app.config.from_object(ProductionConfig)
    elif env == "develop":
        app.config.from_object(DevelopConfig)
