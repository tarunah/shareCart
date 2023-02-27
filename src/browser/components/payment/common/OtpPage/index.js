import React from 'react';

import Styles from './otpPage.base.css';

import { getXMetaApp } from 'commonBrowserUtils/Helper';

import config from '../../../../../config';

import OTPScanner from 'commonComp/OtpScanner';
import Loader from 'commonComp/Loader';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';

import { getQueryParam } from 'commonUtils/helper';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

class OtpPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { otp: '', loading: false };

    this.queryParams = {
      mobile: getQueryParam({ name: 'mobile' }),
      transactionId: getQueryParam({ name: 'transactionId' }),
      instrumentType: getQueryParam({ name: 'type' })
    };

    ['resendOtp', 'setLoader', 'onFormSubmit', 'setFormRef'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    const { deviceMode } = this.props;
    deviceMode === 'mobile'
      ? setDocTitleInMobile('PAYMENT', {
          hideStepNumber: isFeatureEnabled('CHECKOUT_STEPS_MWEB')
        })
      : SHELL.setActivePage('PAYMENT');
  }

  resendOtp(successCallback, errorCallback) {
    PaymentsManager.resendBNPLOTP(
      this.queryParams.transactionId,
      res => successCallback(res),
      errorCallback
    );
  }

  setLoader(loadingState) {
    this.setState({ loading: loadingState });
  }

  setFormRef(node) {
    this.form = node;
  }

  onFormSubmit(otp) {
    this.setLoader(true);
    this.setState({ otp }, () => {
      this.form.submit();
    });
  }

  render() {
    const {
      state: { loading, otp },
      props: { deviceMode },
      resendOtp,
      onFormSubmit,
      setLoader,
      setFormRef,
      queryParams: { transactionId, instrumentType, mobile }
    } = this;
    return (
      <div className={Styles.pageBackground}>
        <div className={Styles.container}>
          <Loader show={loading} backdrop={true} />
          <form
            method="POST"
            action={`${config('ppsClient').clientUrl}v2/verifyPayment`}
            ref={setFormRef}
            className={Styles.form}
          >
            <input type="hidden" name="transactionId" value={transactionId} />
            <input type="hidden" name="otp" value={otp} />
            <input type="hidden" name="instrumentType" value={instrumentType} />
            <input type="hidden" name="xMetaApp" value={getXMetaApp()} />
            <OTPScanner
              context="bnpl"
              deviceMode={deviceMode}
              resendOtp={resendOtp}
              mobileNumber={mobile}
              setLoader={setLoader}
              onSubmit={onFormSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default OtpPage;
