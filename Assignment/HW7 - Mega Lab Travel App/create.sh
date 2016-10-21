#!/usr/bin/env bash

rm -fr migrations
# rm iraccoon/dev.iraccoon.db

python3 manage.py drop_db
python3 manage.py create_db
python3 manage.py db init
python3 manage.py db migrate
