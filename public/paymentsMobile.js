(self["webpackChunk"] = self["webpackChunk"] || []).push([["paymentsMobile"],{

/***/ "./browser/components/common/ErrorPage/index.js":
/*!******************************************************!*\
  !*** ./browser/components/common/ErrorPage/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorPage.base.css */ "./browser/components/common/ErrorPage/errorPage.base.css");




var onReload = function () { return window.location.reload(); };
var ErrorPage = function (_a) {
    var message = _a.message, _b = _a.reload, reload = _b === void 0 ? false : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "errorpage", className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.mainContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.subContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__.default, { name: "error" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorText }, message),
            reload && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.reload, onClick: onReload }, "Reload")))));
};
ErrorPage.defaultProps = {
    message: 'Something went wrong! Please reload.',
    reload: false
};
ErrorPage.propTypes = {
    message: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    reload: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorPage);


/***/ }),

/***/ "./browser/components/common/OtpScanner/contextConfig.js":
/*!***************************************************************!*\
  !*** ./browser/components/common/OtpScanner/contextConfig.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getContextConfig = function (_a) {
    var _b = _a.mobileNumber, mobileNumber = _b === void 0 ? '' : _b;
    return ({
        bnpl: {
            desc: "Flipkart has sent you an OTP on your registered mobile number".concat(mobileNumber ? " +91-".concat(mobileNumber) : ''),
            partnerText: '',
            otpImage: true,
            otpInputMaxLength: 6,
            buttonText: 'CONFIRM'
        },
        paymentOTP: {
            desc: 'Your bank has sent you an OTP on your registered mobile number',
            partnerText: 'We have partnered with payment partners to provide you fast and secure OTP experience.',
            otpImage: false,
            otpInputMaxLength: 10,
            buttonText: 'PAY NOW'
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContextConfig);


/***/ }),

/***/ "./browser/components/common/OtpScanner/index.js":
/*!*******************************************************!*\
  !*** ./browser/components/common/OtpScanner/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _otpScannerComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./otpScannerComponents */ "./browser/components/common/OtpScanner/otpScannerComponents.js");
/* harmony import */ var _contextConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contextConfig */ "./browser/components/common/OtpScanner/contextConfig.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
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







var boundFns = [
    'setOtpValue',
    'stopTimer',
    'setInputRef',
    'onResendClick',
    'onResendSuccess',
    'onResendError',
    'submitWithOTP'
];
var OTPScanner = /** @class */ (function (_super) {
    __extends(OTPScanner, _super);
    function OTPScanner(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            otpValue: '',
            timer: true,
            resendDisabled: true,
            resendAttempts: -1,
            payEnabled: false
        };
        boundFns.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.contextConfig = (0,_contextConfig__WEBPACK_IMPORTED_MODULE_4__.default)(props)[props.context];
        return _this;
    }
    OTPScanner.prototype.componentDidMount = function () {
        this.otpField = document.getElementById('otpField');
        if (this.otpField) {
            this.otpField.addEventListener('keydown', function (e) {
                var code = e.keyCode || e.charCode;
                var char = String.fromCharCode(code);
                if (!/^\d+$/.test(char) && code !== 8) {
                    // 8 is for backspace
                    e.preventDefault();
                }
            });
            this.otpField.focus && this.otpField.focus();
        }
    };
    OTPScanner.prototype.setOtpValue = function (e) {
        var otpValue = e.currentTarget.value || '';
        this.setState({
            otpValue: otpValue,
            payEnabled: otpValue.length >= 4
        });
    };
    OTPScanner.prototype.stopTimer = function () {
        this.setState({
            timer: false,
            resendDisabled: false
        });
    };
    OTPScanner.prototype.setInputRef = function (node) {
        this.inputField = node;
    };
    OTPScanner.prototype.onResendClick = function () {
        this.props.setLoader(true);
        this.props.resendOtp(this.onResendSuccess, this.onResendError);
    };
    OTPScanner.prototype.onResendSuccess = function (res) {
        this.props.setLoader(false);
        if (res.code) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.errorNotification)();
        }
        else if (Number(res.attemptsLeft) === 0) {
            this.setState({ resendAttempts: 0, resendDisabled: true });
        }
        else {
            this.setState({
                timer: true,
                resendDisabled: true,
                resendAttempts: Number(res.attemptsLeft)
            });
        }
    };
    OTPScanner.prototype.onResendError = function () {
        this.props.setLoader(false);
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.errorNotification)();
    };
    OTPScanner.prototype.submitWithOTP = function () {
        var otpValue = this.state.otpValue || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'otpField.value');
        this.props.onSubmit(otpValue);
    };
    OTPScanner.prototype.render = function () {
        var _a = this, _b = _a.props, amount = _b.amount, deviceMode = _b.deviceMode, state = _a.state, contextConfig = _a.contextConfig;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            amount && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_otpScannerComponents__WEBPACK_IMPORTED_MODULE_3__.AmountPayable, { amount: amount, deviceMode: deviceMode }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_otpScannerComponents__WEBPACK_IMPORTED_MODULE_3__.ScanContainer, __assign({}, state, lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, boundFns), { contextConfig: contextConfig, deviceMode: deviceMode }))));
    };
    return OTPScanner;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
OTPScanner.propTypes = {
    context: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    amount: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    resendOtp: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
    setLoader: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
    onSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};
OTPScanner.defaultProps = {
    setLoader: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OTPScanner);


/***/ }),

/***/ "./browser/components/common/OtpScanner/otpScannerComponents.js":
/*!**********************************************************************!*\
  !*** ./browser/components/common/OtpScanner/otpScannerComponents.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AmountPayable": () => (/* binding */ AmountPayable),
/* harmony export */   "ScanContainer": () => (/* binding */ ScanContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _payment_common_Timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../payment/common/Timer */ "./browser/components/payment/common/Timer/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./otpScannerComponents.base.css */ "./browser/components/common/OtpScanner/otpScannerComponents.base.css");
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
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








var AmountPayable = function (_a) {
    var amount = _a.amount, deviceMode = _a.deviceMode;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.amountPayable, " ").concat(deviceMode !== 'mobile' ? _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.amountPayableDesktop : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Amount Payable:"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_7__.default, { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.rupeeIcon }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.amountValue }, amount)));
};
var ResendOTP = function (_a) {
    var resendAttempts = _a.resendAttempts, onClick = _a.onClick;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.otpScannerButton, " resendOTP"), onClick: onClick }, "Resend OTP"),
        resendAttempts > 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.resendAttemptsText },
            "(",
            resendAttempts,
            " ",
            resendAttempts === 1 ? 'attempt' : 'attempts',
            " left)")) : null));
};
var PartnerText = function (_a) {
    var contextConfig = _a.contextConfig, deviceMode = _a.deviceMode;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.partnerTextBlock, " ").concat(deviceMode === 'mobile'
            ? _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.partnerTextBlockMobile
            : _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.partnerTextBlockDesktop) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "secureNew", className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.secureIcon }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.partnerTextContent }, contextConfig.partnerText)));
};
var ScanContainer = /** @class */ (function (_super) {
    __extends(ScanContainer, _super);
    function ScanContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScanContainer.prototype.render = function () {
        var _a = this.props, deviceMode = _a.deviceMode, contextConfig = _a.contextConfig, setInputRef = _a.setInputRef, setOtpValue = _a.setOtpValue, otpValue = _a.otpValue, payEnabled = _a.payEnabled, submitWithOTP = _a.submitWithOTP, timer = _a.timer, stopTimer = _a.stopTimer, resendDisabled = _a.resendDisabled, resendAttempts = _a.resendAttempts, onResendClick = _a.onResendClick;
        var timerStart = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('OTP_TIMER_START');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.scanContainer, " ").concat(deviceMode === 'mobile'
                ? _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.mobileScanContainer
                : _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.desktopScanContainer) },
            contextConfig.otpImage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.otpImage },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "otp" }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.scanBlock },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.otpScannerHeading }, "Enter One Time Password (OTP)"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.otpScannerDesc }, contextConfig.desc),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { id: "otpField", className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.otpInput, " cod-input-numpad"), placeholder: "Enter OTP here", type: "tel", maxLength: contextConfig.otpInputMaxLength, autoComplete: "off", align: "right", ref: setInputRef, onChange: setOtpValue, value: otpValue || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'otpField.value') || '' })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_3__.default, { onClick: payEnabled ? submitWithOTP : null, className: "".concat(_otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.sendButton, " ").concat(!payEnabled ? _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.disabled : '') }, contextConfig.buttonText),
                timer ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.timerBlock },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Resend OTP in "),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_payment_common_Timer__WEBPACK_IMPORTED_MODULE_2__.default, { seconds: timerStart.seconds, minutes: timerStart.minutes, stopCallback: stopTimer }))) : null,
                !resendDisabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ResendOTP, { resendAttempts: resendAttempts, onClick: onResendClick })) : null,
                resendAttempts === 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpScannerComponents_base_css__WEBPACK_IMPORTED_MODULE_6__.default.resendAllAttemptsText }, "You have used all Resend OTP attempts.")) : null,
                contextConfig.partnerText && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(PartnerText, { contextConfig: contextConfig, deviceMode: deviceMode })))));
    };
    return ScanContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));



/***/ }),

/***/ "./browser/components/payment/common/OtpPage/index.js":
/*!************************************************************!*\
  !*** ./browser/components/payment/common/OtpPage/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _otpPage_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./otpPage.base.css */ "./browser/components/payment/common/OtpPage/otpPage.base.css");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_OtpScanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/OtpScanner */ "./browser/components/common/OtpScanner/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__);
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










