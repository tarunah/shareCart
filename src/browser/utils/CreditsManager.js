import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import { getCartContext } from 'commonBrowserUtils/CartHelper';
import get from 'lodash/get';
import { getURLWithQueryParams } from 'commonUtils/helper';

const config = require('../../config');

const handleRequest = (method, path, data, successCallback, errorCallback) => {
  const { clientUrl } = config('cart');
  //For express checkout
  const pagesource = get(data, 'pagesource', 'cart');
  const payload = get(data, 'data', null);
  const headers = { ...getConfig().headers, pagesource };
  RequestManager.handle(
    {
      method,
      url: `${clientUrl}${getCartContext()}${path}`,
      data: payload,
      headers
    },
    successCallback,
    errorCallback
  );
};

const CreditsManager = (function() {
  return {
    applyGiftCard: (data, successCallback, errorCallback) => {
      const unselected = get(data, 'pagesource') === 'cart';
      handleRequest(
        'put',
        `/giftcard/apply?unselected=${unselected}`,
        data,
        successCallback,
        errorCallback
      );
    },
    removeGiftCard: (data, successCallback, errorCallback) => {
      const unselected = get(data, 'pagesource') === 'cart';
      handleRequest(
        'put',
        `/giftcard/remove?unselected=${unselected}`,
        data,
        successCallback,
        errorCallback
      );
    },
    applyLoyaltyPoints: (data, successCallback, errorCallback) => {
      const unselected = get(data, 'pagesource') === 'cart';
      handleRequest(
        'put',
        `/loyaltypoints/apply?unselected=${unselected}`,
        data,
        successCallback,
        errorCallback
      );
    },
    removeLoyaltyPoints: (data, successCallback, errorCallback) => {
      const unselected = get(data, 'pagesource') === 'cart';
      handleRequest(
        'put',
        `/loyaltypoints/remove?unselected=${unselected}`,
        data,
        successCallback,
        errorCallback
      );
    },
    redeemSuperCoins: (data, successCallback, errorCallback) => {
      const { clientUrl } = config('supercoinsCreditBalance');
      const payload = get(data, 'data', null);
      RequestManager.handle(
        {
          method: 'post',
          url: `${clientUrl}/redeemCoins`,
          data: payload,
          headers: {
            clientid: 'cart'
          }
        },
        successCallback,
        errorCallback
      );
    },
    getGiftCardBalance(data, successCallback, errorCallback) {
      const { clientUrl } = config('profile');
      const payload = get(data, 'data', null);

      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}/getMyntraCreditBalance`,
          data: payload,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    getLoyaltyPointsBalance(data, successCallback, errorCallback) {
      const { clientUrl } = config('user');
      const payload = get(data, 'data', null);

      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}loyaltypoints/balance`,
          data: payload
        },
        successCallback,
        errorCallback
      );
    },
    getSupercoinsBalance(data, successCallback, errorCallback) {
      const { clientUrl } = config('supercoinsCreditBalance');
      RequestManager.handle(
        {
          method: 'get',
          url: getURLWithQueryParams(`${clientUrl}/redeemableCoins`, data),
          headers: {
            clientid: 'cart'
          }
        },
        successCallback,
        errorCallback
      );
    }
  };
})();

export default CreditsManager;
