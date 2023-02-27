(self["webpackChunk"] = self["webpackChunk"] || []).push([["browser_components_cart_common_GiftWrap_GiftWrapDetails_index_js-browser_components_cart_comm-bb125a"],{

/***/ "./browser/components/cart/common/GiftWrap/GiftWrapDetails/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/cart/common/GiftWrap/GiftWrapDetails/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./giftWrapDetails.base.css */ "./browser/components/cart/common/GiftWrap/GiftWrapDetails/giftWrapDetails.base.css");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");



var GiftWrapDetails = function () {
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.header },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "HOW DOES IT WORK?"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.line })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.content },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.row },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "giftwrap-card", className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.sprite }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "Personalised card"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.info }, "Your message will be printed on a card placed inside the package.")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.row },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "giftwrap-invoice", className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.sprite }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "Invoice will be included"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.info }, "The receiver will get an invoice showing the amount you pay or the discount applied.")),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.row },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_2__.default, { name: "giftwrap-tag", className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.sprite }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.title }, "Original product tags will be retained"),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapDetails_base_css__WEBPACK_IMPORTED_MODULE_1__.default.info }, "Original product tags with MRP will be left intact in-case you\u2019d like to exchange for a different size.")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftWrapDetails);


/***/ }),

/***/ "./browser/components/cart/common/GiftWrap/GiftWrapForm/index.js":
/*!***********************************************************************!*\
  !*** ./browser/components/cart/common/GiftWrap/GiftWrapForm/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var vision_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vision/components/Button */ "../node_modules/@myntra/vision/lib/components/Button.js");
/* harmony import */ var _GiftWrapHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GiftWrapHandler */ "./browser/components/cart/common/GiftWrap/GiftWrapHandler/index.js");
/* harmony import */ var _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./giftWrapForm.base.css */ "./browser/components/cart/common/GiftWrap/GiftWrapForm/giftWrapForm.base.css");
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




var Input = function (_a) {
    var selected = _a.selected, label = _a.label, errorMessage = _a.errorMessage, attributes = __rest(_a, ["selected", "label", "errorMessage"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputRow, "\n        ").concat(attributes.value || selected ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.top : '', "\n        ").concat(selected ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selected : '', "\n        ").concat(errorMessage ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.error : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("label", { htmlFor: attributes.id, className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.label }, label),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", __assign({}, attributes, { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.input }))),
        errorMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "gw-error-input", className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.errorMessage }, errorMessage))));
};
var TextArea = function (_a) {
    var selected = _a.selected, label = _a.label, errorMessage = _a.errorMessage, attributes = __rest(_a, ["selected", "label", "errorMessage"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.inputRow, "\n        ").concat(attributes.value || selected ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.top : '', "\n        ").concat(selected ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.selected : '', "\n        ").concat(errorMessage ? _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.error : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("label", { htmlFor: attributes.id, className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.label }, label),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("textarea", __assign({}, attributes, { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.textarea }))),
        errorMessage && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "gw-error-text", className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.errorMessage }, errorMessage)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.charCount },
            attributes.maxLength - attributes.value.length,
            "/",
            attributes.maxLength)));
};
var GiftWrapFormUI = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.header1 }, "Gift Wrapping"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.header2 }, "Make It Special")),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Input, { label: "Recipient Name", id: "recipientName", "data-testid": "gw-recipientName", maxLength: "60", onChange: props.setValue, onFocus: props.onFocusHandler, onBlur: props.onBlurHandler, value: props.recipientName.value, errorMessage: props.recipientName.errorMessage, selected: props.selectedField === 'recipientName' }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TextArea, { label: "Message", id: "message", "data-testid": "gw-message", maxLength: "200", rows: 3, onChange: props.onTextAreaChange, onFocus: props.onFocusHandler, onBlur: props.onBlurHandler, value: props.message.value, errorMessage: props.message.errorMessage, selected: props.selectedField === 'message' }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Input, { label: "Sender Name", id: "senderName", "data-testid": "gw-senderName", maxLength: "60", onChange: props.setValue, onFocus: props.onFocusHandler, onBlur: props.onBlurHandler, value: props.senderName.value, errorMessage: props.senderName.errorMessage, selected: props.selectedField === 'senderName' }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.note },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _giftWrapForm_base_css__WEBPACK_IMPORTED_MODULE_3__.default.noteLabel }, "Please Note: "),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", null, "Gift wrapping is not available for Pay on Delivery orders.")),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(vision_components_Button__WEBPACK_IMPORTED_MODULE_1__.default, { variant: "contained", letterSpacing: "1px", width: "100%", onClick: props.applyGiftwrap }, "APPLY GIFT WRAP"))); };
var GiftWrapForm = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_GiftWrapHandler__WEBPACK_IMPORTED_MODULE_2__.default, __assign({}, props, { render: function (_a) {
        var state = _a.state, handlers = __rest(_a, ["state"]);
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(GiftWrapFormUI, __assign({}, state, handlers, { goBack: props.goBack })));
    } }))); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftWrapForm);


/***/ }),

