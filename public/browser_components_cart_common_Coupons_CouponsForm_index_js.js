(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_cart_common_Coupons_CouponsForm_index_js"],{

/***/ "./browser/components/cart/common/Coupons/Coupon/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/cart/common/Coupons/Coupon/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coupon.base.css */ "./browser/components/cart/common/Coupons/Coupon/coupon.base.css");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonComp_ReadMore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ReadMore */ "./browser/components/common/ReadMore/index.js");
/* harmony import */ var commonComp_Timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Timer */ "./browser/components/common/Timer/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
/* harmony import */ var iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/CheckboxActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxActive.jsx");
/* harmony import */ var iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! iconComp/CheckboxInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxInactive.jsx");
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");












var CustomCheckBox = function (props) {
    var label = props.label, checked = props.checked, onClick = props.onClick, expired = props.expired;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.customCheckbox, onClick: onClick },
        checked ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_8__.default, { className: "".concat(_coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.selectedCheckboxIcon, " ").concat(expired ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCouponIcon : '') })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_9__.default, { className: "".concat(_coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.checkboxIcon, " ").concat(expired ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCouponIcon : '') })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(checked ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.labelChecked : _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.labelUnchecked, " ").concat(expired ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCoupon : '') }, label)));
};
var onClickViewApplicableItem = function (code, analytics) {
    triggerEvent('CLICK_VIEW_APPLICABLE_ITEMS', {
        custom: {
            custom: {
                v1: code.toUpperCase()
            }
        }
    });
};
var Coupon = function (props) {
    var onCouponClick = props.onCouponClick, selectedCoupon = props.selectedCoupon, benefitAmount = props.benefitAmount, description = props.description, expiry = props.expiry, code = props.code, link = props.link, message = props.message, isApplicableCouponEmpty = props.isApplicableCouponEmpty;
    var errorMessage = props.errorMessage;
    var expiryPrefix = 'Expires on: ';
    var expiryDateObject = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getDateObject)(new Date(parseInt(expiry)), true, false);
    var expiryDate = '-';
    var expiryTime = '-';
    if (expiryDateObject) {
        var expiryTimeObject = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryDateObject, 'time');
        expiryDate = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryDateObject, 'date'), " ").concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryDateObject, 'monthInWords'), " ").concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryDateObject, 'year'));
        expiryTime = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryTimeObject, 'hours'), ":").concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryTimeObject, 'minutes'), " ").concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expiryTimeObject, 'suffix'));
    }
    var today = new Date();
    var expired = false;
    var isPotentialCoupon = false;
    if (link && message) {
        isPotentialCoupon = true;
    }
    if (today > expiry) {
        errorMessage = 'Coupon Expired.';
        expired = true;
    }
    var isCouponDisable = expired || isPotentialCoupon;
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), timerExpired = _a[0], setTimerExpired = _a[1];
    var timerCallback = function () {
        setTimerExpired(true);
    };
    var expiryData = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getFullDateDiff)(expiry);
    var isCouponExpiryEnabled = !!((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.isApp)() &&
        expiryData.days === 0 &&
        expiryData.hours < (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_6__.getGrowthHackConfigValue)('COUPON_EXPIRY').maximumTime &&
        !timerExpired);
    if (isPotentialCoupon) {
        isCouponExpiryEnabled = isCouponExpiryEnabled && isApplicableCouponEmpty;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.validCouponContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isCouponDisable ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCoupon : '' },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CustomCheckBox, { label: code.toUpperCase(), checked: selectedCoupon, expired: isCouponDisable, onClick: function () {
                    !isCouponDisable && onCouponClick(code);
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.infoContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.benefit, " ").concat(isCouponDisable ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCoupon : '') },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Save "),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(_coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.amount, " ").concat(isCouponDisable ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCoupon : '') },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_7__.default, { className: "".concat(isCouponDisable ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredRupeeIcon : _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeIcon) }),
                        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.currencyValue)(benefitAmount))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.extraInfo, " ").concat(isCouponDisable ? _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredCoupon : '') },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ReadMore__WEBPACK_IMPORTED_MODULE_4__.default, { buttonText: 'more' }, "".concat(description, " ").concat(description ? '.' : '')),
                    isCouponExpiryEnabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.couponExpiryBlock },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.couponExpiryContainer },
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.couponExpiryText }, "Expiring in"),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Timer__WEBPACK_IMPORTED_MODULE_5__.default, { hours: expiryData.hours, minutes: expiryData.minutes, seconds: expiryData.seconds, className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.couponExpiryTimer, stopCallback: timerCallback })))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiryBlock },
                        expiryPrefix,
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiryDate }, expiryDate),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiryTime }, expiryTime))),
                    isPotentialCoupon ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("hr", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.separator }),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.extraInfo }, message),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.extraInfoLink },
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.viewApplicableItem, href: link, onClick: function () {
                                    return onClickViewApplicableItem(code, props.analytics);
                                } },
                                "View applicable items \u00A0",
                                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_10__.default, { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.arrowIcon }))))) : ('')))),
        errorMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _coupon_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorMessage }, errorMessage))));
};
Coupon.propTypes = {
    expiry: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().node.isRequired),
    code: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string.isRequired),
    benefitAmount: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number.isRequired),
    description: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string.isRequired),
    selectedCoupon: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool.isRequired),
    link: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),
    message: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Coupon);


