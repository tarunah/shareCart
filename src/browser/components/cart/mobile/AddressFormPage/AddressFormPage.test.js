import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import AddressFormPage from '.';
import AddressForm from '../../../address/common/AddressForm';

import addressData from 'testUtils/addressMockData';
import AddressManager from 'commonBrowserUtils/AddressManager';

describe('Address Form Page for mobile comp', () => {
  let handleAddressAction, goBack;

  beforeEach(() => {
    window.triggerEvent = () => {};
    window.SHELL = {
      setActivePage: () => {}
    };
    handleAddressAction = sinon.spy();
    goBack = sinon.spy();
  });

  it('should show Address Form', () => {
    const wrapper = mount(
      <AddressFormPage
        goBack={goBack}
        handleAddressAction={handleAddressAction}
      />
    );

    expect(wrapper.find(AddressForm)).to.have.lengthOf(1);
  });

  it('should call successCallback function', () => {
    const wrapper = mount(
      <AddressFormPage
        goBack={goBack}
        handleAddressAction={handleAddressAction}
      />
    );

    wrapper.instance().successCallback();
  });
});
