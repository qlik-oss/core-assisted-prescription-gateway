FROM openresty/openresty:1.11.2.3-alpine

RUN apk add --no-cache gettext libintl openssl

WORKDIR /usr/local/openresty/nginx

COPY ./config/ .

COPY ./hello-chart/dist/ ./html/hello-chart
COPY ./custom-analytics-ui/dist/ ./html/custom-analytics-ui
RUN chmod -R 0755 ./html

ENV WORKER_CONNECTIONS 10000;

COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
