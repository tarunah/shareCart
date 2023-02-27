(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_payment_common_PayNowHandler_index_js"],{

/***/ "./browser/components/payment/common/PayNowAjax/PayNowTemplate/index.js":
/*!******************************************************************************!*\
  !*** ./browser/components/payment/common/PayNowAjax/PayNowTemplate/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _a;






var PAYNOW_TEMPLATE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__.default.PAYNOW_TEMPLATE_CODE, PAYNOW_ERROR_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__.default.PAYNOW_ERROR_CODE;
var onPaynowError = function (_a) {
    var closeLoader = _a.closeLoader, setPaymentFailureAttributes = _a.setPaymentFailureAttributes, templateCode = _a.templateCode, _b = _a.errorCode, errorCode = _b === void 0 ? PAYNOW_ERROR_CODE.DEFAULT_PAYMENT_FAILURE_ERROR_CODE : _b, cartContext = _a.cartContext, postURL = _a.postURL, payload = _a.payload;
    setPaymentFailureAttributes(errorCode, cartContext || (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_2__.getCartContext)());
    triggerEvent('PAY_NOW_ERROR', {
        gaLabel: "V3|".concat(postURL, "|").concat(templateCode, "|").concat(errorCode),
        maData: {
            version: 'V3',
            postURL: postURL,
            templateCode: templateCode,
            errorCode: errorCode
        }
    });
    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.triggerMaWithLargePayload)('PAY_NOW_ERROR_PAYLOAD', __assign(__assign({}, payload), { templateCode: templateCode, errorCode: errorCode }));
    closeLoader && closeLoader();
};
var PhonePeSdkTemplate = /** @class */ (function (_super) {
    __extends(PhonePeSdkTemplate, _super);
    function PhonePeSdkTemplate(props) {
        var _this = _super.call(this, props) || this;
        [
            'setFormRef',
            'onSdkLoadSuccess',
            'onPaymentError',
            'onPaymentSuccess'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    PhonePeSdkTemplate.prototype.setFormRef = function (node) {
        this.form = node;
    };
    PhonePeSdkTemplate.prototype.onPaymentError = function (message, errorCode) {
        var _a = this.props, setPaymentFailureAttributes = _a.setPaymentFailureAttributes, closeLoader = _a.closeLoader, templateCode = _a.templateCode, postURL = _a.postURL, payload = _a.payload;
        onPaynowError({
            setPaymentFailureAttributes: setPaymentFailureAttributes,
            closeLoader: closeLoader,
            message: message,
            templateCode: templateCode,
            errorCode: errorCode,
            postURL: postURL,
            payload: payload
        });
    };
    PhonePeSdkTemplate.prototype.onPaymentSuccess = function () {
        var _a = this.props.paynowResponse, postURL = _a.postURL, templateCode = _a.templateCode;
        triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL: postURL, templateCode: templateCode });
        this.form.submit();
    };
    PhonePeSdkTemplate.prototype.onSdkLoadSuccess = function () {
        var self = this;
        PhonePe.PhonePe.build(PhonePe.Constants.Species.web, PhonePe.Constants.OS.android)
            .then(function (sdk) {
            var _a = self.props.paynowResponse, _b = _a === void 0 ? {} : _a, fallbackURL = _b.postURL, params = _b.params;
            var merchantName = params.merchantName, imageURL = params.imageURL, quantity = params.quantity, reservationId = params.reservationId, merchantId = params.merchantId, validFor = params.validFor, merchantTransactionId = params.merchantTransactionId, serviceCategory = params.serviceCategory, payableAmount = params.payableAmount;
            var context = {
                quantity: quantity,
                reservationId: reservationId,
                merchantId: merchantId,
                validFor: validFor,
                merchantTransactionId: merchantTransactionId,
                serviceCategory: serviceCategory,
                payableAmount: payableAmount
            };
            sdk
                .openPaymentsPage(merchantName, context, fallbackURL, imageURL, [])
                .then(function (response) {
                self.onPaymentSuccess();
            })
                .catch(function (err) {
                // TODO: Should be cross verified with payments team
                self.onPaymentSuccess();
            });
        })
            .catch(function (err) {
            self.onPaymentError(err, PAYNOW_ERROR_CODE.SDK_LOAD_ERROR);
        });
    };
    PhonePeSdkTemplate.prototype.componentDidMount = function () {
        if (loadJS) {
            loadJS('https://constant.myntassets.com/pwa/assets/js/phonepesdk-11082020.js', this.onSdkLoadSuccess);
        }
        else {
            this.onPaymentError('loadJS function is not defined in the shell');
        }
    };
    PhonePeSdkTemplate.prototype.render = function () {
        var postURL = this.props.paynowResponse.postURL;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", { name: 'PhonepeSdkTemplateForm', autoComplete: "off", id: "paynow-phonepeSdkTemplate", method: "POST", action: postURL, ref: this.setFormRef }));
    };
    return PhonePeSdkTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var ErrorTemplate = /** @class */ (function (_super) {
    __extends(ErrorTemplate, _super);
    function ErrorTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorTemplate.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.paynowResponse, _c = _b === void 0 ? {} : _b, _d = _c.params, paymentErrorCode = _d.paymentErrorCode, cartContext = _d.cartContext, templateCode = _c.templateCode, postURL = _c.postURL, setPaymentFailureAttributes = _a.setPaymentFailureAttributes, closeLoader = _a.closeLoader, payload = _a.payload;
        onPaynowError({
            setPaymentFailureAttributes: setPaymentFailureAttributes,
            closeLoader: closeLoader,
            message: '',
            templateCode: templateCode,
            errorCode: paymentErrorCode,
            cartContext: cartContext,
            postURL: postURL,
            payload: payload
        });
    };
    ErrorTemplate.prototype.render = function () {
        return null;
    };
    return ErrorTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var RedirectTemplate = /** @class */ (function (_super) {
    __extends(RedirectTemplate, _super);
    function RedirectTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedirectTemplate.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.paynowResponse, _c = _b === void 0 ? {} : _b, postURL = _c.postURL, templateCode = _c.templateCode, resetPaynowResponse = _a.resetPaynowResponse;
        triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL: postURL, templateCode: templateCode });
        SHELL.redirectTo(postURL);
        resetPaynowResponse && resetPaynowResponse();
    };
    RedirectTemplate.prototype.render = function () {
        return null;
    };
    return RedirectTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var HTMLPostTemplate = /** @class */ (function (_super) {
    __extends(HTMLPostTemplate, _super);
    function HTMLPostTemplate(props) {
        var _this = _super.call(this, props) || this;
        ['setFormRef'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    HTMLPostTemplate.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.paynowResponse, postURL = _b.postURL, templateCode = _b.templateCode, resetPaynowResponse = _a.resetPaynowResponse;
        triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL: postURL, templateCode: templateCode });
        this.form.submit();
        resetPaynowResponse && resetPaynowResponse();
    };
    HTMLPostTemplate.prototype.setFormRef = function (node) {
        this.form = node;
    };
    HTMLPostTemplate.prototype.getFormData = function (params) {
        var formData = [];
        for (var key in params) {
            formData.push(react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: key, value: params[key] }));
        }
        return formData;
    };
    HTMLPostTemplate.prototype.render = function () {
        var _a = this.props, _b = _a.paynowResponse, _c = _b === void 0 ? {} : _b, postURL = _c.postURL, params = _c.params, upiSdkEnabled = _a.upiSdkEnabled;
        /*
         *  TODO: Make a new template for UPI Intent or make use of RedirectTemplate.
         *  This is a patch for android app as they don't intercept Post calls and
         *  making a fix from android would force pps to maintain paynowForm as well
         *  as paynow json.
         */
        var method = 'POST';
        var formParams = params;
        if (upiSdkEnabled && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isAndroidApp)()) {
            method = 'GET';
            var vpa = params.vpa, rest = __rest(params, ["vpa"]);
            formParams = rest;
        }
        var formData = this.getFormData(formParams);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", { name: 'HtmlPostTemplateForm', autoComplete: "off", id: "paynow-htmlPostTemplate", action: postURL, method: method, ref: this.setFormRef }, formData));
    };
    return HTMLPostTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var PhonePeAndroidSdkTemplate = /** @class */ (function (_super) {
    __extends(PhonePeAndroidSdkTemplate, _super);
    function PhonePeAndroidSdkTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhonePeAndroidSdkTemplate.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.paynowResponse, _c = _b === void 0 ? {} : _b, postURL = _c.postURL, params = _c.params, templateCode = _c.templateCode, resetPaynowResponse = _a.resetPaynowResponse;
        triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL: postURL, templateCode: templateCode });
        var redirectUrl = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__.createUrlWithQueryParams)(postURL, params);
        SHELL.redirectTo(redirectUrl);
        resetPaynowResponse && resetPaynowResponse();
    };
    PhonePeAndroidSdkTemplate.prototype.render = function () {
        return null;
    };
    return PhonePeAndroidSdkTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var OrderSucessTemplate = /** @class */ (function (_super) {
    __extends(OrderSucessTemplate, _super);
    function OrderSucessTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderSucessTemplate.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.paynowResponse, _c = _b === void 0 ? {} : _b, postURL = _c.postURL, params = _c.params, templateCode = _c.templateCode, resetPaynowResponse = _a.resetPaynowResponse;
        triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL: postURL, templateCode: templateCode });
        var redirectUrl = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__.createUrlWithQueryParams)(postURL, params);
        SHELL.redirectTo(redirectUrl);
        resetPaynowResponse && resetPaynowResponse();
    };
    OrderSucessTemplate.prototype.render = function () {
        return null;
    };
    return OrderSucessTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var resTemplateCode = (_a = {},
    _a[PAYNOW_TEMPLATE_CODE.HTML_TEMPLATE] = HTMLPostTemplate,
    _a[PAYNOW_TEMPLATE_CODE.REDIRECT_TEMPLATE] = RedirectTemplate,
    _a[PAYNOW_TEMPLATE_CODE.PHONEPE_JS_TEMPLATE] = PhonePeSdkTemplate,
    _a[PAYNOW_TEMPLATE_CODE.PHONEPE_ANDROID_TEMPLATE] = PhonePeAndroidSdkTemplate,
    _a[PAYNOW_TEMPLATE_CODE.ORDER_SUCCESS_TEMPLATE] = OrderSucessTemplate,
    _a[PAYNOW_TEMPLATE_CODE.ERROR_TEMPLATE] = ErrorTemplate,
    _a);
