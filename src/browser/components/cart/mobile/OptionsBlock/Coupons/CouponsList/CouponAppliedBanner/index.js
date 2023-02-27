import Style from './animationModal.base.css';
import React from 'react';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import { COUPON_DISCOUNT_MODAL } from 'commonBrowserUtils/Strings';

const discountImgUrl =
  'https://constant.myntassets.com/checkout/assets/img/couponDiscount.webp';

const CouponAppliedBanner = React.memo(props => {
  const { code, discount } = props;
  return (
    <>
      <div className={Style.backgroundModal}>
        <div className={Style.topContainer}>
          <div className={Style.couponApplied}>
            '{code}' {COUPON_DISCOUNT_MODAL.applied}
          </div>
          <img src={discountImgUrl} className={Style.pngStyle} />
          <div className={Style.congratulationsText}>
            {COUPON_DISCOUNT_MODAL.congratulationsText}
          </div>
          <div className={Style.savedText}>
            {COUPON_DISCOUNT_MODAL.savedText}{' '}
            <span className={Style.discountFontColor}>
              {COUPON_DISCOUNT_MODAL.extraText}
            </span>
            <RupeeBold style={{ height: 15, width: 15, fill: '#03a685' }} />
            <span className={Style.discountValueStyle}>{discount}</span>
          </div>
        </div>
        <div className={Style.buttonContainer}>
          <div className={Style.buttonStyle}>
            <span className={Style.buttonText}>
              {COUPON_DISCOUNT_MODAL.boxText}
            </span>
          </div>
        </div>
      </div>
    </>
  );
});

export default CouponAppliedBanner;
