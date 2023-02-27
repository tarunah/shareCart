import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// Styles
import Style from './savingsStrip.base.css';

// Utils
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { currencyValue, getUidx } from 'commonBrowserUtils/Helper';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import Rupee from 'iconComp/Rupee.jsx';

const FormatString = ({ text, savings }) => {
  return text.split('{cart_savings}').map((msg, idx) => {
    if (idx === 0) {
      return (
        <span key={idx}>
          {msg}
          <span className={Style.savings}>
            <Rupee className={Style.rupeeIcon} />
            {savings}&nbsp;
          </span>
        </span>
      );
    }
    return <span key={idx}>{msg}</span>;
  });
};

const SavingsStrip = ({
  price: { charges: { data } = {}, totalSavings, total } = {},
  shippingApplicableCharge,
  savingsStripStyle,
  isPaymentInvisibilityEnabled
}) => {
  const savingsStripConfig = getGrowthHackConfigValue('SAVINGS_STRIP_CONFIG');
  const {
    includeShipping,
    stripThreshold,
    textThreshold,
    preThresholdText,
    postThresholdText,
    paymentInvisibilitySavingsText
  } = savingsStripConfig;
  const shippingCharge = data.find(charge => charge.name === 'shipping') || {};
  const bagSavings = Number(
    includeShipping && !isEmpty(shippingCharge)
      ? totalSavings + shippingApplicableCharge
      : totalSavings
  );
  let savingsStripText = '';
  if (isPaymentInvisibilityEnabled) {
    savingsStripText = paymentInvisibilitySavingsText;
  } else if (bagSavings >= stripThreshold) {
    savingsStripText =
      bagSavings < textThreshold ? preThresholdText : postThresholdText;
  }

  useEffect(() => {
    if (bagSavings && isPaymentInvisibilityEnabled) {
      triggerEvent('PAYMENT_INVISIBILITY_SAVINGS_STRIP_LOAD', {
        custom: {
          custom: {
            v1: getUidx(),
            v2: bagSavings,
            v3: total
          },
          widget: {
            name: 'payment_page_savings',
            type: 'card'
          }
        }
      });
    }
  }, [bagSavings]);

  if (bagSavings && savingsStripText) {
    return (
      <div
        className={`${Style.savingsStrip} ${
          savingsStripStyle ? savingsStripStyle : ''
        }`}
      >
        <div className={Style.savingsStripText}>
          {isPaymentInvisibilityEnabled && (
            <span className={Style.rupeeCircleContainer}>
              <RupeeBold className={Style.rupeeIcon} />
            </span>
          )}
          {savingsStripText && (
            <FormatString
              text={savingsStripText}
              savings={currencyValue(bagSavings)}
            />
          )}
        </div>
      </div>
    );
  }
  return null;
};

SavingsStrip.propTypes = {
  price: PropTypes.object,
  shippingApplicableCharge: PropTypes.number,
  savingsStripStyle: PropTypes.string
};

SavingsStrip.defaultProps = {
  isPaymentInvisibilityEnabled: false
};

export default SavingsStrip;
