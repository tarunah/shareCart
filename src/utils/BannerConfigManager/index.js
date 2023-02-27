/*
Usage Example:
import { getBannerConfigValue } from 'commonUtils/BannerConfigManager';
const promoOfferConfig = getBannerConfigValue('PROMOTIONAL_OFFER');
*/

const isBrowser = typeof window !== 'undefined';
const get = require('lodash/get');

const sanitizeValue = (value, defaultValue, expectedType) => {
  if (
    typeof expectedType === 'undefined' ||
    typeof value === typeof expectedType
  ) {
    return value;
  } else if (typeof defaultValue === typeof expectedType) {
    return defaultValue;
  } else {
    try {
      const parsedValue = JSON.parse(defaultValue);
      return typeof parsedValue === typeof expectedType
        ? parsedValue
        : undefined;
    } catch (err) {}
  }
  return undefined;
};

const getBannerConfigValue = (key, req) => {
  let value = null;
  let configList = isBrowser
    ? get(window, '_checkout_.__myx_bannerconfig__', null)
    : get(req, 'myx.bannerconfig', null);

  const config = BannerConfigMap[key];
  if (config) {
    value = get(configList, `${config.key}`, config.defaultValue);
  }

  if (value && typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch (err) {}
  }
  value = config
    ? sanitizeValue(value, config.defaultValue, config.expectedType)
    : value;
  return value;
};

const getBannerConfigObject = (key, defaultValue, expectedType) => ({
  key,
  defaultValue,
  expectedType
});

const BannerConfigMap = {
  PROMOTIONAL_OFFER: getBannerConfigObject(
    'checkout.confirmation.promotionoffer',
    {
      enabled: false,
      offers: [{ image: '', url: '', disabledForDesktop: false }],
      slideInterval: 2000
    },
    {}
  )
};

module.exports = {
  BannerConfigMap,
  getBannerConfigValue
};
