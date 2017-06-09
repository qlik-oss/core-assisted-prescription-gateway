import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import App from './components/app';

// Main component responsible for rendering the routes when
// the path matches the route.
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/app" component={App} />
    </Switch>
  </main>
);

const ThePage = () => (
  <div>
    <Navbar />
    <Main />
  </div>
);

ReactDOM.render(
  <HashRouter>
    <ThePage />
  </HashRouter>,
    document.getElementById('root'),
);