var PayNowTemplate = function (props) {
    var _a = props.paynowResponse, _b = _a === void 0 ? {} : _a, templateCode = _b.templateCode;
    var Component = resTemplateCode[templateCode];
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Component, __assign({}, props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayNowTemplate);
PayNowTemplate.propTypes = {
    paynowResponse: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
    setPaymentFailureAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
    closeLoader: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
    resetPaynowResponse: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
PayNowTemplate.defaultProps = {
    paynowResponse: {},
    setPaymentFailureAttributes: function () { },
    closeLoader: function () { },
    resetPaynowResponse: function () { }
};


/***/ }),

/***/ "./browser/components/payment/common/PayNowAjax/index.js":
/*!***************************************************************!*\
  !*** ./browser/components/payment/common/PayNowAjax/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _payNowAjax_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payNowAjax.base.css */ "./browser/components/payment/common/PayNowAjax/payNowAjax.base.css");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var _PayNowTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PayNowTemplate */ "./browser/components/payment/common/PayNowAjax/PayNowTemplate/index.js");
/* harmony import */ var _PayNowLoader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../PayNowLoader */ "./browser/components/payment/common/PayNowLoader/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _SaveCardConsent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../SaveCardConsent */ "./browser/components/payment/common/SaveCardConsent/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
















