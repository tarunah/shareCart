(self["webpackChunk"] = self["webpackChunk"] || []).push([["addressMobile"],{

/***/ "./browser/components/address/common/AddressPage/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/address/common/AddressPage/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/AddressManager */ "./browser/utils/AddressManager.js");
/* harmony import */ var commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/ProfileManager */ "./browser/utils/ProfileManager.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/priceBreakupFields */ "./browser/utils/priceBreakupFields.js");
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonUtils/UserLocationDetailsUtil */ "./utils/UserLocationDetailsUtil.js");
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../utils/maHelper */ "./browser/utils/maHelper.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_utils_maHelper__WEBPACK_IMPORTED_MODULE_15__);
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


// Utils















var getDeliveryInfo = function (_a) {
    var serviceability = _a.serviceability, products = _a.products, shippingData = _a.shippingData;
    if (!serviceability) {
        return {};
    }
    var _b = serviceability.productDeliveryInfo, productDeliveryInfo = _b === void 0 ? [] : _b, addressInfo = serviceability.addressInfo;
    var pincode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(addressInfo, 'pincode');
    var shippingMethod = shippingData.method;
    var isSpeed11 = false;
    var deliveryInfo = productDeliveryInfo.map(function (_a) {
        var id = _a.id, _b = _a.shippingEstimates, shippingEstimates = _b === void 0 ? [] : _b;
        var estimate = shippingEstimates.find(function (entry) {
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__.isFeatureEnabled)('SPEED_11') &&
                entry.shippingMethod === 'EXPRESS') {
                isSpeed11 = true;
                return entry;
            }
            return entry.shippingMethod === shippingMethod;
        });
        var currentDate = new Date();
        var estimateInDays = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getDateDiff)(currentDate, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'promiseDate'));
        return {
            sku: id,
            styleId: (products.find(function (product) { return product.skuId === id; }) || {}).id,
            promiseDate: (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_6__.getEstimatedDate)(estimateInDays),
            isSpeed11: isSpeed11
        };
    });
    return {
        pincode: pincode,
        products: deliveryInfo,
        custom: {
            widget: {
                name: 'address_delivery_estimates',
                type: 'card'
            }
        }
    };
};
var AddressPage = /** @class */ (function (_super) {
    __extends(AddressPage, _super);
    function AddressPage() {
        var _this = _super.call(this) || this;
        _this.state = {
            addressData: null,
            cartData: null,
            selectedAddressId: null,
            loading: true,
            error: null,
            dynamicStyles: {},
            tempAddressId: null,
            action: null
        };
        _this.nextSelectedAddressId = null;
        _this.currentPincode = null;
        [
            'handleAddressAction',
            'handleCartAction',
            'setCartData',
            'setAddressData',
            'onActionError',
            'editAddress',
            'updateDynamicStyles',
            'setToContainerState'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    AddressPage.prototype.componentDidMount = function () {
        (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_12__.resetPaymentRetrySession)();
        this.props.analytics('setPageContext')('Checkout-address');
        this.props.analytics('initWebengage')();
        this.initAddressData();
        triggerEvent('ADDRESS_SCREEN_LOAD', (_utils_maHelper__WEBPACK_IMPORTED_MODULE_15___default()));
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.ORDER_CONFIRMED, '', 0);
        commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_4__.default.prefetchDetails();
    };
    AddressPage.prototype.componentDidUpdate = function () {
        if (!this.cartUpdated) {
            var cartData = this.state.cartData;
            if (cartData) {
                var ftcCookie = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.FIRST_TIME_CUSTOMER);
                if (typeof ftcCookie === 'undefined') {
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.FIRST_TIME_CUSTOMER, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'userDetails.isFirstTimeCustomer')); // set firstTimeCustomer cookie
                }
                var deliveryCharge = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.charges.data', []).find(function (field) { return field.name === 'shipping'; }) || {}).value || 0;
                var appliedCoupon = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'coupons', []).find(function (coupon) { return coupon.type === 'coupon' && coupon.status === 'SUCCESS'; }) || {}).code;
                var label = "coupon: ".concat(appliedCoupon, " | value: ").concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total'));
                triggerEvent('BEGIN_CHECKOUT', {
                    mynacoV3: {
                        templateData: {
                            label: label
                        }
                    },
                    mynacoLabel: label
                });
                this.props.analytics('pushGTMCartData')(cartData);
                this.props.analytics('triggerWebengage')('ADDRESS_VIEWED', {
                    state_of_continue_cta: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(document.getElementById('placeOrderButton'), 'attributes.disabled')
                        ? 'no'
                        : 'yes',
                    amount: (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_10__.getTotal)(cartData.price, (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_9__.getAddressFields)()),
                    delivery_charge: "".concat(deliveryCharge)
                });
                this.cartUpdated = true;
            }
        }
    };
    AddressPage.prototype.componentWillUnmount = function () {
        var _a = this, _b = _a.state, addressData = _b.addressData, cartData = _b.cartData, selectedAddressIdFromState = _b.selectedAddressId, _c = _a.props, setCartStoreData = _c.setCartStoreData, setAddressStoreData = _c.setAddressStoreData;
        var selectedAddressId = selectedAddressIdFromState || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_6__.getSelectedAddress)(addressData), 'id');
        setCartStoreData(cartData);
        setAddressStoreData({
            addressData: addressData,
            selectedAddressId: selectedAddressId
        });
    };
    AddressPage.prototype.initAddressData = function () {
        var _this = this;
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.isLoggedIn)()) {
            this.setState({
                loading: true
            }, function () {
                var key = '_checkout_.__myx_data__.addresses';
                var addressData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, key, null);
                var status = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, "".concat(key, ".status"), '');
                var addressStoreData = _this.props.getAddressStoreData();
                if (addressStoreData) {
                    var addressData_1 = addressStoreData.addressData, selectedAddressId_1 = addressStoreData.selectedAddressId;
                    var cartData = _this.props.getCartStoreData();
                    _this.currentPincode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.addressInfo.pincode');
                    cartData && _this.validateCart(cartData);
                    _this.setState({
                        addressData: addressData_1,
                        cartData: cartData,
                        selectedAddressId: selectedAddressId_1
                    }, function () {
                        if (addressData_1 && addressData_1.length) {
                            var pincode = (addressData_1.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId_1; }) || {}).pincode;
                            _this.getServiceability(pincode);
                        }
                        else {
                            _this.handleNoAddress();
                        }
                    });
                }
                else if (status === 'UPDATE_TOKENS' || status === 'AUTHNZ_FAIL') {
                    _this.getAddressData();
                }
                else if (addressData) {
                    addressData
                        ? _this.setAddressData({ addresses: addressData })
                        : _this.setState({
                            error: true,
                            loading: false
                        });
                }
                else {
                    _this.getAddressData();
                }
                addressData && (window._checkout_.__myx_data__ = null);
                triggerEvent('PAGE_VIEW');
            });
        }
        else {
            SHELL.redirectTo('/login?force=true&referer=/checkout/cart');
        }
    };
    AddressPage.prototype.getAddressData = function () {
        commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default.getAllAddress('', this.setAddressData, this.onActionError);
    };
    AddressPage.prototype.setAddressData = function (_a) {
        var _this = this;
        var addresses = _a.addresses;
        this.setState({
            addressData: addresses
        }, function () {
            if (addresses && addresses.length) {
                var _a = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_6__.getSelectedAddress)(addresses), selectedAddressId = _a.id, pincode = _a.pincode;
                if (selectedAddressId) {
                    _this.selectAddress(selectedAddressId);
                }
                else if (pincode) {
                    _this.getServiceability(pincode);
                }
            }
            else {
                _this.props.getCartOnNoAddress
                    ? _this.handleNoAddress()
                    : _this.setState({
                        loading: false
                    });
            }
        });
    };
    AddressPage.prototype.selectAddress = function (selectedAddressId, setTempAddress) {
        var _this = this;
        if (setTempAddress === void 0) { setTempAddress = false; }
        if (this.state.selectedAddressId !== selectedAddressId) {
            this.setState(function (prevState) {
                var state = {
                    selectedAddressId: null
                };
                setTempAddress && (state.tempAddressId = selectedAddressId);
                return state;
            }, function () {
                _this.nextSelectedAddressId = selectedAddressId;
                var selectedAddress = _this.state.addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; }) || {};
                if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__.isFeatureEnabled)('ADDRESS_ON_CART_V2')) {
                    commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_13___default().setLocation({
                        pincode: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'pincode') || '',
                        addressId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'id') || 0,
                        addressName: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'user.name') || '',
                        unifiedId: selectedAddress.unifiedId
                    });
                }
                else {
                    (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_6__.setSelectedAddressCookie)({
                        addressId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'id'),
                        unifiedId: selectedAddress.unifiedId
                    });
                }
                _this.getServiceability(selectedAddress.pincode);
                triggerEvent('ADDRESS_SELECTED', {
                    custom: selectedAddress,
                    mynacoV3: { templateData: selectedAddress },
                    gaLabel: selectedAddress.pincode
                });
                triggerEvent('SELECT_ADDRESS_CLICK');
                triggerEvent(selectedAddress.checkoutAllowed
                    ? 'VALID_ADDRESS_SELECTED'
                    : 'BAD_ADDRESS_SELECTED');
                return;
            });
        }
        else {
            this.setState({
                loading: false
            });
        }
    };
    AddressPage.prototype.onActionError = function (err) {
        this.setState({
            loading: false,
            error: true
        }, function () {
            var code = (err.error || {}).code;
            var errorMsgs = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_11__.getKVPairValue)('ADDRESS_ERROR') || {};
            var message = errorMsgs[code] || errorMsgs.default;
            message &&
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.errorNotification)({
                    message: message
                });
            triggerEvent('ADDRESS_ERROR', {
                gaLabel: JSON.stringify(err)
            });
        });
    };
    AddressPage.prototype.isServiceable = function (cartData) {
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.serviceabilityFlags.pincode.value', false);
    };
    AddressPage.prototype.handleAddressAction = function (action, data, successCallback, errorCallback) {
        var _this = this;
        this.setState({
            loading: true
        }, function () {
            if (action === 'selectAddress') {
                _this.selectAddress(data);
            }
            else {
                commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default[action](data, function (res) {
                    if (res && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(res)) {
                        _this[action](res, successCallback, data);
                    }
                    else {
                        var EMPTY_ERROR = {
                            status: 1002,
                            message: "".concat(res ? JSON.stringify(res) : res, " response")
                        };
                        errorCallback && errorCallback(EMPTY_ERROR);
                        _this.onActionError(EMPTY_ERROR);
                    }
                }, function (err) {
                    errorCallback && errorCallback(err);
                    _this.onActionError(err);
                });
            }
        });
    };
    AddressPage.prototype.handleCartAction = function (action, data, successCallback, errorCallback, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.setState({
            loading: true
        }, function () {
            commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default[action](data, function (res) {
                successCallback && successCallback(res);
                options.keepPreviousState
                    ? _this.setState({ loading: false })
                    : _this.setCartData(res);
            }, function (err) {
                errorCallback && errorCallback(err);
                _this.onActionError(err);
            });
        });
    };
    AddressPage.prototype.validateCart = function (res) {
        var isValid = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_7__.isValidCart)(res);
        var steps = 1;
        if (window && window.location.hash.includes('#disableBack')) {
            steps = 2;
        }
        (!isValid || (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_7__.checkExchangeCart)(res)) &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.navigateBack)(this.props.history, {
                url: '/checkout/cart',
                steps: steps
            });
        return isValid;
    };
    AddressPage.prototype.getServiceability = function (pincode) {
        var _this = this;
        if (!pincode) {
            return this.setState({
                loading: false
            });
        }
        if (this.currentPincode !== pincode) {
            this.currentPincode = pincode;
            commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default.getServiceability(pincode, this.setCartData, function (err) {
                var cartData = _this.state.cartData;
                if (cartData) {
                    if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.serviceabilityFlags.pincode.value')) {
                        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setValueInObject)(cartData, 'serviceability.serviceabilityFlags.pincode.value', false);
                        _this.setCartData(cartData);
                    }
                }
                else {
                    commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default.getCart({ cartMerge: true, cached: false }, function (res) {
                        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'serviceability.serviceabilityFlags.pincode.value')) {
                            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.setValueInObject)(res, 'serviceability.serviceabilityFlags.pincode.value', false);
                        }
                        _this.setCartData(res);
                    }, _this.onActionError);
                }
            });
            return;
        }
        this.nextSelectedAddressId
            ? this.setState({
                selectedAddressId: this.nextSelectedAddressId,
                loading: false
            })
            : this.setState({
                loading: false
            });
        this.nextSelectedAddressId = null;
        !this.isServiceable(this.state.cartData) &&
            triggerEvent('NOT_SERVICEABLE_ADDRESS_SELECTED');
    };
    AddressPage.prototype.handleNoAddress = function () {
        var cartStoreData = this.props.getCartStoreData();
        if (cartStoreData) {
            this.setCartData(cartStoreData);
        }
        else {
            commonBrowserUtils_AddressManager__WEBPACK_IMPORTED_MODULE_3__.default.getCart({
                cartMerge: true,
                cached: false
            }, this.setCartData, this.onActionError);
        }
    };
    AddressPage.prototype.setCartData = function (res) {
        if (this.validateCart(res)) {
            if (this.nextSelectedAddressId) {
                this.setState({
                    cartData: res,
                    selectedAddressId: this.nextSelectedAddressId,
                    loading: false
                });
                this.nextSelectedAddressId = null;
            }
            else {
                this.setState({
                    cartData: res,
                    loading: false
                });
            }
            triggerEvent('ADDRESS_DELIVERY_PROMISE', getDeliveryInfo(res));
            (this.state.addressData || []).length &&
                !this.isServiceable(res) &&
                triggerEvent('NOT_SERVICEABLE_ADDRESS_SELECTED');
        }
    };
    AddressPage.prototype.addAddress = function (res, successCallback) {
        var _this = this;
        var newAddressData = __spreadArray([], this.state.addressData, true);
        var setTempAddress = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__.isVariantEnabled)('AOC_V2_VARIANT3');
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'isDefault') &&
            newAddressData.forEach(function (address) {
                if (address) {
                    lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'isDefault') && (address.isDefault = false);
                }
            });
        newAddressData = newAddressData.concat(res);
        this.setState({
            addressData: newAddressData
        }, function () {
            _this.selectAddress(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'id'), setTempAddress);
            successCallback && successCallback(res);
        });
    };
    AddressPage.prototype.removeAddress = function (res, successCallback, unifiedId) {
        var _this = this;
        var removedAddress = __spreadArray([], this.state.addressData.filter(function (address) { return address.unifiedId === unifiedId; }), true);
        var isDefaultAddressRemoved = removedAddress.length && lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(removedAddress[0], 'isDefault');
        if (isDefaultAddressRemoved) {
            this.getAddressData();
            return;
        }
        var newAddressData = __spreadArray([], this.state.addressData.filter(function (address) { return address.unifiedId !== unifiedId; }), true);
        this.setState({ addressData: newAddressData }, function () {
            if (newAddressData.length) {
                var defaultAddress = newAddressData.find(function (address) {
                    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'isDefault');
                });
                var id = defaultAddress ? defaultAddress.id : newAddressData[0].id;
                _this.selectAddress(id);
                successCallback && successCallback(id);
            }
            else {
                _this.setState({
                    selectedAddressId: null,
                    loading: false
                });
            }
        });
    };
    AddressPage.prototype.editAddress = function (res, successCallback) {
        var _this = this;
        var newAddressData = __spreadArray([], this.state.addressData, true);
        var resAddressId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'id');
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'isDefault') &&
            newAddressData.forEach(function (address) {
                lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'isDefault') && (address.isDefault = false);
            });
        newAddressData = newAddressData.map(function (address) {
            return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === resAddressId ? res : address;
        });
        this.setState({
            addressData: newAddressData
        }, function () {
            if (_this.state.selectedAddressId === resAddressId) {
                var addressId = resAddressId || 0;
                var unifiedId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'unifiedId', '');
                commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_13___default().setLocation({
                    pincode: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'pincode') || '',
                    addressName: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'user.name') || '',
                    addressId: addressId,
                    unifiedId: unifiedId
                });
                _this.getServiceability(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'pincode'));
            }
            else {
                _this.selectAddress(resAddressId);
            }
            successCallback && successCallback(res);
        });
    };
    AddressPage.prototype.updateDynamicStyles = function (key, value) {
        var _a;
        this.setState({
            dynamicStyles: __assign(__assign({}, this.state.dynamicStyles), (_a = {}, _a[key] = value, _a))
        });
    };
    AddressPage.prototype.setToContainerState = function (obj, successCallback) {
        if (obj.cartData) {
            triggerEvent('ADDRESS_DELIVERY_PROMISE', getDeliveryInfo(obj.cartData));
        }
        this.setState(obj, function () {
            successCallback && successCallback();
        });
    };
    AddressPage.prototype.render = function () {
        var _a = this, state = _a.state, analytics = _a.props.analytics, handleAddressAction = _a.handleAddressAction, handleCartAction = _a.handleCartAction, updateDynamicStyles = _a.updateDynamicStyles, setToContainerState = _a.setToContainerState, tempAddressId = _a.tempAddressId;
        return this.props.render(__assign(__assign({}, state), { analytics: analytics, handleAddressAction: handleAddressAction, handleCartAction: handleCartAction, updateDynamicStyles: updateDynamicStyles, setToContainerState: setToContainerState, updateDeliveryEstimates: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getDeliveryEstimatesUtil)(handleCartAction, 'getServiceability', lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(state, 'cartData.serviceability.addressInfo.pincode') ||
                this.currentPincode) }));
    };
    return AddressPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
