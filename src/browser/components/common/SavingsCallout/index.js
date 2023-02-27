import React from 'react';
import get from 'lodash/get';
import SavingsCalloutIcon from 'iconComp/SavingsCallout.jsx';

import { PAYMENT_SAVINGS_CALLOUT_AMT } from 'commonBrowserUtils/Strings';
import { currencyValue } from 'commonBrowserUtils/Helper';

import Styles from './savingsCallout.base.css';

const SavingsCallout = props => {
  const { isSticky } = props;
  const totalSavings = get(props, 'cartData.price.totalSavings', 0);

  return totalSavings > 0 ? (
    <div
      className={`${Styles.container} ${!isSticky && Styles.abovePriceBlock}`}
    >
      {!isSticky ? (
        <span>
          <SavingsCalloutIcon className={Styles.savingsCalloutIcon} />
        </span>
      ) : null}
      {PAYMENT_SAVINGS_CALLOUT_AMT.text.split('$b').map((text, index) => {
        if (text === 'AMOUNT') {
          return (
            <span className={Styles.amount} key={index}>
              {text.replace(text, ` ₹${currencyValue(totalSavings)} `)}
            </span>
          );
        }
        return text;
      })}
    </div>
  ) : null;
};

export default SavingsCallout;
