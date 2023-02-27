(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmationMobile"],{

/***/ "./browser/components/confirmation/common/ConfirmationPage/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/confirmation/common/ConfirmationPage/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomEvents": () => (/* binding */ getCustomEvents),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationManager */ "./browser/utils/ConfirmationManager.js");
/* harmony import */ var commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/ProfileManager */ "./browser/utils/ProfileManager.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/JSBridgeHelper */ "./browser/utils/JSBridgeHelper.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationHelper */ "./browser/utils/ConfirmationHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_CartCountHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/CartCountHandler */ "./browser/utils/CartCountHandler.js");
/* harmony import */ var commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/TokenManager */ "./browser/utils/TokenManager.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! commonUtils/UserLocationDetailsUtil */ "./utils/UserLocationDetailsUtil.js");
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_15__);
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
var _a, _b;

















var DATA_KEY = '_checkout_.__myx_data__';
var boundFuncs = [
    'initConfirmPageData',
    'handleConfirmationAction',
    'toggleConfirmationModal',
    'cancelOrder',
    'retryPayment',
    'onSuccess',
    'onError',
    'showLoader',
    'getConfirmationPageData',
    'triggerDOPELoadEvent',
    'disableLoader',
    'claimReward'
];
var featureTag = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__.getGrowthHackConfigValue)('SCRATCHCARD_CONFIG').featureTag;
var recordOrderComplete = function (data) {
    var storeOrderId = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId'));
    var finalAmount = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.payments.amount', 0) / 100);
    var shippingCharge = "".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100);
    commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__.AndroidBridgeHelper.recordOrderComplete(storeOrderId, finalAmount, shippingCharge);
    commonBrowserUtils_JSBridgeHelper__WEBPACK_IMPORTED_MODULE_6__.IOSBridgeHelper.recordOrderComplete({
        storeOrderId: storeOrderId,
        finalAmount: finalAmount,
        shippingCharge: shippingCharge
    });
};
var categoryMap = {
    af_acquisition_men: 'acquisition',
    af_acquisition_women: 'acquisition',
    af_acquisition_premium: 'acquisition',
    Acquisition: 'acquisition',
    af_purchase: 'purchase',
    'First Purchase': 'first_purchase'
};
var getGenderBasedProducts = function (products, gender) {
    return products.filter(function (product) {
        var productGender = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'style.gender', '').toLowerCase();
        return productGender === gender || productGender === 'unisex';
    });
};
// Returns [{ item, style }] where item is bounty item and style is its corresponding style info
var getAllProducts = function (data) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'productData.styles', []).reduce(function (acc, style) {
        var items = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.items', []).filter(function (item) { return item.styleId === style.id; });
        items.forEach(function (item) {
            acc.push({ item: item, style: style });
        });
        return acc;
    }, []);
};
var getCustomEventValues = function (products) {
    var revenueList = products.map(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'item.payments.amount', 0) / 100; });
    var totalRevenue = revenueList.reduce(function (acc, revenue) { return acc + revenue; }, 0);
    var styleIds = products.map(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'item.styleId'); });
    var styleNames = products.map(function (product) {
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'style.productDisplayName');
    });
    var brands = products.map(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'style.brandName'); });
    var categories = products.map(function (product) {
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'style.masterCategory.typeName');
    });
    var quantities = products.map(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'item.quantity'); });
    var genders = products.map(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'style.gender'); });
    var storeOrderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
        name: 'orderid',
        optionalNames: ['orderId', 'storeOrderId']
    });
    var content = [];
    products.forEach(function (key, i) {
        content.push({ id: styleIds[i], quantity: quantities[i] });
    });
    return [
        { key: 'af_content_type', value: 'product' },
        { key: 'af_content', value: JSON.stringify(content) },
        { key: 'af_user_name', value: '' },
        { key: 'af_first_name', value: '' },
        { key: 'af_product_gender', value: genders },
        { key: 'af_order_id', value: storeOrderId },
        { key: 'af_revenue', value: totalRevenue },
        { key: 'af_content_id_list', value: styleIds },
        { key: 'af_content_list', value: brands },
        { key: 'af_quantity_list', value: quantities },
        { key: 'af_cust_id', value: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getUidx)() },
        { key: 'af_receipt_id', value: storeOrderId },
        { key: 'af_revenue_list', value: revenueList },
        { key: 'af_content_type_list', value: categories },
        { key: 'af_product_info_list', value: styleNames }
    ];
};
var getCustomEventCreator = function (updatedVersion) { return function (eventType, eventValues) {
    return updatedVersion
        ? {
            eventType: eventType,
            category: categoryMap[eventType],
            eventValues: eventValues
        }
        : eventType;
}; };
var getCustomEvents = function (data) {
    var createCustomEvent = getCustomEventCreator((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isMyntAppEnabled)(['mynacoSendEventV2']) ||
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isWebkitEnabled)(['mynacoSendEventV2']));
    var allProducts = getAllProducts(data);
    var commonEventValues = getCustomEventValues(allProducts);
    var events = [createCustomEvent('Acquisition', commonEventValues)];
    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true'
        ? events.push(createCustomEvent('First Purchase', commonEventValues))
        : events.push(createCustomEvent('af_purchase', commonEventValues));
    var menProducts = getGenderBasedProducts(allProducts, 'men');
    var womenProducts = getGenderBasedProducts(allProducts, 'women');
    var premiumProducts = allProducts.filter(function (product) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'item.payments.amount', 0) / 100 > 2000; });
    menProducts.length !== 0 &&
        events.push(createCustomEvent('af_acquisition_men', getCustomEventValues(menProducts)));
    womenProducts.length !== 0 &&
        events.push(createCustomEvent('af_acquisition_women', getCustomEventValues(womenProducts)));
    premiumProducts.length !== 0 &&
        events.push(createCustomEvent('af_acquisition_premium', getCustomEventValues(premiumProducts)));
    return { events: events };
};
var defaultDependencyList = [
    'orderComplete',
    'webengage',
    'gtm',
    'events',
    'sizefit'
];
var TYPE_DEPENDENCY_MAP = (_a = {},
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.orderSuccess] = defaultDependencyList,
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payFailOrderSuccess] = defaultDependencyList,
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodElig] = [],
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodNotElig] = [],
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingPlacedOrder] = [],
    _a[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.paySuccess] = [],
    _a.default = defaultDependencyList,
    _a);
