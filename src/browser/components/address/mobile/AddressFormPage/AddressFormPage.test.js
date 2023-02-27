import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { AddressFormPage } from '.';
import AddressForm from '../../common/AddressForm';

import addressData from 'testUtils/addressMockData';
import AddressManager from 'commonBrowserUtils/AddressManager';

describe('Address Form Page for mobile comp', () => {
  let handleAddressAction, setToContainerState, goBack;

  beforeEach(() => {
    window.triggerEvent = () => {};
    window.SHELL = {
      setActivePage: () => {}
    };
    handleAddressAction = sinon.spy();
    setToContainerState = sinon.spy();
    goBack = sinon.spy();
  });

  it('should show Address Form', () => {
    const wrapper = mount(
      <AddressFormPage
        setToContainerState={setToContainerState}
        goBack={goBack}
        handleAddressAction={handleAddressAction}
      />
    );

    expect(wrapper.find(AddressForm)).to.have.lengthOf(1);
    expect(setToContainerState).to.have.property('callCount', 1);
  });

  it('should call successCallback function', () => {
    const wrapper = mount(
      <AddressFormPage
        setToContainerState={setToContainerState}
        goBack={goBack}
        handleAddressAction={handleAddressAction}
      />
    );

    wrapper.instance().successCallback();
    expect(setToContainerState).to.have.property('callCount', 2);
  });

  it('should set addressInfo', () => {
    AddressManager.validateAddress = (uidx, scb, ecb) =>
      scb({
        score: 'VALID'
      });
    AddressManager.getServiceability = (pincode, scb, ecb) =>
      scb({
        serviceability: {
          addressInfo: { pincode },
          serviceabilityFlags: {
            pincode: { value: true }
          }
        }
      });
    AddressManager.getLocallity = (uidx, scb, ecb) =>
      scb({
        cities: ['Bangalore'],
        locality: ['Begur', 'Bommanahalli (Bangalore)'],
        state: { code: 'KA', name: 'Karnataka' }
      });
    const wrapper = mount(
      <AddressFormPage
        setToContainerState={setToContainerState}
        goBack={goBack}
        handleAddressAction={handleAddressAction}
        addressInfo={addressData[0]}
      />
    );

    const addressForm = wrapper.find(AddressForm);

    expect(addressForm.state().addressInfo.id).to.equal('6140887');
  });
});
