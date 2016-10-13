import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO customers (first_name, last_name, company, email, phone) VALUES (?, ?, ?, ?, ?)', (first_name, last_name, company, email, phone))
        customer_id = cur.execute('SELECT last_insert_rowid()').fetchall()[0][0]
        cur.execute('INSERT INTO address (street_address, city, state, country, zip_code, customer_id) VALUES (?, ?, ?, ?, ?, ?)', (street_address, city, state, country, zip_code, customer_id))
        con.commit()

def insert_order(customer_id, name_of_part, manufacturer_of_part):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?, ?)', (name_of_part, manufacturer_of_part))
        order_id = cur.execute('SELECT last_insert_rowid()').fetchall()[0][0]
        cur.execute('INSERT INTO customers_orders (customer_id, order_id) VALUES (?, ?)', (customer_id, order_id))
        con.commit()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from customers").fetchall()
        result2 = cur.execute("select * from address").fetchall()
    return result, result2

def retrieve_orders():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from orders").fetchall()
    return result
