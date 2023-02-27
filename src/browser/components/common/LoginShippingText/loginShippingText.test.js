import React from 'react';
import { mount } from 'enzyme';

import LoginShippingText from './';

describe('Login Nudge for shipping tip', () => {
  it('should display the login shipping tip', () => {
    const shippingData = {
      meta: {
        minMore: 1
      }
    };
    const wrapper = mount(
      <LoginShippingText shippingData={shippingData} selectedProductCount={1} />
    );
    expect(wrapper.find('.message').text()).toContain('Login');
  });
});
