(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_confirmation_common_ConfirmationScreen_index_js-browser_components_confirm-ef0a4a"],{

/***/ "./browser/components/common/InlineButton/index.js":
/*!*********************************************************!*\
  !*** ./browser/components/common/InlineButton/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inlinebutton_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inlinebutton.base.css */ "./browser/components/common/InlineButton/inlinebutton.base.css");



var InlineButton = function (_a) {
    var button1 = _a.button1, button2 = _a.button2, _b = _a.containerClassName, containerClassName = _b === void 0 ? '' : _b, _c = _a.btnClassName, btnClassName = _c === void 0 ? '' : _c;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_inlinebutton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.actions, " ").concat(containerClassName) }, [button1, button2].map(function (btn, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_inlinebutton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.action, " ").concat(btnClassName), key: "inlineBtn".concat(i), onClick: btn.clickHandler },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", { className: "".concat(_inlinebutton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.actionButton, " ").concat(btn.className || '') }, btn.text))); })));
};
InlineButton.propTypes = {
    button1: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    button2: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    containerClassName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    btnClassName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InlineButton);


/***/ }),

/***/ "./browser/components/common/IntersectionObserverComponent/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/common/IntersectionObserverComponent/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");

/**
 * Lazy Load Sensor Component
 */
var IntersectionObserverComponent = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'data-sensor' : _b, _c = _a.options, options = _c === void 0 ? {} : _c, triggerAction = _a.triggerAction;
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var trigger = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(triggerAction);
    var isTriggered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    var _d = options.root, root = _d === void 0 ? null : _d, _e = options.rootMargin, rootMargin = _e === void 0 ? '0px' : _e, _f = options.threshold, threshold = _f === void 0 ? 0.1 : _f;
    if (!'IntersectionObserver' in window)
        return;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        trigger.current = triggerAction;
    }, [triggerAction]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            if (entry.isIntersecting && !isTriggered.current) {
                isTriggered.current = true;
                trigger.current();
            }
        }, {
            root: root,
            rootMargin: rootMargin,
            threshold: threshold
        });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return function () {
            if (ref.current)
                observer.unobserve(ref.current);
        };
    }, [ref]);
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: ref, id: id });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntersectionObserverComponent);


/***/ }),

/***/ "./browser/components/confirmation/common/A2HS/index.js":
/*!**************************************************************!*\
  !*** ./browser/components/confirmation/common/A2HS/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./a2hs.base.css */ "./browser/components/confirmation/common/A2HS/a2hs.base.css");
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







var Arrow = function () { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.arrow, src: "https://constant.myntassets.com/checkout/assets/img/edc1d35b-43a5-4a5b-ad1d-8b477746caaa1549896768222-arrow-up-2x.png", width: 92, height: 242 })); };
var AboutPWAContent = function () { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.aboutPWAlist },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: "https://constant.myntassets.com/checkout/assets/img/9aa9e922-68c5-4da7-aa34-4985dbf8a7c21550128447828-zap-2x.png", width: 18, height: 18 }),
        "It's Super Fast"),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.aboutPWAlist },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: "https://constant.myntassets.com/checkout/assets/img/e753c3fb-f38e-4a8e-a8cd-e2f5c6232d891550134928036-group-18-2x.png", width: 14, height: 19 }),
        "Easy To Access"),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.aboutPWAlist },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: "https://constant.myntassets.com/checkout/assets/img/7e394a90-3fa3-4ad8-b35a-4c202673ddce1550135018275-hard-drive-2x.png", width: 17, height: 13 }),
        "Saves Space"))); };
var InstallStep = function () { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
    "1. Tap",
    ' ',
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: "https://constant.myntassets.com/checkout/assets/img/616c6ca9-58be-4d37-a471-4b0b9ba5295f1552015636862-group-9-2x.png", width: 2, height: 9 }),
    ' ',
    "icon on the top right of the screen.")); };
var infoScreenContent = {
    instructionScreen: {
        aboutPWA: {
            heading: 'Enjoy app-like experience',
            content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(AboutPWAContent, null)
        },
        installSteps: {
            heading: 'How to add Myntra to homescreen ?',
            step1: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InstallStep, null),
            step2: '2. Select “Add to Home screen” from the menu.'
        }
    },
    installedScreen: {
        aboutPWA: {
            heading: 'Use Myntra from Homescreen',
            content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(AboutPWAContent, null)
        },
        installSteps: {
            heading: 'How to access Myntra from homescreen ?',
            step1: '1. Find the Myntra Web app on your homescreen.',
            step2: '2. Tap on Myntra icon.'
        }
    }
};
var InfoScreen = function (_a) {
    var close = _a.close;
    var installed = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isLocalStorageEnabled)() &&
        localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.PWA_INSTALLED) === 'true';
    var screenText = installed
        ? infoScreenContent.installedScreen
        : infoScreenContent.instructionScreen;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.screenContainer, onClick: close },
        !installed && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Arrow, null),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.aboutPWA },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.screenHeading }, screenText.aboutPWA.heading),
            screenText.aboutPWA.content),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.installSteps },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.screenHeading }, screenText.installSteps.heading),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.installStep }, screenText.installSteps.step1),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.installStep }, screenText.installSteps.step2)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_2__.default, { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.screenButton }, "OKAY, GOT IT")));
};
var A2HS = /** @class */ (function (_super) {
    __extends(A2HS, _super);
    function A2HS(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showInfoScreen: false
        };
        ['onButtonClick', 'toggleInfoScreen'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    A2HS.prototype.componentDidMount = function () {
        window.addEventListener('appinstalled', function () {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isLocalStorageEnabled)() &&
                localStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.PWA_INSTALLED, true);
            triggerEvent('A2HS_INSTALLED', {
                gaLabel: 'accept_from_browser_menu | thankyou_page'
            });
        });
    };
    A2HS.prototype.prompt = function () {
        var installed = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isLocalStorageEnabled)() &&
            localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.PWA_INSTALLED) === 'true';
        if (window.a2hs && !installed) {
            window.a2hs.prompt();
            this.prompted = true;
        }
        else {
            this.openInfoScreen();
        }
    };
    A2HS.prototype.onButtonClick = function () {
        triggerEvent('A2HS_WIDGET_CLICK');
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getChromeVersion)() <= 67) {
            !this.prompted ? this.prompt() : this.openInfoScreen();
        }
        else {
            this.prompt();
        }
    };
    A2HS.prototype.openInfoScreen = function () {
        var installed = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isLocalStorageEnabled)() &&
            localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.PWA_INSTALLED) === 'true';
        installed
            ? triggerEvent('A2HS_REMINDER_VIEW')
            : triggerEvent('A2HS_INSTALL_VIEW');
        this.toggleInfoScreen();
    };
    A2HS.prototype.toggleInfoScreen = function () {
        this.setState(function (prevState) { return ({ showInfoScreen: !prevState.showInfoScreen }); });
    };
    A2HS.prototype.render = function () {
        var a2hsConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('A2HS');
        var hide = !a2hsConfig.enable ||
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isApp)() ||
            !(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isChromeBrowser)() ||
            ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isLocalStorageEnabled)() &&
                localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.HIDE_A2HS) === 'true');
        return !hide ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(this.props.className || '', " ").concat(this.props.styleClass) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.container },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__.default, { name: "mobile-exp", className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.image }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.content },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.header }, a2hsConfig.content.heading),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.desc }, a2hsConfig.content.desc),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_2__.default, { className: _a2hs_base_css__WEBPACK_IMPORTED_MODULE_6__.default.button, onClick: this.onButtonClick }, a2hsConfig.content.button))),
            this.state.showInfoScreen && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InfoScreen, { close: this.toggleInfoScreen })))) : null;
    };
    return A2HS;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (A2HS);


/***/ }),

/***/ "./browser/components/confirmation/common/AddSizePreferences/index.js":
/*!****************************************************************************!*\
  !*** ./browser/components/confirmation/common/AddSizePreferences/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addSizePreferences.base.css */ "./browser/components/confirmation/common/AddSizePreferences/addSizePreferences.base.css");
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



var updateNow = function (_a) {
    var articleType = _a.articleType, gender = _a.gender, profileId = _a.profileId, profileName = _a.profileName, productName = _a.productName, styleId = _a.styleId, subCategory = _a.subCategory;
    var url = "/size-finder?parent=ORDER_CONFIRMATION&sizeFinderRoute=cart&articleType=".concat(articleType, "&gender=").concat(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.genderMap[gender], "&productName=").concat(productName, "&styleId=").concat(styleId, "&subCategory=").concat(subCategory);
    if (profileId && profileName) {
        url += "&pidx=".concat(profileId, "&editProfile=").concat(profileName);
    }
    SHELL.redirectTo(url);
};
var AddSizePreferences = function (_a) {
    var product = _a.product, profile = _a.profile;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: "https://constant.myntassets.com/checkout/assets/img/sizeFinder.png", width: 60, height: 60 }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__.default.textContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__.default.textHeading }, "Add ".concat(product.subCategory, " Size Preferences")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__.default.textDesc }, "To recommend the right size on your next purchase"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addSizePreferences_base_css__WEBPACK_IMPORTED_MODULE_2__.default.updateButton, onClick: function () { return updateNow(__assign(__assign({}, product), profile)); } }, "UPDATE NOW"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddSizePreferences);


/***/ }),

/***/ "./browser/components/confirmation/common/CardComponents/index.js":
/*!************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsiderSuperCoinWidget": () => (/* binding */ InsiderSuperCoinWidget),
/* harmony export */   "FitAssist": () => (/* binding */ FitAssist),
/* harmony export */   "A2HS": () => (/* reexport safe */ _A2HS__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "PastOrderSavingsModule": () => (/* binding */ PastOrderSavingsModule),
/* harmony export */   "Rating": () => (/* binding */ Rating),
/* harmony export */   "TrackOrders": () => (/* binding */ TrackOrders),
/* harmony export */   "PromoOffer": () => (/* binding */ PromoOffer),
/* harmony export */   "PromoOfferDesktop": () => (/* binding */ PromoOfferDesktop),
/* harmony export */   "ContinueShopping": () => (/* binding */ ContinueShopping),
/* harmony export */   "MoreBelow": () => (/* binding */ MoreBelow),
/* harmony export */   "viewOrdersTriggerEvent": () => (/* binding */ viewOrdersTriggerEvent),
/* harmony export */   "ExchangeInfoWidget": () => (/* binding */ ExchangeInfoWidget),
/* harmony export */   "OrderConfirmedDesktop": () => (/* binding */ OrderConfirmedDesktop),
/* harmony export */   "WaitingForPayment": () => (/* binding */ WaitingForPayment),
/* harmony export */   "PaymentPendingNote": () => (/* binding */ PaymentPendingNote),
/* harmony export */   "OrderPlacedAsPOD": () => (/* binding */ OrderPlacedAsPOD),
/* harmony export */   "PaymentSuccessful": () => (/* binding */ PaymentSuccessful),
/* harmony export */   "ItemsPaid": () => (/* binding */ ItemsPaid),
/* harmony export */   "UpdatesSent": () => (/* binding */ UpdatesSent),
/* harmony export */   "SuccessCTA": () => (/* binding */ SuccessCTA),
/* harmony export */   "TotalPayable": () => (/* binding */ TotalPayable),
/* harmony export */   "PayAtConvenience": () => (/* binding */ PayAtConvenience),
/* harmony export */   "ViewOrder": () => (/* binding */ ViewOrder),
/* harmony export */   "Header": () => (/* reexport safe */ _Header__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "Footer": () => (/* reexport safe */ _Footer__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "DeliveryDetailsWidget": () => (/* binding */ DeliveryDetailsWidget),
/* harmony export */   "FeedbackSurveyWidget": () => (/* reexport safe */ _FeedbackSurveyWidget__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "onClickTriggerEvent": () => (/* binding */ onClickTriggerEvent),
/* harmony export */   "ScratchCardBanner": () => (/* binding */ ScratchCardBanner),
/* harmony export */   "NotifWidget": () => (/* binding */ NotifWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_BannerConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/BannerConfigManager */ "./utils/BannerConfigManager/index.js");
/* harmony import */ var commonUtils_BannerConfigManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_BannerConfigManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationHelper */ "./browser/utils/ConfirmationHelper/index.js");
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var _A2HS__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../A2HS */ "./browser/components/confirmation/common/A2HS/index.js");
/* harmony import */ var _FitAssistModule__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../FitAssistModule */ "./browser/components/confirmation/common/FitAssistModule/index.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Header */ "./browser/components/confirmation/common/Header/index.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Footer */ "./browser/components/confirmation/common/Footer/index.js");
/* harmony import */ var _InsiderSuperCoinWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../InsiderSuperCoinWidget */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/index.js");
/* harmony import */ var _FeedbackSurveyWidget__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../FeedbackSurveyWidget */ "./browser/components/confirmation/common/FeedbackSurveyWidget/index.js");
/* harmony import */ var _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cardComponents.base.css */ "./browser/components/confirmation/common/CardComponents/cardComponents.base.css");
/* harmony import */ var iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! iconComp/Check.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Check.jsx");
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");
/* harmony import */ var iconComp_MagicWand_jsx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! iconComp/MagicWand.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/MagicWand.jsx");
/* harmony import */ var iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! iconComp/ChevronDown.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronDown.jsx");
/* harmony import */ var iconComp_ItemPack_jsx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! iconComp/ItemPack.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ItemPack.jsx");
/* harmony import */ var iconComp_ItemHandOver_jsx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! iconComp/ItemHandOver.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ItemHandOver.jsx");
/* harmony import */ var iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! iconComp/ConfirmTick.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ConfirmTick.jsx");
/* harmony import */ var iconComp_Notification_jsx__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! iconComp/Notification.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Notification.jsx");
/* harmony import */ var _SlickCarousel__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../SlickCarousel */ "./browser/components/confirmation/common/SlickCarousel/index.js");
/* harmony import */ var commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! commonBrowserUtils/JSBridgeHelper */ "./browser/utils/JSBridgeHelper.js");
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





























