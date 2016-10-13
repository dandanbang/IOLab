# squlite3 app.db < schema.sql creates an app.db that contians table

import sqlite3 as sql

def insert_customer(company,email):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
    	cur = con.cursor()
    	# Python recognizes the variables we want to enter as '?'
    	cur.execute("INSERT INTO customers (company,email) VALUES (?,?)", (company,email))
    	con.commit()

# con = sql.connect("app.db")
# blah blah
# con.commit()
# con.close()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
    	con.row_factory = sql.Row 
    	cur = con.cursor()
    	result = cur.execute("select * from customers").fetchall()
    return result
