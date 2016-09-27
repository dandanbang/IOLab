from app import myapp
from flask import request,render_template
import csv
import xlsxwriter

@myapp.route('/')
@myapp.route('/index')
def index():
    return render_template('index.html')


@myapp.route('/receive',  methods=['POST'])
def receive():
    write_csv()
    write_excel()
    return '''
    <script language="javascript" type="text/javascript">
    setTimeout("javascript:location.href='index'", 2000);
    </script>
        <h1 style="text-align: center">Congrats, we have get your information!<h1>
    '''
# write user post data to csv file
def write_csv():
    with open('app/user_info.csv', 'a') as fp:
        a = csv.writer(fp, delimiter=',')
        a.writerow([request.form['name'], request.form['email'], request.form['address']])

def write_excel():
    workbook = xlsxwriter.Workbook('app/user_info.xlsx')
    worksheet = workbook.add_worksheet()
    row = 0
    col = 0
    worksheet.write_string(row, col, request.form['name'])
    worksheet.write_string(row, col+1, request.form['email'])
    worksheet.write_string(row, col+2, request.form['address'])
