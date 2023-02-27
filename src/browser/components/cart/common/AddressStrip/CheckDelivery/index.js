import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { isLoggedIn, getUidx } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

import Modal from 'commonComp/Modal';
import Input from 'commonComp/InputV2';
import { RadioGroup, RadioButton } from 'commonComp/Radio';
import AddressDetails from 'commonComp/AddressDetails';

import Styles from './checkDelivery.base.css';

class CheckDeliveryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: props.addressId ? '' : props.pincode,
      pincodeError: '',
      isValidPincode: false
    };
    [
      'setOptionGroupRef',
      'getAddressList',
      'handleTextChange',
      'handleKeyPress',
      'handleAddressSelect',
      'handlePincodeCheck',
      'validatePincode'
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
        triggerEvent('VALID_PIN_CODE', {
          custom: {
            custom: {
              v1: pincode,
              v2: getUidx()
            },
            widget: {
              name: 'valid_pin_code',
              type: 'card'
            }
          }
        });
        this.setState({
          pincodeError: ''
        });
        hideModal();
      } catch (_) {
        triggerEvent('INVALID_PIN_CODE', {
          custom: {
            custom: {
              v1: pincode,
              v2: getUidx()
            },
            widget: {
              name: 'invalid_pin_code',
              type: 'card'
            }
          }
        });
        this.setState({
          pincodeError: Strings.OOPS_SOMETHING_WENT_WRONG
        });
      }
    } else {
      triggerEvent('INVALID_PIN_CODE', {
        custom: {
          custom: {
            v1: pincode,
            v2: getUidx()
          },
          widget: {
            name: 'invalid_pin_code',
            type: 'card'
          }
        }
      });
      this.setState({
        pincodeError:
          pincode && pincode.trim()
            ? 'Invalid Pincode, please enter a valid pincode.'
            : 'Please enter a valid pincode.'
      });
    }
  }

  handleAddressSelect(val) {
    const { updateUserSelectedLocation, hideModal, addressData } = this.props;
    if (!isNaN(val)) {
      const addressInfo = addressData.find(obj => obj.id === val) || {};

      triggerEvent('ADDRESS_CHANGE_ON_CART', {
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

      updateUserSelectedLocation({ pincode: addressInfo.pincode, addressInfo });
      hideModal();
    }
  }

  getAddressList() {
    const addressData = get(this, 'props.addressData') || [];
    const addressId = get(this, 'props.addressId') || '';

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
        {addressData.map((addressInfo, index) => (
          <RadioButton
            value={addressInfo.id}
            classes={{
              root: Styles.addressContainer,
              icon: Styles.addressRadioBtn
            }}
          >
            <AddressDetails
              className={Styles.addressDetail}
              addressInfo={addressInfo}
              minimize={true}
              showDefaultTag={true}
            />
          </RadioButton>
        ))}
        <div className={Styles.addBlockDiv}>
          <div
            onClick={this.props.handleAddNewAddressClick}
            className={Styles.addBlockAnchor}
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
        headerText = 'Change Delivery Address';
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
            onFocus={() => {
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
            }}
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
          <React.Fragment>
            <div className={Styles.or}>OR</div>
            {this.getAddressList()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

CheckDeliveryModal.propTypes = {
  pincode: PropTypes.string,
  addressId: PropTypes.string,
  hideModal: PropTypes.func,
  addressData: PropTypes.array,
  updateUserSelectedLocation: PropTypes.func,
  handleAddNewAddressClick: PropTypes.func
};

export default CheckDeliveryModal;
