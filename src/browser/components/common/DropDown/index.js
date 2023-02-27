import React from 'react';
import PropTypes from 'prop-types';

import Styles from './dropdown.base.css';

const DropDown = ({ show, cancelCallback, className = '', children }) =>
  show ? (
    <div>
      <div className={Styles.dropDownShimmer} onClick={cancelCallback} />
      <div className={`${Styles.dropDown} ${className}`}>{children}</div>
    </div>
  ) : null;

DropDown.propTypes = {
  show: PropTypes.bool,
  cancelCallback: PropTypes.func,
  className: PropTypes.string
};

export default DropDown;
