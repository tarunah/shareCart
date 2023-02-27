(self["webpackChunk"] = self["webpackChunk"] || []).push([["twoFaScreen"],{

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

/***/ "./browser/components/payment/common/TwoFactorAuthentication/TwoFactorAuthComponents.js":
/*!**********************************************************************************************!*\
  !*** ./browser/components/payment/common/TwoFactorAuthentication/TwoFactorAuthComponents.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OTPScanner": () => (/* binding */ OTPScanner),
/* harmony export */   "MobileOTPScreen": () => (/* binding */ MobileOTPScreen),
/* harmony export */   "EmailOTPScreen": () => (/* binding */ EmailOTPScreen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Timer */ "./browser/components/payment/common/Timer/index.js");
/* harmony import */ var commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/JSBridgeHelper */ "./browser/utils/JSBridgeHelper.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./twoFactorAuthComponents.base.css */ "./browser/components/payment/common/TwoFactorAuthentication/twoFactorAuthComponents.base.css");
/* harmony import */ var iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/RadioActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioActive.jsx");
/* harmony import */ var iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! iconComp/RadioInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioInactive.jsx");
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










var MobileOTPScreen = function (_a) {
    var email = _a.email, numbers = _a.numbers, selectedNumber = _a.selectedNumber, selectNumber = _a.selectNumber, setScreen = _a.setScreen;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpVerifHeader }, "OTP Verification required"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpVerifDesc },
            "Select a mobile number to send OTP. You will also receive OTP on your registered email id: ",
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.bold }, email)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.mobileNumbers }, numbers.map(function (number) {
            var SVGIcon = number === selectedNumber ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_8__.default, { className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.radioButton, " ").concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.selectedButton) })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_9__.default, { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.radioButton }));
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "otp-".concat(number), "data-testid": "number", className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.number, " ").concat(number === selectedNumber ? _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.selectedNumber : ''), onClick: selectNumber, key: number },
                SVGIcon,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.radioText }, "+91"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.radioText }, number)));
        })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_2__.default, { className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.sendButton, " ").concat(!selectedNumber ? _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.disabled : ''), onClick: setScreen }, "SEND OTP")));
};
var EmailOTPScreen = function (_a) {
    var email = _a.email, setScreen = _a.setScreen;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpVerifHeader }, "OTP Verification required"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpVerifDesc }, "You will receive the OTP on your registered email id: ".concat(email)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_2__.default, { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.sendButton, onClick: setScreen }, "SEND OTP")));
};
var OTPScanner = /** @class */ (function (_super) {
    __extends(OTPScanner, _super);
    function OTPScanner(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            otpValue: '',
            error: null,
            timer: false,
            resendDisabled: true
        };
        [
            'setOtpValue',
            'sendOtp',
            'resendOtp',
            'stopTimer',
            'submitWithOTP',
            'setInputRef',
            'onChangeButton'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.otpAutofill = commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_5__.AndroidBridgeHelper.autofillEnabled();
        return _this;
    }
    OTPScanner.prototype.componentDidMount = function () {
        this.otpField = document.getElementById('otpField');
        this.otpField &&
            this.otpField.addEventListener('keypress', function (e) {
                var code = e.keyCode || e.charCode;
                var char = String.fromCharCode(code);
                if (!/^\d+$/.test(char) && code !== 8) {
                    // 8 is for backspace
                    e.preventDefault();
                }
            });
        commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_5__.AndroidBridgeHelper.startSmsReceiver("document.getElementById('otpField')");
        this.sendOtp();
    };
    OTPScanner.prototype.componentWillUnmount = function () {
        commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_5__.AndroidBridgeHelper.stopSmsReceiver();
    };
    OTPScanner.prototype.sendOtp = function (resend) {
        var _this = this;
        this.inputField && this.inputField.focus();
        resend ? triggerEvent('TWOFA_OTP_RESENT') : triggerEvent('TWOFA_OTP_SENT');
        //get addressId from stampedAddress
        var _a = this.props, selectedNumber = _a.selectedNumber, paymentModes = _a.paymentModes, orderAddressId = _a.orderAddressId, unifiedAddressId = _a.unifiedAddressId;
        this.setState({
            otpValue: ''
        }, function () {
            _this.props.handlePaymentAction('requestOTPGateway', {
                mobileNo: "".concat(selectedNumber),
                paymentMethods: paymentModes,
                addressId: orderAddressId,
                unifiedId: unifiedAddressId
            }, {}, function () {
                triggerEvent('TWOFA_OTP_SUCCESS');
                _this.setState({
                    timer: true,
                    resendDisabled: true,
                    error: ''
                });
            }, function () {
                triggerEvent('TWOFA_OTP_FAIL');
                _this.setState({
                    error: 'Failed to send OTP',
                    resendDisabled: false
                });
            });
        });
    };
    OTPScanner.prototype.resendOtp = function () {
        if (!this.state.resendDisabled) {
            this.sendOtp(true);
        }
    };
    OTPScanner.prototype.setOtpValue = function (e) {
        this.setState({
            otpValue: e.currentTarget.value
        });
    };
    OTPScanner.prototype.stopTimer = function () {
        this.setState({
            timer: false,
            resendDisabled: false
        });
    };
    OTPScanner.prototype.submitWithOTP = function () {
        var otpValue = this.state.otpValue || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'otpField.value') || '';
        if (otpValue.length !== 4) {
            this.setState({
                error: 'Please enter valid OTP'
            });
        }
        else {
            this.props.submit({
                otp: otpValue
            });
        }
    };
    OTPScanner.prototype.setInputRef = function (node) {
        this.inputField = node;
    };
    OTPScanner.prototype.onChangeButton = function (e) {
        this.props.setScreen(e);
        triggerEvent('TWOFA_CHANGE_NUMBER');
    };
    OTPScanner.prototype.render = function () {
        var _a = this, _b = _a.props, selectedNumber = _b.selectedNumber, email = _b.email, numbers = _b.numbers, _c = _a.state, otpValue = _c.otpValue, timer = _c.timer, error = _c.error, resendDisabled = _c.resendDisabled, setOtpValue = _a.setOtpValue, resendOtp = _a.resendOtp, stopTimer = _a.stopTimer, otpAutofill = _a.otpAutofill, submitWithOTP = _a.submitWithOTP, setInputRef = _a.setInputRef, onChangeButton = _a.onChangeButton;
        var timerStart = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('OTP_TIMER_START');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "otpScannerContainer", className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpScannerContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__.default, { name: "otp" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpScannerHeading }, "ENTER OTP"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpScannerDesc }, selectedNumber
                ? "OTP sent to mobile number +91-".concat(selectedNumber)
                : "OTP sent to registered email ".concat(email)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { id: "otpField", "data-testid": "otpField", className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpInput, " cod-input-numpad"), type: "tel", maxLength: "4", ref: setInputRef, onChange: setOtpValue, value: otpValue || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'otpField.value') || '' }),
            error ? react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.error }, error) : null,
            timer ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "twoFAtimerBlock", className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.timerBlock },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Resend OTP in "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Timer__WEBPACK_IMPORTED_MODULE_4__.default, { seconds: timerStart.seconds, minutes: timerStart.minutes, stopCallback: stopTimer }))) : numbers.length > 1 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpScannerButton, " changeNumber"), onClick: onChangeButton }, "CHANGE NUMBER")) : null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.otpScannerButton, " ").concat(resendDisabled ? _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.disabled : '', " resendOTP"), onClick: resendOtp }, "RESEND OTP"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_2__.default, { className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.sendButton, onClick: submitWithOTP }, "SUBMIT")));
    };
    return OTPScanner;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));



