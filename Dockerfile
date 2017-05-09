FROM openresty/openresty:1.11.2.3-alpine

RUN mkdir -p /etc/nginx
COPY ./config/ /etc/nginx

RUN mkdir -p /usr/local/openresty/nginx/html/hellochart
COPY ./hello-chart/dist/ /usr/local/openresty/nginx/html/hellochart

RUN mkdir -p /usr/local/openresty/nginx/html/data
COPY ./hello-chart/data/ /usr/local/openresty/nginx/html/data

ENTRYPOINT /usr/local/openresty/bin/openresty -g 'daemon off;' -c /etc/nginx/nginx.conf
