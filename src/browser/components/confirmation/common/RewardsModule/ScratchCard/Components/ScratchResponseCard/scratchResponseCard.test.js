import React from 'react';
import { mount } from 'enzyme';
import ScratchResponseCard from './index';
import sinon from 'sinon';
import Alert from 'iconComp/Alert.jsx';
import Hanger from 'iconComp/Hanger.jsx';

describe('ScratchResponseCard Component Tests', () => {
  it('should check if ScratchResponseCard is displayed properly', () => {
    const wrapper = mount(<ScratchResponseCard />);
    expect(wrapper.find('.contentWrapper').exists()).toEqual(true);
  });
  it('should check if Alert is displayed when isError prop is true', () => {
    const wrapper = mount(<ScratchResponseCard isError />);
    expect(wrapper.find(Alert).exists()).toEqual(true);
  });
  it('should check if Hanger is displayed when isCouponEmpty prop is true', () => {
    const wrapper = mount(<ScratchResponseCard isCouponEmpty />);
    expect(wrapper.find(Hanger).exists()).toEqual(true);
  });
  it('should check if couponBox is displayed when coupon code has been loaded', () => {
    const wrapper = mount(<ScratchResponseCard couponCode="ABCD1234@" />);
    expect(wrapper.find('.couponBox').exists()).toEqual(true);
  });
  it('should check if coupon should be copied after clicking on the coupon box', () => {
    document.execCommand = sinon.spy();
    const onCouponCopy = sinon.spy();
    const wrapper = mount(
      <ScratchResponseCard couponCode="ABCD1234@" onCouponCopy={onCouponCopy} />
    );
    wrapper.find('.couponBox').simulate('click');
    // expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(onCouponCopy.calledOnce).toEqual(true);
  });
});
