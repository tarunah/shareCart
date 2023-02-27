(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_trackOrders"],{

/***/ "./browser/components/confirmation/common/CardComponents/components/TrackOrders.js":
/*!*****************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/TrackOrders.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TrackOrdersModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TrackOrdersModule */ "./browser/components/confirmation/common/TrackOrdersModule/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ "./browser/components/confirmation/common/CardComponents/index.js");




var TrackOrders = function (props) {
    var data = props.dataState.data, styleClass = props.styleClass;
    var orderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId', '');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_TrackOrdersModule__WEBPACK_IMPORTED_MODULE_2__.default, { trackOrdersClass: styleClass, viewOrdersTriggerEvent: function () { return (0,_index__WEBPACK_IMPORTED_MODULE_3__.viewOrdersTriggerEvent)(orderId); }, storeOrderId: orderId }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackOrders);


/***/ }),

/***/ "./browser/components/confirmation/common/TrackOrdersModule/index.js":
/*!***************************************************************************!*\
  !*** ./browser/components/confirmation/common/TrackOrdersModule/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trackOrders.base.css */ "./browser/components/confirmation/common/TrackOrdersModule/trackOrders.base.css");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");




var TrackOrdersModule = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bagContainer, " ").concat(props.trackOrdersClass) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__.default.myntraBagIcon },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "shopping-bag", className: _trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__.default.shoppingBag })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__.default.subText },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Track & manage your orders easily"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _trackOrders_base_css__WEBPACK_IMPORTED_MODULE_1__.default.viewOrdersButton, onClick: props.viewOrdersTriggerEvent },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: "/my/order/details?storeOrderId=".concat(props.storeOrderId, "&fromConfirmation=true") }, "View Orders")))));
};
TrackOrdersModule.propTypes = {
    trackOrdersClass: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    storeOrderId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    viewOrdersTriggerEvent: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackOrdersModule);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_trackOrders.js.map