import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, NavItem} from 'react-materialize';

class TopNavbar extends React.Component {
    render() {
        return <Navbar brand='Qliktive - Assisted Prescription' className='blue z-depth-0' right >
            <NavItem href='/'>Home</NavItem>
            <NavItem href='/#app'>App</NavItem>
            <NavItem href='http://www.qlik.com'>About</NavItem>
            <NavItem href=''>Sign in</NavItem>
        </Navbar>
    }
}

export default TopNavbar;