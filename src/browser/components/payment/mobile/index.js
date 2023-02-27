import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pick from 'lodash/pick';

import PaymentRetryUI from './PaymentRetryUI';
import PaymentUI from './PaymentUI';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';

const boundFuncs = [
  'onClickHandler',
  'setRef',
  'updateStickyButton',
  'switchTab',
  'onClickEligibility',
  'closeTwoFA',
  'triggerWebengageEvent',
  'addMyntraInstrumentsData'
];

class Payment extends React.Component {
  constructor(props) {
    super(props);

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    this.state = {
      stickyButton: {
        text: 'PAY NOW',
        enabled: true,
        onClick: null
      },
      myntraInstrumentsData: {}
    };
    this.errorOptionNode = React.createRef();
    this.paymentFailureHalfCardContext = isFeatureEnabled('DOPE_USER_CONSENT')
      ? 'dope_consent'
      : isFeatureEnabled('PAYMENT_FAILURE_HALFCARD')
      ? 'generic_failure'
      : '';

    if (this.paymentFailureHalfCardContext === 'generic_failure') {
      this.paymentFailureHalfCardConfig = getGrowthHackConfigValue(
        'PAYMENT_FAILURE_HALFCARD_CONFIG'
      );
    } else if (this.paymentFailureHalfCardContext === 'dope_consent') {
      this.paymentFailureHalfCardConfig = getKVPairValue(
        'DOPE_CONSENT_HALFCARD_CONFIG'
      );
    }

    this.hasExpressCheckoutAB = isFeatureEnabled('EXPRESS_CHECKOUT');
    this.hasAocV2Variant3 = isVariantEnabled('AOC_V2_VARIANT3');

    this.kvpairs = {
      saleBanner: getKVPairValue('SALE_BANNER_DATA'),
      priceReveal: getKVPairValue('PRICE_REVEAL_DATA'),
      configMessage: getKVPairValue('PAYMENT_OFFER_MESSAGES'),
      inlineOffer: isFeatureEnabled('INLINE_OFFER')
        ? getKVPairValue('INLINE_OFFERS')
        : {}
    };

    this.isNewUserPaymentBannerV2Enabled = isFeatureEnabled(
      'NEW_USER_PAYMENT_BANNER_V2'
    );

    this.offersConfig = this.kvpairs.configMessage || {
      messages: []
    };

    this.offersConfig.messages.forEach(message => {
      message.icb &&
        (message.link = {
          text: message.btnText,
          onClick: this.onClickEligibility
        });
    });

    this.inlineOffer = this.kvpairs.inlineOffer;
  }

  addMyntraInstrumentsData(data) {
    this.setState({
      myntraInstrumentsData: { ...this.state.myntraInstrumentsData, ...data }
    });
  }

  componentDidMount() {
    setDocTitleInMobile('PAYMENT', {
      hideStepNumber:
        this.props.isExchangeCart ||
        this.hasAocV2Variant3 ||
        isFeatureEnabled('CHECKOUT_STEPS_MWEB')
    });

    if (isFeatureEnabled('GIFTCARD_V2')) {
      triggerEvent('GIFTCARD_CONTEXT_PAYMENT');
    }
  }

  componentDidUpdate() {
    setDocTitleInMobile('PAYMENT', {
      hideStepNumber:
        this.props.isExchangeCart ||
        this.hasAocV2Variant3 ||
        isFeatureEnabled('CHECKOUT_STEPS_MWEB')
    });
  }

  setRef(node) {
    this.accordian = node;
  }

  switchTab(tabId = '', options = {}) {
    this.accordian &&
      this.accordian.switchTab(null, tabId, {
        scrollIntoView: true,
        ...options
      });
  }

  closeTwoFA() {
    this.props.toggleTwoFA();
    this.accordian && this.accordian.selectDefaultTab();
  }

  updateStickyButton(newState) {
    this.setState(prevState => ({
      stickyButton: { ...prevState.stickyButton, ...newState }
    }));
  }

  onClickEligibility() {
    this.switchTab(PaymentConstants.CARD_TYPE);
  }

  getPaymentAttributes() {
    let paymentModeSelected = '';
    let actionButtonId = '';
    if (this.accordian) {
      paymentModeSelected = this.accordian.getSelected();
    } else if (this.state.myntraInstrumentsData) {
      paymentModeSelected = PaymentConstants.FREE_PURCHASE;
    }

    if (paymentModeSelected) {
      actionButtonId = paymentModeSelected;
    } else if (
      isFeatureEnabled('RECOMMENDED_OPTIONS') &&
      this.props.payMode !== 'retry'
    ) {
      actionButtonId = PaymentConstants.RECOMMENDED_INSTRUMENT;
    } else {
      actionButtonId = PaymentConstants.SAVED_INSTRUMENT;
    }

    const paymentModeAction = document.getElementById(
      `action-${actionButtonId}`
    );
    return { paymentModeSelected, paymentModeAction };
  }

  triggerWebengageEvent(data) {
    const {
      paymentModeSelected,
      paymentModeAction
    } = this.getPaymentAttributes();
    this.props.analytics('triggerWebengage')('PAYMENT_VIEWED', {
      ...data,
      state_of_pay_now_cta: get(paymentModeAction, 'attributes.disabled')
        ? 'inactive'
        : 'active',
      paymentMode: paymentModeSelected || 'savedcard'
    });
  }

  onClickHandler() {
    if (this.props.payMode === 'retry' && !this.props.retrySessionEnabled) {
      return;
    }

    const { paymentModeAction } = this.getPaymentAttributes();
    if (paymentModeAction) {
      paymentModeAction.click();
    } else {
      SHELL.alert('info', {
        message: 'Select a valid payment option to place order.',
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
    }
  }

  render() {
    const {
      state: { stickyButton },
      errorOptionNode,
      paymentFailureHalfCardContext,
      paymentFailureHalfCardConfig,
      hasExpressCheckoutAB,
      isNewUserPaymentBannerV2Enabled,
      kvpairs,
      inlineOffer,
      offersConfig,
      addMyntraInstrumentsData
    } = this;

    if (this.props.payMode === 'retry') {
      return (
        <PaymentRetryUI
          {...this.props}
          {...this.state}
          addMyntraInstrumentsData={addMyntraInstrumentsData}
          errorOptionNode={errorOptionNode}
          paymentFailureHalfCardContext={paymentFailureHalfCardContext}
          stickyButton={stickyButton}
          offersConfig={offersConfig}
          inlineOffer={inlineOffer}
          {...pick(this, boundFuncs)}
        />
      );
    } else {
      return (
        <PaymentUI
          {...this.props}
          {...this.state}
          addMyntraInstrumentsData={addMyntraInstrumentsData}
          errorOptionNode={errorOptionNode}
          paymentFailureHalfCardContext={paymentFailureHalfCardContext}
          paymentFailureHalfCardConfig={paymentFailureHalfCardConfig}
          hasExpressCheckoutAB={hasExpressCheckoutAB}
          isNewUserPaymentBannerV2Enabled={isNewUserPaymentBannerV2Enabled}
          stickyButton={stickyButton}
          kvpairs={kvpairs}
          offersConfig={offersConfig}
          inlineOffer={inlineOffer}
          {...pick(this, boundFuncs)}
        />
      );
    }
  }
}

Payment.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  cartData: PropTypes.object
};

export default Payment;
