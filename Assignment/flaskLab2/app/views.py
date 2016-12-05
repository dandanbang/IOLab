from app import myapp
from flask import request, render_template, session, redirect, url_for, escape
import os

myapp.secret_key = os.urandom(24)

@myapp.route('/')
@myapp.route('/index')
def index():
	username = ''
	if 'username' in session:
		username = escape(session['username'])
		return render_template('survey.html', name=username)
	else:
		return render_template('login.html')

@myapp.route('/login', methods=['GET', 'POST'])
def login():
	if request.method=='POST':
		# 3b.i. set the session’s ‘username’ key to whatever the user entered for their username
		session['username'] = request.form.get("username") 	#creating session object and declaring session 
		session['email'] = request.form.get("email")		#username and email to whatever the user enters
		# 3b.ii. Redirect the user to the ‘index’ route
		return redirect(url_for('index')) #go through '/index' and def index

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
		# 6c.i. Assign the keys ‘color’, ‘food’, and ‘vacation’ for the ‘surveyResponse’ 
		# object to corresponding values from the passed-in data object in a similar fashion
		surveyResponse['animal'] = request.form.get('animal')
		surveyResponse['shop'] = request.form.get('shop')
		surveyResponse['timemachine'] = request.form.get('timemachine')
		surveyResponse['movie'] = request.form.get('movie')
		surveyResponse['fe-before'] = request.form.get('feBefore')
		surveyResponse['fe-after'] = request.form.get('feAfter')
		return render_template('results.html', name=username, email=email, surveyResponse=surveyResponse)
	else:
		return render_template('login.html')

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404