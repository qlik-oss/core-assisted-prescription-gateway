import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
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
      <FlatButton
        label="Cancel"
        style={{ color: colors.darkBlue }}
        onTouchTap={onCancel}
        key={1}
      />,
      <FlatButton
        label="Sign in"
        style={{ color: colors.darkBlue }}
        onTouchTap={() => onLogin(username, password)}
        key={2}
      />,
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
