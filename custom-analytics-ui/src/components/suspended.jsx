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
};
function SessionSuspended(props) {
  const { retries, maxRetries, classes } = props;

  return (
    <Card id="session-failed" className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Connecting...
        </Typography>
        <Typography component="p" paragraph>
  We are trying to establish an analytics session for you. If you were previously
            in a session this error may indicate that services has been updated to optimize
            your experience. You should be reconnected automatically.
        </Typography>
        <Typography component="p" paragraph>
          {'Connecting... '}
          {retries}
  /
          {maxRetries}
        </Typography>
        <Typography component="p" paragraph>
          {'If you got stuck on this screen for several minutes, feel free to give us a ping '}
          <a href="https://github.com/qlik-oss/core-assisted-prescription/issues">on GitHub.</a>
        </Typography>
      </CardContent>
    </Card>
  );
}

SessionSuspended.propTypes = {
  retries: PropTypes.number.isRequired,
  maxRetries: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionSuspended);
