import React from 'react';

import get from 'lodash/get';
import { onClickTriggerEvent } from '../index';
import useModal from 'customHooks/useModal';
import Styles from '../cardComponents.base.css';
import Modal from 'commonComp/Modal';
import ConveniencePay from '../../ConveniencePay';

const PaymentPendingNote = props => {
  const [isModalOpen, toggleModal] = useModal(false);
  const orderData = get(props, 'dataState.data.bountyOrder');
  return (
    <div
      data-testid="paymentPendingNote"
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      }`}
    >
      <div className={`${Styles.subcardHeading} ${Styles.noteHeading}`}>
        Please Note
      </div>
      <div className={Styles.subcardDesc}>
        <span>
          If your payment fails, your order will be placed as pay on delivery.
          You can pay online using Pay Now option from orders or you can pay at
          the time of delivery through cash or UPI app.
        </span>
        <span
          className={Styles.seeHow}
          onClick={() => {
            onClickTriggerEvent(
              'DOPE_PAYMENT_PENDING_SEE_HOW_CLICK',
              orderData
            );
            toggleModal();
          }}
        >
          See How
        </span>
      </div>
      {isModalOpen && (
        <Modal
          cancelCallback={toggleModal}
          className={
            props.mode === 'desktop' ? Styles.desktopModal : Styles.mobileModal
          }
          cancelIconConfig={{ show: true }}
        >
          <ConveniencePay />
        </Modal>
      )}
    </div>
  );
};

export default PaymentPendingNote;
