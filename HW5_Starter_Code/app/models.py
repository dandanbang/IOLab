import sqlite3 as sql

def insert_customer(company, email, first_name, last_name, phone):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO customers (company, email, first_name, last_name, phone) VALUES (?,?,?,?,?)", (company, email, first_name, last_name, phone))
        cust_id = cur.lastrowid
        con.commit()

def insert_orders(name_of_part, manufacturer_of_part):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)", (name_of_part, manufacturer_of_part))
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
        result = cur.execute("select * from orders").fetchall()
    return result


##You might have additional functions to access the database
