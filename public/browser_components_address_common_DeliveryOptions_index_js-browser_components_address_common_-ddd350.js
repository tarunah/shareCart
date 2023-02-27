(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_address_common_DeliveryOptions_index_js-browser_components_address_common_-ddd350"],{

/***/ "./browser/components/address/common/DeliveryOptions/DeliveryBlocks/index.js":
/*!***********************************************************************************!*\
  !*** ./browser/components/address/common/DeliveryOptions/DeliveryBlocks/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deliveryBlocks.base.css */ "./browser/components/address/common/DeliveryOptions/DeliveryBlocks/deliveryBlocks.base.css");
/* harmony import */ var commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ToolTip */ "./browser/components/common/ToolTip/index.js");
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
/* harmony import */ var iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/RupeeBold.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RupeeBold.jsx");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");


// Styles

// Components

// Utils




var getDeliveryDates = function (minDays, maxDays) {
    return minDays === maxDays
        ? (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__.getEstimatedDate)(maxDays, { hideYear: true })
        : "".concat((0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__.getEstimatedDate)(minDays, {
            hideYear: true
        }), " - ").concat((0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__.getEstimatedDate)(maxDays, { hideYear: true }));
};
var DeliveryBlocks = function (props) {
    var title = props.title, highlightText = props.highlightText, charges = props.charges, maxDays = props.maxDays, minDays = props.minDays, tryNBuyEligible = props.tryNBuyEligible, isFestiveTime = props.isFestiveTime, valueShippingCharge = props.valueShippingCharge;
    var subTitle = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
            "Get it by ",
            getDeliveryDates(props.minDays, maxDays),
            " | "),
        charges ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Convenience fee "),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, charges))) : ('No convenience fee')));
    var orderDay = maxDays ? ' tommorow' : '';
    if (minDays < 0) {
        if (minDays === -1) {
            subTitle = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                "Get by tomorrow 8 PM |",
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " Delivery Charge "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, charges)));
        }
        else {
            subTitle = "For orders placed before 7 PM ".concat(orderDay, ".");
        }
    }
    if (isFestiveTime) {
        subTitle = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                "For orders placed before 11 AM ",
                orderDay,
                "."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Delivey Charge "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.strike }, "149"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " Now just for "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                charges)));
    }
    if (valueShippingCharge) {
        subTitle = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.deliveryDates },
                "Get it by ",
                getDeliveryDates(minDays, maxDays),
                " |",
                ' '),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.save },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Save "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
                    valueShippingCharge,
                    " ")),
            charges >= valueShippingCharge && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "( "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
                    charges - valueShippingCharge,
                    " "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.strike }, charges),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, ")"))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_2__.default, { elem: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tooltipInfoIcon }), className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.toolTipText, tipStyle: {
                    top: -6,
                    left: -2
                } }, "Value Shipping will be applied as an additional discount on the order value. The shipments will take 5 more days than Standard Delivery date.")));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.deliveryOption },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title },
            title,
            highlightText && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.highlight }, highlightText))),
        subTitle,
        !tryNBuyEligible && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryBlocks_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tryNBuyInfo }, "Try & Buy is not available with this option"))));
};
DeliveryBlocks.propTypes = {
    title: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_7___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_7___default().element)]),
    minDays: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    maxDays: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    charges: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    isFestiveTime: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    tryNBuyEligible: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeliveryBlocks);


/***/ }),

/***/ "./browser/components/address/common/DeliveryOptions/index.js":
/*!********************************************************************!*\
  !*** ./browser/components/address/common/DeliveryOptions/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var commonComp_Radio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Radio */ "./browser/components/common/Radio/index.js");
/* harmony import */ var _DeliveryBlocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DeliveryBlocks */ "./browser/components/address/common/DeliveryOptions/DeliveryBlocks/index.js");
/* harmony import */ var _deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./deliveryOptions.base.css */ "./browser/components/address/common/DeliveryOptions/deliveryOptions.base.css");
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
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


// Utils




// Components


// Styles


