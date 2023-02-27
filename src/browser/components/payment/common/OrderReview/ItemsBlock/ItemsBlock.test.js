import React from 'react';
import { mount } from 'enzyme';
import { cartMockData } from '../../../../../../../testUtil/cartMockData';
import ItemsBlock from '.';

describe('[ItemsBlock_OrderReview]', () => {
  let cartProducts = [];
  beforeEach(() => {
    window.triggerEvent = () => {};
    cartProducts = cartMockData.products;
  });
  it('should render ItemsBlock in Order Review', () => {
    let wrapper = mount(<ItemsBlock cartProducts={cartProducts} />);
    expect(wrapper.children().length).toBe(4);
    expect(wrapper.find('.leftDesktop').length).toBe(4);
    expect(wrapper.find('.rightDesktop').length).toBe(4);
    const firstProduct = wrapper.find('.rightDesktop').first();
    expect(firstProduct.find('.brandName').text()).toBe('Nike');
    expect(firstProduct.find('.productName').text()).toBe(
      "Women's Victory Compression Sports Bra"
    );
    expect(firstProduct.find('.size').text()).toBe('Size: 32');
    expect(firstProduct.find('.quantity').text()).toBe('Qty: 1');
    const secondProduct = wrapper.find('.rightDesktop').at(1);
    expect(secondProduct.find('.brandName').text()).toBe('Nike');
    expect(secondProduct.find('.productName').text()).toBe(
      'Unisex Blue NIKE TR HYPERCHARGE ROCKER Water Bottle'
    );
    expect(secondProduct.find('.size').text()).toBe('Size: Onesize');
    expect(secondProduct.find('.quantity').text()).toBe('Qty: 1');
  });
});
