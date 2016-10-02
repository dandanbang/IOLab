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
		session['username'] = request.form.get('username')
		session['email'] = request.form.get('email')
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

		surveyResponse['favorite color'] = request.form.get('color')
		surveyResponse['favorite food'] = request.form.get('food')
		surveyResponse['favorite vacation location'] = request.form.get('vacation')
		surveyResponse['org skills before 202'] = request.form.get('orgBefore')
		surveyResponse['org skills after 202'] = request.form.get('orgAfter')

		return render_template('results.html', name=username, email=email, surveyResponse=surveyResponse)
	else:
		return render_template('login.html')

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404
