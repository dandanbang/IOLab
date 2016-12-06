from app import db
import sqlite3 as sql

def insert_data(company, email, first_name, last_name, phone, street_address, city, state, country, zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con: # type in terminal dqlite3 app.db < schema.sql
        cur = con.cursor()
        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("INSERT INTO customers (company, email, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)",(company, email, first_name, last_name, phone))
        cust_id = cur.lastrowid
        con.commit()

        newcur = con.cursor()
        newcur.execute("PRAGMA foreign_keys = ON")
        newcur.execute("INSERT INTO address (street_address, city, state, country, zip_code, cust_id) VALUES (?, ?, ?, ?, ?, ?)", (street_address, city, state, country, zip_code, cust_id))
        con.commit()

def insert_order(name_of_part, manufacturer_of_part):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con: # type in terminal dqlite3 app.db < schema.sql
        cur = con.cursor()
        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?, ?)",(name_of_part, manufacturer_of_part))
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
