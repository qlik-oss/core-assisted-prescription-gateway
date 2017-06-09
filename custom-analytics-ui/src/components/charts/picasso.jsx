/* global picasso, picassoQ */
import React from 'react';
import Chart from './chart';

class Picasso extends Chart {
  renderPicasso() {
    if (this.state.current === Chart.STATE.valid) {
      const layout = this.state.layout;

      const data = {
        type: 'q',
        data: layout,
      };

      const pic = picasso.chart({
        element: this.container,
        data,
        settings: this.state.settings,
      });

      pic.brush('highlight').on('update', () => {
        const selections = picassoQ.qBrushHelper(pic.brush('highlight'));
        this.state.model[selections[0].method](...selections[0].params);
      });
    }
  }

  render() {
    if (this.state.current === Chart.STATE.initializing) {
      return (
        <div className="card-panel chart">
          <p>Initializing...</p>
        </div>
      );
    }
    if (this.state.current === Chart.STATE.error) {
      const msg = this.state.error instanceof Event ?
        'Failed to establish a connection to an Engine' :
        this.state.error.message;
      return (
        <div className="card-panel chart">
          <p>Failed to render chart: {msg}</p>
        </div>
      );
    }

    // we need to have the `this.container` reference available when rendering:
    setTimeout(() => this.renderPicasso());

    return (<div className="picassochart" ref={(elem) => { this.container = elem; }} />);
  }
}

export default Picasso;
