(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_utils_PaymentsManager_js"],{

/***/ "./browser/utils/PaymentsManager.js":
/*!******************************************!*\
  !*** ./browser/utils/PaymentsManager.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/RequestManager */ "./utils/RequestManager.js");
/* harmony import */ var commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/requestConfig */ "./utils/requestConfig.js");
/* harmony import */ var commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__);
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








var PaymentsManager = (function () {
    return {
        getPageData: function (options, cartData) {
            if (options === void 0) { options = {}; }
            if (cartData === void 0) { cartData = {}; }
            var headers = __assign({ pagesource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__.checkoutPage.PAYMENT }, (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers);
            var addedgiftcard = options.addedGiftcard;
            var gcfetched = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'prefetchedData.gcBalance') ? true : false;
            var lpfetched = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'prefetchedData.lpBalance') ? true : false;
            // whether to fetch gc
            var gcLazyLoad = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('AUTOGC_BALANCE_LAZYLOAD', null);
            var fetchGC = addedgiftcard ||
                (!gcfetched && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('AUTOGC_ENABLED', null) && !gcLazyLoad);
            // whether to fetch lp
            var lpLazyLoad = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('LP_BALANCE_LAZYLOAD', null);
            var fetchLP = !lpfetched && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('LP_ENABLED', null) && !lpLazyLoad;
            // whether to fetch address
            var fetchAddress = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isVariantEnabled)('AOC_V2_VARIANT3') || (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__.checkExchangeCart)(cartData);
            var isCartDataAvailable = cartData.id;
            var mode = isCartDataAvailable ? 'spa' : '';
            var stampCart = isCartDataAvailable
                ? !cartData.orderAddressId || !cartData.unifiedAddressId
                : false;
            // Resolve the data if there's nothing to fetch
            if (mode === 'spa' &&
                !fetchGC &&
                !fetchLP &&
                !fetchAddress &&
                !stampCart) {
                return Promise.resolve({});
            }
            var retryQueryPath = {};
            if (options.payMode) {
                retryQueryPath.mode = options.payMode;
                retryQueryPath.ppsid = options.ppsId;
                retryQueryPath.referrer = options.referrer;
            }
            var cartContext = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__.getCartContext)();
            var addressID = '';
            if (cartContext === 'egiftcard') {
                addressID = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__.cookieKeys.GIFT_ORDER_ADDRESS_ID);
            }
            else if (fetchAddress && cartData.orderAddressId) {
                addressID = "".concat(cartData.orderAddressId);
            }
            else if (stampCart) {
                addressID = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__.cookieKeys.ORDER_ADDRESS_ID);
            }
            var cartUnselected = 'false';
            var payload = __assign({ mode: mode, addressID: addressID, cartContext: cartContext, fetchGC: fetchGC, fetchLP: fetchLP, fetchAddress: fetchAddress, cartUnselected: cartUnselected, stampCart: stampCart }, retryQueryPath);
            var clientUrl = _config__WEBPACK_IMPORTED_MODULE_3___default()('fetchPayment').clientUrl;
            return commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handleRequestWithPromise({
                method: 'post',
                url: clientUrl,
                headers: headers,
                data: payload
            });
        },
        getPaymentOptions: function (props, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('ppsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            var _b = props.isExchangeCart, isExchangeCart = _b === void 0 ? false : _b, data = __rest(props, ["isExchangeCart"]);
            var headers = __assign({ Client: client, Version: version, 'Content-Type': 'application/json', xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getXMetaApp)(), 'saved-instruments': true, 'paynow-version': 'v3' }, (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers);
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('RECOMMENDED_OPTIONS') &&
                (headers['payment-personalization'] = true);
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(clientUrl, "v3/paymentInstruments"),
                data: data,
                headers: headers
            }, successCallback, errorCallback);
        },
        getDeferredPaymentOptions: function (data, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('ppsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            var headers = __assign({ Client: client, Version: version, 'Content-Type': 'application/json', xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getXMetaApp)(), 'saved-instruments': true }, (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers);
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(clientUrl, "deferredPayment/v1/paymentInstruments"),
                data: data,
                headers: headers
            }, successCallback, errorCallback);
        },
        requestOTPGateway: function (data, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('shield'), clientRoot = _a.clientRoot, path = _a.path;
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(clientRoot).concat(path, "otp/send"),
                data: data,
                headers: {
                    'x-mynt-ctx': "storeid=2297;uidx=".concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getUidx)()),
                    'm-clientid': 'myntra-02d7dec5-8a00-4c74-9cf7-9d62dbea5e61'
                }
            }, successCallback, errorCallback);
        },
        generateCaptcha: function (successCallback, errorCallback) {
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'get',
                url: _config__WEBPACK_IMPORTED_MODULE_3___default()('captcha').clientUrl,
                headers: { accept: 'application/json' }
            }, successCallback, errorCallback);
        },
        addGiftCard: function (data, successCallback, errorCallback) {
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(_config__WEBPACK_IMPORTED_MODULE_3___default()('giftcard').clientUrl),
                data: data,
                headers: (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers
            }, successCallback, errorCallback);
        },
        getPlutusEligibility: function (data, successCallback, errorCallback) {
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: _config__WEBPACK_IMPORTED_MODULE_3___default()('plutus').clientUrl,
                data: data
            }, successCallback, errorCallback);
        },
        resendBNPLOTP: function (transactionId, successCallback, errorCallback) {
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'get',
                url: "".concat(_config__WEBPACK_IMPORTED_MODULE_3___default()('wallet').clientUrl, "?transactionId=").concat(transactionId),
                headers: {
                    xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getXMetaApp)()
                }
            }, successCallback, errorCallback);
        },
        resendPaymentOTP: function (_a, successCallback, errorCallback) {
            var transactionId = _a.transactionId, instrumentType = _a.instrumentType;
            var _b = _config__WEBPACK_IMPORTED_MODULE_3___default()('ppsClient'), clientUrl = _b.clientUrl, client = _b.client, version = _b.version;
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'get',
                url: "".concat(clientUrl, "v2/otp/resend/").concat(instrumentType, "/").concat(transactionId),
                headers: {
                    client: client,
                    version: version,
                    xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getXMetaApp)()
                }
            }, successCallback, errorCallback);
        },
        validateVPA: function (vpa, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('paymentsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'get',
                url: "".concat(clientUrl, "vpa/validateVPA/").concat(vpa),
                headers: {
                    Client: client,
                    Version: version,
                    'Content-Type': 'application/json'
                }
            }, successCallback, errorCallback);
        },
        checkCardSuccessRate: function (binNumber, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('paymentsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'get',
                url: "".concat(clientUrl, "binSuccessRate/").concat(binNumber),
                headers: {
                    Client: client,
                    Version: version,
                    'Content-Type': 'application/json'
                }
            }, successCallback, errorCallback);
        },
        removeSavedCard: function (instrumentId, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('paymentsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'del',
                url: "".concat(clientUrl, "savedCard/at/").concat(instrumentId),
                headers: {
                    Client: client,
                    Version: version,
                    'Content-Type': 'application/json'
                }
            }, successCallback, errorCallback);
        },
        paynow: function (url, data, successCallback, errorCallback, isDopeWithUserConsentEnabled) {
            if (isDopeWithUserConsentEnabled === void 0) { isDopeWithUserConsentEnabled = false; }
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('paymentsClient'), client = _a.client, version = _a.version;
            var configHeaders = (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers;
            if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('DOPE_SYSTEM_CONSENT') &&
                isDopeWithUserConsentEnabled) {
                configHeaders['x-myntra-pps'] = 'dope.user.consent.cod=true;';
            }
            var headers = __assign({ Client: client, Version: version, 'Content-Type': 'application/json' }, configHeaders);
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: url,
                headers: headers,
                data: data
            }, successCallback, errorCallback);
        },
        exchange: function (data, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('ppsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            var headers = __assign({ Client: client, Version: version, 'Content-Type': 'application/json' }, (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers);
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(clientUrl, "oee/v1/pay"),
                headers: headers,
                data: data
            }, successCallback, errorCallback);
        },
        userTwoFAVerification: function (data, successCallback, errorCallback) {
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('shield'), clientRoot = _a.clientRoot, path = _a.path;
            var header = {
                'Content-Type': 'application/json',
                'x-meta-app': "channel=web;deviceId=".concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getDeviceId)())
            };
            commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handle({
                method: 'post',
                url: "".concat(clientRoot).concat(path, "user/verification"),
                data: data,
                headers: header
            }, successCallback, errorCallback);
        },
        getCardType: function (cardNo) {
            if (cardNo === void 0) { cardNo = ''; }
            var _a = _config__WEBPACK_IMPORTED_MODULE_3___default()('paymentsClient'), clientUrl = _a.clientUrl, client = _a.client, version = _a.version;
            cardNo = cardNo.replace(/ /g, '').substring(0, 6); // maxDigits to send-> 6
            var headers = __assign({ Client: client, Version: version, 'Content-Type': 'application/json' }, (0,commonUtils_requestConfig__WEBPACK_IMPORTED_MODULE_2__.getConfig)().headers);
            return commonUtils_RequestManager__WEBPACK_IMPORTED_MODULE_1__.default.handleRequestWithPromise({
                method: 'get',
                url: "".concat(clientUrl, "cardToken/binDetails/").concat(cardNo),
                headers: headers,
                data: null
            });
        }
    };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentsManager);


/***/ })

}]);
//# sourceMappingURL=browser_utils_PaymentsManager_js.js.map