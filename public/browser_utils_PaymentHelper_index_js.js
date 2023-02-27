(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_utils_PaymentHelper_index_js"],{

/***/ "./browser/utils/JSBridgeHelper.js":
/*!*****************************************!*\
  !*** ./browser/utils/JSBridgeHelper.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AndroidBridgeHelper": () => (/* binding */ AndroidBridgeHelper),
/* harmony export */   "IOSBridgeHelper": () => (/* binding */ IOSBridgeHelper)
/* harmony export */ });
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_WkPromiseHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/WkPromiseHandler */ "./browser/utils/WkPromiseHandler/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);



var AndroidBridgeHelper = {
    recordOrderComplete: function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['recordOrderComplete']) && MyntApp.recordOrderComplete.apply(MyntApp, data));
    },
    autofillEnabled: function () {
        return (((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['startSmsReceiver']) ||
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['startSmsReceiverV1'])) &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['stopSmsReceiver', 'getAppVersion']) &&
            MyntApp.getAppVersion()
                .toString()
                .slice(-6) >= 110197);
    },
    startSmsReceiver: function (field) {
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['getAppVersion']) &&
            MyntApp.getAppVersion()
                .toString()
                .slice(-6) >= 110197 &&
            ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['startSmsReceiverV1'])
                ? MyntApp.startSmsReceiverV1(field)
                : (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['startSmsReceiver']) && MyntApp.startSmsReceiver()));
    },
    stopSmsReceiver: function () {
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['stopSmsReceiver', 'getAppVersion']) &&
            MyntApp.getAppVersion()
                .toString()
                .slice(-6) >= 110197 &&
            MyntApp.stopSmsReceiver());
    },
    getAllInstalledUPIApps: function () {
        var packageMap = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('UPI_CONFIG').upiPackageMap;
        var installedAppsConfig = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['getAllInstalledUPIApps'])
            ? MyntApp.getAllInstalledUPIApps()
            : '{}';
        var installedApps = [];
        var upiSDKEnabled = false;
        try {
            installedAppsConfig = JSON.parse(installedAppsConfig);
            if (installedAppsConfig.apps) {
                installedApps = installedAppsConfig.apps.map(function (app) { return packageMap[app.package_name] || app.package_name; });
            }
            upiSDKEnabled = installedAppsConfig.upiSDKEnabled;
        }
        catch (err) { }
        return {
            installedApps: installedApps,
            upiSDKEnabled: upiSDKEnabled
        };
    },
    getSupportedUPIPg: function () {
        var supportedPG = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['getSupportedPG'])
            ? MyntApp.getSupportedPG()
            : '[]';
        return supportedPG;
    },
    openAppSettings: function () {
        return (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['openAppSettings']) && MyntApp.openAppSettings();
    },
    onRewardFlowDone: function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isMyntAppEnabled)(['onRewardFlowDone']) && MyntApp.onRewardFlowDone.apply(MyntApp, data));
    }
};
var IOSBridgeHelper = {
    recordOrderComplete: function (data) {
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isWebkitEnabled)(['recordOrderComplete']) &&
            webkit.messageHandlers.recordOrderComplete.postMessage(data));
    },
    openAppSettings: function () {
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isWebkitEnabled)(['openAppSettings']) &&
            webkit.messageHandlers.openAppSettings.postMessage({}));
    },
    onRewardFlowDone: function (data) {
        return ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isWebkitEnabled)(['onRewardFlowDone']) &&
            webkit.messageHandlers.onRewardFlowDone.postMessage(data));
    },
    getAllInstalledUPIAppsPromise: function () {
        return new Promise(function (resolve) {
            commonBrowserUtils_WkPromiseHandler__WEBPACK_IMPORTED_MODULE_1__.default.callWKHandler(['getAllInstalledUPIApps'])
                .then(function (_a) {
                var apps = _a.apps, upiSDKEnabled = _a.upiSDKEnabled;
                if (apps) {
                    resolve({
                        installedApps: (apps.filter(function (app) { return app.status; }) || []).map(function (app) { return app.appName; }),
                        upiSDKEnabled: !!upiSDKEnabled
                    });
                }
                else {
                    resolve({
                        installedApps: [],
                        upiSDKEnabled: false
                    });
                }
            })
                .catch(function () {
                resolve({
                    installedApps: [],
                    upiSDKEnabled: false
                });
            });
        });
    }
};


/***/ }),

