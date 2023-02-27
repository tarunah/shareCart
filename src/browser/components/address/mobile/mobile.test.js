import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { waitFor, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddressComponentWithContext from '.';
import AddressComponent from './AddressComponent';
import { cartMockData } from 'testUtils/cartMockData';
import addressData from 'testUtils/addressMockData';
import GrowthHackConfigManager from 'commonUtils/GrowthHackConfigManager';
import CartManager from 'commonBrowserUtils/CartManager';
import Loader from 'commonComp/Loader';
import PriceBlock from 'commonComp/PriceBlock';
import { CheckoutProvider } from '@context/CheckoutContext';

describe('cta ab', () => {
  let history = { goBack: sinon.spy() };
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {
        isApp: true
      }
    };
    window.history = {
      back: sinon.spy()
    };
    window.SHELL = {
      setActivePage: () => {}
    };
    history = { goBack: sinon.spy() };
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should show "CONTINUE" when AB is disabled', () => {
    window._checkout_.__myx_ab__['cart.cta'] = 'disabled';
    const wrapper = shallow(
      <AddressComponent
        cartData={cartMockData}
        addressData={addressData}
        selectedAddressId={addressData[0].id}
        loading={false}
      />
    );
    expect(wrapper.find('StickyButton')).toHaveLength(1);
    expect(wrapper.find('StickyButton').prop('text')).toEqual('CONTINUE');
  });

  it('should show "SELECT PAYMENT" when AB is enabled', () => {
    window._checkout_.__myx_ab__['cart.cta'] = 'enabled';
    sinon.stub(GrowthHackConfigManager, 'getGrowthHackConfigValue').returns({
      cartCTAText: 'SELECT ADDRESS',
      addressCTAText: 'SELECT PAYMENT'
    });

    const wrapper = shallow(
      <AddressComponent
        cartData={cartMockData}
        addressData={addressData}
        selectedAddressId={addressData[0].id}
        loading={false}
      />
    );
    expect(wrapper.find('StickyButton')).toHaveLength(1);
    expect(wrapper.find('StickyButton').prop('text')).toEqual('SELECT PAYMENT');
  });
});

describe('insider rewards checks', () => {
  let mockData;
  let history = { goBack: sinon.spy() };
  beforeEach(() => {
    CartManager.getPointsForItems = (products, successCallback) => {
      successCallback({
        enrolmentStatus: 'ENROLLED',
        totalPoints: 10
      });
    };

    window._checkout_ = {
      __myx_features__: { 'checkout.insiderPoints.enable': true },
      __myx_deviceData__: {
        isApp: true
      },
      __myx_profile__: { uidx: 'abcd' }
    };
    window.history = {
      back: sinon.spy()
    };
    window.SHELL = {
      setActivePage: () => {}
    };
    window.triggerEvent = jest.fn();
    document.cookie = 'ilgim=true';
    history = { goBack: sinon.spy(), push: sinon.spy() };
  });

  it('should show insider points if is app and user is logged in', async () => {
    const address = render(
      <MemoryRouter>
        <CheckoutProvider>
          <AddressComponentWithContext
            cartData={cartMockData}
            addressData={addressData}
            selectedAddressId={addressData[0].id}
            loading={false}
          />
        </CheckoutProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('insiderrewards')).toBeTruthy()
    );
  });

  it('should not show insider points if user is not logged in', async () => {
    document.cookie = 'ilgim=false';
    const address = render(
      <MemoryRouter>
        <CheckoutProvider>
          <AddressComponentWithContext
            cartData={cartMockData}
            addressData={addressData}
            selectedAddressId={addressData[0].id}
            loading={false}
          />
        </CheckoutProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if not app', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_deviceData__: {
        isApp: false
      }
    };

    const address = render(
      <MemoryRouter>
        <CheckoutProvider>
          <AddressComponentWithContext
            cartData={cartMockData}
            addressData={addressData}
            selectedAddressId={addressData[0].id}
            loading={false}
          />
        </CheckoutProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if feature gate is not enabled', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_features__: { 'checkout.insiderPoints.enable': false }
    };

    const address = render(
      <MemoryRouter>
        <CheckoutProvider>
          <AddressComponentWithContext
            cartData={cartMockData}
            addressData={addressData}
            selectedAddressId={addressData[0].id}
            loading={false}
          />
        </CheckoutProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if it is gift card context', async () => {
    window.history.pushState(
      {},
      'mock giftcard context',
      '/payment?cartContext=egiftcard'
    );

    const address = render(
      <MemoryRouter>
        <CheckoutProvider>
          <AddressComponentWithContext
            cartData={cartMockData}
            addressData={addressData}
            selectedAddressId={addressData[0].id}
            loading={false}
          />
        </CheckoutProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should show loader', () => {
    let address = mount(
      <AddressComponent
        selectedAddressId={12345}
        addressData={addressData}
        action={'back'}
        history={history}
      />
    );
    expect(address.find(Loader)).toHaveLength(1);
  });

  it('should show error component', async () => {
    const address = render(
      <MemoryRouter>
        <AddressComponent
          error={true}
          selectedAddressId={12345}
          addressData={addressData}
        />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(address.queryByTestId('errorpage')).toBeTruthy()
    );
  });
});

describe('address component', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
  });

  it('should show not show priceblock if payment invisibility is enabled', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      }
    };
    const testMockCartData = JSON.parse(JSON.stringify(cartMockData));
    testMockCartData.serviceability.serviceabilityFlags = {
      pincode: {
        value: true,
        remark: ''
      },
      standardShipping: {
        value: true,
        remark: ''
      },
      sddShipping: {
        value: false,
        remark: ''
      },
      expressShipping: {
        value: false,
        remark: ''
      },
      valueShipping: {
        value: false,
        remark: ''
      }
    };
    const wrapper = shallow(
      <AddressComponent
        cartData={testMockCartData}
        addressData={addressData}
        selectedAddressId={addressData[0].id}
        loading={false}
      />
    );
    expect(wrapper.find('PriceBlock').exists()).toBe(false);
  });
});
