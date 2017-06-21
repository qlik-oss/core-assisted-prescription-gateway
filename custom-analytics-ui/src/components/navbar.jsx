import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';

export default function TopNavbar({ isAuthenticated, signinClicked, signoutClicked }) {
  // add className="active" to <li> to highlight current page:
  return (
    <nav className="topnav">
      <div className="nav-wrapper">
        <a href="#/" className="brand-logo left">Qliktive - Assisted Prescription</a>
        <ul className="right">
          <li><a href="#/app">App</a></li>
          {(isAuthenticated) ?
            (<li> <a href="#/" onClick={signoutClicked}>Sign out</a></li>)
            : (<li> <a href="#/" onClick={signinClicked}>Sign in</a></li>)
          }
        </ul>
      </div>
    </nav>
  );
}

TopNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signinClicked: PropTypes.func.isRequired,
  signoutClicked: PropTypes.func.isRequired,
};
