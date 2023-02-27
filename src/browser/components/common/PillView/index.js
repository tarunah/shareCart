import React, { useState, useEffect } from 'react';
import Styles from './pillView.base.css';
import PropTypes from 'prop-types';

const Pill = props => {
  const {
    pillValue,
    pillClassName = '',
    onPillClick,
    children,
    isSelected,
    prefix = '',
    valueTransformation
  } = props;
  const text =
    prefix + (valueTransformation ? valueTransformation(pillValue) : pillValue);
  return (
    <div
      className={`${Styles.pill} ${pillClassName} ${
        isSelected ? Styles.activePill : Styles.normalPill
      }`}
      data-key={pillValue}
      onClick={onPillClick}
    >
      <div className={Styles.textStyle}>{children || text}</div>
    </div>
  );
};

const PillView = React.memo(props => {
  const {
    pillValues,
    mode,
    className,
    pillClassName,
    selectedValue,
    prefix,
    otherSelected,
    onPillClick,
    valueTransformation,
    renderOther,
    ...restProps
  } = props;

  const isMobile = mode === 'mobile';

  return (
    <div className={className}>
      <div
        className={`${Styles.pillsContainer} ${
          isMobile ? Styles.pillsMobileContainer : Styles.pillsDesktopContainer
        }`}
      >
        {pillValues &&
          pillValues.map(pillName => (
            <Pill
              isSelected={!otherSelected && pillName === selectedValue}
              pillValue={pillName}
              pillClassName={pillClassName}
              prefix={prefix}
              onPillClick={onPillClick}
              valueTransformation={valueTransformation}
              {...restProps}
            />
          ))}
        {renderOther && (
          <Pill
            isSelected={otherSelected}
            pillClassName={Styles.otherField}
            {...restProps}
          >
            {renderOther()}
          </Pill>
        )}
      </div>
    </div>
  );
});

PillView.propTypes = {
  mode: PropTypes.string.isRequired,
  pillClassName: PropTypes.string,
  prefix: PropTypes.string,
  pillValues: PropTypes.array.isRequired,
  selectedValue: PropTypes.any.isRequired,
  onPillClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  valueTransformation: PropTypes.func
};

export default PillView;
