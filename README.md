# qliktive-openresty-custom-analytics

This repo contains configuration for the openresty service running in the Qliktive
"Custom Analytics UI" use-case.

Each change to this repo will publish an image to Docker hub, tagged
`<branch name>-<rolling build number>`, e.g. `qlikea/qliktive-openresty-custom-analytics:master-123`.

 Changes on `master` branch will also update the `latest` tag on Docker hub.
