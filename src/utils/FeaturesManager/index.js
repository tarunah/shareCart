/*
Usage Example:
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
const test = isFeatureEnabled('COD_CAPTCHA', options);
*/

const get = require('lodash/get');
const getKVPairValue = require('../KVPairManager').getKVPairValue;
const getAbtest = require('../abtestManager').getAbtest;
const cookieKeys = require('../constants').cookieKeys;
const isGiftcardContext = require('../helper').isGiftcardContext;
const getAppVersionFromXMA = require('../helper').getAppVersionFromXMA;
const isBrowser = typeof window !== 'undefined';

const isMobile = options => {
  return isBrowser
    ? get(window, '_checkout_.__myx_deviceData__.isMobile')
    : get(options, 'req.myx.deviceData.isMobile');
};

const isDesktopSite = options => {
  return isBrowser
    ? get(window, '_checkout_.__myx_deviceData__.isDesktop')
    : get(options, 'req.myx.deviceData.isDesktop');
};
const isApp = req => {
  return isBrowser
    ? get(window, '_checkout_.__myx_deviceData__.isApp', false)
    : get(req, 'myx.apps.isApp', false);
};

const isAndroidApp = args => {
  return isBrowser
    ? get(window, '_checkout_.__myx_deviceData__.isAndroid', false)
    : get(args, 'req.myx.apps.android', false);
};

const isIosApp = args => {
  return isBrowser
    ? get(window, '_checkout_.__myx_deviceData__.isIOS', false)
    : get(args, 'req.myx.apps.ios', false);
};

const getCookie = name => {
  const cookiePrefix = get(window, '_checkout_.__myx_env__.cookie.prefix', '');
  const cookieName = cookiePrefix + name;
  const cookies = document && document.cookie.split(';');
  const cookie = cookies.find(
    cookie => cookie.split('=')[0].trim() === cookieName
  );
  return cookie && decodeURIComponent(cookie.split('=')[1]);
};

const isLoggedIn = () => {
  return isBrowser && getCookie(cookieKeys.IS_LOGGED_IN) === 'true';
};

const getUidx = () => {
  return isBrowser && get(window, '_checkout_.__myx_profile__.uidx');
};

const isSaleTimerEnabled = ({ type }) => {
  const checkoutSBData = getKVPairValue('CHECKOUT_SB_DATA');
  return (
    checkoutSBData.enable === 'true' &&
    get(checkoutSBData, `page.${type}`, '0') === '1'
  );
};

const isUserSizeProfilesEnabled = options => {
  return isMobile(options) && isFeatureOn(options);
};

const isPaymentValueStripEnabled = () => {
  return (
    isApp() &&
    !isGiftcardContext() &&
    getAbtest('PAYMENT_VALUE_STRIP') === 'enabled'
  );
};

const savingsFeedback = () => {
  return isApp() && getAbtest('SAVINGS_FEEDBACK') === 'enabled';
};

const isNewUserPaymentBannerV2 = () => {
  return isApp() && getAbtest('NEW_USER_PAYMENT_BANNER_V2') === 'enabled';
};

const isPaymentTrustBanner = () => {
  return isApp() && getAbtest('PAYMENT_TRUST_MSG_BANNER') === 'enabled';
};

const isSavingsNudge = () => {
  return isApp() && getAbtest('CHECKOUT_SAVINGS_NUDGE') === 'enabled';
};

const isCartPositiveReinforcement = () => {
  return isApp() && getAbtest('CART_POSITIVE_REINFORCEMENT') === 'enabled';
};

const isCartShowCouponEnabled = () => {
  return isApp() && getAbtest('CART_SHOW_COUPON') === 'enabled';
};

const cartFillerDefault = args => {
  return isFeatureOn(args) && getAbtest('CART_FILLER') === 'default';
};

const cartWishlist = args => {
  const req = get(args, 'req', {});
  return (
    (isLoggedIn() || get(req, 'myx.profile.uidx')) &&
    isApp(req) &&
    isFeatureOn(args) &&
    getAbtest('CART_WISHLIST', req) === 'enabled'
  );
};

const isConfirmationRedesignVariantScratch = ({ req }) => {
  return (
    isApp(req) &&
    getAbtest('CONFIRMATION_REDESIGN_SCRATCH', req) === 'modularscratch'
  );
};

const isConfirmationSavingInsider = ({ req }) => {
  return (
    isApp(req) &&
    getAbtest('CONFIRMATION_SAVING_INSIDER', req) === 'enabled' &&
    !isConfirmationTotalSavingsEnabled()
  );
};

const isConfirmationInsiderSuperCoin = args => {
  const checkoutSBData = getKVPairValue('CONFIRMATION_PAGE_CONFIG');
  return get(checkoutSBData, 'insiderSuperCoin.enabled');
};

const isInsiderTrialEnabled = args => {
  const checkoutData = getKVPairValue('CONFIRMATION_PAGE_CONFIG');
  return get(checkoutData, 'insiderSuperCoin.insiderTrials.enabled');
};

const isConfirmationTotalSavingsEnabled = () => {
  return isApp() && getAbtest('CONFIRMATION_TOTAL_SAVINGS') === 'enabled';
};

const isTryNBuyPositionEnabled = () => {
  const tryNBuyPositionAB = getAbtest('TRY_N_BUY_POSITION');
  return (
    isApp() &&
    ['abovepricing', 'belowpricing'].indexOf(tryNBuyPositionAB) !== -1
  );
};

