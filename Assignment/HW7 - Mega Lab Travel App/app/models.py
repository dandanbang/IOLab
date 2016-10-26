import sqlite3 as sql

def login_user(username, password):
   with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        travellers = cur.execute('SELECT * FROM travellers WHERE username=? and password=?', (username, password)).fetchall()
        return travellers

def get_friends(my_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        travellers = cur.execute('SELECT * FROM travellers WHERE traveller_id != ?', (my_id,)).fetchall()
        return travellers

def insert_user(user, username, password):
    with sql.connect('app.db') as con:
        cur = con.cursor()
        cur.execute('INSERT INTO travellers (traveller_name, username, password) VALUES(?,?,?)', (user, username, password))
        con.commit()
        user_id = cur.execute('SELECT last_insert_rowid()').fetchall()[0][0]
        return user_id


def insert_trip(trip_name, destination, creator_id, friend_id):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('INSERT INTO trips (trip_name, destination, creator_id, friend_id) VALUES (?,?,?,?)', (trip_name, destination, creator_id, friend_id))
        con.commit()

def retrieve_trips(my_id):
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        trips = cur.execute('SELECT * FROM trips WHERE creator_id = ? or friend_id = ?', (my_id, my_id,)).fetchall()
    return trips


def delete_trip(trip_name, destination):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute('DELETE FROM trips WHERE trip_name = ? and destination = ?', (trip_name, destination,))
        con.commit()
