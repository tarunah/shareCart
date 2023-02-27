import get from 'lodash/get';

import WalletCardUI from '../Wallets/WalletCardUI';
import EmiCardUI from '../EMI/EmiCardUI';
import { UPIApp as UPICardUI } from '../Upi/UpiComponents';
import NetBankingCardUI from '../NetBanking/NetBankingCardUI';
import SavedInstrumentCardUI from '../SavedInstruments/SavedInstrumentCardUI';
import CodCardUI from '../Cod/CodCardUI';
import BNPLCardUI from '../BNPL/BNPLCardUI';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  roundNumber,
  getProfileMobile,
  getUidx,
  isApp
} from 'commonBrowserUtils/Helper';
import { isTwoFAEnabled } from 'commonBrowserUtils/PaymentHelper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const {
  COD,
  SAVED_INSTRUMENT,
  UPI,
  NETBANKING,
  EMI_TYPE,
  WALLET_TYPE,
  PAY_LATER,
  WALLET_PM_DIRECT,
  WALLET_PM,
  WALLET_PM_NAME,
  EMI_PM,
  EMI_PM_NAME
} = PaymentConstants;

const TYPE_COMPONENT_MAP = {
  [COD]: CodCardUI,
  [SAVED_INSTRUMENT]: SavedInstrumentCardUI,
  [UPI]: UPICardUI,
  [NETBANKING]: NetBankingCardUI,
  [EMI_TYPE]: EmiCardUI,
  [WALLET_TYPE]: WalletCardUI,
  [PAY_LATER]: BNPLCardUI
};

const TYPE_DATA_FORMATTER_MAP = {
  [UPI]: (data, options) => {
    const name = data.name.toLowerCase().replace(/\s/g, '');
    const bankCode = data.bankCode.toLowerCase();
    const isOtherUPI = bankCode === 'otherupi';
    const isGooglePay = bankCode === 'googlepay';
    const appIntentEnabled =
      options.installedApps.indexOf(name) !== -1 && options.upiIntentEnabled;
    return {
      id: data.id,
      name,
      bankCode,
      displayName: data.name,
      show: isApp() ? appIntentEnabled || isOtherUPI : data.popular,
      vpaWithHandle: isGooglePay,
      vpa: isOtherUPI || (isGooglePay && !appIntentEnabled),
      intentEnabled: appIntentEnabled,
      instrumentType: data.instrumentType,
      hasLowSR: data.lowSuccessRate,
      disable: data.disable,
      paymentUrl: data.paymentUrl
    };
  }
};

