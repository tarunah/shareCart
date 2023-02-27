import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Cashback from '.';
import CashbackHandler from './CashbackHandler';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';
import { cartMockData } from 'testUtils/cartMockData';
import { icbMockData, deffMockData } from 'testUtils/paymentMockData';

describe('<Cashback /> :', () => {
  PaymentManager.getPlutusEligibility = () => {};
  const render = sinon.spy();
  it('should load properly', () => {
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    expect(wrapper.state().icb.show).toBe(false);
    expect(wrapper.state().icb.message).toBe('');
    expect(wrapper.state().deff.message).toBe('');
    expect(wrapper.state().currentRetryCount).toBe(0);
    expect(render.callCount).toBe(1);
  });

  it('test checkEligibility', () => {
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().plutusEligibility = {
      icb: true
    };

    expect(wrapper.instance().checkEligibility('icb')).toBe(true);
    expect(wrapper.instance().checkEligibility('def')).toBe(undefined);
  });

  it('test getOfferData', () => {
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    const data = {
      eligibilityDetails: [
        {
          type: 'type1',
          data: 123
        }
      ]
    };

    expect(wrapper.instance().getOfferData(data, 'type1')).toBe(123);
  });

  it('test onClickEligibility', () => {
    window.triggerEvent = sinon.spy();

    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().getPlutusEligibility = sinon.spy();
    wrapper.instance().onClickEligibility();

    expect(window.triggerEvent.callCount).toBe(1);
    expect(wrapper.instance().getPlutusEligibility.callCount).toBe(1);
  });

  it('should test getPlutusEligibility', () => {
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().plutusEligibility = {
      icb: true
    };

    wrapper.instance().getPlutusEligibility();

    expect(wrapper.instance().lastCheckedCardId).toBe(1234);
    expect(wrapper.state().currentRetryCount).toBe(0);
  });

  it('should test actionSuccess', () => {
    const res = {
      eligibilityDetails: [
        {
          type: 'INSTANT_CASHBACK',
          data: 123
        }
      ]
    };

    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().handleICBData = sinon.spy();
    wrapper.instance().handleDeffData = sinon.spy();

    wrapper.instance().plutusEligibility = {
      icb: true
    };
    wrapper.instance().actionSuccess(res);
    expect(wrapper.instance().handleICBData.callCount).toBe(1);

    wrapper.instance().plutusEligibility = {
      deff: true
    };

    wrapper.instance().actionSuccess(res);
    expect(wrapper.instance().handleDeffData.callCount).toBe(1);
  });

  it('should test actionError', () => {
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={() => {}}
        instrumentHandle={1234}
        render={render}
      />
    );

    expect(wrapper.state().icb.message).toBe('');
    expect(wrapper.state().icb.show).toBe(false);
    expect(wrapper.state().currentRetryCount).toBe(0);
    wrapper.instance().actionError();
    expect(wrapper.state().icb.show).toBe(true);
    expect(wrapper.state().icb.error).toBe(true);
    expect(wrapper.state().currentRetryCount).toBe(1);
  });

  it('should test handleICBData', () => {
    const icbData = {
      amount: 100000,
      code: '11005',
      percentage: 30,
      skuLevelCashbackDetails: []
    };

    const updateBankDiscount = sinon.spy();
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={updateBankDiscount}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().handleICBData(icbData);
    expect(wrapper.state().icb.show).toBe(true);
    expect(wrapper.state().icb.message).toBe('30% instant discount ( ₹ 1000)');
    expect(wrapper.state().icb.code).toBe(null);
    expect(wrapper.state().icb.error).toBe(null);
    expect(updateBankDiscount.callCount).toBe(1);

    icbData.amount = 0;

    wrapper.instance().handleICBData(icbData);
    expect(wrapper.state().icb.show).toBe(true);
    expect(wrapper.state().icb.message).toBe(
      'This card is not eligible for instant discount'
    );
    expect(wrapper.state().icb.code).toBe('11005');
    expect(wrapper.state().icb.error).toBe(null);
    expect(wrapper.state().discount).toBe(0);
    expect(updateBankDiscount.callCount).toBe(2);
  });

  it('should test handleDeffData', () => {
    const updateBankDiscount = sinon.spy();
    const wrapper = shallow(
      <Cashback
        cartData={cartMockData}
        updateBankDiscount={updateBankDiscount}
        instrumentHandle={1234}
        render={render}
      />
    );

    wrapper.instance().handleDeffData({ amount: 1000 });
    expect(wrapper.state().deff.show).toBe(true);
    expect(wrapper.state().deff.message).toBe('Cashback upto ₹ 10. T&C Apply');
    expect(updateBankDiscount.callCount).toBe(1);
  });
});

/**
 * CashbackHandler: Utility
 * Inputs: cartData, icbData, deffData
 * Returns: message
 */
describe('CashbackHandler', () => {
  it('should return the correct ICB message', () => {
    let cbHandler = new CashbackHandler(cartMockData, icbMockData);
    let message = cbHandler.getICBMessageString();

    expect(message).toBe(
      '10% instant discount ( ₹ 1000) available on 2 / 4 items'
    );

    // Changing the original values.
    icbMockData.skuLevelCashbackDetails.push({
      skuId: '11349038',
      payableAmount: 315000,
      cashbackAmount: 50000,
      ruleId: 502
    });
    icbMockData.amount += 50000;

    cbHandler = new CashbackHandler(cartMockData, icbMockData);
    message = cbHandler.getICBMessageString();

    expect(message).toBe(
      '10% instant discount ( ₹ 1500) available on 3 / 4 items'
    );

    // Changing the original values.
    icbMockData.skuLevelCashbackDetails.push({
      skuId: '11349037',
      payableAmount: 315000,
      cashbackAmount: 34900,
      ruleId: 502
    });
    icbMockData.amount += 50000;

    cbHandler = new CashbackHandler(cartMockData, icbMockData);
    message = cbHandler.getICBMessageString();
    expect(message).toBe(
      '10% instant discount ( ₹ 2000) available on all items'
    );
  });

  it('should return the correct DEFERRED message', () => {
    let cbHandler = new CashbackHandler(null, null, deffMockData);
    let message = cbHandler.getDeffMessageString();

    expect(message).toBe('10% Cashback upto ₹ 100. T&C Apply');
  });
});
