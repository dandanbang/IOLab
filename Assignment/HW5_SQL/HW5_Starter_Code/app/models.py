import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code):
	# SQL statement to insert into database goes here
	with sql.connect("app.db") as con:
		cur = con.cursor()
		cur.execute("INSERT INTO customer (first_name, last_name, company, email, phone) VALUES (?,?,?,?,?)", (first_name, last_name, company, email, phone))
		con.commit()
		new_cur = con.cursor()
		new_cur.execute("INSERT INTO address (street_address, city, state, country, zip_code) VALUES (?,?,?,?,?)", (street_address, city, state, country, zip_code))
		con.commit()

def insert_orders( customer_id,name_of_part, manufacturer_of_part):
	# SQL statement to insert into database 
	with sql.connect("app.db") as con:
		cur = con.cursor()
		cur.execute("INSERT INTO orders ( name_of_part, manufacturer_of_part) VALUES (?,?)", (name_of_part, manufacturer_of_part))
		order_id = cur.lastrowid
		
		cur.execute("INSERT INTO customer_order (customer_id, order_id) VALUES (?,?)", (customer_id, order_id))
		
		con.commit()

def insert_customer_orders(customer_id):
	# get last row
	with sql.connect("app.db") as con:
		cur = con.cursor()

		order_id = cur.lastrowid
		cur.execute("INSERT INTO customer_order (customer_id, order_id) VALUES (?,?)", (customer_id, order_id))
		
		con.commit()

def retrieve_customers():
	# SQL statement to query database goes here
	with sql.connect("app.db") as con:
		con.row_factory = sql.Row
		cur = con.cursor()
		result = cur.execute("select * from customer").fetchall()
		print(result)
	return result

def retrieve_orders():
	# SQL statement to query database goes here
	with sql.connect("app.db") as con:
		cur = con.cursor()
		result = cur.execute("select * from orders").fetchall()
		print(result)
	return result

##You might have additional functions to access the database
