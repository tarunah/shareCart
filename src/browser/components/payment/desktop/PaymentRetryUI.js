import React from 'react';
import get from 'lodash/get';

// Common components.
import TabBar from 'commonComp/TabBar';
import BankOffers from 'commonComp/BankOffers';
import Offers from 'commonComp/OffersV2';
import PriceBlock from 'commonComp/PriceBlock';
import Loader from 'commonComp/Loader';
import ErrorPage from 'commonComp/ErrorPage';

import PaymentOptions from '../common/PaymentOptions';
import TwoFactorAuthentication from '../common/TwoFactorAuthentication';
import PaymentError from '../common/PaymentError';
import RetryTimer from '../common/RetryTimer';
import RetrySessionExpiryModal from '../common/RetrySessionExpiryModal';
import RetryBackConfirmationModal from '../common/RetryBackConfirmationModal';

import WithStyles from 'commonBrowserUtils/WithStyles';
import {
  getProfileEmail,
  currencyValue,
  roundNumber
} from 'commonBrowserUtils/Helper';
import {
  getRetryGCappliedValue,
  consolidatePriceInstruments
} from 'commonBrowserUtils/PaymentHelper';
import { getPaymentFields } from 'commonBrowserUtils/priceBreakupFields';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { checkoutPage, orderStates } from 'commonUtils/constants';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';

// Style Imports.
import Style from './paymentDesktop.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const PaymentRetryUI = props => {
  const {
    paymentOptions,
    errorAttribute = {},
    bankDiscount,
    loading,
    error,
    errorOptionNode,
    referrer,
    analytics,
    offersConfig,
    twoFA,
    backConfirmationModalShown,
    retryGCapplied,
    retryTimerDisabled,
    creditsBalance,
    retrySessionEnabled,
    disableRetrySession,
    enableRetryTimer,
    disableRetryTimer,
    stayHere,
    tryLater,
    setRef,
    switchTab,
    triggerWebengageEvent,
    setPaymentFailureAttributes,
    closeTwoFA,
    handlePaymentAction,
    handleTwoFASubmit,
    disableTwoFA,
    showSaveCardConsent
  } = props;

  if (paymentOptions) {
    const {
      paymentErrorCode,
      paymentErrorCodeOverride,
      cartContext,
      updateCounter
    } = errorAttribute;
    const { price = {} } = paymentOptions;
    const retryGCappliedValue = retryGCapplied
      ? getRetryGCappliedValue(
          get(creditsBalance, 'gcBalance.totalBalance'),
          price.total
        )
      : 0;

    const creditsAdjustedOutstandingAmount = retryGCapplied
      ? price.total - retryGCappliedValue
      : price.total;

    const formattedFinalOutstanding = currencyValue(
      creditsAdjustedOutstandingAmount
    );

    const priceWithGCAndBankDiscount = {
      ...price,
      instruments: {
        data: consolidatePriceInstruments(get(price, 'instruments.data', []), {
          giftcard: retryGCappliedValue,
          bank: bankDiscount
        })
      }
    };

    const total = roundNumber(
      getTotal(
        DiscountUtil.getPrice(priceWithGCAndBankDiscount),
        getPaymentFields()
      ),
      0
    );

    const PaymentModes = WithStyles(Style)(PaymentOptions, {
      defaultSelect: true,
      mode: 'desktop',
      LayoutClass: TabBar,
      setRef,
      switchTab,
      bankDiscount,
      triggerWebengageEvent,
      setPaymentFailureAttributes,
      retryGCappliedValue,
      totalPayable: total,
      outstandingAmount: formattedFinalOutstanding,
      ...props
    });

    return (
      <div>
        <Loader show={loading} backdrop={true} />
        {referrer !== orderStates.PENDING && (
          <RetryTimer
            mode="desktop"
            sessionEnabled={retrySessionEnabled}
            stopTimer={disableRetrySession}
            disabled={retryTimerDisabled}
          />
        )}
        <div className={Style.paymentLayout}>
          <div className={Style.left}>
            {paymentErrorCode && (
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
                    showPaymentFailureHalfCard={false}
                    {...props}
                  />
                </div>
              </div>
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
            {PaymentModes}
            {twoFA.display ? (
              <TwoFactorAuthentication
                showSaveCardConsent={showSaveCardConsent}
                email={twoFA.enableEmailOtp ? getProfileEmail() : ''}
                numbers={twoFA.mobileNumbers}
                paymentModes={twoFA.paymentModes}
                payMode="retry"
                close={closeTwoFA}
                handlePaymentAction={handlePaymentAction}
                submit={handleTwoFASubmit}
                errorCallback={disableTwoFA}
                enableRetryTimer={enableRetryTimer}
                disableRetryTimer={disableRetryTimer}
                mode="desktop"
              />
            ) : null}
          </div>
          <div className={Style.right}>
            <PriceBlock
              payMode="retry"
              price={priceWithGCAndBankDiscount}
              getFields={getPaymentFields}
              total={total}
            />
            <RetrySessionExpiryModal
              show={!retrySessionEnabled}
              mode="desktop"
            />
            <RetryBackConfirmationModal
              mode="desktop"
              show={backConfirmationModalShown}
              stayHere={stayHere}
              tryLater={tryLater}
            />
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

export default PaymentRetryUI;
