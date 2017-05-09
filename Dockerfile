FROM openresty/openresty:1.11.2.3-alpine

RUN mkdir -p /etc/nginx
COPY ./config/* /etc/nginx
COPY ./hello-chart /usr/local/openresty/nginx/html/hellochart
