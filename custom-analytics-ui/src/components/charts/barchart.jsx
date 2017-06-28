import merge from 'deep-extend';
import PropTypes from 'prop-types';
import Picasso from './picasso';

class Barchart extends Picasso {
  constructor(...args) {
    super(...args);

    this.state.definition = {
      qInfo: {
        qType: 'picasso-barchart',
      },
      qHyperCubeDef: {
        qDimensions: [], // extended from consumer
        qMeasures: [], // extended from consumer
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [{ qTop: 0, qHeight: 20, qLeft: 0, qWidth: 17 }],
        qSuppressZero: false,
        qSuppressMissing: true,
      },
    };

    this.state.settings = {
      scales: {
        x: {
          source: '/qHyperCube/qDimensionInfo/0',
          padding: 0.2,
        },
        y: {
          source: '/qHyperCube/qMeasureInfo/0',
          expand: 0.05,
          invert: true,
        },
      },
      components: [{
        type: 'box-marker',
        displayOrder: '1',
        data: {
          mapTo: {
            start: 0,
            end: {
              source: '/qHyperCube/qMeasureInfo/0',
            },
            elemNo: { source: '/qHyperCube/qDimensionInfo/0', reducer: 'first', property: 'id' },
          },
          groupBy: {
            source: '/qHyperCube/qDimensionInfo/0',
          },
        },
        settings: {
          major: {
            scale: 'x',
          },
          minor: {
            scale: 'y',
          },
          box: {
            fill: 'steelblue',
            strokeWidth: 1,
            stroke: 'rgba(255, 255, 255, 0.8)',
            width: 1,
            maxWidth: 10000,
            minWidth: 1,
          },
        },
        brush: {
          trigger: [{
            on: 'tap',
            contexts: ['highlight'],
            data: ['elemNo'],
          }],
          consume: [{
            context: 'highlight',
            data: ['elemNo'],
            style: {
              inactive: {
                opacity: 0.3,
              },
            },
          }],
        },
      }, {
        type: 'axis',
        scale: 'y',
        dock: 'left',
      }, {
        type: 'axis',
        scale: 'x',
        settings: {
          dock: 'bottom',
          labels: {
            tilted: true,
            tiltAngle: -30,
            fontSize: '10px',
          },
        },
      },
      {
        type: 'text',
        text: this.props.title,
        dock: 'top',
        anchor: 'left',
      },
      {
        type: 'grid-line',
        y: { scale: 'y' },
      }],
    };

    // The merge function replaces and does not concatenate arrays.
    // Therefore we add the components from the extraComponents array
    // to the components array first before merging
    this.state.settings.components =
    this.state.settings.components.concat(this.props.overrides.extraComponents);
    merge(this.state.definition, this.props.overrides.definition);
    merge(this.state.settings, this.props.overrides.settings);
  }
}

Barchart.propTypes = {
  title: PropTypes.string,
};

Barchart.defaultProps = {
  title: '',
};

export default Barchart;