/***/ "./browser/components/cart/common/GiftWrap/GiftWrapHandler/index.js":
/*!**************************************************************************!*\
  !*** ./browser/components/cart/common/GiftWrap/GiftWrapHandler/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
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


var GiftWrapHandler = /** @class */ (function (_super) {
    __extends(GiftWrapHandler, _super);
    function GiftWrapHandler(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props.details || {}, recipient = _a.recipient, message = _a.message, sender = _a.sender;
        _this.state = {
            recipientName: { value: recipient || '', errorMessage: '' },
            message: { value: message || '', errorMessage: '' },
            senderName: { value: sender || '', errorMessage: '' },
            giftWrapApplied: false,
            selectedField: null,
            rows: 1,
            loading: false
        };
        _this.fields = [
            { name: 'recipientName', errorMessage: 'Please enter a name' },
            { name: 'message', errorMessage: 'Please enter a message' },
            { name: 'senderName', errorMessage: 'Please enter a name' }
        ];
        _this.setValue = _this.setValue.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.resetErrorMessages = _this.resetErrorMessages.bind(_this);
        _this.applyGiftwrap = _this.applyGiftwrap.bind(_this);
        _this.onSuccess = _this.onSuccess.bind(_this);
        _this.onError = _this.onError.bind(_this);
        _this.onFocusHandler = _this.onFocusHandler.bind(_this);
        _this.onBlurHandler = _this.onBlurHandler.bind(_this);
        _this.onTextAreaChange = _this.onTextAreaChange.bind(_this);
        _this.props.setMessage && _this.props.setMessage('');
        return _this;
    }
    GiftWrapHandler.prototype.componentDidMount = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.setDocTitleInMobile)('GIFT WRAP');
    };
    GiftWrapHandler.prototype.onSuccess = function () {
        var _a = this.props, showNotification = _a.showNotification, goBack = _a.goBack;
        this.setState({ giftWrapApplied: true });
        showNotification &&
            SHELL.alert('info', {
                message: 'Your order will arrive gift wrapped',
                styleOverrides: {
                    notifyMainDiv: 'bottom: 80px;',
                    notifyTextDiv: 'width: auto;'
                }
            });
        goBack && goBack();
    };
    GiftWrapHandler.prototype.onError = function () {
        this.setState({ error: 'Ooops, Something went wrong' });
    };
    GiftWrapHandler.prototype.applyGiftwrap = function () {
        var status = this.validate();
        var _a = this.state, recipientName = _a.recipientName, message = _a.message, senderName = _a.senderName;
        if (status) {
            var data = {
                recipient: { name: recipientName.value },
                message: message.value,
                sender: { name: senderName.value }
            };
            this.props.handleCartAction('applyGiftwrap', data, this.onSuccess, this.onError);
        }
    };
    GiftWrapHandler.prototype.resetErrorMessages = function () {
        var _this = this;
        this.fields.forEach(function (field) {
            var _a;
            _this.setState((_a = {},
                _a[field.name] = __assign(__assign({}, _this.state[field.name]), { errorMessage: '' }),
                _a));
        });
    };
    GiftWrapHandler.prototype.validate = function () {
        var _this = this;
        this.resetErrorMessages();
        var status = true, firstErrorField;
        this.fields.forEach(function (field) {
            var _a;
            var value = _this.state[field.name].value.trim();
            if (!value) {
                firstErrorField =
                    firstErrorField || document.getElementById(field.name);
                _this.setState((_a = {},
                    _a[field.name] = __assign(__assign({}, _this.state[field.name]), { errorMessage: field.errorMessage }),
                    _a));
                status = false;
            }
        });
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.scrollIntoView)(firstErrorField, { behavior: 'smooth', block: 'center' });
        return status;
    };
    GiftWrapHandler.prototype.setValue = function (event) {
        var _a;
        var _b = event.target, _c = _b.id, field = _c === void 0 ? '' : _c, maxLength = _b.maxLength, _d = _b.value, value = _d === void 0 ? '' : _d;
        if (maxLength && value.length > maxLength) {
            return;
        }
        this.setState((_a = {},
            _a[field] = __assign(__assign({}, this.state[field]), { value: value }),
            _a));
    };
    GiftWrapHandler.prototype.onFocusHandler = function (e) {
        var _a;
        var field = e.target.id || '';
        this.setState((_a = {
                selectedField: e.target.id
            },
            _a[field] = __assign(__assign({}, this.state[field]), { errorMessage: '' }),
            _a));
    };
    GiftWrapHandler.prototype.onBlurHandler = function () {
        this.setState({ selectedField: '' });
    };
    GiftWrapHandler.prototype.onTextAreaChange = function (e) {
        var rows = Math.floor(e.target.value.length / 30 + 1);
        this.state.rows !== rows && this.setState({ rows: rows });
        this.setValue(e);
    };
    GiftWrapHandler.prototype.render = function () {
        var _a = this, state = _a.state, resetErrorMessages = _a.resetErrorMessages, validate = _a.validate, setValue = _a.setValue, applyGiftwrap = _a.applyGiftwrap, onFocusHandler = _a.onFocusHandler, onBlurHandler = _a.onBlurHandler, onTextAreaChange = _a.onTextAreaChange;
        return this.props.render({
            state: state,
            resetErrorMessages: resetErrorMessages,
            validate: validate,
            setValue: setValue,
            applyGiftwrap: applyGiftwrap,
            onFocusHandler: onFocusHandler,
            onBlurHandler: onBlurHandler,
            onTextAreaChange: onTextAreaChange
        });
    };
    return GiftWrapHandler;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftWrapHandler);


/***/ })

}]);
//# sourceMappingURL=browser_components_cart_common_GiftWrap_GiftWrapDetails_index_js-browser_components_cart_comm-bb125a.js.map