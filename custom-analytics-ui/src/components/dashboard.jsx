import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { colors, styles } from '../ui-constants';
import Filterbox from './charts/filterbox';
import Barchart from './charts/barchart';
import './dashboard.css';

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
        qNullSuppression: true,
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
    dock: 'bottom',
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
      qInterColumnSortOrder: [0, 1],
      qDimensions: [{
        qNullSuppression: true,
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
          qDef: 'Count(Drug_caseID)',
          qLabel: '# Drug Cases',
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
      qInterColumnSortOrder: [0, 1],
      qDimensions: [{
        qDef: {
          qFieldDefs: ['Patient Age Group'],
          qLabel: 'Patient Age Group',
          qSortCriterias: [{
            qSortByNumeric: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: 'Count({<[Drug Role Event] = {\'Primary Suspect Drug\'},[Medical Description Reaction] = {\'Death\'} >}Demographic_Caseid)',
          qLabel: '# Death by primary suspect',
        },
      }],
    },
  },
  settings: {},
  title: '# Deaths',
  extraComponents: [{
    type: 'text',
    dock: 'left',
    text: 'Death by primary suspect',
  }],
};


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: props.app,
    };
  }

  clearSelections = () => {
    const { app } = this.state;
    app.clearAll();
  }

  render() {
    const { app } = this.state;
    return (
      <div className="ca-main app-background">
        <div className="main-content">
          <div className="app-toolbar">
            <Card zDepth={3} style={{ margin: '15px', width: '100%' }}>
              <Toolbar style={{ backgroundColor: '#fafafa' }}>
                <ToolbarGroup>
                  <ToolbarTitle style={styles.userSelectNone} text="Filters" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconMenu
                    style={{ marginRight: '-16px' }}
                    iconButtonElement={(
                      <IconButton touch>
                        <NavigationExpandMoreIcon />
                      </IconButton>
)}
                  >
                    <MenuItem primaryText="Clear All Selections" onClick={this.clearSelections} />
                  </IconMenu>
                </ToolbarGroup>
              </Toolbar>
              <List style={{ maxHeight: 'calc(100vh - 158px)', overflowY: 'auto' }}>
                <Subheader style={styles.userSelectNone}>
Demographics
                </Subheader>
                <Filterbox app={app} field="Patient Age Group" title="Age" />
                <Filterbox app={app} field="Gender" title="Gender" />
                <Filterbox app={app} field="Patient Weight Group" title="Weight" />
                <Filterbox app={app} field="Country" title="Location" />
                <Divider />
                <Subheader style={styles.userSelectNone}>
Drugs
                </Subheader>
                <Filterbox app={app} field="Drug Dose Form" title="Drug Dose Form" />
              </List>
            </Card>
          </div>
          <div className="app-charts">
            <Card zDepth={3} style={styles.app.chartCard}>
              <CardTitle
                title="Reactions"
                className="subheader"
                style={styles.app.cardTitle}
                titleStyle={styles.app.cardTitleSize}
                titleColor={colors.deepBlue}
              />
              <CardMedia>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={reactions} title={reactions.title} colorType="sequential" />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={outcome} title={outcome.title} orientation="horizontal" />
                </div>
              </CardMedia>
            </Card>

            <Card zDepth={3} style={styles.app.chartCard}>
              <CardTitle
                title="Therapy"
                className="subheader"
                style={styles.app.cardTitle}
                titleStyle={styles.app.cardTitleSize}
                titleColor={colors.deepBlue}
              />
              <CardMedia>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={stop} title={stop.title} />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={therapy} title={therapy.title} colorType="sequential" />

                </div>
              </CardMedia>
            </Card>

            <Card zDepth={3} style={styles.app.chartCard}>
              <CardTitle
                title="Risk"
                className="subheader"
                style={styles.app.cardTitle}
                titleStyle={styles.app.cardTitleSize}
                titleColor={colors.deepBlue}
              />
              <CardMedia>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={risk} title={risk.title} colorType="sequential" />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={deaths} title={deaths.title} />
                </div>
              </CardMedia>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  app: PropTypes.object.isRequired,
};
