import sqlite3 as sql

def insertOrder(manufacturer,partName,customerID):
	with sql.connect('app.db') as dbConnection:
		dbCursor = dbConnection.cursor()
		dbCursor.execute('PRAGMA foreign_keys = ON')
		dbCursor.execute('INSERT INTO orders (part_name,manufacturer_name) VALUES (?,?)',(partName,manufacturer))
		orderID = dbCursor.lastrowid
		dbConnection.commit()
		insertCustomerOrderId(customerID,orderID)

def getOrders():
	with sql.connect('app.db') as dbConnection:
		dbConnection.row_factory = sql.Row
		dbCursor = dbConnection.cursor()
		dbCursor.execute('PRAGMA foreign_keys = ON')
		result = dbCursor.execute('SELECT o.*, j.customer_id FROM orders o LEFT JOIN customer_order_junct j USING(order_id)').fetchall()
	return result

def insertCustomer(firstName,lastName,emailAddress,companyName,phoneNumber,streetAddr,cityName,stateName,countryName,zipCode):
	with sql.connect('app.db') as dbConnection:
		dbCursor = dbConnection.cursor()
		dbCursor.execute('PRAGMA foreign_keys = ON')
		dbCursor.execute('INSERT INTO customers (first_name,last_name,company,email,phone) VALUES (?,?,?,?,?)',(firstName,lastName,companyName,emailAddress,phoneNumber))
		dbCursor.execute('INSERT INTO addresses (street_address,city,state,country,zip_code) VALUES (?,?,?,?,?)',(streetAddr,cityName,stateName,countryName,zipCode))
		dbConnection.commit()

def insertCustomerOrderId(customerID,orderID):
	with sql.connect('app.db') as dbConnection:
		dbCursor = dbConnection.cursor()
		dbCursor.execute('PRAGMA foreign_keys = ON')
		dbCursor.execute('INSERT INTO customer_order_junct (customer_id,order_id) VALUES (?,?)',(customerID,orderID))
		dbConnection.commit()

def getCustomers():
	with sql.connect('app.db') as dbConnection:
		dbConnection.row_factory = sql.Row
		dbCursor = dbConnection.cursor()
		dbCursor.execute('PRAGMA foreign_keys = ON')
		result = dbCursor.execute('SELECT * FROM customers').fetchall()
	return result
