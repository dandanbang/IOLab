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
		email = escape(session['email'])
		if username == "" or email == "":
		    return '''
		    <script language="javascript" type="text/javascript">
		    setTimeout("javascript:location.href='login'", 2000);
		    </script>
		        <h1 style="text-align: center">You must enter both your Name and Email </h1>
		    '''
		else:
			return render_template('survey.html', name=username)
	else:
		return render_template('login.html')

@myapp.route('/login', methods=['Get','POST'])
def login():
	if request.method=='POST':
		session['username']=request.form.get("username")
		session['email']=request.form.get("email")
		return redirect(url_for('index'))
	else:
		return render_template('login.html')



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

		surveyResponse['color'] = request.form.get('color')
		surveyResponse['food'] = request.form.get('food')
		surveyResponse['fe-after'] = request.form.get('feAfter')
		surveyResponse['vacation'] = request.form.get('vacation')
		surveyResponse['fe-before'] = request.form.get('feBefore')
		surveyResponse['fe-after'] = request.form.get('feAfter')

		return render_template('results.html', name=username, email=email, surveyResponse=surveyResponse)
	else:
		return render_template('login.html')

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404
