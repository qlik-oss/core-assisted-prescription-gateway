#!/bin/sh

export SSL_INCLUDE=
export DEV_INCLUDE=

if [ "$CERT_FILE" != "" ]; then
  SSL_INCLUDE="include ssl.conf;"
  envsubst '\
  $CERT_FILE \
  $CERT_KEY \
  ' \
  < ssl.conf.template
  > ssl.conf
else
  echo "No CERT_* variables found, HTTPS disabled"
fi

if [ "$DEV" == "true" ]; then
  echo "Including webpack-dev configuration"
  DEV_INCLUDE="include dev.conf;"
fi

envsubst '\
$KIBANA_HOST \
$KIBANA_PORT \
$VISUALIZER_HOST \
$VISUALIZER_PORT \
$QIX_SESSION_HOST \
$QIX_SESSION_PORT \
$AUTH_HOST \
$AUTH_PORT \
$SSL_INCLUDE \
$DEV_INCLUDE \
' \
  < nginx.conf.template \
  > nginx.conf

../bin/openresty -g "daemon off;" -c nginx.conf
