import React from 'react';
import { mount } from 'enzyme';

import Sellers from './';

import { productListWithOffer } from 'testUtils/cartMockData';

describe('Seller page in mobile', () => {
  const product = productListWithOffer.productList1[0];
  const props = {
    location: {
      state: { productId: product.id, skuId: product.skuId }
    },
    data: { products: [product] }
  };

  it('should render products with the sellers with SelectButton', () => {
    const wrapper = mount(<Sellers {...props} />);

    const selectedProductDisplay = wrapper.find('SelectedProductDisplay');
    expect(selectedProductDisplay.find('Image').exists()).toBe(true);
    expect(selectedProductDisplay.find('.brandName').text()).toEqual(' Nike ');
    expect(selectedProductDisplay.find('.productName').text()).toEqual(
      ' Men Blue Printed AS M NK BRT SS DRY GFX T-shirt '
    );
    expect(wrapper.find('SellerInfo').length).toBe(2);
    expect(wrapper.find('SelectButton').length).toBe(2);
  });
});
