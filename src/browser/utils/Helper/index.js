import get from 'lodash/get';
import debounce from 'lodash/debounce';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';

import { cookieKeys } from 'commonUtils/constants';
import {
  isMyntAppEnabled,
  isWebkitEnabled,
  setCookie,
  getCookie
} from 'commonUtils/helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getEstimate } from 'commonBrowserUtils/CartHelper';

const getUidx = () => get(window, '_checkout_.__myx_profile__.uidx') || '';

const getProfileDetails = () => get(window, '_checkout_.__myx_profile__') || {};

const getProfileMobile = () =>
  get(window, '_checkout_.__myx_profile__.mobile') || '';

const getProfileEmail = () =>
  get(window, '_checkout_.__myx_profile__.email') || '';

const getUserHashId = () =>
  get(window, '_checkout_.__myx_profile__.userHashId') || '';

const getUserFirstName = () => {
  return get(window, '_checkout_.__myx_profile__.name.firstName') || '';
};

const getUserFullName = () => {
  const firstName =
    get(window, '_checkout_.__myx_profile__.name.firstName') || '';
  const lastName =
    get(window, '_checkout_.__myx_profile__.name.lastName') || '';
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

// Rounds to 'digits' places after decimal
const roundNumber = (num, digits) =>
  +(Math.round(num + `e+${digits}`) + `e-${digits}`);

const currencyValue = (number, round = true) => {
  let num = Math.abs(number);
  num = (round ? Math.round(num) : roundNumber(num, 2)).toString();
  let arr = [],
    digits,
    dp,
    curr;
  if (!round) {
    let _dec = num.split('.');
    if (_dec.length > 1) {
      num = _dec[0];
      dp = _dec[1];
    }
  }
  while (num) {
    digits = digits ? 2 : 3;
    arr.push(num.slice(-digits));
    num = num.slice(0, -digits);
  }

  curr = arr.reverse().join(',');

  return round ? curr : dp ? curr + '.' + dp : curr;
};

const padZeros = number => {
  return number < 10 ? '0' + number : number.toString();
};

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getTimeBasedDate = (epoch, config = {}) => {
  epoch = Number(epoch);

  const epochDate = new Date(epoch);
  const time = getTimeFromEpoch(epochDate);

  const { showTime = true, thresholdDays = 0 } = config;

  let date;
  if (time) {
    date =
      isFeatureEnabled('SPEED_11_SHOW_TIME') && showTime
        ? `${time.hours} ${time.suffix} `
        : '';
    const currentDate = new Date();

    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + 1);

    if (isSameDay(currentDate, epochDate)) {
      date += 'today';
    } else if (isSameDay(nextDay, epochDate)) {
      date += 'tomorrow';
    } else if (thresholdDays > 0) {
      date += `${thresholdDays} days`;
    } else {
      // fallback to general date based
      date = formatDate(epoch);
    }
  } else {
    date = '';
  }

  return date;
};

const formatDate = (epoch, config = {}) => {
  epoch = epoch ? Number(epoch) : epoch;

  const { hideYear, fullMonthName, dateSuperscript } = config;
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let date = epoch ? new Date(epoch) : new Date();
  let day = dateSuperscript
    ? date.getDate() +
      ([, 'st', 'nd', 'rd'][/1?.$/.exec(date.getDate())] || 'th')
    : date.getDate();
  let month =
    ' ' +
    (fullMonthName
      ? monthName[date.getMonth()]
      : monthName[date.getMonth()].substring(0, 3));
  let year = hideYear ? '' : ' ' + date.getFullYear();
  return day + month + year;
};

const getTimeFromEpoch = epochDate => {
  if (epochDate instanceof Date && epochDate != 'Invalid Date') {
    let hours = epochDate.getHours();
    let minutes = epochDate.getMinutes();
    let seconds = epochDate.getSeconds();
    const suffix = hours >= 12 ? 'PM' : 'AM';

    hours = ((hours + 11) % 12) + 1;
    hours = hours.toString().length < 2 ? `0${hours}` : hours;
    minutes = minutes.toString().length < 2 ? `0${minutes}` : `${minutes}`;
    seconds = seconds.toString().length < 2 ? `0${seconds}` : `${seconds}`;

    return {
      hours,
      minutes,
      seconds,
      suffix
    };
  } else {
    return null;
  }
};

