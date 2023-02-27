import get from 'lodash/get';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isGiftcardContext } from 'commonUtils/helper';
import {
  sessionStorageKeys,
  localStorageKeys,
  cookieKeys
} from 'commonUtils/constants';
import {
  isSessionStorageEnabled,
  isLocalStorageEnabled,
  getUidx,
  isLoggedIn,
  isAndroidApp,
  navigateTo,
  isIOSApp,
  getProfileEmail,
  getCookie,
  setCookie,
  getDateDiff
} from 'commonBrowserUtils/Helper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  AndroidBridgeHelper,
  IOSBridgeHelper
} from 'commonBrowserUtils/JSBridgeHelper';

const {
  RECOMMENDED_INSTRUMENT,
  COD,
  SAVED_INSTRUMENT,
  CREDIT_CARD,
  DEBIT_CARD,
  UPI,
  NETBANKING,
  EMI_TYPE,
  WALLET_TYPE,
  GIFTCARD,
  PAY_LATER
} = PaymentConstants;
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const getPaymentLoginUrl = obj => {
  let paymentUrl = `/login?referer=/checkout/payment&force=${get(
    obj,
    'force'
  ) || ''}`;
  if (isGiftcardContext()) {
    paymentUrl = `${paymentUrl}&cartContext=egiftcard`;
  }
  return paymentUrl;
};

const getCodFallbackResponse = () => {
  return {
    paymentInstrumentDetails: [
      {
        type: 'cod',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl: get(getKVPairValue('COD_FALLBACK_CONFIG'), 'urlV3'),
          data: [
            {
              cashOnly: false,
              firstTimeUser: false,
              minCOD: null,
              maxCOD: null
            }
          ],
          enable2fa: false
        }
      }
    ]
  };
};

const getPaymentFailureCount = () => {
  let failureCount = {};
  if (isSessionStorageEnabled()) {
    try {
      failureCount =
        JSON.parse(
          sessionStorage.getItem(
            sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT
          )
        ) || {};
    } catch (e) {
      failureCount = {};
    }
  }

  return failureCount[getUidx()] || '0';
};

const redirectToPayment = () => {
  const paymentUrl = '/checkout/payment';
  const redirectionUrl = isLoggedIn()
    ? paymentUrl
    : `/login?referer=${paymentUrl}`;
  navigateTo(redirectionUrl);
};

const getInstrumentTwoFAData = paymentInstrumentDetails => {
  const { enable2fa, enableEmailOTP, phoneNumbers = [] } =
    paymentInstrumentDetails || {};
  const phoneNumbersAvailable = phoneNumbers && phoneNumbers.length > 0;
  const emailAvailable = !!getProfileEmail();
  const enable =
    enable2fa &&
    (phoneNumbersAvailable || (enableEmailOTP ? emailAvailable : false));

  return {
    enable,
    enableEmailOtp: enableEmailOTP,
    mobileNumbers: phoneNumbers
  };
};

const getInstrumentData = (paymentOptions = {}, option) =>
  get(paymentOptions, 'paymentInstrumentDetails', []).find(
    info => info.type === option
  );

const getPaymentTriedCount = () => {
  if (isLocalStorageEnabled()) {
    return +localStorage.getItem(localStorageKeys.PAYMENT_TRIED_COUNT) || 0;
  }
  return 0;
};

const resetPaymentRetrySession = () => {
  if (
    (isFeatureEnabled('PAYMENT_FAILURE_HALFCARD') ||
      isFeatureEnabled('DOPE_USER_CONSENT')) &&
    isLocalStorageEnabled()
  ) {
    localStorage.removeItem(localStorageKeys.PAYMENT_TRIED_COUNT);
    localStorage.removeItem(localStorageKeys.PAYMENT_MODE_ATTRIBUTES);
  }
};
const getWalletTabs = walletData =>
  (get(walletData, 'paymentInstrumentDetails.data', []) || []).filter(
    wallet => wallet.directDisplay
  );

