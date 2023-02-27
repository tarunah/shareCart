import React from 'react';
import { mount } from 'enzyme';
import AddToWishlist from './';

describe('Add to Wishlist', () => {
  it('should render the Add to whislist', () => {
    const wrapper = mount(<AddToWishlist />);
    expect(wrapper.find('.mainBlock').length).toBe(1);
  });

  it('Add more From Wishlist Text', () => {
    const wrapper = mount(<AddToWishlist />);
    expect(wrapper.find('.wishlistText').text()).toEqual(
      'Add More From Wishlist'
    );
  });

  it('check on the attribute for the hypertext', () => {
    const wrapper = mount(<AddToWishlist />);
    expect(wrapper.find('a').prop('href')).toEqual('/wishlist');
  });
});
