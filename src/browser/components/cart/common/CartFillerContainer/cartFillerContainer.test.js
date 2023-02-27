import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

// Component Imports.
import CartFillerContainer from './index';

import { cartMockData } from 'testUtils/cartMockData';
import { cartFillerProducts } from 'testUtils/cartMockData';
const addToCartPayload = [{ id: 1518908, skuId: 12081068, quantity: 1 }];
import CartManager from 'commonBrowserUtils/CartManager';

describe('<CartFillerContainer />', () => {
  // CartManager.getCartFillerdata()

  it('render function called properly', () => {
    const renderSpy = sinon.spy();
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    CartFillerContainer.prototype.initComponentData = () => true;

    const wrapper = shallow(
      <CartFillerContainer render={renderSpy} data={cartMockData} />
    );
    expect(renderSpy).toHaveProperty('callCount', 1);
  });

  it('have state properly', () => {
    CartFillerContainer.prototype.initComponentData = () => true;
    const wrapper = mount(
      <CartFillerContainer render={() => true} data={cartMockData} />
    );
    expect(wrapper.state().data).not.toBe(null);
  });

  it('should have a particular heading', () => {
    const wrapper = mount(
      <CartFillerContainer render={() => true} data={cartMockData} />
    );
    let heading = wrapper.instance().getContainerHeading(cartMockData);
    expect(wrapper.state().heading).toBe('You may also like:');

    cartMockData.price.charges.data.push({ name: 'shipping', value: 1 });
    cartMockData.userDetails.returnAbuser.level = 'DEFAULT';
    heading = wrapper.instance().getContainerHeading(cartMockData);
    expect(heading).toBe('Get Free Shipping by adding more:');
  });

  it('re-rendering and refreshing data on cart reload', () => {
    CartFillerContainer.prototype.initComponentData = () => true;
    const renderSpy = sinon.spy();
    const wrapper = mount(
      <CartFillerContainer
        render={() => {
          renderSpy();
          return true;
        }}
        data={cartMockData}
      />
    );

    expect(renderSpy).toHaveProperty('callCount', 1);
    wrapper.setProps({ data: cartMockData });
    expect(renderSpy).toHaveProperty('callCount', 1);
  });

  it('should be able to add to CART', () => {
    CartFillerContainer.prototype.initComponentData = () => true;
    const renderSpy = sinon.spy();
    const handleCartActionSpy = sinon.spy();
    const container = (
      <CartFillerContainer
        render={() => {
          renderSpy();
          return true;
        }}
        data={cartMockData}
        handleCartAction={handleCartActionSpy}
      />
    );
    const wrapper = mount(container);

    wrapper.instance().addToCart(addToCartPayload);
    expect(handleCartActionSpy).toHaveProperty('callCount', 1);
  });
});
