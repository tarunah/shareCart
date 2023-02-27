import get from 'lodash/get';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { cookieKeys } from 'commonUtils/constants';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import AddressConstants from 'commonBrowserUtils/AddressConstants';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';

import {
  formatDate,
  getCookie,
  setCookie,
  isLoggedIn,
  navigateTo,
  getDateDiff
} from 'commonBrowserUtils/Helper';

const getEstimatedDate = (numberOfDaysToAdd, config) => {
  let todayDate = new Date();
  let epoch = todayDate.setDate(
    todayDate.getDate() + parseInt(numberOfDaysToAdd)
  );
  return formatDate(epoch, config);
};

const getSelectedAddress = addresses => {
  if (!Array.isArray(addresses) || !addresses.length) {
    return {};
  }
  let addressIdFromCookie = getCookie(cookieKeys.ORDER_ADDRESS_ID);
  if (isFeatureEnabled('ADDRESS_ON_CART_V2')) {
    const { pincode, addressId } = UserLocationDetailsUtil.getLocation();
    if (pincode && !addressId) {
      return { id: 0, pincode };
    } else if (addressId) {
      addressIdFromCookie = addressId;
    }
  }
  const selectedAddressId = parseInt(addressIdFromCookie);
  const selectedAddress =
    addresses.find(address => get(address, 'id') === selectedAddressId) ||
    addresses.find(address => get(address, 'isDefault')) ||
    addresses[0];

  return selectedAddress;
};

const redirectToAddress = () => {
  const addressUrl = '/checkout/address';
  const redirectionUrl = isLoggedIn()
    ? addressUrl
    : `/login?referer=${addressUrl}`;
  navigateTo(redirectionUrl);
};

const redirectToAddressSubpage = (subpage = '') => {
  const addressUrl = `/checkout/address/${subpage}`;
  const redirectionUrl = isLoggedIn()
    ? addressUrl
    : `/login?referer=${addressUrl}`;
  navigateTo(redirectionUrl);
};

const setSelectedAddressCookie = ({ addressId, unifiedId }) => {
  setCookie(cookieKeys.ORDER_ADDRESS_ID, addressId, 30 * 60 * 1000);
  setCookie(cookieKeys.ORDER_ADDRESS_UNIFIED_ID, unifiedId, 30 * 60 * 1000);
};

const getChangedShippingEstimate = (
  shippingEstimate,
  shippingMethod,
  pincode
) => {
  let changedShippingEstimate = shippingEstimate;
  const {
    promisedTatChange: promisedShippingEstimateChange = {},
    defaultTatChange: defaultShippingEstimateChange = 0,
    skipPincodeCheck,
    pincodes: expressDeliveryPincodes = {}
  } = getGrowthHackConfigValue('EXPRESS_DELIVERY');

  if (
    isFeatureEnabled('SHOW_SHIPPING_ESTIMATE_CHANGE') &&
    shippingMethod === 'NORMAL' &&
    (skipPincodeCheck || expressDeliveryPincodes[pincode])
  ) {
    if (promisedShippingEstimateChange.hasOwnProperty(shippingEstimate)) {
      changedShippingEstimate +=
        promisedShippingEstimateChange[shippingEstimate];
    } else {
      changedShippingEstimate += defaultShippingEstimateChange;
    }
  }

  return changedShippingEstimate <= 0
    ? shippingEstimate
    : changedShippingEstimate;
};

const getChangedDeliveryPromise = ({ productDeliveryInfo, pincode, type }) => {
  const updatedShippingEstimates = productDeliveryInfo.map(info => {
    const estimate = get(info, 'shippingEstimates', []).find(
      entry => entry.shippingMethod === type
    );
    const currentDate = new Date();
    const estimateInDays = getDateDiff(
      currentDate,
      get(estimate, 'promiseDate')
    );
    return getChangedShippingEstimate(estimateInDays, type, pincode) || 0;
  });

  const minDays = updatedShippingEstimates.reduce(
    (previousValue, currentValue) =>
      previousValue < currentValue ? previousValue : currentValue,
    Number.POSITIVE_INFINITY
  );

  const maxDays = updatedShippingEstimates.reduce(
    (previousValue, currentValue) =>
      previousValue > currentValue ? previousValue : currentValue,
    Number.NEGATIVE_INFINITY
  );

  return { minDays, maxDays };
};

const getNotServiceableMessage = ({
  type,
  isAllEssentialItemsServiceable,
  pincode
}) => {
  const redZonePincodeList = getKVPairValue('RED_ZONE_LIST');
  const isRedZone = redZonePincodeList.find(
    redZonePincode => redZonePincode === parseInt(pincode)
  )
    ? true
    : false;
  const notServiceableMessages = getKVPairValue('NOT_SERVICEABLE_MESSAGE');
  const notServiceableDefaultMessage = get(
    notServiceableMessages,
    `${type}.default`
  );
  const notServiceableRedZoneMessage = get(
    notServiceableMessages,
    `${type}.redZone`
  );
  return isFeatureEnabled('RED_ZONE') &&
    isRedZone &&
    isAllEssentialItemsServiceable
    ? notServiceableRedZoneMessage
    : notServiceableDefaultMessage;
};

const getProductDeliveryInfo = products =>
  products.map((obj = {}) => ({
    id: get(obj, 'skuId'),
    styleId: get(obj, 'id'),
    image: get(obj, 'images.[0]') || {},
    tryNBuyInfo: {
      enabled: get(obj, 'productServiceabilityInfo.tryNBuyAvailable'),
      opted: get(obj, 'tryAndBuyOpted')
    },
    isEssential: obj.hazmat || obj.fragile,
    serviceable: get(obj, 'productServiceabilityInfo.pincodeInfo.serviceable'),
    shippingEstimatesInDays:
      get(
        obj,
        'productServiceabilityInfo.pincodeInfo.shippingEstimatesInDays'
      ) || {},
    shippingEstimates:
      get(obj, 'productServiceabilityInfo.pincodeInfo.shippingEstimates') || []
  }));

//Function to set cookie value for landmark nudge
const setLandmarkCookie = index => {
  let value = getCookie(cookieKeys.LANDMARK_NUDGE);

  if (typeof value === 'undefined') {
    setCookie(
      cookieKeys.LANDMARK_NUDGE,
      '5,5',
      AddressConstants.LANDMARK_NUDGE_EXPIRY
    );
  } else {
    value = value.split(',');
    if (value[index] > 0) {
      value[index] -= 1;
      value = value.join();
      setCookie(
        cookieKeys.LANDMARK_NUDGE,
        value,
        AddressConstants.LANDMARK_NUDGE_EXPIRY
      );
    }
  }
};

//Function to determine whether or not to show landmark nudge
const showLandmarkNudge = index => {
  let value = getCookie(cookieKeys.LANDMARK_NUDGE);

  if (typeof value === 'undefined') {
    return true;
  } else {
    value = value.split(',');
    if (value[index] > 0) {
      return true;
    } else {
      return false;
    }
  }
};

export {
  getEstimatedDate,
  getSelectedAddress,
  redirectToAddress,
  redirectToAddressSubpage,
  setSelectedAddressCookie,
  getChangedShippingEstimate,
  getChangedDeliveryPromise,
  getNotServiceableMessage,
  getProductDeliveryInfo,
  showLandmarkNudge,
  setLandmarkCookie
};
