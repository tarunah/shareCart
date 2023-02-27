(self["webpackChunk"] = self["webpackChunk"] || []).push([["cartAddressFormPage"],{

/***/ "./browser/components/cart/mobile/AddressFormPage/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/cart/mobile/AddressFormPage/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _address_common_AddressForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../address/common/AddressForm */ "./browser/components/address/common/AddressForm/index.js");
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





var AddressFormPage = /** @class */ (function (_super) {
    __extends(AddressFormPage, _super);
    function AddressFormPage(props) {
        var _this = _super.call(this, props) || this;
        _this.successCallback = _this.successCallback.bind(_this);
        return _this;
    }
    AddressFormPage.prototype.componentDidMount = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)(this.props.title);
    };
    AddressFormPage.prototype.successCallback = function () {
        var goBack = this.props.goBack;
        goBack && goBack(-1);
    };
    AddressFormPage.prototype.render = function () {
        var _a = this.props, loading = _a.loading, handleAddressAction = _a.handleAddressAction, addressInfo = _a.addressInfo;
        var isNewUser = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'data.userDetails.isFirstTimeCustomer', false);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_3__.default, { show: loading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_address_common_AddressForm__WEBPACK_IMPORTED_MODULE_4__.default, { successCallback: this.successCallback, handleAddressAction: handleAddressAction, mode: "mobile", addressInfo: addressInfo, isNewUser: isNewUser })));
    };
    return AddressFormPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressFormPage);


/***/ })

}]);
//# sourceMappingURL=cartAddressFormPage.js.map