var OtpPage = /** @class */ (function (_super) {
    __extends(OtpPage, _super);
    function OtpPage() {
        var _this = _super.call(this) || this;
        _this.state = { otp: '', loading: false };
        _this.queryParams = {
            mobile: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__.getQueryParam)({ name: 'mobile' }),
            transactionId: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__.getQueryParam)({ name: 'transactionId' }),
            instrumentType: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__.getQueryParam)({ name: 'type' })
        };
        ['resendOtp', 'setLoader', 'onFormSubmit', 'setFormRef'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    OtpPage.prototype.componentDidMount = function () {
        var deviceMode = this.props.deviceMode;
        deviceMode === 'mobile'
            ? (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('PAYMENT', {
                hideStepNumber: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
            })
            : SHELL.setActivePage('PAYMENT');
    };
    OtpPage.prototype.resendOtp = function (successCallback, errorCallback) {
        commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__.default.resendBNPLOTP(this.queryParams.transactionId, function (res) { return successCallback(res); }, errorCallback);
    };
    OtpPage.prototype.setLoader = function (loadingState) {
        this.setState({ loading: loadingState });
    };
    OtpPage.prototype.setFormRef = function (node) {
        this.form = node;
    };
    OtpPage.prototype.onFormSubmit = function (otp) {
        var _this = this;
        this.setLoader(true);
        this.setState({ otp: otp }, function () {
            _this.form.submit();
        });
    };
    OtpPage.prototype.render = function () {
        var _a = this, _b = _a.state, loading = _b.loading, otp = _b.otp, deviceMode = _a.props.deviceMode, resendOtp = _a.resendOtp, onFormSubmit = _a.onFormSubmit, setLoader = _a.setLoader, setFormRef = _a.setFormRef, _c = _a.queryParams, transactionId = _c.transactionId, instrumentType = _c.instrumentType, mobile = _c.mobile;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.pageBackground },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _otpPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__.default, { show: loading, backdrop: true }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", { method: "POST", action: "".concat(_config__WEBPACK_IMPORTED_MODULE_3___default()('ppsClient').clientUrl, "v2/verifyPayment"), ref: setFormRef, className: _otpPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.form },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "transactionId", value: transactionId }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "otp", value: otp }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "instrumentType", value: instrumentType }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "xMetaApp", value: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getXMetaApp)() }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_OtpScanner__WEBPACK_IMPORTED_MODULE_4__.default, { context: "bnpl", deviceMode: deviceMode, resendOtp: resendOtp, mobileNumber: mobile, setLoader: setLoader, onSubmit: onFormSubmit })))));
    };
    return OtpPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OtpPage);


/***/ }),

/***/ "./browser/components/payment/common/PaymentOTPContainer/index.js":
/*!************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOTPContainer/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _paymentOTPComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paymentOTPComponents */ "./browser/components/payment/common/PaymentOTPContainer/paymentOTPComponents.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
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








var boundFns = [
    'resendOtp',
    'setLoader',
    'onPaymentFormSubmit',
    'showCancelConfirmation',
    'stayOnPage',
    'cancelPayment',
    'onBankRedirect',
    'setPaymentFormRef',
    'setBankRedirectFormRef'
];
var PaymentOTPContainer = /** @class */ (function (_super) {
    __extends(PaymentOTPContainer, _super);
    function PaymentOTPContainer() {
        var _this = _super.call(this) || this;
        _this.state = { otp: '', loading: false, cancelConfirmationShown: false };
        _this.queryParams = {
            amount: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__.getQueryParam)({ name: 'amount' }),
            transactionId: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__.getQueryParam)({ name: 'transactionId' }),
            instrumentType: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__.getQueryParam)({ name: 'type' })
        };
        boundFns.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    PaymentOTPContainer.prototype.componentDidMount = function () {
        var _a = this.props, history = _a.history, deviceMode = _a.deviceMode;
        deviceMode === 'mobile'
            ? (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setDocTitleInMobile)('PAYMENT', {
                hideStepNumber: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
            })
            : SHELL.setActivePage('PAYMENT');
        triggerEvent('PAYMENT_OTP_LOAD');
        history.push({
            path: history.location.path,
            search: history.location.search
        });
        window.addEventListener('popstate', this.showCancelConfirmation);
    };
    PaymentOTPContainer.prototype.showCancelConfirmation = function () {
        this.setState({
            cancelConfirmationShown: true
        });
    };
    PaymentOTPContainer.prototype.componentWillUnmount = function () {
        window.removeEventListener('popstate', this.showCancelConfirmation);
    };
    PaymentOTPContainer.prototype.resendOtp = function (successCallback, errorCallback) {
        var _a = this.queryParams, transactionId = _a.transactionId, instrumentType = _a.instrumentType;
        triggerEvent('PAYMENT_OTP_RESEND');
        commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__.default.resendPaymentOTP({ transactionId: transactionId, instrumentType: instrumentType }, function (res) { return successCallback(res); }, errorCallback);
    };
    PaymentOTPContainer.prototype.setLoader = function (loadingState) {
        this.setState({ loading: loadingState });
    };
    PaymentOTPContainer.prototype.setPaymentFormRef = function (node) {
        this.paymentForm = node;
    };
    PaymentOTPContainer.prototype.setBankRedirectFormRef = function (node) {
        this.bankRedirectForm = node;
    };
    PaymentOTPContainer.prototype.onPaymentFormSubmit = function (otp) {
        var _this = this;
        this.setLoader(true);
        triggerEvent('PAYMENT_OTP_SUBMIT');
        this.setState({ otp: otp }, function () {
            _this.paymentForm.submit();
        });
    };
    PaymentOTPContainer.prototype.onBankRedirect = function () {
        this.setLoader(true);
        triggerEvent('PAYMENT_OTP_BANK_REDIRECT');
        this.bankRedirectForm.submit();
    };
    PaymentOTPContainer.prototype.stayOnPage = function () {
        var history = this.props.history;
        history.push({
            path: history.location.path,
            search: history.location.search
        });
        this.setState({
            cancelConfirmationShown: false
        });
    };
    PaymentOTPContainer.prototype.cancelPayment = function () {
        this.props.history.go(-2);
    };
    PaymentOTPContainer.prototype.render = function () {
        var _a = this, state = _a.state, _b = _a.props, deviceMode = _b.deviceMode, styles = _b.styles, queryParams = _a.queryParams;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_paymentOTPComponents__WEBPACK_IMPORTED_MODULE_3__.OTPSection, { styles: styles, state: state, params: __assign(__assign({}, queryParams), { deviceMode: deviceMode, xMetaApp: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getXMetaApp)(), paymentFormURL: "".concat(_config__WEBPACK_IMPORTED_MODULE_2___default()('ppsClient').clientUrl, "v2/verifyPayment"), redirectBankFormURL: "".concat(_config__WEBPACK_IMPORTED_MODULE_2___default()('ppsClient').clientUrl, "v2/getBankRedirectTemplate/").concat(queryParams.instrumentType, "/").concat(queryParams.transactionId) }), actionHandlers: lodash_pick__WEBPACK_IMPORTED_MODULE_1___default()(this, boundFns) }));
    };
    return PaymentOTPContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentOTPContainer);


/***/ }),

/***/ "./browser/components/payment/common/PaymentOTPContainer/paymentOTPComponents.js":
/*!***************************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOTPContainer/paymentOTPComponents.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OTPSection": () => (/* binding */ OTPSection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_OtpScanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/OtpScanner */ "./browser/components/common/OtpScanner/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_ButtonV2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ButtonV2 */ "./browser/components/common/ButtonV2/index.js");
/* harmony import */ var _paymentOTPComponents_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paymentOTPComponents.base.css */ "./browser/components/payment/common/PaymentOTPContainer/paymentOTPComponents.base.css");
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");
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







var OTPSection = function (_a) {
    var styles = _a.styles, _b = _a.state, loading = _b.loading, otp = _b.otp, cancelConfirmationShown = _b.cancelConfirmationShown, _c = _a.params, paymentFormURL = _c.paymentFormURL, redirectBankFormURL = _c.redirectBankFormURL, transactionId = _c.transactionId, instrumentType = _c.instrumentType, xMetaApp = _c.xMetaApp, deviceMode = _c.deviceMode, amount = _c.amount, _d = _a.actionHandlers, setPaymentFormRef = _d.setPaymentFormRef, setBankRedirectFormRef = _d.setBankRedirectFormRef, onBankRedirect = _d.onBankRedirect, resendOtp = _d.resendOtp, setLoader = _d.setLoader, onPaymentFormSubmit = _d.onPaymentFormSubmit, stayOnPage = _d.stayOnPage, cancelPayment = _d.cancelPayment;
    styles = __assign(__assign({}, styles), _paymentOTPComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.pageBackground },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__.default, { show: loading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", { method: "POST", action: paymentFormURL, id: "paymentForm", ref: setPaymentFormRef },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "transactionId", value: transactionId }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "otp", value: otp }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "instrumentType", value: instrumentType }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { type: "hidden", name: "xMetaApp", value: xMetaApp }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_OtpScanner__WEBPACK_IMPORTED_MODULE_1__.default, { context: "paymentOTP", deviceMode: deviceMode, amount: amount, resendOtp: resendOtp, setLoader: setLoader, onSubmit: onPaymentFormSubmit })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(RedirectToBank, { styles: styles, url: redirectBankFormURL, setRef: setBankRedirectFormRef, onClick: onBankRedirect })),
        cancelConfirmationShown ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CancelConfirmation, { styles: styles, stayOnPage: stayOnPage, cancelPayment: cancelPayment })) : null));
};
var CancelConfirmation = function (_a) {
    var styles = _a.styles, stayOnPage = _a.stayOnPage, cancelPayment = _a.cancelPayment;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_3__.default, { cancelCallback: stayOnPage, className: styles.cancelConfirmModal }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.cancelConfirmModalHeader }, "Cancel Payment?"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.cancelConfirmModalDesc }, "Are you sure you want to cancel payment?"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.cancelConfirmModalButtonGroup },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ButtonV2__WEBPACK_IMPORTED_MODULE_4__.default, { text: "STAY HERE", onClick: onCancel, containerClassname: styles.displayInlineBlock, classname: "".concat(styles.cancelConfirmModalButton, " ").concat(styles.firstButton) }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ButtonV2__WEBPACK_IMPORTED_MODULE_4__.default, { text: "CANCEL PAYMENT", onClick: cancelPayment, containerClassname: styles.displayInlineBlock, classname: styles.cancelConfirmModalButton })))); }));
};
var RedirectToBank = function (_a) {
    var styles = _a.styles, url = _a.url, setRef = _a.setRef, onClick = _a.onClick;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.separator },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: styles.separatorLine }, "-------------------------"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "OR"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: styles.separatorLine }, "-------------------------")),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("form", { method: "GET", action: url, id: "bankRedirectForm", ref: setRef },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.redirectToBank, onClick: onClick },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.bankRedirectHeading }, "Continue payment on bank's website."),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.bankRedirectDesc }, "You will be redirected to bank OTP page."),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: styles.redirectIcon })))));
};



/***/ }),

/***/ "./browser/components/payment/common/PaymentPage/PaymentPage.js":
/*!**********************************************************************!*\
  !*** ./browser/components/payment/common/PaymentPage/PaymentPage.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/ProfileManager */ "./browser/utils/ProfileManager.js");
/* harmony import */ var commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/TokenManager */ "./browser/utils/TokenManager.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../utils/maHelper */ "./browser/utils/maHelper.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_maHelper__WEBPACK_IMPORTED_MODULE_13__);
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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



// Functional Imports.












