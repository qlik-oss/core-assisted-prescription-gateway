import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default function SessionSuspended() {
  return (
    <Card id="session-failed" style={{ margin: '15% 0 0 0', padding: '5%' }}>
      <CardTitle title="Session timed out" />
      <CardText>
        <p>
Your analytics session timed out due to inactivity.
        </p>

        <p>
          <strong>
Refresh this page to establish a new session.
          </strong>
        </p>
      </CardText>
    </Card>
  );
}
