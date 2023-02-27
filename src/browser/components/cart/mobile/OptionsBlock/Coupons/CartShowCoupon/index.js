import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUidx } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

import Styles from './cartShowCoupon.base.css';

const init = props => {
  const {
    couponInfo: { applicableCoupons, totalOff }
  } = props;
  let description = '',
    couponDiscountText = '';
  if (applicableCoupons.length) {
    if (applicableCoupons.length === 1) {
      couponDiscountText = Strings.TOTAL_OFF.replace('%totalOff%', totalOff);
      description = Strings.COUPON_CODE_DESC.replace(
        '%code%',
        applicableCoupons[0].code
      );
    } else {
      couponDiscountText = Strings.UPTO_TOTAL_OFF.replace(
        '%totalOff%',
        totalOff
      );
      description = Strings.NUM_COUPON_AVAILABLE.replace(
        '%numOfCoupons%',
        applicableCoupons.length
      );
    }
  }
  return {
    couponDiscountText,
    description
  };
};

const CartShowCoupon = props => {
  const { couponDiscountText, description } = init(props);
  useEffect(() => {
    const {
      userDetails: { isFirstTimeCustomer },
      couponInfo: { applicableCoupons, totalOff }
    } = props;
    if (isFirstTimeCustomer && applicableCoupons.length) {
      triggerEvent('CART_NEW_USER_COUPON_FLAG', {
        custom: {
          custom: {
            v1: getUidx(),
            v2: totalOff,
            v3:
              applicableCoupons.length === 1
                ? applicableCoupons[0].code
                : applicableCoupons.length
          },
          widget: {
            name: 'cart_new_user_coupon_flag'
          }
        }
      });
    }
  }, [props]);

  const {
    userDetails: { isFirstTimeCustomer },
    isCartShowCouponEnabled
  } = props;

  return isCartShowCouponEnabled &&
    isFirstTimeCustomer &&
    couponDiscountText &&
    description ? (
    <div className={Styles.container}>
      {couponDiscountText},{' '}
      <span className={Styles.couponMsg}>{description}</span>
    </div>
  ) : null;
};

export default CartShowCoupon;

CartShowCoupon.propTypes = {
  userDetails: PropTypes.object,
  couponInfo: PropTypes.object,
  isCartShowCouponEnabled: PropTypes.bool
};

CartShowCoupon.defaultProps = {
  userDetails: {}
};
