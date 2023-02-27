import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ReturnInfoBanner from './';

describe('Info Banner', () => {
  it('should not display return info banner when show prop is false', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={false}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.returnInfoBanner').length).toBe(0);
  });

  it('should display return info banner when show prop is true', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.returnInfoBanner').length).toBe(1);
  });

  it('should display correct return period in return info banner when ab is enabled', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.text').text()).toContain(
      '27 days easy return and exchange on all items.'
    );
  });

  it('should display correct return period in return info banner when ab is enabled', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: false,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.text').text()).toContain(
      '27 days easy return on all items.'
    );
  });

  it('should display correct return period in return info banner when ab is enabled', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: false,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.text').text()).toContain(
      '27 days easy exchange on all items.'
    );
  });

  it('should not have animation class when rendered intially', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    expect(wrapper.find('.animateBannerUp').length).toBe(0);
    expect(wrapper.find('.animateBannerDown').length).toBe(0);
  });

  it('should have animate up class when animateBannerUp state is true', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    wrapper.setState({ animateBannerUp: true, animateBannerDown: false });
    expect(wrapper.find('.animateBannerUp').length).toBe(1);
    expect(wrapper.find('.animateBannerDown').length).toBe(0);
  });

  it('should have animate down class when animateBannerDown state is true', () => {
    const wrapper = mount(
      <ReturnInfoBanner
        show={true}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 27
        }}
      />
    );
    wrapper.setState({ animateBannerUp: false, animateBannerDown: true });
    expect(wrapper.find('.animateBannerUp').length).toBe(0);
    expect(wrapper.find('.animateBannerDown').length).toBe(1);
  });
});
