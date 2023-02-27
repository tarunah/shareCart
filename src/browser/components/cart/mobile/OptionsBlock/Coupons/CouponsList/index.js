import React, { useCallback, useState } from 'react';
import Styles from './couponsList.base.css';
import CouponIcon from 'iconComp/Coupons.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';
import Scissors from 'iconComp/Scissors.jsx';
import Close from 'iconComp/Close.jsx';
import {
  currencyValue,
  getFullDateDiff,
  isLoggedIn,
  setViewportReference
} from 'commonBrowserUtils/Helper';
import Rupee from 'iconComp/Rupee.jsx';
import { Link } from 'react-router-dom';
import CouponsHandler from '../../../../common/Coupons/CouponsHandler';
import { CheckoutConsumerHOC } from '@context/CheckoutContext.js';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import Button from 'vision/components/Button';
import isEqual from 'lodash/isEqual';
import minBy from 'lodash/minBy';
import flatten from 'lodash/flatten';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import Timer from 'commonComp/Timer';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Modal from 'commonComp/Modal';
import Confetti from 'commonComp/Confetti';
import CouponAppliedBanner from './CouponAppliedBanner';

const CouponsListHeader = React.memo(({ couponsCount }) => {
  const sendEvent = () =>
    triggerEvent(
      isFeatureEnabled('COUPON_NUDGES')
        ? 'COUPON_NUDGES_ALL_COUPON_CLICK'
        : 'AUTO_APPLY_ALL_COUPONS_CLICK'
    );

  return (
    <div className={Styles.headerContainer}>
      <CouponIcon />
      <div className={Styles.couponText}>
        Best {couponsCount > 1 ? 'Coupons' : 'Coupon'} For You
      </div>
      <Link
        className={Styles.applyCouponContainer}
        to="/checkout/cart/coupons"
        onClick={sendEvent}
      >
        <div className={Styles.applyCouponText}>All Coupons</div>
        <ChevronRight className={Styles.applyCouponIcon} />
      </Link>
    </div>
  );
});

