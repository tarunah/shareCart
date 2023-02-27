import React from 'react';
import PropTypes from 'prop-types';

import Sprite from 'commonComp/Sprite';

const createImmobilizedComponent = Component => props => {
  const {
    children,
    className = '',
    disableClassName,
    disabled,
    onClick,
    ...restProps
  } = props;
  const ImmobilizedComponent = Component ? Component : props.name;
  return (
    <ImmobilizedComponent
      className={`${className} ${disabled ? disableClassName : ''}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </ImmobilizedComponent>
  );
};

const ImmobilizedDiv = createImmobilizedComponent('div');
const ImmobilizedSpan = createImmobilizedComponent('span');
const ImmobilizedSprite = createImmobilizedComponent(Sprite);
const ImmobilizedIcon = createImmobilizedComponent();
const ImmobilizedButton = createImmobilizedComponent('button');

ImmobilizedDiv.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disableClassName: PropTypes.string,
  disabled: PropTypes.bool
};

ImmobilizedSpan.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disableClassName: PropTypes.string,
  disabled: PropTypes.bool
};

ImmobilizedSprite.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disableClassName: PropTypes.string,
  disabled: PropTypes.bool
};

ImmobilizedIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disableClassName: PropTypes.string,
  disabled: PropTypes.bool
};

ImmobilizedButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disableClassName: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default createImmobilizedComponent;

export {
  ImmobilizedDiv,
  ImmobilizedSpan,
  ImmobilizedSprite,
  ImmobilizedIcon,
  ImmobilizedButton
};
