import React from 'react';

export default props => {
  const {
    showOption,
    options,
    loading,
    value = '',
    handleOnChange,
    Style
  } = props;

  if (showOption && loading) {
    return (
      <div className={`${Style.loadingOptionsDesktop} ${Style.loadingOptions}`}>
        Loading Localities...
      </div>
    );
  }

  if (!options.length) {
    return null;
  }

  const val = value.toLowerCase();
  let className = Style.localityOptionsDesktop;

  if (!showOption) {
    className += ` ${Style.hide}`;
  }
  return (
    <div className={className}>
      {options.map((locality, index) =>
        !locality.toLowerCase().indexOf(val) ? (
          <div
            key={`locality-${index}`}
            className={Style.optionBtnDesktop}
            onClick={handleOnChange}
            id={`locality-${index}`}
            data-value={locality}
          >
            {locality}
          </div>
        ) : null
      )}
    </div>
  );
};
