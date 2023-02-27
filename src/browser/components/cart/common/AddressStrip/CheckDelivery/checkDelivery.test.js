import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import CheckDelivery from '.';
import AddressDetails from 'commonComp/AddressDetails';

import addressData from 'testUtils/addressMockData';

describe('Add to Wishlist', () => {
  let hideModal, updateUserSelectedLocation, handleAddNewAddressClick;
  window.triggerEvent = () => {};
  beforeEach(() => {
    hideModal = sinon.spy();
    updateUserSelectedLocation = sinon.spy();
    handleAddNewAddressClick = sinon.spy();
    document.cookie = 'ilgim=true';
  });

  it('should render the CheckDelivery', () => {
    const wrapper = mount(
      <CheckDelivery
        addressData={addressData}
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
      />
    );
    expect(wrapper.find('.header')).to.have.lengthOf(1);
    expect(wrapper.find('.pincodeContainer')).to.have.lengthOf(1);
    expect(wrapper.find('.or')).to.have.lengthOf(1);
    expect(wrapper.find('.optionsContainer')).to.have.lengthOf(2);
    expect(wrapper.find('.addBlockAnchor')).to.have.lengthOf(1);
    expect(wrapper.find('.header').text()).to.equal('Change Delivery Address');
  });

  it('should render headerText - Enter Delivery Details', () => {
    const wrapper = mount(
      <CheckDelivery
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
      />
    );
    expect(wrapper.find('.header').text()).to.equal('Enter Delivery Details');
  });

  it('should render for non logged in user', () => {
    document.cookie = 'ilgim=false';
    const wrapper = mount(
      <CheckDelivery
        addressData={addressData}
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
      />
    );
    expect(wrapper.find('.header')).to.have.lengthOf(1);
    expect(wrapper.find('.pincodeContainer')).to.have.lengthOf(1);
    expect(wrapper.find('.or')).to.have.lengthOf(0);
    expect(wrapper.find('.optionsContainer')).to.have.lengthOf(0);
    expect(wrapper.find('.addBlockAnchor')).to.have.lengthOf(0);
    expect(wrapper.find('.header').text()).to.equal('Enter Delivery Pincode');
  });

  it('should handle pincode textbox change', async () => {
    await new Promise((res, rej) => {
      updateUserSelectedLocation = () => res();
      const wrapper = mount(
        <CheckDelivery
          addressData={addressData}
          hideModal={hideModal}
          updateUserSelectedLocation={updateUserSelectedLocation}
          handleAddNewAddressClick={handleAddNewAddressClick}
        />
      );

      wrapper
        .find('input[id="pincode"]')
        .simulate('change', { target: { value: 'asdffg' } });
      expect(wrapper.state().isValidPincode).to.equal(false);
      wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
      expect(wrapper.state().pincodeError).to.equal(
        'Invalid Pincode, please enter a valid pincode.'
      );

      wrapper
        .find('input[id="pincode"]')
        .simulate('change', { target: { value: '560068' } });
      expect(wrapper.state().pincode).to.equal('560068');
      expect(wrapper.state().isValidPincode).to.equal(true);
      wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
    });
    expect(hideModal.called).to.equal(true);
  });

  it('should call error callback', () => {
    updateUserSelectedLocation = (data, scb, ecb) => ecb();
    const wrapper = mount(
      <CheckDelivery
        addressData={addressData}
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
      />
    );

    wrapper
      .find('input[id="pincode"]')
      .simulate('change', { target: { value: '560068' } });
    expect(wrapper.state().pincode).to.equal('560068');
    expect(wrapper.state().isValidPincode).to.equal(true);
    wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
    expect(wrapper.state().pincodeError).to.equal(
      'Oops! Something went wrong. Please try again in some time.'
    );
  });

  it('should handle address selection change', () => {
    const wrapper = mount(
      <CheckDelivery
        addressData={addressData}
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
        addressId={6140887}
      />
    );

    expect(wrapper.find(AddressDetails)).to.have.lengthOf(2);
    wrapper
      .find('.addressContainer[id="addressInfoButton1"]')
      .simulate('click');
    expect(updateUserSelectedLocation.called).to.equal(true);
    expect(hideModal.called).to.equal(true);

    wrapper.find('.addBlockAnchor').simulate('click');
    expect(handleAddNewAddressClick.called).to.equal(true);
  });
});
