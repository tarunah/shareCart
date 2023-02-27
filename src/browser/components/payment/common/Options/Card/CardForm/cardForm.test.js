import React from 'react';
import { mount } from 'enzyme';
import CardForm from './index';
import {
  CardNumber,
  CardName,
  ExpiryMonthYear,
  CVV,
  SaveCard
} from './CardInputs';
import {
  props,
  cardInitialFormV2 as cardInitialForm
} from 'testUtils/paymentMockData';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';

describe('[CardForm]', () => {
  PaymentManager.getPlutusEligibility = () => {};
  window.triggerEvent = () => {};

  it('should render properly', () => {
    const wrapper = mount(
      <CardForm
        form={cardInitialForm}
        plutusInfo={{ show: false }}
        {...props}
      />
    );

    expect(wrapper.find(CardNumber).length).toBe(1);
    expect(wrapper.find(CardName).length).toBe(1);
    expect(wrapper.find(ExpiryMonthYear).length).toBe(1);
    expect(wrapper.find(CVV).length).toBe(1);
    expect(wrapper.find(SaveCard).length).toBe(1);
  });
});