const CouponDetail = props => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [couponApplicationModal, setcouponApplicationModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerCallBack = useCallback(() => {
    setTimerExpired(true);
  }, [timerExpired]);

  const redirectToLogin = useCallback(() => {
    triggerEvent(
      isFeatureEnabled('COUPON_NUDGES')
        ? 'COUPON_NUDGES_LOGIN_CLICKED'
        : 'AUTO_APPLY_LOGIN_CLICKED'
    );
    setTimeout(() => SHELL.redirectTo('/login?referer=/checkout/cart'), 0);
  }, []);

  const applyCoupon = useCallback(() => {
    if (props.isPotentialCoupon && props.tagLink) {
      triggerEvent('COUPON_NUDGES_ADD_ITEM', {
        custom: {
          custom: {
            v1: props.code,
            v2: props.benefit
          }
        }
      });
      SHELL.redirectTo(props.tagLink);
    } else if (!isLoggedIn()) redirectToLogin();
    else if (props.applyCoupon)
      props.applyCoupon(props.code, () => {
        if (!isFeatureEnabled('APPLY_COUPON_ANIMATION')) return;
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => {
            setPopUp(true);
          }, 1000);
          setTimeout(() => {
            setShowConfetti(false);
          }, 3000);
        }, 500);
        setcouponApplicationModal(true);
      });
  }, [props.code]);

  const removeCoupon = useCallback(() => {
    props.removeCoupon && props.removeCoupon(props.code);
  }, [props.code]);

  const expiryData = getFullDateDiff(props.expiry);

  const triggerLoginShownEvent = () => {
    if (!isLoggedIn())
      triggerEvent(
        isFeatureEnabled('COUPON_NUDGES')
          ? 'COUPON_NUDGES_LOGIN_SHOWN'
          : 'AUTO_APPLY_COUPON_LOGIN_SHOWN'
      );
  };

  const closeModal = () => {
    setcouponApplicationModal(false);
  };

  const showExpiry = !!(
    props.showExpiry &&
    expiryData &&
    expiryData.days === 0 &&
    expiryData.hours < getGrowthHackConfigValue('COUPON_EXPIRY').maximumTime &&
    !timerExpired
  );

  return (
    <>
      {couponApplicationModal && showConfetti && (
        <>
          <Modal className={Styles.modal} cancelCallback={closeModal}>
            <Confetti className={Styles.confetti} showConfetti={showConfetti} />
            <CouponAppliedBanner code={props.code} discount={props.discount} />
          </Modal>
        </>
      )}
      <div
        className={`${Styles.couponDetail} ${timerExpired &&
          Styles.couponDetailDisabled}`}
      >
        {!props.isCouponApplied ? (
          <div>
            <div className={Styles.couponDescription}>
              <div className={Styles.couponDescriptionHeader}>
                {!props.isPotentialCoupon
                  ? `Extra ₹${props.discount} OFF`
                  : `Save upto ₹${props.benefit}`}
              </div>
              {showExpiry ? (
                <div>
                  <div className={Styles.couponExpiryBlock}>
                    <span className={Styles.couponExpiryText}>Expiring in</span>
                    <Timer
                      hours={expiryData.hours}
                      minutes={expiryData.minutes}
                      seconds={expiryData.seconds}
                      className={Styles.couponExpiryTimer}
                      stopCallback={timerCallBack}
                    />
                  </div>
                </div>
              ) : timerExpired ? (
                <span className={Styles.couponExpiredText}>Coupon Expired</span>
              ) : null}
            </div>
            <div className={Styles.couponDescriptionContainer}>
              {!props.isPotentialCoupon ? props.description : props.message}
            </div>
          </div>
        ) : null}
        <div className={Styles.couponContainer}>
          <div className={Styles.couponDisplay}>
            <span
              className={`${Styles.coupon} ${(timerExpired ||
                props.isPotentialCoupon) &&
                Styles.couponDisabled}`}
            >
              {props.code}
            </span>
            <Scissors
              className={`${Styles.scissors} ${(timerExpired ||
                props.isPotentialCoupon) &&
                Styles.scissorsDisabled}`}
            />
          </div>
          {props.isCouponApplied ? (
            timerExpired ? (
              <div className={Styles.couponDiscountMessageContainerDisabled}>
                <span>No Longer Valid </span>
              </div>
            ) : (
              <div className={Styles.couponDiscountMessageContainer}>
                <span>Saved </span>
                <Rupee className={Styles.rupeeIcon} />
                <span>{currencyValue(props.discount)}</span>
              </div>
            )
          ) : null}
          {props.isCouponApplied ? (
            <div onClick={removeCoupon} className={Styles.removeButton}>
              REMOVE
            </div>
          ) : !props.showLoginFooter ? (
            <div
              ref={node =>
                setViewportReference(
                  node,
                  { threshold: 1 },
                  triggerLoginShownEvent
                )
              }
            >
              <Button
                pl={4}
                pr={4}
                pb={4}
                pt={4}
                className={Styles.couponButton}
                variant="outlined"
                onClick={applyCoupon}
              >
                {props.isPotentialCoupon
                  ? '+ADD ITEM'
                  : isLoggedIn()
                  ? 'APPLY COUPON'
                  : 'Login To Avail'}
              </Button>
            </div>
          ) : null}
        </div>
        {showExpiry && props.isCouponApplied ? (
          <div>
            <div className={Styles.couponExpiryBlock}>
              <div className={Styles.couponExpiryContainer}>
                <span className={Styles.couponExpiryText}>Expiring in</span>
                <Timer
                  hours={expiryData.hours}
                  minutes={expiryData.minutes}
                  seconds={expiryData.seconds}
                  className={Styles.couponExpiryTimer}
                  stopCallback={timerCallBack}
                />
              </div>
            </div>
          </div>
        ) : timerExpired ? (
          <div className={Styles.couponExpiryContainer}>
            <span className={Styles.couponExpiredText}>Coupon Expired</span>
          </div>
        ) : null}
      </div>
    </>
  );
};

