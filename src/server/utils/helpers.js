/*
 * Server side common functions.
 */

const mcookies = require('@myntra/myx/lib/server/cookies');
const config = require('../../config');

const { isFeatureEnabled } = require('../../utils/FeaturesManager');
const { getAbtest } = require('../../utils/abtestManager');
const { cookieKeys } = require('../../utils/constants');
const { getKVPairValue } = require('../../utils/KVPairManager');
const get = require('lodash/get');
const {
  isGiftcardContext,
  getURLWithQueryParams
} = require('../../utils/helper');
const isVariantEnabled = require('../../utils/FeaturesManager')
  .isVariantEnabled;

const base64 = require('base-64');
const jwtDecode = require('jwt-decode');

const shouldAutoApplyGC = req => {
  /*
    GC should be autoapplied only if
      - Cart context is not `giftcard`
      - `CART_CREDIT` feature is on
      - `AUTO_GC` feature is enabled
      - `AUTOGC_BALANCE_LAZYLOAD` feature is disabled
      - GH config for autoapplying credit is on
      - User has not manually removed GC from cart (checked from cookies)
  */

  const cookies = mcookies(req);
  const cartCreditsConfig = getKVPairValue('CART_CREDIT_CONFIG', req);

  return (
    !isGiftcardContext({ req }) &&
    isFeatureEnabled('CART_CREDIT', null, req) &&
    !isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD', null, req) &&
    isFeatureEnabled('AUTOGC_ENABLED', null, req) &&
    cartCreditsConfig.giftCard.autoApply &&
    !cookies.get(cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE)
  );
};

const getDonationConfig = (req, giftCardContext) => {
  const variant = getAbtest('CHECKOUT_DONATION', req);
  const isFgEnabled = isFeatureEnabled('CHECKOUT_DONATION', null, req);
  const isAutoApplyEnabled = variant !== 'enabled' || !isFgEnabled;

  let applyDonation, amount;
  if (isAutoApplyEnabled && !giftCardContext) {
    applyDonation = variant === 'autoApply' && isFgEnabled;
    const donationKV = getKVPairValue('DONATION_VALUES', req);
    amount = applyDonation ? get(donationKV, 'values.0', 0) : 0;
  }
  return { applyDonation, isAutoApplyEnabled, amount };
};

const getCartFetchConfig = ({ req, applyGC, pincode, unselected = false }) => {
  const mfuEnable = isFeatureEnabled('MFU', null, req);
  const giftCardContext = isGiftcardContext({ req });
  const autoApplyGC =
    req.headers.addedgiftcard || (applyGC && shouldAutoApplyGC(req));
  const donationConfig = getDonationConfig(req, giftCardContext);

  let method = 'get';
  const applyProperties = {};
  let url = `${config('cart').url}${(req.query && req.query.cartContext) ||
    'default'}`;
  const queryParams = { unselected };

  if (pincode) {
    method = 'post';
    url = `${url}/apply`;
    applyProperties['serviceability'] = {
      apply: true,
      pincode
    };
  }
  if (donationConfig.isAutoApplyEnabled) {
    if (method === 'get') {
      method = 'post';
      url = `${url}/apply`;
    }
    applyProperties['donation'] = {
      apply: donationConfig.applyDonation,
      amount: donationConfig.amount
    };
  }

  if (autoApplyGC) {
    if (method === 'get') {
      method = 'post';
      url = `${url}/apply`;
    }
    applyProperties['myntraCredit'] = {
      apply: true
    };
  } else if (mfuEnable && !giftCardContext) {
    if (method === 'get') {
      method = 'post';
      url = `${url}/apply`;
    }
    applyProperties['loyaltyPoint'] = {
      apply: true
    };
  } else {
    const cartLogin = req.query && req.query.cartLogin === 'true';
    const cartMerge = req.query && req.query.cartMerge === 'true';
    queryParams.cm = !cartLogin || cartMerge;
  }
  url = getURLWithQueryParams(url, queryParams);
  return { url, method, applyProperties };
};

const getNidxFromAt = at => {
  if (!at) {
    return '';
  }
  try {
    return (jwtDecode(base64.decode(at)) || {}).nidx;
  } catch (e) {
    console.error(
      `[CheckoutV2-getNidxFromAt] ${new Date()} Invalid AT: ${at}`,
      e
    );
    return '';
  }
};

const getUidxFromAt = at => {
  if (!at) {
    return '';
  }
  try {
    return (jwtDecode(base64.decode(at)) || {}).uidx;
  } catch (e) {
    console.error(
      `[CheckoutV2-getUidxFromAt] ${new Date()} Invalid AT: ${at}`,
      e
    );
    return '';
  }
};

const redirectMiddlewareAocV2 = (req, res, next) => {
  if (isVariantEnabled('AOC_V2_VARIANT3', req) && req.path !== '/list') {
    res.redirect('/checkout/cart');
  } else {
    next();
  }
};

module.exports = {
  getCartFetchConfig,
  getNidxFromAt,
  getUidxFromAt,
  redirectMiddlewareAocV2
};
