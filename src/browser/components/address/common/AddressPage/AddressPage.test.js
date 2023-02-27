import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import AddressPage from '.';

import addressData from 'testUtils/addressMockData';
import serviceabilityMockData from 'testUtils/serviceabilityMockData';
import { cartMockData } from 'testUtils/cartMockData';

import AddressManager from 'commonBrowserUtils/AddressManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import { localStorageKeys } from 'commonUtils/constants';

describe('Address Page Comp', () => {
  beforeEach(() => {
    window.SHELL = {
      setActivePage: sinon.spy(),
      redirectTo: sinon.spy(),
      alert: sinon.spy()
    };
    AddressManager.getServiceability = (pincode, scb, ecb) =>
      scb(serviceabilityMockData);
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
  });

  window.triggerEvent = () => {};

  const options = {
    analytics: () => () => {},
    render: () => null,
    getCartStoreData: () => null,
    getAddressStoreData: () => null,
    setCartStoreData: () => {},
    setAddressStoreData: () => {}
  };

  it('should add address', () => {
    const wrapper = shallow(<AddressPage {...options} />);
    wrapper.setState({ addressData });
    wrapper.instance().addAddress({ id: 1234, isDefault: true });
    expect(
      wrapper.state().addressData.find(address => address.id === 1234)
    ).to.not.equal(undefined);
  });
  it('should remove address', () => {
    const wrapper = shallow(<AddressPage {...options} />);
    wrapper.setState({ addressData });
    wrapper.instance().removeAddress(null, null, '6140887:1');
    expect(
      wrapper
        .state()
        .addressData.find(address => address.unifiedId === '6140887:1')
    ).to.equal(undefined);
  });
  it('should edit address', () => {
    const wrapper = shallow(<AddressPage {...options} />);
    wrapper.setState({ addressData });
    wrapper
      .instance()
      .editAddress({ id: 6140886, name: 'xyz', isDefault: true });
    expect(
      wrapper.state().addressData.find(address => address.id === 6140886).name
    ).to.equal('xyz');
  });
  it('should set order address default address', () => {
    const wrapper = shallow(<AddressPage {...options} />);
    wrapper.instance().setAddressData({ addresses: addressData });
    expect(wrapper.state().selectedAddressId).to.equal(6140887);
  });
  it('should set order address as selected', () => {
    document.cookie = 'oai=6140886';
    const wrapper = shallow(<AddressPage {...options} />);
    wrapper.instance().setAddressData({ addresses: addressData });
    expect(wrapper.state().selectedAddressId).to.equal(6140886);
  });
  it('should redirect to login if not logged in', () => {
    const wrapper = mount(<AddressPage {...options} />);
    expect(window.SHELL.redirectTo.called).to.equal(true);
  });
  it('should not redirect to login', () => {
    document.cookie = 'ilgim=true';
    options.getCartStoreData = () => cartMockData;
    options.getAddressStoreData = () => ({
      addressData,
      selectedAddressId: 6140886
    });
    ProfileManager.prefetchDetails = () => {};

    const wrapper = mount(<AddressPage {...options} />);
    expect(window.SHELL.redirectTo.called).to.equal(false);
  });
  it('should fetch cart data', () => {
    AddressManager.getCart = (data, scb, ecb) => scb(cartMockData);
    const wrapper = mount(<AddressPage {...options} />);
    wrapper.instance().handleNoAddress();
    expect(wrapper.state().cartData).to.not.equal(null);
  });
  it('should set cart data from props', () => {
    options.storeCartData = cartMockData;
    const wrapper = mount(<AddressPage {...options} />);

    wrapper.instance().handleNoAddress();
    expect(wrapper.state().cartData).to.not.equal(null);
  });
  it('should test all methods of component', () => {
    options.getCartStoreData = () => cartMockData;
    options.getAddressStoreData = () => ({
      addressData,
      selectedAddressId: 6140886
    });

    const wrapper = mount(<AddressPage {...options} />);
    wrapper.setState({ action: 'update' });
    expect(wrapper.state().action).to.not.equal(null);

    wrapper.instance().updateDynamicStyles('background', 'red');
    expect(wrapper.state().dynamicStyles.background).to.equal('red');

    wrapper.instance().handleNoAddress();
    expect(wrapper.state().cartData).to.not.equal(null);

    wrapper.instance().selectAddress(6140887);
    expect(wrapper.state().selectedAddressId).to.equal(6140887);
  });
  it('should call handleCartAction with error/success', () => {
    AddressManager.getAddressbyUnifiedId = (data, scb, ecb) =>
      ecb('error on get ddress');
    const wrapper = mount(<AddressPage {...options} />);

    wrapper.instance().handleCartAction('getAddressbyUnifiedId', 'data');
    expect(window.SHELL.alert.called).to.equal(true);

    AddressManager.getAddressbyUnifiedId = (data, scb, ecb) =>
      scb(cartMockData);
    wrapper.instance().handleCartAction('getAddressbyUnifiedId', 'data');
    expect(wrapper.state().cartData).to.not.equal(null);
  });
  it('should call handleAddressAction with error/success', () => {
    AddressManager.getAddressbyUnifiedId = (data, scb, ecb) =>
      ecb('error on get ddress');
    const wrapper = mount(<AddressPage {...options} />);
    wrapper.instance().handleAddressAction('getAddressbyUnifiedId', 'data');
    expect(window.SHELL.alert.called).to.equal(true);

    wrapper.instance().handleAddressAction('selectAddress', 6140886);

    AddressManager.editAddress = (data, scb, ecb) => scb(addressData[0]);
    wrapper.instance().handleAddressAction('editAddress', {
      id: 6140886,
      name: 'xyz',
      isDefault: true
    });
  });

  it('should reset session storage keys "payment_tried_count" and "payment_mode_attributes" if payment failure feature is enabled', () => {
    window._checkout_.__myx_ab__['payment.failure'] = 'enabled';
    window._checkout_.__myx_deviceData__ = {
      isApp: true
    };
    localStorage.setItem(localStorageKeys.PAYMENT_TRIED_COUNT, '1');
    localStorage.setItem(
      localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
      '{"paymentMode":"netbanking","paymentModeName":"netbanking","modeAttributes":{"paymentProviderId":1}}'
    );

    mount(<AddressPage {...options} />);

    const cachedPaymentCount = +localStorage.getItem(
      localStorageKeys.PAYMENT_TRIED_COUNT
    );
    const cachedModeAttributes = localStorage.getItem(
      localStorageKeys.PAYMENT_MODE_ATTRIBUTES
    );
    expect(cachedPaymentCount).to.equal(0);
    expect(cachedModeAttributes).to.equal(null);
  });
});
