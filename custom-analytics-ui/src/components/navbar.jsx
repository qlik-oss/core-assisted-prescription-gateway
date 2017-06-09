import React from 'react';
import { Navbar, NavItem } from 'react-materialize';

export default function TopNavbar() {
  return (<Navbar brand="Qliktive - Assisted Prescription" className="blue z-depth-0" right >
    <NavItem href="/">Home</NavItem>
    <NavItem href="/#app">App</NavItem>
    <NavItem href="http://www.qlik.com">About</NavItem>
    <NavItem href="">Sign in</NavItem>
  </Navbar>);
}
