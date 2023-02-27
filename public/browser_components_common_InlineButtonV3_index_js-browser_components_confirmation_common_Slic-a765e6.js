(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_common_InlineButtonV3_index_js-browser_components_confirmation_common_Slic-a765e6"],{

/***/ "./browser/components/common/InlineButtonV3/index.js":
/*!***********************************************************!*\
  !*** ./browser/components/common/InlineButtonV3/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var _inlineButtonV3_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inlineButtonV3.base.css */ "./browser/components/common/InlineButtonV3/inlineButtonV3.base.css");




var InlineButton = function (_a) {
    var buttons = _a.buttons, _b = _a.containerClassName, containerClassName = _b === void 0 ? '' : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_inlineButtonV3_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container, " ").concat(containerClassName) }, buttons.map(function (btn, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_1__.default, { key: btn.id || index, className: "".concat(_inlineButtonV3_base_css__WEBPACK_IMPORTED_MODULE_2__.default.button, " ").concat(btn.type === 'secondary' ? _inlineButtonV3_base_css__WEBPACK_IMPORTED_MODULE_2__.default.secondary : '', " ").concat(btn.className || ''), onClick: btn.clickHandler }, btn.text)); })));
};
InlineButton.propTypes = {
    button1: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object),
    button2: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object),
    containerClassName: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    btnClassName: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InlineButton);


/***/ }),

/***/ "./browser/components/confirmation/common/SlickCarousel/index.js":
/*!***********************************************************************!*\
  !*** ./browser/components/confirmation/common/SlickCarousel/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slickCarousel.base.css */ "./browser/components/confirmation/common/SlickCarousel/slickCarousel.base.css");
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonResources/colors */ "./browser/components/resources/colors.js");
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonResources_colors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};






