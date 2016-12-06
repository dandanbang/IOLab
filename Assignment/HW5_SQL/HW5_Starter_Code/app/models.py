import sqlite3 as sql

def insert_customer(first_name, last_name, company, email, phone):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO customer (first_name, last_name, company, email, phone) values (?, ?, ?, ?, ?)", 
            (first_name, last_name, company, email, phone))
        customer_id = cur.lastrowid
        con.commit()
        return customer_id

def insert_address(street, city, state, country, zip_code, customer_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO address (street, city, state, country, zip_code, customer_id) values (?, ?, ?, ?, ?, ?)", 
            (street, city, state, country, zip_code, customer_id))
        con.commit()

def insert_order(name_of_part, manufacturer_of_part, customer_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) values (?, ?)", 
            (name_of_part, manufacturer_of_part))
        order_id = cur.lastrowid
        cur.execute("INSERT INTO customer_order (order_id, customer_id) values (?, ?)", 
            (order_id, customer_id))
        con.commit()

def insert_customer_order(order_id, customer_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO customer_order (order_id, customer_id) values (?, ?)", 
            (order_id, customer_id))
        con.commit()

def retrieve_customers(customer_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        if customer_id == None:
            result = cur.execute("select * from customer").fetchall()
        else:
            result = cur.execute("select * from customer where customer_id = ?", (customer_id)).fetchall()
    return result

def retrieve_orders(customer_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        if customer_id == None:
            result = cur.execute("select * from orders").fetchall()
        else:
            result = cur.execute("select o.* from orders o, customer_order co where o.order_id = co.order_id and co.customer_id = ?", (customer_id)).fetchall()
    return result

def retrieve_addresses(customer_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        if customer_id == None:
            result = cur.execute("select c.first_name, c.last_name, a.* from customer c, address a where c.customer_id = a.customer_id").fetchall()
        else:
            result = cur.execute("select * from address where customer_id = ?", (customer_id)).fetchall()
    return result

def retrieve_order_customers(order_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select c.* from customer c, customer_order co where c.customer_id = co.customer_id and co.order_id = ?", (order_id)).fetchall()
    return result