import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Navbar, NavItem } from 'react-materialize';

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className='landing' style={{ backgroundImage: 'url(http://usersthink.com/wp-content/uploads/55-usersthink-stock-image.jpg)' }}>
                    <div className='content white-text right-align'>
                        <h2>Insights for prescriptions <br /> at your fingertips</h2>
                        <p>Save more lives, time and money</p>
                        <Button className='green' waves='light' onClick={handleButtonClick}>Get started</Button>
                    </div>
                </div>
            </div>
        );
    }
}

function handleButtonClick() {
    window.location = '/#app/';
}

export default LandingPage;
