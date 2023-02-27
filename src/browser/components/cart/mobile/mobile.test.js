import React from 'react';
import { shallow, mount } from 'enzyme';
import { waitFor, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import CartComponent from './index';
import { cartMockData, priceChangedProducts } from 'testUtils/cartMockData';
import GrowthHackConfigManager from 'commonUtils/GrowthHackConfigManager';
import CartManager from 'commonBrowserUtils/CartManager';

describe('cta AB', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {
        isApp: true
      },
      __myx_features__: {}
    };
    window.triggerEvent = () => {};
    window.location = '';
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should show "PLACE ORDER" when AB is disabled', () => {
    window._checkout_.__myx_ab__['cart.cta'] = 'disabled';
    const wrapper = mount(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    expect(wrapper.find('PlaceOrder')).toHaveLength(1);
    expect(wrapper.find('PlaceOrder').prop('placeOrderText')).toEqual(
      'PLACE ORDER'
    );
  });

  it('should show "SELECT ADDRESS" when AB is enabled', () => {
    window._checkout_.__myx_ab__['cart.cta'] = 'enabled';
    let getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        cartCTAText: 'SELECT ADDRESS',
        addressCTAText: 'SELECT PAYMENT'
      });

    const wrapper = mount(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    expect(wrapper.find('PlaceOrder')).toHaveLength(1);
    expect(wrapper.find('PlaceOrder').prop('placeOrderText')).toEqual(
      'SELECT ADDRESS'
    );
    getGrowthHackConfigValueStub.restore();
  });
});

describe('insider rewards checks', () => {
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
    document.cookie = 'ilgim=true';
    window.triggerEvent = () => {};
  });

  it('should show insider points if is app and user is logged in', async () => {
    const cart = render(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(cart.queryByTestId('insiderrewards')).toBeTruthy()
    );
  });

  it('should not show insider points if user is not logged in', async () => {
    document.cookie = 'ilgim=false';
    const cart = render(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(cart.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if not app', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_deviceData__: {
        isApp: false
      }
    };
    const cart = render(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(cart.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if feature gate is not enabled', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_features__: { 'checkout.insiderPoints.enable': false }
    };

    const cart = render(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(cart.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not have empty state block if feature gate is not enabled', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      },
      __myx_features__: { 'checkout.emptyCartFeed.enable': false }
    };
    const cart = shallow(
      <CartComponent data={cartMockData} cartModal={{ show: false }} />
    );
    expect(cart.find('EmptyStateBlock')).toHaveLength(0);
  });

  it('should have empty state block if feature gate is enabled', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      },
      __myx_features__: { 'checkout.emptyCartFeed.enable': true }
    };
    const mockData = {
      ...cartMockData,
      count: 0
    };
    const cart = shallow(
      <CartComponent data={mockData} cartModal={{ show: false }} />
    );
    expect(cart.find('EmptyStateBlock')).toHaveLength(1);
  });
});

describe('PriceDropAlert', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {
        isApp: true
      },
      __myx_features__: {}
    };
    window.triggerEvent = () => {};
  });

  it('should not display PriceDropStrip when AB is disabled', () => {
    let getGrowthHackConfigValueStub = (getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns(0));
    window._checkout_.__myx_ab__['cart.pricedrop.v2'] = 'disabled';
    const wrapper = shallow(
      <CartComponent data={cartMockData} cartModal={{ show: false }} />
    );
    expect(wrapper.find('PriceChangeContainer')).toHaveLength(0);
    getGrowthHackConfigValueStub.restore();
  });

  it('should display PriceDropStrip when AB is enabled and there is net price drop', () => {
    window._checkout_.__myx_ab__['cart.pricedrop.v2'] = 'enabled';
    let getGrowthHackConfigValueStub = (getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns(0));
    const finalCartData = Object.assign({}, cartMockData, {
      products: priceChangedProducts
    });
    const wrapper = shallow(
      <CartComponent data={finalCartData} cartModal={{ show: false }} />
    );
    expect(wrapper.find('PriceChangeContainer')).toHaveLength(1);
    getGrowthHackConfigValueStub.restore();
  });
});

