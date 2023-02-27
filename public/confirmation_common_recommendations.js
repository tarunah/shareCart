(self["webpackChunk"] = self["webpackChunk"] || []).push([["confirmation_common_recommendations"],{

/***/ "./browser/components/confirmation/common/Recommendations/index.js":
/*!*************************************************************************!*\
  !*** ./browser/components/confirmation/common/Recommendations/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/ConfirmationManager */ "./browser/utils/ConfirmationManager.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _recommendations_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommendations.base.css */ "./browser/components/confirmation/common/Recommendations/recommendations.base.css");
/* harmony import */ var _recommendationComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recommendationComponents */ "./browser/components/confirmation/common/Recommendations/recommendationComponents.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _recommendationUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recommendationUtil */ "./browser/components/confirmation/common/Recommendations/recommendationUtil.js");
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








var recommendationMethods = [
    'showRecommendation',
    'viewMore',
    'getOrderList',
    'updateRecommendationForStyle',
    'fetchAllRecommendations',
    'getAllRecommendations',
    'clearDummyOrders'
];
var Recommendations = /** @class */ (function (_super) {
    __extends(Recommendations, _super);
    function Recommendations(props) {
        var _this = _super.call(this, props) || this;
        var dummyOrders = (0,_recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.fillWithDummyOrders)(3); // These are needed to show 3 empty circles during lazy load
        _this.state = {
            recommendations: [],
            selectedStyle: null,
            loading: 'none',
            allRecommendations: {},
            hasRecommendations: true,
            allOrders: __spreadArray([], dummyOrders, true) // These dummy values will eventaully get replaced with orders that have recommmendations
        };
        var _a = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_5__.getGrowthHackConfigValue)('CONFIRMATION_CROSS_SELL_CONFIG'), title = _a.title, desc = _a.desc;
        recommendationMethods.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.title = title;
        _this.desc = desc;
        _this.orderList = _this.getOrderList() || [];
        return _this;
    }
    Recommendations.prototype.componentDidMount = function () {
        this.orderList.length && this.getAllRecommendations(this.orderList);
    };
    Recommendations.prototype.getRecommendation = function (styleId) {
        return new Promise(function (resolve, reject) {
            commonBrowserUtils_ConfirmationManager__WEBPACK_IMPORTED_MODULE_1__.default.getRecommendations(styleId, function (_a) {
                var related = _a.related;
                var products = (related[0] && related[0].products) || [];
                resolve({ id: styleId, products: products });
            }, reject);
        }).catch(function () {
            return { id: styleId, products: [] }; // Allows promise.all to resolve
        });
    };
    Recommendations.prototype.getOrderList = function () {
        return lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(this.props, 'dataState.data.productData.styles', []).filter(_recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.filterGiftCard);
    };
    Recommendations.prototype.updateRecommendationForStyle = function (styleId, recommendation, count) {
        var matchingOrder = this.orderList.filter(function (order) { return order.id === styleId; });
        var orderObj = (0,_recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.getOrderObj)(matchingOrder[0]);
        this.setState(function (prevState) {
            var allRecommendations = prevState.allRecommendations, allOrders = prevState.allOrders, recommendations = prevState.recommendations, selectedStyle = prevState.selectedStyle, loading = prevState.loading;
            var filteredRecommendation = (0,_recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.filterRecommendations)(recommendation);
            allRecommendations[styleId] = filteredRecommendation;
            if (!count) {
                _recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.EventsObj.triggerLoadEvent();
                loading = 'remaining';
            }
            allOrders[count] = orderObj; // Replaces dummyOrders with the right ones as API resolves
            return __assign(__assign({}, prevState), { recommendations: !count ? filteredRecommendation : recommendations, selectedStyle: !count ? styleId : selectedStyle, allRecommendations: allRecommendations, allOrders: allOrders, loading: loading });
        });
    };
    Recommendations.prototype.clearDummyOrders = function () {
        this.setState(function (prevState) { return (__assign(__assign({}, prevState), { allOrders: prevState.allOrders.filter(function (order) { return !order.isDummy; }), hasRecommendations: prevState.recommendations.length ? true : false, loading: 'resolved' })); });
    };
    Recommendations.prototype.fetchAllRecommendations = function (styleList) {
        var _this = this;
        if (styleList === void 0) { styleList = []; }
        var count = styleList.length;
        var resolvedCount = 0;
        if (!count) {
            this.clearDummyOrders();
        }
        styleList.forEach(function (style) {
            return _this.getRecommendation(style.id).then(function (data) {
                count--;
                if (data.products.length) {
                    _this.updateRecommendationForStyle(style.id, data.products, resolvedCount);
                    resolvedCount++;
                }
                if (!count) {
                    _this.clearDummyOrders();
                }
            });
        });
    };
    Recommendations.prototype.getAllRecommendations = function (orderList) {
        var _this = this;
        this.setState({
            loading: 'first'
        }, function () { return _this.fetchAllRecommendations(orderList); });
    };
    Recommendations.prototype.showRecommendation = function (style) {
        _recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.EventsObj.triggerOrderedStyleClick(style);
        var allRecommendations = this.state.allRecommendations;
        this.setState({
            selectedStyle: style.id,
            recommendations: allRecommendations[style.id]
        });
    };
    Recommendations.prototype.viewMore = function () {
        var storeOrderId = lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(this.props, 'dataState.data.bountyOrder.storeOrderId');
        var viewMoreUrl = "/my/item/details?storeOrderId=".concat(storeOrderId);
        _recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.EventsObj.triggerViewMoreEvent();
        window.location = viewMoreUrl;
    };
    Recommendations.prototype.render = function () {
        var _a = this.state, recommendations = _a.recommendations, selectedStyle = _a.selectedStyle, loading = _a.loading, allOrders = _a.allOrders, hasRecommendations = _a.hasRecommendations;
        return hasRecommendations ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_3__.default.recommendationsWrapper },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h5", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_3__.default.title }, this.title),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desc }, this.desc),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_recommendationComponents__WEBPACK_IMPORTED_MODULE_4__.OrderedStyles, { selectedStyle: selectedStyle, styles: allOrders, showRecommendation: this.showRecommendation }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_recommendationComponents__WEBPACK_IMPORTED_MODULE_4__.RecommendedStyles, { styles: recommendations, viewMore: this.viewMore, goToPDP: _recommendationUtil__WEBPACK_IMPORTED_MODULE_6__.redirectToPDP, loading: loading }))) : null;
    };
    return Recommendations;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Recommendations.propTyes = {
    orderList: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recommendations);


/***/ }),

/***/ "./browser/components/confirmation/common/Recommendations/recommendationComponents.js":
/*!********************************************************************************************!*\
  !*** ./browser/components/confirmation/common/Recommendations/recommendationComponents.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderedStyles": () => (/* binding */ OrderedStyles),
