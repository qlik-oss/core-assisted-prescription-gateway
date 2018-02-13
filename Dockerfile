FROM openresty/openresty:1.11.2.3-alpine

RUN apk add --no-cache gettext libintl openssl

WORKDIR /usr/local/openresty/nginx

# Download jwt lua package
RUN \
 wget -qO- https://github.com/SkyLothar/lua-resty-jwt/releases/download/v0.1.11/lua-resty-jwt-0.1.11.tar.gz | tar xvz -C /tmp && \
 cp -r /tmp/lua-resty-jwt-0.1.11/lib/resty/* /usr/local/openresty/lualib/resty/ && \
 rm -rf /tmp/*

COPY ./config/ .
COPY ./custom-analytics-ui/dist/ ./html/custom-analytics-ui
COPY ./picasso-sandbox/ ./html/picasso-sandbox
RUN chmod -R 0755 ./html

COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
