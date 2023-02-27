import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Common components.
import TabBar from 'commonComp/TabBar';
import BankOffers from 'commonComp/BankOffers';
import Offers from 'commonComp/OffersV2';
import PriceBlock from 'commonComp/PriceBlock';
import Loader from 'commonComp/Loader';
import ErrorPage from 'commonComp/ErrorPage';
import SaleTimer from 'commonComp/SaleTimer/Desktop';
import SavingsFomo from 'commonComp/SavingsFomo';
import { checkoutPage } from 'commonUtils/constants';
import ShimmerPlaceholder from 'commonComp/ShimmerPlaceholder';

import PaymentOptions from '../common/PaymentOptions';
import TwoFactorAuthentication from '../common/TwoFactorAuthentication';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import WithStyles from 'commonBrowserUtils/WithStyles';
import {
  getProfileEmail,
  getTryAndBuyOpted,
  getSelectedProducts,
  getSelectedProductsCount,
  currencyValue
} from 'commonBrowserUtils/Helper';
import { getPaymentFields } from 'commonBrowserUtils/priceBreakupFields';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';

import PaymentError from '../common/PaymentError';

// Style Imports.
import Style from './paymentDesktop.base.css';
import OrderReview from '../common/OrderReview';
import AddressStrip from '../../cart/common/AddressStrip';
import { getAddressData } from 'commonBrowserUtils/DataStore';

const PaymentUI = props => {
  const {
    error,
    cartData,
    paymentOptions,
    loading,
    handlePaymentAction,
    twoFA = {},
    disableTwoFA,
    handleTwoFASubmit,
    bankDiscount,
    analytics,
    setPaymentFailureAttributes,
    errorAttribute = {},
    errorOptionNode,
    setRef,
    switchTab,
    closeTwoFA,
    triggerWebengageEvent,
    paymentFailureHalfCardContext,
    kvpairs,
    paymentFailureHalfCardConfig,
    offersConfig,
    showSaveCardConsent,
    myntraInstrumentsData
  } = props;

  const {
    paymentErrorCode,
    paymentErrorCodeOverride,
    cartContext,
    updateCounter
  } = errorAttribute;
  const paymentErrorCodeConfig = getKVPairValue('PAYMENT_ERROR');
  if (cartData && !error) {
    const {
      flags,
      price,
      shippingData,
      coverFeeOpted,
      coverFeeApplicableCharge,
      products,
      userDetails,
      orderAddressId,
      unifiedAddressId
    } = cartData;

    const { paymentConfig } = props;
    const { instrumentData } = paymentConfig || {};
    let { addressData } = props;
    const selectedProducts = getSelectedProducts(products);
    const count = getSelectedProductsCount(selectedProducts);

    const outstandingAmount = currencyValue(get(cartData, 'price.total', 0));
    const priceWithBankDiscount = {
      ...price,
      instruments: {
        data: [...price.instruments.data, { name: 'bank', value: bankDiscount }]
      }
    };

    const total = getTotal(
      DiscountUtil.getPrice(priceWithBankDiscount),
      getPaymentFields()
    );

    let showPaymentFailureHalfCard = false;
    const codEligible =
      get(instrumentData, `${PaymentConstants.COD}.code`) ===
      PaymentConstants.INSTRUMENT_ELIGIBLE_CODE;

    if (
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

    const PaymentModes = paymentOptions
      ? WithStyles(Style)(PaymentOptions, {
          defaultSelect: true,
          mode: 'desktop',
          LayoutClass: TabBar,
          setRef,
          switchTab,
          bankDiscount,
          triggerWebengageEvent,
          setPaymentFailureAttributes,
          totalPayable: total,
          outstandingAmount,
          orderAddressId,
          showPaymentFailureHalfCard,
          ...props
        })
      : null;
    const address = getAddressData();
    addressData = addressData
      ? addressData
      : address?.addressData?.filter(
          add => add.id === address.selectedAddressId
        )[0];
    const isPaymentOptionsLoading = !paymentOptions;
    return (
      <div>
        <Loader show={loading} backdrop={true} />
        <SaleTimer
          saleBannerData={kvpairs.saleBanner}
          priceRevealData={kvpairs.priceReveal}
          enabled={isFeatureEnabled('SALE_TIMER', { type: 'payment' })}
        />
        <div className={Style.paymentLayout}>
          <div className={Style.left}>
            {!isPaymentOptionsLoading &&
              paymentErrorCode &&
              !isEmpty(myntraInstrumentsData) && (
                <div className={Style.paymentErrorBlock}>
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
                      mode="desktop"
                      showPaymentFailureHalfCard={showPaymentFailureHalfCard}
                      halfCardConfig={paymentFailureHalfCardConfig}
                      instrumentDataMap={instrumentData || []}
                      outstandingAmount={outstandingAmount}
                      switchTab={switchTab}
                      totalPayable={total}
                      {...props}
                    />
                  </div>
                </div>
              )}
            <div>
              {isFeatureEnabled('ORDER_REVIEW') &&
                addressData &&
                get(cartData, 'context', '') == 'DEFAULT' && (
                  <AddressStrip
                    addressInfo={addressData}
                    pincode={get(addressData, 'pincode', '')}
                    mode="desktop"
                    isPaymentPage={true}
                  />
                )}
              {offersConfig.enabled ? (
                isFeatureEnabled('VISUAL_OFFER') ? (
                  <BankOffers
                    messages={offersConfig.messages}
                    currentPage={checkoutPage.PAYMENT}
                    total={total}
                    mode="desktop"
                    titleInCaptital={false}
                    bankOfferTitleStyle={Style.bankOfferTitle}
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
              {isFeatureEnabled('ORDER_REVIEW') &&
                addressData &&
                get(cartData, 'context', '') == 'DEFAULT' && (
                  <OrderReview cartData={cartData} mode="desktop" />
                )}
            </div>
            {isPaymentOptionsLoading && (
              <ShimmerPlaceholder
                type="payment"
                mode="desktop"
                container="left"
              />
            )}
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
                mode="desktop"
              />
            ) : null}
            {!isPaymentOptionsLoading && (
              <SavingsFomo
                price={price}
                products={selectedProducts}
                currentPage={checkoutPage.PAYMENT}
              />
            )}
          </div>

          <div className={Style.right}>
            {isPaymentOptionsLoading && (
              <ShimmerPlaceholder
                type="payment"
                mode="desktop"
                container="right"
              />
            )}
            {!isPaymentOptionsLoading && (
              <PriceBlock
                price={priceWithBankDiscount}
                count={count}
                flags={flags}
                getFields={getPaymentFields}
                shippingData={shippingData}
                coverFeeOpted={coverFeeOpted}
                coverFeeApplicableCharge={coverFeeApplicableCharge}
                tryAndBuyOpted={getTryAndBuyOpted(products)}
                total={total}
                userDetails={userDetails}
              />
            )}
          </div>
        </div>
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
    return <Loader show={loading} backdrop={true} />;
  }
};

export default React.memo(PaymentUI);
