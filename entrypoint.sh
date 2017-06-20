#!/bin/sh

export DEV_INCLUDE=

if [ "$CERT_FILE" == "" ]; then
  if [ "$CERT_HOST" == "" ]; then
    CERT_HOST="localhost"
  fi
  SUBJECT="/O=Global Security/CN=$CERT_HOST"
  export CERT_FILE=/usr/local/openresty/cert-gateway.crt
  export CERT_KEY=/usr/local/openresty/cert-gateway.key
  echo "Running openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $CERT_KEY -out $CERT_FILE -subj \"$SUBJECT\""
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $CERT_KEY -out $CERT_FILE -subj "$SUBJECT"
  echo "Using generated self-signed certificates"
else
  echo "Using pre-defined certificates"
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
$DEV_INCLUDE \
$CERT_FILE \
$CERT_KEY \
' \
  < nginx.conf.template \
  > nginx.conf

../bin/openresty -g "daemon off;" -c nginx.conf
