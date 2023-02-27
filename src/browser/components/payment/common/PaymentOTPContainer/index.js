import React from 'react';
import pick from 'lodash/pick';

import config from '../../../../../config';

import { OTPSection } from './paymentOTPComponents';

import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import { getXMetaApp, setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import { getQueryParam } from 'commonUtils/helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const boundFns = [
  'resendOtp',
  'setLoader',
  'onPaymentFormSubmit',
  'showCancelConfirmation',
  'stayOnPage',
  'cancelPayment',
  'onBankRedirect',
  'setPaymentFormRef',
  'setBankRedirectFormRef'
];

class PaymentOTPContainer extends React.Component {
  constructor() {
    super();
    this.state = { otp: '', loading: false, cancelConfirmationShown: false };

    this.queryParams = {
      amount: getQueryParam({ name: 'amount' }),
      transactionId: getQueryParam({ name: 'transactionId' }),
      instrumentType: getQueryParam({ name: 'type' })
    };

    boundFns.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const { history, deviceMode } = this.props;

    deviceMode === 'mobile'
      ? setDocTitleInMobile('PAYMENT', {
          hideStepNumber: isFeatureEnabled('CHECKOUT_STEPS_MWEB')
        })
      : SHELL.setActivePage('PAYMENT');

    triggerEvent('PAYMENT_OTP_LOAD');

    history.push({
      path: history.location.path,
      search: history.location.search
    });
    window.addEventListener('popstate', this.showCancelConfirmation);
  }

  showCancelConfirmation() {
    this.setState({
      cancelConfirmationShown: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.showCancelConfirmation);
  }

  resendOtp(successCallback, errorCallback) {
    const {
      queryParams: { transactionId, instrumentType }
    } = this;

    triggerEvent('PAYMENT_OTP_RESEND');
    PaymentsManager.resendPaymentOTP(
      { transactionId, instrumentType },
      res => successCallback(res),
      errorCallback
    );
  }

  setLoader(loadingState) {
    this.setState({ loading: loadingState });
  }

  setPaymentFormRef(node) {
    this.paymentForm = node;
  }

  setBankRedirectFormRef(node) {
    this.bankRedirectForm = node;
  }

  onPaymentFormSubmit(otp) {
    this.setLoader(true);
    triggerEvent('PAYMENT_OTP_SUBMIT');
    this.setState({ otp }, () => {
      this.paymentForm.submit();
    });
  }

  onBankRedirect() {
    this.setLoader(true);
    triggerEvent('PAYMENT_OTP_BANK_REDIRECT');
    this.bankRedirectForm.submit();
  }

  stayOnPage() {
    const { history } = this.props;

    history.push({
      path: history.location.path,
      search: history.location.search
    });
    this.setState({
      cancelConfirmationShown: false
    });
  }

  cancelPayment() {
    this.props.history.go(-2);
  }

  render() {
    const {
      state,
      props: { deviceMode, styles },
      queryParams
    } = this;

    return (
      <OTPSection
        styles={styles}
        state={state}
        params={{
          ...queryParams,
          deviceMode,
          xMetaApp: getXMetaApp(),
          paymentFormURL: `${config('ppsClient').clientUrl}v2/verifyPayment`,
          redirectBankFormURL: `${
            config('ppsClient').clientUrl
          }v2/getBankRedirectTemplate/${queryParams.instrumentType}/${
            queryParams.transactionId
          }`
        }}
        actionHandlers={pick(this, boundFns)}
      />
    );
  }
}

export default PaymentOTPContainer;
