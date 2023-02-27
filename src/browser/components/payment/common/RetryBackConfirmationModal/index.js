import React from 'react';

import Modal from 'commonComp/Modal';
import Buttons from 'commonComp/InlineButtonV3';

import Styles from './retryBackConfirmationModal.base.css';

const RetryBackConfirmationModal = ({ mode, show, stayHere, tryLater }) => {
  return show ? (
    <Modal
      className={
        mode === 'mobile'
          ? Styles.mobileModalContainer
          : Styles.desktopModalContainer
      }
      halfCard={mode === 'mobile'}
      cancelCallback={stayHere}
      goBackOnClose={true}
      cancelIconConfig={{ show: true }}
    >
      {onCancel => (
        <div>
          <div className={Styles.modalHeader}>Don't want to pay now ?</div>
          <div className={Styles.modalDesc}>
            {`No worries, you can pay online using PayNow option from orders, till the order is out for delivery or you can pay at the time of delivery through Cash/UPI.`}
          </div>
          <Buttons
            buttons={[
              {
                text: 'I WILL TRY LATER',
                type: 'secondary',
                clickHandler: tryLater
              },
              {
                text: 'STAY HERE',
                clickHandler: onCancel
              }
            ]}
          />
        </div>
      )}
    </Modal>
  ) : null;
};

export default RetryBackConfirmationModal;
