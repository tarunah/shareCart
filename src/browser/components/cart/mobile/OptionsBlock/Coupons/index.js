import React, { useEffect } from 'react';
import get from 'lodash/get';

import Styles from './coupons.base.css';

import { Link } from 'react-router-dom';

import ToolTip from 'commonComp/ToolTip';
import Timer from 'commonComp/Timer';

import AttachProducts from '../../../common/AttachedCoupons';

import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { currencyValue, isLoggedIn, getUidx } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import CouponIcon from 'iconComp/Coupons.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';
import Info from 'iconComp/Info.jsx';

import CartShowCoupon from './CartShowCoupon';
import CouponList from './CouponsList';

const AppliedCouponBlock = props => {
  useEffect(() => {
    props.showCouponExpiry &&
      triggerEvent('COUPON_TIMER_LOAD', {
        custom: {
          event_type: 'widgetItemLoad',
          widget: {
            name: 'cart_apply_coupon'
          },
          widget_items: {
            name: 'cart_coupon_expiry_timer',
            data_set: {
              data: [
                {
                  entity_optional_attributes: {
                    v1: getUidx(),
                    v2: `${props.expiryData.hours}:${props.expiryData.minutes}:${props.expiryData.seconds}`,
                    v3: props.discount
                  }
                }
              ]
            }
          }
        }
      });
  }, []);
  return (
    <Link to="/checkout/cart/coupons">
      <div className={Styles.appliedCoupon}>
        <div className={Styles.appliedCouponDetails}>
          <CouponIcon className={Styles.appliedBlockIcon} />
          <div className={Styles.appliedCouponText}>
            {props.count
              ? `${props.count} Coupon${props.count > 1 ? 's' : ''} applied`
              : 'Apply Coupon'}
          </div>
          {props.showCouponExpiry && (
            <div className={Styles.couponExpiryBlock}>
              <div className={Styles.couponExpiryContainer}>
                <span className={Styles.couponExpiryText}>Expiring in</span>
                <Timer
                  hours={props.expiryData.hours}
                  minutes={props.expiryData.minutes}
                  seconds={props.expiryData.seconds}
                  className={Styles.couponExpiryTimer}
                  stopCallback={props.timerCallback}
                />
              </div>
            </div>
          )}
          <ChevronRight
            className={
              props.showCouponExpiry
                ? Styles.arrowIconWithExpiry
                : Styles.arrowIconWithoutExpiry
            }
          />
        </div>
        <div
          className={
            props.showCouponExpiry ? Styles.discountWithTimer : Styles.discount
          }
        >
          <span>You saved additional </span>
          <RupeeBold className={Styles.rupeeIcon} />
          <span>{currencyValue(props.discount)}</span>
        </div>
      </div>
    </Link>
  );
};

const couponApplicableInfo = (applicableCoupons = []) => {
  let totalOff = 0;
  if (applicableCoupons.length) {
    applicableCoupons.forEach(applicableCoupon => {
      const unit = applicableCoupon.discountUnits.find(
        discountUnit => discountUnit.unit === 'RUPEE'
      );
      totalOff += unit.value;
    });
    totalOff = currencyValue(totalOff);
  }
  return {
    applicableCoupons,
    totalOff
  };
};

const fireEvent = couponInfo => {
  const { totalOff, applicableCoupons } = couponInfo;

  triggerEvent('APPLY_COUPON_CLICK', {
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
        name: 'apply_coupon_click'
      }
    }
  });
};

const couponSnackBar = e => {
  const styleOverrides = getSnackBarStyleOverrides('mobile');
  SHELL.alert('info', {
    styleOverrides,
    message: 'Select at least one item in bag to apply coupons. '
  });
  e.preventDefault();
};