var PastOrderSavingsModule = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_pastOrderSavingsModule */[__webpack_require__.e("styles-browser_components_confirmation_common_PastOrderSavingsModule_pastOrderSavingsModule_b-1e94eb"), __webpack_require__.e("confirmation_common_cardComponents_pastOrderSavingsModule")]).then(__webpack_require__.bind(__webpack_require__, /*! ../PastOrderSavingsModule */ "./browser/components/confirmation/common/PastOrderSavingsModule/index.js"));
    },
    loaderProperties: { backdrop: true }
});
var Rating = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_rating */[__webpack_require__.e("styles-browser_components_confirmation_common_RatingModule_myntraExp_base_css"), __webpack_require__.e("confirmation_common_cardComponents_rating")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/Rating */ "./browser/components/confirmation/common/CardComponents/components/Rating.js"));
    },
    loaderProperties: { backdrop: true }
});
var TrackOrders = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_trackOrders */[__webpack_require__.e("styles-browser_components_confirmation_common_TrackOrdersModule_trackOrders_base_css"), __webpack_require__.e("confirmation_common_cardComponents_trackOrders")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TrackOrders */ "./browser/components/confirmation/common/CardComponents/components/TrackOrders.js"));
    },
    loaderProperties: { backdrop: true }
});
var WaitingForPayment = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | confirmation_common_cardComponents_waitingForPayment */ "confirmation_common_cardComponents_waitingForPayment").then(__webpack_require__.bind(__webpack_require__, /*! ./components/WaitingForPayment */ "./browser/components/confirmation/common/CardComponents/components/WaitingForPayment.js"));
    },
    loaderProperties: { backdrop: true }
});
var PaymentPendingNote = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_paymentPendingNote */[__webpack_require__.e("styles-browser_components_confirmation_common_ConveniencePay_conveniencePay_base_css"), __webpack_require__.e("confirmation_common_cardComponents_paymentPendingNote")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PaymentPendingNote */ "./browser/components/confirmation/common/CardComponents/components/PaymentPendingNote.js"));
    },
    loaderProperties: { backdrop: true }
});
var OrderPlacedAsPOD = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_orderPlacedAsPOD */[__webpack_require__.e("styles-browser_components_confirmation_common_ConveniencePay_conveniencePay_base_css"), __webpack_require__.e("confirmation_common_cardComponents_orderPlacedAsPOD")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/OrderPlacedAsPOD */ "./browser/components/confirmation/common/CardComponents/components/OrderPlacedAsPOD.js"));
    },
    loaderProperties: { backdrop: true }
});
var PaymentSuccessful = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | confirmation_common_cardComponents_paymentSuccessful */ "confirmation_common_cardComponents_paymentSuccessful").then(__webpack_require__.bind(__webpack_require__, /*! ./components/PaymentSuccessful */ "./browser/components/confirmation/common/CardComponents/components/PaymentSuccessful.js"));
    },
    loaderProperties: { backdrop: true }
});
var ItemsPaid = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | confirmation_common_cardComponents_itemsPaid */ "confirmation_common_cardComponents_itemsPaid").then(__webpack_require__.bind(__webpack_require__, /*! ./components/ItemsPaid */ "./browser/components/confirmation/common/CardComponents/components/ItemsPaid.js"));
    },
    loaderProperties: { backdrop: true }
});
var UpdatesSent = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | confirmation_common_cardComponents_updatesSent */ "confirmation_common_cardComponents_updatesSent").then(__webpack_require__.bind(__webpack_require__, /*! ./components/UpdatesSent */ "./browser/components/confirmation/common/CardComponents/components/UpdatesSent.js"));
    },
    loaderProperties: { backdrop: true }
});
var TotalPayable = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return __webpack_require__.e(/*! import() | confirmation_common_cardComponents_totalPayable */ "confirmation_common_cardComponents_totalPayable").then(__webpack_require__.bind(__webpack_require__, /*! ./components/TotalPayable */ "./browser/components/confirmation/common/CardComponents/components/TotalPayable.js"));
    },
    loaderProperties: { backdrop: true }
});
var ViewOrder = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_viewOrder */[__webpack_require__.e("styles-browser_components_confirmation_common_ConveniencePay_conveniencePay_base_css"), __webpack_require__.e("confirmation_common_cardComponents_viewOrder")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ViewOrder */ "./browser/components/confirmation/common/CardComponents/components/ViewOrder.js"));
    },
    loaderProperties: { backdrop: true }
});
var PayAtConvenience = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_payAtConvenience */[__webpack_require__.e("styles-browser_components_confirmation_common_ConveniencePay_conveniencePay_base_css"), __webpack_require__.e("confirmation_common_cardComponents_payAtConvenience")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PayAtConvenience */ "./browser/components/confirmation/common/CardComponents/components/PayAtConvenience.js"));
    },
    loaderProperties: { backdrop: true }
});
var ScratchCardBanner = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_cardComponents_scratchCardBanner */[__webpack_require__.e("styles-browser_components_common_Confetti_confetti_css-browser_components_confirmation_common-84fdee"), __webpack_require__.e("confirmation_common_cardComponents_scratchCardBanner")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ScratchCardBanner */ "./browser/components/confirmation/common/CardComponents/components/ScratchCardBanner.js"));
    },
    loaderProperties: { backdrop: true }
});
var FitAssist = function (props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_FitAssistModule__WEBPACK_IMPORTED_MODULE_13__.default, __assign({ fitAssistClass: props.styleClass }, props));
};
var viewOrdersTriggerEvent = function (orderId) {
    triggerEvent('ORDER_CONFIRM_VIEW_ORDERS', {
        maData: {
            entity_id: orderId,
            entity_type: 'order'
        },
        custom: {
            widget: {
                name: 'view_orders',
                type: 'button'
            },
            event_type: 'widgetClick',
            event_category: 'Order Confirmation Page'
        }
    });
};
var onOfferClick = function (url, showLoader) {
    triggerEvent('PARTNER_BANNER_CLICKED', {
        gaLabel: url
    });
    typeof showLoader === 'function' && showLoader();
};
var onContinueShoppingClick = function () {
    // this handler function is not working for iOS, commenting out till it is fixed from app side
    // if (
    //   typeof webkit !== 'undefined' &&
    //   typeof get(webkit, 'messageHandlers.handleDonePress.postMessage') ===
    //     'function'
    // ) {
    //   webkit.messageHandlers.handleDonePress.postMessage();
    //   return;
    // }
    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.gotoHomePage)();
};
var PromoOffer = function (props) {
    var promoOfferConfig = (0,commonUtils_BannerConfigManager__WEBPACK_IMPORTED_MODULE_4__.getBannerConfigValue)('PROMOTIONAL_OFFER');
    if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'enabled') === false) {
        return null;
    }
    var promoOffers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'offers', []);
    var slideInterval = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'slideInterval', 2000);
    var promoBlockClass = "".concat(props.styleClass, " ");
    promoOffers.length > 1 && (promoBlockClass += _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.carouselPromoBlock);
    return promoOffers.length >= 1 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: promoBlockClass },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SlickCarousel__WEBPACK_IMPORTED_MODULE_27__.default, { slideInterval: slideInterval }, promoOffers.map(function (_a, index) {
            var image = _a.image, url = _a.url;
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "promoOffer-".concat(index), key: "promoOffer-".concat(index), className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.promoOffer, onClick: function () { return onOfferClick(url, props.showLoader); } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: url },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.promoOfferImage, src: image }))));
        })))) : null;
};
var PromoOfferDesktop = function (props) {
    var promoOfferConfig = (0,commonUtils_BannerConfigManager__WEBPACK_IMPORTED_MODULE_4__.getBannerConfigValue)('PROMOTIONAL_OFFER');
    if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'enabled') === false) {
        return null;
    }
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'offers.0') ? 0 : -1), selectedPromoOffer = _a[0], setSelectedOffer = _a[1];
    var selectPromoOffer = function (e) {
        var action = e.currentTarget.getAttribute('data-action');
        var nextIndex = action === 'next' ? selectedPromoOffer + 1 : selectedPromoOffer - 1;
        setSelectedOffer(nextIndex);
    };
    var promoOffers = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(promoOfferConfig, 'offers') || []).filter(function (obj) { return !obj.disabledForDesktop; });
    var prevOfferDisabled = selectedPromoOffer === 0;
    var nextOfferDisabled = selectedPromoOffer === promoOffers.length - 1;
    return selectedPromoOffer !== -1 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.desktopSubCardContainer, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.promoOfferBlockDesktop) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_20__.default, { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.prevArrow, " ").concat(prevOfferDisabled ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.disabled : ''), "data-action": "previous", onClick: prevOfferDisabled ? null : selectPromoOffer }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.offers }, promoOffers.map(function (_a, index) {
            var image = _a.image, url = _a.url;
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "promoOffer-".concat(index), key: "promoOffer-".concat(index), className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.promoOfferDesktop, " ").concat(selectedPromoOffer !== index ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.hide : ''), "data-url": url, onClick: function () { return onOfferClick(url); } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: url },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.promoOfferImageDesktop, src: image }))));
        })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_20__.default, { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.nextArrow, " ").concat(nextOfferDisabled ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.disabled : ''), "data-action": "next", onClick: nextOfferDisabled ? null : selectPromoOffer }))) : null;
};
var ContinueShopping = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.continueShoppingContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.continueShoppingCaption },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Keep creating your wardrobe")),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_10__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.continueShoppingButton, onClick: onContinueShoppingClick }, "CONTINUE SHOPPING")));
};
var MoreBelow = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "moreBelow", className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.seeMoreContainer, onClick: props.moreBelowClickHandler },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.seeMoreText }, "More Below"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_22__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.arrowIcon })));
};
var InsiderSuperCoinWidget = function (props) {
    if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('CONFIRMATION_INSIDER_SUPERCOIN'))
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_InsiderSuperCoinWidget__WEBPACK_IMPORTED_MODULE_16__.default, __assign({ insiderSuperCoinClass: props.styleClass }, props)));
    return null;
};
var ExchangeInfoWidget = function (props) {
    var items = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.items') || [];
    if (!items.some(function (obj) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(obj, 'flags.isOpenEndedExchangeOrder'); })) {
        return null;
    }
    var _a = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('STYLE_EXCHANGE'), 'confirm') || {}, header = _a.header, _b = _a.steps, steps = _b === void 0 ? [] : _b;
    var IconComponents = {
        ItemHandOver: iconComp_ItemHandOver_jsx__WEBPACK_IMPORTED_MODULE_24__.default,
        ItemPack: iconComp_ItemPack_jsx__WEBPACK_IMPORTED_MODULE_23__.default
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.exchangeContainer, " ").concat(props.styleClass) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.headerContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.header }, "What Next?"),
            header),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.stepContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.checkIconContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_19__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.checkIcon })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.greenText }, "Exchange Request Submitted")),
            steps.map(function (obj, i) {
                var SVGIcon = IconComponents[obj.icon];
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.stepContainer, key: "steps_".concat(i) },
                    i + 1 < steps.length && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.dashedStep }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.iconContainer }, i + 1),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.text }, obj.text),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(SVGIcon, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.iconImage })));
            }))));
};
var OrderConfirmedDesktop = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.statusCardContainer, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.desktopStatusCardContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_25__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.confirmTick }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.statusCardHeading, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.desktopStatusCardHeading, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.statusSuccessHeading) }, "Order confirmed"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.statusCardDesc, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.desktopStatusCardDesc) }, "Your order is confirmed. You will receive an order confirmation email/SMS shortly with the expected delivery date for your items.")));
};
var isNotifWidgetEnabled = function () {
    var _a = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('CONFIRMATION_PAGE_CONFIG'), 'notifWidgetSwitch'), androidEnabled = _a.androidEnabled, iOSEnabled = _a.iOSEnabled;
    var notifEnabledCookieVal = parseInt((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__.cookieKeys.NOTIFICATION_ENABLED));
    return (!isNaN(notifEnabledCookieVal) &&
        !Boolean(notifEnabledCookieVal) &&
        ((androidEnabled && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isAndroidApp)()) || (iOSEnabled && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isIOSApp)())));
};
var triggerWidgetLoadEvent = function () {
    triggerEvent('ORDER_CONFIRM_LOAD_NOTIF_WIDGET', {
        custom: {
            widget: {
                name: 'load_notif_widget',
                type: 'button'
            },
            event_category: 'Order Confirmation Page'
        }
    });
};
var triggerWidgetClickEvent = function () {
    triggerEvent('ORDER_CONFIRM_CLICK_NOTIF_WIDGET', {
        custom: {
            widget: {
                name: 'click_notif_widget',
                type: 'button'
            },
            event_category: 'Order Confirmation Page'
        }
    });
};
var handleNotificationSettingClick = function () {
    triggerWidgetClickEvent();
    if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isAndroidApp)()) {
        commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_28__.AndroidBridgeHelper.openAppSettings();
    }
    else if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isIOSApp)()) {
        commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_28__.IOSBridgeHelper.openAppSettings();
    }
};
var NotifWidget = function (props) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        isNotifWidgetEnabled() && triggerWidgetLoadEvent();
    }, []);
    return (isNotifWidgetEnabled() && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.notifSection) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Notification_jsx__WEBPACK_IMPORTED_MODULE_26__.default, null),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.notifInfo }, "Get live updates about your orders."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.notifLinkButton, onClick: handleNotificationSettingClick },
                "TURN ON NOTIFICATIONS",
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_20__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.iconRight }))))));
};
var onClickTriggerEvent = function (eventName, orderDetails) {
    var payload = {
        custom: {
            custom: {
                v1: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderDetails, 'storeOrderId')
            }
        }
    };
    triggerEvent(eventName, payload);
};
var SuccessCTA = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_11__.default, { containerClassName: props.mode === 'desktop'
            ? _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.successCTAContainerDesktop
            : _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.subcardContainer, buttons: [
            {
                text: 'CONTINUE SHOPPING',
                type: 'secondary',
                clickHandler: onContinueShoppingClick
            },
            {
                text: props.screenType === commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__.confirmationScreenTypes.paySuccess
                    ? 'GO TO ORDERS'
                    : 'VIEW ORDER',
                className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.primaryCTAButton,
                clickHandler: props.screenType === commonUtils_constants__WEBPACK_IMPORTED_MODULE_6__.confirmationScreenTypes.paySuccess
                    ? commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.gotoOrders
                    : (0,commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_8__.getViewOrder)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.storeOrderId'))
            }
        ] }));
};
var DeliveryDetailsWidget = function (props) {
    var delivery = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.delivery');
    if (!delivery || lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(delivery)) {
        return null;
    }
    var name = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'user.name') || '';
    var mobile = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'user.mobile') || '';
    var streetAddress = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'streetAddress') || '';
    var locality = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'locality') || '';
    var city = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'city') || '';
    var state = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'state.name') || '';
    var pincode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(delivery, 'pincode') || '';
    var storeOrderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.storeOrderId') || '';
    var link = "/my/item/details?storeOrderId=".concat(storeOrderId);
    var _a = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('CONFIRMATION_PAGE_CONFIG'), 'deliveryInfo'), icon = _a.icon, note = _a.note;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.styleClass, " ").concat(_cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliveryContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliveryTopSection },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliveryInfo },
                "Delivering to:",
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliverHeader },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliverName }, name),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, " | ".concat(mobile))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliverAddress }, "".concat(streetAddress, ", ").concat(locality, ", ").concat(city, ", ").concat(state, "- ").concat(pincode)),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.orderDetailsButton, href: link, onClick: function () {
                        triggerEvent('ORDER_DETAILS_BTN_CLICK', {
                            custom: { custom: { v1: storeOrderId } }
                        });
                    } }, "ORDER DETAILS ",
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_20__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.iconRight }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.orderDetailsIcon, src: icon })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.deliveryFooter },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_MagicWand_jsx__WEBPACK_IMPORTED_MODULE_21__.default, { className: _cardComponents_base_css__WEBPACK_IMPORTED_MODULE_18__.default.wand }),
            note)));
};



/***/ }),

/***/ "./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenComponents.js":
/*!***************************************************************************************************!*\
  !*** ./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenComponents.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Screen": () => (/* binding */ Screen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _common_CouponBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/CouponBanner */ "./browser/components/confirmation/common/CouponBanner/index.js");
