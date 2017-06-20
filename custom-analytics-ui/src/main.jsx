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

import './main.css';

picasso.use(picassoHammer);
picasso.use(picassoQ);

const auth = {

  isAuthenticated:
  fetch('/isAuthenticated/', {
    credentials: 'same-origin'
  }).then((response) => {
    if (response.status == 204) { return true; }
    return false;
  }),
  authenticate(cb) {
    window.location.href = 'http://localhost/login/github';
    cb();
  },
  signout(cb) {
    fetch('/logout').then((response) => {
      cb();
    });
  }
}

function requireAuth(nextState, replace) {
  auth.isAuthenticated().then((authenticated) => {
    if (!authenticated) {
      replace({
        pathname: '#/'
      })
    }
  });
}

// Main component responsible for rendering the routes when
// the path matches the route.
class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute path="/app" component={App} isAuthenticated={this.props.isAuthenticated} />
        </Switch>
      </main>
    );
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
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
        <Navbar isAuthenticated={this.state.isAuthenticated} signinClicked={(e) => this.setState({ dialogIsOpen: true })} signoutClicked={(e) => auth.signout(() => { this.setState({ isAuthenticated: false }) })} />
        <Main isAuthenticated={this.state.isAuthenticated} />
        <Login open={this.state.dialogIsOpen} auth={auth} onCancel={(e) => this.setState({ dialogIsOpen: false })} onLogin={(e) => auth.authenticate(() => { this.setState({ dialogIsOpen: false }) })} />
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated: isAuthenticated }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  location: null,
};

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter>
      <ThePage />
    </HashRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
