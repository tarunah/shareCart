(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_payment_common_OrderReview_index_js-browser_components_payment_common_Paym-24e3c8"],{

/***/ "./browser/components/common/Accordian/accordianComponents.js":
/*!********************************************************************!*\
  !*** ./browser/components/common/Accordian/accordianComponents.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccordianComponent": () => (/* binding */ AccordianComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordianComponents.base.css */ "./browser/components/common/Accordian/accordianComponents.base.css");
/* harmony import */ var iconComp_ChevronUp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/ChevronUp.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronUp.jsx");
/* harmony import */ var iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/ChevronDown.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronDown.jsx");
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




var TabHeader = function (_a) {
    var child = _a.child, selectedTabBlock = _a.selectedTabBlock, switchTab = _a.switchTab, onTabClick = _a.onTabClick, setTabRef = _a.setTabRef, _b = _a.isOrderReview, isOrderReview = _b === void 0 ? false : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: child.props.id, className: isOrderReview ? _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tabOrderReview : _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tab, ref: setTabRef, onClick: function (e) {
            if (child.props.disabled) {
                return;
            }
            switchTab(e, '', { scrollTabIntoView: true });
            isOrderReview
                ? selectedTabBlock
                    ? onTabClick('close')
                    : onTabClick('open')
                : onTabClick(e);
        } }, !child.props.disabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tabLabel }, typeof child.props.display === 'function'
            ? child.props.display()
            : child.props.display),
        selectedTabBlock ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronUp_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { className: isOrderReview ? _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iconOrderReview : _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.icon })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronDown_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: isOrderReview ? _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iconOrderReview : _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.icon })))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.disabledTabLabel }, typeof child.props.display === 'function'
            ? child.props.display()
            : child.props.display),
        child.props.disabledContent))));
};
var Content = function (_a) {
    var selectedTabBlock = _a.selectedTabBlock, child = _a.child, isOrderReview = _a.isOrderReview;
    return selectedTabBlock ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isOrderReview ? _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.contentOrderReview : _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.content }, child.props.content)) : null;
};
var TabBlock = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tabBlock, " ").concat(props.selectedTabBlock && !props.isOrderReview
        ? _accordianComponents_base_css__WEBPACK_IMPORTED_MODULE_1__.default.selectedTabBlock
        : '') },
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TabHeader, __assign({}, props, { setTabRef: props.setTabRef })),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Content, __assign({}, props)))); };
var AccordianComponent = function (_a) {
    var className = _a.className, selected = _a.selected, children = _a.children, switchTab = _a.switchTab, onTabClick = _a.onTabClick, setRef = _a.setRef, setTabRef = _a.setTabRef, isOrderReview = _a.isOrderReview;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className, ref: setRef }, react__WEBPACK_IMPORTED_MODULE_0__.default.Children.map(children, function (child) {
        var selectedTabBlock = child.props.id === selected;
        return child.props.show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TabBlock, { child: child, isOrderReview: isOrderReview, selectedTabBlock: selectedTabBlock, switchTab: switchTab, onTabClick: onTabClick, setTabRef: setTabRef })) : null;
    })));
};


/***/ }),

/***/ "./browser/components/common/Accordian/index.js":
/*!******************************************************!*\
  !*** ./browser/components/common/Accordian/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab": () => (/* binding */ Tab),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _accordianComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accordianComponents */ "./browser/components/common/Accordian/accordianComponents.js");
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







var PAGE_HEADER_HEIGHT = 60;
var TAB_HEIGHT = 64;
var TAB_MARGIN = 8;
var selectedTabExists = function (selectedTab, props) {
    var exists = false;
    react__WEBPACK_IMPORTED_MODULE_0__.default.Children.forEach(props.children, function (child) {
        child.props.show &&
            !child.props.disabled &&
            !exists &&
            (exists = selectedTab === child.props.id);
    });
    return exists;
};
var getDefaultTabToSelect = function (props) {
    var selected = null;
    props.defaultSelect &&
        react__WEBPACK_IMPORTED_MODULE_0__.default.Children.forEach(props.children, function (child) {
            child.props.show &&
                !child.props.disabled &&
                !selected &&
                (selected = child.props.id);
        });
    return selected;
};
var Accordian = /** @class */ (function (_super) {
    __extends(Accordian, _super);
    function Accordian(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { selected: null };
        _this.firstUpdate = false;
        ['switchTab', 'getSelected', 'setRef', 'setTabRef'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    Accordian.prototype.componentDidUpdate = function () {
        if (!this.firstUpdate) {
            var isPaymentOptionReorderEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('PAYMENT_OPTION_REORDER');
            var isPaymentOptionReorderV2Variant2Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isVariantEnabled)('PAYMENT_OPTION_REORDERV2_VARIANT2');
            var isFirstTimeCustomer = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'isFirstTimeCustomer', false);
            if (isPaymentOptionReorderEnabled && isFirstTimeCustomer) {
                var preSelectedOption = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PAYMENT_OPTIONS'), 'preSelectedOption') || 'upi';
                this.setState({
                    selected: preSelectedOption
                });
            }
            else if (isPaymentOptionReorderV2Variant2Enabled) {
                var preSelectedOption = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PAYMENT_OPTIONS'), 'preSelectedOptionV2') ||
                    'upi';
                this.setState({
                    selected: preSelectedOption
                });
            }
            this.firstUpdate = true;
        }
    };
    Accordian.getDerivedStateFromProps = function (props, state) {
        if (!selectedTabExists(state.selected, props)) {
            return {
                selected: getDefaultTabToSelect(props)
            };
        }
        return null;
    };
    Accordian.prototype.switchTab = function (e, tabId, options) {
        var _this = this;
        if (tabId === void 0) { tabId = ''; }
        if (options === void 0) { options = {}; }
        var id = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(e, 'currentTarget.id', tabId);
        var shouldTabClose = this.state.selected === id && !options.keepTabOpen;
        if (id) {
            triggerEvent('PAYMENT_TAB_TOGGLE_CLICK', {
                custom: {
                    custom: {
                        v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.getUidx)(),
                        v2: shouldTabClose ? 'close' : 'open'
                    },
                    widget: {
                        name: 'payment_option',
                        type: 'list',
                        data_set: {
                            data: {
                                entity_optional_attribute: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'children.0.props.content.props.totalPayable', 0)
                            }
                        }
                    },
                    widget_items: {
                        name: id,
                        type: 'list-item'
                    }
                }
            });
        }
        if (options.scrollIntoView && id) {
            this.accordian &&
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.scrollIntoView)(this.accordian, {
                    behavior: 'smooth',
                    block: 'center'
                });
        }
        shouldTabClose && this.props.closeTab();
        this.setState({
            selected: shouldTabClose ? null : id
        }, function () {
            options.callback && options.callback();
            if (options.scrollTabIntoView && id && !shouldTabClose) {
                var headerOffset = TAB_HEIGHT + TAB_MARGIN + ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.isPWA)() ? PAGE_HEADER_HEIGHT : 0);
                _this[id] &&
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.scrollBy)({
                        top: _this[id].offsetTop - window.pageYOffset - headerOffset,
                        behavior: 'smooth'
                    });
            }
        });
        this.props.onSwitchTab(id);
    };
    Accordian.prototype.selectDefaultTab = function () {
        this.switchTab(null, getDefaultTabToSelect(this.props));
    };
    Accordian.prototype.getSelected = function () {
        return this.state.selected;
    };
    Accordian.prototype.setRef = function (node) {
        this.accordian = node;
    };
    Accordian.prototype.setTabRef = function (node) {
        node && (this[node.id] = node);
    };
    Accordian.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, switchTab = _a.switchTab, setRef = _a.setRef, setTabRef = _a.setTabRef;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_accordianComponents__WEBPACK_IMPORTED_MODULE_5__.AccordianComponent, __assign({}, props, state, { switchTab: switchTab, setRef: setRef, setTabRef: setTabRef })));
    };
    return Accordian;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var Tab = function () { return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null); };
Accordian.propTypes = {
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    onTabClick: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
    closeTab: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};
Accordian.defaultProps = {
    closeTab: function () { }
};
Tab.propTypes = {
    id: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    display: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    content: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().Component)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordian);


/***/ }),

/***/ "./browser/components/common/DropDown/index.js":
/*!*****************************************************!*\
  !*** ./browser/components/common/DropDown/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dropdown_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown.base.css */ "./browser/components/common/DropDown/dropdown.base.css");



var DropDown = function (_a) {
    var show = _a.show, cancelCallback = _a.cancelCallback, _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children;
    return show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _dropdown_base_css__WEBPACK_IMPORTED_MODULE_1__.default.dropDownShimmer, onClick: cancelCallback }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_dropdown_base_css__WEBPACK_IMPORTED_MODULE_1__.default.dropDown, " ").concat(className) }, children))) : null;
};
DropDown.propTypes = {
    show: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    cancelCallback: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropDown);


/***/ }),

/***/ "./browser/components/common/InputWithDropdown/index.js":
/*!**************************************************************!*\
  !*** ./browser/components/common/InputWithDropdown/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_DropDown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/DropDown */ "./browser/components/common/DropDown/index.js");
/* harmony import */ var _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputWithDropdown.base.css */ "./browser/components/common/InputWithDropdown/inputWithDropdown.base.css");
/* harmony import */ var iconComp_DropDown_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/DropDown.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/DropDown.jsx");
/* harmony import */ var iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/RadioActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioActive.jsx");
/* harmony import */ var iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/RadioInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RadioInactive.jsx");
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








var InputWithDropdownWrapper = function (_a) {
    var withDropdown = _a.withDropdown, entries = _a.entries, selectedEntry = _a.selectedEntry, entriesShown = _a.entriesShown, toggleEntries = _a.toggleEntries, selectEntry = _a.selectEntry, deviceMode = _a.deviceMode, error = _a.error, inputContainerClass = _a.inputContainerClass, inputProps = __rest(_a, ["withDropdown", "entries", "selectedEntry", "entriesShown", "toggleEntries", "selectEntry", "deviceMode", "error", "inputContainerClass"]);
    return withDropdown ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InputWithDropdown, __assign({ entries: entries, selectedEntry: selectedEntry, entriesShown: entriesShown, toggleEntries: toggleEntries, selectEntry: selectEntry, deviceMode: deviceMode, error: error, className: inputContainerClass }, inputProps))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: inputContainerClass },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", __assign({ className: "".concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.input, " ").concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputFull, " ").concat(!!error ? _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputError : '') }, inputProps)),
        error && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.error }, error)));
};
var InputWithDropdown = function (_a) {
    var entries = _a.entries, selectedEntry = _a.selectedEntry, entriesShown = _a.entriesShown, toggleEntries = _a.toggleEntries, selectEntry = _a.selectEntry, deviceMode = _a.deviceMode, error = _a.error, _b = _a.className, className = _b === void 0 ? '' : _b, inputProps = __rest(_a, ["entries", "selectedEntry", "entriesShown", "toggleEntries", "selectEntry", "deviceMode", "error", "className"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputWithDropdownContainer, " ").concat(className) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", __assign({ className: "".concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputWithDropdown, " ").concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.input, " ").concat(!!error ? _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputError : '') }, inputProps)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.entriesDropdown, " ").concat(!!error ? _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputError : ''), onClick: toggleEntries },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.entryName }, selectedEntry),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_DropDown_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.dropdownIcon })),
        error && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.error }, error),
        deviceMode === 'mobile' ? (entriesShown && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { cancelCallback: toggleEntries, cancelIconConfig: { show: true, className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.closeIcon }, halfCard: true, className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modal }, getEntries({ entries: entries, selectEntry: selectEntry, selectedEntry: selectedEntry, mode: 'modal' })))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_DropDown__WEBPACK_IMPORTED_MODULE_2__.default, { show: entriesShown, cancelCallback: toggleEntries, className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.dropDown }, getEntries({
            entries: entries,
            selectEntry: selectEntry,
            selectedEntry: selectedEntry,
            mode: 'dropdown'
        })))));
};
var getEntries = function (_a) {
    var entries = _a.entries, selectEntry = _a.selectEntry, selectedEntry = _a.selectedEntry, mode = _a.mode;
    return entries.map(function (entry) {
        var isSelected = selectedEntry === entry;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: "entry-".concat(entry), key: "entry-".concat(entry), className: "".concat(mode === 'modal' ? _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalEntry : _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.dropdownEntry, " ").concat(isSelected ? _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selectedEntry : ''), onClick: selectEntry },
            mode === 'modal' ? (isSelected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioActive_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: "".concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.entryRadioIcon, " ").concat(_inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.radioIconSelected) })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RadioInactive_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _inputWithDropdown_base_css__WEBPACK_IMPORTED_MODULE_3__.default.entryRadioIcon }))) : null,
            entry));
    });
};
InputWithDropdownWrapper.propTypes = {
    withDropdown: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    entries: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().array),
    selectedEntry: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    entriesShown: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    toggleEntries: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    selectEntry: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    error: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    inputContainerClass: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    placeholder: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    onChange: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    value: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};
InputWithDropdownWrapper.defaultProps = {
    withDropdown: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputWithDropdownWrapper);


/***/ }),

/***/ "./browser/components/common/TabBar/index.js":
/*!***************************************************!*\
  !*** ./browser/components/common/TabBar/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab": () => (/* binding */ Tab),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabBar.base.css */ "./browser/components/common/TabBar/tabBar.base.css");
/* harmony import */ var iconComp_ChevronLeft_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/ChevronLeft.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/ChevronLeft.jsx");
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








var selectedTabExists = function (selectedTab, props) {
    var exists = false;
    react__WEBPACK_IMPORTED_MODULE_0__.default.Children.forEach(props.children, function (child) {
        child.props.show &&
            !child.props.disabled &&
            !exists &&
            (exists = selectedTab === child.props.id);
    });
    return exists;
};
var getSelectedTab = function (props) {
    var selected = '';
    props.defaultSelect &&
        react__WEBPACK_IMPORTED_MODULE_0__.default.Children.forEach(props.children, function (child) {
            child.props.show &&
                !child.props.disabled &&
                !selected &&
                (selected = child.props.id);
        });
    return selected;
};
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    function TabBar(props) {
        var _this = _super.call(this, props) || this;
        _this.isPaymentOptionReorderV2Variant2Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isVariantEnabled)('PAYMENT_OPTION_REORDERV2_VARIANT2');
        _this.preSelectedOption =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__.getKVPairValue)('PAYMENT_OPTIONS'), 'preSelectedOptionV2') || 'upi';
        _this.state = {
            selected: _this.isPaymentOptionReorderV2Variant2Enabled
                ? _this.preSelectedOption
                : getSelectedTab(props)
        };
        ['switchTab', 'goBack', 'getSelected', 'setMobileRef'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    TabBar.getDerivedStateFromProps = function (props, state) {
        if (!selectedTabExists(state.selected, props)) {
            return {
                selected: getSelectedTab(props)
            };
        }
        return null;
    };
    TabBar.prototype.switchTab = function (e, tabId, options) {
        if (tabId === void 0) { tabId = ''; }
        if (options === void 0) { options = {}; }
        var id = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(e, 'currentTarget.id', tabId);
        if (id === this.state.selected) {
            options.callback && options.callback();
            return;
        }
        if (options.scrollIntoView && id) {
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.scrollIntoView)(this.tabBarMobile, {
                behavior: 'smooth',
                block: 'center'
            });
        }
        this.setState({
            selected: id
        }, function () {
            options.callback && options.callback();
        });
        this.props.onSwitchTab(id);
    };
    TabBar.prototype.selectDefaultTab = function () {
        this.switchTab('', getSelectedTab(this.props));
    };
    TabBar.prototype.goBack = function () {
        this.props.closeTab();
        this.setState({
            selected: ''
        });
    };
    TabBar.prototype.getSelected = function () {
        return this.state.selected;
    };
    TabBar.prototype.setMobileRef = function (node) {
        this.tabBarMobile = node;
    };
    TabBar.prototype.getTabBarDesktop = function () {
        var _this = this;
        var _a = this, _b = _a.props, children = _b.children, _c = _b.className, className = _c === void 0 ? '' : _c, onTabClick = _b.onTabClick, _d = _b.tabClass, tabClass = _d === void 0 ? '' : _d, selected = _a.state.selected;
        var selectedChild;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabBar, " ").concat(className) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabsBlock }, react__WEBPACK_IMPORTED_MODULE_0__.default.Children.map(children, function (child) {
                var isChildSelected = child.props.id === selected;
                isChildSelected && (selectedChild = child);
                return child.props.show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: child.props.id, className: "".concat(isChildSelected ? _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.selected : '', " ").concat(_tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tab, " ").concat(tabClass), onClick: function (e) {
                        if (child.props.disabled) {
                            return;
                        }
                        _this.switchTab(e);
                        onTabClick(e);
                    } }, !child.props.disabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabLabel }, typeof child.props.display === 'function'
                    ? child.props.display(isChildSelected)
                    : child.props.display)) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.disabledTabLabel }, typeof child.props.display === 'function'
                        ? child.props.display(isChildSelected)
                        : child.props.display),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, child.props.disabledContent))))) : null;
            })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.contentBlock }, selectedChild.props.content)));
    };
    TabBar.prototype.getTabBarMobile = function () {
        var _this = this;
        var _a = this, _b = _a.props, children = _b.children, _c = _b.className, className = _c === void 0 ? '' : _c, onTabClick = _b.onTabClick, selected = _a.state.selected, setMobileRef = _a.setMobileRef;
        var selectedChild;
        selected &&
            react__WEBPACK_IMPORTED_MODULE_0__.default.Children.forEach(children, function (child) { return child.props.id === selected && (selectedChild = child); });
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className, ref: setMobileRef }, selected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.goBack, onClick: this.goBack },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_ChevronLeft_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.backIcon }),
                'Go Back'),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.contentBlockMobile }, selectedChild.props.content))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabsBlockMobile }, react__WEBPACK_IMPORTED_MODULE_0__.default.Children.map(children, function (child) {
            return child.props.show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: child.props.id, className: "".concat(_tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabMobile), onClick: function (e) {
                    if (child.props.disabled) {
                        return;
                    }
                    _this.switchTab(e, '', { scrollIntoView: true });
                    onTabClick(e);
                } }, !child.props.disabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tabLabel }, child.props.display),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.select }, "SELECT"))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tabBar_base_css__WEBPACK_IMPORTED_MODULE_5__.default.disabledTabLabel }, child.props.display),
                child.props.disabledContent)))) : null;
        })))));
    };
    TabBar.prototype.render = function () {
        var mode = this.props.mode;
        return mode === 'desktop'
            ? this.getTabBarDesktop()
            : this.getTabBarMobile();
    };
    return TabBar;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
var Tab = function () { return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null); };
TabBar.propTypes = {
    defaultSelect: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    onTabClick: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    closeTab: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
    onSwitchTab: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
};
TabBar.defaultProps = {
    onTabClick: function () { },
    closeTab: function () { },
    onSwitchTab: function () { }
};
Tab.propTypes = {
    id: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    display: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    content: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().Component)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabBar);


/***/ }),

/***/ "./browser/components/payment/common/ActionButton/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/ActionButton/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _actionButton_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionButton.base.css */ "./browser/components/payment/common/ActionButton/actionButton.base.css");
/* harmony import */ var commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ImmobilizeComponent */ "./browser/components/common/ImmobilizeComponent/index.js");



var ActionButton = function (_a) {
    var text = _a.text, visible = _a.visible, _b = _a.className, className = _b === void 0 ? '' : _b, deviceMode = _a.deviceMode, onClick = _a.onClick, disabled = _a.disabled;
    return deviceMode === 'desktop' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_2__.ImmobilizedButton, { className: "".concat(_actionButton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.actionButton, " ").concat(className, " ").concat(!visible ? _actionButton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.hide : ''), onClick: onClick, disabled: disabled, disableClassName: _actionButton_base_css__WEBPACK_IMPORTED_MODULE_1__.default.disable }, text)) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionButton);


/***/ }),

/***/ "./browser/components/payment/common/Cashback/CashbackMsg.js":
/*!*******************************************************************!*\
  !*** ./browser/components/payment/common/Cashback/CashbackMsg.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cashback.base.css */ "./browser/components/payment/common/Cashback/cashback.base.css");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);





var CASHBACK_ERR = 'Could not check the discount amount for this card. Please check again.';
var ELIGIBILITY_CHECK = ' Check Offer Eligibility';
var isInlineOfferForCardEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isFeatureEnabled)('INLINE_OFFER_CARD');
var CashbackMsg = function (props) {
    var _a = props.data.data, _b = _a.state, state = _b === void 0 ? {} : _b, icbRetryCount = _a.icbRetryCount, onClickEligibility = _a.onClickEligibility;
    if (state.icb && state.icb.show) {
        var _c = state.icb, code = _c.code, message = _c.message, error = _c.error;
        if (error &&
            (!isInlineOfferForCardEnabled || props.data.data.props.isClicked)) {
            if (state.currentRetryCount <= icbRetryCount) {
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackError },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, CASHBACK_ERR),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.retryBtn, onClick: onClickEligibility }, ELIGIBILITY_CHECK)));
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Can not check for bank discount eligibility, please retry after 30 minutes. T&C Apply"));
            }
        }
        else if (code) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackInfo });
        }
        else if (message) {
            if (isInlineOfferForCardEnabled && props.data.data.props.isClicked) {
                var msg = message
                    .replace('Get', '')
                    .replace('available on item', 'applied')
                    .replace('available on all items', 'applied')
                    .replace('applieds', 'applied')
                    .replace('-', '');
                return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackMessageInline }, msg);
            }
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: isInlineOfferForCardEnabled &&
                    !lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'data.data.props.isNewCard')
                    ? _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackMessageInline
                    : _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackMessage }, message));
        }
    }
    else if (state.deff.show) {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cashback_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cashbackMessage }, state.deff.message);
    }
    return null;
};
CashbackMsg.propTypes = {
    data: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CashbackMsg);


/***/ }),

/***/ "./browser/components/payment/common/CreditsBlock/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/CreditsBlock/index.js ***!
  \*****************************************************************/
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
/* harmony import */ var commonComp_Credits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Credits */ "./browser/components/common/Credits/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__);
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










var MYNTRA_CREDIT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.MYNTRA_CREDIT, LOYALTY_POINTS = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.LOYALTY_POINTS;
var CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY = 60 * 60 * 1000;
var boundFuncs = ['refreshPaymentOptions', 'creditsToggleSuccessCallback'];
var CreditsBlock = /** @class */ (function (_super) {
    __extends(CreditsBlock, _super);
    function CreditsBlock(props) {
        var _this = _super.call(this, props) || this;
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    CreditsBlock.prototype.refreshPaymentOptions = function (cartData) {
        var _this = this;
        var outstandingAmount = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total');
        var cartId = cartData.id;
        if (outstandingAmount) {
            return this.props.handlePaymentAction('getPaymentOptions', {
                cartId: cartId,
                isExchangeCart: (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_4__.checkExchangeCart)(cartData)
            }, {
                updateKey: 'paymentOptions'
            }, function (res) {
                _this.props.updatePageData((0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.getPaymentConfig)(res), {
                    updateKey: 'paymentConfig'
                });
            });
        }
    };
    CreditsBlock.prototype.creditsToggleSuccessCallback = function (res, action) {
        this.props.updatePageData(res, { updateKey: 'cartData' });
        this.refreshPaymentOptions(res);
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('CART_CREDIT') &&
            action === 'removeGiftCard' &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE, true, CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY);
    };
    CreditsBlock.prototype.render = function () {
        var _a = this.props, creditsBalance = _a.creditsBalance, cartData = _a.cartData, paymentOptions = _a.paymentOptions, setLoader = _a.setLoader, addMyntraInstrumentsData = _a.addMyntraInstrumentsData, showTab = _a.showTab, deviceMode = _a.deviceMode, payMode = _a.payMode, retryGCappliedValue = _a.retryGCappliedValue, updateCreditsBalance = _a.updateCreditsBalance, toggleRetryGC = _a.toggleRetryGC;
        var appliedGC;
        if (payMode === 'retry') {
            appliedGC = retryGCappliedValue ? { value: retryGCappliedValue } : null;
        }
        else {
            appliedGC = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_4__.getAppliedInstrument)('giftcard', cartData);
        }
        var appliedLP = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_4__.getAppliedInstrument)('loyaltypoints', cartData);
        var mcInstrumentData = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.getInstrumentData)(paymentOptions, MYNTRA_CREDIT);
        var lpInstrumentData = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.getInstrumentData)(paymentOptions, LOYALTY_POINTS);
        var selectedProductsCount = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getSelectedProductsCount)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'products'));
        var cartTotal = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.currencyValue)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total', 0));
        var isExchangeCart = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_4__.checkExchangeCart)(cartData);
        var isRefund = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.userAction') === commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.userActionTypes.REFUND;
        var giftcardApplicable = payMode === 'retry'
            ? { value: true }
            : lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'flags.giftcardApplicable', {});
        var loyaltyPointsApplicable = payMode === 'retry'
            ? { value: false }
            : lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'flags.loyaltyPointsApplicable', {});
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Credits__WEBPACK_IMPORTED_MODULE_2__.default, { payMode: payMode, pagesource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_8__.checkoutPage.PAYMENT, balance: creditsBalance, appliedGC: appliedGC, appliedLP: appliedLP, cartId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'id'), cartTotal: cartTotal, giftcardApplicable: giftcardApplicable, loyaltyPointsApplicable: loyaltyPointsApplicable, deviceMode: deviceMode, isExchangeCart: isExchangeCart, isRefund: isRefund, show: {
                mcShow: showTab(MYNTRA_CREDIT, mcInstrumentData),
                lpShow: showTab(LOYALTY_POINTS, lpInstrumentData),
                scShow: false
            }, instrumentData: { mc: mcInstrumentData, lp: lpInstrumentData }, creditsToggleSuccessCallback: this.creditsToggleSuccessCallback, addMyntraInstrumentsData: addMyntraInstrumentsData, updateCreditsBalance: updateCreditsBalance, toggleRetryGC: toggleRetryGC, setLoader: setLoader, selectedProductsCount: selectedProductsCount }));
    };
    return CreditsBlock;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
CreditsBlock.propTypes = {
    creditsBalance: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
    paymentOptions: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
    updatePageData: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func),
    setLoader: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func),
    addMyntraInstrumentsData: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func),
    showTab: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreditsBlock);


/***/ }),

/***/ "./browser/components/payment/common/FreePurchase/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/FreePurchase/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./freePurchase.base.css */ "./browser/components/payment/common/FreePurchase/freePurchase.base.css");
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






var FreePurchase = /** @class */ (function (_super) {
    __extends(FreePurchase, _super);
    function FreePurchase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FreePurchase.prototype.componentDidMount = function () {
        this.props.updateStickyButton({ text: 'PLACE ORDER' });
    };
    FreePurchase.prototype.componentWillUnmount = function () {
        this.props.updateStickyButton({ text: 'PAY NOW' });
    };
    FreePurchase.prototype.render = function () {
        var props = this.props;
        var myntraCreditInstrumentData = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__.getInstrumentData)(this.props.paymentOptions, commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.MYNTRA_CREDIT);
        var paymentUrl = myntraCreditInstrumentData.paymentInstrumentDetails.paymentUrl;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.container, " ").concat(props.mode === 'desktop'
                ? _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desktopContainer
                : _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.mobileContainer) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.heading }, "Yay! no additional amount to pay"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desc }, "You have no outstanding amount to pay. Click \"Place Order\" button to place this order."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_1__.default, __assign({}, props, { paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.FREE_PURCHASE, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.FREE_PURCHASE, formAttributes: { novalidate: true }, deviceMode: props.mode, actionData: {
                    name: 'PLACE ORDER',
                    className: _freePurchase_base_css__WEBPACK_IMPORTED_MODULE_4__.default.submitButton
                } }))));
    };
    return FreePurchase;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
FreePurchase.propTypes = {
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    updateStickyButton: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
FreePurchase.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreePurchase);


/***/ }),

/***/ "./browser/components/payment/common/LowSRMessage/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/LowSRMessage/index.js ***!
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
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lowSRMessage_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lowSRMessage.base.css */ "./browser/components/payment/common/LowSRMessage/lowSRMessage.base.css");
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





var MESSAGE = {
    new_card: 'This bank',
    card: 'This bank',
    vpa: 'This payment option'
};
var LowSRMessage = /** @class */ (function (_super) {
    __extends(LowSRMessage, _super);
    function LowSRMessage(props) {
        return _super.call(this, props) || this;
    }
    LowSRMessage.prototype.fireEvents = function () {
        var _a;
        var _b = this.props, instrumentName = _b.instrumentName, instrumentType = _b.instrumentType, _c = _b.binNumber, binNumber = _c === void 0 ? null : _c, disable = _b.disable;
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getUidx)();
        var payload = (_a = {
                uidx: uidx
            },
            _a[instrumentType] = binNumber || instrumentName //bin number for new cc/dc
        ,
            _a);
        disable
            ? triggerEvent('LOW_SR_DISABLE_INSTRUMENT', {
                gaLabel: JSON.stringify(payload),
                maData: payload
            })
            : triggerEvent('LOW_SR_MESSAGE_DISPLAY', {
                gaLabel: JSON.stringify(payload),
                maData: payload
            });
    };
    LowSRMessage.prototype.componentDidMount = function () {
        this.props.show && this.fireEvents();
    };
    LowSRMessage.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        this.props.show &&
            prevProps.instrumentName !== this.props.instrumentName &&
            this.fireEvents();
    };
    LowSRMessage.prototype.render = function () {
        var _a = this.props, instrumentName = _a.instrumentName, _b = _a.className, className = _b === void 0 ? '' : _b, instrumentType = _a.instrumentType, show = _a.show, disable = _a.disable;
        if (!show)
            return null;
        var _c = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('LOW_SR_MESSAGES'), lowSuccessRate = _c.lowSuccessRate, highFailureRate = _c.highFailureRate;
        var message = disable ? highFailureRate : lowSuccessRate;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_lowSRMessage_base_css__WEBPACK_IMPORTED_MODULE_3__.default.lowSRMessage, " ").concat(className) }, "".concat(MESSAGE[instrumentType] ||
            MESSAGE[instrumentName] ||
            instrumentName, " ").concat(message)));
    };
    return LowSRMessage;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
LowSRMessage.propTypes = {
    instrumentName: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
    show: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool.isRequired),
    disable: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LowSRMessage);


/***/ }),

/***/ "./browser/components/payment/common/Notifications/Suggestion/index.js":
/*!*****************************************************************************!*\
  !*** ./browser/components/payment/common/Notifications/Suggestion/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suggestion.base.css */ "./browser/components/payment/common/Notifications/Suggestion/suggestion.base.css");
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





var SuggestionNotification = /** @class */ (function (_super) {
    __extends(SuggestionNotification, _super);
    function SuggestionNotification(props) {
        var _this = _super.call(this, props) || this;
        _this.onTipClick = _this.onTipClick.bind(_this);
        return _this;
    }
    SuggestionNotification.prototype.onTipClick = function () {
        triggerEvent('CONVERT_TO_COD', {
            gaLabel: (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_3__.getPaymentFailureCount)()
        });
        this.props.switchTab(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_2__.default.COD, { keepTabOpen: true });
    };
    SuggestionNotification.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.container, " ").concat(this.props.mode === 'desktop' ? _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desktopContainer : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.textContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_1__.default, { name: "bulb", className: _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.bulbImage }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.infoBlock },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.title }, "Having trouble with your payments?"),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _suggestion_base_css__WEBPACK_IMPORTED_MODULE_4__.default.tip, onClick: this.onTipClick }, "PAY VIA CASH ON DELIVERY")))));
    };
    return SuggestionNotification;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuggestionNotification);


/***/ }),

/***/ "./browser/components/payment/common/Notifications/index.js":
/*!******************************************************************!*\
  !*** ./browser/components/payment/common/Notifications/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _notifications_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.base.css */ "./browser/components/payment/common/Notifications/notifications.base.css");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__);
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

// Style Imports.


var InfoNotification = function (props) {
    var heading = props.heading, info = props.info;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _notifications_base_css__WEBPACK_IMPORTED_MODULE_1__.default.infoContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _notifications_base_css__WEBPACK_IMPORTED_MODULE_1__.default.heading }, heading),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _notifications_base_css__WEBPACK_IMPORTED_MODULE_1__.default.info }, info)));
};
var Notifications = /** @class */ (function (_super) {
    __extends(Notifications, _super);
    function Notifications(props) {
        return _super.call(this, props) || this;
    }
    Notifications.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, (0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_2__.isGiftcardContext)() && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(InfoNotification, { heading: "Please Note", info: "International Cards are not allowed for Giftcard/Topup purchase" }))));
    };
    return Notifications;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notifications);


/***/ }),

/***/ "./browser/components/payment/common/OfferBanner/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/OfferBanner/index.js ***!
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
/* harmony import */ var _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./offerBanner.base.css */ "./browser/components/payment/common/OfferBanner/offerBanner.base.css");
/* harmony import */ var _confirmation_common_SlickCarousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../confirmation/common/SlickCarousel */ "./browser/components/confirmation/common/SlickCarousel/index.js");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__);








var tncClickEvent = function (name) {
    triggerEvent('INLINE_OFFER_TNC_CLICK', {
        custom: {
            custom: {
                v1: name
            }
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var selected = _a.selected, offerData = _a.offerData, deviceMode = _a.deviceMode, _b = _a.name, name = _b === void 0 ? '' : _b;
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showTncModal = _c[0], toggleTncModal = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]), tnc = _d[0], updateTnc = _d[1];
    var interval = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__.getKVPairValue)('INLINE_OFFERS'), 'interval', 3) * 1000;
    return (offerData.length >= 1 && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.offerContainer, " ").concat(name === 'card' && deviceMode == 'mobile' ? _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.mobileCard : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_confirmation_common_SlickCarousel__WEBPACK_IMPORTED_MODULE_3__.default, { slideInterval: interval, isPaymentPage: true }, offerData.map(function (data, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: "offer-".concat(index), id: "offer-".concat(index), className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.offerSlide },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.offerBody },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.offerHeading }, data.heading),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.offerMessage }, data.message)),
            (data === null || data === void 0 ? void 0 : data.tnc) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.infoIcon, onClick: function () {
                    toggleTncModal(!showTncModal);
                    updateTnc(data.tnc);
                    tncClickEvent(name);
                } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { id: "offer-banner-info-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_4__.default, null)))))); })),
        tnc && showTncModal ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__.default, { className: deviceMode === 'mobile'
                ? _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.mobileModalContainer
                : _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.desktopModalContainer, cancelIconConfig: { show: true, className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cancelIcon }, cancelCallback: function () { return toggleTncModal(!showTncModal); }, halfCard: deviceMode === 'mobile' },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tncHeading }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_6__.INLINE_OFFER.tnc),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("ul", null, tnc.map(function (data, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _offerBanner_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tncBody }, data))); })))) : null)));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/BNPL/BNPLCardUI.js":
/*!**********************************************************************!*\
  !*** ./browser/components/payment/common/Options/BNPL/BNPLCardUI.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BNPLCardUIContent": () => (/* binding */ BNPLCardUIContent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _TNCIframe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TNCIframe */ "./browser/components/payment/common/Options/BNPL/TNCIframe/index.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bnplCardUI.base.css */ "./browser/components/payment/common/Options/BNPL/bnplCardUI.base.css");
/* harmony import */ var iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! iconComp/Rupee.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Rupee.jsx");
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











var ICON_CONFIG = {
    type: 'icon',
    position: 'right',
    name: 'Flipkart',
    iconSize: { width: 16, height: 16 },
    className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.icon
};
var BNPLCardUIContent = function (_a) {
    var payMode = _a.payMode, optionData = _a.optionData, mobileValue = _a.mobileValue, outstandingAmount = _a.outstandingAmount, modalShow = _a.modalShow, errorMessage = _a.errorMessage, _b = _a.className, className = _b === void 0 ? '' : _b, setMobile = _a.setMobile, displayInput = _a.displayInput, hideTNCModal = _a.hideTNCModal, onTNCSuccess = _a.onTNCSuccess;
    var disable = optionData.disable;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className },
        displayInput(optionData) ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.mobileNumberHeading }, "Enter your mobile number registered with Flipkart."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.mobileNumberInput, " ").concat(!!errorMessage ? _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.inputError : '') },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.extension }, "+91-"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.input, maxLength: "10", placeholder: "Enter Mobile Number", value: mobileValue, onChange: setMobile })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.error }, errorMessage))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.confirmContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "Please confirm that you will pay the following amount through Flipkart Pay Later."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.amount },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Rupee_jsx__WEBPACK_IMPORTED_MODULE_10__.default, { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.rupeeIcon }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, outstandingAmount)))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_6__.default, { show: disable || optionData.lowSuccessRate, instrumentType: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER, instrumentName: optionData.name, className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.lowSRMessage, disable: disable }),
        modalShow && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__.default, { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.tncModal, cancelCallback: hideTNCModal, enableBackButton: payMode !== 'retry', cancelIconConfig: { show: true } },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_TNCIframe__WEBPACK_IMPORTED_MODULE_5__.default, { src: "".concat(optionData.tncUrl, "&origin=").concat(window.location.origin), successCallback: onTNCSuccess })))));
};
var getDisplayText = function () {
    var cardNameConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('PAYMENT_RECOMMENDED_CONFIG');
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardNameConfig, "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER, ".name"), 'Flipkart Pay Later');
    return text;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var rank = _a.rank, payMode = _a.payMode, optionData = _a.optionData, deviceMode = _a.deviceMode, selectedId = _a.selectedId, classNames = _a.classNames, idPrefix = _a.idPrefix, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick, contentProps = __rest(_a, ["rank", "payMode", "optionData", "deviceMode", "selectedId", "classNames", "idPrefix", "selectInstrument", "onActionButtonClick"]);
    var selected = selectedId === 'paylater';
    var disable = optionData.disable;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__.default, { key: "".concat(idPrefix, "paylater"), id: "".concat(idPrefix, "paylater"), selected: selected, iconConfig: ICON_CONFIG, displayName: getDisplayText(), classNames: classNames, onClickParams: {
            mobile: contentProps.getMobile(),
            authenticationRequired: optionData.authenticationRequired,
            instrumentType: optionData.instrumentType,
            paymentUrl: optionData.paymentUrl,
            rank: rank
        }, onClick: selectInstrument },
        selected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(BNPLCardUIContent, __assign({ payMode: payMode, optionData: optionData }, contentProps, { className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.content }))) : null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_4__.default, { text: optionData.authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER', onClick: onActionButtonClick, visible: selected && !disable, className: _bnplCardUI_base_css__WEBPACK_IMPORTED_MODULE_9__.default.actionButton, deviceMode: deviceMode })));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/BNPL/TNCIframe/index.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/Options/BNPL/TNCIframe/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _tncIframe_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tncIframe.base.css */ "./browser/components/payment/common/Options/BNPL/TNCIframe/tncIframe.base.css");
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


var TNCIframe = /** @class */ (function (_super) {
    __extends(TNCIframe, _super);
    function TNCIframe() {
        var _this = _super.call(this) || this;
        _this.readMessage = _this.readMessage.bind(_this);
        window.addEventListener('message', _this.readMessage, false);
        return _this;
    }
    TNCIframe.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.readMessage, false);
    };
    TNCIframe.prototype.readMessage = function (message) {
        var data = message.data;
        if (data === 204) {
            this.props.successCallback();
        }
        else if (typeof data === 'object' && data.type !== 'iframeLoaded') {
            window.location =
                '/checkout/payment?transaction_status=N&errorCode=40001';
        }
    };
    TNCIframe.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("iframe", { src: this.props.src, className: _tncIframe_base_css__WEBPACK_IMPORTED_MODULE_1__.default.iframe, sandbox: true });
    };
    return TNCIframe;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TNCIframe);


