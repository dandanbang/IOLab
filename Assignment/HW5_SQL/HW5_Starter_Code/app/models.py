import sqlite3 as sql

def insert_data(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code):
    with sql.connect("app.db") as conn:
        curs = conn.cursor()

        curs.execute("INSERT INTO customer (first_name, last_name, company, email, phone) VALUES (?, ?, ?, ?, ?)",
                     (first_name, last_name, company, email, phone))

        customer_id = curs.lastrowid

        conn.commit()

        curs = conn.cursor()
        curs.execute("INSERT INTO address (street_address, city, state, country, zip_code) VALUES (?, ?, ?, ?, ?)", 
                     (street_address, city, state, country, zip_code))
        conn.commit()

        address_id = curs.lastrowid

        curs = conn.cursor()
        curs.execute("INSERT INTO customer_address (customer_id, address_id) VALUES (?, ?)", (customer_id, address_id))

        conn.commit()


def insert_order(name_of_part, manufacturer_of_part, customer_id):
    with sql.connect('app.db') as conn:
        curs = conn.cursor()

        curs.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) values (?, ?)", (name_of_part, manufacturer_of_part))

        conn.commit()
        order_id = curs.lastrowid

        curs = conn.cursor()
        curs.execute("INSERT INTO customer_order (customer_id, order_id) VALUES (?, ?)", (customer_id, order_id))

        conn.commit()
        print('order inserted')

       

    # SQL statement to insert into database goes here

def retrieve_customers():
    with sql.connect('app.db') as conn:
        conn.row_factory = sql.Row 
        curs = conn.cursor()
        result = curs.execute('select * from customer').fetchall()
        print('result: ', result)
    return result

def retrieve_orders():
    with sql.connect('app.db') as conn:
        conn.row_factory = sql.Row 
        curs = conn.cursor()
        query = '''
        SELECT c.first_name, c.last_name, o.name_of_part, o.manufacturer_of_part FROM orders o
        JOIN customer_order co on o.order_id = co.order_id
        JOIN customer c on co.customer_id = c.customer_id'''

        result = curs.execute(query).fetchall()
        print('result: ', result)
    return result

def customer_name(customer_id):
    with sql.connect('app.db') as conn:
        curs = conn.cursor()
        result = curs.execute('select first_name, last_name from customer where customer_id = ?', customer_id)
        return result.fetchone()

    # SQL statement to query database goes here


##You might have additional functions to access the database

