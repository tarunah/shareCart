import React from 'react';
import get from 'lodash/get';
import Sprite from 'commonComp/Sprite';
import { getDefaultSavedInstrument, getSpriteObj } from './util.js';
import Cashback from './../../../payment/common/Cashback';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
const { UPI, BANK_MAP, VPA, CARD_TYPE, SAVED_INSTRUMENT } = PaymentConstants;
import ExpressConstants from './expressConstants';
const {
  PAY_VIA,
  CHANGE,
  CASHBACK_ERROR,
  OFFER_ELIGIBILITY,
  CASHBACK_RETRY_MSG,
  VALID_PAYMENTS,
  KLASS_OVERRIDE_LIST,
  MAESTRO
} = ExpressConstants;

import { MiniHeaderNav } from './ExpressCheckoutComponents';
import BalanceAmount from './BalanceAmount';
import PayableAmount from './PayableAmount';
import Style from './expresscheckout.base.css';
import Info from 'iconComp/Info.jsx';

const PaymentSectionWrapper = props => {
  const {
    showDetails,
    paymentObj,
    paymentType,
    updateCVV,
    errorMsg,
    updateBankDiscount,
    cartData,
    hidePayment,
    paymentOptions
  } = props;
  return (
    <div
      className={`${Style.paymentSectionWrapper} ${
        hidePayment ? Style.hidePayments : null
      }`}
    >
      <MiniHeaderNav
        header={PAY_VIA}
        link={CHANGE}
        action={showDetails}
        section={'payment'}
      />
      <PaymentSectionInfo
        paymentObj={paymentObj}
        paymentType={paymentType}
        updateCVV={updateCVV}
        errorMsg={errorMsg}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        paymentOptions={paymentOptions}
      />
    </div>
  );
};

const ExpressCashback = ({ data }) => {
  const { state, icbRetryCount, onClickEligibility, totalAmount } = data;
  if (get(state, 'icb.show', false)) {
    const { code, message, error } = state.icb;
    if (error) {
      if (state.currentRetryCount <= icbRetryCount) {
        return (
          <div>
            <div
              className={
                totalAmount ? Style.errorMsg : Style.hideExpressContent
              }
            >
              {CASHBACK_ERROR}
            </div>
            <span className={Style.retryBtn} onClick={onClickEligibility}>
              {OFFER_ELIGIBILITY}
            </span>
          </div>
        );
      } else {
        return (
          <div
            className={totalAmount ? Style.errorMsg : Style.hideExpressContent}
          >
            {CASHBACK_RETRY_MSG}
          </div>
        );
      }
    } else if (code) {
      // TODO :- check this if it is required or not
      // return <div className={Style.cashbackInfo}>{message}</div>;
      return <div className={Style.cashbackInfo} />;
    } else if (message) {
      return <div className={Style.cashbackTxt}>{message}</div>;
    }
  } else if (state.deff && state.deff.show) {
    return <div className={Style.cashbackTxt}>{state.deff.message}</div>;
  }
  return null;
};

const DebitCreditCard = ({ card = {}, updateCVV, errorMsg }) => {
  const cardImageType =
    PaymentConstants.AVAILABLE_CARD_IMAGES.indexOf(card.cardType) !== -1
      ? `card-${card.cardType.toLowerCase()}`
      : 'card-default';
  const isMaestro = (card.cardType || '').toLowerCase() === MAESTRO;
  return (
    <div>
      <div className={Style.cardDetails}>
        <div className={Style.bankInfo}>
          <div className={Style.bankCardType}>
            {card.bankName} {card.productType}
          </div>
          <div className={Style.maskedCardno}>{card.paymentMaskedNumber}</div>
        </div>
        <div className={Style.cardHolder}>
          <div className={Style.cardLogoName}>
            <Sprite name={cardImageType} />
            <div className={Style.holderName}>{card.cardHolderName}</div>
          </div>
          <input
            onChange={updateCVV}
            className={`${Style.cvvInput} ${errorMsg ? Style.cvvError : null}`}
            placeholder="CVV"
            type="text"
            id="cvvInput"
            maxLength="4"
            size="4"
            autoComplete="off"
            inputmode="numeric"
          />
        </div>
      </div>
      {isMaestro && (
        <div className={Style.optionalCVV}>
          <Info className={Style.infoIcon} />
          CVV not required if not mentioned on your card
        </div>
      )}
      <div>
        {errorMsg ? <div className={Style.errorMsg}>{errorMsg}</div> : null}
      </div>
    </div>
  );
};

