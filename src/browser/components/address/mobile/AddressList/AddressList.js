import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Components
import { setDocTitleInMobile, navigateTo } from 'commonBrowserUtils/Helper';
import { setSelectedAddressCookie } from 'commonBrowserUtils/AddressHelper';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import Loader from 'commonComp/Loader';
import Button from 'commonComp/Button';
import CheckoutSteps from 'commonComp/CheckoutSteps';
import { AddressBlock, AddAddressBlock } from '../AddressBlocks';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';

// Styles
import Style from './addressList.base.css';

class AddressList extends React.Component {
  constructor(props) {
    super(props);

    const { cartData, selectedAddressId, addressData, tempAddressId } = props;

    this.state = {
      selectedAddressId: tempAddressId ? tempAddressId : selectedAddressId,
      cartData
    };
    this.firstUpdate = true;
    this.isAddressRequiredOnPayment =
      isVariantEnabled('AOC_V2_VARIANT3') || isFeatureEnabled('ORDER_REVIEW');
    this.isAocV2Variant3Enabled = isVariantEnabled('AOC_V2_VARIANT3');

    if (tempAddressId) {
      this.selectAddress(tempAddressId);
    } else if (selectedAddressId) {
      this.currentPincode = this.getPinCode(selectedAddressId, addressData);
    }

    [
      'onClickHandler',
      'onClickConfirmHandler',
      'selectAddress',
      'getPinCode',
      'redirectBasedOnAction'
    ].forEach(method => (this[method] = this[method].bind(this)));

    setDocTitleInMobile('SELECT ADDRESS');
    if (window.location.search === '?referer=payment')
      triggerEvent('ADDRESS_PAGE_LOAD');
  }

