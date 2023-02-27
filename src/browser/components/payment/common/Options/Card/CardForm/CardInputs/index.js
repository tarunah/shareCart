import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Common Style Imports.
import Style from './../cardForm.base.css';

// Page Specific Component
import Cashback from './../../../../Cashback';
import CashbackMsg from './../../../../Cashback/CashbackMsg';

import Modal from 'commonComp/Modal';
import Sprite from 'commonComp/Sprite';
import Input from 'commonComp/InputV2';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { isGiftcardContext } from 'commonUtils/helper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import sanitize from 'commonUtils/Sanitize';
import { SAVE_CARD_CALLLOUT } from 'commonBrowserUtils/Strings';
import LowSRMessage from '../../../../LowSRMessage';
import Info from 'iconComp/Info.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import SaveCardConsent from '../../../../SaveCardConsent';

const CardNumber = props => {
  const {
    form = {},
    plutusInfo,
    setValue,
    checkValue,
    onFocus,
    cartData,
    updateBankDiscount,
    savedCardInstrumentData: { type = '' } = {},
    payMode,
    paymentOptions,
    retryGCappliedValue
  } = props;
  const {
    cardNumber: { hasLowSR, disable }
  } = form;
  const cardImage =
    form.cardType &&
    PaymentConstants.AVAILABLE_CARD_IMAGES.indexOf(form.cardType) !== -1
      ? 'cardv2-' + form.cardType.toLowerCase()
      : 'cardv2-default';

  return (
    <div
      className={`${Style.row} ${
        hasLowSR ? null : Style.cardNumberBottomMargin
      }`}
    >
      <Input
        id="cardNumber"
        type="tel"
        label="Card Number"
        value={form.cardNumber.value}
        maxLength={form.cardNumber.maxLength}
        onChange={setValue}
        onFocus={onFocus}
        onBlur={checkValue}
      />
      {form.cardNumber.error && (
        <div className={Style.errorMessage}>{form.cardNumber.error}</div>
      )}
      <LowSRMessage
        instrumentType={'new_card'}
        binNumber={form.cardNumber.value}
        className={Style.lowSRMessage}
        show={hasLowSR || disable}
        disable={disable}
      />
      {plutusInfo.show && !isGiftcardContext() && (
        <Cashback
          payMode={payMode}
          cartData={cartData}
          cardNumber={plutusInfo.cardNumber}
          paymentOptions={paymentOptions}
          retryGCappliedValue={retryGCappliedValue}
          updateBankDiscount={updateBankDiscount}
          handlePaymentAction={props.handlePaymentAction}
          isNewCard={true}
          render={data => <CashbackMsg data={data} />}
        />
      )}
      <Sprite name={cardImage} className={Style.cardType} />
    </div>
  );
};

CardNumber.propTypes = {
  form: PropTypes.object,
  setValue: PropTypes.func,
  checkValue: PropTypes.func,
  onFocus: PropTypes.func,
  cartData: PropTypes.object
};

/**
 * CardName:
 */
const CardName = props => {
  const { form = {}, setValue, checkValue, onFocus } = props;
  return (
    <div className={Style.row}>
      <Input
        id="cardName"
        label="Name on card"
        value={form.cardName.value}
        maxLength={form.cardName.maxLength}
        onChange={setValue}
        onFocus={onFocus}
        onBlur={checkValue}
      />
      {form.cardName.error && (
        <div className={Style.errorMessage}>{form.cardName.error}</div>
      )}
    </div>
  );
};

CardName.propTypes = {
  form: PropTypes.object,
  setValue: PropTypes.func,
  checkValue: PropTypes.func,
  onFocus: PropTypes.func
};

/**
 *
 * Expiry Month and Year segment in the form.
 */
const ExpiryMonthYear = props => {
  const { form = {}, setValue, checkValue, onFocus } = props;

  return (
    <div className={`${Style.row} ${Style.expiry}`}>
      <Input
        id="expiry"
        label="Valid Thru (MM/YY)"
        type="tel"
        pattern="\d*"
        maxLength="5"
        onChange={setValue}
        value={form.expiry.value}
        onFocus={onFocus}
        onBlur={checkValue}
      />
      {form.expiry.error && (
        <div className={Style.errorMessage}> {form.expiry.error}</div>
      )}
    </div>
  );
};

