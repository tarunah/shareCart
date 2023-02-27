(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_paymentSuccessful"],{

/***/ "./browser/components/confirmation/common/CardComponents/components/PaymentSuccessful.js":
/*!***********************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/PaymentSuccessful.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/ConfirmTick.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ConfirmTick.jsx");
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");




var PaymentSuccessful = function (props) {
    var amount = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_1__.getQueryParam)({ name: 'amount' });
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "paymentSuccessful", className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.statusCardContainer, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopStatusCardContainer : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.confirmTick }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.statusCardHeading, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopStatusCardHeading : '', " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.statusSuccessHeading) }, "Payment successful"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.statusCardDesc, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.paySuccessDesc, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopStatusCardDesc : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "We have received a payment"),
            amount ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " of"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_3__.default.paymentAmount }, " Rs. ".concat(amount, " ")))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " ")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "for your order. You will shortly get a email confirmation for this payment."))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentSuccessful);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_paymentSuccessful.js.map