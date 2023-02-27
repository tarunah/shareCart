/*
 * Manager for all analytics related tasks.
 * Usage:
 * import triggerEvent from 'commonBrowserUtils/analytics/analyticsManager';
 * triggerEvent('GET_COUPON_ERROR', { gaLabel, mynacoLabel, maData, custom });
 */

import get from 'lodash/get';
import gaUtil from 'commonBrowserUtils/analytics/ga';
import maUtil, {
  setPageContext,
  configure,
  flushEvents
} from 'commonBrowserUtils/analytics/ma';
import {
  pushGTMCartData,
  pushGTMConfirmationData,
  pushDataLayerObjectForGTM
} from 'commonBrowserUtils/analytics/gtm';
import getGenericMynacoData from 'commonBrowserUtils/analytics/Mynaco';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import {
  initWebengage,
  triggerWebengage
} from 'commonBrowserUtils/analytics/webengage';
import trackSizeFit from 'commonBrowserUtils/analytics/sizeAndFit';
import { checkoutPage } from 'commonUtils/constants';

//Add commonly used constants here
const CONSTANTS = {
  coupon: 'checkoutv2-coupon',
  cart: 'checkoutv2-cart',
  confirmation: 'checkoutv2-confirmation',
  confirmationScreen: 'confirmation',
  cartScreen: 'cart',
  paymentScreen: 'payment',
  address: 'address',
  TWOFA: 'Myntra_2FA_Payments_Page',
  A2HS: 'add_to_homescreen',
  PAYMENT_OTP: 'payment_otp',
  PAY_NOW_SUCCESS: 'paynow_success',
  PAY_NOW_ERROR: 'paynow_error'
};

// Specific events to be fired from web for app
const webMaEventsFromApp = [
  'SAVE_CARD_CONSENT_HALF_CARD_LOAD',
  'SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN',
  'AUTO_CONSENT_SAVED_CARD_CLICK',
  'AUTO_CONSENT_NEW_CARD_CLICK',
  'AUTO_CONSENT_INFO_ICON_CLICK',
  'TRUST_BANNER_LOAD',
  'TRUST_BANNER_REPEAT_FLAG_LOAD',
  'PAYMENT_SAVINGS_CALLOUT_FLAG',
  'SAVED_CARD_FLAG',
  'SAVED_CARD_OFFERS_CLICK',
  'SAVED_CARD_OFFERS_LOAD',
  'SAVINGS_FOMO_LOAD',
  'DEFAULT_SAVINGS_FOMO',
  'SAVINGS_FOMO_CLOSE_ICON_CLICK',
  'GO_BACK_SAVINGS_FOMO_CLICK',
  'STAY_SAVINGS_FOMO_CLICK',
  'SAVINGS_FOMO_NUDGE_CLICK',
  'POSITIVE_REINFORCEMENT',
  'APPLY_COUPON_CLICK',
  'CART_NEW_USER_COUPON_FLAG',
  'HIGHLIGHT_COD_NU_LOAD',
  'NOT_HIGHLIGHT_COD_NU_LOAD',
  'PAYMENT_TAB_CLICK',
  'PAYMENT_TAB_TOGGLE_CLICK',
  'SAVINGS_FEEDBACK_WIDGET_LOAD',
  'PAYMENT_INVISIBILITY_SAVINGS_STRIP_LOAD',
  'PRICE_BLOCK_SCROLL_INTO_VIEW',
  'MYNTRA_VALUES_STRIP_LOAD',
  'SCRATCH_CARD_WIDGET_LOAD',
  'INSIDER_SUPERCOIN_WIDGET_LOAD',
  'INSIDER_SUPERCOIN_WIDGET_CTA_CLICK',
  'INSIDER_SUPERCOIN_WIDGET_CHEVRON_CLICK',
  'INSIDER_SUPERCOIN_WIDGET_REWARD_CLICK',
  'TRY_AND_BUY_WIDGET_LOAD',
  'PAYMENT_FAILURE_HALFCARD_LOAD',
  'PAYMENT_FAILURE_HALFCARD_CLICK',
  'ORDER_CONFIRM_VIEW_ORDERS',
  'ORDER_CONFIRM_USER_PROFILE',
  'ORDER_CONFIRM_APP_FEEDBACK',
  'APPLY_COUPON_SUCCESS',
  'MOVE_TO_WISHLIST_SUCCESS',
  'EXPRESS_DELIVERY_ELIGIBILITY',
  'SALE_TIMER_LOAD',
  'CART_FILLER_LOAD',
  'CART_FILLER_ADD_TO_CART',
  'CART_OOS_SIMILAR_ADD_TO_CART',
  'CART_FILLER_MINI_PDP',
  'EMPTY_CART_WIDGET_LOAD',
  'EMPTY_CART_MWK_WIDGET_LOAD',
  'EMPTY_CART_WIDGET_CLICK',
  'EMPTY_CART_MWK_WIDGET_CLICK',
  'EMPTY_CART_CONTINUE_SHOPPING_CLICK',
  'CART_EMPTY_LOAD',
  'TAG_SIZE_PROFILE',
  'CREATE_SIZE_PROFILE',
  'UPDATE_SIZE_PROFILE_INITIATE',
  'DELIVERY_PREFERENCE_ADDRESS',
  'DELIVERY_PREFERENCE_ORDER',
  'SUBMIT_TWOFA',
  'SHOW_TWOFA',
  'CLOSE_TWOFA',
  'TWOFA_OTP_SUCCESS',
  'TWOFA_OTP_FAIL',
  'TWOFA_OTP_SENT',
  'CREDITS_WIDGET_CLICK',
  'GET_COUPON_SUCCESS',
  'CART_PLACE_ORDER',
  'BANK_OFFERS_LOAD',
  'BANK_OFFERS_CLICK',
  'BANK_OFFERS_CLOSE',
  'BANK_OFFERS_VIEWED',
  'CART_OOS_LOAD_WIDGET',
  'CART_OOS_SIMILAR_LOAD_WIDGET',
  'CART_OOS_CLICK_WIDGET',
  'CART_OOS_BUTTON_CLICK',
  'CART_OOS_SHELL_LOAD',
  'XPRESS_SERVICE_ERROR',
  'XPRESS_PREPAID_LOADED',
  'XPRESS_ADDRESS_CLICK',
  'XPRESS_PAYMENT_CLICK',
  'XPRESS_PREPAID_ORDER',
  'XPRESS_ARRIVAL_INFO',
  'XPRESS_ARRIVAL_MORE_OPTIONS',
  'XPRESS_POINTS_LOAD',
  'XPRESS_POINTS_CLICK',
  'XPRESS_TRY_AND_BUY_LOAD',
  'XPRESS_TRY_AND_BUY_CLICK',
  'XPRESS_CREDIT_LOAD',
  'XPRESS_CREDIT_CLICK',
  'XPRESS_HALFCARD_CLOSE',
  'XPRESS_CHECKOUT_FLAG',
  'XPRESS_CHECKOUT_PAYNOW_FLAG',
  'INSIDER_REWARDS_WIDGET_LOAD',
  'INSIDER_REWARDS_ENROLL_TEXT_CLICK',
  'INSIDER_REWARDS_MODAL_ENROLL_BUTTON_CLICK',
  'GET_COUPON_SUCCESS',
  'COD_FALLBACK',
  'REMOVE_EXPIRED_CARD',
  'CART_PRICE_CHANGE_STRIP_LOAD',
  'CART_PRICE_CHANGE_DETAILS_CLICK',
  'LOW_SR_MESSAGE_DISPLAY',
  'PROCEED_NEXT_FROM_CART',
  'CONFIRMATION_RECOMMENDATIONS_STYLE_CLICK',
  'CONFIRMATION_RECOMMENDATIONS_LOAD',
  'CONFIRMATION_ORDER_STYLE_CLICK',
  'CONFIRMATION_RECOMMENDATIONS_VIEW_MORE',
  'PAYMENT_OPTIONS_ORDER',
  'PAYMENT_OPTION_SUBMIT',
  'CONFIRMATION_SAVINGS_WIDGET_LOAD',
  'CONFIRMATION_TOTAL_SAVINGS_WIDGET_LOAD',
  'CONFIRMATION_INSIDER_POINTS_WIDGET_LOAD',
  'CONFIRMATION_INSIDER_POINTS_WIDGET_CLICK',
  'LOW_SR_DISABLE_INSTRUMENT',
  'EDIT_ADDRESS_FAILURE',
  'ADD_ADDRESS_FAILURE',
  'EDIT_ADDRESS_SUCCESS',
  'ADD_ADDRESS_SUCCESS',
  'EDIT_SIZE',
  'EDIT_SELLER',
  'ADDRESS_DELIVERY_PROMISE',
  'TOGGLE_PRODUCT_SELECTION',
  'SELECTED_ALL_PRODUCTS',
  'DESELECTED_ALL_PRODUCTS',
  'BULKMOVE_TO_WISHLIST',
  'BULK_REMOVE',
  'SHOW_MORE_OFFER_BTN_CLICK',
  'CHANGE_ADDRESS_BTN_CLICK',
  'ENTER_PIN_CODE',
  'VALID_PIN_CODE',
  'INVALID_PIN_CODE',
  'ITEM_LEVEL_SERVICE_FOR_PINCODE',
  'ADDRESS_CHANGE_ON_CART',
  'PRICE_BLOCK_LOAD',
  'USE_MY_LOCATION_CLICK',
  'USE_MY_LOCATION_ALLOWED',
  'USE_MY_LOCATION_DENIED',
  'SUGGESTED_LOCALITY',
  'SAVED_LOCALITY',
  'ADDRESS_SUGGESTION_ERROR',
  'STYLE_EXCHANGE_BANNER_LOAD',
  'STYLE_EXCHANGE_CANCEL_EXCHANGE_CLICK',
  'STYLE_EXCHANGE_CANCEL_EXCHANGE_CONFIRM',
  'STYLE_EXCHANGE_HOW_IT_WORKS_CLICK',
  'STYLE_EXCHANGE_KNOW_MORE_CLICK',
  'STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_CANCEL',
  'STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_REINITIATE',
  'PRICE_BLOCK_KNOW_MORE_CLICK',
  'PAY_NOW_ERROR_PAYLOAD',
  'PLUTUS_PAYLOAD',
  'CLICK_VIEW_APPLICABLE_ITEMS',
  'GIFTCARD_CONTEXT_PAYMENT',
  'ITEMLIST_LOGINCTA_CLICK',
  'COUPON_LOGINCTA_CLICK',
  'SHIPPING_TIP_LOGINCTA_CLICK',
  'RETURN_ABUSER_MODAL_OPEN',
  'RETURN_ABUSER_MODAL_CLOSE',
  'PAYMENT_ERROR',
  'ATTACHED_PRODUCT_VIEW_ITEMS_CLICK',
  'ATTACHED_PRODUCT_TOUCH_POINT_CLICK',
  'COUPON_DISCOUNT_BREAKUP_CLICK',
  'ATTACHED_PRODUCTS_OPERATIONS',
  'ITEM_QUANTITY_CHANGE',
  'TERMS_OF_USE_CLICK',
  'PRIVACY_POLICY_CLICK',
  'MOVE_OUT_OF_BAG_BUTTON_CLICK',
  'TOTAL_AMOUNT_CLICK',
  'PRICE_DETAIL_CLICK',
  'TWO_FA_ENABLED',
  'SELECTIVE_ENHANCED_REMOVE',
  'SELECTIVE_ENHANCED_WISHLIST',
  'DOPE_PAYMENT_FAILED_PAGE_LOAD',
  'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_OPEN',
  'DOPE_PAYMENT_FAILED_CANCEL_ORDER_KEEP_CLICK',
  'DOPE_PAYMENT_FAILED_CANCEL_ORDER_CLICK',
  'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE',
  'DOPE_PAYMENT_FAILED_RETRY_PAYMENT_CLICK',
  'DOPE_PAYMENT_FAILED_VIEW_ORDER_CLICK',
  'DOPE_PAYMENT_FAILED_SEE_HOW_CLICK',
  'DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK',
  'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK',
  'DOPE_PAYMENT_PENDING_SEE_HOW_CLICK',
  'DOPE_RETRY_PAYMENT_PAGE_LOADED',
  'DOPE_RETRY_PAYMENT_SESSION_EXPIRED',
  'DOPE_RETRY_PAYMENT_COMPLETED',
  'DOPE_RETRY_PAYMENT_PENDING',
  'CONFIRMATION_PAGE_LOAD',
  'ORDER_DETAILS_BTN_CLICK',
  'PRODUCT_TO_PROFILE_TAG_CLICK',
  'MY_COUPONS_BTN_CLICK',
  'DONATION_WIDGET_SHOWN',
  'DONATION_WIDGET_APPLY',
  'PROFILE_EMAIL_SAVED',
  'PROFILE_EMAIL_SAVE_FAILED',
  'DONATION_WIDGET_KNOW_MORE',
  'CART_SHARE_CLICK',
  'AT_PILL_CLICK',
  'EDIT_ADDRESS_BTN_CLICK',
  'ADD_ADDRESS_TOP_BTN_CLICK',
  'ADD_ADDRESS_BOTTOM_BTN_CLICK',
  'CHANGE_ADDRESS_BTN_CLICK_PAYMENT',
  'CHANGE_ADDRESS_BTN_CLICK_CART',
  'ADDRESS_CHANGE_ON_CART_V2',
  'DELETE_ADDRESS_BTN_CLICK',
  'ADDRESS_SELECT_ON_CART_V2',
  'VIEW_MORE_HIDE',
  'VIEW_MORE_CLICKED',
  'ADD_LANDMARK_CLICK',
  'LIVE_CUST_LOAD',
  'COUPON_TIMER_LOAD',
  'WISHLIST_CARD_LOAD',
  'WISHLIST_IN_VIEW_PORT',
  'RECO_HALFCARD_CLOSE',
  'WISHLIST_ADD_TO_CART',
  'WISHLIST_SIZE_SELECTOR_CLICK',
  'WISHLIST_PRODUCT_CLICK',
  'CUST_RATINGS_LOAD',
  'PAYMENTS_ICON_REVAMP',
  'VIEW_ORDER_CONFIRMATION',
  'SCRATCH_CARD_WIDGET_CLICK',
  'UNSCRATCH_CARD_VIEW',
  'DISMISS_BEFORE_SCRATCH',
  'CARD_SCRATCH',
  'CARD_REVEAL',
  'DISMISS_AFTER_SCRATCH',
  'COUPON_COPY',
  'EXPLORE_PRODUCTS_CLICK',
  'EXPLORE_MORE',
  'FRG_CART_LOAD',
  'MEXPRESS_LOAD',
  'MEXPRESS_PLUS_LOAD',
  'STYLE_CAPPING_LOAD',
  'REMOVE_ITEM',
  'MOVE_TO_WISHLIST_APP',
  'AUTO_APPLY_COUPON',
  'AUTO_APPLY_COUPON_REMOVE',
  'AUTO_APPLY_NUDGE_SHOWN',
  'AUTO_APPLY_NUDGE_CLICKED',
  'AUTO_APPLY_LOGIN_CLICKED',
  'AUTO_APPLY_APPLY_CLICKED',
  'AUTO_APPLY_ALL_COUPONS_CLICK',
  'AUTO_APPLY_COUPON_AVAILABLE',
  'RANGE_BASED_PROMISE',
  'AUTO_APPLY_COUPON_LOGIN_SHOWN',
  'CART_SOCIAL_PROOFING_LOAD',
  'CART_SOCIAL_PROOFING_FLAG',
  'CART_SUPERCOINS_CREDIT_WIDGET_LOAD',
  'CART_SUPERCOINS_CREDIT_WIDGET_CLICK',
  'CART_SUPERCOINS_HALF_CARD_CREDIT_SCREEN_LOAD',
  'ECOM_KNOW_MORE_CLICK',
  'INSIDER_REWARDS_IN_VIEW_PORT',
  'INSIDER_REWARDS_INFO_CLICK',
  'INSIDER_REWARDS_MODAL_OPEN',
  'INSIDER_REWARDS_MODAL_CLOSE',
  'FINE_JWELLERY_CLICK',
  'COUPON_NUDGES_CLICKED',
  'COUPON_NUDGES_SHOWN',
  'COUPON_NUDGES_ADD_ITEM',
  'COUPON_NUDGES_COUPON_AVAILABLE',
  'COUPON_NUDGES_LOGIN_SHOWN',
  'COUPON_NUDGES_LOGIN_CLICKED',
  'COUPON_NUDGES_COUPON_REMOVE',
  'COUPON_NUDGES_APPLY_CLICKED',
  'COUPON_NUDGES_ALL_COUPON_CLICK',
  'INSIDER_TRIALS_WIDGET_LOAD',
  'CART_COUNT_EVENT',
  'ORDER_CONFIRM_LOAD_NOTIF_WIDGET',
  'ORDER_CONFIRM_CLICK_NOTIF_WIDGET',
  'ORDER_REVIEW_WIDGET_LOAD',
  'ORDER_REVIEW_WIDGET_CLICK',
  'ADDRESS_WIDGET_LOAD',
  'ADDRESS_WIDGET_CLICK',
  'ADDRESS_PAGE_LOAD',
  'APPLICABLE_COUPON_AVAILABLE',
  'INLINE_OFFER_TNC_CLICK',
  'INLINE_OFFER_WIDGET_LOAD',
  'INLINE_OFFER_AVAILABLE',
  'INLINE_OFFER_OFFER_VIEW'
];