/***/ "./browser/utils/PaymentConstants.js":
/*!*******************************************!*\
  !*** ./browser/utils/PaymentConstants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
var currentYear = new Date().getFullYear();
var years = __spreadArray([], Array(30).fill(), true).map(function (_, index) { return currentYear + index; });
var PAYMENT_INSTRUMENT = {
    COD: 'cod',
    SAVED_INSTRUMENT: 'savedinstrument',
    RECOMMENDED_INSTRUMENT: 'recommendedInstrument',
    SAVED_CARD: 'savedcard',
    SAVED_VPA: 'savedvpa',
    MYNTRA_CREDIT: 'myntraCredit',
    FREE_PURCHASE: 'myntracredit',
    LOYALTY_POINTS: 'loyalitypoints',
    GIFTCARD: 'giftcard',
    UPI: 'upi',
    EMI: 'emi',
    NETBANKING: 'netbanking',
    PAY_LATER: 'paylater',
    WALLET: 'wallet',
    CARD_TYPE: 'card',
    VPA: 'vpa'
};
var LOW_SR_FILTER_EXCLUSIONS = [
    PAYMENT_INSTRUMENT.UPI,
    PAYMENT_INSTRUMENT.WALLET,
    PAYMENT_INSTRUMENT.RECOMMENDED_INSTRUMENT,
    PAYMENT_INSTRUMENT.SAVED_INSTRUMENT
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__assign(__assign({ LOW_SR_FILTER_EXCLUSIONS: LOW_SR_FILTER_EXCLUSIONS }, PAYMENT_INSTRUMENT), { INSTRUMENT_ELIGIBLE_CODE: 3000, INSTRUMENT_NOT_ELIGIBLE_CODE: 3001, SAVEDCARD_LIMIT_REACHED_CODE: 3020, SAVING_CARD_NOT_ALLOWED_CODE: 3019, RETURN_ABUSER_CODE: 3009, EMI_PM: 'netbanking', EMI_PM_NAME: 'emi', EMI_TYPE: 'emi', PHONEPE_UPI_PM: 'netbanking', BNPL_NO_PROVIDER_DATA: 20001, BNPL_NO_ACTIVE_ACCOUNT: 20002, BNPL_USER_NOT_ELIGIBLE: 20003, BNPL_PROVIDER_DATA_INCOMPLETE: 20004, BNPL_ERROR_RESPONSE_FROM_PROVIDER: 20005, BNPL_USER_NOT_WHITELISTED: 20006, ONLINE_ERROR_CODES: ['1001'], WALLET_TYPE: 'wallet', WALLET_TAB_TYPE: 'walletTab', WALLET_PM: 'netbanking', WALLET_PM_DIRECT: 'wallet', WALLET_PM_NAME: 'wallet', CREDIT_CARD: 'creditcard', DEBIT_CARD: 'debitcard', CAPTCHA_CHARACTER_LENGTH: 4, AVAILABLE_CARD_IMAGES: [
        'VISA',
        'MASTERCARD',
        'AMEX',
        'MAESTRO',
        'DINERS',
        'RUPAY',
        'DISCOVER'
    ], PAYMENT_ERROR_OPTIONS_ID: 'PAYMENT_ERROR_OPTIONS_ID', EXPIRY_EXEMPTED_CARDS: ['MAESTRO', 'NONE'], AUTO_SUBMIT_TAB_TYPE: 'autoSubmitTab', BANK_MESSAGE_MAP: {
        '11005': 'This card is not eligible for instant discount',
        '11001': 'This card is not eligible for instant discount',
        '11002': 'Max discount limit reached for this card. If your recent payment transaction has failed, please try after 30 minutes',
        '11006': 'Please add more items for min order value to avail the benefits'
    }, MONTHS: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ], YEARS: years, OTP_SERVICE_THRESHOLD: 3, SAVE_CARDS_INFO_MAP: {
        '3019': 'We have temporarily disabled saving cards',
        '3020': 'You have already saved the maximum number of cards allowed. Please delete some cards to save newer cards.'
    }, BANK_MAP: {
        citibank: 'citi',
        'hdfc bank': 'hdfc',
        'icici bank': 'icici',
        'state bank of india': 'sbi',
        'axis bank': 'axis',
        kotak: 'kotak',
        sbi: 'sbi',
        'standard chartered bank': 'stanc',
        stanc: 'stanc',
        'airtel money': 'airtel',
        paypal: 'paypal',
        payzapp: 'payzapp',
        mobikwik: 'mobikwik',
        paytm: 'paytm',
        freecharge: 'freecharge',
        'google pay': 'googlepay',
        phonepeupi: 'phonepeupi',
        'other upi': 'otherupi',
        phonepe: 'phonepe'
    }, TWO_FA_PAYMENT_MODE_MAPPING: {
        mc: 'MYNTRACREDIT',
        lp: 'LOYALTYPOINTS'
    }, PAYNOW_TEMPLATE_CODE: {
        HTML_TEMPLATE: 100,
        REDIRECT_TEMPLATE: 101,
        PHONEPE_JS_TEMPLATE: 102,
        PHONEPE_ANDROID_TEMPLATE: 103,
        ORDER_SUCCESS_TEMPLATE: 104,
        ERROR_TEMPLATE: 105
    }, PAYNOW_ERROR_CODE: {
        DEFAULT_PAYMENT_FAILURE_ERROR_CODE: 1001
    }, INSTRUMENT_LOADING_MESSAGE: (_a = {},
        _a[PAYMENT_INSTRUMENT.NETBANKING] = 'Connecting with Bank',
        _a[PAYMENT_INSTRUMENT.EMI] = 'Getting EMI Options',
        _a[PAYMENT_INSTRUMENT.UPI] = 'Processing UPI Payment',
        _a[PAYMENT_INSTRUMENT.WALLET] = 'Opening Wallet',
        _a[PAYMENT_INSTRUMENT.COD] = 'Placing Order',
        _a[PAYMENT_INSTRUMENT.CARD_TYPE] = 'Connecting with Bank',
        _a[PAYMENT_INSTRUMENT.VPA] = 'Processing UPI Payment',
        _a), FAILURE_BUTTON_TEXT_MAP: {
        TRY_RETRY_TEXT: 'RETRY',
        TRY_OTHER_TEXT: 'TRY OTHER PAYMENT OPTION',
        TRY_COD_TEXT: 'PLACE ORDER AS PAY ON DELIVERY'
    }, CHARGES_FOR_PLUTUS: {
        shipping: true,
        giftwrap: true,
        cod: true,
        coverfee: true,
        trynbuy: true,
        donation: true
    } }));


/***/ }),