/* harmony import */ var _SuccessAnimation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SuccessAnimation */ "./browser/components/confirmation/common/SuccessAnimation/index.js");
/* harmony import */ var _CardComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CardComponents */ "./browser/components/confirmation/common/CardComponents/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _confirmationScreen_base_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./confirmationScreen.base.css */ "./browser/components/confirmation/common/ConfirmationScreen/confirmationScreen.base.css");
/* harmony import */ var commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/JSBridgeHelper */ "./browser/utils/JSBridgeHelper.js");












var chromeVersion = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getChromeVersion)();
var CardWrapper = function (_a) {
    var cards = _a.cards, cardComponentsToDisplay = _a.cardComponentsToDisplay, cardComponentRenderer = _a.cardComponentRenderer, children = _a.children;
    var storeOrderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_7__.getQueryParam)({
        name: 'orderid',
        optionalNames: ['orderId', 'storeOrderId']
    });
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _confirmationScreen_base_css__WEBPACK_IMPORTED_MODULE_10__.default.confirmationComp },
        children,
        cardComponentsToDisplay || cardComponentRenderer(cards, false),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "tfc-order-notify", "data-userid": (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUidx)(), "data-orderid": storeOrderId })));
};
var Screen = function (_a) {
    var type = _a.type, mode = _a.mode, cards = _a.cards, showFallback = _a.showFallback, fallbackCards = _a.fallbackCards, cardComponentsToDisplay = _a.cardComponentsToDisplay, cardComponentRenderer = _a.cardComponentRenderer, _b = _a.dataState, data = _b.data, loading = _b.loading, showMoreBelow = _b.showMoreBelow, moreBelowClickHandler = _a.actionHandlers.moreBelowClickHandler;
    if (data) {
        var extraComponentsToRender = react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__.default, { show: loading, backdrop: true });
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
            if (cards.indexOf('ScratchCardBanner') === -1 &&
                (!type ||
                    type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.confirmationScreenTypes.orderSuccess ||
                    type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.confirmationScreenTypes.paySuccessCodUserConsent)) {
                var rewardState = 'REWARD_NOT_SHOWN';
                if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isAndroidApp)()) {
                    commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_11__.AndroidBridgeHelper.onRewardFlowDone(rewardState);
                }
                else if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isIOSApp)()) {
                    commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_11__.IOSBridgeHelper.onRewardFlowDone({ rewardState: rewardState });
                }
            }
        }, []);
        if (!type || type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.confirmationScreenTypes.orderSuccess) {
            var storeOrderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId');
            var showAnimation = mode === 'mobile' &&
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isSessionStorageEnabled)() &&
                !window.sessionStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.sessionStorageKeys.STOREID_LOADED(storeOrderId)) &&
                (!chromeVersion || chromeVersion > 43);
            var deliveryPreferenceEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('DELIVERY_PREFERENCE');
            var deliveryPreference = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.DELIVERY_PREFERENCE_COOKIE);
            if (deliveryPreferenceEnabled && typeof deliveryPreference === 'string') {
                var orderID = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId');
                triggerEvent('DELIVERY_PREFERENCE_ORDER', {
                    maData: {
                        entity_type: 'order',
                        entity_name: deliveryPreference,
                        entity_id: orderID
                    }
                });
                // Remove delivery preference cookie on confirmation
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.DELIVERY_PREFERENCE_COOKIE, '', 0);
                // Remove auto credit apply off cookie on confirmation
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE, '', 0);
            }
            extraComponentsToRender = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__.default, { show: loading, backdrop: true }),
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('CONFIRMATION_COUPON_BANNER') && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_CouponBanner__WEBPACK_IMPORTED_MODULE_3__.default, { mode: mode })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: !showMoreBelow ? _confirmationScreen_base_css__WEBPACK_IMPORTED_MODULE_10__.default.invisible : '' },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardComponents__WEBPACK_IMPORTED_MODULE_5__.MoreBelow, { moreBelowClickHandler: moreBelowClickHandler })),
                showAnimation && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SuccessAnimation__WEBPACK_IMPORTED_MODULE_4__.default, null)));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CardWrapper, { cardComponentsToDisplay: cardComponentsToDisplay, cardComponentRenderer: cardComponentRenderer, cards: cards, mode: mode }, extraComponentsToRender));
    }
    else if (showFallback) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CardWrapper, { cardComponentsToDisplay: cardComponentsToDisplay, cardComponentRenderer: cardComponentRenderer, cards: fallbackCards, mode: mode }));
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_2__.default, { show: loading, backdrop: true });
    }
};



/***/ }),

/***/ "./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenConfig.js":
/*!***********************************************************************************************!*\
  !*** ./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenConfig.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardsGetter": () => (/* binding */ cardsGetter),
/* harmony export */   "fallbackCardsGetter": () => (/* binding */ fallbackCardsGetter)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;



var getDefaultConfig = function (mode) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('CONFIRMATION_PAGE_CONFIG'), "widgets.".concat(mode));
};
var TYPE_GETCARDS_MAP = (_a = {},
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.orderSuccess] = function (mode) {
        return mode === 'desktop'
            ? __spreadArray(['OrderConfirmedDesktop'], getDefaultConfig(mode), true) : getDefaultConfig(mode);
    },
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payFailOrderSuccess] = function (mode) {
        var list = __spreadArray(['OrderPlacedAsPOD'], getDefaultConfig(mode), true);
        if (list.includes('ScratchCardBanner')) {
            list.splice(list.indexOf('ScratchCardBanner'), 1);
        }
        return list;
    },
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingCodElig] = function () { return [
        'WaitingForPayment',
        'PaymentPendingNote'
    ]; },
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingCodNotElig] = function () { return ['WaitingForPayment']; },
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingPlacedOrder] = function () { return ['WaitingForPayment']; },
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.paySuccess] = function () { return [
        'PaymentSuccessful',
        'UpdatesSent',
        'SuccessCTA'
    ]; },
    _a.default = function (mode) {
        return mode === 'desktop'
            ? __spreadArray(['OrderConfirmedDesktop'], getDefaultConfig(mode), true) : getDefaultConfig(mode);
    },
    _a);
var TYPE_GETFALLBACKCARDS_MAP = (_b = {},
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.orderSuccess] = function (mode) {
        return mode === 'mobile'
            ? ['Header', 'TrackOrders', 'ContinueShopping', 'Footer']
            : ['OrderConfirmedDesktop', 'SuccessCTA'];
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payFailOrderSuccess] = function (mode) {
        return mode === 'mobile'
            ? [
                'OrderPlacedAsPOD',
                'DeliveryDetailsWidget',
                'NotifWidget',
                'ContinueShopping',
                'Footer'
            ]
            : ['OrderPlacedAsPOD', 'DeliveryDetailsWidget', 'SuccessCTA'];
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingCodElig] = function () { return [
        'WaitingForPayment',
        'PaymentPendingNote'
    ]; },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingCodNotElig] = function () { return ['WaitingForPayment']; },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.payPendingPlacedOrder] = function () { return ['WaitingForPayment']; },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.confirmationScreenTypes.paySuccess] = function () { return [
        'PaymentSuccessful',
        'UpdatesSent',
        'SuccessCTA'
    ]; },
    _b.default = function (mode) {
        return mode === 'mobile'
            ? ['Header', 'TrackOrders', 'ContinueShopping', 'Footer']
            : ['OrderConfirmedDesktop', 'SuccessCTA'];
    },
    _b);
var cardsGetter = function (type) {
    return TYPE_GETCARDS_MAP[type] || TYPE_GETCARDS_MAP.default;
};
var fallbackCardsGetter = function (type) {
    return TYPE_GETFALLBACKCARDS_MAP[type] || TYPE_GETFALLBACKCARDS_MAP.default;
};


/***/ }),

/***/ "./browser/components/confirmation/common/ConfirmationScreen/index.js":
/*!****************************************************************************!*\
  !*** ./browser/components/confirmation/common/ConfirmationScreen/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _confirmationScreenComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmationScreenComponents */ "./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenComponents.js");
/* harmony import */ var _confirmationScreenConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./confirmationScreenConfig */ "./browser/components/confirmation/common/ConfirmationScreen/confirmationScreenConfig.js");
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



var ConfirmationScreen = function (props) {
    var getCards = (0,_confirmationScreenConfig__WEBPACK_IMPORTED_MODULE_2__.cardsGetter)(props.type);
    var getFallbackCards = (0,_confirmationScreenConfig__WEBPACK_IMPORTED_MODULE_2__.fallbackCardsGetter)(props.type);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_confirmationScreenComponents__WEBPACK_IMPORTED_MODULE_1__.Screen, __assign({ cards: getCards(props.mode), fallbackCards: getFallbackCards(props.mode) }, props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmationScreen);


/***/ }),

/***/ "./browser/components/confirmation/common/CouponBanner/index.js":
/*!**********************************************************************!*\
  !*** ./browser/components/confirmation/common/CouponBanner/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CouponBanner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./couponBanner.base.css */ "./browser/components/confirmation/common/CouponBanner/couponBanner.base.css");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);



// utils

function CouponBanner(_a) {
    var mode = _a.mode;
    var couponConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('CONFIRMATION_COUPON_BANNER');
    var isMobile = mode === 'mobile';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container, " ").concat(!isMobile ? _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.desktop : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.headerContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.header }, lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(couponConfig, 'header')),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.subHeader }, "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(couponConfig, 'validText'), " "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.boldText }, lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(couponConfig, 'validDate')))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.coupon },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponLine, " ").concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.line1) }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponLine, " ").concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.line2) }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponLine, " ").concat(_couponBanner_base_css__WEBPACK_IMPORTED_MODULE_1__.default.line3) }),
            lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(couponConfig, 'couponText'))));
}


/***/ }),

/***/ "./browser/components/confirmation/common/FeedbackSurveyWidget/component.js":
/*!**********************************************************************************!*\
  !*** ./browser/components/confirmation/common/FeedbackSurveyWidget/component.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rating": () => (/* binding */ Rating),
/* harmony export */   "Review": () => (/* binding */ Review)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feedbackSurveyWidget.base.css */ "./browser/components/confirmation/common/FeedbackSurveyWidget/feedbackSurveyWidget.base.css");
/* harmony import */ var iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Check.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Check.jsx");
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





var Rating = function (props) {
    var ratingList = props.ratingList, selectedRating = props.selectedRating, updateState = props.updateState;
    var renderList = ratingList.map(function (list, key) {
        var isSelected = selectedRating && selectedRating.id === list.id;
        var className = "".concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.rattingBtn, " ").concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default["rating".concat(key + 1)]);
        className += isSelected ? " ".concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selectedRating) : '';
        var onClickHandler = function () {
            if (isSelected) {
                return;
            }
            updateState('selectedRating', list);
            updateState('selectedReview', {});
        };
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: "rating_".concat(key), className: className, onClick: onClickHandler }, list.optionValue));
    });
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ratingContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ratingBtnContainer }, renderList),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ratingFooter },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.FEEDBACK_SURVEY.LOW_RATING),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.FEEDBACK_SURVEY.HIGH_RATING))));
};
var Section = function (props) {
    var type = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.questionType');
    var question = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.question');
    var updateState = props.updateState, selectedReview = props.selectedReview;
    switch (type) {
        case 'TEXT': {
            var questionId_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.surveyOptionList.0.questionId');
            var optionId_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.surveyOptionList.0.id');
            if (!optionId_1) {
                return null;
            }
            var value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedReview, "".concat(optionId_1, ".answer")) || '';
            var maxLength_1 = 250;
            var onChangeHandler = function (e) {
                var value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(e, 'target.value');
                var answer = value.slice(0, maxLength_1);
                if (answer && answer.trim()) {
                    selectedReview[optionId_1] = {
                        questionId: questionId_1,
                        optionId: optionId_1,
                        answer: answer,
                        channel: 3578
                    };
                }
                else {
                    delete selectedReview[optionId_1];
                }
                updateState('selectedReview', selectedReview);
            };
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("textarea", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.textarea, placeholder: question, onChange: onChangeHandler, value: value, maxLength: maxLength_1 }));
        }
        default: {
            var options = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.surveyOptionList') || [];
            if (!options.length) {
                return null;
            }
            var renderOptions = options.map(function (option, i) {
                var questionId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(option, 'questionId');
                var optionId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(option, 'id');
                var answer = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(option, 'optionValue');
                var isSelected = !!selectedReview[optionId];
                var onClickHandler = function () {
                    if (isSelected) {
                        delete selectedReview[optionId];
                    }
                    else {
                        selectedReview[optionId] = {
                            questionId: questionId,
                            optionId: optionId,
                            answer: answer,
                            channel: 3578
                        };
                    }
                    updateState('selectedReview', selectedReview);
                };
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: "review_".concat(i), className: "".concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.option, " ").concat(isSelected ? _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selectedOption : ''), onClick: onClickHandler },
                    isSelected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.optionIcon })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.optionIcon }, "+")),
                    answer));
            });
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.header }, question),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.optionContainer }, renderOptions)));
        }
    }
};
var Review = function (props) {
    var surveyQuestionList = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'selectedRating.surveyQuestionList') || [];
    if (!surveyQuestionList.length) {
        return null;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_3__.default.reviewContainer }, surveyQuestionList.map(function (list, key) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Section, __assign({}, props, { data: list, key: key }))); })));
};


/***/ }),

/***/ "./browser/components/confirmation/common/FeedbackSurveyWidget/index.js":
/*!******************************************************************************!*\
  !*** ./browser/components/confirmation/common/FeedbackSurveyWidget/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationManager */ "./browser/utils/ConfirmationManager.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component */ "./browser/components/confirmation/common/FeedbackSurveyWidget/component.js");
/* harmony import */ var _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./feedbackSurveyWidget.base.css */ "./browser/components/confirmation/common/FeedbackSurveyWidget/feedbackSurveyWidget.base.css");
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










