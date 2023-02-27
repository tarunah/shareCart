(self["webpackChunk"] = self["webpackChunk"] || []).push([["analytics"],{

/***/ "./browser/utils/ConfirmationHelper/index.js":
/*!***************************************************!*\
  !*** ./browser/utils/ConfirmationHelper/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMynacoConfirmationScreenLoadData": () => (/* binding */ getMynacoConfirmationScreenLoadData),
/* harmony export */   "getMynacoV3ConfirmationScreenLoadData": () => (/* binding */ getMynacoV3ConfirmationScreenLoadData),
/* harmony export */   "gotoInsiderPage": () => (/* binding */ gotoInsiderPage),
/* harmony export */   "getViewOrder": () => (/* binding */ getViewOrder)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");



var getMynacoConfirmationScreenLoadData = function (data) {
    var products = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.styleId === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            'Style-Id': style.id,
            'Style-Name': style.productDisplayName,
            Brand: style.brandName,
            Size: skuInfo.unifiedSize || skuInfo.value,
            Quantity: item.quantity,
            'Article-Type': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName', ''),
            Category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
            SKU: item.skuId,
            Price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            Gender: style.gender
        };
    });
    return {
        id: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.displayStoreOrderId'),
        revenue: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
        tax: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.gst', 0) / 100,
        shipping: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
        medium: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_traffic__.medium'),
        source: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_traffic__.source'),
        storeOrderId: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.storeOrderId'),
        'first-order': (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
        'storefront-id': '',
        products: products
    };
};
var getMynacoV3ConfirmationScreenLoadData = function (data) {
    var mProductList = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.id === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            id: style.id,
            name: style.productDisplayName,
            brand: style.brandName,
            quantity: item.quantity,
            size: skuInfo.unifiedSize || skuInfo.value,
            type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName', ''),
            category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
            skuId: item.skuId,
            price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            mrp: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.mrp', 0),
            gender: style.gender,
            position: -1,
            variant: style.sizes
        };
    });
    var maData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.id === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            entity_optional_attributes: {
                size: style.sizes,
                inv_count: -1,
                price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
                qty: item.quantity,
                name: style.productDisplayName,
                mrp: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.mrp', 0),
                disc: 0,
                category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
                brand: style.brandName,
                skuId: item.skuId
            },
            entity_id: style.id,
            entity_name: style.productDisplayName,
            entity_type: style.productTypeGroup
        };
    });
    return {
        ecommerce: {
            transaction: {
                couponCode: '',
                id: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.displayStoreOrderId'),
                revenue: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
                shipping: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
                tax: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.gst', 0) / 100
            },
            firstOrder: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
            storeFrontId: '',
            productListName: '',
            mProductList: mProductList,
            type: 'purchase',
            checkout: {
                step: 0
            }
        },
        widget_items: {
            data_set: {
                data: maData
            }
        }
    };
};
var gotoInsiderPage = function () {
    return (window.location.href = '/myntrainsider?cache=false');
};
var getViewOrder = function (storeOrderId) { return function () {
    return (window.location.href = "/my/order/details?storeOrderId=".concat(storeOrderId, "&fromConfirmation=true"));
}; };



/***/ }),

/***/ "./browser/utils/analytics/Mynaco/index.js":
/*!*************************************************!*\
  !*** ./browser/utils/analytics/Mynaco/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _payloadConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payloadConfig */ "./browser/utils/analytics/Mynaco/payloadConfig.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


var getMynacoPayload = function (_a) {
    var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, screen = _a.screen, type = _a.type, event = _a.event, category = _a.category, action = _a.action;
    var finalMynacoPayload = (0,_payloadConfig__WEBPACK_IMPORTED_MODULE_1__.default)(event, __assign(__assign({}, mynacoV3Data), { type: type, screen: screen, category: category, action: action }));
    if (gaData) {
        var eventType = gaData.eventType, rest = __rest(gaData, ["eventType"]);
        finalMynacoPayload.type = finalMynacoPayload.type || eventType;
        for (var key in rest) {
            finalMynacoPayload[key] = finalMynacoPayload[key] || rest[key];
        }
        finalMynacoPayload.nonInteraction = null;
        finalMynacoPayload.url = null;
    }
    finalMynacoPayload.screenName = "Checkout-".concat(screen);
    finalMynacoPayload.referer = {};
    return finalMynacoPayload;
};
var getAppsFlyerPayload = function (mynacoV3Data) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(mynacoV3Data, 'customEvents', {});
};
var getGenericMynacoData = function (_a) {
    var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, screen = _a.screen, type = _a.type, event = _a.event, category = _a.category, action = _a.action;
    var mynacoPayload = getMynacoPayload({
        mynacoV3Data: mynacoV3Data,
        gaData: gaData,
        screen: screen,
        type: type,
        event: event,
        category: category,
        action: action
    });
    var appsflyerPayload = getAppsFlyerPayload(mynacoV3Data);
    return { mynacoPayload: mynacoPayload, appsflyerPayload: appsflyerPayload };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGenericMynacoData);


/***/ }),

/***/ "./browser/utils/analytics/Mynaco/payloadConfig.js":
/*!*********************************************************!*\
  !*** ./browser/utils/analytics/Mynaco/payloadConfig.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);

var templateConfig = {
    ECOMMERCE_SCREEN_LOAD: function (data) { return ({
        contentGroups: [
            {
                '&cg1': 'Checkout'
            }
        ],
        customDimensions: [
            {
                '11': 'LoggedIn'
            },
            {
                '14': 'FeedSession'
            },
            {
                '29': '1.0.0'
            }
        ],
        payload: {
            eventName: 'ScreenLoad',
            eventType: 'screen_load_event'
        },
        nonInteractive: false,
        widget_items: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.widget_items'),
        isPersistent: true,
        screen: {
            data_set: {
                entity_optional_attributes: {},
                entity_id: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.entity_id', ''),
                entity_type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.entity_type', '')
            },
            name: "Checkout-".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen')),
            type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.type', ''),
            variant: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.variant', 'native'),
            referer: {}
        },
        ecommerce: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.ecommerce', {}),
        screen_name: "Checkout-".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen')),
        type: 'ecommerce-screen-load'
    }); },
    ADDRESS_SELECTED: function (data) { return ({
        isPersistent: true,
        payload: {
            pincode: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.pincode'),
            city: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.city'),
            addressType: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.addressType'),
            locality: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.locality'),
            eventType: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
            isDefault: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.isDefault'),
            streetAddress: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.streetAddress'),
            eventName: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
            id: {
                value: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.id')
            },
            checkoutAllowed: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.checkoutAllowed')
        },
        screen: {
            data_set: {
                entity_optional_attributes: {}
            },
            name: 'Checkout-address',
            variant: 'native',
            referer: {}
        },
        type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
        screen_name: 'Checkout-address'
    }); },
    CART_FILLER_ADD_TO_CART: function (data) { return ({
        action: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
        category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.category'),
        isPersistent: true,
        label: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.label'),
        nonInteractive: false,
        payload: {
            quantity: {
                value: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.quantity')
            },
            action: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
            eventName: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
            label: {
                value: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.label')
            },
            eventType: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type'),
            category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.category')
        },
        screen: {
            data_set: {
                entity_optional_attributes: {}
            },
            name: 'Checkout-checkoutv2-cart',
            referer: {},
            variant: 'native'
        },
        screen_name: 'Checkout-checkoutv2-cart',
        type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type')
    }); },
    DEFAULT: function (data) { return ({
        action: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'action', lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type', '')),
        category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'category', lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen', '')),
        isPersistent: true,
        label: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.label', ''),
        nonInteractive: false,
        payload: {
            action: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type', ''),
            eventName: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type', ''),
            label: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'templateData.label', ''),
            eventType: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type', ''),
            category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'category', lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen', ''))
        },
        screen: {
            data_set: {
                entity_optional_attributes: {}
            },
            name: "Checkout-".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen')),
            referer: {},
            variant: 'native'
        },
        screen_name: "Checkout-".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'screen')),
        type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'type', '')
    }); }
};
var getTemplateData = function (eventName, data) {
    var config = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(templateConfig, eventName, null) || templateConfig.DEFAULT;
    return config(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTemplateData);


/***/ }),

/***/ "./browser/utils/analytics/analyticsManager.js":
/*!*****************************************************!*\
  !*** ./browser/utils/analytics/analyticsManager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setPageContext": () => (/* reexport safe */ commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.setPageContext),
/* harmony export */   "eventsConfig": () => (/* binding */ eventsConfig),
/* harmony export */   "pushGTMCartData": () => (/* reexport safe */ commonBrowserUtils_analytics_gtm__WEBPACK_IMPORTED_MODULE_3__.pushGTMCartData),
/* harmony export */   "pushGTMConfirmationData": () => (/* reexport safe */ commonBrowserUtils_analytics_gtm__WEBPACK_IMPORTED_MODULE_3__.pushGTMConfirmationData),
/* harmony export */   "pushDataLayerObjectForGTM": () => (/* reexport safe */ commonBrowserUtils_analytics_gtm__WEBPACK_IMPORTED_MODULE_3__.pushDataLayerObjectForGTM),
/* harmony export */   "initWebengage": () => (/* reexport safe */ commonBrowserUtils_analytics_webengage__WEBPACK_IMPORTED_MODULE_6__.initWebengage),
/* harmony export */   "triggerWebengage": () => (/* reexport safe */ commonBrowserUtils_analytics_webengage__WEBPACK_IMPORTED_MODULE_6__.triggerWebengage),
/* harmony export */   "trackSizeFit": () => (/* reexport safe */ commonBrowserUtils_analytics_sizeAndFit__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "configureMA": () => (/* reexport safe */ commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.configure),
/* harmony export */   "flushMA": () => (/* reexport safe */ commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.flushEvents),
/* harmony export */   "default": () => (/* binding */ triggerEvent)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_analytics_ga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/analytics/ga */ "./browser/utils/analytics/ga.js");
/* harmony import */ var commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/analytics/ma */ "./browser/utils/analytics/ma.js");
/* harmony import */ var commonBrowserUtils_analytics_gtm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/analytics/gtm */ "./browser/utils/analytics/gtm.js");
/* harmony import */ var commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/analytics/Mynaco */ "./browser/utils/analytics/Mynaco/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_analytics_webengage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/analytics/webengage */ "./browser/utils/analytics/webengage.js");
/* harmony import */ var commonBrowserUtils_analytics_sizeAndFit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/analytics/sizeAndFit */ "./browser/utils/analytics/sizeAndFit.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__);
/*
 * Manager for all analytics related tasks.
 * Usage:
 * import triggerEvent from 'commonBrowserUtils/analytics/analyticsManager';
 * triggerEvent('GET_COUPON_ERROR', { gaLabel, mynacoLabel, maData, custom });
 */
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};