/***/ }),

/***/ "./browser/components/payment/common/Options/BNPL/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/Options/BNPL/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _bnpl_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bnpl.base.css */ "./browser/components/payment/common/Options/BNPL/bnpl.base.css");
/* harmony import */ var _BNPLCardUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BNPLCardUI */ "./browser/components/payment/common/Options/BNPL/BNPLCardUI.js");
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__);
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

// Style Imports.






var ERROR_MESSAGE_MAP = {
    EMPTY: 'Please enter a registered mobile number',
    INVALID: 'Please enter a valid 10 digit mobile number'
};
var BNPL = /** @class */ (function (_super) {
    __extends(BNPL, _super);
    function BNPL(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mobileValue: '',
            errorMessage: '',
            modalShow: false,
            modalSuccessCallback: null
        };
        [
            'setMobile',
            'displayInput',
            'submitCallback',
            'redirectToTNC',
            'onTNCSuccess',
            'hideTNCModal'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.props.updateBankDiscount(0);
        return _this;
    }
    BNPL.prototype.componentDidMount = function () {
        var _a = this.props, authenticationRequired = _a.instrumentData.authenticationRequired, instrumentData = _a.instrumentData;
        var disable = instrumentData.disable;
        this.props.updateStickyButton({
            text: authenticationRequired && !disable ? 'VERIFY & PAY' : 'PLACE ORDER'
        });
    };
    BNPL.prototype.componentWillUnmount = function () {
        this.props.updateStickyButton({
            text: 'PAY NOW'
        });
    };
    BNPL.prototype.setMobile = function (e) {
        var value = e.target.value;
        this.setState({ mobileValue: value, errorMessage: '' });
    };
    BNPL.prototype.showTNCModal = function (successCallback) {
        this.props.setLoader(false);
        this.setState({ modalShow: true, modalSuccessCallback: successCallback });
    };
    BNPL.prototype.hideTNCModal = function () {
        this.setState({ modalShow: false, modalSuccessCallback: null });
    };
    BNPL.prototype.getMobile = function () {
        return this.state.mobileValue || '';
    };
    BNPL.prototype.redirectToTNC = function () {
        SHELL.redirectTo("/checkout/payment/bnpl/tnc?mobile=".concat(this.getMobile()));
    };
    BNPL.prototype.isValidMobile = function () {
        var mobile = this.state.mobileValue;
        if (!(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.isValidMobile)(mobile)) {
            var isEmptyMobile = (mobile || '').length === 0;
            this.setState({
                errorMessage: isEmptyMobile
                    ? ERROR_MESSAGE_MAP.EMPTY
                    : ERROR_MESSAGE_MAP.INVALID
            });
            return false;
        }
        return true;
    };
    BNPL.prototype.triggerSubmitEvent = function () {
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.PAY_LATER,
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.PAY_LATER,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_6__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
    };
    BNPL.prototype.submitCallback = function (done) {
        var _this = this;
        var _a = this.props, tncAccepted = _a.instrumentData.tncAccepted, instrumentData = _a.instrumentData, deviceMode = _a.deviceMode;
        if (this.displayInput(instrumentData) && !this.isValidMobile()) {
            this.props.setLoader(false);
            return;
        }
        if (tncAccepted) {
            this.triggerSubmitEvent();
            done();
            return;
        }
        deviceMode === 'mobile'
            ? this.redirectToTNC()
            : this.showTNCModal(function () {
                _this.triggerSubmitEvent();
                done();
            });
    };
    BNPL.prototype.onTNCSuccess = function () {
        this.props.setLoader(true);
        this.state.modalSuccessCallback();
    };
    BNPL.prototype.displayInput = function () {
        var _a = this.props.instrumentData, loginType = _a.loginType, status = _a.status;
        return status !== 'ACTIVE' && loginType === 'EMAIL';
    };
    BNPL.prototype.getOptionUI = function () {
        var _a = this.props, instrumentData = _a.instrumentData, outstandingAmount = _a.outstandingAmount, deviceMode = _a.deviceMode, payMode = _a.payMode;
        var _b = this.state, mobileValue = _b.mobileValue, errorMessage = _b.errorMessage, modalShow = _b.modalShow;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnpl_base_css__WEBPACK_IMPORTED_MODULE_1__.default.mode },
            deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _bnpl_base_css__WEBPACK_IMPORTED_MODULE_1__.default.heading }, "Flipkart Pay Later")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_BNPLCardUI__WEBPACK_IMPORTED_MODULE_2__.BNPLCardUIContent, { payMode: payMode, optionData: instrumentData, mobileValue: mobileValue, errorMessage: errorMessage, modalShow: modalShow, outstandingAmount: outstandingAmount, setMobile: this.setMobile, displayInput: this.displayInput, hideTNCModal: this.hideTNCModal, onTNCSuccess: this.onTNCSuccess })));
    };
    BNPL.prototype.getModeAttributes = function () {
        return {
            userProfileMobile: this.getMobile(),
            paymentProviderId: 1
        };
    };
    BNPL.prototype.render = function () {
        var _a = this.props, _b = _a.instrumentData, authenticationRequired = _b.authenticationRequired, paymentUrl = _b.paymentUrl, instrumentData = _a.instrumentData, payMode = _a.payMode, retrySessionEnabled = _a.retrySessionEnabled;
        var disable = instrumentData.disable;
        return !disable ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, this.props, { paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.PAY_LATER, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.PAY_LATER, optionUI: this.getOptionUI(), actionData: {
                name: authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER',
                disable: payMode === 'retry' && !retrySessionEnabled
            }, submitCallback: this.submitCallback, modeAttributes: this.getModeAttributes() }))) : (this.getOptionUI());
    };
    return BNPL;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BNPL);


/***/ }),

/***/ "./browser/components/payment/common/Options/Card/CardForm/CardInputs/index.js":
/*!*************************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Card/CardForm/CardInputs/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardNumber": () => (/* binding */ CardNumber),
/* harmony export */   "CardName": () => (/* binding */ CardName),
/* harmony export */   "ExpiryMonthYear": () => (/* binding */ ExpiryMonthYear),
/* harmony export */   "ExpiryCVVInfo": () => (/* binding */ ExpiryCVVInfo),
/* harmony export */   "CVV": () => (/* binding */ CVV),
/* harmony export */   "SaveCard": () => (/* binding */ SaveCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../cardForm.base.css */ "./browser/components/payment/common/Options/Card/CardForm/cardForm.base.css");
/* harmony import */ var _Cashback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../Cashback */ "./browser/components/payment/common/Cashback/index.js");
/* harmony import */ var _Cashback_CashbackMsg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../../Cashback/CashbackMsg */ "./browser/components/payment/common/Cashback/CashbackMsg.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_Sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Sprite */ "./browser/components/common/Sprite/index.js");
/* harmony import */ var commonComp_InputV2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/InputV2 */ "./browser/components/common/InputV2/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! iconComp/CheckboxActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxActive.jsx");
/* harmony import */ var iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! iconComp/CheckboxInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxInactive.jsx");
/* harmony import */ var _SaveCardConsent__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../SaveCardConsent */ "./browser/components/payment/common/SaveCardConsent/index.js");
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



// Common Style Imports.

// Page Specific Component















var CardNumber = function (props) {
    var _a = props.form, form = _a === void 0 ? {} : _a, plutusInfo = props.plutusInfo, setValue = props.setValue, checkValue = props.checkValue, onFocus = props.onFocus, cartData = props.cartData, updateBankDiscount = props.updateBankDiscount, _b = props.savedCardInstrumentData, _c = _b === void 0 ? {} : _b, _d = _c.type, type = _d === void 0 ? '' : _d, payMode = props.payMode, paymentOptions = props.paymentOptions, retryGCappliedValue = props.retryGCappliedValue;
    var _e = form.cardNumber, hasLowSR = _e.hasLowSR, disable = _e.disable;
    var cardImage = form.cardType &&
        commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_11__.default.AVAILABLE_CARD_IMAGES.indexOf(form.cardType) !== -1
        ? 'cardv2-' + form.cardType.toLowerCase()
        : 'cardv2-default';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.row, " ").concat(hasLowSR ? null : _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cardNumberBottomMargin) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_7__.default, { id: "cardNumber", type: "tel", label: "Card Number", value: form.cardNumber.value, maxLength: form.cardNumber.maxLength, onChange: setValue, onFocus: onFocus, onBlur: checkValue }),
        form.cardNumber.error && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorMessage }, form.cardNumber.error)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_13__.default, { instrumentType: 'new_card', binNumber: form.cardNumber.value, className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.lowSRMessage, show: hasLowSR || disable, disable: disable }),
        plutusInfo.show && !(0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_10__.isGiftcardContext)() && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Cashback__WEBPACK_IMPORTED_MODULE_3__.default, { payMode: payMode, cartData: cartData, cardNumber: plutusInfo.cardNumber, paymentOptions: paymentOptions, retryGCappliedValue: retryGCappliedValue, updateBankDiscount: updateBankDiscount, handlePaymentAction: props.handlePaymentAction, isNewCard: true, render: function (data) { return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Cashback_CashbackMsg__WEBPACK_IMPORTED_MODULE_4__.default, { data: data }); } })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_6__.default, { name: cardImage, className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cardType })));
};
CardNumber.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
    setValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
    checkValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
    onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object)
};
/**
 * CardName:
 */
var CardName = function (props) {
    var _a = props.form, form = _a === void 0 ? {} : _a, setValue = props.setValue, checkValue = props.checkValue, onFocus = props.onFocus;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.row },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_7__.default, { id: "cardName", label: "Name on card", value: form.cardName.value, maxLength: form.cardName.maxLength, onChange: setValue, onFocus: onFocus, onBlur: checkValue }),
        form.cardName.error && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorMessage }, form.cardName.error))));
};
CardName.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
    setValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
    checkValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
    onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func)
};
/**
 *
 * Expiry Month and Year segment in the form.
 */
var ExpiryMonthYear = function (props) {
    var _a = props.form, form = _a === void 0 ? {} : _a, setValue = props.setValue, checkValue = props.checkValue, onFocus = props.onFocus;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.row, " ").concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiry) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_7__.default, { id: "expiry", label: "Valid Thru (MM/YY)", type: "tel", pattern: "\\d*", maxLength: "5", onChange: setValue, value: form.expiry.value, onFocus: onFocus, onBlur: checkValue }),
        form.expiry.error && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorMessage },
            " ",
            form.expiry.error))));
};
ExpiryMonthYear.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
    setValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func)
};
var ExpiryCVVInfo = function (_a) {
    var form = _a.form;
    return !(form.expiry.required || form.cvv.required) ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiryMessage }, "Expiry and CVV not required if not mentioned on your card")) : null;
};
ExpiryCVVInfo.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object)
};
/**
 * SaveCard Component for the form.
 */
var SaveCard = /** @class */ (function (_super) {
    __extends(SaveCard, _super);
    function SaveCard(props) {
        var _this = _super.call(this, props) || this;
        // Functional Binds.
        _this.saveCardTokenizationConfig =
            (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('SAVED_CARD_CONSENT') || {};
        _this.savedCardAutoConsentInfo =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.saveCardTokenizationConfig, 'autoConsent.newCard') || {};
        _this.toggleSaveCardSuggestion = _this.toggleSaveCardSuggestion.bind(_this);
        _this.renderSaveCardCheckbox = _this.renderSaveCardCheckbox.bind(_this);
        _this.toggleSavedCardConsentHalfCard = _this.toggleSavedCardConsentHalfCard.bind(_this);
        _this.checkBoxComponent = _this.checkBoxComponent.bind(_this);
        _this.renderInfoIcon = _this.renderInfoIcon.bind(_this);
        _this.state = {
            saveCardSuggestion: false,
            saveCardConsentHalfCard: false
        };
        return _this;
    }
    SaveCard.prototype.toggleSaveCardSuggestion = function () {
        this.setState(function (prevState) {
            return { saveCardSuggestion: !prevState.saveCardSuggestion };
        });
    };
    SaveCard.prototype.toggleSavedCardConsentHalfCard = function () {
        triggerEvent('AUTO_CONSENT_INFO_ICON_CLICK', {
            custom: {
                custom: {
                    v1: 'new_card',
                    v2: !this.state.saveCardConsentHalfCard
                }
            }
        });
        this.setState(function (prevState) { return ({
            saveCardConsentHalfCard: !prevState.saveCardConsentHalfCard
        }); });
    };
    SaveCard.prototype.checkBoxComponent = function () {
        var _a = this.props, _b = _a.form, form = _b === void 0 ? {} : _b, setValue = _a.setValue;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null, form.saveCard.value ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_15__.default, { id: "saveCard-icon", "data-value": "".concat(form.saveCard.value), className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.selectedCheckboxIcon, onClick: setValue })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_16__.default, { id: "saveCard-icon", "data-value": "".concat(form.saveCard.value), className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.checkboxIcon, onClick: setValue }))));
    };
    SaveCard.prototype.renderInfoIcon = function (isPhase2Enabled, notEligibleForTokenization) {
        var _this = this;
        if (isPhase2Enabled) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_14__.default, { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savedInfoIcon, onClick: !notEligibleForTokenization
                ? function () { return _this.toggleSavedCardConsentHalfCard(); }
                : function () { return _this.toggleSaveCardSuggestion(); } }));
    };
    SaveCard.prototype.renderSaveCardCheckbox = function () {
        var _a = this.props, _b = _a.form, form = _b === void 0 ? {} : _b, setValue = _a.setValue;
        var _c = this.savedCardAutoConsentInfo, checkBoxText = _c.checkBoxText, checkBoxSubText = _c.checkBoxSubText, notSupportedCard = _c.notSupportedCard;
        var _d = this.saveCardTokenizationConfig.phase2Enabled, phase2Enabled = _d === void 0 ? false : _d;
        var cardNumberLength = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(form, 'cardNumber.value', '').length;
        var notEligibleForTokenization = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(form, 'tokenizationConsent') === true && cardNumberLength > 6;
        var isPhase2Enabled = phase2Enabled && notEligibleForTokenization;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null, cardNumberLength > 6 && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            !isPhase2Enabled && this.checkBoxComponent(),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(isPhase2Enabled ? _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.inEligibleTokenizationText : '', " ").concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.saveCardLabel), id: "saveCard-label", "data-value": "".concat(form.saveCard) }, notEligibleForTokenization
                ? notSupportedCard ||
                    commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_12__.SAVE_CARD_CALLLOUT.inValidForTokenisationText
                : checkBoxText || commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_12__.SAVE_CARD_CALLLOUT.validForTokenisationText),
            this.renderInfoIcon(isPhase2Enabled, notEligibleForTokenization),
            !notEligibleForTokenization && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.eligibleTokenizationText }, checkBoxSubText ||
                commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_12__.SAVE_CARD_CALLLOUT.validForTokenisationCheckoutSubText)),
            !isPhase2Enabled && this.state.saveCardSuggestion && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.saveCardSuggestion }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_12__.SAVE_CARD_CALLLOUT.saveCardSuggestion))))));
    };
    SaveCard.prototype.render = function () {
        var _a = this.props, _b = _a.form, form = _b === void 0 ? {} : _b, setValue = _a.setValue, savedCardInstrumentData = _a.savedCardInstrumentData;
        var saveCardConsentHalfCard = this.state.saveCardConsentHalfCard;
        var saveCardCode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedCardInstrumentData, 'code');
        var cardType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(form, 'cardType', '');
        var SAVEDCARD_LIMIT_REACHED_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_11__.default.SAVEDCARD_LIMIT_REACHED_CODE, SAVING_CARD_NOT_ALLOWED_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_11__.default.SAVING_CARD_NOT_ALLOWED_CODE, SAVE_CARDS_INFO_MAP = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_11__.default.SAVE_CARDS_INFO_MAP;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.saveCardWrapper },
            saveCardCode === SAVEDCARD_LIMIT_REACHED_CODE ||
                saveCardCode === SAVING_CARD_NOT_ALLOWED_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savedLimitText }, SAVE_CARDS_INFO_MAP[saveCardCode] || '')) : (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('AUTO_SAVE_CARD') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "We will save this card for your convenience and faster checkout, you can remove it by visiting 'Saved Cards' in 'Account' section.")) : (this.renderSaveCardCheckbox()),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SaveCardConsent__WEBPACK_IMPORTED_MODULE_17__.default, { toggleShowConsentFn: this.toggleSavedCardConsentHalfCard, showConsent: saveCardConsentHalfCard, showConsentButton: false, cardType: cardType })));
    };
    return SaveCard;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
SaveCard.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
    setValue: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func)
};
/**
 * CVV Info
 */
var CVV = /** @class */ (function (_super) {
    __extends(CVV, _super);
    function CVV(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { showCVVInfo: false };
        ['toggleCVVInfo'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    CVV.prototype.toggleCVVInfo = function () {
        this.setState(function (prevState) { return ({ showCVVInfo: !prevState.showCVVInfo }); });
    };
    CVV.prototype.render = function () {
        var _a = this.props, _b = _a.form, form = _b === void 0 ? {} : _b, setValue = _a.setValue, checkValue = _a.checkValue, onFocus = _a.onFocus, payMode = _a.payMode;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.row, " ").concat(_cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvv) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_7__.default, { id: "cvv", label: "CVV", type: "tel", autoComplete: "off", pattern: "\\d*", autoFocus: false, value: form.cvv.value, maxLength: form.cvv.maxLength, onChange: setValue, onFocus: onFocus, onBlur: checkValue }),
            form.cvv.error && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.errorMessage },
                form.cvv.error,
                " ")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_14__.default, { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvInfoIcon, onClick: this.toggleCVVInfo }),
            this.state.showCVVInfo && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_5__.default, { cancelCallback: this.toggleCVVInfo, className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvInfoModal, cancelIconConfig: { show: true }, enableBackButton: payMode !== 'retry' },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.title }, "What is CVV Number?"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "It\u2019s a 3-digit code on the back of your card"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_6__.default, { name: "wallet-cvv-3-digits", className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvSprite }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.title }, " Have American Express Card?"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "It\u2019s a 4-digit number on the front, just above your credit card number"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_6__.default, { name: "wallet-cvv-4-digits", className: _cardForm_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvSprite })))));
    };
    return CVV;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));



/***/ }),

/***/ "./browser/components/payment/common/Options/Card/CardForm/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Card/CardForm/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CardInputs_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardInputs/index */ "./browser/components/payment/common/Options/Card/CardForm/CardInputs/index.js");
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



var CardForm = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.CardNumber, __assign({}, props)),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.CardName, __assign({}, props)),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.ExpiryMonthYear, __assign({}, props)),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.CVV, __assign({}, props)),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.ExpiryCVVInfo, __assign({}, props)),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardInputs_index__WEBPACK_IMPORTED_MODULE_1__.SaveCard, __assign({}, props)))); };
CardForm.propTypes = {
    form: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    errorInfo: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    setValue: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    checkValue: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardForm);


/***/ }),

/***/ "./browser/components/payment/common/Options/Card/helper/index.js":
/*!************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Card/helper/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getCardType: function (cardNumber, checkLength) {
        cardNumber = String(cardNumber);
        cardNumber = cardNumber.replace(/-|\s*/g, '');
        if (!cardNumber || cardNumber.match(/\D/) || cardNumber.length < 3) {
            return false;
        }
        if (checkLength && cardNumber.length < 13) {
            return false;
        }
        var cardIdentifiers = [
            {
                identifier: ['4'],
                numlength: [13, 14, 15, 16],
                issuer: 'VISA',
                cardNumberGrouping: [4, 4, 4, 4],
                cvcLength: 3
            },
            {
                identifier: ['51', '52', '53', '54', '55'],
                numlength: [16],
                issuer: 'MASTERCARD',
                cardNumberGrouping: [4, 4, 4, 4],
                cvcLength: 3
            },
            {
                identifier: ['34', '37'],
                numlength: [15],
                issuer: 'AMEX',
                cardNumberGrouping: [4, 6, 5],
                cvcLength: 4
            },
            {
                identifier: ['300', '301', '302', '303', '304', '305', '36', '38'],
                numlength: [14],
                issuer: 'DINERS',
                cardNumberGrouping: [4, 6, 4],
                cvcLength: 3
            },
            {
                identifier: [
                    '502260',
                    '504433',
                    '5044339',
                    '504434',
                    '504435',
                    '504437',
                    '504645',
                    '504753',
                    '504775',
                    '504809',
                    '504817',
                    '504834',
                    '504848',
                    '504884',
                    '504973',
                    '504993',
                    '508159',
                    '600206',
                    '603123',
                    '603845',
                    '622018',
                    '508227',
                    '508192',
                    '508125',
                    '508126'
                ],
                numlength: [16, 17, 18, 19],
                issuer: 'MAESTRO',
                cardNumberGrouping: [4, 4, 4, 4],
                cvcLength: 3
            },
            {
                identifierType: 'range',
                identifier: [
                    [508500, 508999],
                    [606985, 607984],
                    [608001, 608500],
                    [652150, 653149]
                ],
                identifierLength: 6,
                numlength: [16],
                issuer: 'RUPAY',
                cardNumberGrouping: [4, 4, 4, 4],
                cvcLength: 3
            }
        ];
        for (var j = 0; j < cardIdentifiers.length; j++) {
            var temp = cardIdentifiers[j];
            if (checkLength && temp.numlength.indexOf(cardNumber.length) === -1) {
                continue;
            }
            if (temp.identifierType && temp.identifierType === 'range') {
                for (var i = 0; i < temp.identifier.length; i++) {
                    if (this.ifNumberInRange(cardNumber, temp.identifier[i], temp.identifierLength)) {
                        return {
                            issuer: temp.issuer,
                            maxLength: Math.max.apply(null, temp.numlength)
                        };
                    }
                }
            }
            else {
                for (var i = 0; i < temp.identifier.length; i++) {
                    if (cardNumber.substr(0, temp.identifier[i].length) ===
                        temp.identifier[i]) {
                        return {
                            issuer: temp.issuer,
                            maxLength: Math.max.apply(null, temp.numlength)
                        };
                    }
                }
            }
        }
        return {
            issuer: 'NONE',
            maxLength: 23
        };
    },
    ifNumberInRange: function (cardNumber, range, idLength) {
        var lowerLimit = range[0];
        var upperLimit = range[1];
        var cardId = +cardNumber.substr(0, idLength);
        return cardId >= lowerLimit && cardId <= upperLimit;
    },
    splitCardNumber: function (cardNumber) {
        cardNumber += '';
        cardNumber = cardNumber
            .replace(/-|\s*/g, '')
            .replace(/(\S{1,4})/g, '$1 ')
            .replace(/\s+$/, '');
        return cardNumber;
    },
    // takes the form field value and returns true on valid card number
    validCardCheck: function (value) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value))
            return false;
        if (value === null || value.length < 13)
            return false;
        // The Luhn Algorithm.
        var nCheck = 0;
        var nDigit = 0;
        var bEven = false;
        value = value.replace(/\D/g, '');
        for (var n = value.length - 1; n >= 0; n--) {
            // character at nth position.
            var cDigit = value.charAt(n);
            // Converting it to a number.
            nDigit = parseInt(cDigit, 10);
            /*
              Now, add all the numbers in the string, but with condition.
              Even: multiply by 2 and if the resultatnt is a 2 digit number
                    Subtract 9 from it.
              Odd: Simply Add the number.
            */
            if (bEven) {
                nDigit *= 2;
                if (nDigit > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return nCheck % 10 === 0;
    }
});


/***/ }),

/***/ "./browser/components/payment/common/Options/Card/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/Options/Card/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _card_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./card.base.css */ "./browser/components/payment/common/Options/Card/card.base.css");
/* harmony import */ var _CardForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardForm */ "./browser/components/payment/common/Options/Card/CardForm/index.js");
/* harmony import */ var _helper_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helper/index */ "./browser/components/payment/common/Options/Card/helper/index.js");
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _OfferBanner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../OfferBanner */ "./browser/components/payment/common/OfferBanner/index.js");
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






// Payment Form Specific Components.








/**
 * Field Rules for the different inputs in the form.
 */
var fieldRules = {
    cardNumber: {
        validation: /^[0-9 ]+$/,
        message: 'Card Number should be numbers.'
    },
    cardName: {
        validation: /^[a-zA-Z][a-zA-Z ]*$/,
        message: 'Invalid Input, Hint: alphabets, ., '
    },
    expiry: {
        validation: /^(0?[1-9]|1[012])\/([0-9]{2})$/,
        message: 'Invalid expiry'
    },
    cvv: {
        validation: /^[0-9]{3,}$/,
        message: 'Invalid cvv number'
    }
};
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        [
            'setValue',
            'checkValue',
            'onFocus',
            'getOptionUI',
            'getModeAttributes',
            'lowSRSuccessCallback',
            'submitCallback',
            'getCardDetails'
        ].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        _this.savedCardConsentInfo = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('SAVED_CARD_CONSENT');
        _this.savedCardAutoConsentInfo =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.savedCardConsentInfo, 'autoConsent.newCard') || {};
        _this.isCardAutoTokenizationEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('PAYMENT_SAVE_CARD_AUTO_CONSENT');
        var saveCardCode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'savedCardInstrumentData.code');
        _this.state = {
            cardDetails: {},
            form: {
                cardNumber: {
                    value: '',
                    error: '',
                    maxLength: 20,
                    hasLowSR: false,
                    disable: false,
                    required: true
                },
                cardName: {
                    value: '',
                    error: '',
                    maxLength: 50,
                    required: true
                },
                expiry: {
                    value: '',
                    error: '',
                    required: true
                },
                cvv: {
                    value: '',
                    error: '',
                    maxLength: 3,
                    required: true
                },
                saveCard: {
                    value: saveCardCode !== commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.SAVEDCARD_LIMIT_REACHED_CODE &&
                        saveCardCode !== commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.SAVING_CARD_NOT_ALLOWED_CODE &&
                        (_this.isCardAutoTokenizationEnabled
                            ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.savedCardAutoConsentInfo, 'autoChecked', true)
                            : true),
                    required: false
                },
                cardType: '',
                tokenizationConsent: ''
            },
            plutusInfo: {
                show: false,
                cardNumber: ''
            }
        };
        _this.props.updateBankDiscount(0);
        return _this;
    }
    Card.prototype.lowSRSuccessCallback = function (res) {
        if (res) {
            var hasLowSR_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'lowSrOption', false);
            var disable_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'disable', false);
            this.setState(function (_a) {
                var form = _a.form;
                var cardNumber = __assign(__assign({}, form.cardNumber), { hasLowSR: hasLowSR_1, disable: disable_1 });
                return {
                    form: __assign(__assign({}, form), { cardNumber: cardNumber })
                };
            });
        }
    };
    Card.prototype.componentWillUnmount = function () {
        var updateStickyButton = this.props.updateStickyButton;
        updateStickyButton && updateStickyButton({ enabled: true });
    };
    Card.prototype.getCardDetails = function (cardDetails, form, value) {
        if (value === void 0) { value = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var modifiedValue, cardDetailsInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modifiedValue = value.replace(/ /g, '');
                        cardDetailsInfo = cardDetails;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(modifiedValue.length >= 6 &&
                            (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(cardDetailsInfo) || !form.cardType))) return [3 /*break*/, 4];
                        if (!lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.savedCardConsentInfo, 'fetchBinDetailsFromApi', false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_11__.default.getCardType(modifiedValue)];
                    case 2:
                        cardDetailsInfo = _a.sent();
                        if (!cardDetailsInfo.cardType) {
                            throw new Error();
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error();
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        cardDetailsInfo = _helper_index__WEBPACK_IMPORTED_MODULE_5__.default.getCardType(modifiedValue);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, cardDetailsInfo];
                }
            });
        });
    };
    Card.prototype.setValue = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var form, cardDetails, cursorPosition, id, value, _a, maxLength, cardType, expiryRequired, resetExpiryError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        form = __assign({}, this.state.form);
                        cardDetails = this.state.cardDetails;
                        cursorPosition = event.target.selectionStart;
                        id = (event.target.id || event.currentTarget.id).split('-')[0];
                        value = event.target.value ||
                            event.target.getAttribute('data-value') ||
                            event.currentTarget.getAttribute('data-value') ||
                            '';
                        _a = id;
                        switch (_a) {
                            case 'cardNumber': return [3 /*break*/, 1];
                            case 'saveCard': return [3 /*break*/, 5];
                            case 'expiry': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(value.match(fieldRules[id].validation) &&
                            ((value.length > 3 && value.length <= 7) || value.length >= 10))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCardDetails(cardDetails, form, value)];
                    case 2:
                        cardDetails = _b.sent();
                        maxLength = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardDetails, 'maxLength', 14) || 16;
                        form[id].maxLength = maxLength > 16 ? maxLength + 4 : maxLength + 3;
                        cardType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardDetails, 'issuer');
                        form.cardType = cardType;
                        form.tokenizationConsent = !lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardDetails, 'eligibleForTokenization', !this.isCardAutoTokenizationEnabled);
                        form[id].value = _helper_index__WEBPACK_IMPORTED_MODULE_5__.default.splitCardNumber(value);
                        expiryRequired = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.EXPIRY_EXEMPTED_CARDS.indexOf(cardType) === -1;
                        resetExpiryError = !expiryRequired;
                        form['expiry'].required = expiryRequired;
                        if (cardType === 'AMEX') {
                            form['cvv'].maxLength = 4;
                        }
                        else {
                            form['cvv'].maxLength = 3;
                        }
                        form['cvv'].required = expiryRequired;
                        if (resetExpiryError) {
                            form['expiry'] = __assign(__assign({}, form['expiry']), { error: '', value: '' });
                            form['cvv'] = __assign(__assign({}, form['cvv']), { error: '', value: '' });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        form[id].value = value;
                        form.cardType = value.match(fieldRules[id].validation)
                            ? form.cardType
                            : '';
                        _b.label = 4;
                    case 4:
                        if (value.length < 7) {
                            cardDetails = {};
                            form.cardType = '';
                        }
                        //reset the lowsr, if user enters new cardNumber
                        if (value.length < 5) {
                            form[id].hasLowSR = false;
                            form[id].disable = false;
                        }
                        return [3 /*break*/, 8];
                    case 5:
                        value = value === 'false';
                        if (this.isCardAutoTokenizationEnabled &&
                            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(form, 'tokenizationConsent') === false) {
                            triggerEvent('AUTO_CONSENT_NEW_CARD_CLICK', {
                                custom: {
                                    custom: {
                                        v1: value
                                    }
                                }
                            });
                        }
                        form[id].value = value;
                        return [3 /*break*/, 8];
                    case 6:
                        if (value.length === 1 && value !== '1' && value !== '0') {
                            value = '0' + value;
                        }
                        if (value.length === 2) {
                            if (form[id].value.length < value.length) {
                                value = value + '/';
                            }
                            else {
                                value = value.slice(0, -1);
                            }
                        }
                        form[id].value = value;
                        return [3 /*break*/, 8];
                    case 7:
                        form[id].value = value;
                        _b.label = 8;
                    case 8:
                        this.setState({ form: form, cardDetails: cardDetails }, function () {
                            if (id === 'cardNumber') {
                                var spaceRemovedValue = value.replace(' ', '');
                                var isForwardFlow = cursorPosition < value.length;
                                if (cursorPosition % 5 !== 0 || isForwardFlow) {
                                    event.target.selectionEnd = cursorPosition;
                                }
                                // TODO:- INTENTIONAL COMMENT CHANGE
                                // spaceRemovedValue.length === 6 &&
                                //   PaymentManager.checkCardSuccessRate(
                                //     spaceRemovedValue,
                                //     this.lowSRSuccessCallback
                                //   );
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Card.prototype.checkValue = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var form, cardDetails, id, value, cardType, cvvMaxLength, date, currentMonth, currentYear, _a, cardMonth, cardYear;
            return __generator(this, function (_b) {
                form = __assign({}, this.state.form);
                cardDetails = this.state.cardDetails;
                id = event.target.id.split('-')[0];
                value = event.target.value || event.target.getAttribute('data-value') || '';
                switch (id) {
                    case 'cardNumber':
                        cardType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardDetails, 'issuer');
                        if (!value) {
                            form[id].error = 'Required';
                        }
                        else if (!value.match(fieldRules[id].validation)) {
                            form[id].error = fieldRules[id].message;
                        }
                        else if (!_helper_index__WEBPACK_IMPORTED_MODULE_5__.default.validCardCheck(value)) {
                            form[id].error = 'Invalid Card. Please enter a valid card number.';
                        }
                        else if ((cardType || '').toLowerCase() === 'maestro') {
                            form[id].error = 'Maestro card not supported';
                        }
                        if (form[id].error) {
                            this.setState({ plutusInfo: { show: false } });
                        }
                        else {
                            this.setState({
                                plutusInfo: { show: true, cardNumber: value.replace(/ /g, '') }
                            });
                        }
                        break;
                    case 'cvv':
                        cvvMaxLength = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(form, 'cvv.maxLength') || 3;
                        if (!value && form[id].required) {
                            form[id].error = 'Required';
                        }
                        else if (value && !value.match(fieldRules[id].validation)) {
                            form[id].error = fieldRules[id].message;
                        }
                        else if (value.length > cvvMaxLength) {
                            form[id].error = 'Invalid cvv';
                        }
                        break;
                    case 'expiry':
                        date = new Date();
                        currentMonth = date.getMonth();
                        currentYear = date
                            .getFullYear()
                            .toString()
                            .slice(-2);
                        _a = value.split('/'), cardMonth = _a[0], cardYear = _a[1];
                        if (!value && form[id].required) {
                            form[id].error = 'Required';
                        }
                        else if (value && !value.match(fieldRules[id].validation)) {
                            form[id].error = fieldRules[id].message;
                        }
                        else if (currentYear > cardYear ||
                            (currentYear === cardYear && currentMonth >= cardMonth)) {
                            form[id].error = 'Invalid Expiry';
                        }
                        break;
                    default:
                        if (!value && form[id].required) {
                            form[id].error = 'Required';
                        }
                        else if (value && !value.match(fieldRules[id].validation)) {
                            form[id].error = fieldRules[id].message;
                        }
                }
                if (form[id].error) {
                    this.setState({
                        form: form
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Card.prototype.onFocus = function (event) {
        var form = this.state.form;
        var id = event.target.id.split('-')[0];
        if (form[id].error) {
            form[id].error = '';
            this.setState({
                form: form
            });
        }
    };
    Card.prototype.validateForm = function () {
        var _a = this.state.form, form = _a === void 0 ? {} : _a;
        for (var key in form) {
            if (form[key].error ||
                (form[key].required && !form[key].value) ||
                (form[key].required &&
                    fieldRules[key] &&
                    !form[key].value.match(fieldRules[key].validation))) {
                return false;
            }
            if (key === 'cardNumber' && !_helper_index__WEBPACK_IMPORTED_MODULE_5__.default.validCardCheck(form[key].value)) {
                return false;
            }
        }
        return true;
    };
    Card.prototype.getModeAttributes = function () {
        var _a = this.state.form, form = _a === void 0 ? {} : _a;
        var bankDiscount = this.props.bankDiscount;
        var _b = form.expiry.value.split('/'), cardMonth = _b[0], cardYear = _b[1];
        var consent = {};
        var eligibleForTokenization = false;
        if (this.isCardAutoTokenizationEnabled &&
            !form.tokenizationConsent &&
            form.saveCard.value) {
            consent['tokenizationConsent'] = 'true';
            eligibleForTokenization = true;
        }
        return __assign({ cardNumber: form.cardNumber.value.replace(/ /g, ''), billName: form.cardName.value, cardMonth: cardMonth, cardYear: cardYear, cvvCode: form.cvv.value, otherCards: false, saveCard: !eligibleForTokenization ? '' : form.saveCard.value ? 'on' : '', useSavedCard: false, user: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_12__.getUidx)(), paymenInstrument: 'creditcard', bankCashbackEligible: "".concat(bankDiscount !== 0), bankCashbackAmount: bankDiscount }, consent);
    };
    Card.prototype.getOptionUI = function () {
        var _a = this, props = _a.props, savedCardAutoConsentInfo = _a.savedCardAutoConsentInfo;
        var showEcomMessage = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedCardAutoConsentInfo, 'showEcomMessage') || true;
        var ecomText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedCardAutoConsentInfo, 'ecomText') ||
            'Please ensure your card can be used for online transactions';
        var ecomKnowMoreText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedCardAutoConsentInfo, 'ecomKnowMoreText') || 'Know More';
        var ecomKnowMoreLink = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedCardAutoConsentInfo, 'ecomKnowMoreLink') || '/faqs';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.mode },
            props.deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.heading }, " CREDIT/ DEBIT CARD ")),
            (props === null || props === void 0 ? void 0 : props.offer) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_OfferBanner__WEBPACK_IMPORTED_MODULE_13__.default, { selected: true, offerData: props.offer, deviceMode: props.deviceMode, name: "card" })),
            showEcomMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ecomContainer, " ").concat(props.deviceMode !== 'mobile' ? _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopContainer : '') },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ecomText },
                    ecomText,
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { href: ecomKnowMoreLink, onClick: function () { return triggerEvent('ECOM_KNOW_MORE_CLICK'); }, className: _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ecomKnowMore }, " ".concat(ecomKnowMoreText))))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CardForm__WEBPACK_IMPORTED_MODULE_4__.default, __assign({ form: this.state.form, plutusInfo: this.state.plutusInfo, setValue: this.setValue, checkValue: this.checkValue, onFocus: this.onFocus }, props))));
    };
    Card.prototype.submitCallback = function (done) {
        if (!this.validateForm()) {
            SHELL.alert('info', {
                message: 'Please fill all valid card details to place order.',
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
            return;
        }
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.CARD_TYPE,
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.CARD_TYPE,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
        done();
    };
    Card.prototype.render = function () {
        var _a = this.state.form, cardType = _a.cardType, tokenizationConsent = _a.tokenizationConsent, saveCard = _a.saveCard;
        var _b = this, props = _b.props, isCardAutoTokenizationEnabled = _b.isCardAutoTokenizationEnabled;
        var instrumentData = props.instrumentData, payMode = props.payMode, retrySessionEnabled = props.retrySessionEnabled;
        var updateStickyButton = this.props.updateStickyButton;
        var disable = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'state.form.cardNumber.disable');
        var paymentUrl = instrumentData.credit.paymentInstrumentDetails.paymentUrl;
        var codes = [];
        for (var key in instrumentData) {
            if (instrumentData.hasOwnProperty(key)) {
                codes.push(instrumentData[key].code);
            }
        }
        var ccdcAvailable = codes.every(function (code) { return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.INSTRUMENT_ELIGIBLE_CODE; });
        updateStickyButton && updateStickyButton({ enabled: !disable });
        disable = disable || (payMode === 'retry' && !retrySessionEnabled);
        return ccdcAvailable ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_6__.default, __assign({}, props, { cardType: cardType, allowTokenization: !tokenizationConsent &&
                (isCardAutoTokenizationEnabled ? !saveCard.value : true), paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.CREDIT_CARD, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.CARD_TYPE, actionData: { className: _card_base_css__WEBPACK_IMPORTED_MODULE_3__.default.actionButton, disable: disable }, optionUI: this.getOptionUI(), submitCallback: this.submitCallback, modeAttributes: this.getModeAttributes(), paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.CARD_TYPE }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_7__.default, { option: "Credit/Debit Card", code: codes[0] })));
    };
    return Card;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Card.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ "./browser/components/payment/common/Options/Cod/CodCardUI.js":
