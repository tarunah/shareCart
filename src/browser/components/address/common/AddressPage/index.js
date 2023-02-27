import React from 'react';
import PropTypes from 'prop-types';

// Utils
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import AddressManager from 'commonBrowserUtils/AddressManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import {
  isLoggedIn,
  getCookie,
  errorNotification,
  setCookie,
  navigateBack,
  setValueInObject,
  getDateDiff,
  getDeliveryEstimatesUtil
} from 'commonBrowserUtils/Helper';
import {
  getEstimatedDate,
  getSelectedAddress,
  setSelectedAddressCookie
} from 'commonBrowserUtils/AddressHelper';
import { isValidCart, checkExchangeCart } from 'commonBrowserUtils/CartHelper';
import { cookieKeys } from 'commonUtils/constants';
import { getAddressFields } from 'commonBrowserUtils/priceBreakupFields';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { resetPaymentRetrySession } from 'commonBrowserUtils/PaymentHelper';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import defautlMAPayloadForWeb from '../../../../utils/maHelper';

const getDeliveryInfo = ({ serviceability, products, shippingData }) => {
  if (!serviceability) {
    return {};
  }
  const { productDeliveryInfo = [], addressInfo } = serviceability;

  const pincode = get(addressInfo, 'pincode');

  const { method: shippingMethod } = shippingData;
  let isSpeed11 = false;
  const deliveryInfo = productDeliveryInfo.map(
    ({ id, shippingEstimates = [] }) => {
      const estimate = shippingEstimates.find(entry => {
        if (
          isFeatureEnabled('SPEED_11') &&
          entry.shippingMethod === 'EXPRESS'
        ) {
          isSpeed11 = true;
          return entry;
        }
        return entry.shippingMethod === shippingMethod;
      });
      const currentDate = new Date();
      const estimateInDays = getDateDiff(
        currentDate,
        get(estimate, 'promiseDate')
      );
      return {
        sku: id,
        styleId: (products.find(product => product.skuId === id) || {}).id,
        promiseDate: getEstimatedDate(estimateInDays),
        isSpeed11
      };
    }
  );

  return {
    pincode,
    products: deliveryInfo,
    custom: {
      widget: {
        name: 'address_delivery_estimates',
        type: 'card'
      }
    }
  };
};

