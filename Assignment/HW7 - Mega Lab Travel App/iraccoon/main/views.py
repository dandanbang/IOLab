from flask import render_template
from flask import Blueprint
from flask_login import current_user
from flask_login import login_required

main_blueprint = Blueprint('main', __name__,)

@main_blueprint.route('/')
def home():
    return render_template('main/home.html', current_user=current_user)