var TYPE_EVENT_MAP = (_b = {},
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payFailOrderSuccess] = {
        page_load: 'DOPE_PAYMENT_FAILED_PAGE_LOAD',
        retry_payment: 'DOPE_PAYMENT_FAILED_RETRY_PAYMENT_CLICK',
        cancel_order: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_CLICK'
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodElig] = {
        page_load: 'DOPE_RETRY_PAYMENT_PENDING',
        retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK',
        cancel_order: 'DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK'
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodNotElig] = {
        page_load: 'DOPE_RETRY_PAYMENT_PENDING',
        retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK',
        cancel_order: 'DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK'
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingPlacedOrder] = {
        page_load: 'DOPE_RETRY_PAYMENT_PENDING',
        retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK'
    },
    _b[commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.paySuccess] = {
        page_load: 'DOPE_RETRY_PAYMENT_COMPLETED'
    },
    _b);
var getDOPEEventPayload = function (data) {
    var payload = {
        custom: {
            custom: {
                v1: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.storeOrderId')
            }
        }
    };
    return payload;
};
var ConfirmationPage = /** @class */ (function (_super) {
    __extends(ConfirmationPage, _super);
    function ConfirmationPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: null,
            loading: false,
            error: null,
            confirmationModal: { show: false, params: {} }
        };
        _this.isEligibleForCard = {};
        _this.eligibilityAPILoaded = false;
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.storeOrderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
            name: 'orderid',
            optionalNames: ['orderId', 'storeOrderId']
        });
        _this.type = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({ name: 'paymentState' });
        return _this;
    }
    ConfirmationPage.prototype.componentDidMount = function () {
        this.hasDependency('orderComplete') &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.ORDER_CONFIRMED, '1');
        // Clear ftc cookie on unload
        window.addEventListener('beforeunload', function () {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.FIRST_TIME_CUSTOMER, '', 0); // deleting firstTimeCustomer cookie on unload
        });
        (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__.resetPaymentRetrySession)();
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.ORDER_ADDRESS_ID, '', 0); // Deleting oai cookie
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.ORDER_ADDRESS_UNIFIED_ID, '', 0);
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.GIFT_ORDER_ADDRESS_ID, '', 0); // deleting giftcard order address id cookie
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_14__.isFeatureEnabled)('ADDRESS_ON_CART_V2')) {
            commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_15___default().setLocation({
                pincode: '',
                addressId: 0,
                addressName: '',
                unifiedId: ''
            });
        }
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isSessionStorageEnabled)()) {
            sessionStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT, '{}'); //resetting payment failure count
        }
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isLocalStorageEnabled)()) {
            localStorage.removeItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.localStorageKeys.GIFTCARD_PURCHASE_DETAILS);
        }
        this.props.analytics('setPageContext')('Checkout-confirmation'); // Set Page Context
        commonBrowserUtils_ProfileManager__WEBPACK_IMPORTED_MODULE_4__.default.fetchDetails(this.initConfirmPageData);
        triggerEvent('VIEW_ORDER_CONFIRMATION', {
            maData: {
                entity_optional_attributes: {
                    orderId: (this.storeOrderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
                        name: 'orderid',
                        optionalNames: ['orderId', 'storeOrderId']
                    })),
                    experiment_id: 'TBA',
                    featureTag: featureTag
                }
            },
            custom: {
                event_type: 'screenLoad',
                event_category: 'Order confirmation page',
                action: 'View'
            }
        });
    };
    ConfirmationPage.prototype.componentDidUpdate = function () {
        if (!this.firstUpdate && this.state.data) {
            var data = this.state.data;
            if (this.hasDependency('events')) {
                var styles_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'productData.styles', []);
                lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder.items', []).forEach(function (item) {
                    var style = styles_1.find(function (styleDetails) { return styleDetails.id === item.styleId; });
                    if (style) {
                        triggerEvent('CONFIRMATION_EC_ADD_PRODUCT', {
                            gaData: {
                                name: 'addProduct',
                                data: {
                                    id: item.styleId,
                                    name: style.name,
                                    brand: style.brandName,
                                    price: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(item, 'payments.amount', 0) / 100,
                                    quantity: item.quantity,
                                    variant: item.skuId,
                                    sellerPartnerId: item.sellerPartnerId
                                }
                            }
                        });
                    }
                });
                var orderDetails = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'bountyOrder', null);
                if (orderDetails) {
                    triggerEvent('CONFIRMATION_EC_PURCHASE', {
                        gaData: {
                            name: 'setAction',
                            category: 'purchase',
                            data: {
                                id: orderDetails.storeOrderId,
                                affiliation: 'Myntra.com',
                                revenue: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderDetails, 'payments.amount', 0) / 100,
                                tax: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderDetails, 'payments.charges.gst', 0) / 100,
                                shipping: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderDetails, 'payments.charges.shipping', 0) / 100,
                                coupon: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(orderDetails, 'payments.couponCode', '')
                            }
                        }
                    });
                }
                var mynacoAttributes = (0,commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_8__.getMynacoConfirmationScreenLoadData)(data);
                var entity_id = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
                    name: 'orderid',
                    optionalNames: ['orderId', 'storeOrderId']
                });
                var mynacoV3 = {
                    templateData: __assign(__assign({}, (0,commonBrowserUtils_ConfirmationHelper__WEBPACK_IMPORTED_MODULE_8__.getMynacoV3ConfirmationScreenLoadData)(data)), { entity_id: entity_id, entity_type: 'order', type: 'Checkout', variant: 'react' })
                };
                var defaultWidgetItems = {
                    data_set: {
                        data: []
                    }
                };
                var widget_items = defaultWidgetItems;
                if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(mynacoV3, 'templateData.widget_items.data_set.data')) {
                    widget_items = __assign({}, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(mynacoV3, 'templateData.widget_items'));
                }
                widget_items.data_set.data = widget_items.data_set.data.map(function (data) {
                    if (!lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'entity_type')) {
                        return __assign(__assign({}, data), { entity_type: 'product' });
                    }
                    return data;
                });
                var eventPayload = {
                    customEvents: getCustomEvents(data),
                    mynacoAttributes: mynacoAttributes,
                    mynacoV3: mynacoV3,
                    maData: {
                        entity_id: entity_id,
                        entity_type: 'order'
                    },
                    custom: {
                        custom: {
                            v1: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, '_checkout_.__myx_traffic__.medium', ''),
                            v2: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, '_checkout_.__myx_traffic__.source', '')
                        },
                        widget_items: __assign({}, widget_items)
                    }
                };
                // Trigger confirmation screen load event
                triggerEvent('CONFIRMATION_SCREEN_LOAD', eventPayload);
            }
            // Push GTM data
            this.hasDependency('gtm') &&
                this.props.analytics('pushGTMConfirmationData')(data);
            if (this.hasDependency('webengage')) {
                // Start and trigger webengage event
                this.props.analytics('initWebengage')();
                this.props.analytics('triggerWebengage')('CHECKOUT_COMPLETE', data);
            }
            // Track Size and fit
            this.hasDependency('sizefit') &&
                this.props.analytics('trackSizeFit')(data);
            // Trigger DOPE MA Events
            this.triggerDOPELoadEvent();
            // Mark order complete
            this.hasDependency('orderComplete') && recordOrderComplete(data);
            // Update count
            commonBrowserUtils_CartCountHandler__WEBPACK_IMPORTED_MODULE_10__.default.updateState();
            commonBrowserUtils_CartCountHandler__WEBPACK_IMPORTED_MODULE_10__.default.triggerUpdate('confirmation');
            this.firstUpdate = true;
        }
    };
    ConfirmationPage.prototype.triggerDOPELoadEvent = function () {
        var payload = getDOPEEventPayload(this.state.data);
        triggerEvent(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(TYPE_EVENT_MAP[this.type], 'page_load'), payload);
    };
    ConfirmationPage.prototype.hasDependency = function (dep) {
        var dependencies = TYPE_DEPENDENCY_MAP[this.type] || TYPE_DEPENDENCY_MAP.default;
        return dependencies.indexOf(dep) !== -1;
    };
    ConfirmationPage.prototype.onSuccess = function (data) {
        this.setState({
            data: data,
            loading: false
        });
    };
    ConfirmationPage.prototype.onError = function (error) {
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(error, 'error.status') === 'UPDATE_TOKENS') {
            commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_11__.default.refreshToken(this.getConfirmationPageData);
        }
        else {
            this.setState({ error: error, loading: false });
        }
    };
    ConfirmationPage.prototype.showLoader = function () {
        this.setState({
            loading: true
        });
    };
    ConfirmationPage.prototype.disableLoader = function () {
        this.setState({
            loading: false
        });
    };
    ConfirmationPage.prototype.toggleConfirmationModal = function (modalParams) {
        if (this.type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payFailOrderSuccess) {
            var payload = getDOPEEventPayload(this.state.data);
            modalParams && triggerEvent(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(modalParams, 'eventName'), payload);
        }
        this.setState(function (prevState) {
            var show = prevState.confirmationModal.show;
            return {
                confirmationModal: {
                    show: !show,
                    params: show ? {} : modalParams
                }
            };
        });
    };
    ConfirmationPage.prototype.retryPayment = function () {
        var payload = getDOPEEventPayload(this.state.data);
        triggerEvent(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(TYPE_EVENT_MAP[this.type], 'retry_payment'), payload);
        var ppsId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'state.data.bountyOrder.payments.ppsId');
        var referrer = [commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodElig, commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodNotElig].indexOf(this.type) !== -1
            ? commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.orderStates.PENDING
            : commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.orderStates.PLACED_FRESH;
        var redirectURL = "/checkout/payment?mode=retry&ppsid=".concat(ppsId, "&referrer=").concat(referrer);
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.navigateTo)(redirectURL);
    };
    ConfirmationPage.prototype.cancelOrder = function () {
        var _this = this;
        this.showLoader();
        var payload = getDOPEEventPayload(this.state.data);
        triggerEvent(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(TYPE_EVENT_MAP[this.type], 'cancel_order'), payload);
        var referrer = [commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodElig, commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.payPendingCodNotElig].indexOf(this.type) !== -1
            ? 'ordercancelled'
            : '';
        var redirectURL = referrer ? "/checkout/cart?referrer=".concat(referrer) : '/';
        //set cancel order modal cookie to false
        if (referrer) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.cookieKeys.CART_CANCEL_ORDER_MODAL, 'false');
        }
        // call cancel order api
        // on success, redirect to redirectURL
        // on failure, show error notification
        commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.cancelOrder(this.storeOrderId, function (res) {
            _this.toggleConfirmationModal();
            setTimeout(function () {
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.navigateTo)(redirectURL);
            }, 0);
        }, function (err) {
            _this.disableLoader();
            _this.toggleConfirmationModal();
            var config = {
                message: 'Something went wrong. Please try agin!',
                delay: 5000
            };
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.errorNotification)(config);
        });
    };
    ConfirmationPage.prototype.getConfirmationPageData = function () {
        var _this = this;
        var orderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
            name: 'orderid',
            optionalNames: ['orderId', 'storeOrderId']
        });
        Promise.all([
            commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.getPageData(this.storeOrderId),
            commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.getProfile(),
            this.type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.paySuccessCodUserConsent
                ? Promise.resolve({})
                : commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.createScratchCardIfEligible({
                    featureTag: featureTag,
                    featureIdentifier: orderId
                })
        ])
            .then(function (_a) {
            var pageData = _a[0], profileData = _a[1], scratchResponse = _a[2];
            _this.isEligibleForCard = scratchResponse;
            _this.eligibilityAPILoaded = true;
            _this.onSuccess(__assign(__assign({}, pageData), { profiles: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(profileData, 'data.sizeProfile.profileList', []) }));
        })
            .catch(function (error) {
            _this.onError(error);
        });
    };
    ConfirmationPage.prototype.claimReward = function (id, successCB, errorCB) {
        var timeoutId = setTimeout(function () {
            errorCB('API Timeout');
        }, 10000);
        commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.claimReward(id)
            .then(function (data) {
            successCB(data);
            clearTimeout(timeoutId);
        })
            .catch(function (err) {
            clearTimeout(timeoutId);
            errorCB(err);
        });
    };
    ConfirmationPage.prototype.initConfirmPageData = function () {
        var _this = this;
        this.setState({
            loading: true
        });
        var data = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, DATA_KEY, null);
        if (data) {
            if (data.status === 'UPDATE_TOKENS') {
                commonBrowserUtils_TokenManager__WEBPACK_IMPORTED_MODULE_11__.default.refreshToken(this.getConfirmationPageData);
            }
            else if (data.httpStatus === 401) {
                SHELL.redirectTo("/login?force=true&referer=".concat(window.location.href));
            }
            else if (data.httpStatus === 200) {
                var orderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_13__.getQueryParam)({
                    name: 'orderid',
                    optionalNames: ['orderId', 'storeOrderId']
                });
                Promise.all([
                    commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.getProfile(),
                    this.type === commonUtils_constants__WEBPACK_IMPORTED_MODULE_12__.confirmationScreenTypes.paySuccessCodUserConsent
                        ? Promise.resolve({})
                        : commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default.createScratchCardIfEligible({
                            featureTag: featureTag,
                            featureIdentifier: orderId
                        })
                ])
                    .then(function (_a) {
                    var response = _a[0], scratchResponse = _a[1];
                    _this.isEligibleForCard = scratchResponse;
                    _this.eligibilityAPILoaded = true;
                    _this.onSuccess(__assign(__assign({}, data), { profiles: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(response, 'data.sizeProfile.profileList', []) }));
                })
                    .catch(function (e) {
                    _this.setState({
                        data: __assign(__assign({}, data), { profiles: [] }),
                        loading: false
                    });
                });
            }
            else {
                this.onError(data);
            }
            window._checkout_.__myx_data__ = null;
        }
        else {
            this.getConfirmationPageData();
        }
    };
    ConfirmationPage.prototype.handleConfirmationAction = function (action, data, onSuccess, onError, options) {
        commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_3__.default[action](data, function (res) {
            onSuccess && onSuccess(res);
        }, function (err) {
            onError && onError(err);
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.errorNotification)(options);
        });
    };
    ConfirmationPage.prototype.render = function () {
        var _a = this, _b = _a.props, render = _b.render, analytics = _b.analytics, state = _a.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, render({
            actionHandlers: lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, boundFuncs),
            dataState: state,
            screenType: this.type,
            analytics: analytics,
            eligibilityAPILoaded: this.eligibilityAPILoaded,
            isEligibleForCard: this.isEligibleForCard
        })));
    };
    return ConfirmationPage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ConfirmationPage.propTypes = {
    render: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmationPage);