const PaymentModes = ({ instrumentsData, paymentType }) => {
  const { bankName, spriteName, paymentName } = getSpriteObj(
    instrumentsData,
    paymentType
  );
  const mappedName = BANK_MAP[bankName.toLowerCase()];
  const hasOverride = KLASS_OVERRIDE_LIST.indexOf(mappedName) !== -1;
  const overrideKlass = 'override-bankList';
  const klass = hasOverride
    ? overrideKlass
    : `override-${mappedName || 'bank'}`;
  return (
    <div className={Style.paymentCompany}>
      {spriteName && <Sprite name={spriteName} className={Style[klass]} />}
      <div className={`${!spriteName ? Style.cod : ''}`}>
        {bankName} {paymentType !== UPI && paymentName}
      </div>
    </div>
  );
};

const SavedUPI = ({ instrumentsData }) => {
  const { spriteName, payerName, vpa, bankName } = getSpriteObj(
    instrumentsData,
    SAVED_INSTRUMENT
  );
  return (
    <div className={Style.savedUPI}>
      {spriteName && (
        <Sprite name={spriteName} className={Style[`override-${bankName}`]} />
      )}
      <div className={Style.upiDetails}>
        <div className={Style.vpa}>{vpa}</div>
        <div className={Style.payerName}>{payerName}</div>
      </div>
    </div>
  );
};

const PaymentSectionInfo = ({
  paymentObj,
  paymentType = '',
  updateCVV,
  errorMsg,
  cartData,
  updateBankDiscount
}) => {
  const defaultSavedInstrument = getDefaultSavedInstrument(paymentObj);
  const paymentInstrumentType = get(
    defaultSavedInstrument,
    'paymentInstrumentType',
    ''
  );
  if (paymentType === SAVED_INSTRUMENT && paymentInstrumentType === CARD_TYPE) {
    return (
      <div className={Style.paymentSectionInfo}>
        <DebitCreditCard
          card={defaultSavedInstrument}
          updateCVV={updateCVV}
          errorMsg={errorMsg}
        />
        <Cashback
          cartData={cartData}
          instrumentHandle={defaultSavedInstrument.instrumentId}
          updateBankDiscount={updateBankDiscount}
          render={data => <ExpressCashback {...data} />}
        />
      </div>
    );
  }
  if (paymentType === SAVED_INSTRUMENT && paymentInstrumentType === VPA) {
    return <SavedUPI instrumentsData={paymentObj} />;
  }
  if (VALID_PAYMENTS.indexOf(paymentType) !== -1) {
    return (
      <PaymentModes instrumentsData={paymentObj} paymentType={paymentType} />
    );
  } else return null;
};

const PaymentSection = props => {
  const {
    hidePayment,
    balanceAmountProps: {
      gcObj,
      lpObj,
      updateLoyalty,
      updateCredit,
      loyaltyInfo
    },
    payableAmountProps: { price, hasChecked, finalAmount, showPayable },
    getNewPaymentForm,
    paymentObj,
    paymentType,
    updateBankDiscount,
    cartData,
    showDetails,
    errorMsg,
    updateCVV,
    paymentOptions
  } = props;

  return (
    <div className={`${Style.paymentOptions}`}>
      <PaymentSectionWrapper
        paymentObj={paymentObj}
        paymentType={paymentType}
        updateCVV={updateCVV}
        errorMsg={errorMsg}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        showDetails={showDetails}
        hidePayment={hidePayment}
        paymentOptions={paymentOptions}
      />
      <BalanceAmount
        gcObj={gcObj}
        lpObj={lpObj}
        updateLoyalty={updateLoyalty}
        updateCredit={updateCredit}
        loyaltyInfo={loyaltyInfo}
      />
      <PayableAmount
        data={price}
        hasChecked={hasChecked}
        finalAmount={finalAmount}
        showPayable={showPayable}
      />
      {getNewPaymentForm()}
    </div>
  );
};

export {
  PaymentSection,
  PaymentSectionWrapper,
  ExpressCashback,
  DebitCreditCard,
  PaymentModes,
  PaymentSectionInfo
};