var FeedbackSurveyWidget = function (props) {
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        data: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.feedbackSurvey'),
        selectedRating: null,
        selectedReview: {},
        isSubmitted: false
    }), state = _a[0], setState = _a[1];
    var updateState = function (key, val) {
        return setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[key] = val, _a)));
        });
    };
    var data = state.data, selectedRating = state.selectedRating, selectedReview = state.selectedReview, isSubmitted = state.isSubmitted;
    if (!data) {
        return null;
    }
    var styleClass = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'styleClass') || '';
    var question = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'list.question');
    var ratingList = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'list.surveyOptionList') || [];
    var onClickHandler = function () {
        var surveyResponseList = [];
        if (selectedRating) {
            surveyResponseList.push({
                questionId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedRating, 'questionId'),
                optionId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedRating, 'id'),
                answer: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedRating, 'optionValue'),
                channel: 3578
            });
        }
        for (var key in selectedReview) {
            var obj = selectedReview[key] || {};
            if (obj && obj.answer && obj.answer.trim()) {
                surveyResponseList.push(obj);
            }
        }
        var successCB = function () {
            var storeOrderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.storeOrderId');
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.setCookie)("".concat(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.cookieKeys.FEEDBACK_SURVEY_ON_ORDER_ID, "_").concat(storeOrderId), true);
            updateState('isSubmitted', true);
            setTimeout(function () {
                updateState('data', null);
            }, 3000);
        };
        commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_5__.default.submitRating({
            id: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'id')),
            authenticationKey: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'authenticationKey'),
            surveyResponseList: surveyResponseList
        }, successCB, function (err) {
            if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(err, 'error.status.statusMessage') === 'RESPONSE_ALREADY_EXISTS') {
                successCB();
            }
            else {
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.errorNotification)(err);
            }
        });
    };
    if (isSubmitted) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(styleClass, " ").concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.successBanner), "data-testid": "FeedbackSurveyThankyou" },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.header }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.FEEDBACK_SURVEY.SUCCESS_MESSAGE),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_7__.default, { name: "positive-vote", className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.thumbsupIcon })));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(styleClass, " ").concat(_feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.container), "data-testid": "FeedbackSurveyWidget" },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.header }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.FEEDBACK_SURVEY.HEADER),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.title }, question),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_component__WEBPACK_IMPORTED_MODULE_8__.Rating, { ratingList: ratingList, selectedRating: selectedRating, updateState: updateState }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_component__WEBPACK_IMPORTED_MODULE_8__.Review, __assign({}, state, { updateState: updateState })),
        !!selectedRating && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: _feedbackSurveyWidget_base_css__WEBPACK_IMPORTED_MODULE_9__.default.submitBtn, onClick: onClickHandler }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.FEEDBACK_SURVEY.BUTTON_TEXT))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedbackSurveyWidget);


/***/ }),

/***/ "./browser/components/confirmation/common/FitAssistModule/Carousel/index.js":
/*!**********************************************************************************!*\
  !*** ./browser/components/confirmation/common/FitAssistModule/Carousel/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Carousel Library.
 * ------Usage-------
 * import CarouselLib from 'CarouselLib';
 * const props = {
 *   currentSlide: <current slide number>
 *   afterSlide: <func to call after slide>
 *   config: {
 *     threshold: <minimum distance for slide update>,
 *     loop: <should carousel be in loop>,
 *     perPage: <items to show per page>
 *   }
 * };
 * <div id='carousel'>
 *   <Carousel {...props}>
 *     {items.map(item => <div>item</div>)}
 *   </Carousel>
 * </div>
 * -------------------
 */
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


var CarouselLib = /** @class */ (function (_super) {
    __extends(CarouselLib, _super);
    function CarouselLib(props) {
        var _this = _super.call(this, props) || this;
        _this.pointerDown = false;
        _this.drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            letItGo: null
        };
        _this.config = __assign({ threshold: 20, loop: false, perPage: 1 }, props.config);
        var bodyWidth = document.body.offsetWidth;
        _this.selectorWidth = bodyWidth - 0.3 * bodyWidth;
        _this.count = react__WEBPACK_IMPORTED_MODULE_0__.default.Children.count(props.children);
        _this.currentSlide = props.currentSlide;
        _this.state = {
            sliderFrameStyles: {
                marginLeft: '16px',
                width: "".concat((_this.selectorWidth / _this.config.perPage) * _this.count, "px"),
                transition: 'all 200ms ease-out',
                transform: "translate3d(-".concat((props.currentSlide * _this.selectorWidth) /
                    _this.config.perPage, "px, 0, 0)")
            }
        };
        return _this;
    }
    CarouselLib.prototype.componentDidMount = function () {
        var carousel = document.getElementById("".concat(this.props.id || 'baseCarousel', "_carousel"));
        this.sliderFrame = document.getElementById('carousel_sliderFrame');
        if (carousel) {
            // Touch events
            carousel.addEventListener('touchstart', this.touchstartHandler.bind(this), {
                passive: true
            });
            carousel.addEventListener('touchend', this.touchendHandler.bind(this));
            carousel.addEventListener('touchmove', this.touchmoveHandler.bind(this), {
                passive: true
            });
        }
    };
    CarouselLib.prototype.touchstartHandler = function (e) {
        e.stopPropagation();
        this.pointerDown = true;
        this.drag.startX = e.touches[0].pageX;
        this.drag.startY = e.touches[0].pageY;
    };
    CarouselLib.prototype.touchmoveHandler = function (e) {
        e.stopPropagation();
        var _a = this, drag = _a.drag, sliderFrame = _a.sliderFrame, perPage = _a.config.perPage, selectorWidth = _a.selectorWidth, currentSlide = _a.currentSlide;
        if (drag.letItGo === null) {
            drag.letItGo =
                Math.abs(drag.startY - e.touches[0].pageY) <
                    Math.abs(drag.startX - e.touches[0].pageX);
        }
        if (this.pointerDown && drag.letItGo) {
            drag.endX = e.touches[0].pageX;
            sliderFrame.style.transform = "translate3d(".concat((currentSlide *
                (selectorWidth / perPage) +
                (drag.startX - drag.endX)) *
                -1, "px, 0, 0)");
        }
    };
    CarouselLib.prototype.touchendHandler = function (e) {
        e.stopPropagation();
        this.pointerDown = false;
        if (this.drag.endX) {
            this.updateAfterDrag();
        }
        this.clearDrag();
    };
    CarouselLib.prototype.updateAfterDrag = function () {
        var _a = this, _b = _a.config, perPage = _b.perPage, threshold = _b.threshold, count = _a.count, selectorWidth = _a.selectorWidth;
        var movement = this.drag.endX - this.drag.startX;
        var movementDistance = Math.abs(movement);
        var howManySliderToSlide = Math.ceil(movementDistance / (selectorWidth / perPage));
        if (movement > 0 && movementDistance > threshold && count >= perPage) {
            this.prev(howManySliderToSlide);
        }
        else if (movement < 0 &&
            movementDistance > threshold &&
            count >= perPage) {
            this.next(howManySliderToSlide);
        }
        this.slideToCurrent();
    };
    CarouselLib.prototype.clearDrag = function () {
        this.drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            letItGo: null
        };
    };
    CarouselLib.prototype.prev = function (howManySlides) {
        howManySlides = howManySlides || 1;
        var _a = this, _b = _a.config, perPage = _b.perPage, loop = _b.loop, count = _a.count;
        if (count < perPage) {
            return;
        }
        var beforeChange = this.currentSlide;
        if (this.currentSlide === 0 && loop) {
            this.currentSlide = count - perPage;
        }
        else {
            this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
        }
        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent();
        }
    };
    CarouselLib.prototype.next = function (howManySlides) {
        howManySlides = howManySlides || 1;
        var _a = this, _b = _a.config, perPage = _b.perPage, loop = _b.loop, count = _a.count;
        if (count < perPage) {
            return;
        }
        var beforeChange = this.currentSlide;
        if (this.currentSlide === count - perPage && loop) {
            this.currentSlide = 0;
        }
        else if (this.currentSlide + 1 + howManySlides > count) {
            this.currentSlide = beforeChange;
        }
        else {
            this.currentSlide = this.currentSlide + howManySlides;
        }
        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent();
        }
    };
    CarouselLib.prototype.slideToCurrent = function () {
        var _a = this, afterSlide = _a.props.afterSlide, sliderFrameStyles = _a.state.sliderFrameStyles, currentSlide = _a.currentSlide, selectorWidth = _a.selectorWidth, perPage = _a.config.perPage, sliderFrame = _a.sliderFrame;
        var transformStyle = "translate3d(-".concat((currentSlide * selectorWidth) /
            perPage, "px, 0, 0)");
        sliderFrame.style.transform = transformStyle;
        this.setState({
            sliderFrameStyles: __assign(__assign({}, sliderFrameStyles), { transform: transformStyle })
        }, function () {
            afterSlide(currentSlide, 'carousel');
        });
    };
    CarouselLib.prototype.render = function () {
        var _this = this;
        var _a = this, _b = _a.props, children = _b.children, _c = _b.id, id = _c === void 0 ? 'baseCarousel' : _c, carouselContainerClass = _b.carouselContainerClass, sliderFrameClass = _b.sliderFrameClass, keepSame = _b.keepSame, sliderFrameStyles = _a.state.sliderFrameStyles, count = _a.count;
        if (this.props.currentSlide !== this.currentSlide) {
            this.currentSlide = this.props.currentSlide;
            this.slideToCurrent();
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "".concat(id, "_carousel"), className: carouselContainerClass },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "carousel_sliderFrame", className: sliderFrameClass, style: sliderFrameStyles },
                react__WEBPACK_IMPORTED_MODULE_0__.default.Children.map(children, function (child, index) {
                    var isSelected = index === _this.currentSlide;
                    var childStyle = {
                        float: 'left',
                        width: "".concat(100 / count, "%"),
                        transition: 'all 200ms ease-out',
                        transform: 'scale(0.8)',
                        opacity: '0.4'
                    };
                    if (isSelected || keepSame) {
                        childStyle.transform = 'scale(1)';
                        childStyle.opacity = '1';
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "elementContainer ".concat(isSelected ? 'selectedItem' : ''), style: childStyle }, child));
                }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { style: { clear: 'both' } }))));
    };
    return CarouselLib;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
CarouselLib.propTypes = {
    currentSlide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
    afterSlide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
    config: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarouselLib);


/***/ }),

/***/ "./browser/components/confirmation/common/FitAssistModule/ProfileSelector/index.js":
/*!*****************************************************************************************!*\
  !*** ./browser/components/confirmation/common/FitAssistModule/ProfileSelector/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profileSelector.base.css */ "./browser/components/confirmation/common/FitAssistModule/ProfileSelector/profileSelector.base.css");
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
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





// Keep all profiles that match currentProduct at the start and disable different gender profiles (except for Unisex product)
var sortProfiles = function (product, profiles) {
    var sortedProfiles = [];
    profiles.forEach(function (profile) {
        if (profile.gender === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.genderMap[product.gender]) {
            sortedProfiles.unshift(__assign({}, profile));
        }
        else {
            sortedProfiles.push(__assign(__assign({}, profile), { disabled: product.gender !== commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.genderMap.Unisex }));
        }
    });
    return sortedProfiles;
};
var getProfileButton = function (_a) {
    var selectProfile = _a.selectProfile, selectedProfile = _a.selectedProfile;
    return function (_a) {
        var text = _a.text, id = _a.id, disabled = _a.disabled;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: id, onClick: disabled ? null : selectProfile, className: "".concat(_profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profileButton, " ").concat(selectedProfile === id ? _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selected : '', " ").concat(disabled ? _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.disabled : '', " ").concat(id !== commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.others.id ? _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.bold : '') }, text));
    };
};
var ArrowLine = function () { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.arrowLine },
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.leftLine }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.triangle }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.rightLine }))); };
var Selector = function (_a) {
    var resetSelectorBlock = _a.resetSelectorBlock, profiles = _a.profiles, openSizeInfo = _a.openSizeInfo, selectProfile = _a.selectProfile, selectedProfile = _a.selectedProfile, currentProduct = _a.currentProduct;
    var ProfileButton = getProfileButton({
        selectProfile: selectProfile,
        selectedProfile: selectedProfile
    });
    var selectedProfileObj = profiles.find(function (profile) { return profile.pidx === selectedProfile; });
    var sortedProfiles = sortProfiles(currentProduct, profiles);
    var userFirstName = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUserFirstName)().trim();
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profileTagsContainer, " ").concat(resetSelectorBlock ? _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.fadeInOut : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.boughtFor }, "Bought this for?"),
            sortedProfiles.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profilesBlock },
                sortedProfiles.map(function (profile) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ProfileButton, { key: profile.pidx, text: profile.name, id: profile.pidx, disabled: profile.disabled })); }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ProfileButton, { text: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.others.display, id: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.others.id }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profilesBlock },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ProfileButton, { text: userFirstName || commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.myself.display, id: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.myself.id }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ProfileButton, { text: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.others.display, id: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_1__.others.id })))),
        selectedProfileObj && !selectedProfileObj.complete && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inCompleteMessageBlock },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inCompleteText },
                "We don't have complete size information for",
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inCompleteProfile }, " ".concat(selectedProfileObj.name))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.addDetails, onClick: openSizeInfo }, "Add Details")))));
};
var ProfileSelector = /** @class */ (function (_super) {
    __extends(ProfileSelector, _super);
    function ProfileSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileSelector.prototype.render = function () {
        var _a = this.props, getCurrentProductIndex = _a.getCurrentProductIndex, blankSlide = _a.blankSlide, taggableProductsCount = _a.taggableProductsCount, selectorProps = __rest(_a, ["getCurrentProductIndex", "blankSlide", "taggableProductsCount"]);
        var showSelector = !blankSlide && getCurrentProductIndex() < taggableProductsCount;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profileSelectorContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ArrowLine, null),
            showSelector ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Selector, __assign({}, selectorProps))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileSelector_base_css__WEBPACK_IMPORTED_MODULE_3__.default.profileTagsContainer }, "This item can not be tagged"))));
    };
    return ProfileSelector;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ProfileSelector.propTypes = {
    profiles: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().array),
    selectedProfile: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
    selectProfile: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
    getCurrentProductIndex: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
    currentProduct: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
    blankSlide: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
    taggableProductsCount: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
    openSizeInfo: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileSelector);


/***/ }),

/***/ "./browser/components/confirmation/common/FitAssistModule/index.js":
/*!*************************************************************************!*\
  !*** ./browser/components/confirmation/common/FitAssistModule/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortProfiles": () => (/* binding */ sortProfiles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");
/* harmony import */ var _AddSizePreferences__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AddSizePreferences */ "./browser/components/confirmation/common/AddSizePreferences/index.js");
/* harmony import */ var _ProfileModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ProfileModal */ "./browser/components/confirmation/common/ProfileModal/index.js");
/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Carousel */ "./browser/components/confirmation/common/FitAssistModule/Carousel/index.js");
/* harmony import */ var _ProfileSelector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ProfileSelector */ "./browser/components/confirmation/common/FitAssistModule/ProfileSelector/index.js");
/* harmony import */ var _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fitAssistModule.base.css */ "./browser/components/confirmation/common/FitAssistModule/fitAssistModule.base.css");
/* harmony import */ var iconComp_RoundTape_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! iconComp/RoundTape.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RoundTape.jsx");
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};