/***/ }),

/***/ "./browser/components/cart/common/Coupons/CouponsForm/index.js":
/*!*********************************************************************!*\
  !*** ./browser/components/cart/common/Coupons/CouponsForm/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CouponFormInput": () => (/* binding */ CouponFormInput),
/* harmony export */   "CouponsForm": () => (/* binding */ CouponsForm)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./couponsForm.base.css */ "./browser/components/cart/common/Coupons/CouponsForm/couponsForm.base.css");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Coupon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Coupon */ "./browser/components/cart/common/Coupons/Coupon/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var vision_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vision/components/Button */ "../node_modules/@myntra/vision/lib/components/Button.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! iconComp/RupeeBold.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RupeeBold.jsx");
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












var CouponBanner = function () {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bannerContainer, " ").concat(_couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.floatLeft) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_4__.default, { name: "couponform-banner", className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bannerSprite }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bannerContent },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.boldContent }, "Our coupons just got bigger and better"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.message },
                "Now you can apply",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bold }, " more than one coupon "),
                " to your bag and save more!"))));
};
var RetryComponent = function (props) {
    var onRetryAction = props.onRetryAction;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.retryMainContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.retryTextContainer }, "Oops! something went wrong."),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.notifyActionDiv },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", { onClick: onRetryAction, className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.retryButton }, "RETRY"))));
};
var DisplayCoupon = function (props) {
    var couponType = props.couponType;
    var analytics = props.analytics;
    var coupons = couponType === 'potentialCoupons' ? props.potentialCoupons : props.coupons;
    var isApplicableCouponEmpty = props.coupons.length === 0;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        couponType === 'potentialCoupons' && coupons.length > 0 && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.potentialCouponSectionHeader },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.moreOffers }, props.couponContainerHeader))),
        Array.isArray(coupons) && coupons.length !== 0
            ? coupons.map(function (coupon) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Coupon__WEBPACK_IMPORTED_MODULE_3__.default, { key: coupon.code, analytics: analytics, expiry: coupon.expiry, code: coupon.code, onCouponClick: couponType === 'potentialCoupons' ? '' : props.onCouponClick, benefitAmount: couponType === 'potentialCoupons'
                    ? coupon.benefit
                    : ((lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(coupon, 'discountUnits') || []).find(function (obj) { return lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(obj, 'unit') === 'RUPEE'; }) || {}).value || 0, description: coupon.description, errorMessage: coupon.status === 'ERROR' ? coupon.message : '', selectedCoupon: couponType === 'potentialCoupons'
                    ? ''
                    : props.couponSelectionStatus[coupon.code], link: couponType === 'potentialCoupons' ? coupon.tagLink : '', message: couponType === 'potentialCoupons' ? coupon.message : '', isApplicableCouponEmpty: isApplicableCouponEmpty })); })
            : props.retry && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(RetryComponent, { onRetryAction: props.onRetryAction })));
};
var CouponFormInput = function (props) {
    var enableInputField = props.couponInput.trim() !== '';
    var tagLink = props.tagLink;
    var isValidLink = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_8__.isValidUrl)(tagLink);
    var isDesktop = !(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isMobile)();
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.applyCouponContainer, " ").concat(props.errorMessage && isDesktop ? _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.errorPadding : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.formContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.textInputContainer, " ").concat(props.errorMessage ? _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.textInputError : '', " ").concat(enableInputField ? _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.enabledTextInput : '') },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { id: "coupon-input-field", className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.textInput, placeholder: "Enter coupon code", onChange: props.setCouponCode, value: props.couponInput }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.applyButton, " ").concat(enableInputField ? _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.enabled : ''), onClick: enableInputField ? props.applyCoupon : undefined, "data-method": "couponInputApply" }, "CHECK")),
            props.errorMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.errorMessage }, props.errorMessage),
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('VIEW_RELEVANT_PRODUCT') && isValidLink && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: tagLink, className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.viewApplicable },
                    "VIEW APPLICABLE PRODUCTS",
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_9__.default, { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.arrowIcon }))))))));
};
var CouponsForm = function (props) {
    var setCouponCode = props.setCouponCode, couponInput = props.couponInput, errorMessage = props.errorMessage, applyCoupon = props.applyCoupon, loading = props.loading, coupons = props.coupons, potentialCoupons = props.potentialCoupons, maximumSavings = props.maximumSavings, renderBannerFG = props.renderBannerFG, tagLink = props.tagLink;
    var couponContainerHeader = coupons.length <= 0 ? 'UNLOCK COUPONS' : 'UNLOCK MORE COUPONS';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponsPageContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.scroll },
            renderBannerFG ? react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CouponBanner, null) : null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CouponFormInput, { setCouponCode: setCouponCode, couponInput: couponInput, errorMessage: errorMessage, applyCoupon: applyCoupon, tagLink: tagLink }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponsContainer }, (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('BAG_COUPON_CARD') && loading ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.loaderContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_10__.default, { show: loading, className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.loaderInContainer }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayCoupon, __assign({ couponType: "coupons", couponContainerHeader: couponContainerHeader }, props)),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayCoupon, __assign({ couponType: "potentialCoupons", couponContainerHeader: couponContainerHeader }, props)),
                !loading &&
                    coupons.length <= 0 &&
                    potentialCoupons.length <= 0 && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.noCouponMessage }, "No other coupons available")))))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.stickyButton },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.savingsMessage },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.message }, "Maximum savings:"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.price },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_11__.default, { className: _couponsForm_base_css__WEBPACK_IMPORTED_MODULE_1__.default.boldRupeeIcon }),
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.currencyValue)(maximumSavings))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(vision_components_Button__WEBPACK_IMPORTED_MODULE_5__.default, { variant: "contained", id: "applyCoupon", width: "60%", letterSpacing: "1px", onClick: applyCoupon, "data-method": "couponFormApply" }, "APPLY"))));
};


