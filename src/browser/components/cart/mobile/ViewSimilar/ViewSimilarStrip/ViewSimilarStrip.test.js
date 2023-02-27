import React from 'react';
import { mount } from 'enzyme';
import Modal from 'commonComp/Modal';
import ViewSimilarStrip from '../ViewSimilarStrip';
import CartFiller from '../../CartFiller';
import { cartSimilarProducts } from 'testUtils/cartMockData';
import SizePicker from '../SizePicker';

describe('<ViewSimilarStrip />', () => {
  const styleId = cartSimilarProducts.related[0].product.id;
  it('should render components', () => {
    window.triggerEvent = () => {};
    const wrapper = mount(
      <ViewSimilarStrip handleCartAction={() => {}} styleId={styleId} />
    );
    expect(wrapper.find('div.viewSimilarStrip').length).toBe(1);
  });
});
