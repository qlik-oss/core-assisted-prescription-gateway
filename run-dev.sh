#!/bin/sh

CONTAINER_ID=$(docker ps -aqf "name=openresty")


if [ "$CONTAINER_ID" != "" ]; then
  printf "Stopping existing openresty service..."
  docker stop $CONTAINER_ID
fi

mkdir -p custom-analytics-ui/dist

docker-compose up --build -d
cd custom-analytics-ui
npm install

printf
printf
printf "\x1b[32m Ready to hack!\n"
printf " Please go to https://localhost/ (mind the ending slash) and hack away...\n"
printf " Press ctrl-c to cancel dev mode...\x1b[0m\n"

sleep 5

npm run start

docker-compose down

if [ "$CONTAINER_ID" != "" ]; then
  docker start $CONTAINER_ID
fi
