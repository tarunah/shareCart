(self["webpackChunk"] = self["webpackChunk"] || []).push([["couponsPage"],{

/***/ "./browser/components/cart/mobile/OptionsBlock/Coupons/CouponsPage/index.js":
/*!**********************************************************************************!*\
  !*** ./browser/components/cart/mobile/OptionsBlock/Coupons/CouponsPage/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CouponsUI": () => (/* binding */ CouponsUI),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _couponsPage_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./couponsPage.base.css */ "./browser/components/cart/mobile/OptionsBlock/Coupons/CouponsPage/couponsPage.base.css");
/* harmony import */ var _common_Coupons_CouponsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/Coupons/CouponsHandler */ "./browser/components/cart/common/Coupons/CouponsHandler/index.js");
/* harmony import */ var _common_Coupons_CouponsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/Coupons/CouponsForm */ "./browser/components/cart/common/Coupons/CouponsForm/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../utils/maHelper */ "./browser/utils/maHelper.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utils_maHelper__WEBPACK_IMPORTED_MODULE_6__);
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







var CouponsUI = /** @class */ (function (_super) {
    __extends(CouponsUI, _super);
    function CouponsUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CouponsUI.prototype.componentDidMount = function () {
        triggerEvent('COUPON_SCREEN_LOAD', (_utils_maHelper__WEBPACK_IMPORTED_MODULE_6___default()));
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setDocTitleInMobile)('COUPONS');
    };
    CouponsUI.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_4__.default, { show: this.props.loading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_Coupons_CouponsForm__WEBPACK_IMPORTED_MODULE_3__.CouponsForm, __assign({}, this.props)))));
    };
    return CouponsUI;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));

var CouponsPage = function (props) {
    var _a = props.data || {}, cartId = _a.id, _b = _a.coupons, coupons = _b === void 0 ? [] : _b;
    var appliedCoupon = (coupons.find(function (coupon) { return coupon.type === 'coupon' && coupon.status === 'SUCCESS'; }) || {}).code;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_Coupons_CouponsHandler__WEBPACK_IMPORTED_MODULE_2__.default, { cartId: cartId, showNotification: true, appliedCoupon: appliedCoupon, handleCartAction: props.handleCartAction, goBack: props.goBack, render: function (_a) {
            var state = _a.state, setCouponCode = _a.setCouponCode, applyCoupon = _a.applyCoupon, onCouponClick = _a.onCouponClick, onRetryAction = _a.onRetryAction, renderBannerFG = _a.renderBannerFG;
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CouponsUI, __assign({}, state, { setCouponCode: setCouponCode, applyCoupon: applyCoupon, goBack: props.goBack, cartId: cartId, onCouponClick: onCouponClick, onRetryAction: onRetryAction, renderBannerFG: renderBannerFG, analytics: props.analytics })));
        } }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CouponsPage);


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
//# sourceMappingURL=couponsPage.js.map