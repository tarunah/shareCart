import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Style from './card.base.css';

import CardForm from './CardForm';
import helper from './helper/index';

// Payment Form Specific Components.
import PayNowHandler from '../../PayNowHandler';
import PaymentOptionError from '../PaymentOptionError';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';
import { getUidx } from 'commonBrowserUtils/Helper';
import OfferBanner from '../../OfferBanner';
/**
 * Field Rules for the different inputs in the form.
 */
const fieldRules = {
  cardNumber: {
    validation: /^[0-9 ]+$/,
    message: 'Card Number should be numbers.'
  },
  cardName: {
    validation: /^[a-zA-Z][a-zA-Z ]*$/,
    message: 'Invalid Input, Hint: alphabets, ., '
  },
  expiry: {
    validation: /^(0?[1-9]|1[012])\/([0-9]{2})$/,
    message: 'Invalid expiry'
  },
  cvv: {
    validation: /^[0-9]{3,}$/,
    message: 'Invalid cvv number'
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);

    [
      'setValue',
      'checkValue',
      'onFocus',
      'getOptionUI',
      'getModeAttributes',
      'lowSRSuccessCallback',
      'submitCallback',
      'getCardDetails'
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
    this.savedCardConsentInfo = getKVPairValue('SAVED_CARD_CONSENT');
    this.savedCardAutoConsentInfo =
      get(this.savedCardConsentInfo, 'autoConsent.newCard') || {};
    this.isCardAutoTokenizationEnabled = isFeatureEnabled(
      'PAYMENT_SAVE_CARD_AUTO_CONSENT'
    );
    const saveCardCode = get(props, 'savedCardInstrumentData.code');
    this.state = {
      cardDetails: {},
      form: {
        cardNumber: {
          value: '',
          error: '',
          maxLength: 20,
          hasLowSR: false,
          disable: false,
          required: true
        },
        cardName: {
          value: '',
          error: '',
          maxLength: 50,
          required: true
        },
        expiry: {
          value: '',
          error: '',
          required: true
        },
        cvv: {
          value: '',
          error: '',
          maxLength: 3,
          required: true
        },
        saveCard: {
          value:
            saveCardCode !== PaymentConstants.SAVEDCARD_LIMIT_REACHED_CODE &&
            saveCardCode !== PaymentConstants.SAVING_CARD_NOT_ALLOWED_CODE &&
            (this.isCardAutoTokenizationEnabled
              ? get(this.savedCardAutoConsentInfo, 'autoChecked', true)
              : true),
          required: false
        },
        cardType: '',
        tokenizationConsent: ''
      },
      plutusInfo: {
        show: false,
        cardNumber: ''
      }
    };
    this.props.updateBankDiscount(0);
  }

  lowSRSuccessCallback(res) {
    if (res) {
      const hasLowSR = get(res, 'lowSrOption', false);
      const disable = get(res, 'disable', false);
      this.setState(({ form }) => {
        const cardNumber = { ...form.cardNumber, hasLowSR, disable };
        return {
          form: {
            ...form,
            cardNumber
          }
        };
      });
    }
  }

  componentWillUnmount() {
    const { updateStickyButton } = this.props;
    updateStickyButton && updateStickyButton({ enabled: true });
  }

  async getCardDetails(cardDetails, form, value = '') {
    let modifiedValue = value.replace(/ /g, '');
    let cardDetailsInfo = cardDetails;

    try {
      if (
        modifiedValue.length >= 6 &&
        (isEmpty(cardDetailsInfo) || !form.cardType)
      ) {
        if (get(this.savedCardConsentInfo, 'fetchBinDetailsFromApi', false)) {
          cardDetailsInfo = await PaymentManager.getCardType(modifiedValue);

          if (!cardDetailsInfo.cardType) {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      }
    } catch (e) {
      cardDetailsInfo = helper.getCardType(modifiedValue);
    }
    return cardDetailsInfo;
  }

  async setValue(event) {
    const form = { ...this.state.form };
    let { cardDetails } = this.state;
    const cursorPosition = event.target.selectionStart;
    let id = (event.target.id || event.currentTarget.id).split('-')[0];
    let value =
      event.target.value ||
      event.target.getAttribute('data-value') ||
      event.currentTarget.getAttribute('data-value') ||
      '';

    switch (id) {
      case 'cardNumber':
        if (
          value.match(fieldRules[id].validation) &&
          ((value.length > 3 && value.length <= 7) || value.length >= 10)
        ) {
          cardDetails = await this.getCardDetails(cardDetails, form, value);
          const maxLength = get(cardDetails, 'maxLength', 14) || 16;
          form[id].maxLength = maxLength > 16 ? maxLength + 4 : maxLength + 3;
          const cardType = get(cardDetails, 'issuer');
          form.cardType = cardType;
          form.tokenizationConsent = !get(
            cardDetails,
            'eligibleForTokenization',
            !this.isCardAutoTokenizationEnabled
          );
          form[id].value = helper.splitCardNumber(value);

          // Expiry Month, Expiry Year, CVV necessity.
          const expiryRequired =
            PaymentConstants.EXPIRY_EXEMPTED_CARDS.indexOf(cardType) === -1;
          const resetExpiryError = !expiryRequired;
          form['expiry'].required = expiryRequired;
          if (cardType === 'AMEX') {
            form['cvv'].maxLength = 4;
          } else {
            form['cvv'].maxLength = 3;
          }
          form['cvv'].required = expiryRequired;
          if (resetExpiryError) {
            form['expiry'] = {
              ...form['expiry'],
              error: '',
              value: ''
            };
            form['cvv'] = { ...form['cvv'], error: '', value: '' };
          }
        } else {
          form[id].value = value;
          form.cardType = value.match(fieldRules[id].validation)
            ? form.cardType
            : '';
        }

        if (value.length < 7) {
          cardDetails = {};
          form.cardType = '';
        }

        //reset the lowsr, if user enters new cardNumber
        if (value.length < 5) {
          form[id].hasLowSR = false;
          form[id].disable = false;
        }
        break;

      case 'saveCard':
        value = value === 'false';
        if (
          this.isCardAutoTokenizationEnabled &&
          get(form, 'tokenizationConsent') === false
        ) {
          triggerEvent('AUTO_CONSENT_NEW_CARD_CLICK', {
            custom: {
              custom: {
                v1: value
              }
            }
          });
        }
        form[id].value = value;
        break;
      case 'expiry':
        if (value.length === 1 && value !== '1' && value !== '0') {
          value = '0' + value;
        }
        if (value.length === 2) {
          if (form[id].value.length < value.length) {
            value = value + '/';
          } else {
            value = value.slice(0, -1);
          }
        }
        form[id].value = value;
        break;
      default:
        form[id].value = value;
    }

    this.setState({ form, cardDetails }, () => {
      if (id === 'cardNumber') {
        const spaceRemovedValue = value.replace(' ', '');
        const isForwardFlow = cursorPosition < value.length;
        if (cursorPosition % 5 !== 0 || isForwardFlow) {
          event.target.selectionEnd = cursorPosition;
        }
        // TODO:- INTENTIONAL COMMENT CHANGE
        // spaceRemovedValue.length === 6 &&
        //   PaymentManager.checkCardSuccessRate(
        //     spaceRemovedValue,
        //     this.lowSRSuccessCallback
        //   );
      }
    });
  }

  async checkValue(event) {
    const form = { ...this.state.form };
    let { cardDetails } = this.state;
    let id = event.target.id.split('-')[0];
    let value =
      event.target.value || event.target.getAttribute('data-value') || '';

    switch (id) {
      case 'cardNumber':
        const cardType = get(cardDetails, 'issuer');
        if (!value) {
          form[id].error = 'Required';
        } else if (!value.match(fieldRules[id].validation)) {
          form[id].error = fieldRules[id].message;
        } else if (!helper.validCardCheck(value)) {
          form[id].error = 'Invalid Card. Please enter a valid card number.';
        } else if ((cardType || '').toLowerCase() === 'maestro') {
          form[id].error = 'Maestro card not supported';
        }
        if (form[id].error) {
          this.setState({ plutusInfo: { show: false } });
        } else {
          this.setState({
            plutusInfo: { show: true, cardNumber: value.replace(/ /g, '') }
          });
        }
        break;

      case 'cvv':
        const cvvMaxLength = get(form, 'cvv.maxLength') || 3;
        if (!value && form[id].required) {
          form[id].error = 'Required';
        } else if (value && !value.match(fieldRules[id].validation)) {
          form[id].error = fieldRules[id].message;
        } else if (value.length > cvvMaxLength) {
          form[id].error = 'Invalid cvv';
        }
        break;

      case 'expiry':
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date
          .getFullYear()
          .toString()
          .slice(-2);
        const [cardMonth, cardYear] = value.split('/');
        if (!value && form[id].required) {
          form[id].error = 'Required';
        } else if (value && !value.match(fieldRules[id].validation)) {
          form[id].error = fieldRules[id].message;
        } else if (
          currentYear > cardYear ||
          (currentYear === cardYear && currentMonth >= cardMonth)
        ) {
          form[id].error = 'Invalid Expiry';
        }
        break;

      default:
        if (!value && form[id].required) {
          form[id].error = 'Required';
        } else if (value && !value.match(fieldRules[id].validation)) {
          form[id].error = fieldRules[id].message;
        }
    }

    if (form[id].error) {
      this.setState({
        form
      });
    }
  }

  onFocus(event) {
    const { form } = this.state;
    let id = event.target.id.split('-')[0];

    if (form[id].error) {
      form[id].error = '';
      this.setState({
        form
      });
    }
  }

  validateForm() {
    const { form = {} } = this.state;

    for (let key in form) {
      if (
        form[key].error ||
        (form[key].required && !form[key].value) ||
        (form[key].required &&
          fieldRules[key] &&
          !form[key].value.match(fieldRules[key].validation))
      ) {
        return false;
      }
      if (key === 'cardNumber' && !helper.validCardCheck(form[key].value)) {
        return false;
      }
    }
    return true;
  }

  getModeAttributes() {
    const { form = {} } = this.state;
    const { bankDiscount } = this.props;
    const [cardMonth, cardYear] = form.expiry.value.split('/');
    let consent = {};
    let eligibleForTokenization = false;
    if (
      this.isCardAutoTokenizationEnabled &&
      !form.tokenizationConsent &&
      form.saveCard.value
    ) {
      consent['tokenizationConsent'] = 'true';
      eligibleForTokenization = true;
    }
    return {
      cardNumber: form.cardNumber.value.replace(/ /g, ''),
      billName: form.cardName.value,
      cardMonth: cardMonth,
      cardYear: cardYear,
      cvvCode: form.cvv.value,
      otherCards: false,
      saveCard: !eligibleForTokenization ? '' : form.saveCard.value ? 'on' : '',
      useSavedCard: false,
      user: getUidx(),
      paymenInstrument: 'creditcard',
      bankCashbackEligible: `${bankDiscount !== 0}`,
      bankCashbackAmount: bankDiscount,
      ...consent
    };
  }

  getOptionUI() {
    const { props, savedCardAutoConsentInfo } = this;
    const showEcomMessage =
      get(savedCardAutoConsentInfo, 'showEcomMessage') || true;
    const ecomText =
      get(savedCardAutoConsentInfo, 'ecomText') ||
      'Please ensure your card can be used for online transactions';
    const ecomKnowMoreText =
      get(savedCardAutoConsentInfo, 'ecomKnowMoreText') || 'Know More';
    const ecomKnowMoreLink =
      get(savedCardAutoConsentInfo, 'ecomKnowMoreLink') || '/faqs';
    return (
      <div className={Style.mode}>
        {props.deviceMode !== 'mobile' && (
          <div className={Style.heading}> CREDIT/ DEBIT CARD </div>
        )}
        {props?.offer && (
          <OfferBanner
            selected={true}
            offerData={props.offer}
            deviceMode={props.deviceMode}
            name="card"
          />
        )}
        {showEcomMessage && (
          <div
            className={`${Style.ecomContainer} ${
              props.deviceMode !== 'mobile' ? Style.desktopContainer : ''
            }`}
          >
            <div className={Style.ecomText}>
              {ecomText}
              <a
                href={ecomKnowMoreLink}
                onClick={() => triggerEvent('ECOM_KNOW_MORE_CLICK')}
                className={Style.ecomKnowMore}
              >
                {` ${ecomKnowMoreText}`}
              </a>
            </div>
          </div>
        )}

        <CardForm
          form={this.state.form}
          plutusInfo={this.state.plutusInfo}
          setValue={this.setValue}
          checkValue={this.checkValue}
          onFocus={this.onFocus}
          {...props}
        />
      </div>
    );
  }

  submitCallback(done) {
    if (!this.validateForm()) {
      SHELL.alert('info', {
        message: 'Please fill all valid card details to place order.',
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
      return;
    }

    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: PaymentConstants.CARD_TYPE,
          v2: PaymentConstants.CARD_TYPE,
          v3: this.props.rank,
          v4: isFeatureEnabled('RECOMMENDED_OPTIONS')
        },
        widget_items: {
          data_set: {
            entity_name: 'payment_option',
            entity_id: 'payment_option'
          }
        }
      }
    });

    done();
  }

  render() {
    const {
      form: { cardType, tokenizationConsent, saveCard }
    } = this.state;
    const { props, isCardAutoTokenizationEnabled } = this;
    const { instrumentData, payMode, retrySessionEnabled } = props;
    const { updateStickyButton } = this.props;
    let disable = get(this, 'state.form.cardNumber.disable');
    const {
      paymentInstrumentDetails: { paymentUrl }
    } = instrumentData.credit;
    let codes = [];
    for (let key in instrumentData) {
      if (instrumentData.hasOwnProperty(key)) {
        codes.push(instrumentData[key].code);
      }
    }
    const ccdcAvailable = codes.every(
      code => code === PaymentConstants.INSTRUMENT_ELIGIBLE_CODE
    );

    updateStickyButton && updateStickyButton({ enabled: !disable });
    disable = disable || (payMode === 'retry' && !retrySessionEnabled);

    return ccdcAvailable ? (
      <PayNowHandler
        {...props}
        cardType={cardType}
        allowTokenization={
          !tokenizationConsent &&
          (isCardAutoTokenizationEnabled ? !saveCard.value : true)
        }
        paymentUrl={paymentUrl}
        paymentMode={PaymentConstants.CREDIT_CARD}
        paymentModeName={PaymentConstants.CARD_TYPE}
        actionData={{ className: Style.actionButton, disable }}
        optionUI={this.getOptionUI()}
        submitCallback={this.submitCallback}
        modeAttributes={this.getModeAttributes()}
        paymentInstrument={PaymentConstants.CARD_TYPE}
      />
    ) : (
      <div>
        <PaymentOptionError option="Credit/Debit Card" code={codes[0]} />
      </div>
    );
  }
}

Card.defaultProps = {
  updateStickyButton: () => {}
};

export default Card;
