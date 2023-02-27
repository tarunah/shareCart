import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const config = require('../../config');
const handleRequest = ({
  method,
  url,
  data,
  headers = {},
  successCallback,
  errorCallback
}) => {
  RequestManager.handle(
    {
      method,
      url,
      data,
      headers
    },
    successCallback,
    errorCallback
  );
};

const handleRequestWithPromise = ({ method, url, data, headers }) => {
  return RequestManager.handleRequestWithPromise({
    method,
    url,
    data,
    headers
  });
};

const ConfirmationManager = {
  getPageData(storeOrderId) {
    return handleRequestWithPromise({
      method: 'get',
      url: `/checkoutproxy/confirmationData?storeOrderId=${storeOrderId}`,
      data: null
    });
  },

  getInsiderDetails() {
    return handleRequestWithPromise({
      method: 'get',
      url: `${config('insider').clientUrl}/insiderDetails`,
      headers: {
        clientid: 'orderconfirmation'
      }
    });
  },

  getOrderPoints(data) {
    return handleRequestWithPromise({
      method: 'post',
      url: `${config('insider').clientUrl}/fetchPointsForItem`,
      data,
      headers: {
        clientid: 'orderconfirmation'
      }
    });
  },

  getProfile() {
    if (isFeatureEnabled('DIASABLE_SIZE_PROFILE_FETCH')) {
      return new Promise(resolve => {
        resolve();
      });
    }
    const { clientRoot, path } = config('usps');
    return handleRequestWithPromise({
      method: 'get',
      url: `${clientRoot}${path}size-profiles`,
      data: null
    });
  },

  saveProfile(data, successCallback, errorCallback) {
    const { clientRoot, path } = config('usps');
    handleRequest({
      method: 'post',
      url: `${clientRoot}v1/${path}size-profiles`,
      data,
      successCallback,
      errorCallback
    });
  },

  tagProfile(data, successCallback, errorCallback) {
    const { clientRoot, path } = config('usps');
    handleRequest({
      method: 'post',
      url: `${clientRoot}v1/${path}order-profiles`,
      data,
      successCallback,
      errorCallback
    });
  },

  getRecommendations(styleId, successCallback, errorCallback) {
    const url = `${config('recommendations').clientRoot}${
      config('product').path
    }/${styleId}/related`;
    handleRequest({
      method: 'get',
      url,
      data: null,
      successCallback,
      errorCallback
    });
  },

  cancelOrder(orderId, successCallback, errorCallback) {
    handleRequest({
      method: 'put',
      url: `${config('bounty').clientUrl}cancelOrder`,
      data: {
        storeOrderId: orderId,
        declineReasonId: 85
      },
      headers: {
        'Content-Type': 'application/json'
      },
      successCallback,
      errorCallback
    });
  },

  getPastOrders(data, successCallback, errorCallback) {
    /*
    API is paginated and gives data about either:
    1. Recent 5 orders
    2. Recent orders placed within 6 months
    (after 6 months the order is marked as archived and is retrieved using another endpoint)
    The API's body fetches data according to the body's configurations.
    */
    const pastOrdersConfig = config('pastOrders');
    handleRequest({
      method: 'post',
      url: `${pastOrdersConfig.clientUrl}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'x-myntra-client-id': pastOrdersConfig.client
      },
      successCallback,
      errorCallback
    });
  },

  submitRating(data, successCallback, errorCallback) {
    handleRequest({
      method: 'post',
      url: `${config('feedbackSurvey').clientUrl}/save`,
      data,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      successCallback,
      errorCallback
    });
  },

  createScratchCardIfEligible({ featureTag, featureIdentifier = '' }) {
    if (!isFeatureEnabled('SCRATCHCARD_RETENTION')) {
      return new Promise((resolve, reject) => {
        resolve({ isEligible: false, scratchCardId: null });
      });
    }
    return handleRequestWithPromise({
      method: 'post',
      url: `${config('createScratchCardIfEligible').clientUrl}`,
      data: { featureTag, featureIdentifier }
    });
  },
  claimReward(scratchCardId) {
    return handleRequestWithPromise({
      method: 'post',
      url: `${config('claimReward').clientUrl}`,
      data: { scratchCardId }
    });
  }
};

export default ConfirmationManager;
