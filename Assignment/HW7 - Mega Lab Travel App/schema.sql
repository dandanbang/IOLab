drop table if exists customers;
create table trips (
	trip_id integer primary key autoincrement,
    trip_name text not null,
    destination text not null,
    creator_id integer not null,
    friend_id integer not null,
    FOREIGN KEY (creator_id) REFERENCES travellers(traveller_id),
    FOREIGN KEY (friend_id) REFERENCES travellers(traveller_id)
);

drop table if exists travellers;
create table travellers (
    traveller_id integer primary key autoincrement,
    traveller_name text not null,
    username text not null unique,
    password text not null
);
