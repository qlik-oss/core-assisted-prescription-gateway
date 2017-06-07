import React from 'react';
import ReactDOM from 'react-dom';

export default class Card extends React.Component {

    render() {
        return (
            <div id={this.props.id} className='card-panel'>
                <h5>{this.props.title}</h5>
                <div className='picassochart'></div>
            </div>
        );
    }
}