import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default function SessionClosed() {
  return (
    <Card id="session-failed" style={{ margin: '15% 0 0 0', padding: '5%' }}>
      <CardTitle title="Session was closed" />
      <CardText>
        <p>We could not establish a session :-(</p>

        <p><strong>You will need to refresh this page to continue.</strong></p>

        <p>This should generally never happen so feel free to give us a
        ping <a href="https://github.com/qlik-oss/core-assisted-prescription/issues">on GitHub!</a></p>
      </CardText>
    </Card>
  );
}
