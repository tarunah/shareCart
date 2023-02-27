/*
Usage Example:
import { getAbtest } from 'commonUtils/abtestManager';
const abVal = getAbtest('CHECKOUT_TIMER');
*/

const isBrowser = typeof window !== 'undefined';
const get = require('lodash/get');

const sanitize = abtests =>
  Object.keys(abtests).reduce((acc, key) => {
    acc[key.trim()] = abtests[key];
    return acc;
  }, {});

const getAbtest = (key, req, options = {}) => {
  const accessKey = options.mxabd
    ? { client: '__myx_abd__', server: '_mxabd_' }
    : { client: '__myx_ab__', server: '_mxab_' };

  let value = '',
    abTests = isBrowser
      ? get(window, `_checkout_.${accessKey.client}`, null)
      : get(req, `myx.${accessKey.server}`, null);
  const config = abtestMap[key];
  if (config) {
    value = get(sanitize(abTests || {}), `${config.key}`, config.defaultValue);
  }
  return value;
};

const getXMyntraABTestHeader = req => {
  const accessKey = { client: '__myx_ab__', server: '_mxab_' };
  const abTests = isBrowser
    ? get(window, `_checkout_.${accessKey.client}`, {})
    : get(req, `myx.${accessKey.server}`, {});
  let abHeader = '';
  let keyValue = '';

  //mandatory for merging cart of non loggedin and loggedin user in same session
  abTests['checkout.cartmerge'] = 'enabled';
  if (!abTests['cart.mongoMigration']) {
    abTests['cart.mongoMigration'] = 'disabled';
  }
  for (const key in abTests) {
    keyValue = `${key}=${abTests[key]};`;
    abHeader += keyValue;
  }

  return abHeader;
};

const getAbtestConfig = (key, defaultValue, config) => ({
  key,
  defaultValue,
  config: config || { isAppOnly: true }
});

