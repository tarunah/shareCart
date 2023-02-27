import React from 'react';
import PropTypes from 'prop-types';

import Style from './inlinebuttonV2.base.css';

const InlineButton = ({
  button1,
  button2,
  containerClassName = '',
  btnClassName = ''
}) => (
  <div className={`${Style.actions} ${containerClassName}`}>
    {[button1, button2].map((btn, i) => (
      <div
        className={`${Style.action} ${btnClassName}`}
        key={`inlineBtn${i}`}
        onClick={btn.clickHandler}
      >
        <button className={`${Style.actionButton} ${btn.className || ''}`}>
          {btn.text}
        </button>
      </div>
    ))}
  </div>
);

InlineButton.propTypes = {
  button1: PropTypes.object,
  button2: PropTypes.object,
  containerClassName: PropTypes.string,
  btnClassName: PropTypes.string
};

export default InlineButton;
