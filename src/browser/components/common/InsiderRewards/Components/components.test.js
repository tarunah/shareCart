import React from 'react';
import { shallow, mount } from 'enzyme';

import FeaturesManager from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { CART_INSIDER_REWARDS as Strings } from 'commonBrowserUtils/Strings';

import {
  InsiderToolTip,
  InsiderRewardsText,
  InsiderRewardsTextV2,
  EarlyAccessText,
  InsiderTrialUserProgress
} from './';

import Styles from './components.base.css';

describe('Insider Rewards Components', () => {
  it('should return correct text in insider rewards strip for insider', () => {
    let wrapper = shallow(<InsiderRewardsText points={133} />);
    expect(
      wrapper
        .find(`.${Styles.textGreen}`)
        .text()
        .trim()
    ).toBe('133');
  });

  it('should render tooltip section', () => {
    let wrapper = shallow(
      <InsiderToolTip isInsider toolTipText={'tooltip text'} />
    );
    expect(wrapper.find('ToolTip')).toHaveLength(1);

    wrapper = shallow(<InsiderToolTip isInsider />);
    expect(wrapper.find('ToolTip')).toHaveLength(0);
  });
});

describe('should test InsiderRewardsTextV2', () => {
  let props;
  const tooltip = <InsiderToolTip isInsider toolTipText={'tooltip text'} />;
  beforeEach(() => {
    props = {
      points: 60,
      tooltip,
      tierName: 'Select',
      coinMultiplier: 1
    };
  });
  it('should test it for select tier', () => {
    const wrapper = mount(<InsiderRewardsTextV2 {...props} />);

    expect(wrapper.find('SuperCoin2X').exists()).toEqual(false);
    expect(wrapper.find('SuperCoin3X').exists()).toEqual(false);

    expect(
      wrapper.find('InsiderLogoNew .insiderCrown').isEmptyRender()
    ).toEqual(false);

    expect(wrapper.find('Title .privilegeTextGold').text()).toEqual(
      'SELECT - '
    );
    expect(wrapper.find('Title .privilegeTextGrey').text()).toEqual(
      'BENEFIT ON THIS PURCHASE'
    );

    const coinsEarnedText = wrapper.find('CoinsEarnedText');
    expect(coinsEarnedText.text()).toEqual("You'll earn60 SuperCoins");
    expect(coinsEarnedText.find('.strikedPoints').exists()).toEqual(false);
    expect(coinsEarnedText.find('.superCoin').isEmptyRender()).toEqual(false);

    const tooltip = coinsEarnedText.find('InsiderToolTip');
    tooltip.find('Info').simulate('click');
    expect(tooltip.text()).toEqual('tooltip text');
  });

  it('should test it for elite tier', () => {
    props.tierName = 'Elite';
    props.coinMultiplier = 2;
    const wrapper = mount(<InsiderRewardsTextV2 {...props} />);

    expect(wrapper.find('SuperCoin2X').isEmptyRender()).toEqual(false);
    expect(wrapper.find('SuperCoin3X').exists()).toEqual(false);

    expect(
      wrapper.find('InsiderLogoNew .insiderCrown').isEmptyRender()
    ).toEqual(false);

    expect(wrapper.find('Title .privilegeTextGold').text()).toEqual('ELITE - ');
    expect(wrapper.find('Title .privilegeTextGrey').text()).toEqual(
      'BENEFIT ON THIS PURCHASE'
    );

    const coinsEarnedText = wrapper.find('CoinsEarnedText');
    expect(coinsEarnedText.text()).toEqual("You'll earn 3060 SuperCoins");
    expect(coinsEarnedText.find('.strikedPoints').text()).toEqual('30');
    expect(coinsEarnedText.find('.superCoin').isEmptyRender()).toEqual(false);

    const tooltip = coinsEarnedText.find('InsiderToolTip');
    tooltip.find('Info').simulate('click');
    expect(tooltip.text()).toEqual('tooltip text');
  });

  it('should test it for icon tier', () => {
    props.tierName = 'Icon';
    props.coinMultiplier = 3;
    const wrapper = mount(<InsiderRewardsTextV2 {...props} />);

    expect(wrapper.find('SuperCoin2X').exists()).toEqual(false);
    expect(wrapper.find('SuperCoin3X').isEmptyRender()).toEqual(false);

    expect(
      wrapper.find('InsiderLogoNew .insiderCrown').isEmptyRender()
    ).toEqual(false);

    expect(wrapper.find('Title .privilegeTextGold').text()).toEqual('ICON - ');
    expect(wrapper.find('Title .privilegeTextGrey').text()).toEqual(
      'BENEFIT ON THIS PURCHASE'
    );

    const coinsEarnedText = wrapper.find('CoinsEarnedText');
    expect(coinsEarnedText.text()).toEqual("You'll earn 2060 SuperCoins");
    expect(coinsEarnedText.find('.strikedPoints').text()).toEqual('20');
    expect(coinsEarnedText.find('.superCoin').isEmptyRender()).toEqual(false);

    const tooltip = coinsEarnedText.find('InsiderToolTip');
    tooltip.find('Info').simulate('click');
    expect(tooltip.text()).toEqual('tooltip text');
  });
});

