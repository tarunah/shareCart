(self["webpackChunk"] = self["webpackChunk"] || []).push([["addressListMobile"],{

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

/***/ "./browser/components/address/mobile/AddressList/AddressList.js":
/*!**********************************************************************!*\
  !*** ./browser/components/address/mobile/AddressList/AddressList.js ***!
  \**********************************************************************/
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
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/AddressHelper */ "./browser/utils/AddressHelper/index.js");
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/UserLocationDetailsUtil */ "./utils/UserLocationDetailsUtil.js");
/* harmony import */ var commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var commonComp_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonComp/Button */ "./browser/components/common/Button/index.js");
/* harmony import */ var commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/CheckoutSteps */ "./browser/components/common/CheckoutSteps/index.js");
/* harmony import */ var _AddressBlocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AddressBlocks */ "./browser/components/address/mobile/AddressBlocks/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./addressList.base.css */ "./browser/components/address/mobile/AddressList/addressList.base.css");
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

var AddressList = /** @class */ (function (_super) {
    __extends(AddressList, _super);
    function AddressList(props) {
        var _this = _super.call(this, props) || this;
        var cartData = props.cartData, selectedAddressId = props.selectedAddressId, addressData = props.addressData, tempAddressId = props.tempAddressId;
        _this.state = {
            selectedAddressId: tempAddressId ? tempAddressId : selectedAddressId,
            cartData: cartData
        };
        _this.firstUpdate = true;
        _this.isAddressRequiredOnPayment =
            (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isVariantEnabled)('AOC_V2_VARIANT3') || (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('ORDER_REVIEW');
        _this.isAocV2Variant3Enabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isVariantEnabled)('AOC_V2_VARIANT3');
        if (tempAddressId) {
            _this.selectAddress(tempAddressId);
        }
        else if (selectedAddressId) {
            _this.currentPincode = _this.getPinCode(selectedAddressId, addressData);
        }
        [
            'onClickHandler',
            'onClickConfirmHandler',
            'selectAddress',
            'getPinCode',
            'redirectBasedOnAction'
        ].forEach(function (method) { return (_this[method] = _this[method].bind(_this)); });
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.setDocTitleInMobile)('SELECT ADDRESS');
        if (window.location.search === '?referer=payment')
            triggerEvent('ADDRESS_PAGE_LOAD');
        return _this;
    }
    AddressList.prototype.componentDidUpdate = function () {
        var _a = this.props, cartData = _a.cartData, selectedAddressId = _a.selectedAddressId, addressData = _a.addressData, tempAddressId = _a.tempAddressId;
        if (this.firstUpdate && cartData) {
            this.firstUpdate = false;
            this.setState(function (prevState) {
                var currentSelectedAddressId = prevState.selectedAddressId ||
                    (tempAddressId ? tempAddressId : selectedAddressId);
                return {
                    selectedAddressId: currentSelectedAddressId,
                    cartData: cartData
                };
            });
            if (tempAddressId) {
                this.selectAddress(tempAddressId);
            }
            else {
                this.currentPincode = this.getPinCode(selectedAddressId, addressData);
            }
        }
    };
    AddressList.prototype.componentDidMount = function () {
        window.scroll(0, 0);
        !this.isAddressRequiredOnPayment &&
            this.props.setToContainerState({ action: 'back' });
    };
    AddressList.prototype.onClickHandler = function (e) {
        var _this = this;
        var addressData = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'addressData', []);
        var selectedAddressId = parseInt(e.currentTarget.id);
        var selectedAddress = addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; }) ||
            {};
        var unifiedAddressId = selectedAddress.unifiedId;
        if (!selectedAddressId || !unifiedAddressId) {
            return;
        }
        var action = e.target.getAttribute('data-action') || 'select';
        if (action === 'remove') {
            this.props.handleAddressAction(action + 'Address', unifiedAddressId, function (id) {
                _this.selectAddress(id);
            });
            triggerEvent('DELETE_ADDRESS_CLICK');
        }
        else if (action === 'edit') {
            return;
        }
        else {
            this.selectAddress(selectedAddressId);
        }
    };
    AddressList.prototype.selectAddress = function (selectedAddressId) {
        var _this = this;
        var _a = this.props, addressData = _a.addressData, handleCartAction = _a.handleCartAction, setToContainerState = _a.setToContainerState;
        var pinCode = this.getPinCode(selectedAddressId, addressData);
        if (this.currentPincode !== pinCode) {
            handleCartAction('getServiceability', pinCode, function (cartData) {
                _this.currentPincode = pinCode;
                _this.setState({
                    cartData: cartData,
                    selectedAddressId: selectedAddressId
                });
                setToContainerState({ tempAddressId: selectedAddressId });
            }, function (err) { }, { keepPreviousState: true });
        }
        else {
            this.setState({ selectedAddressId: selectedAddressId });
            setToContainerState({ tempAddressId: selectedAddressId });
        }
    };
    AddressList.prototype.getPinCode = function (addressId, addressData) {
        return ((addressData || []).find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === addressId; }) ||
            {}).pincode;
    };
    AddressList.prototype.onClickConfirmHandler = function () {
        var _this = this;
        var _a = this.state, selectedAddressId = _a.selectedAddressId, cartData = _a.cartData;
        var _b = this.props, setToContainerState = _b.setToContainerState, successCallback = _b.successCallback, addressData = _b.addressData;
        var selectedAddress = addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId; }) ||
            {};
        if ((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_9__.isFeatureEnabled)('ADDRESS_ON_CART_V2')) {
            commonUtils_UserLocationDetailsUtil__WEBPACK_IMPORTED_MODULE_4___default().setLocation({
                pincode: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'pincode') || '',
                addressId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'id') || 0,
                addressName: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'user.name') || '',
                unifiedId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'unifiedId') || ''
            });
        }
        else {
            (0,commonBrowserUtils_AddressHelper__WEBPACK_IMPORTED_MODULE_3__.setSelectedAddressCookie)({
                addressId: selectedAddressId,
                unifiedId: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress, 'unifiedId')
            });
        }
        triggerEvent('ADDRESS_SELECTED', {
            custom: selectedAddress,
            gaLabel: selectedAddress.pincode
        });
        triggerEvent('SELECT_ADDRESS_CLICK');
        triggerEvent(selectedAddress.checkoutAllowed
            ? 'VALID_ADDRESS_SELECTED'
            : 'BAD_ADDRESS_SELECTED');
        if (!lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.serviceabilityFlags.pincode.value')) {
            triggerEvent('NOT_SERVICEABLE_ADDRESS_SELECTED');
        }
        /**********************************************************
         * navigate to payment when no address is present in the  *
         * user's account. If address is present then use goback  *
         **********************************************************/
        var navigateToPayments = function () { return (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_2__.navigateTo)('/checkout/payment', true); };
        var aocV2Callback = function () {
            _this.props.handleCartAction('setOrderAddress', {
                unifiedAddressId: selectedAddress.unifiedId,
                addressId: selectedAddress.id
            }, function (res) {
                if (res) {
                    _this.props.updateCheckoutState({
                        cartData: res,
                        selectedAddress: selectedAddress
                    });
                }
                navigateToPayments();
            }, function () { });
        };
        setToContainerState({ selectedAddressId: selectedAddressId, cartData: cartData, action: '' }, this.isAddressRequiredOnPayment ? aocV2Callback : successCallback);
    };
    AddressList.prototype.redirectBasedOnAction = function (path) {
        var _this = this;
        if (this.isBeingRedirected) {
            return;
        }
        this.isBeingRedirected = true;
        this.props.action === 'back'
            ? this.props.setToContainerState({ action: '' }, function () {
                _this.props.history.goBack();
            })
            : this.props.history.push(path);
    };
    AddressList.prototype.render = function () {
        var _this = this;
        var _a = this.props, addressData = _a.addressData, history = _a.history, loading = _a.loading;
        addressData = addressData ? addressData : [];
        if ((addressData && addressData.length) || loading) {
            var _b = this.state, cartData = _b.cartData, selectedAddressId_1 = _b.selectedAddressId;
            var serviceable_1 = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'serviceability.serviceabilityFlags.pincode.value', false);
            var validAddress = selectedAddressId_1 &&
                (addressData.find(function (address) { return lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId_1; }) || {}).checkoutAllowed;
            validAddress = this.isAddressRequiredOnPayment
                ? validAddress && serviceable_1
                : validAddress;
            var defaultAddress_1 = null;
            var otherAddress_1 = [];
            addressData.forEach(function (address) {
                if (address) {
                    if (address.isDefault) {
                        defaultAddress_1 = address;
                    }
                    else {
                        otherAddress_1.push(address);
                    }
                }
            });
            return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_CheckoutSteps__WEBPACK_IMPORTED_MODULE_7__.default, { currentPage: 'Address', hideSteps: this.isAocV2Variant3Enabled }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.container },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__.default, { show: loading, backdrop: true }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_AddressBlocks__WEBPACK_IMPORTED_MODULE_8__.AddAddressBlock, null),
                    defaultAddress_1
                        ? [
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.title }, "DEFAULT ADDRESS"),
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_AddressBlocks__WEBPACK_IMPORTED_MODULE_8__.AddressBlock, { addressInfo: defaultAddress_1, selected: defaultAddress_1.id === selectedAddressId_1, onClickHandler: this.onClickHandler, key: "default_".concat(defaultAddress_1.id), serviceable: serviceable_1 })
                        ]
                        : '',
                    otherAddress_1.length
                        ? [
                            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { key: 'other_header', className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.title }, "OTHER ADDRESS"),
                            otherAddress_1.map(function (address) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_AddressBlocks__WEBPACK_IMPORTED_MODULE_8__.AddressBlock, { addressInfo: address, selected: lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id') === selectedAddressId_1, onClickHandler: _this.onClickHandler, key: "address_".concat(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(address, 'id')), serviceable: serviceable_1 })); })
                        ]
                        : '',
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.stickyButton }, validAddress ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.confirmBtn, onClick: this.onClickConfirmHandler }, "CONFIRM")) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Button__WEBPACK_IMPORTED_MODULE_6__.default, { className: _addressList_base_css__WEBPACK_IMPORTED_MODULE_10__.default.disabledBtn }, validAddress === false
                        ? 'Please choose another address'
                        : 'Please choose address'))))));
        }
        else {
            this.redirectBasedOnAction('/checkout/address/add');
        }
        return null;
    };
    return AddressList;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
AddressList.propTypes = {
    addressData: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().array.isRequired),
    handleAddressAction: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func.isRequired),
    selectedAddressId: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressList);


/***/ }),

/***/ "./browser/components/address/mobile/AddressList/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/address/mobile/AddressList/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _context_CheckoutContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @context/CheckoutContext */ "./browser/context/CheckoutContext.js");
/* harmony import */ var _AddressList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressList */ "./browser/components/address/mobile/AddressList/AddressList.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_context_CheckoutContext__WEBPACK_IMPORTED_MODULE_0__.CheckoutConsumerHOC)(_AddressList__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ })

}]);
//# sourceMappingURL=addressListMobile.js.map