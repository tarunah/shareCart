import React from 'react';
import get from 'lodash/get';
import pick from 'lodash/pick';

import RecommendedInstrumentsUI from './RecommendedInstrumentsUI';

import {
  getInitialState,
  getPayNowFormParams
} from './recommendedInstrumentsComponentConfig';

import {
  getInstalledAppsPromise,
  isTwoFAEnabled,
  getUPISupportedPgPromise
} from 'commonBrowserUtils/PaymentHelper';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  isValidMobile,
  errorNotification,
  successNotification,
  isAndroidApp
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const commonActionHandlers = [
  'selectInstrument',
  'showMoreOptions',
  'submitCallback',
  'setActionButtonRef',
  'onActionButtonClick'
];

const INSTRUMENT_ACTION_HANDLERS_MAP = {
  [PaymentConstants.UPI]: [
    'onInputChange',
    'toggleHandles',
    'toggleCheckbox',
    'toggleSaveInfo',
    'selectHandle'
  ],
  [PaymentConstants.SAVED_INSTRUMENT]: [
    'setCvv',
    'removeSavedCard',
    'toggleAllowTokenization'
  ],
  [PaymentConstants.COD]: ['setCaptchaRef', 'setCaptchaDetails'],
  [PaymentConstants.PAY_LATER]: [
    'setMobile',
    'getMobile',
    'displayInput',
    'hideTNCModal',
    'onTNCSuccess'
  ]
};

const INSTRUMENT_SELECT_HANDLERS_MAP = {
  [PaymentConstants.UPI]: 'selectUPI',
  [PaymentConstants.SAVED_INSTRUMENT]: 'selectSavedInstrument',
  [PaymentConstants.WALLET_TYPE]: 'selectWallet',
  [PaymentConstants.NETBANKING]: 'selectNetbanking'
};

const INSTRUMENT_SUBMIT_HANDLERS_MAP = {
  [PaymentConstants.UPI]: 'submitCallbackUPI',
  [PaymentConstants.SAVED_INSTRUMENT]: 'submitCallbackSavedInstrument',
  [PaymentConstants.WALLET_TYPE]: 'submitCallbackWallet',
  [PaymentConstants.NETBANKING]: 'submitCallbackNetbanking',
  [PaymentConstants.COD]: 'submitCallbackCOD',
  [PaymentConstants.PAY_LATER]: 'submitCallbackBNPL'
};

const BNPL_ERROR_MESSAGE_MAP = {
  EMPTY: 'Please enter a registered mobile number',
  INVALID: 'Please enter a valid 10 digit mobile number'
};

const OPTION_GET_CTA_MAP = {
  [PaymentConstants.PAY_LATER]: onClickParams =>
    onClickParams.authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER',
  [PaymentConstants.COD]: () => 'PLACE ORDER',
  default: () => 'PAY NOW'
};

const getBNPLOptionData = instrumentData => {
  const bnplInstrumentData = (instrumentData || []).find(
    data => data.type === PaymentConstants.PAY_LATER
  );

  return get(bnplInstrumentData, 'paymentInstrumentDetails.data', []).find(
    paymentType => paymentType.id === 1
  );
};

