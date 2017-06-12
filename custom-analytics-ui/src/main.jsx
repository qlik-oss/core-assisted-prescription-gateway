import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import * as picasso from '@qlik/picasso/dist/picasso';
import hammerjs from 'hammerjs'; /* eslint no-unused-vars:0 */
import picassoHammer from '@qlik/picasso/plugins/hammer/dist/picasso-hammer';
import picassoQ from '@qlik/picasso/plugins/q/dist/picasso-q';

import 'materialize-css/bin/materialize.css';

import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import App from './components/app';

import './main.css';

picasso.use(picassoHammer);
picasso.use(picassoQ);

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
