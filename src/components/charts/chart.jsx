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

  componentDidMount() {
    this.createModel();
    window.addEventListener('resize', this.handleResize.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this), false);
  }

  handleResize() {
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this.update();
      }, 100);
    }
  }

  createModel() {
    const { app } = this.props;
    const { definition } = this.state;
    app.createSessionObject(definition).then((model) => {
      this.setState({ model, error: null });
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
    const { model } = this.state;
    model.getLayout().then((layout) => {
      // TODO: this only works for listobjects:
      if (layout.qListObject && layout.qListObject.qDimensionInfo.qError) {
        // generalize error:
        const { field } = this.props;
        this.fail({ message: `Could not find field: ${field}` });
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
};

export default Chart;