var DATA_KEY = '_checkout_.__myx_data__';
var boundFuncs = [
    'initPageData',
    'onSuccess',
    'onError',
    'handlePaymentOptionsError',
    'handlePaymentAction',
    'updatePageData',
    'setLoader',
    'updateBankDiscount',
    'getPaymentData',
    'toggleTwoFA',
    'disableTwoFA',
    'handleTwoFASubmit',
    'updateDynamicStyles',
    'setPaymentFailureAttributes',
    'disableRetrySession',
    'disableRetryTimer',
    'enableRetryTimer',
    'updateCreditsBalance',
    'toggleRetryGC',
    'showBackConfirmationModal',
    'stayHere',
    'tryLater',
    'setTwoFADetails',
    'getTwoFADetails',
    'initializePhonePe',
    'toggleSaveCardConsent',
    'onPaymentDataSuccess',
    'onPaymentDataFailure'
];
var PaymentPage = /** @class */ (function (_super) {
    __extends(PaymentPage, _super);
    function PaymentPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loading: false,
            spinner: true,
            error: null,
            cartData: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isLoggedIn)() ? _this.props.getCartStoreData() : null,
            isExchangeCart: false,
            paymentOptions: null,
            paymentConfig: null,
            addressInfo: {},
            retrySessionEnabled: true,
            retryTimerDisabled: false,
            retryGCapplied: false,
            backConfirmationModalShown: false,
            twoFA: {
                display: false,
                callback: function () { },
                otp: null,
                disabled: false,
                mobileNumbers: null,
                enableEmailOtp: true,
                paymentModes: []
            },
            showSaveCardConsent: false,
            twoFAResponse: {},
            errorAttribute: {
                paymentErrorCode: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'errorCode' }),
                paymentErrorCodeOverride: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'overrideErrorCode' }),
                cartContext: (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'cartContext' }),
                updateCounter: 0
            },
            bankDiscount: 0,
            dynamicStyles: {}
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.payMode = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'mode' });
        _this.referrer = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'referrer' });
        _this.ppsId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({ name: 'ppsid' });
        _this.initializePhonePe();
        return _this;
    }
    PaymentPage.prototype.componentDidMount = function () {
        var _this = this;
        this.props.analytics('setPageContext')('Checkout-payment');
        this.props.analytics('initWebengage')();
        triggerEvent('PAYMENT_SCREEN_LOAD', (_utils_maHelper__WEBPACK_IMPORTED_MODULE_13___default()));
        triggerEvent('PAYMENT_PAGE_VIEW');
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.cookieKeys.ORDER_CONFIRMED, '', 0);
        commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_6__.default.fetchDetails(function () {
            return _this.initPageData({
                spinner: !(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isAndroidApp)(),
                prefetchedData: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('PAYMENT_PREFETCH') && _this.getPrefetchedData()
            });
        });
        if (this.payMode === 'retry') {
            triggerEvent('DOPE_RETRY_PAYMENT_PAGE_LOADED');
            var history_1 = this.props.history;
            history_1.push({
                path: history_1.location.path,
                search: history_1.location.search
            });
            window.addEventListener('popstate', this.showBackConfirmationModal);
        }
    };
    PaymentPage.prototype.componentWillUnmount = function () {
        var _a = this, cartData = _a.state.cartData, setCartStoreData = _a.props.setCartStoreData;
        setCartStoreData(cartData);
        if (this.payMode === 'retry') {
            window.removeEventListener('popstate', this.showBackConfirmationModal);
        }
    };
    PaymentPage.prototype.componentDidUpdate = function () {
        if (!this.firstUpdate) {
            var data = this.state.cartData;
            if (data) {
                this.props.analytics('pushDataLayerObjectForGTM')(data, 'payment');
                this.firstUpdate = true;
            }
        }
    };
    PaymentPage.prototype.initializePhonePe = function () {
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isMyntAppEnabled)(['initializePhonePe'])) {
            MyntApp.initializePhonePe();
        }
    };
    PaymentPage.prototype.onSuccess = function (data) {
        var lpBalance = data.lpBalance, gcBalance = data.gcBalance, pageData = __rest(data, ["lpBalance", "gcBalance"]);
        var paymentOptions = pageData.paymentOptions;
        if (paymentOptions &&
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('LOW_SR_OPTIONS_REMOVE') &&
            Array.isArray(paymentOptions.paymentInstrumentDetails)) {
            paymentOptions.paymentInstrumentDetails = paymentOptions.paymentInstrumentDetails.filter(function (instrument) {
                if (commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_12__.default.LOW_SR_FILTER_EXCLUSIONS.includes(instrument.type)) {
                    return true;
                }
                var instrumentDetails = instrument.paymentInstrumentDetails;
                if (instrumentDetails && Array.isArray(instrumentDetails.data)) {
                    instrumentDetails.data = instrumentDetails.data.filter(function (item) { return !item.lowSuccessRate; });
                    if (instrumentDetails.data.length === 0) {
                        return false;
                    }
                }
                return true;
            });
        }
        this.creditsBalance = {
            lpBalance: lpBalance,
            gcBalance: gcBalance
        };
        this.setState(__assign(__assign({}, pageData), { paymentConfig: (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getPaymentConfig)(paymentOptions), isExchangeCart: (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.checkExchangeCart)(pageData.cartData), loading: false }));
    };
    PaymentPage.prototype.onError = function (error) {
        if (error === void 0) { error = {}; }
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUidx)();
        var _a = error.code, code = _a === void 0 ? '' : _a, _b = error.message, message = _b === void 0 ? '' : _b;
        triggerEvent('PAYMENT_PAGE_LOAD_ERROR', {
            gaLabel: "".concat(code, ":").concat(message, ":").concat(uidx)
        });
        this.setState({
            error: error,
            loading: false
        });
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)({ message: error.message });
    };
    PaymentPage.prototype.getPrefetchedData = function () {
        var _a = this.props.getPaymentStoreData() || {}, gcBalance = _a.gcBalance, lpBalance = _a.lpBalance;
        return {
            gcBalance: gcBalance,
            lpBalance: lpBalance
        };
    };
    PaymentPage.prototype.toggleSaveCardConsent = function (showSaveCardConsent, done) {
        if (done === void 0) { done = function () { }; }
        this.setState({
            showSaveCardConsent: showSaveCardConsent
        }, done);
    };
    PaymentPage.prototype.setTwoFADetails = function (data) {
        this.setState({
            twoFAResponse: data
        });
    };
    PaymentPage.prototype.getTwoFADetails = function (cartData) {
        var _this = this;
        //setting twofa details from shield
        if (cartData) {
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default.userTwoFAVerification({
                addressId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'orderAddressId'),
                addressUnifiedId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'unifiedAddressId')
            }, function (res) {
                _this.setTwoFADetails(res);
            }, function () {
                // not throw an error in this case
            });
        }
    };
    PaymentPage.prototype.toggleTwoFA = function (state) {
        if (state === void 0) { state = {}; }
        this.state.twoFA.display && triggerEvent('CLOSE_TWOFA');
        this.setState(function (prevState) { return ({
            twoFA: __assign(__assign(__assign({}, prevState.twoFA), state), { display: !prevState.twoFA.display }),
            loading: false
        }); });
    };
    PaymentPage.prototype.disableTwoFA = function () {
        this.setState(function (prevState) { return ({
            twoFA: __assign(__assign({}, prevState.twoFA), { display: false, disabled: true })
        }); });
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)({ message: 'Two factor authentication is disabled' });
    };
    PaymentPage.prototype.handleTwoFASubmit = function (data) {
        this.setState(function (prevState) { return ({
            twoFA: __assign(__assign({}, prevState.twoFA), data)
        }); }, this.state.twoFA.callback);
    };
    PaymentPage.prototype.handleRedirect = function (data, forceRedirect) {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)({ message: data.message });
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.navigateBack)(this.props.history, {
            message: true,
            url: data.redirectUrl || '/checkout/address',
            forceRedirect: forceRedirect
        });
    };
    PaymentPage.prototype.displayCODFallback = function (data, errorMessage) {
        var shippingInfo;
        try {
            shippingInfo = JSON.stringify((0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.getShippingInfo)(data.cartData) || {});
        }
        catch (e) {
            shippingInfo = '{}';
        }
        var codServiceable = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.isCartCodServiceable)(data.cartData);
        if (codServiceable) {
            triggerEvent('COD_FALLBACK', {
                maData: {
                    entity_type: 'cart',
                    entity_name: 'cart',
                    entity_id: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'cartData.id')
                },
                custom: {
                    custom: { v1: shippingInfo },
                    widget_items: {
                        data_set: {
                            data: (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'cartData.products') || []).map(function (product) { return ({
                                entity_type: 'product',
                                entity_name: product.name,
                                entity_id: product.id
                            }); })
                        }
                    }
                }
            });
            var paymentOptions = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getCodFallbackResponse)();
            this.onSuccess(__assign(__assign({}, data), { paymentOptions: paymentOptions }));
        }
        else {
            this.onError({ message: errorMessage });
        }
    };
    PaymentPage.prototype.fireTwoFAEvent = function (data) {
        var paymentInstruments = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'paymentInstrumentDetails', []);
        var payload = [];
        for (var _i = 0, paymentInstruments_1 = paymentInstruments; _i < paymentInstruments_1.length; _i++) {
            var instrument = paymentInstruments_1[_i];
            var type = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrument, 'type');
            var isMobileOtpEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrument, 'paymentInstrumentDetails.enable2fa', false);
            var isEmailOtpEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrument, 'paymentInstrumentDetails.enableEmailOTP', false);
            var aggregatedData = isMobileOtpEnabled || isEmailOtpEnabled
                ? "".concat(type, "|").concat(isMobileOtpEnabled, "|").concat(isEmailOtpEnabled)
                : '';
            aggregatedData && payload.push(aggregatedData);
        }
        if (payload.length > 0) {
            triggerEvent('TWO_FA_ENABLED', {
                custom: {
                    custom: {
                        v1: payload.toString()
                    }
                }
            });
        }
    };
    PaymentPage.prototype.handleCODFallback = function (_a) {
        var errorConfig = _a.errorConfig, message = _a.message, data = _a.data;
        var errorMessage = errorConfig.message || message;
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isSessionStorageEnabled)()) {
            try {
                var errorCount = Number(sessionStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT) || 0);
                var retryCount = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('COD_FALLBACK_CONFIG').retryCount;
                if (errorCount < retryCount) {
                    sessionStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT, ++errorCount);
                    this.onError({ message: errorMessage });
                }
                else {
                    this.displayCODFallback(data, errorMessage);
                }
            }
            catch (e) {
                this.displayCODFallback(data, errorMessage);
            }
        }
        else {
            this.displayCODFallback(data, errorMessage);
        }
    };
    PaymentPage.prototype.handlePaymentOptionsError = function (errorData, data) {
        var error = errorData.error, message = errorData.message;
        var errorCode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(error, 'errorCode');
        var instrumentsFailureKV = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('PAYMENT_INSTRUMENTS_FAILURE');
        var errorConfig = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentsFailureKV, errorCode, {});
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUidx)();
        triggerEvent('GET_PAYMENT_OPTIONS_ERROR', {
            gaLabel: "".concat(errorCode, ":").concat(errorConfig.message || message, ":").concat(uidx)
        });
        if (errorConfig.goBack) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)({ message: errorConfig.message });
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.navigateBack)(this.props.history, {
                message: true,
                url: errorConfig.url || '/checkout/cart',
                forceRedirect: errorConfig.forceRedirect
            });
        }
        else if (errorConfig.forceLogin) {
            SHELL.redirectTo((0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getPaymentLoginUrl)({ force: true }));
        }
        else if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('COD_FALLBACK_ENABLED') &&
            this.payMode !== 'retry') {
            this.handleCODFallback({ errorConfig: errorConfig, message: message, data: data });
        }
        else {
            this.onError({ message: errorConfig.message || message });
        }
    };
    PaymentPage.prototype.initPageData = function (options) {
        var _this = this;
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isLoggedIn)()) {
            var data_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, DATA_KEY, null);
            if (data_1) {
                if (data_1.httpStatus === 200) {
                    this.setState({
                        cartData: data_1.cartData,
                        addressData: data_1.addressData,
                        loading: false
                    });
                    this.getPaymentOptions(data_1)
                        .then(function (paymentOptions) {
                        _this.onSuccess(__assign(__assign({}, data_1), { paymentOptions: paymentOptions }));
                    })
                        .catch(function (err) {
                        _this.onPaymentDataFailure(err, data_1.cartData);
                    });
                    this.getTwoFADetails(data_1.cartData);
                }
                else if (data_1.status === 'UPDATE_TOKENS') {
                    commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_7__.default.refreshToken(this.getPaymentData);
                }
                else if (data_1.status === 'AUTHNZ_FAIL') {
                    this.onError(data_1);
                }
                else if (data_1.httpStatus === 401) {
                    SHELL.redirectTo((0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getPaymentLoginUrl)({}));
                }
                else if (data_1.httpStatus === 302) {
                    this.handleRedirect(data_1);
                }
                else {
                    this.onError(data_1);
                }
                window._checkout_.__myx_data__ = null;
            }
            else {
                this.getPaymentData(options);
            }
        }
        else {
            SHELL.redirectTo((0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getPaymentLoginUrl)({ force: true }));
        }
    };
    PaymentPage.prototype.deferredPaymentOptionsHandler = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default.getDeferredPaymentOptions({ ppsId: _this.ppsId }, function (paymentOptions) {
                resolve(paymentOptions);
            }, function (error) {
                _this.handlePaymentOptionsError(error, data);
                reject(error);
            });
        });
    };
    PaymentPage.prototype.paymentOptionsHandler = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.isValidCart)(data.cartData)) {
                commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default.getPaymentOptions({
                    cartId: data.cartData.id,
                    isExchangeCart: (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.checkExchangeCart)(data.cartData)
                }, function (paymentOptions) {
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isSessionStorageEnabled)() &&
                        sessionStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT, 0);
                    _this.fireTwoFAEvent(paymentOptions);
                    resolve(paymentOptions);
                }, function (error) {
                    // the error handling is already there
                    reject(__assign(__assign({}, error), { isPaymentOptions: true }));
                });
            }
            else {
                var checkoutReady = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'cartData.flags.checkoutReady');
                var message = 'Bag is empty or invalid. Redirecting back...';
                var url = '/checkout/cart';
                var steps = 1;
                if (!lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(checkoutReady, 'value') &&
                    lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(checkoutReady, 'remark') === 'ADDRESS_NOT_FOUND') {
                    message =
                        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('PAYMENT_NOT_READY_ERROR'), 'message.OEE_ADDRESS_NOT_FOUND') || 'Something went wrong! Please try again';
                    //normal cart flow
                    if (!(0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.checkExchangeCart)(data.cartData)) {
                        url = '/checkout/address';
                        message =
                            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('PAYMENT_NOT_READY_ERROR'), 'message.ADDRESS_NOT_FOUND') || 'Something went wrong! Please reselect the address';
                    }
                }
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)({
                    message: message
                });
                if (window && window.location.hash.includes('#disableBack')) {
                    steps = 2;
                }
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.navigateBack)(_this.props.history, {
                    message: true,
                    url: url,
                    steps: steps
                });
            }
        });
    };
    PaymentPage.prototype.getPaymentOptions = function (data) {
        return this.payMode === 'retry'
            ? this.deferredPaymentOptionsHandler(data)
            : this.paymentOptionsHandler(data);
    };
    PaymentPage.prototype.onPaymentDataSuccess = function (_a, options) {
        var gcBalance = _a.gcBalance, lpBalance = _a.lpBalance, addressData = _a.addressData, cartData = _a.cartData, paymentOptions = _a.paymentOptions;
        this.onSuccess({
            cartData: cartData,
            gcBalance: gcBalance || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(options, 'prefetchedData.gcBalance'),
            lpBalance: lpBalance || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(options, 'prefetchedData.lpBalance'),
            addressData: addressData,
            paymentOptions: paymentOptions
        });
    };
    PaymentPage.prototype.onPaymentDataFailure = function (error, cartData) {
        if (cartData === void 0) { cartData = {}; }
        if (error.isPaymentOptions) {
            this.handlePaymentOptionsError(error, { cartData: cartData });
        }
        else if (error.status === 401) {
            SHELL.redirectTo((0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_4__.getPaymentLoginUrl)({}));
        }
        else if (error.status === 302) {
            this.handleRedirect(error.error, true);
        }
        else if (error.status === 'UPDATE_TOKENS') {
            commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_7__.default.refreshToken(this.getPaymentData);
        }
        else {
            this.onError(error);
        }
    };
    PaymentPage.prototype.getPaymentData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, payMode, referrer, ppsId, _b, cartData, selectedAddress, _c, gcBalance, lpBalance, addressData, fetchedCartData, paymentOptions, error_1, isAddressIDNotAvailable;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this, payMode = _a.payMode, referrer = _a.referrer, ppsId = _a.ppsId;
                        _b = this.props, cartData = _b.cartData, selectedAddress = _b.selectedAddress;
                        if (!cartData) return [3 /*break*/, 1];
                        Promise.all([
                            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default.getPageData(__assign({ payMode: payMode, referrer: referrer, ppsId: ppsId }, options), cartData, selectedAddress),
                            this.getPaymentOptions({ cartData: cartData })
                        ])
                            .then(function (_a) {
                            var _b = _a[0], gcBalance = _b.gcBalance, lpBalance = _b.lpBalance, addressData = _b.addressData, fetchedCartData = _b.cartData, paymentOptions = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_c) {
                                    this.onPaymentDataSuccess({
                                        gcBalance: gcBalance,
                                        lpBalance: lpBalance,
                                        addressData: addressData,
                                        cartData: fetchedCartData ? fetchedCartData : cartData,
                                        paymentOptions: paymentOptions
                                    }, options);
                                    return [2 /*return*/];
                                });
                            });
                        })
                            .catch(function (error) {
                            _this.onPaymentDataFailure(error, cartData);
                        });
                        this.getTwoFADetails(cartData);
                        return [3 /*break*/, 8];
                    case 1:
                        _d.trys.push([1, 4, , 8]);
                        return [4 /*yield*/, commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default.getPageData(__assign({ payMode: payMode, referrer: referrer, ppsId: ppsId }, options), {}, selectedAddress)];
                    case 2:
                        _c = _d.sent(), gcBalance = _c.gcBalance, lpBalance = _c.lpBalance, addressData = _c.addressData, fetchedCartData = _c.cartData;
                        cartData = fetchedCartData;
                        this.getTwoFADetails(cartData);
                        return [4 /*yield*/, this.getPaymentOptions({
                                cartData: cartData
                            })];
                    case 3:
                        paymentOptions = _d.sent();
                        this.onPaymentDataSuccess({
                            gcBalance: gcBalance,
                            lpBalance: lpBalance,
                            addressData: addressData,
                            cartData: cartData,
                            paymentOptions: paymentOptions
                        }, options);
                        return [3 /*break*/, 8];
                    case 4:
                        error_1 = _d.sent();
                        isAddressIDNotAvailable = error_1.message === 'Unable to fetch address id';
                        if (!isAddressIDNotAvailable) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getPaymentOptions({})];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.onPaymentDataFailure(error_1, cartData);
                        _d.label = 7;
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PaymentPage.prototype.updatePageData = function (res, options) {
        var _a;
        if (!options.keepPreviousState && options.updateKey) {
            var obj = (_a = {},
                _a[options.updateKey] = res,
                _a);
            if (options.updateKey === 'cartData') {
                obj.isExchangeCart = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_3__.checkExchangeCart)(res);
            }
            if (options.updateKey === 'paymentOptions') {
                this.fireTwoFAEvent(res);
            }
            this.setState(obj);
        }
    };
    PaymentPage.prototype.handlePaymentAction = function (action, data, options, onSuccess, onError) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.setState({ loading: true, error: null });
        commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_5__.default[action](data, function (res) {
            _this.setState({ loading: false });
            _this.updatePageData(res, options);
            onSuccess && onSuccess(res);
        }, function (err) {
            _this.setState({ loading: false });
            onError ? onError(err) : (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(options);
        });
    };
    PaymentPage.prototype.setLoader = function (loading, callback) {
        this.setState({ loading: loading }, callback);
    };
    PaymentPage.prototype.updateBankDiscount = function (bankDiscount) {
        this.setState({ bankDiscount: bankDiscount });
    };
    PaymentPage.prototype.updateDynamicStyles = function (key, value) {
        var _a;
        this.setState({
            dynamicStyles: __assign(__assign({}, this.state.dynamicStyles), (_a = {}, _a[key] = value, _a))
        });
    };
    PaymentPage.prototype.setPaymentFailureAttributes = function (errorCode, context) {
        this.setState(function (prevState) { return ({
            errorAttribute: {
                paymentErrorCode: errorCode,
                cartContext: context,
                updateCounter: ++prevState.errorAttribute.updateCounter
            }
        }); });
    };
    PaymentPage.prototype.disableRetrySession = function () {
        this.setState({
            retrySessionEnabled: false
        });
    };
    PaymentPage.prototype.disableRetryTimer = function () {
        this.setState({
            retryTimerDisabled: true
        });
    };
    PaymentPage.prototype.enableRetryTimer = function () {
        this.setState({
            retryTimerDisabled: false
        });
    };
    PaymentPage.prototype.updateCreditsBalance = function (balance) {
        this.creditsBalance = balance;
    };
    PaymentPage.prototype.toggleRetryGC = function () {
        this.setState(function (prevState) { return ({
            retryGCapplied: !prevState.retryGCapplied
        }); });
    };
    PaymentPage.prototype.showBackConfirmationModal = function () {
        this.setState({
            backConfirmationModalShown: true
        });
    };
    PaymentPage.prototype.stayHere = function () {
        var history = this.props.history;
        history.push({
            path: history.location.path,
            search: history.location.search
        });
        this.setState({
            backConfirmationModalShown: false
        });
    };
    PaymentPage.prototype.tryLater = function () {
        var redirectConfig = this.referrer === commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.orderStates.PLACED
            ? { steps: 2 }
            : { url: '/', forceRedirect: true };
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.navigateBack)(this.props.history, redirectConfig);
    };
    PaymentPage.prototype.render = function () {
        var _a = this, _b = _a.props, render = _b.render, analytics = _b.analytics, savedCartData = _b.cartData, savedSelectedAddress = _b.selectedAddress, payMode = _a.payMode, referrer = _a.referrer, ppsId = _a.ppsId, updateBankDiscount = _a.updateBankDiscount, updateDynamicStyles = _a.updateDynamicStyles, setLoader = _a.setLoader, handlePaymentAction = _a.handlePaymentAction, updatePageData = _a.updatePageData, toggleTwoFA = _a.toggleTwoFA, disableTwoFA = _a.disableTwoFA, handleTwoFASubmit = _a.handleTwoFASubmit, setPaymentFailureAttributes = _a.setPaymentFailureAttributes, state = _a.state, creditsBalance = _a.creditsBalance, disableRetrySession = _a.disableRetrySession, disableRetryTimer = _a.disableRetryTimer, enableRetryTimer = _a.enableRetryTimer, updateCreditsBalance = _a.updateCreditsBalance, toggleRetryGC = _a.toggleRetryGC, stayHere = _a.stayHere, tryLater = _a.tryLater, setTwoFADetails = _a.setTwoFADetails, toggleSaveCardConsent = _a.toggleSaveCardConsent;
        var cartData = state.cartData, addressData = state.addressData;
        return render(__assign(__assign({}, state), { payMode: payMode, referrer: referrer, ppsId: ppsId, updateBankDiscount: updateBankDiscount, handlePaymentAction: handlePaymentAction, updatePageData: updatePageData, setLoader: setLoader, updateDynamicStyles: updateDynamicStyles, toggleTwoFA: toggleTwoFA, disableTwoFA: disableTwoFA, handleTwoFASubmit: handleTwoFASubmit, setPaymentFailureAttributes: setPaymentFailureAttributes, disableRetrySession: disableRetrySession, disableRetryTimer: disableRetryTimer, enableRetryTimer: enableRetryTimer, updateCreditsBalance: updateCreditsBalance, toggleRetryGC: toggleRetryGC, stayHere: stayHere, tryLater: tryLater, analytics: analytics, refreshPageData: this.initPageData, creditsBalance: creditsBalance, setTwoFADetails: setTwoFADetails, toggleSaveCardConsent: toggleSaveCardConsent, cartData: cartData ? cartData : savedCartData, addressData: addressData ? addressData : savedSelectedAddress }));
    };
    return PaymentPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
