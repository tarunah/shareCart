import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { AmountPayable, ScanContainer } from './otpScannerComponents';
import getContextConfig from './contextConfig';

import { errorNotification } from 'commonBrowserUtils/Helper';

const boundFns = [
  'setOtpValue',
  'stopTimer',
  'setInputRef',
  'onResendClick',
  'onResendSuccess',
  'onResendError',
  'submitWithOTP'
];

class OTPScanner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      otpValue: '',
      timer: true,
      resendDisabled: true,
      resendAttempts: -1,
      payEnabled: false
    };

    boundFns.forEach(method => (this[method] = this[method].bind(this)));
    this.contextConfig = getContextConfig(props)[props.context];
  }

  componentDidMount() {
    this.otpField = document.getElementById('otpField');
    if (this.otpField) {
      this.otpField.addEventListener('keydown', e => {
        const code = e.keyCode || e.charCode;
        const char = String.fromCharCode(code);
        if (!/^\d+$/.test(char) && code !== 8) {
          // 8 is for backspace
          e.preventDefault();
        }
      });

      this.otpField.focus && this.otpField.focus();
    }
  }

  setOtpValue(e) {
    const otpValue = e.currentTarget.value || '';

    this.setState({
      otpValue,
      payEnabled: otpValue.length >= 4
    });
  }

  stopTimer() {
    this.setState({
      timer: false,
      resendDisabled: false
    });
  }

  setInputRef(node) {
    this.inputField = node;
  }

  onResendClick() {
    this.props.setLoader(true);
    this.props.resendOtp(this.onResendSuccess, this.onResendError);
  }

  onResendSuccess(res) {
    this.props.setLoader(false);
    if (res.code) {
      errorNotification();
    } else if (Number(res.attemptsLeft) === 0) {
      this.setState({ resendAttempts: 0, resendDisabled: true });
    } else {
      this.setState({
        timer: true,
        resendDisabled: true,
        resendAttempts: Number(res.attemptsLeft)
      });
    }
  }

  onResendError() {
    this.props.setLoader(false);
    errorNotification();
  }

  submitWithOTP() {
    const otpValue = this.state.otpValue || get(this, 'otpField.value');
    this.props.onSubmit(otpValue);
  }

  render() {
    const {
      props: { amount, deviceMode },
      state,
      contextConfig
    } = this;

    return (
      <div>
        {amount && <AmountPayable amount={amount} deviceMode={deviceMode} />}
        <ScanContainer
          {...state}
          {...pick(this, boundFns)}
          contextConfig={contextConfig}
          deviceMode={deviceMode}
        />
      </div>
    );
  }
}

OTPScanner.propTypes = {
  context: PropTypes.string,
  deviceMode: PropTypes.string,
  amount: PropTypes.string,
  resendOtp: PropTypes.func,
  setLoader: PropTypes.func,
  onSubmit: PropTypes.func
};

OTPScanner.defaultProps = {
  setLoader: () => {}
};

export default OTPScanner;
