from app import myapp
from flask import request,render_template
import csv

"""maps to the index.html file stored in in template folder"""
@myapp.route('/')
def index():
    return render_template('index.html')

"""maps to the form action name in index.html..which determines the url. also needs to specify the methods"""
@myapp.route('/submitform', methods=['GET', 'POST'])
def submitform():
    # accessing the address through request
    print("new login - ", request.remote_addr)
    # here, you are grabbing the data specified by the name elements and store them into variables
    name = request.args.get('name')
    skype = request.args.get('skype')
    favorite_class = request.args.get('favorite_class')
    favorite_person = request.args.get('favorite_person')
    # telling the csv.Dict Writer about the fieldnames coming in
    fieldnames = ['name', 'skype', 'favorite_class', 'favorite_person']

    with open('emailList.csv','w') as inFile:
        writer = csv.DictWriter(inFile, fieldnames=fieldnames)
        # write out the first row, just the string
        writer.writerow({'name': 'name', 'skype': 'skype', 'favorite_class': 'favorite_class', 'favorite_person': 'favorite_person'})
        # write out the variables stored
        writer.writerow({'name': name, 'skype': skype, 'favorite_class': favorite_class, 'favorite_person': favorite_person})
    # returning the response string after we process all these.
    return "<h1>Forms are submitted!!!<h1>"

