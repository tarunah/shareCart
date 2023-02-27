import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Style from './inlinePriceComponent.base.css';

import { StrikedAmount, ItemDiscount } from '../ItemComponents';
import { OfferDiscountText } from '../ItemOfferComponents';
import { currencyValue } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import RupeeBold from 'iconComp/RupeeBold.jsx';

const Amount = ({ value, className, iconClass }) =>
  value ? (
    <span className={className}>
      <RupeeBold className={iconClass} />
      {currencyValue(value)}
    </span>
  ) : null;

const SellerPriceComponent = props => {
  const { subTotal, mrp, classNameConfig, discountText = '' } = props;
  const {
    amountClass = '',
    strikedAmountClass = '',
    discountTextClass = '',
    containerClass = ''
  } = classNameConfig;
  return (
    <div className={containerClass}>
      <Amount value={subTotal} className={`${Style.amount} ${amountClass}`} />
      <span>
        {subTotal < mrp && (
          <StrikedAmount
            value={mrp}
            className={`${Style.strikedAmount} ${strikedAmountClass}`}
          />
        )}
        {discountText && (
          <span className={`${Style.discountText} ${discountTextClass}`}>
            {discountText}
          </span>
        )}
      </span>
    </div>
  );
};

const InlinePriceComponent = props => {
  const {
    price,
    offerData,
    discount,
    flags = {},
    className,
    strikedAmountClass,
    offerId,
    comboDiscountClass
  } = props;
  let priceToShow = price.subTotal;
  const unit = get(discount, 'meta.unit', '') || '';

  const discountRupeeValue = price.mrp - priceToShow;
  const discountInValue = discountRupeeValue
    ? currencyValue(discountRupeeValue)
    : '0';

  if (price.mrp === price.subTotal) {
    return (
      <div className={`${Style.price} ${className}`}>
        <Amount value={priceToShow} className={Style.bold} />
        <OfferDiscountText flags={flags} />
      </div>
    );
  } else {
    return (
      <div className={`${Style.price} ${className}`}>
        <Amount value={priceToShow} className={Style.bold} />
        <StrikedAmount value={price.mrp} className={strikedAmountClass} />
        <OfferDiscountText
          {...offerData}
          discountEntry={discount}
          flags={flags}
        />
        {!flags.freeItem && (
          <ItemDiscount
            offerId={offerId}
            price={price}
            comboDiscountClass={comboDiscountClass}
          />
        )}
      </div>
    );
  }
};

export default InlinePriceComponent;
export { Amount, SellerPriceComponent };

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  iconClass: PropTypes.string
};

InlinePriceComponent.propTypes = {
  price: PropTypes.object.isRequired,
  discount: PropTypes.object,
  offerData: PropTypes.object,
  flags: PropTypes.object,
  className: PropTypes.string,
  strikedAmountClass: PropTypes.string
};

SellerPriceComponent.propTypes = {
  subTotal: PropTypes.number,
  mrp: PropTypes.number,
  classNameConfig: PropTypes.object,
  discountText: PropTypes.text
};
