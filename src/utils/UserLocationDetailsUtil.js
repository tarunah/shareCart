const get = require('lodash/get');
const cookieKeys = require('./constants').cookieKeys;
const { getKVPairValue } = require('./KVPairManager');
const { isFeatureEnabled } = require('./FeaturesManager');
const {
  isBrowser,
  isMyntAppEnabled,
  isWebkitEnabled,
  setCookie,
  getCookie,
  isRequestFromWeb
} = require('./helper');

const UserLocationDetailsUtil = (() => {
  const setLocation = (data, cookies, req) => {
    if (data) {
      // Handling android update
      if (isMyntAppEnabled(['updateUserSessionDetails'])) {
        MyntApp.updateUserSessionDetails(JSON.stringify(data));
      }
      // Handling ios update
      if (isWebkitEnabled(['updateUserSessionDetails'])) {
        webkit.messageHandlers.updateUserSessionDetails.postMessage(
          JSON.stringify(data)
        );
      }

      let cookieToSet = `pincode:${data.pincode}`;
      if (data.addressId) {
        cookieToSet += `|addressId:${data.addressId}`;
      }
      const ulc_api_data = encodeURIComponent(`pincode:${data.pincode}`);
      const loc_src_data = encodeURIComponent(
        `expiry:${
          getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
        }|source:USER`
      );

      if (isBrowser) {
        setCookie(
          cookieKeys.USER_LOCATION_CONTEXT,
          cookieToSet,
          getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
        );
        setCookie(
          cookieKeys.USER_LOCATION_CONTEXT_API,
          ulc_api_data,
          getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
        );
        setCookie(
          cookieKeys.LOCATION_SOURCE,
          loc_src_data,
          getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
        );
        data.addressId &&
          setCookie(
            cookieKeys.ORDER_ADDRESS_ID,
            `${data.addressId}`,
            getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
          );
        data.unifiedId &&
          setCookie(
            cookieKeys.ORDER_ADDRESS_UNIFIED_ID,
            data.unifiedId,
            getKVPairValue('USER_LOCATION_CONTEXT_CONFIG').expiry
          );
      } else {
        const { expiry } =
          getKVPairValue('USER_LOCATION_CONTEXT_CONFIG', req) || 0;
        cookies.set(cookieKeys.USER_LOCATION_CONTEXT, cookieToSet, {
          expires: new Date(new Date().getTime() + expiry),
          httpOnly: false
        });
        cookies.set(cookieKeys.USER_LOCATION_CONTEXT_API, ulc_api_data, {
          expires: new Date(new Date().getTime() + expiry),
          httpOnly: false
        });
        cookies.set(cookieKeys.LOCATION_SOURCE, loc_src_data, {
          expires: new Date(new Date().getTime() + expiry),
          httpOnly: false
        });
      }
    }
  };

  const getLocation = (cookies, req) => {
    let cookieData = '';

    if (isBrowser) {
      cookieData = getCookie(cookieKeys.USER_LOCATION_CONTEXT);
    } else {
      if (
        !isRequestFromWeb(req) &&
        isFeatureEnabled('SPA_ENABLED', { cookies }, req)
      ) {
        cookieData =
          get(req, 'headers.x-location-context') ||
          cookies.get(cookieKeys.USER_LOCATION_CONTEXT);
      } else {
        cookieData =
          cookies.get(cookieKeys.USER_LOCATION_CONTEXT) ||
          get(req, 'headers.x-location-context');
      }
    }

    const [pincodeCookie, addressIdCookie] = cookieData
      ? cookieData.split('|')
      : [];
    const pincode = pincodeCookie ? pincodeCookie.split(':')[1] : '';
    let addressId = addressIdCookie ? addressIdCookie.split(':')[1] : '';
    if (addressId) {
      addressId = Number(addressId);
    } else {
      addressId = 0;
    }
    return { pincode, addressId };
  };

  return { getLocation, setLocation };
})();

module.exports = UserLocationDetailsUtil;
