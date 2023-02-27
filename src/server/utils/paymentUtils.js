const get = require('lodash/get');
const mcookies = require('@myntra/myx/lib/server/cookies');
const {
  isFeatureEnabled,
  isVariantEnabled
} = require('../../utils/FeaturesManager');

const { cookieKeys } = require('../../utils/constants');
const { isGiftcardContext, getQueryParam } = require('../../utils/helper');
const {
  giftcardFetch,
  aggregatePaymentData
} = require('../circuitBreakers/services');

const getGiftCardBalance = req => {
  const lazyLoad = isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD', null, req);
  if (isFeatureEnabled('AUTOGC_ENABLED', null, req) && !lazyLoad) {
    return new Promise((resolve, reject) => {
      giftcardFetch
        .fire(req)
        .then(data => resolve(data))
        .catch(error => {
          if (error.status === 'UPDATE_TOKENS') {
            reject({ error, service: 'giftcardFetch' });
          } else {
            Logger.logError(
              req,
              'Unable to fetch giftcard balance',
              logContext,
              error
            );
            resolve();
          }
        });
    });
  } else {
    return Promise.resolve();
  }
};

// Fetches cart, address, giftcard, loyalty data required for the payment page.
const getPaymentData = async function(
  req,
  res,
  successCallback,
  errorCallback
) {
  // Retry Mode handler
  if (get(req, 'query.mode') === 'retry') {
    const gcBalance = await getGiftCardBalance(req);
    successCallback({
      gcBalance,
      httpStatus: 200
    });
    return;
  }

  const cartUnselected = 'false';
  const lpLazyLoad = isFeatureEnabled('LP_BALANCE_LAZYLOAD', null, req);
  const fetchLP = isFeatureEnabled('LP_ENABLED', null, req) && !lpLazyLoad;
  const gcLazyLoad = isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD', null, req);
  const fetchGC = isFeatureEnabled('AUTOGC_ENABLED', null, req) && !gcLazyLoad;
  const isAddressRequired =
    isVariantEnabled('AOC_V2_VARIANT3', req) ||
    isFeatureEnabled('ORDER_REVIEW', null, req);
  const cartContext = getQueryParam({ req, name: 'cartContext' }) || 'default';
  const giftCardContext = isGiftcardContext({ req });
  const cookies = mcookies(req, res);
  const addressIdFromCookie = giftCardContext
    ? cookies.get(cookieKeys.GIFT_ORDER_ADDRESS_ID)
    : cookies.get(cookieKeys.ORDER_ADDRESS_ID);

  aggregatePaymentData
    .fire(req, res, {
      fetchLP,
      fetchGC,
      fetchAddress: isAddressRequired,
      cartContext,
      addressID: addressIdFromCookie,
      cartUnselected
    })
    .then(data => {
      const { cartData, lpBalance, addressData, gcBalance } = data;
      let addressId = get(cartData, 'orderAddressId', null);

      if (giftCardContext) {
        addressId = addressIdFromCookie;
      }

      if (addressId) {
        successCallback({
          cartData,
          gcBalance,
          lpBalance,
          addressData: isAddressRequired ? addressData : {},
          httpStatus: 200
        });
      } else if (giftCardContext) {
        successCallback({
          httpStatus: 302,
          message: 'Verify your giftcard details to continue...',
          redirectUrl: isFeatureEnabled('GIFTCARD_V2', null, req)
            ? '/giftcard/buy'
            : '/giftcard/preview'
        });
      } else if (!get(cartData, 'count', 0) && !giftCardContext) {
        successCallback({
          httpStatus: 302,
          message: 'Bag is empty or invalid. Redirecting back...',
          redirectUrl: '/checkout/cart'
        });
      } else {
        successCallback({
          httpStatus: 302,
          message: 'Please reselect the address to continue...',
          redirectUrl: '/checkout/address'
        });
      }
    })
    .catch(e => {
      errorCallback({
        httpStatus: get(e, 'error.errorLog.status', 500),
        status: get(e, 'status', 'ERROR'),
        message: 'Unable to fetch payment data',
        errorLog: get(e, 'error.errorLog'),
        error: e
      });
    });
};

module.exports = {
  getPaymentData
};