//Add commonly used constants here
var CONSTANTS = {
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
var webMaEventsFromApp = [
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
var webGaEventsFromApp = [
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
var webGaEventsFromIOSApp = __spreadArray(__spreadArray([], webGaEventsFromApp, true), [
    'CONFIRMATION_SCREEN_LOAD'
], false);
//Function to return GAData in proper format
var getGAData = function (category, action, label) {
    if (label === void 0) { label = ''; }
    return ({
        eventType: 'event',
        category: category,
        action: action,
        label: label
    });
};
//Function to return MAData in proper format
var getMAData = function (event, type, _a, immediate) {
    var _b = _a === void 0 ? {} : _a, _c = _b.maData, maData = _c === void 0 ? {} : _c, _d = _b.custom, custom = _d === void 0 ? {} : _d;
    if (immediate === void 0) { immediate = false; }
    return {
        event: event,
        data: {
            data_set: maData,
            type: type,
            variant: 'react'
        },
        custom: custom,
        immediate: immediate
    };
};
//Function to return MynacoData in proper format
var getMynacoData = function (category, action, label, customAttributes, customEvents) {
    if (customEvents === void 0) { customEvents = {}; }
    var attributes = { category: category, action: action, label: label };
    customAttributes && (attributes = customAttributes);
    return {
        category: category,
        action: action,
        attributes: JSON.stringify(attributes),
        customEvents: customEvents
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
var eventsConfig = {
    PAYMENTS_ICON_REVAMP: {
        ma: function (data) { return getMAData('Payment Page - cards_upi_flag', 'other', data); }
    },
    SAVE_CARD_CONSENT_HALF_CARD_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    AUTO_CONSENT_SAVED_CARD_CLICK: {
        ma: function (data) {
            return getMAData('auto_consent_saved_card', 'savedCardTokenization', data);
        }
    },
    AUTO_CONSENT_NEW_CARD_CLICK: {
        ma: function (data) {
            return getMAData('auto_consent_new_card', 'savedCardTokenization', data);
        }
    },
    AUTO_CONSENT_INFO_ICON_CLICK: {
        ma: function (data) {
            return getMAData('auto_consent_info_icon_click', 'savedCardTokenization', data);
        }
    },
    TRUST_BANNER_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    TRUST_BANNER_REPEAT_FLAG_LOAD: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    PAYMENT_SAVINGS_CALLOUT_FLAG: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    SAVED_CARD_FLAG: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    SAVED_CARD_OFFERS_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    SAVED_CARD_OFFERS_LOAD: {
        ma: function (data) { return getMAData('widgetItemLoad', '', data); }
    },
    SAVINGS_FOMO_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    DEFAULT_SAVINGS_FOMO: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    GO_BACK_SAVINGS_FOMO_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    STAY_SAVINGS_FOMO_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    SAVINGS_FOMO_NUDGE_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    SAVINGS_FOMO_CLOSE_ICON_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    APPLY_COUPON_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    AUTO_APPLY_COUPON: {
        ma: function (data) { return getMAData('Cart - new_user_coupon_auto_applied', 'other', data); }
    },
    AUTO_APPLY_COUPON_REMOVE: {
        ma: function (data) { return getMAData('Cart - new_user_coupon_removed', 'other', data); }
    },
    CART_SOCIAL_PROOFING_LOAD: {
        ma: function (data) {
            return getMAData('Address - social_proofing_widget_load', 'widgetLoad', data);
        }
    },
    CART_SOCIAL_PROOFING_FLAG: {
        ma: function (data) { return getMAData('Address - social_proofing_flag', 'other', data); }
    },
    AUTO_APPLY_NUDGE_SHOWN: {
        ma: function (data) {
            return getMAData('Cart - new_user_coupon_available_nudge', 'widgetLoad', data);
        }
    },
    AUTO_APPLY_COUPON_AVAILABLE: {
        ma: function (data) {
            return getMAData('Cart - new_user_coupon_available', 'widgetLoad', data);
        }
    },
    AUTO_APPLY_NUDGE_CLICKED: {
        ma: function (data) {
            return getMAData('Cart - new_user_coupon_available_click', 'widgetClick', data);
        }
    },
    AUTO_APPLY_LOGIN_CLICKED: {
        ma: function (data) { return getMAData('Cart - coupon_login_click', 'widgetClick', data); }
    },
    AUTO_APPLY_COUPON_LOGIN_SHOWN: {
        ma: function (data) { return getMAData('Cart - coupon_login_shown', 'other', data); }
    },
    AUTO_APPLY_APPLY_CLICKED: {
        ma: function (data) {
            return getMAData('Cart - new_user_coupon_apply_clicked', 'widgetClick', data);
        }
    },
    AUTO_APPLY_ALL_COUPONS_CLICK: {
        ma: function (data) { return getMAData('Cart - all_coupons_click', 'widgetClick', data); }
    },
    CART_NEW_USER_COUPON_FLAG: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    HIGHLIGHT_COD_NU_LOAD: {
        ma: function (data) { return getMAData('widgetItemLoad', '', data); }
    },
    NOT_HIGHLIGHT_COD_NU_LOAD: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    POSITIVE_REINFORCEMENT: {
        ma: function (data) { return getMAData('other', CONSTANTS.cartScreen, data); }
    },
    SAVINGS_FEEDBACK_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cartScreen, data); }
    },
    PAYMENT_INVISIBILITY_SAVINGS_STRIP_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    GET_COUPON_ERROR: {
        ga: function (data) {
            return getGAData(CONSTANTS.coupon, 'error:getCoupons', "error:".concat(data.gaLabel));
        }
    },
    GET_COUPON_SUCCESS: {
        ma: function (data) { return getMAData('couponsLoaded', CONSTANTS.cartScreen, data); }
    },
    APPLY_COUPON_ERROR: {
        ga: function (data) {
            return getGAData(CONSTANTS.coupon, 'error:applyCoupon', "error:".concat(data.gaLabel));
        },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'error:applyCoupon', data.gaLabel);
        }
    },
    APPLY_COUPON_SUCCESS: {
        ga: function (data) {
            return getGAData(CONSTANTS.coupon, "success:applyCoupon", data.gaLabel);
        },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'success:applyCoupon', "".concat(data.gaLabel.code, " | ").concat(data.gaLabel.type, " | ").concat(data.gaLabel.uidx));
        },
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.cartScreen, data); }
    },
    CLICK_APPLY_COUPON: {
        ga: function () { return getGAData(CONSTANTS.cart, 'click:applyCoupon'); }
    },
    CLICK_REMOVE_COUPON: {
        ga: function () { return getGAData(CONSTANTS.cart, 'click:removeCoupon'); }
    },
    CLICK_VIEW_APPLICABLE_ITEMS: {
        ma: function (data) { return getMAData('click_view_applicable_items', CONSTANTS.coupon, data); }
    },
    ITEMLIST_LOGINCTA_CLICK: {
        ma: function (data) { return getMAData('itemlist_logincta_click', CONSTANTS.cart, data); }
    },
    COUPON_LOGINCTA_CLICK: {
        ma: function (data) { return getMAData('coupon_logincta_click', CONSTANTS.cart, data); }
    },
    SHIPPING_TIP_LOGINCTA_CLICK: {
        ma: function (data) { return getMAData('shipping_tip_logincta_click', CONSTANTS.cart, data); }
    },
    REMOVE_ITEM: {
        ga: function (data) {
            return getGAData(CONSTANTS.cart, 'removeItem', "".concat(data.gaLabel.style, "|tradeDiscount:").concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'gaLabel.discount.tradeDiscount'), "|couponDiscount:").concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'gaLabel.discount.couponDiscount')));
        },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'removeItem', data.gaLabel.style, __assign({ category: CONSTANTS.cart, action: 'removeItem', label: data.gaLabel.style }, data.mynacoAttributes));
        },
        ma: function (data) { return getMAData('removeItem', CONSTANTS.cart, data); }
    },
    CLICK_REMOVE_OOS: {
        ga: function () { return getGAData(CONSTANTS.cart, 'click:oosRemove'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.cart, 'click:oosRemove', 'Removing-OOS-Items');
        }
    },
    MOVE_TO_WISHLIST: {
        ga: function (data) { return getGAData(CONSTANTS.cart, 'AddToCollection', data.gaLabel); },
        ma: function (data) { return getMAData('AddToCollection', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'AddToCollection', data.gaLabel, __assign({ category: CONSTANTS.cart, action: 'AddToCollection', label: data.gaLabel }, data.mynacoAttributes));
        }
    },
    MOVE_TO_WISHLIST_APP: {
        ma: function (data) { return getMAData('moveToWishlist', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'moveToWishlist', data.gaLabel, __assign({ category: CONSTANTS.cart, action: 'moveToWishlist', label: data.gaLabel }, data.mynacoAttributes));
        }
    },
    EDIT_SIZE: {
        ga: function (data) { return getGAData(CONSTANTS.cart, 'editSize', data.gaLabel); },
        ma: function (data) { return getMAData('editSize', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'editSize', data.gaLabel, __assign({ category: CONSTANTS.cart, action: 'editSize', label: data.gaLabel }, data.mynacoAttributes));
        }
    },
    EDIT_QUANTITY: {
        ga: function (data) { return getGAData(CONSTANTS.cart, 'editQty', data.gaLabel); },
        mynaco: function (data) { return getMynacoData(CONSTANTS.cart, 'editQty', data.gaLabel); }
    },
    EDIT_SELLER: {
        ga: function (data) { return getGAData(CONSTANTS.cart, 'sellerChange', data.gaLabel); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'sellerChange', data.gaLabel, __assign({ category: CONSTANTS.cart, action: 'sellerChange', label: data.gaLabel }, data.mynacoAttributes));
        },
        ma: function (data) { return getMAData('sellerChange', CONSTANTS.cart, data); }
    },
    FRAUD_USER: {
        ga: function () { return getGAData(CONSTANTS.cart, 'fraudUser'); },
        mynaco: function () { return getMynacoData(CONSTANTS.cart, 'fraudUser', 'Abuser'); }
    },
    DONATION_WIDGET_SHOWN: {
        ma: function (data) { return getMAData('donationWidgetSurfaced', CONSTANTS.cart, data); }
    },
    DONATION_WIDGET_APPLY: {
        ma: function (data) { return getMAData('donationWidgetApplied', CONSTANTS.cart, data); }
    },
    PROFILE_EMAIL_SAVED: {
        ma: function (data) { return getMAData('profileEmailSaved', CONSTANTS.cart, data); }
    },
    PROFILE_EMAIL_SAVE_FAILED: {
        ma: function (data) { return getMAData('profileEmailSaveFailed', CONSTANTS.cart, data); }
    },
    DONATION_WIDGET_KNOW_MORE: {
        ma: function (data) { return getMAData('donationWidgetKnowMore', CONSTANTS.cart, data); }
    },
    TOGGLE_PRODUCT_SELECTION: {
        ma: function (data) { return getMAData('toggleProductSelection', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'toggleProductSelection', '', __assign({ category: CONSTANTS.cart, action: 'toggleProductSelection' }, data.mynacoAttributes));
        }
    },
    SELECTED_ALL_PRODUCTS: {
        ma: function (data) { return getMAData('selectedAllProducts', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'selectedAllProducts', '', __assign({ category: CONSTANTS.cart, action: 'selectedAllProducts' }, data.mynacoAttributes));
        }
    },
    DESELECTED_ALL_PRODUCTS: {
        ma: function (data) { return getMAData('deselectAllProducts', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'deselectAllProducts', '', __assign({ category: CONSTANTS.cart, action: 'deselectAllProducts' }, data.mynacoAttributes));
        }
    },
    BULKMOVE_TO_WISHLIST: {
        ma: function (data) { return getMAData('bulkMoveToWishlist', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'bulkMoveToWishlist', '', __assign({ category: CONSTANTS.cart, action: 'bulkMoveToWishlist' }, data.mynacoAttributes));
        }
    },
    BULK_REMOVE: {
        ma: function (data) { return getMAData('bulkRemove', CONSTANTS.cart, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'bulkRemove', '', __assign({ category: CONSTANTS.cart, action: 'bulkRemove' }, data.mynacoAttributes));
        }
    },
    MFG_APPLY: {
        ga: function () { return getGAData(CONSTANTS.cart, 'mfgApply'); },
        mynaco: function (data) { return getMynacoData(CONSTANTS.cart, 'mfgApply', data.mynacoLabel); }
    },
    CART_EMPTY_LOAD: {
        ma: function (data) {
            return getMAData('Cart Page - Empty Cart Loaded', CONSTANTS.cartScreen, data);
        }
    },
    CART_SCREEN_LOAD: {
        ma: function (data) { return getMAData('ScreenLoad', CONSTANTS.cartScreen, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'ecommerce-screen-load', '', data.mynacoAttributes);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: 'ECOMMERCE_SCREEN_LOAD',
                screen: CONSTANTS.cart,
                type: 'ecommerce-screen-load'
            });
        }
    },
    PRICE_BLOCK_SCROLL_INTO_VIEW: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    MYNTRA_VALUES_STRIP_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cartScreen, data); }
    },
    ADDRESS_DAYS_TO_DELIVERY: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cartScreen, data); }
    },
    EMPTY_CART_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cartScreen, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, data.mynacoAttributes.action, '', data.mynacoAttributes);
        }
    },
    EMPTY_CART_MWK_WIDGET_LOAD: {
        ma: function (data) {
            return getMAData('cart page - mwk widget load', CONSTANTS.cartScreen, data);
        }
    },
    EMPTY_CART_WIDGET_CLICK: {
        ma: function (data) { return getMAData('widgetClick', CONSTANTS.cartScreen, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, data.mynacoAttributes.action, '', data.mynacoAttributes);
        }
    },
    EMPTY_CART_MWK_WIDGET_CLICK: {
        ma: function (data) {
            return getMAData('cart page - mwk widget item click', CONSTANTS.cartScreen, data);
        }
    },
    EMPTY_CART_CONTINUE_SHOPPING_CLICK: {
        ma: function (data) {
            return getMAData('cart page - shopping button click', CONSTANTS.cartScreen, data);
        }
    },
    MOVE_TO_WISHLIST_SUCCESS: {
        ma: function (data) { return getMAData('AddToCollection', CONSTANTS.cartScreen, data); }
    },
    SALE_TIMER_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    XPRESS_SERVICE_ERROR: {
        ma: function (data) { return getMAData('Exp_Chk_Prepaid_Loaded', '', data); }
    },
    XPRESS_PREPAID_LOADED: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    XPRESS_TRY_AND_BUY_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    XPRESS_TRY_AND_BUY_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_ADDRESS_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_PAYMENT_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_PREPAID_ORDER: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_ARRIVAL_INFO: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_ARRIVAL_MORE_OPTIONS: {
        ma: function (data) {
            return getMAData('Cart Page - express_checkout_delivery_more_options', '', data);
        }
    },
    XPRESS_POINTS_LOAD: {
        ma: function (data) { return getMAData('widgetItemLoad', '', data); }
    },
    XPRESS_POINTS_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - Express Checkout myn_points click', '', data);
        }
    },
    XPRESS_HALFCARD_CLOSE: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    XPRESS_CREDIT_LOAD: {
        ma: function (data) { return getMAData('widgetItemLoad', '', data); }
    },
    XPRESS_CREDIT_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - Express Checkout myn_credit click', '', data);
        }
    },
    XPRESS_CHECKOUT_FLAG: {
        ma: function (data) { return getMAData('Cart Page - express_checkout_flag', '', data); }
    },
    XPRESS_CHECKOUT_PAYNOW_FLAG: {
        ma: function (data) { return getMAData('Cart Page - express_checkout_paynow_flag', '', data); }
    },
    CART_PLACE_ORDER: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    BANK_OFFERS_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    BANK_OFFERS_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    BANK_OFFERS_CLOSE: {
        ma: function (data) { return getMAData('other', '', data); }
    },
    BANK_OFFERS_VIEWED: {
        ma: function (data) { return getMAData('widget_item_load', '', data); }
    },
    CART_OOS_LOAD_WIDGET: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    CART_OOS_SIMILAR_LOAD_WIDGET: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    CART_OOS_SHELL_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    PRICE_BLOCK_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', '', data); }
    },
    CART_OOS_CLICK_WIDGET: {
        ma: function (data) { return getMAData('widgetClick', '', data); }
    },
    CART_OOS_BUTTON_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    CONFIRMATION_SCREEN_LOAD: {
        ga: function () { return ({ eventType: 'pageView' }); },
        ma: function (data) { return getMAData('ScreenLoad', 'Checkout Confirmation', data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.confirmationScreen, 'ecommerce-screen-load', '', data.mynacoAttributes, data.customEvents);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: 'ECOMMERCE_SCREEN_LOAD',
                screen: CONSTANTS.confirmationScreen,
                type: 'ecommerce-screen-load'
            });
        }
    },
    CONFIRMATION_EC_ADD_PRODUCT: {
        ga: function (data) { return (__assign({ eventType: 'ec' }, data.gaData)); }
    },
    CONFIRMATION_EC_PURCHASE: {
        ga: function (data) { return (__assign({ eventType: 'ec' }, data.gaData)); }
    },
    TAG_SIZE_PROFILE: {
        ma: function (data) { return getMAData('tag_size_profile', CONSTANTS.confirmation, data); }
    },
    CREATE_SIZE_PROFILE: {
        ma: function () { return getMAData('create_size_profile', CONSTANTS.confirmation); }
    },
    UPDATE_SIZE_PROFILE_INITIATE: {
        ma: function () { return getMAData('update_size_profile_initiate', CONSTANTS.confirmation); }
    },
    CART_FILLER_LOAD: {
        ma: function (data) { return getMAData('Cart Filler Load', CONSTANTS.cartScreen, data); }
    },
    CART_OOS_SIMILAR_ADD_TO_CART: {
        ma: function (data) { return getMAData('oosSimilarAddToCart', CONSTANTS.cartScreen, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'oosSimilarAddToCart', '', data.mynacoAttributes);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.address,
                type: 'oosSimilarAddToCart'
            });
        }
    },
    CART_FILLER_ADD_TO_CART: {
        ma: function (data) { return getMAData('addToCart', CONSTANTS.cartScreen, data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'addToCart', '', data.mynacoAttributes);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.address,
                type: 'addToCart'
            });
        }
    },
    CART_FILLER_MINI_PDP: {
        ma: function (data) {
            return getMAData('Cart Filler Product Click', CONSTANTS.cartScreen, data);
        }
    },
    ORDER_CONFIRM_VIEW_ORDERS: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - view orders widget click', CONSTANTS.confirmationScreen, data);
        }
    },
    VIEW_ORDER_CONFIRMATION: {
        ma: function (data) {
            return getMAData('Order confirmation page - View', CONSTANTS.confirmationScreen, data);
        }
    },
    ORDER_CONFIRM_USER_PROFILE: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - user selection widget click', CONSTANTS.confirmationScreen, data);
        }
    },
    ORDER_CONFIRM_APP_FEEDBACK: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - app feedback widget click', CONSTANTS.confirmationScreen, data);
        }
    },
    INSIDER_SUPERCOIN_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.confirmationScreen, data); }
    },
    INSIDER_SUPERCOIN_WIDGET_CTA_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    INSIDER_SUPERCOIN_WIDGET_CHEVRON_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    INSIDER_SUPERCOIN_WIDGET_REWARD_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    SCRATCH_CARD_WIDGET_LOAD: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - Scratch card widget load', 'widgetLoad', data);
        }
    },
    SCRATCH_CARD_WIDGET_CLICK: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - Scratch card widget click', 'widgetClick', data);
        }
    },
    EXPRESS_DELIVERY_ELIGIBILITY: {
        ma: function (data) { return getMAData('Address - Express_Delivery_Load', '', data); }
    },
    COVER_FEE: {
        ma: function (data) { return getMAData('CoverFee', '', data); }
    },
    ADDRESS_SCREEN_LOAD: {
        ma: function (data) { return getMAData('ScreenLoad', 'Address', data); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'ecommerce-screen-load', '', {});
        }
    },
    PAGE_VIEW: {
        ga: function () { return getGAData(CONSTANTS.address, 'page_view'); }
    },
    ADDRESS_DELIVERY_PROMISE: {
        ma: function (maData) { return getMAData('widgetLoad', CONSTANTS.address, { maData: maData }); },
        mynaco: function (data) { return getMynacoData(CONSTANTS.address, 'widgetLoad', '', data); }
    },
    EDIT_ADDRESS_CANCEL: {
        ga: function () { return getGAData(CONSTANTS.address, 'editaddress-cancel'); },
        mynaco: function () { return getMynacoData(CONSTANTS.address, 'editaddress-cancel', '', {}); }
    },
    ADD_ADDRESS_CANCEL: {
        ga: function () { return getGAData(CONSTANTS.address, 'addaddress-cancel'); },
        mynaco: function () { return getMynacoData(CONSTANTS.address, 'addaddress-cancel', '', {}); }
    },
    EDIT_ADDRESS_FAILURE: {
        ga: function (data) {
            return getGAData(CONSTANTS.address, 'editaddress-failure', data.gaLabel);
        },
        ma: function (data) { return getMAData('Edit Address Error', 'widgetClick', data); }
    },
    ADD_ADDRESS_FAILURE: {
        ga: function (data) {
            return getGAData(CONSTANTS.address, 'addaddress-failure', data.gaLabel);
        },
        ma: function (data) { return getMAData('Add Address Error', 'widgetClick', data); }
    },
    EDIT_ADDRESS_SUCCESS: {
        ga: function (data) {
            return getGAData(CONSTANTS.address, 'editaddress-success', data.gaLabel);
        },
        ma: function (data) { return getMAData('Edit Address Success', 'widgetClick', data); }
    },
    ADD_ADDRESS_SUCCESS: {
        ga: function (data) {
            return getGAData(CONSTANTS.address, 'addaddress-success', data.gaLabel);
        },
        ma: function (data) { return getMAData('Add Address Success', 'widgetClick', data); }
    },
    ADDRESS_SCORE_BAD: {
        ga: function () {
            return getGAData(CONSTANTS.address, 'Scored address', 'Address score bad');
        },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'scored-address', '', {
                category: 'Checkout',
                action: 'Scored address',
                label: 'Address score bad'
            });
        }
    },
    HOME_ADDRESS: {
        ga: function () { return getGAData(CONSTANTS.address, 'home-address'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'home-address', '', {
                category: 'Checkout',
                action: 'AddressType-Selection',
                label: 'checkbox-home-type'
            });
        }
    },
    OFFICE_ADDRESS: {
        ga: function () { return getGAData(CONSTANTS.address, 'Office-address'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'Office-address', '', {
                category: 'Checkout',
                action: 'AddressType-Selection',
                label: 'checkbox-Office-type'
            });
        }
    },
    ADDRESS_SUB_TYPE_SELECTION: {
        ga: function (data) {
            return getGAData(CONSTANTS.address, 'AddressSubType-Selection', data.gaLabel);
        },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.address, 'AddressSubType-Selection', '', {
                category: 'Checkout',
                action: 'AddressSubType-Selection',
                label: data.gaLabel
            });
        }
    },
    TWO_FA_ENABLED: {
        ma: function (data) {
            return getMAData('two_fa_enabled_for_user', CONSTANTS.PAYMENT_OTP, data);
        }
    },
    HOW_IT_WORKS_CLICKED: {
        ga: function (_a) {
            var pageSource = _a.pageSource;
            return getGAData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'HOW IT WORKS - CLICKED', 'CLICKED');
        },
        mynaco: function (_a) {
            var pageSource = _a.pageSource;
            return getMynacoData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'HOW IT WORKS - CLICKED', '', 'CLICKED');
        }
    },
    HOW_IT_WORKS_HIDE: {
        ga: function (_a) {
            var pageSource = _a.pageSource;
            return getGAData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'HIDE - HOW IT WORKS', 'HIDE');
        },
        mynaco: function (_a) {
            var pageSource = _a.pageSource;
            return getMynacoData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'HIDE - HOW IT WORKS', '', 'HIDE');
        }
    },
    VIEW_MORE_HIDE: {
        ma: function (_a) {
            var pageSource = _a.pageSource, data = __rest(_a, ["pageSource"]);
            return getMAData('HIDE - VIEW MORE', pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, data);
        }
    },
    VIEW_MORE_CLICKED: {
        ma: function (_a) {
            var pageSource = _a.pageSource, data = __rest(_a, ["pageSource"]);
            return getMAData('CLICKED - VIEW MORE', pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, data);
        }
    },
    TRY_AND_BUY_CHECKED: {
        ga: function (_a) {
            var pageSource = _a.pageSource;
            return getGAData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'TRYANDBUYCHECKED', 'checked');
        },
        mynaco: function (_a) {
            var pageSource = _a.pageSource;
            return getMynacoData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'TRYANDBUYCHECKED', 'checked');
        }
    },
    TRY_AND_BUY_UNCHECKED: {
        ga: function (_a) {
            var pageSource = _a.pageSource;
            return getGAData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'TRYANDBUYUNCHECKED', 'unchecked');
        },
        mynaco: function (_a) {
            var pageSource = _a.pageSource;
            return getMynacoData(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART
                ? CONSTANTS.cartScreen
                : CONSTANTS.address, 'TRYANDBUYUNCHECKED', 'unchecked');
        }
    },
    SHIPPING_METHOD_CLICK: {
        ga: function (data) { return getGAData(CONSTANTS.address, data.gaLabel, 'confirm'); }
    },
    BTN_CONTINUE_CLICK: {
        ga: function () { return getGAData(CONSTANTS.address, 'btn_continue_click'); }
    },
    CHECKOUT_CONVERSATION: {
        ga: function () { return getGAData('Checkout_conversion', 'Address_to_Payment_page'); }
    },
    SELECT_ADDRESS_CLICK: {
        ga: function () { return getGAData(CONSTANTS.address, 'select_address_click'); }
    },
    ADDRESS_SELECTED: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.address, 'address-select', gaLabel);
        },
        mynaco: function (_a) {
            var custom = _a.custom;
            return getMynacoData(CONSTANTS.address, 'address-select', '', custom);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.address,
                type: 'address-select'
            });
        }
    },
    VALID_ADDRESS_SELECTED: {
        ga: function () {
            return getGAData(CONSTANTS.address, 'Valid address selected', 'Valid address selected');
        },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'valid-address-selected', '', {
                category: 'Checkout',
                action: 'Valid address selected',
                label: 'Valid address selected'
            });
        }
    },
    BAD_ADDRESS_SELECTED: {
        ga: function () {
            return getGAData(CONSTANTS.address, 'Bad address selected', 'Bad address selected');
        },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'bad-address-selected', '', {
                category: 'Checkout',
                action: 'Bad address selected',
                label: 'Bad address selected'
            });
        }
    },
    DELETE_ADDRESS_CLICK: {
        ga: function () { return getGAData(CONSTANTS.address, 'delete_address_click'); }
    },
    ADD_NEW_ADDRESS_CLICK: {
        ga: function () { return getGAData(CONSTANTS.address, 'add_new_address_click'); }
    },
    ADD_ADDRESS_INITIALIZE: {
        ga: function () { return getGAData(CONSTANTS.address, 'addaddress-initialize'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.address, 'addaddress-initialize', '', {});
        }
    },
    EDIT_ADDRESS_CLICK: {
        ga: function () { return getGAData(CONSTANTS.address, 'show_edit_address_click'); }
    },
    EDIT_ADDRESS_INITIALIZE: {
        ga: function () { return getGAData(CONSTANTS.address, 'editaddress-initialize'); },
        mynaco: function (_a) {
            var mynacoLabel = _a.mynacoLabel;
            return getMynacoData(CONSTANTS.address, 'editaddress-initialize', '', {
                mynacoLabel: mynacoLabel
            });
        }
    },
    ADDRESS_ERROR: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.address, 'address_collection', gaLabel);
        }
    },
    NOT_SERVICEABLE_ADDRESS_SELECTED: {
        ga: function () { return getGAData(CONSTANTS.address, 'not-serviceable-address-selected'); }
    },
    NOT_SERVICEABLE_ADDRESS_GO_TO_BAG: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.address, 'not-serviceable-address-gotoBagClick', gaLabel);
        }
    },
    NOT_SERVICEABLE_ADDRESS_ITEM: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.address, 'not-serviceable-address-item', gaLabel);
        }
    },
    DELIVERY_PREFERENCE_ADDRESS: {
        ma: function (data) {
            return getMAData('Address - Delivery_preference_address', 'other', data);
        }
    },
    DELIVERY_PREFERENCE_ORDER: {
        ma: function (data) {
            return getMAData('Order Confirmation Page - Delivery_preference_order', 'other', data);
        }
    },
    MOVE_OUT_OF_BAG_BUTTON_CLICK: {
        ma: function (data) { return getMAData('move_out_of_bag_click', CONSTANTS.cart, data); }
    },
    TOTAL_AMOUNT_CLICK: {
        ma: function (data) { return getMAData('total_amount_click', CONSTANTS.cart, data); }
    },
    PRICE_DETAIL_CLICK: {
        ma: function (data) { return getMAData('price_detail_click', CONSTANTS.cart, data); }
    },
    SELECTIVE_ENHANCED_REMOVE: {
        ma: function (data) { return getMAData('selective_remove_product', CONSTANTS.cart, data); }
    },
    SELECTIVE_ENHANCED_WISHLIST: {
        ma: function (data) { return getMAData('selective_wishlist_product', CONSTANTS.cart, data); }
    },
    PROCEED_NEXT_FROM_CART: {
        ma: function (data) { return getMAData('Cart page - savings_shown', 'other', data); }
    },
    TRY_AND_BUY_WIDGET_LOAD: {
        ma: function (_a) {
            var pageSource = _a.pageSource, data = __rest(_a, ["pageSource"]);
            return getMAData("".concat(pageSource === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.CART ? 'Address' : 'Cart', " Page - Try & Buy card load"), 'widgetLoad', data);
        }
    },
    PAYMENT_FAILURE_HALFCARD_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', 'widgetLoad', data); }
    },
    PAYMENT_FAILURE_HALFCARD_CLICK: {
        ma: function (data) { return getMAData('widgetitemclick', 'widgetitemclick', data); }
    },
    GET_PAYMENT_OPTIONS_ERROR: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'get_payments_options_error', gaLabel);
        }
    },
    PAYMENT_PAGE_LOAD_ERROR: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'payments_page_load_error', gaLabel);
        }
    },
    PAYMENT_SCREEN_LOAD: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'screen-load'); },
        ma: function (data) { return getMAData('ScreenLoad', CONSTANTS.paymentScreen, data); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'ecommerce-screen-load', '', {});
        }
    },
    PAYMENT_OPTIONS_ORDER: {
        ma: function (data) {
            return getMAData('payment_options_order', CONSTANTS.paymentScreen, data);
        }
    },
    PAYMENT_PAGE_VIEW: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'page_view'); }
    },
    PAYMENT_TAB_CLICK: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'paymentmethod-select', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'paymentmethod-select', '', {
                paymentmethod: gaLabel
            });
        }
    },
    PAYMENT_TAB_TOGGLE_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    PAYMENT_OPTION_SUBMIT: {
        ma: function (data) {
            return getMAData('payment_option_submit', CONSTANTS.paymentScreen, data);
        }
    },
    PAYMENT_UPI_OPTION_SELECT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'upi-option-select', gaLabel);
        }
    },
    PAYMENT_ERROR: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'payment-failure', gaLabel);
        },
        mynaco: function (_a) {
            var mynacoAttributes = _a.mynacoAttributes;
            return getMynacoData(CONSTANTS.paymentScreen, 'payment-failure', '', mynacoAttributes);
        },
        ma: function (data) {
            return getMAData('paymentFailureErrorCode', CONSTANTS.paymentScreen, data);
        }
    },
    OTP_LOAD: {
        ga: function () {
            return getGAData(CONSTANTS.paymentScreen, 'mobile verf card load', 'cod payment');
        },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'mobile verf card load', 'cod payment');
        }
    },
    CAPTCHA_LOAD: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'captcha widget load', 'cod'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'captcha widget load', 'cod');
        },
        mynacoV3: function (_a) {
            var gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: {
                    templateData: {
                        label: 'cod'
                    }
                },
                gaData: gaData,
                event: event,
                screen: CONSTANTS.paymentScreen,
                type: 'captcha widget load',
                category: 'checkout'
            });
        }
    },
    RESEND_OTP: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'resend otp'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
                category: 'mobile verification',
                action: 'waiting otp',
                label: 'resend otp'
            });
        }
    },
    OTP_TIMEOUT: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'timeout'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
                category: 'mobile verification',
                action: 'waiting otp',
                label: 'timeout'
            });
        }
    },
    OTP_ERROR: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'Cod-OTP', 'error'); },
        mynaco: function () { return getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', 'error'); }
    },
    CAPTCHA_CHANGE: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'captcha refresh', ''); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'captcha-reload', '', {});
        }
    },
    CAPTCHA_ENTRY: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'captcha entry', ''); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'captcha entry', '', {
                category: 'checkout',
                action: 'captcha entry',
                label: ''
            });
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.paymentScreen,
                type: 'captcha entry',
                category: 'checkout'
            });
        }
    },
    OTP_ENTRY: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'waiting otp', 'enter otp'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', '', {
                category: 'mobile verification',
                action: 'waiting otp',
                label: 'enter otp'
            });
        }
    },
    OTP_SUCCESS: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'otp entered successfully', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'Cod-OTP', {
                category: 'checkout',
                action: 'otp entered successfully',
                label: gaLabel
            });
        }
    },
    CAPTCHA_SUCCESS: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'captcha success', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'captcha success', gaLabel);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.paymentScreen,
                type: 'captcha success',
                category: CONSTANTS.paymentScreen
            });
        }
    },
    CAPTCHA_FAILURE: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'captcha fail', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'captcha fail', gaLabel);
        },
        ma: function (data) { return getMAData('widgetItemLoad', '', data); }
    },
    COD_SUCCESS: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'cod-success'); },
        mynaco: function () { return getMynacoData(CONSTANTS.paymentScreen, 'cod-success', '', {}); },
        mynacoV3: function (_a) {
            var gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                gaData: gaData,
                event: event,
                action: 'COD Success',
                screen: CONSTANTS.paymentScreen,
                type: 'cod-success',
                category: 'Checkout'
            });
        }
    },
    COD_FAILURE: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'cod-failure', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'cod-failure', '', {
                error: gaLabel
            });
        }
    },
    SAVED_CARD_SELECTED: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'saved-card-selected'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'saved-card-selected', '', {});
        }
    },
    CLOSE_SAVED_CARDS: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'card-save-optedout'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'card-save-optedout', '', {});
        },
        mynacoV3: function (_a) {
            var gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                gaData: gaData,
                action: 'Card Save Opted-Out',
                event: event,
                screen: CONSTANTS.paymentScreen,
                type: CONSTANTS.paymentScreen,
                category: 'Checkout'
            });
        }
    },
    OPEN_SAVED_CARDS: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'card-save-optedin'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'card-save-optedin', '', {});
        }
    },
    CARD_SUBMIT: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'creditcard-submit'); },
        mynaco: function () {
            return getMynacoData(CONSTANTS.paymentScreen, 'creditcard-submit', '', {});
        },
        mynacoV3: function (_a) {
            var gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                gaData: gaData,
                event: event,
                action: 'Add Credit Card Redirect',
                screen: CONSTANTS.paymentScreen,
                type: 'creditcard-submit',
                category: 'Checkout'
            });
        }
    },
    PROCEED_TO_PAY: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'proceed_to_pay', gaLabel);
        }
    },
    NETBANKING_SELECT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'netbanking-select', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'netbanking-select', '', {
                bankName: gaLabel
            });
        }
    },
    NETBANKING_SUBMIT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'netbanking-submit', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'netbanking-submit', '', {
                bankName: gaLabel
            });
        }
    },
    WALLET_SELECT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'wallet-select', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'wallet-select', '', {
                walletName: gaLabel
            });
        }
    },
    WALLET_SUBMIT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'wallet-submit', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'wallet-submit', '', {
                walletName: gaLabel
            });
        }
    },
    GIFTCARD_FAILURE: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'giftcard-failure', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'giftcard-failure', '', {
                error: gaLabel
            });
        }
    },
    GIFTCARD_SUCCESS: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'giftcard-success', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'giftcard-success', '', {
                'giftcard-amount': gaLabel
            });
        }
    },
    CONVERT_TO_COD: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'convert-to-COD', gaLabel);
        },
        mynaco: function (_a) {
            var gaLabel = _a.gaLabel;
            return getMynacoData(CONSTANTS.paymentScreen, 'convert-to-COD', gaLabel);
        }
    },
    CHECK_ELIGIBILITY: {
        ga: function () {
            return getGAData(CONSTANTS.paymentScreen, 'bank_offer_check_availability');
        }
    },
    CLOSE_TWOFA: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA Pop-up Closed by User'); },
        ma: function () { return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_POPUPCLOSED', 'widgetClick'); }
    },
    SUBMIT_TWOFA: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA OTP Submit'); },
        ma: function (data) {
            return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_SUBMIT', 'widgetClick', data);
        }
    },
    SHOW_TWOFA: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA Pop up Shown'); },
        ma: function (data) { return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_SHOW', 'widgetLoad', data); }
    },
    TWOFA_CHANGE_NUMBER: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA Mobile Number Change button'); }
    },
    TWOFA_SELECT_NUMBER: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA Mobile Number Selected'); }
    },
    TWOFA_OTP_SUCCESS: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA OTP Send - Successful'); },
        ma: function () { return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPSUCCESS', 'widgetClick'); }
    },
    TWOFA_OTP_FAIL: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA OTP Send - Failed'); },
        ma: function () { return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPFAILED', 'widgetClick'); }
    },
    TWOFA_OTP_SENT: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA OTP Sent'); },
        ma: function () { return getMAData('MYNTRA_2FA_PAYMENTS_PAGE_OTPSENT', 'widgetClick'); }
    },
    TWOFA_OTP_RESENT: {
        ga: function () { return getGAData(CONSTANTS.TWOFA, '2FA OTP Resent'); }
    },
    PARTNER_BANNER_CLICKED: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.confirmation, 'partner-banner-clicked', gaLabel);
        }
    },
    COUPON_SCREEN_LOAD: {
        ma: function (data) { return getMAData('ScreenLoad', 'checkout-coupon-page', data); },
        mynaco: function () { return getMynacoData('coupon-page', 'ecommerce-screen-load', '', {}); }
    },
    CREDITS_WIDGET_CLICK: {
        ma: function (data) { return getMAData('credits-widget-click', 'widgetClick', data); }
    },
    CART_SUPERCOINS_CREDIT_WIDGET_LOAD: {
        ma: function (data) { return getMAData('cart_insider_cncWidget', 'widgetLoad', data); }
    },
    CART_SUPERCOINS_CREDIT_WIDGET_CLICK: {
        ma: function (data) { return getMAData('cart_insider_cncWidget_Click', 'widgetClick', data); }
    },
    CART_SUPERCOINS_HALF_CARD_CREDIT_SCREEN_LOAD: {
        ma: function (data) {
            return getMAData('cart_Insider_cncConsentHalfcard', 'half-card-consent-screen', data);
        }
    },
    COD_FALLBACK: {
        ga: function () { return getGAData(CONSTANTS.paymentScreen, 'payment-cod-fallback'); },
        ma: function (data) { return getMAData('codFallback', '', data); }
    },
    CONFIRMATION_FALLBACK: {
        ga: function () { return getGAData(CONSTANTS.confirmation, 'confirmation-error-fallback'); }
    },
    A2HS_WIDGET_CLICK: {
        ga: function () { return getGAData(CONSTANTS.A2HS, 'custom_ui_click', 'thankyou_page'); }
    },
    A2HS_INSTALLED: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.A2HS, 'accept_prompt', gaLabel);
        }
    },
    A2HS_INSTALL_VIEW: {
        ga: function () { return getGAData(CONSTANTS.A2HS, 'install_steps_view'); }
    },
    A2HS_REMINDER_VIEW: {
        ga: function () { return getGAData(CONSTANTS.A2HS, 'reminder_steps_view'); }
    },
    BEGIN_CHECKOUT: {
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'begin_checkout', data.mynacoLabel);
        },
        mynacoV3: function (_a) {
            var mynacoV3Data = _a.mynacoV3Data, gaData = _a.gaData, event = _a.event;
            return (0,commonBrowserUtils_analytics_Mynaco__WEBPACK_IMPORTED_MODULE_4__.default)({
                mynacoV3Data: mynacoV3Data,
                gaData: gaData,
                event: event,
                screen: CONSTANTS.cart,
                type: 'begin_checkout'
            });
        }
    },
    INSIDER_REWARDS_WIDGET_LOAD: {
        ma: function (data) {
            return getMAData('cart page - insider rewards widget load', 'widgetLoad', data);
        }
    },
    INSIDER_REWARDS_ENROLL_TEXT_CLICK: {
        ma: function (data) {
            return getMAData('cart page - enroll insider widget item click', 'widgetItemClick', data);
        }
    },
    INSIDER_REWARDS_MODAL_ENROLL_BUTTON_CLICK: {
        ma: function (data) {
            return getMAData('cart page - enroll insider popup item click', 'widgetItemClick', data);
        }
    },
    PAYMENT_OTP_LOAD: {
        ga: function () { return getGAData(CONSTANTS.PAYMENT_OTP, 'screen-load'); }
    },
    PAYMENT_OTP_SUBMIT: {
        ga: function () { return getGAData(CONSTANTS.PAYMENT_OTP, 'submit'); }
    },
    PAYMENT_OTP_RESEND: {
        ga: function () { return getGAData(CONSTANTS.PAYMENT_OTP, 'resend'); }
    },
    PAYMENT_OTP_BANK_REDIRECT: {
        ga: function () { return getGAData(CONSTANTS.PAYMENT_OTP, 'bank-redirect'); }
    },
    REMOVE_EXPIRED_CARD: {
        ma: function (data) { return getMAData('expired card removed', CONSTANTS.paymentScreen, data); }
    },
    PAYMENT_CHANGE_ADDRESS: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'change_address', gaLabel);
        }
    },
    PAY_NOW_SUCCESS: {
        ga: function (data) {
            return getGAData(CONSTANTS.PAY_NOW_SUCCESS, 'paynowSuccess', "".concat(data.version, "|").concat(data.url, "|").concat(data.templateCode));
        },
        ma: function (data) { return getMAData(CONSTANTS.PAY_NOW_SUCCESS, 'paynowSuccess', data); }
    },
    PAY_NOW_ERROR: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.PAY_NOW_ERROR, 'paynowError', gaLabel);
        },
        ma: function (_a) {
            var maData = _a.maData;
            return getMAData(CONSTANTS.PAY_NOW_ERROR, 'paynowError', maData);
        }
    },
    PAY_NOW_ERROR_PAYLOAD: {
        ma: function (data) { return getMAData('paynowErrorPayload', CONSTANTS.paymentScreen, data); }
    },
    CART_PRICE_CHANGE_STRIP_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cart, data); }
    },
    CART_PRICE_CHANGE_DETAILS_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.cart, data); }
    },
    LOW_SR_MESSAGE_DISPLAY: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'display_low_sr', gaLabel);
        },
        ma: function (data) { return getMAData('display_low_sr', CONSTANTS.paymentScreen, data); }
    },
    CONFIRMATION_RECOMMENDATIONS_STYLE_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_RECOMMENDATIONS_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_ORDER_STYLE_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_RECOMMENDATIONS_VIEW_MORE: {
        ma: function (data) { return getMAData('widgetItemClick', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_SAVINGS_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_TOTAL_SAVINGS_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_INSIDER_POINTS_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.confirmationScreen, data); }
    },
    CONFIRMATION_INSIDER_POINTS_WIDGET_CLICK: {
        ma: function (data) { return getMAData('widgetClick', CONSTANTS.confirmationScreen, data); }
    },
    LOW_SR_DISABLE_INSTRUMENT: {
        ga: function (_a) {
            var gaLabel = _a.gaLabel;
            return getGAData(CONSTANTS.paymentScreen, 'low_sr_disable', gaLabel);
        },
        ma: function (data) { return getMAData('low_sr_disable', CONSTANTS.paymentScreen, data); }
    },
    USE_MY_LOCATION_CLICK: {
        ma: function (data) { return getMAData('use_my_location_click', CONSTANTS.address, data); }
    },
    USE_MY_LOCATION_ALLOWED: {
        ma: function (data) { return getMAData('use_my_location_allow', CONSTANTS.address, data); }
    },
    USE_MY_LOCATION_DENIED: {
        ma: function (data) { return getMAData('use_my_location_denied', CONSTANTS.address, data); }
    },
    SUGGESTED_LOCALITY: {
        ma: function (data) { return getMAData('suggested_locality', CONSTANTS.address, data); }
    },
    SAVED_LOCALITY: {
        ma: function (data) { return getMAData('saved_locality', CONSTANTS.address, data); }
    },
    ADDRESS_SUGGESTION_ERROR: {
        ma: function (data) { return getMAData('address_suggestion_error', CONSTANTS.address, data); }
    },
    SHOW_MORE_OFFER_BTN_CLICK: {
        ma: function (data) { return getMAData('show_more_offer_btn_click', CONSTANTS.cart, data); }
    },
    CHANGE_ADDRESS_BTN_CLICK: {
        ma: function (data) { return getMAData('change_address_btn_click', 'addressOnCart', data); }
    },
    ENTER_PIN_CODE: {
        ma: function (data) { return getMAData('enter_pin_code_open', 'addressOnCart', data); }
    },
    VALID_PIN_CODE: {
        ma: function (data) { return getMAData('valid_pin_code_entered', 'addressOnCart', data); }
    },
    INVALID_PIN_CODE: {
        ma: function (data) { return getMAData('invalid_pin_code_entered', 'addressOnCart', data); }
    },
    ITEM_LEVEL_SERVICE_FOR_PINCODE: {
        ma: function (data) {
            return getMAData('item_level_services_for_pincode', 'addressOnCart', data);
        }
    },
    ADDRESS_CHANGE_ON_CART: {
        ma: function (data) { return getMAData('address_change_on_cart', 'addressOnCart', data); }
    },
    STYLE_EXCHANGE_BANNER_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', 'styleExchange', data); }
    },
    STYLE_EXCHANGE_CANCEL_EXCHANGE_CLICK: {
        ma: function (data) { return getMAData('cancel_exchange_click', 'styleExchange', data); }
    },
    STYLE_EXCHANGE_CANCEL_EXCHANGE_CONFIRM: {
        ma: function (data) { return getMAData('cancel_exchange_confirm', 'styleExchange', data); }
    },
    STYLE_EXCHANGE_HOW_IT_WORKS_CLICK: {
        ma: function (data) { return getMAData('how_it_works_click', 'styleExchange', data); }
    },
    STYLE_EXCHANGE_KNOW_MORE_CLICK: {
        ma: function (data) { return getMAData('know_more_click', 'styleExchange', data); }
    },
    STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_CANCEL: {
        ma: function (data) {
            return getMAData('address_error_exchange_cancel', 'styleExchange', data);
        }
    },
    STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_REINITIATE: {
        ma: function (data) {
            return getMAData('address_error_exchange_reinitiate', 'styleExchange', data);
        }
    },
    PRICE_BLOCK_KNOW_MORE_CLICK: {
        ma: function (data) { return getMAData('price_block_know_more_click', 'priceDetails', data); }
    },
    PLUTUS_PAYLOAD: {
        ma: function (data) {
            return getMAData('plutus_eligibility_payload', CONSTANTS.paymentScreen, data);
        }
    },
    GIFTCARD_CONTEXT_PAYMENT: {
        ma: function (data) { return getMAData('Gift Cards Context Payments', 'Giftcard', data); }
    },
    RETURN_ABUSER_MODAL_OPEN: {
        ma: function (data) { return getMAData('return_abuser_modal_open', 'priceDetails', data); }
    },
    RETURN_ABUSER_MODAL_CLOSE: {
        ma: function (data) { return getMAData('return_abuser_modal_close', 'priceDetails', data); }
    },
    ATTACHED_PRODUCT_VIEW_ITEMS_CLICK: {
        ma: function (data) {
            return getMAData('attached_product_view_items_click', CONSTANTS.cart, data);
        }
    },
    ATTACHED_PRODUCT_TOUCH_POINT_CLICK: {
        ma: function (data) { return getMAData('attached_product_touch_click', CONSTANTS.cart, data); }
    },
    COUPON_DISCOUNT_BREAKUP_CLICK: {
        ma: function (data) { return getMAData('coupon_discount_breakup_click', 'priceDetails', data); }
    },
    ATTACHED_PRODUCTS_OPERATIONS: {
        ma: function (data) { return getMAData('attached_products_operations', CONSTANTS.cart, data); }
    },
    ITEM_QUANTITY_CHANGE: {
        ma: function (data) { return getMAData('item_quantity_change', CONSTANTS.cart, data); }
    },
    TERMS_OF_USE_CLICK: {
        ma: function (data) { return getMAData('terms_of_use_click', 'privacy', data); }
    },
    PRIVACY_POLICY_CLICK: {
        ma: function (data) { return getMAData('privacy_policy_click', 'privacy', data); }
    },
    DOPE_PAYMENT_FAILED_PAGE_LOAD: {
        ma: function (data) { return getMAData('dope_payment_failed_page_load', 'dope', data); }
    },
    DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_OPEN: {
        ma: function (data) {
            return getMAData('dope_payment_failed_cancel_order_modal_open', 'dope', data);
        }
    },
    DOPE_PAYMENT_FAILED_CANCEL_ORDER_KEEP_CLICK: {
        ma: function (data) {
            return getMAData('dope_payment_failed_cancel_order_keep_click', 'dope', data);
        }
    },
    DOPE_PAYMENT_FAILED_CANCEL_ORDER_CLICK: {
        ma: function (data) {
            return getMAData('dope_payment_failed_cancel_order_click', 'dope', data);
        }
    },
    DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE: {
        ma: function (data) {
            return getMAData('dope_payment_failed_cancel_order_modal_close', 'dope', data);
        }
    },
    DOPE_PAYMENT_FAILED_RETRY_PAYMENT_CLICK: {
        ma: function (data) {
            return getMAData('dope_payment_failed_retry_payment_click', 'dope', data);
        }
    },
    DOPE_PAYMENT_FAILED_VIEW_ORDER_CLICK: {
        ma: function (data) { return getMAData('dope_payment_failed_view_order_click', 'dope', data); }
    },
    DOPE_PAYMENT_FAILED_SEE_HOW_CLICK: {
        ma: function (data) { return getMAData('dope_payment_failed_see_how_click', 'dope', data); }
    },
    DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK: {
        ma: function (data) {
            return getMAData('dope_payment_pending_cancel_order_click', 'dope', data);
        }
    },
    DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK: {
        ma: function (data) {
            return getMAData('dope_payment_pending_retry_payment_click', 'dope', data);
        }
    },
    DOPE_PAYMENT_PENDING_SEE_HOW_CLICK: {
        ma: function (data) { return getMAData('dope_payment_pending_see_how_click', 'dope', data); }
    },
    DOPE_RETRY_PAYMENT_PAGE_LOADED: {
        ma: function (data) { return getMAData('dope_retry_payment_page_loaded', 'dope', data); }
    },
    DOPE_RETRY_PAYMENT_SESSION_EXPIRED: {
        ma: function (data) { return getMAData('dope_retry_payment_session_expired', 'dope', data); }
    },
    DOPE_RETRY_PAYMENT_COMPLETED: {
        ma: function (data) { return getMAData('dope_retry_payment_completed', 'dope', data); }
    },
    DOPE_RETRY_PAYMENT_PENDING: {
        ma: function (data) { return getMAData('dope_retry_payment_pending', 'dope', data); }
    },
    ORDER_DETAILS_BTN_CLICK: {
        ma: function (data) {
            return getMAData('order_details_btn_click', CONSTANTS.confirmation, data);
        }
    },
    PRODUCT_TO_PROFILE_TAG_CLICK: {
        ma: function (data) {
            return getMAData('product_to_profile_tag_click', CONSTANTS.confirmation, data);
        }
    },
    MY_COUPONS_BTN_CLICK: {
        ma: function (data) { return getMAData('my_coupons_btn_click', CONSTANTS.confirmation, data); }
    },
    RECO_HALFCARD_CLOSE: {
        ma: function (data) {
            return getMAData('Cart Page - cart_reco_atc_close', CONSTANTS.cart, data);
        }
    },
    WISHLIST_IN_VIEW_PORT: {
        ma: function (data) {
            return getMAData('Cart Page - wishlist_reco_flag', CONSTANTS.cart, data);
        }
    },
    WISHLIST_ADD_TO_CART: {
        ma: function (data) { return getMAData('addToCart', CONSTANTS.cart, data); }
    },
    WISHLIST_SIZE_SELECTOR_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - add_to_bag_initial_click', CONSTANTS.cart, data);
        }
    },
    WISHLIST_CARD_LOAD: {
        ma: function (data) {
            return getMAData('Cart Page - wishlist_card_load', CONSTANTS.cart, data);
        }
    },
    WISHLIST_PRODUCT_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - wishlist_card_product_click', CONSTANTS.cart, data);
        }
    },
    CART_SHARE_CLICK: {
        ma: function (data) { return getMAData('cart_share_button_click', CONSTANTS.cart, data); }
    },
    AT_PILL_CLICK: {
        ma: function (data) { return getMAData('at_pill_click', CONSTANTS.cart, data); }
    },
    DELETE_ADDRESS_BTN_CLICK: {
        ma: function (data) { return getMAData('delete_address', 'addressOnCartV2', data); }
    },
    EDIT_ADDRESS_BTN_CLICK: {
        ma: function (data) { return getMAData('edit_address', 'addressOnCartV2', data); }
    },
    ADD_ADDRESS_TOP_BTN_CLICK: {
        ma: function (data) { return getMAData('add_address_top', 'addressOnCartV2', data); }
    },
    ADD_ADDRESS_BOTTOM_BTN_CLICK: {
        ma: function (data) { return getMAData('add_address_bottom', 'addressOnCartV2', data); }
    },
    CHANGE_ADDRESS_BTN_CLICK_PAYMENT: {
        ma: function (data) {
            return getMAData('payment_change_button_click', 'addressOnCartV2', data);
        }
    },
    CHANGE_ADDRESS_BTN_CLICK_CART: {
        ma: function (data) { return getMAData('change_button_click', 'addressOnCartV2', data); }
    },
    ADDRESS_CHANGE_ON_CART_V2: {
        ma: function (data) { return getMAData('address_change', 'addressOnCartV2', data); }
    },
    ADDRESS_SELECT_ON_CART_V2: {
        ma: function (data) { return getMAData('address_select', 'addressOnCartV2', data); }
    },
    ADD_LANDMARK_CLICK: {
        ma: function (data) { return getMAData('add_landmark_click', CONSTANTS.address, data); }
    },
    LIVE_CUST_LOAD: {
        ma: function (data) { return getMAData('live_cust_load', 'widgetLoad', data); }
    },
    COUPON_TIMER_LOAD: {
        ma: function (data) { return getMAData('Cart Page - coupon_timer_load', 'widgetLoad', data); }
    },
    CUST_RATINGS_LOAD: {
        ma: function (data) { return getMAData('cust_ratings_load', 'widgetLoad', data); }
    },
    UNSCRATCH_CARD_VIEW: {
        ma: function (data) {
            return getMAData('Unscratch card - Unscratched_card_view', 'widgetLoad', data);
        }
    },
    DISMISS_BEFORE_SCRATCH: {
        ma: function (data) {
            return getMAData('Unscratch card - Scratch_card_dismiss', 'widgetLoad', data);
        }
    },
    CARD_SCRATCH: {
        ma: function (data) {
            return getMAData('Unscratch card - Scratch_card_scratch', 'widgetClick', data);
        }
    },
    CARD_REVEAL: {
        ma: function (data) {
            return getMAData('Scratched card - Scratch card reveal', 'widgetLoad', data);
        }
    },
    DISMISS_AFTER_SCRATCH: {
        ma: function (data) {
            return getMAData('Scratched card - rewards_card_close', 'widgetClick', data);
        }
    },
    COUPON_COPY: {
        ma: function (data) {
            return getMAData('Scratched card - scratch card copy click', 'widgetClick', data);
        }
    },
    EXPLORE_PRODUCTS_CLICK: {
        ma: function (data) {
            return getMAData('Scratched card - Explore products click', 'widgetClick', data);
        }
    },
    EXPLORE_MORE: {
        ma: function (data) {
            return getMAData('Scratched card - know more click', 'widgetClick', data);
        }
    },
    FRG_CART_LOAD: {
        ma: function (data) { return getMAData('Cart Page - free_gift_load', 'widgetLoad', data); }
    },
    MEXPRESS_LOAD: {
        ma: function (data) {
            return getMAData('Cart Page - MExpress Product Viewport', 'widgetLoad', data);
        }
    },
    MEXPRESS_PLUS_LOAD: {
        ma: function (data) {
            return getMAData('Cart Page - MExpressPlus Product Viewport', 'widgetLoad', data);
        }
    },
    STYLE_CAPPING_LOAD: {
        ma: function (data) { return getMAData('Cart Page - cart_cap_load', 'screenLoad', data); }
    },
    RANGE_BASED_PROMISE: {
        ma: function (data) { return getMAData('Range Based Date Shown', 'widgetLoad', data); }
    },
    ECOM_KNOW_MORE_CLICK: {
        ma: function (data) {
            return getMAData('ecom_message_know_more_click', CONSTANTS.paymentScreen, data, true);
        }
    },
    INSIDER_REWARDS_IN_VIEW_PORT: {
        ma: function (data) {
            return getMAData('Cart Page - supercoins_widget_load', CONSTANTS.cart, data);
        }
    },
    INSIDER_REWARDS_INFO_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - supercoins_widget_info_click', CONSTANTS.cart, data);
        }
    },
    INSIDER_REWARDS_MODAL_OPEN: {
        ma: function (data) {
            return getMAData('Cart Page - supercoins_widget_view_benefits_click', CONSTANTS.cart, data);
        }
    },
    INSIDER_REWARDS_MODAL_CLOSE: {
        ma: function (data) {
            return getMAData('Cart Page - supercoins_benefits_halfcard_close', CONSTANTS.cart, data);
        }
    },
    FINE_JWELLERY_CLICK: {
        ma: function (data) { return getMAData('widgetItemClick', '', data); }
    },
    COUPON_NUDGES_CLICKED: {
        ma: function (data) { return getMAData('coupon_available_nudge_click', 'other', data); }
    },
    COUPON_NUDGES_SHOWN: {
        ma: function (data) { return getMAData('coupon_available_nudge', 'other', data); }
    },
    COUPON_NUDGES_ADD_ITEM: {
        ma: function (data) { return getMAData('coupon_add_item', 'widgetClick', data); }
    },
    COUPON_NUDGES_COUPON_AVAILABLE: {
        ma: function (data) {
            return getMAData('Cart Page - coupon_nudges_coupon_available', 'widgetLoad', data);
        }
    },
    COUPON_NUDGES_LOGIN_SHOWN: {
        ma: function (data) { return getMAData('Cart Page - coupon_nudge_login_shown', 'other', data); }
    },
    COUPON_NUDGES_LOGIN_CLICKED: {
        ma: function (data) {
            return getMAData('Cart Page - coupon_nudge_login_click', 'widgetClick', data);
        }
    },
    COUPON_NUDGES_COUPON_REMOVE: {
        ma: function (data) {
            return getMAData('Cart Page - coupon_nudge_coupon_removed', 'other', data);
        }
    },
    COUPON_NUDGES_APPLY_CLICKED: {
        ma: function (data) {
            return getMAData('Cart Page - coupon_nudges_coupon_apply_clicked', 'widgetClick', data);
        }
    },
    COUPON_NUDGES_ALL_COUPON_CLICK: {
        ma: function (data) {
            return getMAData('Cart Page - coupon_nudges_all_coupons_click', 'widgetClick', data);
        }
    },
    INSIDER_TRIALS_WIDGET_LOAD: {
        ma: function (data) { return getMAData('widgetLoad', CONSTANTS.cart, data); }
    },
    ORDER_REVIEW_WIDGET_LOAD: {
        ma: function (data) { return getMAData('Payment - order_review_load', 'widgetLoad', data); }
    },
    ORDER_REVIEW_WIDGET_CLICK: {
        ma: function (data) {
            return getMAData('Payment - order_review_click', 'widgetItemClick', data);
        }
    },
    ADDRESS_WIDGET_LOAD: {
        ma: function (data) { return getMAData('Payment - address_widget_load', 'widgetLoad', data); }
    },
    ADDRESS_WIDGET_CLICK: {
        ma: function (data) {
            return getMAData('Payment - address_widget_change_click', 'widgetClick', data);
        }
    },
    ADDRESS_PAGE_LOAD: {
        ma: function (data) {
            return getMAData('Payment - address_change_pageload', 'screenLoad', data);
        }
    },
    APPLICABLE_COUPON_AVAILABLE: {
        ma: function (data) {
            return getMAData('Cart Page - applicable_coupon_available', 'widgetLoad', data);
        }
    },
    CART_COUNT_EVENT: {
        ma: function (data) { return getMAData('Cart count event', 'screenLoad', data); },
        mynaco: function (data) {
            return getMynacoData(CONSTANTS.cart, 'cartCountEvent', '', __assign({ category: CONSTANTS.cart, action: 'cartCountEvent' }, data.mynacoAttributes));
        }
    },
    ORDER_CONFIRM_LOAD_NOTIF_WIDGET: {
        ma: function (data) { return getMAData('load_notif_widget', 'widgetLoad', data); }
    },
    ORDER_CONFIRM_CLICK_NOTIF_WIDGET: {
        ma: function (data) { return getMAData('click_notif_widget', 'widgetClick', data); }
    },
    INLINE_OFFER_AVAILABLE: {
        ma: function (data) { return getMAData('Inline Offer - Available', 'widgetLoad', data); }
    },
    INLINE_OFFER_WIDGET_LOAD: {
        ma: function (data) { return getMAData('Inline Offer - widget load', 'widgetLoad', data); }
    },
    INLINE_OFFER_OFFER_VIEW: {
        ma: function (data) { return getMAData('Inline Offer - Offers seen', 'screenLoad', data); }
    },
    INLINE_OFFER_TNC_CLICK: {
        ma: function (data) { return getMAData('Inline Offer - tnc click', 'widgetItemClick', data); }
    }
};

