import React from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import without from 'lodash/without';
import union from 'lodash/union';
import flatten from 'lodash/flatten';

// Utils
import {
  setCookie,
  getUidx,
  isMobile,
  getFullDateDiff,
  isLoggedIn
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  checkoutPage,
  cookieKeys,
  couponsNotificationTypes
} from 'commonUtils/constants';
import CouponsResponseHandler from './CouponsResponseHandler';
import CouponsShellNotification from './CouponsShellNotification';

const ERROR_MESSAGE = 'Something went wrong.';
const AGGREGATION_BANNER_COOKIE_EXPIRY = 3600 * 24 * 365 * 1000;
const DUPLICATE_COUPON_ERROR_MESSAGE = 'This coupon is already applied.';

class CouponsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retry: false,
      coupons: props.coupons || [],
      potentialCoupons: [],
      couponSelectionStatus: props.coupons
        ? props.coupons.reduce((couponSelection, coupon) => {
            couponSelection[coupon.code] = true;
            return couponSelection;
          }, {})
        : {},
      couponApplied: false,
      loading: true,
      appliedCoupon: '',
      couponInput: '',
      errorMessage: '',
      maximumSavings: 0,
      tagLink: ''
    };
    [
      'setCouponCode',
      'applyCoupon',
      'onCouponClick',
      'applyAndGetCoupons',
      'onApplyAllCouponsSuccess',
      'getCoupons',
      'applyAllCoupons',
      'getRetryAction',
      'applyCouponsErrorCallback',
      'applyAndGetSuccessCallBack',
      'getCouponsSuccessCallBack',
      'getCouponsErrorCallback',
      'applyCouponWithCode',
      'removeWithCouponCode'
    ].forEach(member => (this[member] = this[member].bind(this)));
    this.renderBannerFG = isFeatureEnabled('COUPON_AGGREGATION_BANNER');
  }

  componentDidMount() {
    if (!this.props.inCartPage) {
      this.getCoupons();
    }
  }

  handleAutoAppliedCoupons = () => {
    const type = 'APPLY_ALL_SUCCESS';
    const successCouponsCount = this.props.coupons?.filter(
      ({ status } = {}) => status === 'SUCCESS'
    ).length;
    const expiredCouponsCount = this.props.coupons?.filter(
      ({ status } = {}) => status === 'ERROR'
    ).length;
    const couponDiscountValue = flatten(
      this.props?.coupons.map(coupon => coupon.discountUnits)
    )?.reduce((totalDiscount, discount) => discount.value + totalDiscount, 0);
    CouponsShellNotification(couponsNotificationTypes[type], {
      successCouponsCount,
      expiredCouponsCount,
      couponDiscountValue
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const areCouponsUpdated = !isEqual(
      this.props.coupons?.map(coupon => coupon?.code),
      prevProps?.coupons?.map(coupon => coupon?.code)
    );
    if (areCouponsUpdated && this.props.coupons?.length > 0)
      this.handleAutoAppliedCoupons();
  }

  getCoupons() {
    this.inputField = document.getElementById('coupon-input-field');
    this.props.handleCartAction &&
      this.props.handleCartAction(
        'applyAndGetCoupons',
        [],
        this.getCouponsSuccessCallBack,
        this.getCouponsErrorCallback,
        { keepPreviousState: false },
        this.inputField ? { pagesource: checkoutPage.COUPONS } : {}
      );
  }

  getCouponsSuccessCallBack(res) {
    this.setState({ loading: false });
    if (res && res.coupons) {
      const getCouponsResponse = new CouponsResponseHandler(
        res,
        'getCoupons',
        ''
      );

      //checking for error from coupons side.
      if (getCouponsResponse.isCouponsError()) {
        this.getCouponsErrorCallback({}, getCouponsResponse);
      } else {
        const coupons = getCouponsResponse.getAllCoupons();
        const potentialCoupons = getCouponsResponse.getPotentialCoupons();
        const couponSelectionStatus = getCouponsResponse.getCouponSelectionStatus();
        const maximumSavings = getCouponsResponse.getMaximumSavings();
        this.setState({
          couponSelectionStatus,
          maximumSavings,
          coupons,
          potentialCoupons
        });
        triggerEvent('GET_COUPON_SUCCESS', {
          custom: {
            widget: {
              applicableCoupons: getCouponsResponse.getCouponDataWithFlag(
                'applicable'
              ),
              appliedCoupons: getCouponsResponse.getCouponDataWithFlag(
                'applied'
              ),
              notApplicableCoupons: [],
              potentialCoupons: getCouponsResponse.getCouponDataWithFlag(
                'potential'
              )
            }
          }
        });
      }
    } else {
      this.getCouponsErrorCallback();
    }
  }

  getCouponsErrorCallback(error = {}, couponsResponse) {
    let errorMessage = error.message || ERROR_MESSAGE;
    triggerEvent('GET_COUPON_ERROR', {
      gaLabel: errorMessage
    });
    if (couponsResponse) {
      this.onRetryAction = this.getRetryAction(couponsResponse.getType(), []);
      errorMessage = '';
    }
    this.setState({
      loading: false,
      errorMessage
    });
  }

  getRetryAction(callback, coupons) {
    const onRetryAction = e => {
      e.stopPropagation();
      this[callback](coupons);
      this.setState({ loading: true, retry: false });
    };
    this.setState({ coupons: [], maximumSavings: 0, retry: true });
    return onRetryAction;
  }

  applyAndGetCoupons(coupons = [], isCouponsPage = false) {
    this.props.handleCartAction(
      'applyAndGetCoupons',
      coupons,
      this.applyAndGetSuccessCallBack,
      err => this.applyCouponsErrorCallback(err, coupons),
      {},
      isCouponsPage ? { pagesource: checkoutPage.COUPONS } : {}
    );
  }

  applyAndGetSuccessCallBack(res) {
    this.setState({ loading: false });
    if (res && res.coupons) {
      let { errorMessage, couponInput, tagLink } = this.state;
      const applyAndGetResponse = new CouponsResponseHandler(
        res,
        'applyAndGetCoupons',
        couponInput
      );

      if (applyAndGetResponse.isCouponsError()) {
        this.applyCouponsErrorCallback({}, [], applyAndGetResponse);
      } else {
        const invalidOrExpiredInputCoupon = applyAndGetResponse.getInvalidOrExpiredInputCoupon();
        errorMessage =
          (invalidOrExpiredInputCoupon &&
            invalidOrExpiredInputCoupon.message) ||
          '';
        tagLink =
          (invalidOrExpiredInputCoupon &&
            invalidOrExpiredInputCoupon.showTagLink &&
            invalidOrExpiredInputCoupon.tagLink) ||
          '';

        invalidOrExpiredInputCoupon &&
          applyAndGetResponse.removeCoupon(invalidOrExpiredInputCoupon);

        applyAndGetResponse.isInputCouponSuccessful() &&
          CouponsShellNotification(couponsNotificationTypes.TYPED_IN_COUPON, {
            name: couponInput
          });
        couponInput = errorMessage ? couponInput : '';

        const coupons = applyAndGetResponse.getAllCoupons();
        const couponSelectionStatus = applyAndGetResponse.getCouponSelectionStatus();
        const maximumSavings = applyAndGetResponse.getMaximumSavings();

        this.setState({
          couponSelectionStatus,
          maximumSavings,
          errorMessage,
          couponInput,
          coupons,
          tagLink
        });
      }
    }
    this.triggerAnalyticsEvents(get(res, 'coupons', []));
  }

  applyCouponsErrorCallback(error = {}, coupons = [], couponsResponse) {
    const allCoupons = couponsResponse
      ? couponsResponse.getAllCoupons()
      : coupons;
    this.onRetryAction =
      couponsResponse &&
      this.getRetryAction(
        couponsResponse.getType(),
        couponsResponse.getRetryCouponsPayload()
      );
    const uidx = getUidx();
    const errorCoupons = allCoupons
      .filter(({ status }) => status === 'ERROR')
      .reduce(
        ({ code, message }, res) => [
          ...res,
          { code, message: message || error.message }
        ],
        []
      );
    const ga_object = { uidx, errorCoupons };
    triggerEvent('APPLY_COUPON_ERROR', {
      gaLabel: JSON.stringify(ga_object)
    });
    let errorMessage = '';
    !couponsResponse && (errorMessage = error.message || ERROR_MESSAGE);
    this.setState({
      loading: false,
      errorMessage
    });
    this.setInputToFocus();
  }

  componentWillUnmount() {
    isFeatureEnabled('COUPON_AGGREGATION_BANNER') &&
      setCookie(
        cookieKeys.COUPON_AGGREGATION_BANNER_VIEWED,
        true,
        AGGREGATION_BANNER_COOKIE_EXPIRY
      );
  }

  onCouponClick(code, callback) {
    this.setState(
      prevState => {
        let { maximumSavings } = prevState;
        const couponSelectionStatus = {
          ...prevState.couponSelectionStatus
        };
        const clickedCoupon = prevState.coupons.find(
          coupon => coupon.code === code
        );

        couponSelectionStatus[code] = !couponSelectionStatus[code];
        const discountValue = get(clickedCoupon, 'discountUnits[0]', {
          value: 0
        });
        if (couponSelectionStatus[code]) {
          maximumSavings += discountValue.value;
        } else {
          maximumSavings -= discountValue.value;
        }

        return {
          couponSelectionStatus,
          maximumSavings
        };
      },
      () => callback && callback()
    );
  }

  setCouponCode(event) {
    this.setState({
      couponInput: event.currentTarget.value,
      appliedCoupon: '',
      errorMessage: ''
    });
  }

  setInputToFocus() {
    isMobile()
      ? window.scroll(0, 0)
      : this.inputField && this.inputField.focus();
  }

  onApplyAllCouponsSuccess(res) {
    this.setState({ loading: false });
    if (res.coupons) {
      const applyAllCouponResponse = new CouponsResponseHandler(
        res,
        'applyAllCoupons'
      );
      if (applyAllCouponResponse.isCouponsError()) {
        this.applyCouponsErrorCallback({}, [], applyAllCouponResponse);
      } else {
        const {
          successCouponsCount,
          expiredCouponsCount,
          couponDiscountValue
        } = applyAllCouponResponse.getApplyAllNotificationData();

        if (successCouponsCount || expiredCouponsCount) {
          let type = 'APPLY_ALL';
          type += successCouponsCount !== 0 ? '_SUCCESS' : '';
          type += expiredCouponsCount !== 0 ? '_EXPIRED' : '';
          CouponsShellNotification(couponsNotificationTypes[type], {
            successCouponsCount,
            expiredCouponsCount,
            couponDiscountValue
          });
        }
        this.setState({
          couponApplied: true
        });
        this.props.goBack && this.props.goBack();
      }
    } else {
      this.applyCouponsErrorCallback();
    }
    this.triggerAnalyticsEvents(get(res, 'coupons', []));
  }

  triggerAnalyticsEvents(coupons) {
    const uidx = getUidx();
    const gaSuccessArray = coupons
      .filter(({ status }) => status === 'SUCCESS')
      .reduce(
        ({ code }, res) => [
          ...res,
          { code, type: this.state.couponInput ? 'typed' : 'selected' }
        ],
        []
      );
    const maxTime = getGrowthHackConfigValue('COUPON_EXPIRY').maximumTime;
    const maSuccessArray = coupons
      .filter(({ status }) => status === 'SUCCESS')
      .reduce((res, coupon) => {
        const expiryData = getFullDateDiff(coupon.expiry);
        const flag = !!(expiryData.days === 0 && expiryData.hours < maxTime);
        let couponData = {
          ...coupon,
          flag: flag,
          expiry_days: expiryData.days,
          expiry_hours: expiryData.hours,
          expiry_mins: expiryData.minutes,
          expiry_secs: expiryData.seconds,
          coupon_applicability: 'applied'
        };
        return [...res, couponData];
      }, []);

    const gaErrorArray = coupons
      .filter(({ status }) => status === 'ERROR')
      .reduce(
        ({ code, message }, res) => [...res, { code, error: message }],
        []
      );

    gaSuccessArray.length !== 0 &&
      triggerEvent('APPLY_COUPON_SUCCESS', {
        gaLabel: JSON.stringify({
          coupon: gaSuccessArray,
          uidx
        }),
        maData: {
          entity_type: 'apply coupon',
          entity_name: 'coupon',
          entity_id: maSuccessArray
        },
        custom: {
          widget: {
            name: 'Checkout-Apply-Coupon',
            type: 'Apply-Coupon'
          }
        }
      });
    gaErrorArray.length !== 0 &&
      triggerEvent('APPLY_COUPON_ERROR', {
        gaLabel: JSON.stringify({ uidx, errorCoupons: gaErrorArray })
      });
  }

  applyAllCoupons(coupons, isCouponsPage = false, successCallBack = () => {}) {
    this.props.handleCartAction(
      'applyAllCoupons',
      coupons,
      res => {
        this.onApplyAllCouponsSuccess(res);
        successCallBack();
      },
      err => this.applyCouponsErrorCallback(err, coupons),
      {},
      isCouponsPage ? { pagesource: checkoutPage.COUPONS } : {}
    );
  }

  checkForDuplicateCoupon(coupons, inputCoupon) {
    //first is the inputCoupon
    return !!coupons
      .slice(1)
      .find(({ code }) => code.toLowerCase() === inputCoupon.toLowerCase());
  }

  applyCoupon(e = {}) {
    triggerEvent('CLICK_APPLY_COUPON');
    let coupons = [];
    this.setState({ loading: true });
    const { couponSelectionStatus, couponInput } = this.state;
    const dataMethod =
      e.currentTarget && e.currentTarget.getAttribute('data-method');
    dataMethod === 'couponInputApply' &&
      coupons.push({
        code: couponInput,
        type: 'coupon'
      });

    for (const code in couponSelectionStatus) {
      if (couponSelectionStatus[code] === true) {
        coupons.push({
          code: code,
          type: 'coupon'
        });
      }
    }

    this.checkForDuplicateCoupon(coupons, couponInput)
      ? this.setState({
          errorMessage: DUPLICATE_COUPON_ERROR_MESSAGE,
          loading: false
        })
      : dataMethod === 'couponInputApply'
      ? /* This is required to differentiate between the calls made from the cart page and the coupons modal.
         Needed by the back end to handle user applied coupons vs auto applied coupons. */
        this.applyAndGetCoupons(coupons, true)
      : this.applyAllCoupons(coupons, true);
  }

  mapToCouponsRequest(code) {
    return { code, type: 'coupon' };
  }

  applyCouponWithCode(code, successCallBack = () => {}) {
    const { updateCheckoutState, interactedCoupons } = this.props;
    interactedCoupons &&
      updateCheckoutState({
        interactedCoupons: without(interactedCoupons, code)
      });
    triggerEvent(
      isFeatureEnabled('COUPON_NUDGES')
        ? 'COUPON_NUDGES_APPLY_CLICKED'
        : 'AUTO_APPLY_APPLY_CLICKED',
      {
        custom: {
          custom: { v1: code }
        }
      }
    );
    const coupons = union(
      this.props.coupons?.map(coupon => coupon?.code),
      [code]
    )?.map(this.mapToCouponsRequest);
    this.applyAllCoupons(coupons, false, successCallBack);
  }

  removeWithCouponCode(code) {
    const { updateCheckoutState, interactedCoupons } = this.props;
    updateCheckoutState({
      interactedCoupons: interactedCoupons
        ? [...interactedCoupons, code]
        : [code]
    });
    const coupons = without(
      this.props.coupons?.map(coupon => coupon?.code),
      code
    )?.map(this.mapToCouponsRequest);
    this.applyAndGetCoupons(coupons);
    triggerEvent(
      isFeatureEnabled('COUPON_NUDGES')
        ? 'COUPON_NUDGES_COUPON_REMOVE'
        : 'AUTO_APPLY_COUPON_REMOVE',
      {
        maData: {
          entity_type: isFeatureEnabled('COUPON_NUDGES')
            ? 'Cart - coupon_nudge_coupon_removed'
            : 'Cart - new_user_coupon_removed',
          entity_name: 'coupon'
        },
        custom: {
          custom: { v1: code }
        }
      }
    );
  }

  render() {
    const {
      state,
      applyCoupon,
      setCouponCode,
      onCouponClick,
      onRetryAction,
      renderBannerFG,
      applyCouponWithCode,
      removeWithCouponCode
    } = this;
    return this.props.render({
      state,
      applyCoupon,
      setCouponCode,
      onCouponClick,
      onRetryAction,
      renderBannerFG,
      applyCouponWithCode,
      removeWithCouponCode
    });
  }
}

export default CouponsContainer;