  componentDidUpdate() {
    const {
      cartData,
      selectedAddressId,
      addressData,
      tempAddressId
    } = this.props;
    if (this.firstUpdate && cartData) {
      this.firstUpdate = false;
      this.setState(prevState => {
        const currentSelectedAddressId =
          prevState.selectedAddressId ||
          (tempAddressId ? tempAddressId : selectedAddressId);
        return {
          selectedAddressId: currentSelectedAddressId,
          cartData
        };
      });
      if (tempAddressId) {
        this.selectAddress(tempAddressId);
      } else {
        this.currentPincode = this.getPinCode(selectedAddressId, addressData);
      }
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
    !this.isAddressRequiredOnPayment &&
      this.props.setToContainerState({ action: 'back' });
  }

  onClickHandler(e) {
    const addressData = get(this.props, 'addressData', []);
    const selectedAddressId = parseInt(e.currentTarget.id);
    const selectedAddress =
      addressData.find(address => get(address, 'id') === selectedAddressId) ||
      {};
    const unifiedAddressId = selectedAddress.unifiedId;

    if (!selectedAddressId || !unifiedAddressId) {
      return;
    }
    const action = e.target.getAttribute('data-action') || 'select';

    if (action === 'remove') {
      this.props.handleAddressAction(
        action + 'Address',
        unifiedAddressId,
        id => {
          this.selectAddress(id);
        }
      );
      triggerEvent('DELETE_ADDRESS_CLICK');
    } else if (action === 'edit') {
      return;
    } else {
      this.selectAddress(selectedAddressId);
    }
  }

  selectAddress(selectedAddressId) {
    const { addressData, handleCartAction, setToContainerState } = this.props;
    const pinCode = this.getPinCode(selectedAddressId, addressData);

    if (this.currentPincode !== pinCode) {
      handleCartAction(
        'getServiceability',
        pinCode,
        cartData => {
          this.currentPincode = pinCode;
          this.setState({
            cartData,
            selectedAddressId
          });
          setToContainerState({ tempAddressId: selectedAddressId });
        },
        err => {},
        { keepPreviousState: true }
      );
    } else {
      this.setState({ selectedAddressId });
      setToContainerState({ tempAddressId: selectedAddressId });
    }
  }

  getPinCode(addressId, addressData) {
    return (
      (addressData || []).find(address => get(address, 'id') === addressId) ||
      {}
    ).pincode;
  }

  onClickConfirmHandler() {
    const { selectedAddressId, cartData } = this.state;
    const { setToContainerState, successCallback, addressData } = this.props;
    const selectedAddress =
      addressData.find(address => get(address, 'id') === selectedAddressId) ||
      {};
    if (isFeatureEnabled('ADDRESS_ON_CART_V2')) {
      UserLocationDetailsUtil.setLocation({
        pincode: get(selectedAddress, 'pincode') || '',
        addressId: get(selectedAddress, 'id') || 0,
        addressName: get(selectedAddress, 'user.name') || '',
        unifiedId: get(selectedAddress, 'unifiedId') || ''
      });
    } else {
      setSelectedAddressCookie({
        addressId: selectedAddressId,
        unifiedId: get(selectedAddress, 'unifiedId')
      });
    }

    triggerEvent('ADDRESS_SELECTED', {
      custom: selectedAddress,
      gaLabel: selectedAddress.pincode
    });
    triggerEvent('SELECT_ADDRESS_CLICK');
    triggerEvent(
      selectedAddress.checkoutAllowed
        ? 'VALID_ADDRESS_SELECTED'
        : 'BAD_ADDRESS_SELECTED'
    );
    if (!get(cartData, 'serviceability.serviceabilityFlags.pincode.value')) {
      triggerEvent('NOT_SERVICEABLE_ADDRESS_SELECTED');
    }

    /**********************************************************
     * navigate to payment when no address is present in the  *
     * user's account. If address is present then use goback  *
     **********************************************************/
    const navigateToPayments = () => navigateTo('/checkout/payment', true);

    const aocV2Callback = () => {
      this.props.handleCartAction(
        'setOrderAddress',
        {
          unifiedAddressId: selectedAddress.unifiedId,
          addressId: selectedAddress.id
        },
        res => {
          if (res) {
            this.props.updateCheckoutState({
              cartData: res,
              selectedAddress
            });
          }
          navigateToPayments();
        },
        () => {}
      );
    };
    setToContainerState(
      { selectedAddressId, cartData, action: '' },
      this.isAddressRequiredOnPayment ? aocV2Callback : successCallback
    );
  }

  redirectBasedOnAction(path) {
    if (this.isBeingRedirected) {
      return;
    }
    this.isBeingRedirected = true;
    this.props.action === 'back'
      ? this.props.setToContainerState({ action: '' }, () => {
          this.props.history.goBack();
        })
      : this.props.history.push(path);
  }

  render() {
    let { addressData, history, loading } = this.props;
    addressData = addressData ? addressData : [];

    if ((addressData && addressData.length) || loading) {
      const { cartData, selectedAddressId } = this.state;

      const serviceable = get(
        cartData,
        'serviceability.serviceabilityFlags.pincode.value',
        false
      );

      let validAddress =
        selectedAddressId &&
        (
          addressData.find(
            address => get(address, 'id') === selectedAddressId
          ) || {}
        ).checkoutAllowed;

      validAddress = this.isAddressRequiredOnPayment
        ? validAddress && serviceable
        : validAddress;

      let defaultAddress = null;
      let otherAddress = [];

      addressData.forEach(address => {
        if (address) {
          if (address.isDefault) {
            defaultAddress = address;
          } else {
            otherAddress.push(address);
          }
        }
      });

      return (
        <div>
          <CheckoutSteps
            currentPage={'Address'}
            hideSteps={this.isAocV2Variant3Enabled}
          />
          <div className={Style.container}>
            <Loader show={loading} backdrop={true} />

            <AddAddressBlock />

            {defaultAddress
              ? [
                  <div className={Style.title}>DEFAULT ADDRESS</div>,
                  <AddressBlock
                    addressInfo={defaultAddress}
                    selected={defaultAddress.id === selectedAddressId}
                    onClickHandler={this.onClickHandler}
                    key={`default_${defaultAddress.id}`}
                    serviceable={serviceable}
                  />
                ]
              : ''}

            {otherAddress.length
              ? [
                  <div key={'other_header'} className={Style.title}>
                    OTHER ADDRESS
                  </div>,
                  otherAddress.map(address => (
                    <AddressBlock
                      addressInfo={address}
                      selected={get(address, 'id') === selectedAddressId}
                      onClickHandler={this.onClickHandler}
                      key={`address_${get(address, 'id')}`}
                      serviceable={serviceable}
                    />
                  ))
                ]
              : ''}

            <div className={Style.stickyButton}>
              {validAddress ? (
                <Button
                  className={Style.confirmBtn}
                  onClick={this.onClickConfirmHandler}
                >
                  CONFIRM
                </Button>
              ) : (
                <Button className={Style.disabledBtn}>
                  {validAddress === false
                    ? 'Please choose another address'
                    : 'Please choose address'}
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      this.redirectBasedOnAction('/checkout/address/add');
    }
    return null;
  }
}

AddressList.propTypes = {
  addressData: PropTypes.array.isRequired,
  handleAddressAction: PropTypes.func.isRequired,
  selectedAddressId: PropTypes.number
};

export default AddressList;