PaymentPage.propTypes = {
    render: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    updateStoreData: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentPage);


/***/ }),

/***/ "./browser/components/payment/common/PaymentPage/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/PaymentPage/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _context_CheckoutContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @context/CheckoutContext */ "./browser/context/CheckoutContext.js");
/* harmony import */ var _PaymentPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaymentPage */ "./browser/components/payment/common/PaymentPage/PaymentPage.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_context_CheckoutContext__WEBPACK_IMPORTED_MODULE_0__.CheckoutConsumerHOC)(_PaymentPage__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./browser/components/payment/common/Timer/index.js":
/*!**********************************************************!*\
  !*** ./browser/components/payment/common/Timer/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _timer_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer.base.css */ "./browser/components/payment/common/Timer/timer.base.css");
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




var getExpandedDisplay = function (_a) {
    var minutes = _a.minutes, seconds = _a.seconds;
    return "".concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.padZeros)(minutes), " min ").concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.padZeros)(seconds), " sec");
};
var getBasicDisplay = function (_a) {
    var minutes = _a.minutes, seconds = _a.seconds;
    return "".concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.padZeros)(minutes), ":").concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.padZeros)(seconds));
};
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            seconds: props.seconds,
            minutes: props.minutes
        };
        return _this;
    }
    Timer.prototype.componentDidMount = function () {
        this.setupTimer();
    };
    Timer.prototype.setupTimer = function () {
        var _this = this;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            var _a = _this.state, seconds = _a.seconds, minutes = _a.minutes;
            if (seconds === 0 && minutes === 0) {
                _this.stopTimer();
            }
            else if (seconds === 0) {
                _this.setState({
                    seconds: 59,
                    minutes: minutes - 1
                });
            }
            else {
                _this.setState({
                    seconds: seconds - 1
                });
            }
        }, 1000);
    };
    Timer.prototype.disableTimer = function () {
        clearInterval(this.timer);
    };
    Timer.prototype.enableTimer = function () {
        this.setupTimer();
    };
    Timer.prototype.stopTimer = function () {
        clearInterval(this.timer);
        this.props.stopCallback();
    };
    Timer.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.disabled !== this.props.disabled) {
            if (this.props.disabled) {
                this.disableTimer();
            }
            else {
                this.enableTimer();
            }
        }
    };
    Timer.prototype.render = function () {
        var _a = this, _b = _a.state, seconds = _b.seconds, minutes = _b.minutes, _c = _a.props, _d = _c.className, className = _d === void 0 ? '' : _d, expanded = _c.expanded;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_timer_base_css__WEBPACK_IMPORTED_MODULE_2__.default.timer, " ").concat(className) }, expanded
            ? getExpandedDisplay({ minutes: minutes, seconds: seconds })
            : getBasicDisplay({ minutes: minutes, seconds: seconds })));
    };
    return Timer;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Timer.propTypes = {
    seconds: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    minutes: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    stopCallback: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
Timer.defaultProps = {
    disabled: false,
    expanded: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);


/***/ }),