/***/ "./browser/utils/PaymentHelper/index.js":
/*!**********************************************!*\
  !*** ./browser/utils/PaymentHelper/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPaymentFailureCount": () => (/* binding */ getPaymentFailureCount),
/* harmony export */   "getCodFallbackResponse": () => (/* binding */ getCodFallbackResponse),
/* harmony export */   "getPaymentLoginUrl": () => (/* binding */ getPaymentLoginUrl),
/* harmony export */   "redirectToPayment": () => (/* binding */ redirectToPayment),
/* harmony export */   "getInstrumentTwoFAData": () => (/* binding */ getInstrumentTwoFAData),
/* harmony export */   "getInstrumentData": () => (/* binding */ getInstrumentData),
/* harmony export */   "getWalletTabs": () => (/* binding */ getWalletTabs),
/* harmony export */   "getPaymentConfig": () => (/* binding */ getPaymentConfig),
/* harmony export */   "getPaymentTriedCount": () => (/* binding */ getPaymentTriedCount),
/* harmony export */   "resetPaymentRetrySession": () => (/* binding */ resetPaymentRetrySession),
/* harmony export */   "getInstalledAppsPromise": () => (/* binding */ getInstalledAppsPromise),
/* harmony export */   "getUPISupportedPgPromise": () => (/* binding */ getUPISupportedPgPromise),
/* harmony export */   "isTwoFAEnabled": () => (/* binding */ isTwoFAEnabled),
/* harmony export */   "createUrlWithQueryParams": () => (/* binding */ createUrlWithQueryParams),
/* harmony export */   "getRetryGCappliedValue": () => (/* binding */ getRetryGCappliedValue),
/* harmony export */   "consolidatePriceInstruments": () => (/* binding */ consolidatePriceInstruments),
/* harmony export */   "showTokenizationConsent": () => (/* binding */ showTokenizationConsent),
/* harmony export */   "getEmiEligibility": () => (/* binding */ getEmiEligibility),
/* harmony export */   "getOfferString": () => (/* binding */ getOfferString),
/* harmony export */   "addOffersToInstrumentDetails": () => (/* binding */ addOffersToInstrumentDetails),
/* harmony export */   "inlineOfferWidgetLoadEvent": () => (/* binding */ inlineOfferWidgetLoadEvent)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/JSBridgeHelper */ "./browser/utils/JSBridgeHelper.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
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







