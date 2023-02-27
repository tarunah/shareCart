import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '.';

const componentProps = {
  progressBarCss: {
    primaryWidth: '50%'
  },
  tierName: 'Select',
  userName: 'John',
  config: {
    tierNames: ['Select', 'Elite', 'Icon'],
    tooltipTitle: 'Congratulations {{userName}}!',
    tooltipMessage: "You'll be upgraded once you collect your Coins"
  },
  isTrialUser: false
};

const trialUsersComponentProps = {
  progressBarCss: {
    primaryWidth: '50%'
  },
  tierName: 'Select',
  userName: 'John',
  config: {
    tierNames: ['Select', 'Elite', 'Icon'],
    tooltipTitle: 'Congratulations {{userName}}!',
    tooltipMessage: "You'll be upgraded once you collect your Coins",
    insiderTrials: {
      defaultTooltipTitle: '',
      defaultTooltipMessage:
        'Recent purchase will only reflect in the progress once the return window is over',
      title: 'Trial',
      progressBarLevels: ['₹0', '₹500', '₹1000', '₹1500', '₹2000'],
      goalAmount: 2000,
      shopMoreMessage:
        'Shop for {{requiredAmount}} & Unlock 12 Month Select Insider Pack',
      upgradeCartMessage: `post purchase, you'll unlock 12 Month Select tier pack once the return window of this order is over.`
    }
  },
  isTrialUser: true
};

describe('ProgressBar renders', () => {
  it('should render the ProgressBar', () => {
    const wrapper = shallow(<ProgressBar {...componentProps} />);
    expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
    expect(wrapper.find('.progressBarBackground').length).toBe(1);
    expect(wrapper.find('.tierLevels').length).toBe(1);
    expect(wrapper.find('.barOverlay').length).toBe(1);
  });

  it('should render 3 tiers', () => {
    const wrapper = shallow(<ProgressBar {...componentProps} />);
    expect(wrapper.find('.tierLevelContainer').length).toBe(3);
  });

  it('should render active tier as the next tier', () => {
    const wrapper = shallow(<ProgressBar {...componentProps} />);
    expect(wrapper.find('.activeTierName').length).toBe(1);
    expect(wrapper.find('.activeTierName').text()).toBe('Elite');
  });

  it('should render primary bar overlay with width 50%', () => {
    const wrapper = shallow(<ProgressBar {...componentProps} />);
    expect(wrapper.find('.barOverlay').prop('style')).toHaveProperty(
      'width',
      '50%'
    );
  });
});

describe('ProgressBar renders for trial users', () => {
  it('should render the ProgressBar', () => {
    const wrapper = shallow(<ProgressBar {...trialUsersComponentProps} />);
    expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
    expect(wrapper.find('.progressBarBackground').length).toBe(1);
    expect(wrapper.find('.tierLevels').length).toBe(1);
    expect(wrapper.find('.barOverlay').length).toBe(1);
  });

  it('should render 5 levels', () => {
    const wrapper = shallow(<ProgressBar {...trialUsersComponentProps} />);
    expect(wrapper.find('.tierLevelContainer').length).toBe(5);
  });

  it('should render primary bar overlay with width 50%', () => {
    const wrapper = shallow(<ProgressBar {...trialUsersComponentProps} />);
    expect(wrapper.find('.barOverlay').prop('style')).toHaveProperty(
      'width',
      '50%'
    );
  });
});
