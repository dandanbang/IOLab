from app import myapp
from flask import request,render_template
import csv 

@myapp.route('/')
@myapp.route('/index', methods = ['POST'])
def index():
    # print("This is a log ..comes on your console")
    # return("Hello  - this the page for your form !!")
    return render_template('index.html')

@myapp.route('/submitform', methods=['GET', 'POST'])
def submitform():
    print "new login - ", request.remote_addr
    name = request.argd.get('name')
    ....
    fieldnames = ['name', 'skype', 'favorite_class', 'favorite_person']

    with open('emaillist.csv', 'w') as inFile:
        writer = csv.DictWriter(inFile, fieldnames = fieldnames)
        writer.writerow({'name' : 'name', ....})
        writer.writerow({'name' : name, ....})
    return "<h1>Form are submitted!!!</h1>"