/***/ }),

/***/ "./browser/components/common/ReadMore/index.js":
/*!*****************************************************!*\
  !*** ./browser/components/common/ReadMore/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _readmore_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readmore.base.css */ "./browser/components/common/ReadMore/readmore.base.css");
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


// Usage
// Use the mainContainerClass and buttonContainerClass attributes for customizing the ReadMore component
// <ReadMore buttonText={'more'} mainContainerClass={Styles.mainContainerClass} buttonContainerClass={Styles.buttonContainerClass}>
//   <component/> || Text
// </ReadMore>
var ReadMore = /** @class */ (function (_super) {
    __extends(ReadMore, _super);
    function ReadMore(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            expanded: false,
            overFlow: false
        };
        _this.toggleReadMore = _this.toggleReadMore.bind(_this);
        _this.firstRender = true;
        _this.enableClick = false;
        ['setRef'].forEach(function (member) { return (_this[member] = _this[member].bind(_this)); });
        return _this;
    }
    ReadMore.prototype.isOverFlowing = function (e) {
        return e.offsetWidth < e.scrollWidth;
    };
    //First render happens and it is found out weather overflow occurs or not, Then the state is changed
    //to re-render the component with more button.
    ReadMore.prototype.componentDidMount = function () {
        var overFlow = this.isOverFlowing(this.expandableDiv);
        if (this.firstRender) {
            //if overflow occurs in first render with full width. Then clicking is enabled
            this.enableClick = overFlow;
            this.firstRender = false;
        }
        this.setState({ overFlow: overFlow });
    };
    ReadMore.prototype.toggleReadMore = function (e) {
        e.stopPropagation(); //click propagation has been stopped because in preact the click event in the readMore DIV also closes the modal
        this.enableClick &&
            this.setState(function (prevState) { return ({ expanded: !prevState.expanded }); });
    };
    ReadMore.prototype.setRef = function (ref) {
        this.expandableDiv = ref;
    };
    ReadMore.prototype.render = function () {
        var _a = this.props, children = _a.children, buttonText = _a.buttonText, mainContainerClass = _a.mainContainerClass, buttonContainerClass = _a.buttonContainerClass;
        var _b = this.state, expanded = _b.expanded, overFlow = _b.overFlow;
        var _c = this, firstRender = _c.firstRender, setRef = _c.setRef;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_readmore_base_css__WEBPACK_IMPORTED_MODULE_1__.default.mainContainer, " ").concat(mainContainerClass ? mainContainerClass : ''), onClick: this.toggleReadMore },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: firstRender
                    ? _readmore_base_css__WEBPACK_IMPORTED_MODULE_1__.default.fullWidthContainer
                    : overFlow && !expanded
                        ? _readmore_base_css__WEBPACK_IMPORTED_MODULE_1__.default.slicedContainer
                        : _readmore_base_css__WEBPACK_IMPORTED_MODULE_1__.default.expandedContainer, ref: setRef }, children),
            overFlow && !expanded && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_readmore_base_css__WEBPACK_IMPORTED_MODULE_1__.default.readMore, " ").concat(buttonContainerClass ? buttonContainerClass : '') }, buttonText))));
    };
    return ReadMore;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadMore);


/***/ })

}]);
//# sourceMappingURL=browser_components_cart_common_Coupons_CouponsForm_index_js.js.map