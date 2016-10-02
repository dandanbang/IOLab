from app import myapp
from flask import request,render_template
import csv

@myapp.route('/')
@myapp.route('/index', methods=['post'])
def index():
    return render_template('index.html')

@myapp.route('/submitform', methods=['get', 'post'])
def submission():
    print("new login: ", request.remote_addr)
    name = request.args.get('name')
    skype = request.args.get('skype')
    favorite_class = request.args.get('favorite_class')
    favorite_person = request.args.get('favorite_person')
    fieldnames = ['name','skype','favorite_class','favorite_person']

    with open('emailList.csv', 'w') as inFile:
        writer = csv.DictWriter(inFile, fieldnames = fieldnames)
        writer.writerow({'name': 'name','skype': 'skype',
        'favorite_class':'favorite_class','favorite_person':'favorite_person'})
        writer.writerow({'name': name,'skype': skype,
        'favorite_class':favorite_class,'favorite_person':favorite_person})

    return "<h1> Forms are submitted!! </h1>"
