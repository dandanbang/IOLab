-- Insert code to create Database Schema
-- This will create your .db database file for use
drop table if exists customers;
drop table if exists customer_address;
drop table if exists customer_order;
drop table if exists addresses;
drop table if exists orders;

create table customers (
    customer_id integer primary key,
    first_name char not null,
    last_name char not null,
    company char not null,
    email char not null,
    phone char not null
);


create table addresses (
    address_id integer primary key,
    street_address char not null,
    city char,
    state char not null,
    country char,
    zip_code integer not null
);

create table customer_address (
    id integer primary key,
    customer_id integer not null,
    address_id integer not null unique,
    Foreign key(customer_id) references customers(customer_id),
    Foreign key(address_id) references addresses(address_id)
);

create table customer_order (
    id integer primary key,
    customer_id integer not null,
    order_id integer not null,
    Foreign key(customer_id) references customers(customer_id),
    Foreign key(order_id) references orders(order_id)
);


create table orders (
    order_id integer primary key,
    name_of_part char not null,
    manufacturer_of_part char not null
);
