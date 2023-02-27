import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

// Component Imports.
import CartFillerProduct from './index';
import { ItemImage } from '../../../common/ItemComponents';

import { cartFillerProducts } from 'testUtils/cartMockData';
const cartFillerProduct = cartFillerProducts[0];
const oneSizeCartFillerProduct = cartFillerProducts[1];

describe('<CartFillerProduct />: Desktop', () => {
  it("should have initial state :=> sizeSelector: false, selectedSize: ' ' ", () => {
    const wrapper = mount(<CartFillerProduct product={cartFillerProduct} />);

    expect(wrapper.state().sizeSelector).toEqual(false);
  });

  it('should render the product', () => {
    const wrapper = mount(<CartFillerProduct product={cartFillerProduct} />);

    // Image Component.
    expect(wrapper.find(ItemImage).length).not.toBe(0);

    // Text Fields.
    const infoComponent = wrapper.find('.info');
    expect(infoComponent.find('.brandName').text().length).not.toBe(0);
    expect(infoComponent.find('.productDescription').length).not.toBe(0);
    expect(infoComponent.find('.button').length).not.toBe(0);
  });

  it('should be able to select size and thus add to cart', () => {
    const mockAddToCart = sinon.spy();
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProduct}
        addToCart={mockAddToCart}
      />
    );
    const imageWrapper = wrapper.find('.imageWrapper');

    // Size Calculations.
    const sizes = imageWrapper.find('.sizeSelector .sizeWrapper .size');
    sizes.first().simulate('click');
    expect(mockAddToCart).toHaveProperty('callCount', 1);
  });

  it('should open size selector', () => {
    const wrapper = mount(<CartFillerProduct product={cartFillerProduct} />);
    const infoComponent = wrapper.find('.info');

    const buttons = infoComponent.find('.button');
    buttons.first().simulate('click');
    expect(wrapper.state().sizeSelector).toBeTruthy;
  });

  it('should directly add to cart for Onesize products', () => {
    const mockAddToCart = sinon.spy();
    const wrapper = mount(
      <CartFillerProduct
        product={oneSizeCartFillerProduct}
        addToCart={mockAddToCart}
      />
    );

    const infoComponent = wrapper.find('.info');
    const buttons = infoComponent.find('.button');
    buttons.first().simulate('click');
    expect(mockAddToCart).toHaveProperty('callCount', 1);
  });
});
