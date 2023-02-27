import React from 'react';
import PropTypes from 'prop-types';

import {
  ImmobilizedDiv,
  ImmobilizedSpan,
  ImmobilizedSprite
} from 'commonComp/ImmobilizeComponent';

import { RadioButton } from 'commonComp/Radio';

import Flipkart from 'iconComp/Flipkart.jsx';
import COD from 'iconComp/COD.jsx';

import Styles from './paymentSubOption.base.css';

const OptionIcon = ({
  iconConfig,
  name,
  className,
  disableClassName,
  disabled
}) => {
  const IconComponents = {
    Flipkart,
    COD
  };
  let SVGIcon =
    iconConfig.type === 'icon' ? IconComponents[iconConfig.name] : null;
  return iconConfig.type === 'icon' ? (
    <div className={iconConfig.className || ''}>
      <SVGIcon {...iconConfig.iconSize} />
    </div>
  ) : (
    <ImmobilizedSprite
      name={name || iconConfig.name}
      className={className}
      disableClassName={disableClassName}
      disabled={disabled}
    />
  );
};

const PaymentSubOption = ({
  id,
  selected,
  iconName,
  iconConfig = {},
  displayName,
  classNames = {},
  onClickParams = {},
  onClick,
  children,
  disabled
}) => {
  const leftAlignedIcon =
    !iconConfig.position || iconConfig.position === 'left';
  return (
    <ImmobilizedDiv
      className={`${Styles.rowContainer} ${classNames.container || ''}`}
      disabled={disabled}
    >
      <RadioButton
        classes={{
          root: Styles.radioContainer,
          icon: Styles.icon
        }}
        id={id}
        onClickParams={onClickParams}
        onClick={onClick}
        checked={selected}
        disabled={disabled}
      >
        <div
          className={`${Styles.row} ${
            !leftAlignedIcon ? Styles.spacingInRow : ''
          }`}
        >
          {leftAlignedIcon ? (
            <OptionIcon
              iconConfig={iconConfig}
              name={iconName}
              className={Styles.imageLeft}
              disableClassName={Styles.disabledSprite}
              disabled={disabled}
            />
          ) : null}
          <ImmobilizedSpan
            className={`${selected ? Styles.selected : ''} ${classNames.text ||
              ''} `}
            disableClassName={Styles.disabledName}
            disabled={disabled}
          >
            {displayName}
          </ImmobilizedSpan>
          {!leftAlignedIcon ? (
            <OptionIcon
              iconConfig={iconConfig}
              name={iconName}
              className={Styles.imageRight}
              disableClassName={Styles.disabledSprite}
              disabled={disabled}
            />
          ) : null}
        </div>
      </RadioButton>

      {children}
    </ImmobilizedDiv>
  );
};

PaymentSubOption.propTypes = {
  id: PropTypes.string,
  selected: PropTypes.bool,
  iconName: PropTypes.string,
  displayName: PropTypes.string,
  onClick: PropTypes.func
};

export default PaymentSubOption;