var PAYNOW_ERROR_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.PAYNOW_ERROR_CODE;
var OTP_DETAIL = {};
var OTP_PAYNOW_RESPONSE = null;
var boundFuncs = [
    'onSubmit',
    'checkForTwoFA',
    'submitWithTwoFA',
    'getPayNowBaseData',
    'getTwoFADataByPriority',
    'successCallBack',
    'errorCallBack',
    'closeLoader',
    'executeCallbacks',
    'submitRequest',
    'handleMyntraInstruments',
    'getPayload',
    'cachePaymentAttributes',
    'checkForMyntraCredit',
    'checkTwoFAInstrument',
    'toggleShowConsentFn',
    'addTokenizationConsent',
    'resetPaynowResponse',
    'setDataLayerCookie'
];
//During AB code clean up rename PayNowAjax to PayNowHandler
var PayNowAjax = /** @class */ (function (_super) {
    __extends(PayNowAjax, _super);
    function PayNowAjax(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            paynowResponse: null,
            loader: false
        };
        _this.saveCardConsentClickFn = function () { };
        _this.savedCardConsentInfo = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('SAVED_CARD_CONSENT');
        _this.isCardAutoTokenizationEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('PAYMENT_SAVE_CARD_AUTO_CONSENT');
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.upiSdkEnabled = false;
        return _this;
    }
    PayNowAjax.prototype.componentDidMount = function () {
        this.requestData = this.getPayNowBaseData();
    };
    PayNowAjax.prototype.componentDidUpdate = function (prevProps) {
        //adding this check coz whenever saved card consent half card is loading we are initializing the request data and loosing TwoFA and myntra instrument details
        var showSaveCardConsent = prevProps.showSaveCardConsent;
        if (!showSaveCardConsent && this.props.showSaveCardConsent) {
            return;
        }
        this.requestData = this.getPayNowBaseData();
    };
    PayNowAjax.prototype.executeCallbacks = function (callbacks) {
        if (callbacks.length > 0) {
            var callback = callbacks.shift();
            callback(this.executeCallbacks.bind(this, callbacks));
        }
    };
    PayNowAjax.prototype.getPayNowBaseData = function () {
        var _a = this.props, paymentOptions = _a.paymentOptions, cartId = _a.cartId, cartContext = _a.cartContext, paymentMode = _a.paymentMode, totalPayable = _a.totalPayable, ppsId = _a.ppsId;
        var _b = paymentOptions || {}, csrfToken = _b.csrfToken, paymentToken = _b.paymentToken;
        var requestData = {
            amount: totalPayable,
            csrf: csrfToken,
            cartContext: cartContext,
            cartId: cartId || '',
            clientContext: 'responsive',
            paymentMethods: paymentMode,
            profile: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, 'location.host', lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, 'location.hostname', 'www.myntra.com')),
            xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getXMetaApp)(),
            channel: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getChannel)()
        };
        paymentToken && (requestData.paymentToken = paymentToken);
        ppsId && (requestData.ppsId = ppsId);
        return requestData;
    };
    PayNowAjax.prototype.handleMyntraInstruments = function (done) {
        if (done === void 0) { done = function () { }; }
        var myntraInstrumentsData = this.props.myntraInstrumentsData;
        var paynowInstrumentsData = myntraInstrumentsData.paynowInstrumentsData;
        for (var key in paynowInstrumentsData) {
            if (key.indexOf('twofa') === -1) {
                // twofa related keys not to be added as input tags
                this.requestData[key] = paynowInstrumentsData[key];
            }
        }
        done();
    };
    PayNowAjax.prototype.getTwoFAPaymentModes = function (myntraInstrumentsData, instrumentData) {
        var paymentModes = [];
        var paymentModeMappings = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.TWO_FA_PAYMENT_MODE_MAPPING;
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'twofa_mc_data.enable')) {
            paymentModes.push(paymentModeMappings.mc);
        }
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'twofa_lp_data.enable')) {
            paymentModes.push(paymentModeMappings.lp);
        }
        if (instrumentData) {
            paymentModes.push((paymentModeMappings[instrumentData.type] ||
                instrumentData.type ||
                '').toUpperCase());
        }
        return paymentModes;
    };
    PayNowAjax.prototype.checkTwoFAInstrument = function (instrumentData) {
        var paymentInstrumentType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'type');
        var twofaPaymentOptionsList = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('TWOFA_PAYMENT_OPTIONS'), 'default') || [];
        return twofaPaymentOptionsList.includes(paymentInstrumentType);
    };
    PayNowAjax.prototype.getTwoFADataByPriority = function (data, instrumentData, instrumentSelected) {
        var paymentInstrumentType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'type');
        var userActions = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'userActions') || {};
        var mobiles = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'mobiles') || {};
        var emailOtp = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'enableEmailOTP') || {};
        var userActionsMc = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userActions, 'myntraCredit') || [];
        var userActionsLp = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userActions, 'loyalitypoints') || [];
        var lpSelected = instrumentSelected.lpSelected, mcSelected = instrumentSelected.mcSelected;
        //TwoFA order 1) MC 2) LP 3) Rest of the payment instrument
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userActionsMc[0], 'value') && mcSelected) {
            var _a = (mobiles || {}).myntraCredit, myntraCredit = _a === void 0 ? [] : _a;
            return {
                mobileNumbers: myntraCredit,
                enableEmailOtp: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(emailOtp, 'myntraCredit') || false
            };
        }
        else if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userActionsLp[0], 'value') && lpSelected) {
            var _b = (mobiles || {}).loyalitypoints, loyalitypoints = _b === void 0 ? [] : _b;
            return {
                mobileNumbers: loyalitypoints,
                enableEmailOtp: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(emailOtp, 'loyalitypoints') || false
            };
        }
        else if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userActions, paymentInstrumentType, [])[0], 'value')) {
            var mobileNumbers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(mobiles, paymentInstrumentType) || [];
            var enableEmailOtp = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(emailOtp, paymentInstrumentType) || false;
            return {
                mobileNumbers: mobileNumbers,
                enableEmailOtp: enableEmailOtp
            };
        }
        else {
            return null;
        }
    };
    PayNowAjax.prototype.checkForMyntraCredit = function (mcData) {
        return (mcData.auto_giftcard_amount > 0 &&
            mcData.auto_giftcard_used === 'true' &&
            mcData.giftcard_type === 'myntracredit');
    };
    PayNowAjax.prototype.checkForTwoFA = function (done) {
        var _this = this;
        var _a = this.props, instrumentData = _a.instrumentData, myntraInstrumentsData = _a.myntraInstrumentsData, toggleTwoFA = _a.toggleTwoFA, blockTwoFAToggle = _a.blockTwoFAToggle, addressId = _a.orderAddressId, addressUnifiedId = _a.addressUnifiedId, twoFAResponse = _a.twoFAResponse, setTwoFADetails = _a.setTwoFADetails, paymentFailureHalfCard = _a.paymentFailureHalfCard;
        var mcData = {
            auto_giftcard_amount: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'auto_giftcard_amount') || '0',
            auto_giftcard_used: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'auto_giftcard_used') || '',
            giftcard_type: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'giftcard_type') || ''
        };
        var mcSelected = this.checkForMyntraCredit(mcData);
        var lpSelected = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(myntraInstrumentsData, 'useloyaltypoints') === 'Y';
        var isTwofaEnabled = mcSelected || lpSelected || this.checkTwoFAInstrument(instrumentData);
        var instrumentSelected = {
            lpSelected: lpSelected,
            mcSelected: mcSelected
        };
        if (isTwofaEnabled) {
            //check if 2fa response is already in state
            if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(twoFAResponse)) {
                return commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_9__.default.userTwoFAVerification({
                    addressId: addressId,
                    addressUnifiedId: addressUnifiedId
                }, function (res) {
                    var twoFADetails = _this.getTwoFADataByPriority(res, instrumentData, instrumentSelected);
                    if (twoFADetails) {
                        var _a = twoFADetails || {}, _b = _a.mobileNumbers, mobileNumbers = _b === void 0 ? [] : _b, enableEmailOtp = _a.enableEmailOtp;
                        var paymentModes = _this.getTwoFAPaymentModes(myntraInstrumentsData, instrumentData);
                        setTwoFADetails(res);
                        var callback = function () {
                            _this.submitWithTwoFA();
                            done();
                            if (_this.props.isBlockTwoFAToggle) {
                                blockTwoFAToggle();
                            }
                            else if (!paymentFailureHalfCard) {
                                toggleTwoFA();
                            }
                        };
                        toggleTwoFA({
                            callback: callback,
                            enableEmailOtp: enableEmailOtp,
                            mobileNumbers: mobileNumbers,
                            paymentModes: paymentModes
                        });
                    }
                    else {
                        done();
                    }
                }, function (err) {
                    done();
                });
            }
            else {
                var twoFADetails = this.getTwoFADataByPriority(twoFAResponse, instrumentData, instrumentSelected);
                if (twoFADetails) {
                    var _b = twoFADetails || {}, _c = _b.mobileNumbers, mobileNumbers = _c === void 0 ? [] : _c, enableEmailOtp = _b.enableEmailOtp;
                    var paymentModes = this.getTwoFAPaymentModes(myntraInstrumentsData, instrumentData);
                    var callback = function () {
                        _this.submitWithTwoFA();
                        done();
                        if (_this.props.isBlockTwoFAToggle) {
                            blockTwoFAToggle();
                        }
                        else if (!paymentFailureHalfCard) {
                            toggleTwoFA();
                        }
                    };
                    return toggleTwoFA({
                        callback: callback,
                        enableEmailOtp: enableEmailOtp,
                        mobileNumbers: mobileNumbers,
                        paymentModes: paymentModes
                    });
                }
            }
        }
        done();
    };
    PayNowAjax.prototype.submitWithTwoFA = function (done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        var modeAttributes = this.props.modeAttributes;
        var requestFromPaymentFailureHalfCard = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'paymentFailureHalfCard');
        var otp = requestFromPaymentFailureHalfCard
            ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(OTP_DETAIL, 'otp')
            : lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.twoFA.otp');
        if (otp) {
            var loader = !(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.savedCardConsentInfo, "allowedCards.".concat(this.props.cardType), false) &&
                this.props.allowTokenization &&
                (modeAttributes.saveCard === 'on' || modeAttributes.useSavedCard));
            this.setState({ loader: loader });
            var inputs = [
                { name: 'otpInput', value: otp },
                { name: 'otpEnabled', value: false }
            ];
            inputs.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                _this.requestData[name] = value;
            });
            triggerEvent('SUBMIT_TWOFA', {
                maData: {
                    entity_type: 'Myntra_2FA_Payments_Page',
                    entity_name: 'Myntra_2FA_Payments_Page'
                },
                custom: {
                    widget_items: {
                        data_set: {
                            data: {
                                entity_type: 'Myntra_2FA_Payments_Page',
                                entity_name: '2FA OTP Submit'
                            }
                        }
                    }
                }
            });
        }
        done();
    };
    PayNowAjax.prototype.getPayload = function () {
        var modeAttributes = this.props.modeAttributes;
        this.upiSdkEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(modeAttributes, 'upiSdkEnabled', false);
        return __assign(__assign({}, (modeAttributes || {})), this.requestData);
    };
    PayNowAjax.prototype.setDataLayerCookie = function () {
        var dataLayerMaSessionCookieExpiry = 60 * 30 * 1000;
        var maSessionCookie = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.cookieKeys.MA_SESSION, false);
        if (maSessionCookie) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.cookieKeys.DATALAYER_MA_SESSION, maSessionCookie, dataLayerMaSessionCookieExpiry);
        }
    };
    PayNowAjax.prototype.submitRequest = function (done) {
        if (done === void 0) { done = function () { }; }
        var _a = this, _b = _a.props, paymentModeName = _b.paymentModeName, paymentUrl = _b.paymentUrl, isExchangeCart = _b.isExchangeCart, showPaymentFailureHalfCard = _b.showPaymentFailureHalfCard, paymentFailureHalfCardContext = _b.paymentFailureHalfCardContext, successCallBack = _a.successCallBack, getPayload = _a.getPayload, errorCallBack = _a.errorCallBack;
        this.props.payMode === 'retry' && this.props.disableRetryTimer();
        this.setState({ loader: true });
        var payload = getPayload();
        var isDopeWithUserConsentEnabled = paymentFailureHalfCardContext === 'dope_consent' &&
            showPaymentFailureHalfCard;
        triggerEvent('PROCEED_TO_PAY', { gaLabel: "Ajax-".concat(paymentModeName) });
        //temp solution around source in DataLayer object getting changed by PGs
        this.setDataLayerCookie();
        if (isExchangeCart) {
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_9__.default.exchange(payload, successCallBack, errorCallBack);
        }
        else {
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_9__.default.paynow(paymentUrl, payload, successCallBack, errorCallBack, isDopeWithUserConsentEnabled);
        }
        if (payload.cardYear || payload.cardMonth || payload.cvvCode) {
            var cardNumber = payload.cardNumber, cardMonth = payload.cardMonth, cardYear = payload.cardYear, cvvCode = payload.cvvCode, nonPIIdata = __rest(payload, ["cardNumber", "cardMonth", "cardYear", "cvvCode"]);
            this.payload = nonPIIdata;
        }
        else {
            this.payload = payload;
        }
        done();
    };
    PayNowAjax.prototype.cachePaymentAttributes = function (done) {
        if (((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('PAYMENT_FAILURE_HALFCARD') ||
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('DOPE_USER_CONSENT')) &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isLocalStorageEnabled)()) {
            var _a = this.props, _b = _a.modeAttributes, modeAttributes = _b === void 0 ? {} : _b, paymentMode = _a.paymentMode, paymentModeName = _a.paymentModeName, paymentUrl = _a.paymentUrl, paymentInstrument = _a.paymentInstrument;
            var paymentTriedCount = +(0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_6__.getPaymentTriedCount)();
            if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(modeAttributes)) {
                localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.localStorageKeys.PAYMENT_TRIED_COUNT, ++paymentTriedCount);
                var paymentAttributes = {
                    paymentUrl: paymentUrl,
                    paymentMode: paymentMode,
                    paymentModeName: paymentModeName,
                    paymentInstrument: paymentInstrument,
                    modeAttributes: paymentMode === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.CREDIT_CARD ? {} : modeAttributes
                };
                localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.localStorageKeys.PAYMENT_MODE_ATTRIBUTES, JSON.stringify(paymentAttributes));
            }
        }
        done();
    };
    PayNowAjax.prototype.addTokenizationConsent = function (e) {
        var modeAttributes = this.props.modeAttributes;
        var value = e.target.textContent === this.savedCardConsentInfo.button.consentGiven
            ? 'true'
            : 'false';
        if (value === 'true' && this.props.modeAttributes.saveCard === '') {
            this.props.modeAttributes.saveCard = 'on';
        }
        this.props.modeAttributes = __assign(__assign({}, modeAttributes), { tokenizationConsent: value.toString() });
    };
    PayNowAjax.prototype.toggleShowConsentFn = function (flag) {
        var _this = this;
        return function (done) {
            if (done === void 0) { done = function () { }; }
            _this.props.setLoader(false);
            _this.props.toggleSaveCardConsent(flag, done);
        };
    };
    PayNowAjax.prototype.onSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        var _a = this, _b = _a.props, submitCallback = _b.submitCallback, modeAttributes = _b.modeAttributes, isTokenizationConsentTaken = _b.isTokenizationConsentTaken, allowTokenization = _b.allowTokenization, handleMyntraInstruments = _a.handleMyntraInstruments, checkForTwoFA = _a.checkForTwoFA, submitRequest = _a.submitRequest;
        this.saveCardConsentClickFn = function (e) {
            _this.addTokenizationConsent(e);
            _this.props.toggleSaveCardConsent(false);
            handleMyntraInstruments();
            submitRequest();
        };
        this.setState({ paynowResponse: null }, function () {
            if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isLocalStorageEnabled)() &&
                lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.props, 'instrumentData.type') === 'upi') {
                localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.localStorageKeys.SAVINGS_FOMO_VALUE, 'upi');
            }
            var callbacks = [];
            callbacks.push(_this.cachePaymentAttributes);
            submitCallback && callbacks.push(submitCallback);
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('TWOFA')) {
                callbacks.push(checkForTwoFA);
            }
            var saveCard_condition = _this.isCardAutoTokenizationEnabled ? '' : 'on';
            var isAutoConsentFlow = (isTokenizationConsentTaken && allowTokenization) ||
                saveCard_condition === '';
            if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.savedCardConsentInfo, "allowedCards.".concat(_this.props.cardType), false) &&
                allowTokenization &&
                (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_6__.showTokenizationConsent)(isAutoConsentFlow) &&
                (modeAttributes.saveCard === saveCard_condition ||
                    modeAttributes.useSavedCard)) {
                callbacks.push(_this.toggleShowConsentFn(true));
            }
            else {
                callbacks.push(handleMyntraInstruments);
                callbacks.push(submitRequest);
            }
            _this.executeCallbacks(callbacks);
        });
    };
    PayNowAjax.prototype.successCallBack = function (response) {
        OTP_PAYNOW_RESPONSE = response;
        this.setState({
            paynowResponse: response,
            loader: true
        });
    };
    PayNowAjax.prototype.closeLoader = function () {
        this.setState({ loader: false, paynowResponse: null });
    };
    PayNowAjax.prototype.resetPaynowResponse = function () {
        this.setState({ paynowResponse: null });
    };
    PayNowAjax.prototype.errorCallBack = function (errorResponse) {
        this.props.payMode === 'retry' && this.props.enableRetryTimer();
        this.closeLoader();
        this.props.setPaymentFailureAttributes(PAYNOW_ERROR_CODE.DEFAULT_PAYMENT_FAILURE_ERROR_CODE, (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_12__.getCartContext)());
    };
    PayNowAjax.prototype.render = function () {
        var _a = this, _b = _a.props, cardType = _b.cardType, containerName = _b.containerName, actionData = _b.actionData, deviceMode = _b.deviceMode, paymentModeName = _b.paymentModeName, optionUI = _b.optionUI, setPaymentFailureAttributes = _b.setPaymentFailureAttributes, paymentInstrument = _b.paymentInstrument, setActionButtonRef = _b.setActionButtonRef, toggleSaveCardConsent = _b.toggleSaveCardConsent, showSaveCardConsent = _b.showSaveCardConsent, paymentFailureHalfCard = _b.paymentFailureHalfCard, payload = _a.payload, _c = _a.state, paynowResponse = _c.paynowResponse, loader = _c.loader, onSubmit = _a.onSubmit, closeLoader = _a.closeLoader, resetPaynowResponse = _a.resetPaynowResponse;
        OTP_DETAIL = this.props.twoFA;
        var payNowCallResponse = paymentFailureHalfCard
            ? OTP_PAYNOW_RESPONSE
            : paynowResponse;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            loader && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowLoader__WEBPACK_IMPORTED_MODULE_11__.default, { paymentInstrument: paymentInstrument, deviceMode: deviceMode })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", null,
                optionUI,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", { ref: setActionButtonRef, id: "action-".concat(containerName || paymentModeName), onClick: onSubmit, className: "".concat(_payNowAjax_base_css__WEBPACK_IMPORTED_MODULE_3__.default.actionButton, " ").concat(actionData.className, " ").concat(actionData.hide ? _payNowAjax_base_css__WEBPACK_IMPORTED_MODULE_3__.default.hide : '', " ").concat(deviceMode === 'mobile' ? _payNowAjax_base_css__WEBPACK_IMPORTED_MODULE_3__.default.hide : '') }, actionData.name || 'PAY NOW')),
            payNowCallResponse && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowTemplate__WEBPACK_IMPORTED_MODULE_10__.default, { paynowResponse: payNowCallResponse, closeLoader: closeLoader, resetPaynowResponse: resetPaynowResponse, setPaymentFailureAttributes: setPaymentFailureAttributes, upiSdkEnabled: this.upiSdkEnabled, payload: payload })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SaveCardConsent__WEBPACK_IMPORTED_MODULE_14__.default, { closeOnBack: false, cardType: cardType, toggleShowConsentFn: toggleSaveCardConsent, showConsent: showSaveCardConsent, onConsentClickFn: this.saveCardConsentClickFn })));
    };
    return PayNowAjax;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
