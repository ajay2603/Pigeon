#!/bin/sh
set -e

# Substitute BACKEND_URL into the nginx template and write final conf
envsubst '$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Exec nginx so it receives signals properly
exec nginx -g 'daemon off;'
