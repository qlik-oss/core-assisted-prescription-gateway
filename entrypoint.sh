#!/bin/sh

envsubst '$KIBANA_HOST $KIBANA_PORT $VISUALIZER_HOST $VISUALIZER_PORT $QIX_SESSION_HOST $QIX_SESSION_PORT' \
  < nginx.conf.template \
  > nginx.conf
../bin/openresty -g "daemon off;" -c nginx.conf
