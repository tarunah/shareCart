import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import PayNowHandler from '../../PayNowHandler';
import CodErrorBlock from './CodErrorBlock';
import { CodCardUIContent } from './CodCardUI';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isTwoFAEnabled } from 'commonBrowserUtils/PaymentHelper';
import Strings from 'commonBrowserUtils/Strings';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Style from './cod.base.css';

const boundFuncs = [
  'submitCallback',
  'setCaptchaRef',
  'setCaptchaDetails',
  'getModeAttributes'
];

class Cod extends React.Component {
  constructor(props) {
    super(props);

    const twoFAEnabled = isTwoFAEnabled(props);

    this.state = {
      errorMessage: '',
      twoFAEnabled,
      captchaEnabled: isFeatureEnabled('COD_CAPTCHA_ENABLED') && !twoFAEnabled,
      captchaDetails: {
        id: null,
        code: null
      }
    };
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.props.updateBankDiscount(0);
  }

  componentDidMount() {
    this.props.updateStickyButton({ text: 'PLACE ORDER' });
  }

  componentWillUnmount() {
    this.props.updateStickyButton({ text: 'PAY NOW' });
  }

  static getDerivedStateFromProps(props) {
    const twoFAEnabled = isTwoFAEnabled(props);
    return {
      twoFAEnabled,
      captchaEnabled: isFeatureEnabled('COD_CAPTCHA_ENABLED') && !twoFAEnabled
    };
  }

  triggerSubmitEvent() {
    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: PaymentConstants.COD,
          v2: PaymentConstants.COD,
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
    if (this.state.captchaEnabled) {
      this.captchaComp.submitWithCaptcha(() => {
        this.triggerSubmitEvent();
        done();
      });
    } else {
      this.triggerSubmitEvent();
      done();
    }
  }

  setCaptchaRef(node) {
    this.captchaComp = node;
  }

  setCaptchaDetails(data, done = () => {}) {
    this.setState(
      {
        captchaDetails: data
      },
      () => {
        this.props.setLoader(false);
        done();
      }
    );
  }

  getOptionUI() {
    const {
      props: { setLoader, deviceMode, errorAttribute },
      state: { errorMessage, captchaEnabled },
      setCaptchaRef
    } = this;
    const codSectionHeading =
      get(getKVPairValue('COD_HELP_TEXT'), 'heading') ||
      get(Strings, 'COD_SECTION_HEADING');
    return (
      <div>
        {deviceMode !== 'mobile' && (
          <div
            className={captchaEnabled ? Style.heading : Style.alternateHeading}
          >
            {codSectionHeading}
          </div>
        )}
        <CodCardUIContent
          errorAttribute={errorAttribute}
          errorMessage={errorMessage}
          captchaEnabled={captchaEnabled}
          setCaptchaRef={setCaptchaRef}
          setLoader={setLoader}
          setCaptchaDetails={this.setCaptchaDetails}
        />
      </div>
    );
  }

  getModeAttributes() {
    const { captchaDetails = {} } = this.state;
    return {
      captchaId: get(captchaDetails, 'id', ''),
      codCaptcha: get(captchaDetails, 'code', '')
    };
  }

  render() {
    const {
      instrumentData: {
        code,
        paymentInstrumentDetails,
        paymentInstrumentDetails: { paymentUrl }
      },
      payMode,
      retrySessionEnabled,
      updateStickyButton
    } = this.props;
    return code === PaymentConstants.INSTRUMENT_ELIGIBLE_CODE ? (
      <PayNowHandler
        {...this.props}
        paymentUrl={paymentUrl}
        optionUI={this.getOptionUI()}
        paymentMode={PaymentConstants.COD}
        paymentModeName={PaymentConstants.COD}
        submitCallback={this.submitCallback}
        actionData={{
          name: 'PLACE ORDER',
          className: Style.actionButton,
          disable: payMode === 'retry' && !retrySessionEnabled
        }}
        paymentInstrument={PaymentConstants.COD}
        modeAttributes={this.getModeAttributes()}
      />
    ) : (
      <CodErrorBlock
        code={code}
        paymentInstrumentDetails={paymentInstrumentDetails}
        updateStickyButton={updateStickyButton}
      />
    );
  }
}

Cod.defaultProps = {
  updateStickyButton: () => {}
};

Cod.propTypes = {
  deviceMode: PropTypes.string,
  cartData: PropTypes.object,
  updateStickyButton: PropTypes.func,
  handlePaymentAction: PropTypes.func
};

export default Cod;
