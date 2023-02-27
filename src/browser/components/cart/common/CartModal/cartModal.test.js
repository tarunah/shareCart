import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import CartModal from '.';
import { cartModalMock } from '../../../../../../testUtil/cartMockData';

jest.mock('commonUtils/FeaturesManager', () => ({
  ...jest.requireActual('commonUtils/helper'),
  isFeatureEnabled: () => true
}));

describe('Default Cart Modal', () => {
  const mountComponent = function(customProps = {}) {
    return mount(
      <CartModal
        analytics={() => {
          return sinon.fake();
        }}
        {...cartModalMock}
        {...customProps}
      />
    );
  };

  beforeEach(() => {
    sinon.spy(CartModal.prototype, 'getInvalidProducts');
    sinon.spy(CartModal.prototype, 'getParsedHeader');
    sinon.spy(CartModal.prototype, 'getCTAConfig');
  });

  afterEach(() => {
    CartModal.prototype.getInvalidProducts.restore();
    CartModal.prototype.getParsedHeader.restore();
    CartModal.prototype.getCTAConfig.restore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render default cart modal properly', () => {
    const cartModal = mountComponent({ nonServiceableItems: [] });

    expect(cartModal.find('.desktopModal').length).not.toBe(0);
    expect(CartModal.prototype.getInvalidProducts).toHaveProperty(
      'callCount',
      1
    );
    expect(CartModal.prototype.getParsedHeader).toHaveProperty('callCount', 1);
    expect(CartModal.prototype.getCTAConfig).toHaveProperty('callCount', 0);
  });

  it('should render detailed cart modal properly', () => {
    const cartModal = mountComponent({
      oosItems: cartModalMock.nonServiceableItems
    });

    expect(cartModal.find('.desktopModal').length).not.toBe(0);
    expect(CartModal.prototype.getInvalidProducts).toHaveProperty(
      'callCount',
      1
    );
    expect(CartModal.prototype.getParsedHeader).toHaveProperty('callCount', 1);
    expect(CartModal.prototype.getCTAConfig).toHaveProperty('callCount', 1);
  });

  it('should render unservicable cart modal properly', () => {
    const cartModal = mountComponent({
      oosItems: cartModalMock.nonServiceableItems
    });

    expect(cartModal.find('.desktopModal').length).not.toBe(0);
    expect(CartModal.prototype.getInvalidProducts).toHaveProperty(
      'callCount',
      1
    );
    expect(CartModal.prototype.getParsedHeader).toHaveProperty('callCount', 1);
    expect(CartModal.prototype.getCTAConfig).toHaveProperty('callCount', 1);
  });
});
