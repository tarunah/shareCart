import React from 'react';

import Styles from './canceledOrderModal.base.css';

import Modal from 'commonComp/Modal';
import { setCookie } from 'commonBrowserUtils/Helper';
import { cookieKeys } from 'commonUtils/constants';
import CartConstants from 'commonBrowserUtils/CartConstants';

const CanceledOrderModal = props => {
  const { mode, toggle } = props;
  const isMobile = mode === 'mobile';
  const cancelIconConfig = { show: true, className: Styles.cancelIcon };
  return (
    <Modal
      className={`${
        isMobile ? Styles.modalContainer : Styles.desktopContainer
      }`}
      halfCard={isMobile}
      cancelCallback={() => {
        setCookie(
          cookieKeys.CART_CANCEL_ORDER_MODAL,
          'true',
          CartConstants.CART_CANCEL_ORDER_MODAL_EXPIRY
        );
        toggle();
      }}
      cancelIconConfig={cancelIconConfig}
    >
      <div className={Styles.modalHeading}>Order Cancelled</div>
      <div className={Styles.modalDesc}>
        <span>
          Your order got cancelled. If the amount was debited from your account,
          it will be refunded automatically within 72 hours. For any query, you
          can
        </span>
        <a href="/contactus" className={Styles.contactUS}>
          {' '}
          Contact Us.
        </a>
        <div className={Styles.modalSubDesc}>
          We have added items back to your Bag. You can place you order again
          from Bag.
        </div>
      </div>
    </Modal>
  );
};

export default CanceledOrderModal;
