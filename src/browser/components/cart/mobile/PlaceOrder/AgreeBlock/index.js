import React from 'react';
import PropTypes from 'prop-types';

import Styles from './agreeBlock.base.css';
import ChevronUp from 'iconComp/ChevronUp.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

const AgreeBlock = ({
  config,
  onCheckboxClick,
  maximize,
  checkoutOptionSelected,
  className,
  minimized
}) => (
  <div className={className || Styles.confirmationOption}>
    <div className={Styles.selectionBlock} onClick={onCheckboxClick}>
      {checkoutOptionSelected ? (
        <CheckboxActive className={`${Styles.checkIcon} ${Styles.checked}`} />
      ) : (
        <CheckboxInactive className={Styles.checkIcon} />
      )}
      <span className={Styles.agreeText}>{config.agreeText}</span>
    </div>
    {minimized && (
      <ChevronUp className={Styles.minimizeIcon} onClick={maximize} />
    )}
  </div>
);

AgreeBlock.propTypes = {
  config: PropTypes.object,
  onCheckboxClick: PropTypes.func,
  maximize: PropTypes.func,
  checkoutOptionSelected: PropTypes.bool,
  className: PropTypes.string,
  minimized: PropTypes.bool
};

export default AgreeBlock;