/* harmony export */   "RecommendedStyles": () => (/* binding */ RecommendedStyles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");
/* harmony import */ var _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recommendations.base.css */ "./browser/components/confirmation/common/Recommendations/recommendations.base.css");
/* harmony import */ var _recommendationUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommendationUtil */ "./browser/components/confirmation/common/Recommendations/recommendationUtil.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/Sanitize */ "./utils/Sanitize/index.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
/* harmony import */ var iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/ChevronRight.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronRight.jsx");
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








var StyleCard = function (_a) {
    var brand = _a.brand, discount = _a.discount, img = _a.img, mrp = _a.mrp, name = _a.name, discounted = _a.discounted, redirectToPDP = _a.redirectToPDP;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.styleCard, onClick: redirectToPDP },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.imgWrapper, style: { height: "".concat(_recommendationUtil__WEBPACK_IMPORTED_MODULE_3__.IMG_HEIGHT, "px") } },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_1__.default, { src: img, visible: "true" })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.productInfo, style: { width: "".concat(_recommendationUtil__WEBPACK_IMPORTED_MODULE_3__.IMG_WIDTH, "px") } },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.brand }, brand),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.productTitle, dangerouslySetInnerHTML: {
                    __html: commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4___default()(name)
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.price },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.finalPrice },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeIcon }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, discounted)),
                discount && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.discountInfo },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.originalPrice },
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rupeeIcon }),
                        mrp),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.discount }, discount)))))));
};
StyleCard.propTypes = {
    brand: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    discount: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    img: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    mrp: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    name: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    discounted: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number),
    redirectToPDP: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
};
var CardLoader = function (_a) {
    var className = _a.className, count = _a.count;
    return new Array(count).fill(0).map(function () {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className });
    });
};
var ViewMore = function (_a) {
    var viewMore = _a.viewMore;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.viewMore, onClick: viewMore },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "View More"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronRight_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.nextArrow })));
};
ViewMore.propTypes = {
    viewMore: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
};
var RecommendedStyles = function (_a) {
    var styles = _a.styles, goToPDP = _a.goToPDP, viewMore = _a.viewMore, loading = _a.loading;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.recommendedList },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.innerWrapper },
            loading === 'first' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CardLoader, { count: 10, className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cardLoader })) : ((0,_recommendationUtil__WEBPACK_IMPORTED_MODULE_3__.getRecommendationObj)(styles).map(function (data) {
                return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(StyleCard, __assign({}, data, { redirectToPDP: function () { return goToPDP(data); } }));
            })),
            loading !== 'first' && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(ViewMore, { viewMore: viewMore }))));
};
RecommendedStyles.propTypes = {
    styles: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().array),
    goToPDP: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    viewMore: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    loading: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};
var EmptyCircle = function () { return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.emptyCircle }); };
var OrderedStyles = function (_a) {
    var _b = _a.styles, styles = _b === void 0 ? [] : _b, showRecommendation = _a.showRecommendation, selectedStyle = _a.selectedStyle;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.orderedStyles },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.innerWrapper }, styles.map(function (style) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { onClick: function () { return showRecommendation(style); }, className: "".concat(_recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.styleCircle, " ").concat(selectedStyle === style.id ? _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.selectedStyle : null, " ").concat(style.isDummy ? _recommendations_base_css__WEBPACK_IMPORTED_MODULE_2__.default.noBorder : null) }, style.isDummy ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(EmptyCircle, null)) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_1__.default, { src: style.image, visible: "true" }))));
        }))));
};
OrderedStyles.propTypes = {
    styles: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().array),
    showRecommendation: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    selectedStyle: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};



