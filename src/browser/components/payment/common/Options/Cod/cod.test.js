import React from 'react';
import { mount } from 'enzyme';
import COD from './';
import CodErrorBlock from './CodErrorBlock';
import sinon from 'sinon';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  paymentMode: 'cod',
  instrumentData: {
    code: 3000,
    paymentInstrumentDetails: {
      paymentUrl: 'https://pps.myntra.com/myntra-payment-plan-service/v3/buy'
    }
  },
  twoFA: { disabled: false },
  myntraInstrumentsData: {},
  updateBankDiscount(bankDiscount) {}
};

describe('COD payment option', () => {
  beforeEach(() => {
    PaymentManager.generateCaptcha = () => {};
  });

  window.triggerEvent = () => {};
  it('should render the CodErrorBlock comp', () => {
    const testFunc = sinon.spy();

    window._checkout_ = {
      __myx_kvpairs__: {
        'payment.options.error': {
          3011: 'We do not offer Cash on delivery'
        }
      }
    };

    const wrapper = mount(
      <COD
        {...{
          ...props,
          instrumentData: {
            code: 3011,
            paymentInstrumentDetails: { paymentUrl: 'https://pps.myntra.com' }
          }
        }}
        deviceMode="mobile"
        updateStickyButton={testFunc}
      />
    );

    expect(wrapper.find(CodErrorBlock).length).toBe(1);
    expect(wrapper.find(CodErrorBlock).props().code).toBe(3011);
  });

  it('should render the PayNowAjax with correct JSON object', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <COD
        {...props}
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
      />
    );

    const payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayNowBaseData();

    expect(payNowObject['csrf']).toEqual('testToken');
    expect(payNowObject['cartContext']).toEqual('default');
    expect(payNowObject['cartId']).toEqual('testCartId1');
    expect(payNowObject['clientContext']).toEqual('responsive');
    expect(payNowObject['paymentMethods']).toEqual('cod');
    expect(payNowObject['profile']).toEqual('localhost');

    expect(payNowObject['xMetaApp']).toEqual('deviceID=');

    expect(wrapper.find('button').length).toBe(1);
    expect(testFunc).toHaveProperty('callCount', 1);
    wrapper.state.captchaEnabled = false;
    wrapper.unmount();
    expect(testFunc.enabled).toBeFalsy();
  });
});
