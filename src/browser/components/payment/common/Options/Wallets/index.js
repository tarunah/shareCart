import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import PayNowHandler from '../../PayNowHandler';
import PaymentOptionError from '../PaymentOptionError';
import WalletCardUI from './WalletCardUI';

import Styles from './wallets.base.css';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { roundNumber, getProfileMobile } from 'commonBrowserUtils/Helper';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { sanitizeName } from './walletHelper';
import {
  addOffersToInstrumentDetails,
  inlineOfferWidgetLoadEvent
} from 'commonBrowserUtils/PaymentHelper';

const boundFuncs = [
  'getModeAttributes',
  'getOptionUI',
  'getWalletDetails',
  'getWallets',
  'selectWallet',
  'submitCallback',
  'setActionButtonRef',
  'onActionButtonClick',
  'getFilteredWallet'
];

const getPaymentModeFromWallet = (wallet = {}) => {
  return wallet.directIntegration
    ? PaymentConstants.WALLET_PM_DIRECT
    : PaymentConstants.WALLET_PM;
};

class Wallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWalletId: ''
    };
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.walletsList = this.sortWallets();
    const { offer, instrumentData } = this.props;
    this.props.updateBankDiscount(0);
    isFeatureEnabled('INLINE_OFFER') &&
      addOffersToInstrumentDetails(offer, instrumentData);
  }

  sortWallets() {
    const supportedWallets = getKVPairValue('WALLET_CONFIG').supportedWallets;
    const allWallets =
      get(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];
    const paymentPersonalizationConfig =
      getKVPairValue('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
    if (
      (isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT3') ||
        isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT4')) &&
      get(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')
    ) {
      return allWallets.filter(
        wallet => supportedWallets.indexOf(sanitizeName(wallet.bankCode)) !== -1
      );
    } else {
      return supportedWallets.reduce((acc, walletCode) => {
        const wallet = allWallets.find(walletObj => {
          const code = sanitizeName(walletObj.bankCode);
          return code === walletCode;
        });
        wallet && acc.push(wallet);
        return acc;
      }, []);
    }
  }

  getWalletDetails(id) {
    return this.walletsList.find(wallet => `${wallet.id}` === id);
  }

  selectWallet(val) {
    const id = val.slice(7);
    const name = (this.getWalletDetails(id) || {}).name;

    triggerEvent('WALLET_SELECT', {
      gaLabel: name
    });
    inlineOfferWidgetLoadEvent(
      'wallets',
      name,
      this.getWalletDetails(id)?.offerDetails ? true : false
    );
    this.setState({
      selectedWalletId: id
    });
  }

  getModeAttributes() {
    return {
      walletEnabled: 'true',
      paymentProviderId: this.state.selectedWalletId || '',
      walletAmount: roundNumber(this.props.totalPayable || 0, 2)
    };
  }

  setActionButtonRef(node) {
    this.actionButton = node;
  }

  onActionButtonClick(e) {
    e.preventDefault();
    this.actionButton.click();
  }

  getFilteredWallet() {
    const filteredWallets = this.walletsList.filter(
      wallet => !wallet.directDisplay
    );

    if (!isFeatureEnabled('LOW_SR_OPTIONS_REMOVE')) {
      return filteredWallets;
    }

    const filteredWalletsWithoutLowSR = filteredWallets.filter(
      wallet => !wallet.lowSuccessRate
    );

    return filteredWalletsWithoutLowSR.length > 0
      ? filteredWalletsWithoutLowSR
      : filteredWallets;
  }

  getWallets() {
    const instrumentType = get(this, 'props.instrumentData.type', '');
    const paymentUrl = get(
      this,
      'props.instrumentData.paymentInstrumentDetails.paymentUrl'
    );
    return this.getFilteredWallet().map(wallet => {
      return (
        <WalletCardUI
          optionData={{
            ...wallet,
            instrumentType: instrumentType,
            paymentUrl
          }}
          selectedId={this.state.selectedWalletId}
          deviceMode={this.props.deviceMode}
          idPrefix={'wallet-'}
          selectInstrument={this.selectWallet}
          onActionButtonClick={this.onActionButtonClick}
        />
      );
    });
  }

  getOptionUIMobile() {
    return (
      <div className={`${Styles.walletContainer} ${Styles.mobileContainer}`}>
        {this.getWallets()}
      </div>
    );
  }

  getOptionUIDesktop() {
    return (
      <div className={`${Styles.walletContainer}`}>
        <div className={Styles.heading}>Select wallet to pay</div>
        {this.getWallets()}
      </div>
    );
  }

  getOptionUI() {
    return this.props.deviceMode === 'mobile'
      ? this.getOptionUIMobile()
      : this.getOptionUIDesktop();
  }

  submitCallback(done) {
    if (!this.state.selectedWalletId) {
      SHELL.alert('info', {
        message: 'Select a payment option to place order.',
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
      return;
    }

    const name = (this.getWalletDetails(this.state.selectedWalletId) || {})
      .name;
    triggerEvent('WALLET_SUBMIT', {
      gaLabel: name || 'not selected'
    });

    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: `${PaymentConstants.WALLET_TYPE}, ${name}`,
          v2: PaymentConstants.WALLET_TYPE,
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

    done && done();
  }

  render() {
    const {
      props,
      props: {
        instrumentData: {
          code,
          paymentInstrumentDetails: { paymentUrl }
        },
        payMode,
        retrySessionEnabled
      }
    } = this;
    const paymentMode = getPaymentModeFromWallet(
      this.getWalletDetails(this.state.selectedWalletId)
    );
    return code === PaymentConstants.INSTRUMENT_ELIGIBLE_CODE ? (
      <PayNowHandler
        {...props}
        paymentUrl={paymentUrl}
        paymentMode={paymentMode}
        paymentModeName={PaymentConstants.WALLET_PM_NAME}
        formAttributes={{ noValidate: true }}
        modeAttributes={this.getModeAttributes()}
        optionUI={this.getOptionUI()}
        actionData={{
          hide: true,
          disable: payMode === 'retry' && !retrySessionEnabled
        }}
        submitCallback={this.submitCallback}
        setActionButtonRef={this.setActionButtonRef}
        paymentInstrument={PaymentConstants.WALLET}
      />
    ) : (
      <PaymentOptionError option="Wallet" code={code} />
    );
  }
}

Wallets.propTypes = {
  mode: PropTypes.string
};

export default Wallets;