const isPaymentSavingsCalloutEnabled = () => {
  const isPaymentSavingsCalloutAb = getAbtest('PAYMENT_SAVINGS_CALLOUT');
  return (
    isApp() &&
    ['sticky_bottom', 'above_pricing'].indexOf(isPaymentSavingsCalloutAb) !==
      -1 &&
    isPaymentSavingsCalloutAb
  );
};

const showPaymentFailureHalfCard = () => {
  return (
    isApp() &&
    !isGiftcardContext() &&
    getAbtest('PAYMENT_FAILURE_HALFCARD') === 'enabled'
  );
};

const isNewUserTnbABEnabled = ({ req }) => {
  return isApp(req) && getAbtest('NEW_USER_TRY_BUY') === 'enabled';
};

const showExpressDelivery = ({ req }) => {
  return isApp(req) && getAbtest('EXPRESS_DELIVERY') === 'express.delivery';
};

const showShippingEstimateChange = ({ req }) => {
  return isApp(req) && getAbtest('SHIPPING_ESTIMATE_CHANGE') === 'enabled';
};

const showCheckoutSteps = () => {
  return isApp() && !isGiftcardContext();
};

const showCheckoutStepsMweb = args => {
  return (
    isFeatureOn(args) &&
    getAbtest('CHECKOUT_STEPS_MWEB') === 'enabled' &&
    !isGiftcardContext()
  );
};

const isBankOffersEnabled = () => {
  return isApp() && getAbtest('BANK_OFFERS') === 'enabled';
};

const showNewUserPropositions = () => {
  return isApp() && getAbtest('CART_NEW_USER_PROPOSITIONS') === 'enabled';
};

const showFreeDeliveryMessage = req => {
  return !isGiftcardContext({ req });
};

const showCouponNudge = args => {
  const { req } = args;
  return isApp(req) && !isGiftcardContext({ req }) && isFeatureOn(args);
};

const showCartCredit = args => {
  const { req } = args;
  return !isGiftcardContext({ req }) && isFeatureOn(args);
};

const showEmptyCartFeed = args => {
  const { req } = args;
  return isApp(req) && isFeatureOn(args);
};

const showExpressCheckout = args => {
  const { req } = args;
  return (
    isApp(req) &&
    !isGiftcardContext({ req }) &&
    isFeatureOn(args) &&
    getAbtest('EXPRESS_CHECKOUT') === 'enabled' &&
    isAddressOnCartEnabledV2({ ...args, key: 'ADDRESS_ON_CART_V2' })
  );
};

const showInsiderPointsMessage = args => {
  const { req } = args;
  return (
    isLoggedIn() &&
    !!getUidx() &&
    isApp(req) &&
    !isGiftcardContext({ req }) &&
    isFeatureOn(args)
  );
};

const showCTAConfig = () => {
  return isApp() && getAbtest('CHECKOUT_CTA_TEXT') === 'enabled';
};

const showReturnPolicyOnItemCard = ({ req }) => {
  return isApp(req) && getAbtest('RETURN_POLICY_MESSAGE') === 'oncard';
};

const showReturnPolicyOnInfoStrip = ({ req }) => {
  return isApp(req) && getAbtest('RETURN_POLICY_MESSAGE') === 'onstrip';
};

const showReturnPolicyOnNewUser = args => {
  const { req } = args;
  return (
    isApp(req) &&
    isFeatureOn(args) &&
    getAbtest('RETURN_POLICY_FOR_NEW_USER') === 'enabled'
  );
};

const isPrefetchAddressEnabled = args => {
  return isFeatureOn(args) && isLoggedIn() && !isApp();
};

const isCODFallbackEnabled = args =>
  isFeatureOn(args) && !isGiftcardContext({ req: args.req });

const showCouponAggregationBanner = args => {
  return (
    isFeatureOn(args) && !getCookie(cookieKeys.COUPON_AGGREGATION_BANNER_VIEWED)
  );
};

const isConfirmationCrossellEnabled = () => {
  return (
    isApp() &&
    !isGiftcardContext() &&
    getAbtest('CONFIRMATION_CROSS_SELL') === 'enabled'
  );
};

const isCheckoutDonationEnabled = args => {
  const req = get(args, 'req', {});
  const abVariant = getAbtest('CHECKOUT_DONATION', req);
  return (
    (abVariant === 'autoApply' || abVariant === 'enabled') && isFeatureOn(args)
  );
};

const isDaysToDeliveryEnabled = () => {
  return isApp() && getAbtest('DAYS_TO_DELIVERY') === 'enabled';
};

const isRecommendedOptionsEnabled = args => {
  const recommendedOptionsAB = getAbtest('RECOMMENDED_OPTIONS');
  return (
    isFeatureOn(args) &&
    !isGiftcardContext() &&
    [
      'enabled',
      'enabledautoselect',
      'recootheroption',
      'recootheroptionautoselect'
    ].indexOf(recommendedOptionsAB) != -1
  );
};

const isOrderReviewEnabled = args => {
  const req = get(args, 'req') || {};
  const orderReviewAB = getAbtest('ORDER_REVIEW', req);
  return (
    isFeatureOn(args) &&
    ['enabled', 'enabledPrice'].indexOf(orderReviewAB) != -1
  );
};

const isConfirmationRedesignEnabled = () => {
  return isApp() && getAbtest('CONFIRMATION_REDESIGN') === 'enabled';
};

const isAddressOnCartEnabledV2 = args => {
  return (
    isFeatureOn(args) &&
    !isGiftcardContext(args) &&
    getAbtest('CHECKOUT_ADDRESS_ON_CART_V2', args.req) !== 'disabled'
  );
};

