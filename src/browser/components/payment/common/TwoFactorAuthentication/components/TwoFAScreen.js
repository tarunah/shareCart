import React from 'react';
import Modal from 'commonComp/Modal';

import Styles from '../twoFactorAuthComponents.base.css';

import {
  OTPScanner,
  MobileOTPScreen,
  EmailOTPScreen
} from '../TwoFactorAuthComponents';

const screenConfig = {
  mobileOtp: MobileOTPScreen,
  emailOtp: EmailOTPScreen,
  otpScanner: OTPScanner
};

const TwoFAScreen = ({ screen, close, mode, ...restProps }) => {
  const Screen = screenConfig[screen];
  return (
    <Modal
      id={'twoFactorAuthModal'}
      className={`${Styles.modal} ${
        mode === 'mobile' ? Styles.mobileModal : Styles.desktopModal
      }`}
      show={!restProps.showSaveCardConsent}
      cancelCallback={close}
      halfCard={mode === 'mobile'}
      enableBackButton={restProps.payMode !== 'retry'}
      cancelIconConfig={{ show: true, className: Styles.headerClose }}
    >
      <Screen {...restProps} />
    </Modal>
  );
};

export default TwoFAScreen;
