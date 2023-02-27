import React from 'react';
import get from 'lodash/get';

import Styles from './coupons.base.css';

import AttachProducts from '../../../common/AttachedCoupons';
import Loader from 'commonComp/Loader';
import Loadable from 'commonComp/Loadable';
import Button from 'vision/components/Button';

import {
  currencyValue,
  isLoggedIn,
  errorNotification
} from 'commonBrowserUtils/Helper';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import Strings from 'commonBrowserUtils/Strings';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Rupee from 'iconComp/Rupee.jsx';
import CouponIcon from 'iconComp/Coupons.jsx';

const CouponsModal = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "cartOptions",
      webpackPrefetch: true */
      './CouponsModal'
    ),
  loading: (props = {}) => <Loader show={true} backdrop={true} {...props} />,
  errorCallback: () => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
});

class Coupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.showModal = this.showModal.bind(this);
    this.removeCoupon = this.removeCoupon.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showCouponMessage = this.showCouponMessage.bind(this);
  }

  showModal() {
    const { selectedProductsCount } = this.props;
    if (selectedProductsCount === 0) {
      const styleOverrides = getSnackBarStyleOverrides('desktop');
      SHELL.alert('info', {
        styleOverrides,
        message: 'Select at least one item in bag to apply coupons. '
      });
    } else {
      this.setState({ showModal: true });
    }
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  removeCoupon() {
    triggerEvent('CLICK_REMOVE_COUPON');
    const { appliedCoupon, handleCartAction } = this.props;
    handleCartAction('removeCoupon', [{ code: appliedCoupon, type: 'coupon' }]);
  }

  showCouponMessage() {
    const disabledCouponMessage = getKVPairValue('DISABLED_COUPON_MESSAGE');
    const refererUrl = '/login?referer=/checkout/cart';
    const eventName = 'COUPON_LOGINCTA_CLICK';
    if (this.props.discount) {
      return (
        <div className={Styles.discountMessage}>
          <span>You saved additional </span>
          <Rupee className={Styles.rupeeIcon} />
          <span>{currencyValue(this.props.discount)}</span>
        </div>
      );
    } else if (this.props.disable) {
      return (
        <div className={Styles.disabledCouponMessage}>
          {disabledCouponMessage}
        </div>
      );
    } else if (!isLoggedIn()) {
      const message = get(
        getKVPairValue('LOGIN_NUDGE_COUPON'),
        'message',
        ''
      ).replace('Login', '');
      const price = get(getKVPairValue('LOGIN_NUDGE_COUPON'), 'price', '0');
      const priceText = `\u20B9${price}`;
      return (
        <div className={Styles.couponMessage}>
          <a
            href={refererUrl}
            className={Styles.logIn}
            onClick={() => triggerEvent(eventName)}
          >
            Login
          </a>
          <span>{message.replace('{0}', priceText)}</span>
        </div>
      );
    }
  }

  render() {
    const {
      discount,
      attachedProductOffers,
      analytics,
      isExchangeCart
    } = this.props;
    const isAttachedProductAvailable =
      ((get(attachedProductOffers, 'appliedOffers') || []).length > 0 ||
        (get(attachedProductOffers, 'applicableOffers') || []).length > 0) &&
      isFeatureEnabled('ATTACHED_PRODUCTS') &&
      !isExchangeCart;
    const couponSectionHeading = isAttachedProductAvailable
      ? 'OFFERS & COUPONS'
      : 'Coupons';
    return (
      <div>
        <div className={Styles.header}>{couponSectionHeading}</div>
        <AttachProducts
          mode="desktop"
          attachedProductOffers={attachedProductOffers}
          analytics={analytics}
          isExchangeCart={isExchangeCart}
        />
        <div className={Styles.content}>
          <CouponIcon className={Styles.couponIcon} />
          <div className={`${Styles.label} ${discount ? Styles.applied : ''}`}>
            {discount
              ? `${this.props.count} Coupon${
                  this.props.count > 1 ? 's' : ''
                } applied`
              : 'Apply Coupons'}
          </div>
          {!this.props.disable && (
            <Button
              variant="outlined"
              fontSize="body3"
              position="absolute"
              top={0}
              right={0}
              pt={2}
              pb={2}
              onClick={this.showModal}
            >
              {discount ? 'EDIT' : 'APPLY'}
            </Button>
          )}
          {this.showCouponMessage()}
        </div>
        {this.state.showModal && (
          <CouponsModal
            cancelCallback={this.hideModal}
            handleCartAction={this.props.handleCartAction}
            appliedCoupon={this.props.appliedCoupon}
            cartId={this.props.cartId}
            analytics={this.props.analytics}
          />
        )}
      </div>
    );
  }
}

export default Coupons;