var sortProfiles = function (product, profiles) {
    var sortedProfiles = [];
    profiles.forEach(function (profile) {
        if (profile.gender === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[product.gender]) {
            sortedProfiles.unshift(__assign({}, profile));
        }
        else {
            sortedProfiles.push(__assign(__assign({}, profile), { disabled: product.gender !== commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Unisex }));
        }
    });
    return sortedProfiles;
};
var addBlankProduct = function (data) {
    if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'productData.taggableProductsCount') ===
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'productData.styles.length')) {
        return __assign(__assign({}, data), { productData: __assign(__assign({}, data.productData), { skus: __spreadArray(__spreadArray([], data.productData.skus, true), ['blank'], false), styles: __spreadArray(__spreadArray([], data.productData.styles, true), [{ id: 'blank' }], false) }) });
    }
    return data;
};
var boundFuncs = [
    'selectProduct',
    'selectProfile',
    'closeProfileModal',
    'onProfileNameChange',
    'onGenderClick',
    'saveProfile',
    'isTagged',
    'isPS0Enabled',
    'getCurrentProductIndex',
    'openSizeInfo',
    'afterCarouselSlide',
    'getCarouselBody'
];
var FitAssistModule = /** @class */ (function (_super) {
    __extends(FitAssistModule, _super);
    function FitAssistModule(props) {
        var _this = _super.call(this, props) || this;
        _this.data = addBlankProduct(props.dataState.data);
        var _a = _this.data, _b = _a.productData, _c = _b.styles, styles = _c === void 0 ? [] : _c, _d = _b.skus, skus = _d === void 0 ? [] : _d, styleOptions = _b.styleOptions, profiles = _a.profiles;
        // Setting start index for carousel
        var startIndex = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_4__.getQueryParam)({ name: 'cstart' }) || 0;
        startIndex > styles.length && (startIndex = 0);
        var initialStyle = styles[startIndex];
        var gender = initialStyle.gender;
        var currentProduct = {
            id: "".concat(initialStyle.id, "-").concat(skus[startIndex]),
            gender: gender,
            articleType: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(initialStyle, "articleType.typeName", ''),
            subCategory: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(initialStyle, 'subCategory.typeName') || ''),
            name: initialStyle.name,
            styleId: initialStyle.id
        };
        var profileToTag = sortProfiles(currentProduct, profiles).find(function (p) {
            return p.gender ===
                (commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[gender] === 'Unisex' ? commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Men : commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[gender]);
        });
        _this.state = {
            currentProduct: currentProduct,
            profiles: profiles,
            lastTagged: {
                // this is done to show size n fit upfront even if product is not yet tagged
                product: {
                    subCategory: currentProduct.subCategory,
                    articleType: currentProduct.articleType,
                    gender: currentProduct.gender,
                    productName: currentProduct.name,
                    styleId: currentProduct.styleId
                },
                profile: profileToTag
                    ? {
                        profileId: profileToTag.pidx,
                        profileName: profileToTag.name
                    }
                    : null
            },
            selectedProfile: null,
            taggedItemsMap: {},
            profileModal: false,
            profileModalDetails: {
                name: '',
                gender: gender === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Unisex ? commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Men : commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[gender]
            },
            profileModalError: '',
            saveInProgress: false,
            resetSelectorBlock: false
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.sizePreferencesEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2__.isFeatureEnabled)('SIZE_PREFERENCES');
        _this.ps0List = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PS0_LIST');
        _this.itemSizeMap = {};
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.items', []).forEach(function (item, i) {
            var size = (((styleOptions.find(function (option) { return option.styleId === item.styleId; }) || {})
                .styleOptions || []).find(function (skuOptions) { return skuOptions.skuId === item.skuId; }) || {}).value;
            var expectedCustomerPromiseTime = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'expectedCustomerPromiseTime');
            var diffInDays = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getDateDiff)(new Date(), expectedCustomerPromiseTime);
            var deliverydate = null;
            //NDD scenario
            if (diffInDays < 2 && expectedCustomerPromiseTime) {
                var time = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getTimeFromEpoch)(new Date(Number(expectedCustomerPromiseTime)));
                if (time) {
                    if (diffInDays === 0) {
                        deliverydate = "today ".concat((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2__.isFeatureEnabled)('SPEED_11_SHOW_TIME')
                            ? "by " + time.hours + ' ' + time.suffix
                            : '');
                    }
                    else {
                        deliverydate = "tomorrow ".concat((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_2__.isFeatureEnabled)('SPEED_11_SHOW_TIME')
                            ? "by " + time.hours + ' ' + time.suffix
                            : '');
                    }
                }
            }
            else {
                var _a = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getDateObject)(new Date(expectedCustomerPromiseTime)) || {}, dayInWords = _a.dayInWords, monthInWords = _a.monthInWords, date = _a.date;
                deliverydate = expectedCustomerPromiseTime
                    ? "by ".concat(dayInWords, ", ").concat(monthInWords, " ").concat(date)
                    : null;
            }
            _this.itemSizeMap[item.styleId] = {
                size: size,
                deliveryPromise: deliverydate
            };
        });
        return _this;
    }
    FitAssistModule.prototype.afterCarouselSlide = function (index) {
        this.selectProduct(index);
    };
    FitAssistModule.prototype.selectProduct = function (e) {
        var _a = this, _b = _a.state, taggedItemsMap = _b.taggedItemsMap, profileModalDetails = _b.profileModalDetails, currentProduct = _b.currentProduct, _c = _a.data.productData.styles, styles = _c === void 0 ? [] : _c;
        var targetId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(e, 'currentTarget.id') || this.getIdFromIndex(e);
        var product = styles.find(function (style) { return "".concat(style.id) === targetId.split('-')[0]; });
        var stateToUpdate;
        if (targetId === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.blank) {
            stateToUpdate = {
                currentProduct: __assign(__assign({}, currentProduct), { id: targetId }),
                selectedProfile: null
            };
        }
        else if (targetId !== currentProduct.id) {
            stateToUpdate = {
                currentProduct: {
                    id: targetId,
                    gender: product.gender,
                    articleType: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'articleType.typeName'),
                    subCategory: "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'subCategory.typeName') || ''),
                    name: product.name,
                    styleId: product.id
                },
                selectedProfile: taggedItemsMap[targetId],
                profileModalDetails: __assign(__assign({}, profileModalDetails), { gender: product.gender === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Unisex
                        ? commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap.Men
                        : commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[product.gender] })
            };
        }
        this.setState(stateToUpdate);
    };
    FitAssistModule.prototype.selectNextProductAfterTag = function () {
        var _this = this;
        var _a = this.props.dataState.data.productData, styles = _a.styles, taggableProductsCount = _a.taggableProductsCount;
        this.setState({
            resetSelectorBlock: true
        });
        setTimeout(function () {
            var newIndex = _this.getCurrentProductIndex() + 1;
            newIndex < styles.length && _this.selectProduct(newIndex);
            _this.setState({
                resetSelectorBlock: false
            });
        }, 400);
    };
    FitAssistModule.prototype.selectProfile = function (e) {
        var profileModalDetails = this.state.profileModalDetails;
        var profileId = e.currentTarget.id;
        this.setState({
            selectedProfile: profileId
        });
        if (profileId === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.myself.id || profileId === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.others.id) {
            var userFirstName = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUserFirstName)().trim();
            this.setState({
                selectedProfile: profileId,
                profileModal: true,
                profileModalDetails: __assign(__assign({}, profileModalDetails), { name: profileId === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.myself.id ? userFirstName || commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.myself.display : '' })
            });
        }
        else {
            this.tagProfile(profileId);
            this.selectNextProductAfterTag();
        }
    };
    FitAssistModule.prototype.isTagged = function (id) {
        return Object.keys(this.state.taggedItemsMap).find(function (key) { return key === id; });
    };
    FitAssistModule.prototype.getCurrentProductIndex = function () {
        var _a = this, _b = _a.data.productData, styles = _b.styles, skus = _b.skus, currentProduct = _a.state.currentProduct;
        return styles.findIndex(function (style, index) { return "".concat(style.id, "-").concat(skus[index]) === currentProduct.id; });
    };
    FitAssistModule.prototype.getIdFromIndex = function (index) {
        var _a = this.props.dataState.data.productData, styles = _a.styles, skus = _a.skus;
        return "".concat(styles[index].id, "-").concat(skus[index]);
    };
    FitAssistModule.prototype.tagProfile = function (profileId) {
        var _this = this;
        var _a = this, _b = _a.props, handleConfirmationAction = _b.actionHandlers.handleConfirmationAction, _c = _b.dataState.data, storeOrderId = _c.bountyOrder.storeOrderId, taggableProductsCount = _c.productData.taggableProductsCount, _d = _a.state, currentProduct = _d.currentProduct, taggedItemsMap = _d.taggedItemsMap, profiles = _d.profiles;
        var productIds = currentProduct.id.split('-');
        handleConfirmationAction('tagProfile', {
            uidx: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUidx)(),
            pidx: profileId,
            styleId: Number(productIds[0]),
            skuId: Number(productIds[1]),
            orderId: storeOrderId,
            articleType: currentProduct.articleType,
            gender: currentProduct.gender
        }, function () {
            var _a;
            var updatedTaggedItemsMap = __assign(__assign({}, taggedItemsMap), (_a = {}, _a[currentProduct.id] = profileId, _a));
            var sortedProfiles = sortProfiles(currentProduct, profiles);
            var selectedProfileIndex = sortedProfiles.findIndex(function (profile) { return profile.pidx === profileId; });
            _this.setState({
                lastTagged: {
                    product: {
                        subCategory: currentProduct.subCategory,
                        articleType: currentProduct.articleType,
                        gender: currentProduct.gender,
                        productName: currentProduct.name,
                        styleId: currentProduct.styleId
                    },
                    profile: {
                        profileId: profileId,
                        profileName: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(sortedProfiles, "".concat(selectedProfileIndex, ".name"), '')
                    }
                },
                taggedItemsMap: updatedTaggedItemsMap
            });
            if (!_this.successToastShown &&
                Object.keys(updatedTaggedItemsMap).length === taggableProductsCount) {
                SHELL.alert('info', {
                    message: 'Yay! Thanks for tagging your purchase.',
                    styleOverrides: {
                        notifyMainDiv: "bottom: 82px;"
                    }
                });
                _this.successToastShown = true;
            }
            var deliveryPromise = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this, "itemSizeMap.".concat(productIds[0], ".deliveryPromise")) || '';
            triggerEvent('PRODUCT_TO_PROFILE_TAG_CLICK', {
                custom: {
                    custom: {
                        v1: selectedProfileIndex > -1 &&
                            sortedProfiles[selectedProfileIndex].name,
                        v2: profileId,
                        v3: storeOrderId,
                        v4: "".concat(productIds[0], "|").concat(productIds[1], "|").concat(deliveryPromise.replace(/\s/g, ''))
                    }
                }
            });
        }, null, { message: 'Unable to tag profile' });
    };
    FitAssistModule.prototype.closeProfileModal = function () {
        this.setState({
            profileModal: false,
            profileModalError: ''
        });
    };
    FitAssistModule.prototype.onProfileNameChange = function (e) {
        this.setState({
            profileModalDetails: __assign(__assign({}, this.state.profileModalDetails), { name: e.currentTarget.value })
        });
    };
    FitAssistModule.prototype.onGenderClick = function (e) {
        this.setState({
            profileModalDetails: __assign(__assign({}, this.state.profileModalDetails), { gender: e.currentTarget.id })
        });
    };
    FitAssistModule.prototype.openSizeInfo = function () {
        var _a = this, storeOrderId = _a.props.dataState.data.bountyOrder.storeOrderId, selectedProfile = _a.state.selectedProfile;
        triggerEvent('UPDATE_SIZE_PROFILE_INITIATE');
        window.location = "/my/sizingInfo?orderId=".concat(storeOrderId, "&pidx=").concat(selectedProfile, "&mode=create&referrer=checkout&cstart=").concat(this.getCurrentProductIndex());
    };
    FitAssistModule.prototype.saveProfile = function () {
        var _this = this;
        var _a = this, _b = _a.state, profileModalDetails = _b.profileModalDetails, profiles = _b.profiles, handleConfirmationAction = _a.props.actionHandlers.handleConfirmationAction;
        profileModalDetails.name = profileModalDetails.name.trim();
        if (profileModalDetails.name) {
            this.setState({
                saveInProgress: true
            });
            handleConfirmationAction('saveProfile', profileModalDetails, function (res) {
                var profile = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'userProfiles.0.profileList.0', {});
                var existingProfile = profiles.find(function (prof) { return prof.pidx === profile.pidx; });
                _this.setState({
                    profiles: existingProfile
                        ? __spreadArray([], profiles, true) : __spreadArray(__spreadArray([], profiles, true), [profile], false),
                    selectedProfile: profile.pidx,
                    profileModal: false,
                    profileModalError: '',
                    saveInProgress: false
                }, function () {
                    triggerEvent('CREATE_SIZE_PROFILE');
                    _this.tagProfile(profile.pidx);
                    _this.selectNextProductAfterTag();
                });
            }, function () {
                _this.setState({
                    profileModal: false,
                    profileModalError: '',
                    saveInProgress: false
                });
            }, { message: 'Unable to save profile' });
        }
        else {
            this.setState({
                profileModalError: 'Profile name cannot be empty'
            });
        }
    };
    FitAssistModule.prototype.isPS0Enabled = function () {
        var _a = this, sizePreferencesEnabled = _a.sizePreferencesEnabled, ps0List = _a.ps0List, lastTagged = _a.state.lastTagged;
        if (lastTagged && sizePreferencesEnabled) {
            var taggedProductKey = "".concat(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.genderMap[lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(lastTagged, 'product.gender')]).concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(lastTagged, 'product.articleType')).toLowerCase();
            return ps0List.indexOf(taggedProductKey) !== -1;
        }
        return false;
    };
    FitAssistModule.prototype.getCarouselBody = function (item, index) {
        var _a = this, selectProduct = _a.selectProduct, isTagged = _a.isTagged, _b = _a.props.dataState.data.productData, _c = _b.skus, skus = _c === void 0 ? [] : _c, _d = _b.styleOptions, styleOptions = _d === void 0 ? [] : _d, currentProductId = _a.state.currentProduct.id;
        var skuId = skus[index];
        var id = "".concat(item.id, "-").concat(skuId);
        var _e = this.itemSizeMap[item.id] || {}, size = _e.size, deliveryPromise = _e.deliveryPromise;
        var imageSrc = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'styleImages.default.securedDomain')).concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'styleImages.default.resolutionFormula'));
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: id, id: id, onClick: selectProduct, className: "".concat(_fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.itemContainer, " ").concat(this.getIdFromIndex(index) === currentProductId
                ? _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.selectedProduct
                : '', " ").concat(isTagged(id) ? _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.itemTagged : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_7__.default, { src: imageSrc, width: 60, height: 80, visible: "true", lazyLoad: false }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.itemDetails },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.itemBrand }, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'brandName')),
                size ? react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    "Size: ",
                    size) : null,
                deliveryPromise ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.deliveryTAT }, "Arriving ".concat(deliveryPromise))) : null)));
    };
    FitAssistModule.prototype.render = function () {
        var _a = this, _b = _a.state, resetSelectorBlock = _b.resetSelectorBlock, profiles = _b.profiles, selectedProfile = _b.selectedProfile, currentProduct = _b.currentProduct, lastTagged = _b.lastTagged, _c = _a.props, _d = _c.dataState.data, bountyOrder = _d.bountyOrder, _e = _d.productData, items = _e.styles, skus = _e.skus, productData = _d.productData, fitAssistClass = _c.fitAssistClass, isPS0Enabled = _a.isPS0Enabled, getCurrentProductIndex = _a.getCurrentProductIndex, afterCarouselSlide = _a.afterCarouselSlide, getCarouselBody = _a.getCarouselBody;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: fitAssistClass },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.fitAssistContainer, " ").concat(productData.taggableProductsCount === 0 && _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.adjustPadding) },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.nudge },
                        productData.taggableProductsCount > 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RoundTape_jsx__WEBPACK_IMPORTED_MODULE_13__.default, { className: _fitAssistModule_base_css__WEBPACK_IMPORTED_MODULE_12__.default.headerIcon })) : (''),
                        productData.taggableProductsCount === 0
                            ? "Your Purchased ".concat((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.pluralizeText)(items.length, 'Item'))
                            : 'Tag your Purchase'),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Carousel__WEBPACK_IMPORTED_MODULE_10__.default, { currentSlide: getCurrentProductIndex(), afterSlide: afterCarouselSlide, config: { perPage: 1 }, keepSame: true }, items.map(getCarouselBody)),
                    profiles && productData.taggableProductsCount ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ProfileSelector__WEBPACK_IMPORTED_MODULE_11__.default, { profiles: profiles, selectedProfile: selectedProfile, selectProfile: this.selectProfile, currentProduct: currentProduct, resetSelectorBlock: resetSelectorBlock, blankSlide: currentProduct.id === commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_5__.blank, openSizeInfo: this.openSizeInfo, getCurrentProductIndex: this.getCurrentProductIndex, taggableProductsCount: productData.taggableProductsCount, storeOrderId: bountyOrder.storeOrderId })) : ('')),
                isPS0Enabled() && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_AddSizePreferences__WEBPACK_IMPORTED_MODULE_8__.default, { product: lastTagged.product, profile: lastTagged.profile }))),
            this.state.profileModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ProfileModal__WEBPACK_IMPORTED_MODULE_9__.default, { currentProduct: this.state.currentProduct, closeProfileModal: this.closeProfileModal, saveProfile: this.saveProfile, onProfileNameChange: this.onProfileNameChange, onGenderClick: this.onGenderClick, saveInProgress: this.state.saveInProgress, profileModalDetails: this.state.profileModalDetails, profileModalError: this.state.profileModalError }))));
    };
    return FitAssistModule;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FitAssistModule);