const getRoundedTime = epochs => {
  const epoch = Number(epochs);
  const epochDate = new Date(epoch);
  if (epochDate instanceof Date && epochDate != 'Invalid Date') {
    let hours = epochDate.getHours();
    let minutes = epochDate.getMinutes();
    // threshold timer to round of to next hour.
    // egg minutes = 10 and hours = 9, then round it of to 10
    if (minutes >= 10) {
      hours = hours + 1 != 24 ? hours + 1 : 0;
    }
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = ((hours + 11) % 12) + 1;
    return {
      hours,
      suffix
    };
  }
  return null;
};

const getDateObject = (
  epochDate,
  timeComputationRequired,
  monthAbbreviation = true
) => {
  if (epochDate instanceof Date && epochDate != 'Invalid Date') {
    let onlyDate = epochDate.getDate();
    let date = onlyDate < 10 ? `0${onlyDate}` : onlyDate;
    date = date + ([, 'st', 'nd', 'rd'][/1?.$/.exec(date)] || 'th');
    let month = epochDate.getMonth();
    const monthsInShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const monthsName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const daysInShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthInWords = monthAbbreviation
      ? monthsInShort[month]
      : monthsName[month];
    month = month < 10 ? `0${month}` : month;
    let time;

    // Time Related Computation
    if (timeComputationRequired) {
      time = getTimeFromEpoch(epochDate);
    }

    return {
      onlyDate,
      date,
      month,
      monthInWords,
      year: epochDate.getFullYear(),
      day: epochDate.getDay(),
      dayInWords: daysInShort[epochDate.getDay()],
      time
    };
  } else {
    return null;
  }
};

const stampAddressAndRedirect = async (
  unifiedAddressId,
  handleAddressAction,
  updateCheckoutState,
  selectedAddress,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  if (unifiedAddressId) {
    handleAddressAction(
      'setOrderAddress',
      {},
      response => {
        updateCheckoutState({
          cartData: response,
          selectedAddress
        });
        successCallback(response);
        navigateTo('/checkout/payment');
      },
      err => {
        errorCallback(err);
      }
    );
  } else {
    const redirectionUrl = isLoggedIn()
      ? '/checkout/address/list'
      : '/login?referer=/checkout/cart';
    navigateTo(redirectionUrl);
  }
};

const chainFns = (...fns) => () => fns.forEach(fn => fn && fn());

const transformImageUrl = (imageUrl = '', height, width, qp) => {
  imageUrl = imageUrl.replace('($height)', height);
  imageUrl = imageUrl.replace('($width)', width);
  imageUrl = imageUrl.replace('($qualityPercentage)', qp);
  return imageUrl;
};

const shortNum = num => {
  //this module converts numbers into short forms like 1100 to 1.1K
  if (isNaN(num) || !num) {
    return '';
  }
  num = Math.round(num);
  if (num <= 999) {
    return num.toString();
  }
  const strNum = num.toString();
  let newNum = '';
  if (strNum.length < 6) {
    newNum =
      strNum.substring(0, strNum.length - 3) +
      (strNum[strNum.length - 3] === '0'
        ? ''
        : '.' + strNum[strNum.length - 3]) +
      'K';
  } else {
    newNum =
      strNum.substring(0, strNum.length - 5) +
      (strNum[strNum.length - 5] === '0'
        ? ''
        : '.' + strNum[strNum.length - 5]) +
      'L';
  }
  return newNum;
};

const throttle = (func, limit) => {
  let inThrottle,
    lastThrottledArgs = null;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        lastThrottledArgs && func.apply(...lastThrottledArgs);
        inThrottle = false;
        lastThrottledArgs = null;
      }, limit);
    } else {
      lastThrottledArgs = [context, args];
    }
  };
};

const isLoggedIn = () => {
  return getCookie(cookieKeys.IS_LOGGED_IN) === 'true';
};