const webGaEventsFromApp = [
  'CONFIRMATION_EC_ADD_PRODUCT',
  'CONFIRMATION_EC_PURCHASE',
  'CHECK_ELIGIBILITY',
  'PARTNER_BANNER_CLICKED',
  'CLOSE_TWOFA',
  'SUBMIT_TWOFA',
  'SHOW_TWOFA',
  'TWOFA_CHANGE_NUMBER',
  'TWOFA_SELECT_NUMBER',
  'TWOFA_OTP_SUCCESS',
  'TWOFA_OTP_FAIL',
  'TWOFA_OTP_SENT',
  'TWOFA_OTP_RESENT',
  'GET_PAYMENT_OPTIONS_ERROR',
  'PAYMENT_PAGE_LOAD_ERROR',
  'PAYMENT_UPI_OPTION_SELECT',
  'PAYMENT_OTP_LOAD',
  'PAYMENT_OTP_SUBMIT',
  'PAYMENT_OTP_RESEND',
  'PAYMENT_OTP_BANK_REDIRECT',
  'COD_FALLBACK',
  'LOW_SR_MESSAGE_DISPLAY',
  'NOT_SERVICEABLE_ADDRESS_SELECTED',
  'NOT_SERVICEABLE_ADDRESS_GO_TO_BAG',
  'NOT_SERVICEABLE_ADDRESS_ITEM',
  'ADDRESS_DAYS_TO_DELIVERY',
  'LOW_SR_DISABLE_INSTRUMENT'
];

const webGaEventsFromIOSApp = [
  ...webGaEventsFromApp,
  'CONFIRMATION_SCREEN_LOAD'
];

//Function to return GAData in proper format
const getGAData = (category, action, label = '') => ({
  eventType: 'event',
  category,
  action,
  label
});

//Function to return MAData in proper format
const getMAData = (
  event,
  type,
  { maData = {}, custom = {} } = {},
  immediate = false
) => {
  return {
    event,
    data: {
      data_set: maData,
      type,
      variant: 'react'
    },
    custom,
    immediate
  };
};

//Function to return MynacoData in proper format
const getMynacoData = (
  category,
  action,
  label,
  customAttributes,
  customEvents = {}
) => {
  let attributes = { category, action, label };
  customAttributes && (attributes = customAttributes);

  return {
    category,
    action,
    attributes: JSON.stringify(attributes),
    customEvents
  };
};

/*
 * Config for all the events.
 * Add new ga/ma/mynaco events in this config with following format:
 * EVENT_NAME: {
 *   ga: data => getGAData(category, action, label),
 *   ma: data => getMAData(event, type, data),
 *   mynaco: data => getMynacoData(category, action, label, customAttributes)
 * }
 * data format: { gaLabel, mynacoLabel, mynacoAttributes, maData, custom }
 */
