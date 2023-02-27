import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import Styles from './payNowAjax.base.css';

import {
  getXMetaApp,
  getChannel,
  isLocalStorageEnabled,
  setCookie,
  getCookie
} from 'commonBrowserUtils/Helper';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  getPaymentTriedCount,
  showTokenizationConsent
} from 'commonBrowserUtils/PaymentHelper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import PayNowTemplate from './PayNowTemplate';
import PayNowLoader from '../PayNowLoader';
import { getCartContext } from 'commonBrowserUtils/CartHelper';
import { localStorageKeys, cookieKeys } from 'commonUtils/constants';
import SaveCardConsent from '../SaveCardConsent';

const { PAYNOW_ERROR_CODE } = PaymentConstants;
let OTP_DETAIL = {};
let OTP_PAYNOW_RESPONSE = null;
const boundFuncs = [
  'onSubmit',
  'checkForTwoFA',
  'submitWithTwoFA',
  'getPayNowBaseData',
  'getTwoFADataByPriority',
  'successCallBack',
  'errorCallBack',
  'closeLoader',
  'executeCallbacks',
  'submitRequest',
  'handleMyntraInstruments',
  'getPayload',
  'cachePaymentAttributes',
  'checkForMyntraCredit',
  'checkTwoFAInstrument',
  'toggleShowConsentFn',
  'addTokenizationConsent',
  'resetPaynowResponse',
  'setDataLayerCookie'
];

