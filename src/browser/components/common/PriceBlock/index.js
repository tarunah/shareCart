import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './priceBlockCommon.base.css';

// Components
import PriceBreakUp from 'commonComp/PriceBreakUp';
import SavingsStrip from 'commonComp/SavingsStrip';
import SavingsCallout from 'commonComp/SavingsCallout';

// Utils
import get from 'lodash/get';
import { transformPriceDetails } from 'commonBrowserUtils/transformPriceDetails';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import {
  isFreeEarlyAccess,
  priceBlockEvent,
  getUidx
} from 'commonBrowserUtils/Helper';

const PriceBlock = props => {
  useEffect(() => {
    priceBlockEvent(getUidx(), props.price);
  }, [props.price]);

  const {
    price,
    shippingData = {},
    shippingData: { shippingApplicableCharge } = {},
    flags,
    dynamicStyles = {},
    count,
    className,
    isPaymentInvisibilityEnabled,
    tryAndBuyOpted,
    userDetails: { returnAbuser } = {},
    payMode,
    isPaymentCalloutEnabled
  } = props;
  const priceDetails = transformPriceDetails(
    DiscountUtil.getPrice(price),
    props.getFields(),
    {
      shippingMethod: shippingData.method,
      freeEarlyAccess: isFreeEarlyAccess(
        get(flags, 'coverFeeApplicable.remark')
      ),
      tryAndBuyOpted
    },
    {
      shipping: { shippingApplicableCharge }
    }
  );

  return (
    <div className={`${Style.container} ${className || ''}`}>
      <div
        id="priceBlockHeader"
        className={`${Style.items}
            ${dynamicStyles.animatePriceBlockHeader ? Style.animate : ''}`}
      >
        {count
          ? `PRICE DETAILS (${count} Item${count > 1 ? 's' : ''})`
          : 'PRICE DETAILS'}
      </div>
      {isPaymentCalloutEnabled === 'above_pricing' ? (
        <SavingsCallout {...props} />
      ) : null}
      <div className={Style.detailBody}>
        <PriceBreakUp
          priceDetails={priceDetails}
          returnAbuser={returnAbuser}
          payMode={payMode}
        />
      </div>
      {isPaymentInvisibilityEnabled && (
        <SavingsStrip
          price={price}
          savingsStripStyle={Style.savingsStripStyle}
          shippingApplicableCharge={shippingApplicableCharge}
          isPaymentInvisibilityEnabled={isPaymentInvisibilityEnabled}
        />
      )}
    </div>
  );
};

PriceBlock.propTypes = {
  className: PropTypes.string,
  price: PropTypes.object.isRequired,
  getFields: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  dynamicStyles: PropTypes.object,
  isPaymentInvisibilityEnabled: PropTypes.bool
};

PriceBlock.defaultProps = {
  isPaymentInvisibilityEnabled: false
};

export default PriceBlock;