ExpiryMonthYear.propTypes = {
  form: PropTypes.object,
  setValue: PropTypes.func
};

const ExpiryCVVInfo = ({ form }) =>
  !(form.expiry.required || form.cvv.required) ? (
    <div className={Style.expiryMessage}>
      Expiry and CVV not required if not mentioned on your card
    </div>
  ) : null;

ExpiryCVVInfo.propTypes = {
  form: PropTypes.object
};

/**
 * SaveCard Component for the form.
 */
class SaveCard extends React.Component {
  constructor(props) {
    super(props);

    // Functional Binds.
    this.saveCardTokenizationConfig =
      getKVPairValue('SAVED_CARD_CONSENT') || {};
    this.savedCardAutoConsentInfo =
      get(this.saveCardTokenizationConfig, 'autoConsent.newCard') || {};
    this.toggleSaveCardSuggestion = this.toggleSaveCardSuggestion.bind(this);
    this.renderSaveCardCheckbox = this.renderSaveCardCheckbox.bind(this);
    this.toggleSavedCardConsentHalfCard = this.toggleSavedCardConsentHalfCard.bind(
      this
    );
    this.checkBoxComponent = this.checkBoxComponent.bind(this);
    this.renderInfoIcon = this.renderInfoIcon.bind(this);
    this.state = {
      saveCardSuggestion: false,
      saveCardConsentHalfCard: false
    };
  }

  toggleSaveCardSuggestion() {
    this.setState(prevState => {
      return { saveCardSuggestion: !prevState.saveCardSuggestion };
    });
  }

  toggleSavedCardConsentHalfCard() {
    triggerEvent('AUTO_CONSENT_INFO_ICON_CLICK', {
      custom: {
        custom: {
          v1: 'new_card',
          v2: !this.state.saveCardConsentHalfCard
        }
      }
    });
    this.setState(prevState => ({
      saveCardConsentHalfCard: !prevState.saveCardConsentHalfCard
    }));
  }

  checkBoxComponent() {
    const { form = {}, setValue } = this.props;
    return (
      <React.Fragment>
        {form.saveCard.value ? (
          <CheckboxActive
            id="saveCard-icon"
            data-value={`${form.saveCard.value}`}
            className={Style.selectedCheckboxIcon}
            onClick={setValue}
          />
        ) : (
          <CheckboxInactive
            id="saveCard-icon"
            data-value={`${form.saveCard.value}`}
            className={Style.checkboxIcon}
            onClick={setValue}
          />
        )}
      </React.Fragment>
    );
  }

  renderInfoIcon(isPhase2Enabled, notEligibleForTokenization) {
    if (isPhase2Enabled) {
      return null;
    }
    return (
      <Info
        className={Style.savedInfoIcon}
        onClick={
          !notEligibleForTokenization
            ? () => this.toggleSavedCardConsentHalfCard()
            : () => this.toggleSaveCardSuggestion()
        }
      />
    );
  }