/***/ }),

/***/ "./browser/components/confirmation/common/Recommendations/recommendationUtil.js":
/*!**************************************************************************************!*\
  !*** ./browser/components/confirmation/common/Recommendations/recommendationUtil.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRecommendationObj": () => (/* binding */ getRecommendationObj),
/* harmony export */   "getOrderObj": () => (/* binding */ getOrderObj),
/* harmony export */   "IMG_WIDTH": () => (/* binding */ IMG_WIDTH),
/* harmony export */   "EventsObj": () => (/* binding */ EventsObj),
/* harmony export */   "IMG_HEIGHT": () => (/* binding */ IMG_HEIGHT),
/* harmony export */   "fillWithDummyOrders": () => (/* binding */ fillWithDummyOrders),
/* harmony export */   "redirectToPDP": () => (/* binding */ redirectToPDP),
/* harmony export */   "filterGiftCard": () => (/* binding */ filterGiftCard),
/* harmony export */   "filterRecommendations": () => (/* binding */ filterRecommendations)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_imageUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/imageUtils */ "./browser/utils/imageUtils/index.js");



var IMG_WIDTH = 180;
var IMG_HEIGHT = IMG_WIDTH * (4 / 3);
var ICON_IMAGE_WIDTH = 48;
var ICON_IMAGE_HEIGHT = 64;
var GIFT_CARD = 'GIFT_CARDS';
var E_GIFT_CARD = 'e-gift-cards';
var getSecurePath = function (style) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'styleImages.default.securedDomain', 'https://assets.myntassets.com/') + lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'styleImages.default.relativePath', '');
};
var getOrderObj = function (style) { return ({
    id: style.id,
    image: (0,commonBrowserUtils_imageUtils__WEBPACK_IMPORTED_MODULE_2__.getCloudinaryImage)(getSecurePath(style), ICON_IMAGE_HEIGHT, ICON_IMAGE_WIDTH),
    name: style.name
}); };
var getRecommendationObj = function (styles) {
    if (styles === void 0) { styles = []; }
    return styles.map(function (_a) {
        var brand = _a.brand, name = _a.name, _b = _a.price, _c = _b === void 0 ? {} : _b, discount = _c.discount, discounted = _c.discounted, mrp = _c.mrp, _d = _a.defaultImage, defaultImage = _d === void 0 ? {} : _d, id = _a.id;
        return {
            brand: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(brand, 'name'),
            name: name,
            mrp: mrp,
            discount: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(discount, 'label'),
            discounted: discounted,
            img: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getImageUrl)(defaultImage.secureSrc, IMG_HEIGHT, IMG_WIDTH),
            id: id
        };
    });
};
var fillWithDummyOrders = function (length) { return new Array(length).fill({ isDummy: true }); };
var EventsObj = {
    triggerLoadEvent: function () {
        triggerEvent('CONFIRMATION_RECOMMENDATIONS_LOAD', {
            custom: {
                widget: {
                    name: 'reco_widget_load',
                    type: 'list'
                }
            }
        });
    },
    triggerOrderedStyleClick: function (style) {
        triggerEvent('CONFIRMATION_ORDER_STYLE_CLICK', {
            custom: {
                widget: {
                    name: 'reco_style_pill_click',
                    type: 'list-item',
                    data_set: {
                        data: [
                            {
                                entity_type: 'product',
                                entity_id: style.id,
                                entity_name: style.name
                            }
                        ]
                    }
                }
            }
        });
    },
    triggerRecommendedStyleClick: function (style) {
        triggerEvent('CONFIRMATION_RECOMMENDATIONS_STYLE_CLICK', {
            custom: {
                widget: {
                    name: 'reco_style_click',
                    type: 'list-item',
                    data_set: {
                        data: [
                            {
                                entity_type: 'product',
                                entity_id: style.id,
                                entity_name: style.name
                            }
                        ]
                    }
                }
            }
        });
    },
    triggerViewMoreEvent: function () {
        triggerEvent('CONFIRMATION_RECOMMENDATIONS_VIEW_MORE', {
            custom: {
                widget: {
                    name: 'reco_view_more_click',
                    type: 'button'
                }
            }
        });
    }
};
var redirectToPDP = function (style) {
    EventsObj.triggerRecommendedStyleClick(style);
    window.location = "/".concat(style.id);
};
var filterGiftCard = function (style) {
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(style, 'masterCategory.typeCode') !== GIFT_CARD;
};
var filterRecommendations = function (recommendations) {
    if (recommendations === void 0) { recommendations = []; }
    return recommendations.filter(function (recommendation) { return recommendation.articleType !== E_GIFT_CARD; });
};



/***/ })

}]);
//# sourceMappingURL=confirmation_common_recommendations.js.map