/***/ "./browser/components/payment/mobile/PaymentOTP/index.js":
/*!***************************************************************!*\
  !*** ./browser/components/payment/mobile/PaymentOTP/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_PaymentOTPContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/PaymentOTPContainer */ "./browser/components/payment/common/PaymentOTPContainer/index.js");
/* harmony import */ var commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/WithStyles */ "./browser/utils/WithStyles/index.js");
/* harmony import */ var _paymentOTP_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paymentOTP.base.css */ "./browser/components/payment/mobile/PaymentOTP/paymentOTP.base.css");



var PaymentOTP = function (props) { return (0,commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_1__.default)(_paymentOTP_base_css__WEBPACK_IMPORTED_MODULE_2__.default)(_common_PaymentOTPContainer__WEBPACK_IMPORTED_MODULE_0__.default, props); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentOTP);


/***/ }),

/***/ "./browser/components/payment/mobile/PaymentRetryUI.js":
/*!*************************************************************!*\
  !*** ./browser/components/payment/mobile/PaymentRetryUI.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Accordian__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Accordian */ "./browser/components/common/Accordian/index.js");
/* harmony import */ var commonComp_OffersV2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/OffersV2 */ "./browser/components/common/OffersV2/index.js");
/* harmony import */ var commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/PriceBlock */ "./browser/components/common/PriceBlock/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/StickyButton */ "./browser/components/common/StickyButton/index.js");
/* harmony import */ var commonComp_ErrorPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/ErrorPage */ "./browser/components/common/ErrorPage/index.js");
/* harmony import */ var commonComp_BankOffers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonComp/BankOffers */ "./browser/components/common/BankOffers/index.js");
/* harmony import */ var _common_TwoFactorAuthentication__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/TwoFactorAuthentication */ "./browser/components/payment/common/TwoFactorAuthentication/index.js");
/* harmony import */ var _common_PaymentOptions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/PaymentOptions */ "./browser/components/payment/common/PaymentOptions/index.js");
/* harmony import */ var _common_RetryTimer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/RetryTimer */ "./browser/components/payment/common/RetryTimer/index.js");
/* harmony import */ var _common_RetrySessionExpiryModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/RetrySessionExpiryModal */ "./browser/components/payment/common/RetrySessionExpiryModal/index.js");
/* harmony import */ var _common_RetryBackConfirmationModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/RetryBackConfirmationModal */ "./browser/components/payment/common/RetryBackConfirmationModal/index.js");
/* harmony import */ var _common_PaymentError__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/PaymentError */ "./browser/components/payment/common/PaymentError/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! commonBrowserUtils/WithStyles */ "./browser/utils/WithStyles/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! commonBrowserUtils/priceBreakupFields */ "./browser/utils/priceBreakupFields.js");
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! commonBrowserUtils/DiscountUtil */ "./browser/utils/DiscountUtil/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./paymentMobile.base.css */ "./browser/components/payment/mobile/paymentMobile.base.css");
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


// Common Components






















// Style Imports.

