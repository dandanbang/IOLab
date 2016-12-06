import sqlite3 as sql

def insert_customer(company, email, first_name, last_name, phone, street_address, city, state, country, zipcode):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        print(company)
        cur.execute("INSERT INTO customers (company, email, first_name, last_name, phone) VALUES (?,?,?,?,?)",(company[0], email[0], first_name[0], last_name[0], phone[0]))
        customer_id = cur.lastrowid
        cur.execute("INSERT INTO addresses (customer_id, street_address, city, state, country, zipcode) VALUES (?,?,?,?,?,?)",(customer_id, street_address[0], city[0], state[0], country[0], zipcode[0]))
        con.commit()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
    	con.row_factory = sql.Row 
    	cur = con.cursor()
    	result = cur.execute("SELECT * FROM customers").fetchall()
    return result

def insert_order(customer_id, name_of_part, manufacturer_of_part):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)", (name_of_part[0], manufacturer_of_part))
        order_id = cur.lastrowid
        cur.execute("INSERT INTO customer_orders (customer_id, order_id) VALUES (?,?)", (customer_id[0], order_id))
        id = cur.lastrowid # is this right? or is there another way to generate/assign an
        con.commit()

def retrieve_orders():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("SELECT * FROM orders").fetchall()
    return result
            