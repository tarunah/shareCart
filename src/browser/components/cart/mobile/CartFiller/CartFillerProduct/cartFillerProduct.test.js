import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

// Component Imports.
import CartFillerProduct from './index';
import ProductQuickView from '../ProductQuickView';
import { ItemImage } from '../../../common/ItemComponents';

import { cartFillerProducts } from 'testUtils/cartMockData';
const cartFillerProduct = cartFillerProducts[0];

describe('<CartFillerProduct />: Mobile', () => {
  window.triggerEvent = () => {};
  const addToCartMock = () => {};
  const toggleSizeSelectorMock = () => {};
  const handleSizeSelectorMock = jest.fn();
  it('should have initial state :=> sizeSelector: false, productQuickView: false, oneSizeProduct: false', () => {
    const wrapper = mount(<CartFillerProduct product={cartFillerProduct} />);

    expect(wrapper.state().sizeSelector).toEqual(false);
    expect(wrapper.state().productQuickView).toEqual(false);
    // Can be different based on teh product.
    expect(wrapper.state().oneSizeProductSkuId).toEqual(false);
  });

  it('should render the product', () => {
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProduct}
        addToCart={addToCartMock}
      />
    );

    // Image Component.
    expect(wrapper.find('.thumbnail').length).not.toBe(0);

    // Text Fields.
    const infoComponent = wrapper.find('.info');
    expect(infoComponent.find('.brandName').text().length).not.toBe(0);
    expect(infoComponent.find('.productDescription').length).not.toBe(0);
    expect(infoComponent.find('.button').length).not.toBe(0);

    // React Components.
    expect(wrapper.find(ItemImage).length).toBe(1);
    expect(wrapper.find('RuppeBold').length).toBe(1);
  });

  it('should open ProductQuickView & SizeSelector', () => {
    const wrapper = shallow(
      <Router>
        <CartFillerProduct
          product={cartFillerProduct}
          addToCart={addToCartMock}
        />
      </Router>
    )
      .find(CartFillerProduct)
      .dive();

    // Initial state
    expect(wrapper.find('CartFillerSizeDialog').props().show).toBe(false);
    expect(wrapper.find(ProductQuickView).length).toBe(0);
    expect(wrapper.state().oneSizeProductSkuId).toBe(false);

    // Case 1: Only SizeSelector
    wrapper.find('.info .button').simulate('click');
    expect(wrapper.state().sizeSelector).toBe(true);
    expect(wrapper.find('CartFillerSizeDialog').props().show).toBe(true);
    expect(wrapper.find(ProductQuickView).length).toBe(0);

    // --- Reverting to Old state
    wrapper.setState({
      sizeSelector: false,
      productQuickView: false
    });

    // Both, SizeSelector and ProductQuickView.
    wrapper.find('.info .button').simulate('click');
    wrapper.find('.thumbnail').simulate('click');
    expect(wrapper.state().sizeSelector).toBe(true);
    expect(wrapper.state().productQuickView).toBe(true);
    expect(wrapper.find('CartFillerSizeDialog').props().show).toBe(true);
    expect(wrapper.find(ProductQuickView).length).toBe(1);
  });

  it('should open the ProductQuickView', () => {
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProduct}
        addToCart={addToCartMock}
      />
    );

    // Initial state
    expect(wrapper.find('EditModal').length).toBe(0);
    expect(wrapper.find(ProductQuickView).length).toBe(0);

    /**
     * i. Only thumbnail click.
     * ii. Info click.
     */
    wrapper.find('.thumbnail').simulate('click');
    expect(wrapper.state().productQuickView).toBe(true);
    expect(wrapper.find('EditModal').length).toBe(0);
    expect(wrapper.find(ProductQuickView).length).toBe(1);

    wrapper.setState({
      sizeSelector: false,
      productQuickView: false
    });

    wrapper.find('.clickableInfo').simulate('click');
    expect(wrapper.state().productQuickView).toBe(true);
    expect(wrapper.find('EditModal').length).toBe(0);
    expect(wrapper.find(ProductQuickView).length).toBe(1);
  });

  it('should open not the ProductQuickView', () => {
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProduct}
        addToCart={addToCartMock}
        isDisablePopup
      />
    );

    // Initial state
    expect(wrapper.find(ProductQuickView).length).toBe(0);

    /**
     * i. Only thumbnail click.
     * ii. Info click.
     */
    wrapper.find('.thumbnail').simulate('click');
    expect(wrapper.state().productQuickView).toBe(false);
    expect(wrapper.find(ProductQuickView).length).toBe(0);

    wrapper.setState({
      sizeSelector: false,
      productQuickView: false
    });

    wrapper.find('.clickableInfo').simulate('click');
    expect(wrapper.state().productQuickView).toBe(false);
    expect(wrapper.find(ProductQuickView).length).toBe(0);
  });

  it('should not open size selctor and process add to cart action, Onesize products', () => {
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProducts[1]}
        addToCart={addToCartMock}
      />
    );

    // Initial State.
    expect(wrapper.find('EditModal').length).toBe(0);
    expect(wrapper.find(ProductQuickView).length).toBe(0);
    expect(wrapper.state().oneSizeProductSkuId).toBe(
      cartFillerProducts[1].inventoryInfo[0].skuId
    );

    wrapper.find('.info .button').simulate('click');
    expect(wrapper.state().sizeSelector).toBe(false);
  });

  it('should call not open size selector and call handleSizeSelector, multiple sizes product', () => {
    const wrapper = mount(
      <CartFillerProduct
        product={cartFillerProducts[0]}
        addToCart={addToCartMock}
        handleSizeSelector={handleSizeSelectorMock}
      />
    );

    // Initial State.
    expect(wrapper.find(ProductQuickView).length).toBe(0);

    wrapper.find('.info .button').simulate('click');
    expect(wrapper.state().sizeSelector).toBe(false);
    expect(handleSizeSelectorMock).toHaveBeenCalledTimes(1);
  });
});
