import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { getDateObject } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

import Style from './expiryDate.base.css';

import Clock from 'iconComp/Clock.jsx';

const ExpiryDate = ({ expiryDate, showExpiryDate }) => {
  if (!expiryDate || !showExpiryDate) {
    return null;
  }

  const expiry = getDateObject(new Date(parseInt(expiryDate)), false, true);

  const date = get(expiry, 'onlyDate');
  const month = get(expiry, 'monthInWords');
  const year = get(expiry, 'year');

  const stringifiedDates = `${date} ${month} ${year}`;
  const expiryString =
    (get(window, 'innerWidth') <= 340
      ? Strings.EXPIRY_SHORT
      : Strings.EXPIRY_LONG) + stringifiedDates;

  return (
    <div className={Style.container}>
      <Clock className={Style.iconClass} />
      <span className={Style.textContainer}>{expiryString}</span>
    </div>
  );
};

ExpiryDate.propTypes = {
  expiryDate: PropTypes.number.isRequired,
  showExpiryDate: PropTypes.bool.isRequired
};

export default ExpiryDate;
