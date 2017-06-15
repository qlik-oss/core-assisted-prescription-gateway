import React from 'react';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './landingPage.css';

injectTapEventPlugin();

const RedirectButton = withRouter(({ history }) => (
  <RaisedButton primary label="Get started" onTouchTap={() => { history.push('/app'); }} />
));

export default function LandingPage() {
  return (
    <div>
      <div className="landing">
        <div className="content white-text right-align">
          <h2>Insights for prescriptions <br /> at your fingertips</h2>
          <p>Save more lives, time and money</p>
          <RedirectButton />
        </div>
      </div>
    </div>
  );
}
