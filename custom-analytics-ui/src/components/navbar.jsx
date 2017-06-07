import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, NavItem} from 'react-materialize';

export default class TopNavbar extends React.Component {
    render() {
        return <Navbar brand='Assisted Prescription' className='blue z-depth-0' right >
            <NavItem href='https://react-materialize.github.io/#/navbar'>Getting started</NavItem>
            <NavItem href=''>Logout</NavItem>
        </Navbar>
    }
}