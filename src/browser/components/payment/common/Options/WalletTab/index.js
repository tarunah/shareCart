import React from 'react';
import PropTypes from 'prop-types';

import PayNowHandler from '../../PayNowHandler';

import Styles from './walletTab.base.css';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { roundNumber, getProfileMobile } from 'commonBrowserUtils/Helper';

class WalletTab extends React.Component {
  constructor(props) {
    super(props);

    this.paymentModeName = props.wallet.name.toLowerCase();
  }

  componentDidMount() {
    const paymentModeAction = document.getElementById(
      `action-${this.paymentModeName}`
    );
    paymentModeAction && paymentModeAction.click();
  }

  getModeAttributes() {
    const { props } = this;
    return {
      walletEnabled: 'true',
      paymentProviderId: props.wallet.id || '',
      walletAmount: roundNumber(this.props.totalPayable || 0, 2)
    };
  }

  render() {
    const { props, paymentModeName } = this;
    const paymentMode = props.wallet.directIntegration
      ? PaymentConstants.WALLET_PM_DIRECT
      : PaymentConstants.WALLET_PM;
    const {
      paymentInstrumentDetails: { paymentUrl }
    } = this.props.instrumentData;

    return (
      <div className={Styles.container}>
        <PayNowHandler
          {...props}
          paymentUrl={paymentUrl}
          paymentMode={paymentMode}
          paymentModeName={paymentModeName}
          formAttributes={{ noValidate: true }}
          deviceMode={props.deviceMode}
          modeAttributes={this.getModeAttributes()}
          paymentInstrument={PaymentConstants.WALLET}
        />
      </div>
    );
  }
}

WalletTab.propTypes = {
  deviceMode: PropTypes.string,
  wallet: PropTypes.object,
  instrumentData: PropTypes.object
};

export default WalletTab;
