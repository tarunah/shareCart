import RequestManager from 'commonUtils/RequestManager';
import { cookieKeys, checkoutPage } from 'commonUtils/constants';
import { getConfig } from 'commonUtils/requestConfig';
import { getCookie, getUidx, getXMetaApp } from 'commonBrowserUtils/Helper';
import { getCartContext } from 'commonBrowserUtils/CartHelper';
import get from 'lodash/get';
import ConfirmationManager from './ConfirmationManager';

const config = require('../../config');

const handleRequest = (
  method,
  path,
  data,
  successCallback,
  errorCallback,
  header = {}
) => {
  const { clientUrl } = config('cart');
  RequestManager.handle(
    {
      method,
      url: `${clientUrl}${getCartContext()}${path}`,
      data,
      headers: {
        pagesource: checkoutPage.CART,
        ...getConfig().headers,
        ...header,
        'x-meta-app': `channel=web;${getXMetaApp()}`
      }
    },
    successCallback,
    errorCallback
  );
};

const getQueryString = queryObject => {
  const queryStringObject = queryObject || {};
  queryStringObject.unselected = true;
  const queryStrings = [];
  for (const key in queryStringObject) {
    switch (key) {
      case 'cartMerge':
        queryStrings.push('cm=true');
        break;
      default:
        queryStrings.push(`${key}=${queryStringObject[key]}`);
    }
  }
  return queryStrings.join('&');
};

