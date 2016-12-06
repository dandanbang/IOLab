drop table if exists customers;
create table customers (
	customer_id integer primary key,
    first_name text not null,
    last_name text not null,
	company text not null,
	email text not null,
    phone integer not null
);

drop table if exists addresses;
create table addresses (
    address_id integer primary key,
    street_address text not null,
    city text not null,
    state text not null,
    country text not null,
    zipcode integer not null,
    customer_id integer not null,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

drop table if exists orders;
create table orders (
    order_id integer primary key,
    name_of_part text not null,
    manufacturer_of_part text not null
);

drop table if exists customers_orders;
create table customers_orders (
    customers_orders_id integer primary key,
    order_id integer not null,
    customer_id integer not null,
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

