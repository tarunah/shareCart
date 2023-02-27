(self["webpackChunk"] = self["webpackChunk"] || []).push([["errorPage"],{

/***/ "./browser/components/common/ErrorPage/index.js":
/*!******************************************************!*\
  !*** ./browser/components/common/ErrorPage/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorPage.base.css */ "./browser/components/common/ErrorPage/errorPage.base.css");




var onReload = function () { return window.location.reload(); };
var ErrorPage = function (_a) {
    var message = _a.message, _b = _a.reload, reload = _b === void 0 ? false : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "errorpage", className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.mainContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.subContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__.default, { name: "error" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorText }, message),
            reload && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _errorPage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.reload, onClick: onReload }, "Reload")))));
};
ErrorPage.defaultProps = {
    message: 'Something went wrong! Please reload.',
    reload: false
};
ErrorPage.propTypes = {
    message: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    reload: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorPage);


/***/ })

}]);
//# sourceMappingURL=errorPage.js.map