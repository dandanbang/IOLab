import sqlite3 as sql

def insert_customer(fname, lname, company, email, phone, street, city, state, country, zipcode):
    # SQL statement to insert data into database goes here
    with sql.connect("app.db") as con:
	    cur = con.cursor()
	    cur.execute("INSERT INTO customer (first_name,last_name,company,email,phone) VALUES (?,?,?,?,?)", (fname, lname, company, email, phone))
	    cur.execute("INSERT INTO address (street_address,city,state,country,zip_code) VALUES (?,?,?,?,?)", (street, city, state, country, zipcode))
	    con.commit()

def insert_order(partname, manufacturer):
    # SQL statement to insert data into orders
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)", (partname, manufacturer))
        con.commit()

def retrieve_customers():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from customer").fetchall()
        print result
    return result

def retrieve_orders():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from orders").fetchall()
        print result
    return result

##You might have additional functions to access the database