const ApplyCouponUI = props => {
  const { selectedProductsCount, applicableCoupons } = props;
  const couponInfo = couponApplicableInfo(applicableCoupons);
  const showCouponsAction =
    selectedProductsCount === 0 ? couponSnackBar : () => {};
  const onApplyClick = e => {
    showCouponsAction(e);
    fireEvent(couponInfo);
  };
  return (
    <div
      className={props.nudgeCoupon ? Styles.nudgeCoupon : Styles.coupon}
      onClick={onApplyClick}
    >
      <CouponIcon className={Styles.icon} />
      <div className={Styles.title}>Apply Coupon</div>
      <ChevronRight className={Styles.arrowIcon} />
      <CartShowCoupon couponInfo={couponInfo} {...props} />
    </div>
  );
};

const ApplyCouponBlock = props => {
  const message = get(getKVPairValue('LOGIN_NUDGE_COUPON'), 'message', '');
  const price = get(getKVPairValue('LOGIN_NUDGE_COUPON'), 'price', '0');
  const priceText = `\u20B9${price}`;
  const refererUrl = '/login?referer=/checkout/cart';
  const eventName = 'COUPON_LOGINCTA_CLICK';
  return (
    <div className={Styles.container}>
      <Link to="/checkout/cart/coupons">
        <ApplyCouponUI {...props} />
      </Link>
      {!isLoggedIn() && (
        <a
          href={refererUrl}
          className={Styles.logIn}
          onClick={() => triggerEvent(eventName)}
        >
          <span>{message.replace('{0}', priceText)}</span>
        </a>
      )}
    </div>
  );
};

const DisabledCoupon = () => {
  const disabledCouponMessage = getKVPairValue('DISABLED_COUPON_MESSAGE');
  return (
    <div className={Styles.disabledContainer}>
      <CouponIcon className={`${Styles.icon} ${Styles.disabledCoupon}`} />
      <span className={`${Styles.title} ${Styles.disabledCoupon}`}>
        Apply Coupon
      </span>
      <ToolTip
        className={Styles.toolTipText}
        elem={<Info className={Styles.toolTipIcon} />}
        tipStyle={{ left: '3px' }}
      >
        {disabledCouponMessage}
      </ToolTip>
      <ChevronRight
        className={`${Styles.arrowIcon} ${Styles.disabledCoupon}`}
      />
    </div>
  );
};

const Coupons = props => {
  const {
    disable,
    discount,
    attachedProductOffers,
    analytics,
    isExchangeCart,
    setLoader,
    userDetails: { isFirstTimeCustomer = false } = {}
  } = props;
  const isAttachedProductAvailable =
    ((get(attachedProductOffers, 'appliedOffers') || []).length > 0 ||
      (get(attachedProductOffers, 'applicableOffers') || []).length > 0) &&
    isFeatureEnabled('ATTACHED_PRODUCTS') &&
    !isExchangeCart;

  const isCouponAwarenessEnabled =
    isFeatureEnabled('COUPON_AWARENESS') &&
    (props.applicableCoupons?.length > 0 || props.appliedCoupons?.length > 0) &&
    (!isLoggedIn() || isFirstTimeCustomer);

  const isRetentionCouponEnabled =
    isFeatureEnabled('RETENTION_COUPONS') &&
    (props.applicableCoupons?.length > 0 || props.appliedCoupons?.length > 0);

  const couponNudgesEnabled =
    isFeatureEnabled('COUPON_NUDGES') &&
    (props.applicableCoupons?.length > 0 ||
      props.appliedCoupons?.length > 0 ||
      props.potentialCoupons?.length > 0);
  const couponSectionHeading = isAttachedProductAvailable
    ? 'OFFERS & COUPONS'
    : 'Coupons';

  return (
    <div>
      <div className={Styles.header}>{couponSectionHeading}</div>
      <AttachProducts
        mode="mobile"
        attachedProductOffers={attachedProductOffers}
        analytics={analytics}
        isExchangeCart={isExchangeCart}
        setLoader={setLoader}
      />
      {disable ? (
        <DisabledCoupon />
      ) : isCouponAwarenessEnabled ||
        isRetentionCouponEnabled ||
        couponNudgesEnabled ? (
        <CouponList {...props} />
      ) : discount ? (
        <AppliedCouponBlock {...props} />
      ) : (
        <ApplyCouponBlock {...props} />
      )}
    </div>
  );
};

export default Coupons;