var RECOMMENDED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMENDED_INSTRUMENT, COD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.COD, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.SAVED_INSTRUMENT, CREDIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.CREDIT_CARD, DEBIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.DEBIT_CARD, UPI = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.UPI, NETBANKING = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.NETBANKING, EMI_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI_TYPE, WALLET_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.WALLET_TYPE, GIFTCARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.GIFTCARD, PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.PAY_LATER;

var getPaymentLoginUrl = function (obj) {
    var paymentUrl = "/login?referer=/checkout/payment&force=".concat(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(obj, 'force') || '');
    if ((0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__.isGiftcardContext)()) {
        paymentUrl = "".concat(paymentUrl, "&cartContext=egiftcard");
    }
    return paymentUrl;
};
var getCodFallbackResponse = function () {
    return {
        paymentInstrumentDetails: [
            {
                type: 'cod',
                message: 'Instrument is Eligible',
                code: 3000,
                paymentInstrumentDetails: {
                    lowSROptions: null,
                    paymentUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('COD_FALLBACK_CONFIG'), 'urlV3'),
                    data: [
                        {
                            cashOnly: false,
                            firstTimeUser: false,
                            minCOD: null,
                            maxCOD: null
                        }
                    ],
                    enable2fa: false
                }
            }
        ]
    };
};
var getPaymentFailureCount = function () {
    var failureCount = {};
    if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isSessionStorageEnabled)()) {
        try {
            failureCount =
                JSON.parse(sessionStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT)) || {};
        }
        catch (e) {
            failureCount = {};
        }
    }
    return failureCount[(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getUidx)()] || '0';
};
var redirectToPayment = function () {
    var paymentUrl = '/checkout/payment';
    var redirectionUrl = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isLoggedIn)()
        ? paymentUrl
        : "/login?referer=".concat(paymentUrl);
    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.navigateTo)(redirectionUrl);
};
var getInstrumentTwoFAData = function (paymentInstrumentDetails) {
    var _a = paymentInstrumentDetails || {}, enable2fa = _a.enable2fa, enableEmailOTP = _a.enableEmailOTP, _b = _a.phoneNumbers, phoneNumbers = _b === void 0 ? [] : _b;
    var phoneNumbersAvailable = phoneNumbers && phoneNumbers.length > 0;
    var emailAvailable = !!(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getProfileEmail)();
    var enable = enable2fa &&
        (phoneNumbersAvailable || (enableEmailOTP ? emailAvailable : false));
    return {
        enable: enable,
        enableEmailOtp: enableEmailOTP,
        mobileNumbers: phoneNumbers
    };
};
var getInstrumentData = function (paymentOptions, option) {
    if (paymentOptions === void 0) { paymentOptions = {}; }
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(paymentOptions, 'paymentInstrumentDetails', []).find(function (info) { return info.type === option; });
};
var getPaymentTriedCount = function () {
    if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isLocalStorageEnabled)()) {
        return +localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.localStorageKeys.PAYMENT_TRIED_COUNT) || 0;
    }
    return 0;
};
var resetPaymentRetrySession = function () {
    if (((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('PAYMENT_FAILURE_HALFCARD') ||
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('DOPE_USER_CONSENT')) &&
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isLocalStorageEnabled)()) {
        localStorage.removeItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.localStorageKeys.PAYMENT_TRIED_COUNT);
        localStorage.removeItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.localStorageKeys.PAYMENT_MODE_ATTRIBUTES);
    }
};
var getWalletTabs = function (walletData) {
    return (lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(walletData, 'paymentInstrumentDetails.data', []) || []).filter(function (wallet) { return wallet.directDisplay; });
};
var getPaymentConfig = function (paymentOptions) {
    var paymentConfig = {};
    var instrumentList = [
        COD,
        SAVED_INSTRUMENT,
        DEBIT_CARD,
        CREDIT_CARD,
        NETBANKING,
        UPI,
        GIFTCARD,
        EMI_TYPE,
        WALLET_TYPE,
        PAY_LATER
    ];
    paymentConfig.instrumentData = instrumentList.reduce(function (acc, type) {
        acc[type] = getInstrumentData(paymentOptions, type);
        return acc;
    }, {});
    paymentConfig.instrumentData[RECOMMENDED_INSTRUMENT] =
        paymentOptions.recommendedPaymentInstrumentDetails;
    paymentConfig.savedInstruments =
        lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(paymentConfig.instrumentData[SAVED_INSTRUMENT], 'paymentInstrumentDetails.data', []) || [];
    var BNPLInstrumentData = (lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(paymentConfig, "instrumentData.".concat(PAY_LATER, ".paymentInstrumentDetails.data")) || []).find(function (paymentType) { return paymentType.id === 1; });
    var BNPLPaymentUrl = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(paymentConfig, "instrumentData.".concat(PAY_LATER, ".paymentInstrumentDetails.paymentUrl"));
    paymentConfig.instrumentData.BNPL = __assign(__assign({}, BNPLInstrumentData), { paymentUrl: BNPLPaymentUrl });
    paymentConfig.walletConfig = {
        walletTabs: getWalletTabs(paymentConfig.instrumentData[WALLET_TYPE])
    };
    return paymentConfig;
};
var createUrlWithQueryParams = function (url, params) {
    if (url === void 0) { url = ''; }
    if (params === void 0) { params = {}; }
    var redirectUrl = url || '';
    var queryParamRegex = new RegExp('A?[^&]*=[^&]*');
    var isFirstQueryParam = url && !queryParamRegex.test(url);
    var isUrlParamsSeparatorRequired = url && isFirstQueryParam && url[url.length - 1] !== '?';
    for (var key in params) {
        if (isFirstQueryParam) {
            if (isUrlParamsSeparatorRequired) {
                redirectUrl += "?".concat(key, "=").concat(params[key]);
                isUrlParamsSeparatorRequired = false;
            }
            else {
                redirectUrl += "".concat(key, "=").concat(params[key]);
            }
            isFirstQueryParam = false;
        }
        else {
            redirectUrl += "&".concat(key, "=").concat(params[key]);
        }
    }
    return redirectUrl;
};
var getInstalledAppsPromise = function () {
    if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isAndroidApp)()) {
        return Promise.resolve(commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__.AndroidBridgeHelper.getAllInstalledUPIApps());
    }
    else if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isIOSApp)()) {
        return new Promise(function (resolve) {
            commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__.IOSBridgeHelper.getAllInstalledUPIAppsPromise().then(resolve);
        });
    }
    else {
        return Promise.resolve({ installedApps: [], upiSDKEnabled: false });
    }
};
var getUPISupportedPgPromise = function () {
    if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isAndroidApp)()) {
        return Promise.resolve(commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__.AndroidBridgeHelper.getSupportedUPIPg());
    }
    return Promise.resolve('[]');
};
var isTwoFAEnabled = function (props) {
    var _a = props.instrumentData, _b = _a === void 0 ? {} : _a, type = _b.type, myntraInstrumentsData = props.myntraInstrumentsData, twoFA = props.twoFA, _c = props.twoFAResponse, _d = _c === void 0 ? {} : _c, userActions = _d.userActions;
    var enable2fa = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(userActions, type, [])[0], 'value') || false;
    enable2fa =
        enable2fa ||
            (lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(userActions, 'myntraCredit', [])[0], 'value', false) &&
                lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(myntraInstrumentsData, 'twofa_mc_data.enable'));
    enable2fa =
        enable2fa ||
            (lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(userActions, 'loyaltyPoint', [])[0], 'value', false) &&
                lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(myntraInstrumentsData, 'twofa_lp_data.enable'));
    return !twoFA.disabled && enable2fa;
};
var getRetryGCappliedValue = function (balance, outstanding) {
    return balance > outstanding ? outstanding : balance;
};
var consolidatePriceInstruments = function (priceInstrumentsData, additionalInstruments) {
    if (priceInstrumentsData === void 0) { priceInstrumentsData = []; }
    var instruments = priceInstrumentsData.reduce(function (acc, instrument) {
        var additionalValue = additionalInstruments[instrument.name] || 0;
        acc.push({
            name: instrument.name,
            value: instrument.value + additionalValue
        });
        delete additionalInstruments[instrument.name];
        return acc;
    }, []);
    Object.keys(additionalInstruments).forEach(function (instrumentKey) {
        instruments.push({
            name: instrumentKey,
            value: additionalInstruments[instrumentKey]
        });
    });
    return instruments;
};
var showTokenizationConsent = function (isAutoConsentFlow) {
    var savedCardConsentInfo = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('SAVED_CARD_CONSENT');
    var count = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(savedCardConsentInfo, 'consentCardCapping.count') || 2;
    var frequency = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(savedCardConsentInfo, 'consentCardCapping.frequency') || 7;
    var Saved_Card_Consent_Cookie_Expiry = 3600 * 24 * frequency * 1000;
    var consentCount = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.cookieKeys.SAVED_CARD_CONSENT_COUNT);
    var consentCountCookieDateValue = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.cookieKeys.SAVED_CARD_CONSENT_DATE);
    var consentCountCookieDate = new Date(consentCountCookieDateValue ? consentCountCookieDateValue : null);
    var currentDate = new Date();
    var isAutoConsentUnchecked = false;
    if (isAutoConsentFlow) {
        isAutoConsentUnchecked = true;
        //check if cookie does not exists or needs to be reset
        if (typeof consentCount === 'undefined' ||
            typeof consentCountCookieDateValue === 'undefined' ||
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getDateDiff)(consentCountCookieDate.getTime(), currentDate.getTime()) >
                frequency) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.cookieKeys.SAVED_CARD_CONSENT_COUNT, 1, Saved_Card_Consent_Cookie_Expiry);
            var date = new Date();
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.cookieKeys.SAVED_CARD_CONSENT_DATE, date, Saved_Card_Consent_Cookie_Expiry);
            consentCount = 1;
        }
        else {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_3__.cookieKeys.SAVED_CARD_CONSENT_COUNT, parseInt(consentCount) + 1, Saved_Card_Consent_Cookie_Expiry);
        }
    }
    if (isAutoConsentUnchecked) {
        return consentCount < count;
    }
    return true;
};
var getEmiEligibility = function (code) {
    var emiEligibilityCodeConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('EMI_ELIGIBILITY_CODE')[code] ||
        (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('EMI_ELIGIBILITY_CODE').default;
    var isEligible = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(emiEligibilityCodeConfig, 'eligible');
    return isEligible;
};
var getOfferString = function (numberOfOffers) {
    var offerString = '';
    switch (numberOfOffers) {
        case 0:
            break;
        case 1:
            offerString = '1 Offer';
            break;
        default:
            offerString = numberOfOffers + ' Offers';
    }
    return offerString;
};
var addOffersToInstrumentDetails = function (offer, instrumentData) {
    var instrumentDetails = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(instrumentData, 'paymentInstrumentDetails.data', '');
    if (!offer || !instrumentDetails)
        return;
    offer.forEach(function (off) {
        instrumentDetails.forEach(function (data) {
            if (off.bankCode.toLowerCase() == data.bankCode.toLowerCase())
                data.offerDetails = off.offerDetails;
        });
    });
};
var inlineOfferWidgetLoadEvent = function (instrument, appName, isOfferPresent) {
    triggerEvent('INLINE_OFFER_WIDGET_LOAD', {
        custom: {
            custom: {
                v1: instrument,
                v2: appName,
                v3: isOfferPresent
            }
        }
    });
};



/***/ }),

