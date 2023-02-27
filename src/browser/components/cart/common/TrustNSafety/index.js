import React from 'react';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import TrustNSafetyBadge from 'iconComp/TrustNSafetyBadge.jsx';

import Style from './trustNSafety.base.css';
const TrustNSafetyMarker = props => {
  const isMobile = props.mode === 'mobile';
  const heading = get(
    getKVPairValue('CART_TRUST_AND_SAFETY_MARKER'),
    'heading'
  );
  const subText = get(
    getKVPairValue('CART_TRUST_AND_SAFETY_MARKER'),
    'subText'
  );
  return (
    <div
      className={`${Style.container} ${
        !isMobile ? Style.desktopContainer : ''
      } `}
    >
      <div className={Style.innerContainer}>
        <TrustNSafetyBadge className={Style.trustIcon} />
        <div className={`${isMobile ? Style.content : ''}`}>
          <div className={Style.heading}>{heading}</div>
          <div className={Style.subText}>{subText}</div>
        </div>
      </div>
    </div>
  );
};

export default TrustNSafetyMarker;
