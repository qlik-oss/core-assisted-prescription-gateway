import React from 'react';
import TopNavbar from './navbar.jsx';
import Filterbox from './filterbox.jsx';
import Card from './card.jsx';
import paintCharts from '../charts/charts';

export default class App extends React.Component {

    render() {
        return (
            <div className='main blue lighten-3'>
                    <div className='row'>
                        <div className='col s3'>
                            <div className='section'>
                                <div className='card-panel'>
                                    <h5>Filters</h5>
                                    <Filterbox app={{}} field='Country'></Filterbox>
                                    <div className='divider'></div>
                                    <h6>Demographics</h6>
                                </div>
                            </div>
                        </div>
                        <div className='col s8'>
                            <div id='charts' className='section scrollspy'>
                                <Card id='reactions' title='Reactions'></Card>
                                <Card id='therapy' title='Therapy'></Card>
                                <Card id='risk' title='Risk Assessment'></Card>
                                </div>
                            </div>
                        </div>
            </div >
        )
    }

    componentDidMount() {
        paintCharts(document.querySelector('#reactions .picassochart'),
            document.querySelector('#therapy .picassochart'), document.querySelector('#risk .picassochart'));
    }
}