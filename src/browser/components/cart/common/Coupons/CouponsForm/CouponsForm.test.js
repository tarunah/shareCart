import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { applicableCouponData } from 'testUtils/cartMockData';

import { CouponFormInput, CouponsForm } from './';
import Coupon from '../Coupon';

describe('Coupons Form UI', () => {
  const applicableCoupon = applicableCouponData['coupons'][0];

  it('should render all the coupons passed', () => {
    const couponSelectionStatus = { [applicableCoupon.code]: true };
    const wrapper = mount(
      <CouponsForm
        coupons={[applicableCoupon, applicableCoupon, applicableCoupon]}
        couponSelectionStatus={couponSelectionStatus}
        couponError={''}
        couponInput={''}
        potentialCoupons={[]}
      />
    );
    expect(wrapper.find('.validCouponContainer')).to.length(3);
  });

  it('should render the banner if render banner is true', () => {
    const couponSelectionStatus = { [applicableCoupon.code]: true };
    const wrapper = mount(
      <CouponsForm
        renderBannerFG={true}
        coupons={[applicableCoupon, applicableCoupon, applicableCoupon]}
        couponSelectionStatus={couponSelectionStatus}
        couponError={''}
        couponInput={''}
        potentialCoupons={[]}
      />
    );
    expect(wrapper.find('.bannerContent').text()).to.contain(
      'Our coupons just got bigger and better'
    );
  });

  describe('coupon input box', () => {
    it('should only have input if no coupon is available', () => {
      const wrapper = mount(
        <CouponsForm coupons={[]} potentialCoupons={[]} couponInput={''} />
      );
      expect(wrapper.find(CouponFormInput)).to.have.length(1);
      expect(wrapper.find(Coupon)).to.have.length(0);
      expect(wrapper.text()).to.contain('No other coupons available');
    });

    it('should have disabled apply button when coupon input text is empty', () => {
      const wrapper = mount(<CouponFormInput couponInput="" />);
      expect(wrapper.find('.enabled')).to.have.length(0);
    });

    it('should have enabled apply button when coupon input text is not empty', () => {
      const wrapper = mount(<CouponFormInput couponInput="abc" />);
      expect(wrapper.find('.enabled')).to.have.length(1);
    });

    it('should call callback when apply button clicked and coupon input is not empty', () => {
      const applyCouponSpy = sinon.spy();
      const wrapper = mount(
        <CouponFormInput applyCoupon={applyCouponSpy} couponInput={'abc'} />
      );
      wrapper.find('.enabled').simulate('click');
      expect(applyCouponSpy.callCount).to.equal(1);
    });

    it('should change the border color of text input and enables the Apply button on text input', () => {
      //without input
      let wrapper = mount(<CouponFormInput couponInput={''} />);
      expect(wrapper.find('.enabledTextInput')).to.have.length(0);
      expect(wrapper.find('.enabled')).to.have.length(0);

      //with input
      wrapper = mount(<CouponFormInput couponInput={'abc'} />);
      expect(wrapper.find('.enabledTextInput')).to.have.length(1);
      expect(wrapper.find('.enabled')).to.have.length(1);
    });

    it('should call apply once with code as argument when apply is clicked', () => {
      const apply = sinon.spy();

      let wrapper = mount(
        <CouponFormInput couponInput={'abc'} applyCoupon={apply} />
      );

      wrapper.find('.applyButton').simulate('click');
      expect(apply.callCount).to.equal(1);
      expect(apply.getCalls()[0].args.length).to.equal(1);
    });

    it('should show error and changes the color of the input box to orange, if error message is passed', () => {
      let wrapper = mount(
        <CouponFormInput
          couponInput={'abc'}
          errorMessage={'This coupon is not valid.'}
        />
      );
      expect(wrapper.find('.errorMessage').text()).to.equal(
        'This coupon is not valid.'
      );
      expect(wrapper.find('.textInputError')).to.have.length(1);
    });
  });
});
