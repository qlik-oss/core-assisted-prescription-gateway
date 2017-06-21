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
  fetch('/isAuthenticated', {
    credentials: 'same-origin',
  }).then(response => response.ok),
  authenticate(cb) {
    window.location.href = '/login/github';
    cb();
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
  notAuthorizedCallback: () => {},
};

class ThePage extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = { isAuthenticated: null, dialogIsOpen: false };

    auth.isAuthenticated.then((authenticated) => {
      this.setState({ isAuthenticated: authenticated });
    });
  }

  render() {
    if (this.state.isAuthenticated === null) {
      return null;
    }
    return (
      <div>
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          signinClicked={e => this.setState({ dialogIsOpen: true })}
          signoutClicked={e => auth.signout(() => { this.setState({ isAuthenticated: false }); })}
        />
        <Main
          isAuthenticated={this.state.isAuthenticated}
          notAuthorizedCallback={() => { this.setState({ dialogIsOpen: true }); }}
        />
        <Login
          open={this.state.dialogIsOpen}
          onCancel={e => this.setState({ dialogIsOpen: false })}
          onLogin={e => auth.authenticate(() => { this.setState({ dialogIsOpen: false }); })}
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
