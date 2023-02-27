(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_totalPayable"],{

/***/ "./browser/components/confirmation/common/CardComponents/components/ItemsList.js":
/*!***************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/ItemsList.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");




var ItemsList = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.productData.styles', []).map(function (style) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.itemsListContainer, "data-testid": "confirmation-itemsList" },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_3__.default, { src: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(style, 'styleImages.default.securedDomain')).concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(style, 'styleImages.default.resolutionFormula')), width: 33, height: 44, className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.itemImage }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.itemDesc },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_2__.default.brandName }, style.brandName),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, style.productDisplayName))));
    })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemsList);


/***/ }),

/***/ "./browser/components/confirmation/common/CardComponents/components/TotalPayable.js":
/*!******************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/TotalPayable.js ***!
  \******************************************************************************************/
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
/* harmony import */ var _ItemsList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ItemsList */ "./browser/components/confirmation/common/CardComponents/components/ItemsList.js");
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");
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





var TotalPayable = function (props) {
    var itemsCount = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.productData.styles', []).length;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "totalPayable", className: "".concat(props.styleClass, " ").concat(props.mode === 'desktop'
            ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desktopSubCardContainer
            : _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subcardContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subcardHeading, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.headerContainer, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.totalPayableHeader) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Total payable amount"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subCardSubHeading }, (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.pluralizeText)(itemsCount, "Paying for ".concat(itemsCount, " item")))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.payableAmount },
                    "\u20B9",
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.currencyValue)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.payments.amount') / 100)))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ItemsList__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, props))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalPayable);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_totalPayable.js.map