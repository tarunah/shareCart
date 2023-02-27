import React from 'react';

import OTPScanner from 'commonComp/OtpScanner';
import Loader from 'commonComp/Loader';
import Modal from 'commonComp/Modal';
import Button from 'commonComp/ButtonV2';

import commonStyles from './paymentOTPComponents.base.css';
import ChevronRight from 'iconComp/ChevronRight.jsx';

const OTPSection = ({
  styles,
  state: { loading, otp, cancelConfirmationShown },
  params: {
    paymentFormURL,
    redirectBankFormURL,
    transactionId,
    instrumentType,
    xMetaApp,
    deviceMode,
    amount
  },
  actionHandlers: {
    setPaymentFormRef,
    setBankRedirectFormRef,
    onBankRedirect,
    resendOtp,
    setLoader,
    onPaymentFormSubmit,
    stayOnPage,
    cancelPayment
  }
}) => {
  styles = { ...styles, ...commonStyles };
  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <Loader show={loading} backdrop={true} />
        <form
          method="POST"
          action={paymentFormURL}
          id="paymentForm"
          ref={setPaymentFormRef}
        >
          <input type="hidden" name="transactionId" value={transactionId} />
          <input type="hidden" name="otp" value={otp} />
          <input type="hidden" name="instrumentType" value={instrumentType} />
          <input type="hidden" name="xMetaApp" value={xMetaApp} />
          <OTPScanner
            context="paymentOTP"
            deviceMode={deviceMode}
            amount={amount}
            resendOtp={resendOtp}
            setLoader={setLoader}
            onSubmit={onPaymentFormSubmit}
          />
        </form>
        <RedirectToBank
          styles={styles}
          url={redirectBankFormURL}
          setRef={setBankRedirectFormRef}
          onClick={onBankRedirect}
        />
      </div>
      {cancelConfirmationShown ? (
        <CancelConfirmation
          styles={styles}
          stayOnPage={stayOnPage}
          cancelPayment={cancelPayment}
        />
      ) : null}
    </div>
  );
};

const CancelConfirmation = ({ styles, stayOnPage, cancelPayment }) => (
  <Modal cancelCallback={stayOnPage} className={styles.cancelConfirmModal}>
    {onCancel => (
      <div>
        <div className={styles.cancelConfirmModalHeader}>Cancel Payment?</div>
        <div className={styles.cancelConfirmModalDesc}>
          Are you sure you want to cancel payment?
        </div>
        <div className={styles.cancelConfirmModalButtonGroup}>
          <Button
            text="STAY HERE"
            onClick={onCancel}
            containerClassname={styles.displayInlineBlock}
            classname={`${styles.cancelConfirmModalButton} ${styles.firstButton}`}
          />
          <Button
            text="CANCEL PAYMENT"
            onClick={cancelPayment}
            containerClassname={styles.displayInlineBlock}
            classname={styles.cancelConfirmModalButton}
          />
        </div>
      </div>
    )}
  </Modal>
);

const RedirectToBank = ({ styles, url, setRef, onClick }) => (
  <div>
    <div className={styles.separator}>
      <span className={styles.separatorLine}>-------------------------</span>
      <span>OR</span>
      <span className={styles.separatorLine}>-------------------------</span>
    </div>
    <form method="GET" action={url} id="bankRedirectForm" ref={setRef}>
      <div className={styles.redirectToBank} onClick={onClick}>
        <div className={styles.bankRedirectHeading}>
          Continue payment on bank's website.
        </div>
        <div className={styles.bankRedirectDesc}>
          You will be redirected to bank OTP page.
        </div>
        <ChevronRight className={styles.redirectIcon} />
      </div>
    </form>
  </div>
);

export { OTPSection };
