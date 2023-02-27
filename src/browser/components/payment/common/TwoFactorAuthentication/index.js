import React from 'react';
import PropTypes from 'prop-types';

import loadComponent from 'commonUtils/loadComponent';

const TwoFAScreen = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "twoFaScreen" */
      './components/TwoFAScreen'
    ),
  loaderProperties: { backdrop: false }
});

const boundFuncs = ['selectNumber', 'setScreen'];

class TwoFactorAuthentication extends React.Component {
  constructor(props) {
    super(props);

    const { numbers, email } = props;
    const screen =
      numbers.length > 1
        ? 'mobileOtp'
        : email && !numbers.length
        ? 'emailOtp'
        : 'otpScanner';

    this.state = {
      selectedNumber: numbers.length === 1 ? numbers[0] : '',
      screen
    };

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    this.props.payMode === 'retry' && this.props.disableRetryTimer();
    triggerEvent('SHOW_TWOFA', {
      maData: {
        entity_type: 'Myntra_2FA_Payments_Page',
        entity_name: 'Myntra_2FA_Payments_Page'
      },
      custom: {
        widget_items: {
          data_set: {
            data: {
              entity_type: 'Myntra_2FA_Payments_Page',
              entity_name: '2FA Pop up Shown'
            }
          }
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.payMode === 'retry' && this.props.enableRetryTimer();
  }

  selectNumber(e) {
    triggerEvent('TWOFA_SELECT_NUMBER');
    const id = e.currentTarget.id;
    this.setState({
      selectedNumber: id.slice(4) // trimming 'otp-'
    });
  }

  setScreen(e) {
    e.stopPropagation();

    const {
      state: { screen }
    } = this;
    let nextScreen;

    if (screen === 'mobileOtp' || screen === 'emailOtp') {
      nextScreen = 'otpScanner';
    } else {
      nextScreen = 'mobileOtp';
    }

    this.setState({
      screen: nextScreen
    });
  }

  render() {
    const { state, selectNumber, setScreen, props } = this;
    return (
      <TwoFAScreen
        {...state}
        {...props}
        selectNumber={selectNumber}
        setScreen={setScreen}
      />
    );
  }
}

TwoFactorAuthentication.propTypes = {
  numbers: PropTypes.array,
  email: PropTypes.string,
  mode: PropTypes.string,
  close: PropTypes.func,
  handlePaymentAction: PropTypes.func,
  submit: PropTypes.func
};

export default TwoFactorAuthentication;