/*!********************************************************************!*\
  !*** ./browser/components/payment/common/Options/Cod/CodCardUI.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodCardUIContent": () => (/* binding */ CodCardUIContent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_Captcha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Captcha */ "./browser/components/common/Captcha/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./codCardUI.base.css */ "./browser/components/payment/common/Options/Cod/codCardUI.base.css");
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








var ICON_CONFIG = {
    type: 'icon',
    position: 'right',
    name: 'COD',
    iconSize: { width: 20, height: 14 },
    className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.icon
};
var CodCardUIContent = function (_a) {
    var errorMessage = _a.errorMessage, captchaEnabled = _a.captchaEnabled, _b = _a.className, className = _b === void 0 ? '' : _b, setCaptchaRef = _a.setCaptchaRef, setLoader = _a.setLoader, setCaptchaDetails = _a.setCaptchaDetails, errorAttribute = _a.errorAttribute;
    var infoMessage = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('COD_INFO_MESSAGE');
    var codHelpText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('COD_HELP_TEXT'), 'helpText') ||
        lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_5__.default, 'COD_HELP_TEXT');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className },
        infoMessage ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.infoMessage }, infoMessage)) : null,
        errorMessage ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.errorMessage }, errorMessage)) : null,
        captchaEnabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Captcha__WEBPACK_IMPORTED_MODULE_2__.default, { ref: setCaptchaRef, setLoader: setLoader, setCaptchaDetails: setCaptchaDetails, errorAttribute: errorAttribute })) : null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.helpText },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.helpText }, " ".concat(codHelpText, " ")))));
};
var getDisplayText = function (cartData) {
    var cardNameConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('PAYMENT_RECOMMENDED_CONFIG');
    var shippingMethod = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'shippingData.method', 'NORMAL');
    var cardOnDelivery = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, "serviceability.".concat(shippingMethod === 'NORMAL' ? 'standardShippingInfo' : 'valueShippingInfo', ".flags.cardOnDelivery.value"), false);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cardNameConfig, "".concat(cardOnDelivery ? 'cardCod' : 'cod', ".name"), 'Pay on delivery (Cash/UPI)');
    return text;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var rank = _a.rank, optionData = _a.optionData, cartData = _a.cartData, deviceMode = _a.deviceMode, selectedId = _a.selectedId, classNames = _a.classNames, idPrefix = _a.idPrefix, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick, contentProps = __rest(_a, ["rank", "optionData", "cartData", "deviceMode", "selectedId", "classNames", "idPrefix", "selectInstrument", "onActionButtonClick"]);
    var selected = selectedId === 'cod';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__.default, { key: "".concat(idPrefix, "cod"), id: "".concat(idPrefix, "cod"), selected: selected, iconConfig: ICON_CONFIG, displayName: getDisplayText(cartData), classNames: classNames, onClickParams: {
            twoFAEnabled: contentProps.twoFAEnabled,
            instrumentType: optionData.instrumentType,
            paymentUrl: optionData.paymentUrl,
            rank: rank
        }, onClick: selectInstrument },
        selected ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CodCardUIContent, __assign({}, contentProps, { className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.content }))) : null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_4__.default, { text: "PLACE ORDER", onClick: onActionButtonClick, visible: selected, className: _codCardUI_base_css__WEBPACK_IMPORTED_MODULE_7__.default.actionButton, deviceMode: deviceMode })));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/Cod/CodErrorBlock/index.js":
/*!******************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Cod/CodErrorBlock/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _codErrorBlock_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./codErrorBlock.base.css */ "./browser/components/payment/common/Options/Cod/CodErrorBlock/codErrorBlock.base.css");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var commonComp_ReturnAbuserV2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/ReturnAbuserV2 */ "./browser/components/common/ReturnAbuserV2/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
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






var KnowMore = function (_a) {
    var onClick = _a.onClick;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _codErrorBlock_base_css__WEBPACK_IMPORTED_MODULE_1__.default.knowMore, onClick: onClick }, "Know more"));
};
var CodErrorBlock = /** @class */ (function (_super) {
    __extends(CodErrorBlock, _super);
    function CodErrorBlock() {
        var _this = _super.call(this) || this;
        _this.state = { showReturnAbuserModal: false };
        _this.toggleReturnAbuserModal = _this.toggleReturnAbuserModal.bind(_this);
        return _this;
    }
    CodErrorBlock.prototype.toggleReturnAbuserModal = function () {
        this.setState({ showReturnAbuserModal: !this.state.showReturnAbuserModal });
    };
    CodErrorBlock.prototype.render = function () {
        var _a = this.props, code = _a.code, paymentInstrumentDetails = _a.paymentInstrumentDetails, updateStickyButton = _a.updateStickyButton;
        if (code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.RETURN_ABUSER_CODE) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_2__.default, { option: "Pay on delivery", code: code, updateStickyButton: updateStickyButton },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(KnowMore, { onClick: this.toggleReturnAbuserModal })),
                this.state.showReturnAbuserModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ReturnAbuserV2__WEBPACK_IMPORTED_MODULE_3__.ReturnAbuserModal, { type: "noCod", cancelCallback: this.toggleReturnAbuserModal }))));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_2__.default, { option: "Pay on delivery", code: code, paymentInstrumentDetails: paymentInstrumentDetails, updateStickyButton: updateStickyButton }));
        }
    };
    return CodErrorBlock;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
CodErrorBlock.propTypes = {
    code: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number.isRequired),
    paymentInstrumentDetails: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodErrorBlock);


/***/ }),

/***/ "./browser/components/payment/common/Options/Cod/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/Options/Cod/index.js ***!
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _CodErrorBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CodErrorBlock */ "./browser/components/payment/common/Options/Cod/CodErrorBlock/index.js");
/* harmony import */ var _CodCardUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CodCardUI */ "./browser/components/payment/common/Options/Cod/CodCardUI.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _cod_base_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cod.base.css */ "./browser/components/payment/common/Options/Cod/cod.base.css");
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












var boundFuncs = [
    'submitCallback',
    'setCaptchaRef',
    'setCaptchaDetails',
    'getModeAttributes'
];
var Cod = /** @class */ (function (_super) {
    __extends(Cod, _super);
    function Cod(props) {
        var _this = _super.call(this, props) || this;
        var twoFAEnabled = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__.isTwoFAEnabled)(props);
        _this.state = {
            errorMessage: '',
            twoFAEnabled: twoFAEnabled,
            captchaEnabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('COD_CAPTCHA_ENABLED') && !twoFAEnabled,
            captchaDetails: {
                id: null,
                code: null
            }
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.props.updateBankDiscount(0);
        return _this;
    }
    Cod.prototype.componentDidMount = function () {
        this.props.updateStickyButton({ text: 'PLACE ORDER' });
    };
    Cod.prototype.componentWillUnmount = function () {
        this.props.updateStickyButton({ text: 'PAY NOW' });
    };
    Cod.getDerivedStateFromProps = function (props) {
        var twoFAEnabled = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__.isTwoFAEnabled)(props);
        return {
            twoFAEnabled: twoFAEnabled,
            captchaEnabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('COD_CAPTCHA_ENABLED') && !twoFAEnabled
        };
    };
    Cod.prototype.triggerSubmitEvent = function () {
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.COD,
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.COD,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
    };
    Cod.prototype.submitCallback = function (done) {
        var _this = this;
        if (this.state.captchaEnabled) {
            this.captchaComp.submitWithCaptcha(function () {
                _this.triggerSubmitEvent();
                done();
            });
        }
        else {
            this.triggerSubmitEvent();
            done();
        }
    };
    Cod.prototype.setCaptchaRef = function (node) {
        this.captchaComp = node;
    };
    Cod.prototype.setCaptchaDetails = function (data, done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        this.setState({
            captchaDetails: data
        }, function () {
            _this.props.setLoader(false);
            done();
        });
    };
    Cod.prototype.getOptionUI = function () {
        var _a = this, _b = _a.props, setLoader = _b.setLoader, deviceMode = _b.deviceMode, errorAttribute = _b.errorAttribute, _c = _a.state, errorMessage = _c.errorMessage, captchaEnabled = _c.captchaEnabled, setCaptchaRef = _a.setCaptchaRef;
        var codSectionHeading = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('COD_HELP_TEXT'), 'heading') ||
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_8__.default, 'COD_SECTION_HEADING');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: captchaEnabled ? _cod_base_css__WEBPACK_IMPORTED_MODULE_10__.default.heading : _cod_base_css__WEBPACK_IMPORTED_MODULE_10__.default.alternateHeading }, codSectionHeading)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CodCardUI__WEBPACK_IMPORTED_MODULE_4__.CodCardUIContent, { errorAttribute: errorAttribute, errorMessage: errorMessage, captchaEnabled: captchaEnabled, setCaptchaRef: setCaptchaRef, setLoader: setLoader, setCaptchaDetails: this.setCaptchaDetails })));
    };
    Cod.prototype.getModeAttributes = function () {
        var _a = this.state.captchaDetails, captchaDetails = _a === void 0 ? {} : _a;
        return {
            captchaId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(captchaDetails, 'id', ''),
            codCaptcha: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(captchaDetails, 'code', '')
        };
    };
    Cod.prototype.render = function () {
        var _a = this.props, _b = _a.instrumentData, code = _b.code, paymentInstrumentDetails = _b.paymentInstrumentDetails, paymentUrl = _b.paymentInstrumentDetails.paymentUrl, payMode = _a.payMode, retrySessionEnabled = _a.retrySessionEnabled, updateStickyButton = _a.updateStickyButton;
        return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_ELIGIBLE_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, this.props, { paymentUrl: paymentUrl, optionUI: this.getOptionUI(), paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.COD, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.COD, submitCallback: this.submitCallback, actionData: {
                name: 'PLACE ORDER',
                className: _cod_base_css__WEBPACK_IMPORTED_MODULE_10__.default.actionButton,
                disable: payMode === 'retry' && !retrySessionEnabled
            }, paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.COD, modeAttributes: this.getModeAttributes() }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CodErrorBlock__WEBPACK_IMPORTED_MODULE_3__.default, { code: code, paymentInstrumentDetails: paymentInstrumentDetails, updateStickyButton: updateStickyButton }));
    };
    return Cod;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Cod.defaultProps = {
    updateStickyButton: function () { }
};
Cod.propTypes = {
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),
    updateStickyButton: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func),
    handlePaymentAction: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cod);


/***/ }),

/***/ "./browser/components/payment/common/Options/EMI/EMILimitMessage/index.js":
/*!********************************************************************************!*\
  !*** ./browser/components/payment/common/Options/EMI/EMILimitMessage/index.js ***!
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
/* harmony import */ var _emilimitmessage_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emilimitmessage.base.css */ "./browser/components/payment/common/Options/EMI/EMILimitMessage/emilimitmessage.base.css");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/Sanitize */ "./utils/Sanitize/index.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4__);





var EMILimitMessage = function (props) {
    var emiLimit = props.emiLimit, code = props.code;
    var emiEligibilityCodeConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('EMI_ELIGIBILITY_CODE')[code] || {};
    var message = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(emiEligibilityCodeConfig, 'message', '').replace('{amount}', "&#8377;" + emiLimit);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _emilimitmessage_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container, dangerouslySetInnerHTML: { __html: commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_4___default()(message) } }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EMILimitMessage);


/***/ }),

/***/ "./browser/components/payment/common/Options/EMI/EmiCardUI.js":
/*!********************************************************************!*\
  !*** ./browser/components/payment/common/Options/EMI/EmiCardUI.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var _EMILimitMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EMILimitMessage */ "./browser/components/payment/common/Options/EMI/EMILimitMessage/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./emiCardUI.base.css */ "./browser/components/payment/common/Options/EMI/emiCardUI.base.css");
/* harmony import */ var _OfferBanner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../OfferBanner */ "./browser/components/payment/common/OfferBanner/index.js");











var Display = function (_a) {
    var name = _a.name, subText = _a.subText;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.displayMain }, name),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.displaySub }, subText)));
};
var DisplayOffers = function (_a) {
    var optionData = _a.optionData;
    var numberOfOffers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(optionData, 'offerDetails', '').length || 0;
    var offerString = numberOfOffers > 0 ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__.getOfferString)(numberOfOffers) : '';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.cardText },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.displayMain }, optionData.name),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.inlineOffer }, offerString)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var context = _a.context, rank = _a.rank, optionData = _a.optionData, deviceMode = _a.deviceMode, selectedId = _a.selectedId, idPrefix = _a.idPrefix, classNames = _a.classNames, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick;
    var iconConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('EMI_CONFIG').iconDisplayEMI;
    var hasLowSR = optionData.lowSuccessRate;
    var name = optionData.name.toLowerCase();
    name = name.replace(/\s/g, ''); //remove spaces
    var selected = selectedId === "".concat(optionData.id);
    var iconName = iconConfig.indexOf(name) !== -1 ? name : 'creditcardemi';
    var emiLimit = optionData.emiLimit, code = optionData.code;
    var isEMIEligible = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_7__.getEmiEligibility)(code);
    var disabled = optionData.disable;
    var showEMILimitMessage = !isEMIEligible && !disabled;
    var offerData = optionData.offerDetails || '';
    var renderedCarouselItems = offerData
        ? offerData.map(function (data) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: data.message }, data.message);
        })
        : null;
    if (selected && (disabled || !isEMIEligible)) {
        selectInstrument("emi-");
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__.default, { key: "".concat(idPrefix).concat(optionData.id), id: "".concat(idPrefix).concat(optionData.id), selected: selected && isEMIEligible, iconName: "wallet-".concat(iconName), iconConfig: { position: context === 'reco' ? 'right' : 'left' }, displayName: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayOffers, { optionData: optionData }), offerData: offerData, classNames: classNames, onClickParams: {
            name: optionData.name,
            rank: rank,
            instrumentType: optionData.instrumentType,
            paymentUrl: optionData.paymentUrl
        }, onClick: selectInstrument, disabled: disabled || !isEMIEligible },
        showEMILimitMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_EMILimitMessage__WEBPACK_IMPORTED_MODULE_5__.default, { emiLimit: emiLimit, code: code })),
        selected && renderedCarouselItems && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_OfferBanner__WEBPACK_IMPORTED_MODULE_9__.default, { selected: selected, offerData: offerData, deviceMode: deviceMode, name: optionData.name })),
        !showEMILimitMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_4__.default, { instrumentType: optionData.instrumentType, instrumentName: optionData.name, className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.lowSRMessage, show: (selected && hasLowSR) || disabled, disable: disabled })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_2__.default, { text: "PAY NOW", onClick: onActionButtonClick, visible: selected && isEMIEligible, className: _emiCardUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.actionButton, deviceMode: deviceMode })));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/EMI/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/Options/EMI/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeName": () => (/* binding */ sanitizeName),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var _EmiCardUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EmiCardUI */ "./browser/components/payment/common/Options/EMI/EmiCardUI.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var _emi_base_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emi.base.css */ "./browser/components/payment/common/Options/EMI/emi.base.css");
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











var sanitizeName = function (name) {
    /*
     convert to lowercase and remove spaces
    */
    return name.toLowerCase().replace(/\s/g, '');
};
var EMI = /** @class */ (function (_super) {
    __extends(EMI, _super);
    function EMI(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedEMIId: ''
        };
        [
            'selectEMI',
            'setActionButtonRef',
            'onActionButtonClick',
            'getValidity',
            'submitCallback'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.emiList = _this.sortEMI();
        var _a = _this.props, offer = _a.offer, instrumentData = _a.instrumentData;
        _this.props.updateBankDiscount(0);
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('INLINE_OFFER') &&
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__.addOffersToInstrumentDetails)(offer, instrumentData);
        return _this;
    }
    EMI.prototype.componentDidUpdate = function (prevProps, prevState) {
        var prevInstrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(prevProps, 'instrumentData') || {};
        var currentInstrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData');
        if (prevInstrumentData !== currentInstrumentData) {
            this.emiList = this.sortEMI();
        }
    };
    EMI.prototype.sortEMI = function () {
        var supportedEMI = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('EMI_CONFIG').supportedEMI;
        var paymentPersonalizationConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
        var allEMI = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];
        if (((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT3') ||
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT4')) &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')) {
            return allEMI.filter(function (emi) { return supportedEMI.indexOf(sanitizeName(emi.name)) !== -1; });
        }
        else {
            return supportedEMI.reduce(function (acc, emiName) {
                var emi = allEMI.find(function (emiObj) {
                    var name = sanitizeName(emiObj.name);
                    return name === emiName;
                });
                emi && acc.push(emi);
                return acc;
            }, []);
        }
    };
    EMI.prototype.getModeAttributes = function () {
        return {
            paymentProviderId: this.state.selectedEMIId || ''
        };
    };
    EMI.prototype.getEMIDetails = function (id) {
        return this.emiList.find(function (emi) { return "".concat(emi.id) === id; });
    };
    EMI.prototype.selectEMI = function (value) {
        var id = value.slice(4);
        this.setState({
            selectedEMIId: id
        });
        var app = this.getEMIDetails(id);
        (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__.inlineOfferWidgetLoadEvent)('emi', app.name, app.offerDetails ? true : false);
    };
    EMI.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    EMI.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    EMI.prototype.getOptionUI = function () {
        var _this = this;
        var _a = this, _b = _a.props, deviceMode = _b.deviceMode, _c = _b.instrumentData, _d = _c === void 0 ? {} : _c, _e = _d.type, type = _e === void 0 ? '' : _e, paymentUrl = _d.paymentInstrumentDetails.paymentUrl, onActionButtonClick = _a.onActionButtonClick;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _emi_base_css__WEBPACK_IMPORTED_MODULE_9__.default.emiContainer },
            deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _emi_base_css__WEBPACK_IMPORTED_MODULE_9__.default.heading }, "Select EMI Option")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, this.emiList.map(function (option) {
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_EmiCardUI__WEBPACK_IMPORTED_MODULE_4__.default, { optionData: __assign(__assign({}, option), { instrumentType: type, paymentUrl: paymentUrl }), deviceMode: deviceMode, selectedId: _this.state.selectedEMIId, idPrefix: 'emi-', selectInstrument: _this.selectEMI, onActionButtonClick: onActionButtonClick }));
            }))));
    };
    EMI.prototype.getValidity = function () {
        var validity = { valid: true, message: '', toast: false };
        if (!this.state.selectedEMIId) {
            validity.valid = false;
            validity.message = 'Select a payment option to place order.';
            validity.toast = true;
        }
        return validity;
    };
    EMI.prototype.submitCallback = function (done) {
        var validity = this.getValidity();
        if (validity.valid) {
            var name_1 = (this.getEMIDetails(this.state.selectedEMIId) || {}).name;
            triggerEvent('PAYMENT_OPTION_SUBMIT', {
                custom: {
                    custom: {
                        v1: "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI_TYPE, ", ").concat(name_1),
                        v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI_TYPE,
                        v3: this.props.rank,
                        v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                    },
                    widget_items: {
                        data_set: {
                            entity_name: 'payment_option',
                            entity_id: 'payment_option'
                        }
                    }
                }
            });
            done();
        }
        else {
            if (validity.toast) {
                SHELL.alert('info', {
                    message: validity.message,
                    styleOverrides: {
                        notifyMainDiv: "bottom: 82px;"
                    }
                });
            }
            else {
                this.setState({
                    error: validity.message
                });
            }
            this.props.setLoader(false);
        }
    };
    EMI.prototype.render = function () {
        var props = this.props;
        var _a = this.props, _b = _a.instrumentData, code = _b.code, paymentUrl = _b.paymentInstrumentDetails.paymentUrl, payMode = _a.payMode, retrySessionEnabled = _a.retrySessionEnabled;
        return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.INSTRUMENT_ELIGIBLE_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, props, { paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI_PM, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI_PM_NAME, formAttributes: { noValidate: true }, optionUI: this.getOptionUI(), modeAttributes: this.getModeAttributes(), setActionButtonRef: this.setActionButtonRef, actionData: {
                hide: true,
                disable: payMode === 'retry' && !retrySessionEnabled
            }, submitCallback: this.submitCallback, paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_5__.default.EMI }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_3__.default, { option: "EMI", code: code }));
    };
    return EMI;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
EMI.propTypes = {
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string),
    updateStickyButton: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func)
};
EMI.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EMI);


/***/ }),

/***/ "./browser/components/payment/common/Options/GiftCard/GiftCardModal/index.js":
/*!***********************************************************************************!*\
  !*** ./browser/components/payment/common/Options/GiftCard/GiftCardModal/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_InputV2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/InputV2 */ "./browser/components/common/InputV2/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./giftCardModal.base.css */ "./browser/components/payment/common/Options/GiftCard/GiftCardModal/giftCardModal.base.css");
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










// Style Imports.

var validationRules = {
    gcNumber: {
        rule: /^\d{16}$/,
        message: 'Gift card number should be a 16 digits long number.',
        invalidGCNumber: 'Invalid Gift card number. Please enter valid Gift card number'
    },
    gcPin: {
        rule: /^\d{6}$/,
        message: 'Gift card pin should be a 6 digit long number.'
    }
};
var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            gcNumber: '',
            gcPin: '',
            error: {
                gcNumber: '',
                gcPin: ''
            }
        };
        _this.addToMyntraCredit = _this.addToMyntraCredit.bind(_this);
        _this.onInputChange = _this.onInputChange.bind(_this);
        return _this;
    }
    GiftCard.prototype.validate = function () {
        var _a = this.state, gcNumber = _a.gcNumber, gcPin = _a.gcPin;
        var prefix = _config__WEBPACK_IMPORTED_MODULE_8___default()('giftcard').prefix;
        var gcNumberValid = validationRules.gcNumber.rule.test(gcNumber);
        var invalidGCNumber = !gcNumber.startsWith(prefix);
        var gcPinValid = validationRules.gcPin.rule.test(gcPin);
        if (!gcNumberValid || !gcPinValid || invalidGCNumber) {
            this.setState({
                error: {
                    gcNumber: invalidGCNumber
                        ? validationRules.gcNumber.invalidGCNumber
                        : !gcNumberValid
                            ? validationRules.gcNumber.message
                            : '',
                    gcPin: !gcPinValid ? validationRules.gcPin.message : ''
                }
            });
            return false;
        }
        else {
            this.setState({
                error: {
                    gcNumber: '',
                    gcPin: ''
                }
            });
            return true;
        }
    };
    GiftCard.prototype.addToMyntraCredit = function () {
        var _this = this;
        var _a = this, _b = _a.state, gcNumber = _b.gcNumber, gcPin = _b.gcPin, _c = _a.props, handlePaymentAction = _c.handlePaymentAction, refreshPageData = _c.refreshPageData;
        if (this.validate()) {
            handlePaymentAction('addGiftCard', { giftCardNumber: gcNumber, pin: gcPin }, {
                keepPreviousState: true
            }, function (res) {
                _this.props.cancelCallback();
                var balance = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'amount.balance');
                triggerEvent('GIFTCARD_SUCCESS', { gaLabel: balance });
                SHELL.alert('info', {
                    message: "<div class=".concat(_giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.notification, ">Successfully added <span class=").concat(_giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.message, ">").concat(balance, " Myntra Credit.</span></div>"),
                    styleOverrides: {
                        notifyMainDiv: "bottom: 82px;"
                    }
                });
                refreshPageData({ addedGiftcard: true });
            }, function (err) {
                triggerEvent('GIFTCARD_FAILURE', {
                    gaLabel: err.message || 'Unable to add giftcard'
                });
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.errorNotification)(err);
            });
        }
    };
    GiftCard.prototype.onInputChange = function (e) {
        var _a;
        this.setState((_a = {},
            _a[e.currentTarget.id] = e.currentTarget.value,
            _a));
    };
    GiftCard.prototype.render = function () {
        var _a = this, _b = _a.state, gcPin = _b.gcPin, gcNumber = _b.gcNumber, error = _b.error, onInputChange = _a.onInputChange, addToMyntraCredit = _a.addToMyntraCredit, _c = _a.props, _d = _c.instrumentData, code = _d.code, paymentInstrumentDetails = _d.paymentInstrumentDetails, payMode = _c.payMode, updateStickyButton = _c.updateStickyButton, cancelCallback = _c.cancelCallback;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__.default, { className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.modal, cancelIconConfig: { show: true }, cancelCallback: cancelCallback, enableBackButton: payMode !== 'retry' },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.heading }, "Apply Gift Card"),
            commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_ELIGIBLE_CODE === code ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.note }, "Gift card value will be added to your Myntra Credit."),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_2__.default, { id: "gcNumber", label: "16 Digits Gift Card Number", value: gcNumber, maxLength: "16", type: "tel", errorMessage: error.gcNumber, onChange: onInputChange, className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.input }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputV2__WEBPACK_IMPORTED_MODULE_2__.default, { id: "gcPin", label: "6 Digits Gift Card Pin", value: gcPin, maxLength: "6", type: "tel", pattern: "\\d*", errorMessage: error.gcPin, onChange: onInputChange, className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.input }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_3__.default, { className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.addButton, onClick: addToMyntraCredit, disabled: !gcNumber || !gcPin }, "Add to Myntra Credit"))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_5__.default, { option: "Giftcard", code: code, className: _giftCardModal_base_css__WEBPACK_IMPORTED_MODULE_9__.default.errorBlock, paymentInstrumentDetails: paymentInstrumentDetails, updateStickyButton: updateStickyButton }))));
    };
    return GiftCard;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
GiftCard.propTypes = {
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string),
    instrumentData: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object),
    handlePaymentAction: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
    refreshPageData: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
    updateStickyButton: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func)
};
GiftCard.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftCard);


/***/ }),

/***/ "./browser/components/payment/common/Options/GiftCard/index.js":
/*!*********************************************************************!*\
  !*** ./browser/components/payment/common/Options/GiftCard/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _giftcard_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./giftcard.base.css */ "./browser/components/payment/common/Options/GiftCard/giftcard.base.css");
/* harmony import */ var _GiftCardModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GiftCardModal */ "./browser/components/payment/common/Options/GiftCard/GiftCardModal/index.js");
/* harmony import */ var iconComp_GiftWrap_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/GiftWrap.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/GiftWrap.jsx");
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




var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard() {
        var _this = _super.call(this) || this;
        _this.state = { showModal: false };
        ['toggleModal'].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    GiftCard.prototype.toggleModal = function () {
        this.setState(function (prevState) { return ({ showModal: !prevState.showModal }); });
    };
    GiftCard.prototype.render = function () {
        var _a = this.props, mode = _a.mode, className = _a.className;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_giftcard_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container, " ").concat(className) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_GiftWrap_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { className: _giftcard_base_css__WEBPACK_IMPORTED_MODULE_1__.default.giftIcon }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _giftcard_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "Have a Gift Card?"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _giftcard_base_css__WEBPACK_IMPORTED_MODULE_1__.default.apply, onClick: this.toggleModal }, mode === 'mobile' ? 'APPLY' : 'APPLY GIFT CARD'),
            this.state.showModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_GiftCardModal__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, this.props, { cancelCallback: this.toggleModal })))));
    };
    return GiftCard;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftCard);


/***/ }),

/***/ "./browser/components/payment/common/Options/NetBanking/NetBankingCardUI.js":
/*!**********************************************************************************!*\
  !*** ./browser/components/payment/common/Options/NetBanking/NetBankingCardUI.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./netbankingCardUI.base.css */ "./browser/components/payment/common/Options/NetBanking/netbankingCardUI.base.css");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _OfferBanner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../OfferBanner */ "./browser/components/payment/common/OfferBanner/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");









var Display = function (_a) {
    var name = _a.name, subText = _a.subText;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.displayMain }, name),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.displaySub }, subText)));
};
var DisplayOffers = function (_a) {
    var optionData = _a.optionData, subText = _a.subText;
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_6___default()(optionData, 'offerDetails', '');
    var numberOfOffers = offer.length || 0;
    var offerString = numberOfOffers > 0 ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__.getOfferString)(numberOfOffers) : '';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.cardText },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.displayMain }, optionData.name),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.inlineOffer }, offerString)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.displaySub }, subText)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var context = _a.context, rank = _a.rank, optionData = _a.optionData, selectedId = _a.selectedId, deviceMode = _a.deviceMode, idPrefix = _a.idPrefix, classNames = _a.classNames, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick;
    var disabled = optionData.disable;
    var selected = selectedId === "".concat(optionData.id);
    var hasLowSR = optionData.lowSuccessRate;
    var display = context === 'reco' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayOffers, { optionData: optionData, subText: "Netbanking" })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayOffers, { optionData: optionData, subText: "" }));
    var offerData = optionData.offerDetails || '';
    var renderedCarouselItems = offerData
        ? offerData.map(function (data) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: data.message }, data.message);
        })
        : null;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_2__.default, { key: "".concat(idPrefix).concat(optionData.id), id: "".concat(idPrefix).concat(optionData.id), selected: selected, iconName: "logo-".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.BANK_MAP[optionData.name.toLowerCase()] || 'bank'), offerData: offerData, iconConfig: { position: context === 'reco' ? 'right' : 'left' }, displayName: display, classNames: classNames, onClickParams: {
            name: optionData.name,
            instrumentType: optionData.instrumentType,
            paymentUrl: optionData.paymentUrl,
            rank: rank
        }, onClick: selectInstrument, disabled: disabled },
        selected && renderedCarouselItems && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_OfferBanner__WEBPACK_IMPORTED_MODULE_7__.default, { selected: selected, offerData: offerData, deviceMode: deviceMode, name: optionData.name })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_3__.default, { netBanking: true, instrumentType: optionData.instrumentType, instrumentName: optionData.name, className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.lowSRMessage, show: (selected && hasLowSR) || disabled, disable: disabled }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_1__.default, { text: "PAY NOW", className: _netbankingCardUI_base_css__WEBPACK_IMPORTED_MODULE_5__.default.actionButton, onClick: onActionButtonClick, visible: selected, deviceMode: deviceMode })));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/NetBanking/index.js":
/*!***********************************************************************!*\
  !*** ./browser/components/payment/common/Options/NetBanking/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./netBanking.base.css */ "./browser/components/payment/common/Options/NetBanking/netBanking.base.css");
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../.../../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var _NetBankingCardUI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NetBankingCardUI */ "./browser/components/payment/common/Options/NetBanking/NetBankingCardUI.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_Sprite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonComp/Sprite */ "./browser/components/common/Sprite/index.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var iconComp_DropDown_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! iconComp/DropDown.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/DropDown.jsx");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
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


// Style Imports.








// Utils





var NetBanking = /** @class */ (function (_super) {
    __extends(NetBanking, _super);
    function NetBanking(props) {
        var _this = _super.call(this, props) || this;
        var data = lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(props, 'instrumentData.paymentInstrumentDetails.data', []) || [];
        var popularBank = [], otherBanks = [];
        data.map(function (info) {
            if (info.popular) {
                popularBank.push(info);
            }
            else {
                otherBanks.push(info);
            }
        });
        _this.state = {
            selectedBankId: '',
            showOtherBankModal: false,
            popularBank: popularBank,
            otherBanks: otherBanks
        };
        [
            'selectBank',
            'submitCallback',
            'getSelectedInfo',
            'toggleOtherBankModal',
            'selectOtherBank',
            'setActionButtonRef',
            'onActionButtonClick',
            'setOtherBankRef'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        var _a = _this.props, offer = _a.offer, instrumentData = _a.instrumentData;
        _this.props.updateBankDiscount(0);
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('INLINE_OFFER') &&
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_13__.addOffersToInstrumentDetails)(offer, instrumentData);
        return _this;
    }
    NetBanking.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevState.showOtherBankModal &&
            this.state.showOtherBankModal &&
            this.selectedOtherBankRef &&
            this.selectedOtherBankRef.scrollIntoView) {
            this.selectedOtherBankRef.scrollIntoView({ block: 'end' });
        }
    };
    NetBanking.prototype.componentWillUnmount = function () {
        var updateStickyButton = this.props.updateStickyButton;
        updateStickyButton && updateStickyButton({ enabled: true });
    };
    NetBanking.prototype.selectBank = function (val) {
        var updateStickyButton = this.props.updateStickyButton;
        var id = val.slice(11);
        var selectedBank = this.getSelectedInfo(id);
        if (id) {
            triggerEvent('NETBANKING_SELECT', {
                gaLabel: selectedBank.name
            });
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_13__.inlineOfferWidgetLoadEvent)('netbanking', selectedBank.name, selectedBank.offerDetails ? true : false);
            this.setState({
                selectedBankId: id
            });
        }
        updateStickyButton &&
            updateStickyButton({ enabled: !selectedBank.disable });
    };
    NetBanking.prototype.selectOtherBank = function (e) {
        this.selectBank(e.currentTarget.getAttribute('data-value'));
        this.toggleOtherBankModal();
    };
    NetBanking.prototype.getModeAttributes = function () {
        return {
            paymentProviderId: this.state.selectedBankId
        };
    };
    NetBanking.prototype.getSelectedInfo = function (id, dataArr) {
        return ((dataArr ||
            lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(this, 'props.instrumentData.paymentInstrumentDetails.data', []) ||
            []).find(function (info) { return "".concat(info.id) === id; }) || {});
    };
    NetBanking.prototype.toggleOtherBankModal = function () {
        this.setState({
            showOtherBankModal: !this.state.showOtherBankModal
        });
    };
    NetBanking.prototype.setOtherBankRef = function (selected) {
        var _this = this;
        if (selected) {
            return function (node) {
                _this.selectedOtherBankRef = node;
            };
        }
    };
    NetBanking.prototype.getOptionUI = function () {
        var _this = this;
        var _a = this.props, deviceMode = _a.deviceMode, payMode = _a.payMode, offer = _a.offer, _b = _a.instrumentData, _c = _b === void 0 ? {} : _b, _d = _c.type, type = _d === void 0 ? '' : _d, paymentUrl = _c.paymentInstrumentDetails.paymentUrl;
        var _e = this.state, popularBank = _e.popularBank, otherBanks = _e.otherBanks, selectedBankId = _e.selectedBankId, showOtherBankModal = _e.showOtherBankModal;
        var otherBankSelected = this.getSelectedInfo(selectedBankId, otherBanks);
        var otherBankHasLowSr = otherBankSelected.lowSuccessRate, otherBankDisabled = otherBankSelected.disable;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.netBankingContainer },
            deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.heading }, "Net Banking")),
            popularBank.map(function (info) {
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_NetBankingCardUI__WEBPACK_IMPORTED_MODULE_6__.default, { optionData: __assign(__assign({}, info), { instrumentType: type, paymentUrl: paymentUrl }), selectedId: selectedBankId, deviceMode: deviceMode, idPrefix: 'netbanking-', selectInstrument: _this.selectBank, onActionButtonClick: _this.onActionButtonClick }));
            }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.otherBankDropDown, " ").concat(otherBankSelected.id ? _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.selected : ''), onClick: this.toggleOtherBankModal },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.entryName }, otherBankSelected.name
                    ? this.displayOffers(otherBankSelected)
                    : 'Other Banks'),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_DropDown_jsx__WEBPACK_IMPORTED_MODULE_12__.default, null)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_5__.default, { netBanking: true, instrumentType: type, instrumentName: otherBankSelected.name, className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.lowSRMessage, show: otherBankHasLowSr || otherBankDisabled, disable: otherBankDisabled }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_3__.default, { text: "PAY NOW", className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.actionButton, onClick: this.onActionButtonClick, visible: !!otherBankSelected.id, deviceMode: deviceMode, disabled: otherBankDisabled }),
            showOtherBankModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_7__.default, { cancelCallback: this.toggleOtherBankModal, className: deviceMode === 'mobile'
                    ? _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.mobileModalContainer
                    : _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.desktopModalContainer, cancelIconConfig: { show: true, className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.cancelIcon }, enableBackButton: payMode !== 'retry', halfCard: deviceMode === 'mobile' },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modalHeading }, "Select Bank"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modalBody }, otherBanks.map(function (info) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bankInfo, " ").concat(selectedBankId === "".concat(info.id) ? _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.selected : ''), onClick: _this.selectOtherBank, "data-value": "netbanking-".concat(info.id), ref: _this.setOtherBankRef(selectedBankId === "".concat(info.id)) },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_8__.default, { name: "logo-bankselection", className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.bankIcon }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, _this.displayOffers(info)))); }))))));
    };
    NetBanking.prototype.displayOffers = function (optionData) {
        var numberOfOffers = lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(optionData, 'offerDetails', '').length || 0;
        var offerString = numberOfOffers > 0 ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_13__.getOfferString)(numberOfOffers) : '';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.tabText },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, optionData.name),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _netBanking_base_css__WEBPACK_IMPORTED_MODULE_1__.default.inlineOffer }, offerString)));
    };
    NetBanking.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    NetBanking.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    NetBanking.prototype.submitCallback = function (done) {
        if (!this.state.selectedBankId) {
            SHELL.alert('info', {
                message: 'Select a payment option to place order.',
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
            return;
        }
        var name = this.getSelectedInfo(this.state.selectedBankId).name;
        triggerEvent('NETBANKING_SUBMIT', {
            gaLabel: name || 'not selected'
        });
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.NETBANKING, ", ").concat(name),
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.NETBANKING,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
        done && done();
    };
    NetBanking.prototype.render = function () {
        var _a = this.props, _b = _a.instrumentData, code = _b.code, paymentUrl = _b.paymentInstrumentDetails.paymentUrl, payMode = _a.payMode, retrySessionEnabled = _a.retrySessionEnabled;
        return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.INSTRUMENT_ELIGIBLE_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, this.props, { paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.NETBANKING, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.NETBANKING, optionUI: this.getOptionUI(), actionData: {
                hide: true,
                disable: payMode === 'retry' && !retrySessionEnabled
            }, modeAttributes: this.getModeAttributes(), submitCallback: this.submitCallback, paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_10__.default.NETBANKING, setActionButtonRef: this.setActionButtonRef }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_4__.default, { option: "Netbanking", code: code }));
    };
    return NetBanking;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
NetBanking.propTypes = {
    instrumentData: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NetBanking);


/***/ }),

/***/ "./browser/components/payment/common/Options/PaymentOptionError/index.js":
/*!*******************************************************************************!*\
  !*** ./browser/components/payment/common/Options/PaymentOptionError/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _paymentOptionError_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paymentOptionError.base.css */ "./browser/components/payment/common/Options/PaymentOptionError/paymentOptionError.base.css");
