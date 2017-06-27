import React from 'react';
import PropTypes from 'prop-types';
import Chart from './chart';
import './filterbox.css';

class Filterbox extends Chart {
  constructor(...args) {
    super(...args);

    this.state.isOpen = false;

    this.state.definition = {
      qInfo: {
        qType: 'react-filterbox',
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
            qSortByLoadOrder: 1,
          }],
        },
        qShowAlternatives: true,
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 0,
          qHeight: 10000,
        }],
      },
    };
  }

  toggleValue(item) {
    this.state.model.selectListObjectValues('/qListObjectDef', [item.qElemNumber], true);
  }

  handleMouseDown = (event) => {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    if (this.state.error) {
      const msg = this.state.error instanceof Event ?
        'Failed to establish a connection to an Engine' :
        this.state.error.message;
      return (
        <div className="card-panel filterbox">
          <p>Failed to render filterbox: {msg}</p>
        </div>
      );
    }

    if (!this.state.layout) {
      return (
        <div className="card-panel filterbox">
          <p>Initializing...</p>
        </div>
      );
    }

    const items = this.state.layout.qListObject.qDataPages[0].qMatrix.map((matrixItem) => {
      const item = matrixItem[0];
      const classes = `item state-${item.qState}`;
      return (
        <li key={item.qElemNumber}>
          <a className={classes} onClick={() => this.toggleValue(item)}>{item.qText}</a>
        </li>
      );
    });

    return (
      <div className="card-item">
        <div className="filterbox-root">
          <div className="filterbox-control" onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
            <div>
              {this.props.title}
            </div>
            <span className="filterbox-arrow" />
          </div>
          {this.state.isOpen ? <ul className="filterbox filterbox-menu">{items}</ul> : null}
        </div>
        <div className="divider" />
      </div>
    );
  }
}

Filterbox.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Filterbox;