var PaymentRetryUI = function (props) {
    var stickyButton = props.stickyButton, restProps = __rest(props, ["stickyButton"]);
    var error = restProps.error, paymentOptions = restProps.paymentOptions, errorOptionNode = restProps.errorOptionNode, referrer = restProps.referrer, loading = restProps.loading, handlePaymentAction = restProps.handlePaymentAction, _a = restProps.twoFA, twoFA = _a === void 0 ? {} : _a, disableTwoFA = restProps.disableTwoFA, handleTwoFASubmit = restProps.handleTwoFASubmit, spinner = restProps.spinner, bankDiscount = restProps.bankDiscount, updateDynamicStyles = restProps.updateDynamicStyles, analytics = restProps.analytics, backConfirmationModalShown = restProps.backConfirmationModalShown, retryGCapplied = restProps.retryGCapplied, retryTimerDisabled = restProps.retryTimerDisabled, _b = restProps.errorAttribute, errorAttribute = _b === void 0 ? {} : _b, creditsBalance = restProps.creditsBalance, setPaymentFailureAttributes = restProps.setPaymentFailureAttributes, retrySessionEnabled = restProps.retrySessionEnabled, disableRetrySession = restProps.disableRetrySession, enableRetryTimer = restProps.enableRetryTimer, disableRetryTimer = restProps.disableRetryTimer, stayHere = restProps.stayHere, tryLater = restProps.tryLater, setRef = restProps.setRef, updateStickyButton = restProps.updateStickyButton, switchTab = restProps.switchTab, closeTwoFA = restProps.closeTwoFA, triggerWebengageEvent = restProps.triggerWebengageEvent, offersConfig = restProps.offersConfig, onClickHandler = restProps.onClickHandler, showSaveCardConsent = restProps.showSaveCardConsent;
    if (paymentOptions) {
        var paymentErrorCode = errorAttribute.paymentErrorCode, paymentErrorCodeOverride = errorAttribute.paymentErrorCodeOverride, cartContext = errorAttribute.cartContext, updateCounter = errorAttribute.updateCounter;
        var _c = paymentOptions.price, price = _c === void 0 ? {} : _c;
        var retryGCappliedValue = retryGCapplied
            ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_19__.getRetryGCappliedValue)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(creditsBalance, 'gcBalance.totalBalance'), price.total)
            : 0;
        var creditsAdjustedOutstandingAmount = retryGCapplied
            ? price.total - retryGCappliedValue
            : price.total;
        var formattedFinalOutstanding = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_18__.currencyValue)(creditsAdjustedOutstandingAmount);
        var priceWithGCAndBankDiscount = __assign(__assign({}, price), { instruments: {
                data: (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_19__.consolidatePriceInstruments)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(price, 'instruments.data', []), {
                    giftcard: retryGCappliedValue,
                    bank: bankDiscount
                })
            } });
        var total = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_18__.roundNumber)((0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_21__.getTotal)(commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_22__.default.getPrice(priceWithGCAndBankDiscount), (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_20__.getPaymentFields)()), 0);
        var PaymentModes = (0,commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_16__.default)(_paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default)(_common_PaymentOptions__WEBPACK_IMPORTED_MODULE_10__.default, __assign({ mode: 'mobile', LayoutClass: commonComp_Accordian__WEBPACK_IMPORTED_MODULE_2__.default, bankDiscount: bankDiscount, defaultSelect: false, setRef: setRef, updateStickyButton: updateStickyButton, switchTab: switchTab, setPaymentFailureAttributes: setPaymentFailureAttributes, triggerWebengageEvent: triggerWebengageEvent, retryGCappliedValue: retryGCappliedValue, totalPayable: total, outstandingAmount: formattedFinalOutstanding }, restProps));
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.mobileContainer },
                referrer !== commonUtils_constants__WEBPACK_IMPORTED_MODULE_23__.orderStates.PENDING && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_RetryTimer__WEBPACK_IMPORTED_MODULE_11__.default, { mode: "mobile", sessionEnabled: retrySessionEnabled, stopTimer: disableRetrySession, disabled: retryTimerDisabled })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.mobileLayout) },
                    paymentErrorCode && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.paymentErrorBlock },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: errorOptionNode },
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_PaymentError__WEBPACK_IMPORTED_MODULE_14__.default, __assign({ id: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_17__.default.PAYMENT_ERROR_OPTIONS_ID, errorAttributes: {
                                    code: paymentErrorCode,
                                    codeDisplayOverride: paymentErrorCodeOverride,
                                    cartContext: cartContext,
                                    updateCounter: updateCounter
                                }, analytics: analytics, mode: "mobile", showPaymentFailureHalfCard: false }, restProps))))),
                    offersConfig.enabled ? ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_15__.isFeatureEnabled)('VISUAL_OFFER') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_BankOffers__WEBPACK_IMPORTED_MODULE_8__.default, { messages: offersConfig.messages, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_23__.checkoutPage.PAYMENT, total: total, mode: "mobile", titleInCaptital: true, bankOfferTitleStyle: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.bankOfferTitle, bankOfferPillContainerStyle: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.bankOfferPillContainer })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_OffersV2__WEBPACK_IMPORTED_MODULE_3__.default, { title: offersConfig.heading, messages: offersConfig.messages, defaultMessageCount: 1, enabled: offersConfig.messages.length > 0 }))) : null,
                    PaymentModes,
                    twoFA.display ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_TwoFactorAuthentication__WEBPACK_IMPORTED_MODULE_9__.default, { showSaveCardConsent: showSaveCardConsent, email: twoFA.enableEmailOtp ? (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_18__.getProfileEmail)() : '', numbers: twoFA.mobileNumbers, paymentModes: twoFA.paymentModes, payMode: "retry", close: closeTwoFA, handlePaymentAction: handlePaymentAction, submit: handleTwoFASubmit, errorCallback: disableTwoFA, enableRetryTimer: enableRetryTimer, disableRetryTimer: disableRetryTimer, mode: "mobile" })) : null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_24__.default.priceBreakUp },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_4__.default, { payMode: "retry", price: priceWithGCAndBankDiscount, getFields: commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_20__.getPaymentFields, total: total })),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_6__.default, { total: total, text: stickyButton.text, clickHandler: stickyButton.onClick || onClickHandler, enabled: stickyButton.enabled, updateDynamicStyles: updateDynamicStyles }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_RetrySessionExpiryModal__WEBPACK_IMPORTED_MODULE_12__.default, { show: !retrySessionEnabled, mode: 'mobile' }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_RetryBackConfirmationModal__WEBPACK_IMPORTED_MODULE_13__.default, { mode: "mobile", show: backConfirmationModalShown, stayHere: stayHere, tryLater: tryLater }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__.default, { show: loading, backdrop: true })))));
    }
    else if (error) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ErrorPage__WEBPACK_IMPORTED_MODULE_7__.default, { message: 'Something went wrong. Please reload', reload: true }));
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__.default, { show: loading, spinner: spinner, backdrop: true });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentRetryUI);


/***/ }),

/***/ "./browser/components/payment/mobile/PaymentUI.js":
/*!********************************************************!*\
  !*** ./browser/components/payment/mobile/PaymentUI.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBannerUrl": () => (/* binding */ getBannerUrl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonComp_Accordian__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Accordian */ "./browser/components/common/Accordian/index.js");
/* harmony import */ var commonComp_OffersV2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/OffersV2 */ "./browser/components/common/OffersV2/index.js");
/* harmony import */ var commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/PriceBlock */ "./browser/components/common/PriceBlock/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/StickyButton */ "./browser/components/common/StickyButton/index.js");
/* harmony import */ var commonComp_SaleTimer_Mobile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonComp/SaleTimer/Mobile */ "./browser/components/common/SaleTimer/Mobile/index.js");
/* harmony import */ var commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/CheckoutSteps */ "./browser/components/common/CheckoutSteps/index.js");
/* harmony import */ var commonComp_MyntraValuesStrip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/MyntraValuesStrip */ "./browser/components/common/MyntraValuesStrip/index.js");
/* harmony import */ var commonComp_SavingsFomo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonComp/SavingsFomo */ "./browser/components/common/SavingsFomo/index.js");
/* harmony import */ var commonComp_AddressStripV2__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonComp/AddressStripV2 */ "./browser/components/common/AddressStripV2/index.js");
/* harmony import */ var commonComp_ShimmerPlaceholder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonComp/ShimmerPlaceholder */ "./browser/components/common/ShimmerPlaceholder/index.js");
/* harmony import */ var _common_TwoFactorAuthentication__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/TwoFactorAuthentication */ "./browser/components/payment/common/TwoFactorAuthentication/index.js");
/* harmony import */ var _common_PaymentOptions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/PaymentOptions */ "./browser/components/payment/common/PaymentOptions/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! commonBrowserUtils/WithStyles */ "./browser/utils/WithStyles/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! commonBrowserUtils/priceBreakupFields */ "./browser/utils/priceBreakupFields.js");
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
/* harmony import */ var commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! commonBrowserUtils/DiscountUtil */ "./browser/utils/DiscountUtil/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./paymentMobile.base.css */ "./browser/components/payment/mobile/paymentMobile.base.css");
/* harmony import */ var _common_OrderReview__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../common/OrderReview */ "./browser/components/payment/common/OrderReview/index.js");
/* harmony import */ var commonBrowserUtils_DataStore__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! commonBrowserUtils/DataStore */ "./browser/utils/DataStore/index.js");
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



// Common Components



























// Style Imports.