PayNowAjax.propTypes = {
    actionData: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object.isRequired),
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string.isRequired),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object.isRequired),
    cartContext: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string.isRequired),
    addressUnifiedId: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string.isRequired),
    paymentMode: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string.isRequired),
    paymentModeName: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string.isRequired),
    optionUI: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().node),
    setPaymentFailureAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func)
};
PayNowAjax.defaultProps = {
    setActionButtonRef: function () { },
    setPaymentFailureAttributes: function () { },
    actionData: {},
    formAttributes: {},
    modeAttributes: {},
    cartContext: 'default'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayNowAjax);


/***/ }),

/***/ "./browser/components/payment/common/PayNowHandler/index.js":
/*!******************************************************************!*\
  !*** ./browser/components/payment/common/PayNowHandler/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PayNowAjax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PayNowAjax */ "./browser/components/payment/common/PayNowAjax/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
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




var PayNowHandler = function (props) {
    var cartData = props.cartData, _a = props.modeAttributes, modeAttributes = _a === void 0 ? {} : _a, restProps = __rest(props, ["cartData", "modeAttributes"]);
    var addressUnifiedId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'unifiedAddressId', '');
    var cartId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'id', '');
    var cartContext = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'context') || '').toLowerCase() || (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.getCartContext)();
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowAjax__WEBPACK_IMPORTED_MODULE_2__.default, __assign({ cartId: cartId, cartContext: cartContext, addressUnifiedId: addressUnifiedId, modeAttributes: modeAttributes }, restProps)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayNowHandler);