describe('should test EarlyAccessText', () => {
  const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
  const privilegeUserMap = getKVPairValue('FREE_EARLY_ACCESS_FOR_INSIDER');

  let cartData;
  beforeEach(() => {
    FeaturesManager.isFeatureEnabled = key => key === 'PRIORITY_CHECKOUT';
    cartData = {
      flags: {
        coverFeeApplicable: { remark: Object.keys(privilegeUserMap)[0] }
      }
    };
  });

  // should test EORSText for all tiers
  test.each(Object.keys(privilegeUserMap))(
    'should test EarlyAccessText for %s',
    tierKey => {
      cartData.flags.coverFeeApplicable.remark = tierKey;
      const wrapper = mount(<EarlyAccessText cartData={cartData} />);
      const isTierPrivilege = !!privilegeUserMap[tierKey];

      if (isTierPrivilege) {
        expect(wrapper.find('.EarlyAccessText').isEmptyRender()).toEqual(false);
        const EORSFreeText =
          pcConfig.freeEarlyAccessText || Strings.EORS_FREE_TEXT;
        const EORSSaveText = ` Save ₹${pcConfig.charges}`;
        expect(wrapper.find('.EarlyAccessText').text()).toEqual(
          EORSFreeText + EORSSaveText
        );
      } else {
        expect(wrapper.find('.EarlyAccessText').exists()).toEqual(false);
      }
    }
  );

  it("shouldn't show EarlyAccessText if cfaRemark doesn't match any tier key", () => {
    cartData.flags.coverFeeApplicable.remark = null;
    const wrapper = mount(<EarlyAccessText cartData={cartData} />);

    expect(wrapper.find('.EarlyAccessText').exists()).toEqual(false);
  });
});

describe('should test InsiderTrialUserProgress', () => {
  let props;
  const mockInsiderDetails = {
    data: {
      isInsider: true,
      isUserInsiderEligible: true,
      enrolmentStatus: 'ENROLLED',
      tierProgressInfo: {
        tierId: 2,
        tierName: 'Elite',
        isTrialUser: true,
        requiredAmountToUpgrade: 400,
        tierProgressPercent: 80
      }
    }
  };
  const mockCartData = { price: { total: 100 } };
  beforeEach(() => {
    props = {
      insiderDetails: mockInsiderDetails,
      cartData: mockCartData
    };
    window.triggerEvent = () => {};
  });
  it("should render the component if it's a trial user", () => {
    const wrapper = mount(<InsiderTrialUserProgress {...props} />);
    expect(wrapper.find('.insiderTrialUserProgressContainer').length).toBe(1);
    expect(wrapper.find('.progressBarTrial').length).toBe(1);
    expect(wrapper.find('.progressBarFilled').length).toBe(1);
    expect(wrapper.find('.progressBarTrialAmount').length).toBe(1);
  });

  it('should render the correct text and width for Progress Bar', () => {
    const wrapper = mount(<InsiderTrialUserProgress {...props} />);
    expect(wrapper.find('.progressBarFilled').prop('style')).toHaveProperty(
      'width',
      '85%'
    );
    expect(wrapper.find('.progressBarTrialAmount').text()).toBe('1700/2000');
    expect(wrapper.find('.shopMoreMessage').text()).toBe(
      ' Shop for ₹300  & unlock 12 month Select Insider Pack'
    );
  });

  it('should render the congrats text without progress bar for upgrade scenario', () => {
    mockCartData.price.total = 400;
    const wrapper = mount(<InsiderTrialUserProgress {...props} />);
    expect(wrapper.find('.progressBarTrial').length).toBe(0);
    expect(wrapper.find('.insiderTrialUserProgressContainer').text()).toBe(
      "Congratulations! Post purchase, you'll unlock 12 month Select Insider Pack once the return window of your order is over."
    );
    mockCartData.price.total = 100;
  });
});
