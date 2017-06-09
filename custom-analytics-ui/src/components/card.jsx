import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  return (
    <div id={props.id} className="card-panel">
      <h5>{props.title}</h5>
      {props.children}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
