(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_updatesSent"],{

/***/ "../node_modules/@myntra/m-comp/react/SVGIcon/Mail.jsx":
/*!*************************************************************!*\
  !*** ../node_modules/@myntra/m-comp/react/SVGIcon/Mail.jsx ***!
  \*************************************************************/
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

var Mail = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", __assign({ width: 16, height: 11, viewBox: "0 0 16 11" }, props),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { d: "M1 .136c-.545 0-1 .454-1 1v8.5c0 .545.455 1 1 1h14c.545 0 1-.455 1-1v-8.5c0-.546-.455-1-1-1H1zm.852 1h12.296L8 6.472 1.852 1.136zM1 1.714L7.672 7.51a.501.501 0 00.656 0L15 1.714v7.922H1V1.714z", fill: "#282C3F", fillRule: "evenodd" })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mail);


/***/ }),

/***/ "../node_modules/@myntra/m-comp/react/SVGIcon/Phone.jsx":
/*!**************************************************************!*\
  !*** ../node_modules/@myntra/m-comp/react/SVGIcon/Phone.jsx ***!
  \**************************************************************/
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

var Phone = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", __assign({ width: 16, height: 16, viewBox: "0 0 16 16" }, props),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", { d: "M15.323 12.051l-1.491-1.491a1.531 1.531 0 00-1.098-.455c-.41 0-.804.16-1.098.455l-.5.5c-.51.509-2.08-.286-3.59-1.795-.732-.732-1.339-1.535-1.67-2.214-.187-.375-.446-1.062-.124-1.375l.5-.5c.294-.294.455-.678.455-1.098 0-.42-.16-.804-.455-1.098L4.76 1.489a1.548 1.548 0 00-2.196 0l-.982.99c-.571.563-1 1.724.16 4.01.769 1.509 2.081 3.232 3.715 4.866C7.904 13.8 10.823 15.8 12.823 15.8c.598 0 1.107-.179 1.509-.571l.991-.991a1.542 1.542 0 000-2.188zm-.491 1.688l-.991.99c-.768.768-2.33.143-3.196-.294-1.438-.732-3.108-2.009-4.688-3.58C2.61 7.506.94 4.123 2.082 2.98l.991-.991a.843.843 0 011.197 0l1.49 1.49a.844.844 0 010 1.197l-.5.5c-1.035 1.036.322 3.116 1.795 4.59 1.107 1.107 2.572 2.151 3.661 2.151.357 0 .67-.107.92-.366l.5-.5c.16-.16.375-.25.598-.25.223 0 .437.09.598.25l1.491 1.491c.33.34.33.875.009 1.197z", fill: "#282C3F", stroke: "#282C3F", strokeWidth: 0.2, fillRule: "evenodd" })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Phone);


/***/ }),

/***/ "./browser/components/confirmation/common/CardComponents/components/UpdatesSent.js":
/*!*****************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/UpdatesSent.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var iconComp_Phone_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/Phone.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Phone.jsx");
/* harmony import */ var iconComp_Mail_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/Mail.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Mail.jsx");
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");





var UpdatesSent = function (props) {
    var mail = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getProfileEmail)();
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "updatesSent", className: "".concat(props.styleClass, " ").concat(props.mode === 'desktop'
            ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desktopSubCardContainer
            : _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subcardContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subcardHeading }, "Updates sent to"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subcardDesc },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.updatesSentCardContact },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Phone_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.updatesSentCardIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getProfileMobile)())),
            mail ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Mail_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_4__.default.updatesSentCardIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, mail))) : null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdatesSent);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_updatesSent.js.map