var isBrowser = typeof window !== 'undefined';
var isTouchMoveCalled = false, isTouchEndCalled = false, fireSreenLoadEvent = true;
var offerViewEvent = function (viewed, total) {
    triggerEvent('INLINE_OFFER_OFFER_VIEW', {
        custom: {
            custom: {
                v1: viewed,
                v2: total
            }
        }
    });
};
var SlickCarousel = function (props) {
    var children = props.children.length > 1
        ? __spreadArray(__spreadArray(__spreadArray([
            props.children[props.children.length - 1]
        ], props.children, true), props.children, true), [
            props.children[0]
        ], false) : props.children;
    var direction = 'right';
    var slideRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var dotsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var translateX = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var currTouchPos = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var intervalId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var animationId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var currentIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(1);
    var isPaymentPage = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'isPaymentPage', false);
    var getPositionX = function (event) {
        return event.type.includes('mouse') || event.type.includes('click')
            ? event.pageX
            : event.touches[0].pageX;
    };
    var onTouchStart = function (event) {
        clearInterval(intervalId.current);
        window.cancelAnimationFrame(animationId.current);
        currTouchPos.current = getPositionX(event);
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isDesktop)() &&
            slideRef.current.addEventListener('mousemove', onTouchMove, false);
    };
    var onTouchMove = function (event) {
        var pageX = getPositionX(event);
        if (pageX < 0) {
            pageX = 0;
        }
        var translateTo = Math.round(currTouchPos.current -
            pageX +
            slideRef.current.offsetWidth * currentIndex.current);
        if (pageX > currTouchPos.current) {
            direction = 'right';
            translateX.current = Math.abs(translateTo) * -1;
        }
        else {
            direction = 'left';
            translateX.current = translateTo * -1;
        }
        animateSlide(translateX.current, 'none');
        isTouchMoveCalled = true;
    };
    var setAutoScroll = function () {
        intervalId.current = setInterval(function () {
            if (currentIndex.current < children.length - 1) {
                currentIndex.current = currentIndex.current + 1;
                animationId.current = animateSlide(-slideRef.current.offsetWidth * currentIndex.current);
            }
        }, props.slideInterval);
    };
    var onTouchEnd = function (event) {
        !isPaymentPage && setAutoScroll();
        slideRef.current.removeEventListener('mousemove', onTouchMove, false);
        isTouchEndCalled = true;
        var translateTo;
        if (direction === 'right') {
            currentIndex.current -= 1;
            translateTo = slideRef.current.offsetWidth * currentIndex.current * -1;
        }
        else {
            var tempCurrIndex = currentIndex.current === children.length ? 0 : currentIndex.current + 1;
            translateTo = slideRef.current.offsetWidth * tempCurrIndex * -1;
            currentIndex.current += 1;
        }
        if (isTouchMoveCalled) {
            animateSlide(translateTo);
            isTouchMoveCalled = false;
        }
        else {
            if (fireSreenLoadEvent) {
                fireSreenLoadEvent = false;
                offerViewEvent(currentIndex.current + 1, props.children.length);
            }
        }
    };
    var animate = function (translateTo, transition) {
        slideRef.current.style.transition = transition
            ? transition
            : 'transform ease-out 500ms';
        slideRef.current.style.transform = "translate(".concat(translateTo, "px)");
        // color circle
        var childIdx = (currentIndex.current % (dotsRef.current.children.length + 1)) - 1;
        childIdx = childIdx < 0 ? 0 : childIdx;
        for (var i = 0; i < dotsRef.current.children.length; i++) {
            dotsRef.current.children[i].style.background = 'none';
        }
        dotsRef.current.children[childIdx].style.background = isPaymentPage
            ? (commonResources_colors__WEBPACK_IMPORTED_MODULE_3___default().grey_50)
            : (commonResources_colors__WEBPACK_IMPORTED_MODULE_3___default().watermelon_10);
        if (fireSreenLoadEvent &&
            (isTouchEndCalled || childIdx === props.children.length - 1)) {
            fireSreenLoadEvent = false;
            isTouchEndCalled = false;
            offerViewEvent(childIdx + 1, props.children.length);
        }
    };
    var animateSlide = function (translateTo, transition) {
        return isBrowser
            ? window.requestAnimationFrame(function () { return animate(translateTo, transition); })
            : animate(translateTo, transition);
    };
    var onTransitionEnd = function () {
        if (currentIndex.current === children.length - 1) {
            currentIndex.current = 1;
            var translateTo = -slideRef.current.offsetWidth;
            animateSlide(translateTo, 'none');
        }
        else if (currentIndex.current === 0) {
            currentIndex.current = children.length - 2;
            var translateTo = -slideRef.current.offsetWidth * currentIndex.current;
            animateSlide(translateTo, 'none');
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        if (props.children.length > 1) {
            setAutoScroll();
            //These below event Listener creating issue on iOS navigation links
            // slideRef.current.addEventListener('mousedown', onTouchStart, false);
            // slideRef.current.addEventListener('mousemove', onTouchMove, false);
            // slideRef.current.addEventListener('mouseup', onTouchEnd, false);
            slideRef.current.addEventListener('touchstart', onTouchStart, false);
            slideRef.current.addEventListener('touchmove', onTouchMove, false);
            slideRef.current.addEventListener('touchend', onTouchEnd, false);
            slideRef.current.addEventListener('transitionend', onTransitionEnd, false);
            if (isPaymentPage && (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.isDesktop)()) {
                slideRef.current.addEventListener('mousedown', onTouchStart, false);
                slideRef.current.addEventListener('mouseup', onTouchEnd, false);
            }
        }
        else {
            slideRef.current.style.transform = "none";
        }
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isPaymentPage ? _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.paymentConatiner : _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: slideRef, className: _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.slides }, children),
        props.showDots && props.children.length > 1 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.dots, ref: dotsRef }, props.children.map(function (item, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: index, className: "".concat(_slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.circle, " ").concat(isPaymentPage ? _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.circlePayment : _slickCarousel_base_css__WEBPACK_IMPORTED_MODULE_2__.default.circleOCP) })); }))) : null));
};
SlickCarousel.propTypes = {
    showDots: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
    slideInterval: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number)
};
SlickCarousel.defaultProps = {
    showDots: true,
    slideInterval: 2000
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlickCarousel);


/***/ }),

/***/ "./browser/components/resources/colors.js":
/*!************************************************!*\
  !*** ./browser/components/resources/colors.js ***!
  \************************************************/
