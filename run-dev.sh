#!/bin/sh

CONTAINER_ID=$(docker ps -qf "name=openresty")
echo $CONTAINER_ID

docker commit $CONTAINER_ID openresty-dev
docker kill $CONTAINER_ID
docker run -d --network=qliktivecustomanalytics_default -v "$PWD/custom-analytics-ui/dev":/usr/local/openresty/nginx/html/dev openresty-dev
 

# if [ "$CONTAINER_ID" != "" ]; then
#   echo "Stopping existing openresty service..."
#   docker stop $CONTAINER_ID
# fi

# docker-compose up --build -d


# echo
# echo
# echo "Ready to hack! Please go to https://localhost/dev/ (mind the ending slash)"
# echo "and hack away..."
# echo
# echo
# echo "Press ctrl-c to cancel dev mode..."
# echo
# echo 

# sleep 5

# npm --prefix ./custom-analytics-ui/ run start

# docker-compose down

# if [ "$CONTAINER_ID" != "" ]; then
#   docker start $CONTAINER_ID
# fi