var shippingMethodKey = {
    normal: 'NORMAL',
    valueshipping: 'VALUE_SHIPPING',
    sdd: 'SDD',
    expressshipping: 'EXPRESS'
};
var shippingMethodValueMap = {
    NORMAL: 'normal',
    VALUE_SHIPPING: 'valueshipping',
    SDD: 'sdd',
    EXPRESS: 'expressshipping'
};
var DeliveryOptions = /** @class */ (function (_super) {
    __extends(DeliveryOptions, _super);
    function DeliveryOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.selectShippingMethod = _this.selectShippingMethod.bind(_this);
        _this.getOptions = _this.getOptions.bind(_this);
        return _this;
    }
    DeliveryOptions.prototype.selectShippingMethod = function (value, onClickParams, e) {
        var toolTip = e.currentTarget.querySelector('.toolTip-base-container');
        if (toolTip && toolTip.contains(e.target)) {
            return;
        }
        var method = shippingMethodValueMap[value];
        var currentMethodKey = this.props.shippingData.method;
        if (value !== currentMethodKey) {
            var gaLabel = 'standard_delivery';
            method === 'expressshipping' && (gaLabel = 'next_day_delivery');
            method === 'sdd' && (gaLabel = 'same_day_delivery');
            triggerEvent('SHIPPING_METHOD_CLICK', { gaLabel: gaLabel });
            this.props.handleCartAction('applyShippingMethod', method);
        }
    };
    DeliveryOptions.prototype.getOptions = function (type) {
        var _a = this.props, valueShippingInfo = _a.valueShippingInfo, sddShippingInfo = _a.sddShippingInfo, expressShippingInfo = _a.expressShippingInfo, method = _a.shippingData.method, productDeliveryInfo = _a.productDeliveryInfo, pincode = _a.addressInfo.pincode, shippingCharge = _a.shippingCharge, _b = _a.serviceabilityFlags, expressShippingEnabled = _b.expressShipping.value, sddShippingEnabled = _b.sddShipping.value, valueShippingEnabled = _b.valueShipping.value;
        var isFestiveTime = false;
        var charges = shippingCharge;
        var deliveryPromise;
        var title;
        var highlightText;
        var tryNBuyEligible = true;
        var valueShippingCharge;
        switch (type) {
            case 'NORMAL': {
                deliveryPromise = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_4__.getChangedDeliveryPromise)({
                    productDeliveryInfo: productDeliveryInfo,
                    pincode: pincode,
                    type: type
                });
                title = 'Standard Delivery';
                break;
            }
            case 'VALUE_SHIPPING': {
                if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('VALUE_SHIPPING') || !valueShippingEnabled) {
                    return null;
                }
                deliveryPromise = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_4__.getChangedDeliveryPromise)({
                    productDeliveryInfo: productDeliveryInfo,
                    pincode: pincode,
                    type: type
                });
                title = 'Value Shipping';
                highlightText = 'SPECIAL OFFER';
                valueShippingCharge = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('VALUE_SHIPPING_CHARGES');
                tryNBuyEligible = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(valueShippingInfo, 'flags.tryNBuy.value', false);
                break;
            }
            case 'SDD': {
                if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('SDD') || !sddShippingEnabled) {
                    return null;
                }
                deliveryPromise = sddShippingInfo.deliveryPromise;
                deliveryPromise.minDays = -1;
                isFestiveTime = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('SDD_FESTIVE_OFFER');
                title = "".concat(!deliveryPromise.maxDays ? 'Same' : 'Next', " Day Delivery");
                highlightText = isFestiveTime ? 'FESTIVE OFFER' : '';
                charges = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('SDD_CHARGES');
                tryNBuyEligible = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(sddShippingInfo, 'flags.tryNBuy.value', false);
                break;
            }
            case 'EXPRESS': {
                if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('NDD') || !expressShippingEnabled) {
                    return null;
                }
                deliveryPromise = expressShippingInfo.deliveryPromise;
                deliveryPromise.minDays = -2;
                var titleText = 'Tomorrow';
                if (deliveryPromise.maxDays > 1) {
                    titleText = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_4__.getEstimatedDate)(deliveryPromise.maxDays, {
                        hideYear: true
                    });
                }
                title = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
                    'Get it by ',
                    titleText,
                    ', for ',
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_8__.default, { className: _deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.boldRupeeIcon }),
                    (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('NDD_CHARGES')));
                charges = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('NDD_CHARGES');
                tryNBuyEligible = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(expressShippingInfo, 'flags.tryNBuy.value', false);
                break;
            }
            default: {
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_DeliveryBlocks__WEBPACK_IMPORTED_MODULE_6__.default, __assign({ type: type, title: title, highlightText: highlightText, tryNBuyEligible: !this.tryAndBuyOpted || tryNBuyEligible, isFestiveTime: isFestiveTime, charges: charges, valueShippingCharge: valueShippingCharge }, deliveryPromise)));
    };
    DeliveryOptions.prototype.render = function () {
        var _this = this;
        var _a = this.props, method = _a.shippingData.method, className = _a.className, headerClassName = _a.headerClassName, canHide = _a.canHide, _b = _a.products, products = _b === void 0 ? [] : _b;
        this.tryAndBuyOpted =
            (products.find(function (product) { return product.tryAndBuyOpted; }) || {}).tryAndBuyOpted ||
                false;
        var shippingOptions = ['NORMAL', 'VALUE_SHIPPING', 'SDD', 'EXPRESS']
            .map(function (option, index) {
            return !!_this.getOptions(option) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Radio__WEBPACK_IMPORTED_MODULE_5__.RadioButton, { key: "deliveryOption_".concat(index), id: "deliveryOption_".concat(index), className: "".concat(_deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.deliveryOption, " ").concat(className), classes: { icon: _deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.radioIcon }, value: option }, _this.getOptions(option)));
        })
            .filter(function (isNull) { return !!isNull; });
        if (canHide && shippingOptions.length < 2) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.title, " ").concat(headerClassName) }, "CHOOSE DELIVERY SPEED"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Radio__WEBPACK_IMPORTED_MODULE_5__.RadioGroup, { className: _deliveryOptions_base_css__WEBPACK_IMPORTED_MODULE_7__.default.optionsContainer, name: "deliveryOption", value: method, onChange: this.selectShippingMethod }, shippingOptions)));
    };
    return DeliveryOptions;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
