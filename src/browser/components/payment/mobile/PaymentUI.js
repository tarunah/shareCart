import React, { useMemo } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Common Components
import Accordian from 'commonComp/Accordian';
import Offers from 'commonComp/OffersV2';
import PriceBlock from 'commonComp/PriceBlock';
import Loader from 'commonComp/Loader';
import StickyButton from 'commonComp/StickyButton';
import SaleTimer from 'commonComp/SaleTimer/Mobile';
import CheckoutSteps from 'commonComp/CheckoutSteps';
import MyntraValuesStrip from 'commonComp/MyntraValuesStrip';
import SavingsFomo from 'commonComp/SavingsFomo';
import AddressStripV2 from 'commonComp/AddressStripV2';
import ShimmerPlaceholder from 'commonComp/ShimmerPlaceholder';

import TwoFactorAuthentication from '../common/TwoFactorAuthentication';
import PaymentOptions from '../common/PaymentOptions';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import WithStyles from 'commonBrowserUtils/WithStyles';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  getProfileEmail,
  getTryAndBuyOpted,
  getSelectedProducts,
  getSelectedProductsCount,
  currencyValue,
  isPWA,
  getUidx
} from 'commonBrowserUtils/Helper';
import { getPaymentFields } from 'commonBrowserUtils/priceBreakupFields';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import loadComponent from 'commonUtils/loadComponent';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import {
  checkoutPage,
  pageMode,
  navigationHeader
} from 'commonUtils/constants';

import { getPaymentTriedCount } from 'commonBrowserUtils/PaymentHelper';
import { isPriorityCheckoutEnabled } from 'commonBrowserUtils/CartHelper';
import { CHECKOUT_STATES } from '../../common/CheckoutSteps';

// Style Imports.
import Style from './paymentMobile.base.css';
import OrderReview from '../common/OrderReview';
import { getAddressData } from 'commonBrowserUtils/DataStore';

const InsiderRewards = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "insiderRewards" */
      'commonComp/InsiderRewards'
    )
});

const ErrorPage = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "errorPage" */
      'commonComp/ErrorPage'
    )
});

const Banner = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "banner" */
      'commonComp/Banner'
    ),
  loaderProperties: { backdrop: false }
});

const BankOffers = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "bankOffers" */
      'commonComp/BankOffers'
    ),
  loaderProperties: { backdrop: false }
});

const PaymentError = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "paymentError" */
      '../common/PaymentError'
    ),
  loaderProperties: { backdrop: false }
});

const GCV2_PARAMS = {
  customStates: [
    CHECKOUT_STATES.COMPLETED,
    CHECKOUT_STATES.COMPLETED,
    CHECKOUT_STATES.ACTIVE
  ],
  customLabels: ['Design', 'Details', 'Payment'],
  showV2: true
};

const fireEvent = (
  cartData,
  isPaymentTrustMsgBannerEnabled,
  userDetails = {}
) => {
  const loadBanner =
    isPaymentTrustMsgBannerEnabled && !userDetails.isFirstTimeCustomer;
  const type = loadBanner ? 'banner' : '';
  const eventName = loadBanner
    ? 'TRUST_BANNER_LOAD'
    : 'TRUST_BANNER_REPEAT_FLAG_LOAD';
  // Fire default event for users who land on payment page and fire event on load of payment banner as well
  triggerEvent(eventName, {
    custom: {
      custom: {
        v1: getUidx(),
        v2: get(cartData, 'price.subTotal', 0)
      },
      widget: {
        name: loadBanner
          ? 'payment_trust_banner_repeat_users'
          : 'payment_trust_banner_repeat_flag',
        type
      }
    }
  });
};

// 3 cases to show the banner: ab, New user, Enabled in config and URL is present
export const getBannerUrl = (newUserBannerConfig, userDetails, isV2Enabled) =>
  newUserBannerConfig.enabled &&
  userDetails.isFirstTimeCustomer &&
  ((isV2Enabled && newUserBannerConfig.urlV2) || newUserBannerConfig.url);

