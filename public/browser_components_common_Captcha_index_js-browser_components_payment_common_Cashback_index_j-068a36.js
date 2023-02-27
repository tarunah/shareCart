(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_common_Captcha_index_js-browser_components_payment_common_Cashback_index_j-068a36"],{

/***/ "./browser/components/common/Captcha/index.js":
/*!****************************************************!*\
  !*** ./browser/components/common/Captcha/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./captcha.base.css */ "./browser/components/common/Captcha/captcha.base.css");
/* harmony import */ var commonComp_InputV2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/InputV2 */ "./browser/components/common/InputV2/index.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var iconComp_Reload_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/Reload.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Reload.jsx");
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



// Style Imports.







var boundFuncs = [
    'onCaptchaInput',
    'onChangeImage',
    'verifyCaptchaError',
    'setRef',
    'generateCaptcha'
];
var WRONG_CODE_ERROR = 'Incorrect code entered. Please try again.';
var NO_CODE_ERROR = 'Please enter the code to place order.';
var INVALID_CAPTCHA_CODE = '1004';
var Captcha = /** @class */ (function (_super) {
    __extends(Captcha, _super);
    function Captcha(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            show: true,
            changeOption: { show: false, text: 'CHANGE IMAGE' },
            retryCount: 0,
            loading: true,
            captchaText: '',
            captchaLoaded: false,
            error: { text: '' },
            captchaImageSrc: '',
            captchaId: '',
            reloadCaptcha: false
        };
        _this.firstUpdate = false;
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    Captcha.prototype.componentDidMount = function () {
        this.firstUpdate = true;
        this.generateCaptcha();
    };
    Captcha.prototype.componentDidUpdate = function (prevProps) {
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'errorAttribute.paymentErrorCode', '') !== '' &&
            !this.state.reloadCaptcha &&
            !this.firstUpdate) {
            var invalidCaptchaText = this.props.errorAttribute.paymentErrorCode === INVALID_CAPTCHA_CODE
                ? WRONG_CODE_ERROR
                : '';
            this.setState({
                reloadCaptcha: true
            });
            this.verifyCaptchaError(invalidCaptchaText);
        }
    };
    Captcha.prototype.generateCaptcha = function () {
        var _this = this;
        commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__.default.generateCaptcha(function (response) {
            triggerEvent('CAPTCHA_LOAD');
            _this.setState({
                loading: false,
                changeOption: { show: true, text: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Reload_jsx__WEBPACK_IMPORTED_MODULE_8__.default, null) },
                captchaLoaded: true,
                captchaImageSrc: response.image,
                captchaId: response.id
            });
        }, function () {
            _this.setState(function (prevState) { return ({
                show: prevState.retryCount < 2,
                loading: false,
                changeOption: { show: true, text: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Reload_jsx__WEBPACK_IMPORTED_MODULE_8__.default, null) },
                retryCount: ++prevState.retryCount
            }); }, function () {
                _this.props.inputCallback &&
                    _this.props.inputCallback({ proceed: !_this.state.show });
            });
        });
    };
    Captcha.prototype.onCaptchaInput = function (event) {
        triggerEvent('CAPTCHA_ENTRY');
        var text = event.target.value.trim();
        this.setState({ captchaText: text, error: { text: '' } });
    };
    Captcha.prototype.onChangeImage = function () {
        var _this = this;
        triggerEvent('CAPTCHA_CHANGE');
        this.setState({
            loading: true,
            changeOption: __assign(__assign({}, this.state.changeOption), { show: false }),
            error: { text: '' },
            captchaText: '',
            captchaLoaded: false
        }, function () {
            _this.generateCaptcha();
        });
    };
    Captcha.prototype.verifyCaptchaError = function (errorMessage) {
        var _this = this;
        this.props.setLoader(false);
        triggerEvent('CAPTCHA_FAILURE', {
            gaLabel: this.state.captchaText,
            custom: {
                custom: {
                    v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getUidx)()
                },
                widget: {
                    name: 'cod_capcha',
                    type: 'card'
                },
                widget_items: {
                    name: 'capcha_failure_message'
                }
            }
        });
        triggerEvent('COD_FAILURE', {
            gaLabel: 'captcha-wrong'
        });
        this.setState({
            error: {
                text: errorMessage
            },
            loading: true,
            changeOption: __assign(__assign({}, this.state.changeOption), { show: false }),
            captchaText: '',
            captchaLoaded: false
        }, function () {
            _this.generateCaptcha();
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.scrollIntoView)(_this.containerRef, {
                behavior: 'smooth',
                block: 'center'
            });
        });
    };
    Captcha.prototype.submitWithCaptcha = function (done) {
        var _this = this;
        var setCaptchaDetails = this.props.setCaptchaDetails;
        if (this.state.captchaText) {
            if (this.state.captchaLoaded) {
                this.props.setLoader(true);
                this.setState({
                    reloadCaptcha: false,
                    error: {
                        text: ''
                    }
                }, function () {
                    _this.firstUpdate = false;
                });
                setCaptchaDetails({
                    id: this.state.captchaId,
                    code: this.state.captchaText
                }, done);
            }
            else if (!this.state.loading) {
                triggerEvent('COD_SUCCESS');
                this.props.setLoader(false);
                done();
            }
        }
        else {
            this.verifyCaptchaError(NO_CODE_ERROR);
        }
    };
    Captcha.prototype.setRef = function (node) {
        this.containerRef = node;
    };
    Captcha.prototype.render = function () {
        var captchaCharacterLength = parseInt((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CAPTCHA_CHARACTER_LENGTH'));
        if (isNaN(captchaCharacterLength)) {
            captchaCharacterLength = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.CAPTCHA_CHARACTER_LENGTH;
        }
        captchaCharacterLength += 1;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container, " ").concat(this.state.show ? '' : _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.hide), ref: this.setRef },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.captchaImageContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(this.state.loading ? _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.spinner : '') }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: this.state.captchaImageSrc, className: _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.captchaImage })),
                this.state.changeOption.show && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.changeImage, onClick: this.onChangeImage }, this.state.changeOption.text))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_3__.default, { label: "Enter code shown in above image*", id: "name", type: "tel", value: this.state.captchaText, maxLength: captchaCharacterLength, onChange: this.onCaptchaInput, className: _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.inputRow, styleOverrides: { errorClass: _captcha_base_css__WEBPACK_IMPORTED_MODULE_2__.default.error }, errorMessage: this.state.error.text }))));
    };
    return Captcha;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
