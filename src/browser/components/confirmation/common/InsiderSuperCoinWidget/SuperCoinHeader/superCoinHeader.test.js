import React from 'react';
import { shallow } from 'enzyme';
import SuperCoinHeader from '.';

const componentProps = {
  headerMessage: '{{tierName}} Benefits',
  tierName: 'Select',
  isTrialUser: false,
  trialUserTitle: 'Trial'
};

describe('SuperCoinHeader renders', () => {
  it('should render the SuperCoinHeader', () => {
    const wrapper = shallow(<SuperCoinHeader {...componentProps} />);
    expect(wrapper.find('.superCoinHeader').length).toBe(1);
    expect(wrapper.find('.tierNameContainer').length).toBe(1);
    expect(wrapper.find('.crownIcon').length).toBe(1);
    expect(wrapper.find('.tierNameText').length).toBe(1);
    expect(wrapper.find('.tierNameText').html()).toBe(
      '<span class="tierNameText">Select</span>'
    );
    expect(wrapper.find('.insiderLogoContainer').length).toBe(1);
    expect(wrapper.find('.myntraLogo').length).toBe(1);
    expect(wrapper.find('.insiderLogoSuperCoin').length).toBe(1);
  });

  it('should render the SuperCoinHeader in the trial user variant', () => {
    componentProps.isTrialUser = true;
    const wrapper = shallow(<SuperCoinHeader {...componentProps} />);
    expect(wrapper.find('.superCoinHeader').length).toBe(1);
    expect(wrapper.find('.tierNameContainer').length).toBe(1);
    expect(wrapper.find('.crownIcon').length).toBe(1);
    expect(wrapper.find('.tierNameText').length).toBe(1);
    expect(wrapper.find('.tierNameText').html()).toBe(
      '<span class="tierNameText">Select Trial</span>'
    );
    expect(wrapper.find('.insiderLogoContainer').length).toBe(1);
    expect(wrapper.find('.myntraLogo').length).toBe(1);
    expect(wrapper.find('.insiderLogoSuperCoin').length).toBe(1);
  });
});