const eventsConfig = {
  PAYMENTS_ICON_REVAMP: {
    ma: data => getMAData('Payment Page - cards_upi_flag', 'other', data)
  },
  SAVE_CARD_CONSENT_HALF_CARD_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  AUTO_CONSENT_SAVED_CARD_CLICK: {
    ma: data =>
      getMAData('auto_consent_saved_card', 'savedCardTokenization', data)
  },
  AUTO_CONSENT_NEW_CARD_CLICK: {
    ma: data =>
      getMAData('auto_consent_new_card', 'savedCardTokenization', data)
  },
  AUTO_CONSENT_INFO_ICON_CLICK: {
    ma: data =>
      getMAData('auto_consent_info_icon_click', 'savedCardTokenization', data)
  },
  TRUST_BANNER_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  TRUST_BANNER_REPEAT_FLAG_LOAD: {
    ma: data => getMAData('other', '', data)
  },
  PAYMENT_SAVINGS_CALLOUT_FLAG: {
    ma: data => getMAData('other', '', data)
  },
  SAVED_CARD_FLAG: {
    ma: data => getMAData('other', '', data)
  },
  SAVED_CARD_OFFERS_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  SAVED_CARD_OFFERS_LOAD: {
    ma: data => getMAData('widgetItemLoad', '', data)
  },
  SAVINGS_FOMO_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  DEFAULT_SAVINGS_FOMO: {
    ma: data => getMAData('other', '', data)
  },
  GO_BACK_SAVINGS_FOMO_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  STAY_SAVINGS_FOMO_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  SAVINGS_FOMO_NUDGE_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  SAVINGS_FOMO_CLOSE_ICON_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  APPLY_COUPON_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  AUTO_APPLY_COUPON: {
    ma: data => getMAData('Cart - new_user_coupon_auto_applied', 'other', data)
  },
  AUTO_APPLY_COUPON_REMOVE: {
    ma: data => getMAData('Cart - new_user_coupon_removed', 'other', data)
  },
  CART_SOCIAL_PROOFING_LOAD: {
    ma: data =>
      getMAData('Address - social_proofing_widget_load', 'widgetLoad', data)
  },
  CART_SOCIAL_PROOFING_FLAG: {
    ma: data => getMAData('Address - social_proofing_flag', 'other', data)
  },
  AUTO_APPLY_NUDGE_SHOWN: {
    ma: data =>
      getMAData('Cart - new_user_coupon_available_nudge', 'widgetLoad', data)
  },
  AUTO_APPLY_COUPON_AVAILABLE: {
    ma: data =>
      getMAData('Cart - new_user_coupon_available', 'widgetLoad', data)
  },
  AUTO_APPLY_NUDGE_CLICKED: {
    ma: data =>
      getMAData('Cart - new_user_coupon_available_click', 'widgetClick', data)
  },
  AUTO_APPLY_LOGIN_CLICKED: {
    ma: data => getMAData('Cart - coupon_login_click', 'widgetClick', data)
  },
  AUTO_APPLY_COUPON_LOGIN_SHOWN: {
    ma: data => getMAData('Cart - coupon_login_shown', 'other', data)
  },
  AUTO_APPLY_APPLY_CLICKED: {
    ma: data =>
      getMAData('Cart - new_user_coupon_apply_clicked', 'widgetClick', data)
  },
  AUTO_APPLY_ALL_COUPONS_CLICK: {
    ma: data => getMAData('Cart - all_coupons_click', 'widgetClick', data)
  },
  CART_NEW_USER_COUPON_FLAG: {
    ma: data => getMAData('other', '', data)
  },
  HIGHLIGHT_COD_NU_LOAD: {
    ma: data => getMAData('widgetItemLoad', '', data)
  },
  NOT_HIGHLIGHT_COD_NU_LOAD: {
    ma: data => getMAData('other', '', data)
  },
  POSITIVE_REINFORCEMENT: {
    ma: data => getMAData('other', CONSTANTS.cartScreen, data)
  },
  SAVINGS_FEEDBACK_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cartScreen, data)
  },
  PAYMENT_INVISIBILITY_SAVINGS_STRIP_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  GET_COUPON_ERROR: {
    ga: data =>
      getGAData(CONSTANTS.coupon, 'error:getCoupons', `error:${data.gaLabel}`)
  },
  GET_COUPON_SUCCESS: {
    ma: data => getMAData('couponsLoaded', CONSTANTS.cartScreen, data)
  },
  APPLY_COUPON_ERROR: {
    ga: data =>
      getGAData(CONSTANTS.coupon, 'error:applyCoupon', `error:${data.gaLabel}`),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'error:applyCoupon', data.gaLabel)
  },
  APPLY_COUPON_SUCCESS: {
    ga: data =>
      getGAData(CONSTANTS.coupon, `success:applyCoupon`, data.gaLabel),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.cart,
        'success:applyCoupon',
        `${data.gaLabel.code} | ${data.gaLabel.type} | ${data.gaLabel.uidx}`
      ),
    ma: data => getMAData('widgetItemClick', CONSTANTS.cartScreen, data)
  },
  CLICK_APPLY_COUPON: {
    ga: () => getGAData(CONSTANTS.cart, 'click:applyCoupon')
  },
  CLICK_REMOVE_COUPON: {
    ga: () => getGAData(CONSTANTS.cart, 'click:removeCoupon')
  },
  CLICK_VIEW_APPLICABLE_ITEMS: {
    ma: data => getMAData('click_view_applicable_items', CONSTANTS.coupon, data)
  },
  ITEMLIST_LOGINCTA_CLICK: {
    ma: data => getMAData('itemlist_logincta_click', CONSTANTS.cart, data)
  },
  COUPON_LOGINCTA_CLICK: {
    ma: data => getMAData('coupon_logincta_click', CONSTANTS.cart, data)
  },
  SHIPPING_TIP_LOGINCTA_CLICK: {
    ma: data => getMAData('shipping_tip_logincta_click', CONSTANTS.cart, data)
  },
  REMOVE_ITEM: {
    ga: data =>
      getGAData(
        CONSTANTS.cart,
        'removeItem',
        `${data.gaLabel.style}|tradeDiscount:${get(
          data,
          'gaLabel.discount.tradeDiscount'
        )}|couponDiscount:${get(data, 'gaLabel.discount.couponDiscount')}`
      ),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'removeItem', data.gaLabel.style, {
        category: CONSTANTS.cart,
        action: 'removeItem',
        label: data.gaLabel.style,
        ...data.mynacoAttributes
      }),
    ma: data => getMAData('removeItem', CONSTANTS.cart, data)
  },
  CLICK_REMOVE_OOS: {
    ga: () => getGAData(CONSTANTS.cart, 'click:oosRemove'),
    mynaco: () =>
      getMynacoData(CONSTANTS.cart, 'click:oosRemove', 'Removing-OOS-Items')
  },
  MOVE_TO_WISHLIST: {
    ga: data => getGAData(CONSTANTS.cart, 'AddToCollection', data.gaLabel),
    ma: data => getMAData('AddToCollection', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'AddToCollection', data.gaLabel, {
        category: CONSTANTS.cart,
        action: 'AddToCollection',
        label: data.gaLabel,
        ...data.mynacoAttributes
      })
  },
  MOVE_TO_WISHLIST_APP: {
    ma: data => getMAData('moveToWishlist', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'moveToWishlist', data.gaLabel, {
        category: CONSTANTS.cart,
        action: 'moveToWishlist',
        label: data.gaLabel,
        ...data.mynacoAttributes
      })
  },
  EDIT_SIZE: {
    ga: data => getGAData(CONSTANTS.cart, 'editSize', data.gaLabel),
    ma: data => getMAData('editSize', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'editSize', data.gaLabel, {
        category: CONSTANTS.cart,
        action: 'editSize',
        label: data.gaLabel,
        ...data.mynacoAttributes
      })
  },
  EDIT_QUANTITY: {
    ga: data => getGAData(CONSTANTS.cart, 'editQty', data.gaLabel),
    mynaco: data => getMynacoData(CONSTANTS.cart, 'editQty', data.gaLabel)
  },
  EDIT_SELLER: {
    ga: data => getGAData(CONSTANTS.cart, 'sellerChange', data.gaLabel),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'sellerChange', data.gaLabel, {
        category: CONSTANTS.cart,
        action: 'sellerChange',
        label: data.gaLabel,
        ...data.mynacoAttributes
      }),
    ma: data => getMAData('sellerChange', CONSTANTS.cart, data)
  },
  FRAUD_USER: {
    ga: () => getGAData(CONSTANTS.cart, 'fraudUser'),
    mynaco: () => getMynacoData(CONSTANTS.cart, 'fraudUser', 'Abuser')
  },
  DONATION_WIDGET_SHOWN: {
    ma: data => getMAData('donationWidgetSurfaced', CONSTANTS.cart, data)
  },
  DONATION_WIDGET_APPLY: {
    ma: data => getMAData('donationWidgetApplied', CONSTANTS.cart, data)
  },
  PROFILE_EMAIL_SAVED: {
    ma: data => getMAData('profileEmailSaved', CONSTANTS.cart, data)
  },
  PROFILE_EMAIL_SAVE_FAILED: {
    ma: data => getMAData('profileEmailSaveFailed', CONSTANTS.cart, data)
  },
  DONATION_WIDGET_KNOW_MORE: {
    ma: data => getMAData('donationWidgetKnowMore', CONSTANTS.cart, data)
  },
  TOGGLE_PRODUCT_SELECTION: {
    ma: data => getMAData('toggleProductSelection', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'toggleProductSelection', '', {
        category: CONSTANTS.cart,
        action: 'toggleProductSelection',
        ...data.mynacoAttributes
      })
  },
  SELECTED_ALL_PRODUCTS: {
    ma: data => getMAData('selectedAllProducts', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'selectedAllProducts', '', {
        category: CONSTANTS.cart,
        action: 'selectedAllProducts',
        ...data.mynacoAttributes
      })
  },
  DESELECTED_ALL_PRODUCTS: {
    ma: data => getMAData('deselectAllProducts', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'deselectAllProducts', '', {
        category: CONSTANTS.cart,
        action: 'deselectAllProducts',
        ...data.mynacoAttributes
      })
  },
  BULKMOVE_TO_WISHLIST: {
    ma: data => getMAData('bulkMoveToWishlist', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'bulkMoveToWishlist', '', {
        category: CONSTANTS.cart,
        action: 'bulkMoveToWishlist',
        ...data.mynacoAttributes
      })
  },
  BULK_REMOVE: {
    ma: data => getMAData('bulkRemove', CONSTANTS.cart, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'bulkRemove', '', {
        category: CONSTANTS.cart,
        action: 'bulkRemove',
        ...data.mynacoAttributes
      })
  },
  MFG_APPLY: {
    ga: () => getGAData(CONSTANTS.cart, 'mfgApply'),
    mynaco: data => getMynacoData(CONSTANTS.cart, 'mfgApply', data.mynacoLabel)
  },
  CART_EMPTY_LOAD: {
    ma: data =>
      getMAData('Cart Page - Empty Cart Loaded', CONSTANTS.cartScreen, data)
  },
  CART_SCREEN_LOAD: {
    ma: data => getMAData('ScreenLoad', CONSTANTS.cartScreen, data),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.cart,
        'ecommerce-screen-load',
        '',
        data.mynacoAttributes
      ),
    mynacoV3: ({ mynacoV3Data, gaData }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event: 'ECOMMERCE_SCREEN_LOAD',
        screen: CONSTANTS.cart,
        type: 'ecommerce-screen-load'
      })
  },
  PRICE_BLOCK_SCROLL_INTO_VIEW: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  MYNTRA_VALUES_STRIP_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cartScreen, data)
  },
  ADDRESS_DAYS_TO_DELIVERY: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cartScreen, data)
  },
  EMPTY_CART_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cartScreen, data),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.cart,
        data.mynacoAttributes.action,
        '',
        data.mynacoAttributes
      )
  },
  EMPTY_CART_MWK_WIDGET_LOAD: {
    ma: data =>
      getMAData('cart page - mwk widget load', CONSTANTS.cartScreen, data)
  },
  EMPTY_CART_WIDGET_CLICK: {
    ma: data => getMAData('widgetClick', CONSTANTS.cartScreen, data),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.cart,
        data.mynacoAttributes.action,
        '',
        data.mynacoAttributes
      )
  },
  EMPTY_CART_MWK_WIDGET_CLICK: {
    ma: data =>
      getMAData('cart page - mwk widget item click', CONSTANTS.cartScreen, data)
  },
  EMPTY_CART_CONTINUE_SHOPPING_CLICK: {
    ma: data =>
      getMAData('cart page - shopping button click', CONSTANTS.cartScreen, data)
  },
  MOVE_TO_WISHLIST_SUCCESS: {
    ma: data => getMAData('AddToCollection', CONSTANTS.cartScreen, data)
  },
  SALE_TIMER_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  XPRESS_SERVICE_ERROR: {
    ma: data => getMAData('Exp_Chk_Prepaid_Loaded', '', data)
  },
  XPRESS_PREPAID_LOADED: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  XPRESS_TRY_AND_BUY_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  XPRESS_TRY_AND_BUY_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_ADDRESS_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_PAYMENT_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_PREPAID_ORDER: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_ARRIVAL_INFO: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_ARRIVAL_MORE_OPTIONS: {
    ma: data =>
      getMAData('Cart Page - express_checkout_delivery_more_options', '', data)
  },
  XPRESS_POINTS_LOAD: {
    ma: data => getMAData('widgetItemLoad', '', data)
  },
  XPRESS_POINTS_CLICK: {
    ma: data =>
      getMAData('Cart Page - Express Checkout myn_points click', '', data)
  },
  XPRESS_HALFCARD_CLOSE: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  XPRESS_CREDIT_LOAD: {
    ma: data => getMAData('widgetItemLoad', '', data)
  },
  XPRESS_CREDIT_CLICK: {
    ma: data =>
      getMAData('Cart Page - Express Checkout myn_credit click', '', data)
  },
  XPRESS_CHECKOUT_FLAG: {
    ma: data => getMAData('Cart Page - express_checkout_flag', '', data)
  },
  XPRESS_CHECKOUT_PAYNOW_FLAG: {
    ma: data => getMAData('Cart Page - express_checkout_paynow_flag', '', data)
  },
  CART_PLACE_ORDER: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  BANK_OFFERS_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  BANK_OFFERS_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  BANK_OFFERS_CLOSE: {
    ma: data => getMAData('other', '', data)
  },
  BANK_OFFERS_VIEWED: {
    ma: data => getMAData('widget_item_load', '', data)
  },
  CART_OOS_LOAD_WIDGET: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  CART_OOS_SIMILAR_LOAD_WIDGET: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  CART_OOS_SHELL_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  PRICE_BLOCK_LOAD: {
    ma: data => getMAData('widgetLoad', '', data)
  },
  CART_OOS_CLICK_WIDGET: {
    ma: data => getMAData('widgetClick', '', data)
  },
  CART_OOS_BUTTON_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  CONFIRMATION_SCREEN_LOAD: {
    ga: () => ({ eventType: 'pageView' }),
    ma: data => getMAData('ScreenLoad', 'Checkout Confirmation', data),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.confirmationScreen,
        'ecommerce-screen-load',
        '',
        data.mynacoAttributes,
        data.customEvents
      ),
    mynacoV3: ({ mynacoV3Data, gaData }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event: 'ECOMMERCE_SCREEN_LOAD',
        screen: CONSTANTS.confirmationScreen,
        type: 'ecommerce-screen-load'
      })
  },
  CONFIRMATION_EC_ADD_PRODUCT: {
    ga: data => ({ eventType: 'ec', ...data.gaData })
  },
  CONFIRMATION_EC_PURCHASE: {
    ga: data => ({ eventType: 'ec', ...data.gaData })
  },
  TAG_SIZE_PROFILE: {
    ma: data => getMAData('tag_size_profile', CONSTANTS.confirmation, data)
  },
  CREATE_SIZE_PROFILE: {
    ma: () => getMAData('create_size_profile', CONSTANTS.confirmation)
  },
  UPDATE_SIZE_PROFILE_INITIATE: {
    ma: () => getMAData('update_size_profile_initiate', CONSTANTS.confirmation)
  },
  CART_FILLER_LOAD: {
    ma: data => getMAData('Cart Filler Load', CONSTANTS.cartScreen, data)
  },
  CART_OOS_SIMILAR_ADD_TO_CART: {
    ma: data => getMAData('oosSimilarAddToCart', CONSTANTS.cartScreen, data),
    mynaco: data =>
      getMynacoData(
        CONSTANTS.cart,
        'oosSimilarAddToCart',
        '',
        data.mynacoAttributes
      ),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.address,
        type: 'oosSimilarAddToCart'
      })
  },
  CART_FILLER_ADD_TO_CART: {
    ma: data => getMAData('addToCart', CONSTANTS.cartScreen, data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'addToCart', '', data.mynacoAttributes),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.address,
        type: 'addToCart'
      })
  },
  CART_FILLER_MINI_PDP: {
    ma: data =>
      getMAData('Cart Filler Product Click', CONSTANTS.cartScreen, data)
  },
  ORDER_CONFIRM_VIEW_ORDERS: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - view orders widget click',
        CONSTANTS.confirmationScreen,
        data
      )
  },
  VIEW_ORDER_CONFIRMATION: {
    ma: data =>
      getMAData(
        'Order confirmation page - View',
        CONSTANTS.confirmationScreen,
        data
      )
  },
  ORDER_CONFIRM_USER_PROFILE: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - user selection widget click',
        CONSTANTS.confirmationScreen,
        data
      )
  },
  ORDER_CONFIRM_APP_FEEDBACK: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - app feedback widget click',
        CONSTANTS.confirmationScreen,
        data
      )
  },
  INSIDER_SUPERCOIN_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.confirmationScreen, data)
  },
  INSIDER_SUPERCOIN_WIDGET_CTA_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  INSIDER_SUPERCOIN_WIDGET_CHEVRON_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  INSIDER_SUPERCOIN_WIDGET_REWARD_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  SCRATCH_CARD_WIDGET_LOAD: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - Scratch card widget load',
        'widgetLoad',
        data
      )
  },
  SCRATCH_CARD_WIDGET_CLICK: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - Scratch card widget click',
        'widgetClick',
        data
      )
  },
  EXPRESS_DELIVERY_ELIGIBILITY: {
    ma: data => getMAData('Address - Express_Delivery_Load', '', data)
  },
  COVER_FEE: {
    ma: data => getMAData('CoverFee', '', data)
  },
  ADDRESS_SCREEN_LOAD: {
    ma: data => getMAData('ScreenLoad', 'Address', data),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'ecommerce-screen-load', '', {})
  },
  PAGE_VIEW: {
    ga: () => getGAData(CONSTANTS.address, 'page_view')
  },
  ADDRESS_DELIVERY_PROMISE: {
    ma: maData => getMAData('widgetLoad', CONSTANTS.address, { maData }),
    mynaco: data => getMynacoData(CONSTANTS.address, 'widgetLoad', '', data)
  },
  EDIT_ADDRESS_CANCEL: {
    ga: () => getGAData(CONSTANTS.address, 'editaddress-cancel'),
    mynaco: () => getMynacoData(CONSTANTS.address, 'editaddress-cancel', '', {})
  },
  ADD_ADDRESS_CANCEL: {
    ga: () => getGAData(CONSTANTS.address, 'addaddress-cancel'),
    mynaco: () => getMynacoData(CONSTANTS.address, 'addaddress-cancel', '', {})
  },
  EDIT_ADDRESS_FAILURE: {
    ga: data =>
      getGAData(CONSTANTS.address, 'editaddress-failure', data.gaLabel),
    ma: data => getMAData('Edit Address Error', 'widgetClick', data)
  },
  ADD_ADDRESS_FAILURE: {
    ga: data =>
      getGAData(CONSTANTS.address, 'addaddress-failure', data.gaLabel),
    ma: data => getMAData('Add Address Error', 'widgetClick', data)
  },
  EDIT_ADDRESS_SUCCESS: {
    ga: data =>
      getGAData(CONSTANTS.address, 'editaddress-success', data.gaLabel),
    ma: data => getMAData('Edit Address Success', 'widgetClick', data)
  },
  ADD_ADDRESS_SUCCESS: {
    ga: data =>
      getGAData(CONSTANTS.address, 'addaddress-success', data.gaLabel),
    ma: data => getMAData('Add Address Success', 'widgetClick', data)
  },
  ADDRESS_SCORE_BAD: {
    ga: () =>
      getGAData(CONSTANTS.address, 'Scored address', 'Address score bad'),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'scored-address', '', {
        category: 'Checkout',
        action: 'Scored address',
        label: 'Address score bad'
      })
  },
  HOME_ADDRESS: {
    ga: () => getGAData(CONSTANTS.address, 'home-address'),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'home-address', '', {
        category: 'Checkout',
        action: 'AddressType-Selection',
        label: 'checkbox-home-type'
      })
  },
  OFFICE_ADDRESS: {
    ga: () => getGAData(CONSTANTS.address, 'Office-address'),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'Office-address', '', {
        category: 'Checkout',
        action: 'AddressType-Selection',
        label: 'checkbox-Office-type'
      })
  },
  ADDRESS_SUB_TYPE_SELECTION: {
    ga: data =>
      getGAData(CONSTANTS.address, 'AddressSubType-Selection', data.gaLabel),
    mynaco: data =>
      getMynacoData(CONSTANTS.address, 'AddressSubType-Selection', '', {
        category: 'Checkout',
        action: 'AddressSubType-Selection',
        label: data.gaLabel
      })
  },
  TWO_FA_ENABLED: {
    ma: data =>
      getMAData('two_fa_enabled_for_user', CONSTANTS.PAYMENT_OTP, data)
  },
  HOW_IT_WORKS_CLICKED: {
    ga: ({ pageSource }) =>
      getGAData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'HOW IT WORKS - CLICKED',
        'CLICKED'
      ),
    mynaco: ({ pageSource }) =>
      getMynacoData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'HOW IT WORKS - CLICKED',
        '',
        'CLICKED'
      )
  },
  HOW_IT_WORKS_HIDE: {
    ga: ({ pageSource }) =>
      getGAData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'HIDE - HOW IT WORKS',
        'HIDE'
      ),
    mynaco: ({ pageSource }) =>
      getMynacoData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'HIDE - HOW IT WORKS',
        '',
        'HIDE'
      )
  },
  VIEW_MORE_HIDE: {
    ma: ({ pageSource, ...data }) =>
      getMAData(
        'HIDE - VIEW MORE',
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        data
      )
  },
  VIEW_MORE_CLICKED: {
    ma: ({ pageSource, ...data }) =>
      getMAData(
        'CLICKED - VIEW MORE',
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        data
      )
  },
  TRY_AND_BUY_CHECKED: {
    ga: ({ pageSource }) =>
      getGAData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'TRYANDBUYCHECKED',
        'checked'
      ),
    mynaco: ({ pageSource }) =>
      getMynacoData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'TRYANDBUYCHECKED',
        'checked'
      )
  },
  TRY_AND_BUY_UNCHECKED: {
    ga: ({ pageSource }) =>
      getGAData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'TRYANDBUYUNCHECKED',
        'unchecked'
      ),
    mynaco: ({ pageSource }) =>
      getMynacoData(
        pageSource === checkoutPage.CART
          ? CONSTANTS.cartScreen
          : CONSTANTS.address,
        'TRYANDBUYUNCHECKED',
        'unchecked'
      )
  },
  SHIPPING_METHOD_CLICK: {
    ga: data => getGAData(CONSTANTS.address, data.gaLabel, 'confirm')
  },
  BTN_CONTINUE_CLICK: {
    ga: () => getGAData(CONSTANTS.address, 'btn_continue_click')
  },
  CHECKOUT_CONVERSATION: {
    ga: () => getGAData('Checkout_conversion', 'Address_to_Payment_page')
  },
  SELECT_ADDRESS_CLICK: {
    ga: () => getGAData(CONSTANTS.address, 'select_address_click')
  },
  ADDRESS_SELECTED: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.address, 'address-select', gaLabel),
    mynaco: ({ custom }) =>
      getMynacoData(CONSTANTS.address, 'address-select', '', custom),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.address,
        type: 'address-select'
      })
  },
  VALID_ADDRESS_SELECTED: {
    ga: () =>
      getGAData(
        CONSTANTS.address,
        'Valid address selected',
        'Valid address selected'
      ),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'valid-address-selected', '', {
        category: 'Checkout',
        action: 'Valid address selected',
        label: 'Valid address selected'
      })
  },
  BAD_ADDRESS_SELECTED: {
    ga: () =>
      getGAData(
        CONSTANTS.address,
        'Bad address selected',
        'Bad address selected'
      ),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'bad-address-selected', '', {
        category: 'Checkout',
        action: 'Bad address selected',
        label: 'Bad address selected'
      })
  },
  DELETE_ADDRESS_CLICK: {
    ga: () => getGAData(CONSTANTS.address, 'delete_address_click')
  },
  ADD_NEW_ADDRESS_CLICK: {
    ga: () => getGAData(CONSTANTS.address, 'add_new_address_click')
  },
  ADD_ADDRESS_INITIALIZE: {
    ga: () => getGAData(CONSTANTS.address, 'addaddress-initialize'),
    mynaco: () =>
      getMynacoData(CONSTANTS.address, 'addaddress-initialize', '', {})
  },
  EDIT_ADDRESS_CLICK: {
    ga: () => getGAData(CONSTANTS.address, 'show_edit_address_click')
  },
  EDIT_ADDRESS_INITIALIZE: {
    ga: () => getGAData(CONSTANTS.address, 'editaddress-initialize'),
    mynaco: ({ mynacoLabel }) =>
      getMynacoData(CONSTANTS.address, 'editaddress-initialize', '', {
        mynacoLabel
      })
  },
  ADDRESS_ERROR: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.address, 'address_collection', gaLabel)
  },
  NOT_SERVICEABLE_ADDRESS_SELECTED: {
    ga: () => getGAData(CONSTANTS.address, 'not-serviceable-address-selected')
  },
  NOT_SERVICEABLE_ADDRESS_GO_TO_BAG: {
    ga: ({ gaLabel }) =>
      getGAData(
        CONSTANTS.address,
        'not-serviceable-address-gotoBagClick',
        gaLabel
      )
  },
  NOT_SERVICEABLE_ADDRESS_ITEM: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.address, 'not-serviceable-address-item', gaLabel)
  },
  DELIVERY_PREFERENCE_ADDRESS: {
    ma: data =>
      getMAData('Address - Delivery_preference_address', 'other', data)
  },
  DELIVERY_PREFERENCE_ORDER: {
    ma: data =>
      getMAData(
        'Order Confirmation Page - Delivery_preference_order',
        'other',
        data
      )
  },
  MOVE_OUT_OF_BAG_BUTTON_CLICK: {
    ma: data => getMAData('move_out_of_bag_click', CONSTANTS.cart, data)
  },
  TOTAL_AMOUNT_CLICK: {
    ma: data => getMAData('total_amount_click', CONSTANTS.cart, data)
  },
  PRICE_DETAIL_CLICK: {
    ma: data => getMAData('price_detail_click', CONSTANTS.cart, data)
  },
  SELECTIVE_ENHANCED_REMOVE: {
    ma: data => getMAData('selective_remove_product', CONSTANTS.cart, data)
  },
  SELECTIVE_ENHANCED_WISHLIST: {
    ma: data => getMAData('selective_wishlist_product', CONSTANTS.cart, data)
  },
  PROCEED_NEXT_FROM_CART: {
    ma: data => getMAData('Cart page - savings_shown', 'other', data)
  },
  TRY_AND_BUY_WIDGET_LOAD: {
    ma: ({ pageSource, ...data }) =>
      getMAData(
        `${
          pageSource === checkoutPage.CART ? 'Address' : 'Cart'
        } Page - Try & Buy card load`,
        'widgetLoad',
        data
      )
  },
  PAYMENT_FAILURE_HALFCARD_LOAD: {
    ma: data => getMAData('widgetLoad', 'widgetLoad', data)
  },
  PAYMENT_FAILURE_HALFCARD_CLICK: {
    ma: data => getMAData('widgetitemclick', 'widgetitemclick', data)
  },
  GET_PAYMENT_OPTIONS_ERROR: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'get_payments_options_error', gaLabel)
  },
  PAYMENT_PAGE_LOAD_ERROR: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'payments_page_load_error', gaLabel)
  },
  PAYMENT_SCREEN_LOAD: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'screen-load'),
    ma: data => getMAData('ScreenLoad', CONSTANTS.paymentScreen, data),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'ecommerce-screen-load', '', {})
  },
  PAYMENT_OPTIONS_ORDER: {
    ma: data =>
      getMAData('payment_options_order', CONSTANTS.paymentScreen, data)
  },
  PAYMENT_PAGE_VIEW: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'page_view')
  },
  PAYMENT_TAB_CLICK: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'paymentmethod-select', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'paymentmethod-select', '', {
        paymentmethod: gaLabel
      })
  },
  PAYMENT_TAB_TOGGLE_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  PAYMENT_OPTION_SUBMIT: {
    ma: data =>
      getMAData('payment_option_submit', CONSTANTS.paymentScreen, data)
  },
  PAYMENT_UPI_OPTION_SELECT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'upi-option-select', gaLabel)
  },
  PAYMENT_ERROR: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'payment-failure', gaLabel),
    mynaco: ({ mynacoAttributes }) =>
      getMynacoData(
        CONSTANTS.paymentScreen,
        'payment-failure',
        '',
        mynacoAttributes
      ),
    ma: data =>
      getMAData('paymentFailureErrorCode', CONSTANTS.paymentScreen, data)
  },
  OTP_LOAD: {
    ga: () =>
      getGAData(
        CONSTANTS.paymentScreen,
        'mobile verf card load',
        'cod payment'
      ),
    mynaco: () =>
      getMynacoData(
        CONSTANTS.paymentScreen,
        'mobile verf card load',
        'cod payment'
      )
  },
  CAPTCHA_LOAD: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'captcha widget load', 'cod'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'captcha widget load', 'cod'),
    mynacoV3: ({ gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data: {
          templateData: {
            label: 'cod'
          }
        },
        gaData,
        event,
        screen: CONSTANTS.paymentScreen,
        type: 'captcha widget load',
        category: 'checkout'
      })
  },
  RESEND_OTP: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'resend otp'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
        category: 'mobile verification',
        action: 'waiting otp',
        label: 'resend otp'
      })
  },
  OTP_TIMEOUT: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'timeout'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
        category: 'mobile verification',
        action: 'waiting otp',
        label: 'timeout'
      })
  },
  OTP_ERROR: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'Cod-OTP', 'error'),
    mynaco: () => getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', 'error')
  },
  CAPTCHA_CHANGE: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'captcha refresh', ''),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'captcha-reload', '', {})
  },
  CAPTCHA_ENTRY: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'captcha entry', ''),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'captcha entry', '', {
        category: 'checkout',
        action: 'captcha entry',
        label: ''
      }),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.paymentScreen,
        type: 'captcha entry',
        category: 'checkout'
      })
  },
  OTP_ENTRY: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'enter otp'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
        category: 'mobile verification',
        action: 'waiting otp',
        label: 'enter otp'
      })
  },
  OTP_SUCCESS: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'otp entered successfully', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', {
        category: 'checkout',
        action: 'otp entered successfully',
        label: gaLabel
      })
  },
  CAPTCHA_SUCCESS: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'captcha success', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'captcha success', gaLabel),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.paymentScreen,
        type: 'captcha success',
        category: CONSTANTS.paymentScreen
      })
  },
  CAPTCHA_FAILURE: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'captcha fail', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'captcha fail', gaLabel),
    ma: data => getMAData('widgetItemLoad', '', data)
  },
  COD_SUCCESS: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'cod-success'),
    mynaco: () => getMynacoData(CONSTANTS.paymentScreen, 'cod-success', '', {}),
    mynacoV3: ({ gaData, event }) =>
      getGenericMynacoData({
        gaData,
        event,
        action: 'COD Success',
        screen: CONSTANTS.paymentScreen,
        type: 'cod-success',
        category: 'Checkout'
      })
  },
  COD_FAILURE: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'cod-failure', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'cod-failure', '', {
        error: gaLabel
      })
  },
  SAVED_CARD_SELECTED: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'saved-card-selected'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'saved-card-selected', '', {})
  },
  CLOSE_SAVED_CARDS: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'card-save-optedout'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'card-save-optedout', '', {}),
    mynacoV3: ({ gaData, event }) =>
      getGenericMynacoData({
        gaData,
        action: 'Card Save Opted-Out',
        event,
        screen: CONSTANTS.paymentScreen,
        type: CONSTANTS.paymentScreen,
        category: 'Checkout'
      })
  },
  OPEN_SAVED_CARDS: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'card-save-optedin'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'card-save-optedin', '', {})
  },
  CARD_SUBMIT: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'creditcard-submit'),
    mynaco: () =>
      getMynacoData(CONSTANTS.paymentScreen, 'creditcard-submit', '', {}),
    mynacoV3: ({ gaData, event }) =>
      getGenericMynacoData({
        gaData,
        event,
        action: 'Add Credit Card Redirect',
        screen: CONSTANTS.paymentScreen,
        type: 'creditcard-submit',
        category: 'Checkout'
      })
  },
  PROCEED_TO_PAY: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'proceed_to_pay', gaLabel)
  },
  NETBANKING_SELECT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'netbanking-select', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'netbanking-select', '', {
        bankName: gaLabel
      })
  },
  NETBANKING_SUBMIT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'netbanking-submit', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'netbanking-submit', '', {
        bankName: gaLabel
      })
  },
  WALLET_SELECT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'wallet-select', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'wallet-select', '', {
        walletName: gaLabel
      })
  },
  WALLET_SUBMIT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'wallet-submit', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'wallet-submit', '', {
        walletName: gaLabel
      })
  },
  GIFTCARD_FAILURE: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'giftcard-failure', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'giftcard-failure', '', {
        error: gaLabel
      })
  },
  GIFTCARD_SUCCESS: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'giftcard-success', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'giftcard-success', '', {
        'giftcard-amount': gaLabel
      })
  },
  CONVERT_TO_COD: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'convert-to-COD', gaLabel),
    mynaco: ({ gaLabel }) =>
      getMynacoData(CONSTANTS.paymentScreen, 'convert-to-COD', gaLabel)
  },
  CHECK_ELIGIBILITY: {
    ga: () =>
      getGAData(CONSTANTS.paymentScreen, 'bank_offer_check_availability')
  },
  CLOSE_TWOFA: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA Pop-up Closed by User'),
    ma: () => getMAData('MYNTRA_2FA_PAYMENTS_PAGE_POPUPCLOSED', 'widgetClick')
  },
  SUBMIT_TWOFA: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA OTP Submit'),
    ma: data =>
      getMAData('MYNTRA_2FA_PAYMENTS_PAGE_SUBMIT', 'widgetClick', data)
  },
  SHOW_TWOFA: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA Pop up Shown'),
    ma: data => getMAData('MYNTRA_2FA_PAYMENTS_PAGE_SHOW', 'widgetLoad', data)
  },
  TWOFA_CHANGE_NUMBER: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA Mobile Number Change button')
  },
  TWOFA_SELECT_NUMBER: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA Mobile Number Selected')
  },
  TWOFA_OTP_SUCCESS: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA OTP Send - Successful'),
    ma: () => getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPSUCCESS', 'widgetClick')
  },
  TWOFA_OTP_FAIL: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA OTP Send - Failed'),
    ma: () => getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPFAILED', 'widgetClick')
  },
  TWOFA_OTP_SENT: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA OTP Sent'),
    ma: () => getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPSENT', 'widgetClick')
  },
  TWOFA_OTP_RESENT: {
    ga: () => getGAData(CONSTANTS.TWOFA, '2FA OTP Resent')
  },
  PARTNER_BANNER_CLICKED: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.confirmation, 'partner-banner-clicked', gaLabel)
  },
  COUPON_SCREEN_LOAD: {
    ma: data => getMAData('ScreenLoad', 'checkout-coupon-page', data),
    mynaco: () => getMynacoData('coupon-page', 'ecommerce-screen-load', '', {})
  },
  CREDITS_WIDGET_CLICK: {
    ma: data => getMAData('credits-widget-click', 'widgetClick', data)
  },
  CART_SUPERCOINS_CREDIT_WIDGET_LOAD: {
    ma: data => getMAData('cart_insider_cncWidget', 'widgetLoad', data)
  },
  CART_SUPERCOINS_CREDIT_WIDGET_CLICK: {
    ma: data => getMAData('cart_insider_cncWidget_Click', 'widgetClick', data)
  },
  CART_SUPERCOINS_HALF_CARD_CREDIT_SCREEN_LOAD: {
    ma: data =>
      getMAData(
        'cart_Insider_cncConsentHalfcard',
        'half-card-consent-screen',
        data
      )
  },
  COD_FALLBACK: {
    ga: () => getGAData(CONSTANTS.paymentScreen, 'payment-cod-fallback'),
    ma: data => getMAData('codFallback', '', data)
  },
  CONFIRMATION_FALLBACK: {
    ga: () => getGAData(CONSTANTS.confirmation, 'confirmation-error-fallback')
  },
  A2HS_WIDGET_CLICK: {
    ga: () => getGAData(CONSTANTS.A2HS, 'custom_ui_click', 'thankyou_page')
  },
  A2HS_INSTALLED: {
    ga: ({ gaLabel }) => getGAData(CONSTANTS.A2HS, 'accept_prompt', gaLabel)
  },
  A2HS_INSTALL_VIEW: {
    ga: () => getGAData(CONSTANTS.A2HS, 'install_steps_view')
  },
  A2HS_REMINDER_VIEW: {
    ga: () => getGAData(CONSTANTS.A2HS, 'reminder_steps_view')
  },
  BEGIN_CHECKOUT: {
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'begin_checkout', data.mynacoLabel),
    mynacoV3: ({ mynacoV3Data, gaData, event }) =>
      getGenericMynacoData({
        mynacoV3Data,
        gaData,
        event,
        screen: CONSTANTS.cart,
        type: 'begin_checkout'
      })
  },
  INSIDER_REWARDS_WIDGET_LOAD: {
    ma: data =>
      getMAData('cart page - insider rewards widget load', 'widgetLoad', data)
  },
  INSIDER_REWARDS_ENROLL_TEXT_CLICK: {
    ma: data =>
      getMAData(
        'cart page - enroll insider widget item click',
        'widgetItemClick',
        data
      )
  },
  INSIDER_REWARDS_MODAL_ENROLL_BUTTON_CLICK: {
    ma: data =>
      getMAData(
        'cart page - enroll insider popup item click',
        'widgetItemClick',
        data
      )
  },
  PAYMENT_OTP_LOAD: {
    ga: () => getGAData(CONSTANTS.PAYMENT_OTP, 'screen-load')
  },
  PAYMENT_OTP_SUBMIT: {
    ga: () => getGAData(CONSTANTS.PAYMENT_OTP, 'submit')
  },
  PAYMENT_OTP_RESEND: {
    ga: () => getGAData(CONSTANTS.PAYMENT_OTP, 'resend')
  },
  PAYMENT_OTP_BANK_REDIRECT: {
    ga: () => getGAData(CONSTANTS.PAYMENT_OTP, 'bank-redirect')
  },
  REMOVE_EXPIRED_CARD: {
    ma: data => getMAData('expired card removed', CONSTANTS.paymentScreen, data)
  },
  PAYMENT_CHANGE_ADDRESS: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'change_address', gaLabel)
  },
  PAY_NOW_SUCCESS: {
    ga: data =>
      getGAData(
        CONSTANTS.PAY_NOW_SUCCESS,
        'paynowSuccess',
        `${data.version}|${data.url}|${data.templateCode}`
      ),
    ma: data => getMAData(CONSTANTS.PAY_NOW_SUCCESS, 'paynowSuccess', data)
  },
  PAY_NOW_ERROR: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.PAY_NOW_ERROR, 'paynowError', gaLabel),
    ma: ({ maData }) =>
      getMAData(CONSTANTS.PAY_NOW_ERROR, 'paynowError', maData)
  },
  PAY_NOW_ERROR_PAYLOAD: {
    ma: data => getMAData('paynowErrorPayload', CONSTANTS.paymentScreen, data)
  },
  CART_PRICE_CHANGE_STRIP_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cart, data)
  },
  CART_PRICE_CHANGE_DETAILS_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.cart, data)
  },
  LOW_SR_MESSAGE_DISPLAY: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'display_low_sr', gaLabel),
    ma: data => getMAData('display_low_sr', CONSTANTS.paymentScreen, data)
  },
  CONFIRMATION_RECOMMENDATIONS_STYLE_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_RECOMMENDATIONS_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_ORDER_STYLE_CLICK: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_RECOMMENDATIONS_VIEW_MORE: {
    ma: data => getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_SAVINGS_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_TOTAL_SAVINGS_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_INSIDER_POINTS_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.confirmationScreen, data)
  },
  CONFIRMATION_INSIDER_POINTS_WIDGET_CLICK: {
    ma: data => getMAData('widgetClick', CONSTANTS.confirmationScreen, data)
  },
  LOW_SR_DISABLE_INSTRUMENT: {
    ga: ({ gaLabel }) =>
      getGAData(CONSTANTS.paymentScreen, 'low_sr_disable', gaLabel),
    ma: data => getMAData('low_sr_disable', CONSTANTS.paymentScreen, data)
  },
  USE_MY_LOCATION_CLICK: {
    ma: data => getMAData('use_my_location_click', CONSTANTS.address, data)
  },
  USE_MY_LOCATION_ALLOWED: {
    ma: data => getMAData('use_my_location_allow', CONSTANTS.address, data)
  },
  USE_MY_LOCATION_DENIED: {
    ma: data => getMAData('use_my_location_denied', CONSTANTS.address, data)
  },
  SUGGESTED_LOCALITY: {
    ma: data => getMAData('suggested_locality', CONSTANTS.address, data)
  },
  SAVED_LOCALITY: {
    ma: data => getMAData('saved_locality', CONSTANTS.address, data)
  },
  ADDRESS_SUGGESTION_ERROR: {
    ma: data => getMAData('address_suggestion_error', CONSTANTS.address, data)
  },
  SHOW_MORE_OFFER_BTN_CLICK: {
    ma: data => getMAData('show_more_offer_btn_click', CONSTANTS.cart, data)
  },
  CHANGE_ADDRESS_BTN_CLICK: {
    ma: data => getMAData('change_address_btn_click', 'addressOnCart', data)
  },
  ENTER_PIN_CODE: {
    ma: data => getMAData('enter_pin_code_open', 'addressOnCart', data)
  },
  VALID_PIN_CODE: {
    ma: data => getMAData('valid_pin_code_entered', 'addressOnCart', data)
  },
  INVALID_PIN_CODE: {
    ma: data => getMAData('invalid_pin_code_entered', 'addressOnCart', data)
  },
  ITEM_LEVEL_SERVICE_FOR_PINCODE: {
    ma: data =>
      getMAData('item_level_services_for_pincode', 'addressOnCart', data)
  },
  ADDRESS_CHANGE_ON_CART: {
    ma: data => getMAData('address_change_on_cart', 'addressOnCart', data)
  },
  STYLE_EXCHANGE_BANNER_LOAD: {
    ma: data => getMAData('widgetLoad', 'styleExchange', data)
  },
  STYLE_EXCHANGE_CANCEL_EXCHANGE_CLICK: {
    ma: data => getMAData('cancel_exchange_click', 'styleExchange', data)
  },
  STYLE_EXCHANGE_CANCEL_EXCHANGE_CONFIRM: {
    ma: data => getMAData('cancel_exchange_confirm', 'styleExchange', data)
  },
  STYLE_EXCHANGE_HOW_IT_WORKS_CLICK: {
    ma: data => getMAData('how_it_works_click', 'styleExchange', data)
  },
  STYLE_EXCHANGE_KNOW_MORE_CLICK: {
    ma: data => getMAData('know_more_click', 'styleExchange', data)
  },
  STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_CANCEL: {
    ma: data =>
      getMAData('address_error_exchange_cancel', 'styleExchange', data)
  },
  STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_REINITIATE: {
    ma: data =>
      getMAData('address_error_exchange_reinitiate', 'styleExchange', data)
  },
  PRICE_BLOCK_KNOW_MORE_CLICK: {
    ma: data => getMAData('price_block_know_more_click', 'priceDetails', data)
  },
  PLUTUS_PAYLOAD: {
    ma: data =>
      getMAData('plutus_eligibility_payload', CONSTANTS.paymentScreen, data)
  },
  GIFTCARD_CONTEXT_PAYMENT: {
    ma: data => getMAData('Gift Cards Context Payments', 'Giftcard', data)
  },
  RETURN_ABUSER_MODAL_OPEN: {
    ma: data => getMAData('return_abuser_modal_open', 'priceDetails', data)
  },
  RETURN_ABUSER_MODAL_CLOSE: {
    ma: data => getMAData('return_abuser_modal_close', 'priceDetails', data)
  },
  ATTACHED_PRODUCT_VIEW_ITEMS_CLICK: {
    ma: data =>
      getMAData('attached_product_view_items_click', CONSTANTS.cart, data)
  },
  ATTACHED_PRODUCT_TOUCH_POINT_CLICK: {
    ma: data => getMAData('attached_product_touch_click', CONSTANTS.cart, data)
  },
  COUPON_DISCOUNT_BREAKUP_CLICK: {
    ma: data => getMAData('coupon_discount_breakup_click', 'priceDetails', data)
  },
  ATTACHED_PRODUCTS_OPERATIONS: {
    ma: data => getMAData('attached_products_operations', CONSTANTS.cart, data)
  },
  ITEM_QUANTITY_CHANGE: {
    ma: data => getMAData('item_quantity_change', CONSTANTS.cart, data)
  },
  TERMS_OF_USE_CLICK: {
    ma: data => getMAData('terms_of_use_click', 'privacy', data)
  },
  PRIVACY_POLICY_CLICK: {
    ma: data => getMAData('privacy_policy_click', 'privacy', data)
  },
  DOPE_PAYMENT_FAILED_PAGE_LOAD: {
    ma: data => getMAData('dope_payment_failed_page_load', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_OPEN: {
    ma: data =>
      getMAData('dope_payment_failed_cancel_order_modal_open', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_CANCEL_ORDER_KEEP_CLICK: {
    ma: data =>
      getMAData('dope_payment_failed_cancel_order_keep_click', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_CANCEL_ORDER_CLICK: {
    ma: data =>
      getMAData('dope_payment_failed_cancel_order_click', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE: {
    ma: data =>
      getMAData('dope_payment_failed_cancel_order_modal_close', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_RETRY_PAYMENT_CLICK: {
    ma: data =>
      getMAData('dope_payment_failed_retry_payment_click', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_VIEW_ORDER_CLICK: {
    ma: data => getMAData('dope_payment_failed_view_order_click', 'dope', data)
  },
  DOPE_PAYMENT_FAILED_SEE_HOW_CLICK: {
    ma: data => getMAData('dope_payment_failed_see_how_click', 'dope', data)
  },
  DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK: {
    ma: data =>
      getMAData('dope_payment_pending_cancel_order_click', 'dope', data)
  },
  DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK: {
    ma: data =>
      getMAData('dope_payment_pending_retry_payment_click', 'dope', data)
  },
  DOPE_PAYMENT_PENDING_SEE_HOW_CLICK: {
    ma: data => getMAData('dope_payment_pending_see_how_click', 'dope', data)
  },
  DOPE_RETRY_PAYMENT_PAGE_LOADED: {
    ma: data => getMAData('dope_retry_payment_page_loaded', 'dope', data)
  },
  DOPE_RETRY_PAYMENT_SESSION_EXPIRED: {
    ma: data => getMAData('dope_retry_payment_session_expired', 'dope', data)
  },
  DOPE_RETRY_PAYMENT_COMPLETED: {
    ma: data => getMAData('dope_retry_payment_completed', 'dope', data)
  },
  DOPE_RETRY_PAYMENT_PENDING: {
    ma: data => getMAData('dope_retry_payment_pending', 'dope', data)
  },
  ORDER_DETAILS_BTN_CLICK: {
    ma: data =>
      getMAData('order_details_btn_click', CONSTANTS.confirmation, data)
  },
  PRODUCT_TO_PROFILE_TAG_CLICK: {
    ma: data =>
      getMAData('product_to_profile_tag_click', CONSTANTS.confirmation, data)
  },
  MY_COUPONS_BTN_CLICK: {
    ma: data => getMAData('my_coupons_btn_click', CONSTANTS.confirmation, data)
  },
  RECO_HALFCARD_CLOSE: {
    ma: data =>
      getMAData('Cart Page - cart_reco_atc_close', CONSTANTS.cart, data)
  },
  WISHLIST_IN_VIEW_PORT: {
    ma: data =>
      getMAData('Cart Page - wishlist_reco_flag', CONSTANTS.cart, data)
  },
  WISHLIST_ADD_TO_CART: {
    ma: data => getMAData('addToCart', CONSTANTS.cart, data)
  },
  WISHLIST_SIZE_SELECTOR_CLICK: {
    ma: data =>
      getMAData('Cart Page - add_to_bag_initial_click', CONSTANTS.cart, data)
  },
  WISHLIST_CARD_LOAD: {
    ma: data =>
      getMAData('Cart Page - wishlist_card_load', CONSTANTS.cart, data)
  },
  WISHLIST_PRODUCT_CLICK: {
    ma: data =>
      getMAData('Cart Page - wishlist_card_product_click', CONSTANTS.cart, data)
  },
  CART_SHARE_CLICK: {
    ma: data => getMAData('cart_share_button_click', CONSTANTS.cart, data)
  },
  AT_PILL_CLICK: {
    ma: data => getMAData('at_pill_click', CONSTANTS.cart, data)
  },
  DELETE_ADDRESS_BTN_CLICK: {
    ma: data => getMAData('delete_address', 'addressOnCartV2', data)
  },
  EDIT_ADDRESS_BTN_CLICK: {
    ma: data => getMAData('edit_address', 'addressOnCartV2', data)
  },
  ADD_ADDRESS_TOP_BTN_CLICK: {
    ma: data => getMAData('add_address_top', 'addressOnCartV2', data)
  },
  ADD_ADDRESS_BOTTOM_BTN_CLICK: {
    ma: data => getMAData('add_address_bottom', 'addressOnCartV2', data)
  },
  CHANGE_ADDRESS_BTN_CLICK_PAYMENT: {
    ma: data =>
      getMAData('payment_change_button_click', 'addressOnCartV2', data)
  },
  CHANGE_ADDRESS_BTN_CLICK_CART: {
    ma: data => getMAData('change_button_click', 'addressOnCartV2', data)
  },
  ADDRESS_CHANGE_ON_CART_V2: {
    ma: data => getMAData('address_change', 'addressOnCartV2', data)
  },
  ADDRESS_SELECT_ON_CART_V2: {
    ma: data => getMAData('address_select', 'addressOnCartV2', data)
  },
  ADD_LANDMARK_CLICK: {
    ma: data => getMAData('add_landmark_click', CONSTANTS.address, data)
  },
  LIVE_CUST_LOAD: {
    ma: data => getMAData('live_cust_load', 'widgetLoad', data)
  },
  COUPON_TIMER_LOAD: {
    ma: data => getMAData('Cart Page - coupon_timer_load', 'widgetLoad', data)
  },
  CUST_RATINGS_LOAD: {
    ma: data => getMAData('cust_ratings_load', 'widgetLoad', data)
  },
  UNSCRATCH_CARD_VIEW: {
    ma: data =>
      getMAData('Unscratch card - Unscratched_card_view', 'widgetLoad', data)
  },
  DISMISS_BEFORE_SCRATCH: {
    ma: data =>
      getMAData('Unscratch card - Scratch_card_dismiss', 'widgetLoad', data)
  },
  CARD_SCRATCH: {
    ma: data =>
      getMAData('Unscratch card - Scratch_card_scratch', 'widgetClick', data)
  },
  CARD_REVEAL: {
    ma: data =>
      getMAData('Scratched card - Scratch card reveal', 'widgetLoad', data)
  },
  DISMISS_AFTER_SCRATCH: {
    ma: data =>
      getMAData('Scratched card - rewards_card_close', 'widgetClick', data)
  },
  COUPON_COPY: {
    ma: data =>
      getMAData('Scratched card - scratch card copy click', 'widgetClick', data)
  },
  EXPLORE_PRODUCTS_CLICK: {
    ma: data =>
      getMAData('Scratched card - Explore products click', 'widgetClick', data)
  },
  EXPLORE_MORE: {
    ma: data =>
      getMAData('Scratched card - know more click', 'widgetClick', data)
  },
  FRG_CART_LOAD: {
    ma: data => getMAData('Cart Page - free_gift_load', 'widgetLoad', data)
  },
  MEXPRESS_LOAD: {
    ma: data =>
      getMAData('Cart Page - MExpress Product Viewport', 'widgetLoad', data)
  },
  MEXPRESS_PLUS_LOAD: {
    ma: data =>
      getMAData('Cart Page - MExpressPlus Product Viewport', 'widgetLoad', data)
  },
  STYLE_CAPPING_LOAD: {
    ma: data => getMAData('Cart Page - cart_cap_load', 'screenLoad', data)
  },
  RANGE_BASED_PROMISE: {
    ma: data => getMAData('Range Based Date Shown', 'widgetLoad', data)
  },
  ECOM_KNOW_MORE_CLICK: {
    ma: data =>
      getMAData(
        'ecom_message_know_more_click',
        CONSTANTS.paymentScreen,
        data,
        true
      )
  },
  INSIDER_REWARDS_IN_VIEW_PORT: {
    ma: data =>
      getMAData('Cart Page - supercoins_widget_load', CONSTANTS.cart, data)
  },
  INSIDER_REWARDS_INFO_CLICK: {
    ma: data =>
      getMAData(
        'Cart Page - supercoins_widget_info_click',
        CONSTANTS.cart,
        data
      )
  },
  INSIDER_REWARDS_MODAL_OPEN: {
    ma: data =>
      getMAData(
        'Cart Page - supercoins_widget_view_benefits_click',
        CONSTANTS.cart,
        data
      )
  },
  INSIDER_REWARDS_MODAL_CLOSE: {
    ma: data =>
      getMAData(
        'Cart Page - supercoins_benefits_halfcard_close',
        CONSTANTS.cart,
        data
      )
  },
  FINE_JWELLERY_CLICK: {
    ma: data => getMAData('widgetItemClick', '', data)
  },
  COUPON_NUDGES_CLICKED: {
    ma: data => getMAData('coupon_available_nudge_click', 'other', data)
  },
  COUPON_NUDGES_SHOWN: {
    ma: data => getMAData('coupon_available_nudge', 'other', data)
  },
  COUPON_NUDGES_ADD_ITEM: {
    ma: data => getMAData('coupon_add_item', 'widgetClick', data)
  },
  COUPON_NUDGES_COUPON_AVAILABLE: {
    ma: data =>
      getMAData(
        'Cart Page - coupon_nudges_coupon_available',
        'widgetLoad',
        data
      )
  },
  COUPON_NUDGES_LOGIN_SHOWN: {
    ma: data => getMAData('Cart Page - coupon_nudge_login_shown', 'other', data)
  },
  COUPON_NUDGES_LOGIN_CLICKED: {
    ma: data =>
      getMAData('Cart Page - coupon_nudge_login_click', 'widgetClick', data)
  },
  COUPON_NUDGES_COUPON_REMOVE: {
    ma: data =>
      getMAData('Cart Page - coupon_nudge_coupon_removed', 'other', data)
  },
  COUPON_NUDGES_APPLY_CLICKED: {
    ma: data =>
      getMAData(
        'Cart Page - coupon_nudges_coupon_apply_clicked',
        'widgetClick',
        data
      )
  },
  COUPON_NUDGES_ALL_COUPON_CLICK: {
    ma: data =>
      getMAData(
        'Cart Page - coupon_nudges_all_coupons_click',
        'widgetClick',
        data
      )
  },
  INSIDER_TRIALS_WIDGET_LOAD: {
    ma: data => getMAData('widgetLoad', CONSTANTS.cart, data)
  },
  ORDER_REVIEW_WIDGET_LOAD: {
    ma: data => getMAData('Payment - order_review_load', 'widgetLoad', data)
  },
  ORDER_REVIEW_WIDGET_CLICK: {
    ma: data =>
      getMAData('Payment - order_review_click', 'widgetItemClick', data)
  },
  ADDRESS_WIDGET_LOAD: {
    ma: data => getMAData('Payment - address_widget_load', 'widgetLoad', data)
  },
  ADDRESS_WIDGET_CLICK: {
    ma: data =>
      getMAData('Payment - address_widget_change_click', 'widgetClick', data)
  },
  ADDRESS_PAGE_LOAD: {
    ma: data =>
      getMAData('Payment - address_change_pageload', 'screenLoad', data)
  },
  APPLICABLE_COUPON_AVAILABLE: {
    ma: data =>
      getMAData('Cart Page - applicable_coupon_available', 'widgetLoad', data)
  },
  CART_COUNT_EVENT: {
    ma: data => getMAData('Cart count event', 'screenLoad', data),
    mynaco: data =>
      getMynacoData(CONSTANTS.cart, 'cartCountEvent', '', {
        category: CONSTANTS.cart,
        action: 'cartCountEvent',
        ...data.mynacoAttributes
      })
  },
  ORDER_CONFIRM_LOAD_NOTIF_WIDGET: {
    ma: data => getMAData('load_notif_widget', 'widgetLoad', data)
  },
  ORDER_CONFIRM_CLICK_NOTIF_WIDGET: {
    ma: data => getMAData('click_notif_widget', 'widgetClick', data)
  },
  INLINE_OFFER_AVAILABLE: {
    ma: data => getMAData('Inline Offer - Available', 'widgetLoad', data)
  },
  INLINE_OFFER_WIDGET_LOAD: {
    ma: data => getMAData('Inline Offer - widget load', 'widgetLoad', data)
  },
  INLINE_OFFER_OFFER_VIEW: {
    ma: data => getMAData('Inline Offer - Offers seen', 'screenLoad', data)
  },
  INLINE_OFFER_TNC_CLICK: {
    ma: data => getMAData('Inline Offer - tnc click', 'widgetItemClick', data)
  }
};

export {
  setPageContext,
  eventsConfig,
  pushGTMCartData,
  pushGTMConfirmationData,
  pushDataLayerObjectForGTM,
  initWebengage,
  triggerWebengage,
  trackSizeFit,
  configure as configureMA,
  flushEvents as flushMA
};

//Common exposed function to trigger both ga and ma events
export default function triggerEvent(event, data) {
  if (!eventsConfig[event]) {
    return;
  }

  if (
    typeof MyntApp !== 'undefined' &&
    typeof MyntApp.mynacoSendEvent === 'function'
  ) {
    const mynacoV3Config = eventsConfig[event].mynacoV3;
    const enabledInSwitch =
      getKVPairValue('MYNACO_GENERIC_EVENTS').indexOf(event) !== -1;
    if (
      typeof MyntApp.mynacoSendEventV3 === 'function' &&
      mynacoV3Config &&
      enabledInSwitch
    ) {
      const gaConf = eventsConfig[event].ga;
      const mynacoV3Data = data.mynacoV3;
      if (data.customEvents) {
        mynacoV3Data.customEvents = data.customEvents;
      }

      const genericPayload = mynacoV3Config({
        mynacoV3Data,
        gaData: gaConf && gaConf(data),
        event
      });

      MyntApp.mynacoSendEventV3(JSON.stringify(genericPayload));
    } else {
      // Temporarily firing some events from web for android app. Will be removed with updated
      // MyntApp version2
      if (webMaEventsFromApp.indexOf(event) !== -1) {
        const maConf = eventsConfig[event].ma;
        maConf && maUtil(maConf(data));
      }

      // Firing some GA events from web for android app.
      if (webGaEventsFromApp.indexOf(event) !== -1) {
        const gaConf = eventsConfig[event].ga;
        gaConf && gaUtil(gaConf(data));
      }

      const getMynacoConfig = eventsConfig[event].mynaco;
      const config = getMynacoConfig && getMynacoConfig(data);

      if (config) {
        let args = [config.category, config.action, config.attributes];
        if (typeof MyntApp.mynacoSendEventV2 === 'function') {
          MyntApp.mynacoSendEventV2(
            ...args,
            JSON.stringify(config.customEvents)
          );
        } else if (typeof MyntApp.mynacoSendEventV1 === 'function') {
          MyntApp.mynacoSendEventV1(...args, config.customEvents.events);
        } else {
          MyntApp.mynacoSendEvent(...args);
        }
      }
    }
  } else if (
    typeof webkit !== 'undefined' &&
    typeof get(webkit, 'messageHandlers.mynacoSendEventV1.postMessage') ===
      'function'
  ) {
    // Temporarily firing some events from web for iOS app. Will be removed with updated
    // webkit version
    if (webMaEventsFromApp.indexOf(event) !== -1) {
      const maConf = eventsConfig[event].ma;
      maConf && maUtil(maConf(data));
    }

    // Firing some GA events from web for ios app.
    if (webGaEventsFromIOSApp.indexOf(event) !== -1) {
      const gaConf = eventsConfig[event].ga;
      gaConf && gaUtil(gaConf(data));
    }

    const getMynacoConfig = eventsConfig[event].mynaco;
    const config = getMynacoConfig && getMynacoConfig(data);

    if (config) {
      if (
        typeof get(webkit, 'messageHandlers.mynacoSendEventV2.postMessage') ===
        'function'
      ) {
        webkit.messageHandlers.mynacoSendEventV2.postMessage({
          ...config,
          customEvents: JSON.stringify(config.customEvents)
        });
      } else {
        webkit.messageHandlers.mynacoSendEventV1.postMessage({
          ...config,
          customEvents: config.customEvents.events
        });
      }
    }
  } else {
    const gaConfig = eventsConfig[event].ga;
    gaConfig && gaUtil(gaConfig(data));
    const maConfig = eventsConfig[event].ma;
    maConfig && maUtil(maConfig(data));
  }
}