/***/ }),

/***/ "./browser/components/payment/common/TwoFactorAuthentication/components/TwoFAScreen.js":
/*!*********************************************************************************************!*\
  !*** ./browser/components/payment/common/TwoFactorAuthentication/components/TwoFAScreen.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../twoFactorAuthComponents.base.css */ "./browser/components/payment/common/TwoFactorAuthentication/twoFactorAuthComponents.base.css");
/* harmony import */ var _TwoFactorAuthComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TwoFactorAuthComponents */ "./browser/components/payment/common/TwoFactorAuthentication/TwoFactorAuthComponents.js");
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




var screenConfig = {
    mobileOtp: _TwoFactorAuthComponents__WEBPACK_IMPORTED_MODULE_3__.MobileOTPScreen,
    emailOtp: _TwoFactorAuthComponents__WEBPACK_IMPORTED_MODULE_3__.EmailOTPScreen,
    otpScanner: _TwoFactorAuthComponents__WEBPACK_IMPORTED_MODULE_3__.OTPScanner
};
var TwoFAScreen = function (_a) {
    var screen = _a.screen, close = _a.close, mode = _a.mode, restProps = __rest(_a, ["screen", "close", "mode"]);
    var Screen = screenConfig[screen];
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { id: 'twoFactorAuthModal', className: "".concat(_twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.modal, " ").concat(mode === 'mobile' ? _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.mobileModal : _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.desktopModal), show: !restProps.showSaveCardConsent, cancelCallback: close, halfCard: mode === 'mobile', enableBackButton: restProps.payMode !== 'retry', cancelIconConfig: { show: true, className: _twoFactorAuthComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.headerClose } },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Screen, __assign({}, restProps))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TwoFAScreen);


/***/ })

}]);
//# sourceMappingURL=twoFaScreen.js.map