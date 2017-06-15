#!/bin/sh

CONTAINER_ID=$(docker ps | grep openresty | grep -o '^\S\+')

if [ "$CONTAINER_ID" != "" ]; then
  echo "Stopping existing openresty service..."
  docker stop $CONTAINER_ID
fi

# make sure the dist/ folder exists before building:
mkdir -p custom-analytics-ui/dist

docker-compose up --build &

echo "Waiting for services to start up..."

WEBPACK_IS_DOWN="true"

while [ "$WEBPACK_IS_DOWN" == "true" ]; do
  WEBPACK_IS_DOWN=$(curl http://localhost:8080 -s -f -o /dev/null || echo "true")
  sleep 1
done

echo
echo
echo "Ready to hack! Please go to http://localhost/dev/ (mind the ending slash)"
echo "and hack away..."
echo
echo
echo "Press any key to cancel dev mode..."
echo
echo

# wait for keyboard input:
read -n1 -r -p ""

docker-compose down

if [ "$CONTAINER_ID" != "" ]; then
  docker start $CONTAINER_ID
fi