Captcha.propTypes = {
    setLoader: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Captcha);


/***/ }),

/***/ "./browser/components/payment/common/Cashback/CashbackHandler.js":
/*!***********************************************************************!*\
  !*** ./browser/components/payment/common/Cashback/CashbackHandler.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var CashbackHandler = /** @class */ (function () {
    function CashbackHandler(cartData, icbData, deffData) {
        this.cartData = cartData || {};
        this.icbData = icbData;
        this.deffData = deffData;
    }
    CashbackHandler.prototype.getICBMessageString = function () {
        var _a = this, icbData = _a.icbData, _b = _a.icbData, amount = _b.amount, percentage = _b.percentage, _c = _a.cartData.products, cartProducts = _c === void 0 ? [] : _c;
        var discountInRupees = amount / 100;
        var discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;
        var prefix = percentage
            ? "".concat(percentage, "% instant discount ( \u20B9 ").concat(discountValueTrimmed, ")")
            : "\u20B9 ".concat(discount, " instant discount.");
        var cartProductsCount = cartProducts.length;
        var icbEligibleProductsCount = (icbData.skuLevelCashbackDetails || []).filter(function (info) { return !isNaN(+info.skuId); }).length;
        var suffix = '';
        if (cartProductsCount && icbEligibleProductsCount) {
            if (cartProductsCount === icbEligibleProductsCount) {
                suffix =
                    icbEligibleProductsCount === 1
                        ? ' available on item'
                        : ' available on all items';
            }
            else {
                // Only case is being icbEligibleProductsCount < cartProductsCount
                suffix = " available on ".concat(icbEligibleProductsCount, " / ").concat(cartProductsCount, " item").concat(icbEligibleProductsCount > 1 ? 's' : '');
            }
        }
        return prefix + suffix;
    };
    CashbackHandler.prototype.getInlineOfferNotSelectedICBString = function () {
        var _a = this, icbData = _a.icbData, _b = _a.icbData, amount = _b.amount, percentage = _b.percentage, _c = _a.cartData.products, cartProducts = _c === void 0 ? [] : _c;
        var discountInRupees = amount / 100;
        var discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;
        var prefix = percentage
            ? "Get ".concat(percentage, "% instant discount ( \u20B9 ").concat(discountValueTrimmed, ")")
            : "Get \u20B9 ".concat(discount, " instant discount.");
        var cartProductsCount = cartProducts.length;
        var icbEligibleProductsCount = (icbData.skuLevelCashbackDetails || []).filter(function (info) { return !isNaN(+info.skuId); }).length;
        var suffix = '';
        if (cartProductsCount && icbEligibleProductsCount) {
            if (cartProductsCount === icbEligibleProductsCount) {
                suffix =
                    icbEligibleProductsCount === 1
                        ? ' available on item'
                        : ' available on items';
            }
            else {
                // Only case is being icbEligibleProductsCount < cartProductsCount
                suffix = " available on ".concat(icbEligibleProductsCount, " / ").concat(cartProductsCount, " item").concat(icbEligibleProductsCount > 1 ? 's' : '');
            }
        }
        return prefix + suffix;
    };
    CashbackHandler.prototype.getDeffMessageString = function () {
        var _a = this.deffData, amount = _a.amount, percentage = _a.percentage;
        var discountInRupees = amount / 100;
        var discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;
        var message = percentage
            ? "".concat(percentage, "% Cashback upto \u20B9 ").concat(discountValueTrimmed, ". T&C Apply")
            : "Cashback upto \u20B9 ".concat(discountValueTrimmed, ". T&C Apply");
        return message;
    };
    return CashbackHandler;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CashbackHandler);


/***/ }),

