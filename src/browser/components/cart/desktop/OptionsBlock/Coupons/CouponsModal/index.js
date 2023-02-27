import React from 'react';
import Styles from './couponsModal.base.css';

import CouponsHandler from '../../../../common/Coupons/CouponsHandler';
import { CouponsForm } from '../../../../common/Coupons/CouponsForm';

import Modal from 'commonComp/Modal';
import Loader from 'commonComp/Loader';
import defautlMAPayloadForWeb from '../../../../../../utils/maHelper';

export const CouponsUI = props => (
  <div className={Styles.modal}>
    <div className={Styles.couponsModalHeader}>APPLY COUPON</div>
    <Loader show={props.loading} backdrop={true} />
    <CouponsForm {...props} />
  </div>
);

export default class CouponsModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    triggerEvent('COUPON_SCREEN_LOAD', defautlMAPayloadForWeb);
  }

  render() {
    return (
      <Modal
        className={Styles.modalContainer}
        cancelCallback={this.props.cancelCallback}
        cancelIconConfig={{ show: true }}
      >
        {onCancel => (
          <CouponsHandler
            handleCartAction={this.props.handleCartAction}
            cartId={this.props.cartId}
            appliedCoupon={this.props.appliedCoupon}
            goBack={onCancel}
            render={({
              state,
              applyCoupon,
              setCouponCode,
              onCouponClick,
              onRetryAction,
              renderBannerFG
            }) => (
              <CouponsUI
                {...state}
                applyCoupon={applyCoupon}
                setCouponCode={setCouponCode}
                onCouponClick={onCouponClick}
                onRetryAction={onRetryAction}
                renderBannerFG={renderBannerFG}
                analytics={this.props.analytics}
              />
            )}
          />
        )}
      </Modal>
    );
  }
}
