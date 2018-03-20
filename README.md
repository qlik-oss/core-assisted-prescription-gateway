# core-assisted-prescription-gateway

[![CircleCI](https://circleci.com/gh/qlik-ea/core-assisted-prescription-gateway.svg?style=svg&circle-token=31f97de56be9324ffa2e707342de2500208e5e97)](https://circleci.com/gh/qlik-ea/core-assisted-prescription-gateway)

This repo contains configuration for the openresty service running in the Qliktive
"Custom Analytics UI" use-case.

Each change to this repo will publish an image to Docker hub, tagged
`<branch name>-<rolling build number>`, e.g. `qlikea/qliktive-custom-analytics-openresty:master-123`.

 Changes on `master` branch will also update the `latest` tag on Docker hub.

## Contributing

Contributions are welcome and encouraged! See more info at [Open Source at Qlik R&D](https://github.com/qlik-oss/open-source).

## Required environment variables

To use this container you need to set these environment variables:

`KIBANA_HOST`, `KIBANA_PORT`,
`GRAFANA_HOST`, `GRAFANA_PORT`,
`VISUALIZER_HOST`, `VISUALIZER_PORT`,
`QIX_SESSION_HOST`, `QIX_SESSION_PORT`,
`AUTH_HOST`, `AUTH_PORT`, `AUTH_STRATEGY`

And these are optional:

`CERT_FILE`, `CERT_KEY` - HTTPS certificates (if not set, self-signed certificates will be generated on start up)
`ERROR_LEVEL` - Log level for openresty. Possible values are `debug`, `info`, `notice`, `warn`, `error`, `crit`, `alert`, or `emerg` (if not set, `info` will be used)

## Developing the UI

_Note: You do not need to set any environment variables for this._

* Start up a local environment of [qliktive-custom-analytics](https://github.com/qlik-ea/qliktive-custom-analytics#getting-started)
* Open up a terminal (or Git Bash in Windows) and run `./run-dev.sh`
* When it has booted up, go to https://localhost/ to see the page, 'admin' and 'password' as credentials.
* Now you will be able to do changes to the files in `/src` folder, and it will be rebuilt and shown in your browser after a refresh. 