/* harmony import */ var iconComp_Warning_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! iconComp/Warning.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Warning.jsx");
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







/*
 * Shows error at option level.
 *
 * Requires:
 * 1. "code" to get message from the kvpair
 * 2. "paymentInstrumentDetails" to get instrument specific info.
 *
 * eg.
 * code: 3007,
 * errorMessage: "COD amount should be between {minCOD} and {maxCOD}",
 * paymentInstrumentDetails: { instrumentData: data: [{ minCOD: 100, maxCOD: 10000, ... }] }
 *
 * PlaceHolders in kvpair should match with keys in instrumentData.
 */
var PaymentOptionError = /** @class */ (function (_super) {
    __extends(PaymentOptionError, _super);
    function PaymentOptionError(props) {
        var _this = _super.call(this, props) || this;
        _this.errorMessagesMap = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('PAYMENT_OPTIONS_ERROR');
        return _this;
    }
    PaymentOptionError.prototype.componentDidMount = function () {
        var errorCode = this.props.code;
        var errorMessage = this.getMessage();
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getUidx)();
        triggerEvent('GET_PAYMENT_OPTIONS_ERROR', {
            gaLabel: "".concat(errorCode, ":").concat(errorMessage, ":").concat(uidx)
        });
    };
    PaymentOptionError.prototype.getMessage = function () {
        var _a = this.props, code = _a.code, paymentInstrumentDetails = _a.paymentInstrumentDetails;
        var instrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentInstrumentDetails, 'data.0');
        var errorMessage = this.errorMessagesMap[code] || this.errorMessagesMap.default;
        var keys = errorMessage.match(/{[\w]+}/g);
        if (keys && instrumentData) {
            keys.forEach(function (key) {
                var placeHolder = key.substring(1, key.length - 1);
                if (instrumentData[placeHolder]) {
                    errorMessage = errorMessage.replace(key, instrumentData[placeHolder]);
                }
            });
        }
        return errorMessage;
    };
    PaymentOptionError.prototype.render = function () {
        var _a = this.props, className = _a.className, option = _a.option, children = _a.children;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paymentOptionError_base_css__WEBPACK_IMPORTED_MODULE_4__.default.errorBlock, " ").concat(className || '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Warning_jsx__WEBPACK_IMPORTED_MODULE_5__.default, { className: _paymentOptionError_base_css__WEBPACK_IMPORTED_MODULE_4__.default.errorIcon }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentOptionError_base_css__WEBPACK_IMPORTED_MODULE_4__.default.heading },
                option,
                " is not available"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentOptionError_base_css__WEBPACK_IMPORTED_MODULE_4__.default.desc }, this.getMessage()),
                children)));
    };
    return PaymentOptionError;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
PaymentOptionError.propTypes = {
    className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    option: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    code: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().number),
    paymentInstrumentDetails: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentOptionError);


/***/ }),

/***/ "./browser/components/payment/common/Options/RecommendedInstruments/RecommendedInstrumentsUI.js":
/*!******************************************************************************************************!*\
  !*** ./browser/components/payment/common/Options/RecommendedInstruments/RecommendedInstrumentsUI.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recommendedInstrumentsComponentConfig */ "./browser/components/payment/common/Options/RecommendedInstruments/recommendedInstrumentsComponentConfig.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _PurgedCardInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../PurgedCardInfo */ "./browser/components/payment/common/PurgedCardInfo/index.js");
/* harmony import */ var _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./recommendedInstrumentsUI.base.css */ "./browser/components/payment/common/Options/RecommendedInstruments/recommendedInstrumentsUI.base.css");
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









var VISIBLE_LIMIT = 3;
var RecommendedInstrumentsUI = /** @class */ (function (_super) {
    __extends(RecommendedInstrumentsUI, _super);
    function RecommendedInstrumentsUI(props) {
        var _this = _super.call(this, props) || this;
        var boundFuncs = ['filterInstrumentsForLowSR', 'getOptionUI'];
        boundFuncs.forEach(function (func) { return (_this[func] = _this[func].bind(_this)); });
        _this.purgedCardInfoConfig =
            (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('SAVED_CARD_CONSENT').purgedCardInfo || {};
        return _this;
    }
    RecommendedInstrumentsUI.prototype.filterInstrumentsForLowSR = function (instruments) {
        if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('LOW_SR_OPTIONS_REMOVE')) {
            return instruments;
        }
        var _a = this.props, instrumentState = _a.instrumentState, instrumentStaticParams = _a.instrumentStaticParams;
        var filteredInstruments = instruments.filter(function (instrumentData, index) {
            var instrumentType = instrumentData.type;
            if (instrumentType === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.UPI) {
                var optionData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.data.0');
                var stateParams = instrumentState[instrumentType] || {};
                var staticParams = instrumentStaticParams[instrumentType] || {};
                var instrumentParams = __assign(__assign({}, stateParams), staticParams);
                var formattedOptionData = (0,_recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_2__.getFormattedData)(__assign(__assign({}, optionData), { instrumentType: instrumentType }), instrumentParams);
                return formattedOptionData.show &&
                    !(instrumentData.paymentInstrumentDetails &&
                        Array.isArray(instrumentData.paymentInstrumentDetails.data) &&
                        instrumentData.paymentInstrumentDetails.data.length > 0 &&
                        instrumentData.paymentInstrumentDetails.data[0].lowSuccessRate)
                    ? true
                    : false;
            }
            return true;
        });
        return filteredInstruments.length > 0 ? filteredInstruments : instruments;
    };
    RecommendedInstrumentsUI.prototype.getOptionUI = function () {
        var _a = this.props, instrumentList = _a.instrumentList, payMode = _a.payMode, cartData = _a.cartData, paymentOptions = _a.paymentOptions, selectedId = _a.selectedId, instrumentState = _a.instrumentState, deviceMode = _a.deviceMode, bankDiscount = _a.bankDiscount, outstandingAmount = _a.outstandingAmount, totalPayable = _a.totalPayable, isOptionsCollapsed = _a.isOptionsCollapsed, instrumentStaticParams = _a.instrumentStaticParams, showMoreOptions = _a.showMoreOptions, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick, updateBankDiscount = _a.updateBankDiscount, handlePaymentAction = _a.handlePaymentAction, setLoader = _a.setLoader, instrumentActionHandlers = _a.instrumentActionHandlers;
        var filteredInstrumentList = this.filterInstrumentsForLowSR(instrumentList);
        var isPurgedCardEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.purgedCardInfoConfig, 'enabled.recommendedInstruments');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(deviceMode === 'mobile'
                    ? _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.recommendedInstrumentsMobileHeading
                    : _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.recommendedInstrumentsDesktopHeading) }, "Recommended Payment Options"),
            isPurgedCardEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PurgedCardInfo__WEBPACK_IMPORTED_MODULE_7__.default, { deviceMode: deviceMode, show: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.paymentOptions.savedCardPurged') })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.recommendedInstrumentContainer },
                filteredInstrumentList.map(function (instrumentData, index) {
                    var instrumentType = instrumentData.type;
                    var paymentUrl = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.paymentUrl');
                    var optionData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.data.0');
                    var stateParams = instrumentState[instrumentType] || {};
                    var staticParams = instrumentStaticParams[instrumentType] || {};
                    var instrumentParams = __assign(__assign({}, stateParams), staticParams);
                    var formattedOptionData = (0,_recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_2__.getFormattedData)(__assign(__assign({}, optionData), { instrumentType: instrumentType, paymentUrl: paymentUrl }), instrumentParams);
                    var actionHandlers = instrumentActionHandlers[instrumentType];
                    var Component = (0,_recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_2__.getComponent)(instrumentType);
                    var containerClassName = '';
                    if (deviceMode === 'mobile') {
                        containerClassName =
                            isOptionsCollapsed && index + 1 > VISIBLE_LIMIT
                                ? _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.hide
                                : '';
                        containerClassName += " ".concat(_recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.rowContainer);
                    }
                    else {
                        containerClassName = _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.fullWidth;
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Component, __assign({ context: "reco", rank: index + 1, payMode: payMode, optionData: formattedOptionData, cartData: cartData, paymentOptions: paymentOptions, selectedId: selectedId, deviceMode: deviceMode, bankDiscount: bankDiscount, outstandingAmount: outstandingAmount, totalPayable: totalPayable, idPrefix: "reco_".concat(instrumentType, "-"), classNames: {
                            container: containerClassName,
                            text: _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.text
                        }, selectInstrument: selectInstrument, onActionButtonClick: onActionButtonClick, updateBankDiscount: updateBankDiscount, handlePaymentAction: handlePaymentAction, setLoader: setLoader }, instrumentParams, actionHandlers)));
                }),
                isOptionsCollapsed && filteredInstrumentList.length > VISIBLE_LIMIT && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _recommendedInstrumentsUI_base_css__WEBPACK_IMPORTED_MODULE_8__.default.showMore, onClick: showMoreOptions }, "+".concat(filteredInstrumentList.length - VISIBLE_LIMIT, " More option").concat(filteredInstrumentList.length - VISIBLE_LIMIT > 1 ? "s" : ''))))));
    };
    RecommendedInstrumentsUI.prototype.render = function () {
        var _a = this.props, payNowFormParams = _a.payNowFormParams, instrumentList = _a.instrumentList, selectedRank = _a.selectedRank, restProps = __rest(_a, ["payNowFormParams", "instrumentList", "selectedRank"]);
        var instrumentData = instrumentList[selectedRank - 1];
        var paymentInstrument = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.data[0].paymentInstrumentType') || lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'type');
        var cardType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.data[0].cardType') || '';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_6__.default, __assign({}, payNowFormParams, restProps, { instrumentData: instrumentData, paymentInstrument: paymentInstrument, containerName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.RECOMMENDED_INSTRUMENT, optionUI: this.getOptionUI(), actionData: {
                hide: true,
                disable: restProps.payMode === 'retry' && !restProps.retrySessionEnabled
            }, cardType: cardType })));
    };
    return RecommendedInstrumentsUI;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendedInstrumentsUI);


/***/ }),

/***/ "./browser/components/payment/common/Options/RecommendedInstruments/index.js":
/*!***********************************************************************************!*\
  !*** ./browser/components/payment/common/Options/RecommendedInstruments/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _RecommendedInstrumentsUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RecommendedInstrumentsUI */ "./browser/components/payment/common/Options/RecommendedInstruments/RecommendedInstrumentsUI.js");
/* harmony import */ var _recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recommendedInstrumentsComponentConfig */ "./browser/components/payment/common/Options/RecommendedInstruments/recommendedInstrumentsComponentConfig.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__);
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
var _a, _b, _c, _d;











var commonActionHandlers = [
    'selectInstrument',
    'showMoreOptions',
    'submitCallback',
    'setActionButtonRef',
    'onActionButtonClick'
];
var INSTRUMENT_ACTION_HANDLERS_MAP = (_a = {},
    _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = [
        'onInputChange',
        'toggleHandles',
        'toggleCheckbox',
        'toggleSaveInfo',
        'selectHandle'
    ],
    _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = [
        'setCvv',
        'removeSavedCard',
        'toggleAllowTokenization'
    ],
    _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD] = ['setCaptchaRef', 'setCaptchaDetails'],
    _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER] = [
        'setMobile',
        'getMobile',
        'displayInput',
        'hideTNCModal',
        'onTNCSuccess'
    ],
    _a);
var INSTRUMENT_SELECT_HANDLERS_MAP = (_b = {},
    _b[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = 'selectUPI',
    _b[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = 'selectSavedInstrument',
    _b[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.WALLET_TYPE] = 'selectWallet',
    _b[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.NETBANKING] = 'selectNetbanking',
    _b);
var INSTRUMENT_SUBMIT_HANDLERS_MAP = (_c = {},
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = 'submitCallbackUPI',
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = 'submitCallbackSavedInstrument',
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.WALLET_TYPE] = 'submitCallbackWallet',
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.NETBANKING] = 'submitCallbackNetbanking',
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD] = 'submitCallbackCOD',
    _c[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER] = 'submitCallbackBNPL',
    _c);
var BNPL_ERROR_MESSAGE_MAP = {
    EMPTY: 'Please enter a registered mobile number',
    INVALID: 'Please enter a valid 10 digit mobile number'
};
var OPTION_GET_CTA_MAP = (_d = {},
    _d[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER] = function (onClickParams) {
        return onClickParams.authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER';
    },
    _d[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD] = function () { return 'PLACE ORDER'; },
    _d.default = function () { return 'PAY NOW'; },
    _d);
var getBNPLOptionData = function (instrumentData) {
    var bnplInstrumentData = (instrumentData || []).find(function (data) { return data.type === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER; });
    return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(bnplInstrumentData, 'paymentInstrumentDetails.data', []).find(function (paymentType) { return paymentType.id === 1; });
};
var RecommendedInstruments = /** @class */ (function (_super) {
    __extends(RecommendedInstruments, _super);
    function RecommendedInstruments(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.state = (0,_recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_4__.getInitialState)(props);
        commonActionHandlers.forEach(function (fn) {
            _this[fn] = _this[fn].bind(_this);
        });
        _this.instrumentActionHandlers = {};
        Object.keys(INSTRUMENT_ACTION_HANDLERS_MAP).forEach(function (key) {
            _this.instrumentActionHandlers[key] = {};
            INSTRUMENT_ACTION_HANDLERS_MAP[key].forEach(function (handler) {
                _this[handler] = _this[handler].bind(_this);
                _this.instrumentActionHandlers[key][handler] = _this[handler];
            });
        });
        _this.instrumentSelectHandlers = {};
        Object.keys(INSTRUMENT_SELECT_HANDLERS_MAP).forEach(function (key) {
            var handler = INSTRUMENT_SELECT_HANDLERS_MAP[key];
            _this[handler] = _this[handler].bind(_this);
            _this.instrumentSelectHandlers[key] = _this[handler];
        });
        _this.instrumentSubmitHandlers = {};
        Object.keys(INSTRUMENT_SUBMIT_HANDLERS_MAP).forEach(function (key) {
            var handler = INSTRUMENT_SUBMIT_HANDLERS_MAP[key];
            _this[handler] = _this[handler].bind(_this);
            _this.instrumentSubmitHandlers[key] = _this[handler];
        });
        _this.instrumentStaticParams = (_a = {},
            _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = {
                handles: (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('UPI_CONFIG').vpaHandles
            },
            _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = {
                isAutoConsentAutoChecked: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') ||
                    {}, 'autoChecked', true),
                isCardAutoTokenizationEnabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('PAYMENT_SAVE_CARD_AUTO_CONSENT')
            },
            _a);
        var _b = _this.props, inlineOffer = _b.inlineOffer, instrumentData = _b.instrumentData;
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('INLINE_OFFER') &&
            _this.addOffersToInstrumentDetails(inlineOffer.paymentInstruments, instrumentData);
        return _this;
    }
    RecommendedInstruments.prototype.componentDidMount = function () {
        var _this = this;
        this.props.setLoader(true, function () {
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.getInstalledAppsPromise)().then(function (_a) {
                var installedApps = _a.installedApps, upiSDKEnabled = _a.upiSDKEnabled;
                _this.setState(function (prevState) {
                    var _a;
                    return ({
                        instrumentState: __assign(__assign({}, prevState.instrumentState), (_a = {}, _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]), { installedApps: installedApps, upiIntentEnabled: upiSDKEnabled && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('UPI_INTENT_ENABLED') }), _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT]), { installedApps: installedApps, upiIntentEnabled: upiSDKEnabled && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('UPI_INTENT_ENABLED') }), _a))
                    });
                });
                (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.getUPISupportedPgPromise)().then(function (pgString) {
                    pgString = pgString.replace(/[\[\] ]/g, '').split(',');
                    _this.setState(function (prevState) {
                        var _a;
                        return ({
                            instrumentState: __assign(__assign({}, prevState.instrumentState), (_a = {}, _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]), { upiSupportedPG: pgString }), _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT]), { upiSupportedPG: pgString }), _a))
                        });
                    });
                });
                _this.props.setLoader(false);
            });
        });
    };
    RecommendedInstruments.prototype.addOffersToInstrumentDetails = function (offer, instrumentDetails) {
        instrumentDetails.map(function (instrument) {
            var type = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrument, 'type', '');
            if (type !== 'savedinstrument') {
                var offerInstrument = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(offer, type, '');
                if (offerInstrument) {
                    offerInstrument.map(function (off) {
                        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(off, 'bankCode', '') ==
                            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrument, 'paymentInstrumentDetails.data[0].bankCode', ''))
                            instrument.paymentInstrumentDetails.data[0].offerDetails =
                                off.offerDetails;
                    });
                }
            }
        });
    };
    RecommendedInstruments.getDerivedStateFromProps = function (props, state) {
        var _a;
        var codInstrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(props, 'instrumentData', []).find(function (instrument) { return instrument.type === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD; });
        var twoFAEnabled = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_5__.isTwoFAEnabled)(__assign(__assign({}, props), { instrumentData: codInstrumentData }));
        return {
            instrumentState: __assign(__assign({}, state.instrumentState), (_a = {}, _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD] = __assign(__assign({}, state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD]), { twoFAEnabled: twoFAEnabled, captchaEnabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('COD_CAPTCHA_ENABLED') && !twoFAEnabled }), _a))
        };
    };
    /*
     * Common action handlers
     */
    RecommendedInstruments.prototype.updateCTA = function (text) {
        this.props.updateStickyButton({
            text: text
        });
    };
    RecommendedInstruments.prototype.selectInstrument = function (val, onClickParams) {
        var _this = this;
        var id = val.substring(val.indexOf('-') + 1);
        var selectHandler = this.instrumentSelectHandlers[onClickParams.instrumentType];
        if (id === this.state.selectedId) {
            return;
        }
        this.setState({
            selectedId: id,
            selectedName: onClickParams.name,
            selectedRank: onClickParams.rank,
            instrumentType: onClickParams.instrumentType,
            payNowFormParams: (0,_recommendedInstrumentsComponentConfig__WEBPACK_IMPORTED_MODULE_4__.getPayNowFormParams)(__assign({ id: id }, onClickParams))
        }, function () {
            _this.clearTabSelection();
        });
        var getCTA = OPTION_GET_CTA_MAP[onClickParams.instrumentType] ||
            OPTION_GET_CTA_MAP.default;
        this.updateCTA(getCTA(onClickParams));
        if (onClickParams.paymentInstrumentType !== 'card')
            this.props.updateBankDiscount(0);
        selectHandler && selectHandler(id, onClickParams);
    };
    RecommendedInstruments.prototype.clearSelection = function () {
        if (this.state.selectedId) {
            this.setState({
                selectedId: ''
            });
        }
    };
    RecommendedInstruments.prototype.clearTabSelection = function () {
        var _a = this.props, deviceMode = _a.deviceMode, switchTab = _a.switchTab;
        deviceMode === 'mobile' && switchTab();
    };
    RecommendedInstruments.prototype.showMoreOptions = function () {
        this.setState({
            isOptionsCollapsed: false
        });
    };
    RecommendedInstruments.prototype.setInstrumentState = function (instrumentType, state, withPrevState, callback) {
        if (withPrevState === void 0) { withPrevState = function () { }; }
        if (callback === void 0) { callback = function () { }; }
        this.setState(function (prevState) {
            var _a;
            return ({
                instrumentState: __assign(__assign({}, prevState.instrumentState), (_a = {}, _a[instrumentType] = __assign(__assign(__assign({}, prevState.instrumentState[instrumentType]), state), withPrevState(prevState)), _a))
            });
        }, callback);
    };
    RecommendedInstruments.prototype.updateModeAttributes = function (attr, callback) {
        this.setState(function (prevState) { return ({
            payNowFormParams: __assign(__assign({}, prevState.payNowFormParams), { modeAttributes: __assign(__assign({}, prevState.payNowFormParams.modeAttributes), attr) })
        }); }, function () {
            callback && callback();
        });
    };
    RecommendedInstruments.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    RecommendedInstruments.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    /*
     * Saved Instrument action handlers
     */
    RecommendedInstruments.prototype.selectSavedInstrument = function (id, onClickParams) {
        var _this = this;
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT, {
            selectedInstrumentType: onClickParams.paymentInstrumentType,
            cvv: '',
            cvvError: false,
            vpa: onClickParams.vpa || '',
            vpaAppName: onClickParams.appName,
            allowTokenization: false,
            tokenizationFlag: ''
        }, function () { }, function () { return __awaiter(_this, void 0, void 0, function () {
            var upiSupportedPG, instrumentInfo, tokenizationConsent, isCardAutoTokenizationEnabled, maskedCardNumber, eligibleForTokenization, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        upiSupportedPG = this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT].upiSupportedPG;
                        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isAndroidApp)() && onClickParams.upiIntentEnabled) {
                            this.updateModeAttributes({
                                upiSupportedPG: upiSupportedPG
                            });
                        }
                        instrumentInfo = this.state.instrumentList[onClickParams.rank - 1]
                            .paymentInstrumentDetails.data[0];
                        tokenizationConsent = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentInfo, 'tokenizationConsent');
                        isCardAutoTokenizationEnabled = this.instrumentStaticParams[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT].isCardAutoTokenizationEnabled;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(onClickParams.paymentInstrumentType === 'card' &&
                            !tokenizationConsent &&
                            isCardAutoTokenizationEnabled)) return [3 /*break*/, 3];
                        maskedCardNumber = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentInfo, 'maskedCardNumber');
                        return [4 /*yield*/, commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__.default.getCardType(maskedCardNumber)];
                    case 2:
                        eligibleForTokenization = (_a.sent()).eligibleForTokenization;
                        if (eligibleForTokenization) {
                            this.setState(function (prevState) {
                                var _a;
                                return ({
                                    instrumentState: (_a = {},
                                        _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT]), { allowTokenization: _this.instrumentStaticParams[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT].isAutoConsentAutoChecked
                                                ? true
                                                : false, tokenizationFlag: true }),
                                        _a)
                                });
                            });
                        }
                        else {
                            this.setState(function (prevState) {
                                var _a;
                                return ({
                                    instrumentState: (_a = {},
                                        _a[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT] = __assign(__assign({}, prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT]), { tokenizationFlag: false }),
                                        _a)
                                });
                            });
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    RecommendedInstruments.prototype.toggleAllowTokenization = function () {
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT, {}, function (prevState) { return ({
            allowTokenization: !prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT].allowTokenization
        }); });
    };
    RecommendedInstruments.prototype.setCvv = function (e) {
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT, {
            cvv: e.currentTarget.value,
            cvvError: false
        });
        this.updateModeAttributes({
            cvvCode: e.currentTarget.value
        });
    };
    RecommendedInstruments.prototype.isValidCvv = function (cvv) {
        return cvv && cvv.length >= 3 && /^\d*$/.test(cvv);
    };
    RecommendedInstruments.prototype.removeSavedCard = function (e) {
        var _this = this;
        var instrumentId = e.currentTarget.getAttribute('data-instrumentid');
        if (instrumentId) {
            var instrumentList_1 = this.state.instrumentList;
            this.props.setLoader(true);
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__.default.removeSavedCard(instrumentId, function () {
                _this.props.setLoader(false);
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.successNotification)({
                    message: 'Card successfully removed.'
                });
                _this.setState({
                    instrumentList: instrumentList_1.filter(function (instrumentData) {
                        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData, 'paymentInstrumentDetails.data.0.instrumentId') !== instrumentId;
                    })
                });
                triggerEvent('REMOVE_EXPIRED_CARD', {
                    maData: {
                        entity_type: 'remove expired card',
                        entity_name: 'expired card',
                        entity_id: instrumentId
                    }
                });
            }, function (err) {
                _this.props.setLoader(false);
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.errorNotification)(err);
            });
        }
    };
    RecommendedInstruments.prototype.submitCallbackSavedInstrument = function (done) {
        var _a = this, _b = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT, _c = _a.state.instrumentState[_b], selectedInstrumentType = _c.selectedInstrumentType, cvv = _c.cvv;
        var valid = false;
        var message = '';
        if (selectedInstrumentType === 'card') {
            if (this.isValidCvv(cvv)) {
                valid = true;
            }
            else {
                this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT, {
                    cvvError: true
                });
                if (cvv) {
                    message = 'Invalid CVV, please enter a valid CVV.';
                }
                else {
                    message = 'Enter CVV to place order.';
                }
            }
        }
        else if (selectedInstrumentType === 'vpa') {
            valid = true;
        }
        if (valid) {
            var savedInstrumentState = this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT];
            if (this.instrumentStaticParams[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT]
                .isCardAutoTokenizationEnabled) {
                if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstrumentState, 'allowTokenization') &&
                    lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstrumentState, 'tokenizationFlag')) {
                    triggerEvent('CARD_SUBMIT');
                    this.updateModeAttributes({
                        tokenizationConsent: 'true'
                    }, done);
                }
                else {
                    triggerEvent('CARD_SUBMIT');
                    this.updateModeAttributes({
                        tokenizationConsent: 'false'
                    }, done);
                }
            }
            else {
                triggerEvent('CARD_SUBMIT');
                done();
            }
        }
        else {
            SHELL.alert('info', {
                message: message,
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
        }
    };
    /*
     * UPI action handlers
     */
    RecommendedInstruments.prototype.selectUPI = function (id, onClickParams) {
        var _this = this;
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {
            vpaRequired: onClickParams.vpaRequired,
            vpa: '',
            error: '',
            selectedHandle: onClickParams.vpaWithHandle
                ? this.instrumentStaticParams[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI].handles[0]
                : ''
        }, function () { }, function () {
            var upiSupportedPG = _this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]
                .upiSupportedPG;
            if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isAndroidApp)() && onClickParams.intentEnabled) {
                _this.updateModeAttributes({
                    upiSupportedPG: upiSupportedPG
                });
            }
        });
        triggerEvent('PAYMENT_UPI_OPTION_SELECT', { gaLabel: onClickParams.name });
    };
    RecommendedInstruments.prototype.onInputChange = function (e) {
        var _a = this, _b = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, selectedHandle = _a.state.instrumentState[_b].selectedHandle;
        var vpa = e.currentTarget.value;
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {
            vpa: vpa
        });
        var fullVpa = "".concat(vpa).concat(selectedHandle);
        this.updateModeAttributes({
            vpa: fullVpa
        });
    };
    RecommendedInstruments.prototype.toggleHandles = function () {
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {}, function (prevState) { return ({
            handlesShown: !prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]
                .handlesShown
        }); });
    };
    RecommendedInstruments.prototype.toggleCheckbox = function () {
        var _this = this;
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {}, function (prevState) { return ({
            saveCheck: !prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI].saveCheck
        }); }, function () {
            var savedVpa = _this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]
                .saveCheck
                ? 'on'
                : '';
            _this.updateModeAttributes({
                savedVpa: savedVpa
            });
        });
    };
    RecommendedInstruments.prototype.toggleSaveInfo = function () {
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {}, function (prevState) { return ({
            saveInfoShow: !prevState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI]
                .saveInfoShow
        }); });
    };
    RecommendedInstruments.prototype.selectHandle = function (e) {
        var _a = this, _b = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, _c = _a.state.instrumentState[_b], vpa = _c.vpa, selectedHandle = _c.selectedHandle;
        var handle = e.currentTarget.id.slice(6);
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {
            selectedHandle: handle,
            handlesShown: false
        });
        var fullVpa = "".concat(vpa).concat(selectedHandle);
        this.updateModeAttributes({
            vpa: fullVpa
        });
    };
    RecommendedInstruments.prototype.submitCallbackUPI = function (done) {
        var _this = this;
        var _a = this, _b = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, _c = _a.state.instrumentState[_b], vpa = _c.vpa, vpaRequired = _c.vpaRequired, selectedHandle = _c.selectedHandle;
        var validity = { valid: true, message: '' };
        var isVPAEmpty = vpaRequired && !(vpa && vpa.trim());
        if (isVPAEmpty) {
            validity.valid = false;
            validity.message = 'Please enter UPI ID';
        }
        if (validity.valid) {
            vpa
                ? commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_6__.default.validateVPA("".concat(vpa).concat(selectedHandle), done, function (err) {
                    _this.props.setLoader(false);
                    _this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {
                        error: err.message
                    });
                })
                : done();
        }
        else {
            this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.UPI, {
                error: validity.message
            });
            this.props.setLoader(false);
        }
    };
    /*
     * Wallet action handlers
     */
    RecommendedInstruments.prototype.selectWallet = function (id, onClickParams) {
        triggerEvent('WALLET_SELECT', {
            gaLabel: onClickParams.name
        });
    };
    RecommendedInstruments.prototype.submitCallbackWallet = function (done) {
        triggerEvent('WALLET_SUBMIT', {
            gaLabel: this.state.selectedName
        });
        done();
    };
    /*
     * Netbanking action handlers
     */
    RecommendedInstruments.prototype.selectNetbanking = function (id, onClickParams) {
        triggerEvent('NETBANKING_SELECT', {
            gaLabel: onClickParams.name
        });
    };
    RecommendedInstruments.prototype.submitCallbackNetbanking = function (done) {
        triggerEvent('NETBANKING_SUBMIT', {
            gaLabel: this.state.selectedName
        });
        done();
    };
    /*
     * COD action handlers
     */
    RecommendedInstruments.prototype.setCaptchaDetails = function (data, done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        var captchaId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'id') || '';
        var codCaptcha = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(data, 'code') || '';
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD, {}, function (prevState) { return ({
            captchaDetails: {
                code: codCaptcha,
                id: captchaId
            }
        }); }, function () {
            _this.updateModeAttributes({
                captchaId: captchaId,
                codCaptcha: codCaptcha
            }, function () {
                _this.props.setLoader(false);
                done();
            });
        });
    };
    RecommendedInstruments.prototype.setCaptchaRef = function (node) {
        this.captchaComp = node;
    };
    RecommendedInstruments.prototype.submitCallbackCOD = function (done) {
        if (this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD].captchaEnabled) {
            this.captchaComp.submitWithCaptcha(done);
        }
        else {
            done();
        }
    };
    /*
     * BNPL action handlers
     */
    RecommendedInstruments.prototype.setMobile = function (e) {
        var value = e.target.value;
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER, {
            mobileValue: value,
            errorMessage: ''
        });
        var mobile = this.getMobile(value);
        this.updateModeAttributes({
            userProfileMobile: mobile
        });
    };
    RecommendedInstruments.prototype.showTNCModal = function (successCallback) {
        this.props.setLoader(false);
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER, {
            modalShow: true,
            modalSuccessCallback: successCallback
        });
    };
    RecommendedInstruments.prototype.hideTNCModal = function () {
        this.setInstrumentState(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER, {
            modalShow: false,
            modalSuccessCallback: null
        });
    };
    RecommendedInstruments.prototype.onTNCSuccess = function () {
        this.props.setLoader(true);
        this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD].modalSuccessCallback();
    };
    RecommendedInstruments.prototype.displayInput = function (optionData) {
        var loginType = optionData.loginType, status = optionData.status;
        return status !== 'ACTIVE' && loginType === 'EMAIL';
    };
    RecommendedInstruments.prototype.isValidMobileBNPL = function () {
        var mobile = this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER]
            .mobileValue;
        if (!(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isValidMobile)(mobile)) {
            var isEmptyMobile = (mobile || '').length === 0;
            this.setState({
                errorMessage: isEmptyMobile
                    ? BNPL_ERROR_MESSAGE_MAP.EMPTY
                    : BNPL_ERROR_MESSAGE_MAP.INVALID
            });
            return false;
        }
        return true;
    };
    RecommendedInstruments.prototype.getMobile = function (mobileValue) {
        return (mobileValue ||
            this.state.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.PAY_LATER].mobileValue ||
            '');
    };
    RecommendedInstruments.prototype.redirectToTNC = function () {
        SHELL.redirectTo("/checkout/payment/bnpl/tnc?mobile=".concat(this.getMobile(), "&context=recommended"));
    };
    RecommendedInstruments.prototype.submitCallbackBNPL = function (done) {
        var bnplOptionData = getBNPLOptionData(this.props.instrumentData);
        var disabled = bnplOptionData.disable && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('CHECKOUT_LOW_SR_V2');
        if (disabled) {
            SHELL.alert('info', {
                message: 'Select another payment option to place order.',
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
            return;
        }
        if (this.displayInput(bnplOptionData) && !this.isValidMobileBNPL()) {
            this.props.setLoader(false);
            return;
        }
        if (bnplOptionData.tncAccepted) {
            done();
            return;
        }
        this.props.deviceMode === 'mobile'
            ? this.redirectToTNC()
            : this.showTNCModal(done);
    };
    RecommendedInstruments.prototype.triggerSubmitEvent = function () {
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: "".concat(this.state.instrumentType, " ").concat(this.state.selectedName || ''),
                    v2: 'Recommended',
                    v3: this.state.selectedRank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
    };
    RecommendedInstruments.prototype.submitCallback = function (done) {
        var _this = this;
        var submitHandler = this.instrumentSubmitHandlers[this.state.instrumentType];
        var message = '';
        if (!this.state.selectedId) {
            message = 'Select a payment option to place order.';
            SHELL.alert('info', {
                message: message,
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
        }
        else {
            if (submitHandler) {
                submitHandler(function () {
                    _this.triggerSubmitEvent();
                    done();
                });
            }
            else {
                this.triggerSubmitEvent();
                done();
            }
        }
    };
    RecommendedInstruments.prototype.render = function () {
        var _a = this, _b = _a.props, instrumentData = _b.instrumentData, restProps = __rest(_b, ["instrumentData"]), _c = _a.state, selectedId = _c.selectedId, restState = __rest(_c, ["selectedId"]), instrumentStaticParams = _a.instrumentStaticParams;
        var savedInstrumentStaticParams = this.instrumentStaticParams[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT];
        var savedInstrumentState = restState.instrumentState[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.SAVED_INSTRUMENT];
        var isTokenizationConsentTaken = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstrumentStaticParams, 'isCardAutoTokenizationEnabled') &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstrumentStaticParams, 'isAutoConsentAutoChecked') &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstrumentState, 'tokenizationFlag');
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_RecommendedInstrumentsUI__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, restState, lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, commonActionHandlers), { selectedId: selectedId, instrumentStaticParams: instrumentStaticParams, instrumentActionHandlers: this.instrumentActionHandlers }, restProps, { isTokenizationConsentTaken: isTokenizationConsentTaken, allowTokenization: false })));
    };
    return RecommendedInstruments;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendedInstruments);


/***/ }),

/***/ "./browser/components/payment/common/Options/RecommendedInstruments/recommendedInstrumentsComponentConfig.js":
/*!*******************************************************************************************************************!*\
  !*** ./browser/components/payment/common/Options/RecommendedInstruments/recommendedInstrumentsComponentConfig.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getInitialState": () => (/* binding */ getInitialState),
/* harmony export */   "getComponent": () => (/* binding */ getComponent),
/* harmony export */   "getPayNowFormParams": () => (/* binding */ getPayNowFormParams),
/* harmony export */   "getFormattedData": () => (/* binding */ getFormattedData)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Wallets_WalletCardUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Wallets/WalletCardUI */ "./browser/components/payment/common/Options/Wallets/WalletCardUI.js");
/* harmony import */ var _EMI_EmiCardUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EMI/EmiCardUI */ "./browser/components/payment/common/Options/EMI/EmiCardUI.js");
/* harmony import */ var _Upi_UpiComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Upi/UpiComponents */ "./browser/components/payment/common/Options/Upi/UpiComponents.js");
/* harmony import */ var _NetBanking_NetBankingCardUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../NetBanking/NetBankingCardUI */ "./browser/components/payment/common/Options/NetBanking/NetBankingCardUI.js");
/* harmony import */ var _SavedInstruments_SavedInstrumentCardUI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SavedInstruments/SavedInstrumentCardUI */ "./browser/components/payment/common/Options/SavedInstruments/SavedInstrumentCardUI.js");
/* harmony import */ var _Cod_CodCardUI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Cod/CodCardUI */ "./browser/components/payment/common/Options/Cod/CodCardUI.js");
/* harmony import */ var _BNPL_BNPLCardUI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BNPL/BNPLCardUI */ "./browser/components/payment/common/Options/BNPL/BNPLCardUI.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__);
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
var _a, _b, _c;












var COD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.COD, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.SAVED_INSTRUMENT, UPI = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.UPI, NETBANKING = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.NETBANKING, EMI_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.EMI_TYPE, WALLET_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_TYPE, PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.PAY_LATER, WALLET_PM_DIRECT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM_DIRECT, WALLET_PM = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM, WALLET_PM_NAME = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM_NAME, EMI_PM = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.EMI_PM, EMI_PM_NAME = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.EMI_PM_NAME;
var TYPE_COMPONENT_MAP = (_a = {},
    _a[COD] = _Cod_CodCardUI__WEBPACK_IMPORTED_MODULE_6__.default,
    _a[SAVED_INSTRUMENT] = _SavedInstruments_SavedInstrumentCardUI__WEBPACK_IMPORTED_MODULE_5__.default,
    _a[UPI] = _Upi_UpiComponents__WEBPACK_IMPORTED_MODULE_3__.UPIApp,
    _a[NETBANKING] = _NetBanking_NetBankingCardUI__WEBPACK_IMPORTED_MODULE_4__.default,
    _a[EMI_TYPE] = _EMI_EmiCardUI__WEBPACK_IMPORTED_MODULE_2__.default,
    _a[WALLET_TYPE] = _Wallets_WalletCardUI__WEBPACK_IMPORTED_MODULE_1__.default,
    _a[PAY_LATER] = _BNPL_BNPLCardUI__WEBPACK_IMPORTED_MODULE_7__.default,
    _a);
var TYPE_DATA_FORMATTER_MAP = (_b = {},
    _b[UPI] = function (data, options) {
        var name = data.name.toLowerCase().replace(/\s/g, '');
        var bankCode = data.bankCode.toLowerCase();
        var isOtherUPI = bankCode === 'otherupi';
        var isGooglePay = bankCode === 'googlepay';
        var appIntentEnabled = options.installedApps.indexOf(name) !== -1 && options.upiIntentEnabled;
        return {
            id: data.id,
            name: name,
            bankCode: bankCode,
            displayName: data.name,
            show: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__.isApp)() ? appIntentEnabled || isOtherUPI : data.popular,
            vpaWithHandle: isGooglePay,
            vpa: isOtherUPI || (isGooglePay && !appIntentEnabled),
            intentEnabled: appIntentEnabled,
            instrumentType: data.instrumentType,
            hasLowSR: data.lowSuccessRate,
            disable: data.disable,
            paymentUrl: data.paymentUrl
        };
    },
    _b);
