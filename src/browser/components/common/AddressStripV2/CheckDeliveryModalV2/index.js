import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { isLoggedIn, getUidx } from 'commonBrowserUtils/Helper';

import Input from 'commonComp/InputV2';
import { RadioGroup, RadioButton } from 'commonComp/Radio';
import AddressDetailsV2 from 'commonComp/AddressDetailsV2';
import Strings from 'commonBrowserUtils/Strings';

import Styles from './CheckDeliveryModalV2.base.css';

const Header = ({ isSeparator, addNewAddress }) => {
  return isSeparator ? (
    <div className={Styles.or}>OR</div>
  ) : (
    <div className={Styles.topStrip}>
      <div className={Styles.savedAddressText}>{Strings.SAVED_ADDRESS}</div>
      <div
        className={Styles.addNewAddress}
        onClick={addNewAddress}
        data-position="top"
      >
        {' '}
        {Strings.ADD_NEW_ADDRESS}
      </div>
    </div>
  );
};

const triggerPincodeEvent = (pincode, valid = false) => {
  triggerEvent(valid ? 'VALID_PIN_CODE' : 'INVALID_PIN_CODE', {
    custom: {
      custom: {
        v1: pincode,
        v2: getUidx()
      },
      widget: {
        name: valid ? 'valid_pin_code' : 'invalid_pin_code',
        type: 'card'
      }
    }
  });
};

const triggerEnterPincodeEvent = () => {
  triggerEvent('ENTER_PIN_CODE', {
    custom: {
      custom: {
        v1: getUidx()
      },
      widget: {
        name: 'enter_pin_code',
        type: 'card'
      }
    }
  });
};

