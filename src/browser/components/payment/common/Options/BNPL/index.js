import React from 'react';
import get from 'lodash/get';

// Style Imports.
import Style from './bnpl.base.css';

import { BNPLCardUIContent } from './BNPLCardUI';
import PayNowHandler from '../../PayNowHandler';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isValidMobile, getProfileMobile } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const ERROR_MESSAGE_MAP = {
  EMPTY: 'Please enter a registered mobile number',
  INVALID: 'Please enter a valid 10 digit mobile number'
};

class BNPL extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobileValue: '',
      errorMessage: '',
      modalShow: false,
      modalSuccessCallback: null
    };

    [
      'setMobile',
      'displayInput',
      'submitCallback',
      'redirectToTNC',
      'onTNCSuccess',
      'hideTNCModal'
    ].forEach(method => (this[method] = this[method].bind(this)));
    this.props.updateBankDiscount(0);
  }

  componentDidMount() {
    const {
      instrumentData: { authenticationRequired },
      instrumentData
    } = this.props;
    const disable = instrumentData.disable;

    this.props.updateStickyButton({
      text: authenticationRequired && !disable ? 'VERIFY & PAY' : 'PLACE ORDER'
    });
  }

  componentWillUnmount() {
    this.props.updateStickyButton({
      text: 'PAY NOW'
    });
  }

  setMobile(e) {
    const value = e.target.value;
    this.setState({ mobileValue: value, errorMessage: '' });
  }

  showTNCModal(successCallback) {
    this.props.setLoader(false);
    this.setState({ modalShow: true, modalSuccessCallback: successCallback });
  }

  hideTNCModal() {
    this.setState({ modalShow: false, modalSuccessCallback: null });
  }

  getMobile() {
    return this.state.mobileValue || '';
  }

  redirectToTNC() {
    SHELL.redirectTo(`/checkout/payment/bnpl/tnc?mobile=${this.getMobile()}`);
  }

  isValidMobile() {
    const mobile = this.state.mobileValue;
    if (!isValidMobile(mobile)) {
      const isEmptyMobile = (mobile || '').length === 0;
      this.setState({
        errorMessage: isEmptyMobile
          ? ERROR_MESSAGE_MAP.EMPTY
          : ERROR_MESSAGE_MAP.INVALID
      });
      return false;
    }
    return true;
  }

  triggerSubmitEvent() {
    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: PaymentConstants.PAY_LATER,
          v2: PaymentConstants.PAY_LATER,
          v3: this.props.rank,
          v4: isFeatureEnabled('RECOMMENDED_OPTIONS')
        },
        widget_items: {
          data_set: {
            entity_name: 'payment_option',
            entity_id: 'payment_option'
          }
        }
      }
    });
  }

  submitCallback(done) {
    const {
      instrumentData: { tncAccepted },
      instrumentData,
      deviceMode
    } = this.props;

    if (this.displayInput(instrumentData) && !this.isValidMobile()) {
      this.props.setLoader(false);
      return;
    }

    if (tncAccepted) {
      this.triggerSubmitEvent();
      done();
      return;
    }

    deviceMode === 'mobile'
      ? this.redirectToTNC()
      : this.showTNCModal(() => {
          this.triggerSubmitEvent();
          done();
        });
  }

  onTNCSuccess() {
    this.props.setLoader(true);
    this.state.modalSuccessCallback();
  }

  displayInput() {
    const { loginType, status } = this.props.instrumentData;
    return status !== 'ACTIVE' && loginType === 'EMAIL';
  }

  getOptionUI() {
    const {
      instrumentData,
      outstandingAmount,
      deviceMode,
      payMode
    } = this.props;
    const { mobileValue, errorMessage, modalShow } = this.state;
    return (
      <div className={Style.mode}>
        {deviceMode !== 'mobile' && (
          <div className={Style.heading}>Flipkart Pay Later</div>
        )}
        <BNPLCardUIContent
          payMode={payMode}
          optionData={instrumentData}
          mobileValue={mobileValue}
          errorMessage={errorMessage}
          modalShow={modalShow}
          outstandingAmount={outstandingAmount}
          setMobile={this.setMobile}
          displayInput={this.displayInput}
          hideTNCModal={this.hideTNCModal}
          onTNCSuccess={this.onTNCSuccess}
        />
      </div>
    );
  }

  getModeAttributes() {
    return {
      userProfileMobile: this.getMobile(),
      paymentProviderId: 1
    };
  }

  render() {
    const {
      instrumentData: { authenticationRequired, paymentUrl },
      instrumentData,
      payMode,
      retrySessionEnabled
    } = this.props;
    const disable = instrumentData.disable;
    return !disable ? (
      <PayNowHandler
        {...this.props}
        paymentUrl={paymentUrl}
        paymentMode={PaymentConstants.PAY_LATER}
        paymentModeName={PaymentConstants.PAY_LATER}
        optionUI={this.getOptionUI()}
        actionData={{
          name: authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER',
          disable: payMode === 'retry' && !retrySessionEnabled
        }}
        submitCallback={this.submitCallback}
        modeAttributes={this.getModeAttributes()}
      />
    ) : (
      this.getOptionUI()
    );
  }
}

export default BNPL;