/***/ "./browser/components/payment/common/Cashback/index.js":
/*!*************************************************************!*\
  !*** ./browser/components/payment/common/Cashback/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/priceBreakupFields */ "./browser/utils/priceBreakupFields.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var _CashbackHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CashbackHandler */ "./browser/components/payment/common/Cashback/CashbackHandler.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10__);
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





// Amount Finder fields for making the request.




// Message helper

//MA event helper


var Cashback = /** @class */ (function (_super) {
    __extends(Cashback, _super);
    function Cashback(props) {
        var _this = _super.call(this, props) || this;
        // Function Binds.
        [
            'getPlutusEligibility',
            'actionSuccess',
            'actionError',
            'onClickEligibility'
        ].map(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.state = {
            icb: { show: false, message: '' },
            deff: { show: false, message: '' },
            currentRetryCount: 0,
            discount: 0,
            isClicked: props.isClicked
        };
        _this.lastCheckedCardId = null;
        _this.icbRetryCount = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('ICB_RETRY_COUNT');
        _this.plutusEligibility = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('PLUTUS_ELIGIBILITY');
        _this.totalAmount = _this.getTotalAmount();
        return _this;
    }
    Cashback.prototype.componentDidMount = function () {
        this.getPlutusEligibility();
    };
    Cashback.prototype.componentWillUnmount = function () {
        this.props.updateBankDiscount(0);
    };
    Cashback.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.isClicked) {
            this.props.updateBankDiscount(this.state.discount);
        }
        var cardInfo = this.props.cardNumber || this.props.instrumentHandle;
        var newTotalAmount = this.getTotalAmount();
        if (newTotalAmount !== this.totalAmount ||
            cardInfo !== this.lastCheckedCardId) {
            this.totalAmount = newTotalAmount;
            this.getPlutusEligibility();
        }
        if (this.props.isSavingsNudgeEnabled && this.props.isClicked) {
            var eventPayload = {
                isClicked: this.props.isClicked,
                discountInRs: this.state.discount,
                cartValue: lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(this.props, 'cartData.price.subTotal'),
                cardBankName: this.props.cardBankName,
                cardType: this.props.productType,
                message: this.state.icb.message,
                discountType: 'INSTANT_CASHBACK'
            };
            this.fireEvent(eventPayload);
        }
    };
    Cashback.prototype.getTotalAmount = function () {
        var _a = this.props, payMode = _a.payMode, cartData = _a.cartData, paymentOptions = _a.paymentOptions, _b = _a.retryGCappliedValue, retryGCappliedValue = _b === void 0 ? 0 : _b;
        var total;
        if (payMode === 'retry') {
            total =
                (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_7__.getTotal)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(paymentOptions, 'price'), (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_5__.getPaymentFields)()) -
                    retryGCappliedValue;
            total = total * 100;
        }
        else {
            total = (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_7__.getTotal)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'price'), (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_5__.getPaymentFields)()) * 100;
        }
        return total;
    };
    Cashback.prototype.getCartId = function () {
        var _a = this.props, payMode = _a.payMode, cartData = _a.cartData, paymentOptions = _a.paymentOptions;
        return payMode === 'retry'
            ? lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(paymentOptions, 'cartId')
            : lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'id');
    };
    Cashback.prototype.checkEligibility = function (offer) {
        return this.plutusEligibility[offer];
    };
    Cashback.prototype.getOfferData = function (data, type) {
        return (lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(data, 'eligibilityDetails', []).find(function (info) { return info.type === type; }) || {}).data;
    };
    Cashback.prototype.onClickEligibility = function () {
        triggerEvent('CHECK_ELIGIBILITY');
        this.getPlutusEligibility();
    };
    Cashback.prototype.getPlutusEligibility = function () {
        if (this.checkEligibility('icb') || this.checkEligibility('deff')) {
            var _a = this.props, cardNumber = _a.cardNumber, instrumentHandle = _a.instrumentHandle, cartData = _a.cartData;
            var currentCartId = cardNumber || instrumentHandle;
            if (this.lastCheckedCardId !== currentCartId) {
                this.lastCheckedCardId = currentCartId;
                this.setState({ currentRetryCount: 0 });
            }
            var skuDetails_1;
            if ((0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__.checkExchangeCart)(cartData)) {
                // Assuming there is only one product in cart for OEE
                var product = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'products.0', {});
                var skuId = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(product, 'skuId');
                var sellerId = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(product, 'selectedSeller.id');
                skuDetails_1 = [
                    {
                        skuId: skuId,
                        id: "".concat(skuId, "_").concat(sellerId),
                        payableAmount: lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'price.effectiveTotalPrice') * 100
                    }
                ];
            }
            else {
                // Style Based ICB changes.
                skuDetails_1 = cartData
                    ? lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'products', []).map(function (product) {
                        var skuId = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(product, 'skuId');
                        var sellerId = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(product, 'selectedSeller.id');
                        return {
                            skuId: skuId,
                            id: "".concat(skuId, "_").concat(sellerId),
                            payableAmount: product.price.total * 100
                        };
                    })
                    : null;
            }
            lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'price.charges.data', []).forEach(function (charge) {
                if (charge.value > 0 &&
                    commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.CHARGES_FOR_PLUTUS[charge.name]) {
                    var chargeName = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(charge, 'name', '').toUpperCase();
                    skuDetails_1.push({
                        skuId: chargeName,
                        id: chargeName,
                        payableAmount: charge.value * 100
                    });
                }
            });
            var payload = {
                cartId: this.getCartId(),
                totalAmount: this.totalAmount
            };
            skuDetails_1 && (payload.skuDetails = skuDetails_1);
            payload[instrumentHandle ? 'instrumentHandle' : 'cardNumber'] =
                instrumentHandle || cardNumber;
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__.triggerMaWithLargePayload)('PLUTUS_PAYLOAD', payload);
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_4__.default.getPlutusEligibility(payload, this.actionSuccess, this.actionError);
        }
    };
    Cashback.prototype.actionSuccess = function (res) {
        this.setState({ icb: { show: false }, deff: { show: false } });
        var icbData = this.getOfferData(res, 'INSTANT_CASHBACK');
        var deffData = this.getOfferData(res, 'DEFERRED_CASHBACK');
        if (this.checkEligibility('icb') && icbData) {
            this.handleICBData(icbData);
        }
        else if (this.checkEligibility('deff')) {
            this.handleDeffData(deffData);
        }
    };
    Cashback.prototype.actionError = function () {
        this.setState(function (prevState) { return ({
            currentRetryCount: prevState.currentRetryCount + 1,
            icb: { show: true, error: true }
        }); });
    };
    Cashback.prototype.fireEvent = function (payload) {
        var isClicked = payload.isClicked, discountInRs = payload.discountInRs, cartValue = payload.cartValue, cardBankName = payload.cardBankName, cardType = payload.cardType, message = payload.message, discountType = payload.discountType;
        var eventName = isClicked
            ? 'SAVED_CARD_OFFERS_CLICK'
            : 'SAVED_CARD_OFFERS_LOAD';
        triggerEvent(eventName, {
            custom: {
                custom: {
                    v1: cardBankName,
                    v2: cardType,
                    v3: message,
                    v4: "cartValue=".concat(cartValue, ";discountType=").concat(discountType, ";discountInRs=").concat(discountInRs)
                },
                widget: {
                    name: 'payment_saved_card',
                    type: 'card',
                    data_set: {
                        data: [
                            {
                                cardBankName: cardBankName,
                                cardType: cardType,
                                message: message,
                                cartValue: cartValue,
                                discountType: discountType,
                                discountInRs: discountInRs
                            }
                        ]
                    }
                },
                widget_items: {
                    name: isClicked ? 'saved_card_click' : 'saved_card_offer'
                }
            }
        });
    };
    Cashback.prototype.handleICBData = function (icbData) {
        var amount = icbData.amount, code = icbData.code, message = icbData.message;
        var _a = this.props, isClicked = _a.isClicked, cartData = _a.cartData, cardBankName = _a.cardBankName, productType = _a.productType;
        var discountInRs = Math.floor(amount) / 100;
        var eventPayload = {
            isClicked: isClicked,
            discountInRs: discountInRs,
            cartValue: lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(cartData, 'price.subTotal'),
            cardBankName: cardBankName,
            cardType: productType,
            message: message,
            discountType: 'INSTANT_CASHBACK'
        };
        this.fireEvent(eventPayload);
        if (amount > 0) {
            var cbHandler = new _CashbackHandler__WEBPACK_IMPORTED_MODULE_8__.default(this.props.cartData, icbData);
            var message_1 = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10__.isFeatureEnabled)('INLINE_OFFER_CARD')
                ? cbHandler.getInlineOfferNotSelectedICBString()
                : cbHandler.getICBMessageString();
            this.setState({
                icb: { show: true, message: message_1, code: null, error: null },
                discount: discountInRs
            });
            if (this.props.isClicked ||
                !(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10__.isFeatureEnabled)('INLINE_OFFER_CARD') ||
                lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(this, 'props.isNewCard')) {
                this.props.updateBankDiscount(discountInRs);
            }
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_10__.isFeatureEnabled)('INLINE_OFFER_CARD') &&
                !lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(this, 'props.isNewCard'))
                this.props.setCashbackApplicable(true);
        }
        else {
            this.setState({
                icb: {
                    show: true,
                    message: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.BANK_MESSAGE_MAP[code],
                    code: code,
                    error: null
                },
                discount: 0
            });
            this.props.updateBankDiscount(0);
        }
    };
    Cashback.prototype.handleDeffData = function (deffData) {
        if (deffData === void 0) { deffData = {}; }
        var amount = deffData.amount;
        if (amount > 0) {
            var cbHandler = new _CashbackHandler__WEBPACK_IMPORTED_MODULE_8__.default(null, null, deffData);
            var message = cbHandler.getDeffMessageString();
            this.setState({
                deff: { show: true, message: message }
            });
        }
        this.props.updateBankDiscount(0);
    };
    Cashback.prototype.render = function () {
        return this.props.render({
            data: this
        });
    };
    return Cashback;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
