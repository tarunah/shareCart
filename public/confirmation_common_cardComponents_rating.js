(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_cardComponents_rating"],{

/***/ "./browser/components/confirmation/common/CardComponents/components/Rating.js":
/*!************************************************************************************!*\
  !*** ./browser/components/confirmation/common/CardComponents/components/Rating.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RatingModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../RatingModule */ "./browser/components/confirmation/common/RatingModule/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_WkPromiseHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/WkPromiseHandler */ "./browser/utils/WkPromiseHandler/index.js");





var Rating = function (props) {
    var data = props.dataState.data;
    var canRateApp = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isMyntAppEnabled)(['canShowRateOptionWeb'])) {
            return MyntApp.canShowRateOptionWeb();
        }
        else {
            return commonBrowserUtils_WkPromiseHandler__WEBPACK_IMPORTED_MODULE_4__.default.callWKHandler(['canShowRateOptionWeb'])
                .then(function (result) { return result; })
                .catch(function () { return false; });
        }
    }, [commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isMyntAppEnabled, commonBrowserUtils_WkPromiseHandler__WEBPACK_IMPORTED_MODULE_4__.default]);
    var orderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId', '');
    var appFeedbackTriggerEvent = function (feedbackType, orderId) {
        triggerEvent('ORDER_CONFIRM_APP_FEEDBACK', {
            maData: {
                entity_id: orderId,
                entity_type: 'order'
            },
            custom: {
                widget: {
                    name: 'app_feedback',
                    type: 'button'
                },
                widget_items: {
                    name: feedbackType,
                    type: 'button'
                },
                event_type: 'widgetClick',
                event_category: 'Order Confirmation Page'
            }
        });
    };
    return (canRateApp() && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_RatingModule__WEBPACK_IMPORTED_MODULE_2__.default, { storeOrderId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId', ''), ratingClass: props.styleClass, appFeedbackTriggerEvent: function (feedbackType) {
            return appFeedbackTriggerEvent(feedbackType, orderId);
        } })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rating);


/***/ }),

/***/ "./browser/components/confirmation/common/RatingModule/index.js":
/*!**********************************************************************!*\
  !*** ./browser/components/confirmation/common/RatingModule/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./myntraExp.base.css */ "./browser/components/confirmation/common/RatingModule/myntraExp.base.css");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__);
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






var mailSubject = 'Feedback - Myntra Android App';
var mailTo = "appfeedback@myntra.com?Subject=".concat(mailSubject);
var RatingModule = /** @class */ (function (_super) {
    __extends(RatingModule, _super);
    function RatingModule(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sharedExp: !((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isSessionStorageEnabled)() &&
                sessionStorage.getItem("".concat(_this.props.storeOrderId, "-sharedExp")))
        };
        _this.isIOS = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isIOSApp)();
        _this.storeOrderId = _this.props.storeOrderId;
        _this.shareExperience = _this.shareExperience.bind(_this);
        _this.updateFeedbackAttempt = _this.updateFeedbackAttempt.bind(_this);
        return _this;
    }
    RatingModule.prototype.shareExperience = function () {
        this.setState({
            sharedExp: false
        });
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isSessionStorageEnabled)()) {
            sessionStorage.setItem("".concat(this.props.storeOrderId, "-sharedExp"), 'true');
        }
    };
    RatingModule.prototype.updateFeedbackAttempt = function (yesOptionPressed) {
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isAndroidApp)()) {
            if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isMyntAppEnabled)(['updateFeedbackAttempt'])) {
                MyntApp.updateFeedbackAttempt(yesOptionPressed);
            }
            if (yesOptionPressed && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isMyntAppEnabled)(['openStoreFromWeb'])) {
                MyntApp.openStoreFromWeb();
            }
            else if (!yesOptionPressed) {
                window.open('mailto:' + mailTo);
            }
            var feedbackType = yesOptionPressed ? 'Yes' : 'No';
            this.props.appFeedbackTriggerEvent(feedbackType);
        }
    };
    RatingModule.prototype.render = function () {
        var _this = this;
        return this.state.sharedExp &&
            !this.isIOS &&
            !(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('RATING_WIDGET') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: this.props.ratingClass || '' },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.expContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.myntraExpIcon },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "mobile-exp", className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.myntraMobile })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.subText },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Would you like to spread some love?"),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "spread-love-stars", className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.spreadLoveStars }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.yesNoBlock, onClick: this.shareExperience },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.notSatisfied, onClick: function () { return _this.updateFeedbackAttempt(false); } },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "NO"),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Give Feedback"))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _myntraExp_base_css__WEBPACK_IMPORTED_MODULE_3__.default.satisfied, onClick: function () { return _this.updateFeedbackAttempt(true); } },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "YES"),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Rate us on Play Store")))))) : null;
    };
    return RatingModule;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
RatingModule.propTypes = {
    storeOrderId: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    ratingClass: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    appFeedbackTriggerEvent: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RatingModule);


/***/ })

}]);
//# sourceMappingURL=confirmation_common_cardComponents_rating.js.map