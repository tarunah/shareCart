import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import CreditsBlock from './';
import Credits from '../../../common/Credits';

import CreditsManager from 'commonBrowserUtils/CreditsManager';

import { cartMockData, gcBalance, lpBalance } from 'testUtils/cartMockData';

describe('CreditsBlock', () => {
  window.triggerEvent = () => {};

  it('should not call getBalance for gc and lp if show is false', () => {
    CreditsManager.getGiftCardBalance = sinon.spy();
    CreditsManager.getLoyaltyPointsBalance = sinon.spy();
    const wrapper = mount(
      <CreditsBlock
        cartData={null}
        show={false}
        updatePageData={() => {}}
        setLoader={() => {}}
      />
    );
    expect(CreditsManager.getGiftCardBalance).toHaveProperty('callCount', 0);
    expect(CreditsManager.getLoyaltyPointsBalance).toHaveProperty(
      'callCount',
      0
    );
  });

  it('should render Credits component when show is true', () => {
    const wrapper = mount(
      <CreditsBlock
        show={true}
        cartData={cartMockData}
        updatePageData={() => {}}
        setLoader={() => {}}
      />
    );
    expect(wrapper.find(Credits).length).toBe(1);
  });
});