FitAssistModule.PropTypes = {
    dataState: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
    fitAssistClass: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)
};


/***/ }),

/***/ "./browser/components/confirmation/common/Footer/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/confirmation/common/Footer/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _footer_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.base.css */ "./browser/components/confirmation/common/Footer/footer.base.css");



var Footer = function (props) {
    var appImageBase = 'https://constant.myntassets.com/checkout/assets/img/';
    var imageSrc, link;
    if (/iphone|ipad/i.test(navigator.userAgent)) {
        imageSrc = "".concat(appImageBase, "badge_ios.png");
        link =
            'http://ad.apsalar.com/api/v1/ad?re=0&a=myntra&i=com.myntra.Myntra&ca=Mobile+site+-+iOS+%28order+confirmation%29&an=mobile+site&p=iOS&pl=site&h=2a66c78cc888950a6babff75a34296838f2dee85';
    }
    else {
        imageSrc = "".concat(appImageBase, "badge_android.png");
        link =
            'http://ad.apsalar.com/api/v1/ad?re=0&a=myntra&i=com.myntra.android&ca=Mobile+site+-+Android+%28order+confirmation%29&an=mobile+site&p=Android&pl=site&h=91da8af429b4a75c11cbd10e6092c1f0102c7e6b';
    }
    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, '_checkout_.__myx_deviceData__.deviceChannel') ===
        'mobile' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_footer_base_css__WEBPACK_IMPORTED_MODULE_2__.default.footerContainer, " ").concat(props.styleClass) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _footer_base_css__WEBPACK_IMPORTED_MODULE_2__.default.heading }, "Get the Myntra mobile app"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _footer_base_css__WEBPACK_IMPORTED_MODULE_2__.default.desc }, "A faster and more convenient way to shop"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: link },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { className: _footer_base_css__WEBPACK_IMPORTED_MODULE_2__.default.image, src: imageSrc })))) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);


/***/ }),

/***/ "./browser/components/confirmation/common/Header/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/confirmation/common/Header/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CardComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CardComponents */ "./browser/components/confirmation/common/CardComponents/index.js");
/* harmony import */ var _header_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./header.base.css */ "./browser/components/confirmation/common/Header/header.base.css");
/* harmony import */ var iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/ConfirmTick.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ConfirmTick.jsx");
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








var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pulse: false
        };
        return _this;
    }
    Header.prototype.componentDidMount = function () {
        var _this = this;
        var successIcon = document.getElementById('successIcon');
        successIcon &&
            successIcon.addEventListener('animationend', function () {
                _this.setState({
                    pulse: true
                });
            });
    };
    Header.prototype.render = function () {
        var _a = this, storeOrderId = _a.props.storeOrderId, pulse = _a.state.pulse;
        var partnerOffer = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('PARTNER_OFFER');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "successIcon", className: "".concat(_header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.iconBlock, " ").concat(pulse ? _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.pulse : '') },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ConfirmTick_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.confirmTick })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.heading }, "Order Confirmed"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.desc }, "You will receive an order confirmation email shortly with the expected delivery date."),
            !(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('CONFIRMATION_VIEW_ORDER_DISABLE') && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { onClick: function () { return (0,_CardComponents__WEBPACK_IMPORTED_MODULE_4__.viewOrdersTriggerEvent)(storeOrderId); } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: "/my/order/details?storeOrderId=".concat(storeOrderId, "&fromConfirmation=true"), className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.link }, "View Order"))),
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(partnerOffer, 'data.enabled') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.partnerOffer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { className: _header_base_css__WEBPACK_IMPORTED_MODULE_5__.default.link, href: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(partnerOffer, 'data.link') }, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(partnerOffer, 'data.title')))) : null));
    };
    return Header;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Header.propTypes = {
    storeOrderId: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    showLoader: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ "./browser/components/confirmation/common/InsiderSuperCoinWidget/CollectCoinsContainer/index.js":
/*!******************************************************************************************************!*\
  !*** ./browser/components/confirmation/common/InsiderSuperCoinWidget/CollectCoinsContainer/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collectCoins.base.css */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/CollectCoinsContainer/collectCoins.base.css");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");



var CollectCoinsContainer = function (_a) {
    var _b = _a.acceleratedEarning, acceleratedEarning = _b === void 0 ? {} : _b, _c = _a.collectCoinsMessage, collectCoinsMessage = _c === void 0 ? '' : _c, _d = _a.coinsToCollect, coinsToCollect = _d === void 0 ? 0 : _d, _e = _a.tierName, tierName = _e === void 0 ? '' : _e;
    var acceleratedEarningConfig = acceleratedEarning[tierName];
    var getCollectCoinsText = function (collectCoinsMessage) {
        return collectCoinsMessage
            .split(/({{superCoinToCollect}})/g)
            .map(function (item, index) {
            return item === '{{superCoinToCollect}}' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index, className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinToCollectBold },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinToCollectIcon, name: "superCoinIcon" }),
                coinsToCollect,
                " SuperCoins")) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index }, item));
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.collectCoinsContainer },
        !!(acceleratedEarningConfig || []).length && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.acceleratedEarningContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.acceleratedEarningIcon },
                acceleratedEarningConfig[0],
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinToCollectIcon, name: "superCoinIcon" })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.acceleratedEarningDesc }, acceleratedEarningConfig[1]))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _collectCoins_base_css__WEBPACK_IMPORTED_MODULE_1__.default.collectCoinsText }, getCollectCoinsText(collectCoinsMessage))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CollectCoinsContainer);


/***/ }),

/***/ "./browser/components/confirmation/common/InsiderSuperCoinWidget/ProgressBar/index.js":
/*!********************************************************************************************!*\
  !*** ./browser/components/confirmation/common/InsiderSuperCoinWidget/ProgressBar/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./superCoinProgressBar.base.css */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/ProgressBar/superCoinProgressBar.base.css");
/* harmony import */ var iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/Check.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Check.jsx");
/* harmony import */ var iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/InsiderLogoNew.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/InsiderLogoNew.jsx");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/ToolTip */ "./browser/components/common/ToolTip/index.js");






var getTrialArrowStyles = function (progressBarCss) {
    var width = Number(progressBarCss.primaryWidth.replace('%', ''));
    switch (true) {
        case width < 20:
            return { left: '20%' };
        case width > 80:
            return { left: '80%' };
        default:
            return { left: progressBarCss.primaryWidth };
    }
};
var TooltipBody = function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.message, message = _c === void 0 ? '' : _c, _d = _a.userName, userName = _d === void 0 ? '' : _d, _e = _a.tierName, tierName = _e === void 0 ? '' : _e, _f = _a.isTrialUser, isTrialUser = _f === void 0 ? false : _f, _g = _a.progressBarCss, progressBarCss = _g === void 0 ? {} : _g;
    var tooltipBodyClass = "".concat(tierName === 'Select' ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarTooltipSelect : '');
    var trialArrowStyles = {};
    if (isTrialUser) {
        tooltipBodyClass = _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.trialUserTooltip;
        trialArrowStyles = getTrialArrowStyles(progressBarCss);
    }
    var tooltipArrowClass = isTrialUser || tierName === 'Elite'
        ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarTooltipArrowTrial
        : '';
    if (!message)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarTooltip, " ").concat(tooltipBodyClass) },
            title && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarTooltipTitle }, title.replace('{{userName}}', userName))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, message),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarTooltipArrow, " ").concat(tooltipArrowClass), style: trialArrowStyles }))));
};
var getTierLevelsForInsiders = function (_a) {
    var tierNames = _a.tierNames, tierName = _a.tierName;
    var totalTiers = tierNames.length;
    var activeTierIndex = tierNames.indexOf(tierName);
    activeTierIndex =
        activeTierIndex === totalTiers - 1 ? activeTierIndex : activeTierIndex + 1;
    return tierNames.map(function (tier, index) {
        var isActiveTier = index <= activeTierIndex;
        var isLastTier = index + 1 === totalTiers;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tierLevelContainer, key: index },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isActiveTier ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.activeTierCheck : _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.inactiveTierCheck }, isActiveTier ? react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_2__.default, null) : null),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: activeTierIndex === index
                    ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.activeTierName
                    : _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.inactiveTierName }, tier),
            isLastTier &&
                (isActiveTier ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.crownIconInactive })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "crownIconDisabled", className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.crownIconInactive })))));
    });
};
var getTierLevelsForTrialUsers = function (_a) {
    var progressBarLevels = _a.progressBarLevels;
    return progressBarLevels.map(function (level, index) {
        var isLastTier = index + 1 === progressBarLevels.length;
        var isActiveTier = index === 0;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tierLevelContainer, key: index },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isActiveTier
                    ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.activeTierCheck
                    : isLastTier
                        ? _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.inactiveTierCheck
                        : _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.blankTierCheck }, isActiveTier ? react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_2__.default, null) : null),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.trialTierLevelName }, level),
            isLastTier && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "crownIconDisabled", className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.crownIconInactive }))));
    });
};
var getTooltipContent = function (config, isTrialUser) {
    var tooltipTitle = config.tooltipTitle, tooltipMessage = config.tooltipMessage, _a = config.insiderTrials, insiderTrials = _a === void 0 ? {} : _a;
    var _b = insiderTrials.defaultTooltipTitle, defaultTooltipTitle = _b === void 0 ? '' : _b, _c = insiderTrials.defaultTooltipMessage, defaultTooltipMessage = _c === void 0 ? '' : _c;
    if (isTrialUser) {
        return {
            tooltipTitle: defaultTooltipTitle,
            tooltipMessage: defaultTooltipMessage
        };
    }
    return { tooltipTitle: tooltipTitle, tooltipMessage: tooltipMessage };
};
var ProgressBar = function (_a) {
    var _b = _a.progressBarCss, progressBarCss = _b === void 0 ? {} : _b, _c = _a.tierName, tierName = _c === void 0 ? '' : _c, _d = _a.userName, userName = _d === void 0 ? '' : _d, _e = _a.config, config = _e === void 0 ? {} : _e, _f = _a.isTrialUser, isTrialUser = _f === void 0 ? false : _f;
    var _g = config.tierNames, tierNames = _g === void 0 ? [] : _g, _h = config.insiderTrials, insiderTrials = _h === void 0 ? {} : _h;
    var _j = insiderTrials.progressBarLevels, progressBarLevels = _j === void 0 ? [] : _j;
    var _k = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showTooltip = _k[0], setShowTooltip = _k[1];
    var renderTooltip = function () { return setShowTooltip(true); };
    var _l = getTooltipContent(config, isTrialUser), tooltipTitle = _l.tooltipTitle, tooltipMessage = _l.tooltipMessage;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinProgressBar },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.progressBarBackground },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tierLevels }, isTrialUser
                ? getTierLevelsForTrialUsers({ progressBarLevels: progressBarLevels })
                : getTierLevelsForInsiders({ tierNames: tierNames, tierName: tierName })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.barOverlay, onTransitionEnd: renderTooltip, style: { width: progressBarCss.primaryWidth } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tooltipMainContainer }, showTooltip && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_5__.default, { className: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinTooltipBaseMessage, containerClass: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinTooltipContainer, isShownDefault: true, tipClass: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinTooltip, toolTipRefClass: _superCoinProgressBar_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinToolTipRef },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TooltipBody, { title: tooltipTitle, message: tooltipMessage, userName: userName, tierName: tierName, isTrialUser: isTrialUser, progressBarCss: progressBarCss }))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);


/***/ }),

/***/ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinHeader/index.js":
/*!************************************************************************************************!*\
  !*** ./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinHeader/index.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./superCoinHeader.base.css */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinHeader/superCoinHeader.base.css");
/* harmony import */ var iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/InsiderLogoNew.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/InsiderLogoNew.jsx");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var iconComp_Myntra_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Myntra.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Myntra.jsx");





var SuperCoinHeader = function (_a) {
    var _b = _a.headerMessage, headerMessage = _b === void 0 ? '' : _b, _c = _a.tierName, tierName = _c === void 0 ? '' : _c, _d = _a.isTrialUser, isTrialUser = _d === void 0 ? false : _d, _e = _a.trialUserTitle, trialUserTitle = _e === void 0 ? '' : _e;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinHeader },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tierNameContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.crownIcon }),
            headerMessage.split(/({{tierName}})/g).map(function (item, index) {
                return item === '{{tierName}}' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index, className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tierNameText },
                    tierName,
                    isTrialUser ? " ".concat(trialUserTitle) : '')) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index },
                    "\u00A0",
                    item));
            })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.insiderLogoContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Myntra_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.myntraLogo }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__.default, { className: _superCoinHeader_base_css__WEBPACK_IMPORTED_MODULE_1__.default.insiderLogoSuperCoin, name: "insiderLogoSuperCoin" }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuperCoinHeader);


/***/ }),

/***/ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinRewards/index.js":
/*!*************************************************************************************************!*\
  !*** ./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinRewards/index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./superCoinRewards.base.css */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinRewards/superCoinRewards.base.css");
/* harmony import */ var iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/ChevronDown.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronDown.jsx");
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");
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