describe('cart component', () => {
  it('should not display Trust and Safety Marker when AB is disabled', () => {
    window._checkout_.__myx_ab__['checkout.cartTrustNSafetyMarker'] =
      'disabled';
    const wrapper = shallow(
      <CartComponent data={cartMockData} cartModal={{ show: false }} />
    );
    expect(wrapper.find('TrustNSafetyMarker')).toHaveLength(0);
  });

  it('should not display Trust and Safety Marker when AB is enabled', () => {
    window._checkout_.__myx_ab__['checkout.cartTrustNSafetyMarker'] = 'enabled';
    const wrapper = shallow(
      <CartComponent data={cartMockData} cartModal={{ show: false }} />
    );
    expect(wrapper.find('TrustNSafetyMarker')).toHaveLength(1);
    expect(wrapper.find('TrustNSafetyMarker').prop('mode')).toEqual('mobile');
  });
});

describe('AocV2', () => {
  const userSelectedLocation = {
    pincode: '560068',
    addressInfo: {
      id: 909454308,
      unifiedId: '909454308:4',
      isDefault: true,
      checkoutAllowed: true,
      addressType: 'HOME',
      notAvailableDays: [],
      streetAddress: '1,madfsa',
      locality: 'bangalore',
      landmark: null,
      city: 'Bengaluru',
      pincode: '560068',
      state: { code: 'KA', name: 'Karnataka' },
      country: { code: 'IN', name: 'India' },
      user: {
        uidx: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
        name: 'asdfasdf',
        email: '',
        mobile: '7147781488'
      }
    },
    addressNotFound: false
  };
  window.history.pushState({}, '', '/cart');

  it('should render the aocv2 strip if ab is on', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      },
      __myx_ab__: { 'cart.addressoncartv2': 'variant2' }
    };

    render(
      <Router>
        <CartComponent
          data={cartMockData}
          cartModal={{ show: false }}
          userSelectedLocation={userSelectedLocation}
        />
      </Router>
    );

    expect(screen.getByText('Deliver to:')).toBeInTheDocument();
  });

  it('should not render the aocv2 strip if FG is off', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': false
      },
      __myx_ab__: { 'cart.addressoncartv2': 'variant2' }
    };

    render(
      <Router>
        <CartComponent
          data={cartMockData}
          cartModal={{ show: false }}
          userSelectedLocation={userSelectedLocation}
        />
      </Router>
    );

    expect(screen.queryByText('Deliver to:')).not.toBeInTheDocument();
  });

  it('should show stepper for aocv2 variant2', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': false
      },
      __myx_ab__: { 'cart.addressoncartv2': 'variant2' },
      __myx_deviceData__: { isApp: true }
    };

    render(
      <Router>
        <CartComponent
          data={cartMockData}
          cartModal={{ show: true }}
          userSelectedLocation={userSelectedLocation}
        />
      </Router>
    );

    expect(screen.getByText('Bag')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
  });

  it('should not show stepper for aocv2 variant3', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      },
      __myx_ab__: { 'cart.addressoncartv2': 'variant3' },
      __myx_deviceData__: {
        isApp: true,
        isMobile: true
      }
    };
    window.SHELL = { setActivePage: () => {} };
    render(
      <Router>
        <CartComponent
          data={cartMockData}
          cartModal={{ show: false }}
          userSelectedLocation={userSelectedLocation}
        />
      </Router>
    );

    expect(screen.queryByText('Bag')).not.toBeInTheDocument();
    expect(screen.queryByText('Address')).not.toBeInTheDocument();
    expect(screen.queryByText('Payment')).not.toBeInTheDocument();
  });

  it('should not show insider points if it is gift card context', async () => {
    window.history.pushState(
      {},
      'mock giftcard context',
      '/payment?cartContext=egiftcard'
    );

    const cart = render(
      <MemoryRouter>
        <CartComponent data={cartMockData} cartModal={{ show: false }} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(cart.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });
});
