import React from 'react';
import { Button } from 'react-materialize';

function handleButtonClick() {
  window.location = '/#app/';
}

export default function LandingPage() {
  return (
    <div>
      <div className="landing">
        <div className="content white-text right-align">
          <h2>Insights for prescriptions <br /> at your fingertips</h2>
          <p>Save more lives, time and money</p>
          <Button className="green" waves="light" onClick={handleButtonClick}>Get started</Button>
        </div>
      </div>
    </div>
  );
}
