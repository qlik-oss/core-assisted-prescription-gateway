import React from 'react';
import enigma from 'enigma.js';
import Filterbox from './charts/filterbox';
import Barchart from './charts/barchart';
import Card from './card';
import SessionFailed from './sessionFailed';
import config from '../enigma-config';
import './app.css';

const reactions = {
  definition: {
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Medical Description Reaction'],
          qLabel: 'Medical Description Reaction',
          qSortCriterias: [{
            qSortByAscii: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count(Demographic_Caseid)',
          qLabel: '# Patient Cases',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: 'Patient Medical Reactions',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: '# Patient Cases',
  }],
};

const outcome = {
  definition: {
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Patient Event Outcome'],
          qLabel: 'Patient Event Outcome',
          qSortCriterias: [{
            qSortByAscii: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count(Demographic_Caseid)',
          qLabel: '# Patient Cases',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: '# Patient Cases',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: '# Patient Cases',
  }],
};

const therapy = {
  definition: {
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Medical Description Drug Use'],
          qLabel: 'Medical Description Drug Use',
          qSortCriterias: [{
            qSortByAscii: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count(Demographic_Caseid)',
          qLabel: '# Patient Cases',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: 'Patient Illness',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: '# Patient Cases',
  }],
};

const stop = {
  definition: {
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Reaction Therapy Stop'],
          qLabel: 'Reaction Therapy Stop',
          qSortCriterias: [{
            qSortByAscii: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count(Demographic_Caseid)',
          qLabel: '# Patient Cases',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: 'Reactions Therapy Stop',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: '# Patient Cases',
  }],
};

const risk = {
  definition: {
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
          qDef: 'Count({<[Drug Role Event] = {\'Primary Suspect Drug\'},[Medical Description Reaction] = {\'Death\'} >}Demographic_Caseid)',
          qLabel: '# Death by primary suspect',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: '# Drug Cases by Manufacturer',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: '# Drug Cases',
  }],
};

const deaths = {
  definition: {
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Patient Age Group'],
          qLabel: 'Patient Age Group',
          qSortCriterias: [{
            qSortByAscii: -1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count({<[Drug Role Event] = {\'Primary Suspect Drug\'},[Medical Description Reaction] = {\'Death\'} >}Demographic_Caseid)',
          qLabel: '# Death by primary suspect',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      }],
    },
  },
  settings: {},
  title: '# Deaths',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: 'Deathy by primary suspect',
  }],
};

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { app: null };

    enigma.getService('qix', config)
      .then(qix => qix.global.getActiveDoc())
      .then((app) => {
        this.setState({ app });
        app.session.on('suspended', () => {
          this.setState({ suspended: true });
          app.session.resume().then(() => {
            this.setState({ suspended: false });
          }).catch(() => {
            app.session.close();
          });
        });
        app.session.on('closed', (evt) => {
          this.setState({ error: evt });
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    if (this.state.error) {
      return (
        <div className="main blue lighten-3">
          <div className="row">
            <div className="section">
              <SessionFailed />
            </div>
          </div>
        </div>
      );
    }
    if (!this.state.app) {
      return null;
    }
    return (
      <div className="main blue lighten-3">
        <div className="row">
          <div className="col s3">
            <div className="section">
              <div className="card-panel">
                <h5>Filters</h5>
                <div className="divider black" />
                <h6>Demographics</h6>
                <Filterbox app={this.state.app} field="Patient Age Group" title="Age" />
                <Filterbox app={this.state.app} field="Gender" title="Gender" />
                <Filterbox app={this.state.app} field="Patient Weight Group" title="Weight" />
                <Filterbox app={this.state.app} field="Country" title="Location" />
                <div className="divider black" />
                <h6>Drugs</h6>
                <Filterbox app={this.state.app} field="Drug Dose Form" title="Drug Dose Form" />
              </div>
            </div>
          </div>
          <div className="col s8">
            <div id="charts" className="section scrollspy">
              <Card id="reactions" title="Reactions">
                <Barchart app={this.state.app} overrides={reactions} title={reactions.title} />
                <Barchart app={this.state.app} overrides={outcome} title={outcome.title} />
              </Card>
              <Card id="therapy" title="Therapy">
                <Barchart app={this.state.app} overrides={therapy} title={therapy.title} />
                <Barchart app={this.state.app} overrides={stop} title={stop.title} />
              </Card>
              <Card id="risk" title="Risk">
                <Barchart app={this.state.app} overrides={risk} title={risk.title} />
                <Barchart app={this.state.app} overrides={deaths} title={deaths.title} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
