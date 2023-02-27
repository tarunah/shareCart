/*
 * Common Util functions for server and client.
 */

const get = require('lodash/get');

const { cookieKeys } = require('../constants');

const isBrowser = typeof window !== 'undefined';

/* Extracts all GET params */
const extractQueryParams = req => {
  if (!isBrowser) {
    return get(req, 'query', {});
  } else {
    let params = {};
    let qstr = get(window, 'location.search');
    if (!qstr) {
      return {};
    }

    let parts;
    qstr = qstr.replace(/^\?/, '');
    qstr.split('&').forEach(val => {
      parts = val.split('=');
      params[parts[0]] = parts[1];
    });
    return params;
  }
};

/* Extracts value for `name` GET param. If `name` is not found,
   returns value for first key present in `optionalNames`  */
const getQueryParam = ({ req = null, name = '', optionalNames = [] }) => {
  const params = extractQueryParams(req);
  let queryParam = params[name];

  if (!queryParam && optionalNames.length > 0) {
    queryParam = optionalNames.reduce((acc, optionalName) => {
      return acc ? acc : params[optionalName];
    }, null);
  }
  return queryParam || '';
};

/* Checks for gift card context */
const isGiftcardContext = ({ req = {}, cartContext = '' } = {}) => {
  const context =
    cartContext || getQueryParam({ req, name: 'cartContext' }) || 'default';
  return context.toLowerCase() === 'egiftcard';
};

const isMyntAppEnabled = keys => {
  return (
    typeof MyntApp !== 'undefined' &&
    keys.reduce((acc, key) => acc && typeof MyntApp[key] === 'function', true)
  );
};

const isWebkitEnabled = keys => {
  return (
    typeof webkit !== 'undefined' &&
    webkit.messageHandlers &&
    keys.reduce(
      (acc, key) =>
        acc &&
        webkit.messageHandlers[key] &&
        typeof webkit.messageHandlers[key].postMessage === 'function',
      true
    )
  );
};

const setCookie = (name, value, expiry, extraConfig = {}) => {
  const prefix = get(window, '_checkout_.__myx_env__.cookie.prefix', '');
  const date = new Date();
  let defaultConfig = {
    path: '/',
    domain: '.myntra.com'
  };
  let expiryDate;
  if (typeof expiry !== 'undefined') {
    date.setTime(date.getTime() + expiry);
    expiryDate = date.toUTCString();
  }
  expiryDate && (defaultConfig = { ...defaultConfig, expires: expiryDate });
  const config = { ...defaultConfig, ...extraConfig };
  let cookieString = prefix + name + '=' + value + ';';
  Object.keys(config).forEach(key => {
    cookieString += key + '=' + config[key] + ';';
  });
  document.cookie = cookieString;
};

const getCookie = (name, appendPrefix = true) => {
  const cookiePrefix = get(window._checkout_, '__myx_env__.cookie.prefix', '');
  const cookieName = appendPrefix ? cookiePrefix + name : name;
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(
    cookie => cookie.split('=')[0].trim() === cookieName
  );
  return (
    cookie && decodeURIComponent(cookie.substring(cookie.indexOf('=') + 1))
  );
};

const getAppVersionFromXMA = cookies => {
  const xmaCookie =
    (cookies && cookies.get
      ? cookies.get(cookieKeys.X_MYNTRA_APP)
      : getCookie(cookieKeys.X_MYNTRA_APP)) || '';

  const regexResult = /appVersion=[\d.]+/.exec(xmaCookie);
  const appVersionString = Array.isArray(regexResult) ? regexResult[0] : null;

  return appVersionString ? appVersionString.split('=')[1] : '';
};

const argsToKey = function(...args) {
  let hash = '',
    i = args.length,
    currentArg = null;

  while (i--) {
    currentArg = args[i];
    hash +=
      currentArg === Object(currentArg)
        ? JSON.stringify(currentArg)
        : currentArg;
  }

  return hash;
};

/*
 *  Can be used to cache values other than undefined and null
 *  based on arguments passed to the function (Memoizaiton).
 *  Takes the function name when the function takes no arguments.
 */
const cacheDecorator = function(getResult) {
  const cache = {};
  return (...argsForGetResult) => {
    const cacheKey = argsForGetResult.length
      ? argsToKey(...argsForGetResult)
      : getResult.name; //accepts only string
    if (cache.hasOwnProperty(cacheKey)) {
      return cache[cacheKey];
    }

    const result = getResult(...argsForGetResult);
    //cache proper values only
    if (result !== null && result !== undefined) {
      cache[cacheKey] = result;
    }

    return result;
  };
};

const isValidUrl = urlString => {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'https:';
};

const isRequestFromWeb = req => {
  const regEx = new RegExp(/(channel=web)/gi);
  return regEx.test(get(req, 'headers.x-meta-app'));
};

const getURLWithQueryParams = (url, queryParams) => {
  let queryParamsString = '',
    connector = '?';
  for (const key in queryParams) {
    queryParamsString += `${connector}${key}=${queryParams[key]}`;
    connector === '?' && (connector = '&');
  }
  return url + queryParamsString;
};

module.exports = {
  getQueryParam,
  extractQueryParams,
  isGiftcardContext,
  isMyntAppEnabled,
  isWebkitEnabled,
  setCookie,
  getCookie,
  isBrowser,
  isValidUrl,
  getAppVersionFromXMA,
  cacheDecorator,
  isRequestFromWeb,
  getURLWithQueryParams
};
