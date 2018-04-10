import React from 'react';
import enigma from 'enigma.js';

import Dashboard from './dashboard';
import Closed from './closed';
import Suspended from './suspended';
import TimedOut from './timedOut';
import config from '../enigma-config';
import './app.css';

const RETRY_MAX_COUNT = 10;
const RETRY_DELAY = 5000;
const IDLE_TIMEOUT = 3 * (60 * 60 * 1000); // 3 hours of timeout

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    const session = enigma.create(config);
    session.on('closed', () => this.setState({ view: 'closed' }));
    session.on('suspended', () => this.maybeResume());
    session.on('traffic:sent', () => { this.setState({ lastActivityDate: new Date() }); });
    session.open()
      .then(global => global.getActiveDoc())
      .then(app => this.setState({ view: 'app', app }))
      .catch(() => this.setState({ view: 'suspended' }));

    this.state = {
      retries: 0,
      lastActivityDate: new Date(),
      session,
    };
  }

  maybeResume = () => {
    if ((new Date() - this.state.lastActivityDate) >= IDLE_TIMEOUT) {
      this.setState({ view: 'timedOut' });
    } else if (this.state.retries < RETRY_MAX_COUNT) {
      this.setState(prev => ({ view: 'suspended', app: prev.app, retries: prev.retries + 1 }));
      // we should retry until reaching max connection tries:
      setTimeout(() => {
        this.state.session.resume().then(() => {
          this.setState({ view: 'app', retries: 0 });
        }).catch(() => this.maybeResume());
      }, RETRY_DELAY);
    } else {
      // they weren't idle long enough and we couldn't reestablish a
      // session, fail gracefully:
      this.setState({ view: 'closed' });
    }
  }

  render() {
    if (this.state.view === 'app') {
      return (
        <div className="main app-background">
          <div className="row">
            <div className="section">
              <Dashboard app={this.state.app} />
            </div>
          </div>
        </div>
      );
    } else if (this.state.view === 'suspended') {
      return (
        <div className="main app-background">
          <div className="row">
            <div className="section">
              <Suspended retries={this.state.retries} maxRetries={RETRY_MAX_COUNT} />
            </div>
          </div>
        </div>
      );
    } else if (this.state.view === 'timedOut') {
      return (
        <div className="main app-background">
          <div className="row">
            <div className="section">
              <TimedOut />
            </div>
          </div>
        </div>
      );
    } else if (this.state.view === 'closed') {
      return (
        <div className="main app-background">
          <div className="row">
            <div className="section">
              <Closed />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
