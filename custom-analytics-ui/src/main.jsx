import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as picasso from '@qlik/picasso/dist/picasso';
import hammerjs from 'hammerjs'; /* eslint no-unused-vars:0 */
import picassoHammer from '@qlik/picasso/plugins/hammer/dist/picasso-hammer';
import picassoQ from '@qlik/picasso/plugins/q/dist/picasso-q';

//import 'materialize-css/bin/materialize.css';

import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import App from './components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './main.css';

picasso.use(picassoHammer);
picasso.use(picassoQ);

// Main component responsible for rendering the routes when
// the path matches the route.
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <PrivateRoute path="/app" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
);

const ThePage = () => (
  <div>
    <Navbar fakeAuth={fakeAuth}/>
    <Main />
  </div>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }
 render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
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
