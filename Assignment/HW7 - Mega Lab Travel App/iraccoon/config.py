import os
import configparser

basedir = os.path.abspath(os.path.dirname(__file__))


def _get_bool_env_var(varname, default=None):

    value = os.environ.get(varname, default)

    if value is None:
        return False
    elif isinstance(value, str) and value.lower() == 'false':
        return False
    elif bool(value) is False:
        return False
    else:
        return bool(value)


class Config(object):
    """Base configuration."""

    # main config
    SECRET_KEY = 'my_secret_key'
    SECURITY_PASSWORD_SALT = 'my_password_salt'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False

    # Default SMTP Settings
    MAIL_SERVER = "smtp@smtp.com"
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = None
    MAIL_PASSWORD = None
    MAIL_DEFAULT_SENDER = 'no-reply@iraccoon.com'


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dev.iraccoon.db')
    DEBUG_TB_ENABLED = True


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    DEBUG_TB_ENABLED = False

    SECRET_KEY = None
    SECURITY_PASSWORD_SALT = None

    STRIPE_SECRET_KEY = None
    STRIPE_PUBLISHABLE_KEY = None

    SQLALCHEMY_DATABASE_URI = None

    # production config takes precedence over env variables

    # production config file at ./iraccoon/config/production.cfg
    config_path = os.path.join(basedir, 'config', 'iraccoon.cfg')

    # if config file exists, read it:
    if os.path.isfile(config_path):
        config = configparser.ConfigParser()

        with open(config_path) as configfile:
            config.readfp(configfile)

        SECRET_KEY = config.get('production_keys', 'SECRET_KEY')
        SECURITY_PASSWORD_SALT = config.get('production_keys', 'SECRET_KEY')

        # mail settings
        MAIL_SERVER = config.get('production_mail', 'MAIL_SERVER')
        MAIL_PORT = config.getint('production_mail', 'MAIL_PORT')
        MAIL_USE_TLS = config.getboolean('production_mail', 'MAIL_USE_TLS')
        MAIL_USE_SSL = config.getboolean('production_mail', 'MAIL_USE_SSL')

        # mail authentication and sender
        MAIL_USERNAME = config.get('production_mail', 'MAIL_USERNAME')
        MAIL_PASSWORD = config.get('production_mail', 'MAIL_PASSWORD')
        MAIL_DEFAULT_SENDER = config.get('production_mail', 'MAIL_DEFAULT_SENDER')

        # database URI
        SQLALCHEMY_DATABASE_URI = config.get('production_db', 'SQLALCHEMY_DATABASE_URI')

        # stripe keys
        STRIPE_SECRET_KEY = config.get('production_stripe', 'STRIPE_SECRET_KEY')
        STRIPE_PUBLISHABLE_KEY = config.get('production_stripe', 'STRIPE_PUBLISHABLE_KEY')