var InsiderRewards = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__.default)({
    loader: function () {
        return Promise.all(/*! import() | insiderRewards */[__webpack_require__.e("styles-browser_components_common_InsiderRewards_Components_components_base_css-browser_compon-5ac1fb"), __webpack_require__.e("vendors-node_modules_myntra_m-comp_react_SVGIcon_InsiderLogoNew_jsx-node_modules_myntra_m-com-6cfa82"), __webpack_require__.e("insiderRewards")]).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/InsiderRewards */ "./browser/components/common/InsiderRewards/index.js"));
    }
});
var ErrorPage = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__.default)({
    loader: function () {
        return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/ErrorPage */ "./browser/components/common/ErrorPage/index.js"));
    }
});
var Banner = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | banner */ "banner").then(__webpack_require__.bind(__webpack_require__, /*! commonComp/Banner */ "./browser/components/common/Banner/index.js"));
    },
    loaderProperties: { backdrop: false }
});
var BankOffers = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__.default)({
    loader: function () {
        return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/BankOffers */ "./browser/components/common/BankOffers/index.js"));
    },
    loaderProperties: { backdrop: false }
});
var PaymentError = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_24__.default)({
    loader: function () {
        return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../common/PaymentError */ "./browser/components/payment/common/PaymentError/index.js"));
    },
    loaderProperties: { backdrop: false }
});
var GCV2_PARAMS = {
    customStates: [
        commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_9__.CHECKOUT_STATES.COMPLETED,
        commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_9__.CHECKOUT_STATES.COMPLETED,
        commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_9__.CHECKOUT_STATES.ACTIVE
    ],
    customLabels: ['Design', 'Details', 'Payment'],
    showV2: true
};
var fireEvent = function (cartData, isPaymentTrustMsgBannerEnabled, userDetails) {
    if (userDetails === void 0) { userDetails = {}; }
    var loadBanner = isPaymentTrustMsgBannerEnabled && !userDetails.isFirstTimeCustomer;
    var type = loadBanner ? 'banner' : '';
    var eventName = loadBanner
        ? 'TRUST_BANNER_LOAD'
        : 'TRUST_BANNER_REPEAT_FLAG_LOAD';
    // Fire default event for users who land on payment page and fire event on load of payment banner as well
    triggerEvent(eventName, {
        custom: {
            custom: {
                v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getUidx)(),
                v2: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.subTotal', 0)
            },
            widget: {
                name: loadBanner
                    ? 'payment_trust_banner_repeat_users'
                    : 'payment_trust_banner_repeat_flag',
                type: type
            }
        }
    });
};
// 3 cases to show the banner: ab, New user, Enabled in config and URL is present
var getBannerUrl = function (newUserBannerConfig, userDetails, isV2Enabled) {
    return newUserBannerConfig.enabled &&
        userDetails.isFirstTimeCustomer &&
        ((isV2Enabled && newUserBannerConfig.urlV2) || newUserBannerConfig.url);
};
var fireSavingsCalloutEvent = function (cartData) {
    triggerEvent('PAYMENT_SAVINGS_CALLOUT_FLAG', {
        custom: {
            custom: {
                v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getUidx)(),
                v2: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total', 0),
                v3: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.totalSavings', 0)
            },
            widget: {
                name: 'payment_savings_callout_flag',
                type: 'other'
            }
        }
    });
};
var PaymentUI = function (props) {
    var _a;
    var stickyButton = props.stickyButton, restProps = __rest(props, ["stickyButton"]);
    var error = restProps.error, cartData = restProps.cartData, paymentOptions = restProps.paymentOptions, loading = restProps.loading, errorOptionNode = restProps.errorOptionNode, handlePaymentAction = restProps.handlePaymentAction, _b = restProps.twoFA, twoFA = _b === void 0 ? {} : _b, disableTwoFA = restProps.disableTwoFA, handleTwoFASubmit = restProps.handleTwoFASubmit, spinner = restProps.spinner, bankDiscount = restProps.bankDiscount, updateDynamicStyles = restProps.updateDynamicStyles, dynamicStyles = restProps.dynamicStyles, isExchangeCart = restProps.isExchangeCart, analytics = restProps.analytics, _c = restProps.errorAttribute, errorAttribute = _c === void 0 ? {} : _c, setPaymentFailureAttributes = restProps.setPaymentFailureAttributes, setRef = restProps.setRef, updateStickyButton = restProps.updateStickyButton, switchTab = restProps.switchTab, closeTwoFA = restProps.closeTwoFA, triggerWebengageEvent = restProps.triggerWebengageEvent, paymentFailureHalfCardContext = restProps.paymentFailureHalfCardContext, paymentFailureHalfCardConfig = restProps.paymentFailureHalfCardConfig, hasExpressCheckoutAB = restProps.hasExpressCheckoutAB, isNewUserPaymentBannerV2Enabled = restProps.isNewUserPaymentBannerV2Enabled, offersConfig = restProps.offersConfig, kvpairs = restProps.kvpairs, handleAddressAction = restProps.handleAddressAction, onClickHandler = restProps.onClickHandler, showSaveCardConsent = restProps.showSaveCardConsent, paymentConfig = restProps.paymentConfig, myntraInstrumentsData = restProps.myntraInstrumentsData;
    var addressData = restProps.addressData;
    var isAocV2Variant3Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isVariantEnabled)('AOC_V2_VARIANT3') && !isExchangeCart;
    var isOrderReviewEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('ORDER_REVIEW');
    var paymentErrorCode = errorAttribute.paymentErrorCode, paymentErrorCodeOverride = errorAttribute.paymentErrorCodeOverride, cartContext = errorAttribute.cartContext, updateCounter = errorAttribute.updateCounter;
    var isPaymentOptionsLoading = !paymentOptions;
    if (cartData && !error) {
        var flags = cartData.flags, price = cartData.price, shippingData = cartData.shippingData, coverFeeOpted = cartData.coverFeeOpted, userDetails = cartData.userDetails, coverFeeApplicableCharge = cartData.coverFeeApplicableCharge, products = cartData.products, orderAddressId = cartData.orderAddressId, unifiedAddressId = cartData.unifiedAddressId;
        var isPaymentCalloutEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('PAYMENT_SAVINGS_CALLOUT');
        fireSavingsCalloutEvent(cartData);
        var address_1 = (0,commonBrowserUtils_DataStore__WEBPACK_IMPORTED_MODULE_31__.getAddressData)();
        addressData = addressData
            ? addressData
            : (_a = address_1 === null || address_1 === void 0 ? void 0 : address_1.addressData) === null || _a === void 0 ? void 0 : _a.filter(function (add) { return add.id === address_1.selectedAddressId; })[0];
        var paymentConfig_1 = restProps.paymentConfig;
        var instrumentData = (paymentConfig_1 || {}).instrumentData;
        var isPaymentTrustMsgBannerEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('PAYMENT_TRUST_MSG_BANNER');
        var selectedProducts = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getSelectedProducts)(products);
        var count = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getSelectedProductsCount)(selectedProducts);
        var outstandingAmount = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.currencyValue)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total', 0));
        var paymentTriedCount = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_27__.getPaymentTriedCount)();
        var paymentErrorCodeConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_16__.getKVPairValue)('PAYMENT_ERROR');
        var showPaymentFailureHalfCard = false;
        var codEligible = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_20__.default.COD, ".code")) ===
            commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_20__.default.INSTRUMENT_ELIGIBLE_CODE;
        if (paymentFailureHalfCardContext === 'generic_failure' &&
            paymentTriedCount >= paymentFailureHalfCardConfig.threshold) {
            showPaymentFailureHalfCard = true;
        }
        else if (paymentFailureHalfCardContext === 'dope_consent' &&
            paymentErrorCode &&
            codEligible &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentErrorCodeConfig[paymentErrorCode], 'dopeUserConsentEnabled') !== false
        // check if need to put a condition for online failure only
        ) {
            showPaymentFailureHalfCard = true;
        }
        var priceWithBankDiscount = __assign(__assign({}, price), { instruments: {
                data: __spreadArray(__spreadArray([], price.instruments.data, true), [{ name: 'bank', value: bankDiscount }], false)
            } });
        var loyaltypoints = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(price, 'instruments.data', []).find(function (obj) { return obj.name === 'loyaltypoints'; }) || {}).value;
        var total = (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_23__.getTotal)(commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_25__.default.getPrice(priceWithBankDiscount), (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_22__.getPaymentFields)());
        var totalMRP = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.mrp');
        var PaymentModes = paymentOptions
            ? (0,commonBrowserUtils_WithStyles__WEBPACK_IMPORTED_MODULE_19__.default)(_paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default)(_common_PaymentOptions__WEBPACK_IMPORTED_MODULE_15__.default, __assign({ mode: 'mobile', LayoutClass: commonComp_Accordian__WEBPACK_IMPORTED_MODULE_3__.default, bankDiscount: bankDiscount, defaultSelect: false, showPaymentFailureHalfCard: showPaymentFailureHalfCard, setRef: setRef, updateStickyButton: updateStickyButton, switchTab: switchTab, setPaymentFailureAttributes: setPaymentFailureAttributes, triggerWebengageEvent: triggerWebengageEvent, totalPayable: total, outstandingAmount: outstandingAmount, orderAddressId: orderAddressId }, restProps))
            : null;
        var newUserBannerConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_16__.getKVPairValue)('NEW_USER_DEFAULT_PAYMENT_BANNER');
        var checkoutStepsParams = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('GIFTCARD_V2')
            ? GCV2_PARAMS
            : {};
        var showBanner = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(newUserBannerConfig, 'enabled') &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(userDetails, 'isFirstTimeCustomer');
        var trustMsgBannerUrl = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_17__.getGrowthHackConfigValue)('PAYMENT_TRUST_BANNER_URL');
        fireEvent(cartData, isPaymentTrustMsgBannerEnabled, userDetails);
        var isExpressCheckoutEnabled = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () { return hasExpressCheckoutAB && !(0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_28__.isPriorityCheckoutEnabled)(cartData); }, [cartData]);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.mobileContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_9__.default, __assign({ currentPage: 'Payment', hideSteps: isExpressCheckoutEnabled || isExchangeCart || isAocV2Variant3Enabled }, checkoutStepsParams)),
            isPaymentTrustMsgBannerEnabled && !userDetails.isFirstTimeCustomer ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.bottomMargin },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Banner, { bannerURL: trustMsgBannerUrl }))) : null,
            showBanner ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.bottomMargin },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Banner, { bannerURL: getBannerUrl(newUserBannerConfig, userDetails, isNewUserPaymentBannerV2Enabled) }))) : null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SaleTimer_Mobile__WEBPACK_IMPORTED_MODULE_8__.default, { saleBannerData: kvpairs.saleBanner, priceRevealData: kvpairs.priceReveal, enabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('SALE_TIMER', { type: 'payment' }) }),
            (isOrderReviewEnabled || isAocV2Variant3Enabled) &&
                addressData &&
                lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'context', '') == 'DEFAULT' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_AddressStripV2__WEBPACK_IMPORTED_MODULE_12__.default, { mode: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.pageMode.MOBILE, page: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.checkoutPage.PAYMENT, addressInfo: addressData, pincode: addressData.pincode, history: history, topPadding: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.isPWA)() ? commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.navigationHeader.HEIGHT : 0, handleAddressAction: handleAddressAction, isOrderReview: isOrderReviewEnabled })),
            offersConfig.enabled ? ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('VISUAL_OFFER') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(BankOffers, { messages: offersConfig.messages, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.checkoutPage.PAYMENT, total: total, mode: "mobile", titleInCaptital: true, bankOfferTitleStyle: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.bankOfferTitle, bankOfferPillContainerStyle: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.bankOfferPillContainer })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_OffersV2__WEBPACK_IMPORTED_MODULE_4__.default, { title: offersConfig.heading, messages: offersConfig.messages, defaultMessageCount: 1, enabled: offersConfig.messages.length > 0 }))) : null,
            isOrderReviewEnabled && lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'context', '') == 'DEFAULT' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_OrderReview__WEBPACK_IMPORTED_MODULE_30__.default, { cartData: cartData, mode: "mobile" })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.mobileLayout) },
                !isPaymentOptionsLoading &&
                    paymentErrorCode &&
                    !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(myntraInstrumentsData) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: !showPaymentFailureHalfCard && _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.paymentErrorBlock },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: errorOptionNode },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(PaymentError, __assign({ id: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_20__.default.PAYMENT_ERROR_OPTIONS_ID, errorAttributes: {
                                code: paymentErrorCode,
                                codeDisplayOverride: paymentErrorCodeOverride,
                                cartContext: cartContext,
                                updateCounter: updateCounter
                            }, analytics: analytics, mode: "mobile", showPaymentFailureHalfCard: showPaymentFailureHalfCard, halfCardConfig: paymentFailureHalfCardConfig, instrumentDataMap: instrumentData || [], outstandingAmount: outstandingAmount, switchTab: switchTab, totalPayable: total }, restProps))))),
                isPaymentOptionsLoading ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ShimmerPlaceholder__WEBPACK_IMPORTED_MODULE_13__.default, { type: "payment", mode: "mobile" })) : null,
                PaymentModes,
                twoFA.display ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_TwoFactorAuthentication__WEBPACK_IMPORTED_MODULE_14__.default, { showSaveCardConsent: showSaveCardConsent, email: twoFA.enableEmailOtp ? (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getProfileEmail)() : '', numbers: twoFA.mobileNumbers, paymentModes: twoFA.paymentModes, orderAddressId: orderAddressId, unifiedAddressId: unifiedAddressId, close: closeTwoFA, handlePaymentAction: handlePaymentAction, submit: handleTwoFASubmit, errorCallback: disableTwoFA, mode: "mobile" })) : null,
                !isPaymentOptionsLoading && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentMobile_base_css__WEBPACK_IMPORTED_MODULE_29__.default.priceBreakUp },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_5__.default, { cartData: cartData, price: priceWithBankDiscount, count: count, flags: flags, getFields: commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_22__.getPaymentFields, shippingData: shippingData, coverFeeOpted: coverFeeOpted, coverFeeApplicableCharge: coverFeeApplicableCharge, dynamicStyles: dynamicStyles, tryAndBuyOpted: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_21__.getTryAndBuyOpted)(products), userDetails: userDetails, isPaymentCalloutEnabled: isPaymentCalloutEnabled }))),
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_18__.isFeatureEnabled)('CHECKOUT_INSIDER') && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InsiderRewards, { cartData: cartData, selectedProducts: selectedProducts })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_MyntraValuesStrip__WEBPACK_IMPORTED_MODULE_10__.default, { currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.checkoutPage.PAYMENT }),
                !isPaymentOptionsLoading && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_7__.default, { total: total, text: stickyButton.text, clickHandler: stickyButton.onClick || onClickHandler, points: loyaltypoints, enabled: stickyButton.enabled, updateDynamicStyles: updateDynamicStyles, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.checkoutPage.PAYMENT, totalMRP: totalMRP, cartData: cartData, isPaymentCalloutEnabled: isPaymentCalloutEnabled }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_6__.default, { show: loading && !isPaymentOptionsLoading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SavingsFomo__WEBPACK_IMPORTED_MODULE_11__.default, { price: price, products: selectedProducts, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_26__.checkoutPage.PAYMENT })));
    }
    else if (error) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ErrorPage, { message: 'Something went wrong. Please reload', reload: true }));
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_6__.default, { show: loading, spinner: spinner, backdrop: true });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0__.default.memo(PaymentUI));


