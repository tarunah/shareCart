import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Styles from './coupon.base.css';

import {
  currencyValue,
  getDateObject,
  getFullDateDiff,
  isApp
} from 'commonBrowserUtils/Helper';
import ReadMore from 'commonComp/ReadMore';
import Timer from 'commonComp/Timer';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import Rupee from 'iconComp/Rupee.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';

const CustomCheckBox = props => {
  const { label, checked, onClick, expired } = props;
  return (
    <div className={Styles.customCheckbox} onClick={onClick}>
      {checked ? (
        <CheckboxActive
          className={`${Styles.selectedCheckboxIcon} ${
            expired ? Styles.expiredCouponIcon : ''
          }`}
        />
      ) : (
        <CheckboxInactive
          className={`${Styles.checkboxIcon} ${
            expired ? Styles.expiredCouponIcon : ''
          }`}
        />
      )}
      <span
        className={`${checked ? Styles.labelChecked : Styles.labelUnchecked} ${
          expired ? Styles.expiredCoupon : ''
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const onClickViewApplicableItem = (code, analytics) => {
  triggerEvent('CLICK_VIEW_APPLICABLE_ITEMS', {
    custom: {
      custom: {
        v1: code.toUpperCase()
      }
    }
  });
};

const Coupon = props => {
  const {
    onCouponClick,
    selectedCoupon,
    benefitAmount,
    description,
    expiry,
    code,
    link,
    message,
    isApplicableCouponEmpty
  } = props;
  let { errorMessage } = props;
  const expiryPrefix = 'Expires on: ';
  const expiryDateObject = getDateObject(
    new Date(parseInt(expiry)),
    true,
    false
  );
  let expiryDate = '-';
  let expiryTime = '-';
  if (expiryDateObject) {
    const expiryTimeObject = get(expiryDateObject, 'time');
    expiryDate = `${get(expiryDateObject, 'date')} ${get(
      expiryDateObject,
      'monthInWords'
    )} ${get(expiryDateObject, 'year')}`;
    expiryTime = `${get(expiryTimeObject, 'hours')}:${get(
      expiryTimeObject,
      'minutes'
    )} ${get(expiryTimeObject, 'suffix')}`;
  }
  const today = new Date();
  let expired = false;
  let isPotentialCoupon = false;
  if (link && message) {
    isPotentialCoupon = true;
  }

  if (today > expiry) {
    errorMessage = 'Coupon Expired.';
    expired = true;
  }
  const isCouponDisable = expired || isPotentialCoupon;

  const [timerExpired, setTimerExpired] = useState(false);

  const timerCallback = () => {
    setTimerExpired(true);
  };

  const expiryData = getFullDateDiff(expiry);
  let isCouponExpiryEnabled = !!(
    isApp() &&
    expiryData.days === 0 &&
    expiryData.hours < getGrowthHackConfigValue('COUPON_EXPIRY').maximumTime &&
    !timerExpired
  );
  if (isPotentialCoupon) {
    isCouponExpiryEnabled = isCouponExpiryEnabled && isApplicableCouponEmpty;
  }

  return (
    <div className={Styles.validCouponContainer}>
      <div className={isCouponDisable ? Styles.expiredCoupon : ''}>
        <CustomCheckBox
          label={code.toUpperCase()}
          checked={selectedCoupon}
          expired={isCouponDisable}
          onClick={() => {
            !isCouponDisable && onCouponClick(code);
          }}
        />
        <div className={Styles.infoContainer}>
          <div
            className={`${Styles.benefit} ${
              isCouponDisable ? Styles.expiredCoupon : ''
            }`}
          >
            <span>{`Save `}</span>
            <span
              className={`${Styles.amount} ${
                isCouponDisable ? Styles.expiredCoupon : ''
              }`}
            >
              <Rupee
                className={`${
                  isCouponDisable ? Styles.expiredRupeeIcon : Styles.rupeeIcon
                }`}
              />
              {currencyValue(benefitAmount)}
            </span>
          </div>
          <div
            className={`${Styles.extraInfo} ${
              isCouponDisable ? Styles.expiredCoupon : ''
            }`}
          >
            <ReadMore buttonText={'more'}>
              {`${description} ${description ? '.' : ''}`}
            </ReadMore>
            {isCouponExpiryEnabled ? (
              <div className={Styles.couponExpiryBlock}>
                <div className={Styles.couponExpiryContainer}>
                  <span className={Styles.couponExpiryText}>Expiring in</span>
                  <Timer
                    hours={expiryData.hours}
                    minutes={expiryData.minutes}
                    seconds={expiryData.seconds}
                    className={Styles.couponExpiryTimer}
                    stopCallback={timerCallback}
                  />
                </div>
              </div>
            ) : (
              <div className={Styles.expiryBlock}>
                {expiryPrefix}
                <span className={Styles.expiryDate}>{expiryDate}</span>
                <span className={Styles.expiryTime}>{expiryTime}</span>
              </div>
            )}
            {isPotentialCoupon ? (
              <div>
                <hr className={Styles.separator} />
                <div className={Styles.extraInfo}>{message}</div>
                <div className={Styles.extraInfoLink}>
                  <a
                    className={Styles.viewApplicableItem}
                    href={link}
                    onClick={() =>
                      onClickViewApplicableItem(code, props.analytics)
                    }
                  >
                    View applicable items &nbsp;
                    <ChevronRight className={Styles.arrowIcon} />
                  </a>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className={Styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

Coupon.propTypes = {
  expiry: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
  benefitAmount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  selectedCoupon: PropTypes.bool.isRequired,
  link: PropTypes.string,
  message: PropTypes.string
};

export default Coupon;
