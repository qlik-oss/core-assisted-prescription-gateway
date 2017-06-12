import React from 'react';
import './landingPage.css';

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
          <a
            className="waves-effect waves-light green btn-large"
            onClick={handleButtonClick}
          >
          Get started
          </a>
        </div>
      </div>
    </div>
  );
}