DeliveryOptions.propTypes = {
    shippingData: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    standardShippingInfo: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    valueShippingInfo: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    sddShippingInfo: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    expressShippingInfo: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    products: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeliveryOptions);


/***/ }),

/***/ "./browser/components/address/common/NotServiceableHeader/index.js":
/*!*************************************************************************!*\
  !*** ./browser/components/address/common/NotServiceableHeader/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var _notServiceableHeader_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notServiceableHeader.base.css */ "./browser/components/address/common/NotServiceableHeader/notServiceableHeader.base.css");


// Styles

var goToCart = function (pincode) { return function () {
    triggerEvent('NOT_SERVICEABLE_ADDRESS_GO_TO_BAG', { gaLabel: pincode });
    SHELL.redirectTo('/checkout/cart');
}; };
var NotServiceableHeader = function (_a) {
    var isAllEssentialItemsServiceable = _a.isAllEssentialItemsServiceable, pincode = _a.pincode, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_notServiceableHeader_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container, " ").concat(className) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_1__.getNotServiceableMessage)({
            isAllEssentialItemsServiceable: isAllEssentialItemsServiceable,
            type: 'header',
            pincode: pincode
        })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _notServiceableHeader_base_css__WEBPACK_IMPORTED_MODULE_2__.default.button, onClick: goToCart(pincode) }, "GO TO BAG")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotServiceableHeader);


/***/ }),

/***/ "./browser/components/address/common/Serviceability/index.js":
/*!*******************************************************************!*\
  !*** ./browser/components/address/common/Serviceability/index.js ***!
  \*******************************************************************/
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
/* harmony import */ var _myntra_range_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @myntra/range-util */ "../node_modules/@myntra/range-util/dist/index.js");
/* harmony import */ var _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serviceability.base.css */ "./browser/components/address/common/Serviceability/serviceability.base.css");
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/abtestManager */ "./utils/abtestManager/index.js");
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonComp_Timer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/Timer */ "./browser/components/common/Timer/index.js");
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