/***/ }),

/***/ "./browser/components/payment/common/PayNowLoader/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/PayNowLoader/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paynowLoader.base.css */ "./browser/components/payment/common/PayNowLoader/paynowLoader.base.css");
/* harmony import */ var iconComp_Myntra_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Myntra.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Myntra.jsx");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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







var INSTRUMENT_LOADING_MESSAGE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__.default.INSTRUMENT_LOADING_MESSAGE;
var PLEASE_WAIT_MESSAGE = 'Please Wait...';
var CodLoader = function (props) {
    var className = props.className, paymentInstrument = props.paymentInstrument;
    var loadingMessage = INSTRUMENT_LOADING_MESSAGE[paymentInstrument];
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.overlay, " ").concat(className) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.codBackdrop }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.codLoaderContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Myntra_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { height: 60, width: 65 }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.codMessageContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.loaderMessage }, loadingMessage),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, PLEASE_WAIT_MESSAGE)))));
};
var PayNowLoader = /** @class */ (function (_super) {
    __extends(PayNowLoader, _super);
    function PayNowLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayNowLoader.prototype.componentWillUnmount = function () {
        var deviceMode = this.props.deviceMode;
        var isMobile = deviceMode === 'mobile';
        isMobile &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('PAYMENT', {
                hideStepNumber: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
            });
    };
    PayNowLoader.prototype.componentDidMount = function () {
        var deviceMode = this.props.deviceMode;
        var isMobile = deviceMode === 'mobile';
        isMobile && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('PROCESSING PAYMENT');
    };
    PayNowLoader.prototype.render = function () {
        var _a = this.props, className = _a.className, paymentInstrument = _a.paymentInstrument;
        var loadingMessage = INSTRUMENT_LOADING_MESSAGE[paymentInstrument] || '';
        return paymentInstrument === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_1__.default.COD ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CodLoader, __assign({}, this.props))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.overlay, " ").concat(className ? className : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.backdrop, " ").concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isPWA)() ? _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.pwaPadding : null) }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.messageContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Myntra_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { height: 75, width: 80, className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.myntraIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.loaderMessage }, loadingMessage),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, PLEASE_WAIT_MESSAGE)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paynowLoader_base_css__WEBPACK_IMPORTED_MODULE_3__.default.caution },
                "Do not press back or close the ",
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isApp)() ? 'app' : 'browser',
                ".")));
    };
    return PayNowLoader;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