const isSizePreferencesEnabled = args => {
  const appVersion = getAppVersionFromXMA();
  return (
    isFeatureOn(args) &&
    ((isAndroidApp(args) && appVersion >= '4.2011') ||
      (isIosApp(args) && appVersion >= '4.2101'))
  );
};

const isRatingWidgetEnbabled = args => {
  return getAbtest('RATING_WIDGET') === 'enabled';
};

const isAddressLocationSuggestionEnabled = args => {
  const isApp = get(window, '_checkout_.__myx_deviceData__.isAndroid', false);
  const isPWA =
    get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'mobile';
  const isAddressSuggestionEnabled =
    isFeatureOn(args) && getAbtest('ADDRESS_SUGGESTION') === 'enabled';
  const addressSuggestionConfig = getKVPairValue('ADDRESS_SUGGESTION_CONFIG');
  if (
    isAddressSuggestionEnabled &&
    window.navigator &&
    window.navigator.geolocation
  ) {
    if (isApp) {
      return (
        get(addressSuggestionConfig, 'android', '') === 'enabled' &&
        getAppVersionFromXMA() >=
          get(addressSuggestionConfig, 'android_version', '')
      );
    } else if (isPWA) {
      return get(addressSuggestionConfig, 'pwa', '') === 'enabled';
    }
  }
  return false;
};

const isConfirmationCouponBannerEnabled = () => {
  const couponConfig = getKVPairValue('CONFIRMATION_COUPON_BANNER');
  return !isGiftcardContext() && get(couponConfig, 'enable');
};

const isCartMessageRevampEnabled = args =>
  isFeatureOn(args) && getAbtest('CART_MESSAGING_REVAMP') === 'enabled';

const isGiftCardV2Enabled = () => {
  return isGiftcardContext() && getAbtest('GIFTCARD_V2') === 'enabled';
};

const isPrivacyPolicyEnabled = () => {
  return getAbtest('PRIVACY_POLICY') === 'enabled';
};
const isNewUserCodNudgeEnabled = () => {
  return isApp() && getAbtest('NEW_USER_COD_NUDGE') === 'enabled';
};

const isSameOriginGatewayEnabled = args => {
  return isBrowser && isFeatureOn(args);
};

const isDopeEnabled = args => isFeatureOn(args) && !isGiftcardContext();

const isDopeSystemConsentEnabled = () => {
  return (
    !isGiftcardContext() && getAbtest('DOPE_SYSTEM_CONSENT') !== 'disabled'
  );
};

const isDopeWithUserConsentEnabled = args => {
  return (
    !isDopeSystemConsentEnabled() && isFeatureOn(args) && !isGiftcardContext()
  );
};

const isTrustNSafetyMarkerEnabled = () =>
  getAbtest('CART_TRUST_AND_SAFETY_MARKER') === 'enabled';

const isCheckoutShareEnabled = args => {
  return isFeatureOn(args) && getAbtest('CHECKOUT_SHARE') === 'enabled';
};

const isLandmarkEnabled = args => {
  return isFeatureOn(args) && getAbtest('ADDRESS_LANDMARK') === 'enabled';
};

const isSpaEnabled = args => {
  const spaConfig = getKVPairValue('ANDROID_SPA');
  if (isAndroidApp(args)) {
    const appVersion = getAppVersionFromXMA(get(args, 'cookies'));
    return isFeatureOn(args) && appVersion >= spaConfig.enabledVersion;
  }
  return true;
};

const isExpiryBPCEnabled = args => {
  return isFeatureOn(args) && getAbtest('EXPIRY_BPC') === 'enabled';
};

const isPaymentOptionReorderEnabled = args =>
  isApp() &&
  isFeatureOn(args) &&
  getAbtest('PAYMENT_OPTION_REORDER') === 'enabled';

const isPaymentOptionReorderV2Enabled = args => {
  const paymentOptionReorderV2Ab = getAbtest('PAYMENT_OPTION_REORDERV2');
  return (
    isFeatureOn(args) &&
    paymentOptionReorderV2Ab &&
    ['accordionclosed', 'accordionopen'].indexOf(paymentOptionReorderV2Ab) !==
      -1
  );
};

const isPaymentStrikeOffMrpEnabled = () => {
  return isApp() && getAbtest('PAYMENT_STRIKE_OFF_MRP') === 'enabled';
};

const isPaymentIconRevampEnabled = () => {
  return isApp() && getAbtest('PAYMENT_ICON_REVAMP') === 'enabled';
};

const showFirstTimeUserAutoFill = args => {
  return (
    isFeatureOn(args) && getAbtest('ADDRESS_AUTOFILL_NEW_USER') === 'enabled'
  );
};

const isAddressOrderNowEnabled = () => {
  const AddressOrderNowAB = getAbtest('ADDRESS_DELIVERY_ORDER_NOW');
  return (
    isApp() &&
    ['orderNowStart', 'orderNowEnd'].indexOf(AddressOrderNowAB) !== -1 &&
    AddressOrderNowAB
  );
};

const isLowSROptionRemoveEnabled = () => {
  return getAbtest('LOW_SR_OPTIONS_REMOVE') === 'enabled';
};
const isCartStrikeOffMRPEnabled = () =>
  isApp() && getAbtest('CART_STRIKE_OFF_MRP') === 'enabled';

const isImageCachingEnabled = args => {
  return !isIosApp(args) && isFeatureOn(args);
};

const isCouponAwarenessEnabled = args => {
  return (
    isFeatureOn(args) && getAbtest('AUTO_APPLY_COUPON', args.req) === 'enabled'
  );
};

