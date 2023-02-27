import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './button.base.css';

const Button = ({ children, className, disabled, ...attributes }) => (
  <div
    data-testid="button"
    className={`${Style.button} ${className} ${disabled ? Style.disabled : ''}`}
    {...attributes}
  >
    {children}
  </div>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: '',
  disabled: false
};

export default Button;
