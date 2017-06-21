import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class PrivateRoute extends React.Component {

  componentDidMount() {
    if (!this.props.isAuthenticated) this.props.notAuthorizedCallback();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
      this.props.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />
        )
    )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  notAuthorizedCallback: PropTypes.func,
};

PrivateRoute.defaultProps = {
  location: null,
  notAuthorizedCallback: () => {},
};
