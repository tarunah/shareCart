import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import BalanceAmount from './BalanceAmount';
import { expressCheckoutData } from './mock';

describe('Test Balance Amount', () => {
  const { gcObj, lpObj } = expressCheckoutData;

  const updateLoyalty = sinon.spy();
  const updateCredit = sinon.spy();
  const loyaltyInfo = {
    conversion: 100,
    finalAmount: 100,
    orderTotal: 100
  };

  it('should test if the component is rendered properly', () => {
    const wrapper = mount(
      <BalanceAmount
        gcObj={gcObj}
        lpObj={lpObj}
        updateLoyalty={updateLoyalty}
        updateCredit={updateCredit}
        loyaltyInfo={loyaltyInfo}
      />
    );

    expect(wrapper.find('.balanceAmountWrapper').length).toBe(1);
    expect(wrapper.find('.headerNav').length).toBe(1);
    expect(wrapper.find('.headerNav').text()).toBe('Myntra Credit & MynCash');
    expect(wrapper.find('.balanceAmount').length).toBe(1);
    expect(wrapper.find('.loyaltyCheck').length).toBe(1);
    expect(wrapper.find('.hiddenInput').length).toBe(2);
    expect(wrapper.find('.loyaltyInfo').length).toBe(2);
    expect(wrapper.find('.markupWrapper').length).toBe(2);
    expect(
      wrapper
        .find('.markupWrapper')
        .at(0)
        .text()
    ).toBe('Use MynCash: 100 ');
    expect(wrapper.find('.creditMarkup').length).toBe(2);
    expect(
      wrapper
        .find('.creditMarkup b')
        .at(0)
        .text()
    ).toBe('100');
    expect(wrapper.find('.container').length).toBe(2);
    expect(wrapper.find('.toolTip').length).toBe(2);
    expect(wrapper.find('Info.tooltipInfoIcon').length).toBe(2);
    expect(wrapper.find('.creditCheck').length).toBe(1);
  });
});