/***/ }),

/***/ "./browser/components/confirmation/mobile/index.js":
/*!*********************************************************!*\
  !*** ./browser/components/confirmation/mobile/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "../node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/loadComponent */ "./utils/loadComponent.js");
/* harmony import */ var _common_ConfirmationScreen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/ConfirmationScreen */ "./browser/components/confirmation/common/ConfirmationScreen/index.js");
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationConstants */ "./browser/utils/ConfirmationConstants.js");
/* harmony import */ var commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/confirmationCardsConfig */ "./browser/components/confirmation/common/confirmationCardsConfig.js");
/* harmony import */ var _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mobile.base.css */ "./browser/components/confirmation/mobile/mobile.base.css");
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








// Styles

var ErrorPage = (0,commonUtils_loadComponent__WEBPACK_IMPORTED_MODULE_3__.default)({
    loader: function () {
        return Promise.all(/*! import() | errorPage */[__webpack_require__.e("styles-browser_components_common_ErrorPage_errorPage_base_css"), __webpack_require__.e("errorPage")]).then(__webpack_require__.bind(__webpack_require__, /*! commonComp/ErrorPage */ "./browser/components/common/ErrorPage/index.js"));
    },
    loaderProperties: { backdrop: false }
});
var docElement = document.documentElement, docBody = document.body;
var debouncedFn = function () { };
var ConfirmationComponent = /** @class */ (function (_super) {
    __extends(ConfirmationComponent, _super);
    function ConfirmationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showMoreBelow: true
        };
        _this.cardContainerRef = null;
        _this.observer = null;
        _this.cardComponentRenderer = _this.cardComponentRenderer.bind(_this);
        _this.moreBelowClickHandler = _this.moreBelowClickHandler.bind(_this);
        _this.observerCallback = _this.observerCallback.bind(_this);
        _this.setRef = _this.setRef.bind(_this);
        _this.moreBelowScrollHandler = _this.moreBelowScrollHandler.bind(_this);
        _this.cardComponentsToDisplay = null;
        _this.isSavingInsiderEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('CONFIRMATION_SAVING_INSIDER');
        return _this;
    }
    ConfirmationComponent.prototype.moreBelowScrollHandler = function () {
        var _this = this;
        debouncedFn = this.state.showMoreBelow
            ? lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(function () {
                var scrolledPercent = (docElement.scrollTop || docBody.scrollTop) /
                    ((docElement.scrollHeight || docBody.scrollHeight) -
                        docElement.clientHeight);
                if (!scrolledPercent || scrolledPercent > 0.3) {
                    _this.setState({
                        showMoreBelow: false
                    }, function () {
                        document.removeEventListener('scroll', debouncedFn);
                    });
                }
            }, 10)
            : function () { };
        return debouncedFn;
    };
    ConfirmationComponent.prototype.moreBelowClickHandler = function () {
        try {
            window.scroll({
                top: window.innerHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
        catch (e) {
            window.scroll(window.innerHeight, 0);
        }
    };
    ConfirmationComponent.prototype.observerCallback = function (entry) {
        if (entry[0].isIntersecting) {
            this.observer.unobserve(entry[0].target);
            this.setState({
                showMoreBelow: false
            });
        }
    };
    ConfirmationComponent.prototype.setRef = function (node) {
        this.cardContainerRef = node;
    };
    ConfirmationComponent.prototype.cardComponentRenderer = function (cards, animate) {
        var _this = this;
        if (cards === void 0) { cards = []; }
        var showLoader = this.props.actionHandlers.showLoader;
        // do not show animation when a user comes back to this page again
        var storeOrderId = (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_11__.getQueryParam)({
            name: 'orderid',
            optionalNames: ['orderId', 'storeOrderId']
        });
        var showAnimation = animate &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isSessionStorageEnabled)() &&
            !window.sessionStorage.getItem("".concat(storeOrderId, "-loaded"));
        var orderedCards = [];
        cards.forEach(function (card, index) {
            var CardComponent = _common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_12__.confirmationSubComponentsConfig[card];
            CardComponent &&
                orderedCards.push(react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CardComponent, __assign({ key: card, isSavingInsiderEnabled: _this.isSavingInsiderEnabled, getModalContent: (0,_common_confirmationCardsConfig__WEBPACK_IMPORTED_MODULE_12__.modalContentGetter)(_this.props.actionHandlers), styleClass: "".concat(_mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.confirmationCard, " ").concat(showAnimation ? _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.slideUp : '', " ").concat(_mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.cardBorder) }, _this.props, { mode: 'mobile', showLoader: showLoader })));
        });
        return (this.cardComponentsToDisplay = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "confirmation-cards-wrapper", className: _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.confirmationCardContainer, ref: this.setRef }, orderedCards)));
    };
    ConfirmationComponent.prototype.componentDidMount = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.setDocTitleInMobile)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.confirmationScreenTypeVSHeaderMap[this.props.screenType] || commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.confirmationScreenTypeVSHeaderMap.default);
        try {
            window.scroll({
                top: 1,
                left: 1,
                behavior: 'smooth'
            });
        }
        catch (e) {
            window.scroll(1, 1);
        }
        if (!this.cardContainerRef ||
            !this.cardContainerRef.lastElementChild ||
            this.cardContainerRef.clientHeight < window.innerHeight) {
            this.setState({
                showMoreBelow: false
            });
        }
        else {
            try {
                this.observer = new IntersectionObserver(this.observerCallback, {
                    threshold: 0.5,
                    rootMargin: '0px',
                    trackVisibility: true,
                    delay: 100
                });
                this.observer.observe(this.cardContainerRef.lastElementChild);
            }
            catch (e) {
                document.addEventListener('scroll', this.moreBelowScrollHandler());
            }
        }
    };
    ConfirmationComponent.prototype.componentWillUnmount = function () {
        document.removeEventListener('scroll', debouncedFn);
    };
    ConfirmationComponent.prototype.componentDidUpdate = function (prevProps) {
        var storeOrderId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(prevProps, 'dataState.data.bountyOrder.storeOrderId', '');
        // once the animation is shown to users about their confirmation
        // we don't want it to be shown again
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isSessionStorageEnabled)() &&
            storeOrderId &&
            window.sessionStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_10__.sessionStorageKeys.STOREID_LOADED(storeOrderId), 'true');
    };
    ConfirmationComponent.prototype.render = function () {
        var _a = this, cardComponentsToDisplay = _a.cardComponentsToDisplay, cardComponentRenderer = _a.cardComponentRenderer, moreBelowClickHandler = _a.moreBelowClickHandler, _b = _a.props, dataState = _b.dataState, actionHandlers = _b.actionHandlers, screenType = _b.screenType, showMoreBelow = _a.state.showMoreBelow;
        var _c = dataState.confirmationModal, showModal = _c.show, modalParams = _c.params, error = dataState.error;
        var showFallback = false;
        var showError = false;
        var unauthorized = false;
        if (error) {
            unauthorized = error.httpStatus === 403;
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('CONFIRMATION_FALLBACK') &&
                error.myntraReferer &&
                !unauthorized) {
                showFallback = true;
            }
            else {
                showError = true;
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            showError ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ErrorPage, { message: error.message || commonBrowserUtils_ConfirmationConstants__WEBPACK_IMPORTED_MODULE_8__.errorMessage, reload: !unauthorized && error.myntraReferer })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_ConfirmationScreen__WEBPACK_IMPORTED_MODULE_4__.default, { mode: "mobile", type: screenType, cardComponentsToDisplay: cardComponentsToDisplay, cardComponentRenderer: cardComponentRenderer, showFallback: showFallback, dataState: __assign(__assign({}, dataState), { showMoreBelow: showMoreBelow }), actionHandlers: __assign(__assign({}, actionHandlers), { moreBelowClickHandler: moreBelowClickHandler }) })),
            showModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_6__.default, { className: _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.modalContainer, halfCard: true, cancelCallback: function () {
                    return actionHandlers.toggleConfirmationModal({
                        eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE'
                    });
                }, cancelIconConfig: { show: true } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.modalHeader }, modalParams.header),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.modalDesc }, modalParams.bodyHeader),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _mobile_base_css__WEBPACK_IMPORTED_MODULE_13__.default.modalDesc }, modalParams.bodyDescription),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_5__.default, { buttons: modalParams.buttons }))))));
    };
    return ConfirmationComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
