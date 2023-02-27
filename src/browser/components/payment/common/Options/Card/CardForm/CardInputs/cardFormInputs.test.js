import React from 'react';
import { mount } from 'enzyme';

import sinon from 'sinon';

import {
  CardNumber,
  CardName,
  SaveCard,
  ExpiryMonthYear,
  ExpiryCVVInfo,
  CVV
} from '.';
import Cashback from '../../../../Cashback';
import Sprite from 'commonComp/Sprite';
import {
  props,
  cardInitialFormV2 as cardInitialForm,
  dummyCardData
} from 'testUtils/paymentMockData';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';
import { SAVE_CARD_CALLLOUT } from 'commonBrowserUtils/Strings';

/**************************************** CardNumber ********************************************/
describe('[CardNumber]', () => {
  // Defining the API call function here.
  beforeEach(() => {
    PaymentManager.getPlutusEligibility = () => {};
    window.triggerEvent = () => {};
  });

  it('should render properly', () => {
    const wrapper = mount(
      <CardNumber
        form={cardInitialForm}
        plutusInfo={{ show: false }}
        handlePaymentAction={() => {}}
        {...props}
      />
    );

    expect(wrapper.find('input#cardNumber').length).toBe(1);
    expect(wrapper.find('input#cardNumber').props().value).toBe(
      cardInitialForm.cardNumber.value
    );
    expect(wrapper.find('.label').text()).toEqual('Card Number');
    expect(wrapper.find('.errorMessage').length).toBe(0);
    expect(wrapper.find(Cashback).length).toBe(0);
    expect(wrapper.find(Sprite).props().name).toBe('cardv2-default');
  });

  it('convenience actions on the input', () => {
    const setValueMock = sinon.spy();
    const checkValueMock = sinon.spy();
    const onFocusMock = sinon.spy();
    const wrapper = mount(
      <CardNumber
        form={cardInitialForm}
        plutusInfo={{ show: false }}
        setValue={setValueMock}
        checkValue={checkValueMock}
        onFocus={onFocusMock}
        handlePaymentAction={() => {}}
        {...props}
      />
    );

    expect(wrapper.find('input#cardNumber').length).toBe(1);
    const input = wrapper.find('input#cardNumber');

    input.simulate('change', { target: { value: 'a' } });
    expect(setValueMock).toHaveProperty('callCount', 1);

    input.simulate('blur', { target: { value: 'a' } });
    expect(checkValueMock).toHaveProperty('callCount', 1);

    input.simulate('focus', { target: { value: 'a' } });
    expect(onFocusMock).toHaveProperty('callCount', 1);
  });

  it('should show the error message', () => {
    const form = { ...cardInitialForm };
    form.cardNumber.error = 'Required';
    const wrapper = mount(
      <CardNumber
        form={cardInitialForm}
        plutusInfo={{ show: false }}
        {...props}
      />
    );
    expect(wrapper.find('.errorMessage').text()).toBe('Required');
  });

  it('should show the Cashback component', () => {
    const form = { ...cardInitialForm };
    form.cardNumber = {
      value: '5345 4164 1614 1646',
      maxLength: 19,
      required: true
    };

    const wrapper = mount(
      <CardNumber
        form={form}
        plutusInfo={{ show: true, value: '5345416416141646' }}
        handlePaymentAction={() => {}}
        {...props}
      />
    );
    expect(wrapper.find(Cashback).length).toBe(1);
  });

  it('should show the correct card image', () => {
    const form = { ...cardInitialForm };
    form.cardType = 'VISA';
    const wrapper = mount(
      <CardNumber
        form={form}
        plutusInfo={{ show: false }}
        handlePaymentAction={() => {}}
        {...props}
      />
    );

    expect(wrapper.find(Sprite).length).toBe(1);
    expect(wrapper.find(Sprite).props().name).toBe('cardv2-visa');
  });
});