const fireSavingsCalloutEvent = cartData => {
  triggerEvent('PAYMENT_SAVINGS_CALLOUT_FLAG', {
    custom: {
      custom: {
        v1: getUidx(),
        v2: get(cartData, 'price.total', 0),
        v3: get(cartData, 'price.totalSavings', 0)
      },
      widget: {
        name: 'payment_savings_callout_flag',
        type: 'other'
      }
    }
  });
};

const PaymentUI = props => {
  const { stickyButton, ...restProps } = props;
  const {
    error,
    cartData,
    paymentOptions,
    loading,
    errorOptionNode,
    handlePaymentAction,
    twoFA = {},
    disableTwoFA,
    handleTwoFASubmit,
    spinner,
    bankDiscount,
    updateDynamicStyles,
    dynamicStyles,
    isExchangeCart,
    analytics,
    errorAttribute = {},
    setPaymentFailureAttributes,
    setRef,
    updateStickyButton,
    switchTab,
    closeTwoFA,
    triggerWebengageEvent,
    paymentFailureHalfCardContext,
    paymentFailureHalfCardConfig,
    hasExpressCheckoutAB,
    isNewUserPaymentBannerV2Enabled,
    offersConfig,
    kvpairs,
    handleAddressAction,
    onClickHandler,
    showSaveCardConsent,
    paymentConfig,
    myntraInstrumentsData
  } = restProps;

  let { addressData } = restProps;
  const isAocV2Variant3Enabled =
    isVariantEnabled('AOC_V2_VARIANT3') && !isExchangeCart;

  const isOrderReviewEnabled = isFeatureEnabled('ORDER_REVIEW');

  const {
    paymentErrorCode,
    paymentErrorCodeOverride,
    cartContext,
    updateCounter
  } = errorAttribute;
  const isPaymentOptionsLoading = !paymentOptions;

  if (cartData && !error) {
    const {
      flags,
      price,
      shippingData,
      coverFeeOpted,
      userDetails,
      coverFeeApplicableCharge,
      products,
      orderAddressId,
      unifiedAddressId
    } = cartData;
    const isPaymentCalloutEnabled = isFeatureEnabled('PAYMENT_SAVINGS_CALLOUT');
    fireSavingsCalloutEvent(cartData);

    const address = getAddressData();
    addressData = addressData
      ? addressData
      : address?.addressData?.filter(
          add => add.id === address.selectedAddressId
        )[0];

    const { paymentConfig } = restProps;

    const { instrumentData } = paymentConfig || {};

    const isPaymentTrustMsgBannerEnabled = isFeatureEnabled(
      'PAYMENT_TRUST_MSG_BANNER'
    );
    const selectedProducts = getSelectedProducts(products);
    const count = getSelectedProductsCount(selectedProducts);

    const outstandingAmount = currencyValue(get(cartData, 'price.total', 0));
    const paymentTriedCount = getPaymentTriedCount();
    const paymentErrorCodeConfig = getKVPairValue('PAYMENT_ERROR');

    let showPaymentFailureHalfCard = false;
    const codEligible =
      get(instrumentData, `${PaymentConstants.COD}.code`) ===
      PaymentConstants.INSTRUMENT_ELIGIBLE_CODE;

    if (
      paymentFailureHalfCardContext === 'generic_failure' &&
      paymentTriedCount >= paymentFailureHalfCardConfig.threshold
    ) {
      showPaymentFailureHalfCard = true;
    } else if (
      paymentFailureHalfCardContext === 'dope_consent' &&
      paymentErrorCode &&
      codEligible &&
      get(
        paymentErrorCodeConfig[paymentErrorCode],
        'dopeUserConsentEnabled'
      ) !== false
      // check if need to put a condition for online failure only
    ) {
      showPaymentFailureHalfCard = true;
    }

    const priceWithBankDiscount = {
      ...price,
      instruments: {
        data: [...price.instruments.data, { name: 'bank', value: bankDiscount }]
      }
    };

    const { value: loyaltypoints } =
      get(price, 'instruments.data', []).find(
        obj => obj.name === 'loyaltypoints'
      ) || {};
    const total = getTotal(
      DiscountUtil.getPrice(priceWithBankDiscount),
      getPaymentFields()
    );
    const totalMRP = get(cartData, 'price.mrp');
    const PaymentModes = paymentOptions
      ? WithStyles(Style)(PaymentOptions, {
          mode: 'mobile',
          LayoutClass: Accordian,
          bankDiscount,
          defaultSelect: false,
          showPaymentFailureHalfCard,
          setRef,
          updateStickyButton,
          switchTab,
          setPaymentFailureAttributes,
          triggerWebengageEvent,
          totalPayable: total,
          outstandingAmount,
          orderAddressId,
          ...restProps
        })
      : null;

    const newUserBannerConfig = getKVPairValue(
      'NEW_USER_DEFAULT_PAYMENT_BANNER'
    );

    const checkoutStepsParams = isFeatureEnabled('GIFTCARD_V2')
      ? GCV2_PARAMS
      : {};

    const showBanner =
      get(newUserBannerConfig, 'enabled') &&
      get(userDetails, 'isFirstTimeCustomer');

    const trustMsgBannerUrl = getGrowthHackConfigValue(
      'PAYMENT_TRUST_BANNER_URL'
    );

    fireEvent(cartData, isPaymentTrustMsgBannerEnabled, userDetails);

    const isExpressCheckoutEnabled = useMemo(
      () => hasExpressCheckoutAB && !isPriorityCheckoutEnabled(cartData),
      [cartData]
    );

    return (
      <div className={Style.mobileContainer}>
        <CheckoutSteps
          currentPage={'Payment'}
          hideSteps={
            isExpressCheckoutEnabled || isExchangeCart || isAocV2Variant3Enabled
          }
          {...checkoutStepsParams}
        />

        {isPaymentTrustMsgBannerEnabled && !userDetails.isFirstTimeCustomer ? (
          <div className={Style.bottomMargin}>
            <Banner bannerURL={trustMsgBannerUrl} />
          </div>
        ) : null}

        {showBanner ? (
          <div className={Style.bottomMargin}>
            <Banner
              bannerURL={getBannerUrl(
                newUserBannerConfig,
                userDetails,
                isNewUserPaymentBannerV2Enabled
              )}
            />
          </div>
        ) : null}
        <SaleTimer
          saleBannerData={kvpairs.saleBanner}
          priceRevealData={kvpairs.priceReveal}
          enabled={isFeatureEnabled('SALE_TIMER', { type: 'payment' })}
        />
        {(isOrderReviewEnabled || isAocV2Variant3Enabled) &&
          addressData &&
          get(cartData, 'context', '') == 'DEFAULT' && (
            <AddressStripV2
              mode={pageMode.MOBILE}
              page={checkoutPage.PAYMENT}
              addressInfo={addressData}
              pincode={addressData.pincode}
              history={history}
              topPadding={isPWA() ? navigationHeader.HEIGHT : 0}
              handleAddressAction={handleAddressAction}
              isOrderReview={isOrderReviewEnabled}
            />
          )}
        {offersConfig.enabled ? (
          isFeatureEnabled('VISUAL_OFFER') ? (
            <BankOffers
              messages={offersConfig.messages}
              currentPage={checkoutPage.PAYMENT}
              total={total}
              mode="mobile"
              titleInCaptital={true}
              bankOfferTitleStyle={Style.bankOfferTitle}
              bankOfferPillContainerStyle={Style.bankOfferPillContainer}
            />
          ) : (
            <Offers
              title={offersConfig.heading}
              messages={offersConfig.messages}
              defaultMessageCount={1}
              enabled={offersConfig.messages.length > 0}
            />
          )
        ) : null}
        {isOrderReviewEnabled && get(cartData, 'context', '') == 'DEFAULT' && (
          <OrderReview cartData={cartData} mode="mobile" />
        )}
        <div className={`${Style.mobileLayout}`}>
          {!isPaymentOptionsLoading &&
            paymentErrorCode &&
            !isEmpty(myntraInstrumentsData) && (
              <div
                className={
                  !showPaymentFailureHalfCard && Style.paymentErrorBlock
                }
              >
                <div ref={errorOptionNode}>
                  <PaymentError
                    id={PaymentConstants.PAYMENT_ERROR_OPTIONS_ID}
                    errorAttributes={{
                      code: paymentErrorCode,
                      codeDisplayOverride: paymentErrorCodeOverride,
                      cartContext,
                      updateCounter
                    }}
                    analytics={analytics}
                    mode="mobile"
                    showPaymentFailureHalfCard={showPaymentFailureHalfCard}
                    halfCardConfig={paymentFailureHalfCardConfig}
                    instrumentDataMap={instrumentData || []}
                    outstandingAmount={outstandingAmount}
                    switchTab={switchTab}
                    totalPayable={total}
                    {...restProps}
                  />
                </div>
              </div>
            )}
          {isPaymentOptionsLoading ? (
            <ShimmerPlaceholder type="payment" mode="mobile" />
          ) : null}
          {PaymentModes}
          {twoFA.display ? (
            <TwoFactorAuthentication
              showSaveCardConsent={showSaveCardConsent}
              email={twoFA.enableEmailOtp ? getProfileEmail() : ''}
              numbers={twoFA.mobileNumbers}
              paymentModes={twoFA.paymentModes}
              orderAddressId={orderAddressId}
              unifiedAddressId={unifiedAddressId}
              close={closeTwoFA}
              handlePaymentAction={handlePaymentAction}
              submit={handleTwoFASubmit}
              errorCallback={disableTwoFA}
              mode="mobile"
            />
          ) : null}
          {!isPaymentOptionsLoading && (
            <div className={Style.priceBreakUp}>
              <PriceBlock
                cartData={cartData}
                price={priceWithBankDiscount}
                count={count}
                flags={flags}
                getFields={getPaymentFields}
                shippingData={shippingData}
                coverFeeOpted={coverFeeOpted}
                coverFeeApplicableCharge={coverFeeApplicableCharge}
                dynamicStyles={dynamicStyles}
                tryAndBuyOpted={getTryAndBuyOpted(products)}
                userDetails={userDetails}
                isPaymentCalloutEnabled={isPaymentCalloutEnabled}
              />
            </div>
          )}
          {isFeatureEnabled('CHECKOUT_INSIDER') && (
            <InsiderRewards
              cartData={cartData}
              selectedProducts={selectedProducts}
            />
          )}
          <MyntraValuesStrip currentPage={checkoutPage.PAYMENT} />
          {!isPaymentOptionsLoading && (
            <StickyButton
              total={total}
              text={stickyButton.text}
              clickHandler={stickyButton.onClick || onClickHandler}
              points={loyaltypoints}
              enabled={stickyButton.enabled}
              updateDynamicStyles={updateDynamicStyles}
              currentPage={checkoutPage.PAYMENT}
              totalMRP={totalMRP}
              cartData={cartData}
              isPaymentCalloutEnabled={isPaymentCalloutEnabled}
            />
          )}
        </div>
        <Loader show={loading && !isPaymentOptionsLoading} backdrop={true} />
        <SavingsFomo
          price={price}
          products={selectedProducts}
          currentPage={checkoutPage.PAYMENT}
        />
      </div>
    );
  } else if (error) {
    return (
      <ErrorPage
        message={'Something went wrong. Please reload'}
        reload={true}
      />
    );
  } else {
    return <Loader show={loading} spinner={spinner} backdrop={true} />;
  }
};

export default React.memo(PaymentUI);
