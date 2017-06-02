/* global picasso */
import enigma from 'enigma.js';
import qixSchema from 'enigma.js/schemas/qix/3.2/schema.json';
import config from './../enigma-config';

export default function paintChart(elem) {
    let conn;
    const connect = () => conn || (conn = enigma.getService('qix', config));
    connect().then((qix) => {
        qix.global.getActiveDoc()
            .then((app) => {
                app.createObject({
                    qInfo: {
                        qType: 'visualization',
                        qId: '',
                    },
                    type: 'pic-barchart',
                    orientation: 'horizontal',
                    qHyperCubeDef: {
                        qDimensions: [{
                            qDef: {
                                qFieldDefs: ['Manufacturer Code Name'],
                                qLabel: 'Manufacturer Name',
                                qSortCriterias: [{
                                    qSortByAscii: 1,
                                }],
                            },
                        }],
                        qMeasures: [{
                            qDef: {
                                qDef: 'Count(Demographic_Caseid)',
                                qLabel: '# Patient Cases'
                            },
                            qSortBy: {
                                qSortByNumeric: -1,
                            },
                        }],
                        qInterColumnSortOrder: [1, 0],
                        qInitialDataFetch: [{ qTop: 0, qHeight: 20, qLeft: 0, qWidth: 17 }],
                        qSuppressZero: false,
                        qSuppressMissing: true,
                    },
                }).then((model) => {

                    model.getLayout().then((layout) => {
                        var data = {
                            type: "q",
                            data: layout
                        };

                        var settings = {
                            scales: {
                                x: {
                                    source: '/qHyperCube/qDimensionInfo/0',
                                    padding: 0.2
                                },
                                y: {
                                    source: '/qHyperCube/qMeasureInfo/0',
                                    expand: 0.05,
                                }
                            },
                            components: [{
                                type: 'box-marker',
                                data: {
                                    mapTo: {
                                        start: 0,
                                        end: {
                                            source: '/qHyperCube/qMeasureInfo/0',
                                        },
                                        elemNo: { source: '/qHyperCube/qDimensionInfo/0', reducer: 'first', property: 'id' }
                                    },
                                    groupBy: {
                                        source: '/qHyperCube/qDimensionInfo/0',
                                    }
                                },
                                settings: {
                                    major: {
                                        scale: 'x'
                                    },
                                    minor: {
                                        scale: 'y'
                                    },
                                    orientation: 'horizontal',
                                    box: {
                                        stroke: '#fff',
                                        width: 1, // This is a multiplier for the width
                                        fill: '#008080' // fill of the box
                                    },
                                },
                                brush: {
                                    trigger: [{
                                        on: 'tap',
                                        contexts: ['highlight'],
                                        data: ['elemNo']
                                    }],
                                    consume: [{
                                        context: 'highlight',
                                        data: ['elemNo'],
                                        style: {
                                            inactive: {
                                                opacity: 0.3
                                            }
                                        },
                                    }]
                                },
                            }, {
                                type: 'axis',
                                scale: 'y',
                                dock: 'bottom'
                            }, {
                                type: 'axis',
                                scale: 'x',
                                settings: {
                                    dock: 'left',
                                    labels: {
                                        tilted: true,
                                        tiltAngle: -30,
                                        fontSize: '12px'
                                    }
                                }
                            }, {
                                type: 'text',
                                dock: 'left',
                                text: layout.qHyperCube.qDimensionInfo[0].qLabel
                            }, {
                                type: 'text',
                                text: layout.qHyperCube.qMeasureInfo[0].qFallbackTitle,
                                dock: 'bottom'
                            }]
                        };
                        const pic = picasso.chart({
                            element: elem,
                            data: data,
                            settings: settings
                        });

                        pic.brush('highlight').on('update', (added, removed) => {
                            if (added.length + removed.length < 1) {
                                return;
                            }

                            const selections = picassoQ.qBrushHelper(pic.brush('highlight'));
                            model[selections[0].method](...selections[0].params).then((() => {
                            }
                            ));
                        });

                        window.onresize = () => { pic.resize; };
                    });

                });
            });
    });
}
