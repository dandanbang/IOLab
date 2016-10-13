import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone, street_add, city, state, country, zip_):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("insert into customers (first_name, last_name, company, email, phone) values (?,?,?,?,?)", (first_name, last_name, company, email, phone))
        customer_id = cur.lastrowid
        cur.execute("insert into address (street_add, city, state, country, zip_code, cust_id) values (?,?,?,?,?,?)", (street_add, city, state, country, zip_, customer_id))
        con.commit()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from customers").fetchall()
    return result

def retrieve_orders():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select orders.name_of_part, orders.manufacturer_of_part, customers_orders.cust_id from orders join customers_orders on orders.order_id = customers_orders.order_id").fetchall()
    return result


def insert_orders(name_of_part, manufacturer_of_part, customer_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("insert into orders (name_of_part, manufacturer_of_part) values (?,?)", (name_of_part, manufacturer_of_part))
        order_id = cur.lastrowid
        cur.execute("insert into customers_orders (cust_id, order_id) values (?,?)", (customer_id, order_id))
        con.commit()


