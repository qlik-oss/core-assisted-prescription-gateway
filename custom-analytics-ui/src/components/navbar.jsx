import React from 'react';
import PropTypes from 'prop-types';
import Login from './login';
import './navbar.css';

class TopNavbar extends React.Component {

  render() {
    // add className="active" to <li> to highlight current page:
    return (<nav className="topnav">
      <div className="nav-wrapper">
        <a href="#/" className="brand-logo left">Qliktive - Assisted Prescription</a>
        <ul className="right">
          <li><a href="#/app">App</a></li>
          {(this.props.isAuthenticated) ?
            (<li> <a href="#/" onClick={this.props.signoutClicked}>Sign out</a></li>)
            : (<li> <a href="#/" onClick={this.props.signinClicked}>Sign in</a></li>)
          }
        </ul>
      </div>
    </nav>
    );
  }
}

TopNavbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  signinClicked: PropTypes.func.isRequired,
  signoutClicked: PropTypes.func.isRequired,
};

export default TopNavbar;
