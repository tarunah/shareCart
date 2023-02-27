import React from 'react';
import get from 'lodash/get';

import Styles from './tncPage.base.css';

import Loader from 'commonComp/Loader';

import PayNowHandler from '../../../PayNowHandler';
import TNCIframe from '../TNCIframe';

import { getQueryParam } from 'commonUtils/helper';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const { PAY_LATER } = PaymentConstants;

class TNC extends React.PureComponent {
  constructor(props) {
    super(props);

    const context = getQueryParam({ name: 'context' });

    const { payLaterInstrumentData, rank } = this.getPayLaterData(context);

    this.payLaterInstrumentData = payLaterInstrumentData;
    this.rank = rank;

    const BNPLInstrumentData = (
      get(payLaterInstrumentData, 'paymentInstrumentDetails.data') || []
    ).find(paymentType => paymentType.id === 1);
    this.tncUrl = BNPLInstrumentData.tncUrl;

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.setLoader(false);
  }

  getPayLaterData(context) {
    let rank;
    const path =
      context === 'recommended'
        ? 'props.paymentOptions.recommendedPaymentInstrumentDetails'
        : 'props.paymentOptions.paymentInstrumentDetails';

    const payLaterInstrumentData = get(this, path, []).find((info, index) => {
      if (info.type === PAY_LATER) {
        rank = index + 1;
        return true;
      } else return false;
    });

    return { payLaterInstrumentData, rank };
  }

  submitForm() {
    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: PAY_LATER,
          v2: PAY_LATER,
          v3: this.rank,
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

    this.props.setLoader(true);
    const paymentModeAction = document.getElementById(`action-${PAY_LATER}`);
    paymentModeAction && paymentModeAction.click();
  }

  getOptionUI() {
    const { origin } = window.location;

    return (
      <div className={Styles.container}>
        <Loader show={this.props.loading} backdrop={true} />
        <TNCIframe
          src={`${this.tncUrl}&origin=${origin}`}
          successCallback={this.submitForm}
        />
      </div>
    );
  }

  getModeAttributes() {
    const mobile = getQueryParam({ name: 'mobile' });
    return {
      userProfileMobile: mobile,
      paymentProviderId: 1
    };
  }

  render() {
    return (
      <PayNowHandler
        {...this.props}
        paymentUrl={get(
          this,
          'payLaterInstrumentData.paymentInstrumentDetails.paymentUrl'
        )}
        deviceMode="mobile"
        paymentMode={PAY_LATER}
        paymentModeName={PAY_LATER}
        optionUI={this.getOptionUI()}
        actionData={{ enabled: true }}
        modeAttributes={this.getModeAttributes()}
      />
    );
  }
}

export default TNC;
