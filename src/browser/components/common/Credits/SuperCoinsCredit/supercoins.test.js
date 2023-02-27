import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Credits from '../index';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import SuperCoinsCredit from 'commonComp/Credits/SuperCoinsCredit/index';

describe('SuperCoins Credits', () => {
  window.triggerEvent = () => {};
  sinon.stub(CreditsManager, 'getSupercoinsBalance').returns({
    statusEntry: {
      statusCode: 1004,
      statusMessage: 'Retrieved successfully',
      statusType: 'SUCCESS'
    },
    data: {
      supercoinBalance: 3974,
      redeemableSupercoins: 3,
      equivalentMyntraCredit: 3
    }
  });
  sinon.stub(CreditsManager, 'redeemSuperCoins');
  const trueFlag = { value: true };
  const falseFlag = { value: false };

  it('displays myntra credit, supercoins and loyalty points', () => {
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
        show={{ mcShow: true, lpShow: true, scShow: true }}
        setLoader={() => {}}
        creditsToggleSuccessCallback={() => {}}
      />
    );
    wrapper.setState({
      scBalance: {
        supercoinBalance: 3974,
        redeemableSupercoins: 3,
        equivalentMyntraCredit: 3
      },
      showSCCredits: true
    });
    expect(wrapper.find('.creditBlock').length).toBe(3);
    expect(wrapper.find('.headerText').length).toBe(3);
  });

  it('displays only SuperCoins credit block', () => {
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
        show={{ mcShow: false, lpShow: false, scShow: true }}
        setLoader={() => {}}
        creditsToggleSuccessCallback={() => {}}
      />
    );
    wrapper.setState({
      scBalance: {
        supercoinBalance: 3974,
        redeemableSupercoins: 3,
        equivalentMyntraCredit: 3
      },
      showSCCredits: true
    });
    expect(wrapper.find('.creditBlock').length).toBe(1);
  });

  it('checks SuperCoins credit block to be visible', () => {
    const wrapper = mount(
      <SuperCoinsCredit
        redeemableSupercoins={30}
        equivalentMyntraCredit={30}
        applySupercoinsCb={() => {}}
        cartId={Math.random()}
        disableSuperCoins={false}
      />
    );
    expect(wrapper.find('.toggleArea').length).toBe(1);
  });
});
