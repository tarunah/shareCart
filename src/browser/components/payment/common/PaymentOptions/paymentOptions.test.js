import React from 'react';
import { props } from 'testUtils/paymentMockData';
import { shallow, mount } from 'enzyme';

import PaymentOptions from './';

describe('Payment Options', () => {
  window._checkout_ = {
    __myx_ab__: {
      'checkout.payments.recommended': 'disabled'
    }
  };
  it('Should show the tabName from KV pair', () => {
    const tabNameConfig = {
      savedinstrument: { name: 'Saved Payment Options' },
      paylater: { name: 'Flipkart Pay Later' },
      card: { name: 'Credit/Debit Card' },
      netbanking: { name: 'Net Banking' },
      cod: { name: 'Pay on delivery (Cash/UPI)' },
      upi: { name: 'PhonePe/Google Pay/BHIM UPI' },
      wallet: { name: 'Paytm/Wallets' },
      emi: { name: 'EMI/Pay Later' },
      giftcard: { name: 'Gift Card' }
    };
    window.triggerEvent = () => {};

    const wrapper = shallow(
      <PaymentOptions
        {...props}
        analytics={() => () => {}}
        styles={{}}
        triggerWebengageEvent={() => {}}
        defaultSelect={true}
        mode="mobile"
      />
    );
    const tabs = wrapper.find('Tab');

    expect(
      tabs
        .at(0)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.savedinstrument.name);
    expect(
      tabs
        .at(1)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.paylater.name);
    expect(
      tabs
        .at(2)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.cod.name);
    expect(
      tabs
        .at(3)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.card.name);
    expect(
      tabs
        .at(4)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.upi.name);
    expect(
      tabs
        .at(5)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.wallet.name);
    expect(
      tabs
        .at(6)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.netbanking.name);
    expect(
      tabs
        .at(7)
        .renderProp('display')(true)
        .find('.tabDisplayText')
        .text()
    ).toBe(tabNameConfig.emi.name);
  });
});