var RewardItem = function (_a) {
    var _b = _a.imageUrl, imageUrl = _b === void 0 ? '' : _b, _c = _a.title, title = _c === void 0 ? '' : _c, onClick = _a.onClick;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rewardItemWrapper, onClick: onClick },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rewardItemImage },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_3__.default, { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rewardItemImg, bounce: false, src: imageUrl, height: '100%' })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rewardItemInfo },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rewardItemTitle }, title))));
};
var SuperCoinRewards = function (_a) {
    var _b = _a.analyticsData, analyticsData = _b === void 0 ? {} : _b, _c = _a.carouselHeight, carouselHeight = _c === void 0 ? 'auto' : _c, _d = _a.rewardsList, rewardsList = _d === void 0 ? [] : _d, _e = _a.rewardItemCtaLink, rewardItemCtaLink = _e === void 0 ? '' : _e, setCarouselHeight = _a.setCarouselHeight, _f = _a.superCoinRewardsTitle, superCoinRewardsTitle = _f === void 0 ? '' : _f, _g = _a.showProgressBar, showProgressBar = _g === void 0 ? false : _g;
    var rewardsCarouselWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var onChevronClick = function () {
        var customAnalytics = analyticsData.customAnalytics, widgetName = analyticsData.widgetName;
        triggerEvent('INSIDER_SUPERCOIN_WIDGET_CHEVRON_CLICK', {
            custom: {
                widget: {
                    name: widgetName
                },
                widget_items: {
                    name: carouselHeight == 0
                        ? 'insider_benefits_expand_click'
                        : 'insider_benefits_collapse_click'
                },
                custom: __assign({}, customAnalytics)
            }
        });
        if (carouselHeight == 0) {
            setCarouselHeight((rewardsCarouselWrapperRef.current &&
                rewardsCarouselWrapperRef.current.clientHeight) ||
                'auto');
            return;
        }
        setCarouselHeight('0');
    };
    var handleRewardItemClick = function (title, index) {
        var customAnalytics = analyticsData.customAnalytics, widgetName = analyticsData.widgetName;
        triggerEvent('INSIDER_SUPERCOIN_WIDGET_REWARD_CLICK', {
            custom: {
                widget: {
                    name: widgetName,
                    type: 'carousel',
                    data_set: {
                        data: {
                            entity_value: title,
                            h_position: index + 1
                        }
                    }
                },
                widget_items: {
                    name: 'insider_benefits_rewards_click'
                },
                custom: __assign({}, customAnalytics)
            }
        });
        rewardItemCtaLink && (window.location.href = rewardItemCtaLink);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinRewardsContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinRewardsTitle },
            superCoinRewardsTitle,
            showProgressBar && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { onClick: onChevronClick, className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinRewardsChevronWhite, style: {
                    transform: carouselHeight != 0 ? 'rotate(270deg)' : 'rotate(90deg)'
                } }))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinRewardsCarouselWrapper, style: {
                height: carouselHeight === 'auto' ? carouselHeight : "".concat(carouselHeight, "px")
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: rewardsCarouselWrapperRef, className: _superCoinRewards_base_css__WEBPACK_IMPORTED_MODULE_1__.default.superCoinRewardsCarousel }, (rewardsList || []).map(function (item, index) {
                if (item === void 0) { item = {}; }
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(RewardItem, { key: index, imageUrl: item.imageUrl, title: item.title, onClick: function () { return handleRewardItemClick(item.title, index); } }));
            })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuperCoinRewards);


/***/ }),

/***/ "./browser/components/confirmation/common/InsiderSuperCoinWidget/index.js":
/*!********************************************************************************!*\
  !*** ./browser/components/confirmation/common/InsiderSuperCoinWidget/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insiderSuperCoinWidget.base.css */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/insiderSuperCoinWidget.base.css");
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");
/* harmony import */ var commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationManager */ "./browser/utils/ConfirmationManager.js");
/* harmony import */ var commonComp_IntersectionObserverComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/IntersectionObserverComponent */ "./browser/components/common/IntersectionObserverComponent/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _SuperCoinHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SuperCoinHeader */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinHeader/index.js");
/* harmony import */ var _CollectCoinsContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CollectCoinsContainer */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/CollectCoinsContainer/index.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProgressBar */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/ProgressBar/index.js");
/* harmony import */ var _SuperCoinRewards__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SuperCoinRewards */ "./browser/components/confirmation/common/InsiderSuperCoinWidget/SuperCoinRewards/index.js");
/* harmony import */ var commonBrowserUtils_LocalStorageUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/LocalStorageUtils */ "./browser/utils/LocalStorageUtils.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__);
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};















var getUpgradedTierProgressPercent = function (_a) {
    var tierName = _a.tierName, isInsiderTrialUser = _a.isInsiderTrialUser, tierProgressPercent = _a.tierProgressPercent;
    if (isInsiderTrialUser) {
        return { primaryPercent: tierProgressPercent };
    }
    switch (tierName) {
        case 'Select':
            return { primaryPercent: 50 };
        case 'Elite':
        case 'Icon':
            return { primaryPercent: 100 };
    }
};
/**
 * Checks localStorage for myntraInsider info from myProfile key.
 * If myProfile key is not available, it returns true and relies on
 * API response for checking this info
 */
var getInsiderStatus = function () {
    var isUserInsider = (0,commonBrowserUtils_LocalStorageUtils__WEBPACK_IMPORTED_MODULE_11__.getItem)((commonUtils_constants__WEBPACK_IMPORTED_MODULE_13__.localStorageKeys || {}).USER_PROFILE, true);
    return (!isUserInsider ||
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(isUserInsider, 'details.myntraInsider.status', '') === 'active');
};
var CtaContainer = function (_a) {
    var _b = _a.allRewardsCtaLink, allRewardsCtaLink = _b === void 0 ? '' : _b, _c = _a.allRewardsCtaText, allRewardsCtaText = _c === void 0 ? '' : _c, _d = _a.analyticsData, analyticsData = _d === void 0 ? {} : _d;
    var allRewardsCtaClickHandler = function () {
        var customAnalytics = analyticsData.customAnalytics, widgetName = analyticsData.widgetName;
        triggerEvent('INSIDER_SUPERCOIN_WIDGET_CTA_CLICK', {
            custom: {
                widget: {
                    name: widgetName,
                    type: 'button'
                },
                widget_items: {
                    name: 'insider_benefits_view_rewards_click'
                },
                custom: __assign({}, customAnalytics)
            }
        });
        allRewardsCtaLink && (window.location.href = allRewardsCtaLink);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.allRewardsCtaContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.allRewardsCtaContainerText, onClick: allRewardsCtaClickHandler },
            allRewardsCtaText,
            ' ',
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.allRewardsCtaContainerChevron }))));
};
var InsiderSuperCoinWidget = function (props) {
    var config = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_12__.getKVPairValue)('CONFIRMATION_PAGE_CONFIG'), 'insiderSuperCoin', {});
    var _a = config.acceleratedEarning, acceleratedEarning = _a === void 0 ? {} : _a, _b = config.headerMessage, headerMessage = _b === void 0 ? '' : _b, _c = config.collectCoinsMessage, collectCoinsMessage = _c === void 0 ? '' : _c, _d = config.superCoinRewardsTitle, superCoinRewardsTitle = _d === void 0 ? '' : _d, _e = config.rewardsList, rewardsList = _e === void 0 ? '' : _e, _f = config.rewardItemCtaLink, rewardItemCtaLink = _f === void 0 ? '' : _f, _g = config.allRewardsCtaLink, allRewardsCtaLink = _g === void 0 ? '' : _g, _h = config.allRewardsCtaText, allRewardsCtaText = _h === void 0 ? '' : _h;
    var orderItems = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.bountyOrder.items', []);
    var userName = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'dataState.data.delivery.user.name', '');
    var insiderTrialsEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__.isFeatureEnabled)('CHECKOUT_INSIDER_TRIAL');
    var _j = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true), isLoading = _j[0], setIsLoading = _j[1];
    var _k = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), isError = _k[0], setIsError = _k[1];
    var _l = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getInsiderStatus()), isUserInsider = _l[0], setIsUserInsider = _l[1];
    var _m = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showProgressBar = _m[0], setShowProgressBar = _m[1];
    var _o = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}), progressBarCss = _o[0], setProgressBarCss = _o[1];
    var _p = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0), coinsToCollect = _p[0], setCoinsToCollect = _p[1];
    var _q = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('auto'), carouselHeight = _q[0], setCarouselHeight = _q[1];
    var _r = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), isTrialUser = _r[0], setIsTrialUser = _r[1];
    var _s = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0), requiredAmountToEndTrial = _s[0], setRequiredAmountToEndTrial = _s[1];
    var tierProgressPercentRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
        primaryPercent: 0
    });
    var tierNameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)('');
    var amountToUpgradeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var trialUserTitle = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(config, 'insiderTrials.title', '');
    var analyticsData = {
        widgetName: 'insider_benefits_callout',
        customAnalytics: {
            custom_variable_v1: tierNameRef.current,
            custom_variable_v2: coinsToCollect,
            custom_variable_v3: showProgressBar ? 'upgrade' : 'earning',
            custom_variable_v4: isTrialUser,
            custom_variable_v5: amountToUpgradeRef.current
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        if (!isUserInsider || !(Object.keys(config) || []).length)
            return;
        fetchData();
    }, []);
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderAmount, itemEntries, data, error_1, _a, _b, insiderDetails, _c, orderPointsData;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    orderAmount = 0;
                    itemEntries = orderItems.map(function (item) {
                        var amount = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'payments.amount', 0) / 100;
                        orderAmount += amount;
                        return {
                            styleId: item.styleId,
                            skuId: item.skuId || '',
                            amount: amount
                        };
                    });
                    setIsLoading(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_4__.default.getInsiderDetails(),
                            commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_4__.default.getOrderPoints({ itemEntries: itemEntries })
                        ])];
                case 2:
                    data = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    console.error(error_1);
                    setIsError(true);
                    setIsLoading(false);
                    return [2 /*return*/];
                case 4:
                    setIsLoading(false);
                    _a = data || [], _b = _a[0], insiderDetails = _b === void 0 ? {} : _b, _c = _a[1], orderPointsData = _c === void 0 ? {} : _c;
                    setupStateData(insiderDetails, orderPointsData, orderAmount);
                    return [2 /*return*/];
            }
        });
    }); };
    var setupStateData = function (insiderDetails, orderPointsData, orderAmount) {
        var isUserInsiderActive = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.isInsider', false);
        setIsUserInsider(isUserInsiderActive);
        var tierName = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.tierName', '');
        // If user is not an insider, we don't want to show the widget
        if (!isUserInsiderActive || !tierName || !orderPointsData) {
            setIsError(true);
            return;
        }
        tierNameRef.current = tierName;
        // Trial Pack Info
        var isInsiderTrialUser = insiderTrialsEnabled &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.isTrialUser', false);
        var coinsToCollect = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderPointsData, 'totalPoints', 0);
        var amountToUpgrade = getAmountToUpgrade({
            insiderDetails: insiderDetails,
            isInsiderTrialUser: isInsiderTrialUser,
            tierName: tierName
        });
        var tierProgressPercent = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.tierProgressPercent', 0);
        var shouldShowProgressBar = isInsiderTrialUser ||
            (orderAmount >= amountToUpgrade && tierName !== 'Icon');
        if (shouldShowProgressBar) {
            setShowProgressBar(true);
            tierProgressPercentRef.current = getUpgradedTierProgressPercent({
                tierName: tierName,
                isInsiderTrialUser: isInsiderTrialUser,
                tierProgressPercent: tierProgressPercent
            });
            setCarouselHeight('0');
        }
        else {
            setCarouselHeight('auto');
        }
        amountToUpgradeRef.current = amountToUpgrade;
        setRequiredAmountToEndTrial(amountToUpgrade - orderAmount);
        setIsTrialUser(isInsiderTrialUser);
        setCoinsToCollect(coinsToCollect);
    };
    var getAmountToUpgrade = function (_a) {
        var insiderDetails = _a.insiderDetails, isInsiderTrialUser = _a.isInsiderTrialUser, tierName = _a.tierName;
        var requiredAmountToUpgradeTrial = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.requiredAmountToUpgrade', 0);
        if (isInsiderTrialUser)
            return requiredAmountToUpgradeTrial;
        var requiredAmountToUpgradeToElite = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.requiredAmountToUpgradeToElite', 0);
        var requiredAmountToUpgradeToIcon = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.requiredAmountToUpgradeToIcon', 0);
        var amountToUpgrade = tierName === 'Select'
            ? requiredAmountToUpgradeToElite
            : tierName === 'Elite'
                ? requiredAmountToUpgradeToIcon
                : 0;
        return amountToUpgrade;
    };
    var startProgressBarAnimation = function () {
        setTimeout(function () {
            setProgressBarCss({
                primaryWidth: "".concat(tierProgressPercentRef.current.primaryPercent, "%")
            });
        }, 100);
    };
    var showAccents = function () {
        return !!(tierNameRef.current === 'Icon' ||
            (showProgressBar && tierNameRef.current === 'Elite'));
    };
    var sendWidgetLoadAnalytics = function () {
        var customAnalytics = analyticsData.customAnalytics, widgetName = analyticsData.widgetName;
        triggerEvent('INSIDER_SUPERCOIN_WIDGET_LOAD', {
            custom: {
                widget: {
                    name: widgetName,
                    type: 'card'
                },
                custom: __assign({}, customAnalytics)
            }
        });
    };
    // Don't show the widget if the user is not an insider or there is an error
    if (!(Object.keys(config) || []).length || !isUserInsider || isError)
        return null;
    if (isLoading)
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_6__.default, { show: true, className: _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.superCoinLoader });
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(props.insiderSuperCoinClass, " ").concat(_insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.insiderSuperCoinContainer, " ").concat(showAccents() ? _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.goldenAccent : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(showAccents() ? _insiderSuperCoinWidget_base_css__WEBPACK_IMPORTED_MODULE_2__.default.goldenAccentTop : '') }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_IntersectionObserverComponent__WEBPACK_IMPORTED_MODULE_5__.default, { id: "sc-analytics-sensor", triggerAction: sendWidgetLoadAnalytics }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SuperCoinHeader__WEBPACK_IMPORTED_MODULE_7__.default, { headerMessage: headerMessage, tierName: tierNameRef.current, isTrialUser: isTrialUser, trialUserTitle: trialUserTitle }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CollectCoinsContainer__WEBPACK_IMPORTED_MODULE_8__.default, { acceleratedEarning: acceleratedEarning, collectCoinsMessage: collectCoinsMessage, coinsToCollect: coinsToCollect, tierName: tierNameRef.current }),
        showProgressBar && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ProgressBar__WEBPACK_IMPORTED_MODULE_9__.default, { userName: userName, tierName: tierNameRef.current, config: config, progressBarCss: progressBarCss, isTrialUser: isTrialUser, requiredAmountToEndTrial: requiredAmountToEndTrial }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_IntersectionObserverComponent__WEBPACK_IMPORTED_MODULE_5__.default, { id: "sc-progress-bar-sensor", triggerAction: startProgressBarAnimation }))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SuperCoinRewards__WEBPACK_IMPORTED_MODULE_10__.default, { analyticsData: analyticsData, carouselHeight: carouselHeight, rewardsList: rewardsList, rewardItemCtaLink: rewardItemCtaLink, setCarouselHeight: setCarouselHeight, superCoinRewardsTitle: superCoinRewardsTitle, showProgressBar: showProgressBar }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CtaContainer, { allRewardsCtaLink: allRewardsCtaLink, allRewardsCtaText: allRewardsCtaText, analyticsData: analyticsData })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InsiderSuperCoinWidget);