//Common exposed function to trigger both ga and ma events
function triggerEvent(event, data) {
    if (!eventsConfig[event]) {
        return;
    }
    if (typeof MyntApp !== 'undefined' &&
        typeof MyntApp.mynacoSendEvent === 'function') {
        var mynacoV3Config = eventsConfig[event].mynacoV3;
        var enabledInSwitch = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('MYNACO_GENERIC_EVENTS').indexOf(event) !== -1;
        if (typeof MyntApp.mynacoSendEventV3 === 'function' &&
            mynacoV3Config &&
            enabledInSwitch) {
            var gaConf = eventsConfig[event].ga;
            var mynacoV3Data = data.mynacoV3;
            if (data.customEvents) {
                mynacoV3Data.customEvents = data.customEvents;
            }
            var genericPayload = mynacoV3Config({
                mynacoV3Data: mynacoV3Data,
                gaData: gaConf && gaConf(data),
                event: event
            });
            MyntApp.mynacoSendEventV3(JSON.stringify(genericPayload));
        }
        else {
            // Temporarily firing some events from web for android app. Will be removed with updated
            // MyntApp version2
            if (webMaEventsFromApp.indexOf(event) !== -1) {
                var maConf = eventsConfig[event].ma;
                maConf && (0,commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.default)(maConf(data));
            }
            // Firing some GA events from web for android app.
            if (webGaEventsFromApp.indexOf(event) !== -1) {
                var gaConf = eventsConfig[event].ga;
                gaConf && (0,commonBrowserUtils_analytics_ga__WEBPACK_IMPORTED_MODULE_1__.default)(gaConf(data));
            }
            var getMynacoConfig = eventsConfig[event].mynaco;
            var config = getMynacoConfig && getMynacoConfig(data);
            if (config) {
                var args = [config.category, config.action, config.attributes];
                if (typeof MyntApp.mynacoSendEventV2 === 'function') {
                    MyntApp.mynacoSendEventV2.apply(MyntApp, __spreadArray(__spreadArray([], args, false), [JSON.stringify(config.customEvents)], false));
                }
                else if (typeof MyntApp.mynacoSendEventV1 === 'function') {
                    MyntApp.mynacoSendEventV1.apply(MyntApp, __spreadArray(__spreadArray([], args, false), [config.customEvents.events], false));
                }
                else {
                    MyntApp.mynacoSendEvent.apply(MyntApp, args);
                }
            }
        }
    }
    else if (typeof webkit !== 'undefined' &&
        typeof lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(webkit, 'messageHandlers.mynacoSendEventV1.postMessage') ===
            'function') {
        // Temporarily firing some events from web for iOS app. Will be removed with updated
        // webkit version
        if (webMaEventsFromApp.indexOf(event) !== -1) {
            var maConf = eventsConfig[event].ma;
            maConf && (0,commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.default)(maConf(data));
        }
        // Firing some GA events from web for ios app.
        if (webGaEventsFromIOSApp.indexOf(event) !== -1) {
            var gaConf = eventsConfig[event].ga;
            gaConf && (0,commonBrowserUtils_analytics_ga__WEBPACK_IMPORTED_MODULE_1__.default)(gaConf(data));
        }
        var getMynacoConfig = eventsConfig[event].mynaco;
        var config = getMynacoConfig && getMynacoConfig(data);
        if (config) {
            if (typeof lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(webkit, 'messageHandlers.mynacoSendEventV2.postMessage') ===
                'function') {
                webkit.messageHandlers.mynacoSendEventV2.postMessage(__assign(__assign({}, config), { customEvents: JSON.stringify(config.customEvents) }));
            }
            else {
                webkit.messageHandlers.mynacoSendEventV1.postMessage(__assign(__assign({}, config), { customEvents: config.customEvents.events }));
            }
        }
    }
    else {
        var gaConfig = eventsConfig[event].ga;
        gaConfig && (0,commonBrowserUtils_analytics_ga__WEBPACK_IMPORTED_MODULE_1__.default)(gaConfig(data));
        var maConfig = eventsConfig[event].ma;
        maConfig && (0,commonBrowserUtils_analytics_ma__WEBPACK_IMPORTED_MODULE_2__.default)(maConfig(data));
    }
}


