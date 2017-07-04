import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default function SessionFailed() {
  return (
    <Card id="session-failed" style={{ margin: '20px' }}>
      <CardTitle title="There was a problem connecting to QIX Engine" />
      <CardText>
        This can be caused by several things:

        <ul>
          <li>You are not logged in</li>
          <li>Network connectivity</li>
          <li>No available QIX Engines</li>
        </ul>

        Please try again in a little while, if you are still having trouble give
        us a ping <a href="https://github.com/qlik-ea/qliktive-custom-analytics/issues">on GitHub.</a>
      </CardText>
    </Card>
  );
}
