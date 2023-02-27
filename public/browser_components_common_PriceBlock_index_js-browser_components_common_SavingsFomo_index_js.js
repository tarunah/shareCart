(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_common_PriceBlock_index_js-browser_components_common_SavingsFomo_index_js"],{

/***/ "./browser/components/common/PriceBlock/index.js":
/*!*******************************************************!*\
  !*** ./browser/components/common/PriceBlock/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./priceBlockCommon.base.css */ "./browser/components/common/PriceBlock/priceBlockCommon.base.css");
/* harmony import */ var commonComp_PriceBreakUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/PriceBreakUp */ "./browser/components/common/PriceBreakUp/index.js");
/* harmony import */ var commonComp_SavingsStrip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/SavingsStrip */ "./browser/components/common/SavingsStrip/index.js");
/* harmony import */ var commonComp_SavingsCallout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/SavingsCallout */ "./browser/components/common/SavingsCallout/index.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/DiscountUtil */ "./browser/utils/DiscountUtil/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
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


// Styles

// Components



// Utils




var PriceBlock = function (props) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.priceBlockEvent)((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.getUidx)(), props.price);
    }, [props.price]);
    var price = props.price, _a = props.shippingData, shippingData = _a === void 0 ? {} : _a, _b = props.shippingData, _c = _b === void 0 ? {} : _b, shippingApplicableCharge = _c.shippingApplicableCharge, flags = props.flags, _d = props.dynamicStyles, dynamicStyles = _d === void 0 ? {} : _d, count = props.count, className = props.className, isPaymentInvisibilityEnabled = props.isPaymentInvisibilityEnabled, tryAndBuyOpted = props.tryAndBuyOpted, _e = props.userDetails, _f = _e === void 0 ? {} : _e, returnAbuser = _f.returnAbuser, payMode = props.payMode, isPaymentCalloutEnabled = props.isPaymentCalloutEnabled;
    var priceDetails = (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_6__.transformPriceDetails)(commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_7__.default.getPrice(price), props.getFields(), {
        shippingMethod: shippingData.method,
        freeEarlyAccess: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isFreeEarlyAccess)(lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(flags, 'coverFeeApplicable.remark')),
        tryAndBuyOpted: tryAndBuyOpted
    }, {
        shipping: { shippingApplicableCharge: shippingApplicableCharge }
    });
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container, " ").concat(className || '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "priceBlockHeader", className: "".concat(_priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__.default.items, "\n            ").concat(dynamicStyles.animatePriceBlockHeader ? _priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__.default.animate : '') }, count
            ? "PRICE DETAILS (".concat(count, " Item").concat(count > 1 ? 's' : '', ")")
            : 'PRICE DETAILS'),
        isPaymentCalloutEnabled === 'above_pricing' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SavingsCallout__WEBPACK_IMPORTED_MODULE_4__.default, __assign({}, props))) : null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__.default.detailBody },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_PriceBreakUp__WEBPACK_IMPORTED_MODULE_2__.default, { priceDetails: priceDetails, returnAbuser: returnAbuser, payMode: payMode })),
        isPaymentInvisibilityEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SavingsStrip__WEBPACK_IMPORTED_MODULE_3__.default, { price: price, savingsStripStyle: _priceBlockCommon_base_css__WEBPACK_IMPORTED_MODULE_1__.default.savingsStripStyle, shippingApplicableCharge: shippingApplicableCharge, isPaymentInvisibilityEnabled: isPaymentInvisibilityEnabled }))));
};
PriceBlock.propTypes = {
    className: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),
    price: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    getFields: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func.isRequired),
    count: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().number.isRequired),
    dynamicStyles: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
    isPaymentInvisibilityEnabled: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool)
};
PriceBlock.defaultProps = {
    isPaymentInvisibilityEnabled: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceBlock);


/***/ }),

/***/ "./browser/components/common/SavingsFomo/SavingsFomoComponents/index.js":
/*!******************************************************************************!*\
  !*** ./browser/components/common/SavingsFomo/SavingsFomoComponents/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SavingsFomoHeader": () => (/* binding */ SavingsFomoHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../savingsFomo.base.css */ "./browser/components/common/SavingsFomo/savingsFomo.base.css");





var MIGHT_MISS_SAVINGS = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.default.MIGHT_MISS_SAVINGS, LEAVE_PAGE_CONFIRMATION = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.default.LEAVE_PAGE_CONFIRMATION;
var SavingsFomoHeader = function (_a) {
    var totalSavings = _a.totalSavings;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.header }, MIGHT_MISS_SAVINGS),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.savingsValue },
            "\u20B9",
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.currencyValue)(totalSavings)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.savingsConfirmationText }, LEAVE_PAGE_CONFIRMATION)));
};
SavingsFomoHeader.propTypes = {
    totalSavings: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number)
};