/***/ }),

/***/ "./browser/utils/analytics/ga.js":
/*!***************************************!*\
  !*** ./browser/utils/analytics/ga.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/*
  Ga file is already being initialized in the m-shell

  Usage:
  1. sending an Event:
    data = {
      eventType: 'event',
      category: 'Cart',
      action: 'Checkout-cart', // accept any string that is being passed as an action
      label: 'newCart'
    }
  ga(data);

  2. Sending PageView Event:
    data = {
      eventType: 'pageView'
    }
  ga(data);

  ~ PRAMOD M G
*/

var gaInitialized = false;
/**
 * Initilize the GA
 */
var initializeGa = function () {
    if (!gaInitialized) {
        gaInitialized = true;
        ga('set', 'dimension57', (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.getDeviceType)());
    }
};
var gaUtil = function (data) {
    if (!data)
        return;
    if (typeof data === 'string') {
        data = JSON.parse(data) || {};
    }
    initializeGa();
    if (data.eventType === 'event') {
        sendEvent(data);
    }
    else if (data.eventType === 'pageView') {
        sendPageView(data);
    }
    else if (data.eventType === 'ec') {
        sendECEvent(data);
    }
};
var sendEvent = function (data) {
    if (typeof ga !== 'undefined') {
        ga('send', 'event', data.category, data.action, data.label);
    }
};
var sendPageView = function (data) {
    if (typeof ga !== 'undefined') {
        ga('send', 'pageview');
    }
};
var sendECEvent = function (data) {
    if (typeof ga !== 'undefined') {
        ga('require', 'ec');
        ga('set', '&cu', 'INR');
        if (data.category) {
            ga("ec:".concat(data.name), data.category, data.data);
        }
        else {
            ga("ec:".concat(data.name), data.data);
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gaUtil);


/***/ }),