class CheckDeliveryModalV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: props.addressId ? '' : props.pincode,
      pincodeError: '',
      isValidPincode: false,
      addressId: get(this, 'props.hashId') || get(this, 'props.addressId') || ''
    };
    [
      'setOptionGroupRef',
      'getAddressList',
      'handleTextChange',
      'handleKeyPress',
      'handleAddressSelect',
      'handlePincodeCheck',
      'onAddressConfirmation',
      'validatePincode',
      'handleDeleteAddressClick'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    this.optionsGroupRef && this.optionsGroupRef.setFocus();
    this.validatePincode(this.props.addressId ? '' : this.props.pincode);
  }

  setOptionGroupRef(node) {
    this.optionsGroupRef = node;
  }

  handleTextChange(e) {
    const val = get(e, 'target.value') || '';
    this.validatePincode(val);
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handlePincodeCheck();
    }
  }

  async handleDeleteAddressClick() {
    const { handleDeleteAddress, addressData = [] } = this.props;
    const { addressId } = this.state;
    try {
      const selectedAddress =
        addressData.find(address => get(address, 'id') === addressId) || {};
      await handleDeleteAddress(selectedAddress.unifiedId);

      let id = '';
      if (addressData.length) {
        const defaultAddress = addressData.find(address =>
          get(address, 'isDefault')
        );
        id = defaultAddress ? defaultAddress.id : addressData[0].id;
      }
      this.handleAddressSelect(id);
    } catch (err) {
      console.error(err);
    }
  }

  validatePincode(pincode = '') {
    let isValidPincode = false;
    if (
      pincode &&
      pincode.trim() &&
      pincode.trim().length === 6 &&
      !isNaN(pincode)
    ) {
      isValidPincode = true;
      this.setState({
        pincodeError: ''
      });
    }
    this.setState({ pincode, isValidPincode });
  }

  async handlePincodeCheck() {
    const { pincode, isValidPincode } = this.state;
    const { updateUserSelectedLocation, hideModal } = this.props;

    if (isValidPincode) {
      try {
        await updateUserSelectedLocation(
          { pincode, addressInfo: {} },
          { showErrorToast: false }
        );
        triggerPincodeEvent(pincode, true);
        this.setState({
          pincodeError: ''
        });

        hideModal();
      } catch (err) {
        triggerPincodeEvent(pincode, false);
        this.setState({
          pincodeError: Strings.OOPS_SOMETHING_WENT_WRONG
        });
      }
    } else {
      triggerPincodeEvent(pincode, false);
      this.setState({
        pincodeError:
          pincode && pincode.trim()
            ? 'Invalid Pincode, please enter a valid pincode.'
            : 'Please enter a valid pincode.'
      });
    }
  }

  triggerAddressChangeEvent(eventName) {
    const { addressData } = this.props;
    const addressId = this.state.addressId;
    const addressInfo = addressData.find(obj => obj.id === addressId) || {};
    triggerEvent(eventName, {
      custom: {
        custom: {
          v1: addressInfo.pincode,
          v2: addressInfo.id,
          v3: getUidx()
        },
        widget: {
          name: 'address_change_on_cart',
          type: 'card'
        }
      }
    });
  }

  async onAddressConfirmation() {
    const addressId = this.state.addressId;
    const { updateUserSelectedLocation, hideModal, addressData } = this.props;
    const addressInfo = addressData.find(obj => obj.id === addressId) || {};
    this.triggerAddressChangeEvent('ADDRESS_CHANGE_ON_CART_V2');
    try {
      await updateUserSelectedLocation({
        pincode: addressInfo.pincode,
        addressInfo
      });
    } catch (err) {
    } finally {
      hideModal();
    }
  }

  handleAddressSelect(val) {
    if (!isNaN(val)) {
      this.triggerAddressChangeEvent('ADDRESS_SELECT_ON_CART_V2');

      this.setState({ addressId: val });
      if (window.ckrrhistory) {
        window.ckrrhistory.replace(`#${val}`);
      }
    }
  }

  getAddressList() {
    const addressData = get(this, 'props.addressData') || [];
    const addressId = get(this, 'state.addressId');

    let defaultAddressIndex = addressData.findIndex(
      address => address.isDefault
    );
    if (defaultAddressIndex > 0) {
      let defaultAddress = addressData[defaultAddressIndex];
      addressData[defaultAddressIndex] = addressData[0];
      addressData[0] = defaultAddress;
    }

    return (
      <RadioGroup
        className={Styles.optionsContainer}
        name="addressInfo"
        onChange={this.handleAddressSelect}
        value={addressId}
        ref={this.setOptionGroupRef}
        scrollSelectedInView={true}
      >
        <Header
          isSeparator={!addressData.length}
          addNewAddress={this.props.handleAddNewAddressClick}
        />
        {addressData.map((addressInfo, index) => (
          <RadioButton
            value={addressInfo.id}
            classes={{
              root: Styles.addressContainer,
              icon: Styles.addressRadioBtn
            }}
          >
            <AddressDetailsV2
              className={Styles.addressDetail}
              addressInfo={addressInfo}
              minimize={addressId !== addressInfo.id}
              showDefaultTag={true}
              selectedAddressId={get(this, 'props.addressId')}
              onAddressConfirmation={this.onAddressConfirmation}
              handleEditAddressClick={this.props.handleEditAddressClick}
              handleDeleteAddressClick={this.handleDeleteAddressClick}
            />
          </RadioButton>
        ))}
        <div className={Styles.addBlockDiv}>
          <div
            onClick={this.props.handleAddNewAddressClick}
            className={Styles.addBlockAnchor}
            data-position="bottom"
          >
            Add New Address
          </div>
        </div>
      </RadioGroup>
    );
  }

  render() {
    const { pincode, isValidPincode, pincodeError } = this.state;
    const { addressData } = this.props;

    let headerText = 'Enter Delivery Pincode';

    if (isLoggedIn()) {
      if (addressData && addressData.length) {
        headerText = 'Select Delivery Address';
      } else {
        headerText = 'Enter Delivery Details';
      }
    }

    return (
      <React.Fragment>
        <div className={Styles.header}>{headerText}</div>
        <div className={Styles.pincodeContainer}>
          <Input
            id="pincode"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            onFocus={triggerEnterPincodeEvent}
            type="tel"
            maxLength="6"
            errorMessage={pincodeError}
          />
          <div
            className={`${Styles.checkBtn} ${
              isValidPincode ? Styles.valid : Styles.inValid
            }`}
            onClick={this.handlePincodeCheck}
          >
            CHECK
          </div>
        </div>
        {isLoggedIn() && (
          <React.Fragment>{this.getAddressList()}</React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

CheckDeliveryModalV2.propTypes = {
  pincode: PropTypes.string,
  addressId: PropTypes.string,
  hideModal: PropTypes.func,
  addressData: PropTypes.array,
  updateUserSelectedLocation: PropTypes.func,
  handleAddNewAddressClick: PropTypes.func
};

export default CheckDeliveryModalV2;
