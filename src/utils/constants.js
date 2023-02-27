const cookieKeys = {
  FIRST_TIME_CUSTOMER: 'ftc',
  ORDER_ADDRESS_ID: 'oai',
  GIFT_ORDER_ADDRESS_ID: 'goai',
  SLOT_TIMER_PASS: 'stp',
  SLOT_TIMER_BLOCK: 'stb',
  DELIVERY_PREFERENCE_COOKIE: 'dl_pr',
  X_MYNTRA_APP: 'xma',
  IS_LOGGED_IN: 'ilgim',
  DEVICE_ID: '_d_id',
  AT: 'at',
  RT: 'rt',
  XID: 'xid',
  SXID: 'sxid',
  CART_FILLER: '_cf',
  FREE_SHIPPING: '__cab',
  CREDIT_AUTO_APPLY_OFF_COOKIE: 'cr_ap_off',
  ORDER_CONFIRMED: 'oc',
  COUPON_AGGREGATION_BANNER_VIEWED: 'ca_banner',
  USER_LOCATION_CONTEXT: 'mynt-ulc',
  ORDER_ADDRESS_UNIFIED_ID: 'oaui',
  USER_LOCATION_CONTEXT_API: 'mynt-ulc-api',
  LOCATION_SOURCE: 'mynt-loc-src',
  SELECTIVE_CHECKOUT_TOOLTIP: 'sc_tt',
  MA_SESSION: '_ma_session',
  EXCHANGE_EXPIRY_MESSAGE_HIDE: 'oee_expiry_hide',
  SCRATCH_CARD_ON_ORDER_ID: 'scooid',
  LANDMARK_NUDGE: 'lm_ndg',
  FEEDBACK_SURVEY_ON_ORDER_ID: 'fsooid',
  CART_CANCEL_ORDER_MODAL: 'ccom',
  SAVED_CARD_CONSENT_COUNT: 'sc_cc',
  SAVED_CARD_CONSENT_DATE: 'sc_cd',
  MXAB: '_mxab_',
  MXABD: '_mxabd_',
  SINGLE_SERVER_ROOT: '_ssr_',
  NOTIFICATION_ENABLED: 'remoteNotifEnabled',
  DATALAYER_MA_SESSION: '_dataLayer_ma_session_'
};

const localStorageKeys = {
  NOTIFY_ME_STORAGE_KEY: 'notify_me_subscribed',
  GIFTCARD_PURCHASE_DETAILS: '__myn_giftcard_statedata',
  PAYMENT_TRIED_COUNT: 'payment_tried_count',
  PAYMENT_MODE_ATTRIBUTES: 'payment_mode_attributes',
  LAST_LOGOUT: 'lastLogout',
  PWA_INSTALLED: 'pwaInstalled',
  HIDE_A2HS: 'hideA2hsCard',
  SAVINGS_FOMO_VALUE: 'savingsFomoValue',
  USER_PROFILE: 'myProfile'
};

const sessionStorageKeys = {
  COD_OTP_COUNT: 'oro',
  PAYMENT_ONLINE_FAILURE_COUNT: 'failure_count',
  PAYMENT_OPTIONS_ERROR_COUNT: 'payment_options_error_count',
  STOREID_LOADED: storeOrderId => `${storeOrderId}-loaded`
};

const numToWords = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten'
];

const numbers = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9
};

const priceChangeTypes = {
  NO_CHANGE: 'no-change',
  INCREASED: 'inc',
  DECREASED: 'dec'
};

const couponsNotificationTypes = {
  TYPED_IN_COUPON: 'TYPED_IN_COUPON',
  NEGATIVE_CART_VALUE: 'NEGATIVE_CART_VALUE',
  APPLY_ALL_SUCCESS: 'APPLY_ALL_SUCCESS',
  APPLY_ALL_SUCCESS_EXPIRED: 'APPLY_ALL_SUCCESS_EXPIRED',
  APPLY_ALL_EXPIRED: 'APPLY_ALL_EXPIRED'
};

const checkoutPage = {
  CART: 'cart',
  ADDRESS: 'address',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
  COUPONS: 'coupon'
};

const userActionTypes = {
  REFUND: 'REFUND'
};

const pageMode = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop'
};

const orderStates = {
  PENDING: 'orderpending',
  PLACED_FRESH: 'orderplacedfresh',
  PLACED: 'orderplaced'
};

const confirmationScreenTypes = {
  orderSuccess: 'ORDER_SUCCESS',
  payFailOrderSuccess: 'PAYMENT_FAIL_ORDER_SUCCESS',
  payPendingCodElig: 'PAYMENT_PENDING_COD_ELIGIBLE',
  payPendingCodNotElig: 'PAYMENT_PENDING_COD_NOT_ELIGIBLE',
  payPendingPlacedOrder: 'PAYMENT_PENDING_DURING_RETRY',
  paySuccess: 'PAYMENT_SUCCESS_DURING_RETRY',
  paySuccessCodUserConsent: 'PAYMENT_SUCCESS_COD_DOPE_USER_CONSENT'
};

const confirmationScreenTypeVSHeaderMap = {
  [confirmationScreenTypes.orderSuccess]: 'ORDER CONFIRMED',
  [confirmationScreenTypes.payFailOrderSuccess]: 'ORDER PLACED, PAYMENT FAILED',
  [confirmationScreenTypes.payPendingCodElig]: 'PAYMENT PENDING',
  [confirmationScreenTypes.payPendingCodNotElig]: 'PAYMENT PENDING',
  [confirmationScreenTypes.payPendingPlacedOrder]: 'PAYMENT PENDING',
  [confirmationScreenTypes.paySuccess]: 'PAYMENT SUCCESSFUL',
  default: 'ORDER CONFIRMED'
};

const windowEvents = {
  SLIDE_OUT_OF_VIEW_EVENT_NAME: 'slideOutHeader',
  SLIDE_INTO_VIEW_EVENT_NAME: 'slideInHeader'
};

const navigationHeader = {
  HEIGHT: 56
};

module.exports = {
  cookieKeys,
  localStorageKeys,
  sessionStorageKeys,
  numToWords,
  couponsNotificationTypes,
  priceChangeTypes,
  checkoutPage,
  userActionTypes,
  pageMode,
  orderStates,
  confirmationScreenTypes,
  confirmationScreenTypeVSHeaderMap,
  numbers,
  navigationHeader,
  windowEvents
};
