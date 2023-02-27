import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './addressList.base.css';

// Components
import AddressForm from '../../common/AddressForm';
import { AddressBlock } from './AddressBlocks';
import Modal from 'commonComp/Modal';
import get from 'lodash/get';

export const AddAddressButton = props => {
  const { containerStyle, onClickHandler, labelStyle, label } = props;
  return (
    <div data-action="add" className={containerStyle} onClick={onClickHandler}>
      <div className={labelStyle ? labelStyle : ''}>{label}</div>
    </div>
  );
};

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        show: false,
        addressInfo: null
      }
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onClickHandler(e) {
    const action =
      e.target.getAttribute('data-action') ||
      e.currentTarget.getAttribute('data-action');
    const key =
      get(e, 'target.dataset.key', '') ||
      get(e, 'currentTarget.dataset.key', '');
    const id = parseInt(e.currentTarget.id);

    const addressData = get(this.props, 'addressData') || [];
    const clickedAddress =
      addressData.find(address => get(address, 'id') === id) || {};
    const unifiedId = clickedAddress.unifiedId;

    switch (action) {
      case 'add':
        this.setState({
          modal: {
            show: true,
            addressInfo: null
          }
        });
        triggerEvent('ADD_NEW_ADDRESS_CLICK');
        break;
      case 'showModal':
        this.setState({
          modal: {
            show: true,
            addressInfo: clickedAddress
          }
        });
        triggerEvent('EDIT_ADDRESS_CLICK');
        if (key === 'landmark-nudge') {
          triggerEvent('ADD_LANDMARK_CLICK');
        }
        break;
      case 'remove':
        this.props.handleAddressAction('removeAddress', unifiedId);
        triggerEvent('DELETE_ADDRESS_CLICK');
        break;
      case 'select':
        this.props.handleAddressAction('selectAddress', id);
        break;
    }
  }

  hideModal() {
    this.setState({ modal: { show: false, addressInfo: null } });
  }

  render() {
    const {
      addressData = [],
      selectedAddressId,
      selectedShippingData,
      serviceabilityFlags,
      serviceable,
      flags,
      isNewUser
    } = this.props;

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
      <div className={Style.container}>
        <div className={Style.titleContainer}>
          <div className={Style.title}>Select Delivery Address</div>
          <AddAddressButton
            onClickHandler={this.onClickHandler}
            containerStyle={Style.addAddressButton}
            label={'ADD NEW ADDRESS'}
          />
        </div>
        {defaultAddress
          ? [
              <div className={Style.defaultTitle}>DEFAULT ADDRESS</div>,
              <AddressBlock
                addressInfo={defaultAddress}
                selected={defaultAddress.id === selectedAddressId}
                selectedShippingData={selectedShippingData}
                serviceabilityFlags={serviceabilityFlags}
                serviceable={serviceable}
                onClickHandler={this.onClickHandler}
                key={`default_${defaultAddress.id}`}
                flags={flags}
              />
            ]
          : ''}

        {otherAddress.length
          ? [
              <div className={Style.otherTitle}>OTHER ADDRESS</div>,
              otherAddress.map(address => (
                <AddressBlock
                  addressInfo={address}
                  selected={get(address, 'id') === selectedAddressId}
                  selectedShippingData={selectedShippingData}
                  serviceabilityFlags={serviceabilityFlags}
                  serviceable={serviceable}
                  onClickHandler={this.onClickHandler}
                  key={`address_${get(address, 'id')}`}
                  flags={flags}
                />
              ))
            ]
          : ''}
        <AddAddressButton
          onClickHandler={this.onClickHandler}
          label={'+ Add New Address'}
          containerStyle={Style.addBlock}
          labelStyle={Style.label}
        />
        {this.state.modal.show && (
          <Modal
            className={Style.modal}
            cancelCallback={this.hideModal}
            cancelIconConfig={{ show: true, className: Style.icon }}
            disableBackdropClick={true}
          >
            {onCancel => (
              <AddressForm
                {...this.state.modal}
                cancelCallback={onCancel}
                successCallback={onCancel}
                handleAddressAction={this.props.handleAddressAction}
                showHeader={true}
                formClass={Style.removeMargin}
                isNewUser={isNewUser}
              />
            )}
          </Modal>
        )}
      </div>
    );
  }
}

AddressList.propTypes = {
  addressData: PropTypes.array.isRequired,
  handleAddressAction: PropTypes.func.isRequired,
  selectedAddressId: PropTypes.number
};

export default AddressList;
