import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { id, title, children } = props;
  return (
    <div id={id} className="card-panel">
      <h5>
        {title}
      </h5>
      {children}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
