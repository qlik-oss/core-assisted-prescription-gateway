import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-materialize';
import paintChart from '../charts/chart';
import paintReactionsChart from '../charts/reactions';
import paintDeathsChart from '../charts/deaths';

function loadChart(tabNbr) {
    switch (tabNbr) {
        case 0:
            paintReactionsChart(document.querySelector(`#tab_${tabNbr} .chartpic`));
            break;
        case 1:
            paintChart(document.querySelector(`#tab_${tabNbr} .chartpic`));
            break;
        case 2:
            paintDeathsChart(document.querySelector(`#tab_${tabNbr} .chartpic`));
    }
}

class ChartTabs extends React.Component {
    render() {
        return <Tabs onChange={loadChart}>
            <Tab title='reactions' tabWidth={3}><TabContent tabId='tab_0' chart='reaction'></TabContent></Tab>
            <Tab title='therapy' tabWidth={3} active><TabContent tabId='tab_1'></TabContent></Tab>
            <Tab title='risk' tabWidth={3}><TabContent tabId='tab_2' chart='deaths'></TabContent></Tab>
        </Tabs>
    }
}

class TabContent extends React.Component {

    render() {
        return <div className='chartpic'></div>
    }

    componentDidMount() {
        switch (this.props.chart) {
            case 'reaction':
                paintReactionsChart(document.querySelector(`#${this.props.tabId} .chartpic`));
                break;
            case 'deaths':
                paintDeathsChart(document.querySelector(`#${this.props.tabId} .chartpic`));
                break;
            default:
                paintChart(document.querySelector(`#${this.props.tabId} .chartpic`));
        }
    }
}

ReactDOM.render(<ChartTabs />, document.querySelector('.chart-tab'));