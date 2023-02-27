import React, { Component } from 'react';
import Styles from './couponBanner.base.css';
import get from 'lodash/get';

// utils
import { getKVPairValue } from 'commonUtils/KVPairManager';

export default function CouponBanner({ mode }) {
  const couponConfig = getKVPairValue('CONFIRMATION_COUPON_BANNER');
  const isMobile = mode === 'mobile';

  return (
    <div className={`${Styles.container} ${!isMobile ? Styles.desktop : ''}`}>
      <div className={Styles.headerContainer}>
        <div className={Styles.header}>{get(couponConfig, 'header')}</div>
        <div className={Styles.subHeader}>
          {`${get(couponConfig, 'validText')} `}
          <span className={Styles.boldText}>
            {get(couponConfig, 'validDate')}
          </span>
        </div>
      </div>
      <div className={Styles.coupon}>
        <div className={`${Styles.couponLine} ${Styles.line1}`} />
        <div className={`${Styles.couponLine} ${Styles.line2}`} />
        <div className={`${Styles.couponLine} ${Styles.line3}`} />
        {get(couponConfig, 'couponText')}
      </div>
    </div>
  );
}
