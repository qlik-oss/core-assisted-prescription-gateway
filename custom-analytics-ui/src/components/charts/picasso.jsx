import React from 'react';
import * as picasso from '@qlik/picasso/dist/picasso';
import picassoQ from '@qlik/picasso/plugins/q/dist/picasso-q';
import Chart from './chart';
import './picasso.css';

class Picasso extends Chart {
  renderPicasso() {
    const layout = this.state.layout;

    const data = {
      type: 'q',
      data: layout,
    };

    if (!this.state.pic) {
      const pic = picasso.chart({
        element: this.container,
        data,
        settings: this.state.settings,
      });

      pic.brush('highlight').on('update', () => {
        const selections = picassoQ.qBrushHelper(pic.brush('highlight'));

        if (selections[0].method !== 'resetMadeSelections') {
          this.state.model[selections[0].method](...selections[0].params);
        }
      });
      this.setState({ pic });
    } else {
      this.state.pic.update({ data });
    }
  }

  render() {
    if (this.state.error) {
      const msg = this.state.error instanceof Event ?
        'Failed to establish a connection to an Engine' :
        this.state.error.message;
      return (
        <div className="picasso-chart">
          <div>Failed to render chart: {msg}</div>
        </div>
      );
    }

    if (!this.state.layout) {
      return (
        <div className="picasso-chart">
          <div>Initializing...</div>
        </div>
      );
    }

    // we need to have the `this.container` reference available when rendering:
    setTimeout(() => this.renderPicasso());

    return (<div className="picasso-chart" ref={(elem) => { this.container = elem; }} />);
  }
}

export default Picasso;
