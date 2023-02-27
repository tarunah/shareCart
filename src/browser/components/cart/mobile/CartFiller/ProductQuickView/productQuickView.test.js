import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

// React Component.
import ProductQuickView from './index';
import { ItemImage } from '../../../common/ItemComponents';
import { CartFillerSizeDialog } from '../../Dialogs';
import { cartFillerProducts } from 'testUtils/cartMockData';
import Sinon from 'sinon';

const cartFillerProduct = cartFillerProducts[0];
const oneSizeCartFillerProduct = cartFillerProducts[1];

describe('<ProductQuickView /> mobile', () => {
  const addSizeToCartMock = () => {};

  it('should have initial state :=> sizeSelector: false', () => {
    const mockTriggerEvent = sinon.spy();
    window.triggerEvent = mockTriggerEvent;
    const wrapper = mount(<ProductQuickView product={cartFillerProduct} />);

    expect(wrapper.state().sizeSelector).toBe(false);
  });

  it('should render the product', () => {
    const wrapper = mount(<ProductQuickView product={cartFillerProduct} />);

    expect(wrapper.find('.shimmer').length).toBe(1);
    expect(wrapper.find('.productView').length).toBe(1);

    const productView = wrapper.find('.productView');
    expect(
      productView.find('.imageComponent .thumbnail').length
    ).toBeGreaterThan(0);
    expect(productView.find(ItemImage).length).toBeGreaterThan(1);

    // Text Fields.
    const infoComponent = productView.find('.info');
    expect(infoComponent.find('.brandName').text().length).not.toBe(0);
    expect(infoComponent.find('.productDescription').length).not.toBe(0);
    expect(infoComponent.find('.button').length).toBe(1);
  });

  it('should close itself', () => {
    const mockFunc = () => true;
    const wrapper = mount(
      <ProductQuickView
        product={cartFillerProduct}
        toggleProductQuickView={mockFunc}
      />
    );

    // Click is a mock function, nothing changes in the UI.
    wrapper.find('.shimmer').simulate('click');
  });

  it('should open SizeSelector, Not Onesize products', () => {
    const wrapper = shallow(
      <Router>
        <ProductQuickView
          product={cartFillerProduct}
          addSizeToCart={addSizeToCartMock}
        />
      </Router>
    )
      .find(ProductQuickView)
      .dive();

    expect(wrapper.state().sizeSelector).toBe(false);
    wrapper.find('.productView .button').simulate('click');
    expect(wrapper.state().sizeSelector).toBe(true);
    expect(wrapper.find(CartFillerSizeDialog).props().show).toBe(true);
  });

  it('should not open size selctor and process add to cart action, Onesize products', () => {
    const addSizeToCartSpy = Sinon.spy();
    const wrapper = shallow(
      <Router>
        <ProductQuickView
          product={oneSizeCartFillerProduct}
          oneSizeProductSkuId="10039571"
          addSizeToCart={addSizeToCartSpy}
        />
      </Router>
    )
      .find(ProductQuickView)
      .dive();

    // Mock function will be called.
    wrapper.find('.productView .button').simulate('click');
    expect(wrapper.find(CartFillerSizeDialog).props().show).toBe(false);
    expect(addSizeToCartSpy.calledOnce).toBe(true);
  });
});