var TYPE_FORM_PARAMS_MAP = (_c = {},
    _c[COD] = function (onClickParams) { return ({
        paymentMode: COD,
        paymentModeName: COD,
        modeAttributes: {},
        paymentUrl: onClickParams.paymentUrl
    }); },
    _c[SAVED_INSTRUMENT] = function (onClickParams) { return ({
        paymentMode: onClickParams.paymentInstrumentType === 'vpa' ? UPI : 'creditcard',
        paymentModeName: SAVED_INSTRUMENT,
        modeAttributes: {
            useSavedCard: onClickParams.paymentInstrumentType === 'card' ? 'true' : 'false',
            useSavedVpa: onClickParams.vpa ? 'true' : 'false',
            upiSdkEnabled: onClickParams.upiIntentEnabled &&
                onClickParams.installedApps.indexOf(onClickParams.appName) !== -1,
            cvvCode: onClickParams.cvv,
            otherCards: 'false',
            paymentInstrument: onClickParams.id,
            bankCashbackEligible: "".concat(onClickParams.bankDiscount !== 0),
            bankCashbackAmount: onClickParams.bankDiscount,
            addressSel: onClickParams.addressId,
            user: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__.getUidx)()
        },
        paymentUrl: onClickParams.paymentUrl
    }); },
    _c[UPI] = function (onClickParams) { return ({
        paymentMode: UPI,
        paymentModeName: UPI,
        modeAttributes: {
            paymentProviderId: onClickParams.id || '',
            vpa: onClickParams.vpa
                ? "".concat(onClickParams.vpa).concat(onClickParams.selectedHandle)
                : '',
            saveVpa: onClickParams.saveCheck ? 'on' : '',
            upiSdkEnabled: onClickParams.intentEnabled
        },
        paymentUrl: onClickParams.paymentUrl,
        formAttributes: { noValidate: true }
    }); },
    _c[NETBANKING] = function (onClickParams) { return ({
        paymentMode: NETBANKING,
        paymentModeName: NETBANKING,
        modeAttributes: {
            paymentProviderId: onClickParams.id
        },
        paymentUrl: onClickParams.paymentUrl
    }); },
    _c[EMI_TYPE] = function (onClickParams) { return ({
        paymentMode: EMI_PM,
        paymentModeName: EMI_PM_NAME,
        modeAttributes: {
            paymentProviderId: onClickParams.id || ''
        },
        paymentUrl: onClickParams.paymentUrl,
        formAttributes: { noValidate: true }
    }); },
    _c[WALLET_TYPE] = function (onClickParams) { return ({
        paymentMode: onClickParams.directIntegration ? WALLET_PM_DIRECT : WALLET_PM,
        paymentModeName: WALLET_PM_NAME,
        modeAttributes: {
            walletEnabled: 'true',
            paymentProviderId: onClickParams.id || '',
            walletAmount: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_9__.roundNumber)(onClickParams.totalPayable || 0, 2)
        },
        paymentUrl: onClickParams.paymentUrl,
        formAttributes: { noValidate: true }
    }); },
    _c[PAY_LATER] = function (onClickParams) { return ({
        paymentMode: PAY_LATER,
        paymentModeName: PAY_LATER,
        modeAttributes: {
            userProfileMobile: onClickParams.mobile,
            paymentProviderId: 1
        },
        paymentUrl: onClickParams.paymentUrl
    }); },
    _c);
var getInitialState = function (props) {
    var _a;
    var codInstrumentData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(props, 'instrumentData', []).find(function (instrument) { return instrument.type === COD; });
    var twoFAEnabled = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.isTwoFAEnabled)(__assign(__assign({}, props), { instrumentData: codInstrumentData }));
    return {
        selectedId: '',
        selectedName: '',
        selectedRank: '',
        instrumentType: '',
        instrumentList: props.instrumentData,
        payNowFormParams: {
            paymentMode: '',
            paymentModeName: '',
            modeAttributes: {},
            paymentUrl: '',
            formAttributes: {}
        },
        isOptionsCollapsed: props.deviceMode === 'mobile',
        instrumentState: (_a = {},
            _a[SAVED_INSTRUMENT] = {
                installedApps: [],
                upiIntentEnabled: false,
                selectedInstrumentType: '',
                cvv: '',
                cvvError: false,
                vpa: '',
                vpaAppName: '',
                upiSupportedPG: [],
                allowTokenization: false,
                tokenizationFlag: ''
            },
            _a[UPI] = {
                installedApps: [],
                upiIntentEnabled: false,
                vpaRequired: false,
                vpa: '',
                selectedHandle: '',
                handlesShown: false,
                saveCheck: true,
                saveInfoShow: false,
                error: '',
                upiSupportedPG: []
            },
            _a[COD] = {
                errorMessage: '',
                twoFAEnabled: twoFAEnabled,
                captchaEnabled: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('COD_CAPTCHA_ENABLED') && !twoFAEnabled,
                captchaDetails: {
                    id: null,
                    code: null
                }
            },
            _a[PAY_LATER] = {
                mobileValue: '',
                errorMessage: '',
                modalShow: false,
                modalSuccessCallback: null
            },
            _a)
    };
};
var getComponent = function (type) { return TYPE_COMPONENT_MAP[type]; };
var getPayNowFormParams = function (onClickParams) {
    return TYPE_FORM_PARAMS_MAP[onClickParams.instrumentType](onClickParams);
};
var getFormattedData = function (data, options) {
    return TYPE_DATA_FORMATTER_MAP[data.instrumentType]
        ? TYPE_DATA_FORMATTER_MAP[data.instrumentType](data, options)
        : data;
};



/***/ }),

/***/ "./browser/components/payment/common/Options/SavedInstruments/InstrumentCard/index.js":
/*!********************************************************************************************!*\
  !*** ./browser/components/payment/common/Options/SavedInstruments/InstrumentCard/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instrumentCard.base.css */ "./browser/components/payment/common/Options/SavedInstruments/InstrumentCard/instrumentCard.base.css");
/* harmony import */ var _Cashback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Cashback */ "./browser/components/payment/common/Cashback/index.js");
/* harmony import */ var _Cashback_CashbackMsg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Cashback/CashbackMsg */ "./browser/components/payment/common/Cashback/CashbackMsg.js");
/* harmony import */ var commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/ImmobilizeComponent */ "./browser/components/common/ImmobilizeComponent/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/ToolTip */ "./browser/components/common/ToolTip/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! iconComp/CheckboxActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxActive.jsx");
/* harmony import */ var iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! iconComp/CheckboxInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxInactive.jsx");
/* harmony import */ var _SaveCardConsent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../SaveCardConsent */ "./browser/components/payment/common/SaveCardConsent/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
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



// Style Imports.















var InstrumentCard = /** @class */ (function (_super) {
    __extends(InstrumentCard, _super);
    function InstrumentCard(props) {
        var _this = _super.call(this, props) || this;
        _this.savedCardAutoConsentInfo =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__.getKVPairValue)('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') || {};
        _this.state = {
            saveCardConsentHalfCard: false,
            discountApplicable: false
        };
        _this.cvvInput = null;
        _this.setInputRef = _this.setInputRef.bind(_this);
        _this.renderAutoConsentText = _this.renderAutoConsentText.bind(_this);
        _this.toggleAutoConsentCheckbox = _this.toggleAutoConsentCheckbox.bind(_this);
        _this.toggleSavedCardConsentHalfCard = _this.toggleSavedCardConsentHalfCard.bind(_this);
        _this.renderSecuredIcon = _this.renderSecuredIcon.bind(_this);
        _this.cardImageType =
            commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.AVAILABLE_CARD_IMAGES.indexOf(props.cardType) !== -1
                ? 'card-' + props.cardType.toLowerCase()
                : 'card-default';
        var appName = (props.bankCode || '').toLowerCase().replace(/\s/g, '');
        _this.iconDisplayUPI =
            (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_7__.getKVPairValue)('UPI_CONFIG').iconDisplayUPI.indexOf(appName) !== -1
                ? appName
                : 'otherupi';
        _this.isSavingsNudgeEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('CHECKOUT_SAVINGS_NUDGE');
        _this.isInlineOfferForCardEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('INLINE_OFFER_CARD');
        return _this;
    }
    InstrumentCard.prototype.toggleAutoConsentCheckbox = function () {
        triggerEvent('AUTO_CONSENT_SAVED_CARD_CLICK', {
            custom: {
                custom: {
                    v1: !this.props.allowTokenization
                }
            }
        });
        this.props.toggleAllowTokenization();
    };
    InstrumentCard.prototype.toggleSavedCardConsentHalfCard = function () {
        triggerEvent('AUTO_CONSENT_INFO_ICON_CLICK', {
            custom: {
                custom: {
                    v1: 'saved_card',
                    v2: !this.state.saveCardConsentHalfCard
                }
            }
        });
        this.setState(function (prevState) { return ({
            saveCardConsentHalfCard: !prevState.saveCardConsentHalfCard
        }); });
    };
    InstrumentCard.prototype.setInputRef = function (node) {
        this.cvvInput = node;
    };
    InstrumentCard.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.paymentInstrumentType') === 'vpa' &&
            this.props.selected) {
            this.props.updateBankDiscount(0);
        }
        if (!prevProps.selected && this.props.selected) {
            this.cvvInput && this.cvvInput.focus();
        }
        if (!prevProps.cvvError && this.props.cvvError) {
            if (this.cvvInput) {
                this.cvvInput.focus();
                this.cvvInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };
    InstrumentCard.prototype.createCardInfo = function (maskedCardNumber) {
        if (maskedCardNumber === void 0) { maskedCardNumber = ''; }
        return "**** ".concat(maskedCardNumber.slice(-4));
    };
    InstrumentCard.prototype.renderSecuredIcon = function () {
        var isMobile = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'deviceMode') === 'mobile';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(!isMobile ? _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.securedDesktop : '', " ").concat(_instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.secured) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tickIconWrapper },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tickIcon }, "L")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.securedText }, "Secured")));
    };
    InstrumentCard.prototype.getOffer = function (isApplicable) {
        return isApplicable ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.inlineOffer }, "1 Offer")) : null;
    };
    InstrumentCard.prototype.renderDetails = function () {
        var _a = this.props, bankName = _a.bankName, productType = _a.productType, maskedCardNumber = _a.maskedCardNumber, cardHolderName = _a.cardHolderName, expired = _a.expired, inValid = _a.inValid, cardType = _a.cardType, disable = _a.disable, tokenizationConsent = _a.tokenizationConsent, deviceMode = _a.deviceMode;
        var isMobile = deviceMode === 'mobile';
        var cardHeader = bankName || productType
            ? "".concat(bankName || '', " ").concat(productType || '')
            : 'Debit/Credit Card';
        var maestroCard = (cardType || '').toLowerCase() === 'maestro';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.details },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.line },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedDiv, { disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledName, className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.bankName },
                    cardHeader,
                    this.getOffer(this.state.discountApplicable),
                    !this.isInlineOfferForCardEnabled &&
                        tokenizationConsent &&
                        isMobile &&
                        this.renderSecuredIcon()),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedSprite, { disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledSprite, name: this.cardImageType })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.line },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedDiv, { disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledName },
                    this.createCardInfo(maskedCardNumber),
                    (expired || inValid) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expiredText }, expired ? 'Expired' : 'Invalid'))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedDiv, { className: "".concat(_instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.subLine, " ").concat(_instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.rightSubLine), disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledName }, cardHolderName)),
            !this.isInlineOfferForCardEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, tokenizationConsent && !isMobile && this.renderSecuredIcon())),
            maestroCard && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.maestroCard }, "Maestro card not supported"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_10__.default, { elem: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_12__.default, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.tooltipInfoIcon }), className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.toolTipText }, "Banks do not support Maestro cards now for transactions.")))));
    };
    InstrumentCard.prototype.renderAutoConsentText = function () {
        var _a = this.props, _b = _a.bankName, bankName = _b === void 0 ? 'Bank' : _b, allowTokenization = _a.allowTokenization, tokenizationFlag = _a.tokenizationFlag;
        var checkBoxInvalidText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.savedCardAutoConsentInfo, 'checkBoxInvalidText');
        return tokenizationFlag ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.autoConsentCheckbox },
            allowTokenization ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_13__.default, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.selectedCheckboxIcon, onClick: this.toggleAutoConsentCheckbox })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_14__.default, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.checkboxIcon, onClick: this.toggleAutoConsentCheckbox })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.saveCardLabel }, lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.savedCardAutoConsentInfo, 'checkBoxText') ||
                commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_8__.SAVE_CARD_CALLLOUT.validForTokenisationText),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_12__.default, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.savedInfoIcon, onClick: this.toggleSavedCardConsentHalfCard }))) : tokenizationFlag !== '' && checkBoxInvalidText === '' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.consentDisabledText }, (checkBoxInvalidText ||
            commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_8__.SAVE_CARD_CALLLOUT.savedCardInvalidForTokenisationText).replace('%bank', bankName))) : null;
    };
    InstrumentCard.prototype.renderCard = function () {
        var _this = this;
        var _a = this.props, payMode = _a.payMode, instrumentId = _a.instrumentId, updateBankDiscount = _a.updateBankDiscount, _b = _a.cardType, cardType = _b === void 0 ? '' : _b, selected = _a.selected, setCvv = _a.setCvv, cvv = _a.cvv, cvvError = _a.cvvError, cartData = _a.cartData, paymentOptions = _a.paymentOptions, retryGCappliedValue = _a.retryGCappliedValue, handlePaymentAction = _a.handlePaymentAction, expired = _a.expired, inValid = _a.inValid, removeSavedCard = _a.removeSavedCard;
        var maestroCard = (cardType || '').toLowerCase() === 'maestro';
        var cvvMaxLength = cardType === 'AMEX' ? 4 : 3;
        var isFireFoxBrowser = navigator && navigator.userAgent.search('Firefox') !== -1;
        if (expired || inValid || maestroCard) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.expired },
                this.renderDetails(),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.ctaContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-instrumentid": instrumentId, onClick: removeSavedCard, className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.ctaBtn }, "REMOVE CARD"))));
        }
        var additionalComponent = [];
        if (this.isInlineOfferForCardEnabled ||
            selected ||
            this.isSavingsNudgeEnabled) {
            additionalComponent.push(react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Cashback__WEBPACK_IMPORTED_MODULE_3__.default, __assign({ payMode: payMode, cartData: cartData, paymentOptions: paymentOptions, retryGCappliedValue: retryGCappliedValue, instrumentHandle: instrumentId, updateBankDiscount: updateBankDiscount, handlePaymentAction: handlePaymentAction, isClicked: selected, isSavingsNudgeEnabled: this.isSavingsNudgeEnabled, setCashbackApplicable: function (isApplicable) {
                    return _this.setState({ discountApplicable: isApplicable });
                } }, this.props, { render: function (data) { return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Cashback_CashbackMsg__WEBPACK_IMPORTED_MODULE_4__.default, { data: data }); } })));
        }
        return __spreadArray([
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.active },
                this.renderDetails(),
                selected && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", { ref: this.setInputRef, id: "cvv_".concat(instrumentId), type: !isFireFoxBrowser ? 'tel' : 'password', placeholder: "CVV", title: "Card Verification Value Code", maxLength: cvvMaxLength, size: cvvMaxLength, autoComplete: "off", pattern: "\\d*", className: "".concat(_instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvInput, " ").concat(cvvError ? _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.cvvError : ''), onChange: setCvv, value: cvv }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, selected &&
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('PAYMENT_SAVE_CARD_AUTO_CONSENT') &&
                this.renderAutoConsentText())
        ], additionalComponent, true);
    };
    InstrumentCard.prototype.renderVpa = function () {
        var _a = this.props, vpa = _a.vpa, payerAccountName = _a.payerAccountName, disable = _a.disable, offerDetails = _a.offerDetails;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.active },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.detailsUpi },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.line },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedDiv, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.bankName, disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledName },
                        vpa,
                        this.DisplayOffers(offerDetails))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedDiv, { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.line, disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledName }, payerAccountName)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_5__.ImmobilizedSprite, { name: "logo-".concat(this.iconDisplayUPI), disabled: disable, disableClassName: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.disabledSprite })));
    };
    InstrumentCard.prototype.DisplayOffers = function (offerDetails) {
        if (!offerDetails)
            return;
        var numberOfOffers = offerDetails.length || 0;
        var offerString = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_16__.getOfferString)(numberOfOffers);
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.inlineOffer }, offerString);
    };
    InstrumentCard.prototype.render = function () {
        var _a = this.props, paymentInstrumentType = _a.paymentInstrumentType, lowSuccessRate = _a.lowSuccessRate, selected = _a.selected, className = _a.className, id = _a.id, appName = _a.appName, maskedCardNumber = _a.maskedCardNumber, disable = _a.disable, cardType = _a.cardType, offerDetails = _a.offerDetails;
        var instrumentName = paymentInstrumentType === 'vpa' && appName;
        var binNumber = paymentInstrumentType === 'card' ? maskedCardNumber.slice(0, 6) : '';
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className, id: id },
            paymentInstrumentType === 'card'
                ? this.renderCard()
                : this.renderVpa(),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_9__.default, { instrumentType: paymentInstrumentType, binNumber: binNumber, instrumentName: instrumentName, className: _instrumentCard_base_css__WEBPACK_IMPORTED_MODULE_2__.default.warningMsg, show: (selected && lowSuccessRate) || disable, disable: disable }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SaveCardConsent__WEBPACK_IMPORTED_MODULE_15__.default, { toggleShowConsentFn: this.toggleSavedCardConsentHalfCard, showConsent: this.state.saveCardConsentHalfCard, showConsentButton: false, cardType: cardType })));
    };
    return InstrumentCard;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
InstrumentCard.propTypes = {
    instrumentId: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    bankName: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    productType: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    maskedCardNumber: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    cardHolderName: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    expired: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool),
    inValid: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool),
    cardType: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    setCvv: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    onClick: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    cvv: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    updateBankDiscount: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    cvvError: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    handlePaymentAction: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    removeSavedCard: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
    vpa: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    payerAccountName: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
    appName: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InstrumentCard);


/***/ }),

/***/ "./browser/components/payment/common/Options/SavedInstruments/SavedInstrumentCardUI.js":
/*!*********************************************************************************************!*\
  !*** ./browser/components/payment/common/Options/SavedInstruments/SavedInstrumentCardUI.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Radio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Radio */ "./browser/components/common/Radio/index.js");
/* harmony import */ var _InstrumentCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InstrumentCard */ "./browser/components/payment/common/Options/SavedInstruments/InstrumentCard/index.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./savedInstrumentCardUI.base.css */ "./browser/components/payment/common/Options/SavedInstruments/savedInstrumentCardUI.base.css");
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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var rank = _a.rank, payMode = _a.payMode, instrumentInfo = _a.optionData, selectedId = _a.selectedId, cartData = _a.cartData, deviceMode = _a.deviceMode, idPrefix = _a.idPrefix, bankDiscount = _a.bankDiscount, cvv = _a.cvv, cvvError = _a.cvvError, paymentOptions = _a.paymentOptions, retryGCappliedValue = _a.retryGCappliedValue, installedApps = _a.installedApps, upiIntentEnabled = _a.upiIntentEnabled, classNames = _a.classNames, selectInstrument = _a.selectInstrument, removeSavedCard = _a.removeSavedCard, setCvv = _a.setCvv, updateBankDiscount = _a.updateBankDiscount, handlePaymentAction = _a.handlePaymentAction, onActionButtonClick = _a.onActionButtonClick, toggleAllowTokenization = _a.toggleAllowTokenization, allowTokenization = _a.allowTokenization, tokenizationFlag = _a.tokenizationFlag;
    var selected = instrumentInfo.instrumentId === selectedId;
    var maestroCard = (instrumentInfo.cardType || '').toLowerCase() === 'maestro';
    var disable = instrumentInfo.disable;
    if (instrumentInfo.expired || instrumentInfo.inValid || maestroCard) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_InstrumentCard__WEBPACK_IMPORTED_MODULE_2__.default, __assign({ id: "".concat(idPrefix).concat(instrumentInfo.instrumentId), removeSavedCard: removeSavedCard, className: "".concat(_savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__.default.expiredCard, " ").concat(classNames.container), toggleAllowTokenization: toggleAllowTokenization, allowTokenization: allowTokenization, tokenizationFlag: tokenizationFlag, deviceMode: deviceMode }, instrumentInfo)));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__.default.rowContainer, " ").concat(classNames.container) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Radio__WEBPACK_IMPORTED_MODULE_1__.RadioButton, { classes: {
                root: _savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__.default.radioContainer,
                icon: _savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__.default.radioIcon
            }, key: "".concat(idPrefix).concat(instrumentInfo.instrumentId), id: "".concat(idPrefix).concat(instrumentInfo.instrumentId), onClickParams: {
                name: instrumentInfo.paymentInstrumentType,
                cvv: cvv,
                vpa: instrumentInfo.vpa,
                appName: (instrumentInfo.appName || '')
                    .toLowerCase()
                    .replace(/\s/g, ''),
                upiIntentEnabled: upiIntentEnabled,
                installedApps: installedApps,
                bankDiscount: bankDiscount,
                instrumentType: instrumentInfo.instrumentType,
                paymentInstrumentType: instrumentInfo.paymentInstrumentType,
                paymentUrl: instrumentInfo.paymentUrl,
                rank: rank
            }, onClick: selectInstrument, checked: selected, disabled: disable },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_InstrumentCard__WEBPACK_IMPORTED_MODULE_2__.default, __assign({ payMode: payMode, cartData: cartData, setCvv: setCvv, cvv: cvv, cvvError: cvvError, updateBankDiscount: updateBankDiscount, handlePaymentAction: handlePaymentAction, removeSavedCard: removeSavedCard, selected: selected, disable: disable, paymentOptions: paymentOptions, retryGCappliedValue: retryGCappliedValue, toggleAllowTokenization: toggleAllowTokenization, allowTokenization: allowTokenization, tokenizationFlag: tokenizationFlag, deviceMode: deviceMode }, instrumentInfo))),
        deviceMode === 'desktop' && selected && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_3__.default, { text: "PAY NOW", className: _savedInstrumentCardUI_base_css__WEBPACK_IMPORTED_MODULE_4__.default.actionButton, onClick: onActionButtonClick, visible: selected, deviceMode: deviceMode }))));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/SavedInstruments/index.js":
/*!*****************************************************************************!*\
  !*** ./browser/components/payment/common/Options/SavedInstruments/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/set */ "../node_modules/lodash/set.js");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _PurgedCardInfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../PurgedCardInfo */ "./browser/components/payment/common/PurgedCardInfo/index.js");
/* harmony import */ var _SavedInstrumentCardUI__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SavedInstrumentCardUI */ "./browser/components/payment/common/Options/SavedInstruments/SavedInstrumentCardUI.js");
/* harmony import */ var _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./savedInstruments.base.css */ "./browser/components/payment/common/Options/SavedInstruments/savedInstruments.base.css");
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};





//Utilities










var VISIBLE_LIMIT = 3;
var boundFuncs = [
    'setCvv',
    'getModeAttributes',
    'getOptionUI',
    'getInstrumentRow',
    'submitCallback',
    'showMoreOptions',
    'removeSavedCard',
    'getInstrumentDetails',
    'selectInstrument',
    'isCVVOptional',
    'isValidCvv',
    'setActionButtonRef',
    'onActionButtonClick',
    'onRemoveSavedCard',
    'fireEvent',
    'toggleAllowTokenization',
    'setLoader'
];
var SavedInstruments = /** @class */ (function (_super) {
    __extends(SavedInstruments, _super);
    function SavedInstruments(props) {
        var _this = _super.call(this, props) || this;
        var instrumentListArr = _this.getInstrumentDetails();
        _this.state = {
            allowTokenization: false,
            tokenizationFlag: '',
            cardType: '',
            vpa: '',
            vpaAppName: '',
            cvv: '',
            cvvError: false,
            isOptionsCollapsed: props.deviceMode === 'mobile',
            selectedInstrumentId: '',
            selectedInstrumentType: '',
            installedApps: [],
            upiIntentEnabled: false,
            instrumentListArr: instrumentListArr,
            upiSupportedPG: [],
            loading: false
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.fireEvent(instrumentListArr);
        _this.savedCardAutoConsentInfo =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') || {};
        _this.isAutoConsentAutoChecked = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.savedCardAutoConsentInfo, 'autoChecked', true);
        _this.isCardAutoTokenizationEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('PAYMENT_SAVE_CARD_AUTO_CONSENT');
        _this.isPurgedCardEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('SAVED_CARD_CONSENT').purgedCardInfo || {}, 'enabled.savedInstruments');
        return _this;
    }
    SavedInstruments.prototype.fireEvent = function (instrumentListArr) {
        if (instrumentListArr === void 0) { instrumentListArr = []; }
        var typeOfCard = [];
        var bankNames = [];
        instrumentListArr.forEach(function (item) {
            typeOfCard.push(item.productType);
            bankNames.push(item.cardBankName);
        });
        var cartValue = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.price.subTotal');
        triggerEvent('SAVED_CARD_FLAG', {
            custom: {
                custom: {
                    v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getUidx)(),
                    v2: bankNames.join('_'),
                    v3: typeOfCard.join('_'),
                    v4: cartValue
                },
                widget_items: {
                    data_set: {
                        data: [
                            {
                                entity_name: 'payment_saved_cards_offers',
                                entity_optional_attribute: {
                                    uidx: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getUidx)(),
                                    cartValue: cartValue,
                                    bankNames: bankNames.join('_'),
                                    typeOfCard: typeOfCard.join('_')
                                }
                            }
                        ]
                    }
                }
            }
        });
    };
    SavedInstruments.prototype.setLoader = function (loading, callback) {
        this.setState({ loading: loading }, callback);
    };
    SavedInstruments.prototype.toggleAllowTokenization = function () {
        this.setState(function (prevState) { return ({
            allowTokenization: !prevState.allowTokenization
        }); });
    };
    SavedInstruments.prototype.isValidCvv = function () {
        return (this.state.cvv &&
            this.state.cvv.length >= 3 &&
            /^\d*$/.test(this.state.cvv));
    };
    SavedInstruments.prototype.isCVVOptional = function () {
        var _a = this.state, instrumentListArr = _a.instrumentListArr, selectedInstrumentId = _a.selectedInstrumentId;
        var card = instrumentListArr.find(function (card) { return card.instrumentId === selectedInstrumentId; });
        return card && (card.cardType || '').toLowerCase() === 'maestro';
    };
    SavedInstruments.prototype.clearTabSelection = function (callback) {
        var _a = this.props, deviceMode = _a.deviceMode, switchTab = _a.switchTab;
        deviceMode === 'mobile' && switchTab('', { callback: callback });
    };
    SavedInstruments.prototype.componentDidMount = function () {
        this.clearTabSelection();
        this.setInstalledAppsConfig();
        this.setUPIPGs();
        triggerEvent('SAVED_CARD_SELECTED');
    };
    SavedInstruments.prototype.clearSelection = function () {
        this.setState({
            selectedInstrumentId: '',
            selectedInstrumentType: '',
            cvv: '',
            cvvError: false,
            vpa: '',
            vpaAppName: ''
        });
        triggerEvent('CLOSE_SAVED_CARDS');
    };
    SavedInstruments.prototype.setInstalledAppsConfig = function () {
        var _this = this;
        this.setLoader(true, function () {
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__.getInstalledAppsPromise)().then(function (_a) {
                var installedApps = _a.installedApps, upiSDKEnabled = _a.upiSDKEnabled;
                _this.setState({
                    installedApps: installedApps,
                    upiIntentEnabled: upiSDKEnabled && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('UPI_INTENT_ENABLED')
                });
                _this.setLoader(false);
            });
        });
    };
    SavedInstruments.prototype.setUPIPGs = function () {
        var _this = this;
        this.setLoader(true, function () {
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__.getUPISupportedPgPromise)().then(function (pgString) {
                pgString = pgString.replace(/[\[\] ]/g, '').split(',');
                _this.setState({
                    upiSupportedPG: pgString
                });
                _this.setLoader(false);
            });
        });
    };
    SavedInstruments.prototype.setCvv = function (e) {
        if (e === void 0) { e = { target: {} }; }
        var value = e.target.value;
        this.setState({ cvv: value, cvvError: false });
    };
    SavedInstruments.prototype.getModeAttributes = function () {
        var _a = this, bankDiscount = _a.props.bankDiscount, _b = _a.state, upiIntentEnabled = _b.upiIntentEnabled, installedApps = _b.installedApps, vpaAppName = _b.vpaAppName, upiSupportedPG = _b.upiSupportedPG;
        var appIntentEnabled = upiIntentEnabled && installedApps.indexOf(vpaAppName) !== -1;
        var upiPG = {};
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.isAndroidApp)() && appIntentEnabled) {
            upiPG['upiSupportedPG'] = upiSupportedPG;
        }
        var consent = {};
        if (this.isAutoConsentAutoChecked) {
            if (this.state.allowTokenization && this.state.tokenizationFlag) {
                consent['tokenizationConsent'] = 'true';
            }
        }
        else {
            if (!this.state.allowTokenization && this.state.tokenizationFlag) {
                consent['tokenizationConsent'] = 'true';
            }
        }
        return __assign(__assign({ useSavedCard: "".concat(this.state.selectedInstrumentType === 'card'), useSavedVpa: "".concat(this.state.selectedInstrumentType === 'vpa'), upiSdkEnabled: appIntentEnabled, cvvCode: this.state.cvv, otherCards: 'false', paymentInstrument: this.state.selectedInstrumentId, bankCashbackEligible: "".concat(bankDiscount !== 0), bankCashbackAmount: bankDiscount, user: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.getUidx)() }, consent), upiPG);
    };
    SavedInstruments.prototype.getInstrumentDetails = function () {
        var instrumentData = this.props.paymentConfig.instrumentData;
        var savedInstruments = instrumentData[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT];
        var dataArr = __spreadArray([], (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(savedInstruments, 'paymentInstrumentDetails.data', []) || []), true);
        var inValidInstruments = [], validInstruments = [];
        dataArr.forEach(function (info) {
            if (info.expired ||
                info.inValid ||
                (info.cardType || '').toLowerCase() === 'maestro') {
                inValidInstruments.push(info);
            }
            else {
                validInstruments.push(info);
            }
        });
        return validInstruments.concat(inValidInstruments);
    };
    SavedInstruments.prototype.showMoreOptions = function () {
        this.setState({
            isOptionsCollapsed: false
        });
    };
    SavedInstruments.prototype.onRemoveSavedCard = function (instrumentId) {
        var _a = this.props, paymentConfig = _a.paymentConfig, updatePageData = _a.updatePageData;
        var updatedConfig = __assign({}, paymentConfig);
        var instrumentData = updatedConfig.instrumentData;
        var SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT;
        var dataArr = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(instrumentData[SAVED_INSTRUMENT], 'paymentInstrumentDetails.data', []);
        lodash_set__WEBPACK_IMPORTED_MODULE_2___default()(instrumentData[SAVED_INSTRUMENT], 'paymentInstrumentDetails.data', dataArr.filter(function (item) {
            return item.instrumentId !== instrumentId;
        }));
        updatePageData(updatedConfig, { updateKey: 'paymentConfig' });
    };
    SavedInstruments.prototype.removeSavedCard = function (event) {
        var _this = this;
        var instrumentId = event.target.getAttribute('data-instrumentid');
        if (instrumentId) {
            var instrumentListArr_1 = this.state.instrumentListArr;
            commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_8__.default.removeSavedCard(instrumentId, function (res) {
                (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.successNotification)({
                    message: 'Card successfully removed.'
                });
                _this.setState({
                    instrumentListArr: instrumentListArr_1.filter(function (details) { return details.instrumentId !== instrumentId; })
                });
                _this.onRemoveSavedCard(instrumentId);
                triggerEvent('REMOVE_EXPIRED_CARD', {
                    maData: {
                        entity_type: 'remove expired card',
                        entity_name: 'expired card',
                        entity_id: instrumentId
                    }
                });
            }, commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.errorNotification);
        }
    };
    SavedInstruments.prototype.selectInstrument = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedInstrumentId, instrumentListArr, instrumentData, appName, eligibleForTokenization, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedInstrumentId = val.slice(16);
                        if (selectedInstrumentId === this.state.selectedInstrumentId) {
                            return [2 /*return*/];
                        }
                        instrumentListArr = this.state.instrumentListArr;
                        instrumentData = instrumentListArr.find(function (obj) { return obj.instrumentId === selectedInstrumentId; });
                        appName = (instrumentData.appName || '')
                            .toLowerCase()
                            .replace(/\s/g, '');
                        this.setState({
                            allowTokenization: false,
                            tokenizationFlag: '',
                            cardType: instrumentData.cardType,
                            selectedInstrumentId: selectedInstrumentId,
                            selectedInstrumentType: instrumentData.paymentInstrumentType,
                            cvv: '',
                            cvvError: false,
                            vpa: instrumentData.vpa || '',
                            vpaAppName: appName
                        }, function () {
                            _this.clearTabSelection();
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(instrumentData.paymentInstrumentType === 'card' &&
                            !instrumentData.tokenizationConsent)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_8__.default.getCardType(instrumentData.maskedCardNumber)];
                    case 2:
                        eligibleForTokenization = (_a.sent()).eligibleForTokenization;
                        if (eligibleForTokenization) {
                            this.setState({
                                allowTokenization: true,
                                tokenizationFlag: true
                            });
                        }
                        else {
                            this.setState({
                                tokenizationFlag: false
                            });
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SavedInstruments.prototype.getInstrumentRow = function (instrumentInfo, index) {
        var _a = this, _b = _a.state, selectedInstrumentId = _b.selectedInstrumentId, isOptionsCollapsed = _b.isOptionsCollapsed, cvv = _b.cvv, cvvError = _b.cvvError, allowTokenization = _b.allowTokenization, tokenizationFlag = _b.tokenizationFlag, _c = _a.props, cartData = _c.cartData, updateBankDiscount = _c.updateBankDiscount, handlePaymentAction = _c.handlePaymentAction, deviceMode = _c.deviceMode, payMode = _c.payMode, paymentOptions = _c.paymentOptions, retryGCappliedValue = _c.retryGCappliedValue, removeSavedCard = _a.removeSavedCard, selectInstrument = _a.selectInstrument, setCvv = _a.setCvv, onActionButtonClick = _a.onActionButtonClick, toggleAllowTokenization = _a.toggleAllowTokenization;
        var containerClassName = '';
        if (deviceMode === 'mobile') {
            containerClassName =
                isOptionsCollapsed && index + 1 > VISIBLE_LIMIT ? _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.hide : '';
        }
        else {
            containerClassName = _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.fullWidth;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_SavedInstrumentCardUI__WEBPACK_IMPORTED_MODULE_12__.default, { payMode: payMode, optionData: instrumentInfo, selectedId: selectedInstrumentId, cartData: cartData, deviceMode: deviceMode, idPrefix: "savedinstrument-", cvv: cvv, cvvError: cvvError, paymentOptions: paymentOptions, retryGCappliedValue: retryGCappliedValue, classNames: { container: containerClassName }, selectInstrument: selectInstrument, removeSavedCard: removeSavedCard, setCvv: setCvv, updateBankDiscount: updateBankDiscount, handlePaymentAction: handlePaymentAction, onActionButtonClick: onActionButtonClick, toggleAllowTokenization: toggleAllowTokenization, allowTokenization: this.isAutoConsentAutoChecked ? allowTokenization : !allowTokenization, tokenizationFlag: tokenizationFlag }));
    };
    SavedInstruments.prototype.getOptionUI = function () {
        var _a = this, _b = _a.state, instrumentListArr = _b.instrumentListArr, isOptionsCollapsed = _b.isOptionsCollapsed, deviceMode = _a.props.deviceMode, isPurgedCardEnabled = _a.isPurgedCardEnabled;
        var isSavedCardPresent = false;
        isSavedCardPresent = instrumentListArr.some(function (instrument) {
            return (instrument.paymentInstrumentType === 'card' &&
                !instrument.expired &&
                !instrument.disable &&
                !instrument.invalid);
        });
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            deviceMode === 'mobile' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.savedInstrumentMobileHeading }, "SAVED PAYMENT OPTIONS")) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.savedInstrumentDesktopHeading }, "Pay using saved options")),
            isPurgedCardEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PurgedCardInfo__WEBPACK_IMPORTED_MODULE_11__.default, { deviceMode: deviceMode, show: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.paymentOptions.savedCardPurged'), isSavedCardPresent: isSavedCardPresent })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.savedInstrumentContainer },
                instrumentListArr.map(this.getInstrumentRow),
                isOptionsCollapsed && instrumentListArr.length > VISIBLE_LIMIT && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.showMore, onClick: this.showMoreOptions }, "+".concat(instrumentListArr.length - VISIBLE_LIMIT, " More saved option").concat(instrumentListArr.length - VISIBLE_LIMIT > 1 ? "s" : ''))))));
    };
    SavedInstruments.prototype.submitCallback = function (done) {
        var _a = this.state, instrumentListArr = _a.instrumentListArr, selectedInstrumentId = _a.selectedInstrumentId, selectedInstrumentType = _a.selectedInstrumentType, cvv = _a.cvv, upiIntentEnabled = _a.upiIntentEnabled, installedApps = _a.installedApps, vpaAppName = _a.vpaAppName;
        var valid = false;
        var message = '';
        if (!selectedInstrumentId) {
            message = 'Select a payment option to place order.';
        }
        else if (selectedInstrumentType === 'card') {
            if (this.isCVVOptional() || this.isValidCvv()) {
                valid = true;
            }
            else {
                this.setState({ cvvError: true });
                if (cvv) {
                    message = 'Invalid CVV, please enter a valid CVV.';
                }
                else {
                    message = 'Enter CVV to place order.';
                }
            }
        }
        else if (selectedInstrumentType === 'vpa') {
            console.log('[Checkout savedInstruments] upiSdkEnabled: ', upiIntentEnabled && installedApps.indexOf(vpaAppName) !== -1);
            valid = true;
        }
        if (valid) {
            var instrumentData = instrumentListArr.find(function (obj) { return obj.instrumentId === selectedInstrumentId; });
            triggerEvent('CARD_SUBMIT');
            triggerEvent('PAYMENT_OPTION_SUBMIT', {
                custom: {
                    custom: {
                        v1: "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT, ", ").concat(instrumentData.paymentInstrumentType),
                        v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT,
                        v3: this.props.rank,
                        v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                    },
                    widget_items: {
                        data_set: {
                            entity_name: 'payment_option',
                            entity_id: 'payment_option'
                        }
                    }
                }
            });
            done();
        }
        else {
            SHELL.alert('info', {
                message: message,
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.setLoader(false);
        }
    };
    SavedInstruments.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    SavedInstruments.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    SavedInstruments.prototype.render = function () {
        if (!this.state.instrumentListArr || !this.state.instrumentListArr.length) {
            var isSavedCardPurged = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.paymentOptions.savedCardPurged');
            if (isSavedCardPurged && isPurgedCardEnabled) {
                var _a = this, deviceMode = _a.props.deviceMode, isPurgedCardEnabled = _a.isPurgedCardEnabled;
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                    deviceMode === 'mobile' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.savedInstrumentMobileHeading }, "SAVED PAYMENT OPTIONS")) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _savedInstruments_base_css__WEBPACK_IMPORTED_MODULE_13__.default.savedInstrumentDesktopHeading }, "Pay using saved options")),
                    isPurgedCardEnabled && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PurgedCardInfo__WEBPACK_IMPORTED_MODULE_11__.default, { deviceMode: deviceMode, show: isSavedCardPurged }))));
            }
            return '';
        }
        var _b = this, props = _b.props, _c = _b.props, instrumentData = _c.paymentConfig.instrumentData, payMode = _c.payMode, retrySessionEnabled = _c.retrySessionEnabled, _d = _b.state, selectedInstrumentType = _d.selectedInstrumentType, cardType = _d.cardType, allowTokenization = _d.allowTokenization, tokenizationFlag = _d.tokenizationFlag, loading = _d.loading;
        var paymentUrl = instrumentData[commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT].paymentInstrumentDetails.paymentUrl;
        var isTokenizationConsentTaken = this.isCardAutoTokenizationEnabled &&
            this.isAutoConsentAutoChecked &&
            tokenizationFlag;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, props, { allowTokenization: isTokenizationConsentTaken ? !allowTokenization : allowTokenization, isTokenizationConsentTaken: isTokenizationConsentTaken, cardType: cardType, paymentUrl: paymentUrl, paymentMode: selectedInstrumentType === 'vpa'
                    ? commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.UPI
                    : commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.CREDIT_CARD, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT, actionData: {
                    hide: true,
                    disable: payMode === 'retry' && !retrySessionEnabled
                }, optionUI: this.getOptionUI(), modeAttributes: this.getModeAttributes(), submitCallback: this.submitCallback, setActionButtonRef: this.setActionButtonRef, paymentInstrument: selectedInstrumentType === 'vpa'
                    ? commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.UPI
                    : commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.NETBANKING })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_10__.default, { show: loading, backdrop: true })));
    };
    return SavedInstruments;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