ConfirmationComponent.propTypes = {
    dataState: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
    actionHandlers: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmationComponent);


/***/ }),

/***/ "./browser/utils/ConfirmationHelper/index.js":
/*!***************************************************!*\
  !*** ./browser/utils/ConfirmationHelper/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMynacoConfirmationScreenLoadData": () => (/* binding */ getMynacoConfirmationScreenLoadData),
/* harmony export */   "getMynacoV3ConfirmationScreenLoadData": () => (/* binding */ getMynacoV3ConfirmationScreenLoadData),
/* harmony export */   "gotoInsiderPage": () => (/* binding */ gotoInsiderPage),
/* harmony export */   "getViewOrder": () => (/* binding */ getViewOrder)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");



var getMynacoConfirmationScreenLoadData = function (data) {
    var products = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.styleId === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            'Style-Id': style.id,
            'Style-Name': style.productDisplayName,
            Brand: style.brandName,
            Size: skuInfo.unifiedSize || skuInfo.value,
            Quantity: item.quantity,
            'Article-Type': lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName', ''),
            Category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
            SKU: item.skuId,
            Price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            Gender: style.gender
        };
    });
    return {
        id: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.displayStoreOrderId'),
        revenue: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
        tax: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.gst', 0) / 100,
        shipping: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
        medium: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_traffic__.medium'),
        source: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, '_checkout_.__myx_traffic__.source'),
        storeOrderId: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.storeOrderId'),
        'first-order': (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
        'storefront-id': '',
        products: products
    };
};
var getMynacoV3ConfirmationScreenLoadData = function (data) {
    var mProductList = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.id === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            id: style.id,
            name: style.productDisplayName,
            brand: style.brandName,
            quantity: item.quantity,
            size: skuInfo.unifiedSize || skuInfo.value,
            type: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'articleType.typeName', ''),
            category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
            skuId: item.skuId,
            price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
            mrp: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.mrp', 0),
            gender: style.gender,
            position: -1,
            variant: style.sizes
        };
    });
    var maData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.items', []).map(function (item) {
        var style = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styles', []).find(function (style) { return style.id === item.styleId; }) || {};
        var options = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'productData.styleOptions', []).find(function (option) { return option.id === style.id; });
        var skuInfo = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(options, 'styleOptions', []).find(function (option) { return option.skuId === item.skuId; }) || {};
        return {
            entity_optional_attributes: {
                size: style.sizes,
                inv_count: -1,
                price: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.amount', 0) / 100,
                qty: item.quantity,
                name: style.productDisplayName,
                mrp: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(item, 'payments.mrp', 0),
                disc: 0,
                category: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeName', ''),
                brand: style.brandName,
                skuId: item.skuId
            },
            entity_id: style.id,
            entity_name: style.productDisplayName,
            entity_type: style.productTypeGroup
        };
    });
    return {
        ecommerce: {
            transaction: {
                couponCode: '',
                id: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.displayStoreOrderId'),
                revenue: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.amount', 0) / 100,
                shipping: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
                tax: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, 'bountyOrder.payments.charges.gst', 0) / 100
            },
            firstOrder: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_1__.cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
            storeFrontId: '',
            productListName: '',
            mProductList: mProductList,
            type: 'purchase',
            checkout: {
                step: 0
            }
        },
        widget_items: {
            data_set: {
                data: maData
            }
        }
    };
};
var gotoInsiderPage = function () {
    return (window.location.href = '/myntrainsider?cache=false');
};
var getViewOrder = function (storeOrderId) { return function () {
    return (window.location.href = "/my/order/details?storeOrderId=".concat(storeOrderId, "&fromConfirmation=true"));
}; };



/***/ })

}]);
//# sourceMappingURL=confirmationMobile.js.map