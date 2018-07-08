import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
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
    const actions = [
      <Button
        style={{ color: colors.darkBlue }}
        onClick={onCancel}
        key={1}
      >
Cancel
      </Button>,
      <Button
        style={{ color: colors.darkBlue }}
        onClick={() => onLogin(username, password)}
        key={2}
      >
Sign in
      </Button>,
    ];
    return (
      <Dialog
        className="ca-login"
        title="Sign in"
        open={open}
        contentStyle={styles.login.contentStyle}
        overlayClassName="ca-login-overlay"
      >
        <TextField underlineFocusStyle={styles.login.underline} name="username" hintText="User ID" value={username} onChange={e => this.handleUsernameChange(e)} />
        <br />
        <TextField underlineFocusStyle={styles.login.underline} name="password" type="password" hintText="Password" value={password} onChange={e => this.handlePasswordChange(e)} onKeyDown={e => this.loginOnEnter(e)} />
        <div className="action-button-wrapper">
          {actions}
        </div>
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};
