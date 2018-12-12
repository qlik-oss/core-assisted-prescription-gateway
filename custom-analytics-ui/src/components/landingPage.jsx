import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './landingPage.css';
// import { colors, styles } from '../ui-constants';

const RedirectButton = withRouter(({ history }) => (
  // <Button variant="contained" onClick={() => { history.push('/app'); }} style={styles.transparentBackground} backgroundColor={colors.blue} labelColor={colors.white}>
  <Button variant="contained" onClick={() => { history.push('/app'); }}>
    Get started
  </Button>
));

export default function LandingPage() {
  return (
    <div>
      <div className="ca-landing">
        <div className="content-wrapper">
          <div className="landing-content white-text right-align">
            <h2 className="landing-title">
Insights for prescriptions
              <br />
at your fingertips
            </h2>
            <div className="landing-divider" />
            <h4 className="landing-subtitle">
Save more lives, time and money
            </h4>
            <RedirectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
