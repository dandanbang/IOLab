-- Insert code to create Database Schema
-- This will create your .db database file for use

drop table if exists customers;
create table customers (
	customer_id integer primary key,
	first_name text not null,
	last_name text not null,
	company text not null,
	email text not null,
	phone varchar(10) not null
);

drop table if exists addresses;
create table addresses (
	address_id integer primary key,
	street_address text not null,
	city text not null,
	state text not null,
	country text not null,
	zip_code varchar(5) not null,
	customer_id integer,
	foreign key (customer_id) references customers(customer_id)
);

drop table if exists orders;
create table orders (
	order_id integer primary key,
	part_name text not null,
	manufacturer_name text not null
);

drop table if exists customer_order_junct;
create table customer_order_junct (
	id integer primary key,
	customer_id integer,
	order_id integer,
	foreign key (customer_id) references customers(customer_id),
	foreign key (order_id) references orders(order_id)
);