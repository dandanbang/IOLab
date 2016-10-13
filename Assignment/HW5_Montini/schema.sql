-- This will create your .db database file for use
drop table if exists customer;
drop table if exists creates;
drop table if exists orders;
drop table if exists address;

create table customer
(
	customer_id integer primary key, 
	first_name text not null,
	last_name text not null,
	company text not null,
	email text,
	phone varchar
);

create table address
(
	id integer primary key,
	street_address text not null,
	city text not null,
	state text not null,
	country text not null,
	zip_code varchar,
	cust_id integer,
	Foreign key (cust_id) references
	customer(customer_id)
);

create table orders 
(
	order_id integer primary key,
	name_of_part text not null,
	manufacturer_of_part text not null
);

create table creates 
(
	id integer primary key,
	cust_id integer,
	ord_id integer,
	Foreign key (cust_id) references
	customer(customer_id),
	Foreign key (ord_id) references
	orders(order_id)
);