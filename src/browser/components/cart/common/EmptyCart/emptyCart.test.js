import React from 'react';
import { shallow, mount } from 'enzyme';
import EmptyCart from './';
import sinon from 'sinon';

describe('Empty cart default', () => {
  const cartProps = {
    goToWishlist: sinon.spy(),
    isFeedEnabled: false
  };
  const wrapper = shallow(<EmptyCart {...cartProps} />);

  it('should display empty bag image and text', () => {
    expect(wrapper.find('.emptyBagImage')).toHaveLength(1);
  });

  it('should display empty bag image and text', () => {
    expect(wrapper.find('.emptyText').text()).toEqual(
      'Hey, it feels so light!'
    );
  });
});

describe('Empty Cart with ab disabled', () => {
  const cartProps = {
    goToWishlist: sinon.spy(),
    isFeedEnabled: false
  };
  const wrapper = mount(<EmptyCart {...cartProps} />);

  it("should display 'add items from wishlist' on ab disabled", () => {
    expect(wrapper.find('div.wishlistButton').text()).toEqual(
      'ADD ITEMS FROM WISHLIST'
    );
  });

  it("should click 'add items from wishlist' on ab disabled", () => {
    wrapper.find('div.wishlistButton').simulate('click');
    expect(cartProps.goToWishlist).toHaveProperty('callCount', 1);
  });
});

describe('Empty Cart with ab enabled', () => {
  const cartProps = {
    gotoHomePage: sinon.spy(),
    isFeedEnabled: true
  };
  const wrapper = mount(<EmptyCart {...cartProps} />);

  it("should display 'continue shopping'", () => {
    expect(wrapper.find('div.continueShoppingButton').text()).toEqual(
      'CONTINUE SHOPPING'
    );
  });

  it("should click 'continue shopping'", () => {
    wrapper.find('div.continueShoppingButton').simulate('click');
    expect(cartProps.gotoHomePage).toHaveProperty('callCount', 1);
  });
});
