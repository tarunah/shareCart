(self["webpackChunk"] = self["webpackChunk"] || []).push([["addressFormMobile"],{

/***/ "./browser/components/address/mobile/AddressFormPage/index.js":
/*!********************************************************************!*\
  !*** ./browser/components/address/mobile/AddressFormPage/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressFormPage": () => (/* binding */ AddressFormPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _common_AddressForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/AddressForm */ "./browser/components/address/common/AddressForm/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "../node_modules/react-router/esm/react-router.js");
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
        if (this.props.addressInfo && this.props.addressInfo.id) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('EDIT ADDRESS');
        }
        else {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('ADD NEW ADDRESS');
        }
        this.props.setToContainerState({ action: 'back' });
    };
    /* If not navigating to Add/EditAddress from List page using initiatedFromAddressMain state prop to call goBack once,
    else work with normal flow(Address -> List page -> Edit/Add) and goBack twice.*/
    AddressFormPage.prototype.successCallback = function () {
        var _this = this;
        var location = this.props.location;
        var initiatedFromAddressMain = location && location.state
            ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(location, 'state.initiatedFromAddressMain')
            : false;
        this.props.setToContainerState({ action: '' }, function () {
            if (initiatedFromAddressMain ||
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isVariantEnabled)('AOC_V2_VARIANT3') ||
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('ORDER_REVIEW')) {
                _this.props.goBack(-1);
            }
            else {
                _this.props.goBack(-2);
            }
        });
    };
    AddressFormPage.prototype.render = function () {
        var _a = this.props, addressInfo = _a.addressInfo, loading = _a.loading, handleAddressAction = _a.handleAddressAction, cartData = _a.cartData;
        var isNewUser = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'userDetails.isFirstTimeCustomer', false);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_4__.default, { show: loading, backdrop: true }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_AddressForm__WEBPACK_IMPORTED_MODULE_5__.default, { isNewUser: isNewUser, successCallback: this.successCallback, addressInfo: addressInfo, handleAddressAction: handleAddressAction, mode: "mobile" })));
    };
    return AddressFormPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router__WEBPACK_IMPORTED_MODULE_6__.withRouter)(AddressFormPage));


/***/ })

}]);
//# sourceMappingURL=addressFormMobile.js.map