const bool = val => {
  if (includes(['true', true, '1', 1], val)) {
    return true;
  } else if (includes(['false', false, '0', 0], val)) {
    return false;
  }
  return val || false;
};

const isLocalStorageEnabled = () => {
  const testItem = 'test';
  try {
    if (!window.localStorage) {
      return false;
    }
    window.localStorage.setItem(testItem, {});
    window.localStorage.removeItem(testItem);
    return true;
  } catch (e) {
    return false;
  }
};

const isSessionStorageEnabled = () => {
  const testItem = 'test';
  try {
    if (!window.sessionStorage) {
      return false;
    }
    window.sessionStorage.setItem(testItem, {});
    window.sessionStorage.removeItem(testItem);
    return true;
  } catch (e) {
    return false;
  }
};

const gotoHomePage = () => (window.location.href = 'https://www.myntra.com/');

const gotoOrders = () => SHELL.redirectTo('/my/orders');

const getImageUrl = (secureUrl = '', height, width) => {
  return secureUrl
    .replace('h_($height)', `h_${height}`)
    .replace('q_($qualityPercentage)', 'q_100')
    .replace('w_($width)', `w_${width}`);
};

const getAppVersionBasedConfig = (configKey = '') => {
  return get(window, `_checkout_.__myx_appVersionBasedConfig__.${configKey}`);
};

const isAndroidApp = () => {
  const deviceData = get(window, '_checkout_.__myx_deviceData__', {});
  return deviceData.isAndroid;
};

const isIOSApp = () => {
  const deviceData = get(window, '_checkout_.__myx_deviceData__', {});
  return deviceData.isIOS;
};

const isApp = () => {
  return get(window, '_checkout_.__myx_deviceData__.isApp', false);
};

/*************************************************************************************
 * This function is used to set the title of the nav bar in apps and pwa.            *
 * It can be used in common components. This function has no effect in desktop.      *
 *************************************************************************************/
const setDocTitleInMobile = (title, options = {}) => {
  // Workaround fix for android app to solve coupon and gift wrap back navigation issues
  if (isAndroidApp() && title) {
    document.title = title;
  } else if (isWebkitEnabled(['setWebviewSPATitle']) && title) {
    document.title = title;
    webkit.messageHandlers.setWebviewSPATitle.postMessage({ title: title });
  } else if (isMobile() && title) {
    SHELL.setActivePage(title, options); // for PWA
  }
};

const isMobileMode = mode => mode === 'mobile';

const isMobile = () =>
  get(window, '_checkout_.__myx_deviceData__.isMobile', false);

const isPWA = () =>
  get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'mobile';

const isDesktop = () =>
  get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'desktop';

const isPhonePeWebView = () =>
  get(window, '_checkout_.__myx_deviceData__.isPhonePeWebView', false);

const errorNotification = (config = {}) =>
  SHELL.alert('error', {
    message: config.message || 'Something went wrong. Please try again',
    delay: config.delay || 5000
  });

const successNotification = (config = {}) =>
  SHELL.alert('info', {
    message: config.message,
    delay: config.delay || 5000
  });

const navigateBack = (
  history,
  { message, delay = 1500, url = '', forceRedirect, steps = 1 } = {}
) => {
  if (forceRedirect && url) {
    message
      ? setTimeout(() => window.location.replace(url), delay)
      : window.location.replace(url);
  } else if (history.length > 1) {
    message
      ? setTimeout(() => history.go(-1 * steps), delay)
      : history.go(-1 * steps);
  } else {
    message
      ? setTimeout(
          () => window.location.replace(url || '/checkout/cart'),
          delay
        )
      : window.location.replace(url || '/checkout/cart');
  }
};
const getSingularOrPluralText = (
  number = 0,
  singular = '',
  plural = '',
  returnNumber = true
) => {
  return `${returnNumber ? `${number} ` : ''}${
    parseInt(number) === 1 ? singular : plural
  }`;
};

const promiseWrapper = requestManager => {
  const promiseRequestManager = {};
  for (let method in requestManager) {
    promiseRequestManager[method] = data =>
      new Promise((resolve, reject) => {
        requestManager[method](data, resolve, reject);
      });
  }
  return promiseRequestManager;
};

