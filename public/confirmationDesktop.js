(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmationDesktop"],{

/***/ "./browser/components/confirmation/desktop/index.js":
/*!**********************************************************!*\
  !*** ./browser/components/confirmation/desktop/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _common_ConfirmationScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/ConfirmationScreen */ "./browser/components/confirmation/common/ConfirmationScreen/index.js");
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_ErrorPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ErrorPage */ "./browser/components/common/ErrorPage/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/confirmationCardsConfig */ "./browser/components/confirmation/common/confirmationCardsConfig.js");
/* harmony import */ var _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./desktop.base.css */ "./browser/components/confirmation/desktop/desktop.base.css");
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


// Local Components

//Common components



// Utils




// Styles

var ConfirmationComponent = /** @class */ (function (_super) {
    __extends(ConfirmationComponent, _super);
    function ConfirmationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.cardComponentRenderer = _this.cardComponentRenderer.bind(_this);
        _this.cardComponentsToDisplay = null;
        return _this;
    }
    ConfirmationComponent.prototype.componentDidMount = function () {
        SHELL.setActivePage(commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__.confirmationScreenTypeVSHeaderMap[this.props.screenType] || commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__.confirmationScreenTypeVSHeaderMap.default);
    };
    ConfirmationComponent.prototype.cardComponentRenderer = function (cards) {
        var _this = this;
        if (cards === void 0) { cards = []; }
        var showLoader = this.props.actionHandlers.showLoader;
        var orderedCards = [];
        cards.forEach(function (card) {
            var CardComponent = _common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_8__.confirmationSubComponentsConfig[card];
            CardComponent &&
                orderedCards.push(react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CardComponent, __assign({ key: card, getModalContent: (0,_common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_8__.modalContentGetter)(_this.props.actionHandlers), styleClass: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.confirmationCard, mode: 'desktop', showLoader: showLoader }, _this.props)));
        });
        return (this.cardComponentsToDisplay = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.confirmationCardContainer }, orderedCards)));
    };
    ConfirmationComponent.prototype.render = function () {
        var _a = this, cardComponentsToDisplay = _a.cardComponentsToDisplay, cardComponentRenderer = _a.cardComponentRenderer, _b = _a.props, dataState = _b.dataState, actionHandlers = _b.actionHandlers, screenType = _b.screenType;
        var _c = dataState.confirmationModal, showModal = _c.show, modalParams = _c.params, error = dataState.error;
        var showFallback = false;
        var showError = false;
        var unauthorized = false;
        if (error) {
            unauthorized = error.httpStatus === 403;
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('CONFIRMATION_FALLBACK') &&
                error.myntraReferer &&
                !unauthorized) {
                showFallback = true;
            }
            else {
                showError = true;
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, showError ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ErrorPage__WEBPACK_IMPORTED_MODULE_4__.default, { message: error.message || commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.errorMessage, reload: !unauthorized && error.myntraReferer })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("center", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.cardLayout },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.cardContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_ConfirmationScreen__WEBPACK_IMPORTED_MODULE_1__.default, { mode: "desktop", type: screenType, cardComponentsToDisplay: cardComponentsToDisplay, cardComponentRenderer: cardComponentRenderer, showFallback: showFallback, dataState: __assign({}, dataState), actionHandlers: __assign({}, actionHandlers) }),
                    showModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_3__.default, { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.modalContainer, halfCard: false, cancelCallback: function () {
                            return actionHandlers.toggleConfirmationModal({
                                eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE'
                            });
                        }, cancelIconConfig: { show: true } },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.modalHeader }, modalParams.header),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.modalDesc }, modalParams.bodyHeader),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _desktop_base_css__WEBPACK_IMPORTED_MODULE_9__.default.modalDesc }, modalParams.bodyDescription),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__.default, { buttons: modalParams.buttons }))))))))));
    };
    return ConfirmationComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ConfirmationComponent.propTypes = {
    dataState: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object),
    actionHandlers: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmationComponent);


/***/ }),

/***/ "./utils/loadComponent.js":
/*!********************************!*\
  !*** ./utils/loadComponent.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_Loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Loadable */ "./browser/components/common/Loadable/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
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





function loadComponent(_a) {
    var loader = _a.loader, loading = _a.loading, errorCallback = _a.errorCallback, _b = _a.loaderProperties, loaderProperties = _b === void 0 ? {} : _b;
    var _c = loaderProperties.show, show = _c === void 0 ? false : _c, _d = loaderProperties.backdrop, backdrop = _d === void 0 ? false : _d;
    return (0,commonComp_Loadable__WEBPACK_IMPORTED_MODULE_2__.default)({
        loader: loader,
        loading: loading ||
            (function (props) {
                if (props === void 0) { props = {}; }
                return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_1__.default, __assign({ show: show, backdrop: backdrop }, props));
            }),
        errorCallback: errorCallback ||
            (function () { return (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.errorNotification)({ message: commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.default.BUNDLE_LOAD_ERROR }); })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadComponent);


/***/ })

}]);
//# sourceMappingURL=confirmationDesktop.js.map