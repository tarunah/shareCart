import React from 'react';
import { mount } from 'enzyme';
import CouponAppliedBanner from '.';

const componentProps = {
  code: 'XYZZYSPOON!',
  discount: 20
};

describe('CouponAppliedBanner renders', () => {
  it('should render CouponAppliedBanner with appropriate labels', () => {
    const wrapper = mount(<CouponAppliedBanner {...componentProps} />);
    expect(wrapper.find('.backgroundModal').length).toBe(1);
    expect(wrapper.find('.couponApplied').text()).toBe("'XYZZYSPOON!' Applied");
    expect(wrapper.find('.savedText').text()).toBe('You saved Extra20');
    expect(wrapper.find('.buttonText').text()).toBe('YAY! AWESOME');
  });

  it('the props changes should reflect in the component', () => {
    const wrapper = mount(<CouponAppliedBanner code="ABCD" discount={60} />);
    expect(wrapper.find('.couponApplied').text()).toBe("'ABCD' Applied");
    expect(wrapper.find('.savedText').text()).toBe('You saved Extra60');
    expect(wrapper.find('.buttonText').text()).toBe('YAY! AWESOME');
  });
});