const isValidAmount = amount => currencyValue(amount) !== '0';

const isElementInView = el => {
  const top = el.offsetTop;
  const height = el.offsetHeight;

  return (
    top >= window.pageYOffset &&
    top + height <= window.pageYOffset + window.innerHeight
  );
};

const onEnteringViewport = (node, callback) => {
  let debouncedFn = () => {};
  debouncedFn = debounce(() => {
    if (isElementInView(node)) {
      callback && callback();
      document.removeEventListener('scroll', debouncedFn);
    }
  }, 200);
  return debouncedFn;
};

const setViewportReference = (node, options = {}, callback) => {
  try {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      if (
        entry.isIntersecting &&
        (entry.intersectionRatio >= options.threshold || 1)
      ) {
        callback && callback();
        observer.unobserve(entry.target);
      }
    }, options);
    node && observer.observe(node);
  } catch (e) {
    node &&
      document.addEventListener('scroll', onEnteringViewport(node, callback));
  }
};

const getChromeVersion = () => {
  if (get(window, 'navigator.userAgent')) {
    const raw = window.navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  } else {
    return false;
  }
};

const isIE = () => {
  if (get(window, 'navigator.userAgent')) {
    return /MSIE|Trident|Edge\//.test(window.navigator.userAgent);
  } else {
    return false;
  }
};

const getXMetaApp = () => {
  let xMetaAppValue = getCookie(cookieKeys.X_MYNTRA_APP);

  if (!xMetaAppValue) {
    xMetaAppValue =
      'deviceID=' + (getCookie(cookieKeys.DEVICE_ID, false) || '');
  }

  return decodeURIComponent(xMetaAppValue);
};

const getChannel = () =>
  isAndroidApp()
    ? 'android'
    : isIOSApp()
    ? 'iOS'
    : isMobile()
    ? 'mweb'
    : 'desktop';

const getDeviceType = () =>
  isAndroidApp()
    ? 'MyntraRetailAndroid'
    : isIOSApp()
    ? 'MyntraRetailiPhone'
    : isMobile()
    ? 'MyntraPwa'
    : 'MyntraWeb';

const getDeviceId = () => {
  let xMetaAppValue = getCookie(cookieKeys.X_MYNTRA_APP) || '';
  const regexResult = /deviceID=(?:(?!,).)*/.exec(xMetaAppValue);
  const deviceID = Array.isArray(regexResult) ? regexResult[0] : null;
  return deviceID
    ? deviceID.split('=')[1]
    : getCookie(cookieKeys.DEVICE_ID, false) || '';
};

const isValidMobile = value => {
  const regExp = new RegExp('^[1-9]([0-9]{9})$');
  return regExp.test(value);
};

const copyToClipBoard = txtToCopy => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = txtToCopy;
  document.body.appendChild(input);
  input.select(txtToCopy);
  document.execCommand('copy');
  document.body.removeChild(input);
};

const isChromeBrowser = () => !!getChromeVersion() && !!window.chrome;

const setValueInObject = (obj, propertyPath, value) => {
  if (!obj) return obj;
  let properties = Array.isArray(propertyPath)
    ? propertyPath
    : propertyPath.split('.');
  if (properties.length > 1) {
    if (
      !obj[properties[0]] ||
      typeof obj[properties[0]] !== 'object' ||
      !obj.hasOwnProperty(properties[0])
    ) {
      obj[properties[0]] = {};
    }
    return setValueInObject(obj[properties[0]], properties.slice(1), value);
  } else {
    obj[properties[0]] = value;
    return obj;
  }
};

const scrollIntoView = (element, options = {}) => {
  if (element && element.scrollIntoView) {
    try {
      element.scrollIntoView(options);
    } catch (e) {
      element.scrollIntoView(false);
    }
  }
};

/********************************************************************
 * getScrollSpeed: Must be used within handleScroll event listener  *
 ********************************************************************/
