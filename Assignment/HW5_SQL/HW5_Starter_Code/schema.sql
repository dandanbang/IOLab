
drop table if exists address;
create table address(
    id integer primary key,
    street text not null,
    city text not null,
    state text not null,
    country text not null,
    zip_code text not null,
    customer_id integer not null,
        foreign key (customer_id) references customer_id(customer_id)
);

drop table if exists customer;
create table customer(
    customer_id integer primary key,
    first_name text not null,
    last_name text not null,
    company text not null,
    email text not null,
    phone text not null
);

drop table if exists orders;
create table orders(
    order_id integer primary key,
    name_of_part text not null,
    manufacturer_of_part text not null
);

drop table if exists customer_order;
create table customer_order(
    id integer primary key,
    order_id integer not null,
    customer_id integer not null,
        foreign key (order_id) references orders(order_id),
        foreign key (customer_id) references customer(customer_id)
);