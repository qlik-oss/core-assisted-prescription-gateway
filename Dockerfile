FROM openresty/openresty:1.11.2.3-alpine

RUN apk add --no-cache gettext libintl

WORKDIR /usr/local/openresty/nginx

COPY ./config/ .

RUN mkdir -p ./html/hellochart
COPY ./hello-chart/dist/ ./html/hellochart

COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
