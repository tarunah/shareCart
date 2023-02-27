import React from 'react';
import get from 'lodash/get';

import Button from 'commonComp/Button';
import ImageBanner from 'commonComp/ImageBanner';
import Timer from '../Timer';

import { AndroidBridgeHelper } from 'commonBrowserUtils/JSBridgeHelper';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './twoFactorAuthComponents.base.css';
import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInActive from 'iconComp/RadioInactive.jsx';

const MobileOTPScreen = ({
  email,
  numbers,
  selectedNumber,
  selectNumber,
  setScreen
}) => (
  <div>
    <div className={Styles.otpVerifHeader}>OTP Verification required</div>
    <div className={Styles.otpVerifDesc}>
      Select a mobile number to send OTP. You will also receive OTP on your
      registered email id: <span className={Styles.bold}>{email}</span>
    </div>
    <div className={Styles.mobileNumbers}>
      {numbers.map(number => {
        const SVGIcon =
          number === selectedNumber ? (
            <RadioActive
              className={`${Styles.radioButton} ${Styles.selectedButton}`}
            />
          ) : (
            <RadioInActive className={Styles.radioButton} />
          );
        return (
          <div
            id={`otp-${number}`}
            data-testid="number"
            className={`${Styles.number} ${
              number === selectedNumber ? Styles.selectedNumber : ''
            }`}
            onClick={selectNumber}
            key={number}
          >
            {SVGIcon}
            <span className={Styles.radioText}>+91</span>
            <span className={Styles.radioText}>{number}</span>
          </div>
        );
      })}
    </div>
    <Button
      className={`${Styles.sendButton} ${
        !selectedNumber ? Styles.disabled : ''
      }`}
      onClick={setScreen}
    >
      SEND OTP
    </Button>
  </div>
);

const EmailOTPScreen = ({ email, setScreen }) => (
  <div>
    <div className={Styles.otpVerifHeader}>OTP Verification required</div>
    <div
      className={Styles.otpVerifDesc}
    >{`You will receive the OTP on your registered email id: ${email}`}</div>
    <Button className={Styles.sendButton} onClick={setScreen}>
      SEND OTP
    </Button>
  </div>
);

class OTPScanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      otpValue: '',
      error: null,
      timer: false,
      resendDisabled: true
    };

    [
      'setOtpValue',
      'sendOtp',
      'resendOtp',
      'stopTimer',
      'submitWithOTP',
      'setInputRef',
      'onChangeButton'
    ].forEach(method => (this[method] = this[method].bind(this)));

    this.otpAutofill = AndroidBridgeHelper.autofillEnabled();
  }

  componentDidMount() {
    this.otpField = document.getElementById('otpField');
    this.otpField &&
      this.otpField.addEventListener('keypress', e => {
        const code = e.keyCode || e.charCode;
        const char = String.fromCharCode(code);
        if (!/^\d+$/.test(char) && code !== 8) {
          // 8 is for backspace
          e.preventDefault();
        }
      });

    AndroidBridgeHelper.startSmsReceiver("document.getElementById('otpField')");
    this.sendOtp();
  }

  componentWillUnmount() {
    AndroidBridgeHelper.stopSmsReceiver();
  }

  sendOtp(resend) {
    this.inputField && this.inputField.focus();
    resend ? triggerEvent('TWOFA_OTP_RESENT') : triggerEvent('TWOFA_OTP_SENT');
    //get addressId from stampedAddress
    const {
      selectedNumber,
      paymentModes,
      orderAddressId,
      unifiedAddressId
    } = this.props;
    this.setState(
      {
        otpValue: ''
      },
      () => {
        this.props.handlePaymentAction(
          'requestOTPGateway',
          {
            mobileNo: `${selectedNumber}`,
            paymentMethods: paymentModes,
            addressId: orderAddressId,
            unifiedId: unifiedAddressId
          },
          {},
          () => {
            triggerEvent('TWOFA_OTP_SUCCESS');
            this.setState({
              timer: true,
              resendDisabled: true,
              error: ''
            });
          },
          () => {
            triggerEvent('TWOFA_OTP_FAIL');
            this.setState({
              error: 'Failed to send OTP',
              resendDisabled: false
            });
          }
        );
      }
    );
  }

  resendOtp() {
    if (!this.state.resendDisabled) {
      this.sendOtp(true);
    }
  }

  setOtpValue(e) {
    this.setState({
      otpValue: e.currentTarget.value
    });
  }

  stopTimer() {
    this.setState({
      timer: false,
      resendDisabled: false
    });
  }

  submitWithOTP() {
    const otpValue = this.state.otpValue || get(this, 'otpField.value') || '';
    if (otpValue.length !== 4) {
      this.setState({
        error: 'Please enter valid OTP'
      });
    } else {
      this.props.submit({
        otp: otpValue
      });
    }
  }

  setInputRef(node) {
    this.inputField = node;
  }

  onChangeButton(e) {
    this.props.setScreen(e);
    triggerEvent('TWOFA_CHANGE_NUMBER');
  }

  render() {
    const {
      props: { selectedNumber, email, numbers },
      state: { otpValue, timer, error, resendDisabled },
      setOtpValue,
      resendOtp,
      stopTimer,
      otpAutofill,
      submitWithOTP,
      setInputRef,
      onChangeButton
    } = this;

    const timerStart = getKVPairValue('OTP_TIMER_START');
    return (
      <div
        data-testid="otpScannerContainer"
        className={Styles.otpScannerContainer}
      >
        <ImageBanner name="otp" />
        <div className={Styles.otpScannerHeading}>ENTER OTP</div>
        <div className={Styles.otpScannerDesc}>
          {selectedNumber
            ? `OTP sent to mobile number +91-${selectedNumber}`
            : `OTP sent to registered email ${email}`}
        </div>
        <input
          id="otpField"
          data-testid="otpField"
          className={`${Styles.otpInput} cod-input-numpad`}
          type="tel"
          maxLength="4"
          ref={setInputRef}
          onChange={setOtpValue}
          value={otpValue || get(this, 'otpField.value') || ''}
        />
        {error ? <div className={Styles.error}>{error}</div> : null}
        {timer ? (
          <div data-testid="twoFAtimerBlock" className={Styles.timerBlock}>
            <span>Resend OTP in </span>
            <Timer
              seconds={timerStart.seconds}
              minutes={timerStart.minutes}
              stopCallback={stopTimer}
            />
          </div>
        ) : numbers.length > 1 ? (
          <div
            className={`${Styles.otpScannerButton} changeNumber`}
            onClick={onChangeButton}
          >
            CHANGE NUMBER
          </div>
        ) : null}
        <div
          className={`${Styles.otpScannerButton} ${
            resendDisabled ? Styles.disabled : ''
          } resendOTP`}
          onClick={resendOtp}
        >
          RESEND OTP
        </div>
        <Button className={Styles.sendButton} onClick={submitWithOTP}>
          SUBMIT
        </Button>
      </div>
    );
  }
}

export { OTPScanner, MobileOTPScreen, EmailOTPScreen };
