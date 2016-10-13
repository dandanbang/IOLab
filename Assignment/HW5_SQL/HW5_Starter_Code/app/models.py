import sqlite3 as sql

def insert_customer_address(company,email,fname,lname,phone,street,city,state,country,zipc):
	with sql.connect("app.db") as con:
		cur = con.cursor()
		cur.execute("PRAGMA foreign_keys = ON")
		cur.execute("INSERT INTO customers (company,email,fname,lname,phone) VALUES (?,?,?,?,?)", (company,email,fname,lname,phone))
		cust_id = cur.lastrowid
		cur.execute("INSERT INTO address (customer_id,street,city,state,country,zipc) VALUES (?,?,?,?,?,?)", (cust_id,street,city,state,country,zipc))
		con.commit()


def retrieve_customers():
	with sql.connect("app.db") as con:
		con.row_factory = sql.Row
		cur = con.cursor()
		cur.execute("PRAGMA foreign_keys = ON")
		result = cur.execute("select * from customers").fetchall()
		# print (result)
	return result

def insert_order(n_o_p,m_o_p,value):
	with sql.connect("app.db") as con:
		cur = con.cursor()
		cur.execute("PRAGMA foreign_keys = ON")
		cur.execute("INSERT INTO orders (n_o_p,m_o_p) VALUES (?,?)", (n_o_p,m_o_p))
		ord_id = cur.lastrowid
		cur.execute("INSERT INTO order_customer (order_id,customer_id) VALUES (?,?)", (ord_id,value))
		con.commit()

def retrieve_orders():
	with sql.connect("app.db") as con:
		con.row_factory = sql.Row
		cur = con.cursor()
		cur.execute("PRAGMA foreign_keys = ON")
		result = cur.execute("select * from orders").fetchall()
		# print (result)
	return result

    # SQL statement to query database goes here


##You might have additional functions to access the database