class RecommendedInstruments extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitialState(props);

    commonActionHandlers.forEach(fn => {
      this[fn] = this[fn].bind(this);
    });

    this.instrumentActionHandlers = {};
    Object.keys(INSTRUMENT_ACTION_HANDLERS_MAP).forEach(key => {
      this.instrumentActionHandlers[key] = {};
      INSTRUMENT_ACTION_HANDLERS_MAP[key].forEach(handler => {
        this[handler] = this[handler].bind(this);
        this.instrumentActionHandlers[key][handler] = this[handler];
      });
    });

    this.instrumentSelectHandlers = {};
    Object.keys(INSTRUMENT_SELECT_HANDLERS_MAP).forEach(key => {
      const handler = INSTRUMENT_SELECT_HANDLERS_MAP[key];
      this[handler] = this[handler].bind(this);
      this.instrumentSelectHandlers[key] = this[handler];
    });

    this.instrumentSubmitHandlers = {};
    Object.keys(INSTRUMENT_SUBMIT_HANDLERS_MAP).forEach(key => {
      const handler = INSTRUMENT_SUBMIT_HANDLERS_MAP[key];
      this[handler] = this[handler].bind(this);
      this.instrumentSubmitHandlers[key] = this[handler];
    });

    this.instrumentStaticParams = {
      [PaymentConstants.UPI]: {
        handles: getKVPairValue('UPI_CONFIG').vpaHandles
      },
      [PaymentConstants.SAVED_INSTRUMENT]: {
        isAutoConsentAutoChecked: get(
          get(getKVPairValue('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') ||
            {},
          'autoChecked',
          true
        ),
        isCardAutoTokenizationEnabled: isFeatureEnabled(
          'PAYMENT_SAVE_CARD_AUTO_CONSENT'
        )
      }
    };
    const { inlineOffer, instrumentData } = this.props;
    isFeatureEnabled('INLINE_OFFER') &&
      this.addOffersToInstrumentDetails(
        inlineOffer.paymentInstruments,
        instrumentData
      );
  }

  componentDidMount() {
    this.props.setLoader(true, () => {
      getInstalledAppsPromise().then(({ installedApps, upiSDKEnabled }) => {
        this.setState(prevState => ({
          instrumentState: {
            ...prevState.instrumentState,
            [PaymentConstants.UPI]: {
              ...prevState.instrumentState[PaymentConstants.UPI],
              installedApps,
              upiIntentEnabled:
                upiSDKEnabled && isFeatureEnabled('UPI_INTENT_ENABLED')
            },
            [PaymentConstants.SAVED_INSTRUMENT]: {
              ...prevState.instrumentState[PaymentConstants.SAVED_INSTRUMENT],
              installedApps,
              upiIntentEnabled:
                upiSDKEnabled && isFeatureEnabled('UPI_INTENT_ENABLED')
            }
          }
        }));
        getUPISupportedPgPromise().then(pgString => {
          pgString = pgString.replace(/[\[\] ]/g, '').split(',');
          this.setState(prevState => ({
            instrumentState: {
              ...prevState.instrumentState,
              [PaymentConstants.UPI]: {
                ...prevState.instrumentState[PaymentConstants.UPI],
                upiSupportedPG: pgString
              },
              [PaymentConstants.SAVED_INSTRUMENT]: {
                ...prevState.instrumentState[PaymentConstants.SAVED_INSTRUMENT],
                upiSupportedPG: pgString
              }
            }
          }));
        });
        this.props.setLoader(false);
      });
    });
  }

  addOffersToInstrumentDetails(offer, instrumentDetails) {
    instrumentDetails.map(instrument => {
      const type = get(instrument, 'type', '');
      if (type !== 'savedinstrument') {
        const offerInstrument = get(offer, type, '');
        if (offerInstrument) {
          offerInstrument.map(off => {
            if (
              get(off, 'bankCode', '') ==
              get(instrument, 'paymentInstrumentDetails.data[0].bankCode', '')
            )
              instrument.paymentInstrumentDetails.data[0].offerDetails =
                off.offerDetails;
          });
        }
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    const codInstrumentData = get(props, 'instrumentData', []).find(
      instrument => instrument.type === PaymentConstants.COD
    );
    const twoFAEnabled = isTwoFAEnabled({
      ...props,
      instrumentData: codInstrumentData
    });
    return {
      instrumentState: {
        ...state.instrumentState,
        [PaymentConstants.COD]: {
          ...state.instrumentState[PaymentConstants.COD],
          twoFAEnabled,
          captchaEnabled:
            isFeatureEnabled('COD_CAPTCHA_ENABLED') && !twoFAEnabled
        }
      }
    };
  }

  /*
   * Common action handlers
   */

  updateCTA(text) {
    this.props.updateStickyButton({
      text
    });
  }

  selectInstrument(val, onClickParams) {
    const id = val.substring(val.indexOf('-') + 1);
    const selectHandler = this.instrumentSelectHandlers[
      onClickParams.instrumentType
    ];

    if (id === this.state.selectedId) {
      return;
    }

    this.setState(
      {
        selectedId: id,
        selectedName: onClickParams.name,
        selectedRank: onClickParams.rank,
        instrumentType: onClickParams.instrumentType,
        payNowFormParams: getPayNowFormParams({ id, ...onClickParams })
      },
      () => {
        this.clearTabSelection();
      }
    );

    const getCTA =
      OPTION_GET_CTA_MAP[onClickParams.instrumentType] ||
      OPTION_GET_CTA_MAP.default;
    this.updateCTA(getCTA(onClickParams));
    if (onClickParams.paymentInstrumentType !== 'card')
      this.props.updateBankDiscount(0);
    selectHandler && selectHandler(id, onClickParams);
  }

  clearSelection() {
    if (this.state.selectedId) {
      this.setState({
        selectedId: ''
      });
    }
  }

  clearTabSelection() {
    const { deviceMode, switchTab } = this.props;
    deviceMode === 'mobile' && switchTab();
  }

  showMoreOptions() {
    this.setState({
      isOptionsCollapsed: false
    });
  }

  setInstrumentState(
    instrumentType,
    state,
    withPrevState = () => {},
    callback = () => {}
  ) {
    this.setState(
      prevState => ({
        instrumentState: {
          ...prevState.instrumentState,
          [instrumentType]: {
            ...prevState.instrumentState[instrumentType],
            ...state,
            ...withPrevState(prevState)
          }
        }
      }),
      callback
    );
  }

  updateModeAttributes(attr, callback) {
    this.setState(
      prevState => ({
        payNowFormParams: {
          ...prevState.payNowFormParams,
          modeAttributes: {
            ...prevState.payNowFormParams.modeAttributes,
            ...attr
          }
        }
      }),
      () => {
        callback && callback();
      }
    );
  }

  setActionButtonRef(node) {
    this.actionButton = node;
  }

  onActionButtonClick(e) {
    e.preventDefault();
    this.actionButton.click();
  }

  /*
   * Saved Instrument action handlers
   */

  selectSavedInstrument(id, onClickParams) {
    this.setInstrumentState(
      PaymentConstants.SAVED_INSTRUMENT,
      {
        selectedInstrumentType: onClickParams.paymentInstrumentType,
        cvv: '',
        cvvError: false,
        vpa: onClickParams.vpa || '',
        vpaAppName: onClickParams.appName,
        allowTokenization: false,
        tokenizationFlag: ''
      },
      () => {},
      async () => {
        const upiSupportedPG = this.state.instrumentState[
          PaymentConstants.SAVED_INSTRUMENT
        ].upiSupportedPG;
        if (isAndroidApp() && onClickParams.upiIntentEnabled) {
          this.updateModeAttributes({
            upiSupportedPG: upiSupportedPG
          });
        }
        const instrumentInfo = this.state.instrumentList[onClickParams.rank - 1]
          .paymentInstrumentDetails.data[0];
        const tokenizationConsent = get(instrumentInfo, 'tokenizationConsent');
        const isCardAutoTokenizationEnabled = this.instrumentStaticParams[
          PaymentConstants.SAVED_INSTRUMENT
        ].isCardAutoTokenizationEnabled;
        try {
          if (
            onClickParams.paymentInstrumentType === 'card' &&
            !tokenizationConsent &&
            isCardAutoTokenizationEnabled
          ) {
            const maskedCardNumber = get(instrumentInfo, 'maskedCardNumber');
            const {
              eligibleForTokenization
            } = await PaymentsManager.getCardType(maskedCardNumber);
            if (eligibleForTokenization) {
              this.setState(prevState => ({
                instrumentState: {
                  [PaymentConstants.SAVED_INSTRUMENT]: {
                    ...prevState.instrumentState[
                      PaymentConstants.SAVED_INSTRUMENT
                    ],
                    allowTokenization: this.instrumentStaticParams[
                      PaymentConstants.SAVED_INSTRUMENT
                    ].isAutoConsentAutoChecked
                      ? true
                      : false,
                    tokenizationFlag: true
                  }
                }
              }));
            } else {
              this.setState(prevState => ({
                instrumentState: {
                  [PaymentConstants.SAVED_INSTRUMENT]: {
                    ...prevState.instrumentState[
                      PaymentConstants.SAVED_INSTRUMENT
                    ],
                    tokenizationFlag: false
                  }
                }
              }));
            }
          }
        } catch (e) {}
      }
    );
  }

  toggleAllowTokenization() {
    this.setInstrumentState(
      PaymentConstants.SAVED_INSTRUMENT,
      {},
      prevState => ({
        allowTokenization: !prevState.instrumentState[
          PaymentConstants.SAVED_INSTRUMENT
        ].allowTokenization
      })
    );
  }

  setCvv(e) {
    this.setInstrumentState(PaymentConstants.SAVED_INSTRUMENT, {
      cvv: e.currentTarget.value,
      cvvError: false
    });
    this.updateModeAttributes({
      cvvCode: e.currentTarget.value
    });
  }

  isValidCvv(cvv) {
    return cvv && cvv.length >= 3 && /^\d*$/.test(cvv);
  }

  removeSavedCard(e) {
    const instrumentId = e.currentTarget.getAttribute('data-instrumentid');
    if (instrumentId) {
      const { instrumentList } = this.state;

      this.props.setLoader(true);
      PaymentsManager.removeSavedCard(
        instrumentId,
        () => {
          this.props.setLoader(false);
          successNotification({
            message: 'Card successfully removed.'
          });
          this.setState({
            instrumentList: instrumentList.filter(
              instrumentData =>
                get(
                  instrumentData,
                  'paymentInstrumentDetails.data.0.instrumentId'
                ) !== instrumentId
            )
          });

          triggerEvent('REMOVE_EXPIRED_CARD', {
            maData: {
              entity_type: 'remove expired card',
              entity_name: 'expired card',
              entity_id: instrumentId
            }
          });
        },
        err => {
          this.props.setLoader(false);
          errorNotification(err);
        }
      );
    }
  }

  submitCallbackSavedInstrument(done) {
    const {
      state: {
        instrumentState: {
          [PaymentConstants.SAVED_INSTRUMENT]: { selectedInstrumentType, cvv }
        }
      }
    } = this;

    let valid = false;
    let message = '';

    if (selectedInstrumentType === 'card') {
      if (this.isValidCvv(cvv)) {
        valid = true;
      } else {
        this.setInstrumentState(PaymentConstants.SAVED_INSTRUMENT, {
          cvvError: true
        });
        if (cvv) {
          message = 'Invalid CVV, please enter a valid CVV.';
        } else {
          message = 'Enter CVV to place order.';
        }
      }
    } else if (selectedInstrumentType === 'vpa') {
      valid = true;
    }

    if (valid) {
      const savedInstrumentState = this.state.instrumentState[
        PaymentConstants.SAVED_INSTRUMENT
      ];
      if (
        this.instrumentStaticParams[PaymentConstants.SAVED_INSTRUMENT]
          .isCardAutoTokenizationEnabled
      ) {
        if (
          get(savedInstrumentState, 'allowTokenization') &&
          get(savedInstrumentState, 'tokenizationFlag')
        ) {
          triggerEvent('CARD_SUBMIT');
          this.updateModeAttributes(
            {
              tokenizationConsent: 'true'
            },
            done
          );
        } else {
          triggerEvent('CARD_SUBMIT');
          this.updateModeAttributes(
            {
              tokenizationConsent: 'false'
            },
            done
          );
        }
      } else {
        triggerEvent('CARD_SUBMIT');
        done();
      }
    } else {
      SHELL.alert('info', {
        message,
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
    }
  }

  /*
   * UPI action handlers
   */

  selectUPI(id, onClickParams) {
    this.setInstrumentState(
      PaymentConstants.UPI,
      {
        vpaRequired: onClickParams.vpaRequired,
        vpa: '',
        error: '',
        selectedHandle: onClickParams.vpaWithHandle
          ? this.instrumentStaticParams[PaymentConstants.UPI].handles[0]
          : ''
      },
      () => {},
      () => {
        const upiSupportedPG = this.state.instrumentState[PaymentConstants.UPI]
          .upiSupportedPG;
        if (isAndroidApp() && onClickParams.intentEnabled) {
          this.updateModeAttributes({
            upiSupportedPG: upiSupportedPG
          });
        }
      }
    );
    triggerEvent('PAYMENT_UPI_OPTION_SELECT', { gaLabel: onClickParams.name });
  }

  onInputChange(e) {
    const {
      state: {
        instrumentState: {
          [PaymentConstants.UPI]: { selectedHandle }
        }
      }
    } = this;

    const vpa = e.currentTarget.value;

    this.setInstrumentState(PaymentConstants.UPI, {
      vpa
    });

    const fullVpa = `${vpa}${selectedHandle}`;
    this.updateModeAttributes({
      vpa: fullVpa
    });
  }

  toggleHandles() {
    this.setInstrumentState(PaymentConstants.UPI, {}, prevState => ({
      handlesShown: !prevState.instrumentState[PaymentConstants.UPI]
        .handlesShown
    }));
  }

  toggleCheckbox() {
    this.setInstrumentState(
      PaymentConstants.UPI,
      {},
      prevState => ({
        saveCheck: !prevState.instrumentState[PaymentConstants.UPI].saveCheck
      }),
      () => {
        const savedVpa = this.state.instrumentState[PaymentConstants.UPI]
          .saveCheck
          ? 'on'
          : '';
        this.updateModeAttributes({
          savedVpa
        });
      }
    );
  }

  toggleSaveInfo() {
    this.setInstrumentState(PaymentConstants.UPI, {}, prevState => ({
      saveInfoShow: !prevState.instrumentState[PaymentConstants.UPI]
        .saveInfoShow
    }));
  }

  selectHandle(e) {
    const {
      state: {
        instrumentState: {
          [PaymentConstants.UPI]: { vpa, selectedHandle }
        }
      }
    } = this;

    const handle = e.currentTarget.id.slice(6);

    this.setInstrumentState(PaymentConstants.UPI, {
      selectedHandle: handle,
      handlesShown: false
    });

    const fullVpa = `${vpa}${selectedHandle}`;

    this.updateModeAttributes({
      vpa: fullVpa
    });
  }

  submitCallbackUPI(done) {
    const {
      state: {
        instrumentState: {
          [PaymentConstants.UPI]: { vpa, vpaRequired, selectedHandle }
        }
      }
    } = this;

    const validity = { valid: true, message: '' };
    const isVPAEmpty = vpaRequired && !(vpa && vpa.trim());

    if (isVPAEmpty) {
      validity.valid = false;
      validity.message = 'Please enter UPI ID';
    }

    if (validity.valid) {
      vpa
        ? PaymentsManager.validateVPA(`${vpa}${selectedHandle}`, done, err => {
            this.props.setLoader(false);
            this.setInstrumentState(PaymentConstants.UPI, {
              error: err.message
            });
          })
        : done();
    } else {
      this.setInstrumentState(PaymentConstants.UPI, {
        error: validity.message
      });
      this.props.setLoader(false);
    }
  }

  /*
   * Wallet action handlers
   */

  selectWallet(id, onClickParams) {
    triggerEvent('WALLET_SELECT', {
      gaLabel: onClickParams.name
    });
  }

  submitCallbackWallet(done) {
    triggerEvent('WALLET_SUBMIT', {
      gaLabel: this.state.selectedName
    });

    done();
  }

  /*
   * Netbanking action handlers
   */

  selectNetbanking(id, onClickParams) {
    triggerEvent('NETBANKING_SELECT', {
      gaLabel: onClickParams.name
    });
  }

  submitCallbackNetbanking(done) {
    triggerEvent('NETBANKING_SUBMIT', {
      gaLabel: this.state.selectedName
    });

    done();
  }

  /*
   * COD action handlers
   */

  setCaptchaDetails(data, done = () => {}) {
    const captchaId = get(data, 'id') || '';
    const codCaptcha = get(data, 'code') || '';
    this.setInstrumentState(
      PaymentConstants.COD,
      {},
      prevState => ({
        captchaDetails: {
          code: codCaptcha,
          id: captchaId
        }
      }),
      () => {
        this.updateModeAttributes(
          {
            captchaId,
            codCaptcha
          },
          () => {
            this.props.setLoader(false);
            done();
          }
        );
      }
    );
  }

  setCaptchaRef(node) {
    this.captchaComp = node;
  }

  submitCallbackCOD(done) {
    if (this.state.instrumentState[PaymentConstants.COD].captchaEnabled) {
      this.captchaComp.submitWithCaptcha(done);
    } else {
      done();
    }
  }

  /*
   * BNPL action handlers
   */

  setMobile(e) {
    const value = e.target.value;
    this.setInstrumentState(PaymentConstants.PAY_LATER, {
      mobileValue: value,
      errorMessage: ''
    });
    const mobile = this.getMobile(value);
    this.updateModeAttributes({
      userProfileMobile: mobile
    });
  }

  showTNCModal(successCallback) {
    this.props.setLoader(false);
    this.setInstrumentState(PaymentConstants.PAY_LATER, {
      modalShow: true,
      modalSuccessCallback: successCallback
    });
  }

  hideTNCModal() {
    this.setInstrumentState(PaymentConstants.PAY_LATER, {
      modalShow: false,
      modalSuccessCallback: null
    });
  }

  onTNCSuccess() {
    this.props.setLoader(true);
    this.state.instrumentState[PaymentConstants.COD].modalSuccessCallback();
  }

  displayInput(optionData) {
    const { loginType, status } = optionData;
    return status !== 'ACTIVE' && loginType === 'EMAIL';
  }

  isValidMobileBNPL() {
    const mobile = this.state.instrumentState[PaymentConstants.PAY_LATER]
      .mobileValue;
    if (!isValidMobile(mobile)) {
      const isEmptyMobile = (mobile || '').length === 0;
      this.setState({
        errorMessage: isEmptyMobile
          ? BNPL_ERROR_MESSAGE_MAP.EMPTY
          : BNPL_ERROR_MESSAGE_MAP.INVALID
      });
      return false;
    }
    return true;
  }

  getMobile(mobileValue) {
    return (
      mobileValue ||
      this.state.instrumentState[PaymentConstants.PAY_LATER].mobileValue ||
      ''
    );
  }

  redirectToTNC() {
    SHELL.redirectTo(
      `/checkout/payment/bnpl/tnc?mobile=${this.getMobile()}&context=recommended`
    );
  }

  submitCallbackBNPL(done) {
    const bnplOptionData = getBNPLOptionData(this.props.instrumentData);
    const disabled =
      bnplOptionData.disable && isFeatureEnabled('CHECKOUT_LOW_SR_V2');

    if (disabled) {
      SHELL.alert('info', {
        message: 'Select another payment option to place order.',
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
      return;
    }

    if (this.displayInput(bnplOptionData) && !this.isValidMobileBNPL()) {
      this.props.setLoader(false);
      return;
    }

    if (bnplOptionData.tncAccepted) {
      done();
      return;
    }

    this.props.deviceMode === 'mobile'
      ? this.redirectToTNC()
      : this.showTNCModal(done);
  }

  triggerSubmitEvent() {
    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: `${this.state.instrumentType} ${this.state.selectedName || ''}`,
          v2: 'Recommended',
          v3: this.state.selectedRank,
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
  }

  submitCallback(done) {
    const submitHandler = this.instrumentSubmitHandlers[
      this.state.instrumentType
    ];

    let message = '';

    if (!this.state.selectedId) {
      message = 'Select a payment option to place order.';
      SHELL.alert('info', {
        message,
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
    } else {
      if (submitHandler) {
        submitHandler(() => {
          this.triggerSubmitEvent();
          done();
        });
      } else {
        this.triggerSubmitEvent();
        done();
      }
    }
  }

  render() {
    const {
      props: { instrumentData, ...restProps },
      state: { selectedId, ...restState },
      instrumentStaticParams
    } = this;
    const savedInstrumentStaticParams = this.instrumentStaticParams[
      PaymentConstants.SAVED_INSTRUMENT
    ];
    const savedInstrumentState =
      restState.instrumentState[PaymentConstants.SAVED_INSTRUMENT];
    const isTokenizationConsentTaken =
      get(savedInstrumentStaticParams, 'isCardAutoTokenizationEnabled') &&
      get(savedInstrumentStaticParams, 'isAutoConsentAutoChecked') &&
      get(savedInstrumentState, 'tokenizationFlag');

    return (
      <RecommendedInstrumentsUI
        {...restState}
        {...pick(this, commonActionHandlers)}
        selectedId={selectedId}
        instrumentStaticParams={instrumentStaticParams}
        instrumentActionHandlers={this.instrumentActionHandlers}
        {...restProps}
        isTokenizationConsentTaken={isTokenizationConsentTaken}
        allowTokenization={false}
      />
    );
  }
}

export default RecommendedInstruments;
