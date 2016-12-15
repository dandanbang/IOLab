from app import myapp
from flask import request, render_template

@myapp.route('/')
@myapp.route('/index')
def index():
    # print("This is a log ..comes on your console")
    # return "Hello  - this the page for your form !!"
    return render_template('index.html')


@myapp.route('/submitform', methods=['GET', 'POST'])
def submitform():
    print "new login - ", request.remote_addr
    name = request.args.get('name')
    skype = request.args.get('skype')
    favorite_class = request.args.get('favorite_class')
    favoirte_person = request.args.get('favorite_person')
    fieldnames = ['name', 'skype', 'favorite_class', 'favorite_person']

    with open('emailList.csv', 'w') as inFile:
        write = csv.DictWriter(inFile, fieldname=fieldnames)
        writer.writerow({'name': 'name', 'skype': 'skype', 'favorite_class': 'favorite_class', 'favorite_person': 'favorite_person'})
        writer.writerow({'name': name, 'skype': skype, 'favorite_class': favorite_class, 'favorite_person': favorite_person})

    return "<h1>Forms are submitted!!!</h1>"