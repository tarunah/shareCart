import React from 'react';
import { shallow } from 'enzyme';
import CartShowCoupon from './';
import { applicableCouponData } from 'testUtils/cartMockData';

describe('Cart Show Coupon Test', () => {
  it('should display single applicable coupons', () => {
    const props = {
      isCartShowCouponEnabled: true,
      userDetails: {
        isFirstTimeCustomer: true
      },
      couponInfo: {
        totalOff: 50,
        applicableCoupons: [...applicableCouponData.coupons]
      }
    };
    const wrapper = shallow(<CartShowCoupon {...props} />);
    expect(wrapper.text()).toBe('₹50 Off, Use Code: TSTBOTIWBYT');
  });

  it('should display multiple applicable coupons', () => {
    const props = {
      isCartShowCouponEnabled: true,
      userDetails: {
        isFirstTimeCustomer: true
      },
      couponInfo: {
        totalOff: 100,
        applicableCoupons: [
          ...applicableCouponData.coupons,
          ...applicableCouponData.coupons
        ]
      }
    };
    const wrapper = shallow(<CartShowCoupon {...props} />);
    expect(wrapper.text()).toBe('Upto ₹100 Off, 2 Coupons Available');
  });
});