class AddressPage extends React.Component {
  constructor() {
    super();
    this.state = {
      addressData: null,
      cartData: null,
      selectedAddressId: null,
      loading: true,
      error: null,
      dynamicStyles: {},
      tempAddressId: null,
      action: null
    };

    this.nextSelectedAddressId = null;
    this.currentPincode = null;

    [
      'handleAddressAction',
      'handleCartAction',
      'setCartData',
      'setAddressData',
      'onActionError',
      'editAddress',
      'updateDynamicStyles',
      'setToContainerState'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    resetPaymentRetrySession();
    this.props.analytics('setPageContext')('Checkout-address');
    this.props.analytics('initWebengage')();
    this.initAddressData();
    triggerEvent('ADDRESS_SCREEN_LOAD', defautlMAPayloadForWeb);
    setCookie(cookieKeys.ORDER_CONFIRMED, '', 0);
    ProfileManager.prefetchDetails();
  }

  componentDidUpdate() {
    if (!this.cartUpdated) {
      const cartData = this.state.cartData;
      if (cartData) {
        const ftcCookie = getCookie(cookieKeys.FIRST_TIME_CUSTOMER);
        if (typeof ftcCookie === 'undefined') {
          setCookie(
            cookieKeys.FIRST_TIME_CUSTOMER,
            get(cartData, 'userDetails.isFirstTimeCustomer')
          ); // set firstTimeCustomer cookie
        }
        const deliveryCharge =
          (
            get(cartData, 'price.charges.data', []).find(
              field => field.name === 'shipping'
            ) || {}
          ).value || 0;
        const appliedCoupon = (
          get(cartData, 'coupons', []).find(
            coupon => coupon.type === 'coupon' && coupon.status === 'SUCCESS'
          ) || {}
        ).code;
        const label = `coupon: ${appliedCoupon} | value: ${get(
          cartData,
          'price.total'
        )}`;
        triggerEvent('BEGIN_CHECKOUT', {
          mynacoV3: {
            templateData: {
              label
            }
          },
          mynacoLabel: label
        });
        this.props.analytics('pushGTMCartData')(cartData);
        this.props.analytics('triggerWebengage')('ADDRESS_VIEWED', {
          state_of_continue_cta: get(
            document.getElementById('placeOrderButton'),
            'attributes.disabled'
          )
            ? 'no'
            : 'yes',
          amount: getTotal(cartData.price, getAddressFields()),
          delivery_charge: `${deliveryCharge}`
        });
        this.cartUpdated = true;
      }
    }
  }

  componentWillUnmount() {
    const {
      state: {
        addressData,
        cartData,
        selectedAddressId: selectedAddressIdFromState
      },
      props: { setCartStoreData, setAddressStoreData }
    } = this;

    const selectedAddressId =
      selectedAddressIdFromState || get(getSelectedAddress(addressData), 'id');

    setCartStoreData(cartData);
    setAddressStoreData({
      addressData,
      selectedAddressId
    });
  }

  initAddressData() {
    if (isLoggedIn()) {
      this.setState(
        {
          loading: true
        },
        () => {
          const key = '_checkout_.__myx_data__.addresses';
          const addressData = get(window, key, null);
          const status = get(window, `${key}.status`, '');
          const addressStoreData = this.props.getAddressStoreData();

          if (addressStoreData) {
            const { addressData, selectedAddressId } = addressStoreData;
            const cartData = this.props.getCartStoreData();
            this.currentPincode = get(
              cartData,
              'serviceability.addressInfo.pincode'
            );

            cartData && this.validateCart(cartData);

            this.setState(
              {
                addressData,
                cartData,
                selectedAddressId
              },
              () => {
                if (addressData && addressData.length) {
                  const { pincode } =
                    addressData.find(
                      address => get(address, 'id') === selectedAddressId
                    ) || {};
                  this.getServiceability(pincode);
                } else {
                  this.handleNoAddress();
                }
              }
            );
          } else if (status === 'UPDATE_TOKENS' || status === 'AUTHNZ_FAIL') {
            this.getAddressData();
          } else if (addressData) {
            addressData
              ? this.setAddressData({ addresses: addressData })
              : this.setState({
                  error: true,
                  loading: false
                });
          } else {
            this.getAddressData();
          }
          addressData && (window._checkout_.__myx_data__ = null);

          triggerEvent('PAGE_VIEW');
        }
      );
    } else {
      SHELL.redirectTo('/login?force=true&referer=/checkout/cart');
    }
  }

  getAddressData() {
    AddressManager.getAllAddress('', this.setAddressData, this.onActionError);
  }

  setAddressData({ addresses }) {
    this.setState(
      {
        addressData: addresses
      },
      () => {
        if (addresses && addresses.length) {
          const { id: selectedAddressId, pincode } = getSelectedAddress(
            addresses
          );
          if (selectedAddressId) {
            this.selectAddress(selectedAddressId);
          } else if (pincode) {
            this.getServiceability(pincode);
          }
        } else {
          this.props.getCartOnNoAddress
            ? this.handleNoAddress()
            : this.setState({
                loading: false
              });
        }
      }
    );
  }

  selectAddress(selectedAddressId, setTempAddress = false) {
    if (this.state.selectedAddressId !== selectedAddressId) {
      this.setState(
        prevState => {
          const state = {
            selectedAddressId: null
          };
          setTempAddress && (state.tempAddressId = selectedAddressId);
          return state;
        },
        () => {
          this.nextSelectedAddressId = selectedAddressId;
          const selectedAddress =
            this.state.addressData.find(
              address => get(address, 'id') === selectedAddressId
            ) || {};
          if (isFeatureEnabled('ADDRESS_ON_CART_V2')) {
            UserLocationDetailsUtil.setLocation({
              pincode: get(selectedAddress, 'pincode') || '',
              addressId: get(selectedAddress, 'id') || 0,
              addressName: get(selectedAddress, 'user.name') || '',
              unifiedId: selectedAddress.unifiedId
            });
          } else {
            setSelectedAddressCookie({
              addressId: get(selectedAddress, 'id'),
              unifiedId: selectedAddress.unifiedId
            });
          }
          this.getServiceability(selectedAddress.pincode);

          triggerEvent('ADDRESS_SELECTED', {
            custom: selectedAddress,
            mynacoV3: { templateData: selectedAddress },
            gaLabel: selectedAddress.pincode
          });
          triggerEvent('SELECT_ADDRESS_CLICK');
          triggerEvent(
            selectedAddress.checkoutAllowed
              ? 'VALID_ADDRESS_SELECTED'
              : 'BAD_ADDRESS_SELECTED'
          );
          return;
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  onActionError(err) {
    this.setState(
      {
        loading: false,
        error: true
      },
      () => {
        const { code } = err.error || {};
        const errorMsgs = getKVPairValue('ADDRESS_ERROR') || {};
        const message = errorMsgs[code] || errorMsgs.default;
        message &&
          errorNotification({
            message
          });
        triggerEvent('ADDRESS_ERROR', {
          gaLabel: JSON.stringify(err)
        });
      }
    );
  }

  isServiceable(cartData) {
    return get(
      cartData,
      'serviceability.serviceabilityFlags.pincode.value',
      false
    );
  }

  handleAddressAction(action, data, successCallback, errorCallback) {
    this.setState(
      {
        loading: true
      },
      () => {
        if (action === 'selectAddress') {
          this.selectAddress(data);
        } else {
          AddressManager[action](
            data,
            res => {
              if (res && !isEmpty(res)) {
                this[action](res, successCallback, data);
              } else {
                const EMPTY_ERROR = {
                  status: 1002,
                  message: `${res ? JSON.stringify(res) : res} response`
                };
                errorCallback && errorCallback(EMPTY_ERROR);
                this.onActionError(EMPTY_ERROR);
              }
            },
            err => {
              errorCallback && errorCallback(err);
              this.onActionError(err);
            }
          );
        }
      }
    );
  }

  handleCartAction(action, data, successCallback, errorCallback, options = {}) {
    this.setState(
      {
        loading: true
      },
      () => {
        AddressManager[action](
          data,
          res => {
            successCallback && successCallback(res);
            options.keepPreviousState
              ? this.setState({ loading: false })
              : this.setCartData(res);
          },
          err => {
            errorCallback && errorCallback(err);
            this.onActionError(err);
          }
        );
      }
    );
  }

  validateCart(res) {
    const isValid = isValidCart(res);
    let steps = 1;
    if (window && window.location.hash.includes('#disableBack')) {
      steps = 2;
    }
    (!isValid || checkExchangeCart(res)) &&
      navigateBack(this.props.history, {
        url: '/checkout/cart',
        steps
      });
    return isValid;
  }

  getServiceability(pincode) {
    if (!pincode) {
      return this.setState({
        loading: false
      });
    }
    if (this.currentPincode !== pincode) {
      this.currentPincode = pincode;
      AddressManager.getServiceability(pincode, this.setCartData, err => {
        const { cartData } = this.state;

        if (cartData) {
          if (
            get(cartData, 'serviceability.serviceabilityFlags.pincode.value')
          ) {
            setValueInObject(
              cartData,
              'serviceability.serviceabilityFlags.pincode.value',
              false
            );
            this.setCartData(cartData);
          }
        } else {
          AddressManager.getCart(
            { cartMerge: true, cached: false },
            res => {
              if (
                get(res, 'serviceability.serviceabilityFlags.pincode.value')
              ) {
                setValueInObject(
                  res,
                  'serviceability.serviceabilityFlags.pincode.value',
                  false
                );
              }
              this.setCartData(res);
            },
            this.onActionError
          );
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
  }

  handleNoAddress() {
    const cartStoreData = this.props.getCartStoreData();
    if (cartStoreData) {
      this.setCartData(cartStoreData);
    } else {
      AddressManager.getCart(
        {
          cartMerge: true,
          cached: false
        },
        this.setCartData,
        this.onActionError
      );
    }
  }

  setCartData(res) {
    if (this.validateCart(res)) {
      if (this.nextSelectedAddressId) {
        this.setState({
          cartData: res,
          selectedAddressId: this.nextSelectedAddressId,
          loading: false
        });
        this.nextSelectedAddressId = null;
      } else {
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
  }

  addAddress(res, successCallback) {
    let newAddressData = [...this.state.addressData];
    const setTempAddress = isVariantEnabled('AOC_V2_VARIANT3');
    get(res, 'isDefault') &&
      newAddressData.forEach(address => {
        if (address) {
          get(address, 'isDefault') && (address.isDefault = false);
        }
      });
    newAddressData = newAddressData.concat(res);
    this.setState(
      {
        addressData: newAddressData
      },
      () => {
        this.selectAddress(get(res, 'id'), setTempAddress);
        successCallback && successCallback(res);
      }
    );
  }

  removeAddress(res, successCallback, unifiedId) {
    const removedAddress = [
      ...this.state.addressData.filter(
        address => address.unifiedId === unifiedId
      )
    ];
    const isDefaultAddressRemoved =
      removedAddress.length && get(removedAddress[0], 'isDefault');
    if (isDefaultAddressRemoved) {
      this.getAddressData();
      return;
    }

    const newAddressData = [
      ...this.state.addressData.filter(
        address => address.unifiedId !== unifiedId
      )
    ];

    this.setState({ addressData: newAddressData }, () => {
      if (newAddressData.length) {
        const defaultAddress = newAddressData.find(address =>
          get(address, 'isDefault')
        );
        const id = defaultAddress ? defaultAddress.id : newAddressData[0].id;
        this.selectAddress(id);
        successCallback && successCallback(id);
      } else {
        this.setState({
          selectedAddressId: null,
          loading: false
        });
      }
    });
  }

  editAddress(res, successCallback) {
    let newAddressData = [...this.state.addressData];
    const resAddressId = get(res, 'id');
    get(res, 'isDefault') &&
      newAddressData.forEach(address => {
        get(address, 'isDefault') && (address.isDefault = false);
      });
    newAddressData = newAddressData.map(address =>
      get(address, 'id') === resAddressId ? res : address
    );
    this.setState(
      {
        addressData: newAddressData
      },
      () => {
        if (this.state.selectedAddressId === resAddressId) {
          const addressId = resAddressId || 0;
          const unifiedId = get(res, 'unifiedId', '');

          UserLocationDetailsUtil.setLocation({
            pincode: get(res, 'pincode') || '',
            addressName: get(res, 'user.name') || '',
            addressId,
            unifiedId
          });

          this.getServiceability(get(res, 'pincode'));
        } else {
          this.selectAddress(resAddressId);
        }

        successCallback && successCallback(res);
      }
    );
  }

  updateDynamicStyles(key, value) {
    this.setState({
      dynamicStyles: {
        ...this.state.dynamicStyles,
        [key]: value
      }
    });
  }

  setToContainerState(obj, successCallback) {
    if (obj.cartData) {
      triggerEvent('ADDRESS_DELIVERY_PROMISE', getDeliveryInfo(obj.cartData));
    }
    this.setState(obj, () => {
      successCallback && successCallback();
    });
  }

  render() {
    const {
      state,
      props: { analytics },
      handleAddressAction,
      handleCartAction,
      updateDynamicStyles,
      setToContainerState,
      tempAddressId
    } = this;
    return this.props.render({
      ...state,
      analytics,
      handleAddressAction,
      handleCartAction,
      updateDynamicStyles,
      setToContainerState,
      updateDeliveryEstimates: getDeliveryEstimatesUtil(
        handleCartAction,
        'getServiceability',
        get(state, 'cartData.serviceability.addressInfo.pincode') ||
          this.currentPincode
      )
    });
  }
}

AddressPage.propTypes = {
  render: PropTypes.func.isRequired
};

export default AddressPage;