AddressPage.propTypes = {
    render: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().func.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressPage);


/***/ }),

/***/ "./browser/components/address/mobile/AddressBlocks/index.js":
/*!******************************************************************!*\
  !*** ./browser/components/address/mobile/AddressBlocks/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectedAddressBlock": () => (/* binding */ SelectedAddressBlock),
/* harmony export */   "AddressBlock": () => (/* binding */ AddressBlock),
/* harmony export */   "AddAddressBlock": () => (/* binding */ AddAddressBlock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var commonComp_AddressDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/AddressDetails */ "./browser/components/common/AddressDetails/index.js");
/* harmony import */ var _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addressBlocks.base.css */ "./browser/components/address/mobile/AddressBlocks/addressBlocks.base.css");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/RadioActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioActive.jsx");
/* harmony import */ var iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/RadioInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioInactive.jsx");


// Components


// Styles




var onNewAddressClick = function () {
    triggerEvent('ADD_NEW_ADDRESS_CLICK');
};
var onEditAddressClick = function () {
    triggerEvent('EDIT_ADDRESS_CLICK');
};
var SelectedAddressBlock = function (_a) {
    var addressInfo = _a.addressInfo;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.finalAddress },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_AddressDetails__WEBPACK_IMPORTED_MODULE_1__.default, { addressInfo: addressInfo, showDefaultTag: true }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.changeOrAddBtn, to: "/checkout/address/list" }, "CHANGE OR ADD ADDRESS")));
};
SelectedAddressBlock.propTypes = {
    addressInfo: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object.isRequired)
};
var AddressBlock = function (_a) {
    var addressInfo = _a.addressInfo, selected = _a.selected, onClickHandler = _a.onClickHandler, serviceable = _a.serviceable;
    var valid = serviceable && addressInfo.checkoutAllowed;
    var errorMsg = '';
    if (!serviceable) {
        errorMsg = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('NON_SERVICEABLE_ADDRESS_ERROR');
    }
    else if (!addressInfo.checkoutAllowed) {
        errorMsg =
            'Please add house, street and locality details to improve your address or ensure mobile number is valid, before proceeding further.';
    }
    return selected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.block, "\n      ").concat(valid ? _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.serviceable : _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.notServiceable), onClick: onClickHandler, id: addressInfo.id },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.radioIcon }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.details },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_AddressDetails__WEBPACK_IMPORTED_MODULE_1__.default, { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.addressDetail, addressInfo: addressInfo, notServiceable: !!errorMsg }),
            errorMsg && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.error }, errorMsg)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.btns },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.remove, "data-action": "remove" }, "Remove"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, { to: "/checkout/address/edit", className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.edit, onClick: onEditAddressClick, "data-action": "edit" }, "Edit")))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.block, onClick: onClickHandler, id: addressInfo.id },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.radioIcon }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.details },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_AddressDetails__WEBPACK_IMPORTED_MODULE_1__.default, { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.addressDetail, addressInfo: addressInfo, minimize: true }))));
};
AddressBlock.propTypes = {
    addressInfo: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object.isRequired),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    onClickHandler: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func.isRequired)
};
AddressBlock.defaultProps = {
    selected: false
};
var AddAddressBlock = function () { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.addBlockDiv },
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, { to: "/checkout/address/add", className: _addressBlocks_base_css__WEBPACK_IMPORTED_MODULE_2__.default.addBlockAnchor, onClick: onNewAddressClick }, "Add New Address"))); };


