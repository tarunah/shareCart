import React from 'react';
import { mount, shallow } from 'enzyme';

import StickyButton from './';
import { checkoutPage } from 'commonUtils/constants';

describe('StickyButton', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {},
      __myx_features__: {}
    };
  });

  it('should display Sticky Button Component - MFU disabled', () => {
    window._checkout_.__myx_features__['mfu.enable'] = false;
    const wrapper = mount(
      <StickyButton total={1200} points={100} isStickyOnIOS={false} />
    );
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).not.toBe(0);
    expect(wrapper.find('.total').text()).toContain('1,200');
    expect(wrapper.find('.viewDetails').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').length).not.toBe(0);
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
  });

  it('should display Sticky Button Component - MFU enabled', () => {
    window._checkout_.__myx_features__['mfu.enable'] = true;
    const wrapper = mount(
      <StickyButton total={1100} points={100} isStickyOnIOS={false} />
    );

    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).not.toBe(0);
    expect(wrapper.find('.total').text()).toContain('1,100');
    expect(wrapper.find('.mfuInfo').text()).toEqual(
      'MynCash will be auto applied'
    );
    expect(
      wrapper
        .find('.priceBlock span')
        .at(2)
        .text()
    ).toEqual(' 100 MynCash');
    expect(wrapper.find('.viewDetails').length).not.toBe(0);
    expect(wrapper.find('.mfuPlaceOrderButton').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').length).toBe(0);
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
  });

  it('should display correct text', () => {
    const wrapper = shallow(<StickyButton text={'TEST_TEXT'} />);

    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).not.toBe(0);
    expect(wrapper.find('.viewDetails').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').text()).toBe('TEST_TEXT');
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
  });

  it('should display full width button if payment invisibility ab is enabled on cart and address page', () => {
    window._checkout_ = {
      __myx_ab__: {
        'checkout.nopaydetail.button': 'enabled'
      },
      __myx_deviceData__: {
        isApp: true
      }
    };
    const wrapper = shallow(
      <StickyButton text={'TEST_TEXT'} currentPage={checkoutPage.CART} />
    );

    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).toBe(0);
    expect(wrapper.find('.viewDetails').length).toBe(0);
    expect(wrapper.find('.fullWidthButton').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').text()).toBe('TEST_TEXT');
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
  });

  it('should display full width button if payment invisibility is enabled on payment page', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      }
    };
    const wrapper = shallow(
      <StickyButton text={'TEST_TEXT'} currentPage={checkoutPage.PAYMENT} />
    );

    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).not.toBe(0);
    expect(wrapper.find('.viewDetails').length).not.toBe(0);
    expect(wrapper.find('.fullWidthButton').length).toBe(0);
    expect(wrapper.find('.placeOrderButton').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').text()).toBe('TEST_TEXT');
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);

    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {},
      __myx_features__: {}
    };
  });

  it('should display strike off mrp if ab is enabled', () => {
    window._checkout_ = {
      __myx_ab__: {
        'payments.strikeoffmrp': 'enabled'
      },
      __myx_deviceData__: {
        isApp: true
      }
    };
    const wrapper = mount(
      <StickyButton
        total={1100}
        totalMRP={2200}
        currentPage={checkoutPage.PAYMENT}
      />
    );
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);
    expect(wrapper.find('.total').length).not.toBe(0);
    expect(wrapper.find('.total').text()).toContain('1,100');
    expect(wrapper.find('.strikeOff').length).not.toBe(0);
    expect(wrapper.find('.strikeOff').text()).toContain('2,200');
    expect(wrapper.find('.viewDetails').length).not.toBe(0);
    expect(wrapper.find('.placeOrderButton').length).not.toBe(0);
    expect(wrapper.find('.StickyComponent').length).not.toBe(0);

    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {},
      __myx_features__: {}
    };
  });
});
