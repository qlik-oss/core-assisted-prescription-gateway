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

function SessionSuspended(props) {
  const { classes } = props;
  return (
    <Card id="session-failed" className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Session timed out
        </Typography>
        <Typography component="p" paragraph>
          Your analytics session timed out due to inactivity.
        </Typography>
        <Typography component="p" paragraph className={classes.strong}>
          Refresh this page to establish a new session.
        </Typography>
      </CardContent>
    </Card>
  );
}

SessionSuspended.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionSuspended);
