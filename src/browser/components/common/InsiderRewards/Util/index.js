import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getInsiderData, setInsiderData } from 'commonBrowserUtils/DataStore';
import { getHash } from 'commonBrowserUtils/Helper';

export const getToolTipText = (
  isInsider,
  insiderConfig,
  isSupercoinEnabled
) => {
  const { toolTipTextInsider = '', toolTipTextSuperCoin = '' } = insiderConfig;
  if (isInsider)
    return isSupercoinEnabled ? toolTipTextSuperCoin : toolTipTextInsider;
  return '';
};

export const triggerInViewPort = (orderPointsData, mrp) => {
  const { insiderPoints = 0, tierName } = orderPointsData || {};
  const { tierNames = [] } = getKVPairValue('CART_INSIDER_PROGRESS');
  const tierIndex = tierNames.indexOf(tierName);

  triggerEvent('INSIDER_REWARDS_IN_VIEW_PORT', {
    custom: {
      custom: {
        v1: tierIndex + 1 === tierNames.length ? 'max_tier' : '',
        v2: `${tierName}_`,
        v3: insiderPoints,
        v4: ''
      },
      widget: {
        name: 'cart_supercoins_widget_load',
        type: 'card',
        data_set: {
          data: [
            {
              entity_name: mrp
            }
          ]
        }
      },
      widget_items: {
        name: 'is_insider'
      },
      event_type: 'widgetLoad'
    }
  });
};

export const getInsiderCacheKey = productEntries => {
  const data = JSON.stringify(productEntries);
  return getHash(data);
};

export const getCachedInsiderData = productEntries => {
  const payloadHash = getInsiderCacheKey(productEntries);
  const cachedInsiderData = getInsiderData();
  return get(cachedInsiderData, payloadHash, null);
};

export const cacheInsiderData = (productEntries, data) => {
  const payloadHash = getInsiderCacheKey(productEntries);
  setInsiderData({ [payloadHash]: data });
};