/**************************************** CardName ********************************************/
describe('[CardName]:', () => {
  it('should render properly', () => {
    const wrapper = mount(<CardName form={cardInitialForm} />);

    expect(wrapper.find('input#cardName').length).toBe(1);
    expect(wrapper.find('input#cardName').props().value).toBe(
      cardInitialForm.cardName.value
    );
    expect(wrapper.find('.label').text()).toEqual('Name on card');
    expect(wrapper.find('.errorMessage').length).toBe(0);
  });

  it('should show the error message', () => {
    const form = { ...cardInitialForm };
    form.cardName.error = 'Required';
    const wrapper = mount(<CardName form={form} />);
    expect(wrapper.find('.errorMessage').text()).toBe('Required');
  });

  it('convenience actions on the input', () => {
    const setValueMock = sinon.spy();
    const checkValueMock = sinon.spy();
    const onFocusMock = sinon.spy();
    const wrapper = mount(
      <CardName
        form={cardInitialForm}
        setValue={setValueMock}
        checkValue={checkValueMock}
        onFocus={onFocusMock}
      />
    );

    expect(wrapper.find('input#cardName').length).toBe(1);
    const input = wrapper.find('input#cardName');

    input.simulate('change', { target: { value: 'a' } });
    expect(setValueMock).toHaveProperty('callCount', 1);

    input.simulate('blur', { target: { value: 'a' } });
    expect(checkValueMock).toHaveProperty('callCount', 1);

    input.simulate('focus', { target: { value: 'a' } });
    expect(onFocusMock).toHaveProperty('callCount', 1);
  });
});

/**************************************** ExpiryMonthYear ********************************************/
describe('[ExpiryMonthYear]', () => {
  it('should render properly', () => {
    const setValueMock = sinon.spy();
    const checkValueMock = sinon.spy();
    const wrapper = mount(
      <ExpiryMonthYear
        form={cardInitialForm}
        setValue={setValueMock}
        checkValue={checkValueMock}
      />
    );

    expect(wrapper.find('input#expiry').length).toBe(1);
    const input = wrapper.find('input#expiry');

    input.simulate('change', { target: { value: 'a' } });
    expect(setValueMock).toHaveProperty('callCount', 1);

    input.simulate('blur', { target: { value: 'a' } });
    expect(checkValueMock).toHaveProperty('callCount', 1);
  });

  it('should show the expiry message', () => {
    const form = { ...cardInitialForm };
    form.expiry.required = false;
    form.cvv.required = false;
    const wrapper = mount(<ExpiryCVVInfo form={cardInitialForm} />);

    expect(wrapper.find('.expiryMessage').text()).toEqual(
      'Expiry and CVV not required if not mentioned on your card'
    );
  });
});

/**************************************** SaveCard ********************************************/
describe('[SaveCard]', () => {
  it('should render properly', () => {
    const wrapper = mount(<SaveCard form={dummyCardData} />);
    const validForTokenisationText =
      SAVE_CARD_CALLLOUT.validForTokenisationText;

    expect(wrapper.find('CheckboxActive').length).toBe(1);
    expect(wrapper.find('Info').length).toBe(1);
    expect(wrapper.find('#saveCard-label').text()).toEqual(
      validForTokenisationText
    );
    expect(wrapper.state().saveCardSuggestion).toBe(false);
  });

  it('should be able to click on checkbox', () => {
    const setValueMock = sinon.spy();
    const wrapper = mount(
      <SaveCard form={dummyCardData} setValue={setValueMock} />
    );

    // 2 nodes as span gets the same ID as the wrapper Icon.
    wrapper
      .find('#saveCard-icon')
      .first()
      .simulate('click');
    expect(setValueMock).toHaveProperty('callCount', 1);
  });
});

/**************************************** CVV ********************************************/
describe('[CVV]', () => {
  it('should render properly', () => {
    const wrapper = mount(<CVV form={cardInitialForm} />);

    expect(wrapper.find('input#cvv').length).toBe(1);
    expect(wrapper.find('.label').text()).toEqual('CVV');
    expect(wrapper.find('input#cvv').props().value).toBe(
      cardInitialForm.cvv.value
    );
    expect(wrapper.find('.errorMessage').length).toBe(0);
  });
});
