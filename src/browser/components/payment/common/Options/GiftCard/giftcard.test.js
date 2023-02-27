import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import GiftCard from './';

describe('GiftCard option', () => {
  window.SHELL = {
    alert: () => {}
  };
  window.triggerEvent = () => {};
  it('displays the giftcard option UI: Desktop', () => {
    const wrapper = mount(
      <GiftCard
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={() => {}}
        refreshPageData={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.title').text()).toEqual('Have a Gift Card?');
    expect(wrapper.find('.apply').text()).toEqual('APPLY GIFT CARD');
    expect(wrapper.find('GiftWrap.giftIcon').length).toBe(1);
    wrapper.find('.apply').simulate('click');
    expect(wrapper.state().showModal).toBe(true);
  });

  it('displays the giftcard option UI: Mobile', () => {
    const wrapper = mount(
      <GiftCard
        mode="mobile"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={() => {}}
        refreshPageData={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.title').text()).toEqual('Have a Gift Card?');
    expect(wrapper.find('.apply').text()).toEqual('APPLY');
    expect(wrapper.find('GiftWrap.giftIcon').length).toBe(1);
    wrapper.find('.apply').simulate('click');
    expect(wrapper.state().showModal).toBe(true);
  });
});