/***/ }),

/***/ "./browser/components/address/mobile/AddressComponent.js":
/*!***************************************************************!*\
  !*** ./browser/components/address/mobile/AddressComponent.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/transformPriceDetails */ "./browser/utils/transformPriceDetails.js");
/* harmony import */ var commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/priceBreakupFields */ "./browser/utils/priceBreakupFields.js");
/* harmony import */ var commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/DiscountUtil */ "./browser/utils/DiscountUtil/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_AddressConstants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/AddressConstants */ "./browser/utils/AddressConstants.js");
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonUtils/abtestManager */ "./utils/abtestManager/index.js");
/* harmony import */ var commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_ReturnAbuserV2__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! commonComp/ReturnAbuserV2 */ "./browser/components/common/ReturnAbuserV2/index.js");
/* harmony import */ var commonComp_SaleTimer_Mobile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! commonComp/SaleTimer/Mobile */ "./browser/components/common/SaleTimer/Mobile/index.js");
/* harmony import */ var commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! commonComp/CheckoutSteps */ "./browser/components/common/CheckoutSteps/index.js");
/* harmony import */ var commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! commonComp/PriceBlock */ "./browser/components/common/PriceBlock/index.js");
/* harmony import */ var commonComp_PrivacyPolicy__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! commonComp/PrivacyPolicy */ "./browser/components/common/PrivacyPolicy/index.js");
/* harmony import */ var _DeliveryPreference__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./DeliveryPreference */ "./browser/components/address/mobile/DeliveryPreference/index.js");
/* harmony import */ var _AddressBlocks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./AddressBlocks */ "./browser/components/address/mobile/AddressBlocks/index.js");
/* harmony import */ var _common_DeliveryOptions__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../common/DeliveryOptions */ "./browser/components/address/common/DeliveryOptions/index.js");
/* harmony import */ var _common_Serviceability__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../common/Serviceability */ "./browser/components/address/common/Serviceability/index.js");
/* harmony import */ var _common_SpecialOffer__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../common/SpecialOffer */ "./browser/components/address/common/SpecialOffer/index.js");
/* harmony import */ var commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! commonComp/StickyButton */ "./browser/components/common/StickyButton/index.js");
/* harmony import */ var commonComp_TryAndBuy__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! commonComp/TryAndBuy */ "./browser/components/common/TryAndBuy/index.js");
/* harmony import */ var _common_NotServiceableHeader__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../common/NotServiceableHeader */ "./browser/components/address/common/NotServiceableHeader/index.js");
/* harmony import */ var commonComp_SavingsFomo__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! commonComp/SavingsFomo */ "./browser/components/common/SavingsFomo/index.js");
/* harmony import */ var _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./addressMobile.base.css */ "./browser/components/address/mobile/addressMobile.base.css");
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















