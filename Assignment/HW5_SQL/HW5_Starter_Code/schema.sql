-- Insert code to create Database Schema
-- This will create your .db database file for use
drop table if exists customers;
drop table if exists orders;
drop table if exists address;
drop table if exists order_customer;

create table customers(
	customer_id integer primary key,
	company text not null,
	email text not null,
	fname text not null,
	lname text not null,
	phone integer not null
);


create table address(
	address_id integer primary key,
	customer_id integer not null,
	street text not null,
	city text not null,
	state text not null,
	country text not null,
	zipc integer not null,
	Foreign key(customer_id) references customers(customer_id)	
);


create table orders(
	order_id integer primary key, 
	n_o_p text not null, 
	m_o_p text not null
);


create table order_customer(
	id integer primary key, 
	order_id integer, 
	customer_id integer,
	-- Foreign key(customer_id) references customers(customer_id),
	Foreign key(order_id) references orders(order_id)
);