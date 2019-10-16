import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core';

const styles = {
  card: {
    padding: '5%',
  },
  strong: {
    fontWeight: 'bold',
  },
};

function SessionClosed(props) {
  const { classes } = props;
  return (
    <Card id="session-failed" className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Session was closed
        </Typography>
        <Typography component="p" paragraph>
We could not establish a session :-(
        </Typography>
        <Typography component="p" paragraph className={classes.strong}>
You will need to refresh this page to continue.
        </Typography>
        <Typography component="p" paragraph>
          This should generally never happen so feel free to give us a ping
          <a href="https://github.com/qlik-oss/core-assisted-prescription/issues">on GitHub.</a>
        </Typography>
      </CardContent>
    </Card>
  );
}

SessionClosed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionClosed);
