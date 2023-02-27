import React from 'react';

// Styles
import Style from './addressServiceability.base.css';

// Utils
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const TryNBuyInfo = ({ tryNBuy, tryNBuyApplicable }) => {
  const tryNbuyEnabled = isFeatureEnabled('TRY_AND_BUY');
  let TNBText = '';
  if (tryNBuy.value && tryNbuyEnabled) {
    TNBText = tryNBuyApplicable.value
      ? 'Try & Buy available'
      : tryNBuyApplicable.remark === 'TOO_MANY_ITEMS'
      ? 'Too many items for Try & Buy'
      : 'Try & Buy unavailable';
  }
  return TNBText ? (
    <div>
      <span className={Style.bullet}>•</span>
      <span>{TNBText}</span>
    </div>
  ) : null;
};

const CodInfo = ({ cashOnDelivery, cardOnDelivery }) => {
  let CODText = '';
  if (cashOnDelivery.value && cardOnDelivery.value) {
    CODText = 'Pay on Delivery available';
  } else if (cashOnDelivery.value) {
    CODText = 'Cash on Delivery available';
  } else if (!cardOnDelivery.value) {
    CODText = 'Pay on Delivery not available';
  } else {
    CODText = 'UPI on Delivery available';
  }
  return CODText ? (
    <div>
      <span className={Style.bullet}>•</span>
      <span>{CODText}</span>
    </div>
  ) : null;
};

const FasterShippingInfo = ({ expressShipping, sddShipping }) => {
  return (isFeatureEnabled('NDD') && expressShipping.value) ||
    (isFeatureEnabled('SDD') && sddShipping.value) ? (
    <div>
      <span className={Style.bullet}>•</span>
      <span>Faster delivery available</span>
    </div>
  ) : null;
};

const AddressServiceability = props => {
  const {
    serviceabilityFlags: { expressShipping, sddShipping },
    selectedShippingData: {
      flags: { cashOnDelivery, cardOnDelivery, tryNBuy }
    },
    tryNBuyApplicable,
    giftwrapApplicable
  } = props;
  return (
    <div className={Style.container}>
      <TryNBuyInfo tryNBuy={tryNBuy} tryNBuyApplicable={tryNBuyApplicable} />
      <CodInfo
        cashOnDelivery={cashOnDelivery}
        cardOnDelivery={cardOnDelivery}
      />
      <FasterShippingInfo
        expressShipping={expressShipping}
        sddShipping={sddShipping}
      />
    </div>
  );
};

export default AddressServiceability;
