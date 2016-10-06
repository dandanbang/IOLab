from app import myapp
# below are the libraries needed for this
from flask import request, render_template, session, redirect, url_for, escape
import os

myapp.secret_key = os.urandom(24)

@myapp.route('/')
@myapp.route('/index')
# index associated with the below logic 
def index():
	username = ''
	# if there is a user in session, exexcute the logic 
	if 'username' in session:
		username = escape(session['username'])
		return render_template('survey.html', name=username)
	else:
		# you see the else if you go to the index html right now 
		return render_template('login.html')

@myapp.route('/login', methods=['GET', 'POST'])
def login():
	if request.method=='POST':
		#grab data from the form
		#created a session object (step 3)
		session['username'] = request.form.get("username")
		session['email'] = request.form.get("email")
		# from here, goes through the index logic one more time 
		return redirect(url_for('index'))


@myapp.route('/logout')
def logout():
	session.pop('username', None)
	session.pop('email', None)
	return redirect(url_for('index'))

@myapp.route('/submit-survey', methods=['GET', 'POST'])
def submitSurvey():
	username = ''
	email = ''
	if 'username' in session:
		username = escape(session['username'])
		email = escape(session['email'])
		surveyResponse = {}

		surveyResponse['bones'] = request.form.get('bones')
		surveyResponse['walk'] = request.form.get('walk')
		surveyResponse['kanye'] = request.form.get('kanye')
		surveyResponse['vacation'] = request.form.get('vacation')
		surveyResponse['cook-before'] = request.form.get('cookBefore')
		surveyResponse['cook-after'] = request.form.get('cookAfter')
		return render_template('results.html', name=username, email=email, surveyResponse=surveyResponse)
	else:
		return render_template('login.html')

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404