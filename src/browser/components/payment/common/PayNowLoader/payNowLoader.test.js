import React from 'react';
import { mount } from 'enzyme';
import PayNowLoader from './';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
const { INSTRUMENT_LOADING_MESSAGE } = PaymentConstants;

describe('PayNowLoader ', () => {
  beforeAll(() => {
    window._checkout_ = {
      __myx_ab__: {
        'checkout.paynowjson': 'enabled'
      }
    };
  });

  it('should display codLoader for COD order with correct components', () => {
    const wrapper = mount(<PayNowLoader paymentInstrument="cod" />);
    expect(wrapper.find('CodLoader').exists()).toBe(true);
    expect(wrapper.find('Myntra').exists()).toBe(true);

    expect(wrapper.find('Myntra').exists()).toBe(true);
    expect(wrapper.find('.loaderMessage').text()).toEqual('Placing Order');
    expect(wrapper.find('.codMessageContainer').text()).toContain(
      'Please Wait...'
    );
  });

  it('should display normal loader for other paymentInstruments in Mobile', () => {
    window._checkout_.__myx_deviceData__ = { isApp: true };
    const wrapper = mount(
      <PayNowLoader paymentInstrument="emi" deviceMode="mobile" />
    );
    expect(wrapper.find('CodLoader').exists()).toBe(false);
    expect(wrapper.find('Myntra').exists()).toBe(true);

    expect(wrapper.find('Myntra').exists()).toBe(true);
    expect(wrapper.find('.loaderMessage').text()).toEqual(
      INSTRUMENT_LOADING_MESSAGE.emi
    );
    expect(wrapper.find('.messageContainer').text()).toContain(
      'Please Wait...'
    );
    expect(wrapper.find('.caution').text()).toEqual(
      'Do not press back or close the app.'
    );
  });

  it('should display normal loader for other paymentInstruments in Desktop', () => {
    window._checkout_.__myx_deviceData__ = { isApp: false };
    const wrapper = mount(
      <PayNowLoader paymentInstrument={undefined} deviceMode="desktop" />
    );
    expect(wrapper.find('CodLoader').exists()).toBe(false);
    expect(wrapper.find('Myntra').exists()).toBe(true);

    expect(wrapper.find('Myntra').exists()).toBe(true);
    expect(wrapper.find('.loaderMessage').text()).toEqual('');
    expect(wrapper.find('.messageContainer').text()).toContain(
      'Please Wait...'
    );
    expect(wrapper.find('.caution').text()).toEqual(
      'Do not press back or close the browser.'
    );
  });
});