/***/ }),

/***/ "./browser/components/common/SavingsFomo/index.js":
/*!********************************************************!*\
  !*** ./browser/components/common/SavingsFomo/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./savingsFomoEventsHelper */ "./browser/components/common/SavingsFomo/savingsFomoEventsHelper.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! iconComp/CheckboxInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxInactive.jsx");
/* harmony import */ var iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/CheckboxActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxActive.jsx");
/* harmony import */ var _SavingsFomoComponents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SavingsFomoComponents */ "./browser/components/common/SavingsFomo/SavingsFomoComponents/index.js");
/* harmony import */ var _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./savingsFomo.base.css */ "./browser/components/common/SavingsFomo/savingsFomo.base.css");
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












var DONT_SHOW_MESSAGE = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.default.DONT_SHOW_MESSAGE, STAY_ON_PAGE = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.default.STAY_ON_PAGE, STAY_ON_PAGE_SHORT = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.default.STAY_ON_PAGE_SHORT, GO_BACK = commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.default.GO_BACK;
var checkSavingsFomoConditions = function (totalSavings) {
    if (Math.floor(totalSavings) > 0) {
        return true;
    }
    return false;
};
var boundFuncs = [
    'toggleModal',
    'toggleNudge',
    'closeModalUsingIcon',
    'stayButtonClick',
    'goBackButtonClick',
    'checkFomoModal'
];
var SavingsFomo = /** @class */ (function (_super) {
    __extends(SavingsFomo, _super);
    function SavingsFomo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showModal: false,
            showNudge: _this.getDefaultFomoLsValue()
        };
        _this.userUidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getUidx)();
        _this.prevHash = window.location.hash;
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    SavingsFomo.prototype.componentDidMount = function () {
        var _a = this.props, currentPage = _a.currentPage, _b = _a.price, totalSavings = _b.totalSavings, subTotal = _b.subTotal;
        var userUidx = this.userUidx;
        if (this.state.showNudge && checkSavingsFomoConditions(totalSavings)) {
            this.prevHash = window.location.hash;
            this.addToURLHash();
            window.addEventListener('popstate', this.checkFomoModal);
        }
        else {
            if (totalSavings) {
                _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.defaultSavingsFomo(currentPage, userUidx, totalSavings, subTotal);
            }
        }
    };
    SavingsFomo.prototype.componentDidUpdate = function () {
        this.checkFomoModal();
    };
    SavingsFomo.prototype.componentWillUnmount = function () {
        window.removeEventListener('popstate', this.checkFomoModal);
    };
    SavingsFomo.prototype.checkFomoModal = function () {
        var currentPage = this.props.currentPage;
        var isUpi = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isLocalStorageEnabled)() &&
            currentPage === 'payment' &&
            localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.localStorageKeys.SAVINGS_FOMO_VALUE) === 'upi';
        if (this.prevHash === '#disableBack' && !window.location.hash) {
            if (window.location.hash === '#disableBack') {
                this.removeURLHash();
            }
            this.setState({
                showModal: !isUpi
            }, this.triggerLoadEvent);
        }
        isUpi &&
            localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.localStorageKeys.SAVINGS_FOMO_VALUE, this.state.showNudge);
        this.prevHash = window.location.hash;
    };
    SavingsFomo.prototype.triggerLoadEvent = function () {
        var userUidx = this.userUidx;
        var _a = this.props, currentPage = _a.currentPage, _b = _a.price, totalSavings = _b.totalSavings, subTotal = _b.subTotal;
        _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.triggerSavingsFomoLoad(currentPage, userUidx, totalSavings, subTotal);
    };
    SavingsFomo.prototype.addToURLHash = function () {
        window.ckrrhistory &&
            !window.location.hash &&
            window.ckrrhistory.push('#disableBack');
    };
    SavingsFomo.prototype.removeURLHash = function () {
        window.ckrrhistory && window.ckrrhistory.goBack();
    };
    SavingsFomo.prototype.getDefaultFomoLsValue = function () {
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isLocalStorageEnabled)()) {
            try {
                var lsVal = JSON.parse(localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.localStorageKeys.SAVINGS_FOMO_VALUE));
                return lsVal === null ? true : lsVal;
            }
            catch (e) {
                return true;
            }
        }
        return true;
    };
    SavingsFomo.prototype.toggleSavingsFomoLsVal = function () {
        var showNudge = this.state.showNudge;
        _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.triggerNudgeClick(this.userUidx, showNudge, this.props.currentPage);
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isLocalStorageEnabled)()) {
            localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.localStorageKeys.SAVINGS_FOMO_VALUE, showNudge);
        }
    };
    SavingsFomo.prototype.toggleNudge = function () {
        this.setState(function (prevState) { return ({ showNudge: !prevState.showNudge }); }, this.toggleSavingsFomoLsVal);
    };
    SavingsFomo.prototype.toggleModal = function () {
        this.setState(function (prevState) { return ({ showModal: !prevState.showModal }); });
    };
    SavingsFomo.prototype.goBackButtonClick = function () {
        var currentPage = this.props.currentPage;
        var userUidx = this.userUidx;
        _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.goBackSavingsFomoClick(currentPage, userUidx);
        window.ckrrhistory.go(-2);
    };
    SavingsFomo.prototype.stayButtonClick = function () {
        var currentPage = this.props.currentPage;
        var userUidx = this.userUidx;
        _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.staySavingsFomoClick(currentPage, userUidx);
        this.toggleModal();
    };
    SavingsFomo.prototype.closeModalUsingIcon = function () {
        _savingsFomoEventsHelper__WEBPACK_IMPORTED_MODULE_3__.eventsObj.closingModalUsingIcon(this.props.currentPage);
        this.toggleModal();
    };
    SavingsFomo.prototype.getHalfcardFooter = function () {
        var showNudge = this.state.showNudge;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.checkboxContainer },
                showNudge ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_7__.default, { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.fillBlueberry20, onClick: this.toggleNudge })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_8__.default, { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.fillWatermelon, onClick: this.toggleNudge })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.checkboxMessage }, DONT_SHOW_MESSAGE)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.buttonContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: "".concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.button, " ").concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.goBackButton), onClick: this.goBackButtonClick }, GO_BACK),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: "".concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.button, " ").concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.stayOnPageButton), onClick: this.stayButtonClick }, STAY_ON_PAGE),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: "".concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.button, " ").concat(_savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.stayOnPageShortButton), onClick: this.stayButtonClick }, STAY_ON_PAGE_SHORT))));
    };
    SavingsFomo.prototype.render = function () {
        var showModal = this.state.showModal;
        var totalSavings = this.props.price.totalSavings;
        var _isMobile = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isMobile)();
        if (showModal) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__.default, { className: "".concat(_isMobile ? _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.modal : _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.desktopModal), cancelCallback: this.closeModalUsingIcon, halfCard: _isMobile, cancelIconConfig: { show: true } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsFomo_base_css__WEBPACK_IMPORTED_MODULE_10__.default.container },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SavingsFomoComponents__WEBPACK_IMPORTED_MODULE_9__.SavingsFomoHeader, { totalSavings: totalSavings }),
                    this.getHalfcardFooter())));
        }
        return null;
    };
    return SavingsFomo;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