/***/ }),

/***/ "./browser/components/payment/mobile/index.js":
/*!****************************************************!*\
  !*** ./browser/components/payment/mobile/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PaymentRetryUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PaymentRetryUI */ "./browser/components/payment/mobile/PaymentRetryUI.js");
/* harmony import */ var _PaymentUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PaymentUI */ "./browser/components/payment/mobile/PaymentUI.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_9__);
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











var boundFuncs = [
    'onClickHandler',
    'setRef',
    'updateStickyButton',
    'switchTab',
    'onClickEligibility',
    'closeTwoFA',
    'triggerWebengageEvent',
    'addMyntraInstrumentsData'
];
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment(props) {
        var _this = _super.call(this, props) || this;
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.state = {
            stickyButton: {
                text: 'PAY NOW',
                enabled: true,
                onClick: null
            },
            myntraInstrumentsData: {}
        };
        _this.errorOptionNode = react__WEBPACK_IMPORTED_MODULE_0__.default.createRef();
        _this.paymentFailureHalfCardContext = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('DOPE_USER_CONSENT')
            ? 'dope_consent'
            : (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('PAYMENT_FAILURE_HALFCARD')
                ? 'generic_failure'
                : '';
        if (_this.paymentFailureHalfCardContext === 'generic_failure') {
            _this.paymentFailureHalfCardConfig = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_9__.getGrowthHackConfigValue)('PAYMENT_FAILURE_HALFCARD_CONFIG');
        }
        else if (_this.paymentFailureHalfCardContext === 'dope_consent') {
            _this.paymentFailureHalfCardConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('DOPE_CONSENT_HALFCARD_CONFIG');
        }
        _this.hasExpressCheckoutAB = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('EXPRESS_CHECKOUT');
        _this.hasAocV2Variant3 = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isVariantEnabled)('AOC_V2_VARIANT3');
        _this.kvpairs = {
            saleBanner: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('SALE_BANNER_DATA'),
            priceReveal: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('PRICE_REVEAL_DATA'),
            configMessage: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('PAYMENT_OFFER_MESSAGES'),
            inlineOffer: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('INLINE_OFFER')
                ? (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('INLINE_OFFERS')
                : {}
        };
        _this.isNewUserPaymentBannerV2Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('NEW_USER_PAYMENT_BANNER_V2');
        _this.offersConfig = _this.kvpairs.configMessage || {
            messages: []
        };
        _this.offersConfig.messages.forEach(function (message) {
            message.icb &&
                (message.link = {
                    text: message.btnText,
                    onClick: _this.onClickEligibility
                });
        });
        _this.inlineOffer = _this.kvpairs.inlineOffer;
        return _this;
    }
    Payment.prototype.addMyntraInstrumentsData = function (data) {
        this.setState({
            myntraInstrumentsData: __assign(__assign({}, this.state.myntraInstrumentsData), data)
        });
    };
    Payment.prototype.componentDidMount = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.setDocTitleInMobile)('PAYMENT', {
            hideStepNumber: this.props.isExchangeCart ||
                this.hasAocV2Variant3 ||
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
        });
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('GIFTCARD_V2')) {
            triggerEvent('GIFTCARD_CONTEXT_PAYMENT');
        }
    };
    Payment.prototype.componentDidUpdate = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.setDocTitleInMobile)('PAYMENT', {
            hideStepNumber: this.props.isExchangeCart ||
                this.hasAocV2Variant3 ||
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
        });
    };
    Payment.prototype.setRef = function (node) {
        this.accordian = node;
    };
    Payment.prototype.switchTab = function (tabId, options) {
        if (tabId === void 0) { tabId = ''; }
        if (options === void 0) { options = {}; }
        this.accordian &&
            this.accordian.switchTab(null, tabId, __assign({ scrollIntoView: true }, options));
    };
    Payment.prototype.closeTwoFA = function () {
        this.props.toggleTwoFA();
        this.accordian && this.accordian.selectDefaultTab();
    };
    Payment.prototype.updateStickyButton = function (newState) {
        this.setState(function (prevState) { return ({
            stickyButton: __assign(__assign({}, prevState.stickyButton), newState)
        }); });
    };
    Payment.prototype.onClickEligibility = function () {
        this.switchTab(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.CARD_TYPE);
    };
    Payment.prototype.getPaymentAttributes = function () {
        var paymentModeSelected = '';
        var actionButtonId = '';
        if (this.accordian) {
            paymentModeSelected = this.accordian.getSelected();
        }
        else if (this.state.myntraInstrumentsData) {
            paymentModeSelected = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.FREE_PURCHASE;
        }
        if (paymentModeSelected) {
            actionButtonId = paymentModeSelected;
        }
        else if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('RECOMMENDED_OPTIONS') &&
            this.props.payMode !== 'retry') {
            actionButtonId = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.RECOMMENDED_INSTRUMENT;
        }
        else {
            actionButtonId = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT;
        }
        var paymentModeAction = document.getElementById("action-".concat(actionButtonId));
        return { paymentModeSelected: paymentModeSelected, paymentModeAction: paymentModeAction };
    };
    Payment.prototype.triggerWebengageEvent = function (data) {
        var _a = this.getPaymentAttributes(), paymentModeSelected = _a.paymentModeSelected, paymentModeAction = _a.paymentModeAction;
        this.props.analytics('triggerWebengage')('PAYMENT_VIEWED', __assign(__assign({}, data), { state_of_pay_now_cta: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentModeAction, 'attributes.disabled')
                ? 'inactive'
                : 'active', paymentMode: paymentModeSelected || 'savedcard' }));
    };
    Payment.prototype.onClickHandler = function () {
        if (this.props.payMode === 'retry' && !this.props.retrySessionEnabled) {
            return;
        }
        var paymentModeAction = this.getPaymentAttributes().paymentModeAction;
        if (paymentModeAction) {
            paymentModeAction.click();
        }
        else {
            SHELL.alert('info', {
                message: 'Select a valid payment option to place order.',
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
        }
    };
    Payment.prototype.render = function () {
        var _a = this, stickyButton = _a.state.stickyButton, errorOptionNode = _a.errorOptionNode, paymentFailureHalfCardContext = _a.paymentFailureHalfCardContext, paymentFailureHalfCardConfig = _a.paymentFailureHalfCardConfig, hasExpressCheckoutAB = _a.hasExpressCheckoutAB, isNewUserPaymentBannerV2Enabled = _a.isNewUserPaymentBannerV2Enabled, kvpairs = _a.kvpairs, inlineOffer = _a.inlineOffer, offersConfig = _a.offersConfig, addMyntraInstrumentsData = _a.addMyntraInstrumentsData;
        if (this.props.payMode === 'retry') {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentRetryUI__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, this.props, this.state, { addMyntraInstrumentsData: addMyntraInstrumentsData, errorOptionNode: errorOptionNode, paymentFailureHalfCardContext: paymentFailureHalfCardContext, stickyButton: stickyButton, offersConfig: offersConfig, inlineOffer: inlineOffer }, lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, boundFuncs))));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentUI__WEBPACK_IMPORTED_MODULE_4__.default, __assign({}, this.props, this.state, { addMyntraInstrumentsData: addMyntraInstrumentsData, errorOptionNode: errorOptionNode, paymentFailureHalfCardContext: paymentFailureHalfCardContext, paymentFailureHalfCardConfig: paymentFailureHalfCardConfig, hasExpressCheckoutAB: hasExpressCheckoutAB, isNewUserPaymentBannerV2Enabled: isNewUserPaymentBannerV2Enabled, stickyButton: stickyButton, kvpairs: kvpairs, offersConfig: offersConfig, inlineOffer: inlineOffer }, lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, boundFuncs))));
        }
    };
    return Payment;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Payment.propTypes = {
    loading: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool),
    error: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Payment);


/***/ }),

/***/ "./browser/utils/WithStyles/index.js":
/*!*******************************************!*\
  !*** ./browser/utils/WithStyles/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (styles) { return function (Component, props) {
    if (props === void 0) { props = {}; }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Component, __assign({ styles: styles }, props)));
}; });


/***/ }),

/***/ "./browser/utils/maHelper.js":
/*!***********************************!*\
  !*** ./browser/utils/maHelper.js ***!
  \***********************************/
/***/ ((module) => {

var defautlMAPayloadForWeb = {
    maData: {
        entity_optional_attributes: {}
    },
    custom: {
        widget_items: {
            data_set: {
                data: []
            }
        }
    }
};
module.exports = defautlMAPayloadForWeb;


/***/ })

}]);
//# sourceMappingURL=paymentsMobile.js.map