import sqlite3 as sql

# ========== UPDATE DATABASE FUNCTIONS ==========

# insert a customer data record into the customers db,
# returns the customer ID
def insert_customer(fname, lname, company, email, phone):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()

        cur.execute(
        "INSERT INTO customers (first_name, last_name, company, email, phone) \
        VALUES (?, ?, ?, ?, ?)", (fname, lname, company, email, phone))

        customer_id = cur.lastrowid
        con.commit()
        return customer_id

# insert an address to the address db
# returns the address ID
def insert_address(street, city, state, country, zip_code):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()

        cur.execute(
        "INSERT INTO addresses (street_address, city, state, country, zip_code)\
        VALUES (?, ?, ?, ?, ?)", (street, city, state, country, zip_code))

        address_id = cur.lastrowid
        con.commit()
        return address_id

# insert a customer_address relationship to the customer_address table
def insert_customer_address(customer_id, address_id):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()

        cur.execute(
        "INSERT INTO customer_address (customer_id, address_id) \
        VALUES (?, ?)", (customer_id, address_id))

        con.commit()

# insert an order to the orders db
# returns the order ID
def insert_order(part_name, manufacturer_name):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()

        cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) \
        VALUES (?, ?)", (part_name, manufacturer_name))

        order_id = cur.lastrowid
        con.commit()
        return order_id

# insert a customer_order relationship to the customer_order table
def insert_customer_order(customer_id, order_id):
    # SQL statement to insert into database goes here
    with sql.connect("app.db") as con:
        cur = con.cursor()

        cur.execute(
        "INSERT INTO customer_order (customer_id, order_id) \
        VALUES (?, ?)", (customer_id, order_id))

        con.commit()

# ========== SELECT DATABASE FUNCTIONS ==========
# retrieve all customers
def retrieve_customers():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()

        sql_command = "select *\
        from customers c join customer_address ca join addresses a \
        where c.customer_id = ca.customer_id and ca.address_id = a.address_id"
        result = cur.execute(sql_command).fetchall()
    return result

# retrieve all orders joined with their corresponding customer names
def retrieve_orders():
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()

        sql_command = "select \
        c.first_name, c.last_name, o.name_of_part, o.manufacturer_of_part \
        from customers c join customer_order co join orders o \
        where c.customer_id = co.customer_id and co.order_id = o.order_id"
        result = cur.execute(sql_command).fetchall()
    return result

# retrieve a customer by their customer ID
def retrieve_customer(customer_id):
    # SQL statement to query database goes here
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()

        result = cur.execute(
        "SELECT * FROM customers where customer_id = (?)",
        customer_id).fetchall()
    return result
