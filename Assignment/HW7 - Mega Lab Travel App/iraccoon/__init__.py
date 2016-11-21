import os
from flask import Flask, render_template
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# flask extensions
login_manager = LoginManager()
login_manager.init_app(app)
bcrypt = Bcrypt(app)
mail = Mail(app)
toolbar = DebugToolbarExtension(app)
db = SQLAlchemy(app)

# register blueprints
from iraccoon.main.views import main_blueprint
from iraccoon.user.views import user_blueprint
from iraccoon.trips.views import trip_blueprint
app.register_blueprint(main_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(trip_blueprint)


# flask login
from iraccoon.models import Users
login_manager.login_view = "user.login"
login_manager.login_message_category = "danger"


@login_manager.user_loader
def load_user(user_id):
    return Users.query.filter(Users.user_id == int(user_id)).first()

# error handlers
@app.errorhandler(403)
def forbidden_page(error):
    return render_template("errors/403.html"), 403

@app.errorhandler(404)
def page_not_found(error):
    return render_template("errors/404.html"), 404

@app.errorhandler(500)
def server_error_page(error):
    return render_template("errors/500.html"), 500