const abtestMap = {
  RETENTION_COUPON_AB: getAbtestConfig('cart.auto.coupon', 'disabled'),
  RANGE_BASED_PROMISE: getAbtestConfig('pdp.speed.rbd', 'disabled'),
  CART_SOCIAL_PROOFING: getAbtestConfig(
    'cart.address.socialProofing',
    'disabled'
  ),
  SCRATCH_CARD_RETENTION: getAbtestConfig(
    'retention.scratchcard.bau2',
    'disabled'
  ),
  PAYMENT_ICON_REVAMP: getAbtestConfig('payments.iconrevamp', 'disabled'),
  PAYMENT_STRIKE_OFF_MRP: getAbtestConfig('payments.strikeoffmrp', 'disabled'),
  ADDRESS_DELIVERY_ORDER_NOW: getAbtestConfig('checkout.ordernow', 'disabled'),
  PAYMENT_TRUST_MSG_BANNER: getAbtestConfig(
    'payments.trust_msg_banner',
    'disabled'
  ),
  ADDRESS_AUTOFILL_NEW_USER: getAbtestConfig(
    'address.newUserAddressAutoFill',
    'disabled',
    {
      isAppOnly: false
    }
  ),
  PAYMENT_SAVINGS_CALLOUT: getAbtestConfig(
    'payments.savings_callout',
    'disabled'
  ),
  CHECKOUT_SAVINGS_NUDGE: getAbtestConfig('checkout.savingsnudge', 'disabled'),
  CART_POSITIVE_REINFORCEMENT: getAbtestConfig(
    'cart.positivereinforcement',
    'disabled'
  ),
  CART_SHOW_COUPON: getAbtestConfig('cart.showcoupon', 'disabled'),
  NEW_USER_PAYMENT_BANNER_V2: getAbtestConfig(
    'payments.new_banner',
    'disabled'
  ),

  SAVINGS_FEEDBACK: getAbtestConfig('cart.savingsfeedback', 'disabled'),
  PAYMENT_VALUE_STRIP: getAbtestConfig('payment.trust', 'disabled'),
  CONFIRMATION_REDESIGN_SCRATCH: getAbtestConfig(
    'confirmation.redesign',
    'disabled'
  ),
  CONFIRMATION_SAVING_INSIDER: getAbtestConfig(
    'orderconfirmation.saving.insider',
    'disabled'
  ),
  CONFIRMATION_TOTAL_SAVINGS: getAbtestConfig(
    'confirmation.totalSavings',
    'disabled'
  ),
  TRY_N_BUY_POSITION: getAbtestConfig('address.TnBPosition', 'disabled'),
  NEW_USER_TRY_BUY: getAbtestConfig('newuser.trynbuy', 'disabled'),
  EARLYBIRD_AB: getAbtestConfig('earlybird.ab', '0', { isAppOnly: false }),
  URGENCY_AB: getAbtestConfig('urgency.ab', '0', { isAppOnly: false }),
  EXPRESS_DELIVERY: getAbtestConfig('expressdelivery', 'disabled', {
    isAppOnly: false
  }),
  CART_FILLER: getAbtestConfig('checkout.cart.filler', 'default', {
    isAppOnly: false
  }),
  SHIPPING_ESTIMATE_CHANGE: getAbtestConfig('tat.change', 'disabled'),
  CART_NEW_USER_PROPOSITIONS: getAbtestConfig('cart.newusers', 'disabled'),
  FREE_SHIPPING: getAbtestConfig('cart.fsexp', '', { isAppOnly: false }), //VariantA - Shipping Charge 1, VariantB- Shipping charge 2
  SIZE_FIT: getAbtestConfig('sizefit', ''),
  EXPRESS_CHECKOUT: getAbtestConfig('cart.expressCheckout', 'disabled'),
  CHECKOUT_CTA_TEXT: getAbtestConfig('cart.cta', 'disabled'),
  PAYMENT_FAILURE_HALFCARD: getAbtestConfig('payment.failure', 'disabled'),
  CART_GROUPED_SORTED: getAbtestConfig('cart.sort', 'nogroupnosort'),
  RETURN_POLICY_MESSAGE: getAbtestConfig('cart.returnpolicy', 'disabled'), // VariantA - `oncard`; VariantB - `onstrip`
  CONFIRMATION_REDESIGN: getAbtestConfig('confirmation.redesign', 'disabled'),
  CART_MERGE: getAbtestConfig('checkout.cartmerge', 'disabled', {
    isAppOnly: false
  }),
  RETURN_POLICY_FOR_NEW_USER: getAbtestConfig(
    'checkout.cart.returnPolicyNewUser',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  DAYS_TO_DELIVERY: getAbtestConfig('address.deliveryday', 'disabled'),
  BANK_OFFERS: getAbtestConfig('cart.visualoffers', 'disabled'),
  CHECKOUT_COD_SUGGESSTION_THRESHOLD: getAbtestConfig(
    'checkout.podhighlight',
    'disabled'
  ),
  RECOMMENDED_OPTIONS: getAbtestConfig(
    'checkout.payments.recommended.v2',
    'disabled',
    {
      isAppOnly: false
    }
  ),
  GPAY_ABOVE_PHONEPE: getAbtestConfig('checkout.upi.gpayfirst', 'disabled'),
  CONFIRMATION_CROSS_SELL: getAbtestConfig(
    'orderConfirmation.crossSell',
    'disabled'
  ),
  ADDRESS_SUGGESTION: getAbtestConfig(
    'checkout.address.suggestion',
    'disabled',
    { isAppOnly: false }
  ),
  CART_MESSAGING_REVAMP: getAbtestConfig('checkout.cartMessaging', 'disabled', {
    isAppOnly: false
  }),
  GIFTCARD_V2: getAbtestConfig('giftcardui.v2', 'disabled', {
    isAppOnly: false
  }),
  PRIVACY_POLICY: getAbtestConfig('checkout.privacy.policy', 'disabled', {
    isAppOnly: false
  }),
  NEW_USER_COD_NUDGE: getAbtestConfig('payment.highlightCodNu', 'disabled'),
  CART_TRUST_AND_SAFETY_MARKER: getAbtestConfig(
    'checkout.cartTrustNSafetyMarker',
    'disabled',
    {
      isAppOnly: false
    }
  ),
  CHECKOUT_DONATION: getAbtestConfig('checkout.donation', 'disabled', {
    isAppOnly: false
  }),
  CHECKOUT_ADDRESS_ON_CART_V2: getAbtestConfig(
    'cart.addressoncartv2',
    'variant1',
    {
      isAppOnly: false
    }
  ),
  CHECKOUT_SHARE: getAbtestConfig('checkout.share', 'disabled', {
    isAppOnly: false
  }),
  EXPIRY_BPC: getAbtestConfig('pdp.expiry.date', 'disabled', {
    isAppOnly: false
  }),
  ADDRESS_LANDMARK: getAbtestConfig('address.landmark', 'disabled', {
    isAppOnly: false
  }),
  PAYMENT_OPTION_REORDER: getAbtestConfig(
    'checkout.paymentOptions.reorderFirstTimeUser',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  PAYMENT_OPTION_REORDERV2: getAbtestConfig(
    'checkout.paymentOptions.reorderv2',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  PAY_VIA_SUPERCOINS: getAbtestConfig(
    'checkout.paymentOptions.supercoinscredit',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  PAY_VIA_SUPERCOINS_NON_INSIDER: getAbtestConfig(
    'checkout.paymentOptions.SCCreditNonInsider',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  CART_WISHLIST: getAbtestConfig('cart.wishlist.priceDropped', 'disabled', {
    isAppOnly: true
  }),
  LOW_SR_OPTIONS_REMOVE: getAbtestConfig('payment.lowsroptions', 'disabled', {
    isAppOnly: false
  }),
  CART_STRIKE_OFF_MRP: getAbtestConfig('Cart.strikeoffMRP', 'disabled'),
  MEXPRESSPLUS_TAG: getAbtestConfig('Search.Mexpress.Plus', 'VariantB', {
    isAppOnly: false
  }),
  AUTO_APPLY_COUPON: getAbtestConfig(
    'cart.newusercoupon.autoapplication',
    'disabled',
    {
      isAppOnly: true
    }
  ),
  DISCOUNT_EXPIRY_TIMER: getAbtestConfig(
    'cart.discount.expirytimer',
    'disabled',
    {
      isAppOnly: false
    }
  ),
  DOPE_SYSTEM_CONSENT: getAbtestConfig(
    'checkout.dope.systemconsent',
    'disabled',
    {
      isAppOnly: false
    }
  ),
  FINE_JWELLERY_RETURN: getAbtestConfig('finejwellery.return', 'disabled'),
  CART_OOS_SIMILAR: getAbtestConfig('cart.oos.similar', 'disabled', {
    isAppOnly: false
  }),
  CART_INSIDER_PROGRESS: getAbtestConfig('cart.insiderProgress', 'disabled', {
    isAppOnly: true
  }),
  VISUAL_OFFER: getAbtestConfig('bankoffer.checkout', 'disabled'),
  COUPON_NUDGES: getAbtestConfig('cart.coupon.nudges', 'disabled', {
    isAppOnly: false
  }),
  INLINE_OFFER: getAbtestConfig('checkout.payment.inline.offer', 'disabled'),
  ORDER_REVIEW: getAbtestConfig('checkout.payments.reviewcart', 'disabled'),
  CHECKOUT_STEPS_MWEB: getAbtestConfig('checkout.steps.mweb', 'disabled', {
    isAppOnly: false
  }),
  RATING_WIDGET: getAbtestConfig('ocp.ratingwidget', 'disabled')
};

module.exports = {
  getAbtest,
  abtestMap,
  getXMyntraABTestHeader
};
