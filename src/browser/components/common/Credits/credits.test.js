import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Credits from './';
import CreditsManager from 'commonBrowserUtils/CreditsManager';

describe('Credits', () => {
  window.triggerEvent = () => {};
  sinon.stub(CreditsManager, 'getGiftCardBalance');
  sinon.stub(CreditsManager, 'getLoyaltyPointsBalance');
  const trueFlag = { value: true };
  const falseFlag = { value: false };

  it('displays both myntra credit and loyalty points', () => {
    const flag = { value: true };
    const wrapper = mount(
      <Credits
        balance={{
          gcBalance: { totalBalance: 1000 },
          lpBalance: { activePoints: 500, conversionFactor: 1 }
        }}
        appliedGC={{ name: 'giftcard', value: 700 }}
        appliedLP={{ name: 'loyaltypoints', value: 100 }}
        giftcardApplicable={flag}
        loyaltyPointsApplicable={flag}
        creditsSuccessCallback={() => {}}
        instrumentData={{ mc: {}, lp: {} }}
        show={{ mcShow: true, lpShow: true }}
        setLoader={() => {}}
      />
    );

    expect(wrapper.find('.creditBlock').length).toBe(2);
    expect(wrapper.find('.headerText').length).toBe(2);
    expect(wrapper.find('.balanceText').length).toBe(2);
  });

  it('should get gc balance if mcShow is true and gc balance is null', () => {
    CreditsManager.getGiftCardBalance = sinon.spy();
    CreditsManager.getLoyaltyPointsBalance = sinon.spy();
    const wrapper = mount(
      <Credits
        balance={{
          gcBalance: null,
          lpBalance: null
        }}
        giftcardApplicable={trueFlag}
        loyaltyPointsApplicable={trueFlag}
        show={{ mcShow: true, lpShow: false }}
      />
    );
    expect(CreditsManager.getGiftCardBalance).toHaveProperty('callCount', 1);
    expect(CreditsManager.getLoyaltyPointsBalance).toHaveProperty(
      'callCount',
      0
    );
  });

  it('should get lp balance if lpShow is true and lp balance is null', () => {
    CreditsManager.getGiftCardBalance = sinon.spy();
    CreditsManager.getLoyaltyPointsBalance = sinon.spy();
    const wrapper = mount(
      <Credits
        balance={{
          gcBalance: null,
          lpBalance: null
        }}
        giftcardApplicable={trueFlag}
        loyaltyPointsApplicable={trueFlag}
        show={{ mcShow: false, lpShow: true }}
      />
    );
    expect(CreditsManager.getGiftCardBalance).toHaveProperty('callCount', 0);
    expect(CreditsManager.getLoyaltyPointsBalance).toHaveProperty(
      'callCount',
      1
    );
  });

  it('displays only myntra credit', () => {
    CreditsManager.removeGiftCard = sinon.spy();
    const wrapper = mount(
      <Credits
        balance={{
          gcBalance: { totalBalance: 1000 },
          lpBalance: { conversionFactor: 1 }
        }}
        appliedGC={{ name: 'giftcard', value: 700 }}
        appliedLP={null}
        giftcardApplicable={trueFlag}
        loyaltyPointsApplicable={falseFlag}
        creditsSuccessCallback={() => {}}
        instrumentData={{ mc: {}, lp: {} }}
        show={{ mcShow: true, lpShow: true }}
        setLoader={() => {}}
      />
    );

    expect(wrapper.find('.creditBlock').length).toBe(1);
    expect(wrapper.find('.headerText').text()).toEqual('Myntra Credit');
    expect(wrapper.find('.balanceText').text()).toEqual(
      'Remaining Balance: 300'
    );
    wrapper.find('CheckboxActive.gcCheckbox').simulate('click');
    expect(CreditsManager.removeGiftCard).toHaveProperty('callCount', 1);
  });

  it('displays only loyalty points', () => {
    CreditsManager.removeLoyaltyPoints = sinon.spy();
    const wrapper = mount(
      <Credits
        balance={{
          gcBalance: null,
          lpBalance: { activePoints: 500, conversionFactor: 1 }
        }}
        appliedGC={null}
        appliedLP={{ name: 'loyaltypoints', value: 100 }}
        giftcardApplicable={falseFlag}
        loyaltyPointsApplicable={trueFlag}
        creditsSuccessCallback={() => {}}
        instrumentData={{ mc: {}, lp: {} }}
        show={{ mcShow: true, lpShow: true }}
        setLoader={() => {}}
      />
    );

    expect(wrapper.find('.creditBlock').length).toBe(1);
    expect(wrapper.find('.headerText').text()).toEqual('MynCash');
    expect(wrapper.find('.balanceText').text()).toEqual(
      'Total Active MynCash: 500'
    );
    wrapper.find('CheckboxActive.lpCheckbox').simulate('click');
    expect(CreditsManager.removeLoyaltyPoints).toHaveProperty('callCount', 1);
  });
});
