import React from 'react';
import PropTypes from 'prop-types';

import { FadeInAndOut } from 'commonComp/Animation';

import Style from './snackBar.css';

const SnackBar = ({ show, children, snackBarClass, containerClass }) => (
  <FadeInAndOut
    display={show}
    fadeInDirection="UP"
    fadeOutDirection="DOWN"
    customClass={`${Style.snackBar} ${snackBarClass}`}
  >
    <div className={`${Style.container} ${containerClass}`}>{children}</div>
  </FadeInAndOut>
);

const SnackBarButton = ({
  show,
  text,
  icon,
  iconClassName = '',
  onClick,
  snackBarClass = '',
  containerClass = ''
}) => {
  const SVGIcon = icon;
  return (
    <SnackBar
      show={show}
      onClick={onClick}
      snackBarClass={snackBarClass}
      containerClass={containerClass}
    >
      <div onClick={onClick}>
        {icon && <SVGIcon className={`${iconClassName} ${Style.iconStyle}`} />}{' '}
        {text}
      </div>
    </SnackBar>
  );
};

SnackBar.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

SnackBarButton.propTypes = {
  show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export { SnackBar, SnackBarButton };
