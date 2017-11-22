#!/bin/sh

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

envsubst '\
$ERROR_LEVEL \
$WORKER_CONNECTIONS \
$KIBANA_HOST \
$KIBANA_PORT \
$GRAFANA_HOST \
$GRAFANA_PORT \
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
