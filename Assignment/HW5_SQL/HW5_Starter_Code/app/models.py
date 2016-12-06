import sqlite3 as sql

def insert_data(customer_data, address_data):
    with sql.connect("hw5.db") as con:
        cur = con.cursor()
        # Check whether or not the email existed, if yes, insert only address, else insert boteh customer info and address
        customer_id = cur.execute('SELECT customer_id FROM customer WHERE email=?', (customer_data[3],)).fetchall()
        if customer_id:
            pass
        else:
            cur.execute('INSERT INTO customer (first_name, last_name, company, email, phone) VALUES (?, ?, ?, ?, ?)', (customer_data[0], customer_data[1], customer_data[2], customer_data[3], customer_data[4]))
            con.commit()
            # Get current cumtomer id
            customer_id = cur.execute('SELECT customer_id FROM customer WHERE email=?', (customer_data[3],)).fetchall()
        # Insert address info
        cur.execute('INSERT INTO address (street_address, city, state, country, zip_code, customer_customer_id) VALUES (?, ?, ?, ?, ?, ?)', (address_data[0], address_data[1], address_data[2], address_data[3], address_data[4], customer_id[0][0]))
        con.commit()

def insert_order(order_data):
    with sql.connect("hw5.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO `order` (name_of_part, manufacturer_of_part) VALUES (?, ?)', (order_data[1], order_data[2]))
        con.commit()
        order_id = cur.execute('SELECT last_insert_rowid()').fetchall()[0][0]
        # # insert data into table order_has_customer
        cur.execute('INSERT INTO order_has_customer (order_order_id, customer_customer_id) VALUES (?, ?)', (order_id, order_data[0]))
        con.commit()

def retrieve_customers(id=None):
    info = []
    with sql.connect('hw5.db') as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        if id == None:
            customers = cur.execute('SELECT * FROM customer').fetchall()
        else:
            customers = cur.execute('SELECT * FROM customer WHERE customer_id=?', (int(id),)).fetchall()
        for customer in customers:
            tmp = {}
            tmp = {
                "customer_id": customer['customer_id'],
                "first_name": customer['first_name'],
                "last_name": customer['last_name'],
                "company": customer['company'],
                "email": customer['email'],
                "phone": customer['phone']
            }
            customer_id = customer['customer_id']
            addresses = cur.execute('SELECT * FROM address where customer_customer_id =?', (customer_id,)).fetchall()
            tmp["address"] = []
            for address in addresses:
                tmp["address"].append({
                                    "street": address['street_address'],
                                    "city": address['city'],
                                    "state": address['state'],
                                    "country": address['country'],
                                    "zipcode": address['zip_code']
                                    })
            info.append(tmp)
        return info


def retrieve_orders():
    with sql.connect('hw5.db') as con:
        orders = []
        con.row_factory = sql.Row
        cur = con.cursor()
        results = cur.execute('SELECT customer_customer_id FROM order_has_customer').fetchall()
        customer_ids = set( e['customer_customer_id'] for e in results )
        for id in customer_ids:
            tmp = {}
            customer_info = cur.execute('SELECT first_name, last_name, company, email, phone from customer where customer_id=?', (int(id),)).fetchall()[0]
            tmp = {
                "first_name": customer_info['first_name'],
                "last_name": customer_info['last_name'],
                "company": customer_info['company'],
                "email": customer_info['email'],
                "phone": customer_info['phone']
            }
            order_ids = cur.execute('SELECT order_order_id FROM order_has_customer WHERE customer_customer_id=?', (int(id),)).fetchall()
            tmp["orders"] = []
            for oid in order_ids:
                orders_tmp = cur.execute('SELECT name_of_part, manufacturer_of_part FROM `order` WHERE order_id=?', (int(oid['order_order_id']),)).fetchall()
                for ord in orders_tmp:
                    tmp["orders"].append({
                                        "name_of_part": ord['name_of_part'],
                                        "manufacturer_of_part": ord['manufacturer_of_part']
                                        })
            orders.append(tmp)
        return orders