/***/ }),

/***/ "./browser/components/confirmation/common/ProfileModal/index.js":
/*!**********************************************************************!*\
  !*** ./browser/components/confirmation/common/ProfileModal/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/capitalize */ "../node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_InlineButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/InlineButton */ "./browser/components/common/InlineButton/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profileModal.base.css */ "./browser/components/confirmation/common/ProfileModal/profileModal.base.css");
/* harmony import */ var iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/RadioActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioActive.jsx");
/* harmony import */ var iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! iconComp/RadioInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioInactive.jsx");
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









var GenderButtons = function (_a) {
    var currentProduct = _a.currentProduct, gender = _a.gender, onGenderClick = _a.onGenderClick;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, currentProduct.gender === 'Unisex' ? (
    // TODO: rename g
    [commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__.genderMap.Men, commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__.genderMap.Women].map(function (g) {
        var SVGIcon = g === gender ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: "".concat(_profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.radioButton, " ").concat(_profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.selectedButton) })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_7__.default, { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.radioButton }));
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("label", { id: g, className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.genderLabel, onClick: onGenderClick, key: g },
            SVGIcon,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.radioText }, lodash_capitalize__WEBPACK_IMPORTED_MODULE_1___default()(g))));
    })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.autoSelectGender },
        lodash_capitalize__WEBPACK_IMPORTED_MODULE_1___default()(gender),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.autoSelectText }, "(Auto selected based on product)")))));
};
var ProfileModal = /** @class */ (function (_super) {
    __extends(ProfileModal, _super);
    function ProfileModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileModal.prototype.render = function () {
        var _a = this.props, closeProfileModal = _a.closeProfileModal, saveProfile = _a.saveProfile, onProfileNameChange = _a.onProfileNameChange, onGenderClick = _a.onGenderClick, currentProduct = _a.currentProduct, saveInProgress = _a.saveInProgress, _b = _a.profileModalDetails, name = _b.name, gender = _b.gender, profileModalError = _a.profileModalError;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__.default, { halfCard: true, className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.modal, cancelCallback: closeProfileModal }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.mainContent },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.modalTitle }, "Add Details"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.textInput, placeholder: "Enter profile name", onChange: onProfileNameChange, value: name || '' }),
                profileModalError && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.error }, profileModalError)),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.genderHeader }, "Gender"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(GenderButtons, { currentProduct: currentProduct, gender: gender, onGenderClick: onGenderClick })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButton__WEBPACK_IMPORTED_MODULE_3__.default, { button1: {
                    text: commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__.buttons.cancel,
                    clickHandler: onCancel
                }, button2: {
                    text: saveInProgress ? commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__.buttons.saving : commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_4__.buttons.save,
                    clickHandler: saveProfile,
                    className: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.save
                }, btnClassName: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.modalButton, containerClassName: _profileModal_base_css__WEBPACK_IMPORTED_MODULE_5__.default.buttons }))); }));
    };
    return ProfileModal;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ProfileModal.propTypes = {
    closeProfileModal: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
    saveProfile: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
    onProfileNameChange: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
    onGenderClick: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
    currentProduct: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object),
    profileModalDetails: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object),
    saveInProgress: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),
    profileModalError: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileModal);


/***/ }),

/***/ "./browser/components/confirmation/common/SuccessAnimation/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/confirmation/common/SuccessAnimation/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./successAnimation.base.css */ "./browser/components/confirmation/common/SuccessAnimation/successAnimation.base.css");
/* harmony import */ var iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/Check.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Check.jsx");
/* harmony import */ var iconComp_ConfirmCircle_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/ConfirmCircle.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ConfirmCircle.jsx");
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

// Style Related Imports.



var SuccessAnimation = /** @class */ (function (_super) {
    __extends(SuccessAnimation, _super);
    function SuccessAnimation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            animationDone: false
        };
        return _this;
    }
    SuccessAnimation.prototype.componentDidMount = function () {
        var _this = this;
        var tick = document.getElementById('successAnimCircle');
        tick &&
            tick.addEventListener('animationend', function () {
                _this.setState({
                    animationDone: true
                });
            });
    };
    SuccessAnimation.prototype.render = function () {
        var animationDone = this.state.animationDone;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.parent },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.circle, id: "successAnimCircle" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(animationDone ? _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iconContainer : _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.displayNone, " ") },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iconBlock },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Check_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.circleTick, id: "successAnimCircleTick" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ConfirmCircle_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.successCircle })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _successAnimation_base_css__WEBPACK_IMPORTED_MODULE_1__.default.orderSuccessful }, "Order Successful"))));
    };
    return SuccessAnimation;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuccessAnimation);


/***/ }),

/***/ "./browser/components/confirmation/common/confirmationCardsConfig.js":
/*!***************************************************************************!*\
  !*** ./browser/components/confirmation/common/confirmationCardsConfig.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "confirmationSubComponentsConfig": () => (/* binding */ confirmationSubComponentsConfig),
/* harmony export */   "modalContentGetter": () => (/* binding */ modalContentGetter)
/* harmony export */ });
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
/* harmony import */ var _CardComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CardComponents */ "./browser/components/confirmation/common/CardComponents/index.js");




var Recommendations = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_2__.default)({
    loader: function () {
        return Promise.all(/*! import() | confirmation_common_recommendations */[__webpack_require__.e("styles-browser_components_confirmation_common_Recommendations_recommendations_base_css"), __webpack_require__.e("confirmation_common_recommendations")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Recommendations */ "./browser/components/confirmation/common/Recommendations/index.js"));
    },
    loaderProperties: { backdrop: false }
});
var confirmationSubComponentsConfig = {
    InsiderSuperCoinWidget: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.InsiderSuperCoinWidget,
    PastOrderSavingsWidget: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0__.isFeatureEnabled)('CONFIRMATION_TOTAL_SAVINGS')
        ? _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PastOrderSavingsModule
        : null,
    A2HS: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.A2HS,
    FitAssist: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.FitAssist,
    Rating: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isApp)() ? _CardComponents__WEBPACK_IMPORTED_MODULE_3__.Rating : null,
    Recommendations: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0__.isFeatureEnabled)('CONFIRMATION_CROSS_SELL')
        ? Recommendations
        : null,
    TrackOrders: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.TrackOrders,
    PromoOffer: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PromoOffer,
    PromoOfferDesktop: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PromoOfferDesktop,
    ContinueShopping: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.ContinueShopping,
    ExchangeInfoWidget: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.ExchangeInfoWidget,
    OrderConfirmedDesktop: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.OrderConfirmedDesktop,
    WaitingForPayment: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.WaitingForPayment,
    PaymentPendingNote: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PaymentPendingNote,
    OrderPlacedAsPOD: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.OrderPlacedAsPOD,
    PaymentSuccessful: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PaymentSuccessful,
    ItemsPaid: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.ItemsPaid,
    UpdatesSent: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.UpdatesSent,
    SuccessCTA: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.SuccessCTA,
    TotalPayable: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.TotalPayable,
    Header: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.Header,
    Footer: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.Footer,
    PayAtConvenience: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_0__.isFeatureEnabled)('DOPE') ? _CardComponents__WEBPACK_IMPORTED_MODULE_3__.PayAtConvenience : null,
    ViewOrder: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.ViewOrder,
    DeliveryDetailsWidget: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.DeliveryDetailsWidget,
    FeedbackSurveyWidget: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.FeedbackSurveyWidget,
    ScratchCardBanner: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.ScratchCardBanner,
    NotifWidget: _CardComponents__WEBPACK_IMPORTED_MODULE_3__.NotifWidget
};
var CARDACTION_GETMODALCONTENT_MAP = {
    WaitingForPayment_Cancel: function (actionHandlers) { return ({
        header: 'Cancel Order?',
        bodyHeader: "Are you sure you want to cancel the order?",
        bodyDescription: "We are still confirming the payment status with your bank. We will notify you once we get the status from the bank.",
        buttons: [
            {
                text: 'CANCEL ORDER',
                type: 'secondary',
                clickHandler: actionHandlers.cancelOrder
            },
            {
                text: 'STAY HERE',
                clickHandler: actionHandlers.toggleConfirmationModal
            }
        ]
    }); },
    WaitingForPayment_Retry: function (actionHandlers) { return ({
        header: 'Retry Payment?',
        bodyHeader: "Are you sure you want to retry the payment?",
        bodyDescription: "Your ongoing payment will be cancelled and if the amount was debited from your account, it will be refunded automatically within 72 hours.",
        buttons: [
            {
                text: 'RETRY PAYMENT',
                type: 'secondary',
                clickHandler: actionHandlers.retryPayment
            },
            {
                text: 'WAIT FOR SOMETIME',
                clickHandler: actionHandlers.toggleConfirmationModal
            }
        ]
    }); },
    OrderPlacedAsPOD_Cancel: function (actionHandlers) { return ({
        header: 'Cancel Order?',
        bodyHeader: "Are you sure you want to cancel the order?",
        bodyDescription: "You can pay online using the Pay Now option from orders or you can Pay on Delivery through Cash, Card or UPI",
        buttons: [
            {
                text: 'CANCEL ORDER',
                type: 'secondary',
                clickHandler: actionHandlers.cancelOrder
            },
            {
                text: 'KEEP THIS ORDER',
                clickHandler: function () {
                    return actionHandlers.toggleConfirmationModal({
                        eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_KEEP_CLICK'
                    });
                }
            }
        ],
        eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_OPEN'
    }); }
};
var modalContentGetter = function (actionHandlers) { return function (cardAction) {
    return CARDACTION_GETMODALCONTENT_MAP[cardAction](actionHandlers);
}; };


/***/ }),

/***/ "./browser/utils/ConfirmationConstants.js":
/*!************************************************!*\
  !*** ./browser/utils/ConfirmationConstants.js ***!
  \************************************************/
/***/ ((module) => {

module.exports = {
    blank: 'blank-blank',
    genderMap: {
        Men: 'male',
        Women: 'female',
        Unisex: 'Unisex'
    },
    myself: { id: 'myself', display: 'Myself' },
    others: { id: 'others', display: 'Others' },
    buttons: {
        cancel: 'CANCEL',
        save: 'SAVE',
        saving: 'SAVING...'
    },
    errorMessage: 'Something went wrong! Please reload.',
    addressTagError: 'Not able to update address',
    payAtConvenienceURL: 'https://constant.myntassets.com/checkout/assets/img/pay_at_convenience.png',
    myntraMailUrl: 'https://constant.myntassets.com/checkout/assets/img/myntraMail.webp',
    scratchCardRetentionConfig: {
        CARD_STATES: {
            SCRATCHED: 'SCRATCHED',
            LOCKED: 'LOCKED',
            UNSCRATCHED_EXPIRED: 'UNSCRATCHED_EXPIRED',
            SCRATCHED_EXPIRED: 'SCRATCHED_EXPIRED',
            UNSCRATCHED: 'UNSCRATCHED',
            USED: 'USED'
        },
        FEATURE_FLAG: {
            HRD: 'HRD',
            PS0_PS4: 'PS0_PS4'
        },
        DISCOUNT_TYPES: {
            PERCENTAGE: 'PERCENTAGE',
            ABSOLUTE: 'ABSOLUTE'
        }
    }
};


/***/ }),

/***/ "./browser/utils/LocalStorageUtils.js":
/*!********************************************!*\
  !*** ./browser/utils/LocalStorageUtils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setItem": () => (/* binding */ setItem),
/* harmony export */   "getItem": () => (/* binding */ getItem),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "removeItem": () => (/* binding */ removeItem)
/* harmony export */ });
var setItem = function (key, value) {
    try {
        window.localStorage.setItem(key, value);
    }
    catch (e) {
        console.error("Error writing into LocalStorage for \"".concat(key, "\"!. Error: ").concat(e));
    }
};
var getItem = function (key, parse) {
    if (parse === void 0) { parse = false; }
    var result, item;
    try {
        result = window.localStorage.getItem(key);
        item = parse ? JSON.parse(result) : result;
    }
    catch (e) {
        console.error("Some problems getting data from LocalStorage ".concat(typeof data, ", ").concat(key, ". Error: ").concat(e));
    }
    return item;
};
var clear = function () {
    try {
        window.localStorage.clear();
    }
    catch (e) {
        console.error("Error clearing LocalStorage, Error: ".concat(e));
    }
};
var removeItem = function (key) {
    try {
        window.localStorage.removeItem(key);
    }
    catch (e) {
        console.error("Error removing ".concat(key, " from LocalStorage, Error: ").concat(e));
    }
};


/***/ }),

/***/ "./utils/BannerConfigManager/index.js":
/*!********************************************!*\
  !*** ./utils/BannerConfigManager/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
Usage Example:
import { getBannerConfigValue } from 'commonUtils/BannerConfigManager';
const promoOfferConfig = getBannerConfigValue('PROMOTIONAL_OFFER');
*/
var isBrowser = typeof window !== 'undefined';
var get = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
var sanitizeValue = function (value, defaultValue, expectedType) {
    if (typeof expectedType === 'undefined' ||
        typeof value === typeof expectedType) {
        return value;
    }
    else if (typeof defaultValue === typeof expectedType) {
        return defaultValue;
    }
    else {
        try {
            var parsedValue = JSON.parse(defaultValue);
            return typeof parsedValue === typeof expectedType
                ? parsedValue
                : undefined;
        }
        catch (err) { }
    }
    return undefined;
};
var getBannerConfigValue = function (key, req) {
    var value = null;
    var configList = isBrowser
        ? get(window, '_checkout_.__myx_bannerconfig__', null)
        : get(req, 'myx.bannerconfig', null);
    var config = BannerConfigMap[key];
    if (config) {
        value = get(configList, "".concat(config.key), config.defaultValue);
    }
    if (value && typeof value === 'string') {
        try {
            value = JSON.parse(value);
        }
        catch (err) { }
    }
    value = config
        ? sanitizeValue(value, config.defaultValue, config.expectedType)
        : value;
    return value;
};
var getBannerConfigObject = function (key, defaultValue, expectedType) { return ({
    key: key,
    defaultValue: defaultValue,
    expectedType: expectedType
}); };
var BannerConfigMap = {
    PROMOTIONAL_OFFER: getBannerConfigObject('checkout.confirmation.promotionoffer', {
        enabled: false,
        offers: [{ image: '', url: '', disabledForDesktop: false }],
        slideInterval: 2000
    }, {})
};
module.exports = {
    BannerConfigMap: BannerConfigMap,
    getBannerConfigValue: getBannerConfigValue
};


/***/ })

}]);
//# sourceMappingURL=browser_components_confirmation_common_ConfirmationScreen_index_js-browser_components_confirm-ef0a4a.js.map