const TYPE_FORM_PARAMS_MAP = {
  [COD]: onClickParams => ({
    paymentMode: COD,
    paymentModeName: COD,
    modeAttributes: {},
    paymentUrl: onClickParams.paymentUrl
  }),
  [SAVED_INSTRUMENT]: onClickParams => ({
    paymentMode:
      onClickParams.paymentInstrumentType === 'vpa' ? UPI : 'creditcard',
    paymentModeName: SAVED_INSTRUMENT,
    modeAttributes: {
      useSavedCard:
        onClickParams.paymentInstrumentType === 'card' ? 'true' : 'false',
      useSavedVpa: onClickParams.vpa ? 'true' : 'false',
      upiSdkEnabled:
        onClickParams.upiIntentEnabled &&
        onClickParams.installedApps.indexOf(onClickParams.appName) !== -1,
      cvvCode: onClickParams.cvv,
      otherCards: 'false',
      paymentInstrument: onClickParams.id,
      bankCashbackEligible: `${onClickParams.bankDiscount !== 0}`,
      bankCashbackAmount: onClickParams.bankDiscount,
      addressSel: onClickParams.addressId,
      user: getUidx()
    },
    paymentUrl: onClickParams.paymentUrl
  }),
  [UPI]: onClickParams => ({
    paymentMode: UPI,
    paymentModeName: UPI,
    modeAttributes: {
      paymentProviderId: onClickParams.id || '',
      vpa: onClickParams.vpa
        ? `${onClickParams.vpa}${onClickParams.selectedHandle}`
        : '',
      saveVpa: onClickParams.saveCheck ? 'on' : '',
      upiSdkEnabled: onClickParams.intentEnabled
    },
    paymentUrl: onClickParams.paymentUrl,
    formAttributes: { noValidate: true }
  }),
  [NETBANKING]: onClickParams => ({
    paymentMode: NETBANKING,
    paymentModeName: NETBANKING,
    modeAttributes: {
      paymentProviderId: onClickParams.id
    },
    paymentUrl: onClickParams.paymentUrl
  }),
  [EMI_TYPE]: onClickParams => ({
    paymentMode: EMI_PM,
    paymentModeName: EMI_PM_NAME,
    modeAttributes: {
      paymentProviderId: onClickParams.id || ''
    },
    paymentUrl: onClickParams.paymentUrl,
    formAttributes: { noValidate: true }
  }),
  [WALLET_TYPE]: onClickParams => ({
    paymentMode: onClickParams.directIntegration ? WALLET_PM_DIRECT : WALLET_PM,
    paymentModeName: WALLET_PM_NAME,
    modeAttributes: {
      walletEnabled: 'true',
      paymentProviderId: onClickParams.id || '',
      walletAmount: roundNumber(onClickParams.totalPayable || 0, 2)
    },
    paymentUrl: onClickParams.paymentUrl,
    formAttributes: { noValidate: true }
  }),
  [PAY_LATER]: onClickParams => ({
    paymentMode: PAY_LATER,
    paymentModeName: PAY_LATER,
    modeAttributes: {
      userProfileMobile: onClickParams.mobile,
      paymentProviderId: 1
    },
    paymentUrl: onClickParams.paymentUrl
  })
};

const getInitialState = props => {
  const codInstrumentData = get(props, 'instrumentData', []).find(
    instrument => instrument.type === COD
  );
  const twoFAEnabled = isTwoFAEnabled({
    ...props,
    instrumentData: codInstrumentData
  });
  return {
    selectedId: '',
    selectedName: '',
    selectedRank: '',
    instrumentType: '',
    instrumentList: props.instrumentData,
    payNowFormParams: {
      paymentMode: '',
      paymentModeName: '',
      modeAttributes: {},
      paymentUrl: '',
      formAttributes: {}
    },
    isOptionsCollapsed: props.deviceMode === 'mobile',
    instrumentState: {
      [SAVED_INSTRUMENT]: {
        installedApps: [],
        upiIntentEnabled: false,
        selectedInstrumentType: '',
        cvv: '',
        cvvError: false,
        vpa: '',
        vpaAppName: '',
        upiSupportedPG: [],
        allowTokenization: false,
        tokenizationFlag: ''
      },
      [UPI]: {
        installedApps: [],
        upiIntentEnabled: false,
        vpaRequired: false,
        vpa: '',
        selectedHandle: '',
        handlesShown: false,
        saveCheck: true,
        saveInfoShow: false,
        error: '',
        upiSupportedPG: []
      },
      [COD]: {
        errorMessage: '',
        twoFAEnabled,
        captchaEnabled:
          isFeatureEnabled('COD_CAPTCHA_ENABLED') && !twoFAEnabled,
        captchaDetails: {
          id: null,
          code: null
        }
      },
      [PAY_LATER]: {
        mobileValue: '',
        errorMessage: '',
        modalShow: false,
        modalSuccessCallback: null
      }
    }
  };
};

const getComponent = type => TYPE_COMPONENT_MAP[type];

const getPayNowFormParams = onClickParams =>
  TYPE_FORM_PARAMS_MAP[onClickParams.instrumentType](onClickParams);

const getFormattedData = (data, options) =>
  TYPE_DATA_FORMATTER_MAP[data.instrumentType]
    ? TYPE_DATA_FORMATTER_MAP[data.instrumentType](data, options)
    : data;

export { getInitialState, getComponent, getPayNowFormParams, getFormattedData };
