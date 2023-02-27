import React, { useState } from 'react';
import get from 'lodash/get';

import OptionsContainer from '../../common/OptionsContainer';
import GiftWrap from './GiftWrap';
import Coupons from './Coupons';
import TryAndBuy from 'commonComp/TryAndBuy';
import DonationStripBlock from '../../common/DonationStrip';
import { checkoutPage } from 'commonUtils/constants';

import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  getSelectedProducts,
  getFullDateDiff,
  isApp
} from 'commonBrowserUtils/Helper';
import { getSelectedDonationAmount } from 'commonBrowserUtils/CartHelper';
import { getProductDeliveryInfo } from 'commonBrowserUtils/AddressHelper';

import Styles from './optionsBlock.base.css';

export const OptionsUI = props => {
  let {
    data: {
      id: cartId,
      price: { discounts },
      price,
      giftOrder,
      flags,
      coupons,
      count,
      modifiedAt,
      userDetails,
      products = [],
      applicableCoupons,
      potentialCoupons = []
    },
    handleCartAction,
    analytics,
    isExchangeCart,
    setLoader,
    isCartShowCouponEnabled
  } = props;
  let optionsData = null;
  const selectedProducts = getSelectedProducts(products);
  const selectedProductsCount = selectedProducts.length;
  const couponDiscount =
    discounts.data.find(field => field.name === 'coupon') || {};
  const productDeliveryInfo = getProductDeliveryInfo(selectedProducts);

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

  const appliedCoupons = [
    ...coupons.filter(
      coupon => coupon.type === 'coupon' && coupon.status === 'SUCCESS'
    )
  ];

  const showGiftWrap =
    flags.giftwrapApplicable.value && isFeatureEnabled('GIFTWRAP');

  const donationAmount = getSelectedDonationAmount(price);

  const [timerExpired, setTimerExpired] = useState(false);

  const timerCallback = () => {
    setTimerExpired(true);
  };

  const couponExpiry = Object.values(coupons).reduce(
    (previous, { expiry, type, status }) => {
      previous =
        previous > expiry && type === 'coupon' && status === 'SUCCESS'
          ? expiry
          : previous;
      return previous;
    },
    Number.POSITIVE_INFINITY
  );
  const expiryData =
    couponExpiry !== Number.POSITIVE_INFINITY
      ? getFullDateDiff(couponExpiry)
      : null;
  const showCouponExpiry = !!(
    isApp() &&
    expiryData &&
    expiryData.days === 0 &&
    expiryData.hours < getGrowthHackConfigValue('COUPON_EXPIRY').maximumTime &&
    !timerExpired
  );

  const reorderOptionsBlock =
    isFeatureEnabled('COUPON_NUDGES') &&
    (coupons?.filter(coupon => coupon?.status === 'SUCCESS')?.length > 0 ||
      applicableCoupons?.length > 0 ||
      potentialCoupons?.length > 0);

  if (reorderOptionsBlock) {
    optionsData = (
      <div>
        {showGiftWrap && (
          <div className={Styles.giftwrapContainer}>
            <GiftWrap {...giftOrder} handleCartAction={handleCartAction} />
          </div>
        )}
        {isVariantEnabled('AOC_V2_VARIANT3') && (
          <TryAndBuy
            {...flags}
            pageSource={checkoutPage.CART}
            products={selectedProducts}
            handleCartAction={handleCartAction}
            productDeliveryInfo={productDeliveryInfo}
            isNewUser={userDetails.isFirstTimeCustomer}
          />
        )}
        {isFeatureEnabled('CHECKOUT_DONATION') && !isExchangeCart && (
          <DonationStripBlock
            handleCartAction={handleCartAction}
            donationAmount={donationAmount}
            selectedProductsCount={selectedProductsCount}
            mode="mobile"
          />
        )}
        <Coupons
          attachedProductOffers={attachedProductOffers}
          discount={couponDiscountValue}
          appliedCoupons={appliedCoupons}
          potentialCoupons={potentialCoupons}
          count={appliedCouponsCount}
          cartId={cartId}
          disable={isFeatureEnabled('COUPON_DISABLED')}
          handleCartAction={handleCartAction}
          cartItemCount={count}
          cartModifiedAt={modifiedAt}
          userDetails={userDetails}
          selectedProductsCount={selectedProductsCount}
          analytics={analytics}
          isExchangeCart={isExchangeCart}
          setLoader={setLoader}
          applicableCoupons={applicableCoupons}
          isCartShowCouponEnabled={isCartShowCouponEnabled}
          showCouponExpiry={showCouponExpiry}
          expiryData={expiryData}
          timerCallback={timerCallback}
        />
      </div>
    );
  } else {
    optionsData = (
      <div>
        <Coupons
          attachedProductOffers={attachedProductOffers}
          discount={couponDiscountValue}
          appliedCoupons={appliedCoupons}
          potentialCoupons={potentialCoupons}
          count={appliedCouponsCount}
          cartId={cartId}
          disable={isFeatureEnabled('COUPON_DISABLED')}
          handleCartAction={handleCartAction}
          cartItemCount={count}
          cartModifiedAt={modifiedAt}
          userDetails={userDetails}
          selectedProductsCount={selectedProductsCount}
          analytics={analytics}
          isExchangeCart={isExchangeCart}
          setLoader={setLoader}
          applicableCoupons={applicableCoupons}
          isCartShowCouponEnabled={isCartShowCouponEnabled}
          showCouponExpiry={showCouponExpiry}
          expiryData={expiryData}
          timerCallback={timerCallback}
        />
        {showGiftWrap && (
          <div className={Styles.giftwrapContainer}>
            <GiftWrap {...giftOrder} handleCartAction={handleCartAction} />
          </div>
        )}
        {isVariantEnabled('AOC_V2_VARIANT3') && (
          <TryAndBuy
            {...flags}
            pageSource={checkoutPage.CART}
            products={selectedProducts}
            handleCartAction={handleCartAction}
            productDeliveryInfo={productDeliveryInfo}
            isNewUser={userDetails.isFirstTimeCustomer}
          />
        )}
        {isFeatureEnabled('CHECKOUT_DONATION') && !isExchangeCart && (
          <DonationStripBlock
            handleCartAction={handleCartAction}
            donationAmount={donationAmount}
            selectedProductsCount={selectedProductsCount}
            mode="mobile"
          />
        )}
      </div>
    );
  }

  return optionsData;
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
