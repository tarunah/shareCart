import React from 'react';
import PropTypes from 'prop-types';

import Button from 'commonComp/Button';

import Styles from './inlineButtonV3.base.css';

const InlineButton = ({ buttons, containerClassName = '' }) => (
  <div className={`${Styles.container} ${containerClassName}`}>
    {buttons.map((btn, index) => (
      <Button
        key={btn.id || index}
        className={`${Styles.button} ${
          btn.type === 'secondary' ? Styles.secondary : ''
        } ${btn.className || ''}`}
        onClick={btn.clickHandler}
      >
        {btn.text}
      </Button>
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
