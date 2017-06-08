import React from 'react';
import PropTypes from 'prop-types';
import Chart from './chart.jsx';

class Picasso extends Chart {
  constructor(...args) {
    super(...args);
    // requires this.state.definition and this.state.settings
  }

  renderPicasso() {
    if (this.state.current === Chart.STATE.valid) {
      const layout = this.state.layout;

      var data = {
          type: "q",
          data: layout
      };

      const pic = picasso.chart({
          element: this.container,
          data: data,
          settings: this.state.settings
      });

      pic.brush('highlight').on('update', (added, removed) => {
        const selections = picassoQ.qBrushHelper(pic.brush('highlight'));
        this.state.model[selections[0].method](...selections[0].params);
      });
    }
  }

  render() {
    if (this.state.current === Chart.STATE.initializing) {
      return (
        <div className='card-panel chart'>
          <p>Initializing...</p>
        </div>
      );
    }
    if (this.state.current === Chart.STATE.error) {
      const msg = this.state.error instanceof Event ?
        'Failed to establish a connection to an Engine' :
        this.state.error.message;
      return (
        <div className='card-panel chart'>
          <p>Failed to render chart: {msg}</p>
        </div>
      );
    }

    // we need to have the `this.container` reference available when rendering:
    setTimeout(() => this.renderPicasso());

    return (<div className='picassochart' ref={(elem) => { this.container = elem; }}></div>);
  }
}

Picasso.propTypes = {
};

export default Picasso;
