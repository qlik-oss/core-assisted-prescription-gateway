import merge from 'deep-extend';
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
            stroke: '#fff',
            width: 1, // This is a multiplier for the width
            fill: '#008080', // fill of the box
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
            fontSize: '12px',
          },
        },
      }, {
        type: 'text',
        dock: 'left',
        text: 'layout.qHyperCube.qMeasureInfo[0].qFallbackTitle',
      }, {
        type: 'text',
        text: 'layout.qHyperCube.qDimensionInfo[0].qLabel',
        dock: 'bottom',
      }],
    };

    merge(this.state.definition, this.props.overrides.definition);
    merge(this.state.settings, this.props.overrides.settings);
  }
}

export default Barchart;