/***/ "./browser/utils/analytics/gtm.js":
/*!****************************************!*\
  !*** ./browser/utils/analytics/gtm.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pushGTMCartData": () => (/* binding */ pushGTMCartData),
/* harmony export */   "pushGTMConfirmationData": () => (/* binding */ pushGTMConfirmationData),
/* harmony export */   "pushDataLayerObjectForGTM": () => (/* binding */ pushDataLayerObjectForGTM)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/includes */ "../node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__);





!window.gtag &&
    (window.gtag = function () {
        window.dataLayer && window.dataLayer.push(arguments);
    });
var pushGTMCartData = function (data) {
    var products = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'products', []);
    var _a = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.getPricingInfo)(data), discountInfo = _a.discountInfo, chargesInfo = _a.chargesInfo, mrp = _a.mrp, total = _a.total;
    var cartData = {
        cartIsGiftOrder: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'giftOrder.active'),
        cartAmount: total,
        cartTotalAmount: total,
        cartMrp: mrp,
        cartCartLevelDiscount: discountInfo.bag,
        cartCouponDiscount: discountInfo.coupon,
        cartCashDiscount: discountInfo.mynts,
        dataTotalCashBackAmount: discountInfo.mynts,
        cartCashBackAmountDisplayOnCart: discountInfo.mynts,
        cartShippingCharge: chargesInfo.shipping || 0,
        cartGiftCharge: chargesInfo.giftwrap || 0,
        cartSavings: discountInfo.totalDiscount,
        cartProductAdded: 0,
        CartProductIdList: products.map(function (product) { return product.id; }),
        cartSociomanticString: JSON.stringify(products.map(function (product) { return ({
            identifier: product.id,
            amount: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(product, 'price.mrp'),
            currency: 'INR',
            quantity: product.quantity
        }); })),
        event: 'gtm.load'
    };
    var cartProducts = [];
    var cartTotalQuantity = 0;
    var cartNanigansString = '';
    Array.from(Array(5)).forEach(function (val, i) {
        cartData["CartProductId".concat(i + 1)] = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(products, "".concat(i, ".id"), '');
        cartData["CartProductAmount".concat(i + 1)] = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(products, "".concat(i, ".price.mrp"), '');
        cartData["CartProductQuantity".concat(i + 1)] = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(products, "".concat(i, ".quantity"), '');
    });
    products.forEach(function (product, i) {
        cartProducts.push({ id: product.id });
        cartTotalQuantity += product.quantity;
        cartData["cartItem".concat(i)] = product.id;
        cartNanigansString += "qty[".concat(i, "]=").concat(product.quantity, "&value[").concat(i, "]=").concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(product, 'price.mrp'), "&sku[").concat(i, "]=").concat(product.skuId, "&");
    });
    cartData['cartTotalQuantity'] = cartTotalQuantity;
    cartData['cartItems'] = cartProducts;
    cartData['cartNanigansString'] = cartNanigansString.slice(0, -1);
    window.dataLayer && window.dataLayer.push(cartData);
};
var pushGTMConfirmationData = function (data) {
    var styles = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).map(function (style) { return style.id; });
    var profile = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getProfileDetails)();
    var deviceData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_deviceData__', {});
    var _a = getDataLayerAttributes('confirmation'), pageName = _a.pageName, source = _a.source, medium = _a.medium, channel = _a.channel, campaign = _a.campaign, octaneUserHash = _a.octaneUserHash;
    var confirmationData = {
        pageName: pageName,
        source: source,
        medium: medium,
        campaign: campaign,
        campaignId: campaign,
        channel: channel,
        octaneUserHash: octaneUserHash,
        userEmail: profile.uidx,
        userHashId: profile.userHashId,
        deviceName: deviceData.deviceName,
        deviceType: deviceData.deviceType,
        isLoggedIn: profile.uidx ? '1' : '0',
        isBuyer: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true' ? '0' : '1',
        isBuyerCookie: '1',
        transactionId: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.displayStoreOrderId'),
        transactionTotal: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
        transactionShipping: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
        transactionShippingZipcode: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'delivery.pincode'),
        transactionShippingCity: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'delivery.city'),
        transactionPaymentType: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.method'),
        transactionPromoCode: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.couponCode', ''),
        transactionQuantity: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).length,
        transactionProducts: JSON.stringify(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) { return ({
            id: item.styleId,
            price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            quantity: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'quantity')
        }); })),
        transactionProductIds: styles.join(','),
        isFirstOrder: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true' ? 1 : 0,
        orderSociomanticString: JSON.stringify(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) { return ({
            identifier: item.styleId,
            amount: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            currency: 'INR',
            quantity: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'quantity')
        }); }))
    };
    Array.from(Array(5)).forEach(function (val, i) {
        confirmationData["CartProductId".concat(i + 1)] = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, "bountyOrder.items.".concat(i, ".styleId"), '');
        confirmationData["CartProductAmount".concat(i + 1)] =
            lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, "bountyOrder.items.".concat(i, ".payments.amount"), 0) / 100;
        confirmationData["CartProductQuantity".concat(i + 1)] = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, "bountyOrder.items.".concat(i, ".quantity"), '');
    });
    var cartNanigansString = '';
    lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).forEach(function (item, i) {
        cartNanigansString += "qty[".concat(i, "]=").concat(item.quantity, "&value[").concat(i, "]=").concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100, "&sku[").concat(i, "]=").concat(item.skuId, "&");
    });
    confirmationData.orderNanigansString = cartNanigansString.slice(0, -1);
    styles.forEach(function (style, index) {
        confirmationData["transactionItem".concat(index)] = style;
    });
    window.dataLayer && window.dataLayer.push(confirmationData);
};
var getDataLayerAttributes = function (page) {
    var traffic = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_traffic__', {});
    var source, channel, medium, campaign, maSessionParsed;
    // initializing values with traffic data
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_1___default()(window.location.search, 'utm_source')) {
        source = 'direct';
    }
    else {
        source = traffic.source;
    }
    channel = traffic.channel;
    medium = traffic.medium;
    campaign = traffic.campaign;
    var maSession = page === 'confirmation' &&
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.cookieKeys.DATALAYER_MA_SESSION, false);
    maSession = maSession || (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.cookieKeys.MA_SESSION, false);
    if (maSession) {
        try {
            maSessionParsed = JSON.parse(maSession);
            source = maSessionParsed.utm_source;
            channel = maSessionParsed.utm_channel;
            medium = maSessionParsed.utm_medium;
            campaign = maSessionParsed.utm_campaign;
        }
        catch (e) { }
    }
    return {
        pageName: page || traffic.pageName,
        octaneUserHash: traffic.octaneUserHash,
        source: source,
        channel: channel,
        medium: medium,
        campaign: campaign
    };
};
var pushDataLayerObjectForGTM = function (data, page) {
    var profile = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getProfileDetails)();
    var deviceData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_deviceData__', {});
    var _a = getDataLayerAttributes(page), pageName = _a.pageName, source = _a.source, medium = _a.medium, channel = _a.channel, campaign = _a.campaign;
    window.dataLayer &&
        window.dataLayer.push({
            pageName: pageName || 'newcart',
            utmCampaign: campaign,
            campaign: campaign,
            medium: medium,
            source: source,
            channel: channel,
            userEmail: profile.uidx,
            userHashId: profile.userHashId,
            isLoggedIn: profile.uidx ? '1' : '0',
            isBuyer: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'userDetails.isFirstTimeCustomer') ? '0' : '1',
            deviceName: deviceData.deviceName,
            deviceType: deviceData.deviceType
        });
};


