import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import './acceptCookies.css';

export default function AcceptCookies(props) {
  const paragraph = (
    <span>
      By continuing to browse the site, you are agreeing to&nbsp;
      <a href="https://www.qlik.com/us/legal/cookies-and-privacy-policy">
our use of cookies
      </a>
.
    </span>
  );
  const { open, onAccept } = props;
  return (
    <Snackbar
      className="ca-accept-cookies"
      bodyStyle={{ maxWidth: 'auto', height: 'auto' }}
      open={open}
      message={paragraph}
      action="Close"
      onClick={onAccept}
      onRequestClose={() => false}
    />
  );
}

AcceptCookies.propTypes = {
  open: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
};
