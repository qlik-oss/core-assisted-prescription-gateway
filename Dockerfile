FROM openresty/openresty:1.11.2.3-alpine

RUN apk add --no-cache gettext libintl openssl

WORKDIR /usr/local/openresty/nginx

COPY ./config/ .
COPY ./custom-analytics-ui/dist/ ./html/custom-analytics-ui
COPY ./picasso-sandbox/ ./html/picasso-sandbox
RUN chmod -R 0755 ./html

COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
