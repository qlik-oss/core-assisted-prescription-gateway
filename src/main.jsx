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
import LandingPage from './components/landingPage';
import App from './components/app';
import PrivateRoute from './components/privateRoute';

import './main.css';

picasso.use(picassoQ);

const auth = {

  isAuthenticated:
    fetch(`${process.env.AUTH_DOMAIN}/oauth2/auth`, {
      credentials: 'include',
      mode: 'cors',
    }).then(response => response.status === 202,
    ),
  authenticate() {
    window.location.href = `${process.env.AUTH_DOMAIN}/oauth2/start?rd=${process.env.CALLBACK_URL}`;
  },
  signout(cb) {
    fetch(`${process.env.AUTH_DOMAIN}/oauth2/sign_in`, {
      mode: 'cors',
      credentials: 'include',
    }).then(cb);
  },
};

// Main component responsible for rendering the routes when
// the path matches the route.
const Main = ({ isAuthenticated, notAuthorizedCallback }) => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <PrivateRoute path="/app" component={App} isAuthenticated={isAuthenticated} notAuthorizedCallback={notAuthorizedCallback} />
    </Switch>
  </main>
);

Main.propTypes = {
  notAuthorizedCallback: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Main.defaultProps = {
  notAuthorizedCallback: () => { },
  isAuthenticated: false,
};

class ThePage extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isAuthenticated: false,
      dialogIsOpen: false,
    };

    auth.isAuthenticated.then((authenticated) => {
      this.setState({ isAuthenticated: authenticated });
    });
  }

  signinClicked = () => {
    auth.authenticate();
  }

  signoutClicked = () => {
    auth.signout(() => { this.setState({ isAuthenticated: false }); });
  }

  notAuthorizedCallback = () => {
    alert('Please sign in to get access to this page'); // eslint-disable-line no-alert
  }

  navigateToLandingPage = () => {
    window.location.replace('#/');
  }

  navigateToAppPage = () => {
    window.location.replace('#/app');
  }

  render() {
    const { isAuthenticated } = this.state;
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