  renderSaveCardCheckbox() {
    const { form = {}, setValue } = this.props;
    const {
      checkBoxText,
      checkBoxSubText,
      notSupportedCard
    } = this.savedCardAutoConsentInfo;
    const { phase2Enabled = false } = this.saveCardTokenizationConfig;
    const cardNumberLength = get(form, 'cardNumber.value', '').length;
    const notEligibleForTokenization =
      get(form, 'tokenizationConsent') === true && cardNumberLength > 6;

    const isPhase2Enabled = phase2Enabled && notEligibleForTokenization;
    return (
      <React.Fragment>
        {cardNumberLength > 6 && (
          <div>
            {!isPhase2Enabled && this.checkBoxComponent()}
            <span
              className={`${
                isPhase2Enabled ? Style.inEligibleTokenizationText : ''
              } ${Style.saveCardLabel}`}
              id="saveCard-label"
              data-value={`${form.saveCard}`}
            >
              {notEligibleForTokenization
                ? notSupportedCard ||
                  SAVE_CARD_CALLLOUT.inValidForTokenisationText
                : checkBoxText || SAVE_CARD_CALLLOUT.validForTokenisationText}
            </span>

            {this.renderInfoIcon(isPhase2Enabled, notEligibleForTokenization)}

            {!notEligibleForTokenization && (
              <div className={Style.eligibleTokenizationText}>
                {checkBoxSubText ||
                  SAVE_CARD_CALLLOUT.validForTokenisationCheckoutSubText}
              </div>
            )}

            {!isPhase2Enabled && this.state.saveCardSuggestion && (
              <div className={Style.saveCardSuggestion}>
                {SAVE_CARD_CALLLOUT.saveCardSuggestion}
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { form = {}, setValue, savedCardInstrumentData } = this.props;
    const { saveCardConsentHalfCard } = this.state;
    const saveCardCode = get(savedCardInstrumentData, 'code');
    const cardType = get(form, 'cardType', '');
    const {
      SAVEDCARD_LIMIT_REACHED_CODE,
      SAVING_CARD_NOT_ALLOWED_CODE,
      SAVE_CARDS_INFO_MAP
    } = PaymentConstants;

    return (
      <div className={Style.saveCardWrapper}>
        {saveCardCode === SAVEDCARD_LIMIT_REACHED_CODE ||
        saveCardCode === SAVING_CARD_NOT_ALLOWED_CODE ? (
          <div className={Style.savedLimitText}>
            {SAVE_CARDS_INFO_MAP[saveCardCode] || ''}
          </div>
        ) : isFeatureEnabled('AUTO_SAVE_CARD') ? (
          <div>
            We will save this card for your convenience and faster checkout, you
            can remove it by visiting 'Saved Cards' in 'Account' section.
          </div>
        ) : (
          this.renderSaveCardCheckbox()
        )}
        <SaveCardConsent
          toggleShowConsentFn={this.toggleSavedCardConsentHalfCard}
          showConsent={saveCardConsentHalfCard}
          showConsentButton={false}
          cardType={cardType}
        />
      </div>
    );
  }
}

SaveCard.propTypes = {
  form: PropTypes.object,
  setValue: PropTypes.func
};

/**
 * CVV Info
 */
class CVV extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCVVInfo: false };
    ['toggleCVVInfo'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  toggleCVVInfo() {
    this.setState(prevState => ({ showCVVInfo: !prevState.showCVVInfo }));
  }

  render() {
    const { form = {}, setValue, checkValue, onFocus, payMode } = this.props;
    return (
      <div className={`${Style.row} ${Style.cvv}`}>
        <Input
          id="cvv"
          label="CVV"
          type="tel"
          autoComplete="off"
          pattern="\d*"
          autoFocus={false}
          value={form.cvv.value}
          maxLength={form.cvv.maxLength}
          onChange={setValue}
          onFocus={onFocus}
          onBlur={checkValue}
        />
        {form.cvv.error && (
          <div className={Style.errorMessage}>{form.cvv.error} </div>
        )}
        <Info className={Style.cvvInfoIcon} onClick={this.toggleCVVInfo} />
        {this.state.showCVVInfo && (
          <Modal
            cancelCallback={this.toggleCVVInfo}
            className={Style.cvvInfoModal}
            cancelIconConfig={{ show: true }}
            enableBackButton={payMode !== 'retry'}
          >
            <div className={Style.title}>What is CVV Number?</div>
            <div>It’s a 3-digit code on the back of your card</div>
            <Sprite name="wallet-cvv-3-digits" className={Style.cvvSprite} />
            <div className={Style.title}> Have American Express Card?</div>
            <div>
              It’s a 4-digit number on the front, just above your credit card
              number
            </div>
            <Sprite name="wallet-cvv-4-digits" className={Style.cvvSprite} />
          </Modal>
        )}
      </div>
    );
  }
}

export { CardNumber, CardName, ExpiryMonthYear, ExpiryCVVInfo, CVV, SaveCard };
