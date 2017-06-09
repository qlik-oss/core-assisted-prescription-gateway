import React from 'react';
import Card from './card';

export default function SessionFailed() {
  return (
    <Card id="session-failed" title="There was a problem connecting to QIX Engine">
      <div>
        <p>This can be caused by several things:</p>

        <ul>
          <li>You are not logged in</li>
          <li>Network connectivity</li>
          <li>No available QIX Engines</li>
        </ul>

        <p>Please try again in a little while, if you are still having trouble give
        us a ping <a href="https://github.com/qlik-ea/qliktive-custom-analytics/issues">on GitHub.</a></p>
      </div>
    </Card>
  );
}
