import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';
import { colors } from '../../ui-constants';
import Chart from './chart';

const focusStyle = {
  sStyle: {
    backgroundColor: colors.darkGreen,
    color: '#ffffff',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: colors.green,
    },
  },
  xStyle: {
    backgroundColor: '#a9a9a9',
    color: '#000000',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
};

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

    this.setState(oldState => Object.assign({}, oldState, { isOpen: !oldState.isOpen }));
  }

  handleClick = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { classes } = this.props;

    if (this.state.error) {
      const msg = this.state.error instanceof Event
        ? 'Failed to establish a connection to an Engine'
        : this.state.error.message;
      return (
        <div className="card-panel filterbox">
          <p>
Failed to render filterbox:
            {msg}
          </p>
        </div>
      );
    }

    if (!this.state.layout) {
      return (
        <div className="card-panel filterbox">
          <p>
Initializing...
          </p>
        </div>
      );
    }

    function getStyle(item) {
      let style = '';

      if (item.qState === 'S') {
        style = classes.sStyle;
      } else if (item.qState === 'X') {
        style = classes.xStyle;
      }

      return style;
    }

    const items = this.state.layout.qListObject.qDataPages[0].qMatrix.map((matrixItem) => {
      const item = matrixItem[0];
      const listItemStyle = getStyle(item);
      return (
        <ListItem
          button
          disableGutters
          classes={{ root: listItemStyle }}
          key={item.qElemNumber}
          onClick={() => this.toggleValue(item)}
        >
          <ListItemText inset primary={item.qText.replace('<= x <', ' → ')} />
        </ListItem>
      );
    });

    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary={this.props.title} />
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.isOpen} unmountOnExit>
          <List>
            {items}
          </List>
        </Collapse>
      </div>
    );
  }
}

Filterbox.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(focusStyle)(Filterbox);