/***/ }),

/***/ "./browser/utils/analytics/ma.js":
/*!***************************************!*\
  !*** ./browser/utils/analytics/ma.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configure": () => (/* binding */ configure),
/* harmony export */   "setPageContext": () => (/* binding */ setPageContext),
/* harmony export */   "flushEvents": () => (/* binding */ flushEvents),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var madalytics_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! madalytics-web */ "../node_modules/madalytics-web/lib/Madalytics.min.js");
/* harmony import */ var madalytics_web__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(madalytics_web__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var settings = {
    url: 'https://touch.myntra.com/track-web',
    storage: window.localStorage,
    variant: 'checkout',
    clientId: 'lzZNMYGoPkQVWOGL3wg81DLeJ4arpd',
    debug: false,
    batchMaxDuration: 2000
};
var options = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isPhonePeWebView)()
    ? {
        app: {
            name: 'phonepe-webview'
        }
    }
    : {};
// Initialize MA
var configure = function (updateSettings) {
    if (updateSettings === void 0) { updateSettings = {}; }
    var finalSettings = __assign(__assign({}, settings), updateSettings);
    madalytics_web__WEBPACK_IMPORTED_MODULE_0___default().configure(finalSettings, options);
};
configure();
var setPageContext = function (name) {
    return madalytics_web__WEBPACK_IMPORTED_MODULE_0___default().setPageContext({ name: name, url: window.location.pathname });
};
/*
 * Send event function.
 * data format: { data_set, type, variant }
 */
