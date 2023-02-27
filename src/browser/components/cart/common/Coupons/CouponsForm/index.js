import React from 'react';
import Styles from './couponsForm.base.css';

import get from 'lodash/get';

import Coupon from '../Coupon';
import ImageBanner from 'commonComp/ImageBanner';
import Button from 'vision/components/Button';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { isMobile, currencyValue } from 'commonBrowserUtils/Helper';
import { isValidUrl } from 'commonUtils/helper';
import ChevronRight from 'iconComp/ChevronRight.jsx';

import Loader from 'commonComp/Loader';

import RupeeBold from 'iconComp/RupeeBold.jsx';

const CouponBanner = () => {
  return (
    <div className={`${Styles.bannerContainer} ${Styles.floatLeft}`}>
      <ImageBanner name="couponform-banner" className={Styles.bannerSprite} />
      <div className={Styles.bannerContent}>
        <div className={Styles.boldContent}>
          Our coupons just got bigger and better
        </div>
        <div className={Styles.message}>
          Now you can apply{' '}
          <span className={Styles.bold}> more than one coupon </span> to your
          bag and save more!
        </div>
      </div>
    </div>
  );
};

const RetryComponent = props => {
  const { onRetryAction } = props;
  return (
    <div className={Styles.retryMainContainer}>
      <div className={Styles.retryTextContainer}>
        Oops! something went wrong.
      </div>
      <div className={Styles.notifyActionDiv}>
        <button onClick={onRetryAction} className={Styles.retryButton}>
          RETRY
        </button>
      </div>
    </div>
  );
};

const DisplayCoupon = props => {
  const couponType = props.couponType;
  const analytics = props.analytics;
  const coupons =
    couponType === 'potentialCoupons' ? props.potentialCoupons : props.coupons;
  const isApplicableCouponEmpty = props.coupons.length === 0;
  return (
    <div>
      {couponType === 'potentialCoupons' && coupons.length > 0 && (
        <div className={Styles.potentialCouponSectionHeader}>
          <span className={Styles.moreOffers}>
            {props.couponContainerHeader}
          </span>
        </div>
      )}
      {Array.isArray(coupons) && coupons.length !== 0
        ? coupons.map(coupon => (
            <Coupon
              key={coupon.code}
              analytics={analytics}
              expiry={coupon.expiry}
              code={coupon.code}
              onCouponClick={
                couponType === 'potentialCoupons' ? '' : props.onCouponClick
              }
              benefitAmount={
                couponType === 'potentialCoupons'
                  ? coupon.benefit
                  : (
                      (get(coupon, 'discountUnits') || []).find(
                        obj => get(obj, 'unit') === 'RUPEE'
                      ) || {}
                    ).value || 0
              }
              description={coupon.description}
              errorMessage={coupon.status === 'ERROR' ? coupon.message : ''}
              selectedCoupon={
                couponType === 'potentialCoupons'
                  ? ''
                  : props.couponSelectionStatus[coupon.code]
              }
              link={couponType === 'potentialCoupons' ? coupon.tagLink : ''}
              message={couponType === 'potentialCoupons' ? coupon.message : ''}
              isApplicableCouponEmpty={isApplicableCouponEmpty}
            />
          ))
        : props.retry && <RetryComponent onRetryAction={props.onRetryAction} />}
    </div>
  );
};

export const CouponFormInput = props => {
  const enableInputField = props.couponInput.trim() !== '';
  const tagLink = props.tagLink;
  const isValidLink = isValidUrl(tagLink);
  const isDesktop = !isMobile();
  return (
    <div
      className={`${Styles.applyCouponContainer} ${
        props.errorMessage && isDesktop ? Styles.errorPadding : ''
      }`}
    >
      <div className={Styles.formContainer}>
        <div
          className={`${Styles.textInputContainer} ${
            props.errorMessage ? Styles.textInputError : ''
          } ${enableInputField ? Styles.enabledTextInput : ''}`}
        >
          <input
            id="coupon-input-field"
            className={Styles.textInput}
            placeholder="Enter coupon code"
            onChange={props.setCouponCode}
            value={props.couponInput}
          />
          <div
            className={`${Styles.applyButton} ${
              enableInputField ? Styles.enabled : ''
            }`}
            onClick={enableInputField ? props.applyCoupon : undefined}
            data-method="couponInputApply"
          >
            CHECK
          </div>
        </div>
        {props.errorMessage && (
          <React.Fragment>
            <div className={Styles.errorMessage}>{props.errorMessage}</div>
            {isFeatureEnabled('VIEW_RELEVANT_PRODUCT') && isValidLink && (
              <a href={tagLink} className={Styles.viewApplicable}>
                VIEW APPLICABLE PRODUCTS
                <ChevronRight className={Styles.arrowIcon} />
              </a>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export const CouponsForm = props => {
  const {
    setCouponCode,
    couponInput,
    errorMessage,
    applyCoupon,
    loading,
    coupons,
    potentialCoupons,
    maximumSavings,
    renderBannerFG,
    tagLink
  } = props;
  const couponContainerHeader =
    coupons.length <= 0 ? 'UNLOCK COUPONS' : 'UNLOCK MORE COUPONS';
  return (
    <div className={Styles.couponsPageContainer}>
      <div className={Styles.scroll}>
        {renderBannerFG ? <CouponBanner /> : null}
        <CouponFormInput
          setCouponCode={setCouponCode}
          couponInput={couponInput}
          errorMessage={errorMessage}
          applyCoupon={applyCoupon}
          tagLink={tagLink}
        />

        <div className={Styles.couponsContainer}>
          {isFeatureEnabled('BAG_COUPON_CARD') && loading ? (
            <div className={Styles.loaderContainer}>
              <Loader show={loading} className={Styles.loaderInContainer} />
            </div>
          ) : (
            <div>
              <DisplayCoupon
                couponType="coupons"
                couponContainerHeader={couponContainerHeader}
                {...props}
              />
              <DisplayCoupon
                couponType="potentialCoupons"
                couponContainerHeader={couponContainerHeader}
                {...props}
              />
              {!loading &&
                coupons.length <= 0 &&
                potentialCoupons.length <= 0 && (
                  <div className={Styles.noCouponMessage}>
                    No other coupons available
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
      <div className={Styles.stickyButton}>
        <div className={Styles.savingsMessage}>
          <div className={Styles.message}>Maximum savings:</div>
          <div className={Styles.price}>
            <RupeeBold className={Styles.boldRupeeIcon} />
            {currencyValue(maximumSavings)}
          </div>
        </div>
        <Button
          variant="contained"
          id="applyCoupon"
          width="60%"
          letterSpacing="1px"
          onClick={applyCoupon}
          data-method="couponFormApply"
        >
          APPLY
        </Button>
      </div>
    </div>
  );
};