const CartManager = (function() {
  return {
    getPageData: (queryParams, successCallback, errorCallback) => {
      RequestManager.handle(
        {
          method: 'get',
          url: `/checkoutproxy/cartData?${getQueryString(queryParams)}`,
          headers: getConfig().headers,
          data: null
        },
        successCallback,
        errorCallback
      );
    },
    get: (queryParams, successCallback, errorCallback) => {
      handleRequest(
        'get',
        `?${getQueryString(queryParams)}`,
        null,
        successCallback,
        errorCallback
      );
    },
    getCartServiceability: (pincode, successCallback, errorCallback) => {
      const queryParams = {
        pincode,
        serviceability: true
      };
      handleRequest(
        'get',
        `?${getQueryString(queryParams)}`,
        null,
        successCallback,
        errorCallback
      );
    },
    updateItems: (data, successCallback, errorCallback) => {
      /* Sample data:
        [{"id": 2610499,
          "quantity":1,
          "skuId" : 16117974,
          "sellerPartnerId": 20}] */
      handleRequest(
        'put',
        '/edit?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    applyAndGetCoupons: (
      data = [],
      successCallback,
      errorCallback,
      headers
    ) => {
      handleRequest(
        'put',
        `/coupon/edit?${getQueryString({
          sendApplicableCoupons: true
        })}`,
        data,
        successCallback,
        errorCallback,
        headers
      );
    },
    applyAllCoupons: (data, successCallback, errorCallback, headers) => {
      handleRequest(
        'put',
        '/coupon/edit?unselected=true',
        data,
        successCallback,
        errorCallback,
        headers
      );
    },
    applyGiftwrap: (data, successCallback, errorCallback) => {
      /* Sample data:
        {
          "sender": {
            "name": "test"
          },
          "message":"Happy Birthday!!",
          "recipient": {
            "name": "test1",
            "email":"test1@gmail.com"
          }
      } */
      handleRequest(
        'put',
        '/giftwrap/apply?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    removeGiftwrap: (data, successCallback, errorCallback) => {
      /* Sample data:
        Empty body */
      handleRequest(
        'put',
        '/giftwrap/remove?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    removeItems: (data, successCallback, errorCallback) => {
      /* Sample data:
        [{
          "itemId" : 1520926564
        }] */
      handleRequest(
        'put',
        '/remove?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    applyTryNBuy: (data, successCallback, errorCallback) => {
      handleRequest('put', '/tryNbuy', data, successCallback, errorCallback);
    },
    moveToWishlist: (data, successCallback, errorCallback) => {
      /* Sample data:
      {
        "itemId": 1521022205,
        "skuId": 13505456,
        "id": 1834155
      } */
      handleRequest(
        'post',
        '/moveToWishlist?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    bulkMoveToWishlist: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/bulkMoveToWishlist?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    resolveConflict: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/resolveConflict',
        data,
        successCallback,
        errorCallback
      );
    },
    coverFeeApply: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/coverfee/apply?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    coverFeeRemove: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/coverfee/remove?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    getCartFillerdata: (data, successCallback, errorCallback) => {
      const { clientRoot } = config('cart');
      const article = get(data, 'currentArticle') || 'All';
      const version = get(data, 'version');
      const maxCount = get(data, 'maxCount');
      const urlPath =
        version === 'v1'
          ? 'v1/cart/cartFiller'
          : `v2/cart/cartFiller?maxCount=${maxCount}&articleType=${article}`;
      RequestManager.handle(
        {
          method: 'post',
          url: `${clientRoot}${urlPath}`,
          data,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    getSimilarProductsData: (productId, successCallback, errorCallback) => {
      const { clientRoot } = config('cart');
      const urlPath = `v2/product/${productId}/related`;
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientRoot}${urlPath}`,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    addItems: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/add?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    getPriceDroppedItems: (successCallback, errorCallback) => {
      const { clientRoot } = config('user');
      const data = {
        filters: [
          {
            name: 'styleBased',
            values: ['priceDrop']
          }
        ]
      };
      RequestManager.handle(
        {
          method: 'post',
          data,
          url: `${clientRoot}v1/wishlists/default?pageSize=0`,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    getPriceDroppedItemsCount: (successCallback, errorCallback) => {
      const { clientRoot } = config('user');
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientRoot}v1/wishlists/default/pricedrop?pageSize=100`
        },
        successCallback,
        errorCallback
      );
    },
    addToCartWishlistItem: (data, successCallback, errorCallback) => {
      const { clientRoot } = config('user');
      RequestManager.handle(
        {
          method: 'post',
          data,
          url: `${clientRoot}v1/user/wishlist/movetocart`,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    getLgp: (successCallback, errorCallback) => {
      const { clientUrl } = config('lgp');
      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}stream/empty_cart`,
          headers: getConfig().headers
        },
        successCallback,
        errorCallback
      );
    },
    notifyMe: (products, successCallback, errorCallback) => {
      /*
      Sample data for notify me service:
      {
        "source" : "cart",
        "styles" :
          [
            {
                "styleId": 345672134,
                "skuId": 686782634
            },
            {
                "styleId": 1235,
                "skuId": 8561
            }
          ]
      } */
      const { clientUrl } = config('notifyMe');
      const data = {
        source: 'cart',
        styles: products
      };
      // notifyMe requires x-myntra-app, not xma (being added as default)
      const notifyMeHeaders = {
        ...getConfig().headers,
        'x-myntra-app': getCookie(cookieKeys.X_MYNTRA_APP) || ''
      };
      RequestManager.handle(
        {
          method: 'post',
          url: clientUrl,
          data,
          headers: notifyMeHeaders
        },
        successCallback,
        errorCallback
      );
    },
    applyDonation: (data, successCallback, errorCallback) => {
      handleRequest(
        'put',
        '/donation/apply?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    removeDonation: (data, successCallback, errorCallback) => {
      handleRequest(
        'put',
        '/donation/remove?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    },
    editEmail: (data, successCallback, errorCallback) => {
      const { clientRoot, v2path } = config('profile');
      const url = clientRoot + v2path;
      RequestManager.handle(
        {
          url,
          method: 'put',
          data
        },
        successCallback,
        errorCallback
      );
    },
    getPointsForItems: (data, successCallback, errorCallback) => {
      const uidx = getUidx();

      const { clientUrl } = config('insider');

      const url = `${clientUrl}/fetchPointsForItem`;

      const insiderPointsHeaders = {
        uidx,
        ...getConfig().headers
      };

      RequestManager.handle(
        {
          method: 'post',
          url,
          data,
          headers: insiderPointsHeaders
        },
        successCallback,
        errorCallback
      );
    },
    getInsiderDetails: (successCallback, errorCallback) => {
      const { clientUrl } = config('insider');
      const headers = {
        clientid: 'checkout',
        ...getConfig().headers
      };

      RequestManager.handle(
        {
          method: 'get',
          url: `${clientUrl}/insiderDetails`,
          headers
        },
        successCallback,
        errorCallback
      );
    },
    cancelExchange: (data, successCallback, errorCallback) => {
      handleRequest(
        'post',
        '/exchange/remove',
        data,
        successCallback,
        errorCallback
      );
    },
    getPastOrders: ConfirmationManager.getPastOrders,
    getStyleViolation: (data, successCallback, errorCallback) => {
      handleRequest(
        'get',
        '/violations?unselected=true',
        data,
        successCallback,
        errorCallback
      );
    }
  };
})();

export default CartManager;
