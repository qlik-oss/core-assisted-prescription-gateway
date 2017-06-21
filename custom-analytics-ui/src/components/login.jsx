import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import './navbar.css';

const customContentStyle = {
  width: '25%',
};

export default function Login({ open, onCancel, onLogin }) {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={onCancel}
      key={1}
    />,
    <FlatButton
      label="Sign in"
      primary
      onTouchTap={onLogin}
      key={2}
    />,
  ];
  return (
    <Dialog
      title="Sign in"
      modal={false}
      open={open}
      contentStyle={customContentStyle}
    >
      <form
        action="/"
        method="POST"
        onSubmit={onLogin}
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

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};
