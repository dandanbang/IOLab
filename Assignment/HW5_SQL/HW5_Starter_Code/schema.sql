-- Insert code to create Database Schema
-- This will create your .db database file for use

DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS customer_order;

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT
);

CREATE TABLE address (
  address_id INTEGER PRIMARY KEY,
  street_address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  zip_code INT
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  name_of_part TEXT,
  manufacturer_of_part TEXT
);

CREATE TABLE customer_address(
  customer_id INT,
  address_id INT PRIMARY KEY,
  FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

CREATE TABLE customer_order(
  customer_id INT,
  order_id INT,
  FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
  FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

INSERT INTO customer (first_name, last_name, company, email, phone) VALUES
    ('paul', 'glenn', 'test', 'test@test.com', '313-555-5555');


-- Create the following tables with the properties listed (with appropriate data types) and
-- relationships:
-- o customer: (customer_id, first_name, last_name, company, email, phone)
-- o address: (id, street_address, city, state, country, zip_code)
-- o order: (order_id, name_of_part, manufacturer_of_part)
-- o customer has a one-to-many relationship to address
-- § a customer can have many addresses
-- § an address can only have one customer
-- o customer has a many-to-many relationship to order
-- § a customer can have many orders
-- § an order may have many customers
-- § Hint: This might require you to create a separate table which includes the
-- relationship between the customer and order - (id, order_id, customer_id)