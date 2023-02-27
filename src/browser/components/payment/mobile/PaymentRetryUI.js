import React from 'react';
import get from 'lodash/get';

// Common Components
import Accordian from 'commonComp/Accordian';
import Offers from 'commonComp/OffersV2';
import PriceBlock from 'commonComp/PriceBlock';
import Loader from 'commonComp/Loader';
import StickyButton from 'commonComp/StickyButton';
import ErrorPage from 'commonComp/ErrorPage';
import BankOffers from 'commonComp/BankOffers';

import TwoFactorAuthentication from '../common/TwoFactorAuthentication';
import PaymentOptions from '../common/PaymentOptions';
import RetryTimer from '../common/RetryTimer';
import RetrySessionExpiryModal from '../common/RetrySessionExpiryModal';
import RetryBackConfirmationModal from '../common/RetryBackConfirmationModal';
import PaymentError from '../common/PaymentError';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import WithStyles from 'commonBrowserUtils/WithStyles';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
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
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { checkoutPage, orderStates } from 'commonUtils/constants';

// Style Imports.
import Style from './paymentMobile.base.css';

const PaymentRetryUI = props => {
  const { stickyButton, ...restProps } = props;
  const {
    error,
    paymentOptions,
    errorOptionNode,
    referrer,
    loading,
    handlePaymentAction,
    twoFA = {},
    disableTwoFA,
    handleTwoFASubmit,
    spinner,
    bankDiscount,
    updateDynamicStyles,
    analytics,
    backConfirmationModalShown,
    retryGCapplied,
    retryTimerDisabled,
    errorAttribute = {},
    creditsBalance,
    setPaymentFailureAttributes,
    retrySessionEnabled,
    disableRetrySession,
    enableRetryTimer,
    disableRetryTimer,
    stayHere,
    tryLater,
    setRef,
    updateStickyButton,
    switchTab,
    closeTwoFA,
    triggerWebengageEvent,
    offersConfig,
    onClickHandler,
    showSaveCardConsent
  } = restProps;

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
      mode: 'mobile',
      LayoutClass: Accordian,
      bankDiscount,
      defaultSelect: false,
      setRef,
      updateStickyButton,
      switchTab,
      setPaymentFailureAttributes,
      triggerWebengageEvent,
      retryGCappliedValue,
      totalPayable: total,
      outstandingAmount: formattedFinalOutstanding,
      ...restProps
    });

    return (
      <div>
        <div className={Style.mobileContainer}>
          {referrer !== orderStates.PENDING && (
            <RetryTimer
              mode="mobile"
              sessionEnabled={retrySessionEnabled}
              stopTimer={disableRetrySession}
              disabled={retryTimerDisabled}
            />
          )}
          <div className={`${Style.mobileLayout}`}>
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
                    mode="mobile"
                    showPaymentFailureHalfCard={false}
                    {...restProps}
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
                mode="mobile"
              />
            ) : null}
            <div className={Style.priceBreakUp}>
              <PriceBlock
                payMode="retry"
                price={priceWithGCAndBankDiscount}
                getFields={getPaymentFields}
                total={total}
              />
            </div>
            <StickyButton
              total={total}
              text={stickyButton.text}
              clickHandler={stickyButton.onClick || onClickHandler}
              enabled={stickyButton.enabled}
              updateDynamicStyles={updateDynamicStyles}
            />
            <RetrySessionExpiryModal
              show={!retrySessionEnabled}
              mode={'mobile'}
            />
            <RetryBackConfirmationModal
              mode="mobile"
              show={backConfirmationModalShown}
              stayHere={stayHere}
              tryLater={tryLater}
            />
            <Loader show={loading} backdrop={true} />
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
    return <Loader show={loading} spinner={spinner} backdrop={true} />;
  }
};

export default PaymentRetryUI;