const CouponDetails = React.memo(
  ({
    coupons = [],
    applyCouponWithCode,
    removeWithCouponCode,
    showLoginFooter,
    isPotentialCoupon
  }) => {
    const isCouponApplied = coupon => coupon?.status === 'SUCCESS';

    const discount = coupon =>
      coupon?.discountUnits?.reduce(
        (totalDiscount, discount) => discount?.value + totalDiscount,
        0
      );

    const expiryData = minBy(coupons, coupon => coupon.expiry);

    return (
      <div className={Styles.couponDetailContainer}>
        {coupons?.map(coupon => {
          if (coupon == null) return;
          return (
            <CouponDetail
              code={coupon.code}
              description={coupon.description}
              isCouponApplied={isCouponApplied(coupon)}
              discount={discount(coupon)}
              expiry={coupon.expiry}
              type={coupon.type}
              applyCoupon={applyCouponWithCode}
              removeCoupon={removeWithCouponCode}
              showLoginFooter={showLoginFooter}
              showExpiry={coupon.code === expiryData?.code}
              isPotentialCoupon={isPotentialCoupon}
              message={coupon.message}
              benefit={coupon.benefit}
              tagLink={coupon.tagLink}
            />
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) =>
    isEqual(
      prevProps?.coupons?.map(coupon => coupon?.code),
      nextProps?.coupons?.map(coupon => coupon?.code)
    ) &&
    isEqual(
      prevProps?.coupons?.map(coupon => coupon?.status),
      nextProps?.coupons?.map(coupon => coupon?.status)
    ) &&
    isEqual(
      prevProps?.coupons?.map(coupon =>
        coupon?.discountUnits?.reduce(
          (totalDiscount, discount) => discount?.value + totalDiscount,
          0
        )
      ),
      nextProps?.coupons?.map(coupon =>
        coupon?.discountUnits?.reduce(
          (totalDiscount, discount) => discount?.value + totalDiscount,
          0
        )
      )
    )
);

const CouponFooter = React.memo(({ totalDiscount, showLoginFooter }) => {
  const redirectToLogin = useCallback(() => {
    triggerEvent('AUTO_APPLY_LOGIN_CLICKED');
    setTimeout(() => SHELL.redirectTo('/login?referer=/checkout/cart'), 0);
  }, []);

  return totalDiscount && totalDiscount !== 0 ? (
    <div className={Styles.totalSavingsContainer}>
      <span>Total Savings </span>
      <Rupee className={Styles.rupeeIcon} />
      <span>{currencyValue(totalDiscount)}</span>
    </div>
  ) : showLoginFooter ? (
    <div className={Styles.couponButtonFooter}>
      <Button
        ml={4}
        width={'96%'}
        variant="outlined_secondary"
        onClick={redirectToLogin}
      >
        {'Login To Avail'}
      </Button>
    </div>
  ) : null;
});

const CouponList = props => {
  const listCount = getKVPairValue('COUPON_AWARENESS_LIST')?.threshold || 3;
  let coupons = [...props.appliedCoupons, ...props.applicableCoupons].slice(
    0,
    listCount
  );
  let isPotentialCoupon = false;

  if (isFeatureEnabled('COUPON_NUDGES')) {
    isPotentialCoupon = coupons?.length === 0 ? true : false;
    coupons =
      coupons?.length === 0
        ? (props.potentialCoupons || []).slice(0, 1)
        : coupons;
  }

  const totalDiscount =
    props.appliedCoupons &&
    props.appliedCoupons.length > 1 &&
    flatten(props.appliedCoupons.map(coupon => coupon.discountUnits))?.reduce(
      (totalDiscount, discount) => discount.value + totalDiscount,
      0
    );

  const showLoginFooter = !isLoggedIn() && props.applicableCoupons.length > 1;

  return (
    <CouponsHandler
      cartId={props.cartId}
      showNotification={true}
      coupons={props.appliedCoupons}
      applicableCoupons={props.applicableCoupons}
      handleCartAction={props.handleCartAction}
      inCartPage
      render={({ applyCouponWithCode, removeWithCouponCode }) => {
        return (
          <>
            <CouponsListHeader couponsCount={coupons.length} />
            <CouponDetails
              coupons={coupons}
              isPotentialCoupon={isPotentialCoupon}
              applyCouponWithCode={applyCouponWithCode}
              removeWithCouponCode={removeWithCouponCode}
              showLoginFooter={showLoginFooter}
            />
            <CouponFooter
              totalDiscount={totalDiscount}
              showLoginFooter={showLoginFooter}
            />
          </>
        );
      }}
      {...props}
    />
  );
};

export default CheckoutConsumerHOC(CouponList);