//During AB code clean up rename PayNowAjax to PayNowHandler
class PayNowAjax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paynowResponse: null,
      loader: false
    };
    this.saveCardConsentClickFn = () => {};
    this.savedCardConsentInfo = getKVPairValue('SAVED_CARD_CONSENT');
    this.isCardAutoTokenizationEnabled = isFeatureEnabled(
      'PAYMENT_SAVE_CARD_AUTO_CONSENT'
    );
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.upiSdkEnabled = false;
  }

  componentDidMount() {
    this.requestData = this.getPayNowBaseData();
  }

  componentDidUpdate(prevProps) {
    //adding this check coz whenever saved card consent half card is loading we are initializing the request data and loosing TwoFA and myntra instrument details
    const { showSaveCardConsent } = prevProps;
    if (!showSaveCardConsent && this.props.showSaveCardConsent) {
      return;
    }
    this.requestData = this.getPayNowBaseData();
  }

  executeCallbacks(callbacks) {
    if (callbacks.length > 0) {
      const callback = callbacks.shift();
      callback(this.executeCallbacks.bind(this, callbacks));
    }
  }

  getPayNowBaseData() {
    const {
      paymentOptions,
      cartId,
      cartContext,
      paymentMode,
      totalPayable,
      ppsId
    } = this.props;
    const { csrfToken, paymentToken } = paymentOptions || {};

    const requestData = {
      amount: totalPayable,
      csrf: csrfToken,
      cartContext: cartContext,
      cartId: cartId || '',
      clientContext: 'responsive',
      paymentMethods: paymentMode,
      profile: get(
        window,
        'location.host',
        get(window, 'location.hostname', 'www.myntra.com')
      ),
      xMetaApp: getXMetaApp(),
      channel: getChannel()
    };

    paymentToken && (requestData.paymentToken = paymentToken);
    ppsId && (requestData.ppsId = ppsId);

    return requestData;
  }

  handleMyntraInstruments(done = () => {}) {
    const { myntraInstrumentsData } = this.props;
    const { paynowInstrumentsData } = myntraInstrumentsData;
    for (const key in paynowInstrumentsData) {
      if (key.indexOf('twofa') === -1) {
        // twofa related keys not to be added as input tags
        this.requestData[key] = paynowInstrumentsData[key];
      }
    }
    done();
  }

  getTwoFAPaymentModes(myntraInstrumentsData, instrumentData) {
    const paymentModes = [];
    const paymentModeMappings = PaymentConstants.TWO_FA_PAYMENT_MODE_MAPPING;
    if (get(myntraInstrumentsData, 'twofa_mc_data.enable')) {
      paymentModes.push(paymentModeMappings.mc);
    }
    if (get(myntraInstrumentsData, 'twofa_lp_data.enable')) {
      paymentModes.push(paymentModeMappings.lp);
    }
    if (instrumentData) {
      paymentModes.push(
        (
          paymentModeMappings[instrumentData.type] ||
          instrumentData.type ||
          ''
        ).toUpperCase()
      );
    }
    return paymentModes;
  }

  checkTwoFAInstrument(instrumentData) {
    const paymentInstrumentType = get(instrumentData, 'type');
    const twofaPaymentOptionsList =
      get(getKVPairValue('TWOFA_PAYMENT_OPTIONS'), 'default') || [];
    return twofaPaymentOptionsList.includes(paymentInstrumentType);
  }

  getTwoFADataByPriority(data, instrumentData, instrumentSelected) {
    const paymentInstrumentType = get(instrumentData, 'type');
    const userActions = get(data, 'userActions') || {};
    const mobiles = get(data, 'mobiles') || {};
    const emailOtp = get(data, 'enableEmailOTP') || {};
    const userActionsMc = get(userActions, 'myntraCredit') || [];
    const userActionsLp = get(userActions, 'loyalitypoints') || [];
    const { lpSelected, mcSelected } = instrumentSelected;
    //TwoFA order 1) MC 2) LP 3) Rest of the payment instrument
    if (get(userActionsMc[0], 'value') && mcSelected) {
      const { myntraCredit = [] } = mobiles || {};
      return {
        mobileNumbers: myntraCredit,
        enableEmailOtp: get(emailOtp, 'myntraCredit') || false
      };
    } else if (get(userActionsLp[0], 'value') && lpSelected) {
      const { loyalitypoints = [] } = mobiles || {};
      return {
        mobileNumbers: loyalitypoints,
        enableEmailOtp: get(emailOtp, 'loyalitypoints') || false
      };
    } else if (get(get(userActions, paymentInstrumentType, [])[0], 'value')) {
      const mobileNumbers = get(mobiles, paymentInstrumentType) || [];
      const enableEmailOtp = get(emailOtp, paymentInstrumentType) || false;
      return {
        mobileNumbers,
        enableEmailOtp
      };
    } else {
      return null;
    }
  }

  checkForMyntraCredit(mcData) {
    return (
      mcData.auto_giftcard_amount > 0 &&
      mcData.auto_giftcard_used === 'true' &&
      mcData.giftcard_type === 'myntracredit'
    );
  }

  checkForTwoFA(done) {
    const {
      props: {
        instrumentData,
        myntraInstrumentsData,
        toggleTwoFA,
        blockTwoFAToggle,
        orderAddressId: addressId,
        addressUnifiedId,
        twoFAResponse,
        setTwoFADetails,
        paymentFailureHalfCard
      }
    } = this;

    const mcData = {
      auto_giftcard_amount:
        get(myntraInstrumentsData, 'auto_giftcard_amount') || '0',
      auto_giftcard_used:
        get(myntraInstrumentsData, 'auto_giftcard_used') || '',
      giftcard_type: get(myntraInstrumentsData, 'giftcard_type') || ''
    };
    const mcSelected = this.checkForMyntraCredit(mcData);
    const lpSelected = get(myntraInstrumentsData, 'useloyaltypoints') === 'Y';
    const isTwofaEnabled =
      mcSelected || lpSelected || this.checkTwoFAInstrument(instrumentData);
    const instrumentSelected = {
      lpSelected,
      mcSelected
    };

    if (isTwofaEnabled) {
      //check if 2fa response is already in state
      if (isEmpty(twoFAResponse)) {
        return PaymentsManager.userTwoFAVerification(
          {
            addressId: addressId,
            addressUnifiedId: addressUnifiedId
          },
          res => {
            const twoFADetails = this.getTwoFADataByPriority(
              res,
              instrumentData,
              instrumentSelected
            );
            if (twoFADetails) {
              const { mobileNumbers = [], enableEmailOtp } = twoFADetails || {};
              const paymentModes = this.getTwoFAPaymentModes(
                myntraInstrumentsData,
                instrumentData
              );
              setTwoFADetails(res);
              const callback = () => {
                this.submitWithTwoFA();
                done();
                if (this.props.isBlockTwoFAToggle) {
                  blockTwoFAToggle();
                } else if (!paymentFailureHalfCard) {
                  toggleTwoFA();
                }
              };
              toggleTwoFA({
                callback,
                enableEmailOtp,
                mobileNumbers,
                paymentModes
              });
            } else {
              done();
            }
          },
          err => {
            done();
          }
        );
      } else {
        const twoFADetails = this.getTwoFADataByPriority(
          twoFAResponse,
          instrumentData,
          instrumentSelected
        );
        if (twoFADetails) {
          const { mobileNumbers = [], enableEmailOtp } = twoFADetails || {};
          const paymentModes = this.getTwoFAPaymentModes(
            myntraInstrumentsData,
            instrumentData
          );
          const callback = () => {
            this.submitWithTwoFA();
            done();
            if (this.props.isBlockTwoFAToggle) {
              blockTwoFAToggle();
            } else if (!paymentFailureHalfCard) {
              toggleTwoFA();
            }
          };

          return toggleTwoFA({
            callback,
            enableEmailOtp,
            mobileNumbers,
            paymentModes
          });
        }
      }
    }
    done();
  }

  submitWithTwoFA(done = () => {}) {
    const { modeAttributes } = this.props;
    const requestFromPaymentFailureHalfCard = get(
      this.props,
      'paymentFailureHalfCard'
    );
    const otp = requestFromPaymentFailureHalfCard
      ? get(OTP_DETAIL, 'otp')
      : get(this, 'props.twoFA.otp');
    if (otp) {
      const loader = !(
        get(
          this.savedCardConsentInfo,
          `allowedCards.${this.props.cardType}`,
          false
        ) &&
        this.props.allowTokenization &&
        (modeAttributes.saveCard === 'on' || modeAttributes.useSavedCard)
      );

      this.setState({ loader });
      const inputs = [
        { name: 'otpInput', value: otp },
        { name: 'otpEnabled', value: false }
      ];
      inputs.forEach(({ name, value }) => {
        this.requestData[name] = value;
      });
      triggerEvent('SUBMIT_TWOFA', {
        maData: {
          entity_type: 'Myntra_2FA_Payments_Page',
          entity_name: 'Myntra_2FA_Payments_Page'
        },
        custom: {
          widget_items: {
            data_set: {
              data: {
                entity_type: 'Myntra_2FA_Payments_Page',
                entity_name: '2FA OTP Submit'
              }
            }
          }
        }
      });
    }
    done();
  }

  getPayload() {
    const { modeAttributes } = this.props;
    this.upiSdkEnabled = get(modeAttributes, 'upiSdkEnabled', false);
    return { ...(modeAttributes || {}), ...this.requestData };
  }

  setDataLayerCookie() {
    const dataLayerMaSessionCookieExpiry = 60 * 30 * 1000;
    const maSessionCookie = getCookie(cookieKeys.MA_SESSION, false);
    if (maSessionCookie) {
      setCookie(
        cookieKeys.DATALAYER_MA_SESSION,
        maSessionCookie,
        dataLayerMaSessionCookieExpiry
      );
    }
  }

  submitRequest(done = () => {}) {
    const {
      props: {
        paymentModeName,
        paymentUrl,
        isExchangeCart,
        showPaymentFailureHalfCard,
        paymentFailureHalfCardContext
      },
      successCallBack,
      getPayload,
      errorCallBack
    } = this;
    this.props.payMode === 'retry' && this.props.disableRetryTimer();
    this.setState({ loader: true });
    const payload = getPayload();
    const isDopeWithUserConsentEnabled =
      paymentFailureHalfCardContext === 'dope_consent' &&
      showPaymentFailureHalfCard;
    triggerEvent('PROCEED_TO_PAY', { gaLabel: `Ajax-${paymentModeName}` });
    //temp solution around source in DataLayer object getting changed by PGs
    this.setDataLayerCookie();
    if (isExchangeCart) {
      PaymentsManager.exchange(payload, successCallBack, errorCallBack);
    } else {
      PaymentsManager.paynow(
        paymentUrl,
        payload,
        successCallBack,
        errorCallBack,
        isDopeWithUserConsentEnabled
      );
    }

    if (payload.cardYear || payload.cardMonth || payload.cvvCode) {
      const {
        cardNumber,
        cardMonth,
        cardYear,
        cvvCode,
        ...nonPIIdata
      } = payload;
      this.payload = nonPIIdata;
    } else {
      this.payload = payload;
    }

    done();
  }

  cachePaymentAttributes(done) {
    if (
      (isFeatureEnabled('PAYMENT_FAILURE_HALFCARD') ||
        isFeatureEnabled('DOPE_USER_CONSENT')) &&
      isLocalStorageEnabled()
    ) {
      const {
        modeAttributes = {},
        paymentMode,
        paymentModeName,
        paymentUrl,
        paymentInstrument
      } = this.props;
      let paymentTriedCount = +getPaymentTriedCount();
      if (!isEmpty(modeAttributes)) {
        localStorage.setItem(
          localStorageKeys.PAYMENT_TRIED_COUNT,
          ++paymentTriedCount
        );
        const paymentAttributes = {
          paymentUrl: paymentUrl,
          paymentMode: paymentMode,
          paymentModeName: paymentModeName,
          paymentInstrument: paymentInstrument,
          modeAttributes:
            paymentMode === PaymentConstants.CREDIT_CARD ? {} : modeAttributes
        };
        localStorage.setItem(
          localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
          JSON.stringify(paymentAttributes)
        );
      }
    }
    done();
  }

  addTokenizationConsent(e) {
    const { modeAttributes } = this.props;
    const value =
      e.target.textContent === this.savedCardConsentInfo.button.consentGiven
        ? 'true'
        : 'false';

    if (value === 'true' && this.props.modeAttributes.saveCard === '') {
      this.props.modeAttributes.saveCard = 'on';
    }
    this.props.modeAttributes = {
      ...modeAttributes,
      tokenizationConsent: value.toString()
    };
  }

  toggleShowConsentFn(flag) {
    return (done = () => {}) => {
      this.props.setLoader(false);
      this.props.toggleSaveCardConsent(flag, done);
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      props: {
        submitCallback,
        modeAttributes,
        isTokenizationConsentTaken,
        allowTokenization
      },
      handleMyntraInstruments,
      checkForTwoFA,
      submitRequest
    } = this;

    this.saveCardConsentClickFn = e => {
      this.addTokenizationConsent(e);
      this.props.toggleSaveCardConsent(false);
      handleMyntraInstruments();
      submitRequest();
    };

    this.setState({ paynowResponse: null }, () => {
      if (
        isLocalStorageEnabled() &&
        get(this.props, 'instrumentData.type') === 'upi'
      ) {
        localStorage.setItem(localStorageKeys.SAVINGS_FOMO_VALUE, 'upi');
      }
      const callbacks = [];
      callbacks.push(this.cachePaymentAttributes);
      submitCallback && callbacks.push(submitCallback);
      if (isFeatureEnabled('TWOFA')) {
        callbacks.push(checkForTwoFA);
      }

      const saveCard_condition = this.isCardAutoTokenizationEnabled ? '' : 'on';
      const isAutoConsentFlow =
        (isTokenizationConsentTaken && allowTokenization) ||
        saveCard_condition === '';
      if (
        get(
          this.savedCardConsentInfo,
          `allowedCards.${this.props.cardType}`,
          false
        ) &&
        allowTokenization &&
        showTokenizationConsent(isAutoConsentFlow) &&
        (modeAttributes.saveCard === saveCard_condition ||
          modeAttributes.useSavedCard)
      ) {
        callbacks.push(this.toggleShowConsentFn(true));
      } else {
        callbacks.push(handleMyntraInstruments);
        callbacks.push(submitRequest);
      }
      this.executeCallbacks(callbacks);
    });
  }

  successCallBack(response) {
    OTP_PAYNOW_RESPONSE = response;
    this.setState({
      paynowResponse: response,
      loader: true
    });
  }

  closeLoader() {
    this.setState({ loader: false, paynowResponse: null });
  }

  resetPaynowResponse() {
    this.setState({ paynowResponse: null });
  }

  errorCallBack(errorResponse) {
    this.props.payMode === 'retry' && this.props.enableRetryTimer();
    this.closeLoader();
    this.props.setPaymentFailureAttributes(
      PAYNOW_ERROR_CODE.DEFAULT_PAYMENT_FAILURE_ERROR_CODE,
      getCartContext()
    );
  }

  render() {
    const {
      props: {
        cardType,
        containerName,
        actionData,
        deviceMode,
        paymentModeName,
        optionUI,
        setPaymentFailureAttributes,
        paymentInstrument,
        setActionButtonRef,
        toggleSaveCardConsent,
        showSaveCardConsent,
        paymentFailureHalfCard
      },
      payload,
      state: { paynowResponse, loader },
      onSubmit,
      closeLoader,
      resetPaynowResponse
    } = this;
    OTP_DETAIL = this.props.twoFA;
    const payNowCallResponse = paymentFailureHalfCard
      ? OTP_PAYNOW_RESPONSE
      : paynowResponse;
    return (
      <div>
        {loader && (
          <PayNowLoader
            paymentInstrument={paymentInstrument}
            deviceMode={deviceMode}
          />
        )}
        <form>
          {optionUI}
          <button
            ref={setActionButtonRef}
            id={`action-${containerName || paymentModeName}`}
            onClick={onSubmit}
            className={`${Styles.actionButton} ${actionData.className} ${
              actionData.hide ? Styles.hide : ''
            } ${deviceMode === 'mobile' ? Styles.hide : ''}`}
          >
            {actionData.name || 'PAY NOW'}
          </button>
        </form>
        {payNowCallResponse && (
          <PayNowTemplate
            paynowResponse={payNowCallResponse}
            closeLoader={closeLoader}
            resetPaynowResponse={resetPaynowResponse}
            setPaymentFailureAttributes={setPaymentFailureAttributes}
            upiSdkEnabled={this.upiSdkEnabled}
            payload={payload}
          />
        )}
        <SaveCardConsent
          closeOnBack={false}
          cardType={cardType}
          toggleShowConsentFn={toggleSaveCardConsent}
          showConsent={showSaveCardConsent}
          onConsentClickFn={this.saveCardConsentClickFn}
        />
      </div>
    );
  }
}

PayNowAjax.propTypes = {
  actionData: PropTypes.object.isRequired,
  deviceMode: PropTypes.string.isRequired,
  cartData: PropTypes.object.isRequired,
  cartContext: PropTypes.string.isRequired,
  addressUnifiedId: PropTypes.string.isRequired,
  paymentMode: PropTypes.string.isRequired,
  paymentModeName: PropTypes.string.isRequired,
  optionUI: PropTypes.node,
  setPaymentFailureAttributes: PropTypes.func
};

PayNowAjax.defaultProps = {
  setActionButtonRef: () => {},
  setPaymentFailureAttributes: () => {},
  actionData: {},
  formAttributes: {},
  modeAttributes: {},
  cartContext: 'default'
};

export default PayNowAjax;
