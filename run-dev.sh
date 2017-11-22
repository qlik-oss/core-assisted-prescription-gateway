#!/bin/sh

CONTAINER_ID=$(docker ps -aqf "name=openresty")


if [ "$CONTAINER_ID" != "" ]; then
  echo "Stopping existing openresty service..."
  docker stop $CONTAINER_ID
fi

mkdir -p custom-analytics-ui/dist

docker-compose up --build -d
cd custom-analytics-ui
npm install

Yellow='\033[0;33m'
echo
echo
echo "${Yellow}Ready to hack! Please go to https://localhost/ (mind the ending slash)"
echo "and hack away..."
echo
echo
echo "Press ctrl-c to cancel dev mode..."
echo
echo 

sleep 5

npm run start

docker-compose down

if [ "$CONTAINER_ID" != "" ]; then
  docker start $CONTAINER_ID
fi
