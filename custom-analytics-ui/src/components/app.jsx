import React from 'react';
import TopNavbar from './navbar.jsx';
import paintCharts from '../charts/charts';

export default class App extends React.Component {

    render() {
        return (
            <div className='main blue lighten-3'>
                <nav className='blue' >
                    <div className='navbar container'>
                        <TopNavbar></TopNavbar>
                    </div>
                </nav>
                <main>
                    <div className='row'>
                        <div className='col s3'>
                            <div className='section'>
                                <div className='card-panel'>
                                    <h5>Filters</h5>
                                    <div className='divider'></div>
                                    <h6>Demographics</h6>
                                </div>
                            </div>
                        </div>
                        <div className='col s8'>
                            <div id='charts' className='section scrollspy'>
                                <div id='reactions' className='card-panel'>
                                    <h5>Reactions</h5>
                                    <div className='chartpic'></div>
                                </div>
                                <div id='therapy' className='card-panel'>
                                    <h5>Therapy</h5>
                                    <div className='chartpic'></div>
                                </div>
                                <div id='risk' className='card-panel'>
                                    <h5>Risk Assessment</h5>
                                    <div className='chartpic'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        )
    }

    componentDidMount() {
        paintCharts(document.querySelector('#reactions .chartpic'),
            document.querySelector('#therapy .chartpic'), document.querySelector('#risk .chartpic'));
    }
}