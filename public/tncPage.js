(self["webpackChunk"] = self["webpackChunk"] || []).push([["tncPage"],{

/***/ "../node_modules/@myntra/m-comp/react/SVGIcon/ShieldDashed.jsx":
/*!*********************************************************************!*\
  !*** ../node_modules/@myntra/m-comp/react/SVGIcon/ShieldDashed.jsx ***!
  \*********************************************************************/
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

var ShieldDashed = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", __assign({ width: 99, height: 30, viewBox: "0 0 99 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { stroke: "#06997E", strokeLinecap: "round", strokeDasharray: "5 0", d: "M.5 14.5h31m36 0h31" }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { d: "M49.449.002a.987.987 0 00-.38.092L37.554 5.645A.987.987 0 0037 6.53v4.452c0 8.282 4.958 15.384 12.1 18.534a.987.987 0 00.8 0C57.043 26.365 62 19.263 62 10.98V6.529a.987.987 0 00-.555-.884L49.932.095a.987.987 0 00-.483-.093zm.051 2.076l10.526 5.079v3.824c0 7.333-4.301 13.587-10.526 16.519-6.224-2.932-10.526-9.186-10.526-16.52V7.158L49.5 2.078zm5.828 7.782a.987.987 0 00-.585.278l-6.878 6.568-2.93-2.93a.988.988 0 00-1.73.678.986.986 0 00.333.71l3.618 3.619a.987.987 0 001.378.02l7.566-7.237a.986.986 0 00-.772-1.706z", fill: "#1CAE91" }))); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShieldDashed);


/***/ }),

/***/ "./browser/components/payment/common/Options/BNPL/TNCIframe/index.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/Options/BNPL/TNCIframe/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _tncIframe_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tncIframe.base.css */ "./browser/components/payment/common/Options/BNPL/TNCIframe/tncIframe.base.css");
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


var TNCIframe = /** @class */ (function (_super) {
    __extends(TNCIframe, _super);
    function TNCIframe() {
        var _this = _super.call(this) || this;
        _this.readMessage = _this.readMessage.bind(_this);
        window.addEventListener('message', _this.readMessage, false);
        return _this;
    }
    TNCIframe.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.readMessage, false);
    };
    TNCIframe.prototype.readMessage = function (message) {
        var data = message.data;
        if (data === 204) {
            this.props.successCallback();
        }
        else if (typeof data === 'object' && data.type !== 'iframeLoaded') {
            window.location =
                '/checkout/payment?transaction_status=N&errorCode=40001';
        }
    };
    TNCIframe.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("iframe", { src: this.props.src, className: _tncIframe_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iframe, sandbox: true });
    };
    return TNCIframe;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TNCIframe);


/***/ }),

/***/ "./browser/components/payment/common/Options/BNPL/TNCPage/index.js":
/*!*************************************************************************!*\
  !*** ./browser/components/payment/common/Options/BNPL/TNCPage/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tncPage_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tncPage.base.css */ "./browser/components/payment/common/Options/BNPL/TNCPage/tncPage.base.css");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _TNCIframe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TNCIframe */ "./browser/components/payment/common/Options/BNPL/TNCIframe/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
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









var PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER;
var TNC = /** @class */ (function (_super) {
    __extends(TNC, _super);
    function TNC(props) {
        var _this = _super.call(this, props) || this;
        var context = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__.getQueryParam)({ name: 'context' });
        var _a = _this.getPayLaterData(context), payLaterInstrumentData = _a.payLaterInstrumentData, rank = _a.rank;
        _this.payLaterInstrumentData = payLaterInstrumentData;
        _this.rank = rank;
        var BNPLInstrumentData = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(payLaterInstrumentData, 'paymentInstrumentDetails.data') || []).find(function (paymentType) { return paymentType.id === 1; });
        _this.tncUrl = BNPLInstrumentData.tncUrl;
        _this.submitForm = _this.submitForm.bind(_this);
        return _this;
    }
    TNC.prototype.componentDidMount = function () {
        this.props.setLoader(false);
    };
    TNC.prototype.getPayLaterData = function (context) {
        var rank;
        var path = context === 'recommended'
            ? 'props.paymentOptions.recommendedPaymentInstrumentDetails'
            : 'props.paymentOptions.paymentInstrumentDetails';
        var payLaterInstrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, path, []).find(function (info, index) {
            if (info.type === PAY_LATER) {
                rank = index + 1;
                return true;
            }
            else
                return false;
        });
        return { payLaterInstrumentData: payLaterInstrumentData, rank: rank };
    };
    TNC.prototype.submitForm = function () {
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: PAY_LATER,
                    v2: PAY_LATER,
                    v3: this.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
        this.props.setLoader(true);
        var paymentModeAction = document.getElementById("action-".concat(PAY_LATER));
        paymentModeAction && paymentModeAction.click();
    };
    TNC.prototype.getOptionUI = function () {
        var origin = window.location.origin;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tncPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_3__.default, { show: this.props.loading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_TNCIframe__WEBPACK_IMPORTED_MODULE_5__.default, { src: "".concat(this.tncUrl, "&origin=").concat(origin), successCallback: this.submitForm })));
    };
    TNC.prototype.getModeAttributes = function () {
        var mobile = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_6__.getQueryParam)({ name: 'mobile' });
        return {
            userProfileMobile: mobile,
            paymentProviderId: 1
        };
    };
    TNC.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_4__.default, __assign({}, this.props, { paymentUrl: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'payLaterInstrumentData.paymentInstrumentDetails.paymentUrl'), deviceMode: "mobile", paymentMode: PAY_LATER, paymentModeName: PAY_LATER, optionUI: this.getOptionUI(), actionData: { enabled: true }, modeAttributes: this.getModeAttributes() })));
    };
    return TNC;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TNC);


/***/ })

}]);
//# sourceMappingURL=tncPage.js.map