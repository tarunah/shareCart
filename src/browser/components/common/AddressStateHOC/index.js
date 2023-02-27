import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { setAddressData, getAddressData } from 'commonBrowserUtils/DataStore';
import { AddressManagerV2 } from 'commonBrowserUtils/AddressManager';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import { getSelectedAddress } from 'commonBrowserUtils/AddressHelper';
import {
  checkExchangeCart,
  triggerExpressCheckoutFlag
} from 'commonBrowserUtils/CartHelper';
import {
  getUidx,
  formatDate,
  errorNotification
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const triggerEventForItemLevelService = (data, pincode) => {
  const products = (get(data, 'products') || []).map(obj => {
    const serviceable = get(
      obj,
      'productServiceabilityInfo.pincodeInfo.serviceable'
    );
    let services = null;

    if (serviceable) {
      const estimate =
        (
          get(obj, 'productServiceabilityInfo.pincodeInfo.shippingEstimates') ||
          []
        ).find(entry => entry.shippingMethod === 'NORMAL') || {};

      services = estimate.promiseDate ? formatDate(estimate.promiseDate) : '';
      services += '|' + get(obj, 'productServiceabilityInfo.tryNBuyAvailable');
      services +=
        '|' + get(obj, 'productServiceabilityInfo.alterationAvailable');
    }

    return {
      entity_id: get(obj, 'id'),
      entity_name: `${serviceable}|${services}`,
      entity_type: 'product',
      entity_optional_attributes: {
        entity_id: get(obj, 'skuId'),
        seller_partner_id: get(obj, 'selectedSeller.id')
      }
    };
  });

  triggerEvent('ITEM_LEVEL_SERVICE_FOR_PINCODE', {
    custom: {
      custom: { v1: pincode, v2: getUidx() },
      widget_items: {
        data_set: {
          data: products
        }
      }
    }
  });
};

const AddressStateHOC = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userSelectedLocation: {
          pincode: '',
          addressInfo: {},
          addressNotFound: false
        },
        addressData: [],
        selectedAddressId: ''
      };

      this.firstUpdate = false;
      [
        'getAllAddress',
        'setAllAddress',
        'getAddressByUnifiedId',
        'editAddress',
        'addAddress',
        'removeAddress',
        'updateUserSelectedLocation',
        'handleAddressAction',
        'selectAddress',
        'hydrateDataFromWindow'
      ].forEach(method => (this[method] = this[method].bind(this)));
    }

    componentDidMount() {
      /*************************************************
       * should not clear the data in the first mount,  *
       * Because the child component is mounted first.  *
       **************************************************/
      this.hydrateDataFromWindow(false);
    }

    componentWillUnmount() {
      const { addressData, selectedAddressId } = this.state;
      setAddressData({
        addressData,
        selectedAddressId
      });
    }

    hydrateDataFromWindow(clearData = true) {
      const data = get(window, '_checkout_.__myx_data__');
      if (data) {
        const cartData = get(data, 'cartData') || {};
        const isExchangeCart = checkExchangeCart(cartData);

        triggerExpressCheckoutFlag(
          cartData,
          !isEmpty(get(data, 'addressInfo'))
        );

        if (isFeatureEnabled('ADDRESS_ON_CART_V2')) {
          triggerEventForItemLevelService(cartData, get(data, 'pincode'));

          UserLocationDetailsUtil.setLocation({
            pincode: get(data, 'pincode') || '',
            addressId: get(data, 'addressInfo.id') || 0,
            addressName: get(data, 'addressInfo.user.name') || '',
            unifiedId: get(data, 'addressInfo.unifiedId') || ''
          });
          this.setState({
            userSelectedLocation: {
              pincode: data.pincode || '',
              addressInfo: data.addressInfo || {},
              addressNotFound: false
            }
          });
        }

        if (
          isExchangeCart &&
          get(data, 'cartData.unifiedAddressId') !==
            get(data, 'addressInfo.unifiedId')
        ) {
          try {
            this.getAddressByUnifiedId(get(data, 'cartData.unifiedAddressId'));
          } catch (err) {}
        }
      }
      clearData && (window._checkout_.__myx_data__ = null);
    }

    componentDidUpdate() {
      this.hydrateDataFromWindow();
      if (this.firstUpdate) {
        const addressData = (this.props.getAddressStoreData() || {})
          .addressData;
        if (isFeatureEnabled('PREFETCH_ADDRESS') && !addressData) {
          setTimeout(() => {
            this.getAllAddress();
          }, 1);
        }
        this.firstUpdate = false;
      }
    }

    async getAllAddress(useStoreData = false) {
      let addressData = getAddressData();
      if (addressData && addressData.length && useStoreData) {
        return Promise.resolve(addressData);
      }

      try {
        const addressDataRes = await AddressManagerV2.getAllAddress('');
        addressData = get(addressDataRes, 'addresses', {});
      } catch (err) {
        return Promise.reject(err);
      }

      const selectedAddress = getSelectedAddress(addressData);

      this.setAllAddress({
        addressData,
        selectedAddressId: selectedAddress.id
      });

      return Promise.resolve(addressData);
    }

    setAllAddress(stateData) {
      this.setState(stateData);
    }

    async selectAddress(id = null) {
      const addressInfo =
        this.state.addressData.find(address => address.id === id) || {};
      const userSelectedLocation = {
        addressInfo,
        pincode: get(addressInfo, 'pincode') || '',
        addressNotFound: false
      };

      try {
        await this.updateUserSelectedLocation(userSelectedLocation);
      } catch (err) {}
    }

    async addAddress(newAddress) {
      try {
        const resData = await AddressManagerV2.addAddress(newAddress);
        let newAddressData = [...this.state.addressData];
        get(resData, 'isDefault') &&
          newAddressData.forEach(address => {
            get(address, 'isDefault') && (address.isDefault = false);
          });

        newAddressData = newAddressData.concat(resData);
        this.setState({ addressData: newAddressData });
        await this.updateUserSelectedLocation({
          addressInfo: resData,
          pincode: resData.pincode,
          addressNotFound: false
        });
      } catch (err) {
        throw err;
      }
    }

    async editAddress(editedAddress) {
      let resData = null;
      try {
        resData = await AddressManagerV2.editAddress(editedAddress);
        let newAddressData = [...this.state.addressData];
        const resAddressId = get(resData, 'id');

        if (get(resData, 'isDefault')) {
          newAddressData.forEach(address => {
            get(address, 'isDefault') && (address.isDefault = false);
          });
        }

        newAddressData = newAddressData.map(address =>
          get(address, 'id') === resAddressId ? resData : address
        );

        if (this.state.selectedAddressId === resAddressId) {
          const userSelectedLocation = {
            addressInfo: resData,
            pincode: get(resData, 'pincode') || '',
            addressNotFound: false
          };
          await this.updateUserSelectedLocation(userSelectedLocation);
        }
        this.setAllAddress({ addressData: newAddressData });
      } catch (err) {
        throw err;
      }
    }

    async removeAddress(unifiedAddressId) {
      try {
        await AddressManagerV2.removeAddress(unifiedAddressId);
        const newAddressData = [
          ...this.state.addressData.filter(
            address => address.unifiedId !== unifiedAddressId
          )
        ];
        this.setState({ addressData: newAddressData }, () => {
          let id = null;
          if (newAddressData.length) {
            const defaultAddress = newAddressData.find(address =>
              get(address, 'isDefault')
            );
            id = defaultAddress ? defaultAddress.id : newAddressData[0].id;
          }
          if (id) {
            this.selectAddress(id);
          } else {
            this.setState({
              userSelectedLocation: {
                pincode: '',
                addressInfo: {},
                addressNotFound: false
              },
              addressData: [],
              selectedAddressId: ''
            });
          }
        });
      } catch (err) {
        throw err;
      }
    }

    async getAddressByUnifiedId(unifiedId) {
      const addressData = this.state.addressData;
      let addressInfo = null;
      if (addressData && addressData.length) {
        addressInfo = addressData.find(obj => obj.unifiedId === unifiedId);
      }

      if (!addressInfo) {
        try {
          addressInfo = await AddressManagerV2.getAddressbyUnifiedId(unifiedId);
        } catch (err) {
          this.setState({
            userSelectedLocation: {
              pincode: '',
              addressInfo: {},
              addressNotFound: true
            }
          });
          throw err;
        }
      }

      await this.updateUserSelectedLocation({
        addressInfo,
        pincode: addressInfo.pincode,
        addressNotFound: false
      });
    }

    async setOrderAddress() {
      const unifiedAddressId = get(
        this,
        'state.userSelectedLocation.addressInfo.unifiedId'
      );
      const addressId = get(this, 'state.userSelectedLocation.addressInfo.id');
      try {
        const response = await AddressManagerV2.setOrderAddress({
          unifiedAddressId,
          addressId
        });
        return response;
      } catch (err) {
        throw err;
      }
    }

    async updateUserSelectedLocation(addressObject, options) {
      const previousPincode = get(
        this,
        'state.userSelectedLocation.pincode',
        0
      );

      return new Promise((resolve, reject) => {
        if (get(addressObject, 'pincode', '') !== previousPincode) {
          this.props.updateServiceability(
            addressObject,
            res => {
              triggerEventForItemLevelService(
                res,
                get(addressObject, 'pincode')
              );
              UserLocationDetailsUtil.setLocation({
                pincode: get(addressObject, 'pincode') || '',
                addressId: get(addressObject, 'addressInfo.id') || 0,
                addressName: get(addressObject, 'addressInfo.user.name') || '',
                unifiedId: get(addressObject, 'addressInfo.unifiedId') || ''
              });
              this.setState(
                {
                  userSelectedLocation: addressObject,
                  selectedAddressId: get(addressObject, 'addressInfo.id')
                },
                resolve
              );
            },
            reject,
            options
          );
        } else {
          UserLocationDetailsUtil.setLocation({
            pincode: get(addressObject, 'pincode') || '',
            addressId: get(addressObject, 'addressInfo.id') || 0,
            addressName: get(addressObject, 'addressInfo.user.name') || '',
            unifiedId: get(addressObject, 'addressInfo.unifiedId') || ''
          });
          this.setState(
            {
              userSelectedLocation: addressObject,
              selectedAddressId: get(addressObject, 'addressInfo.id')
            },
            resolve
          );
        }
      });
    }

    async handleAddressAction(operation, data, successCallback, errorCallback) {
      const { setLoader } = this.props;
      try {
        setLoader && setLoader(true);
        const response = await this[operation](data);
        successCallback && successCallback(response);
      } catch (err) {
        const code = get(err, 'error.code');
        const errorMsgs = getKVPairValue('ADDRESS_ERROR') || {};
        const message = errorMsgs[code] || errorMsgs.default;
        message &&
          errorNotification({
            message
          });
        triggerEvent('ADDRESS_ERROR', {
          gaLabel: err
        });
        errorCallback && errorCallback(err);
      } finally {
        setLoader && setLoader(false);
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          getAddressByUnifiedId={this.getAddressByUnifiedId}
          updateUserSelectedLocation={this.updateUserSelectedLocation}
          handleAddressAction={this.handleAddressAction}
        />
      );
    }
  };
};

export default AddressStateHOC;
