-- Insert code to create Database Schema
-- This will create your .db database file for use 
drop table if exists customers;
drop table if exists customer_order;
drop table if exists address;
drop table if exists orders;

create table customers (
    customer_id integer primary key, -- primary key means it's how you'll find that customer
    first_name text not null,
    last_name text not null,
    company text not null,
    email text not null,
    phone integer not null
);

-- id, street_address, city, state, country, zip_code)
create table address (
    address_id integer primary key, 
    street_address text not null,
    city text not null,
    state text not null,
    country text not null,
    zip_code integer not null,
    cust_id integer not null,
        foreign key (cust_id) references customers(customer_id)
);

-- (order_id, name_of_part,  manufacturer_of_part)
create table orders (
    order_id integer primary key, 
    name_of_part text not null,
    manufacturer_of_part text not null
);

--id, order_id, customer_id
create table customer_order (
    cust_ord_id integer primary key, -- primary key means it's how you'll find that customer
    cust_id integer not null,
    ord_id integer not null,
        foreign key (ord_id) references orders(order_id),
        foreign key (cust_id) references customer(customer_id)
);