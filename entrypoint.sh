#!/bin/sh

# TODO: Default CERT_FILE/KEY to dummy path to allow non-https dev?

envsubst '\
$KIBANA_HOST \
$KIBANA_PORT \
$VISUALIZER_HOST \
$VISUALIZER_PORT \
$QIX_SESSION_HOST \
$QIX_SESSION_PORT \
$AUTH_HOST \
$AUTH_PORT \
$CERT_FILE \
$CERT_KEY \
' \
  < nginx.conf.template \
  > nginx.conf
../bin/openresty -g "daemon off;" -c nginx.conf
