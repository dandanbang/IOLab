from app import myapp
from flask import request,render_template
import csv

@myapp.route('/')
@myapp.route('/index', methods=['POST'])
def index():
    print "This is a log ..comes on your console"
    return "Hello  - this the page for your form !!"

