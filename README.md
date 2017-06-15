# qliktive-custom-analytics-openresty

This repo contains configuration for the openresty service running in the Qliktive
"Custom Analytics UI" use-case.

Each change to this repo will publish an image to Docker hub, tagged
`<branch name>-<rolling build number>`, e.g. `qlikea/qliktive-custom-analytics-openresty:master-123`.

 Changes on `master` branch will also update the `latest` tag on Docker hub.

## Required environment variables

To use this container you need to set these environment variables:

`KIBANA_HOST`, `KIBANA_PORT`,
`VISUALIZER_HOST`, `VISUALIZER_PORT`,
`QIX_SESSION_HOST`, `QIX_SESSION_PORT`,
`AUTH_HOST`, `AUTH_PORT`

And these are optional:

`CERT_FILE`, `CERT_KEY` - HTTPS certificates (if not set, HTTPS will not work so
  make sure port 80 is mapped)

## Developing the UI

1. Start up a local environment of [qliktive-custom-analytics](https://github.com/qlik-ea/qliktive-custom-analytics)
2. Open up a terminal (or Git Bash in Windows) and run [`./run-dev.sh`](./run-dev.sh)
3. Follow the guidelines in the terminal
4. Hack away on the UI and the browser should auto-update
