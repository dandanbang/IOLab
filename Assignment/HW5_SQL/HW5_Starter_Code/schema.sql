-- Insert code to create Database Schema
-- This will create your .db database file for use
drop table if exists customer;
drop table if exists address;
drop table if exists orders;
drop table if exists customer_order;

create table customer (
	customer_id integer primary key,
	first_name text not null,
	last_name text not null,
	company text not null,
	email text not null,
	phone text not null
);

create table address (
	id integer primary key,
	street_address varchar(200) not null,
	city text not null,
	state text not null,
	country text not null,
	zip_code varchar(11) not null,
	customer_id integer,
	foreign key(customer_id) references customer(customer_id)
);

create table orders (
	order_id integer primary key,
	name_of_part text not null,
	manufacturer_of_part text not null
);

create table customer_order (
	id integer primary key,
	order_id integer,
	customer_id integer,
	foreign key(order_id) references orders(order_id),
	foreign key(customer_id) references customer(customer_id)
);