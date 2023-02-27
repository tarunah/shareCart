const get = require('lodash/get');

const mcookies = require('@myntra/myx/lib/server/cookies');
const { getUidxFromAt } = require('./helpers');
const isFeatureEnabled = require('../../utils/FeaturesManager')
  .isFeatureEnabled;
const getGrowthHackConfigValue = require('../../utils/GrowthHackConfigManager')
  .getGrowthHackConfigValue;
const UserLocationDetailsUtil = require('../../utils/UserLocationDetailsUtil');
const {
  checkoutPage: { CART },
  cookieKeys
} = require('../../utils/constants');
const Logger = require('../utils/logger');
const {
  cartFetch,
  addressAll,
  addressById,
  priceDropWishlistItems
} = require('../circuitBreakers/services');

const logContext = {
  context: 'cartUtils'
};

// Return error in a particular format.
const errorFormat = (error, service) => ({
  error,
  service
});

// Fetches and returns cart response.
const callCartService = ({ pincode, req, res }) => {
  return new Promise((resolve, reject) => {
    cartFetch
      .fire(req, res, {
        pincode,
        applyGC: true,
        pagesource: CART,
        unselected: true
      })
      .then(data => resolve(data))
      .catch(error => reject(errorFormat(error, 'cartFetch')));
  });
};

const getAllAddress = req => {
  return new Promise((resolve, reject) => {
    addressAll
      .fire(req)
      .then(data => resolve(data))
      .catch(error => {
        if (error.status === 'UPDATE_TOKENS') {
          reject(errorFormat(error, 'addressAll'));
        } else {
          Logger.logError(req, `Unable to fetch addresses`, logContext, error);
          resolve({});
        }
      });
  });
};

const getPriceDroppedItems = req => {
  return new Promise((resolve, reject) => {
    priceDropWishlistItems
      .fire(req)
      .then(data => {
        const styles = get(data, 'styles', []);
        /*******************************************************
         * Adding this total count for firing events in the UI  *
         ********************************************************/
        data.totalCount = styles.length;
        data.styles = styles.slice(
          0,
          getGrowthHackConfigValue('CART_WISHLIST_LIMIT')
        );
        resolve(data);
      })
      .catch(error => {
        if (error.status === 'UPDATE_TOKENS') {
          reject(errorFormat(error, 'getPriceDroppedItems'));
        } else {
          resolve({});
        }
      });
  });
};

const getAddressById = ({ req, res, addressId }) => {
  return new Promise((resolve, reject) => {
    addressById
      .fire(req, res, { addressId })
      .then(data => resolve(data))
      .catch(error => {
        if (
          error.status === 'UPDATE_TOKENS' ||
          (get(error, 'errorLog.status') === 401 &&
            error.status !== 'AUTHNZ_FAIL')
        ) {
          const cookies = mcookies(req, res);
          cookies.del('oai');
          cookies.del('oaui');
          cookies.del('goai');
          cookies.del('mynt-ulc');
          cookies.del('mynt-ulc-api');
          reject(errorFormat(error, 'addressById'));
        } else {
          Logger.logError(
            req,
            `Unable to fetch address by id ${addressId}`,
            logContext,
            error
          );
          resolve({});
        }
      });
  });
};

const getCartData = async function(req, res, successCallback, errorCallback) {
  let addressInfo = {};
  let cartData = {};
  let wishlistData = {};
  let pincode = '';
  const promises = [];
  let addressId = null;

  try {
    if (isFeatureEnabled('ADDRESS_ON_CART_V2', null, req)) {
      const cookies = mcookies(req, res);
      const isLoggedIn = !!getUidxFromAt(get(req, 'myx.tokens.at'));
      const userLocationDetail = UserLocationDetailsUtil.getLocation(
        cookies,
        req
      );

      pincode = userLocationDetail.pincode;
      addressId = userLocationDetail.addressId;

      if (!pincode && isLoggedIn) {
        const allAddresses = await getAllAddress(req);
        addressArray = get(allAddresses, 'addresses') || [];
        addressInfo =
          addressArray.find(obj => obj.isDefault) || addressArray[0] || {};

        pincode = addressInfo.pincode || '';
      }

      if (pincode) {
        promises.push(callCartService({ pincode, req, res }));

        if (addressId && isLoggedIn && !addressInfo.id) {
          promises.push(getAddressById({ req, res, addressId }));
        }
      } else {
        cartData = promises.push(callCartService({ req, res }));
      }
    } else {
      cartData = promises.push(callCartService({ req, res }));
    }

    let wishlistDataIndex = -1;
    if (isFeatureEnabled('CART_WISHLIST', null, req)) {
      promises.push(getPriceDroppedItems(req));
      wishlistDataIndex = promises.length - 1;
    }

    const response = await Promise.all(promises);
    cartData = response[0];
    addressInfo = addressId && response[1] ? response[1] : addressInfo;
    wishlistData = response[wishlistDataIndex]
      ? response[wishlistDataIndex]
      : wishlistData;

    successCallback({
      cartData,
      addressInfo,
      pincode,
      wishlistData,
      httpStatus: 200
    });
  } catch (e) {
    errorCallback({
      httpStatus: get(e, 'error.errorLog.status', 500),
      status: get(e, 'error.status', 'ERROR'),
      message: 'Unable to fetch cart data',
      errorLog: get(e, 'error.errorLog'),
      error: e
    });
  }
};

module.exports = {
  getCartData
};
