import sqlite3 as sql

def insert_customer(first_name,last_name,company,email,phone,street_address,city,state,country,zip_code):
	# SQL statement to insert into database goes here
	with sql.connect('app.db') as con:
		cur = con.cursor()
		cur.execute('PRAGMA foreign_keys = ON')
		cur.execute('INSERT INTO customers (first_name,last_name,company,email,phone) VALUES (?,?,?,?,?)',(first_name,last_name,company,email,phone))
		cur.execute('INSERT INTO addresses (street_address,city,state,country,zip_code) VALUES (?,?,?,?,?)',(street_address,city,state,country,zip_code))
		con.commit()

def retrieve_customers():
	# SQL statement to query database goes here
	with sql.connect('app.db') as con:
		con.row_factory = sql.Row
		cur = con.cursor()
		cur.execute('PRAGMA foreign_keys = ON')
		result = cur.execute('SELECT * FROM customers').fetchall()
	return result

def insert_order(part_name,manufacturer_name,customer_id):
	# SQL statement to insert into database goes here
	with sql.connect('app.db') as con:
		cur = con.cursor()
		cur.execute('PRAGMA foreign_keys = ON')
		cur.execute('INSERT INTO orders (part_name,manufacturer_name) VALUES (?,?)',(part_name,manufacturer_name))
		order_id = cur.lastrowid
		con.commit()
		insert_customer_order_junct(customer_id,order_id)

def insert_customer_order_junct(customer_id,order_id):
	with sql.connect('app.db') as con:
		cur = con.cursor()
		cur.execute('PRAGMA foreign_keys = ON')
		cur.execute('INSERT INTO customer_order_junct (customer_id,order_id) VALUES (?,?)',(customer_id,order_id))
		con.commit()

def retrieve_orders():
	# SQL statement to query database goes here
	with sql.connect('app.db') as con:
		con.row_factory = sql.Row
		cur = con.cursor()
		cur.execute('PRAGMA foreign_keys = ON')
		result = cur.execute('SELECT o.*, j.customer_id FROM orders o LEFT JOIN customer_order_junct j USING(order_id)').fetchall()
	return result