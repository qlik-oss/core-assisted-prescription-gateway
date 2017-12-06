import React from 'react';
import PropTypes from 'prop-types';

class Chart extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      layout: null,
      error: null,
      model: null,
    };
  }

  handleResize() {
    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(function() {
        this.resizeTimeout = null;
        this.update();
      }.bind(this), 100);
    }
  }

  componentDidMount() {
    this.createModel();
    window.addEventListener('resize', this.handleResize.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this), false);
  }

  createModel() {
    this.props.app.createSessionObject(this.state.definition).then((model) => {
      this.setState({ model });
      model.on('changed', () => this.update());
      model.on('closed', () => this.createModel());
      model.emit('changed');
    }).catch(err => this.fail(err));
  }

  fail(error) {
    this.setState({
      layout: null,
      error,
    });
  }

  update() {
    this.state.model.getLayout().then((layout) => {
      // TODO: this only works for listobjects:
      if (layout.qListObject && layout.qListObject.qDimensionInfo.qError) {
        // generalize error:
        this.fail({ message: `Could not find field: ${this.props.field}` });
      } else {
        this.setState({
          layout,
          error: null,
        });
      }
    }).catch(err => this.fail(err));
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

export default Chart;
