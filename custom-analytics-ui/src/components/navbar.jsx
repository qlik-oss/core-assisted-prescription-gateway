import React from 'react';
import './navbar.css';

export default function TopNavbar() {
  // add className="active" to <li> to highlight current page:
  return (<nav className="blue z-depth-0">
    <div className="nav-wrapper">
      <a href="#/" className="brand-logo left">Qliktive - Assisted Prescription</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#/app">App</a></li>
        <li><a href="#/sign-in">Sign in</a></li>
      </ul>
    </div>
  </nav>);
}
