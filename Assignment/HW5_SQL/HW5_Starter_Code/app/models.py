import sqlite3 as sql

def insert_data(company, email, first_name, last_name, phone_number,street_address,city,state,country,zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO customers (company,email,first_name,last_name,phone_number) VALUES (?,?,?,?,?)",
                     (company,email,first_name,last_name,phone_number))
        customer_id = cur.lastrowid
        cur.execute("INSERT INTO address (street_address,city,state,country,zip_code,customer_id) VALUES (?,?,?,?,?,?)",
                     (street_address,city,state,country,zip_code,customer_id)) 
        con.commit()

def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from customers").fetchall()
        print(result)
    return result

def retrieve_orders():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("select * from orders").fetchall()
    return result
    # SQL statement to query database goes here

def insert_order(name_of_part, manufacturer_of_part, customer_id):
    with sql.connect("app.db") as con: 
        cur = con.cursor()
        cur.execute("INSERT INTO orders (name_of_part,manufacturer_of_part) VALUES (?,?)",
                     (name_of_part,manufacturer_of_part))
        order_id = cur.lastrowid
        cur.execute("INSERT INTO customer_order(customer_id,order_id) VALUES (?,?)",(customer_id,order_id ))
        con.commit()


##You might have additional functions to access the database