/***/ "./browser/utils/WkPromiseHandler/index.js":
/*!*************************************************!*\
  !*** ./browser/utils/WkPromiseHandler/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
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

// object for storing references to our promise-objects
var promises = {};
// generates a unique id, not obligator a UUID
var generateUUID = function () {
    var date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        var rand = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
    });
};
// this function is called by native methods
// @param promiseId - id of the promise stored in global variable promises
window.resolveWKPromise = function (promiseId, data, error) {
    var promise = promiseId && promises[promiseId];
    if (error) {
        promise && promise.reject(new Error(error));
    }
    else {
        promise && promise.resolve(data);
    }
    // remove reference to stored promise
    delete promises[promiseId];
};
/*
    usage:-
    import { callWKHandler } from 'commonBrowserUtils/WkPromiseHandler';

    callWKHandler(['anyHandlerName'], { a, b })
    .then((data) => {
      // hurray! play with data
    });
    .catch((error) => {
      // sad life
    })
*/
var callWKHandler = function (handler, message) {
    if (handler === void 0) { handler = ['']; }
    if (message === void 0) { message = {}; }
    return new Promise(function (resolve, reject) {
        // we generate a unique id to reference the promise later
        // from native function
        var promiseId = wkPromiseHandler.generateUUID();
        // save reference to promise in the global variable
        promises[promiseId] = { resolve: resolve, reject: reject };
        // call native IOS function
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_0__.isWebkitEnabled)(handler)) {
            webkit.messageHandlers[handler[0]].postMessage(__assign({ promiseId: promiseId }, message));
        }
        else {
            delete promises[promiseId];
            reject(new Error('Webkit Handler not found'));
        }
    });
};
var wkPromiseHandler = {
    callWKHandler: callWKHandler,
    generateUUID: generateUUID
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wkPromiseHandler);


/***/ })

}]);
//# sourceMappingURL=browser_utils_PaymentHelper_index_js.js.map