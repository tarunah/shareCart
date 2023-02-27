import React from 'react';
import get from 'lodash/get';

import useModal from 'customHooks/useModal';
import { currencyValue } from 'commonBrowserUtils/Helper';
import { PAYMENT_PENDING } from 'commonBrowserUtils/Strings';
import Buttons from 'commonComp/InlineButtonV3';
import ImageBanner from 'commonComp/ImageBanner';
import Modal from 'commonComp/Modal';

import ConveniencePay from '../../ConveniencePay';
import { onClickTriggerEvent } from '../index';
import Styles from '../cardComponents.base.css';

const OrderPlacedAsPOD = props => {
  const [isModalOpen, toggleModal] = useModal(false);
  const orderData = get(props, 'dataState.data.bountyOrder');
  return (
    <div
      data-testid="orderPlacedAsPOD"
      className={`${props.styleClass} ${Styles.statusCardContainer} ${
        props.mode === 'desktop' ? Styles.desktopStatusCardContainer : ''
      }`}
    >
      <ImageBanner name="payment-pending" className={Styles.confirmTick} />
      <div
        className={`${Styles.statusCardHeading} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardHeading : ''
        }`}
      >
        {PAYMENT_PENDING.title}
        <span className={Styles.highlightText}>
          {PAYMENT_PENDING.highlightText}
        </span>
      </div>
      <div className={Styles.statusCardNote}>
        <ImageBanner name="exclamation-circle" className={Styles.infoIcon} />
        {PAYMENT_PENDING.pendingText}
        <div className={Styles.amountPayble}>
          ₹
          {currencyValue(
            get(
              props,
              'dataState.data.bountyOrder.payments.aggregateOrderAmount'
            ) / 100
          )}
        </div>
      </div>
      <Buttons
        containerClassName={`${Styles.orderActionButtons} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardButtons : ''
        }`}
        buttons={[
          {
            text: 'CANCEL ORDER',
            type: 'secondary',
            clickHandler: () =>
              props.actionHandlers.toggleConfirmationModal(
                props.getModalContent('OrderPlacedAsPOD_Cancel')
              )
          },
          {
            text: 'RETRY PAYMENT',
            clickHandler: props.actionHandlers.retryPayment
          }
        ]}
      />

      <div className={`${Styles.subcardDesc} ${Styles.seeHowSection}`}>
        <span>{PAYMENT_PENDING.text}</span>
        <span
          className={Styles.seeHow}
          onClick={() => {
            onClickTriggerEvent('DOPE_PAYMENT_FAILED_SEE_HOW_CLICK', orderData);
            toggleModal();
          }}
        >
          {PAYMENT_PENDING.seeHow}
        </span>
        {isModalOpen && (
          <Modal
            cancelCallback={toggleModal}
            className={
              props.mode === 'desktop'
                ? Styles.desktopModal
                : Styles.mobileModal
            }
            cancelIconConfig={{ show: true }}
          >
            <ConveniencePay />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default OrderPlacedAsPOD;
