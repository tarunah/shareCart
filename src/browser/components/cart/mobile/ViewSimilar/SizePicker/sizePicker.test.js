import React from 'react';
import { mount } from 'enzyme';
import Modal from 'commonComp/Modal';
import ViewSimilarStrip from '../ViewSimilarStrip';
import CartFiller from '../../CartFiller';
import { cartSimilarProducts } from 'testUtils/cartMockData';
import SizePicker from '../SizePicker';

describe('<SizePicker />', () => {
  const sizes = cartSimilarProducts.related[0].products[3].sizes;
  const addSizeToCart = jest.fn();
  it('should render', () => {
    const wrapper = mount(
      <SizePicker sizes={sizes} addSizeToCart={addSizeToCart} />
    );
    expect(wrapper.find('div.selectSizeHeading').text()).toContain(
      'Select Size:'
    );
  });

  it('should call addSizeToCart when any size is clicked', () => {
    const wrapper = mount(
      <SizePicker sizes={sizes} addSizeToCart={addSizeToCart} />
    );
    const selector = '#sizePicker' + sizes[0].skuId;

    wrapper.find(selector).simulate('click');
    expect(addSizeToCart).toHaveBeenCalledTimes(1);
  });
});