const getPaymentConfig = paymentOptions => {
  const paymentConfig = {};
  const instrumentList = [
    COD,
    SAVED_INSTRUMENT,
    DEBIT_CARD,
    CREDIT_CARD,
    NETBANKING,
    UPI,
    GIFTCARD,
    EMI_TYPE,
    WALLET_TYPE,
    PAY_LATER
  ];

  paymentConfig.instrumentData = instrumentList.reduce((acc, type) => {
    acc[type] = getInstrumentData(paymentOptions, type);
    return acc;
  }, {});

  paymentConfig.instrumentData[RECOMMENDED_INSTRUMENT] =
    paymentOptions.recommendedPaymentInstrumentDetails;

  paymentConfig.savedInstruments =
    get(
      paymentConfig.instrumentData[SAVED_INSTRUMENT],
      'paymentInstrumentDetails.data',
      []
    ) || [];

  const BNPLInstrumentData = (
    get(
      paymentConfig,
      `instrumentData.${PAY_LATER}.paymentInstrumentDetails.data`
    ) || []
  ).find(paymentType => paymentType.id === 1);

  const BNPLPaymentUrl = get(
    paymentConfig,
    `instrumentData.${PAY_LATER}.paymentInstrumentDetails.paymentUrl`
  );

  paymentConfig.instrumentData.BNPL = {
    ...BNPLInstrumentData,
    paymentUrl: BNPLPaymentUrl
  };

  paymentConfig.walletConfig = {
    walletTabs: getWalletTabs(paymentConfig.instrumentData[WALLET_TYPE])
  };

  return paymentConfig;
};

const createUrlWithQueryParams = (url = '', params = {}) => {
  let redirectUrl = url || '';
  const queryParamRegex = new RegExp('A?[^&]*=[^&]*');
  let isFirstQueryParam = url && !queryParamRegex.test(url);
  let isUrlParamsSeparatorRequired =
    url && isFirstQueryParam && url[url.length - 1] !== '?';

  for (const key in params) {
    if (isFirstQueryParam) {
      if (isUrlParamsSeparatorRequired) {
        redirectUrl += `?${key}=${params[key]}`;
        isUrlParamsSeparatorRequired = false;
      } else {
        redirectUrl += `${key}=${params[key]}`;
      }
      isFirstQueryParam = false;
    } else {
      redirectUrl += `&${key}=${params[key]}`;
    }
  }

  return redirectUrl;
};

const getInstalledAppsPromise = () => {
  if (isAndroidApp()) {
    return Promise.resolve(AndroidBridgeHelper.getAllInstalledUPIApps());
  } else if (isIOSApp()) {
    return new Promise(resolve => {
      IOSBridgeHelper.getAllInstalledUPIAppsPromise().then(resolve);
    });
  } else {
    return Promise.resolve({ installedApps: [], upiSDKEnabled: false });
  }
};

const getUPISupportedPgPromise = () => {
  if (isAndroidApp()) {
    return Promise.resolve(AndroidBridgeHelper.getSupportedUPIPg());
  }
  return Promise.resolve('[]');
};

const isTwoFAEnabled = props => {
  const {
    instrumentData: { type } = {},
    myntraInstrumentsData,
    twoFA,
    twoFAResponse: { userActions } = {}
  } = props;
  let enable2fa = get(get(userActions, type, [])[0], 'value') || false;
  enable2fa =
    enable2fa ||
    (get(get(userActions, 'myntraCredit', [])[0], 'value', false) &&
      get(myntraInstrumentsData, 'twofa_mc_data.enable'));
  enable2fa =
    enable2fa ||
    (get(get(userActions, 'loyaltyPoint', [])[0], 'value', false) &&
      get(myntraInstrumentsData, 'twofa_lp_data.enable'));
  return !twoFA.disabled && enable2fa;
};

const getRetryGCappliedValue = (balance, outstanding) => {
  return balance > outstanding ? outstanding : balance;
};

const consolidatePriceInstruments = (
  priceInstrumentsData = [],
  additionalInstruments
) => {
  let instruments = priceInstrumentsData.reduce((acc, instrument) => {
    const additionalValue = additionalInstruments[instrument.name] || 0;
    acc.push({
      name: instrument.name,
      value: instrument.value + additionalValue
    });
    delete additionalInstruments[instrument.name];
    return acc;
  }, []);

  Object.keys(additionalInstruments).forEach(instrumentKey => {
    instruments.push({
      name: instrumentKey,
      value: additionalInstruments[instrumentKey]
    });
  });

  return instruments;
};

