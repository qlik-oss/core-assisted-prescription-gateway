import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { colors, styles } from '../ui-constants';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  loginOnEnter(e) {
    if (e.keyCode === 13) {
      const { onLogin } = this.props;
      const { username, password } = this.state;
      onLogin(username, password);
    }
  }

  render() {
    const { onCancel, onLogin, open } = this.props;
    const { username, password } = this.state;
    return (

      <Dialog
        className="ca-login"
        title="Sign in"
        open={open}
        // contentStyle={styles.login.contentStyle}
        // overlayclassname="ca-login-overlay"
      >
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="username" value={username} onChange={e => this.handleUsernameChange(e)} />
          <br />
          <TextField label="password" type="password" value={password} onChange={e => this.handlePasswordChange(e)} onKeyDown={e => this.loginOnEnter(e)} />
          <div className="action-button-wrapper">
            <DialogActions>
              <Button onClick={onCancel} key={1}>Cancel</Button>
              <Button onClick={() => onLogin(username, password)} key={2}>Sign in</Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};
