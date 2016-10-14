-- Insert code to create Database Schema
-- This will create your .db database file for use
-- Insert code to create Database Schema
-- This will create your .db database file for use
drop table if exists customers;
drop table if exists address;
drop table if exists orders;
drop table if exists customers_orders;

create table customers (
    customer_id integer primary key,
    company text not null,
    email text not null,
    first_name text not null,
    last_name text not null,
    phone text not null
);

create table address (
    id integer primary key,
    street_address text not null,
    city text not null,
    state text not null,
    country text not null,
    zip_code integer not null,
    cust_id integer not null,
        foreign key(cust_id) references customers(customer_id)
);

create table orders (
    order_id integer primary key,
    name_of_part text not null,
    manufacturer_of_part text not null
);

create table customers_orders (
    id integer primary key,
    order_id integer not null,
    cust_id integer not null,
        foreign key(order_id) references orders(order_id)
        foreign key(cust_id) references customers(customer_id)
);



