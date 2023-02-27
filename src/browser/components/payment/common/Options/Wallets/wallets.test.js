import React from 'react';
import { mount } from 'enzyme';
import Wallets from './';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: {
    type: 'wallet',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl:
        'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
      data: [
        {
          id: 72,
          name: 'FreeCharge',
          bankCode: 'FreeCharge',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        },
        {
          id: 73,
          name: 'Mobikwik',
          bankCode: 'Mobikwik',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        }
      ]
    }
  },
  totalPayable: '121.3978',
  updateBankDiscount(bankDiscount) {}
};

describe('Wallets payment option', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1',
        mobile: '12345'
      }
    };
  });
  window.triggerEvent = () => {};

  it('should display wallets content properly in desktop and mobile', () => {
    const wrapper = mount(<Wallets {...props} />);

    expect(wrapper.find('div.walletContainer').length).toBe(1);
    expect(wrapper.find('.heading').text()).toEqual('Select wallet to pay');
    expect(wrapper.find('div.radioContainer').length).toBe(2);
    expect(wrapper.find('RadioInActive.radioIcon').length).toBe(2);
    expect(wrapper.find('.sprite-logo-freecharge').length).toBe(1);
    expect(wrapper.find('.sprite-logo-mobikwik').length).toBe(1);
    expect(wrapper.find('div.radioContainer#wallet-72').text()).toEqual(
      'FreeCharge'
    );
    expect(wrapper.find('div.radioContainer#wallet-73').text()).toEqual(
      'Mobikwik'
    );
  });

  describe('Paynow Ajax ', () => {
    beforeEach(() => {
      window._checkout_ = {
        __myx_profile__: {
          uidx: 'testUser1',
          mobile: '12345'
        }
      };
    });

    it('should submit the wallet pay now  with right data - Desktop', () => {
      const wrapper = mount(<Wallets {...props} />);
      const payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();

      expect(payNowObject['csrf']).toEqual('testToken');
      expect(payNowObject['cartContext']).toEqual('default');
      expect(payNowObject['cartId']).toEqual('testCartId1');
      expect(payNowObject['clientContext']).toEqual('responsive');
      expect(payNowObject['paymentMethods']).toEqual('netbanking');
      expect(payNowObject['profile']).toEqual('localhost');

      expect(payNowObject['xMetaApp']).toEqual('deviceID=');

      // mode attributes
      expect(payNowObject['walletEnabled']).toEqual('true');

      expect(payNowObject['walletAmount']).toEqual(121.4);
      expect(payNowObject['paymentProviderId']).toEqual('');

      //Option UI
      expect(wrapper.find('div.walletContainer').length).toBe(1);
      expect(wrapper.find('.mobileContainer').length).toBe(0);
      expect(wrapper.find('#action-wallet').length).toBe(1);
      expect(wrapper.find('.sprite-logo-freecharge').length).toBe(1);
      expect(wrapper.find('.sprite-logo-mobikwik').length).toBe(1);
    });

    it('should submit the wallet pay now form with right attributes - Mobile', () => {
      const wrapper = mount(<Wallets {...props} deviceMode="mobile" />);
      const payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();

      expect(payNowObject['csrf']).toEqual('testToken');
      expect(payNowObject['cartContext']).toEqual('default');
      expect(payNowObject['cartId']).toEqual('testCartId1');
      expect(payNowObject['clientContext']).toEqual('responsive');
      expect(payNowObject['paymentMethods']).toEqual('netbanking');
      expect(payNowObject['profile']).toEqual('localhost');

      expect(payNowObject['xMetaApp']).toEqual('deviceID=');

      // mode attributes
      expect(payNowObject['walletEnabled']).toEqual('true');
      expect(payNowObject['paymentProviderId']).toEqual('');

      expect(payNowObject['walletAmount']).toEqual(121.4);

      //Option UI
      expect(wrapper.find('.walletContainer').length).toBe(1);
      expect(wrapper.find('.mobileContainer').length).toBe(1);
      expect(wrapper.find('#action-wallet').length).toBe(1);
      expect(wrapper.find('.sprite-logo-freecharge').length).toBe(1);
      expect(wrapper.find('.sprite-logo-mobikwik').length).toBe(1);
    });

    it('should submit the wallet pay now with right attributes - Select Wallet', () => {
      const wrapper = mount(<Wallets {...props} deviceMode="mobile" />);
      let payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();

      expect(payNowObject['paymentProviderId']).toEqual('');

      wrapper.find('.sprite-logo-freecharge').simulate('click');
      payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();

      expect(payNowObject['paymentProviderId']).toEqual('72');
      wrapper.instance().submitCallback();
    });
  });

  it('should show lowSR messageV2 when its selected, lowSuccessRate is true, disable is false', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    const wrapper = mount(<Wallets {...props} deviceMode="mobile" />);
    expect(wrapper.find('LowSRMessage .lowSRMessage').exists()).toBeFalsy();
    wrapper.find('.sprite-logo-freecharge').simulate('click');
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `FreeCharge is currently facing low success rate.`
    );

    //enabled
    expect(wrapper.find("[className~='disabledDisplayName']").length).toEqual(
      0
    );
  });

  it('should show lowSR messageV2 even when its not selected when disable,lowSuccessRate is true', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    props.instrumentData.paymentInstrumentDetails.data[0].disable = true;
    const wrapper = mount(<Wallets {...props} deviceMode="mobile" />);

    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `FreeCharge is currently facing high failure rate.`
    );

    //disabled
    expect(wrapper.find("[className~='disabledName']").length).toEqual(1);
  });
});
