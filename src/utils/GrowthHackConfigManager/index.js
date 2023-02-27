/*
Usage Example:
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
const expressDeliveryConfig = getGrowthHackConfigValue('EXPRESS_DELIVERY');
*/

const isBrowser = typeof window !== 'undefined';
const get = require('lodash/get');

const getGrowthHackConfigValue = (key, req) => {
  let value = null;
  let ghMap = isBrowser
    ? get(window, '_checkout_.__myx_growthhack__', null)
    : get(req, 'myx.growthhack', null);

  const config = GrowthHackConfigMap[key];
  if (config) {
    value = get(ghMap, `${config.key}`, config.defaultValue);
  }

  if (value && typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch (err) {}
  }
  return value;
};

const getGrowthHackConfigObject = (key, defaultValue) => ({
  key,
  defaultValue
});

const GrowthHackConfigMap = {
  SCRATCHCARD_CONFIG: getGrowthHackConfigObject('scratchCardRetentionConfig', {
    scratchCardEnable: false,
    featureTag: 'PS0_PS4',
    themes: [
      'https://assets.myntassets.com/assets/images/2022/3/11/d797b8a5-e708-4c4c-9c3d-8bb4c95ed5a31646997301271-sc_theme_1.png',
      'https://assets.myntassets.com/assets/images/2022/3/11/0fbe01fa-5000-4dce-bbfa-5124f66231061646997342052-sc_theme_4.png',
      'https://assets.myntassets.com/assets/images/2022/3/11/389704cc-abd7-4c50-9ecd-6e7c5d86ddea1646997342045-sc_theme_3.png',
      'https://assets.myntassets.com/assets/images/2022/3/11/bc35c9e6-75a0-48a4-9cb0-de947400b0441646997342038-sc_theme_2.png'
    ],
    eors:
      'https://assets.myntassets.com/assets/images/2022/3/17/e9203abc-e096-47a8-93d5-dfe249e5e33e1647502682245-sc_eors_theme.png',
    stringLiterals: {
      SHOP: 'SHOP & REDEEM',
      KNOW_MORE: 'KNOW MORE ABOUT THE REWARD',
      SECONDARY_TEXT: 'OKAY',
      ERROR_DESCRIPTION:
        'There seems to be some problem revealing your reward. Please try after some time again.',
      COUPON_EMPTY: "Don't worry! There's always another chance",
      WELL_DONE: 'Well done!',
      ALREADY_CLAIMED: 'You have already claimed this reward',
      REWARD_EXPIRED: 'This reward has expired',
      UNLOCKED_CARD: "You've unlocked a scratch card",
      SCRATCH_NOW: 'Scrach now!',
      SCRUB: 'Scrub on the card to scratch it',
      TOAST: 'Coupon copied',
      ERROR: 'Something Went Wrong',
      BETTER_LUCK: 'Better luck next time',
      YOUR_CODE: 'Your coupon code',
      CLAIMED: 'Claimed',
      EXPIRED: 'Expired',
      COPY: 'Copy',
      EXPIRED_ON: 'Expired On',
      VALID_TILL: 'Valid till',
      TC: 'T&C apply'
    }
  }),
  PAYMENT_TRUST_BANNER_URL: getGrowthHackConfigObject(
    'payment.trustBannerUrl',
    'https://constant.myntassets.com/checkout/assets/img/paymentTrustBanner.png'
  ),
  FOMO_INVENTORY_THRESHOLD: getGrowthHackConfigObject(
    'checkout.fomoInventoryThreshold',
    4,
    4
  ),
  POSITIVE_REINFORCEMENT: getGrowthHackConfigObject('positiveReinforcement', {
    threshold: 1000,
    percentileLookup: [
      {
        percentile: 98,
        bucket: 2
      },
      {
        percentile: 95,
        bucket: 5
      },
      {
        percentile: 90,
        bucket: 10
      }
    ]
  }),
  SAVINGS_FEEDBACK: getGrowthHackConfigObject('savingsFeedback', {
    savingsCTA: 'You are <b>saving</b> ${amount} on this order'
  }),
  CART_FREE_SHIPPING_TEMPLATE: getGrowthHackConfigObject(
    'cartFreeShippingTemplate',
    {
      repeatUserMessage: 'Yay! {highlightedText} {price} on this order',
      newUserMessage: 'Yay! {highlightedText} {price} on your first order',
      highlightedText: 'No convenience fee'
    }
  ),
  EXPRESS_DELIVERY: getGrowthHackConfigObject(
    'expressDelivery',
    '{"threshold":0,"pincodes":{},"defaultTatChange":0,"promisedTatChange":{},"skipPincodeCheck":false}'
  ),
  STRIKED_MRP: getGrowthHackConfigObject(
    'strikedMrp',
    '{"showOnCart":false,"showOnAddress":false,"showOnPayments":false}'
  ),
  SHOP_MORE_CAROUSEL: getGrowthHackConfigObject('shopMorePills', []),
  CHECKOUT_CTA: getGrowthHackConfigObject(
    'checkoutCTAText',
    '{"cartCTAText": "PLACE ORDER", "addressCTAText": "CONTINUE"}'
  ),
  XPRESS_LOYALTY_CONV: getGrowthHackConfigObject('lpMaxPercentOfCart', 20),
  XPRESS_CHECKOUT_CONFIG: getGrowthHackConfigObject('expressCheckout', {
    xpressCartCTA: 'PLACE ORDER',
    arrivalInfoForMulti: 'Items will start arriving from',
    arrivalInfoForSingle: 'Get it by',
    walletPriority: [
      {
        id: 3,
        name: 'PayPal'
      },
      {
        id: 43,
        name: 'Airtel Money'
      },
      {
        id: 69,
        name: 'PayZapp'
      },
      {
        id: 46,
        name: 'Mobikwik'
      },
      {
        id: 2,
        name: 'Paytm'
      },
      {
        id: 67,
        name: 'FreeCharge'
      }
    ]
  }),
  SCRATCH_CARD_TC: getGrowthHackConfigObject('scratchCardTnCText', ''),
  SAVINGS_STRIP_CONFIG: getGrowthHackConfigObject('checkoutSavingsStrip', {
    stripThreshold: 200,
    textThreshold: 400,
    includeShipping: true,
    visibility: {
      cart: true,
      address: true,
      payment: true
    },
    preThresholdText: 'You are saving {cart_savings} on this order.',
    postThresholdText: 'Awesome! You are saving {cart_savings} on this order.',
    paymentInvisibilitySavingsText: 'You save {cart_savings} on this order.'
  }),
  PAYMENT_FAILURE_HALFCARD_CONFIG: getGrowthHackConfigObject(
    'paymentFailureHalfcard',
    {
      threshold: 1,
      text:
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
    },
    {}
  ),
  CONFIRMATION_CROSS_SELL_CONFIG: getGrowthHackConfigObject(
    'confirmationCrossSell',
    {
      title: 'Recomendations for your next order',
      desc: 'Pair your purchased item with these curated items'
    }
  ),
  CART_OOS_BULK_WISHLIST: getGrowthHackConfigObject('oosBulkWishlistConfig', {
    stripCopy: 'Items Out Of Stock',
    hcHeading: 'Move Out Of Stock Items',
    hcCopy:
      'Item(s) in your bag are out of stock. Please move them from bag to proceed.'
  }),
  NEW_USER_COD_NUDGE: getGrowthHackConfigObject('newUserCodNudge', {
    text: ''
  }),
  CART_VIEWS: getGrowthHackConfigObject(
    'cart.views',
    {
      minLimit: 20,
      cartViewText: 'People viewing now'
    },
    {}
  ),
  COUPON_EXPIRY: getGrowthHackConfigObject(
    'cart.couponExpiry.config',
    {
      maximumTime: 24
    },
    {}
  ),
  CART_WISHLIST_LIMIT: getGrowthHackConfigObject(
    'checkout.cart.wishlistLimit',
    2,
    2
  )
};

module.exports = {
  GrowthHackConfigMap,
  getGrowthHackConfigValue
};
