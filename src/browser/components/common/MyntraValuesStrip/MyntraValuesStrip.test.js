import React from 'react';
import { mount } from 'enzyme';
import MyntraValuesStrip from '.';
import Image from 'commonComp/Image';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { checkoutPage } from 'commonUtils/constants';

const myntraValuesUrl = getKVPairValue('MYNTRA_VALUES_IMG');

describe('Values Strip ', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
    window.history.pushState({}, '', '/checkout/cart');
  });

  it('should display contactless as default img', () => {
    const wrapper = mount(
      <MyntraValuesStrip currentPage={checkoutPage.CART} />
    );
    expect(wrapper.find(Image).props().src).toBe(
      myntraValuesUrl.contactlessBannerUrl
    );
  });

  it('should display default payment img', () => {
    window.history.pushState({}, '', '/checkout/payment');
    window._checkout_.__myx_ab__['payment.trust'] = 'enabled';
    window._checkout_.__myx_deviceData__ = {
      isApp: true
    };

    const wrapper = mount(
      <MyntraValuesStrip currentPage={checkoutPage.PAYMENT} />
    );
    expect(wrapper.find(Image).props().src).toBe(
      myntraValuesUrl.paymentBannerUrl
    );
  });
});
