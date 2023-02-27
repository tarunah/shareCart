import React from 'react';
import { mount } from 'enzyme';
import Notifications from './';

describe('Notifications Component', () => {
  it('should not display international cards notification if context is default', () => {
    const wrapper = mount(<Notifications />);

    expect(wrapper.find('.heading').length).toBe(0);
    expect(wrapper.find('.info').length).toBe(0);
  });

  it('should display international cards notification if context is egiftcard', () => {
    window.history.pushState(
      {},
      'mock giftcard context',
      '/payment?cartContext=egiftcard'
    );

    const wrapper = mount(<Notifications />);
    expect(wrapper.find('.heading').text()).toEqual('Please Note');
    expect(wrapper.find('.info').text()).toEqual(
      'International Cards are not allowed for Giftcard/Topup purchase'
    );
  });
});