SavedInstruments.defaultProps = {
    switchTab: function () { }
};
SavedInstruments.propTypes = {
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object.isRequired),
    paymentConfig: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object.isRequired),
    updatePageData: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavedInstruments);


/***/ }),

/***/ "./browser/components/payment/common/Options/Upi/UpiComponents.js":
/*!************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Upi/UpiComponents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionUI": () => (/* binding */ OptionUI),
/* harmony export */   "UPIApp": () => (/* binding */ UPIApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var commonComp_InputWithDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/InputWithDropdown */ "./browser/components/common/InputWithDropdown/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./upiComponents.base.css */ "./browser/components/payment/common/Options/Upi/upiComponents.base.css");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! iconComp/CheckboxActive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxActive.jsx");
/* harmony import */ var iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! iconComp/CheckboxInactive.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CheckboxInactive.jsx");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var _OfferBanner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../OfferBanner */ "./browser/components/payment/common/OfferBanner/index.js");
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













var DisplayOffers = function (_a) {
    var optionData = _a.optionData;
    var numberOfOffers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(optionData, 'offerDetails', '').length || 0;
    var offerString = numberOfOffers > 0 ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_6__.getOfferString)(numberOfOffers) : '';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.cardText },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.displayMain }, optionData.displayName),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.inlineOffer }, offerString)));
};
var VISIBLE_LIMIT = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('UPI_CONFIG'), 'visible_limit') || 3;
var OptionUI = /** @class */ (function (_super) {
    __extends(OptionUI, _super);
    function OptionUI(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOptionsCollapsed: props.deviceMode === 'mobile'
        };
        _this.showMoreOptions = _this.showMoreOptions.bind(_this);
        return _this;
    }
    OptionUI.prototype.showMoreOptions = function () {
        this.setState({
            isOptionsCollapsed: false
        });
    };
    OptionUI.prototype.render = function () {
        var _a = this.props, setRef = _a.setRef, appsConfig = _a.appsConfig, selectApp = _a.selectApp, offerData = _a.offerData, selectedAppId = _a.selectedAppId, onActionButtonClick = _a.onActionButtonClick, deviceMode = _a.deviceMode, vpaFieldProps = __rest(_a, ["setRef", "appsConfig", "selectApp", "offerData", "selectedAppId", "onActionButtonClick", "deviceMode"]);
        var isOptionsCollapsed = this.state.isOptionsCollapsed;
        var upiListLength = 0;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { ref: setRef },
            deviceMode !== 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.heading }, "Pay using UPI")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, Object.keys(appsConfig)
                .sort(function (key1, key2) { return appsConfig[key1].order - appsConfig[key2].order; })
                .map(function (id) {
                var containerClassName = '';
                if (appsConfig[id].show) {
                    if (deviceMode === 'mobile') {
                        containerClassName =
                            isOptionsCollapsed && upiListLength + 1 > VISIBLE_LIMIT
                                ? _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.hide
                                : '';
                    }
                    upiListLength++;
                }
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(UPIApp, __assign({ key: id, optionData: appsConfig[id], selectedId: selectedAppId, idPrefix: 'upiApp-', selectInstrument: selectApp, onActionButtonClick: onActionButtonClick, deviceMode: deviceMode, classNames: { container: containerClassName }, offerData: offerData }, vpaFieldProps)));
            })),
            isOptionsCollapsed && upiListLength > VISIBLE_LIMIT && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.showMore, onClick: this.showMoreOptions }, "+".concat(upiListLength - VISIBLE_LIMIT, " More UPI option").concat(upiListLength - VISIBLE_LIMIT > 1 ? "s" : '')))));
    };
    return OptionUI;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
var VPAField = function (_a) {
    var error = _a.error, saveInfoShow = _a.saveInfoShow, saveCheck = _a.saveCheck, toggleSaveInfo = _a.toggleSaveInfo, toggleCheckbox = _a.toggleCheckbox, onInputChange = _a.onInputChange, vpa = _a.vpa, handles = _a.handles, withHandle = _a.withHandle, selectedHandle = _a.selectedHandle, handlesShown = _a.handlesShown, toggleHandles = _a.toggleHandles, selectHandle = _a.selectHandle, deviceMode = _a.deviceMode, hasLowSR = _a.hasLowSR, instrumentName = _a.instrumentName, instrumentType = _a.instrumentType;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.vpaField },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InputWithDropdown__WEBPACK_IMPORTED_MODULE_4__.default, { inputContainerClass: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.inputWithDropdown, withDropdown: withHandle, entries: handles, selectedEntry: selectedHandle, entriesShown: handlesShown, toggleEntries: toggleHandles, selectEntry: selectHandle, deviceMode: deviceMode, placeholder: "Enter UPI ID here", onChange: onInputChange, value: vpa, error: error }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_8__.default, { instrumentType: instrumentType, instrumentName: instrumentName, className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.lowSRMessage, show: hasLowSR }),
        !!vpa && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.saveUpiBlock },
            saveCheck ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxActive_jsx__WEBPACK_IMPORTED_MODULE_9__.default, { className: "".concat(_upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.checkIcon, " ").concat(_upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.checked), onClick: toggleCheckbox })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_CheckboxInactive_jsx__WEBPACK_IMPORTED_MODULE_10__.default, { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.checkIcon, onClick: toggleCheckbox })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.saveText }, "Save UPI ID for faster payments"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_11__.default, { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.saveInfoIcon, onClick: toggleSaveInfo }),
            saveInfoShow ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.saveInfo }, "Save your UPI ID with us to make your next purchase quick and easy. Your UPI ID information will be 100% safe with us. We do not save your MPIN.")) : null))));
};
var UPIApp = function (_a) {
    var context = _a.context, rank = _a.rank, app = _a.optionData, selectedId = _a.selectedId, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick, deviceMode = _a.deviceMode, idPrefix = _a.idPrefix, classNames = _a.classNames, optionData = _a.optionData, vpaFieldProps = __rest(_a, ["context", "rank", "optionData", "selectedId", "selectInstrument", "onActionButtonClick", "deviceMode", "idPrefix", "classNames", "optionData"]);
    var iconDisplayUPI = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_5__.getKVPairValue)('UPI_CONFIG').iconDisplayUPI;
    var appId = "".concat(app.id);
    var selected = selectedId === appId;
    var displayIcon = iconDisplayUPI.indexOf(app.bankCode) !== -1 ? app.bankCode : 'otherupi';
    var hasLowSR = app.hasLowSR;
    var disabled = app.disable;
    var instrumentName = app.name === 'googlepay' ? 'Google Pay' : 'UPI';
    var offerData = optionData.offerDetails || '';
    var renderedCarouselItems = offerData
        ? offerData.map(function (data) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: data.message }, data.message);
        })
        : null;
    return app.show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__.default, { id: "".concat(idPrefix).concat(appId), key: "".concat(idPrefix).concat(appId), selected: selected, iconName: "logo-".concat(displayIcon), iconConfig: { position: context === 'reco' ? 'right' : 'left' }, displayName: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayOffers, { optionData: app }), classNames: classNames, onClickParams: {
            name: app.displayName,
            vpaRequired: app.vpa,
            intentEnabled: app.intentEnabled,
            vpa: vpaFieldProps.vpa,
            vpaWithHandle: app.vpaWithHandle,
            selectedHandle: vpaFieldProps.selectedHandle,
            saveCheck: vpaFieldProps.saveCheck,
            instrumentType: app.instrumentType,
            paymentUrl: app.paymentUrl,
            rank: rank
        }, offerData: offerData, onClick: selectInstrument, disabled: disabled },
        selected ? (app.vpa ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(VPAField, __assign({}, vpaFieldProps, { deviceMode: deviceMode, withHandle: app.vpaWithHandle, hasLowSR: hasLowSR, instrumentName: instrumentName, instrumentType: app.instrumentType }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_8__.default, { instrumentType: app.instrumentType, instrumentName: app.displayName, className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.lowSRMessage, show: hasLowSR }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_8__.default, { instrumentType: app.instrumentType, instrumentName: app.displayName, className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.lowSRMessage, show: disabled, disable: disabled })),
        selected && renderedCarouselItems && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_OfferBanner__WEBPACK_IMPORTED_MODULE_12__.default, { selected: selected, offerData: offerData, deviceMode: deviceMode, name: app.displayName })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_2__.default, { text: "PAY NOW", className: _upiComponents_base_css__WEBPACK_IMPORTED_MODULE_7__.default.actionButton, onClick: onActionButtonClick, visible: selected, deviceMode: deviceMode }))) : null;
};



/***/ }),

/***/ "./browser/components/payment/common/Options/Upi/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/Options/Upi/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeName": () => (/* binding */ sanitizeName),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/pick */ "../node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var _UpiComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UpiComponents */ "./browser/components/payment/common/Options/Upi/UpiComponents.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentsManager */ "./browser/utils/PaymentsManager.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
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














var optionUIHandlers = [
    'selectApp',
    'selectHandle',
    'onInputChange',
    'toggleCheckbox',
    'toggleHandles',
    'toggleSaveInfo',
    'onActionButtonClick',
    'setRef'
];
var sanitizeName = function (name) {
    /*
     convert to lowercase and remove spaces
    */
    return name.toLowerCase().replace(/\s/g, '');
};
var Upi = /** @class */ (function (_super) {
    __extends(Upi, _super);
    function Upi(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            appsConfig: _this.appsConfigCallback({}),
            selectedAppId: '',
            vpa: '',
            selectedHandle: '',
            handlesShown: false,
            saveCheck: true,
            saveInfoShow: false,
            error: '',
            upiSupportedPG: [],
            loading: false
        };
        __spreadArray([
            'getValidity',
            'submitCallback',
            'setActionButtonRef',
            'appsConfigCallback',
            'setUPIPGs',
            'filterAppsForLowSR',
            'setLoader'
        ], optionUIHandlers, true).forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.handles = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('UPI_CONFIG').vpaHandles;
        var _a = _this.props, offer = _a.offer, instrumentData = _a.instrumentData;
        _this.props.updateBankDiscount(0);
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('INLINE_OFFER') &&
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.addOffersToInstrumentDetails)(offer, instrumentData);
        return _this;
    }
    Upi.prototype.componentDidMount = function () {
        var _this = this;
        this.setLoader(true, function () {
            var appsConfigPromise = _this.getAppsConfigPromise();
            _this.setUPIPGs();
            appsConfigPromise.then(function (appsConfig) {
                _this.setState({ appsConfig: _this.filterAppsForLowSR(appsConfig) });
                _this.setLoader(false);
            });
        });
    };
    Upi.prototype.setLoader = function (loading, callback) {
        this.setState({ loading: loading }, callback);
    };
    Upi.prototype.filterAppsForLowSR = function (apps) {
        if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('LOW_SR_OPTIONS_REMOVE')) {
            return apps;
        }
        var filteredApps = {};
        var keys = Object.keys(apps);
        keys.forEach(function (key) {
            if (!apps[key].hasLowSR && apps[key].show) {
                filteredApps[key] = apps[key];
            }
        });
        return Object.keys(filteredApps).length > 0 ? filteredApps : apps;
    };
    Upi.prototype.sortUPI = function () {
        var supportedUPI = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('PAYMENT_OPTION_REORDER') &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.userDetails.isFirstTimeCustomer', false)
            ? (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('UPI_CONFIG').firstTimeCustomerUPI
            : (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('UPI_CONFIG').supportedUPI;
        supportedUPI = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('GPAY_ABOVE_PHONEPE')
            ? (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('UPI_CONFIG').gpayFirst
            : supportedUPI;
        var allUPI = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];
        var paymentPersonalizationConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_8__.getKVPairValue)('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
        if (((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT3') ||
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT4')) &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')) {
            return allUPI.filter(function (upi) { return supportedUPI.indexOf(upi.bankCode.toLowerCase()) !== -1; });
        }
        else {
            return supportedUPI.reduce(function (acc, upiCode) {
                var upi = allUPI.find(function (upiObj) {
                    var bankCode = upiObj.bankCode.toLowerCase();
                    return bankCode === upiCode;
                });
                upi && acc.push(upi);
                return acc;
            }, []);
        }
    };
    Upi.prototype.getModeAttributes = function () {
        var _a = this.state, appsConfig = _a.appsConfig, vpa = _a.vpa, selectedHandle = _a.selectedHandle, selectedAppId = _a.selectedAppId, saveCheck = _a.saveCheck, upiSupportedPG = _a.upiSupportedPG;
        var baseModeAttributes = {
            paymentProviderId: selectedAppId || '',
            vpa: vpa ? "".concat(vpa).concat(selectedHandle) : '',
            upiSdkEnabled: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(appsConfig, "".concat(selectedAppId, ".intentEnabled"), '') || ''
        };
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_11__.isAndroidApp)() && vpa === '') {
            baseModeAttributes['upiSupportedPG'] = upiSupportedPG;
        }
        return __assign(__assign({}, baseModeAttributes), { saveVpa: saveCheck ? 'on' : '' });
    };
    Upi.prototype.appsConfigCallback = function (_a) {
        var _this = this;
        var _b = _a.upiSDKEnabled, upiSDKEnabled = _b === void 0 ? false : _b, _c = _a.installedApps, installedApps = _c === void 0 ? [] : _c;
        var instrumentType = this.props.instrumentData.type;
        var upiList = this.sortUPI();
        var _isApp = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_11__.isApp)();
        this.upiIntentEnabled =
            upiSDKEnabled && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('UPI_INTENT_ENABLED');
        return upiList.reduce(function (acc, upiOption, order) {
            var bankCode = upiOption.bankCode.toLowerCase();
            var name = sanitizeName(bankCode);
            var isOtherUPI = bankCode === 'otherupi';
            var isGooglePay = bankCode === 'googlepay';
            var appIntentEnabled = installedApps.indexOf(name) !== -1 && _this.upiIntentEnabled;
            /*
             * App will be shown if
             *  - it is listed in UPI_CONFIG.supportedUPI
             *  - it is popular
             *  - if not popular, it favors intent flow (app is installed, upi intent FG is enabled and upi sdk is enabled)
             * App will show vpa field if
             *   - it is "Others UPI" option
             *   - it is "Google Pay" option and it does not favor intent flow
             * App will show vpa field with handles if
             *  - it is "Google Pay"
             */
            acc["".concat(upiOption.id)] = {
                id: upiOption.id,
                name: name,
                displayName: upiOption.name,
                bankCode: bankCode,
                show: _isApp ? appIntentEnabled || isOtherUPI : upiOption.popular,
                vpaWithHandle: isGooglePay,
                vpa: isOtherUPI || (isGooglePay && !appIntentEnabled),
                intentEnabled: appIntentEnabled,
                instrumentType: instrumentType,
                hasLowSR: upiOption.lowSuccessRate,
                disable: upiOption.disable,
                order: order,
                offerDetails: upiOption.offerDetails
            };
            return acc;
        }, {} //initial value
        );
    };
    Upi.prototype.getAppsConfigPromise = function () {
        var _this = this;
        return new Promise(function (resolve) {
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getInstalledAppsPromise)().then(function (_a) {
                var installedApps = _a.installedApps, upiSDKEnabled = _a.upiSDKEnabled;
                resolve(_this.appsConfigCallback({
                    installedApps: installedApps,
                    upiSDKEnabled: upiSDKEnabled
                }));
            });
        });
    };
    Upi.prototype.setUPIPGs = function () {
        var _this = this;
        (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getUPISupportedPgPromise)().then(function (pgString) {
            pgString = pgString.replace(/[\[\] ]/g, '').split(',');
            _this.setState({
                upiSupportedPG: pgString
            });
        });
    };
    Upi.prototype.onInputChange = function (e) {
        this.setState({
            vpa: e.currentTarget.value
        });
    };
    Upi.prototype.toggleHandles = function () {
        this.setState(function (prevState) { return ({ handlesShown: !prevState.handlesShown }); });
    };
    Upi.prototype.toggleCheckbox = function () {
        this.setState(function (prevState) { return ({ saveCheck: !prevState.saveCheck }); });
    };
    Upi.prototype.toggleSaveInfo = function () {
        this.setState(function (prevState) { return ({ saveInfoShow: !prevState.saveInfoShow }); });
    };
    Upi.prototype.selectHandle = function (e) {
        this.setState({
            selectedHandle: e.currentTarget.id.slice(6),
            handlesShown: false
        });
    };
    Upi.prototype.selectApp = function (val) {
        var appId = val.slice(7);
        if (appId !== this.state.selectedAppId) {
            var app = this.state.appsConfig[appId];
            triggerEvent('PAYMENT_UPI_OPTION_SELECT', { gaLabel: app.name });
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.inlineOfferWidgetLoadEvent)('upi', app.name, app.offerDetails ? true : false);
            this.setState({
                selectedAppId: appId,
                vpa: '',
                error: '',
                selectedHandle: app.vpaWithHandle ? this.handles[0] : ''
            });
        }
    };
    Upi.prototype.getValidity = function () {
        var _a = this.state, appsConfig = _a.appsConfig, vpa = _a.vpa, selectedAppId = _a.selectedAppId;
        var validity = { valid: true, message: '', toast: false };
        if (!selectedAppId) {
            validity.valid = false;
            validity.message = 'Select a payment option to place order.';
            validity.toast = true;
        }
        var isVPAEmpty = selectedAppId && appsConfig[selectedAppId].vpa && !(vpa && vpa.trim());
        if (isVPAEmpty) {
            validity.valid = false;
            validity.message = 'Please enter UPI ID';
        }
        return validity;
    };
    Upi.prototype.setRef = function (node) {
        this.optionUI = node;
    };
    Upi.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    Upi.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    Upi.prototype.getOptionUI = function () {
        var _a = this, state = _a.state, handles = _a.handles, deviceMode = _a.props.deviceMode;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_UpiComponents__WEBPACK_IMPORTED_MODULE_5__.OptionUI, __assign({}, state, { handles: handles, deviceMode: deviceMode }, lodash_pick__WEBPACK_IMPORTED_MODULE_2___default()(this, optionUIHandlers))));
    };
    Upi.prototype.scrollToView = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_11__.scrollIntoView)(this.optionUI, {
            behavior: 'smooth',
            block: 'center'
        });
    };
    Upi.prototype.triggerSubmitEvent = function () {
        var app = this.state.appsConfig[this.state.selectedAppId];
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.UPI, ", ").concat(app.name),
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.UPI,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
    };
    Upi.prototype.submitCallback = function (done) {
        var _this = this;
        var _a = this, _b = _a.state, vpa = _b.vpa, selectedHandle = _b.selectedHandle, getValidity = _a.getValidity;
        var validity = getValidity();
        if (validity.valid) {
            if (vpa) {
                commonBrowserUtils_PaymentsManager__WEBPACK_IMPORTED_MODULE_7__.default.validateVPA("".concat(vpa).concat(selectedHandle), function () {
                    _this.triggerSubmitEvent();
                    done();
                }, function (err) {
                    _this.setLoader(false);
                    _this.setState({
                        error: err.message
                    });
                    _this.scrollToView();
                });
            }
            else {
                this.triggerSubmitEvent();
                done();
            }
        }
        else {
            if (validity.toast) {
                SHELL.alert('info', {
                    message: validity.message,
                    styleOverrides: {
                        notifyMainDiv: "bottom: 82px;"
                    }
                });
            }
            else {
                this.setState({
                    error: validity.message
                });
                this.scrollToView();
            }
            this.setLoader(false);
        }
    };
    Upi.prototype.render = function () {
        var _a = this, props = _a.props, _b = _a.props, _c = _b.instrumentData, code = _c.code, paymentUrl = _c.paymentInstrumentDetails.paymentUrl, payMode = _b.payMode, retrySessionEnabled = _b.retrySessionEnabled;
        var loading = this.state.loading;
        return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_ELIGIBLE_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, props, { paymentUrl: paymentUrl, paymentMode: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.UPI, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.UPI, formAttributes: { noValidate: true }, modeAttributes: this.getModeAttributes(), optionUI: this.getOptionUI(), submitCallback: this.submitCallback, setActionButtonRef: this.setActionButtonRef, actionData: {
                    hide: true,
                    disable: payMode === 'retry' && !retrySessionEnabled
                }, paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.UPI })),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_12__.default, { show: loading, backdrop: true }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_4__.default, { option: "UPI", code: code }));
    };
    return Upi;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
Upi.propTypes = {
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().string),
    updateStickyButton: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().func)
};
Upi.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Upi);


/***/ }),

/***/ "./browser/components/payment/common/Options/WalletTab/index.js":
/*!**********************************************************************!*\
  !*** ./browser/components/payment/common/Options/WalletTab/index.js ***!
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
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _walletTab_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./walletTab.base.css */ "./browser/components/payment/common/Options/WalletTab/walletTab.base.css");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
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






var WalletTab = /** @class */ (function (_super) {
    __extends(WalletTab, _super);
    function WalletTab(props) {
        var _this = _super.call(this, props) || this;
        _this.paymentModeName = props.wallet.name.toLowerCase();
        return _this;
    }
    WalletTab.prototype.componentDidMount = function () {
        var paymentModeAction = document.getElementById("action-".concat(this.paymentModeName));
        paymentModeAction && paymentModeAction.click();
    };
    WalletTab.prototype.getModeAttributes = function () {
        var props = this.props;
        return {
            walletEnabled: 'true',
            paymentProviderId: props.wallet.id || '',
            walletAmount: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_4__.roundNumber)(this.props.totalPayable || 0, 2)
        };
    };
    WalletTab.prototype.render = function () {
        var _a = this, props = _a.props, paymentModeName = _a.paymentModeName;
        var paymentMode = props.wallet.directIntegration
            ? commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.WALLET_PM_DIRECT
            : commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.WALLET_PM;
        var paymentUrl = this.props.instrumentData.paymentInstrumentDetails.paymentUrl;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _walletTab_base_css__WEBPACK_IMPORTED_MODULE_2__.default.container },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_1__.default, __assign({}, props, { paymentUrl: paymentUrl, paymentMode: paymentMode, paymentModeName: paymentModeName, formAttributes: { noValidate: true }, deviceMode: props.deviceMode, modeAttributes: this.getModeAttributes(), paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.WALLET }))));
    };
    return WalletTab;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
WalletTab.propTypes = {
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
    wallet: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
    instrumentData: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WalletTab);


/***/ }),

/***/ "./browser/components/payment/common/Options/Wallets/WalletCardUI.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Wallets/WalletCardUI.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ActionButton */ "./browser/components/payment/common/ActionButton/index.js");
/* harmony import */ var _PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PaymentSubOption */ "./browser/components/payment/common/PaymentSubOption/index.js");
/* harmony import */ var _LowSRMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../LowSRMessage */ "./browser/components/payment/common/LowSRMessage/index.js");
/* harmony import */ var _walletHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./walletHelper */ "./browser/components/payment/common/Options/Wallets/walletHelper.js");
/* harmony import */ var _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./walletCardUI.base.css */ "./browser/components/payment/common/Options/Wallets/walletCardUI.base.css");
/* harmony import */ var _OfferBanner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../OfferBanner */ "./browser/components/payment/common/OfferBanner/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");









var DisplayOffers = function (_a) {
    var optionData = _a.optionData;
    var numberOfOffers = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(optionData, 'offerDetails', '').length || 0;
    var offerString = numberOfOffers > 0 ? (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_8__.getOfferString)(numberOfOffers) : '';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__.default.cardText },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__.default.displayMain }, optionData.name),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__.default.inlineOffer }, offerString)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_a) {
    var context = _a.context, rank = _a.rank, wallet = _a.optionData, optionData = _a.optionData, selectedId = _a.selectedId, deviceMode = _a.deviceMode, totalPayable = _a.totalPayable, idPrefix = _a.idPrefix, classNames = _a.classNames, selectInstrument = _a.selectInstrument, onActionButtonClick = _a.onActionButtonClick;
    var walletName = (0,_walletHelper__WEBPACK_IMPORTED_MODULE_5__.sanitizeName)(wallet.bankCode);
    var walletId = wallet.id;
    var hasLowSR = wallet.lowSuccessRate;
    var selected = selectedId === "".concat(walletId);
    var disabled = wallet.disable;
    var offerData = optionData.offerDetails || '';
    var display = react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(DisplayOffers, { optionData: wallet });
    var renderedCarouselItems = offerData
        ? offerData.map(function (data) {
            return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: data.message }, data.message);
        })
        : null;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentSubOption__WEBPACK_IMPORTED_MODULE_3__.default, { key: "".concat(idPrefix).concat(walletId), id: "".concat(idPrefix).concat(walletId), selected: selected, iconName: "logo-".concat(walletName), iconConfig: { position: context === 'reco' ? 'right' : 'left' }, displayName: display, classNames: classNames, onClickParams: {
            name: wallet.name,
            totalPayable: totalPayable,
            instrumentType: wallet.instrumentType,
            directIntegration: wallet.directIntegration,
            paymentUrl: wallet.paymentUrl,
            rank: rank
        }, onClick: selectInstrument, disabled: disabled },
        selected && renderedCarouselItems && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_OfferBanner__WEBPACK_IMPORTED_MODULE_7__.default, { selected: selected, offerData: offerData, deviceMode: deviceMode, name: wallet.name })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_LowSRMessage__WEBPACK_IMPORTED_MODULE_4__.default, { instrumentType: wallet.instrumentType, instrumentName: wallet.name, className: _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__.default.lowSRMessage, show: (selected && hasLowSR) || disabled, disable: disabled }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_2__.default, { text: "PAY NOW", className: _walletCardUI_base_css__WEBPACK_IMPORTED_MODULE_6__.default.actionButton, onClick: onActionButtonClick, visible: selected, deviceMode: deviceMode })));
});


/***/ }),

/***/ "./browser/components/payment/common/Options/Wallets/index.js":
/*!********************************************************************!*\
  !*** ./browser/components/payment/common/Options/Wallets/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var _PaymentOptionError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PaymentOptionError */ "./browser/components/payment/common/Options/PaymentOptionError/index.js");
/* harmony import */ var _WalletCardUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WalletCardUI */ "./browser/components/payment/common/Options/Wallets/WalletCardUI.js");
/* harmony import */ var _wallets_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wallets.base.css */ "./browser/components/payment/common/Options/Wallets/wallets.base.css");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _walletHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./walletHelper */ "./browser/components/payment/common/Options/Wallets/walletHelper.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
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













var boundFuncs = [
    'getModeAttributes',
    'getOptionUI',
    'getWalletDetails',
    'getWallets',
    'selectWallet',
    'submitCallback',
    'setActionButtonRef',
    'onActionButtonClick',
    'getFilteredWallet'
];
var getPaymentModeFromWallet = function (wallet) {
    if (wallet === void 0) { wallet = {}; }
    return wallet.directIntegration
        ? commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_PM_DIRECT
        : commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_PM;
};
var Wallets = /** @class */ (function (_super) {
    __extends(Wallets, _super);
    function Wallets(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedWalletId: ''
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.walletsList = _this.sortWallets();
        var _a = _this.props, offer = _a.offer, instrumentData = _a.instrumentData;
        _this.props.updateBankDiscount(0);
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('INLINE_OFFER') &&
            (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_11__.addOffersToInstrumentDetails)(offer, instrumentData);
        return _this;
    }
    Wallets.prototype.sortWallets = function () {
        var supportedWallets = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('WALLET_CONFIG').supportedWallets;
        var allWallets = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];
        var paymentPersonalizationConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_9__.getKVPairValue)('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
        if (((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT3') ||
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isVariantEnabled)('RECOMMENDED_OPTIONS_VARIANT4')) &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')) {
            return allWallets.filter(function (wallet) { return supportedWallets.indexOf((0,_walletHelper__WEBPACK_IMPORTED_MODULE_10__.sanitizeName)(wallet.bankCode)) !== -1; });
        }
        else {
            return supportedWallets.reduce(function (acc, walletCode) {
                var wallet = allWallets.find(function (walletObj) {
                    var code = (0,_walletHelper__WEBPACK_IMPORTED_MODULE_10__.sanitizeName)(walletObj.bankCode);
                    return code === walletCode;
                });
                wallet && acc.push(wallet);
                return acc;
            }, []);
        }
    };
    Wallets.prototype.getWalletDetails = function (id) {
        return this.walletsList.find(function (wallet) { return "".concat(wallet.id) === id; });
    };
    Wallets.prototype.selectWallet = function (val) {
        var _a;
        var id = val.slice(7);
        var name = (this.getWalletDetails(id) || {}).name;
        triggerEvent('WALLET_SELECT', {
            gaLabel: name
        });
        (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_11__.inlineOfferWidgetLoadEvent)('wallets', name, ((_a = this.getWalletDetails(id)) === null || _a === void 0 ? void 0 : _a.offerDetails) ? true : false);
        this.setState({
            selectedWalletId: id
        });
    };
    Wallets.prototype.getModeAttributes = function () {
        return {
            walletEnabled: 'true',
            paymentProviderId: this.state.selectedWalletId || '',
            walletAmount: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.roundNumber)(this.props.totalPayable || 0, 2)
        };
    };
    Wallets.prototype.setActionButtonRef = function (node) {
        this.actionButton = node;
    };
    Wallets.prototype.onActionButtonClick = function (e) {
        e.preventDefault();
        this.actionButton.click();
    };
    Wallets.prototype.getFilteredWallet = function () {
        var filteredWallets = this.walletsList.filter(function (wallet) { return !wallet.directDisplay; });
        if (!(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('LOW_SR_OPTIONS_REMOVE')) {
            return filteredWallets;
        }
        var filteredWalletsWithoutLowSR = filteredWallets.filter(function (wallet) { return !wallet.lowSuccessRate; });
        return filteredWalletsWithoutLowSR.length > 0
            ? filteredWalletsWithoutLowSR
            : filteredWallets;
    };
    Wallets.prototype.getWallets = function () {
        var _this = this;
        var instrumentType = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData.type', '');
        var paymentUrl = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.instrumentData.paymentInstrumentDetails.paymentUrl');
        return this.getFilteredWallet().map(function (wallet) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_WalletCardUI__WEBPACK_IMPORTED_MODULE_4__.default, { optionData: __assign(__assign({}, wallet), { instrumentType: instrumentType, paymentUrl: paymentUrl }), selectedId: _this.state.selectedWalletId, deviceMode: _this.props.deviceMode, idPrefix: 'wallet-', selectInstrument: _this.selectWallet, onActionButtonClick: _this.onActionButtonClick }));
        });
    };
    Wallets.prototype.getOptionUIMobile = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_wallets_base_css__WEBPACK_IMPORTED_MODULE_5__.default.walletContainer, " ").concat(_wallets_base_css__WEBPACK_IMPORTED_MODULE_5__.default.mobileContainer) }, this.getWallets()));
    };
    Wallets.prototype.getOptionUIDesktop = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_wallets_base_css__WEBPACK_IMPORTED_MODULE_5__.default.walletContainer) },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _wallets_base_css__WEBPACK_IMPORTED_MODULE_5__.default.heading }, "Select wallet to pay"),
            this.getWallets()));
    };
    Wallets.prototype.getOptionUI = function () {
        return this.props.deviceMode === 'mobile'
            ? this.getOptionUIMobile()
            : this.getOptionUIDesktop();
    };
    Wallets.prototype.submitCallback = function (done) {
        if (!this.state.selectedWalletId) {
            SHELL.alert('info', {
                message: 'Select a payment option to place order.',
                styleOverrides: {
                    notifyMainDiv: "bottom: 82px;"
                }
            });
            this.props.setLoader(false);
            return;
        }
        var name = (this.getWalletDetails(this.state.selectedWalletId) || {})
            .name;
        triggerEvent('WALLET_SUBMIT', {
            gaLabel: name || 'not selected'
        });
        triggerEvent('PAYMENT_OPTION_SUBMIT', {
            custom: {
                custom: {
                    v1: "".concat(commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_TYPE, ", ").concat(name),
                    v2: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_TYPE,
                    v3: this.props.rank,
                    v4: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_8__.isFeatureEnabled)('RECOMMENDED_OPTIONS')
                },
                widget_items: {
                    data_set: {
                        entity_name: 'payment_option',
                        entity_id: 'payment_option'
                    }
                }
            }
        });
        done && done();
    };
    Wallets.prototype.render = function () {
        var _a = this, props = _a.props, _b = _a.props, _c = _b.instrumentData, code = _c.code, paymentUrl = _c.paymentInstrumentDetails.paymentUrl, payMode = _b.payMode, retrySessionEnabled = _b.retrySessionEnabled;
        var paymentMode = getPaymentModeFromWallet(this.getWalletDetails(this.state.selectedWalletId));
        return code === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_ELIGIBLE_CODE ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, props, { paymentUrl: paymentUrl, paymentMode: paymentMode, paymentModeName: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_PM_NAME, formAttributes: { noValidate: true }, modeAttributes: this.getModeAttributes(), optionUI: this.getOptionUI(), actionData: {
                hide: true,
                disable: payMode === 'retry' && !retrySessionEnabled
            }, submitCallback: this.submitCallback, setActionButtonRef: this.setActionButtonRef, paymentInstrument: commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentOptionError__WEBPACK_IMPORTED_MODULE_3__.default, { option: "Wallet", code: code }));
    };
    return Wallets;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
Wallets.propTypes = {
    mode: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wallets);


/***/ }),

/***/ "./browser/components/payment/common/Options/Wallets/walletHelper.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/Options/Wallets/walletHelper.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeName": () => (/* binding */ sanitizeName)
/* harmony export */ });
var sanitizeName = function (name) {
    /*
     convert to lowercase and remove spaces, + and brackets
    */
    return name.toLowerCase().replace(/[+ )(]/g, '');
};


/***/ }),

/***/ "./browser/components/payment/common/Options/index.js":
/*!************************************************************!*\
  !*** ./browser/components/payment/common/Options/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "NetBanking": () => (/* reexport safe */ _NetBanking__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "Cod": () => (/* reexport safe */ _Cod__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "GiftCard": () => (/* reexport safe */ _GiftCard__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Wallets": () => (/* reexport safe */ _Wallets__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "RecommendedInstruments": () => (/* reexport safe */ _RecommendedInstruments__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "SavedInstruments": () => (/* reexport safe */ _SavedInstruments__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "Upi": () => (/* reexport safe */ _Upi__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "EMI": () => (/* reexport safe */ _EMI__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "BNPL": () => (/* reexport safe */ _BNPL__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "WalletTab": () => (/* reexport safe */ _WalletTab__WEBPACK_IMPORTED_MODULE_10__.default)
/* harmony export */ });
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card */ "./browser/components/payment/common/Options/Card/index.js");
/* harmony import */ var _NetBanking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NetBanking */ "./browser/components/payment/common/Options/NetBanking/index.js");
/* harmony import */ var _Cod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Cod */ "./browser/components/payment/common/Options/Cod/index.js");
/* harmony import */ var _GiftCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GiftCard */ "./browser/components/payment/common/Options/GiftCard/index.js");
/* harmony import */ var _Wallets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Wallets */ "./browser/components/payment/common/Options/Wallets/index.js");
/* harmony import */ var _RecommendedInstruments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RecommendedInstruments */ "./browser/components/payment/common/Options/RecommendedInstruments/index.js");
/* harmony import */ var _SavedInstruments__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SavedInstruments */ "./browser/components/payment/common/Options/SavedInstruments/index.js");
/* harmony import */ var _Upi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Upi */ "./browser/components/payment/common/Options/Upi/index.js");
/* harmony import */ var _EMI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EMI */ "./browser/components/payment/common/Options/EMI/index.js");
/* harmony import */ var _BNPL__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./BNPL */ "./browser/components/payment/common/Options/BNPL/index.js");
/* harmony import */ var _WalletTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./WalletTab */ "./browser/components/payment/common/Options/WalletTab/index.js");














/***/ }),

/***/ "./browser/components/payment/common/OrderReview/ImageStack/index.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/OrderReview/ImageStack/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageStack": () => (/* binding */ ImageStack)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");
/* harmony import */ var _icon_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon.base.css */ "./browser/components/payment/common/OrderReview/ImageStack/icon.base.css");



var ICON_SIZE = {
    height: 40,
    width: 30
};
var ImageStack = function (_a) {
    var _b = _a.cartProducts, cartProducts = _b === void 0 ? [] : _b;
    var products = cartProducts.slice(0, 3).reverse();
    return products.map(function (product, index) {
        var _a;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _icon_base_css__WEBPACK_IMPORTED_MODULE_2__.default["Image".concat(products.length - index)] },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_1__.default, { src: (_a = product.images[0]) === null || _a === void 0 ? void 0 : _a.secureSrc, height: ICON_SIZE.height, width: ICON_SIZE.width })));
    });
};


/***/ }),

/***/ "./browser/components/payment/common/OrderReview/ItemsBlock/index.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/OrderReview/ItemsBlock/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonComp_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Image */ "./browser/components/common/Image/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _cart_common_ItemComponents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../cart/common/ItemComponents */ "./browser/components/cart/common/ItemComponents/index.js");
/* harmony import */ var _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ItemsBlock.base.css */ "./browser/components/payment/common/OrderReview/ItemsBlock/ItemsBlock.base.css");