const getScrollSpeed = (() => {
  let lastPos = null,
    newPos,
    timer,
    delta = 0;
  const delay = 50;

  //scrollStopped: it is called when no scroll event is fired
  //within given delay, which resets the delta to 0
  function scrollStopped() {
    lastPos = null;
    delta = 0;
  }

  // this anonymous function works with assumption that
  // a scroll event will be called within given delay.
  return () => {
    newPos = window.scrollY;
    if (lastPos != null) {
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(scrollStopped, delay);

    return delta;
  };
})();

const scrollBy = (options = {}) => {
  if (window.scrollBy) {
    try {
      window.scrollBy(options);
    } catch (e) {
      window.scrollBy(options.top || 0, options.left || 0);
    }
  } else {
    console.log('[WARNING] Scroll By not supported');
  }
};

const isFreeEarlyAccess = (remark = '') => {
  const freeEarlyAccessMap = getKVPairValue('FREE_EARLY_ACCESS_FOR_INSIDER');

  return !!freeEarlyAccessMap[remark];
};

const getTryAndBuyOpted = products =>
  (products || []).some(obj => get(obj, 'tryAndBuyOpted'));

const getTryAndBuyDetails = products => {
  let tnbEligibleItems = [];
  let tnbEligibleTotalQuantity = 0;
  let count = 0;

  products.forEach(product => {
    const isTryAndBuyAvailableForItem = get(
      product,
      'productServiceabilityInfo.tryNBuyAvailable',
      false
    );

    if (isTryAndBuyAvailableForItem) {
      tnbEligibleItems.push(product);
      tnbEligibleTotalQuantity += product.quantity;
    }
    count += product.quantity;
  });

  return { tnbEligibleItems, tnbEligibleTotalQuantity, count };
};

const getSelectedProducts = (products, includeFreeItem = true) =>
  (products || []).filter(product => {
    if (includeFreeItem) {
      return get(product, 'selectedForCheckout');
    } else {
      return (
        get(product, 'selectedForCheckout') && !get(product, 'flags.freeItem')
      );
    }
  });

const getSelectedProductsCount = products =>
  getSelectedProducts(products, false).length;

const getTotalQuantityInCart = products =>
  (products || []).reduce(
    (count, product) =>
      (count += get(product, 'selectedForCheckout')
        ? get(product, 'quantity')
        : 0),
    0
  );

const pluralizeText = (count, text) => (count === 1 ? text : `${text}s`);

/*
 *  Invalidate an object when atleast one key value pair is empty or null
 *  in first level of key without nesting.
 */
const validateObject = object => {
  if (isEmpty(object)) {
    return false;
  } else {
    for (let key in object) {
      switch (typeof object[key]) {
        case 'object':
          if (isEmpty(object[key])) return false;
          break;
        case 'string':
          if (object[key] === '') return false;
          break;
      }
    }
    return true;
  }
};

const slicePayloads = payload => {
  let currentSlicedLength = 0;
  const customVariableSize = [400, 100, 25, 25];
  const payloadChunks = [];

  try {
    while (currentSlicedLength < payload.length) {
      let slicedPayloadArray = ['', '', '', ''];

      for (let I = 0; I < 4 && currentSlicedLength < payload.length; I++) {
        slicedPayloadArray[I] = payload.slice(
          currentSlicedLength,
          currentSlicedLength + customVariableSize[I]
        );
        currentSlicedLength += customVariableSize[I];
      }

      payloadChunks.push({
        custom: {
          custom: {
            v1: slicedPayloadArray[0],
            v2: slicedPayloadArray[1],
            v3: slicedPayloadArray[2],
            v4: slicedPayloadArray[3]
          }
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
  return payloadChunks;
};

const triggerMaWithLargePayload = (eventName, payload) => {
  const whiteListedEvents = getKVPairValue('PAYLOAD_EVENTS');
  if (payload && whiteListedEvents.indexOf(eventName) !== -1) {
    const stringifiedPayload = JSON.stringify(payload);
    const payloadChunk = slicePayloads(stringifiedPayload);
    payloadChunk.forEach(chunk => triggerEvent(eventName, chunk));
  }
};

const getDiscountData = (discounts = {}, discountType = '') => {
  const { value } =
    (discounts.data || []).find(data => data.name === discountType) || {};
  return value;
};

const priceBlockEvent = (uidx, price) => {
  const totalPayable = price.total;
  const cartDiscount = getDiscountData(price.discounts, 'discount');
  const couponDiscount = getDiscountData(price.discounts, 'coupon');
  if (isApp()) {
    triggerEvent('PRICE_BLOCK_LOAD', {
      custom: {
        custom: {
          v1: uidx,
          v2: totalPayable,
          v3: cartDiscount,
          v4: couponDiscount
        },
        widget: {
          name: 'price_block',
          type: 'card'
        }
      }
    });
  }
};

const getDateDiff = (dt1, dt2) => {
  const date1 = new Date(dt1 ? formatDate(dt1) : formatDate());
  const date2 = new Date(dt2 ? formatDate(dt2) : formatDate());
  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
};

const getHoursDiff = (dt1, dt2) => {
  let hours = 0,
    minutes;
  const date1 = new Date(dt1 ? formatDate(dt1) : formatDate());
  const date2 = new Date(dt2 ? formatDate(dt2) : formatDate());
  if (date1.getDate() != date2.getDate()) {
    hours += (date2.getDate() - date1.getDate()) * 24;
  }
  hours += date2.getHours() - date1.getHours();
  minutes = Math.abs(date2.getMinutes() - date1.getMinutes());
  if (minutes && minutes >= 30) {
    hours += 1;
  }
  return hours;
};

const isReturnAbuser = returnAbuser => {
  const level = get(returnAbuser, 'level');
  if (level === 'DEFAULT' || level === 'WARNING_LIST' || !level) {
    return false;
  } else {
    return true;
  }
};

const isValidEmail = email => {
  const exp =
    '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  const regex = new RegExp(exp);
  return regex.test(String(email).toLowerCase());
};

const triggerClickOnLink = throttle(cb => {
  cb();
}, 300);

const restrictMultipleClickOnLink = e => {
  let allowTrigger = false;
  triggerClickOnLink(() => {
    allowTrigger = true;
  });
  if (allowTrigger) {
    return;
  }
  e.preventDefault();
};

/****************************************************************************************
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript *
 *****************************************************************************************/
const getHash = data => {
  let hash = 0;
  for (let I = 0; I < data.length; I++) {
    hash = (hash << 5) - hash + data[I].charCodeAt(0);
    hash |= 0;
  }
  return hash;
};

const toggleBodyClass = className => {
  if (document.body.classList.contains(className)) {
    document.body.classList.remove(className);
  } else {
    document.body.classList.add(className);
  }
};
const getArraySumWithRange = (arr, start, end) => {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += arr[i];
  }
  return sum;
};

const getFullDateDiff = (endTime, startTime) => {
  const endTimeParsed = endTime ? parseInt(endTime, 10) : new Date().getTime();
  const startTimeParsed = startTime
    ? parseInt(startTime, 10)
    : new Date().getTime();
  const t = endTimeParsed - startTimeParsed;

  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days,
    hours,
    minutes,
    seconds
  };
};

//Function to convert numbers interms of thousands and millions
const getShortenedNumber = number => {
  if (number < 1000) {
    return number;
  } else {
    let value = roundNumber(number / 1000, 1);
    if (value >= 1000) {
      value = roundNumber(value / 1000, 1) + 'M';
    } else {
      value = value + 'k';
    }
    return value;
  }
};

const getDeliveryEstimatesUtil = (handleCartAction, method, data = {}) => {
  let wait = false;

  return () => {
    if (!wait) {
      wait = true;
      handleCartAction(
        method,
        data,
        () => (wait = false),
        err => {
          SHELL.alert('info', {
            message: get(err, 'message'),
            styleOverrides: {
              notifyMainDiv: `bottom: 82px;`
            }
          });
          wait = false;
        }
      );
    }
  };
};

const navigateTo = (url, replace = false) => {
  const isSpa = isFeatureEnabled('SPA_ENABLED');
  const isOverrideMethodAvailableAndroid = isMyntAppEnabled([
    'shouldOverrideUrlLoading'
  ]);

  if (isSpa && isOverrideMethodAvailableAndroid) {
    MyntApp.shouldOverrideUrlLoading(url);
  }

  if (isSpa && (isAndroidApp() ? isOverrideMethodAvailableAndroid : true)) {
    replace && window.ckrrhistory
      ? window.ckrrhistory.replace(url)
      : SHELL.redirectTo(url);
  } else {
    window.location = url;
  }
};

// convert timestamp into dd MMM YYYY
const formatDateHelper = timestamp => {
  const date = new Date(timestamp);
  return (
    date.getDate() +
    ' ' +
    date.toLocaleString('en-US', { month: 'short' }) +
    ' ' +
    date.getFullYear()
  );
};

const getDeliveryEstimateRange = cartProducts => {
  let promiseDates = cartProducts?.map(
    product =>
      getEstimate(
        get(product, 'productServiceabilityInfo.pincodeInfo.shippingEstimates')
      ).estimate?.promiseDate
  );
  promiseDates.sort();
  const length = promiseDates.length;
  const range =
    length === 1 || getDateDiff(promiseDates[0], promiseDates[length - 1]) < 1
      ? formatDate(promiseDates[0]).substring(
          0,
          formatDate(promiseDates[0]).lastIndexOf(' ')
        )
      : formatDate(promiseDates[0]).substring(
          0,
          formatDate(promiseDates[0]).lastIndexOf(' ')
        ) +
        ' - ' +
        formatDate(promiseDates[length - 1]).substring(
          0,
          formatDate(promiseDates[length - 1]).lastIndexOf(' ')
        );
  return range;
};

const concatClassNames = (...classNames) =>
  classNames.reduce((acc, name) => {
    if (!name) {
      return acc;
    }

    return `${acc} ${name}`;
  }, '');

export {
  currencyValue,
  padZeros,
  formatDate,
  getDateObject,
  getTimeBasedDate,
  chainFns,
  transformImageUrl,
  shortNum,
  bool,
  getImageUrl,
  isLocalStorageEnabled,
  isSessionStorageEnabled,
  isLoggedIn,
  getCookie,
  setDocTitleInMobile,
  setCookie,
  isMobile,
  isPWA,
  isDesktop,
  gotoHomePage,
  isApp,
  isChromeBrowser,
  isPhonePeWebView,
  getAppVersionBasedConfig,
  errorNotification,
  isMyntAppEnabled,
  isWebkitEnabled,
  navigateBack,
  navigateTo,
  isValidAmount,
  successNotification,
  onEnteringViewport,
  setViewportReference,
  isElementInView,
  isAndroidApp,
  isIOSApp,
  getChromeVersion,
  isIE,
  throttle,
  getXMetaApp,
  isValidMobile,
  getUidx,
  getProfileDetails,
  getProfileMobile,
  getProfileEmail,
  roundNumber,
  getUserFirstName,
  getUserFullName,
  getUserHashId,
  copyToClipBoard,
  getChannel,
  setValueInObject,
  scrollIntoView,
  getScrollSpeed,
  scrollBy,
  isFreeEarlyAccess,
  getTryAndBuyOpted,
  getTryAndBuyDetails,
  getSelectedProducts,
  getSelectedProductsCount,
  promiseWrapper,
  pluralizeText,
  priceBlockEvent,
  validateObject,
  getTotalQuantityInCart,
  triggerMaWithLargePayload,
  slicePayloads,
  getDateDiff,
  getHoursDiff,
  getFullDateDiff,
  getTimeFromEpoch,
  gotoOrders,
  isReturnAbuser,
  isMobileMode,
  isValidEmail,
  restrictMultipleClickOnLink,
  toggleBodyClass,
  getHash,
  getArraySumWithRange,
  getDeviceType,
  stampAddressAndRedirect,
  getDeviceId,
  getShortenedNumber,
  getDeliveryEstimatesUtil,
  formatDateHelper,
  concatClassNames,
  getSingularOrPluralText,
  getRoundedTime,
  getDeliveryEstimateRange
};