// Styles

// Utils







var TryAndBuyInfo = function (_a) {
    var tryNBuyServiceable = _a.tryNBuyServiceable, tryNBuyAvailable = _a.tryNBuyAvailable, tryNBuyApplicable = _a.tryNBuyApplicable;
    var enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('TRY_AND_BUY');
    if (!enabled || !tryNBuyAvailable || !tryNBuyApplicable) {
        return null;
    }
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.tryNBuyInfo }, "Eligible for Try & Buy");
};
var DeliverEstimation = /** @class */ (function (_super) {
    __extends(DeliverEstimation, _super);
    function DeliverEstimation(props) {
        var _this = _super.call(this, props) || this;
        _this.showDaysToDelivery = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('DAYS_TO_DELIVERY');
        _this.userUidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getUidx)();
        _this.rangeBasedDate = null;
        return _this;
    }
    DeliverEstimation.prototype.componentDidMount = function () {
        var _a = this.props, pincode = _a.pincode, serviceable = _a.serviceable, styleId = _a.styleId;
        if (!serviceable) {
            triggerEvent('NOT_SERVICEABLE_ADDRESS_ITEM', {
                gaLabel: "".concat(pincode, "_").concat(styleId)
            });
        }
    };
    DeliverEstimation.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, pincode = _a.pincode, serviceable = _a.serviceable, styleId = _a.styleId;
        if (!serviceable && prevProps.serviceable !== serviceable) {
            triggerEvent('NOT_SERVICEABLE_ADDRESS_ITEM', {
                gaLabel: "".concat(pincode, "_").concat(styleId)
            });
        }
    };
    DeliverEstimation.prototype.render = function () {
        var _this = this;
        var _a = this.props, image = _a.image, tryNBuyInfo = _a.tryNBuyInfo, showLabel = _a.showLabel, shippingMethod = _a.shippingMethod, tryNBuyServiceable = _a.tryNBuyServiceable, expressDeliveryAvailable = _a.expressDeliveryAvailable, expressDeliveryThreshold = _a.expressDeliveryThreshold, isAllEssentialItemsServiceable = _a.isAllEssentialItemsServiceable, pincode = _a.pincode, tryNBuyApplicable = _a.tryNBuyApplicable, serviceable = _a.serviceable, isEssential = _a.isEssential, eligibileShippingAttribute = _a.eligibileShippingAttribute, _b = _a.shippingEstimates, shippingEstimates = _b === void 0 ? [] : _b, updateDeliveryEstimates = _a.updateDeliveryEstimates;
        var imageUrl = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.transformImageUrl)(image.secureSrc, '64', '48', '100');
        var estimate, isSpeed11, estimateInDays, isExpressDeliveryItem, estimatedDate, showOrderBy, orderByDateDiff, estimateMap = {
            HYPERLOCAL: [],
            SDD: [],
            EXPRESS: [],
            NORMAL: [],
            VALUE_SHIPPING: []
        };
        if (shippingEstimates.length > 0) {
            shippingEstimates.forEach(function (est, idx) {
                var _a;
                est && est.shippingMethod && ((_a = estimateMap[est.shippingMethod]) === null || _a === void 0 ? void 0 : _a.push(est));
            });
            if (estimateMap.HYPERLOCAL.length > 0) {
                estimate = estimateMap.HYPERLOCAL[0];
            }
            else if (estimateMap.SDD.length > 0) {
                estimate = estimateMap.SDD[0];
            }
            else if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('SPEED_11') &&
                estimateMap.EXPRESS.length > 0) {
                estimate = estimateMap.EXPRESS[0];
                isSpeed11 = true;
            }
            else if (estimateMap.NORMAL.length > 0) {
                estimate = estimateMap.NORMAL[0];
            }
            else if (estimateMap.VALUE_SHIPPING.length > 0) {
                estimate = estimateMap.VALUE_SHIPPING[0];
            }
            if (isSpeed11) {
                estimateInDays = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getDateDiff)(new Date(), lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'promiseDate'));
                estimatedDate = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getTimeBasedDate)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'promiseDate'));
            }
            else {
                var currentDate = new Date();
                estimateInDays = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getDateDiff)(currentDate, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'promiseDate'));
                isExpressDeliveryItem =
                    expressDeliveryAvailable &&
                        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('SHOW_EXPRESS_DELIVERY') &&
                        estimateInDays <= expressDeliveryThreshold;
                estimateInDays = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_8__.getChangedShippingEstimate)(estimateInDays, estimate === null || estimate === void 0 ? void 0 : estimate.shippingMethod, pincode);
                estimatedDate = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_8__.getEstimatedDate)(estimateInDays);
            }
            triggerEvent('ADDRESS_DAYS_TO_DELIVERY', {
                custom: {
                    custom: {
                        v1: this.userUidx,
                        v2: estimateInDays,
                        v3: shippingMethod,
                        v4: eligibileShippingAttribute
                    },
                    widget: {
                        name: 'address_delivery_time',
                        type: 'card'
                    },
                    event_type: 'widgetLoad'
                }
            });
            orderByDateDiff = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getFullDateDiff)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'orderBy'));
            showOrderBy =
                orderByDateDiff.hours >= 0 &&
                    orderByDateDiff.minutes >= 0 &&
                    orderByDateDiff.seconds >= 0 &&
                    isSpeed11 &&
                    (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('CART_ITEM_ORDER_BY');
        }
        var getRangeBasedDates = function (promiseDate) {
            var RangeBasedBucketName = (0,commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_4__.getAbtest)('RANGE_BASED_PROMISE');
            var rangeBasedInfo = (0,_myntra_range_util__WEBPACK_IMPORTED_MODULE_2__.getDeliverRangeInfo)(Number(promiseDate), RangeBasedBucketName);
            if ((rangeBasedInfo === null || rangeBasedInfo === void 0 ? void 0 : rangeBasedInfo.isRangeApplicable) &&
                promiseDate &&
                !_this.showDaysToDelivery &&
                !isSpeed11) {
                _this.rangeBasedDate = (0,_myntra_range_util__WEBPACK_IMPORTED_MODULE_2__.getDeliveryDateRange)(Number(promiseDate), RangeBasedBucketName, rangeBasedInfo.diff);
                return 'Delivery between';
            }
            _this.rangeBasedDate = "".concat(estimatedDate).concat(_this.showDaysToDelivery && !isSpeed11
                ? " - in ".concat(estimateInDays, " ").concat(estimateInDays > 1 ? 'Days' : 'Day')
                : '');
            return commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_9__.default.DELIVERY_ESTIMATED_MESSAGE;
        };
        var deliveryOrderNowAB = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('ADDRESS_DELIVERY_ORDER_NOW');
        var preText = deliveryOrderNowAB === 'orderNowStart'
            ? commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_9__.default.DELIVERY_ORDER_NOW_START
            : deliveryOrderNowAB === 'orderNowEnd'
                ? commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_9__.default.DELIVERY_ORDER_NOW_END_PART1
                : getRangeBasedDates(estimate === null || estimate === void 0 ? void 0 : estimate.promiseDate);
        var postText = deliveryOrderNowAB === 'orderNowEnd'
            ? commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_9__.default.DELIVERY_ORDER_NOW_END_PART2
            : '';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.deliveryContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", { src: imageUrl, className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.imgStyle }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.deliveryInfo },
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('ESSENTIAL_TAG') && isEssential && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.essentialTag }, "Essential")),
                serviceable ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                        showLabel &&
                            (isExpressDeliveryItem ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.expressDeliveryLabel }, 'Express Delivery by ')) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "".concat(preText, " ")))),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.estimatedDate }, this.rangeBasedDate || estimatedDate),
                        postText && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " ".concat(postText)),
                        showOrderBy && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.orderByTimer }, "Order within "),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Timer__WEBPACK_IMPORTED_MODULE_10__.default, { hours: orderByDateDiff.hours, minutes: orderByDateDiff.minutes, seconds: orderByDateDiff.seconds, className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.orderByTimer, stopCallback: updateDeliveryEstimates })))),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TryAndBuyInfo, { tryNBuyAvailable: tryNBuyInfo.enabled, tryNBuyServiceable: tryNBuyServiceable, tryNBuyApplicable: tryNBuyApplicable }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.notServiceableMsg }, (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_8__.getNotServiceableMessage)({
                    isAllEssentialItemsServiceable: isAllEssentialItemsServiceable,
                    type: 'item',
                    pincode: pincode
                }))))));
    };
    return DeliverEstimation;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var ShippingNotification = function (_a) {
    var noBorder = _a.noBorder;
    var show = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('SHIPPING_NOTIFICATION');
    var className = _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.notification;
    if (noBorder) {
        className += " ".concat(_serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.noBorder);
    }
    return show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.note }, "Please Note: "),
        (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('SHIPPING_MESSAGE'))) : null;
};
var Serviceability = /** @class */ (function (_super) {
    __extends(Serviceability, _super);
    function Serviceability(props) {
        return _super.call(this, props) || this;
    }
    Serviceability.prototype.render = function () {
        var _a = this.props, productDeliveryInfo = _a.productDeliveryInfo, pincode = _a.addressInfo.pincode, showLabel = _a.showLabel, shippingData = _a.shippingData, tryNBuyServiceable = _a.tryNBuyServiceable, expressDeliveryAvailable = _a.expressDeliveryAvailable, expressDeliveryThreshold = _a.expressDeliveryThreshold, headerClassName = _a.headerClassName, tryNBuyApplicable = _a.tryNBuyApplicable, isAllEssentialItemsServiceable = _a.isAllEssentialItemsServiceable, eligibileShippingAttribute = _a.eligibileShippingAttribute, updateDeliveryEstimates = _a.updateDeliveryEstimates;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.title, " ").concat(headerClassName) }, "DELIVERY ESTIMATES"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ShippingNotification, { noBorder: !!headerClassName }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _serviceability_base_css__WEBPACK_IMPORTED_MODULE_3__.default.list }, productDeliveryInfo.map(function (info) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DeliverEstimation, __assign({}, info, { key: "items_".concat(info.id), showLabel: showLabel, shippingMethod: shippingData.method, tryNBuyServiceable: tryNBuyServiceable, expressDeliveryAvailable: expressDeliveryAvailable, expressDeliveryThreshold: expressDeliveryThreshold, pincode: pincode, tryNBuyApplicable: tryNBuyApplicable, isAllEssentialItemsServiceable: isAllEssentialItemsServiceable, eligibileShippingAttribute: eligibileShippingAttribute, updateDeliveryEstimates: updateDeliveryEstimates }))); }))));
    };
    return Serviceability;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Serviceability.propTypes = {
    showTitle: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    showLabel: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    shippingData: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object.isRequired),
    productDeliveryInfo: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().array.isRequired),
    expressDeliveryAvailable: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    expressDeliveryThreshold: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    tryNBuyApplicable: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    updateDeliveryEstimates: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func)
};
Serviceability.defaultProps = {
    showTitle: true,
    showLabel: true,
    expressDeliveryAvailable: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Serviceability);


/***/ }),

/***/ "./browser/components/address/common/SpecialOffer/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/address/common/SpecialOffer/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _specialOffer_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./specialOffer.base.css */ "./browser/components/address/common/SpecialOffer/specialOffer.base.css");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");


// Styles

// Utils


var SpecialOffer = function (_a) {
    var show = _a.show, className = _a.className;
    return show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_specialOffer_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container, " ").concat(className) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _specialOffer_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "Special Offer"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _specialOffer_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bold },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Get "),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _specialOffer_base_css__WEBPACK_IMPORTED_MODULE_1__.default.icon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('VALUE_SHIPPING_CHARGES')),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, " off ")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "by selecting Value Shipping.")))) : null;
};
SpecialOffer.propTypes = {
    show: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string)
};
SpecialOffer.defaultProps = {
    show: false,
    className: ''
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpecialOffer);


/***/ })

}]);
//# sourceMappingURL=browser_components_address_common_DeliveryOptions_index_js-browser_components_address_common_-ddd350.js.map