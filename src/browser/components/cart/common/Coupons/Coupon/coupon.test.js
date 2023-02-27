import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Coupon from './';

describe('Coupon', () => {
  it('should display coupon code', () => {
    let wrapper = mount(
      <Coupon code="ABC" description="60%  off" expiry={1609403047000} />
    );
    expect(wrapper.text()).to.contain('ABC');
  });

  it('should display description', () => {
    let wrapper = mount(
      <Coupon code="abc" description="60%  off" expiry={1609403047000} />
    );
    expect(wrapper.text()).to.contain('60%  off');
  });

  it('should display benefitAmount for applicable coupons', () => {
    let wrapper = mount(
      <Coupon
        code="abc"
        benefitAmount="200"
        description="60%  off"
        expiry={1609403047000}
        applicable={true}
      />
    );
    expect(wrapper.text()).to.contain('Save');
    expect(wrapper.text()).to.contain('200');
  });

  it('should display expiry', () => {
    let wrapper = mount(
      <Coupon
        code="abc"
        benefitAmount="200"
        description="60%  off"
        expiry={1609403047000}
      />
    );
    expect(wrapper.text()).to.contain('Expires on: 31st December 2020');
  });

  it('should call onCouponClick once with code as argument', () => {
    const onCouponClickSpy = sinon.spy();

    let wrapper = mount(
      <Coupon
        code="abc"
        benefitAmount="200"
        description="60%  off"
        isSelected={true}
        onCouponClick={onCouponClickSpy}
      />
    );

    wrapper.find('.customCheckbox').simulate('click');
    expect(onCouponClickSpy.callCount).to.equal(1);
    expect(onCouponClickSpy.getCalls()[0].args.length).to.equal(1);
  });

  describe('expired coupons', () => {
    it('should blur expired coupon and show coupon expired', () => {
      const onCouponClickSpy = sinon.spy();

      let wrapper = mount(
        <Coupon
          code="abc"
          benefitAmount="200"
          description="60%  off"
          expiry={new Date() - 1}
          isSelected={true}
          onCouponClick={onCouponClickSpy}
        />
      );

      expect(wrapper.find('.expiredCoupon').exists()).to.equal(true);
      expect(wrapper.find('.errorMessage').text()).to.equal('Coupon Expired.');
    });

    it('should not call onCouponClick  on a click when a coupon is expired', () => {
      const onCouponClickSpy = sinon.spy();

      let wrapper = mount(
        <Coupon
          code="abc"
          benefitAmount="200"
          description="60%  off"
          expiry={new Date() - 1}
          isSelected={true}
          onCouponClick={onCouponClickSpy}
        />
      );

      wrapper.find('.customCheckbox').simulate('click');
      expect(onCouponClickSpy.callCount).to.equal(0);
    });
  });

  describe('custom checkbox', () => {
    it('Checkbox should be mounted along with the coupon code as label', () => {
      const wrapper = mount(
        <Coupon
          code="abc"
          benefitAmount="200"
          description="60%  off"
          expiry={1609403047000}
        />
      );

      const label = wrapper.find('.labelUnchecked');
      expect(label).to.have.length(1);
      expect(label.text()).to.equal('ABC');
    });

    it('when selectedCoupon is true checkbox should be checked', () => {
      const wrapper = mount(
        <Coupon
          code="abc"
          benefitAmount="200"
          description="60%  off"
          expiry={1609403047000}
          selectedCoupon={true}
          onCouponClick={() => ({})}
        />
      );
      const checkbox = wrapper.find('.customCheckbox');
      expect(wrapper.find('.labelChecked')).to.have.length(1);
    });

    it('when isSelected is false checkbox should be unchecked', () => {
      const wrapper = mount(
        <Coupon
          code="abc"
          benefitAmount="200"
          description="60%  off"
          expiry={1609403047000}
          isSelected={false}
          onCouponClick={() => ({})}
        />
      );

      expect(wrapper.find('.labelUnchecked')).to.have.length(1);
    });
  });

  /*describe("ReadMore functionality", () => {
    it("should show not show readmore for non overflowing text even when expanded is false", () => {
      const wrapper = mount(<Coupon
        code="abc"
        benefitAmount="200"
        description="60%  off"
        expiry={1609403047000}
      />);
      expect(wrapper.find('.readMoreButton')).to.have.length(0);
    });

    it("Should show readmore when there is a overflow", () => {
      const wrapper = mount(<Coupon
        code="abc"
        benefitAmount="200"
        description="Hey this is a really really really really really raelly long text for testing the readmore button"
        expiry={1609403047000}
      />);
      expect(wrapper.find('.readMoreButton')).to.have.length(1);
    });
  })*/
});
