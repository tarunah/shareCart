import React from 'react';

import Modal from 'commonComp/Modal';
import Buttons from 'commonComp/InlineButtonV3';

import Styles from './retrySessionExpiryModal.base.css';

import TimerIcon from 'iconComp/Timer.jsx';

const buttons = [
  {
    className: Styles.retryButton,
    text: 'RETRY PAYMENT',
    clickHandler: () => window.location.reload()
  }
];

const RetrySessionExpiryModal = ({ show, mode }) => {
  return show ? (
    <Modal
      className={`${Styles.modalContainer} ${
        mode === 'desktop' ? Styles.modalContainerDesktop : ''
      }`}
      halfCard={mode === 'mobile'}
      disableBackdropClick={true}
      cancelIconConfig={{ show: false }}
      closeOnBack={false}
    >
      <div>
        <TimerIcon className={Styles.timerIcon} />
        <div className={Styles.modalHeader}>Session Expired</div>
        <div className={Styles.modalDesc}>
          Payment could not be completed within alloted time. You can retry and
          make the payment.
        </div>
        <Buttons buttons={buttons} />
      </div>
    </Modal>
  ) : null;
};

export default RetrySessionExpiryModal;
