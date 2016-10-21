#!/usr/bin/env bash

# Set App status to production or dev
export APP_SETTINGS = "dev"


# function set_env() {
#     export APP_SETTINGS="project.config.DevelopmentConfig"
#     export APP_MAIL_SERVER=debugmail.io
#     export APP_MAIL_PORT=25
#     export APP_MAIL_USE_TLS=true
#     export APP_MAIL_USE_SSL=false
#     export APP_MAIL_USERNAME=lee.leon0519@gmail.com
#     export APP_MAIL_PASSWORD=7fd5e8b0-9728-11e6-8409-5dcd38e6a908
# }
# set_env

#
rm -rf migrations
rm -rf tmp
rm -f project/dev.sqlite
