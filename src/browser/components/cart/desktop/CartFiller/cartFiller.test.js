import React from 'react';
import { shallow } from 'enzyme';

// React Component Imports.
import CartFiller from './index';
import CartFillerProduct from './CartFillerProduct';

// Sample Data import.
import { cartFillerProducts } from 'testUtils/cartMockData';

describe('<CartFiller />: Destop', () => {
  it('should render some products', () => {
    const mockFunc = () => true;
    const wrapper = shallow(
      <CartFiller
        products={cartFillerProducts}
        addToCart={mockFunc}
        heading="Get Free Shipping by adding more:"
      />
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper.find(CartFillerProduct).length).not.toBe(0);
    expect(wrapper.find('.cartFillerHeading').text()).toEqual(
      ' Get Free Shipping by adding more: '
    );
  });
});
