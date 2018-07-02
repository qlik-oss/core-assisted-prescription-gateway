import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default function SessionSuspended(props) {
  const { retries, maxRetries } = props;
  return (
    <Card id="session-failed" style={{ margin: '15% 0 0 0', padding: '5%' }}>
      <CardTitle title="Connecting..." />
      <CardText>
        <p>
We are trying to establish an analytics session for you. If you were previously
          in a session this error may indicate that services has been updated to optimize
          your experience. You should be reconnected automatically.
        </p>

        <p>
Connecting...
          {retries}
/
          {maxRetries}
        </p>

        <p>
If you got stuck on this screen for several minutes, feel free to give us a
        ping
          <a href="https://github.com/qlik-oss/core-assisted-prescription/issues">
on GitHub.
          </a>
        </p>
      </CardText>
    </Card>
  );
}

SessionSuspended.propTypes = {
  retries: PropTypes.number.isRequired,
  maxRetries: PropTypes.number.isRequired,
};
