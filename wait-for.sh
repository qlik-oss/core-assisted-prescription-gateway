#!/bin/sh

# Based on https://github.com/eficode/wait-for/blob/master/wait-for
# Waits for a host:port to be up before continuing
# Will skip host that equals 127.0.0.1

HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
RETRIES=${RETRIES:-30}

if [ "$HOST" == "127.0.0.1" ]; then
  echo "- Host is 127.0.0.1, assuming disabled service."
  exit 0
fi

for i in `seq $RETRIES` ; do
  nc -z "$HOST" "$PORT" > /dev/null 2>&1
  result=$?
  if [ $result -eq 0 ] ; then
    echo "- Service up after $i tries."
    exit 0
  fi
  sleep 1
done

echo "- No response after $i tries." >&2
exit 1
