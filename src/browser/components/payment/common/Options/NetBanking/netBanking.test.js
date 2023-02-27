import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import NetBanking from './';
import FeaturesManager from 'commonUtils/FeaturesManager';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: {
    type: 'netbanking',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl: 'https://pps.myntra.com',
      data: [
        {
          id: 10,
          name: 'Bank of India',
          defaultBank: true,
          popular: true,
          lowSuccessRate: true
        },
        {
          id: 5,
          name: 'CitiBank',
          defaultBank: false,
          popular: true,
          lowSuccessRate: true
        },
        {
          id: 2,
          name: 'HDFC Bank',
          defaultBank: false,
          popular: true,
          lowSuccessRate: true
        },
        {
          id: 22,
          name: 'Karur Vysya Bank',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        },
        {
          id: 24,
          name: 'Lakshmi Vilas Bank',
          defaultBank: false,
          popular: false
        },
        {
          id: 25,
          name: 'Oriental Bank of Commerce',
          defaultBank: false,
          popular: false
        },
        {
          id: 49,
          name: 'Punjab & Maharashtra Cooperative Bank',
          defaultBank: false,
          popular: false
        },
        {
          id: 50,
          name: 'Punjab & Sind Bank',
          defaultBank: false,
          popular: false
        },
        {
          id: 26,
          name: 'Punjab National Bank Corporate Accounts',
          defaultBank: false,
          popular: false,
          lowSuccessRate: false
        }
      ]
    }
  },
  updateBankDiscount(bankDiscount) {}
};

describe('Net banking option', () => {
  window.triggerEvent = () => {};

  it('should return correct netbanking data', () => {
    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={() => {}} />
    );

    let payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();

    expect(wrapper.find('.heading').text()).toEqual('Net Banking');

    expect(payNowObject['csrf']).toEqual('testToken');
    expect(payNowObject['cartContext']).toEqual('default');
    expect(payNowObject['cartId']).toEqual('testCartId1');
    expect(payNowObject['clientContext']).toEqual('responsive');
    expect(payNowObject['paymentMethods']).toEqual('netbanking');
    wrapper
      .find('.radioContainer')
      .at(0)
      .simulate('click');

    payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();
    expect(payNowObject['paymentProviderId']).toEqual('10');
    expect(payNowObject['profile']).toEqual('localhost');

    expect(payNowObject['xMetaApp']).toEqual('deviceID=');
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should render popular banks', () => {
    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={() => {}} />
    );

    expect(wrapper.find('.radioContainer').length).toBe(3);
    expect(
      wrapper
        .find('.radioContainer')
        .at(0)
        .text()
    ).toContain('Bank of India');
    expect(
      wrapper
        .find('.radioContainer')
        .at(1)
        .text()
    ).toContain('CitiBank');
    expect(
      wrapper
        .find('.radioContainer')
        .at(2)
        .text()
    ).toContain('HDFC Bank');
  });

  it('should render select options', () => {
    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={() => {}} />
    );

    expect(wrapper.find('.otherBankDropDown').length).toBe(1);
    wrapper.find('.otherBankDropDown').simulate('click');
    expect(wrapper.find('.bankInfo').length).toBe(6);
    expect(
      wrapper
        .find('.bankInfo')
        .at(0)
        .text()
    ).toBe('Karur Vysya Bank');
    expect(
      wrapper
        .find('.bankInfo')
        .at(1)
        .text()
    ).toBe('Lakshmi Vilas Bank');
    expect(
      wrapper
        .find('.bankInfo')
        .at(2)
        .text()
    ).toBe('Oriental Bank of Commerce');
    expect(
      wrapper
        .find('.bankInfo')
        .at(3)
        .text()
    ).toBe('Punjab & Maharashtra Cooperative Bank');
    expect(
      wrapper
        .find('.bankInfo')
        .at(4)
        .text()
    ).toBe('Punjab & Sind Bank');
    expect(
      wrapper
        .find('.bankInfo')
        .at(5)
        .text()
    ).toBe('Punjab National Bank Corporate Accounts');
  });

  it('should set bank name on clicking bank', () => {
    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={() => {}} />
    );

    wrapper.find('.otherBankDropDown').simulate('click');
    wrapper
      .find('.radioContainer')
      .at(0)
      .simulate('click');
    expect(wrapper.state().selectedBankId).toBe('10');

    wrapper
      .find('.bankInfo')
      .at(1)
      .simulate('click');
    expect(wrapper.state().selectedBankId).toBe('24');
    wrapper.instance().submitCallback();
  });

  it('should show lowSR message when the bank is selected, the lowSuccessRate is true and paynow button is enabled', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    const updateStickyButtonSpy = sinon.spy();

    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={updateStickyButtonSpy} />
    );
    wrapper.instance().selectBank('netbanking-10');
    wrapper.update();
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `Bank of India is currently facing low success rate.`
    );
    expect(updateStickyButtonSpy.calledOnceWith({ enabled: true }));
  });

  it('should show lowSR message and disbale paynow button when the bank is selected, the lowSuccessRate is true and disables is true', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    props.instrumentData.paymentInstrumentDetails.data[0].disable = true;
    const updateStickyButtonSpy = sinon.spy();
    const wrapper = mount(
      <NetBanking {...props} updateStickyButton={updateStickyButtonSpy} />
    );

    //banks with disable is true, paynow button is disabled
    wrapper.instance().selectBank('netbanking-10');
    wrapper.update();
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `Bank of India is currently facing high failure rate.`
    );
    expect(updateStickyButtonSpy.calledOnceWith({ enabled: false }));
    wrapper.unmount();
    expect(updateStickyButtonSpy.enabled).toBeFalsy();
  });
});
