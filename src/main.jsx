import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import AcceptCookies from './components/acceptCookies';
import LandingPage from './components/landingPage';
import App from './components/app';
import Login from './components/login';
import PrivateRoute from './components/privateRoute';

import './main.css';

picasso.use(picassoQ);

const auth = {

  // isAuthenticated:
  //   fetch('/is-authenticated', {
  //     credentials: 'same-origin',
  //   }).then(response => response.json()),
  // idp:
  //   fetch('/idp')
  //     .then(response => response.text()),
  // authenticate() {
  //   window.location.href = `/login/github?${qliktiveRedirectParam}`;
  // },
  // localAuthenticate(username, password) {
  //   window.location.href =
  // `/login/local/callback?username=${username}&password=${password}&${qliktiveRedirectParam}`;
  // },
  // signout(cb) {
  //   fetch('/logout', {
  //     credentials: 'same-origin',
  //   }).then(cb);
  // },
};

// Main component responsible for rendering the routes when
// the path matches the route.
const Main = ({ notAuthorizedCallback }) => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <PrivateRoute path="/app" component={App} isAuthenticated notAuthorizedCallback={notAuthorizedCallback} />
    </Switch>
  </main>
);

Main.propTypes = {
  notAuthorizedCallback: PropTypes.func,
};

Main.defaultProps = {
  notAuthorizedCallback: () => { },
};

class ThePage extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      authMode: 'local',
      isAuthenticated: true,
      dialogIsOpen: false,
      cookieAccepted: document.cookie.indexOf('apqlikcoreaccept') !== -1,
    };

    // auth.idp.then((authMode) => {
    //   this.setState({ authMode });
    // });

    // auth.isAuthenticated.then((authenticated) => {
    //   this.setState({ isAuthenticated: authenticated });
    // });
  }

  signinClicked = () => {
    const { authMode } = this.state;
    if (authMode === 'local') {
      this.setState({ dialogIsOpen: true });
    } else if (authMode === 'github') {
      auth.authenticate();
    }
  }

  signoutClicked = () => {
    auth.signout(() => { this.setState({ isAuthenticated: false }); });
  }

  notAuthorizedCallback = () => {
    const { authMode } = this.state;
    if (authMode === 'local') {
      this.setState({ dialogIsOpen: true });
    } else if (authMode === 'github') {
      alert('Please sign in to access this page'); // eslint-disable-line no-alert
    }
  }

  cancelLoginClicked = () => {
    this.setState({ dialogIsOpen: false });
  }

  loginClicked = (username, password) => {
    auth.localAuthenticate(username, password);
  }

  acceptClicked = () => {
    const cookie = `apqlikcoreaccept=true; expires=${new Date('2050-01-01').toUTCString()}; path=/`;
    document.cookie = cookie;
    this.setState({ cookieAccepted: true });
  }

  navigateToLandingPage = () => {
    window.location.replace('#/');
  }

  navigateToAppPage = () => {
    window.location.replace('#/app');
  }

  render() {
    const { isAuthenticated, dialogIsOpen, cookieAccepted } = this.state;
    if (isAuthenticated === null) {
      return null;
    }

    const titleStyle = {
      color: 'white',
      fontSize: '24px',
    };

    return (
      <div>
        <AppBar position="relative" className="ca-app-bar">
          <Toolbar>
            <div className="pointer app-bar-title">
              <Typography style={titleStyle}>
                Qlik Core
              </Typography>
              <span className="app-bar-title-dash">
                {' '}
 /
              </span>
              <span className="app-bar-subtitle">
                {' '}
 Assisted Prescription
              </span>
            </div>
            <div style={
             {
               marginTop: '6px',
               marginRight: '0px',
               marginLeft: 'auto',
             }}
            >
              <Button className="app-bar-button" onClick={this.navigateToAppPage}>App</Button>
              {
              isAuthenticated
                ? (<Button className="app-bar-button" onClick={this.signoutClicked}>Sign Out</Button>)
                : (<Button className="app-bar-button" onClick={this.signinClicked}>Sign In</Button>)
              }
            </div>
          </Toolbar>
        </AppBar>
        <Main
          isAuthenticated={isAuthenticated}
          notAuthorizedCallback={this.notAuthorizedCallback}
        />
        <Login
          open={dialogIsOpen}
          onCancel={this.cancelLoginClicked}
          onLogin={this.loginClicked}
        />
        <AcceptCookies
          open={!cookieAccepted}
          onAccept={this.acceptClicked}
        />
      </div>
    );
  }
}

ReactDOM.render(
  // <MuiThemeProvider>
  <HashRouter>
    <ThePage />
  </HashRouter>,
  // </MuiThemeProvider>,
  document.getElementById('root'),
);
