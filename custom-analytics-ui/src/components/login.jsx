import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import './navbar.css';

const customContentStyle = {
  width: '25%',
};

class Login extends React.Component {

  render() {
        const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.onCancel}
        key={1}
      />,
      <FlatButton
        label="Sign in"
        primary
        onTouchTap={this.props.onLogin}
        key={2}
      />,
    ];
    return (
      <Dialog
        title="Sign in"
        modal={false}
        open={this.props.open}
        contentStyle={customContentStyle}
      >
        <form
          action="/"
          method="POST"
          onSubmit={this.props.onLogin}
        >
          <TextField name="userid" hintText="User ID" />
          <br />
          <TextField name="pwd" type="password" hintText="Password" />
          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
            {actions}
          </div>
        </form>
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default Login;
