import React from 'react';
import { mount } from 'enzyme';
import EMI from './';
import FeaturesManager from 'commonUtils/FeaturesManager';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: {
    type: 'emi',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl:
        'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
      data: [
        {
          id: 71,
          name: 'EMI',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        },
        {
          id: 72,
          name: 'ZestMoney',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        },
        {
          id: 73,
          name: 'InstaCred',
          defaultBank: false,
          popular: false,
          lowSuccessRate: true
        }
      ]
    }
  },
  updateBankDiscount(bankDiscount) {}
};

describe('EMI payment option', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
  });

  it('should display EMI content properly', () => {
    window.triggerEvent = () => {};
    const wrapper = mount(<EMI {...props} />);
    expect(wrapper.find('.emiContainer').length).toBe(1);
    expect(wrapper.find('.heading').text()).toEqual('Select EMI Option');
    expect(wrapper.find('div[className~="rowContainer"]').length).toBe(3);
    expect(wrapper.find('RadioInActive.radioIcon').length).toBe(3);
    expect(wrapper.find('.sprite-wallet-emi').length).toBe(1);
    expect(wrapper.find('.sprite-wallet-zestmoney').length).toBe(1);
    expect(wrapper.find('.sprite-wallet-instacred').length).toBe(1);
    expect(wrapper.find('div.radioContainer#emi-71').text()).toEqual('EMI');
    expect(wrapper.find('div.radioContainer#emi-72').text()).toEqual(
      'ZestMoney'
    );
    expect(wrapper.find('div.radioContainer#emi-73').text()).toEqual(
      'InstaCred'
    );
    expect(wrapper.instance().getEMIDetails('72').name).toEqual('ZestMoney');
    expect(wrapper.instance().getValidity().message).toEqual(
      'Select a payment option to place order.'
    );
  });

  it('should submit the emi pay now with right data', () => {
    const wrapper = mount(<EMI {...props} />);
    const payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayNowBaseData();

    expect(payNowObject['csrf']).toEqual('testToken');
    expect(payNowObject['cartContext']).toEqual('default');
    expect(payNowObject['cartId']).toEqual('testCartId1');
    expect(payNowObject['clientContext']).toEqual('responsive');
    expect(payNowObject['paymentMethods']).toEqual('netbanking');

    expect(payNowObject['xMetaApp']).toEqual('deviceID=');
  });

  it('should submit the form with right attributes - Select EMI', () => {
    const wrapper = mount(<EMI {...props} />);
    const payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();

    expect(payNowObject['paymentProviderId']).toEqual('');

    wrapper.find('div#emi-71').simulate('click');
    const updatedPayNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();

    expect(updatedPayNowObject['paymentProviderId']).toEqual('71');
  });

  it('should show lowSR message when lowSuccessRate is true, disable is false and selected it true', () => {
    window.triggerEvent = () => {};
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };

    const wrapper = mount(<EMI {...props} />);
    wrapper.setState({ selectedEMIId: '72' });
    expect(
      wrapper
        .find('PaymentSubOption#emi-71 LowSRMessage .lowSRMessage')
        .exists()
    ).toEqual(false);
    expect(
      wrapper
        .find('PaymentSubOption#emi-73 LowSRMessage .lowSRMessage')
        .exists()
    ).toEqual(false);

    expect(
      wrapper.find('PaymentSubOption#emi-72 LowSRMessage .lowSRMessage').text()
    ).toEqual(`ZestMoney is currently facing low success rate.`);
  });

  it('should show lowSR message, disable the instrument when disable is true irrespective of selected', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    props.instrumentData.paymentInstrumentDetails.data[0].disable = true;
    props.instrumentData.paymentInstrumentDetails.data[2].disable = true;

    const wrapper = mount(<EMI {...props} />);

    expect(
      wrapper.find('PaymentSubOption#emi-71 LowSRMessage .lowSRMessage').text()
    ).toEqual(`EMI is currently facing high failure rate.`);
    expect(wrapper.find('PaymentSubOption#emi-71').props().disabled).toEqual(
      true
    );

    expect(
      wrapper.find('PaymentSubOption#emi-73 LowSRMessage .lowSRMessage').text()
    ).toEqual(`InstaCred is currently facing high failure rate.`);
    expect(wrapper.find('PaymentSubOption#emi-73').props().disabled).toEqual(
      true
    );

    //before selecting
    expect(
      wrapper
        .find('PaymentSubOption#emi-72 LowSRMessage .lowSRMessage')
        .exists()
    ).toBe(false);
    expect(wrapper.find('PaymentSubOption#emi-72').props().disabled).toEqual(
      false
    );

    wrapper.setState({ selectedEMIId: '72' });

    //after selecting
    expect(
      wrapper.find('PaymentSubOption#emi-72 LowSRMessage .lowSRMessage').text()
    ).toBe(`ZestMoney is currently facing low success rate.`);
    expect(wrapper.find('PaymentSubOption#emi-72').props().disabled).toEqual(
      false
    );
  });
});
