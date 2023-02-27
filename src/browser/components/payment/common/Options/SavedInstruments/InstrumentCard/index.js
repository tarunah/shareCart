import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

// Style Imports.
import Style from './instrumentCard.base.css';

import Cashback from '../../../Cashback';
import CashbackMsg from '../../../Cashback/CashbackMsg';

import {
  ImmobilizedDiv,
  ImmobilizedSprite
} from 'commonComp/ImmobilizeComponent';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { SAVE_CARD_CALLLOUT } from 'commonBrowserUtils/Strings';
import LowSRMessage from '../../../LowSRMessage';
import ToolTip from 'commonComp/ToolTip';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Info from 'iconComp/Info.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import SaveCardConsent from '../../../SaveCardConsent';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';

class InstrumentCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.savedCardAutoConsentInfo =
      get(getKVPairValue('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') || {};
    this.state = {
      saveCardConsentHalfCard: false,
      discountApplicable: false
    };

    this.cvvInput = null;
    this.setInputRef = this.setInputRef.bind(this);
    this.renderAutoConsentText = this.renderAutoConsentText.bind(this);
    this.toggleAutoConsentCheckbox = this.toggleAutoConsentCheckbox.bind(this);
    this.toggleSavedCardConsentHalfCard = this.toggleSavedCardConsentHalfCard.bind(
      this
    );
    this.renderSecuredIcon = this.renderSecuredIcon.bind(this);
    this.cardImageType =
      PaymentConstants.AVAILABLE_CARD_IMAGES.indexOf(props.cardType) !== -1
        ? 'card-' + props.cardType.toLowerCase()
        : 'card-default';

    const appName = (props.bankCode || '').toLowerCase().replace(/\s/g, '');
    this.iconDisplayUPI =
      getKVPairValue('UPI_CONFIG').iconDisplayUPI.indexOf(appName) !== -1
        ? appName
        : 'otherupi';
    this.isSavingsNudgeEnabled = isFeatureEnabled('CHECKOUT_SAVINGS_NUDGE');
    this.isInlineOfferForCardEnabled = isFeatureEnabled('INLINE_OFFER_CARD');
  }

  toggleAutoConsentCheckbox() {
    triggerEvent('AUTO_CONSENT_SAVED_CARD_CLICK', {
      custom: {
        custom: {
          v1: !this.props.allowTokenization
        }
      }
    });
    this.props.toggleAllowTokenization();
  }

  toggleSavedCardConsentHalfCard() {
    triggerEvent('AUTO_CONSENT_INFO_ICON_CLICK', {
      custom: {
        custom: {
          v1: 'saved_card',
          v2: !this.state.saveCardConsentHalfCard
        }
      }
    });
    this.setState(prevState => ({
      saveCardConsentHalfCard: !prevState.saveCardConsentHalfCard
    }));
  }

  setInputRef(node) {
    this.cvvInput = node;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      get(this, 'props.paymentInstrumentType') === 'vpa' &&
      this.props.selected
    ) {
      this.props.updateBankDiscount(0);
    }
    if (!prevProps.selected && this.props.selected) {
      this.cvvInput && this.cvvInput.focus();
    }
    if (!prevProps.cvvError && this.props.cvvError) {
      if (this.cvvInput) {
        this.cvvInput.focus();
        this.cvvInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  createCardInfo(maskedCardNumber = '') {
    return `**** ${maskedCardNumber.slice(-4)}`;
  }

  renderSecuredIcon() {
    const isMobile = get(this.props, 'deviceMode') === 'mobile';
    return (
      <span
        className={`${!isMobile ? Style.securedDesktop : ''} ${Style.secured}`}
      >
        <div className={Style.tickIconWrapper}>
          <div className={Style.tickIcon}>L</div>
        </div>
        <span className={Style.securedText}>Secured</span>
      </span>
    );
  }

  getOffer(isApplicable) {
    return isApplicable ? (
      <span className={Style.inlineOffer}>1 Offer</span>
    ) : null;
  }

  renderDetails() {
    const {
      bankName,
      productType,
      maskedCardNumber,
      cardHolderName,
      expired,
      inValid,
      cardType,
      disable,
      tokenizationConsent,
      deviceMode
    } = this.props;
    const isMobile = deviceMode === 'mobile';
    const cardHeader =
      bankName || productType
        ? `${bankName || ''} ${productType || ''}`
        : 'Debit/Credit Card';
    const maestroCard = (cardType || '').toLowerCase() === 'maestro';
    return (
      <div className={Style.details}>
        <div className={Style.line}>
          <ImmobilizedDiv
            disabled={disable}
            disableClassName={Style.disabledName}
            className={Style.bankName}
          >
            {cardHeader}
            {this.getOffer(this.state.discountApplicable)}
            {!this.isInlineOfferForCardEnabled &&
              tokenizationConsent &&
              isMobile &&
              this.renderSecuredIcon()}
          </ImmobilizedDiv>
          <ImmobilizedSprite
            disabled={disable}
            disableClassName={Style.disabledSprite}
            name={this.cardImageType}
          />
        </div>
        <div className={Style.line}>
          <ImmobilizedDiv
            disabled={disable}
            disableClassName={Style.disabledName}
          >
            {this.createCardInfo(maskedCardNumber)}
            {(expired || inValid) && (
              <span className={Style.expiredText}>
                {expired ? 'Expired' : 'Invalid'}
              </span>
            )}
          </ImmobilizedDiv>
          <ImmobilizedDiv
            className={`${Style.subLine} ${Style.rightSubLine}`}
            disabled={disable}
            disableClassName={Style.disabledName}
          >
            {cardHolderName}
          </ImmobilizedDiv>
        </div>
        {!this.isInlineOfferForCardEnabled && (
          <div>
            {tokenizationConsent && !isMobile && this.renderSecuredIcon()}
          </div>
        )}
        {maestroCard && (
          <div>
            <span className={Style.maestroCard}>
              Maestro card not supported
            </span>
            <ToolTip
              elem={<Info className={Style.tooltipInfoIcon} />}
              className={Style.toolTipText}
            >
              Banks do not support Maestro cards now for transactions.
            </ToolTip>
          </div>
        )}
      </div>
    );
  }

  renderAutoConsentText() {
    const {
      bankName = 'Bank',
      allowTokenization,
      tokenizationFlag
    } = this.props;

    const checkBoxInvalidText = get(
      this.savedCardAutoConsentInfo,
      'checkBoxInvalidText'
    );
    return tokenizationFlag ? (
      <div className={Style.autoConsentCheckbox}>
        {allowTokenization ? (
          <CheckboxActive
            className={Style.selectedCheckboxIcon}
            onClick={this.toggleAutoConsentCheckbox}
          />
        ) : (
          <CheckboxInactive
            className={Style.checkboxIcon}
            onClick={this.toggleAutoConsentCheckbox}
          />
        )}
        <span className={Style.saveCardLabel}>
          {get(this.savedCardAutoConsentInfo, 'checkBoxText') ||
            SAVE_CARD_CALLLOUT.validForTokenisationText}
        </span>
        <Info
          className={Style.savedInfoIcon}
          onClick={this.toggleSavedCardConsentHalfCard}
        />
      </div>
    ) : tokenizationFlag !== '' && checkBoxInvalidText === '' ? (
      <div className={Style.consentDisabledText}>
        {(
          checkBoxInvalidText ||
          SAVE_CARD_CALLLOUT.savedCardInvalidForTokenisationText
        ).replace('%bank', bankName)}
      </div>
    ) : null;
  }

  renderCard() {
    const {
      payMode,
      instrumentId,
      updateBankDiscount,
      cardType = '',
      selected,
      setCvv,
      cvv,
      cvvError,
      cartData,
      paymentOptions,
      retryGCappliedValue,
      handlePaymentAction,
      expired,
      inValid,
      removeSavedCard
    } = this.props;
    const maestroCard = (cardType || '').toLowerCase() === 'maestro';
    const cvvMaxLength = cardType === 'AMEX' ? 4 : 3;

    const isFireFoxBrowser =
      navigator && navigator.userAgent.search('Firefox') !== -1;
    if (expired || inValid || maestroCard) {
      return (
        <div className={Style.expired}>
          {this.renderDetails()}
          <div className={Style.ctaContainer}>
            <div
              data-instrumentid={instrumentId}
              onClick={removeSavedCard}
              className={Style.ctaBtn}
            >
              REMOVE CARD
            </div>
          </div>
        </div>
      );
    }
    let additionalComponent = [];

    if (
      this.isInlineOfferForCardEnabled ||
      selected ||
      this.isSavingsNudgeEnabled
    ) {
      additionalComponent.push(
        <Cashback
          payMode={payMode}
          cartData={cartData}
          paymentOptions={paymentOptions}
          retryGCappliedValue={retryGCappliedValue}
          instrumentHandle={instrumentId}
          updateBankDiscount={updateBankDiscount}
          handlePaymentAction={handlePaymentAction}
          isClicked={selected}
          isSavingsNudgeEnabled={this.isSavingsNudgeEnabled}
          setCashbackApplicable={isApplicable =>
            this.setState({ discountApplicable: isApplicable })
          }
          {...this.props}
          render={data => <CashbackMsg data={data} />}
        />
      );
    }

    return [
      <div className={Style.active}>
        {this.renderDetails()}
        {selected && (
          <input
            ref={this.setInputRef}
            id={`cvv_${instrumentId}`}
            type={!isFireFoxBrowser ? 'tel' : 'password'}
            placeholder="CVV"
            title="Card Verification Value Code"
            maxLength={cvvMaxLength}
            size={cvvMaxLength}
            autoComplete="off"
            pattern="\d*"
            className={`${Style.cvvInput} ${cvvError ? Style.cvvError : ''}`}
            onChange={setCvv}
            value={cvv}
          />
        )}
      </div>,
      <div>
        {selected &&
          isFeatureEnabled('PAYMENT_SAVE_CARD_AUTO_CONSENT') &&
          this.renderAutoConsentText()}
      </div>,
      ...additionalComponent
    ];
  }

  renderVpa() {
    const { vpa, payerAccountName, disable, offerDetails } = this.props;
    return (
      <div className={Style.active}>
        <div className={Style.detailsUpi}>
          <div className={Style.line}>
            <ImmobilizedDiv
              className={Style.bankName}
              disabled={disable}
              disableClassName={Style.disabledName}
            >
              {vpa}
              {this.DisplayOffers(offerDetails)}
            </ImmobilizedDiv>
          </div>
          <ImmobilizedDiv
            className={Style.line}
            disabled={disable}
            disableClassName={Style.disabledName}
          >
            {payerAccountName}
          </ImmobilizedDiv>
        </div>
        <ImmobilizedSprite
          name={`logo-${this.iconDisplayUPI}`}
          disabled={disable}
          disableClassName={Style.disabledSprite}
        />
      </div>
    );
  }

  DisplayOffers(offerDetails) {
    if (!offerDetails) return;
    const numberOfOffers = offerDetails.length || 0;
    let offerString = getOfferString(numberOfOffers);
    return <span className={Style.inlineOffer}>{offerString}</span>;
  }

  render() {
    const {
      paymentInstrumentType,
      lowSuccessRate,
      selected,
      className,
      id,
      appName,
      maskedCardNumber,
      disable,
      cardType,
      offerDetails
    } = this.props;
    const instrumentName = paymentInstrumentType === 'vpa' && appName;
    const binNumber =
      paymentInstrumentType === 'card' ? maskedCardNumber.slice(0, 6) : '';
    return (
      <div className={className} id={id}>
        {paymentInstrumentType === 'card'
          ? this.renderCard()
          : this.renderVpa()}
        <LowSRMessage
          instrumentType={paymentInstrumentType}
          binNumber={binNumber}
          instrumentName={instrumentName}
          className={Style.warningMsg}
          show={(selected && lowSuccessRate) || disable}
          disable={disable}
        />
        <SaveCardConsent
          toggleShowConsentFn={this.toggleSavedCardConsentHalfCard}
          showConsent={this.state.saveCardConsentHalfCard}
          showConsentButton={false}
          cardType={cardType}
        />
      </div>
    );
  }
}

InstrumentCard.propTypes = {
  instrumentId: PropTypes.string,
  bankName: PropTypes.string,
  productType: PropTypes.string,
  maskedCardNumber: PropTypes.string,
  cardHolderName: PropTypes.string,
  expired: PropTypes.bool,
  inValid: PropTypes.bool,
  cardType: PropTypes.string,
  selected: PropTypes.func,
  setCvv: PropTypes.func,
  onClick: PropTypes.func,
  cvv: PropTypes.string,
  updateBankDiscount: PropTypes.func,
  cvvError: PropTypes.func,
  cartData: PropTypes.object,
  className: PropTypes.string,
  handlePaymentAction: PropTypes.func,
  removeSavedCard: PropTypes.func,
  vpa: PropTypes.string,
  payerAccountName: PropTypes.string,
  appName: PropTypes.string
};

export default InstrumentCard;
