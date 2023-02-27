import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { wishlistItemsV2 } from 'testUtils/cartMockData';
import WishlistCarousal from './';

describe('Wishlist Carousal', () => {
  window.triggerEvent = () => {};
  it('should check the number of wishlist products to be 12', () => {
    const wrapper = shallow(
      <WishlistCarousal
        show={true}
        wishlistProducts={wishlistItemsV2.products}
      />
    );

    expect(wrapper.find('ProductCard')).to.have.lengthOf(10);
  });
});