const isRetentionCouponEnabled = args => {
  return (
    isFeatureOn(args) &&
    getAbtest('RETENTION_COUPON_AB', args.req) === 'enabled'
  );
};

const isSocialProofingEnabled = args => {
  return isFeatureOn(args);
};

const isGpayAbovePhonepeEnabled = args => {
  return getAbtest('GPAY_ABOVE_PHONEPE') === 'enabled';
};

const isNamogoIntegrationForPWA = args => {
  return (
    isFeatureOn(args) && isMobile(args) && !isDesktopSite(args) && !isApp(args)
  );
};
const isCardOOSSimilarEnabled = args => {
  return getAbtest('CART_OOS_SIMILAR') === 'enabled';
};

const isScratchCardEnabled = () => {
  return (
    (isAndroidApp() || (isIosApp() && getAbtest('RATING_WIDGET'))) &&
    get(
      window,
      '_checkout_.__myx_growthhack__.scratchCardRetentionConfig.scratchCardEnable',
      false
    )
  );
};

const isSampleSelectorEnabled = () => {
  const { androidVersion, iosVersion } = getKVPairValue('SAMPLE_SELECTOR');
  const isPWA =
    get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'mobile';
  const isDesktop =
    get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'desktop';
  const appVersion = getAppVersionFromXMA();
  return (
    (isAndroidApp() && appVersion >= androidVersion) ||
    (isIosApp() && appVersion >= iosVersion) ||
    isPWA ||
    isDesktop
  );
};

const isStyleCappingEnabled = args => {
  return isLoggedIn() && isFeatureOn(args);
};

const isMexpressPlusTagEnabled = args => {
  const ENABLED_VARIANTS = ['VariantA', 'VariantB', 'VariantC'];
  const { platformConfig = {} } = getKVPairValue('MEXPRESSPLUS_CONFIG');
  const isPWA =
    get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'mobile';
  const isDesktop =
    get(window, '_checkout_.__myx_deviceData__.deviceChannel') === 'desktop';
  const platformEnabled =
    (isApp() && !!platformConfig.app) ||
    (isPWA && !!platformConfig.mweb) ||
    (isDesktop && !!platformConfig.desktop);
  return (
    platformEnabled &&
    (isFeatureOn(args) ||
      ENABLED_VARIANTS.indexOf(getAbtest('MEXPRESSPLUS_TAG')) !== -1)
  );
};

const isDiscountTimerEnabled = args => {
  return getAbtest('DISCOUNT_EXPIRY_TIMER') === 'enabled';
};

const isSingleServerEnabled = () => {
  return isBrowser && getCookie(cookieKeys.SINGLE_SERVER_ROOT) === 'true';
};

const isAuthnzEnabled = args => {
  return process.env.NODE_ENV !== 'development' && isFeatureOn(args);
};

const captchaLengthValue = args => {
  return isFeatureOn({ ...args, returnValue: true });
};

const isNewrelicEnabled = args => {
  return get(process, 'env.NEW_RELIC_ENABLE_CHECKOUT_NEW') && isFeatureOn(args);
};

const isFineJwelleryReturnEnabled = args => {
  return getAbtest('FINE_JWELLERY_RETURN') === 'enabled';
};

const isSuperCoinsEnabled = args => {
  const enabledVariants = ['variantA', 'variantB'];
  const insiderBucket = getAbtest('PAY_VIA_SUPERCOINS');
  const nonInsiderBucket = getAbtest('PAY_VIA_SUPERCOINS_NON_INSIDER');
  const isABEnabled =
    enabledVariants.indexOf(insiderBucket) > -1 ||
    enabledVariants.indexOf(nonInsiderBucket) > -1;
  return isApp() && isFeatureOn(args) && isABEnabled;
};

const isCartInsiderProgressEnabled = args => {
  const { req } = args;
  return (
    isApp() &&
    isLoggedIn() &&
    !isGiftcardContext({ req }) &&
    isFeatureOn(args) &&
    getAbtest('CART_INSIDER_PROGRESS') === 'enabled'
  );
};

const isVisualOffersEnabled = () => {
  return getAbtest('VISUAL_OFFER') === 'enabled';
};

const isCouponNudgesEnabled = () => {
  return getAbtest('COUPON_NUDGES') === 'enabled';
};

const isInlineOfferEnabled = args => {
  return isFeatureOn(args) && getAbtest('INLINE_OFFER') === 'enabled';
};

// Function to get the feature gate value
const isFeatureOn = ({ key, req, returnValue = false }) => {
  let value = null;
  let featureGates = isBrowser
    ? get(window, '_checkout_.__myx_features__', null)
    : get(req, 'myx.features', null);

  const config = FeaturesMap[key];
  if (config) {
    value = get(featureGates, `${config.key}`, config.defaultValue);
  }

  if (returnValue) {
    return value;
  }

  return value === 'true' || value === true;
};

const getFgConfigObject = (key, defaultValue, callback) => ({
  key,
  defaultValue,
  callback // Function to check if feature is enabled
});

