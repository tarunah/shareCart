const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');

const NodeCircuitBreaker = require('node-circuitbreaker');
const nodeCircuitBreaker = require('./nodeCircuitBreaker');

const StyleService = require('style-service-client');
const StyleServiceClient = new StyleService(2000);

const config = require('../../config');
const { getCartFetchConfig } = require('../utils/helpers');
const statsdMiddleware = require('../utils/statsd');
const { CIRCUIT_BREAKER_NAMES } = require('./constants');
const { getConfig } = require('../../utils/requestConfig');
const { isFeatureEnabled } = require('../../utils/FeaturesManager');
const { getKVPairValue } = require('../../utils/KVPairManager');
const {
  checkoutPage: { PAYMENT }
} = require('../../utils/constants');

const checkFor4xx = httpStatus => {
  // Exclude 429 since it is for rate limiting
  return `${httpStatus}`.startsWith('4') && httpStatus !== 429;
};

const errorFilterForServices = error => {
  const httpStatus = get(error, 'errorLog.status');

  return (
    !NodeCircuitBreaker.isOurError(error) &&
    (checkFor4xx(httpStatus) || error.status === 'UPDATE_TOKENS')
  );
};

const circuitBreakerServicesConfig = {
  [CIRCUIT_BREAKER_NAMES.cartFetch]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.cartFetch,
      resetTimeout: 2000,
      volumeThreshold: 2,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => {
      let { url, method, applyProperties: payload } = getCartFetchConfig({
        req,
        applyGC: options.applyGC,
        pincode: options.pincode,
        unselected: options.unselected
      });

      return {
        url,
        method,
        payload,
        headers: { pagesource: options.pagesource, ...getConfig(req).headers },
        plugin: statsdMiddleware,
        auth: {
          enableAuthNZ:
            isFeatureEnabled('AUTHNZ', null, req) &&
            (getKVPairValue('AUTHNZ_SERVICES', req) || {}).cartFetch
        }
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.addressAll]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.addressAll,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: req => ({
      url: config('address').url,
      method: 'get',
      plugin: statsdMiddleware,
      headers: getConfig(req).headers,
      auth: {
        enableAuthNZ:
          isFeatureEnabled('AUTHNZ', null, req) &&
          (getKVPairValue('AUTHNZ_SERVICES', req) || {}).addressAll
      }
    })
  },
  [CIRCUIT_BREAKER_NAMES.addressById]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.addressById,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => ({
      url: `${config('address').url}/${options.addressId}`,
      method: 'get',
      headers: getConfig(req).headers,
      plugin: statsdMiddleware,
      auth: {
        enableAuthNZ:
          isFeatureEnabled('AUTHNZ', null, req) &&
          (getKVPairValue('AUTHNZ_SERVICES', req) || {}).addressById
      }
    })
  },
  [CIRCUIT_BREAKER_NAMES.orderAddressByUnifiedId]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.orderAddressByUnifiedId,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => ({
      url: `${config('orderAddress').url}/${options.unifiedAddressId}`,
      method: 'get',
      headers: getConfig(req).headers,
      plugin: statsdMiddleware,
      auth: {
        enableAuthNZ:
          isFeatureEnabled('AUTHNZ', null, req) &&
          (getKVPairValue('AUTHNZ_SERVICES', req) || {}).orderAddressByUnifiedId
      }
    })
  },
  [CIRCUIT_BREAKER_NAMES.cartSetAddress]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.cartSetAddress,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => {
      const url = `${config('cart').url}${(req.query &&
        req.query.cartContext) ||
        'default'}/address?unifiedAddressId=${
        options.unifiedAddressId
      }&addressId=${options.orderAddressId}`;

      return {
        url,
        method: 'put',
        headers: { pagesource: options.pagesource, ...getConfig(req).headers },
        plugin: statsdMiddleware,
        auth: {
          enableAuthNZ:
            isFeatureEnabled('AUTHNZ', null, req) &&
            (getKVPairValue('AUTHNZ_SERVICES', req) || {}).cartSetAddress
        }
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.giftcardFetch]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 2500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.giftcardFetch,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: req => ({
      url: `${config('profile').url}/getMyntraCreditBalance`,
      headers: getConfig(req).headers,
      method: 'get',
      auth: { enableAuthNZ: false }
    })
  },
  [CIRCUIT_BREAKER_NAMES.loyaltyFetch]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 2500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.loyaltyFetch,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: req => {
      const { url } = config('user');
      const loyaltyURL = `${url}loyaltypoints/balance`;

      return {
        url: loyaltyURL,
        headers: getConfig(req).headers,
        method: 'get',
        auth: { enableAuthNZ: false }
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.bountyFetch]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.bountyFetch,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: req => {
      const storeOrderId =
        req.query.orderid || req.query.orderId || req.query.storeOrderId;
      const bountyUrl = `${config('bounty').url}${storeOrderId}/status`;

      return {
        url: bountyUrl,
        method: 'get',
        plugin: statsdMiddleware,
        headers: getConfig(req).headers,
        auth: { enableAuthNZ: false }
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.styleGetPdpDataBulk]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 2500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.styleGetPdpDataBulk,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false
    },
    getClientConfig: (req, res, options) => {
      //Style service uses ab test headers also
      const ab = req.myx._mxab_;
      const headers = isEmpty(ab)
        ? {}
        : { 'x-myntra-abtest': JSON.stringify(req.myx._mxab_) };

      return {
        client: StyleServiceClient,
        method: 'GetPdpDataBulk',
        data: options.data,
        headers
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.paymentLog]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 2500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.paymentLog,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => {
      const { url, client, version } = config('payments');
      const paymentLogUrl = `${url}transaction/${get(
        options,
        'order.bountyOrder.payments.ppsId'
      )}`;

      return {
        url: paymentLogUrl,
        method: 'get',
        plugin: statsdMiddleware,
        headers: {
          client,
          version,
          'x-mynt-ctx': 'storeid=2297;',
          ...getConfig(req).headers
        },
        auth: { enableAuthNZ: false }
      };
    }
  },
  /****************************************************
   * Change the config according to the AB settings   *
   ****************************************************/
  [CIRCUIT_BREAKER_NAMES.priceDropWishlistItems]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 1500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.priceDropWishlistItems,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: req => {
      const root = config('user').root;
      const payload = {
        filters: [
          {
            name: 'styleBased',
            values: ['priceDrop']
          }
        ]
      };

      return {
        url: `${root}v1/wishlists/default?pageSize=0`,
        payload,
        method: 'post',
        headers: getConfig(req).headers
      };
    }
  },
  [CIRCUIT_BREAKER_NAMES.feedbackSurvey]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 2500,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.feedbackSurvey,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, options) => {
      const feedbackUrl = `${config('feedbackSurvey').url}/create`;
      const storeOrderId =
        get(req, 'query.orderid') ||
        get(req, 'query.orderId') ||
        get(req, 'query.storeOrderId');

      const payload = {
        providerId: get(req, 'myx.profile.uidx'),
        sourceEntityId: storeOrderId,
        idempotentId: storeOrderId,
        surveyType: 'ORDER_CONFIRMATION',
        tenantId: 2297,
        channel: 'APP_PULL'
      };

      return {
        url: feedbackUrl,
        method: 'post',
        payload,
        headers: getConfig(req).headers,
        auth: { enableAuthNZ: false }
      };
    }
  },

  [CIRCUIT_BREAKER_NAMES.aggregatePaymentData]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 5000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.aggregatePaymentData,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForServices
    },
    getRequestConfig: (req, res, payload = {}) => {
      const { url } = config('fetchPayment');
      return {
        url,
        method: 'post',
        payload,
        headers: { pagesource: PAYMENT, ...getConfig(req).headers },
        plugin: statsdMiddleware,
        auth: {
          enableAuthNZ:
            isFeatureEnabled('AUTHNZ', null, req) &&
            (getKVPairValue('AUTHNZ_SERVICES', req) || {}).aggregatePaymentData
        }
      };
    }
  }
};

module.exports = Object.keys(circuitBreakerServicesConfig).reduce(
  (acc, name) => {
    acc[name] = nodeCircuitBreaker.create(circuitBreakerServicesConfig[name]);
    return acc;
  },
  {}
);
