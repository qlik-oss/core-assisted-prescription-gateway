import React from 'react';
import './landingPage.css';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const RedirectButton = withRouter(({history}) => (
  <RaisedButton primary={true} label="Get started" onTouchTap={() => { history.push('/app') }}/>
))

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