/***/ ((module) => {

var COLORS = {
    mynt: '#03A685',
    mynt_5: '#f2faf9',
    mynt_10: '#e5f6f2',
    mynt_15: '#d9f2ed',
    mynt_20: '#0e8170',
    mynt_30: '#28d59b',
    blue: '#526CD0',
    blue_light: '#58acee',
    blue_5: '#788bd0',
    purple: '#7e007e',
    white: '#FFFFFF',
    white_alpha35: '#FFFFFF59',
    white_10: '#FFFFFF19',
    white_90: '#ffffffe6',
    blueberry_5: '#F4F4F5',
    blueberry_10: '#EAEAEC',
    blueberry_20: '#D4D5D9',
    blueberry_30: '#BFC0C6',
    blueberry_40: '#A9ABB3',
    blueberry_50: '#94969F',
    blueberry_60: '#7E818C',
    blueberry_70: '#696B79',
    blueberry_80: '#535766',
    blueberry_90: '#3E4152',
    blueberry_90_alpha35: '#3E415259',
    blueberry: '#282C3F',
    blueberry_alpha10: '#282C3F1A',
    orange: '#FFA500',
    orange_70: '#E95224',
    salmon: '#ff5722',
    salmon_50: '#FFF1EC',
    salmon_05: '#FFF6F4',
    salmon_10: '#feedec',
    salmon_20: '#f54541',
    silver_white: '#F6F2F7',
    light_salmon: '#F7F7F7',
    watermelon: '#FF3F6C',
    watermelon_10: '#E93962',
    watermelon_faded: '#FF8CA7',
    watermelon_15: '#CD305526',
    watermelon_20: '#FF3F6C33',
    watermelon_50: '#ff9fb5',
    yellow: '#ffd98e',
    yellow_10: '#F8F4EC',
    yellow_20: '#fff6e5',
    yellow_30: '#F8DFB3',
    yellow_40: '#E1C67E',
    yellow_50: '#FFB21A',
    yellow_60: '#FFAA01',
    yellow_70: '#BE9347',
    yellow_80: '#A3792E',
    yellow_light: '#fffadc',
    yellow_light_10: '#ffc800',
    golden_yellow: '#dbaa3b',
    golden_yellow_10: '#C7A358',
    golden_yellow_20: '#C99949',
    golden_yellow_30: '#DEC9A3',
    sunny_yellow: '#fee003',
    off_yellow: '#fef9e5',
    off_yellow_10: '#FFE9AE',
    dark_yellow: '#BE8413',
    black: '#000',
    black_10: '#27272f',
    black_30: '#0000004d',
    black_40: '#0E0F17',
    black_50: '#00000080',
    darkgrey: '#686b79',
    red: '#f16565',
    red_10: '#cd3055',
    dark_red: '#a40400',
    lightmintgreen: '#f4fff9',
    lightmintgreen_10: '#f0faf9',
    dark_green: '#14958f',
    gold_primary: '#A3792E',
    gold_secondary: '#E1C67E',
    gold_tertiary: '#C7A358',
    grey: '#f5f5f6',
    grey_1: '#e9e9e8',
    grey_5: '#e9e9eb',
    grey_10: '#F5F5F6',
    grey_15: '#E5E5E5',
    grey_20: '#D5D6D9',
    grey_25: '#d4d5d8',
    grey_30: '#7E808D',
    grey_40: '#f8f8f9',
    grey_50: '#93959E',
    grey_60: '#686B77',
    grey_80: '#979797',
    grey_400: '#BEBFC5',
    grey_500: '#EBEBED',
    grey_700: '#3D4152',
    green_10: '#e6f7f3',
    green_20: '#03a68518',
    green_200: '#b3e4da',
    green_600: '#17a185',
    midnight_black: '#13141E',
    midnight_black_secondary: '#1B1C25',
    amour: '#FFE9EE',
    amour_90: '#fff0f4',
    brink_pink: '#FF668A',
    light_pink: '#fde3f3',
    brown_yellow: '#d1b37e',
    golden_yellow: '#dbaa3b',
    golden_yellow_light: '#FFF3DE',
    golden_yellow_dark: '#AF8846',
    mustard_yellow: '#E99D07',
    mustard_yellow_dark: '#AD8031',
    mustard_yellow_light: '#E0C57D',
    sunny_yellow: '#fee003',
    off_yellow: '#fef9e5',
    dark_yellow: '#BE8413',
    lavender: '#fef4f7',
    transparent_80: '#141414cc',
    transparent: '#14141400',
    peach: '#ffe4da',
    orange_100: '#FFEEE8'
};
module.exports = COLORS;


/***/ })

}]);
//# sourceMappingURL=browser_components_common_InlineButtonV3_index_js-browser_components_confirmation_common_Slic-a765e6.js.map