Cashback.propTypes = {
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),
    updateBankDiscount: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func),
    render: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func)
};
Cashback.defaultProps = {
    cartData: {},
    updateBankDiscount: function () { },
    render: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cashback);


/***/ }),

/***/ "./browser/components/payment/common/TwoFactorAuthentication/index.js":
/*!****************************************************************************!*\
  !*** ./browser/components/payment/common/TwoFactorAuthentication/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
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



var TwoFAScreen = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_1__.default)({
    loader: function () {
        return Promise.all(/*! import() | twoFaScreen */[__webpack_require__.e("styles-browser_components_payment_common_Timer_timer_base_css"), __webpack_require__.e("styles-browser_components_payment_common_TwoFactorAuthentication_twoFactorAuthComponents_base_css"), __webpack_require__.e("twoFaScreen")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TwoFAScreen */ "./browser/components/payment/common/TwoFactorAuthentication/components/TwoFAScreen.js"));
    },
    loaderProperties: { backdrop: false }
});
var boundFuncs = ['selectNumber', 'setScreen'];
var TwoFactorAuthentication = /** @class */ (function (_super) {
    __extends(TwoFactorAuthentication, _super);
    function TwoFactorAuthentication(props) {
        var _this = _super.call(this, props) || this;
        var numbers = props.numbers, email = props.email;
        var screen = numbers.length > 1
            ? 'mobileOtp'
            : email && !numbers.length
                ? 'emailOtp'
                : 'otpScanner';
        _this.state = {
            selectedNumber: numbers.length === 1 ? numbers[0] : '',
            screen: screen
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    TwoFactorAuthentication.prototype.componentDidMount = function () {
        this.props.payMode === 'retry' && this.props.disableRetryTimer();
        triggerEvent('SHOW_TWOFA', {
            maData: {
                entity_type: 'Myntra_2FA_Payments_Page',
                entity_name: 'Myntra_2FA_Payments_Page'
            },
            custom: {
                widget_items: {
                    data_set: {
                        data: {
                            entity_type: 'Myntra_2FA_Payments_Page',
                            entity_name: '2FA Pop up Shown'
                        }
                    }
                }
            }
        });
    };
    TwoFactorAuthentication.prototype.componentWillUnmount = function () {
        this.props.payMode === 'retry' && this.props.enableRetryTimer();
    };
    TwoFactorAuthentication.prototype.selectNumber = function (e) {
        triggerEvent('TWOFA_SELECT_NUMBER');
        var id = e.currentTarget.id;
        this.setState({
            selectedNumber: id.slice(4) // trimming 'otp-'
        });
    };
    TwoFactorAuthentication.prototype.setScreen = function (e) {
        e.stopPropagation();
        var screen = this.state.screen;
        var nextScreen;
        if (screen === 'mobileOtp' || screen === 'emailOtp') {
            nextScreen = 'otpScanner';
        }
        else {
            nextScreen = 'mobileOtp';
        }
        this.setState({
            screen: nextScreen
        });
    };
    TwoFactorAuthentication.prototype.render = function () {
        var _a = this, state = _a.state, selectNumber = _a.selectNumber, setScreen = _a.setScreen, props = _a.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TwoFAScreen, __assign({}, state, props, { selectNumber: selectNumber, setScreen: setScreen })));
    };
    return TwoFactorAuthentication;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
TwoFactorAuthentication.propTypes = {
    numbers: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array),
    email: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    close: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    handlePaymentAction: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    submit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TwoFactorAuthentication);


/***/ })

}]);
//# sourceMappingURL=browser_components_common_Captcha_index_js-browser_components_payment_common_Cashback_index_j-068a36.js.map