SavingsFomo.propTypes = {
    price: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),
    products: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().array),
    currentPage: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string)
};
SavingsFomo.defaultProps = {
    products: []
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavingsFomo);


/***/ }),

/***/ "./browser/components/common/SavingsFomo/savingsFomoEventsHelper.js":
/*!**************************************************************************!*\
  !*** ./browser/components/common/SavingsFomo/savingsFomoEventsHelper.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventsObj": () => (/* binding */ eventsObj)
/* harmony export */ });
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__);

var eventsObj = {
    triggerSavingsFomoLoad: function (currentPage, userUidx, totalSavings, subTotal) {
        triggerEvent('SAVINGS_FOMO_LOAD', {
            custom: {
                custom: {
                    v1: userUidx,
                    v2: totalSavings,
                    v3: subTotal
                },
                widget: {
                    name: 'savings_halfcard',
                    type: 'card'
                },
                event_type: 'widgetLoad',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - savings_halfcard_load")
            }
        });
    },
    defaultSavingsFomo: function (currentPage, userUidx, totalSavings, subTotal) {
        triggerEvent('DEFAULT_SAVINGS_FOMO', {
            custom: {
                custom: {
                    v1: userUidx,
                    v2: totalSavings,
                    v3: subTotal
                },
                widget: {
                    name: 'savings_back_button_click',
                    type: 'button'
                },
                event_type: 'other',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - savings_back_button_click")
            }
        });
    },
    goBackSavingsFomoClick: function (currentPage, userUidx) {
        triggerEvent('GO_BACK_SAVINGS_FOMO_CLICK', {
            custom: {
                custom: {
                    v1: userUidx
                },
                widget: {
                    name: 'savings_halfcard',
                    type: 'card'
                },
                widget_items: {
                    name: 'go_back_click',
                    type: 'button'
                },
                event_type: 'widgetItemClick',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - fomo_halfcard_click")
            }
        });
    },
    staySavingsFomoClick: function (currentPage, userUidx) {
        triggerEvent('STAY_SAVINGS_FOMO_CLICK', {
            custom: {
                custom: {
                    v1: userUidx
                },
                widget: {
                    name: 'savings_halfcard',
                    type: 'card'
                },
                widget_items: {
                    name: 'stay_on_page_click',
                    type: 'button'
                },
                event_type: 'widgetItemClick',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - fomo_halfcard_click")
            }
        });
    },
    triggerNudgeClick: function (userUidx, showNudge, currentPage) {
        triggerEvent('SAVINGS_FOMO_NUDGE_CLICK', {
            custom: {
                custom: {
                    v1: userUidx,
                    v2: showNudge
                },
                widget: {
                    name: 'savings_halfcard',
                    type: 'card'
                },
                widget_items: {
                    name: 'checkbox_click',
                    type: 'button'
                },
                event_type: 'widgetItemClick',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - fomo_halfcard_click")
            }
        });
    },
    closingModalUsingIcon: function (currentPage) {
        triggerEvent('SAVINGS_FOMO_CLOSE_ICON_CLICK', {
            custom: {
                widget: {
                    name: 'savings_halfcard',
                    type: 'card'
                },
                widget_items: {
                    name: 'close_click',
                    type: 'button'
                },
                event_type: 'widgetItemClick',
                event_category: "".concat(currentPage === commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.checkoutPage.PAYMENT ? 'Payment' : 'Address', " Page - fomo_halfcard_click")
            }
        });
    }
};


