import get from 'lodash/get';
import { isApp, isPWA, isAndroidApp } from '../Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const getDPR = () => {
  if (window.devicePixelRatio) {
    return Math.min(window.devicePixelRatio, 2.0);
  } else {
    return 1.0;
  }
};

const imageQualityBasedOnNetwork = () => {
  const navigator = get(window, 'navigator') || {};
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    {};
  const effectiveType = connection.effectiveType || '';
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 40;
  } else if (effectiveType === '3g') {
    return 60;
  } else if (effectiveType === '4g') {
    return 60;
  } else {
    return 'auto';
  }
};

/*
  This is the app config for image url loading in PLP page.
  The width is determined by half of screen width. for quality and DPR determination they use the same logic as ours.
*/

const appCachedImageConfig = {
  w: Math.floor(window.innerWidth / 2),
  q: imageQualityBasedOnNetwork(),
  dpr: getDPR()
};

/*
  This is the PWA config where dpr is fixed as 1.5 and width is based on KVPair
*/
const pwaCachedImageConfig = {
  f: 'webp',
  dpr: 1.5,
  q: imageQualityBasedOnNetwork(),
  w: getKVPairValue('PWA_IMAGE_WIDTH') || 600
};

// for desktop width is fixed at 210
const desktopCachedImageWidth = 210;

const getCloudinaryImage = (src, w, h) => {
  if (src) {
    src = `${src.replace(
      '($qualityPercentage)',
      imageQualityBasedOnNetwork()
    )}`;
    src = isNaN(w)
      ? `${src.replace('w_($width)', '')}`
      : `${src.replace('($width)', w)}`;
    src = isNaN(h)
      ? `${src.replace('h_($height)', '')}`
      : `${src.replace('($height)', h)}`;
  }
  return src;
};

const removeParams = (src, string) => {
  if (src) {
    src = src.replace(string, '');
  }
  return src;
};

const getRandomBackgroundColors = () => {
  let backgroundColors = ['#ffedf3', '#fff2df', '#f4fff9', '#e5f1ff'];
  let randNum = Math.floor(Math.random() * 1000) % 4;
  return backgroundColors[randNum];
};

const addAdditionalAttributesToPImage = (pImageUrl = '', attr = {}) => {
  let key = 'fl_progressive';
  let pos = pImageUrl.indexOf(key);
  if (pos !== -1) {
    let cloudinaryProps = Object.keys(attr).reduce((attributes_url, key) => {
      attr[key] &&
        pImageUrl.indexOf(`${key}_`) === -1 &&
        (attributes_url += `${key}_${attr[key]},`);
      return attributes_url;
    }, '');
    return pImageUrl.slice(0, pos) + cloudinaryProps + pImageUrl.slice(pos);
  }
  return pImageUrl;
};

const getProgressiveImage = (src, attr = {}, width = '') => {
  src = src || '';
  const searchKey = 'assets.myntassets.com/';
  const startPos = src.indexOf(searchKey) + searchKey.length;
  // Default Value.
  const imageQuality = imageQualityBasedOnNetwork();
  const stripQ_AutoParamFromUrl = src => {
    if (src.indexOf('q_auto/') !== -1) {
      let key = 'q_auto/';
      let pos = src.indexOf(key);
      return src.slice(0, pos) + src.slice(pos + key.length);
    }
    return src;
  };
  // if URL contains q_auto, remove it,
  src = stripQ_AutoParamFromUrl(src);

  let cloudinaryProps = Object.keys(attr).reduce((url, key) => {
    attr[key] && (url += `${key}_${attr[key]},`);
    return url;
  }, '');
  if (!attr.q) {
    cloudinaryProps += `q_${imageQuality},`;
  }
  if (!attr.w && width) {
    cloudinaryProps += `w_${width},`;
  }
  if (!attr.c) {
    cloudinaryProps += `c_limit,`;
  }

  cloudinaryProps += `fl_progressive/`;
  return src.substr(0, startPos) + cloudinaryProps + src.substr(startPos);
};

/*
  This is a function to determine the source set for the image for using cached image.

  It varies from device to device.In Apps iOS does not support webp images.So checks for that have been added.
  Also c_limit is not there in apps.So it is removed.

  The static params in the url are not used in any of the PLP pages.So it is removed.

  For slower internet connection we support only single sourceset with optimal DPR inorder to avoid performance issue.

*/
const getSourceSet = (src, attr = {}) => {
  src = removeParams(src, 'h_($height)');
  src = removeParams(src, 'q_($qualityPercentage)');
  src = removeParams(src, 'w_($width)');
  src = removeParams(src, ',,/');
  src = removeParams(src, 'v1/');
  const navigator = get(window, 'navigator') || {};
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    {};
  const effectiveType = connection.effectiveType || '';
  let srcsetValues = '';
  if (isApp()) {
    let key = 'fl_progressive';
    srcsetValues = `${getProgressiveImage(src, appCachedImageConfig)}`;
    if (srcsetValues.indexOf('c_limit,') !== -1) {
      srcsetValues = removeParams(srcsetValues, 'c_limit,');
    }

    let pos = srcsetValues.indexOf(key);
    if (pos != -1) {
      pos = pos + key.length;
      srcsetValues = isAndroidApp()
        ? srcsetValues.slice(0, pos) + ',f_webp' + srcsetValues.slice(pos)
        : srcsetValues;
    }
  } else if (isPWA()) {
    srcsetValues = `${getProgressiveImage(src, pwaCachedImageConfig)}`;
  } else if (effectiveType === '4g') {
    // using set of DPR values for the source set under 4g network to get the best DPR image.(Logic from Image component in m-comp)
    srcsetValues = `
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '1.0', ...attr },
      desktopCachedImageWidth
    )} ,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '1.5', ...attr },
      desktopCachedImageWidth
    )} 1.5x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '1.8', ...attr },
      desktopCachedImageWidth
    )} 1.8x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '2.0', ...attr },
      desktopCachedImageWidth
    )} 2.0x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '2.2', ...attr },
      desktopCachedImageWidth
    )} 2.2x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '2.4', ...attr },
      desktopCachedImageWidth
    )} 2.4x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '2.6', ...attr },
      desktopCachedImageWidth
    )} 2.6x,
    ${getProgressiveImage(
      src,
      { f: 'webp', dpr: '2.8', ...attr },
      desktopCachedImageWidth
    )} 2.8x`;
  } else {
    srcsetValues = `${getProgressiveImage(
      src,
      {
        f: 'webp',
        dpr: 1.5,
        ...attr
      },
      desktopCachedImageWidth
    )}`;
  }
  return srcsetValues;
};

export {
  getCloudinaryImage,
  getRandomBackgroundColors,
  getProgressiveImage,
  addAdditionalAttributesToPImage,
  getDPR,
  getSourceSet,
  removeParams
};
