import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import AddressList, { AddAddressButton } from '.';
import { AddressBlock } from './AddressBlocks';
import AddressForm from '../../common/AddressForm';

import addressData from 'testUtils/addressMockData';
import {
  selectedShippingData,
  serviceabilityflags,
  flags
} from 'testUtils/serviceabilityMockData';

describe('Address List for desktop', () => {
  window.triggerEvent = () => {};

  it('should show header', () => {
    const wrapper = mount(
      <AddressList addressData={addressData} selectedAddressId={6140886} />
    );
    expect(wrapper.find('.title').text()).to.contain('Select Delivery Address');
  });

  it('should show 2 Address block and 2 Add Address block', () => {
    const wrapper = shallow(
      <AddressList addressData={addressData} selectedAddressId={6140886} />
    );
    expect(wrapper.find(AddressBlock)).to.have.lengthOf(2);
    expect(wrapper.find(AddAddressButton)).to.have.lengthOf(2);
  });

  it('should set state is true when onClickHandler is called with add attribute', () => {
    const wrapper = shallow(
      <AddressList addressData={addressData} selectedAddressId={6140886} />
    );
    wrapper.instance().onClickHandler({
      target: {
        getAttribute() {
          return 'add';
        }
      },
      currentTarget: { id: '' }
    });
    expect(wrapper.state().modal.show).to.equal(true);
  });

  it('should call handleAddressAction on select action', () => {
    const handleAddressAction = sinon.spy();
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        handleAddressAction={handleAddressAction}
      />
    );
    wrapper.instance().onClickHandler({
      target: {
        getAttribute() {
          return 'select';
        }
      },
      currentTarget: { id: 6140886 }
    });
    expect(handleAddressAction).to.have.property('callCount', 1);
  });

  it('should show/hide Modal when modal state is true/false', () => {
    const wrapper = mount(
      <AddressList addressData={addressData} selectedAddressId={6140886} />
    );
    wrapper.setState({ modal: { show: true } });
    expect(wrapper.find(AddressForm)).to.have.lengthOf(1);

    wrapper.setState({ modal: { show: false } });
    expect(wrapper.find(AddressForm)).to.have.lengthOf(0);
  });

  it('should set state is true when onClickHandler is called with showModal attribute', () => {
    const wrapper = shallow(
      <AddressList addressData={addressData} selectedAddressId={6140886} />
    );
    wrapper.instance().onClickHandler({
      target: {
        getAttribute() {
          return 'showModal';
        }
      },
      currentTarget: { id: addressData[0].id }
    });
    expect(wrapper.state().modal.show).to.equal(true);
    expect(wrapper.state().modal.addressInfo.id).to.equal(addressData[0].id);
  });

  it('should call handleAddressAction on remove action', () => {
    const handleAddressAction = sinon.spy();
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        handleAddressAction={handleAddressAction}
      />
    );
    wrapper.instance().onClickHandler({
      target: {
        getAttribute() {
          return 'remove';
        }
      },
      currentTarget: { id: '' }
    });
    expect(handleAddressAction).to.have.property('callCount', 1);
  });

  it('should display Pay on Delivery available', () => {
    const wrapper = mount(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        serviceable={true}
        serviceabilityFlags={{ serviceabilityflags }}
        selectedShippingData={selectedShippingData}
      />
    );

    expect(wrapper.find('.block .container').text()).to.contain(
      'Pay on Delivery available'
    );
  });

  it('should display Cash on Delivery available', () => {
    const shippingData = {
      flags: {
        ...selectedShippingData.flags,
        cardOnDelivery: { value: false }
      }
    };
    const wrapper = mount(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        serviceable={true}
        serviceabilityFlags={{ serviceabilityflags }}
        selectedShippingData={shippingData}
      />
    );
    expect(wrapper.find('.block .container').text()).to.contain(
      'Cash on Delivery available'
    );
  });

  it('should display Pay on Delivery not available', () => {
    const shippingData = {
      flags: {
        ...selectedShippingData.flags,
        cardOnDelivery: { value: false },
        cashOnDelivery: { value: false }
      }
    };
    const wrapper = mount(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        serviceable={true}
        serviceabilityFlags={{ serviceabilityflags }}
        selectedShippingData={shippingData}
      />
    );
    expect(wrapper.find('.block .container').text()).to.contain(
      'Pay on Delivery not available'
    );
  });

  it('should display error on invalid address', () => {
    const shippingData = {
      flags: {
        ...selectedShippingData.flags,
        cardOnDelivery: { value: false },
        cashOnDelivery: { value: false }
      }
    };

    const mockAddressData = addressData[0];
    mockAddressData.checkoutAllowed = false;
    const wrapper = mount(
      <AddressList
        addressData={[mockAddressData]}
        selectedAddressId={6140887}
        serviceable={true}
        serviceabilityFlags={{ serviceabilityflags }}
        selectedShippingData={shippingData}
      />
    );
    expect(wrapper.find('.block .error').text()).to.contain(
      'Please add house, street and locality details to improve your address or ensure mobile number is valid, before proceeding further.'
    );
  });

  it('should display Try & Buy available', () => {
    window._checkout_ = { __myx_features__: { 'paid.trynbuy.enabled': true } };
    const wrapper = mount(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        serviceable={true}
        serviceabilityFlags={{ serviceabilityflags }}
        selectedShippingData={selectedShippingData}
        flags={{ tryNBuyApplicable: { value: true } }}
      />
    );
    expect(wrapper.find('.block .container').text()).to.contain(
      'Try & Buy available'
    );
  });
});