/***/ }),

/***/ "./browser/components/common/SavingsStrip/index.js":
/*!*********************************************************!*\
  !*** ./browser/components/common/SavingsStrip/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./savingsStrip.base.css */ "./browser/components/common/SavingsStrip/savingsStrip.base.css");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/RupeeBold.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RupeeBold.jsx");
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");



// Styles

// Utils




var FormatString = function (_a) {
    var text = _a.text, savings = _a.savings;
    return text.split('{cart_savings}').map(function (msg, idx) {
        if (idx === 0) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: idx },
                msg,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savings },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeIcon }),
                    savings,
                    "\u00A0")));
        }
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: idx }, msg);
    });
};
var SavingsStrip = function (_a) {
    var _b = _a.price, _c = _b === void 0 ? {} : _b, _d = _c.charges, _e = _d === void 0 ? {} : _d, data = _e.data, totalSavings = _c.totalSavings, total = _c.total, shippingApplicableCharge = _a.shippingApplicableCharge, savingsStripStyle = _a.savingsStripStyle, isPaymentInvisibilityEnabled = _a.isPaymentInvisibilityEnabled;
    var savingsStripConfig = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_3__.getGrowthHackConfigValue)('SAVINGS_STRIP_CONFIG');
    var includeShipping = savingsStripConfig.includeShipping, stripThreshold = savingsStripConfig.stripThreshold, textThreshold = savingsStripConfig.textThreshold, preThresholdText = savingsStripConfig.preThresholdText, postThresholdText = savingsStripConfig.postThresholdText, paymentInvisibilitySavingsText = savingsStripConfig.paymentInvisibilitySavingsText;
    var shippingCharge = data.find(function (charge) { return charge.name === 'shipping'; }) || {};
    var bagSavings = Number(includeShipping && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(shippingCharge)
        ? totalSavings + shippingApplicableCharge
        : totalSavings);
    var savingsStripText = '';
    if (isPaymentInvisibilityEnabled) {
        savingsStripText = paymentInvisibilitySavingsText;
    }
    else if (bagSavings >= stripThreshold) {
        savingsStripText =
            bagSavings < textThreshold ? preThresholdText : postThresholdText;
    }
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        if (bagSavings && isPaymentInvisibilityEnabled) {
            triggerEvent('PAYMENT_INVISIBILITY_SAVINGS_STRIP_LOAD', {
                custom: {
                    custom: {
                        v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.getUidx)(),
                        v2: bagSavings,
                        v3: total
                    },
                    widget: {
                        name: 'payment_page_savings',
                        type: 'card'
                    }
                }
            });
        }
    }, [bagSavings]);
    if (bagSavings && savingsStripText) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savingsStrip, " ").concat(savingsStripStyle ? savingsStripStyle : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savingsStripText },
                isPaymentInvisibilityEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeCircleContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _savingsStrip_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeIcon }))),
                savingsStripText && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(FormatString, { text: savingsStripText, savings: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.currencyValue)(bagSavings) })))));
    }
    return null;
};
SavingsStrip.propTypes = {
    price: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
    shippingApplicableCharge: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    savingsStripStyle: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};
SavingsStrip.defaultProps = {
    isPaymentInvisibilityEnabled: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavingsStrip);


/***/ })

}]);
//# sourceMappingURL=browser_components_common_PriceBlock_index_js-browser_components_common_SavingsFomo_index_js.js.map