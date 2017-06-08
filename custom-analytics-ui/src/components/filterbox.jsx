import React from 'react';
import PropTypes from 'prop-types';
import enigma from 'enigma.js';
import config from './../enigma-config';
import TopNavbar from './navbar.jsx';
import paintCharts from '../charts/charts';


const STATE = {
  initializing: 0,
  valid: 1,
  error: 2
};

class Filterbox extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      current: STATE.initializing,
      layout: null,
      error: null
    };
  }

  componentDidMount() {
    const fail = (error) => {
      this.setState({
        current: STATE.error,
        layout: null,
        error
      });
    };

    const update = () => {
      this.model.getLayout().then((layout) => {
        const error = layout.qListObject.qDimensionInfo.qError;
        if (error) {
          // generalize error:
          fail({ message: `Could not find field: ${this.props.field}` });
        } else {
          this.setState({
            current: STATE.valid,
            layout,
            error: null
          });
        }
      }).catch(fail);
    };

    const definition = {
      qInfo: {
        qType: "react-filterbox"
      },
      qListObjectDef: {
        qDef: {
          qFieldLabels: [this.props.field],
          qFieldDefs: [this.props.field],
          autoSort: true,
          qSortCriterias: [{
            qSortByState: 1,
            qSortByAscii: 1,
            qSortByNumeric: 1,
            qSortByLoadOrder: 1
          }]
        },
        qShowAlternatives: true,
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 0,
          qHeight: 10000
        }]
      }
    };

    this.modelPromise = enigma.getService('qix', config)
      .then(qix => qix.global.getActiveDoc())
      .then(app => app.createSessionObject(definition))
      .then((model) => {
        this.model = model;
        model.on('changed', update);
        model.emit('changed');
      })
      .catch(fail);
  }

  render() {
    if (this.state.current === STATE.initializing) {
      return (
        <div className='card-panel filterbox'>
          <p>Initializing...</p>
        </div>
      );
    }
    if (this.state.current === STATE.error) {
      const msg = this.state.error instanceof Event ?
        'Failed to establish a connection to an Engine' :
        this.state.error.message;
      return (
        <div className='card-panel filterbox'>
          <p>Failed to render filterbox: {msg}</p>
        </div>
      );
    }
    const items = this.state.layout.qListObject.qDataPages[0].qMatrix.map((item) => {
      return (
        <li key={item[0].qText} className='item'>{item[0].qText}</li>
      );
    });
    return (
      <div className='card-panel'>
        <h5>{this.props.field}</h5>
        <ul className='filterbox'>
          {items}
        </ul>
      </div>
    );
  }
}

Filterbox.propTypes = {
  app: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired
};

export default Filterbox;
