import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

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

    const sStyle = {
      background: '#52cc52',
      color: '#ffffff',
    };

    const xStyle = {
      background: '#a9a9a9',
      color: '#000000',
    };

    // Needed to be able to override default element styles that got higher importance than classes
    function getStyle(item) {
      let style = {};

      if (item.qState === 'S') {
        style = sStyle;
      } else if (item.qState === 'X') {
        style = xStyle;
      }

      return style;
    }


    const items = this.state.layout.qListObject.qDataPages[0].qMatrix.map((matrixItem) => {
      const item = matrixItem[0];
      const classes = `item state-${item.qState}`;
      return (
        <ListItem
          key={item.qElemNumber}
          className={classes}
          style={getStyle(item)}
          primaryText={item.qText}
          onClick={() => this.toggleValue(item)}
        />
      );
    });

    return (
      <ListItem
        primaryText={this.props.title}
        nestedItems={items}
      />
    );
  }
}

Filterbox.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Filterbox;