/*
  Map that holds the config for each of the feature.
  Eg. FeaturesMap = {
    KEY: -> This is to be passed to 'isFeatureEnabled' fn
      getFgConfigObject(
        key, -> Real key stored in featureGates map
        defaultValue, -> Default Value
        callback -> Function to be called to get if the feature is enabled
      )
    }
  }
*/
const FeaturesMap = {
  RETENTION_COUPONS: getFgConfigObject(
    'checkout.couponRetention.enabled',
    false,
    isRetentionCouponEnabled
  ),
  SCRATCHCARD_RETENTION: getFgConfigObject('', false, isScratchCardEnabled),
  PAYMENT_ICON_REVAMP: getFgConfigObject('', false, isPaymentIconRevampEnabled),
  PAYMENT_SAVE_CARD_AUTO_CONSENT: getFgConfigObject(
    'payments.savedcard.autoconsent',
    false,
    isFeatureOn
  ),
  PAYMENT_STRIKE_OFF_MRP: getFgConfigObject(
    '',
    false,
    isPaymentStrikeOffMrpEnabled
  ),
  ADDRESS_DELIVERY_ORDER_NOW: getFgConfigObject(
    '',
    false,
    isAddressOrderNowEnabled
  ),
  PAYMENT_TRUST_MSG_BANNER: getFgConfigObject('', false, isPaymentTrustBanner),
  PAYMENT_SAVINGS_CALLOUT: getFgConfigObject(
    '',
    false,
    isPaymentSavingsCalloutEnabled
  ),
  CHECKOUT_SAVINGS_NUDGE: getFgConfigObject('', false, isSavingsNudge),
  CART_POSITIVE_REINFORCEMENT: getFgConfigObject(
    '',
    false,
    isCartPositiveReinforcement
  ),
  CART_SHOW_COUPON: getFgConfigObject('', false, isCartShowCouponEnabled),
  NEW_USER_PAYMENT_BANNER_V2: getFgConfigObject(
    '',
    false,
    isNewUserPaymentBannerV2
  ),
  COD_CAPTCHA: getFgConfigObject(
    'checkout.codCaptcha.enable',
    true,
    isFeatureOn
  ),
  MFU: getFgConfigObject('mfu.enable', false, isFeatureOn),
  SALE_TIMER: getFgConfigObject('', false, isSaleTimerEnabled),
  COUPON_DISABLED: getFgConfigObject(
    'disableCouponServiceOnCart',
    false,
    isFeatureOn
  ),
  GIFTWRAP: getFgConfigObject('giftwrap.enable', true, isFeatureOn),
  SDD_FESTIVE_OFFER: getFgConfigObject(
    'myntra.sameDayDelivery.festiveoffer',
    false,
    isFeatureOn
  ),
  SDD: getFgConfigObject('myntra.sameDayDelivery.enabled', false, isFeatureOn),
  NDD: getFgConfigObject('myntra.nextDayDelivery.enabled', false, isFeatureOn),
  VALUE_SHIPPING: getFgConfigObject(
    'myntra.valueShipping.enable',
    false,
    isFeatureOn
  ),
  TRY_AND_BUY: getFgConfigObject('paid.trynbuy.enabled', false, isFeatureOn),
  CONFIRMATION_ADDRESSTYPE_ENABLE: getFgConfigObject(
    'confirmation.addressType.enable',
    true,
    isFeatureOn
  ),
  USER_SIZE_PROFILES: getFgConfigObject(
    'userSizeProfilesEnabled',
    true,
    isUserSizeProfilesEnabled
  ),
  SHIPPING_NOTIFICATION: getFgConfigObject(
    'hrdr.shipping.notification',
    false,
    isFeatureOn
  ),
  TRY_N_BUY_POSITION: getFgConfigObject('', false, isTryNBuyPositionEnabled),
  NEW_USER_TRY_BUY: getFgConfigObject('', 'disabled', isNewUserTnbABEnabled),
  PAYMENT_FAILURE_HALFCARD: getFgConfigObject(
    '',
    false,
    showPaymentFailureHalfCard
  ),
  CART_FILLER: getFgConfigObject('checkout.cart.filler', false, isFeatureOn),
  CART_FILLER_DEFAULT: getFgConfigObject(
    'checkout.cart.filler',
    false,
    cartFillerDefault
  ),
  CART_WISHLIST: getFgConfigObject(
    'checkout.cart.wishlist',
    false,
    cartWishlist
  ),
  CONFIRMATION_VIEW_ORDER_DISABLE: getFgConfigObject(
    'confirmation.vieworder.disable',
    false,
    isFeatureOn
  ),
  AUTOGC_ENABLED: getFgConfigObject(
    'checkout.autogc.enabled',
    true,
    isFeatureOn
  ),
  AUTOGC_BALANCE_LAZYLOAD: getFgConfigObject(
    'checkout.autogc.balance.lazyload',
    false,
    isFeatureOn
  ),
  LP_BALANCE_LAZYLOAD: getFgConfigObject(
    'checkout.lp.balance.lazyload',
    false,
    isFeatureOn
  ),
  PAY_VIA_SUPERCOINS: getFgConfigObject(
    'checkout.sccredit.enabled',
    false,
    isSuperCoinsEnabled
  ),
  LP_ENABLED: getFgConfigObject('checkout.lp.enabled', true, isFeatureOn),
  COD_CAPTCHA_ENABLED: getFgConfigObject(
    'checkout.codCaptcha.enable',
    true,
    isFeatureOn
  ),
  COD_FALLBACK_ENABLED: getFgConfigObject(
    'checkout.codFallback.enable',
    false,
    isCODFallbackEnabled
  ),
  SHOW_SHIPPING_ESTIMATE_CHANGE: getFgConfigObject(
    '',
    false,
    showShippingEstimateChange
  ),
  SHOW_EXPRESS_DELIVERY: getFgConfigObject('', false, showExpressDelivery),
  DELIVERY_PREFERENCE: getFgConfigObject(
    'address.deliveryPref',
    false,
    isFeatureOn
  ),
  FIRST_TIME_USER_ADDRESS_AUTOFILL: getFgConfigObject(
    'address.newUserAutoFill.enable',
    false,
    showFirstTimeUserAutoFill
  ),
  TWOFA: getFgConfigObject('checkout.twofaauth.enabled', true, isFeatureOn),
  AUTO_SAVE_CARD: getFgConfigObject(
    'payments.autoSaveCard.enabled',
    false,
    isFeatureOn
  ),
  ATLAS_DISABLED: getFgConfigObject('atlas.disable', false, isFeatureOn),
  COUPON_AGGREGATION_BANNER: getFgConfigObject(
    'checkout.coupons.banner',
    false,
    showCouponAggregationBanner
  ),
  VIEW_RELEVANT_PRODUCT: getFgConfigObject(
    'checkout.coupons.relevantproduct',
    false,
    isFeatureOn
  ),
  SAVINGS_FEEDBACK: getFgConfigObject('', false, savingsFeedback),
  PAYMENT_VALUE_STRIP: getFgConfigObject('', false, isPaymentValueStripEnabled),
  CONFIRMATION_REDESIGN_MODULAR_SCRATCH: getFgConfigObject(
    '',
    false,
    isConfirmationRedesignVariantScratch
  ),
  CONFIRMATION_SAVING_INSIDER: getFgConfigObject(
    '',
    false,
    isConfirmationSavingInsider
  ),
  CONFIRMATION_INSIDER_SUPERCOIN: getFgConfigObject(
    '',
    false,
    isConfirmationInsiderSuperCoin
  ),
  CONFIRMATION_TOTAL_SAVINGS: getFgConfigObject(
    '',
    false,
    isConfirmationTotalSavingsEnabled
  ),
  CONFIRMATION_FALLBACK: getFgConfigObject(
    'confirmation.fallback',
    false,
    isFeatureOn
  ),
  PREFETCH_ADDRESS: getFgConfigObject(
    'checkout.prefetch.address',
    true,
    isPrefetchAddressEnabled
  ),
  COUPON_NUDGE: getFgConfigObject(
    'checkout.upfrontCouponSavings.enable',
    false,
    showCouponNudge
  ),
  CART_CREDIT: getFgConfigObject(
    'cart.creditWidget.enable',
    false,
    showCartCredit
  ),
  FREE_DELIVERY_STRIKE: getFgConfigObject('', false, showFreeDeliveryMessage),
  EXPRESS_CHECKOUT: getFgConfigObject(
    'cart.expressCheckout.enabled',
    false,
    showExpressCheckout
  ),
  RETURN_POLICY_ON_ITEM_CARD: getFgConfigObject(
    '',
    false,
    showReturnPolicyOnItemCard
  ),
  RETURN_POLICY_ON_INFO_STRIP: getFgConfigObject(
    '',
    false,
    showReturnPolicyOnInfoStrip
  ),
  RETURN_POLICY_ON_NEW_USER: getFgConfigObject(
    'checkout.returnPolicyOnNewUser.enable',
    false,
    showReturnPolicyOnNewUser
  ),
  UPI_INTENT_ENABLED: getFgConfigObject(
    'checkout.upi.intent.enabled',
    true,
    isFeatureOn
  ),
  CART_EMPTY: getFgConfigObject(
    'checkout.emptyCartFeed.enable',
    false,
    showEmptyCartFeed
  ),
  CHECKOUT_STEPS: getFgConfigObject('', false, showCheckoutSteps),
  CART_NEW_USER_PROPOSITIONS: getFgConfigObject(
    '',
    false,
    showNewUserPropositions
  ),
  CHECKOUT_STEPS_MWEB: getFgConfigObject(
    'checkout.stepsMweb.enable',
    false,
    showCheckoutStepsMweb
  ),
  CHECKOUT_CTA_TEXT: getFgConfigObject('', false, showCTAConfig),
  CHECKOUT_INSIDER: getFgConfigObject(
    'checkout.insiderPoints.enable',
    false,
    showInsiderPointsMessage
  ),
  NOTIFY_ME: getFgConfigObject(
    'checkout.notifymeSubscription.enable',
    false,
    isFeatureOn
  ),
  CART_SHIPPING_TIP_VISIBLE: getFgConfigObject(
    'checkout.cart.shippingtipvisible',
    false,
    isFeatureOn
  ),
  BANK_OFFERS: getFgConfigObject('', false, isBankOffersEnabled),
  ESSENTIAL_TAG: getFgConfigObject(
    'checkout.essentialTag.enabled',
    false,
    isFeatureOn
  ),
  CONFIRMATION_CROSS_SELL: getFgConfigObject(
    '',
    false,
    isConfirmationCrossellEnabled
  ),
  CHECKOUT_DONATION: getFgConfigObject(
    'checkout.donation',
    false,
    isCheckoutDonationEnabled
  ),
  RED_ZONE: getFgConfigObject('checkout.redzone.enabled', false, isFeatureOn),
  DAYS_TO_DELIVERY: getFgConfigObject('', false, isDaysToDeliveryEnabled),
  ASSETS_ETAG: getFgConfigObject(
    'checkout.assetsetag.enabled',
    false,
    isFeatureOn
  ),
  RECOMMENDED_OPTIONS: getFgConfigObject(
    'checkout.payments.recommended.enabled',
    false,
    isRecommendedOptionsEnabled
  ),
  CONFIRMATION_REDESIGN: getFgConfigObject(
    '',
    false,
    isConfirmationRedesignEnabled
  ),
  ADDRESS_ON_CART_V2: getFgConfigObject(
    'checkout.addressOnCartV2.enabled',
    false,
    isAddressOnCartEnabledV2
  ),
  SIZE_PREFERENCES: getFgConfigObject(
    'checkout.confirmation.sizepreferences',
    false,
    isSizePreferencesEnabled
  ),
  CONFIRMATION_COUPON_BANNER: getFgConfigObject(
    '',
    false,
    isConfirmationCouponBannerEnabled
  ),
  PAYMENT_PREFETCH: getFgConfigObject(
    'checkout.payment.prefetch',
    true,
    isFeatureOn
  ),
  ADDRESS_LOCATION_SUGGESTION: getFgConfigObject(
    'checkout.address.suggestion',
    true,
    isAddressLocationSuggestionEnabled
  ),
  SHOW_GEO_LOCATION_ONLY: getFgConfigObject(
    'checkout.address.suggestionGeoOnly',
    false,
    isFeatureOn
  ),
  SAME_ORIGIN_GATEWAY: getFgConfigObject(
    'checkout.gateway.same.origin',
    true,
    isSameOriginGatewayEnabled
  ),
  HIDE_AVAILABLE_SERVICE_INFO: getFgConfigObject(
    'checkout.cart.hideServiceInfo',
    false,
    isFeatureOn
  ),
  CART_MESSAGING_REVAMP: getFgConfigObject(
    'checkout.cartMessaging.enabled',
    false,
    isCartMessageRevampEnabled
  ),
  GIFTCARD_V2: getFgConfigObject('', false, isGiftCardV2Enabled),
  ATTACHED_PRODUCTS: getFgConfigObject(
    'checkout.attachedProducts.enabled',
    false,
    isFeatureOn
  ),
  DOPE: getFgConfigObject('checkout.dope', false, isDopeEnabled),
  DOPE_USER_CONSENT: getFgConfigObject(
    'checkout.dope.userconsent',
    false,
    isDopeWithUserConsentEnabled
  ),
  DOPE_SYSTEM_CONSENT: getFgConfigObject('', false, isDopeSystemConsentEnabled),
  NEW_USER_COD_NUDGE: getFgConfigObject('', false, isNewUserCodNudgeEnabled),

  CART_TRUST_AND_SAFETY_MARKER: getFgConfigObject(
    '',
    false,
    isTrustNSafetyMarkerEnabled
  ),
  SPA_ENABLED: getFgConfigObject('checkout.android.spa', false, isSpaEnabled),
  PRIVACY_POLICY: getFgConfigObject('', false, isPrivacyPolicyEnabled),
  MA_INSTRUMENTATION: getFgConfigObject(
    'ma.instrumentation.enable',
    true,
    isFeatureOn
  ),
  CART_FILLER_V2: getFgConfigObject(
    'checkout.cartfiller.v2',
    false,
    isFeatureOn
  ),
  CHECKOUT_SHARE: getFgConfigObject(
    'checkout.share.enable',
    false,
    isCheckoutShareEnabled
  ),
  EXPIRY_BPC: getFgConfigObject(
    'checkout.expiry.bpc',
    false,
    isExpiryBPCEnabled
  ),
  BPC_RETURN: getFgConfigObject('checkout.bpc.return', false, isFeatureOn),
  ADDRESS_LANDMARK: getFgConfigObject(
    'address.landmark',
    false,
    isLandmarkEnabled
  ),
  PAYMENT_OPTION_REORDER: getFgConfigObject(
    'checkout.paymentOptions.reorder',
    false,
    isPaymentOptionReorderEnabled
  ),
  PAYMENT_OPTION_REORDERV2: getFgConfigObject(
    'checkout.paymentOptions.reorderv2',
    false,
    isPaymentOptionReorderV2Enabled
  ),
  AUTHNZ: getFgConfigObject('checkout.authnz', true, isAuthnzEnabled),
  CART_ITEM_ORDER_BY: getFgConfigObject(
    'cart.item.orderby',
    false,
    isFeatureOn
  ),
  SPEED_11: getFgConfigObject('cart.speed11', false, isFeatureOn),
  LOW_SR_OPTIONS_REMOVE: getFgConfigObject(
    '',
    false,
    isLowSROptionRemoveEnabled
  ),
  SPEED_11_SHOW_TIME: getFgConfigObject(
    'checkout.speed11.showTime',
    false,
    isFeatureOn
  ),
  CART_STRIKE_OFF_MRP: getFgConfigObject('', false, isCartStrikeOffMRPEnabled),
  CART_IMAGE_CACHING: getFgConfigObject(
    'cart.imageCaching',
    false,
    isImageCachingEnabled
  ),
  SAMPLE_SELECTOR: getFgConfigObject('', false, isSampleSelectorEnabled),
  STYLE_CAPPING: getFgConfigObject(
    'cart.styleCapping',
    false,
    isStyleCappingEnabled
  ),
  MEXPRESSPLUS_TAG: getFgConfigObject(
    'cart.enableMexpressPlus',
    false,
    isMexpressPlusTagEnabled
  ),
  DIASABLE_SIZE_PROFILE_FETCH: getFgConfigObject(
    'checkout.confirmation.sizeProfile.disabled',
    false,
    isFeatureOn
  ),
  DISCOUNT_EXPIRY_TIMER: getFgConfigObject('', false, isDiscountTimerEnabled),
  SINGLE_SERVER: getFgConfigObject('', false, isSingleServerEnabled),
  CHECKOUT_SERVICE_WORKER: getFgConfigObject(
    'checkout.serviceworker.enabled',
    false,
    isFeatureOn
  ),
  CAPTCHA_CHARACTER_LENGTH: getFgConfigObject(
    'captcha.character.length',
    4,
    captchaLengthValue
  ),
  NEW_RELIC_BROWSER_ENABLE: getFgConfigObject(
    'checkout.newrelic.browser',
    false,
    isNewrelicEnabled
  ),
  COUPON_AWARENESS: getFgConfigObject(
    'pdp.autoapply.newusercoupon',
    false,
    isCouponAwarenessEnabled
  ),
  CART_SOCIAL_PROOFING: getFgConfigObject(
    'checkout.address.socialProofing',
    false,
    isSocialProofingEnabled
  ),
  SHOW_FINE_JWELLERY_RETURN: getFgConfigObject(
    '',
    false,
    isFineJwelleryReturnEnabled
  ),
  CART_INSIDER_PROGRESS: getFgConfigObject(
    'cart.insiderProgress',
    false,
    isCartInsiderProgressEnabled
  ),
  CART_INSIDER_ACCELERATED_EARNINGS: getFgConfigObject(
    'cart.insiderAcceleratedEarnings',
    false,
    isFeatureOn
  ),
  VISUAL_OFFER: getFgConfigObject('', false, isVisualOffersEnabled),
  GPAY_ABOVE_PHONEPE: getFgConfigObject('', false, isGpayAbovePhonepeEnabled),
  NAMOGOO_INTEGRATION: getFgConfigObject(
    'checkout.cart.namogooIntegration.enabled',
    false,
    isNamogoIntegrationForPWA
  ),
  COUPON_NUDGES: getFgConfigObject('', false, isCouponNudgesEnabled),
  INLINE_OFFER: getFgConfigObject(
    'checkout.payment.inline.offer',
    false,
    isInlineOfferEnabled
  ),
  INLINE_OFFER_CARD: getFgConfigObject(
    'checkout.payment.icb.inlineoffer',
    false,
    isInlineOfferEnabled
  ),
  CART_OOS_SIMILAR: getFgConfigObject('', false, isCardOOSSimilarEnabled),
  CHECKOUT_INSIDER_TRIAL: getFgConfigObject('', false, isInsiderTrialEnabled),
  CART_COUNT_EVENT: getFgConfigObject('cart.count.event', false, isFeatureOn),
  ORDER_REVIEW: getFgConfigObject(
    'checkout.payment.reviewcart',
    false,
    isOrderReviewEnabled
  ),
  RATING_WIDGET: getFgConfigObject('', false, isRatingWidgetEnbabled),
  APPLY_COUPON_ANIMATION: getFgConfigObject(
    'checkout.cart.applyCouponAnimation',
    false,
    isFeatureOn
  )
};

