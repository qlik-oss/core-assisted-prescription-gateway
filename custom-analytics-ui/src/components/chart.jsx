import React from 'react';
import PropTypes from 'prop-types';
import enigma from 'enigma.js';
import config from './../enigma-config';

class Chart extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      current: Chart.STATE.initializing,
      layout: null,
      error: null
    };
  }

  componentDidMount() {
    if (!this.state.definition) {
      throw new Error('No definition defined in state');
    }

    const fail = (error) => {
      this.setState({
        current: Chart.STATE.error,
        layout: null,
        error
      });
    };

    const update = () => {
      this.model.getLayout().then((layout) => {
        // TODO: this only works for listobjects:
        const error = layout.qListObject.qDimensionInfo.qError;
        if (error) {
          // generalize error:
          fail({ message: `Could not find field: ${this.props.field}` });
        } else {
          this.setState({
            current: Chart.STATE.valid,
            layout,
            error: null
          });
        }
      }).catch(fail);
    };

    enigma.getService('qix', config)
      .then(qix => qix.global.getActiveDoc())
      .then((app) => {
        this.app = app;
        return app.createSessionObject(this.state.definition);
      })
      .then((model) => {
        this.model = model;
        model.on('changed', update);
        model.emit('changed');
      })
      .catch(fail);
  }
}

Chart.STATE = {
  initializing: 0,
  valid: 1,
  error: 2
};

export default Chart;
