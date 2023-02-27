import React from 'react';
import { shallow } from 'enzyme';
import CouponBanner from './index';
import get from 'lodash/get';

// utils
import { getKVPairValue } from 'commonUtils/KVPairManager';

describe('Coupon Banner', () => {
  const couponConfig = getKVPairValue('CONFIRMATION_COUPON_BANNER');
  const subHeader =
    get(couponConfig, 'validText') + ' ' + get(couponConfig, 'validDate');
  it('should display the coupon banner', () => {
    let wrapper = shallow(<CouponBanner mode="desktop" />);
    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.header').text()).toEqual(get(couponConfig, 'header'));
    expect(wrapper.find('.headerContainer').length).toEqual(1);
    expect(wrapper.find('.desktop').length).toEqual(1);
    expect(wrapper.find('.subHeader').text()).toEqual(subHeader);
    expect(wrapper.find('.coupon').length).toEqual(1);
    expect(wrapper.find('.line1').length).toEqual(1);
    expect(wrapper.find('.line1').length).toEqual(1);
    expect(wrapper.find('.line1').length).toEqual(1);

    wrapper = shallow(<CouponBanner mode="mobile" />);
    expect(wrapper.find('.desktop').length).not.toEqual(1);
  });
});
