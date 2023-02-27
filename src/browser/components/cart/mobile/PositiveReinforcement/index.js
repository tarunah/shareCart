import React, { useState, useEffect } from 'react';
import useConstructor from 'customHooks/useConstructor';
import PropTypes from 'prop-types';

import CartManager from 'commonBrowserUtils/CartManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { getUidx } from 'commonBrowserUtils/Helper';
import { POSITIVE_REINFORCEMENT } from 'commonBrowserUtils/Strings';

import Styles from './positiveReinforcement.base.css';
import SuperShopper from 'iconComp/SuperShopper.jsx';

export const computePercentile = (orders = [], threshold) => {
  const currDate = new Date();
  const timeNow = currDate.getTime();
  const time30DaysPrior = currDate.setDate(currDate.getDate() - 30); // fetching orders for last 30 days
  const totalPurchaseAmt30Days = orders.reduce((accum, order) => {
    const {
      createdOn,
      payments: { amount = 0 }
    } = order;
    if (createdOn <= timeNow && createdOn >= time30DaysPrior) {
      accum += amount;
    }
    return accum;
  }, 0);
  return (totalPurchaseAmt30Days / threshold) * 100;
};

const fireEvent = (cartValue, lookUpObj = {}) => {
  triggerEvent('POSITIVE_REINFORCEMENT', {
    custom: {
      custom: {
        v1: getUidx(),
        v2: lookUpObj.bucket || 0,
        v3: cartValue
      },
      widget: {
        name: 'cart_star_shopper_flag',
        type: 'card'
      }
    }
  });
};

let lookUpObj = {};
let { threshold, percentileLookup } = getGrowthHackConfigValue(
  'POSITIVE_REINFORCEMENT'
);

const PositiveReinforcement = props => {
  const {
    cartData: {
      price: { total }
    }
  } = props;
  useConstructor(() => {
    lookUpObj = {};
    percentileLookup = percentileLookup.sort(
      (a, b) => b.percentile - a.percentile
    );
  });

  const [percentile, setPercentile] = useState(0);

  const getPastOrdersSuccessCallBack = res => {
    const percentileVal = computePercentile(res.orders, threshold);
    if (percentileVal) {
      lookUpObj = percentileLookup.find(item => {
        return percentileVal > item.percentile;
      });
      fireEvent(total, lookUpObj);
      lookUpObj && setPercentile(percentileVal);
    }
  };

  useEffect(() => {
    if (!percentile) {
      CartManager.getPastOrders(
        {
          page: 1,
          getPayments: 'true',
          getReturn: 'true'
        },
        getPastOrdersSuccessCallBack
      );
    }
  }, [percentile]);

  return percentile ? (
    <div className={Styles.container}>
      <div className={Styles.block}>
        <SuperShopper className={Styles.icon} />
        <div className={Styles.textBlock}>
          <div className={Styles.desc}>
            {POSITIVE_REINFORCEMENT.starShopperText
              .split('$b')
              .map((text, index) => {
                if (text === 'BOLD_TEXT') {
                  return (
                    <span className={Styles.bold} key={index}>
                      {text.replace(text, POSITIVE_REINFORCEMENT.starBold)}
                    </span>
                  );
                }
                return text;
              })}
          </div>
          <div className={Styles.caption}>
            {POSITIVE_REINFORCEMENT.starBucketText
              .split('$b')
              .map((text, index) => {
                if (text === 'BOLD_TEXT') {
                  return (
                    <span className={Styles.bold} key={index}>
                      {text
                        .replace(text, POSITIVE_REINFORCEMENT.bucketBold)
                        .replace('<bucket>', lookUpObj.bucket)}{' '}
                    </span>
                  );
                }
                return text;
              })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PositiveReinforcement;

PositiveReinforcement.propTypes = {
  cartData: PropTypes.object
};
