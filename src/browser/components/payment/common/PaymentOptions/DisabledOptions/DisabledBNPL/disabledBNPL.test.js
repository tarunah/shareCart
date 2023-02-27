import React from 'react';
import { mount } from 'enzyme';
import DisabledBNPL from './';
import sinon from 'sinon';

describe('Disabled BNPL option', () => {
  it('should render bnpl no active account block', () => {
    const wrapper = mount(
      <DisabledBNPL instrumentData={{ providerCode: 20002 }} />
    );

    expect(wrapper.find('.notAvailable').text()).toEqual(
      'Not available on this order'
    );
    expect(wrapper.find('.why').text()).toEqual('Why?');

    wrapper.find('.why').simulate('click');

    expect(wrapper.find('.header').text()).toEqual(
      'Flipkart Pay Later not available'
    );
    expect(wrapper.find('.message').text()).toEqual(
      'Your Flipkart Pay Later account has been deactivated, please check your Pay Later account status with Flipkart. You may use another payment method for this transaction.'
    );
    expect(wrapper.find('.okay').text()).toEqual('OKAY');
  });

  it('should render bnpl user not eligible block', () => {
    const wrapper = mount(
      <DisabledBNPL instrumentData={{ providerCode: 20003 }} />
    );

    expect(wrapper.find('.notAvailable').text()).toEqual(
      'Not available on this order'
    );
    expect(wrapper.find('.why').text()).toEqual('Why?');

    wrapper.find('.why').simulate('click');

    expect(wrapper.find('.header').text()).toEqual(
      'Flipkart Pay Later not available'
    );
    expect(wrapper.find('.message').text()).toEqual(
      'Your order can not be paid with Flipkart Pay Later as you may not have sufficient Pay Later balance,  your Pay Later bill may be overdue or your Flipkart account may have been blocked. Please use another payment method.'
    );
    expect(wrapper.find('.okay').text()).toEqual('OKAY');
  });

  it('should close the modal on click of okay', () => {
    const wrapper = mount(
      <DisabledBNPL instrumentData={{ providerCode: 20003 }} />
    );

    wrapper.find('.why').simulate('click');

    const cancelCallback = sinon.spy();
    const newWrapper = wrapper.find('Modal').renderProp('children')(
      cancelCallback
    );

    newWrapper.find('.okay').simulate('click');

    expect(cancelCallback).toHaveProperty('callCount', 1);
  });
});
