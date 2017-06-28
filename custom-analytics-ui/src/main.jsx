import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as picasso from '@qlik/picasso/dist/picasso';
import hammerjs from 'hammerjs'; /* eslint no-unused-vars:0 */
import picassoHammer from '@qlik/picasso/plugins/hammer/dist/picasso-hammer';
import picassoQ from '@qlik/picasso/plugins/q/dist/picasso-q';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import App from './components/app';
import Login from './components/login';
import PrivateRoute from './components/privateRoute';

import './main.css';

picasso.use(picassoHammer);
picasso.use(picassoQ);

const auth = {

  isAuthenticated:
    fetch('/is-authenticated', {
      credentials: 'same-origin',
    }).then(response => response.json()),
  idp:
    fetch('/idp')
      .then(response => response.text()),
  authenticate() {
    window.location.href = '/login/github';
  },
  localAuthenticate(username, password) {
    window.location.href = `/login/local/callback?username=${username}&password=${password}`;
  },
  signout(cb) {
    fetch('/logout', {
      credentials: 'same-origin',
    }).then((response) => {
      cb();
    });
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
  isAuthenticated: PropTypes.bool.isRequired,
  notAuthorizedCallback: PropTypes.func,
};

Main.defaultProps = {
  notAuthorizedCallback: () => { },
};

class ThePage extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = { authMode: null, isAuthenticated: null, dialogIsOpen: false };

    auth.idp.then((authMode) => {
      this.setState({ authMode });
    });

    auth.isAuthenticated.then((authenticated) => {
      this.setState({ isAuthenticated: authenticated });
    });
  }

  signinClicked = () => {
    if (this.state.authMode === 'local') {
      this.setState({ dialogIsOpen: true });
    } else if (this.state.authMode === 'github') {
      auth.authenticate();
    }
  }

  signoutClicked = () => {
    auth.signout(() => { this.setState({ isAuthenticated: false }); });
  }

  notAuthorizedCallback = () => {
    if (this.state.authMode === 'local') {
      this.setState({ dialogIsOpen: true });
    } else if (this.state.authMode === 'github') {
      alert('Please sign in to access this page'); // eslint-disable-line no-alert
    }
  }

  cancelLoginClicked = () => {
    this.setState({ dialogIsOpen: false });
  }

  loginClicked = (username, password) => {
    auth.localAuthenticate(username, password);
  }

  render() {
    if (this.state.isAuthenticated === null) {
      return null;
    }
    return (
      <div id="the-page">
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          signinClicked={this.signinClicked}
          signoutClicked={this.signoutClicked}
        />
        <Main
          isAuthenticated={this.state.isAuthenticated}
          notAuthorizedCallback={this.notAuthorizedCallback}
        />
        <Login
          open={this.state.dialogIsOpen}
          onCancel={this.cancelLoginClicked}
          onLogin={this.loginClicked}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter>
      <ThePage />
    </HashRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
