(self["webpackChunk"] = self["webpackChunk"] || []).push([["banner"],{

/***/ "./browser/components/common/Banner/index.js":
/*!***************************************************!*\
  !*** ./browser/components/common/Banner/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");


//Common Components

var Banner = function (_a) {
    var bannerURL = _a.bannerURL;
    return bannerURL ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_1__.default, { src: bannerURL, height: "auto", width: "auto", nonCloudinary: true })) : null;
};
Banner.propTypes = {
    bannerURL: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Banner);


/***/ })

}]);
//# sourceMappingURL=banner.js.map