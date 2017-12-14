import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default function SessionFailed(props) {
  if (props.error && props.error.suspended) {
    return (
      <Card id="session-failed" style={{ margin: '15% 0 0 0', padding: '5%' }}>
        <CardTitle title="Connecting..." />
        <CardText>
          <p>We are trying to establish an analytics session for you. If you were previously
            in a session this error may indicate that services has been updated to optimize
            your experience. You should be reconnected automatically.</p>

          <p>Connecting... {props.error.retry}/{props.error.MAX_CONNECTION_TRIES}</p>

          <p>If you got stuck on this screen for several minutes, feel free to give us a
          ping <a href="https://github.com/qlik-ea/qliktive-custom-analytics/issues">on GitHub.</a></p>
        </CardText>
      </Card>
    );
  }
  return (
    <Card id="session-failed" style={{ margin: '15% 0 0 0', padding: '5%' }}>
      <CardTitle title="Session was closed" />
      <CardText>
        <p>We could not establish a connection towards QIX Engine :-(</p>

        <p><strong>You will need to refresh this page to continue.</strong></p>

        <p>This should generally never happen so feel free to give us a
        ping <a href="https://github.com/qlik-ea/qliktive-custom-analytics/issues">on GitHub!</a></p>
      </CardText>
    </Card>
  );
}

SessionFailed.propTypes = {
  error: PropTypes.object.isRequired,
};
