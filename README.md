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
`QIX_SESSION_HOST`, `QIX_SESSION_PORT`
