import React from 'react';
import { mount } from 'enzyme';
import Card from '.';
import CardForm from './CardForm';
import sinon from 'sinon';

import PaymentOptionError from '../PaymentOptionError';
import { props } from 'testUtils/paymentMockData';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';

const instrumentData = {
  credit: {
    type: 'creditcard',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl:
        'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
      data: null
    }
  },
  debit: {
    type: 'debitcard',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl:
        'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
      data: null
    }
  }
};

const updateBankDiscount = discount => {};

describe('[CC/DC Payment Option]', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
    PaymentManager.getPlutusEligibility = () => {};
    window.triggerEvent = () => {};
  });

  it('should render the component: Desktop & Mobile', () => {
    const testFunc = sinon.spy();
    let wrapper = mount(
      <Card
        {...props}
        instrumentData={instrumentData}
        mode="desktop"
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );

    expect(wrapper.find('.heading').text()).toEqual(' CREDIT/ DEBIT CARD ');
    expect(wrapper.find(CardForm).length).toBe(1);

    wrapper = mount(
      <Card
        {...props}
        instrumentData={instrumentData}
        mode="desktop"
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );
    expect(wrapper.find('.heading').text()).toEqual(' CREDIT/ DEBIT CARD ');
    expect(wrapper.find(CardForm).length).toBe(1);
    wrapper.unmount();
    expect(testFunc.enabled).toBeFalsy();
  });

  it('should render the error comp', () => {
    const testFunc = sinon.spy();

    // "3001": "Instrument is not eligible",
    // "3018": "Payment Instrument Data is not available"
    window._checkout_ = {
      __myx_kvpairs__: {
        'payment.options.error': {
          3001: 'Instrument is not eligible'
        }
      }
    };

    const wrapper = mount(
      <Card
        {...props}
        instrumentData={{
          credit: {
            code: 3001,
            paymentInstrumentDetails: {
              paymentUrl:
                'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
            }
          }
        }}
        deviceMode="mobile"
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );

    expect(wrapper.find(PaymentOptionError).length).toBe(1);
    expect(wrapper.find(PaymentOptionError).props().code).toBe(3001);
  });

  it('[checkValue] function should work properly', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <Card
        {...props}
        instrumentData={instrumentData}
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardName',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardName.error).toEqual('Required');

    wrapper.instance().checkValue({
      target: {
        id: 'cardName',
        value:
          'cydyvcuuycvfduvhdyviuuefvducueydfuviuedfivbieduivueudgchovirfydvcifi9vgcwuoivrufyuciktbiueuivibueycubvirdyyvirivuuydjfkiueufc',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardName.error).toEqual(
      'Invalid Input, Hint: alphabets, ., '
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardNumber',
        value: '',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardNumber.error).toEqual('Required');

    wrapper.instance().checkValue({
      target: {
        id: 'cardNumber',
        value: 'ssssss',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardNumber.error).toEqual(
      'Card Number should be numbers.'
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardNumber',
        value: '12345678912345',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardNumber.error).toEqual(
      'Invalid Card. Please enter a valid card number.'
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardNumber',
        value: '5022600000000000',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardNumber.error).toEqual(
      'Invalid Card. Please enter a valid card number.'
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardName',
        value: 'PAYMENTS_MAN123',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cardName.error).toEqual(
      'Invalid Input, Hint: alphabets, ., '
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cvv',
        value: '1',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cvv.error).toEqual('Invalid cvv number');

    wrapper.instance().checkValue({
      target: {
        id: 'cvv',
        value: '1111',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cvv.error).toEqual('Invalid cvv');

    wrapper.instance().checkValue({
      target: {
        id: 'cvv',
        value: '',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.cvv.error).toEqual('Required');

    wrapper.instance().checkValue({
      target: {
        id: 'expiry',
        value: '1/21',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.expiry.error).toEqual('Invalid Expiry');

    wrapper.instance().checkValue({
      target: {
        id: 'expiry',
        value: '',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.state().form.expiry.error).toEqual('Required');
  });

  it('[onFocus] should work properly', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <Card
        {...props}
        instrumentData={instrumentData}
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );

    wrapper.instance().checkValue({
      target: {
        id: 'cardNumber',
        value: '4444333322221111'
      }
    });
    expect(wrapper.state().form.cardNumber.error).toEqual('');
  });

  it('[validateForm should work properly', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <Card
        {...props}
        instrumentData={instrumentData}
        handlePaymentAction={() => {}}
        updateStickyButton={testFunc}
        updateBankDiscount={updateBankDiscount}
      />
    );

    // Initial State.
    expect(wrapper.instance().validateForm()).toBeFalsy;

    // Invalid Inputs.
    wrapper.instance().checkValue({
      target: {
        id: 'cardName',
        value: 'PAYMENTS_MAN123',
        getAttribute() {
          return;
        }
      }
    });
    expect(wrapper.instance().validateForm()).toBeFalsy;

    // valid Input.
    wrapper.instance().setValue({
      target: { id: 'cardNumber', value: '12345678912345' }
    });
    wrapper.instance().setValue({
      target: { id: 'cardName', value: 'PAYMENTS_MAN' }
    });
    wrapper.instance().setValue({
      target: { id: 'cvv', value: '123' }
    });
    expect(wrapper.instance().validateForm()).toBeTruthy;

    //AMEX card
    wrapper.instance().setValue({
      target: { id: 'cardNumber', value: '371111111111114' }
    });
    wrapper.instance().setValue({
      target: { id: 'cardName', value: 'PAYMENTS_MAN_1' }
    });
    wrapper.instance().setValue({
      target: { id: 'cvv', value: '1234' }
    });
    wrapper.instance().setValue({
      target: { cardType: 'AMEX' }
    });
    expect(wrapper.instance().validateForm()).toBeTruthy;
  });
});
