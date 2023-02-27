import React from 'react';
import { mount } from 'enzyme';

import RetrySessionExpiryModal from './';

describe('RetrySessionExpiryModal', () => {
  it('should render RetrySessionExpiryModal in desktop', () => {
    const wrapper = mount(
      <RetrySessionExpiryModal mode="desktop" show={true} />
    );

    expect(wrapper.find('div.modalContainerDesktop').length).toEqual(1);
    expect(wrapper.find('Timer').exists()).toBe(true);
    expect(wrapper.find('.modalHeader').text()).toEqual('Session Expired');
    expect(wrapper.find('.modalDesc').text()).toEqual(
      'Payment could not be completed within alloted time. You can retry and make the payment.'
    );
    expect(wrapper.find('div.retryButton').length).toEqual(1);
  });

  it('should render RetrySessionExpiryModal in mobile', () => {
    const wrapper = mount(
      <RetrySessionExpiryModal mode="mobile" show={true} />
    );

    expect(wrapper.find('div.modalContainer').length).toEqual(1);
    expect(wrapper.find('Timer').exists()).toBe(true);
    expect(wrapper.find('.modalHeader').text()).toEqual('Session Expired');
    expect(wrapper.find('.modalDesc').text()).toEqual(
      'Payment could not be completed within alloted time. You can retry and make the payment.'
    );
    expect(wrapper.find('div.retryButton').text()).toEqual('RETRY PAYMENT');
    wrapper.find('div.retryButton').simulate('click');
  });

  it('should reload on clicking RETRY PAYMENT button', () => {
    const wrapper = mount(
      <RetrySessionExpiryModal mode="mobile" show={true} />
    );
    wrapper.find('div.retryButton').simulate('click');
    expect(wrapper.find('div.modalContainer').length).toEqual(1);
    expect(wrapper.find('Timer').exists()).toBe(true);
    expect(wrapper.find('.modalHeader').text()).toEqual('Session Expired');
    expect(wrapper.find('.modalDesc').text()).toEqual(
      'Payment could not be completed within alloted time. You can retry and make the payment.'
    );
    expect(wrapper.find('div.retryButton').text()).toEqual('RETRY PAYMENT');
  });

  it('should not render RetrySessionExpiryModal', () => {
    const wrapper = mount(
      <RetrySessionExpiryModal mode="mobile" show={false} />
    );

    expect(wrapper.find('div.modalContainer').length).toEqual(0);
  });
});
