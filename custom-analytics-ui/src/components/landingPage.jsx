import React from 'react';
import './landingPage.css';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function handleButtonClick() {
  window.location = "/#app";
}

export default function LandingPage() {
  return (
    <div>
      <div className="landing">
        <div className="content white-text right-align">
          <h2>Insights for prescriptions <br /> at your fingertips</h2>
          <p>Save more lives, time and money</p>
          <RaisedButton primary={true} label="Get started" onTouchTap={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
}
