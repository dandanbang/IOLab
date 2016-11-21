#!/usr/bin/env bash

def init() {
    rm -fr migrations
    python3 manage.py drop_db
    python3 manage.py create_db
    python3 manage.py db init
    python3 manage.py db migrate
}

init
