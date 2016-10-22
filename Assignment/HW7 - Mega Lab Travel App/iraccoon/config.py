import os
import configparser
basedir = os.path.abspath(os.path.dirname(__file__))

class BaseConfig(object):
    """Base configuration.

    """
    # main config
    SECRET_KEY = None
    SECURITY_PASSWORD_SALT = None
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

class DevelopConfig(BaseConfig):
    """Develop configuration.

    """
    prefix = "develop"
    # config file in ./iraccoon/config/iraccoon.develop.cfg
    config_path = os.path.join(basedir, 'config', 'iraccoon.develop.cfg')
    if os.path.isfile(config_path):
        config = configparser.ConfigParser()

        with open(config_path) as configfile:
            config.readfp(configfile)

        # get debug section
        DEBUG = config.get(prefix + '_debugs', 'DEBUG')
        DEBUG_TB_ENABLED = config.get(prefix + '_debugs', 'DEBUG_TB_ENABLED')


        SECRET_KEY = config.get(prefix + '_keys', 'SECRET_KEY')
        SECURITY_PASSWORD_SALT = config.get(prefix + '_keys', 'SECRET_KEY')

        # get mail section
        MAIL_SERVER = config.get(prefix + '_mail', 'MAIL_SERVER')
        MAIL_PORT = config.getint(prefix + '_mail', 'MAIL_PORT')
        MAIL_USE_TLS = config.getboolean(prefix + '_mail', 'MAIL_USE_TLS')
        MAIL_USE_SSL = config.getboolean(prefix + '_mail', 'MAIL_USE_SSL')
        MAIL_USERNAME = config.get(prefix + '_mail', 'MAIL_USERNAME')
        MAIL_PASSWORD = config.get(prefix + '_mail', 'MAIL_PASSWORD')
        MAIL_DEFAULT_SENDER = config.get(prefix + '_mail', 'MAIL_DEFAULT_SENDER')

        # get database section
        DB_PATH = os.path.join(basedir, config.get(prefix + '_db', 'SQLALCHEMY_DATABASE_URI'))
        SQLALCHEMY_DATABASE_URI = "sqlite:///{}".format(DB_PATH)

        # get stripe keys
        STRIPE_SECRET_KEY = config.get(prefix + '_stripe', 'STRIPE_SECRET_KEY')
        STRIPE_PUBLISHABLE_KEY = config.get(prefix + '_stripe', 'STRIPE_PUBLISHABLE_KEY')

class ProductionConfig(BaseConfig):
    """Production configuration.

    """
    prefix = "production"
    # config file in ./iraccoon/config/iraccoon.production.cfg
    config_path = os.path.join(basedir, 'config', 'iraccoon.production.cfg')
    if os.path.isfile(config_path):
        config = configparser.ConfigParser()

        with open(config_path) as configfile:
            config.readfp(configfile)

        # get debug section
        DEBUG = config.get(prefix + '_debugs', 'DEBUG')
        DEBUG_TB_ENABLED = config.get(prefix + '_debugs', 'DEBUG_TB_ENABLED')


        SECRET_KEY = config.get(prefix + '_keys', 'SECRET_KEY')
        SECURITY_PASSWORD_SALT = config.get(prefix + '_keys', 'SECRET_KEY')

        # get mail section
        MAIL_SERVER = config.get(prefix + '_mail', 'MAIL_SERVER')
        MAIL_PORT = config.getint(prefix + '_mail', 'MAIL_PORT')
        MAIL_USE_TLS = config.getboolean(prefix + '_mail', 'MAIL_USE_TLS')
        MAIL_USE_SSL = config.getboolean(prefix + '_mail', 'MAIL_USE_SSL')
        MAIL_USERNAME = config.get(prefix + '_mail', 'MAIL_USERNAME')
        MAIL_PASSWORD = config.get(prefix + '_mail', 'MAIL_PASSWORD')
        MAIL_DEFAULT_SENDER = config.get(prefix + '_mail', 'MAIL_DEFAULT_SENDER')

        # get database section
        DB_PATH = os.path.join(basedir, config.get(prefix + '_db', 'SQLALCHEMY_DATABASE_URI'))
        SQLALCHEMY_DATABASE_URI = "sqlite:///{}".format(DB_PATH)

        # get stripe keys
        STRIPE_SECRET_KEY = config.get(prefix + '_stripe', 'STRIPE_SECRET_KEY')
        STRIPE_PUBLISHABLE_KEY = config.get(prefix + '_stripe', 'STRIPE_PUBLISHABLE_KEY')
