import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core';

import Filterbox from './charts/filterbox';
import Barchart from './charts/barchart';
import './dashboard.css';
import { colors } from '../ui-constants';

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

const styles = {
  filterCard: {
    margin: '15px',
    width: '100%',
  },
  filterCardTitle: {
    backgroundColor: '#FAFAFA',
  },
  filterTitle: {
    color: '#0008',
  },
  list: {
    maxHeight: 'calc(100vh - 158px)',
    overflowY: 'auto',
  },
  chartCard: {
    margin: '15px',
    flex: '1 1 auto',
  },
  chartCardTitle: {
    padding: '2px 0 0 15px',
    borderBottom: '1px solid #e1e1e1',
    backgroundColor: '#FAFAFA',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.darkBlue,
    lineHeight: '36px',
    fontSize: '1rem',
  },
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: props.app,
      anchorEl: null,
    };
  }

  clearSelections = () => {
    const { app } = this.state;
    app.clearAll();
    this.setState({ anchorEl: null });
  }

  handleFilterButtonClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleFilterButtonClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { app, anchorEl } = this.state;
    const { classes } = this.props;
    const filterButtonOpen = Boolean(anchorEl);

    return (
      <div className="ca-main app-background">
        <div className="main-content">
          <div className="app-toolbar">
            <Card className={classes.filterCard}>
              <CardHeader
                title="Filters"
                className={classes.filterCardTitle}
                classes={{ title: classes.filterTitle }}
                action={(
                  <IconButton onClick={this.handleFilterButtonClick}>
                    <MoreVertIcon />
                  </IconButton>
                )}
              />
              <Menu
                anchorEl={anchorEl}
                open={filterButtonOpen}
                onClose={this.handleFilterButtonClose}
              >
                <MenuItem onClick={this.clearSelections}>Clear All Selections</MenuItem>
              </Menu>
              <List className={classes.list}>
                <ListSubheader disableSticky>Demographics</ListSubheader>
                <Filterbox app={app} field="Patient Age Group" title="Age" />
                <Filterbox app={app} field="Gender" title="Gender" />
                <Filterbox app={app} field="Patient Weight Group" title="Weight" />
                <Filterbox app={app} field="Country" title="Location" />
                <Divider />
                <ListSubheader disableSticky>Drugs</ListSubheader>
                <Filterbox app={app} field="Drug Dose Form" title="Drug Dose Form" />
              </List>

            </Card>
          </div>
          <div className="app-charts">
            <Card className={classes.chartCard}>
              <CardHeader
                title="Reactions"
                className={classes.chartCardTitle}
                classes={{ title: classes.title }}
              />
              <CardContent>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={reactions} title={reactions.title} colorType="sequential" />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={outcome} title={outcome.title} orientation="horizontal" />
                </div>
              </CardContent>
            </Card>
            <Card className={classes.chartCard}>
              <CardHeader
                title="Therapy"
                className={classes.chartCardTitle}
                classes={{ title: classes.title }}
              />
              <CardContent>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={stop} title={stop.title} />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={therapy} title={therapy.title} colorType="sequential" />

                </div>
              </CardContent>
            </Card>

            <Card className={classes.chartCard}>
              <CardHeader
                title="Risk"
                className={classes.chartCardTitle}
                classes={{ title: classes.title }}
              />
              <CardContent>
                <div className="chart-wrapper">
                  <Barchart app={app} overrides={risk} title={risk.title} colorType="sequential" />
                  <div className="card-divider" />
                  <Barchart app={app} overrides={deaths} title={deaths.title} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  app: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