var sendEvent = function (_a) {
    var event = _a.event, data = _a.data, custom = _a.custom, _b = _a.rootParams, rootParams = _b === void 0 ? {} : _b, _c = _a.immediate, immediate = _c === void 0 ? false : _c;
    return madalytics_web__WEBPACK_IMPORTED_MODULE_0___default().send(event, data, custom, rootParams, immediate);
};
/**
 * Send all the events in one go
 */
var flushEvents = function () {
    madalytics_web__WEBPACK_IMPORTED_MODULE_0___default().flush();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendEvent);


/***/ }),

/***/ "./browser/utils/analytics/sizeAndFit.js":
/*!***********************************************!*\
  !*** ./browser/utils/analytics/sizeAndFit.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getProducts": () => (/* binding */ getProducts),
/* harmony export */   "getSizeAndFitVendor": () => (/* binding */ getSizeAndFitVendor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/abtestManager */ "./utils/abtestManager/index.js");
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationHelper */ "./browser/utils/ConfirmationHelper/index.js");




/*
 * Helper functions for the file.
 */
var getProducts = function (data) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).reduce(function (acc, item) {
        return acc.concat({
            sku: "".concat(item.styleId, "_").concat(item.skuId),
            price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            quantity: item.quantity
        });
    }, []);
};
var getSizeAndFitVendorFromUri = function () {
    var uri = new URL(window.location.href);
    return uri.searchParams.get('3p-vendor');
};
var getSizeAndFitVendor = function () {
    var sizeAndFitVendor = (0,commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_1__.getAbtest)('SIZE_FIT', null, { mxabd: true }) ||
        getSizeAndFitVendorFromUri() ||
        'MFA';
    return sizeAndFitVendor.toLowerCase();
};
/*
 * Tracker functions for different vendors.
 * These add script tags to the DOM and load the respective libraries.
 */
