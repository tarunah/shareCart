const NodeCircuitBreaker = require('node-circuitbreaker');
const nodeCircuitBreaker = require('./nodeCircuitBreaker');

const { getCartData } = require('../utils/cartUtils');
const { getPaymentData } = require('../utils/paymentUtils');
const { getConfirmationData } = require('../utils/confirmationUtils');
const { CIRCUIT_BREAKER_NAMES } = require('./constants');

const errorFilterForPages = error => {
  return (
    !NodeCircuitBreaker.isOurError(error) &&
    (!error.httpStatus ||
      error.httpStatus === 401 ||
      error.httpStatus === 403 ||
      error.status === 'UPDATE_TOKENS')
  );
};

const circuitBreakerPagesConfig = {
  [CIRCUIT_BREAKER_NAMES.cartPage]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 10000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.cartPage,
      resetTimeout: 2000,
      volumeThreshold: 2,
      cache: false,
      errorFilter: errorFilterForPages
    },
    getPageData: getCartData
  },
  [CIRCUIT_BREAKER_NAMES.confirmationPage]: {
    breakerConfig: {
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      timeout: 15000,
      errorThresholdPercentage: 20,
      allowWarmUp: true,
      name: CIRCUIT_BREAKER_NAMES.confirmationPage,
      resetTimeout: 2000,
      volumeThreshold: 1,
      cache: false,
      errorFilter: errorFilterForPages
    },
    getPageData: getConfirmationData
  }
};

module.exports = Object.keys(circuitBreakerPagesConfig).reduce((acc, name) => {
  acc[name] = nodeCircuitBreaker.create(circuitBreakerPagesConfig[name]);
  return acc;
}, {});
