import React, { useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  getTryAndBuyOpted,
  getTryAndBuyDetails,
  getUidx
} from 'commonBrowserUtils/Helper';
import { MiniHeaderNav } from './ExpressCheckoutComponents';
import ExpressConstants from './expressConstants';
const { VIEW, TRY_AND_BUY } = ExpressConstants;

import Style from './expresscheckout.base.css';

const TryAndBuyInfo = ({ tryNBuyApplicable, products = [], showDetails }) => {
  const remark = get(tryNBuyApplicable, 'remark');
  const enabled = isFeatureEnabled('TRY_AND_BUY') && remark === 'NO_ISSUE';
  if (!enabled) {
    return null;
  }
  const opted = getTryAndBuyOpted(products);
  const price = Number(getKVPairValue('TNB_PRICE') || 0);
  let message = '';
  const {
    tnbEligibleItems,
    tnbEligibleTotalQuantity,
    count
  } = getTryAndBuyDetails(products);

  useEffect(() => {
    triggerEvent('XPRESS_TRY_AND_BUY_LOAD', {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card'
        },
        widget_items: {
          name: 'try-and-buy-load',
          type: 'button'
        },
        custom: {
          v1: getUidx(),
          v2: count,
          v3: tnbEligibleItems.length,
          v4: price
        }
      }
    });
  }, [products]);

  if (tnbEligibleItems.length === products.length) {
    message = 'All items are eligible';
  } else {
    message = `${tnbEligibleTotalQuantity} of ${count} items are eligible`;
  }
  const header = (
    <span>
      Try & Buy for {price ? <span>&#8377;{price}</span> : 'Free'}{' '}
      {opted && <span className={Style.greenText}>(Applied Successfully)</span>}
    </span>
  );

  return (
    <div className={Style.tnbContainer}>
      <MiniHeaderNav
        header={header}
        link={VIEW}
        action={showDetails}
        section={TRY_AND_BUY}
      />
      <div className={Style.tnbMessage}>{message}</div>
    </div>
  );
};

TryAndBuyInfo.propTypes = {
  products: PropTypes.array,
  showDetails: PropTypes.func
};

TryAndBuyInfo.defaultProps = {
  products: [],
  showDetails: () => {}
};

export default TryAndBuyInfo;
