import React from 'react';

import Styles from './couponsPage.base.css';

import CouponsHandler from '../../../../common/Coupons/CouponsHandler';
import { CouponsForm } from '../../../../common/Coupons/CouponsForm';

import Loader from 'commonComp/Loader';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import defautlMAPayloadForWeb from '../../../../../../utils/maHelper';

export class CouponsUI extends React.PureComponent {
  componentDidMount() {
    triggerEvent('COUPON_SCREEN_LOAD', defautlMAPayloadForWeb);
    setDocTitleInMobile('COUPONS');
  }

  render() {
    return (
      <div>
        <Loader show={this.props.loading} backdrop={true} />
        <div className={Styles.container}>
          <CouponsForm {...this.props} />
        </div>
      </div>
    );
  }
}

const CouponsPage = props => {
  const { id: cartId, coupons = [] } = props.data || {};
  const appliedCoupon = (
    coupons.find(
      coupon => coupon.type === 'coupon' && coupon.status === 'SUCCESS'
    ) || {}
  ).code;
  return (
    <CouponsHandler
      cartId={cartId}
      showNotification={true}
      appliedCoupon={appliedCoupon}
      handleCartAction={props.handleCartAction}
      goBack={props.goBack}
      render={({
        state,
        setCouponCode,
        applyCoupon,
        onCouponClick,
        onRetryAction,
        renderBannerFG
      }) => (
        <CouponsUI
          {...state}
          setCouponCode={setCouponCode}
          applyCoupon={applyCoupon}
          goBack={props.goBack}
          cartId={cartId}
          onCouponClick={onCouponClick}
          onRetryAction={onRetryAction}
          renderBannerFG={renderBannerFG}
          analytics={props.analytics}
        />
      )}
    />
  );
};

export default CouponsPage;
