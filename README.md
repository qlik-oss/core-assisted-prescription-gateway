# core-assisted-prescription-ui

[![CircleCI](https://circleci.com/gh/qlik-oss/core-assisted-prescription-ui.svg?style=svg)](https://circleci.com/gh/qlik-oss/core-assisted-prescription-ui)

*As of 1 July 2020, Qlik Core is no longer available to new customers. No further maintenance will be done in this repository.*

This repo contains the ui used to showcase the Assisted Prescriptions use-case.

## Developing the UI

* Start the Qlik Associative Engine in a Docker container.
  Note that before you deploy, you need to set the `ACCEPT_EULA` environment variable,
  otherwise the Qlik Associative Engine won't start.

  ```bash
  ACCEPT_EULA=yes docker-compose up -d
  ```

* Install dependencies:
  ```bash
  npm install
  ```
* Run the application:
  ```bash
  npm run start
  ```

## Contributing

Contributions are welcome and encouraged! See more info at [Open Source at Qlik R&D](https://github.com/qlik-oss/open-source).
