import React from 'react';
import { mount } from 'enzyme';
import BNPL from './';
import FeaturesManager from 'commonUtils/FeaturesManager';

const props = {
  paymentOptions: {
    formSubmitUrl: 'https://pps.myntra.com',
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: {
    applicable: true,
    authenticationRequired: true,
    availableCredit: 4191,
    id: 1,
    loginType: 'ACCOUNT',
    name: 'Flipkart Pay Later',
    providerCode: 20000,
    status: 'ACTIVE',
    tncAccepted: true,
    tncUrl: null,
    paymentUrl: 'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
    disable: false,
    lowSuccessRate: true
  },
  updateBankDiscount(bankDiscount) {}
};

describe('BNPL option', () => {
  window.triggerEvent = () => {};

  it('should render bnpl input number block', () => {
    props.instrumentData = {
      ...props.instrumentData,
      ...{
        authenticationRequired: true,
        loginType: 'EMAIL',
        status: 'NOT_LINKED'
      }
    };

    const wrapper = mount(<BNPL {...props} updateStickyButton={() => {}} />);
    expect(wrapper.text()).toContain(
      'Enter your mobile number registered with Flipkart'
    );
    expect(wrapper.find('.input').length).toBe(1);
    wrapper.find('.input').simulate('change', { target: { value: '9912' } });
    expect(wrapper.state().mobileValue).toBe('9912');
  });

  it('should show only lowsr message when disable is true', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    props.instrumentData.disable = true;
    const wrapper = mount(
      <BNPL
        {...props}
        updateStickyButton={() => {}}
        setLoader={(abc, callback) => {
          callback && callback();
        }}
      />
    );

    expect(wrapper.find('LowSRMessage').text()).toEqual(
      `Flipkart Pay Later is currently facing high failure rate.`
    );
    expect(wrapper.find('#form-paylater').exists()).toBe(false);
  });
});
