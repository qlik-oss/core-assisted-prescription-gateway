import React from 'react';
import enigma from 'enigma.js';
import Filterbox from './charts/filterbox';
import Barchart from './charts/barchart';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';

import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


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
};

const therapy = {
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

  clearSelections = () => {
    if (this.state.app) {
      this.state.app.clearAll();
    }
  }

  render() {
    if (this.state.error) {
      console.error(this.state.error);

      return (
        <div className="main app-background lighten-3">
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

      <div className="main app-background lighten-3">

        <div className="row">
          <div className="col s3">
            <Card style={{ margin: '20px' }}>
              <Toolbar style={{backgroundColor: '#fafafa'}}>
                <ToolbarGroup >
                  <ToolbarTitle text="Filters" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconMenu style={{marginRight: '-16px'}}
                    iconButtonElement={
                      <IconButton touch>
                        <NavigationExpandMoreIcon />
                      </IconButton>
                    }>
                    <MenuItem primaryText="Clear All Selections" onTouchTap={this.clearSelections} />
                  </IconMenu>
                </ToolbarGroup>
              </Toolbar>
              <List>
                <Subheader>Demographics</Subheader>
                <Filterbox app={this.state.app} field="Patient Age Group" title="Age" />
                <Filterbox app={this.state.app} field="Gender" title="Gender" />
                <Filterbox app={this.state.app} field="Patient Weight Group" title="Weight" />
                <Filterbox app={this.state.app} field="Country" title="Location" />
                <Divider />
                <Subheader>Drugs</Subheader>
                <Filterbox app={this.state.app} field="Drug Dose Form" title="Drug Dose Form" />
              </List>
            </Card>
          </div>
          <div className="col s8">


            <div id="charts" className="section scrollspy">
              <Card style={{ margin: '20px' }}>
                <CardTitle title="Reactions" />
                <CardMedia>
                  <Barchart app={this.state.app} overrides={reactions} />
                </CardMedia>
              </Card>

              <Card style={{ margin: '20px' }}>
                <CardTitle title="Therapy" />
                <CardMedia>
                  <Barchart app={this.state.app} overrides={therapy} />
                </CardMedia>
              </Card>

              <Card style={{ margin: '20px' }}>
                <CardTitle title="Risk" />
                <CardMedia>
                  <Barchart app={this.state.app} overrides={risk} />
                </CardMedia>
              </Card>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
