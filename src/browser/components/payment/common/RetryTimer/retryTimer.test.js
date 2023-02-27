import React from 'react';
import { mount } from 'enzyme';

import RetryTimer from './';

describe('Retry Timer', () => {
  window.triggerEvent = () => {};
  it('should render Retry Timer in desktop', () => {
    const wrapper = mount(
      <RetryTimer
        mode="desktop"
        sessionEnabled={true}
        stopTimer={() => {}}
        disabled={false}
      />
    );

    expect(wrapper.find('.desktopContainer').length).toEqual(1);
    expect(wrapper.find('.retryTextBlock').length).toEqual(1);
    expect(wrapper.find('Timer').exists()).toBe(true);
    expect(wrapper.find('.retryText').text()).toEqual('Complete payment in');
    expect(wrapper.find('div.timer').length).toEqual(1);
  });

  it('should render Retry Timer in mobile', () => {
    const wrapper = mount(
      <RetryTimer
        mode="mobile"
        sessionEnabled={true}
        stopTimer={() => {}}
        disabled={false}
      />
    );

    expect(wrapper.find('.mobileContainer').length).toEqual(1);
    expect(wrapper.find('.retryTextBlock').length).toEqual(1);
    expect(wrapper.find('Timer').exists()).toBe(true);
    expect(wrapper.find('.retryText').text()).toEqual('Complete payment in');
    expect(wrapper.find('div.timer').length).toEqual(1);
  });

  it('should render Retry Timer in session disable mode', () => {
    const wrapper = mount(
      <RetryTimer
        mode="desktop"
        sessionEnabled={false}
        stopTimer={() => {}}
        disabled={false}
      />
    );

    expect(wrapper.find('.retryText').text()).toEqual('Session expired');
  });
});
