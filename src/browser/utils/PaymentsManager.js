import get from 'lodash/get';
import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import config from '../../config';
import {
  getCookie,
  getDeviceId,
  getUidx,
  getXMetaApp
} from 'commonBrowserUtils/Helper';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import {
  getCartContext,
  checkExchangeCart
} from 'commonBrowserUtils/CartHelper';
import { cookieKeys, checkoutPage } from 'commonUtils/constants';

const PaymentsManager = (function() {
  return {
    getPageData(options = {}, cartData = {}) {
      let headers = {
        pagesource: checkoutPage.PAYMENT,
        ...getConfig().headers
      };

      const addedgiftcard = options.addedGiftcard;
      const gcfetched = get(options, 'prefetchedData.gcBalance') ? true : false;
      const lpfetched = get(options, 'prefetchedData.lpBalance') ? true : false;
      // whether to fetch gc
      const gcLazyLoad = isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD', null);
      const fetchGC =
        addedgiftcard ||
        (!gcfetched && isFeatureEnabled('AUTOGC_ENABLED', null) && !gcLazyLoad);

      // whether to fetch lp
      const lpLazyLoad = isFeatureEnabled('LP_BALANCE_LAZYLOAD', null);
      const fetchLP =
        !lpfetched && isFeatureEnabled('LP_ENABLED', null) && !lpLazyLoad;

      // whether to fetch address
      const fetchAddress =
        isVariantEnabled('AOC_V2_VARIANT3') || checkExchangeCart(cartData);

      const isCartDataAvailable = cartData.id;

      const mode = isCartDataAvailable ? 'spa' : '';

      const stampCart = isCartDataAvailable
        ? !cartData.orderAddressId || !cartData.unifiedAddressId
        : false;

      // Resolve the data if there's nothing to fetch
      if (
        mode === 'spa' &&
        !fetchGC &&
        !fetchLP &&
        !fetchAddress &&
        !stampCart
      ) {
        return Promise.resolve({});
      }

      const retryQueryPath = {};
      if (options.payMode) {
        retryQueryPath.mode = options.payMode;
        retryQueryPath.ppsid = options.ppsId;
        retryQueryPath.referrer = options.referrer;
      }

      const cartContext = getCartContext();

      let addressID = '';
      if (cartContext === 'egiftcard') {
        addressID = getCookie(cookieKeys.GIFT_ORDER_ADDRESS_ID);
      } else if (fetchAddress && cartData.orderAddressId) {
        addressID = `${cartData.orderAddressId}`;
      } else if (stampCart) {
        addressID = getCookie(cookieKeys.ORDER_ADDRESS_ID);
      }
      const cartUnselected = 'false';

      const payload = {
        mode,
        addressID,
        cartContext,
        fetchGC,
        fetchLP,
        fetchAddress,
        cartUnselected,
        stampCart,
        ...retryQueryPath
      };

      const { clientUrl } = config('fetchPayment');

      return RequestManager.handleRequestWithPromise({
        method: 'post',
        url: clientUrl,
        headers,
        data: payload
      });
    },

    getPaymentOptions(props, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('ppsClient');
      const { isExchangeCart = false, ...data } = props;
      const headers = {
        Client: client,
        Version: version,
        'Content-Type': 'application/json',
        xMetaApp: getXMetaApp(),
        'saved-instruments': true,
        'paynow-version': 'v3',
        ...getConfig().headers
      };

      isFeatureEnabled('RECOMMENDED_OPTIONS') &&
        (headers['payment-personalization'] = true);

      RequestManager.handle(
        {
          method: 'post',
          url: `${clientUrl}v3/paymentInstruments`,
          data,
          headers
        },
        successCallback,
        errorCallback
      );
    },

    getDeferredPaymentOptions(data, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('ppsClient');
      const headers = {
        Client: client,
        Version: version,
        'Content-Type': 'application/json',
        xMetaApp: getXMetaApp(),
        'saved-instruments': true,
        ...getConfig().headers
      };

      RequestManager.handle(
        {
          method: 'post',
          url: `${clientUrl}deferredPayment/v1/paymentInstruments`,
          data,
          headers
        },
        successCallback,
        errorCallback
      );
    },

    requestOTPGateway(data, successCallback, errorCallback) {
      const { clientRoot, path } = config('shield');
      RequestManager.handle(
        {
          method: 'post',
          url: `${clientRoot}${path}otp/send`,
          data,
          headers: {
            'x-mynt-ctx': `storeid=2297;uidx=${getUidx()}`,
            'm-clientid': 'myntra-02d7dec5-8a00-4c74-9cf7-9d62dbea5e61'
          }
        },
        successCallback,
        errorCallback
      );
    },

    generateCaptcha(successCallback, errorCallback) {
      RequestManager.handle(
        {
          method: 'get',
          url: config('captcha').clientUrl,
          headers: { accept: 'application/json' }
        },
        successCallback,
        errorCallback
      );
    },

    addGiftCard(data, successCallback, errorCallback) {
      RequestManager.handle(
        {
          method: 'post',
          url: `${config('giftcard').clientUrl}`,
          data,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    getPlutusEligibility(data, successCallback, errorCallback) {
      RequestManager.handle(
        {
          method: 'post',
          url: config('plutus').clientUrl,
          data
        },
        successCallback,
        errorCallback
      );
    },
    resendBNPLOTP(transactionId, successCallback, errorCallback) {
      RequestManager.handle(
        {
          method: 'get',
          url: `${config('wallet').clientUrl}?transactionId=${transactionId}`,
          headers: {
            xMetaApp: getXMetaApp()
          }
        },
        successCallback,
        errorCallback
      );
    },
    resendPaymentOTP(
      { transactionId, instrumentType },
      successCallback,
      errorCallback
    ) {
      const { clientUrl, client, version } = config('ppsClient');
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}v2/otp/resend/${instrumentType}/${transactionId}`,
          headers: {
            client,
            version,
            xMetaApp: getXMetaApp()
          }
        },
        successCallback,
        errorCallback
      );
    },
    validateVPA(vpa, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('paymentsClient');
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}vpa/validateVPA/${vpa}`,
          headers: {
            Client: client,
            Version: version,
            'Content-Type': 'application/json'
          }
        },
        successCallback,
        errorCallback
      );
    },
    checkCardSuccessRate(binNumber, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('paymentsClient');
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}binSuccessRate/${binNumber}`,
          headers: {
            Client: client,
            Version: version,
            'Content-Type': 'application/json'
          }
        },
        successCallback,
        errorCallback
      );
    },
    removeSavedCard(instrumentId, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('paymentsClient');
      RequestManager.handle(
        {
          method: 'del',
          url: `${clientUrl}savedCard/at/${instrumentId}`,
          headers: {
            Client: client,
            Version: version,
            'Content-Type': 'application/json'
          }
        },
        successCallback,
        errorCallback
      );
    },
    paynow(
      url,
      data,
      successCallback,
      errorCallback,
      isDopeWithUserConsentEnabled = false
    ) {
      const { client, version } = config('paymentsClient');
      let configHeaders = getConfig().headers;

      if (
        !isFeatureEnabled('DOPE_SYSTEM_CONSENT') &&
        isDopeWithUserConsentEnabled
      ) {
        configHeaders['x-myntra-pps'] = 'dope.user.consent.cod=true;';
      }

      const headers = {
        Client: client,
        Version: version,
        'Content-Type': 'application/json',
        ...configHeaders
      };
      RequestManager.handle(
        {
          method: 'post',
          url: url,
          headers,
          data
        },
        successCallback,
        errorCallback
      );
    },
    exchange(data, successCallback, errorCallback) {
      const { clientUrl, client, version } = config('ppsClient');
      const headers = {
        Client: client,
        Version: version,
        'Content-Type': 'application/json',
        ...getConfig().headers
      };
      RequestManager.handle(
        {
          method: 'post',
          url: `${clientUrl}oee/v1/pay`,
          headers,
          data
        },
        successCallback,
        errorCallback
      );
    },
    userTwoFAVerification(data, successCallback, errorCallback) {
      const { clientRoot, path } = config('shield');
      const header = {
        'Content-Type': 'application/json',
        'x-meta-app': `channel=web;deviceId=${getDeviceId()}`
      };
      RequestManager.handle(
        {
          method: 'post',
          url: `${clientRoot}${path}user/verification`,
          data,
          headers: header
        },
        successCallback,
        errorCallback
      );
    },
    getCardType(cardNo = '') {
      const { clientUrl, client, version } = config('paymentsClient');

      cardNo = cardNo.replace(/ /g, '').substring(0, 6); // maxDigits to send-> 6

      const headers = {
        Client: client,
        Version: version,
        'Content-Type': 'application/json',
        ...getConfig().headers
      };

      return RequestManager.handleRequestWithPromise({
        method: 'get',
        url: `${clientUrl}cardToken/binDetails/${cardNo}`,
        headers,
        data: null
      });
    }
  };
})();

export default PaymentsManager;
