import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Style from './NudgeBanner.base.css';

export const NudgeBanner = props => {
  const { message, className } = props;
  return <div className={className}>{message}</div>;
};

export const NudgeBannerWithCTA = props => {
  const {
    message,
    className = '',
    action = '',
    cta,
    onFieldClick,
    fieldName,
    redirect
  } = props;
  return (
    <div className={className}>
      <span className={Style.text}>{message}</span>
      {action ? (
        <span
          className={Style.cta}
          data-action={action}
          data-key={`${fieldName}-nudge`}
        >
          {cta}
        </span>
      ) : (
        <Link
          className={Style.cta}
          to={{ pathname: redirect, state: { initiatedFromAddressMain: true } }}
          onClick={onFieldClick}
        >
          {cta}
        </Link>
      )}
    </div>
  );
};

NudgeBanner.propTypes = {
  message: PropTypes.string.isRequired
};

NudgeBannerWithCTA.propTypes = {
  message: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  onFieldClick: PropTypes.func
};
