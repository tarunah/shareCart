import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { getFullDateDiff } from 'commonBrowserUtils/Helper';

class CouponsResponseHandler {
  constructor(res, type, couponInput) {
    this.discounts = (res.price || {}).discounts;
    this.type = type;
    this.appliedCoupons = res.coupons || [];
    this.applicableCoupons = res.applicableCoupons || [];
    this.couponInput = couponInput;
    this.potentialCoupons = res.potentialCoupons || [];
    this.attachedProductOfferAmount = (
      res.attachedProductOffers || {}
    ).totalOfferAmount;
  }

  getType() {
    return this.type;
  }

  getInvalidOrExpiredInputCoupon() {
    const { appliedCoupons, couponInput } = this;
    //Checks for the error in the coupon code entered by the user and returns the coupon if it is invalid or expired or
    //the respones has oops something went wrong for the userEntered Coupon.
    //Invalid and expired coupons have statusCode as 0
    //StatusCode is undefined for older cart response.
    this.invalidCoupon = appliedCoupons.find(
      coupon =>
        coupon.code.toLowerCase() === couponInput.toLowerCase() &&
        coupon.status === 'ERROR' &&
        (coupon.statusCode === 0 || coupon.statusCode === undefined)
    );
    return this.invalidCoupon;
  }

  getAllCoupons() {
    const { applicableCoupons, appliedCoupons } = this;
    return [...appliedCoupons, ...applicableCoupons];
  }

  getPotentialCoupons() {
    const { potentialCoupons } = this;
    return potentialCoupons;
  }

  getDiscountValue() {
    const { discounts } = this;
    const couponDiscount =
      discounts.data.find(field => field.name === 'coupon') || {};
    return couponDiscount.value;
  }

  getApplyAllNotificationData() {
    const coupons = this.getAllCoupons();
    let couponDiscountValue = this.getDiscountValue();
    //deducting attached product offer from total coupon discount to show toast message
    if (this.attachedProductOfferAmount) {
      couponDiscountValue -= this.attachedProductOfferAmount;
    }
    const successCouponsCount = coupons.filter(
      ({ status }) => status === 'SUCCESS'
    ).length;
    const expiredCouponsCount = coupons.filter(
      // expired and invalid coupons has statusCode 0, since this is the final applyCall, we send only valid coupons
      // so only the expired coupons has statusCode 0 in this scenario.
      ({ status, statusCode }) => status === 'ERROR' && statusCode === 0
    ).length;

    return {
      successCouponsCount,
      expiredCouponsCount,
      couponDiscountValue
    };
  }

  removeCoupon(coupon) {
    const { appliedCoupons } = this;
    //Filters out the user entered coupon
    this.appliedCoupons = appliedCoupons.filter(
      appliedCoupon =>
        appliedCoupon.code.toLowerCase() !== coupon.code.toLowerCase()
    );
  }

  isPreSelected(status) {
    //Applied coupons don't have status and successfully applied coupons have status as SUCCESS
    //All the coupon which don't have error can be preselected
    return !status || status === 'SUCCESS';
  }

  checkForTimeOut(statusCode) {
    // 999999 is for timedout coupons and 888888 is returned when coupons response status is error
    return statusCode === 999999 || statusCode === 888888;
  }

  getCouponSelectionStatus() {
    const { isPreSelected } = this;
    const coupons = this.getAllCoupons();
    const couponSelectionStatus = {};
    coupons.forEach(({ status, code }) => {
      couponSelectionStatus[code] = isPreSelected(status);
    });
    return couponSelectionStatus;
  }

  getApplicableCoupons() {
    return this.applicableCoupons;
  }

  getCouponDataWithFlag(couponType = 'applicable') {
    let couponArray;
    switch (couponType) {
      case 'potential':
        couponArray = this.potentialCoupons;
        break;
      case 'applied':
        couponArray = this.appliedCoupons;
        break;
      default:
        couponArray = this.applicableCoupons;
        break;
    }

    const maxTime = getGrowthHackConfigValue('COUPON_EXPIRY').maximumTime;
    const coupons = couponArray.reduce((res, coupon) => {
      const expiryData = getFullDateDiff(coupon.expiry);
      let flag = !!(expiryData.days === 0 && expiryData.hours < maxTime);
      flag =
        couponType === 'potential'
          ? flag && this.applicableCoupons.length === 0
          : flag;
      let couponData = {
        ...coupon,
        flag: flag,
        expiry_days: expiryData.days,
        expiry_hours: expiryData.hours,
        expiry_mins: expiryData.minutes,
        expiry_secs: expiryData.seconds,
        coupon_applicability: couponType
      };
      return [...res, couponData];
    }, []);
    return coupons;
  }

  getMaximumSavings() {
    const { isPreSelected } = this;
    const coupons = this.getAllCoupons();
    let maximumSavings = 0;
    coupons.forEach(({ status, discountUnits = [] }) => {
      if (isPreSelected(status)) {
        maximumSavings += discountUnits[0]?.value;
      }
    });
    return maximumSavings;
  }

  isCouponsError() {
    const { checkForTimeOut } = this;
    const coupons = this.getAllCoupons();
    return coupons.find(({ statusCode }) => checkForTimeOut(statusCode))
      ? true
      : false;
  }

  getRetryCouponsPayload() {
    return this.appliedCoupons.reduce(
      (payloadArray, { code }) => [...payloadArray, { code, type: 'coupon' }],
      []
    );
  }

  isInputCouponSuccessful() {
    const { couponInput, appliedCoupons } = this;
    const inputCoupon =
      appliedCoupons.find(
        coupon => coupon.code.toLowerCase() === couponInput.toLowerCase()
      ) || {};
    return inputCoupon.status === 'SUCCESS';
  }
}

export default CouponsResponseHandler;