const showTokenizationConsent = isAutoConsentFlow => {
  const savedCardConsentInfo = getKVPairValue('SAVED_CARD_CONSENT');
  const count = get(savedCardConsentInfo, 'consentCardCapping.count') || 2;
  const frequency =
    get(savedCardConsentInfo, 'consentCardCapping.frequency') || 7;
  const Saved_Card_Consent_Cookie_Expiry = 3600 * 24 * frequency * 1000;
  let consentCount = getCookie(cookieKeys.SAVED_CARD_CONSENT_COUNT);
  const consentCountCookieDateValue = getCookie(
    cookieKeys.SAVED_CARD_CONSENT_DATE
  );
  const consentCountCookieDate = new Date(
    consentCountCookieDateValue ? consentCountCookieDateValue : null
  );
  const currentDate = new Date();
  let isAutoConsentUnchecked = false;

  if (isAutoConsentFlow) {
    isAutoConsentUnchecked = true;
    //check if cookie does not exists or needs to be reset
    if (
      typeof consentCount === 'undefined' ||
      typeof consentCountCookieDateValue === 'undefined' ||
      getDateDiff(consentCountCookieDate.getTime(), currentDate.getTime()) >
        frequency
    ) {
      setCookie(
        cookieKeys.SAVED_CARD_CONSENT_COUNT,
        1,
        Saved_Card_Consent_Cookie_Expiry
      );
      let date = new Date();
      setCookie(
        cookieKeys.SAVED_CARD_CONSENT_DATE,
        date,
        Saved_Card_Consent_Cookie_Expiry
      );
      consentCount = 1;
    } else {
      setCookie(
        cookieKeys.SAVED_CARD_CONSENT_COUNT,
        parseInt(consentCount) + 1,
        Saved_Card_Consent_Cookie_Expiry
      );
    }
  }
  if (isAutoConsentUnchecked) {
    return consentCount < count;
  }
  return true;
};

const getEmiEligibility = code => {
  const emiEligibilityCodeConfig =
    getKVPairValue('EMI_ELIGIBILITY_CODE')[code] ||
    getKVPairValue('EMI_ELIGIBILITY_CODE').default;
  const isEligible = get(emiEligibilityCodeConfig, 'eligible');
  return isEligible;
};

const getOfferString = numberOfOffers => {
  let offerString = '';
  switch (numberOfOffers) {
    case 0:
      break;
    case 1:
      offerString = '1 Offer';
      break;
    default:
      offerString = numberOfOffers + ' Offers';
  }
  return offerString;
};

const addOffersToInstrumentDetails = (offer, instrumentData) => {
  const instrumentDetails = get(
    instrumentData,
    'paymentInstrumentDetails.data',
    ''
  );
  if (!offer || !instrumentDetails) return;
  offer.forEach(off => {
    instrumentDetails.forEach(data => {
      if (off.bankCode.toLowerCase() == data.bankCode.toLowerCase())
        data.offerDetails = off.offerDetails;
    });
  });
};

const inlineOfferWidgetLoadEvent = (instrument, appName, isOfferPresent) => {
  triggerEvent('INLINE_OFFER_WIDGET_LOAD', {
    custom: {
      custom: {
        v1: instrument,
        v2: appName,
        v3: isOfferPresent
      }
    }
  });
};

export {
  getPaymentFailureCount,
  getCodFallbackResponse,
  getPaymentLoginUrl,
  redirectToPayment,
  getInstrumentTwoFAData,
  getInstrumentData,
  getWalletTabs,
  getPaymentConfig,
  getPaymentTriedCount,
  resetPaymentRetrySession,
  getInstalledAppsPromise,
  getUPISupportedPgPromise,
  isTwoFAEnabled,
  createUrlWithQueryParams,
  getRetryGCappliedValue,
  consolidatePriceInstruments,
  showTokenizationConsent,
  getEmiEligibility,
  getOfferString,
  addOffersToInstrumentDetails,
  inlineOfferWidgetLoadEvent
};
