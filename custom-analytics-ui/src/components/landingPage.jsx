import React from 'react';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './landingPage.css';

injectTapEventPlugin();

const RedirectButton = withRouter(({ history }) => (
  <RaisedButton label="Get started" onTouchTap={() => { history.push('/app'); }} style={{backgroundColor: 'transparent'}} backgroundColor="#3a7391" labelColor="#ffffff" />
));

export default function LandingPage() {
  return (
    <div>
      <div className="ca-landing">
        <div className="ca-content-wrapper">
          <div className="ca-landing-content white-text right-align">
            <h2>Insights for prescriptions<br />at your fingertips</h2>
            <div className="ca-landing-divider"></div>
            <h4>Save more lives, time and money</h4>
            <RedirectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
