import sqlite3 as sql

def insert_customers(first_name, last_name, company, email, phone, street_address, city, state, country, zipcode):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO customers (first_name, last_name, company, email, phone) VALUES (?,?,?,?,?)', (first_name, last_name, company, email, phone))
        con.commit()
        customer_id = cur.lastrowid
        cur.execute('INSERT INTO addresses(street_address, city, state, country, zipcode, customer_id) VALUES (?,?,?,?,?,?)', (street_address, city, state, country, zipcode, customer_id))
        con.commit()

def retrieve_customers():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        customers = cur.execute('SELECT * FROM customers').fetchall()
    return customers


def insert_orders(customer_id, name_of_part, manufacturer_of_part):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)', (name_of_part, manufacturer_of_part))
        con.commit()
        order_id = cur.lastrowid
        cur.execute('INSERT INTO customers_orders(customer_id, order_id) VALUES (?,?)', (customer_id, order_id))
        con.commit()


def retrieve_orders():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        customer_orders = cur.execute('SELECT orders.*, first_name, last_name FROM orders INNER JOIN customers_orders ON (orders.order_id = customers_orders.order_id) INNER JOIN customers ON (customers_orders.customer_id = customers.customer_id)').fetchall()
    return customer_orders


def insert_addresses(customer_id, street_address, city, state, country, zipcode):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO addresses (customer_id, street_address, city, state, country, zipcode) VALUES (?,?,?,?,?,?)', (customer_id, street_address, city, state, country, zipcode))
        con.commit()


def retrieve_addresses():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        addresses = cur.execute('SELECT first_name, last_name, addresses.* FROM customers LEFT JOIN addresses ON (customers.customer_id = addresses.customer_id)').fetchall()
    return addresses
