import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        title="Sign in"
        open={open}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <TextField margin="dense" fullWidth autoFocus label="User ID" value={username} onChange={e => this.handleUsernameChange(e)} />
          <br />
          <TextField margin="dense" fullWidth label="Password" type="password" value={password} onChange={e => this.handlePasswordChange(e)} onKeyDown={e => this.loginOnEnter(e)} />
          <DialogActions>
            <Button color="primary" onClick={onCancel} key={1}>Cancel</Button>
            <Button color="primary" onClick={() => onLogin(username, password)} key={2}>Sign in</Button>
          </DialogActions>
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
