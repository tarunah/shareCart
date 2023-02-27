import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import { checkoutPage } from 'commonUtils/constants';
import { promiseWrapper } from 'commonBrowserUtils/Helper';

const config = require('../../config');

const addressV1BasePath = config('address').v1path;
const addressV2BasePath = config('address').v2path;

const handleRequest = (method, path, data, successCallback, errorCallback) => {
  const { clientRoot } = config('address');
  RequestManager.handle(
    {
      method,
      url: clientRoot + path,
      data,
      headers: getConfig().headers
    },
    successCallback,
    errorCallback
  );
};

const handleCartRequest = (
  method,
  path,
  data,
  successCallback,
  errorCallback
) => {
  const { clientUrl } = config('cart');
  RequestManager.handle(
    {
      method,
      url: `${clientUrl}default${path}`,
      data,
      headers: {
        pagesource: checkoutPage.ADDRESS,
        ...getConfig().headers
      }
    },
    successCallback,
    errorCallback
  );
};

const getQueryString = ({ cartMerge, cached } = {}) => {
  const queryStrings = [];
  if (cartMerge) {
    queryStrings.push('cm=true');
  }
  if (cached) {
    queryStrings.push('cached=true');
  }
  return queryStrings.join('&');
};

const AddressManager = {
  getAllAddress: (data, successCallback, errorCallback) => {
    handleRequest(
      'get',
      addressV2BasePath,
      data,
      successCallback,
      errorCallback
    );
  },
  getAddressbyUnifiedId: (unifiedAddressId, successCallback, errorCallback) => {
    handleRequest(
      'get',
      `${addressV2BasePath}/unifiedIds/${unifiedAddressId}`,
      null,
      successCallback,
      errorCallback
    );
  },
  getCart: (queryParams, successCallback, errorCallback) => {
    handleCartRequest(
      'get',
      `?${getQueryString(queryParams)}`,
      null,
      successCallback,
      errorCallback
    );
  },
  getServiceability: (pincode, successCallback, errorCallback) => {
    handleCartRequest(
      'get',
      `?serviceability=true&pincode=${pincode}&_t=${new Date().getTime()}`,
      null,
      successCallback,
      errorCallback
    );
  },
  addAddress: (data, successCallback, errorCallback) => {
    handleRequest(
      'post',
      addressV2BasePath,
      data,
      successCallback,
      errorCallback
    );
  },
  editAddress: (data, successCallback, errorCallback) => {
    handleRequest(
      'put',
      `${addressV2BasePath}/unifiedIds/${data.unifiedId}`,
      data,
      successCallback,
      errorCallback
    );
  },
  removeAddress: (id, successCallback, errorCallback) => {
    handleRequest(
      'del',
      `${addressV2BasePath}/unifiedIds/${id}`,
      '',
      successCallback,
      errorCallback
    );
  },
  getLocallity: (pincode, successCallback, errorCallback) => {
    handleRequest(
      'get',
      `${addressV1BasePath}/locality?pincode=${pincode}`,
      '',
      successCallback,
      errorCallback
    );
  },
  getSocialProofing: (pincode, successCallback, errorCallback) => {
    handleRequest(
      'get',
      `v1/aggregate/pincode/${pincode}`,
      '',
      successCallback,
      errorCallback
    );
  },
  applyShippingMethod: (method, successCallback, errorCallback) => {
    handleCartRequest(
      'put',
      `/shipping/${method}/apply`,
      null,
      successCallback,
      errorCallback
    );
  },
  applyTryNBuy: (data, successCallback, errorCallback) => {
    handleCartRequest('put', '/tryNbuy', data, successCallback, errorCallback);
  },
  getAddressSuggestion: (data, successCallback, errorCallback) => {
    handleRequest(
      'post',
      'v1/address-suggestions',
      data,
      successCallback,
      errorCallback
    );
  },
  setOrderAddress: (data, successCallback, errorCallback) => {
    handleCartRequest(
      'put',
      `/address?unifiedAddressId=${data.unifiedAddressId}&addressId=${data.addressId}`,
      null,
      successCallback,
      errorCallback
    );
  }
};

const AddressManagerV2 = promiseWrapper(AddressManager);
export default AddressManager;
export { AddressManagerV2 };
