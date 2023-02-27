import React from 'react';
import { mount } from 'enzyme';

import PrivacyPolicy from './';
import { checkoutPage } from 'commonUtils/constants';

describe('Privacy Policy', () => {
  window._checkout_ = {
    __myx_ab__: {
      'checkout.privacy.policy': 'enabled'
    }
  };

  it('should render Privacy Policy on cart page', () => {
    const wrapper = mount(
      <PrivacyPolicy
        page={checkoutPage.CART}
        analytics={() => () => {}}
        total={100}
      />
    );

    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.link').length).toEqual(2);
    expect(wrapper.find('span').get(0).props.children).toEqual(
      "By continuing, you agree to Myntra's "
    );
    expect(wrapper.find('span').get(1).props.children).toEqual(' and ');
    expect(wrapper.find('a').get(0).props.href).toEqual('/termsofuse');
    expect(wrapper.find('a').get(1).props.href).toEqual('/privacypolicy');
    expect(wrapper.find('a').get(0).props.children).toEqual('Terms of Use');
    expect(wrapper.find('a').get(1).props.children).toEqual('Privacy Policy');
  });

  it('should render Privacy Policy on address page', () => {
    const wrapper = mount(
      <PrivacyPolicy
        page={checkoutPage.ADDRESS}
        analytics={() => () => {}}
        total={100}
      />
    );

    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.link').length).toEqual(2);
    expect(wrapper.find('span').get(0).props.children).toEqual(
      "By continuing, you agree to Myntra's "
    );
    expect(wrapper.find('span').get(1).props.children).toEqual(' and ');
    expect(wrapper.find('a').get(0).props.href).toEqual('/termsofuse');
    expect(wrapper.find('a').get(1).props.href).toEqual('/privacypolicy');
    expect(wrapper.find('a').get(0).props.children).toEqual('Terms of Use');
    expect(wrapper.find('a').get(1).props.children).toEqual('Privacy Policy');
  });

  it('should not render Privacy Policy on payment page', () => {
    const wrapper = mount(
      <PrivacyPolicy
        page={checkoutPage.PAYMENT}
        analytics={() => () => {}}
        total={100}
      />
    );

    expect(wrapper.find('.container').length).toEqual(0);
  });
});
