(self["webpackChunk"] = self["webpackChunk"] || []).push([["giftwrapPage"],{

/***/ "./browser/components/cart/mobile/OptionsBlock/GiftWrap/GiftWrapPage/index.js":
/*!************************************************************************************!*\
  !*** ./browser/components/cart/mobile/OptionsBlock/GiftWrap/GiftWrapPage/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./giftWrapPage.base.css */ "./browser/components/cart/mobile/OptionsBlock/GiftWrap/GiftWrapPage/giftWrapPage.base.css");
/* harmony import */ var _common_GiftWrap_GiftWrapDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/GiftWrap/GiftWrapDetails */ "./browser/components/cart/common/GiftWrap/GiftWrapDetails/index.js");
/* harmony import */ var _common_GiftWrap_GiftWrapForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/GiftWrap/GiftWrapForm */ "./browser/components/cart/common/GiftWrap/GiftWrapForm/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");






var GiftWrapPage = function (props) {
    var details = props.data.giftOrder.data;
    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setDocTitleInMobile)('GIFT WRAP');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.imageContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "giftwrap-1", className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.img1 }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "giftwrap-2", className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.img2 })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.form },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_GiftWrap_GiftWrapForm__WEBPACK_IMPORTED_MODULE_3__.default, { details: details, showNotification: true, handleCartAction: props.handleCartAction, goBack: props.goBack })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapPage_base_css__WEBPACK_IMPORTED_MODULE_1__.default.moreDetails },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_GiftWrap_GiftWrapDetails__WEBPACK_IMPORTED_MODULE_2__.default, null)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftWrapPage);


/***/ })

}]);
//# sourceMappingURL=giftwrapPage.js.map