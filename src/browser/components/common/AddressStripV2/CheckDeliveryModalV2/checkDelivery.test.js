import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { mount } from 'enzyme';
import sinon from 'sinon';

import CheckDelivery from '.';

import addressData from 'testUtils/addressMockData';

describe('CheckDelivery Modal', () => {
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
    expect(wrapper.find('.header')).toHaveLength(1);
    expect(wrapper.find('.pincodeContainer')).toHaveLength(1);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('.optionsContainer')).toHaveLength(2);
    expect(wrapper.find('.addBlockAnchor')).toHaveLength(1);
    expect(wrapper.find('.header').text()).toEqual('Select Delivery Address');
  });

  it('should render headerText - Enter Delivery Details', () => {
    const wrapper = mount(
      <CheckDelivery
        hideModal={hideModal}
        updateUserSelectedLocation={updateUserSelectedLocation}
        handleAddNewAddressClick={handleAddNewAddressClick}
      />
    );
    expect(wrapper.find('.header').text()).toEqual('Enter Delivery Details');
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
    expect(wrapper.find('.header')).toHaveLength(1);
    expect(wrapper.find('.pincodeContainer')).toHaveLength(1);
    expect(wrapper.find('.or')).toHaveLength(0);
    expect(wrapper.find('.optionsContainer')).toHaveLength(0);
    expect(wrapper.find('.addBlockAnchor')).toHaveLength(0);
    expect(wrapper.find('.header').text()).toEqual('Enter Delivery Pincode');
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
      expect(wrapper.state().isValidPincode).toEqual(false);
      wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
      expect(wrapper.state().pincodeError).toEqual(
        'Invalid Pincode, please enter a valid pincode.'
      );

      wrapper
        .find('input[id="pincode"]')
        .simulate('change', { target: { value: '560068' } });
      expect(wrapper.state().pincode).toEqual('560068');
      expect(wrapper.state().isValidPincode).toEqual(true);
      wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
    });
    expect(hideModal.called).toEqual(true);
  });

  it('should call error callback', async () => {
    let wrapper;
    updateUserSelectedLocation = () => {
      throw new Error('Invalid');
    };
    wrapper = mount(
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
    expect(wrapper.state().pincode).toEqual('560068');
    expect(wrapper.state().isValidPincode).toEqual(true);
    wrapper.find('input[id="pincode"]').simulate('keypress', { keyCode: 13 });
    expect(wrapper.state().pincodeError).toEqual(
      'Oops! Something went wrong. Please try again in some time.'
    );
  });

  it('should handle address selection change', async () => {
    let wrapper = null;
    await new Promise((res, rej) => {
      wrapper = mount(
        <CheckDelivery
          addressData={addressData}
          hideModal={hideModal}
          updateUserSelectedLocation={() => {
            updateUserSelectedLocation();
            res();
          }}
          handleAddNewAddressClick={handleAddNewAddressClick}
          addressId={6140887}
        />
      );

      expect(wrapper.find('AddressDetailsV2')).toHaveLength(2);
      wrapper
        .find('.addressContainer[id="addressInfoButton1"]')
        .simulate('click');

      wrapper
        .find(
          '.addressContainer[id="addressInfoButton1"] DeliverButton .buttonContainer div'
        )
        .at(1)
        .simulate('click');
      expect(updateUserSelectedLocation.called).toEqual(true);
    });
    expect(hideModal.called).toEqual(true);

    wrapper.find('.addBlockAnchor').simulate('click');
    expect(handleAddNewAddressClick.called).toEqual(true);
  });

  it('should show add address button and input box when there is no address', () => {
    render(
      <CheckDelivery
        addressData={[]}
        hideModal={hideModal}
        updateUserSelectedLocation={() => {}}
        handleAddNewAddressClick={handleAddNewAddressClick}
        addressId={6140887}
      />
    );

    expect(screen.queryByText('OR')).toBeInTheDocument();
    expect(screen.queryByText('Add New Address')).toBeInTheDocument();
  });
});
