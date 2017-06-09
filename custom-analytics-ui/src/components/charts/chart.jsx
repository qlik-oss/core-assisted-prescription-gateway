import React from 'react';
import PropTypes from 'prop-types';

class Chart extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      current: Chart.STATE.initializing,
      layout: null,
      error: null,
      model: null,
    };
  }

  componentDidMount() {
    const fail = (error) => {
      this.setState({
        current: Chart.STATE.error,
        layout: null,
        error,
      });
    };

    const update = () => {
      this.state.model.getLayout().then((layout) => {
        // TODO: this only works for listobjects:
        if (layout.qListObject && layout.qListObject.qDimensionInfo.qError) {
          // generalize error:
          fail({ message: `Could not find field: ${this.props.field}` });
        } else {
          this.setState({
            current: Chart.STATE.valid,
            layout,
            error: null,
          });
        }
      }).catch(fail);
    };

    this.props.app.createSessionObject(this.state.definition).then((model) => {
      this.setState({ model });
      model.on('changed', update);
      model.emit('changed');
    })
    .catch(fail);
  }
}

Chart.propTypes = {
  field: PropTypes.string,
  app: PropTypes.object.isRequired,
};

Chart.defaultProps = {
  field: '',
  app: null,
};

Chart.STATE = {
  initializing: 0,
  valid: 1,
  error: 2,
};

export default Chart;
