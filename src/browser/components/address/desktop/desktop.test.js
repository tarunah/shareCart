import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import AddressComponent from './index';
import addressData from 'testUtils/addressMockData';
import { cartMockData } from 'testUtils/cartMockData';
import { CheckoutProvider } from '@context/CheckoutContext';

describe('Address Page', () => {
  beforeEach(() => {
    window.SHELL = { setActivePage: jest.fn(() => {}) };
  });

  it('Address with a specific addressID should be set as selected', () => {
    window.triggerEvent = jest.fn(() => {});
    //passing one address to check if it is selected
    const addressMockData = [addressData[1]];
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent
          addressData={addressMockData}
          cartData={cartMockData}
          selectedAddressId={addressMockData[0].id}
        />
      </CheckoutProvider>
    );
    expect(
      wrapper.find('.block').find('RadioActive.radioIcon')
    ).to.have.lengthOf(1);
  });

  it('should check for addressList,TryAndBuy,DeliveryOptions,PriceBlock', () => {
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent addressData={addressData} cartData={cartMockData} />
      </CheckoutProvider>
    );
    expect(wrapper.find('AddressList')).to.have.lengthOf(1);
    expect(wrapper.find('TryAndBuy')).to.have.lengthOf(1);
    expect(wrapper.find('DeliveryOptions')).to.have.lengthOf(1);
    expect(wrapper.find('PriceBlock')).to.have.lengthOf(1);
  });

  it('onClicking on continue should call handleCartAction with selectedAddressId and redirect to payment page', () => {
    window.triggerEvent = jest.fn(() => {});
    //passing one address to check if it is selected
    const selectedAddressId = addressData[0].id;
    const handleCartAction = jest.fn(
      (functionName, selectedAddressId, successCB, errorCB) => {
        successCB();
      }
    );
    const redirectTo = sinon.spy();
    window.SHELL = { redirectTo, setActivePage: jest.fn(() => {}) };
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent
          addressData={addressData}
          cartData={cartMockData}
          selectedAddressId={selectedAddressId}
          handleCartAction={handleCartAction}
        />
      </CheckoutProvider>
    );

    wrapper.find('div#placeOrderButton').simulate('click');
    expect(redirectTo).to.have.property('callCount', 1);
  });

  it('Should show error page is error is passed in props without cartData and address data', () => {
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent error={{}} />
      </CheckoutProvider>
    );
    expect(wrapper.find('ErrorPage')).to.have.lengthOf(1);
  });

  it('Should show add address form if no address was added', () => {
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent addressData={[]} cartData={cartMockData} />
      </CheckoutProvider>
    );
    expect(wrapper.find('AddressForm')).to.have.lengthOf(1);
  });

  it('should show loader when data is still being fetched', () => {
    const wrapper = mount(
      <CheckoutProvider>
        <AddressComponent />
      </CheckoutProvider>
    );
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });
});
