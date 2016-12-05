from app import myapp
from flask import request, render_template, session, redirect, url_for, escape, jsonify
from flask_mail import Mail, Message
import os

myapp.secret_key = os.urandom(24)

# Setup email.
myapp.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = 'shuting_liang@berkeley.edu',
    MAIL_PASSWORD = '17011701Lst!',
))

mail = Mail(myapp)

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
	if request.method == 'POST':
		session['username'] = request.form.get("username")
		session['email'] = request.form.get("email")
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
		username = escape(session['username']) # a global variable
		email = escape(session['email'])
		surveyResponse = {}
		surveyResponse['background'] = request.form.get('background')
		surveyResponse['language'] = request.form.get('language')
		surveyResponse['course'] = request.form.get('course')
		surveyResponse['fe-before'] = request.form.get('feBefore')
		surveyResponse['fe-after'] = request.form.get('feAfter')
		session['email_content'] = render_template('results.html', name=username, email=email, surveyResponse=surveyResponse)

		return session['email_content']
	else:
		return render_template('login.html')

@myapp.route('/send_email', methods=['GET', 'POST'])
def sendEmail():
	# check if session['email_content'] still exists before attempting to send.

	if (request.form.get('destination_email')):
		recipient_list = []
		recipient_list.append(request.form.get('destination_email'))

		if (session.get('email_content')):
			email_content = session['email_content']
		else:
			email_content = "Oops, session timed out!"

		msg = Message(body=email_content, recipients=recipient_list, subject="Your survey results")

		mail.send(msg)

		ResultMsg = "Your email has been sent to " + request.form.get("destination_email")
	else:
		ResultMsg = "Failed to send email!"

	return jsonify(statusMsg=ResultMsg)

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404