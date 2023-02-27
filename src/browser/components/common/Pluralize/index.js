import React from 'react';
import PropTypes from 'prop-types';

const Pluralize = props => {
  let { value, text } = props;
  let textNode = text;
  if (value > 1) {
    textNode = text + '(s)';
  }
  return <span>{textNode}</span>;
};

Pluralize.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string
};

export default Pluralize;