var InsiderRewards = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | insiderRewards */[__webpack_require__.e("styles-browser_components_common_InsiderRewards_Components_components_base_css-browser_compon-5ac1fb"), __webpack_require__.e("vendors-node_modules_myntra_m-comp_react_SVGIcon_InsiderLogoNew_jsx-node_modules_myntra_m-com-6cfa82"), __webpack_require__.e("insiderRewards")]).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/InsiderRewards */ "./browser/components/common/InsiderRewards/index.js"));
    }
});
var ErrorPage = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.all(/*! import() | errorPage */[__webpack_require__.e("styles-browser_components_common_ErrorPage_errorPage_base_css"), __webpack_require__.e("errorPage")]).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/ErrorPage */ "./browser/components/common/ErrorPage/index.js"));
    }
});
var NudgeBannerWithCTA = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_9__.default)({
    loader: function () {
        return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/NudgeBanner */ "./browser/components/common/NudgeBanner/index.js"));
    },
    loaderProperties: { backdrop: false }
}).NudgeBannerWithCTA;
// Styles

var DELIVERY_PREFERENCE_COOKIE_EXPIRY = 3600 * 24 * 180 * 1000;
var AddressComponent = /** @class */ (function (_super) {
    __extends(AddressComponent, _super);
    function AddressComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedDeliveryPreference: ''
        };
        _this.onClickHandler = _this.onClickHandler.bind(_this);
        _this.selectDeliveryPreference = _this.selectDeliveryPreference.bind(_this);
        _this.hasExpressCheckoutAB = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('EXPRESS_CHECKOUT');
        _this.deliveryPreferenceEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('DELIVERY_PREFERENCE');
        _this.deliveryPreferenceEnabled &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.DELIVERY_PREFERENCE_COOKIE, '', 0);
        var expressDeliveryConfig = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7__.getGrowthHackConfigValue)('EXPRESS_DELIVERY');
        _this.expressDeliveryPincodes = expressDeliveryConfig.pincodes || {};
        _this.expressDeliveryThreshold = expressDeliveryConfig.threshold || 0;
        _this.expressDeliveryAvailable = false;
        _this.skipPincodeCheck = expressDeliveryConfig.skipPincodeCheck;
        _this.expressDeliveryEventSent = false;
        _this.isApp = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.isApp)();
        var addressCTAText = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7__.getGrowthHackConfigValue)('CHECKOUT_CTA').addressCTAText;
        _this.isCTAEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CHECKOUT_CTA_TEXT');
        _this.goToPaymentPageText =
            _this.isCTAEnabled && addressCTAText
                ? addressCTAText.toUpperCase()
                : 'CONTINUE';
        _this.tryNBuyPositionABValue =
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('TRY_N_BUY_POSITION') && (0,commonUtils_abtestManager__WEBPACK_IMPORTED_MODULE_13__.getAbtest)('TRY_N_BUY_POSITION');
        _this.showSavingsStrip =
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('SAVINGS_PRICE_BLOCK') &&
                lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_7__.getGrowthHackConfigValue)('SAVINGS_STRIP_CONFIG'), "visibility.".concat(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS), false);
        return _this;
    }
    AddressComponent.prototype.selectDeliveryPreference = function (dataMethod) {
        // Deselect if selected earlier
        var selectedMethod = dataMethod === this.state.selectedDeliveryPreference ? '' : dataMethod;
        this.setState({
            selectedDeliveryPreference: selectedMethod
        });
    };
    AddressComponent.prototype.componentDidMount = function () {
        /**
         * Handle the dispatch of express delivery event for navigation
         * from any of the following screens:
         *  - Edit/Change Address
         *  - Add New Address
         */
        this.props.tempAddressId &&
            this.props.setToContainerState({ tempAddressId: null });
        this.handleExpressDeliveryEvent();
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.setDocTitleInMobile)('ADDRESS', {
            hideStepNumber: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CHECKOUT_STEPS_MWEB')
        });
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('ADDRESS_LANDMARK') && (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_14__.setLandmarkCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.numbers.ZERO);
    };
    AddressComponent.prototype.componentDidUpdate = function () {
        /**
         * Handle the dispatch of express delivery event for the
         * following events:
         *  - Navigation from cart page
         *  - Change in shipping method
         *
         * The 'expressDeliveryEventSent' check ensures that duplicate events
         * are not sent when component updates due to unrelated actions (such as
         * tapping on the 'Try-n-Buy' checkbox)
         */
        this.handleExpressDeliveryEvent();
    };
    AddressComponent.prototype.handleExpressDeliveryEvent = function () {
        var _this = this;
        if (!this.isApp || // Dispatching events only from app as currently (March 2019) Mynaco doesn't support custom events
            !this.expressDeliveryAvailable ||
            this.expressDeliveryEventSent ||
            !this.props.cartData ||
            !this.props.cartData.serviceability) {
            return;
        }
        var _a = this.props.cartData, cartId = _a.id, products = _a.products, _b = _a.shippingData, _c = _b === void 0 ? {} : _b, method = _c.method;
        /**
         * A cart is considered eligible for express delivery when at least one item
         * has a delivery period of less than or equal to the specified threshold
         */
        var selectedProducts = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.getSelectedProducts)(products);
        var productDeliveryInfo = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_14__.getProductDeliveryInfo)(selectedProducts);
        var expressDeliveryEligible = productDeliveryInfo.some(function (_a) {
            var shippingEstimates = _a.shippingEstimates;
            var estimate = shippingEstimates.find(function (entry) { return entry.shippingMethod === method; });
            if (estimate) {
                var currentDate = new Date();
                var estimateInDays = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.getDateDiff)(currentDate, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(estimate, 'promiseDate'));
                return estimateInDays <= _this.expressDeliveryThreshold;
            }
            return false;
        });
        triggerEvent('EXPRESS_DELIVERY_ELIGIBILITY', {
            custom: {
                custom: { v1: expressDeliveryEligible ? 'eligible' : 'not_eligible' },
                widget: {
                    name: 'Express_Delivery',
                    type: 'card',
                    data_set: {
                        data: {
                            entity_type: 'cart',
                            entity_id: cartId
                        }
                    }
                },
                event_type: 'widgetLoad'
            }
        });
        this.expressDeliveryEventSent = true;
    };
    AddressComponent.prototype.onClickHandler = function () {
        var _this = this;
        var _a = this.props, cartData = _a.cartData, addressData = _a.addressData, selectedAddressId = _a.selectedAddressId, handleCartAction = _a.handleCartAction, updateCheckoutState = _a.updateCheckoutState;
        var selectedAddress = addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; }) ||
            {};
        var valid = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.serviceabilityFlags.pincode.value', false) && selectedAddress.checkoutAllowed;
        valid &&
            handleCartAction('setOrderAddress', {
                unifiedAddressId: selectedAddress.unifiedId,
                addressId: selectedAddressId
            }, function (res) {
                triggerEvent('CHECKOUT_CONVERSATION');
                triggerEvent('BTN_CONTINUE_CLICK');
                updateCheckoutState({
                    cartData: res,
                    selectedAddress: selectedAddress
                });
                if (_this.deliveryPreferenceEnabled) {
                    var selectedDeliveryPreference = _this.state.selectedDeliveryPreference;
                    // Save deliery preference in cookies. To be removed on order confirmation.
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.DELIVERY_PREFERENCE_COOKIE, selectedDeliveryPreference, DELIVERY_PREFERENCE_COOKIE_EXPIRY);
                    triggerEvent('DELIVERY_PREFERENCE_ADDRESS', {
                        maData: {
                            entity_type: 'cart',
                            entity_name: selectedDeliveryPreference,
                            entity_id: _this.props.cartData.id
                        }
                    });
                }
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.navigateTo)('/checkout/payment');
            }, null, { keepPreviousState: true });
    };
    AddressComponent.prototype.redirectBasedOnAction = function (path) {
        if (this.isBeingRedirected) {
            return;
        }
        this.isBeingRedirected = true;
        this.props.action === 'back'
            ? this.props.history.goBack()
            : this.props.history.push(path);
    };
    AddressComponent.prototype.onLandmarkClick = function (e) {
        triggerEvent('ADD_LANDMARK_CLICK');
    };
    AddressComponent.prototype.render = function () {
        var _a = this.props, cartData = _a.cartData, addressData = _a.addressData, handleCartAction = _a.handleCartAction, selectedAddressId = _a.selectedAddressId, error = _a.error, dynamicStyles = _a.dynamicStyles, updateDynamicStyles = _a.updateDynamicStyles, loading = _a.loading, analytics = _a.analytics, updateDeliveryEstimates = _a.updateDeliveryEstimates;
        if (cartData && addressData && addressData.length && selectedAddressId) {
            var products = cartData.products, price = cartData.price, instruments = cartData.price.instruments.data, flags = cartData.flags, shippingData = cartData.shippingData, serviceability = cartData.serviceability, userDetails = cartData.userDetails, coverFeeOpted = cartData.coverFeeOpted, coverFeeApplicableCharge = cartData.coverFeeApplicableCharge;
            var selectedProducts = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.getSelectedProducts)(products);
            var count = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.getSelectedProductsCount)(selectedProducts);
            var pincode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'addressInfo.pincode');
            var tryNBuyEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'flags.tryNBuyApplicable.value');
            var serviceable = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'serviceabilityFlags.pincode.value');
            var standardShippingEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'serviceabilityFlags.standardShipping.value');
            var valueShippingEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'serviceabilityFlags.valueShipping.value');
            var sddShippingEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'serviceabilityFlags.sddShipping.value');
            var expressShippingEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'serviceabilityFlags.expressShipping.value');
            var eligibileShippingAttribute = "_".concat(valueShippingEnabled ? 'val_' : '').concat(standardShippingEnabled ? 'sta_' : '').concat(sddShippingEnabled ? 'sdd_' : '').concat(expressShippingEnabled ? 'exp_' : '');
            var productDeliveryInfo = (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_14__.getProductDeliveryInfo)(selectedProducts);
            var showPriceBlock = expressShippingEnabled +
                sddShippingEnabled +
                valueShippingEnabled +
                standardShippingEnabled !==
                1 || tryNBuyEnabled;
            this.expressDeliveryAvailable =
                !!this.expressDeliveryPincodes[pincode] &&
                    shippingData.method === 'NORMAL';
            var validAddress = (addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; }) ||
                {}).checkoutAllowed;
            !validAddress && this.redirectBasedOnAction('/checkout/address/list');
            var selectedAddressInfo = addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; });
            var loyaltypoints = instruments.find(function (obj) { return obj.name === 'loyaltypoints'; }).value;
            var total = (0,commonBrowserUtils_transformPriceDetails__WEBPACK_IMPORTED_MODULE_2__.getTotal)(commonBrowserUtils_DiscountUtil__WEBPACK_IMPORTED_MODULE_4__.default.getPrice(price), (0,commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_3__.getAddressFields)());
            var shippingCharge = (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(price, 'charges.data', []).find(function (field) { return field.name === 'shipping'; }) || {}).value || 0;
            var selectedShippingData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, commonBrowserUtils_AddressConstants__WEBPACK_IMPORTED_MODULE_12__.default.shippingMethodInfoFromKey[shippingData.method]);
            // Deliver preference feature should show up
            // only if productDeliveryInfo is atleast 2
            this.deliveryPreferenceEnabled &= productDeliveryInfo.length > 1;
            var _b = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_11__.getShowCreditConfig)(), showUsedGCinMRP = _b.showGC, showUsedLPinMRP = _b.showLP;
            var isAllEssentialItemsServiceable = !productDeliveryInfo.find(function (_a) {
                var serviceable = _a.serviceable, isEssential = _a.isEssential;
                return isEssential && !serviceable;
            });
            if (typeof this.isPriorityCheckoutEnabled === 'undefined') {
                this.isPriorityCheckoutEnabled = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_11__.isPriorityCheckoutEnabled)(cartData);
            }
            if (typeof this.isExpressCheckoutEnabled === 'undefined') {
                this.isExpressCheckoutEnabled =
                    this.hasExpressCheckoutAB && !this.isPriorityCheckoutEnabled;
            }
            var showNudgeBanner = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('ADDRESS_LANDMARK') &&
                serviceable &&
                !selectedAddressInfo.landmark &&
                (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_14__.showLandmarkNudge)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.numbers.ZERO);
            return validAddress ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.mobileContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_19__.default, { currentPage: 'Address', hideSteps: this.isExpressCheckoutEnabled }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SaleTimer_Mobile__WEBPACK_IMPORTED_MODULE_18__.default, { saleBannerData: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('SALE_BANNER_DATA'), priceRevealData: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('PRICE_REVEAL_DATA'), enabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('SALE_TIMER', { type: 'address' }) }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.mobile },
                    !serviceable && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.headerContainer },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_NotServiceableHeader__WEBPACK_IMPORTED_MODULE_29__.default, { isAllEssentialItemsServiceable: isAllEssentialItemsServiceable, pincode: pincode }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ReturnAbuserV2__WEBPACK_IMPORTED_MODULE_17__.default, __assign({}, userDetails, { shippingCharge: shippingCharge })),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_SpecialOffer__WEBPACK_IMPORTED_MODULE_26__.default, { show: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('VALUE_SHIPPING') && valueShippingEnabled, className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.specialOffer }),
                    showNudgeBanner && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(NudgeBannerWithCTA, { message: commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_15__.default.LANDMARK_MAIN_NUDGE, className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.nudgeContainer, cta: commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_15__.default.LANDMARK_CTA, onFieldClick: this.onLandmarkClick, redirect: "/checkout/address/edit" })),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_AddressBlocks__WEBPACK_IMPORTED_MODULE_23__.SelectedAddressBlock, { addressInfo: selectedAddressInfo }),
                    serviceable && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                        !this.tryNBuyPositionABValue && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TryAndBuy__WEBPACK_IMPORTED_MODULE_28__.default, __assign({ pageSource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS }, flags, { products: selectedProducts, handleCartAction: handleCartAction, productDeliveryInfo: productDeliveryInfo, isNewUser: userDetails.isFirstTimeCustomer }))),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_DeliveryOptions__WEBPACK_IMPORTED_MODULE_24__.default, __assign({}, serviceability, { productDeliveryInfo: productDeliveryInfo, products: selectedProducts, shippingCharge: shippingCharge, shippingData: shippingData, handleCartAction: handleCartAction, canHide: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_DeliveryPreference__WEBPACK_IMPORTED_MODULE_22__.default, { show: !!this.deliveryPreferenceEnabled, selectDeliveryPreference: this.selectDeliveryPreference, selectedDeliveryPreference: this.state.selectedDeliveryPreference }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_Serviceability__WEBPACK_IMPORTED_MODULE_25__.default, { productDeliveryInfo: productDeliveryInfo, addressInfo: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(serviceability, 'addressInfo') || {}, shippingData: shippingData, tryNBuyServiceable: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedShippingData, 'flags.tryNBuy.value'), expressDeliveryAvailable: this.expressDeliveryAvailable, expressDeliveryThreshold: this.expressDeliveryThreshold, tryNBuyApplicable: flags.tryNBuyApplicable.value, isAllEssentialItemsServiceable: isAllEssentialItemsServiceable, eligibileShippingAttribute: eligibileShippingAttribute, updateDeliveryEstimates: updateDeliveryEstimates }),
                    this.tryNBuyPositionABValue === 'abovepricing' && serviceable && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TryAndBuy__WEBPACK_IMPORTED_MODULE_28__.default, __assign({}, flags, { pageSource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS, selectedShippingData: selectedShippingData, count: count, products: selectedProducts, handleCartAction: handleCartAction, productDeliveryInfo: productDeliveryInfo, isNewUser: userDetails.isFirstTimeCustomer }))),
                    showPriceBlock && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_PriceBlock__WEBPACK_IMPORTED_MODULE_20__.default, { count: count, price: price, flags: flags, getFields: commonBrowserUtils_priceBreakupFields__WEBPACK_IMPORTED_MODULE_3__.getAddressFields, shippingData: shippingData, coverFeeOpted: coverFeeOpted, coverFeeApplicableCharge: coverFeeApplicableCharge, dynamicStyles: dynamicStyles, className: _addressMobile_base_css__WEBPACK_IMPORTED_MODULE_31__.default.priceBlock, tryAndBuyOpted: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_10__.getTryAndBuyOpted)(selectedProducts), total: total, userDetails: userDetails })),
                    this.tryNBuyPositionABValue === 'belowpricing' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TryAndBuy__WEBPACK_IMPORTED_MODULE_28__.default, __assign({}, flags, { pageSource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS, count: count, products: selectedProducts, handleCartAction: handleCartAction, productDeliveryInfo: productDeliveryInfo, isNewUser: userDetails.isFirstTimeCustomer }))),
                    (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('CHECKOUT_INSIDER') && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InsiderRewards, { cartData: cartData, selectedProducts: selectedProducts })),
                    !this.isExpressCheckoutEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_PrivacyPolicy__WEBPACK_IMPORTED_MODULE_21__.default, { page: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS, analytics: analytics, total: total })),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_StickyButton__WEBPACK_IMPORTED_MODULE_27__.default, { isCTAEnabled: this.isCTAEnabled, total: total, text: this.goToPaymentPageText, clickHandler: this.onClickHandler, points: loyaltypoints, updateDynamicStyles: updateDynamicStyles, enabled: serviceable, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS })),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_16__.default, { show: loading, backdrop: true }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_SavingsFomo__WEBPACK_IMPORTED_MODULE_30__.default, { price: price, products: selectedProducts, currentPage: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.ADDRESS }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_16__.default, { show: true, backdrop: true }));
        }
        else if (!loading &&
            (!addressData || !addressData.length || !selectedAddressId)) {
            this.redirectBasedOnAction('/checkout/address/list');
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_16__.default, { show: true, backdrop: true });
        }
        else if (error) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ErrorPage, null);
        }
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_16__.default, { show: loading, backdrop: true });
    };
    return AddressComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressComponent);


