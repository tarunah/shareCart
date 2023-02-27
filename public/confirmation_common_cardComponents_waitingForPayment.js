(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_waitingForPayment"],{

/***/ "../node_modules/@myntra/m-comp/react/SVGIcon/Waiting.jsx":
/*!****************************************************************!*\
  !*** ../node_modules/@myntra/m-comp/react/SVGIcon/Waiting.jsx ***!
  \****************************************************************/
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

var Waiting = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", __assign({ width: 40, height: 40, viewBox: "0 0 40 40" }, props),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("g", { fill: "none", fillRule: "evenodd" },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("circle", { cx: 20, cy: 20, r: 19.375, fill: "#FFF", stroke: "#FF5722", strokeWidth: 1.25 }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { fill: "#282C3F", fillRule: "nonzero", d: "M26.895 28.441h-1.164v-2.086c0-2.112-1.159-4.052-3.262-5.465-.262-.176-.425-.555-.425-.99 0-.435.163-.814.425-.99 2.103-1.413 3.262-3.353 3.262-5.465V11.36h1.164a.68.68 0 000-1.359H13.238a.68.68 0 000 1.359h1.164v2.087c0 2.11 1.159 4.051 3.263 5.464.261.176.424.555.424.99 0 .435-.163.814-.424.99-2.104 1.413-3.263 3.353-3.263 5.465v2.086h-1.164a.68.68 0 000 1.36h13.657a.68.68 0 000-1.36zm-11.134-2.086c0-2.219 1.667-3.67 2.66-4.337.643-.43 1.027-1.223 1.027-2.118 0-.895-.384-1.687-1.026-2.118-.994-.667-2.661-2.118-2.661-4.336v-2.087h8.611v2.087c0 2.218-1.667 3.669-2.66 4.336-.643.43-1.026 1.223-1.026 2.118 0 .895.383 1.687 1.025 2.118.994.668 2.661 2.118 2.661 4.337v2.086h-8.611v-2.086z" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { fill: "#FF5722", d: "M17.5 27.75h5c-.216-.579-.494-.996-.833-1.25-.234-.175-.737-.428-1.177-.757a3.416 3.416 0 01-.49-.493c-.195.23-.365.399-.51.507-.353.265-.85.513-1.157.743-.494.37-.772.787-.833 1.25zM16.25 13.75h7.5c-.325 1.158-.741 1.991-1.25 2.5-.35.35-1.106.856-1.765 1.515-.198.198-.443.526-.735.985-.293-.46-.548-.798-.764-1.014-.53-.53-1.276-1.026-1.736-1.486-.741-.741-1.158-1.575-1.25-2.5z" }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Waiting);


/***/ }),

/***/ "./browser/components/confirmation/common/CardComponents/components/WaitingForPayment.js":
/*!***********************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/WaitingForPayment.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var iconComp_Waiting_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Waiting.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Waiting.jsx");
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");






var WaitingForPayment = function (props) {
    var customContainerClass = props.mode === 'mobile' &&
        [
            commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingPlacedOrder,
            commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingCodNotElig
        ].indexOf(props.screenType) !== -1
        ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.soloCard
        : '';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "waitingForPaymentContainer", className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.waitingForPaymentContainer, " ").concat(customContainerClass) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Waiting_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.waitingIcon }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.statusCardHeading, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.desktopStatusCardHeading : '', " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.waitingForPaymentHeading) }, "Waiting for payment confirmation"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.statusCardDesc, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.desktopStatusCardDesc : '') }, "We are confirming payment status with your bank. It may take upto 20 minutes. In case you were not able to complete the payment, you can retry the payment now."),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_3__.default, { containerClassName: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.statusCardButtons, " ").concat(props.mode === 'desktop' ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_5__.default.desktopStatusCardButtons : ''), buttons: [
                {
                    text: props.screenType === commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingPlacedOrder
                        ? 'GO TO ORDERS'
                        : 'CANCEL ORDER',
                    type: 'secondary',
                    clickHandler: props.screenType === commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingPlacedOrder
                        ? commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.gotoOrders
                        : function () {
                            return props.actionHandlers.toggleConfirmationModal(props.getModalContent('WaitingForPayment_Cancel'));
                        }
                },
                {
                    text: 'RETRY PAYMENT',
                    clickHandler: function () {
                        return props.actionHandlers.toggleConfirmationModal(props.getModalContent('WaitingForPayment_Retry'));
                    }
                }
            ] })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaitingForPayment);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_waitingForPayment.js.map