PayNowLoader.propTypes = {
    show: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool.isRequired),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
PayNowLoader.defaultProps = {
    show: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayNowLoader);


/***/ }),

/***/ "./browser/components/payment/common/SaveCardConsent/index.js":
/*!********************************************************************!*\
  !*** ./browser/components/payment/common/SaveCardConsent/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var iconComp_ShieldDashed_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/ShieldDashed.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ShieldDashed.jsx");
/* harmony import */ var commonComp_Sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Sprite */ "./browser/components/common/Sprite/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./savedCardConsent.base.css */ "./browser/components/payment/common/SaveCardConsent/savedCardConsent.base.css");
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









var Header = function (props) {
    var text = props.text, _a = props.cardType, cardType = _a === void 0 ? '' : _a;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.header }, text.replace('<cardType>', cardType)));
};
var Caption = function (props) {
    var text = props.text;
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.caption }, text);
};
var Bulletin = function (props) {
    var list = props.list;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("ul", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.bulletinList }, list.map(function (item, index) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", { key: index, className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.bulletinText }, item));
    })));
};
var onLinkClick = function (url) {
    window.location.href = url;
};
var LinkText = function (props) {
    var _a = props.data, text = _a.text, link = _a.link, styleClass = props.styleClass, styleUrlClass = props.styleUrlClass;
    return text ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(styleClass, " ").concat(_savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.linkText) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, text),
        link.text && link.url ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(_savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.linkTextUrl, " ").concat(styleUrlClass), onClick: function () { return onLinkClick(link.url); } }, link.text)) : null)) : null;
};
var Faq = function (props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(LinkText, __assign({}, props, { styleClass: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.faq }));
};
var TnC = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(LinkText, __assign({}, props, { styleClass: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.tnc, styleUrlClass: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.tncUrl })));
};
var ConsentButton = function (props) {
    var _a = props.btnData, consentGiven = _a.consentGiven, consentNotGiven = _a.consentNotGiven, _b = props.onClickFn, onClickFn = _b === void 0 ? function () { } : _b;
    var noConsentClickFn = function (e) {
        onClickFn(e);
        triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
            custom: {
                custom: {
                    v1: false,
                    v2: true,
                    v3: false // payment_token_user_consent_back
                },
                widget: {
                    name: 'payment_token_user_consent_option',
                    type: 'button'
                }
            }
        });
    };
    var yesConsentClickFn = function (e) {
        onClickFn(e);
        triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
            custom: {
                custom: {
                    v1: true,
                    v2: false,
                    v3: false // payment_token_user_consent_back
                },
                widget: {
                    name: 'payment_token_user_consent_option',
                    type: 'button'
                }
            }
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.container },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_5__.default, { onClick: noConsentClickFn, className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.consentNotGivenBtn }, consentNotGiven),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_5__.default, { onClick: yesConsentClickFn, className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.consentGivenBtn }, consentGiven)));
};
var ImageContainer = function (props) {
    var cardType = props.cardType;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.imageContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_3__.default, { name: "cardv2-default", className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.defaultCard }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ShieldDashed_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.shieldDashed }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_3__.default, { name: "cardv2-".concat(cardType.toLowerCase()), className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.defaultCard })));
};
var SaveCardConsent = function (props) {
    var savedCardConsentInfo = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__.getKVPairValue)('SAVED_CARD_CONSENT');
    var showConsent = props.showConsent, onConsentClickFn = props.onConsentClickFn, cardType = props.cardType, toggleShowConsentFn = props.toggleShowConsentFn, closeOnBack = props.closeOnBack, showConsentButton = props.showConsentButton;
    var handleCancelClick = function () {
        showConsentButton &&
            triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
                custom: {
                    custom: {
                        v1: false,
                        v2: false,
                        v3: true // payment_token_user_consent_back
                    },
                    widget: {
                        name: 'payment_token_user_consent_option',
                        type: 'button'
                    }
                }
            });
        toggleShowConsentFn(false);
    };
    var showModal = showConsent && savedCardConsentInfo.allowedCards[cardType];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        showConsentButton &&
            showModal &&
            triggerEvent('SAVE_CARD_CONSENT_HALF_CARD_LOAD', {
                custom: {
                    widget: {
                        name: 'payment_token_user_consent_load',
                        type: 'card'
                    }
                }
            });
    }, [showModal]);
    return showModal ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { id: "saveConsentModal", halfCard: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isMobile)(), closeOnBack: closeOnBack, cancelCallback: handleCancelClick, cancelIconConfig: { show: true }, disableBackdropClick: true, stopBackgroundScroll: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isMobile)(), className: "".concat(_savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.modalContainer, " ").concat(!(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isMobile)() &&
            _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.desktopModalContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedCardConsent_base_css__WEBPACK_IMPORTED_MODULE_7__.default.consentModal },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ImageContainer, { cardType: cardType }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Header, { text: savedCardConsentInfo.header, cardType: cardType }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Caption, { text: savedCardConsentInfo.caption }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Bulletin, { list: savedCardConsentInfo.bulletin }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Faq, { data: savedCardConsentInfo.faq }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TnC, { data: savedCardConsentInfo.tnc })),
        showConsentButton ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ConsentButton, { btnData: savedCardConsentInfo.button, onClickFn: onConsentClickFn })) : null)) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SaveCardConsent);
SaveCardConsent.propTypes = {
    cardType: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),
    showConsent: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),
    showConsentButton: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),
    onConsentClickFn: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
    toggleShowConsentFn: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func)
};
SaveCardConsent.defaultProps = {
    showConsentButton: true,
    onConsentClickFn: function () { },
    toggleShowConsentFn: function () { }
};


/***/ })

}]);
//# sourceMappingURL=browser_components_payment_common_PayNowHandler_index_js.js.map