var getSize = function (sizes, skuId) {
    var label = '';
    sizes.map(function (size) {
        if (size.skuId == skuId) {
            label = size.label;
        }
    });
    return label;
};
var IMAGE_SIZE = {
    height: 87,
    width: 66
};
var IMAGE_SIZE_PRICE = {
    height: 110,
    width: 84
};
var ItemsBlock = function (props) {
    var cartProducts = props.cartProducts;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null, cartProducts.map(function (product) {
        var _a, _b;
        var size = getSize(product === null || product === void 0 ? void 0 : product.sizes, product === null || product === void 0 ? void 0 : product.skuId);
        var itemName = (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_2__.getItemName)(product === null || product === void 0 ? void 0 : product.brand, product === null || product === void 0 ? void 0 : product.name);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.item },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.isMobile)() ? _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.leftMobile : _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.leftDesktop }, (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isVariantEnabled)('ORDER_REVIEW_PRICE_ENABLED') ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_4__.default, { src: (_a = product.images[0]) === null || _a === void 0 ? void 0 : _a.secureSrc, height: IMAGE_SIZE_PRICE.height, width: IMAGE_SIZE_PRICE.width })) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Image__WEBPACK_IMPORTED_MODULE_4__.default, { src: (_b = product.images[0]) === null || _b === void 0 ? void 0 : _b.secureSrc, height: IMAGE_SIZE.height, width: IMAGE_SIZE.width }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.isMobile)() ? _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.rightMobile : _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.rightDesktop },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.brandName }, product.brand),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.productName }, itemName),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.sizeQty },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.size },
                        "Size: ",
                        size),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.quantity },
                        "Qty: ",
                        product.quantity)),
                (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_3__.isVariantEnabled)('ORDER_REVIEW_PRICE_ENABLED') &&
                    (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'price.subTotal') >= 1 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.price },
                        "\u20B9",
                        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_5__.currencyValue)(product.price.subTotal))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _ItemsBlock_base_css__WEBPACK_IMPORTED_MODULE_7__.default.freeGift }, "Free Gift"))),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_cart_common_ItemComponents__WEBPACK_IMPORTED_MODULE_6__.DeliveryEstimate, { shippingEstimates: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(product, 'productServiceabilityInfo.pincodeInfo.shippingEstimates'), updateDeliveryEstimates: function () { } }))));
    })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemsBlock);


/***/ }),

/***/ "./browser/components/payment/common/OrderReview/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/payment/common/OrderReview/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Accordian__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Accordian */ "./browser/components/common/Accordian/index.js");
/* harmony import */ var commonComp_TabBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/TabBar */ "./browser/components/common/TabBar/index.js");
/* harmony import */ var _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orderReview.base.css */ "./browser/components/payment/common/OrderReview/orderReview.base.css");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _ImageStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ImageStack */ "./browser/components/payment/common/OrderReview/ImageStack/index.js");
/* harmony import */ var _ItemsBlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ItemsBlock */ "./browser/components/payment/common/OrderReview/ItemsBlock/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");









var getHeading = function (cartProducts) {
    return (react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", { className: _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.leftHeading },
            react__WEBPACK_IMPORTED_MODULE_1__.default.createElement(_ImageStack__WEBPACK_IMPORTED_MODULE_6__.ImageStack, { cartProducts: cartProducts })),
        react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", { className: _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.rightHeading },
            react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", { className: _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.heading },
                commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_5__.default.ORDER_REVIEW_HEADING,
                " (",
                (cartProducts || []).length,
                ")"),
            react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", { className: _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.subText },
                commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_5__.default.DELIVERY_ESTIMATED_MESSAGE,
                react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("span", { className: _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.deliveryDates },
                    ' ',
                    (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.getDeliveryEstimateRange)(cartProducts))))));
};
var OrderReview = function (props) {
    var cartData = props.cartData, mode = props.mode;
    var cartProducts = cartData.products.filter(function (product) { return product.selectedForCheckout; });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        triggerEvent('ORDER_REVIEW_WIDGET_LOAD', {
            custom: {
                custom: {
                    v1: cartProducts.length
                },
                widget: {
                    name: 'payment_review_order'
                }
            }
        });
    }, []);
    var clickEvent = function (state) {
        triggerEvent('ORDER_REVIEW_WIDGET_CLICK', {
            custom: {
                custom: {
                    v1: cartProducts.length,
                    v2: state
                },
                widget: 'payment_review_order'
            }
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1__.default.createElement("div", { className: "".concat(_orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.paymentOptionsBlock, " ").concat(mode === 'desktop' ? _orderReview_base_css__WEBPACK_IMPORTED_MODULE_4__.default.paymentOptionsBlockBorder : '') },
            react__WEBPACK_IMPORTED_MODULE_1__.default.createElement(commonComp_Accordian__WEBPACK_IMPORTED_MODULE_2__.default, { defaultSelect: false, mode: mode, isOrderReview: true, isFirstTimeCustomer: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(cartData, 'userDetails.isFirstTimeCustomer', false), onTabClick: clickEvent, onSwitchTab: function () { } },
                react__WEBPACK_IMPORTED_MODULE_1__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_3__.Tab, { id: "orderReview", display: getHeading(cartProducts), show: true, content: react__WEBPACK_IMPORTED_MODULE_1__.default.createElement(_ItemsBlock__WEBPACK_IMPORTED_MODULE_7__.default, { cartProducts: cartProducts }) })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderReview);


/***/ }),

/***/ "./browser/components/payment/common/PaymentError/PaymentFailureHalfCard/index.js":
/*!****************************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentError/PaymentFailureHalfCard/index.js ***!
  \****************************************************************************************/
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
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paymentFailureHalfCard.base.css */ "./browser/components/payment/common/PaymentError/PaymentFailureHalfCard/paymentFailureHalfCard.base.css");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/Sanitize */ "./utils/Sanitize/index.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _PayNowHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../PayNowHandler */ "./browser/components/payment/common/PayNowHandler/index.js");
/* harmony import */ var iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! iconComp/RupeeBold.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RupeeBold.jsx");
/* harmony import */ var iconComp_PaymentFailure_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! iconComp/PaymentFailure.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/PaymentFailure.jsx");
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




// Style

// Common Components










var PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.PAY_LATER, CARD_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.CARD_TYPE, COD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.COD, EMI_PM_NAME = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.EMI_PM_NAME, NETBANKING = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.NETBANKING, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.SAVED_INSTRUMENT, UPI = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.UPI, WALLET_PM_NAME = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM_NAME, WALLET_PM_DIRECT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM_DIRECT, WALLET_PM = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.WALLET_PM, INSTRUMENT_ELIGIBLE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.INSTRUMENT_ELIGIBLE_CODE, FAILURE_BUTTON_TEXT_MAP = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.FAILURE_BUTTON_TEXT_MAP;
var TRY_RETRY_TEXT = FAILURE_BUTTON_TEXT_MAP.TRY_RETRY_TEXT, TRY_COD_TEXT = FAILURE_BUTTON_TEXT_MAP.TRY_COD_TEXT, TRY_OTHER_TEXT = FAILURE_BUTTON_TEXT_MAP.TRY_OTHER_TEXT;
var isRetryEligible = [
    PAY_LATER,
    EMI_PM_NAME,
    NETBANKING,
    UPI,
    WALLET_PM_NAME
];
var boundFuncs = ['triggerHalfCardLoadEvent'];
var PaymentFailureHalfCard = /** @class */ (function (_super) {
    __extends(PaymentFailureHalfCard, _super);
    function PaymentFailureHalfCard(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.userUidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUidx)();
        _this.paymentAttributes = _this.getPaymentAttributes();
        _this.failedPaymentMode = _this.getFailedPaymentMode();
        _this.codEligible =
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.props.instrumentDataMap[COD], 'code', 0) ===
                INSTRUMENT_ELIGIBLE_CODE;
        _this.isDopeUserConsentEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('DOPE_USER_CONSENT');
        _a = _this.initializeCta(), _this.primaryCta = _a[0], _this.secondaryCta = _a[1];
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        return _this;
    }
    PaymentFailureHalfCard.prototype.componentDidMount = function () {
        var _a = this, failedPaymentMode = _a.failedPaymentMode, primaryCta = _a.primaryCta, secondaryCta = _a.secondaryCta, triggerHalfCardLoadEvent = _a.triggerHalfCardLoadEvent;
        if (failedPaymentMode &&
            this.props.showHalfCard &&
            (primaryCta.text || secondaryCta.text)) {
            triggerHalfCardLoadEvent();
        }
    };
    PaymentFailureHalfCard.prototype.getPaymentAttributes = function () {
        var paymentAttributes = {};
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isLocalStorageEnabled)()) {
            try {
                paymentAttributes =
                    JSON.parse(localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_7__.localStorageKeys.PAYMENT_MODE_ATTRIBUTES)) || {};
            }
            catch (e) {
                paymentAttributes = {};
            }
        }
        if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(paymentAttributes) &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentAttributes, 'paymentModeName', null).indexOf('retry-') !== -1) {
            paymentAttributes.paymentModeName = paymentAttributes.paymentModeName.replace('retry-', '');
        }
        return paymentAttributes;
    };
    PaymentFailureHalfCard.prototype.getFailedPaymentMode = function () {
        var paymentAttributes = this.paymentAttributes;
        var _a = paymentAttributes || {}, paymentMode = _a.paymentMode, paymentModeName = _a.paymentModeName;
        if (paymentMode && paymentModeName) {
            switch (paymentModeName) {
                case PAY_LATER:
                case CARD_TYPE:
                case EMI_PM_NAME:
                case NETBANKING:
                case WALLET_PM_NAME:
                case COD:
                    return paymentModeName;
                case SAVED_INSTRUMENT:
                case UPI:
                    var upiSdkEnabled = (paymentAttributes || {}).modeAttributes.upiSdkEnabled;
                    var code = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'errorAttributes.code');
                    if (!upiSdkEnabled || code) {
                        if (paymentModeName === UPI) {
                            return paymentModeName;
                        }
                        else {
                            return paymentMode;
                        }
                    }
                    return '';
            }
        }
        if (paymentMode === WALLET_PM_DIRECT || paymentMode === WALLET_PM) {
            return WALLET_PM_NAME;
        }
        return '';
    };
    PaymentFailureHalfCard.prototype.getCta = function (text, onClick) {
        return {
            text: text,
            onButtonClick: onClick
        };
    };
    PaymentFailureHalfCard.prototype.getRetryEligibleCta = function () {
        var primaryCta = {
            text: '',
            onButtonClick: function () { }
        }, secondaryCta = {
            text: '',
            onButtonClick: function () { }
        };
        var _a = this, codEligible = _a.codEligible, getCta = _a.getCta, submitRetryForm = _a.submitRetryForm, toggleToPaymentMode = _a.toggleToPaymentMode, failedPaymentMode = _a.failedPaymentMode, _b = _a.props, halfCardConfig = _b.halfCardConfig, closePaymentFailureModal = _b.closePaymentFailureModal;
        var failedInstrumentEligible = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props.instrumentDataMap[failedPaymentMode], 'code', 0) ===
            INSTRUMENT_ELIGIBLE_CODE;
        var cta1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT);
        var cta2 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'podCTA', TRY_COD_TEXT);
        if (codEligible && failedInstrumentEligible) {
            primaryCta = getCta(cta1, submitRetryForm);
            secondaryCta = getCta(cta2, toggleToPaymentMode.bind(this, COD));
        }
        else if (failedInstrumentEligible) {
            primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
            secondaryCta = getCta(TRY_RETRY_TEXT, submitRetryForm);
        }
        else {
            primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
        }
        return [primaryCta, secondaryCta];
    };
    PaymentFailureHalfCard.prototype.getCodRetryCta = function () {
        var primaryCta = {
            text: '',
            onButtonClick: function () { }
        }, secondaryCta = {
            text: '',
            onButtonClick: function () { }
        };
        var _a = this, codEligible = _a.codEligible, getCta = _a.getCta, toggleToPaymentMode = _a.toggleToPaymentMode;
        var closePaymentFailureModal = this.props.closePaymentFailureModal;
        if (codEligible) {
            primaryCta = getCta(TRY_RETRY_TEXT, toggleToPaymentMode.bind(this, COD));
            secondaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
        }
        else {
            primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
        }
        return [primaryCta, secondaryCta];
    };
    PaymentFailureHalfCard.prototype.getDefaultCta = function () {
        var primaryCta = {
            text: '',
            onButtonClick: function () { }
        }, secondaryCta = {
            text: '',
            onButtonClick: function () { }
        };
        var _a = this, codEligible = _a.codEligible, getCta = _a.getCta, toggleToPaymentMode = _a.toggleToPaymentMode, failedPaymentMode = _a.failedPaymentMode, paymentAttributes = _a.paymentAttributes, _b = _a.props, halfCardConfig = _b.halfCardConfig, closePaymentFailureModal = _b.closePaymentFailureModal;
        var retryCtaText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT);
        var podCtaText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'podCTA', TRY_COD_TEXT);
        if (codEligible) {
            primaryCta =
                failedPaymentMode === CARD_TYPE
                    ? getCta(retryCtaText, toggleToPaymentMode.bind(this, paymentAttributes.paymentModeName))
                    : getCta(retryCtaText, closePaymentFailureModal);
            secondaryCta = getCta(podCtaText, toggleToPaymentMode.bind(this, COD));
        }
        else {
            primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
        }
        return [primaryCta, secondaryCta];
    };
    PaymentFailureHalfCard.prototype.initializeCta = function () {
        var _a, _b, _c;
        var failedPaymentMode = this.failedPaymentMode;
        var primaryCta = {
            text: '',
            onButtonClick: function () { }
        }, secondaryCta = {
            text: '',
            onButtonClick: function () { }
        };
        if (failedPaymentMode) {
            if (isRetryEligible.indexOf(failedPaymentMode) !== -1) {
                _a = this.getRetryEligibleCta(), primaryCta = _a[0], secondaryCta = _a[1];
            }
            else if (failedPaymentMode === COD) {
                _b = this.getCodRetryCta(), primaryCta = _b[0], secondaryCta = _b[1];
            }
            else {
                _c = this.getDefaultCta(), primaryCta = _c[0], secondaryCta = _c[1];
            }
        }
        return [primaryCta, secondaryCta];
    };
    PaymentFailureHalfCard.prototype.getModeAttributes = function (modeAttributes) {
        return __assign({}, modeAttributes);
    };
    PaymentFailureHalfCard.prototype.getPaymentForm = function () {
        var paymentAttributes = this.paymentAttributes;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PayNowHandler__WEBPACK_IMPORTED_MODULE_11__.default, __assign({}, this.props, { paymentUrl: paymentAttributes.paymentUrl, paymentMode: paymentAttributes.paymentMode, paymentInstrument: paymentAttributes.paymentInstrument, paymentModeName: "retry-".concat(paymentAttributes.paymentModeName), modeAttributes: this.getModeAttributes(paymentAttributes.modeAttributes), deviceMode: this.props.mode, actionData: { enabled: true, hide: true }, paymentFailureHalfCard: true })));
    };
    PaymentFailureHalfCard.prototype.submitRetryForm = function () {
        var submitBtn = document.getElementById("action-retry-".concat(this.paymentAttributes.paymentModeName));
        submitBtn && submitBtn.click();
    };
    PaymentFailureHalfCard.prototype.toggleToPaymentMode = function (modeName) {
        this.props.switchTab(modeName);
        this.props.closePaymentFailureModal();
    };
    PaymentFailureHalfCard.prototype.onClickHandler = function (cta) {
        this.triggerClickEvent(cta.text);
        cta.onButtonClick.call(this);
    };
    PaymentFailureHalfCard.prototype.triggerHalfCardLoadEvent = function () {
        var _a = this.props, code = _a.code, outstandingAmount = _a.outstandingAmount;
        var _b = this, primaryCta = _b.primaryCta, secondaryCta = _b.secondaryCta, userUidx = _b.userUidx;
        triggerEvent('PAYMENT_FAILURE_HALFCARD_LOAD', {
            maData: {
                value: outstandingAmount
            },
            custom: {
                custom: {
                    v1: userUidx,
                    v2: [primaryCta.text, secondaryCta.text],
                    v4: code
                },
                widget: {
                    name: 'payment_failure_widget',
                    type: 'card'
                }
            }
        });
    };
    PaymentFailureHalfCard.prototype.triggerClickEvent = function (clickEventData) {
        var _a = this.props, code = _a.code, outstandingAmount = _a.outstandingAmount;
        var _b = this, primaryCta = _b.primaryCta, secondaryCta = _b.secondaryCta, userUidx = _b.userUidx;
        triggerEvent('PAYMENT_FAILURE_HALFCARD_CLICK', {
            maData: {
                value: outstandingAmount
            },
            custom: {
                custom: {
                    v1: userUidx,
                    v2: [primaryCta.text, secondaryCta.text],
                    v3: clickEventData,
                    v4: code
                },
                widget: {
                    name: 'payment_failure_widget',
                    type: 'card'
                }
            }
        });
    };
    PaymentFailureHalfCard.prototype.render = function () {
        var _this = this;
        var _a = this.props, halfCardConfig = _a.halfCardConfig, outstandingAmount = _a.outstandingAmount, mode = _a.mode, showHalfCard = _a.showHalfCard, closePaymentFailureModal = _a.closePaymentFailureModal;
        var _b = this, primaryCta = _b.primaryCta, secondaryCta = _b.secondaryCta, failedPaymentMode = _b.failedPaymentMode, isDopeUserConsentEnabled = _b.isDopeUserConsentEnabled, paymentAttributes = _b.paymentAttributes;
        var buttonTextOptions = [primaryCta.text, secondaryCta.text];
        var show = failedPaymentMode &&
            showHalfCard &&
            (primaryCta.text || secondaryCta.text);
        var retryText = isDopeUserConsentEnabled
            ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT)
            : TRY_RETRY_TEXT;
        var text1 = '', text2 = '', text = '';
        if (isDopeUserConsentEnabled) {
            text = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'ucretryfirst.text');
            text1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'ucretryfirst.highlightedText1');
            text2 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'ucretryfirst.highlightedText2');
        }
        else {
            text = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'text');
        }
        var _c = (paymentAttributes || {}).paymentMode, paymentMode = _c === void 0 ? '' : _c;
        var isFailedPaymentModeCard = false;
        isFailedPaymentModeCard =
            paymentMode === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_8__.default.CREDIT_CARD && isDopeUserConsentEnabled;
        var ecomText = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(halfCardConfig, 'ecomText');
        return (show && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            buttonTextOptions.indexOf(retryText) !== -1 && this.getPaymentForm(),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__.default, { className: mode === 'desktop' ? _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopModal : _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modal, cancelCallback: closePaymentFailureModal, halfCard: mode === 'mobile', cancelIconConfig: { show: true, className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.cancel } },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.header },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_PaymentFailure_jsx__WEBPACK_IMPORTED_MODULE_13__.default, { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.paymentFailureIcon }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.headerText }, "Payment Failed")),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.container },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.failureText },
                        isDopeUserConsentEnabled
                            ? text.split(' ').map(function (text, idx) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { id: idx, className: "".concat(text.includes('text') ? _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.textBold : '') },
                                    (text.includes('{text1}') &&
                                        text.replace('{text1}', text1)) ||
                                        (text.includes('{text2}') &&
                                            text.replace('{text2}', text2)) ||
                                        text,
                                    ' '));
                            })
                            : text,
                        isFailedPaymentModeCard && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.ecomText, dangerouslySetInnerHTML: { __html: commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10___default()(ecomText) } }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.toPayText },
                        ' ',
                        "To Pay: ",
                        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_12__.default, null),
                        outstandingAmount),
                    primaryCta.text && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_5__.default, { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.primaryCta, onClick: function () { return _this.onClickHandler(primaryCta); } }, primaryCta.text)),
                    secondaryCta.text && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_5__.default, { className: _paymentFailureHalfCard_base_css__WEBPACK_IMPORTED_MODULE_3__.default.secondaryCta, onClick: function () { return _this.onClickHandler(secondaryCta); } }, secondaryCta.text)))))));
    };
    return PaymentFailureHalfCard;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
PaymentFailureHalfCard.propTypes = {
    halfCardConfig: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
    outstandingAmount: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string),
    instrumentDataMap: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
    switchTab: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    code: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentFailureHalfCard);


/***/ }),

/***/ "./browser/components/payment/common/PaymentError/index.js":
/*!*****************************************************************!*\
  !*** ./browser/components/payment/common/PaymentError/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "../node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_browserStatsdMiddleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/browserStatsdMiddleware */ "./browser/utils/browserStatsdMiddleware.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/Sanitize */ "./utils/Sanitize/index.js");
/* harmony import */ var commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _PaymentFailureHalfCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PaymentFailureHalfCard */ "./browser/components/payment/common/PaymentError/PaymentFailureHalfCard/index.js");
/* harmony import */ var _paymentError_base_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./paymentError.base.css */ "./browser/components/payment/common/PaymentError/paymentError.base.css");
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














var PaymentError = /** @class */ (function (_super) {
    __extends(PaymentError, _super);
    function PaymentError(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showHalfCard: true
        };
        _this.paymentErrorKV = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PAYMENT_ERROR');
        _this.errorRedirect = _this.errorRedirect.bind(_this);
        _this.paymentAttributes = _this.getPaymentAttributes();
        _this.failedPaymentMode = _this.getFailedPaymentMode();
        _this.closePaymentFailureModal = _this.closePaymentFailureModal.bind(_this);
        return _this;
    }
    PaymentError.prototype.closePaymentFailureModal = function () {
        this.setState({ showHalfCard: false });
    };
    PaymentError.prototype.getErrorCode = function () {
        this.setState({ showHalfCard: true });
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'errorAttributes.code', '');
    };
    PaymentError.prototype.getErrorCodeDisplayOverride = function () {
        return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'errorAttributes.codeDisplayOverride', '');
    };
    PaymentError.prototype.componentDidMount = function () {
        //scroll to top of the screen
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        var errorCode = this.getErrorCode();
        if (errorCode) {
            var path = 'checkout.PAYMENTERRORCODE.Error.' + errorCode;
            this.increaseOnlineFailureCount();
            commonBrowserUtils_browserStatsdMiddleware__WEBPACK_IMPORTED_MODULE_6__.browserStatsdClient.increment(path);
        }
    };
    PaymentError.prototype.getError = function () {
        var paymentErrorKV = this.paymentErrorKV;
        var errorCode = this.getErrorCodeDisplayOverride() || this.getErrorCode();
        var error = paymentErrorKV[errorCode] || paymentErrorKV.default;
        return typeof error === 'string'
            ? { heading: 'Sorry, your order could not be placed.', desc: error }
            : error;
    };
    PaymentError.prototype.errorRedirect = function () {
        var error = this.getError();
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.navigateTo)(error.redirect);
    };
    PaymentError.prototype.increaseOnlineFailureCount = function () {
        var _a;
        var cartContext = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'errorAttributes.cartContext', '');
        var error = this.getError();
        var errorCode = this.getErrorCode();
        triggerEvent('PAYMENT_ERROR', {
            gaLabel: errorCode,
            mynacoAttributes: {
                errorCode: errorCode,
                errorMessage: error.desc
            },
            custom: {
                custom: {
                    v1: errorCode,
                    v2: true //true -> paynow json enabled
                }
            }
        });
        this.props.analytics('triggerWebengage')('PAYMENT_FAILURE', {
            error: error.desc
        });
        if (errorCode === '1064') {
            // Special handling for CART_UIDX_MISMATCH
            SHELL.redirectTo('/login?referer=/checkout/payment');
            return;
        }
        if (!(0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_5__.isGiftcardContext)({ cartContext: cartContext }) &&
            commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.ONLINE_ERROR_CODES.indexOf(errorCode) !== -1 &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isSessionStorageEnabled)()) {
            var failureCountMap = JSON.stringify((_a = {},
                _a[(0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.getUidx)()] = +(0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_9__.getPaymentFailureCount)() + 1,
                _a));
            sessionStorage.setItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT, failureCountMap);
        }
    };
    PaymentError.prototype.componentDidUpdate = function () {
        //scroll to top of the screen
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.getErrorCode() && this.increaseOnlineFailureCount();
    };
    PaymentError.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (this.props.errorAttributes.updateCounter !==
            nextProps.errorAttributes.updateCounter || !nextState.showHalfCard);
    };
    PaymentError.prototype.getPaymentAttributes = function () {
        var paymentAttributes = {};
        if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isLocalStorageEnabled)()) {
            try {
                paymentAttributes =
                    JSON.parse(localStorage.getItem(commonUtils_constants__WEBPACK_IMPORTED_MODULE_4__.localStorageKeys.PAYMENT_MODE_ATTRIBUTES)) || {};
            }
            catch (e) {
                paymentAttributes = {};
            }
        }
        if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(paymentAttributes) &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentAttributes, 'paymentModeName', null).indexOf('retry-') !== -1) {
            paymentAttributes.paymentModeName = paymentAttributes.paymentModeName.replace('retry-', '');
        }
        return paymentAttributes;
    };
    PaymentError.prototype.getFailedPaymentMode = function () {
        var paymentAttributes = this.paymentAttributes;
        var _a = paymentAttributes || {}, paymentMode = _a.paymentMode, paymentModeName = _a.paymentModeName;
        if (paymentMode && paymentModeName) {
            if (paymentModeName === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD) {
                return paymentModeName;
            }
        }
        return '';
    };
    PaymentError.prototype.render = function () {
        var showPaymentFailureHalfCard = this.props.showPaymentFailureHalfCard;
        var failedPaymentMode = this.failedPaymentMode;
        var errorCode = this.getErrorCode();
        //this is done so that wrong catpcha and expired captcha is not consider for payment failure half card
        var isCODFailure = failedPaymentMode === commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_7__.default.COD &&
            (errorCode === '1004' || errorCode === '1095');
        if (showPaymentFailureHalfCard && !isCODFailure) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_PaymentFailureHalfCard__WEBPACK_IMPORTED_MODULE_11__.default, __assign({}, this.props, { showHalfCard: this.state.showHalfCard, closePaymentFailureModal: this.closePaymentFailureModal })));
        }
        else if (errorCode) {
            var error = this.getError();
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { id: this.props.id, className: _paymentError_base_css__WEBPACK_IMPORTED_MODULE_12__.default.errorContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentError_base_css__WEBPACK_IMPORTED_MODULE_12__.default.heading }, error.heading),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentError_base_css__WEBPACK_IMPORTED_MODULE_12__.default.desc, dangerouslySetInnerHTML: { __html: commonUtils_Sanitize__WEBPACK_IMPORTED_MODULE_10___default()(error.desc) } }),
                error.redirect && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentError_base_css__WEBPACK_IMPORTED_MODULE_12__.default.button, onClick: this.errorRedirect }, error.buttonText))));
        }
        else {
            return null;
        }
    };
    return PaymentError;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
PaymentError.propTypes = {
    errorAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().object)
};
PaymentError.defaultProps = {
    showPaymentFailureHalfCard: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentError);


/***/ }),

/***/ "./browser/components/payment/common/PaymentOptions/DisabledOptions/DisabledBNPL/index.js":
/*!************************************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOptions/DisabledOptions/DisabledBNPL/index.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./disabledBNPL.base.css */ "./browser/components/payment/common/PaymentOptions/DisabledOptions/DisabledBNPL/disabledBNPL.base.css");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
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
var _a;




var BNPL_NO_ACTIVE_ACCOUNT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.BNPL_NO_ACTIVE_ACCOUNT, BNPL_USER_NOT_ELIGIBLE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_3__.default.BNPL_USER_NOT_ELIGIBLE;
var message = (_a = {},
    _a[BNPL_NO_ACTIVE_ACCOUNT] = 'Your Flipkart Pay Later account has been deactivated, please check your Pay Later account status with Flipkart. You may use another payment method for this transaction.',
    _a[BNPL_USER_NOT_ELIGIBLE] = 'Your order can not be paid with Flipkart Pay Later as you may not have sufficient Pay Later balance,  your Pay Later bill may be overdue or your Flipkart account may have been blocked. Please use another payment method.',
    _a);
var DisabledBNPL = /** @class */ (function (_super) {
    __extends(DisabledBNPL, _super);
    function DisabledBNPL() {
        var _this = _super.call(this) || this;
        _this.state = { showModal: false };
        _this.toggleModal = _this.toggleModal.bind(_this);
        return _this;
    }
    DisabledBNPL.prototype.toggleModal = function () {
        this.setState(function (prevState) { return ({ showModal: !prevState.showModal }); });
    };
    DisabledBNPL.prototype.render = function () {
        var _a = this.props, providerCode = _a.instrumentData.providerCode, payMode = _a.payMode;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.notAvailable }, "Not available on this order"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.why, onClick: this.toggleModal }, "Why?"),
            this.state.showModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__.default, { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modal, cancelCallback: this.toggleModal, enableBackButton: payMode !== 'retry' }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.header }, "Flipkart Pay Later not available"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.message }, message[providerCode]),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _disabledBNPL_base_css__WEBPACK_IMPORTED_MODULE_1__.default.okay, onClick: onCancel }, "OKAY"))); }))));
    };
    return DisabledBNPL;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledBNPL);


/***/ }),

/***/ "./browser/components/payment/common/PaymentOptions/index.js":
/*!*******************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOptions/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tabComponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabComponents */ "./browser/components/payment/common/PaymentOptions/tabComponents.js");
/* harmony import */ var _Options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Options */ "./browser/components/payment/common/Options/index.js");
/* harmony import */ var _Notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Notifications */ "./browser/components/payment/common/Notifications/index.js");
/* harmony import */ var _FreePurchase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FreePurchase */ "./browser/components/payment/common/FreePurchase/index.js");
/* harmony import */ var _Notifications_Suggestion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Notifications/Suggestion */ "./browser/components/payment/common/Notifications/Suggestion/index.js");
/* harmony import */ var _CreditsBlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CreditsBlock */ "./browser/components/payment/common/CreditsBlock/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./paymentOptionsHelper */ "./browser/components/payment/common/PaymentOptions/paymentOptionsHelper.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
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


//Common Components













var COD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.COD, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.SAVED_INSTRUMENT, RECOMMENDED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.RECOMMENDED_INSTRUMENT, PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.PAY_LATER, CARD_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.CARD_TYPE, WALLET_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.WALLET_TYPE, EMI_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.EMI_TYPE, NETBANKING = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.NETBANKING, UPI = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.UPI, GIFTCARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.GIFTCARD, CREDIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.CREDIT_CARD, DEBIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.DEBIT_CARD, MYNTRA_CREDIT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.MYNTRA_CREDIT, LOYALTY_POINTS = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.LOYALTY_POINTS, INSTRUMENT_ELIGIBLE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_9__.default.INSTRUMENT_ELIGIBLE_CODE;
var boundFuncs = [
    'onSwitchTab',
    'onTabClick',
    'setSavedInstrumentRef',
    'setRecommendedInstrumentRef',
    'closeTab',
    'setPaymentOptionRef',
    'triggerScrollEvent'
];
var PaymentOptions = /** @class */ (function (_super) {
    __extends(PaymentOptions, _super);
    function PaymentOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.getInstalledUPIApps = function () {
            return new Promise(function (resolve) {
                (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_14__.getInstalledAppsPromise)().then(function (_a) {
                    var installedApps = _a.installedApps;
                    resolve(installedApps);
                });
            });
        };
        _this.getNumberOfUpiOffers = function (offer, instrumentData, switchConfig) { return __awaiter(_this, void 0, void 0, function () {
            var count, apps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!offer)
                            return [2 /*return*/, 0];
                        count = 0;
                        apps = [];
                        return [4 /*yield*/, this.getInstalledUPIApps()];
                    case 1:
                        apps = _a.sent();
                        offer.forEach(function (off) {
                            var code = off.bankCode.toLowerCase();
                            if (switchConfig &&
                                apps &&
                                switchConfig.indexOf(code) != -1 &&
                                (apps.indexOf(code) != -1 || apps.indexOf(off.bankCode) != -1)) {
                                (instrumentData || []).forEach(function (data) {
                                    if (data.bankCode.toLowerCase() == code && !data.disable) {
                                        count += off.offerDetails.length;
                                    }
                                });
                            }
                        });
                        this.setState({ upiAppsCount: count });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getNumberOfUpiOffersDesktop = function (offer, instrumentData, switchConfig) {
            if (!offer)
                return 0;
            var count = 0;
            offer.forEach(function (off) {
                var code = off.bankCode.toLowerCase();
                if (switchConfig && switchConfig.indexOf(code) != -1) {
                    (instrumentData || []).forEach(function (data) {
                        if (data.bankCode.toLowerCase() == code &&
                            !data.disable &&
                            data.popular) {
                            count += off.offerDetails.length;
                        }
                    });
                }
            });
            _this.setState({ upiAppsCount: count });
        };
        boundFuncs.forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        _this.orderedInstrumentList = _this.getOrderedInstrumentList();
        _this.state = {
            upiAppsCount: 0
        };
        return _this;
    }
    PaymentOptions.prototype.componentDidMount = function () {
        var _this = this;
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('RECOMMENDED_OPTIONS')) {
            triggerEvent('PAYMENT_OPTIONS_ORDER', {
                custom: {
                    custom: {
                        v1: this.orderedInstrumentList.join('|')
                    }
                }
            });
        }
        this.props.triggerWebengageEvent({ amount: this.props.totalPayable });
        var codInstrumentCode = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'paymentConfig.instrumentData.cod.code');
        var isNuNudgeEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('NEW_USER_COD_NUDGE');
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.userDetails.isFirstTimeCustomer') &&
            codInstrumentCode === INSTRUMENT_ELIGIBLE_CODE) {
            var eventObj = {
                custom: {
                    custom: {
                        v1: (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.getUidx)(),
                        v2: codInstrumentCode
                    },
                    widget: {
                        name: isNuNudgeEnabled
                            ? 'cod_preferred_method_highlight'
                            : 'cod_eligible_new_user_flag',
                        data_set: {
                            entity_optional_attributes: this.props.totalPayable
                        }
                    }
                }
            };
            if (isNuNudgeEnabled) {
                triggerEvent('HIGHLIGHT_COD_NU_LOAD', eventObj);
            }
            else {
                triggerEvent('NOT_HIGHLIGHT_COD_NU_LOAD', eventObj);
            }
        }
        if (this.paymentOptionRef) {
            this.triggerObserver();
        }
        this.orderedInstrumentList.map(function (instrument) {
            var off = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this, "props.inlineOffer.paymentInstruments.".concat(instrument), '');
            if (off && off.length > 0)
                triggerEvent('INLINE_OFFER_AVAILABLE', {
                    custom: {
                        custom: {
                            v1: instrument
                        }
                    }
                });
        });
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('INLINE_OFFER')) {
            var upiOptions_1 = '';
            this.props.paymentOptions.paymentInstrumentDetails.map(function (instrument) {
                if (instrument.type === 'upi')
                    upiOptions_1 = instrument.paymentInstrumentDetails.data;
            });
            if ((0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isAndroidApp)() || (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.isIOSApp)())
                this.getNumberOfUpiOffers(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, "props.inlineOffer.paymentInstruments.upi", ''), upiOptions_1, (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('UPI_CONFIG').supportedUPI);
            else
                this.getNumberOfUpiOffersDesktop(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, "props.inlineOffer.paymentInstruments.upi", ''), upiOptions_1, (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('UPI_CONFIG').supportedUPI);
        }
    };
    PaymentOptions.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(prevProps, 'cartData.price.total') !==
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.price.total') &&
            this.paymentOptionRef) {
            this.triggerObserver();
        }
    };
    PaymentOptions.prototype.setSavedInstrumentRef = function (node) {
        this.savedInstrumentRef = node;
    };
    PaymentOptions.prototype.setRecommendedInstrumentRef = function (node) {
        this.recommendedInstrumentRef = node;
    };
    PaymentOptions.prototype.setPaymentOptionRef = function (node) {
        this.paymentOptionRef = node;
    };
    PaymentOptions.prototype.triggerObserver = function () {
        var _this = this;
        var node = this.paymentOptionRef;
        try {
            var observer = new IntersectionObserver(function (entries, observer) {
                var entry = entries[0];
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    _this.triggerScrollEvent();
                    observer.unobserve(entry.target);
                }
            }, {
                threshold: 1
            });
            node && observer.observe(node);
        }
        catch (e) {
            node &&
                document.addEventListener('scroll', (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_8__.onEnteringViewport)(node, this.triggerScrollEvent));
        }
    };
    PaymentOptions.prototype.triggerScrollEvent = function () {
        var orderAmount = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.price.total') +
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_13__.getAppliedInstrument)('giftcard', lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData', {})), 'value', 0);
        triggerEvent('PAYMENTS_ICON_REVAMP', {
            custom: {
                custom: {
                    v1: orderAmount
                },
                widget: {
                    name: 'payment_cards_upi_flag'
                }
            }
        });
    };
    PaymentOptions.prototype.onSwitchTab = function (tabId) {
        if (this.recommendedInstrumentRef && tabId !== '') {
            this.recommendedInstrumentRef.clearSelection();
        }
        else if (this.savedInstrumentRef && tabId !== '') {
            this.savedInstrumentRef.clearSelection();
        }
    };
    PaymentOptions.prototype.onTabClick = function (e) {
        var tab = e.currentTarget.id;
        triggerEvent('PAYMENT_TAB_CLICK', {
            gaLabel: tab
        });
        tab === SAVED_INSTRUMENT && triggerEvent('OPEN_SAVED_CARDS');
    };
    PaymentOptions.prototype.closeTab = function () {
        this.props.mode === 'mobile' && triggerEvent('OPEN_SAVED_CARDS');
    };
    PaymentOptions.prototype.getOrderedInstrumentList = function () {
        var order;
        var isFirstTimeCustomer = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.userDetails.isFirstTimeCustomer', false);
        var isPaymentOptionReorderEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('PAYMENT_OPTION_REORDER');
        var isPaymentOptionReorderV2Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('PAYMENT_OPTION_REORDERV2');
        var paymentPersonalizationConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('RECOMMENDED_OPTIONS') &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentPersonalizationConfig, 'enablePaymentOptionPersonalization') &&
            !(isFirstTimeCustomer && isPaymentOptionReorderEnabled)) {
            order = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this, 'props.paymentOptions.paymentInstrumentDetails', []).reduce(function (acc, instrument) {
                if ((instrument.type === CREDIT_CARD ||
                    instrument.type === DEBIT_CARD) &&
                    acc.indexOf(CARD_TYPE) === -1) {
                    acc.push(CARD_TYPE);
                }
                if ([
                    GIFTCARD,
                    LOYALTY_POINTS,
                    MYNTRA_CREDIT,
                    CREDIT_CARD,
                    DEBIT_CARD
                ].indexOf(instrument.type) === -1) {
                    acc.push(instrument.type);
                }
                return acc;
            }, [RECOMMENDED_INSTRUMENT]);
        }
        else {
            var paymentOptionOrdering = 'default';
            if (isPaymentOptionReorderEnabled && isFirstTimeCustomer) {
                paymentOptionOrdering = 'reorder';
            }
            else if (isPaymentOptionReorderV2Enabled) {
                paymentOptionOrdering = 'reorderV2';
            }
            order = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('PAYMENT_OPTIONS'), paymentOptionOrdering) || [
                SAVED_INSTRUMENT,
                PAY_LATER,
                COD,
                CARD_TYPE,
                UPI,
                WALLET_TYPE,
                NETBANKING,
                EMI_TYPE
            ];
            //for payment personalization replacing saved instrument with recommended isntrument
            if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('RECOMMENDED_OPTIONS')) {
                order[0] = RECOMMENDED_INSTRUMENT;
            }
        }
        return order;
    };
    PaymentOptions.prototype.render = function () {
        var _this = this;
        var _a = this.props, LayoutClass = _a.LayoutClass, styles = _a.styles, mode = _a.mode, defaultSelect = _a.defaultSelect, setRef = _a.setRef, setPaymentFailureAttributes = _a.setPaymentFailureAttributes, showPaymentFailureHalfCard = _a.showPaymentFailureHalfCard, creditsBalance = _a.creditsBalance, bankDiscount = _a.bankDiscount, outstandingAmount = _a.outstandingAmount, updateCreditsBalance = _a.updateCreditsBalance, toggleRetryGC = _a.toggleRetryGC, _b = _a.paymentConfig, instrumentData = _b.instrumentData, savedInstruments = _b.savedInstruments, paymentConfig = _a.paymentConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["LayoutClass", "styles", "mode", "defaultSelect", "setRef", "setPaymentFailureAttributes", "showPaymentFailureHalfCard", "creditsBalance", "bankDiscount", "outstandingAmount", "updateCreditsBalance", "toggleRetryGC", "paymentConfig", "paymentConfig", "inlineOffer"]);
        var cartData = restProps.cartData, paymentOptions = restProps.paymentOptions, handlePaymentAction = restProps.handlePaymentAction, addMyntraInstrumentsData = restProps.addMyntraInstrumentsData, refreshPageData = restProps.refreshPageData, updateStickyButton = restProps.updateStickyButton, switchTab = restProps.switchTab, setLoader = restProps.setLoader, updatePageData = restProps.updatePageData, isExchangeCart = restProps.isExchangeCart, payMode = restProps.payMode, retryGCappliedValue = restProps.retryGCappliedValue;
        var _c = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('SAVED_CARD_CONSENT').phase2Enabled, phase2Enabled = _c === void 0 ? false : _c;
        var isSavedCardPurged = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(paymentOptions, 'savedCardPurged', false) &&
            mode === 'mobile' &&
            phase2Enabled;
        var tabNameConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_10__.getKVPairValue)('PAYMENT_TAB_NAME');
        var isSavedInstrumentsShownMobile = !(0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_11__.isFeatureEnabled)('RECOMMENDED_OPTIONS') &&
            ((savedInstruments &&
                savedInstruments.length <= 0 &&
                isSavedCardPurged) ||
                (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__.showSavedInstrumentsInMobile)(mode, savedInstruments, outstandingAmount));
        var isRecommendedInstrumentsShownMobile = (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__.showRecommendedInstrumentsInMobile)(mode, instrumentData[RECOMMENDED_INSTRUMENT], outstandingAmount);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            mode === 'desktop' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.pModeHeading }, " Choose Payment Mode ")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Notifications__WEBPACK_IMPORTED_MODULE_4__.default, null),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_CreditsBlock__WEBPACK_IMPORTED_MODULE_7__.default, { payMode: payMode, cartData: cartData, creditsBalance: creditsBalance, paymentOptions: paymentOptions, deviceMode: mode, retryGCappliedValue: retryGCappliedValue, isExchangeCart: isExchangeCart, addMyntraInstrumentsData: addMyntraInstrumentsData, updateCreditsBalance: updateCreditsBalance, toggleRetryGC: toggleRetryGC, handlePaymentAction: handlePaymentAction, updatePageData: updatePageData, showTab: _paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__.showTab, setLoader: setLoader }),
            !showPaymentFailureHalfCard &&
                (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__.showSuggestionNotification)(instrumentData[COD], outstandingAmount) && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Notifications_Suggestion__WEBPACK_IMPORTED_MODULE_6__.default, { switchTab: switchTab, mode: mode }),
            isRecommendedInstrumentsShownMobile ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_3__.RecommendedInstruments, __assign({ ref: this.setRecommendedInstrumentRef, bankDiscount: bankDiscount, outstandingAmount: outstandingAmount, instrumentData: instrumentData[RECOMMENDED_INSTRUMENT], deviceMode: mode, handlePaymentAction: handlePaymentAction, setPaymentFailureAttributes: setPaymentFailureAttributes, showPaymentFailureHalfCard: showPaymentFailureHalfCard, inlineOffer: inlineOffer }, restProps))) : isSavedInstrumentsShownMobile ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_3__.SavedInstruments, __assign({ ref: this.setSavedInstrumentRef, bankDiscount: bankDiscount, deviceMode: mode, handlePaymentAction: handlePaymentAction, setPaymentFailureAttributes: setPaymentFailureAttributes, paymentConfig: paymentConfig, showPaymentFailureHalfCard: showPaymentFailureHalfCard }, restProps))) : null,
            mode === 'mobile' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: styles.tabBarHeading, ref: this.setPaymentOptionRef }, isRecommendedInstrumentsShownMobile ||
                isSavedInstrumentsShownMobile
                ? 'OTHER PAYMENT OPTIONS'
                : 'PAYMENT OPTIONS')),
            outstandingAmount === '0' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_FreePurchase__WEBPACK_IMPORTED_MODULE_5__.default, __assign({ mode: mode }, restProps, { setPaymentFailureAttributes: setPaymentFailureAttributes }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(LayoutClass, { defaultSelect: defaultSelect, mode: mode, ref: setRef, className: styles.paymentOptionsBlock, onTabClick: this.onTabClick, onSwitchTab: this.onSwitchTab, closeTab: this.closeTab, isFirstTimeCustomer: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'cartData.userDetails.isFirstTimeCustomer', false) }, this.orderedInstrumentList.map(function (instrument, index) {
                var createTab = (0,_tabComponents__WEBPACK_IMPORTED_MODULE_2__.getTabCreator)(instrument);
                return (createTab &&
                    createTab(__assign(__assign({ paymentConfig: paymentConfig, mode: mode, outstandingAmount: outstandingAmount, bankDiscount: bankDiscount, handlePaymentAction: handlePaymentAction, refreshPageData: refreshPageData, updateStickyButton: updateStickyButton, setPaymentFailureAttributes: setPaymentFailureAttributes, tabNameConfig: tabNameConfig, showPaymentFailureHalfCard: showPaymentFailureHalfCard, rank: index + 1, inlineOffer: inlineOffer }, _this.state), restProps)));
            }))),
            (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_12__.showTab)(GIFTCARD, instrumentData[GIFTCARD], { outstandingAmount: outstandingAmount }) && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_3__.GiftCard, { mode: mode, payMode: payMode, instrumentData: instrumentData[GIFTCARD], handlePaymentAction: handlePaymentAction, refreshPageData: refreshPageData, updateStickyButton: updateStickyButton, className: styles.giftCardBlock }))));
    };
    return PaymentOptions;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
