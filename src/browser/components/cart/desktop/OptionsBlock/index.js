import React from 'react';
import get from 'lodash/get';

import OptionsContainer from '../../common/OptionsContainer';
import GiftWrap from './GiftWrap';
import Coupons from './Coupons';
import DonationStripBlock from '../../common/DonationStrip';

import { getSelectedProducts } from 'commonBrowserUtils/Helper';
import { getSelectedDonationAmount } from 'commonBrowserUtils/CartHelper';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

export const OptionsUI = props => {
  const {
    data: {
      id: cartId,
      price: { discounts },
      price,
      giftOrder,
      products,
      coupons,
      flags
    },
    handleCartAction,
    analytics,
    isExchangeCart
  } = props;
  const selectedProductsCount = getSelectedProducts(products).length;
  const couponDiscount =
    discounts.data.find(field => field.name === 'coupon') || {};
  const attachedProductOffers = get(props.data, 'attachedProductOffers', {});
  const attachedProductDiscount = attachedProductOffers.totalOfferAmount || 0;
  let couponDiscountValue = couponDiscount.value - attachedProductDiscount;
  if (couponDiscountValue < 0) {
    couponDiscountValue = 0;
  }
  const appliedCouponsCount = (
    coupons.filter(
      coupon => coupon.type === 'coupon' && coupon.status === 'SUCCESS'
    ) || {}
  ).length;

  const showGiftWrap =
    flags.giftwrapApplicable.value && isFeatureEnabled('GIFTWRAP');
  const donationAmount = getSelectedDonationAmount(price);

  return (
    <div>
      <Coupons
        attachedProductOffers={attachedProductOffers}
        handleCartAction={handleCartAction}
        discount={couponDiscountValue}
        count={appliedCouponsCount}
        cartId={cartId}
        disable={isFeatureEnabled('COUPON_DISABLED')}
        selectedProductsCount={selectedProductsCount}
        analytics={analytics}
        isExchangeCart={isExchangeCart}
      />
      {showGiftWrap && (
        <GiftWrap
          {...giftOrder}
          selectedProductsCount={selectedProductsCount}
          handleCartAction={handleCartAction}
        />
      )}
      {isFeatureEnabled('CHECKOUT_DONATION') && !isExchangeCart && (
        <DonationStripBlock
          handleCartAction={handleCartAction}
          donationAmount={donationAmount}
          selectedProductsCount={selectedProductsCount}
          mode="desktop"
        />
      )}
    </div>
  );
};

const OptionsBlock = props => {
  return (
    <OptionsContainer
      render={() => {
        return <OptionsUI {...props} />;
      }}
    />
  );
};

export default OptionsBlock;
