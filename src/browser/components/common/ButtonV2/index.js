import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'commonComp/Loader';

import Styles from './buttonV2.base.css';

const ButtonV2 = ({
  onClick,
  text,
  containerClassname = '',
  classname = '',
  isLoading,
  id = '',
  children,
  ...rest
}) => {
  return (
    <div className={`${Styles.buttonContainer} ${containerClassname}`}>
      <div
        className={`${Styles.button} ${classname} ${
          isLoading ? Styles.loading : ''
        }`}
        onClick={e => {
          e.stopPropagation();
          return isLoading ? null : onClick(e);
        }}
        id={id}
        {...rest}
      >
        {!isLoading && <div>{text || children}</div>}
      </div>
      {isLoading && <Loader spinner show className={Styles.loader} />}
    </div>
  );
};

export default ButtonV2;

ButtonV2.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  classname: PropTypes.string,
  isLoading: PropTypes.bool
};
