import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        
        cur = con.cursor()
        # Customer data
        cur.execute("INSERT INTO customers (first_name, last_name, company, email, phone) values (?, ?, ?, ?, ?)", (first_name, last_name, company, email, phone))
        #  Address data
        cur.execute("INSERT INTO address (street_address, city, state, country, zip_code) values (?, ?, ?, ?, ?)", (street_address, city, state, country, zip_code, ))
        con.commit()
        # con.close()

def insert_orders(name_of_part, manufacturer_of_part, customer_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part, customer_id) values (?, ?, ?)", (name_of_part, manufacturer_of_part, customer_id))
        con.commit()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row # Convert rows into a dictionary format
        cur = con.cursor()
        result = cur.execute("select * from customers").fetchall()
    return result 

def retrieve_orders():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row # Convert rows into a dictionary format
        cur = con.cursor()
        result = cur.execute("select a.name_of_part, a.manufacturer_of_part, b.email from orders a join customers b on a.customer_id = b.customer_id").fetchall()
    return result 

##You might have additional functions to access the database
