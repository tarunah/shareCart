import React from 'react';
import get from 'lodash/get';

import Timer from '../../payment/common/Timer';
import Button from 'commonComp/Button';
import ImageBanner from 'commonComp/ImageBanner';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './otpScannerComponents.base.css';

import Rupee from 'iconComp/Rupee.jsx';

const AmountPayable = ({ amount, deviceMode }) => (
  <div
    className={`${Styles.amountPayable} ${
      deviceMode !== 'mobile' ? Styles.amountPayableDesktop : ''
    }`}
  >
    <span>Amount Payable:</span>
    <Rupee className={Styles.rupeeIcon} />
    <span className={Styles.amountValue}>{amount}</span>
  </div>
);

const ResendOTP = ({ resendAttempts, onClick }) => (
  <div>
    <div className={`${Styles.otpScannerButton} resendOTP`} onClick={onClick}>
      Resend OTP
    </div>
    {resendAttempts > 0 ? (
      <div className={Styles.resendAttemptsText}>
        ({resendAttempts} {resendAttempts === 1 ? 'attempt' : 'attempts'} left)
      </div>
    ) : null}
  </div>
);

const PartnerText = ({ contextConfig, deviceMode }) => (
  <div
    className={`${Styles.partnerTextBlock} ${
      deviceMode === 'mobile'
        ? Styles.partnerTextBlockMobile
        : Styles.partnerTextBlockDesktop
    }`}
  >
    <ImageBanner name="secureNew" className={Styles.secureIcon} />
    <div className={Styles.partnerTextContent}>{contextConfig.partnerText}</div>
  </div>
);

class ScanContainer extends React.PureComponent {
  render() {
    const {
      props: {
        deviceMode,
        contextConfig,
        setInputRef,
        setOtpValue,
        otpValue,
        payEnabled,
        submitWithOTP,
        timer,
        stopTimer,
        resendDisabled,
        resendAttempts,
        onResendClick
      }
    } = this;

    const timerStart = getKVPairValue('OTP_TIMER_START');

    return (
      <div
        className={`${Styles.scanContainer} ${
          deviceMode === 'mobile'
            ? Styles.mobileScanContainer
            : Styles.desktopScanContainer
        }`}
      >
        {contextConfig.otpImage && (
          <div className={Styles.otpImage}>
            <ImageBanner name="otp" />
          </div>
        )}
        <div className={Styles.scanBlock}>
          <div className={Styles.otpScannerHeading}>
            Enter One Time Password (OTP)
          </div>
          <div className={Styles.otpScannerDesc}>{contextConfig.desc}</div>
          <div>
            <input
              id="otpField"
              className={`${Styles.otpInput} cod-input-numpad`}
              placeholder="Enter OTP here"
              type="tel"
              maxLength={contextConfig.otpInputMaxLength}
              autoComplete="off"
              align="right"
              ref={setInputRef}
              onChange={setOtpValue}
              value={otpValue || get(this, 'otpField.value') || ''}
            />
          </div>
          <Button
            onClick={payEnabled ? submitWithOTP : null}
            className={`${Styles.sendButton} ${
              !payEnabled ? Styles.disabled : ''
            }`}
          >
            {contextConfig.buttonText}
          </Button>
          {timer ? (
            <div className={Styles.timerBlock}>
              <span>Resend OTP in </span>
              <Timer
                seconds={timerStart.seconds}
                minutes={timerStart.minutes}
                stopCallback={stopTimer}
              />
            </div>
          ) : null}
          {!resendDisabled ? (
            <ResendOTP
              resendAttempts={resendAttempts}
              onClick={onResendClick}
            />
          ) : null}
          {resendAttempts === 0 ? (
            <div className={Styles.resendAllAttemptsText}>
              You have used all Resend OTP attempts.
            </div>
          ) : null}
          {contextConfig.partnerText && (
            <PartnerText
              contextConfig={contextConfig}
              deviceMode={deviceMode}
            />
          )}
        </div>
      </div>
    );
  }
}

export { AmountPayable, ScanContainer };