var trackTrueFitConversion = function () {
    // This method is taken directly from v1 source code.
    (function () {
        var a = {};
        function g(l) {
            a[l] = function (r, e, o) {
                var w = window, d = document, p = [], t, s, x;
                w.tfcapi = t =
                    w.tfcapi ||
                        function () {
                            t.q = t.q || [];
                            t.q.push(arguments);
                        };
                o && o.autoCalculate === false && p.push('autoCalculate=false');
                x = d.getElementsByTagName('script')[0];
                s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src =
                    'https://' +
                        r +
                        '-cdn' +
                        (e === 'dev' || e === 'staging' ? '.' + e : '') +
                        '.truefitcorp.com/fitrec/' +
                        r +
                        '/js/' +
                        l +
                        '.js?' +
                        p.join('&');
                x.parentNode.insertBefore(s, x);
            };
        }
        g('fitrec');
        g('tracker');
        return a;
    })().fitrec('myn', 'prod');
};
var trackPixiboConversion = function (data) {
    window.pxb_track = {
        clientId: '1jyjcjext4hgh',
        type: 'conversion',
        products: getProducts(data),
        transaction: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.storeOrderId')),
        amount: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100),
        currency: 'INR'
    };
    // This method is taken directly from v1 source code.
    (function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src =
            ('https:' == document.location.protocol ? 'https://' : 'http://') +
                'cdn.pixibo.com/tracking/pixibo.track.v1.js?clientId=' +
                pxb_track.clientId;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })();
};
var trackFitAnalyticsConversion = function () {
    // Taken directly from v1 source code.
    var s1 = document.createElement('script');
    s1.setAttribute('src', 'https://integrations.fitanalytics.com/shop/myntra/orderconfirmation.js');
    document.head.appendChild(s1);
};
// Exported function
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
    window.analyticsLayer = (0,commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_3__.getMynacoConfirmationScreenLoadData)(data);
    window.Myntra = window.Myntra || {
        Data: {
            socialAction: 'purchase',
            pageName: 'confirmation',
            cookieprefix: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_env__.cookie.prefix'),
            userHashId: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUserHashId)()
        }
    };
    window.sizeAndFit = {
        vendor: getSizeAndFitVendor(),
        userId: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUidx)(),
        orderId: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.storeOrderId')
    };
    var sizeAndFitTrackerMap = {
        truefit: trackTrueFitConversion,
        pixibo: trackPixiboConversion,
        fitanalytics: trackFitAnalyticsConversion,
        mfa: function () {
            console.info('Conversion using MFA');
        }
    };
    var vendorTracker = sizeAndFitTrackerMap[window.sizeAndFit.vendor];
    if (typeof vendorTracker === 'function' && window.dataLayer) {
        vendorTracker(data);
    }
});


/***/ }),

/***/ "./browser/utils/analytics/webengage.js":
/*!**********************************************!*\
  !*** ./browser/utils/analytics/webengage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfirmationData": () => (/* binding */ getConfirmationData),
/* harmony export */   "initWebengage": () => (/* binding */ initWebengage),
/* harmony export */   "triggerWebengage": () => (/* binding */ triggerWebengage)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");


var getProducts = function (items, styles) {
    return items.map(function (item) {
        var style = styles.find(function (style) { return style.id === item.styleId; }) || {};
        return {
            'Product ID': style.id || item.styleId,
            Product: style.productDisplayName,
            Brand: style.brandName,
            Quantity: item.quantity,
            'Article Type': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName', ''),
            Category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
            'Sub Category': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'subCategory.typeName', ''),
            'Discounted Price': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            'SKU ID': item.skuId,
            Price: item.unitPrice,
            Discount: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.discounts.product', 0) / 100,
            'Coupon Discount': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.discounts.coupon', 0) / 100,
            'Try & Buy': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'flags.isTryAndBuy')
        };
    });
};
var getConfirmationData = function (data) {
    var _a = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).reduce(function (acc, style) {
        acc.styleIds.push(style.id);
        acc.brands.push(style.brandName);
        acc.articleTypes.push(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName'));
        acc.categories.push(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName'));
        acc.subCategories.push(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'subCategory.typeName'));
        return acc;
    }, {
        styleIds: [],
        brands: [],
        articleTypes: [],
        categories: [],
        subCategories: []
    }), styleIds = _a.styleIds, brands = _a.brands, articleTypes = _a.articleTypes, categories = _a.categories, subCategories = _a.subCategories;
    return {
        'Order ID': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.storeOrderId'),
        Quantity: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles.length'),
        Price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.mrp', 0) / 100,
        Discount: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.discounts.product', 0) / 100,
        'Coupon Discount': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.discounts.coupon', 0) / 100,
        'Final Price': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
        'Device Channel': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_deviceData__.deviceChannel'),
        'Payment Mode': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.method'),
        'Shipping Method': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items.0.shippingMethod', 'NORMAL'),
        'Loyalty Points Used': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.flags.isLoyaltyPointsUsed', false),
        'Product IDs': styleIds,
        Brands: brands,
        'Article Types': articleTypes,
        Categories: categories,
        'Sub categories': subCategories,
        'Products:': getProducts(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []), lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []))
    };
};
var webengageEventConfig = {
    CHECKOUT_COMPLETE: function (data) {
        return window.webengage.track('Checkout completed', getConfirmationData(data));
    },
    PAYMENT_VIEWED: function (data) { return window.webengage.track('payment_page_viewed', data); },
    PAYMENT_FAILURE: function (data) { return window.webengage.track('payment_failure', data); },
    ADDRESS_VIEWED: function (data) { return window.webengage.track('address_page_viewed', data); }
};
var initWebengage = function () {
    return window.webengage && window.webengage.init('~7167db84');
};
var triggerWebengage = function (event, data) {
    if (window.webengage) {
        window.webengage.user.login((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getUidx)());
        webengageEventConfig[event](data);
    }
};


/***/ })

}]);
//# sourceMappingURL=analytics.js.map