// Single function to check if a feature is enabled
const isFeatureEnabled = (key, options, req) => {
  options = options || {};
  const config = FeaturesMap[key];
  if (config && config.callback) {
    return config.callback({ key, ...options, req });
  }

  return false;
};

const isVariantEnabled = (variant, req) => {
  const config = VariantCheckMap[variant];
  return config && config(req);
};

const VariantCheckMap = {
  AOC_V2_VARIANT3: req =>
    getAbtest('CHECKOUT_ADDRESS_ON_CART_V2', req) === 'variant3' &&
    isFeatureEnabled('ADDRESS_ON_CART_V2', {}, req) &&
    isMobile({ req }),
  PAYMENT_OPTION_REORDERV2_VARIANT2: req =>
    getAbtest('PAYMENT_OPTION_REORDERV2', req) === 'accordionopen' &&
    !(
      isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT2') ||
      isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT4')
    ) &&
    isFeatureEnabled('PAYMENT_OPTION_REORDERV2', {}, req),
  PAY_VIA_SUPERCOINS_DOUBLE_CONSENT: req =>
    getAbtest('PAY_VIA_SUPERCOINS', req) === 'variantA',
  PAY_VIA_SUPERCOINS_DOUBLE_CONSENT_NON_INSIDER: req =>
    getAbtest('PAY_VIA_SUPERCOINS_NON_INSIDER', req) === 'variantA',
  RECOMMENDED_OPTIONS_VARIANT2: req =>
    getAbtest('RECOMMENDED_OPTIONS', req) === 'enabledautoselect' &&
    isFeatureEnabled('RECOMMENDED_OPTIONS', {}, req),
  RECOMMENDED_OPTIONS_VARIANT3: req =>
    getAbtest('RECOMMENDED_OPTIONS', req) === 'recootheroption' &&
    isFeatureEnabled('RECOMMENDED_OPTIONS', {}, req),
  RECOMMENDED_OPTIONS_VARIANT4: req =>
    getAbtest('RECOMMENDED_OPTIONS', req) === 'recootheroptionautoselect' &&
    isFeatureEnabled('RECOMMENDED_OPTIONS', {}, req),
  MEXPRESSPLUS_VARIANT_A: req =>
    getAbtest('MEXPRESSPLUS_TAG', req) === 'VariantA' &&
    isFeatureEnabled('MEXPRESSPLUS_TAG', {}, req),
  MEXPRESSPLUS_VARIANT_B: req =>
    getAbtest('MEXPRESSPLUS_TAG', req) === 'VariantB' &&
    isFeatureEnabled('MEXPRESSPLUS_TAG', {}, req),
  MEXPRESSPLUS_VARIANT_C: req =>
    getAbtest('MEXPRESSPLUS_TAG', req) === 'VariantC' &&
    isFeatureEnabled('MEXPRESSPLUS_TAG', {}, req),
  ORDER_REVIEW_PRICE_ENABLED: req =>
    getAbtest('ORDER_REVIEW', req) === 'enabledPrice' &&
    isFeatureEnabled('ORDER_REVIEW', {}, req)
};

module.exports = {
  isFeatureEnabled,
  isVariantEnabled,
  FeaturesMap
};