PaymentOptions.defaultProps = {
    updateStickyButton: function () { }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentOptions);


/***/ }),

/***/ "./browser/components/payment/common/PaymentOptions/paymentOptionsHelper.js":
/*!**********************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOptions/paymentOptionsHelper.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showTab": () => (/* binding */ showTab),
/* harmony export */   "showSuggestionNotification": () => (/* binding */ showSuggestionNotification),
/* harmony export */   "showSavedInstrumentsInMobile": () => (/* binding */ showSavedInstrumentsInMobile),
/* harmony export */   "showRecommendedInstrumentsInMobile": () => (/* binding */ showRecommendedInstrumentsInMobile),
/* harmony export */   "disabledTab": () => (/* binding */ disabledTab)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/helper */ "./utils/helper/index.js");
/* harmony import */ var commonUtils_helper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_helper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");







var RECOMMENDED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.RECOMMENDED_INSTRUMENT, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.SAVED_INSTRUMENT, INSTRUMENT_ELIGIBLE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_ELIGIBLE_CODE, INSTRUMENT_NOT_ELIGIBLE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.INSTRUMENT_NOT_ELIGIBLE_CODE, GIFTCARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.GIFTCARD, WALLET_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.WALLET_TYPE, AUTO_SUBMIT_TAB_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.AUTO_SUBMIT_TAB_TYPE, SAVEDCARD_LIMIT_REACHED_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.SAVEDCARD_LIMIT_REACHED_CODE, PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.PAY_LATER, BNPL_NO_PROVIDER_DATA = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_NO_PROVIDER_DATA, BNPL_NO_ACTIVE_ACCOUNT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_NO_ACTIVE_ACCOUNT, BNPL_USER_NOT_ELIGIBLE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_USER_NOT_ELIGIBLE, BNPL_PROVIDER_DATA_INCOMPLETE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_PROVIDER_DATA_INCOMPLETE, BNPL_ERROR_RESPONSE_FROM_PROVIDER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_ERROR_RESPONSE_FROM_PROVIDER, BNPL_USER_NOT_WHITELISTED = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.BNPL_USER_NOT_WHITELISTED, SAVING_CARD_NOT_ALLOWED_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_6__.default.SAVING_CARD_NOT_ALLOWED_CODE;
var showTab = function (option, instrumentData, config) {
    if (instrumentData === void 0) { instrumentData = {}; }
    if (config === void 0) { config = {}; }
    var code = instrumentData.code;
    var show = false;
    if (code === INSTRUMENT_ELIGIBLE_CODE ||
        (config.tabType !== AUTO_SUBMIT_TAB_TYPE &&
            lodash_get__WEBPACK_IMPORTED_MODULE_0___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__.getKVPairValue)('PAYMENT_OPTIONS_ERROR'), code, false))) {
        show = true;
    }
    if (code === INSTRUMENT_NOT_ELIGIBLE_CODE) {
        show = false;
    }
    switch (option) {
        case RECOMMENDED_INSTRUMENT:
            return config.mode !== 'mobile' && (instrumentData || []).length > 0;
        case SAVED_INSTRUMENT:
            (code === SAVEDCARD_LIMIT_REACHED_CODE ||
                code === SAVING_CARD_NOT_ALLOWED_CODE) &&
                (show = true);
            return (show &&
                config.mode !== 'mobile' &&
                (lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(instrumentData, 'paymentInstrumentDetails.data', []) || [])
                    .length > 0);
        case PAY_LATER:
            var providerCode = ((lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(instrumentData, 'paymentInstrumentDetails.data') || []).find(function (paymentType) { return paymentType.id === 1; }) || {}).providerCode;
            return (code === INSTRUMENT_ELIGIBLE_CODE &&
                providerCode &&
                [
                    BNPL_NO_PROVIDER_DATA,
                    BNPL_PROVIDER_DATA_INCOMPLETE,
                    BNPL_ERROR_RESPONSE_FROM_PROVIDER,
                    BNPL_USER_NOT_WHITELISTED
                ].indexOf(providerCode) === -1);
        case WALLET_TYPE:
            var walletData = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(instrumentData, 'paymentInstrumentDetails.data');
            return (show &&
                (!walletData || !!walletData.find(function (wallet) { return !wallet.directDisplay; })));
        case GIFTCARD:
            return show && config.outstandingAmount !== '0';
        default:
            return show;
    }
};
var showSuggestionNotification = function (_a, outstandingAmount) {
    var _b = _a === void 0 ? {} : _a, code = _b.code;
    if (code === INSTRUMENT_ELIGIBLE_CODE &&
        !(0,commonUtils_helper__WEBPACK_IMPORTED_MODULE_3__.isGiftcardContext)() &&
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isSessionStorageEnabled)()) {
        var failureCount = +(0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_2__.getPaymentFailureCount)();
        var failureThreshold = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_4__.getKVPairValue)('ONLINE_PAYMENT_FAILURE_THRESHOLD');
        return failureCount >= failureThreshold && outstandingAmount !== '0';
    }
    return false;
};
var showSavedInstrumentsInMobile = function (mode, savedInstruments, outstandingAmount) {
    return mode === 'mobile' &&
        savedInstruments &&
        savedInstruments.length > 0 &&
        outstandingAmount !== '0';
};
var showRecommendedInstrumentsInMobile = function (mode, recommendedInstruments, outstandingAmount) {
    return (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_5__.isFeatureEnabled)('RECOMMENDED_OPTIONS') &&
        mode === 'mobile' &&
        recommendedInstruments &&
        recommendedInstruments.length > 0 &&
        outstandingAmount !== '0';
};
var disabledTab = function (option, instrumentData) {
    switch (option) {
        case PAY_LATER:
            var providerCode = ((lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(instrumentData, 'paymentInstrumentDetails.data') || []).find(function (paymentType) { return paymentType.id === 1; }) || {}).providerCode;
            return (providerCode === BNPL_NO_ACTIVE_ACCOUNT ||
                providerCode === BNPL_USER_NOT_ELIGIBLE);
        default:
            return false;
    }
};



/***/ }),

/***/ "./browser/components/payment/common/PaymentOptions/tabComponents.js":
/*!***************************************************************************!*\
  !*** ./browser/components/payment/common/PaymentOptions/tabComponents.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTabCreator": () => (/* binding */ getTabCreator),
/* harmony export */   "getTabDisplay": () => (/* binding */ getTabDisplay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/TabBar */ "./browser/components/common/TabBar/index.js");
/* harmony import */ var _Options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Options */ "./browser/components/payment/common/Options/index.js");
/* harmony import */ var _DisabledOptions_DisabledBNPL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DisabledOptions/DisabledBNPL */ "./browser/components/payment/common/PaymentOptions/DisabledOptions/DisabledBNPL/index.js");
/* harmony import */ var commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/PaymentConstants */ "./browser/utils/PaymentConstants.js");
/* harmony import */ var _paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paymentOptionsHelper */ "./browser/components/payment/common/PaymentOptions/paymentOptionsHelper.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonComp/ImmobilizeComponent */ "./browser/components/common/ImmobilizeComponent/index.js");
/* harmony import */ var commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! commonBrowserUtils/PaymentHelper */ "./browser/utils/PaymentHelper/index.js");
/* harmony import */ var commonComp_Sprite__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! commonComp/Sprite */ "./browser/components/common/Sprite/index.js");
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! commonResources/colors */ "./browser/components/resources/colors.js");
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(commonResources_colors__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./paymentOptions.base.css */ "./browser/components/payment/common/PaymentOptions/paymentOptions.base.css");
/* harmony import */ var iconComp_CreditCard_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! iconComp/CreditCard.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/CreditCard.jsx");
/* harmony import */ var iconComp_UPI_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! iconComp/UPI.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/UPI.jsx");
/* harmony import */ var iconComp_NetBanking_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! iconComp/NetBanking.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/NetBanking.jsx");
/* harmony import */ var iconComp_Wallet_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! iconComp/Wallet.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Wallet.jsx");
/* harmony import */ var iconComp_EMI_jsx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! iconComp/EMI.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/EMI.jsx");
/* harmony import */ var iconComp_COD_jsx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! iconComp/COD.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/COD.jsx");
/* harmony import */ var iconComp_Star_jsx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! iconComp/Star.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Star.jsx");
/* harmony import */ var iconComp_Flipkart_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! iconComp/Flipkart.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Flipkart.jsx");
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
var _a;























var IconAnimation = function (_a) {
    var _b = _a.paymentInstrumentType, paymentInstrumentType = _b === void 0 ? '' : _b;
    var isUpi = paymentInstrumentType === 'upi';
    var isCard = paymentInstrumentType === 'card';
    var iconConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('PAYMENTS_ICON_REVAMP');
    var upiIcons = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(iconConfig, 'upi') || ['phonepe', 'googlepay', 'bhim'];
    var cardIcons = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(iconConfig, 'card') || ['rupay', 'mastercard', 'visa'];
    return isUpi
        ? upiIcons.map(function (icon) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_9__.ImmobilizedSprite, { name: "logo-".concat(icon), className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default[icon] })); })
        : isCard
            ? cardIcons.map(function (icon) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_9__.ImmobilizedSprite, { name: "cardv2-".concat(icon), className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default[icon] })); })
            : null;
};
var getTabDisplay = function (_a) {
    var text = _a.text, offerString = _a.offerString, _b = _a.subText, subText = _b === void 0 ? '' : _b, icon = _a.icon, _c = _a.prefix, prefix = _c === void 0 ? '' : _c, _d = _a.iconSize, iconSize = _d === void 0 ? {} : _d, _e = _a.showIconInfo, showIconInfo = _e === void 0 ? false : _e, _f = _a.paymentInstrumentType, paymentInstrumentType = _f === void 0 ? '' : _f;
    return function (selected) {
        var SVGIcon = icon;
        var showIntrumentIconInfo = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('PAYMENT_ICON_REVAMP') && showIconInfo;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.tabDisplayContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.tabDisplayIcon },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(SVGIcon, __assign({ color: selected ? (commonResources_colors__WEBPACK_IMPORTED_MODULE_12___default().watermelon) : (commonResources_colors__WEBPACK_IMPORTED_MODULE_12___default().black) }, iconSize, { prefix: prefix }))),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.tabText },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.tabDisplayText }, text),
                subText,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.inlineOffer }, offerString)),
            showIntrumentIconInfo && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.fadein },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(IconAnimation, { paymentInstrumentType: paymentInstrumentType })))));
    };
};
var getWalletTabDisplay = function (walletCode) {
    if (walletCode === void 0) { walletCode = ''; }
    walletCode = walletCode.toLowerCase();
    var iconDisplayWallets = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('WALLET_CONFIG').iconDisplayWallets;
    if (iconDisplayWallets.indexOf(walletCode) !== -1) {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Sprite__WEBPACK_IMPORTED_MODULE_11__.default, { name: "wallet-tab-".concat(walletCode) });
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, walletCode.toUpperCase());
    }
};
var RECOMMENDED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.RECOMMENDED_INSTRUMENT, COD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.COD, SAVED_INSTRUMENT = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_INSTRUMENT, SAVED_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.SAVED_CARD, CARD_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.CARD_TYPE, CREDIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.CREDIT_CARD, DEBIT_CARD = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.DEBIT_CARD, UPI = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.UPI, NETBANKING = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.NETBANKING, EMI_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.EMI_TYPE, WALLET_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.WALLET_TYPE, WALLET_TAB_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.WALLET_TAB_TYPE, AUTO_SUBMIT_TAB_TYPE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.AUTO_SUBMIT_TAB_TYPE, PAY_LATER = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.PAY_LATER, INSTRUMENT_ELIGIBLE_CODE = commonBrowserUtils_PaymentConstants__WEBPACK_IMPORTED_MODULE_4__.default.INSTRUMENT_ELIGIBLE_CODE;
var createRecommendedInstrument = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig", "inlineOffer"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(RECOMMENDED_INSTRUMENT, ".name"), 'Recommended');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: RECOMMENDED_INSTRUMENT, display: getTabDisplay({
            text: text,
            icon: iconComp_Star_jsx__WEBPACK_IMPORTED_MODULE_21__.default,
            iconSize: { width: 14, height: 14 }
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.RecommendedInstruments, __assign({ instrumentData: instrumentData[RECOMMENDED_INSTRUMENT], deviceMode: mode, inlineOffer: inlineOffer }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(RECOMMENDED_INSTRUMENT, instrumentData[RECOMMENDED_INSTRUMENT], {
            mode: mode
        }) }));
};
var createPayLater = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, outstandingAmount = _a.outstandingAmount, tabNameConfig = _a.tabNameConfig, restProps = __rest(_a, ["paymentConfig", "mode", "outstandingAmount", "tabNameConfig"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(PAY_LATER, ".name"), 'Flipkart Pay Later');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: PAY_LATER, display: getTabDisplay({
            text: text,
            icon: iconComp_Flipkart_jsx__WEBPACK_IMPORTED_MODULE_22__.default,
            prefix: 'flipkart-paylater',
            iconSize: { width: 16, height: 16 }
        }), disabledContent: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_DisabledOptions_DisabledBNPL__WEBPACK_IMPORTED_MODULE_3__.default, { instrumentData: instrumentData.BNPL, payMode: restProps.payMode }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.BNPL, __assign({ deviceMode: mode, outstandingAmount: outstandingAmount, instrumentData: instrumentData.BNPL }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(PAY_LATER, instrumentData[PAY_LATER]), disabled: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.disabledTab)(PAY_LATER, instrumentData[PAY_LATER]) }));
};
var createSavedInstrument = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, paymentConfig = _a.paymentConfig, mode = _a.mode, bankDiscount = _a.bankDiscount, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["paymentConfig", "paymentConfig", "mode", "bankDiscount", "tabNameConfig", "inlineOffer"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(SAVED_INSTRUMENT, ".name"), 'Saved Payment Options');
    var _b = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('SAVED_CARD_CONSENT'), _c = _b.phase2Enabled, phase2Enabled = _c === void 0 ? false : _c, purgedCardInfo = _b.purgedCardInfo;
    var isSaveCardPurged = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(restProps, 'paymentOptions.savedCardPurged', false) &&
        mode === 'desktop' &&
        phase2Enabled &&
        lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(purgedCardInfo, 'enabled.savedInstruments');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: SAVED_INSTRUMENT, display: getTabDisplay({
            text: text,
            icon: iconComp_Star_jsx__WEBPACK_IMPORTED_MODULE_21__.default,
            iconSize: { width: 14, height: 14 }
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.SavedInstruments, __assign({ bankDiscount: bankDiscount, paymentConfig: paymentConfig, deviceMode: mode, inlineOffer: inlineOffer }, restProps)), show: isSaveCardPurged ||
            (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(SAVED_INSTRUMENT, instrumentData[SAVED_INSTRUMENT], {
                mode: mode
            }) }));
};
var createCard = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, bankDiscount = _a.bankDiscount, inlineOffer = _a.inlineOffer, tabNameConfig = _a.tabNameConfig, restProps = __rest(_a, ["paymentConfig", "mode", "bankDiscount", "inlineOffer", "tabNameConfig"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(CARD_TYPE, ".name"), 'Credit/Debit Card');
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(inlineOffer, 'paymentInstruments.card', '');
    var offerCount = offer.length;
    var offerString = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getOfferString)(offerCount);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: CARD_TYPE, display: getTabDisplay({
            text: text,
            icon: iconComp_CreditCard_jsx__WEBPACK_IMPORTED_MODULE_15__.default,
            offerString: offerString,
            iconSize: { width: 18, height: 12 },
            showIconInfo: true,
            paymentInstrumentType: 'card'
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.Card, __assign({ instrumentData: {
                debit: instrumentData[DEBIT_CARD],
                credit: instrumentData[CREDIT_CARD]
            }, savedCardInstrumentData: instrumentData[SAVED_CARD], deviceMode: mode, bankDiscount: bankDiscount, offer: offer }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(CREDIT_CARD, instrumentData[CREDIT_CARD]) &&
            (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(DEBIT_CARD, instrumentData[DEBIT_CARD]) }));
};
var createNetBanking = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig", "inlineOffer"]);
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(inlineOffer, 'paymentInstruments.netbanking', '');
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(NETBANKING, ".name"), 'Net Banking');
    var count = getOfferCount(offer, lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(instrumentData, 'netbanking.paymentInstrumentDetails.data', ''));
    var offerString = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getOfferString)(count);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: NETBANKING, display: getTabDisplay({
            text: text,
            offerString: offerString,
            icon: iconComp_NetBanking_jsx__WEBPACK_IMPORTED_MODULE_17__.default,
            iconSize: { width: 18, height: 16 }
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.NetBanking, __assign({ instrumentData: instrumentData[NETBANKING], offer: offer, deviceMode: mode }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(NETBANKING, instrumentData[NETBANKING]) }));
};
var createCOD = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, tabNameConfig = _a.tabNameConfig, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig"]);
    var cartData = restProps.cartData;
    var shippingMethod = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(cartData, 'shippingData.method', 'NORMAL');
    var cardOnDelivery = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(cartData, "serviceability.".concat(shippingMethod === 'NORMAL' ? 'standardShippingInfo' : 'valueShippingInfo', ".flags.cardOnDelivery.value"), false);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(cardOnDelivery ? 'cardCod' : 'cod', ".name"), 'Pay on delivery (Cash/UPI)');
    var newUserCodNudgeText = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('NEW_USER_COD_NUDGE') &&
        lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(cartData, 'userDetails.isFirstTimeCustomer') &&
        lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(instrumentData[COD], 'code') === INSTRUMENT_ELIGIBLE_CODE &&
        lodash_get__WEBPACK_IMPORTED_MODULE_13___default()((0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__.getGrowthHackConfigValue)('NEW_USER_COD_NUDGE'), 'text', '');
    newUserCodNudgeText = newUserCodNudgeText && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _paymentOptions_base_css__WEBPACK_IMPORTED_MODULE_14__.default.greenText }, newUserCodNudgeText));
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: COD, display: getTabDisplay({
            text: text,
            subText: newUserCodNudgeText,
            icon: iconComp_COD_jsx__WEBPACK_IMPORTED_MODULE_20__.default,
            iconSize: { width: 20, height: 14 }
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.Cod, __assign({ instrumentData: instrumentData[COD], deviceMode: mode }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(COD, instrumentData[COD]) }));
};
var createUPI = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, upiAppsCount = _a.upiAppsCount, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig", "inlineOffer", "upiAppsCount"]);
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(inlineOffer, 'paymentInstruments.upi', '');
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(UPI, ".name"), 'PhonePe/BHIM UPI');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: UPI, display: getTabDisplay({
            text: text,
            icon: iconComp_UPI_jsx__WEBPACK_IMPORTED_MODULE_16__.default,
            iconSize: { width: 18, height: 12 },
            showIconInfo: true,
            paymentInstrumentType: 'upi',
            offerString: (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getOfferString)(upiAppsCount)
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.Upi, __assign({ instrumentData: instrumentData[UPI], deviceMode: mode, offer: offer }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(UPI, instrumentData[UPI]) }));
};
var createWallet = function (_a) {
    var _b = _a.paymentConfig, instrumentData = _b.instrumentData, walletConfig = _b.walletConfig, mode = _a.mode, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig", "inlineOffer"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(WALLET_TYPE, ".name"), 'Paytm/Wallets');
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(inlineOffer, 'paymentInstruments.wallet', '');
    var count = getOfferCount(offer, lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(instrumentData, 'wallet.paymentInstrumentDetails.data'), (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('WALLET_CONFIG').supportedWallets);
    var offerString = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getOfferString)(count);
    var WalletFragment = (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: WALLET_TYPE, display: getTabDisplay({
                text: text,
                offerString: offerString,
                icon: iconComp_Wallet_jsx__WEBPACK_IMPORTED_MODULE_18__.default,
                iconSize: { width: 18, height: 16 }
            }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.Wallets, __assign({ instrumentData: instrumentData[WALLET_TYPE], deviceMode: mode, offer: offer }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(WALLET_TYPE, instrumentData[WALLET_TYPE]) }),
        walletConfig.walletTabs.map(function (wallet) {
            var id = wallet.name.toLowerCase();
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { key: id, id: id, display: getWalletTabDisplay(wallet.bankCode), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.WalletTab, __assign({ wallet: wallet, instrumentData: instrumentData[WALLET_TYPE], deviceMode: mode }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(WALLET_TAB_TYPE, instrumentData[WALLET_TYPE], {
                    tabType: AUTO_SUBMIT_TAB_TYPE
                }) }));
        })));
    return WalletFragment.props.children;
};
var createEMI = function (_a) {
    var instrumentData = _a.paymentConfig.instrumentData, mode = _a.mode, tabNameConfig = _a.tabNameConfig, inlineOffer = _a.inlineOffer, restProps = __rest(_a, ["paymentConfig", "mode", "tabNameConfig", "inlineOffer"]);
    var text = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(tabNameConfig, "".concat(EMI_TYPE, ".name"), 'EMI');
    var offer = lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(inlineOffer, 'paymentInstruments.emi', '');
    var count = getOfferCount(offer, lodash_get__WEBPACK_IMPORTED_MODULE_13___default()(instrumentData, 'emi.paymentInstrumentDetails.data'), (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_6__.getKVPairValue)('EMI_CONFIG').supportedEMIBankCode);
    var offerString = (0,commonBrowserUtils_PaymentHelper__WEBPACK_IMPORTED_MODULE_10__.getOfferString)(count);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_TabBar__WEBPACK_IMPORTED_MODULE_1__.Tab, { id: EMI_TYPE, display: getTabDisplay({
            text: text,
            offerString: offerString,
            icon: iconComp_EMI_jsx__WEBPACK_IMPORTED_MODULE_19__.default,
            iconSize: { width: 18, height: 16 }
        }), content: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Options__WEBPACK_IMPORTED_MODULE_2__.EMI, __assign({ instrumentData: instrumentData[EMI_TYPE], deviceMode: mode, offer: offer }, restProps)), show: (0,_paymentOptionsHelper__WEBPACK_IMPORTED_MODULE_5__.showTab)(EMI_TYPE, instrumentData[EMI_TYPE], {
            tabType: AUTO_SUBMIT_TAB_TYPE
        }) }));
};
var getOfferCount = function (offer, instrumentData, switchConfig) {
    if (!offer)
        return 0;
    var count = 0;
    offer.forEach(function (off) {
        var code = off.bankCode.toLowerCase();
        if (!switchConfig || switchConfig.indexOf(code) != -1) {
            (instrumentData || []).forEach(function (data) {
                if (data.bankCode.toLowerCase() == code && !data.disable) {
                    count += off.offerDetails.length;
                }
            });
        }
    });
    return count;
};
var getTabCreator = function (type) { return INSTRUMENT_TABCREATOR_MAP[type]; };
var INSTRUMENT_TABCREATOR_MAP = (_a = {},
    _a[RECOMMENDED_INSTRUMENT] = createRecommendedInstrument,
    _a[PAY_LATER] = createPayLater,
    _a[SAVED_INSTRUMENT] = createSavedInstrument,
    _a[CARD_TYPE] = createCard,
    _a[NETBANKING] = createNetBanking,
    _a[COD] = createCOD,
    _a[UPI] = createUPI,
    _a[WALLET_TYPE] = createWallet,
    _a[EMI_TYPE] = createEMI,
    _a);



/***/ }),

/***/ "./browser/components/payment/common/PaymentSubOption/index.js":
/*!*********************************************************************!*\
  !*** ./browser/components/payment/common/PaymentSubOption/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/ImmobilizeComponent */ "./browser/components/common/ImmobilizeComponent/index.js");
/* harmony import */ var commonComp_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Radio */ "./browser/components/common/Radio/index.js");
/* harmony import */ var iconComp_Flipkart_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/Flipkart.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Flipkart.jsx");
/* harmony import */ var iconComp_COD_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/COD.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/COD.jsx");
/* harmony import */ var _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paymentSubOption.base.css */ "./browser/components/payment/common/PaymentSubOption/paymentSubOption.base.css");
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







var OptionIcon = function (_a) {
    var iconConfig = _a.iconConfig, name = _a.name, className = _a.className, disableClassName = _a.disableClassName, disabled = _a.disabled;
    var IconComponents = {
        Flipkart: iconComp_Flipkart_jsx__WEBPACK_IMPORTED_MODULE_3__.default,
        COD: iconComp_COD_jsx__WEBPACK_IMPORTED_MODULE_4__.default
    };
    var SVGIcon = iconConfig.type === 'icon' ? IconComponents[iconConfig.name] : null;
    return iconConfig.type === 'icon' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: iconConfig.className || '' },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(SVGIcon, __assign({}, iconConfig.iconSize)))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_1__.ImmobilizedSprite, { name: name || iconConfig.name, className: className, disableClassName: disableClassName, disabled: disabled }));
};
var PaymentSubOption = function (_a) {
    var id = _a.id, selected = _a.selected, iconName = _a.iconName, _b = _a.iconConfig, iconConfig = _b === void 0 ? {} : _b, displayName = _a.displayName, _c = _a.classNames, classNames = _c === void 0 ? {} : _c, _d = _a.onClickParams, onClickParams = _d === void 0 ? {} : _d, onClick = _a.onClick, children = _a.children, disabled = _a.disabled;
    var leftAlignedIcon = !iconConfig.position || iconConfig.position === 'left';
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_1__.ImmobilizedDiv, { className: "".concat(_paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.rowContainer, " ").concat(classNames.container || ''), disabled: disabled },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Radio__WEBPACK_IMPORTED_MODULE_2__.RadioButton, { classes: {
                root: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.radioContainer,
                icon: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.icon
            }, id: id, onClickParams: onClickParams, onClick: onClick, checked: selected, disabled: disabled },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.row, " ").concat(!leftAlignedIcon ? _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.spacingInRow : '') },
                leftAlignedIcon ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(OptionIcon, { iconConfig: iconConfig, name: iconName, className: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.imageLeft, disableClassName: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.disabledSprite, disabled: disabled })) : null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImmobilizeComponent__WEBPACK_IMPORTED_MODULE_1__.ImmobilizedSpan, { className: "".concat(selected ? _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.selected : '', " ").concat(classNames.text ||
                        '', " "), disableClassName: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.disabledName, disabled: disabled }, displayName),
                !leftAlignedIcon ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(OptionIcon, { iconConfig: iconConfig, name: iconName, className: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.imageRight, disableClassName: _paymentSubOption_base_css__WEBPACK_IMPORTED_MODULE_5__.default.disabledSprite, disabled: disabled })) : null)),
        children));
};
PaymentSubOption.propTypes = {
    id: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
    iconName: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    displayName: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
    onClick: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentSubOption);


/***/ }),

/***/ "./browser/components/payment/common/PurgedCardInfo/index.js":
/*!*******************************************************************!*\
  !*** ./browser/components/payment/common/PurgedCardInfo/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./purgedCardInfo.base.css */ "./browser/components/payment/common/PurgedCardInfo/purgedCardInfo.base.css");





var PurgedCardInfo = function (props) {
    var saveCardTokenizationConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('SAVED_CARD_CONSENT') || {};
    var phase2Enabled = saveCardTokenizationConfig.phase2Enabled;
    if (!props.show || !phase2Enabled) {
        return null;
    }
    var _a = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(saveCardTokenizationConfig, 'purgedCardInfo') || {}, _b = _a.genericMessage, genericMessage = _b === void 0 ? 'Your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.' : _b, _c = _a.customizedMessage, customizedMessage = _c === void 0 ? 'Some of your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.' : _c, _d = _a.url, url = _d === void 0 ? '/faqs' : _d, _e = _a.urlText, urlText = _e === void 0 ? 'Learn More' : _e, _f = _a.showFAQ, showFAQ = _f === void 0 ? true : _f;
    var deviceMode = props.deviceMode, isSavedCardPresent = props.isSavedCardPresent;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(deviceMode === 'mobile' ? _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.container : _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.deskTopContainer) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.box },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(showFAQ ? _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.text : _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.textFullWidth) }, isSavedCardPresent ? customizedMessage : genericMessage),
            showFAQ && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("a", { className: _purgedCardInfo_base_css__WEBPACK_IMPORTED_MODULE_3__.default.link, href: url }, urlText)))));
};
PurgedCardInfo.propTypes = {
    show: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
    deviceMode: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
    isSavedCardPresent: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)
};
PurgedCardInfo.defaultProps = {
    isSavedCardPresent: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurgedCardInfo);


/***/ }),

/***/ "./browser/components/payment/common/RetryBackConfirmationModal/index.js":
/*!*******************************************************************************!*\
  !*** ./browser/components/payment/common/RetryBackConfirmationModal/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var _retryBackConfirmationModal_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retryBackConfirmationModal.base.css */ "./browser/components/payment/common/RetryBackConfirmationModal/retryBackConfirmationModal.base.css");




var RetryBackConfirmationModal = function (_a) {
    var mode = _a.mode, show = _a.show, stayHere = _a.stayHere, tryLater = _a.tryLater;
    return show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { className: mode === 'mobile'
            ? _retryBackConfirmationModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.mobileModalContainer
            : _retryBackConfirmationModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopModalContainer, halfCard: mode === 'mobile', cancelCallback: stayHere, goBackOnClose: true, cancelIconConfig: { show: true } }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _retryBackConfirmationModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalHeader }, "Don't want to pay now ?"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _retryBackConfirmationModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalDesc }, "No worries, you can pay online using PayNow option from orders, till the order is out for delivery or you can pay at the time of delivery through Cash/UPI."),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__.default, { buttons: [
                {
                    text: 'I WILL TRY LATER',
                    type: 'secondary',
                    clickHandler: tryLater
                },
                {
                    text: 'STAY HERE',
                    clickHandler: onCancel
                }
            ] }))); })) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RetryBackConfirmationModal);


/***/ }),

/***/ "./browser/components/payment/common/RetrySessionExpiryModal/index.js":
/*!****************************************************************************!*\
  !*** ./browser/components/payment/common/RetrySessionExpiryModal/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/InlineButtonV3 */ "./browser/components/common/InlineButtonV3/index.js");
/* harmony import */ var _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retrySessionExpiryModal.base.css */ "./browser/components/payment/common/RetrySessionExpiryModal/retrySessionExpiryModal.base.css");
/* harmony import */ var iconComp_Timer_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Timer.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Timer.jsx");





var buttons = [
    {
        className: _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.retryButton,
        text: 'RETRY PAYMENT',
        clickHandler: function () { return window.location.reload(); }
    }
];
var RetrySessionExpiryModal = function (_a) {
    var show = _a.show, mode = _a.mode;
    return show ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { className: "".concat(_retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalContainer, " ").concat(mode === 'desktop' ? _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalContainerDesktop : ''), halfCard: mode === 'mobile', disableBackdropClick: true, cancelIconConfig: { show: false }, closeOnBack: false },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Timer_jsx__WEBPACK_IMPORTED_MODULE_4__.default, { className: _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.timerIcon }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalHeader }, "Session Expired"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _retrySessionExpiryModal_base_css__WEBPACK_IMPORTED_MODULE_3__.default.modalDesc }, "Payment could not be completed within alloted time. You can retry and make the payment."),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_InlineButtonV3__WEBPACK_IMPORTED_MODULE_2__.default, { buttons: buttons })))) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RetrySessionExpiryModal);


/***/ }),

/***/ "./browser/components/payment/common/RetryTimer/index.js":
/*!***************************************************************!*\
  !*** ./browser/components/payment/common/RetryTimer/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Timer */ "./browser/components/payment/common/Timer/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retryTimer.base.css */ "./browser/components/payment/common/RetryTimer/retryTimer.base.css");
/* harmony import */ var iconComp_Timer_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconComp/Timer.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Timer.jsx");





var RetryTimer = function (_a) {
    var mode = _a.mode, sessionEnabled = _a.sessionEnabled, stopTimer = _a.stopTimer, disabled = _a.disabled;
    !sessionEnabled && triggerEvent('DOPE_RETRY_PAYMENT_SESSION_EXPIRED');
    var timerConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_2__.getKVPairValue)('PAYMENT_RETRY_TIMER');
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.retryTimerContainer, " ").concat(mode === 'desktop' ? _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.desktopContainer : _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.mobileContainer, " ").concat(sessionEnabled ? _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.timerEnabled : _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.timerDisabled) },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.retryTextBlock },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Timer_jsx__WEBPACK_IMPORTED_MODULE_4__.default, null),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.retryText }, "".concat(sessionEnabled ? 'Complete payment in' : 'Session expired'))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Timer__WEBPACK_IMPORTED_MODULE_1__.default, { minutes: timerConfig.min || 15, seconds: timerConfig.sec || 0, disabled: disabled, stopCallback: stopTimer, className: _retryTimer_base_css__WEBPACK_IMPORTED_MODULE_3__.default.timer, expanded: true })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RetryTimer);


/***/ })

}]);
//# sourceMappingURL=browser_components_payment_common_OrderReview_index_js-browser_components_payment_common_Paym-24e3c8.js.map