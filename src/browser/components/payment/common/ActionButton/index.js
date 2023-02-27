import React from 'react';
import Styles from './actionButton.base.css';
import { ImmobilizedButton } from 'commonComp/ImmobilizeComponent';

const ActionButton = ({
  text,
  visible,
  className = '',
  deviceMode,
  onClick,
  disabled
}) =>
  deviceMode === 'desktop' ? (
    <ImmobilizedButton
      className={`${Styles.actionButton} ${className} ${
        !visible ? Styles.hide : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      disableClassName={Styles.disable}
    >
      {text}
    </ImmobilizedButton>
  ) : null;

export default ActionButton;
