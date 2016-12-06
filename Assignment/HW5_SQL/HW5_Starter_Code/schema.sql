-- -- Insert code to create Database Schema
-- -- This will create your .db database file for use
-- drop table if exists customers;
-- drop table if exists address;
-- drop table if exists orders;	
-- drop table if exists customer_order;

-- create table customers (
-- 	customer_id integer not null primary key,
-- 	first_name text not null,
-- 	last_name text not null,
-- 	company text not null,
-- 	email text not null,
-- 	phone integer not null
-- );

-- create table address (
-- 	id integer not null primary key,
-- 	street_address text not null,
-- 	city text not null,
-- 	state text not null,
-- 	country text not null,
-- 	zip_code integer not null,
-- 	customer_id integer not null
-- 	--foreign_key(customer_id) references customer(customer_id)
-- );

-- create table orders (
-- 	order_id integer not null primary key,
-- 	name_of_part text not null,
-- 	manufacturer_of_part text not null
-- 	-- customer_id integer not null
-- 	-- foreign_key(customer_id) references customer(customer_id)
-- );

-- create table customer_order (
-- 	customer_id integer not null,
-- 	order_id integer not null,
-- 	foreign_key(customer_id) references customer(customer_id),
-- 	foreign_key(order_id) references orders(order_id)
-- );



drop table if exists customers;
drop table if exists address;
drop table if exists orders;
drop table if exists customer_order;

create table customers (
	customer_id integer primary key,
	first_name text not null,
	last_name text not null,
	company text not null,
	email text not null,
	phone integer not null
);

create table address (
	id integer primary key,
	street_address varchar(200) not null,
	city text not null,
	state text not null,
	country text not null,
	zip_code integer not null,
	customer_id integer,
	foreign key(customer_id) references customer(customer_id)
);

create table orders (
	order_id integer primary key,
	name_of_part text not null,
	manufacturer_of_part text not null,
	customer_id integer,
	foreign key(customer_id) references customer(customer_id)
);

create table customer_order (
	id integer primary key,
	order_id integer,
	customer_id integer,
	foreign key(order_id) references orders(order_id),
	foreign key(customer_id) references customer(customer_id)
);