import { numToWords, couponsNotificationTypes } from 'commonUtils/constants';
import { isMobile } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const getStyleOverrides = type => {
  return isMobile()
    ? type.indexOf('APPLY_ALL') === 0
      ? {
          notifyMainDiv: 'bottom: 105px;',
          notifyTextDiv:
            'width: auto;min-height:40px;font-size:14px;text-align:left;'
        }
      : {
          notifyMainDiv: 'bottom: 105px;',
          notifyTextDiv:
            'width: auto;min-height:40px;font-size:14px;text-align:justify;'
        }
    : type.indexOf('APPLY_ALL') === 0
    ? {
        notifyMainDiv: 'top: 78px;max-width:328px',
        notifyTextDiv: 'width: auto;font-size:14px;text-align:justify;'
      }
    : {
        notifyMainDiv: 'bottom: 26%;height:40px;max-width:320px;',
        notifyTextDiv:
          'width: auto;height:40px;font-size:14px;text-align:justify;'
      };
};

const CouponsShellNotification = (type, couponsDetails) => {
  let {
    name,
    successCouponsCount,
    expiredCouponsCount,
    couponDiscountValue
  } = couponsDetails;
  const styleOverrides = getStyleOverrides(type);
  const coupon = `${successCouponsCount > 1 ? 'coupons' : 'coupon'}`;

  let message = '';
  successCouponsCount =
    (numToWords[successCouponsCount] &&
      numToWords[successCouponsCount].toLowerCase()) ||
    successCouponsCount;
  expiredCouponsCount = numToWords[expiredCouponsCount] || expiredCouponsCount;

  const successCountMessage = `${successCouponsCount} ${coupon}`;

  switch (type) {
    case couponsNotificationTypes.TYPED_IN_COUPON:
      message = `<b> ${name.toUpperCase()} successfully applied </b>`;
      break;
    case couponsNotificationTypes.NEGATIVE_CART_VALUE:
      message =
        'Please unselect some coupons as the discount value is greater that cart value';
      break;
    case couponsNotificationTypes.APPLY_ALL_SUCCESS:
      message = `<b> Yay! You saved </b><span "style="font-size: 14px; font-weight: 400;">&#8377</span> ${couponDiscountValue} <b> with ${successCountMessage}. </b>`;
      break;
    case couponsNotificationTypes.APPLY_ALL_SUCCESS_EXPIRED:
      message = `<b>${expiredCouponsCount} of the coupons just got expired but you saved </b><span style="font-size: 14px; font-weight: 400;">&#8377</span> ${couponDiscountValue} <b> with ${successCountMessage}. </b>`;
      break;
    case couponsNotificationTypes.APPLY_ALL_EXPIRED:
      message = `<b>${expiredCouponsCount} of the coupons just got expired.</b>`;
      break;
    default:
      break;
  }

  const alertConfig = {
    message,
    styleOverrides
  };
  SHELL.alert('info', alertConfig);
};

export default CouponsShellNotification;