/***/ }),

/***/ "./browser/components/address/mobile/DeliveryPreference/index.js":
/*!***********************************************************************!*\
  !*** ./browser/components/address/mobile/DeliveryPreference/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeliveryPreference": () => (/* binding */ DeliveryPreference),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ToolTip */ "./browser/components/common/ToolTip/index.js");
/* harmony import */ var _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deliveryPreference.base.css */ "./browser/components/address/mobile/DeliveryPreference/deliveryPreference.base.css");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/RadioActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioActive.jsx");
/* harmony import */ var iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/RadioInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioInactive.jsx");
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


// Components

// Styles




var GROUP_SHIPMENTS_KEY = 'group_shipments';
var SPEED_SHIPMENTS_KEY = 'speed_shipments';
var DeliveryPreference = function (props) {
    var selectDeliveryPreference = props.selectDeliveryPreference, selectedDeliveryPreference = props.selectedDeliveryPreference;
    return props.show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.deliveryPreferenceContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.deliveryPreferenceTitle },
            "Choose delivery preference",
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_1__.default, { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.toolTipText, elem: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tooltipInfoIcon }) }, "We will try our best to match your preferences")),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.deliveryPreferenceOptions },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ShipmentBlock, { dataMethod: GROUP_SHIPMENTS_KEY, selected: selectedDeliveryPreference === GROUP_SHIPMENTS_KEY, message: "Group items into as few shipments as possible", selectDeliveryPreference: selectDeliveryPreference }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ShipmentBlock, { dataMethod: SPEED_SHIPMENTS_KEY, selected: selectedDeliveryPreference === SPEED_SHIPMENTS_KEY, message: "Ship my items as soon as they become available", selectDeliveryPreference: selectDeliveryPreference })))) : null;
};
DeliveryPreference.propTypes = {
    show: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool.isRequired),
    selectDeliveryPreference: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func.isRequired),
    selectedDeliveryPreference: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string.isRequired)
};
var ShipmentBlock = /** @class */ (function (_super) {
    __extends(ShipmentBlock, _super);
    function ShipmentBlock(props) {
        var _this = _super.call(this, props) || this;
        _this.selectDeliveryPreference = props.selectDeliveryPreference.bind(null, props.dataMethod);
        return _this;
    }
    ShipmentBlock.prototype.render = function () {
        var _a = this.props, selected = _a.selected, message = _a.message;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.preferenceOption, onClick: this.selectDeliveryPreference },
            selected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.selectedRadioIcon })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.radioIcon })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _deliveryPreference_base_css__WEBPACK_IMPORTED_MODULE_2__.default.preferenceOptionMessage }, message)));
    };
    return ShipmentBlock;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ShipmentBlock.propTypes = {
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool.isRequired),
    message: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string.isRequired),
    dataMethod: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string.isRequired),
    selectDeliveryPreference: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeliveryPreference);


/***/ }),

/***/ "./browser/components/address/mobile/index.js":
/*!****************************************************!*\
  !*** ./browser/components/address/mobile/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddressComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressComponent */ "./browser/components/address/mobile/AddressComponent.js");
/* harmony import */ var _context_CheckoutContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @context/CheckoutContext */ "./browser/context/CheckoutContext.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_context_CheckoutContext__WEBPACK_IMPORTED_MODULE_1__.CheckoutConsumerHOC)(_AddressComponent__WEBPACK_IMPORTED_MODULE_0__.default));


/***/ }),

/***/ "./browser/utils/maHelper.js":
/*!***********************************!*\
  !*** ./browser/utils/maHelper.js ***!
  \***********************************/
/***/ ((module) => {

var defautlMAPayloadForWeb = {
    maData: {
        entity_optional_attributes: {}
    },
    custom: {
        widget_items: {
            data_set: {
                data: []
            }
        }
    }
};
module.exports = defautlMAPayloadForWeb;


/***/ })

}]);
//# sourceMappingURL=addressMobile.js.map