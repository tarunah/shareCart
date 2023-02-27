import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import PaymentRetryUI from './PaymentRetryUI';
import PaymentUI from './PaymentUI';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

class Payment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myntraInstrumentsData: {}
    };
    this.errorOptionNode = React.createRef();
    this.setRef = this.setRef.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.onClickEligibility = this.onClickEligibility.bind(this);
    this.closeTwoFA = this.closeTwoFA.bind(this);
    this.triggerWebengageEvent = this.triggerWebengageEvent.bind(this);
    this.addMyntraInstrumentsData = this.addMyntraInstrumentsData.bind(this);

    this.paymentFailureHalfCardContext = isFeatureEnabled('DOPE_USER_CONSENT')
      ? 'dope_consent'
      : '';

    if (this.paymentFailureHalfCardContext === 'dope_consent') {
      this.paymentFailureHalfCardConfig = getKVPairValue(
        'DOPE_CONSENT_HALFCARD_CONFIG'
      );
    }
    this.kvpairs = {
      saleBanner: getKVPairValue('SALE_BANNER_DATA'),
      priceReveal: getKVPairValue('PRICE_REVEAL_DATA'),
      configMessage: getKVPairValue('PAYMENT_OFFER_MESSAGES'),
      inlineOffer: isFeatureEnabled('INLINE_OFFER')
        ? getKVPairValue('INLINE_OFFERS')
        : {}
    };

    this.offersConfig = this.kvpairs.configMessage || {
      messages: []
    };
    this.inlineOffer = this.kvpairs.inlineOffer || {};
    this.offersConfig.messages.forEach(message => {
      message.icb &&
        (message.link = {
          text: message.btnText,
          onClick: this.onClickEligibility
        });
    });
  }

  componentDidMount() {
    SHELL.setActivePage('PAYMENT', {
      hideStepNumber: this.props.isExchangeCart
    });
  }

  componentDidUpdate() {
    SHELL.setActivePage('PAYMENT', {
      hideStepNumber: this.props.isExchangeCart
    });
  }

  addMyntraInstrumentsData(data) {
    this.setState({
      myntraInstrumentsData: { ...this.state.myntraInstrumentsData, ...data }
    });
  }

  setRef(node) {
    this.tabBar = node;
  }

  switchTab(tabId = '') {
    this.tabBar && this.tabBar.switchTab(null, tabId);
  }

  onClickEligibility() {
    this.switchTab(PaymentConstants.CARD_TYPE);
    get(this, 'tabBar.base.scrollIntoView') &&
      this.tabBar.base.scrollIntoView({ behavior: 'smooth' });
  }

  closeTwoFA() {
    this.props.toggleTwoFA();
    this.tabBar && this.tabBar.selectDefaultTab();
  }

  getPaymentAttributes() {
    let paymentModeSelected = '';
    if (this.tabBar) {
      paymentModeSelected = this.tabBar.getSelected();
    } else if (this.state.myntraInstrumentsData) {
      paymentModeSelected = PaymentConstants.FREE_PURCHASE;
    }
    const paymentModeAction = document.getElementById(
      `action-${paymentModeSelected || 'savedcard'}`
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
      paymentMode: paymentModeSelected || ''
    });
  }

  render() {
    const {
      errorOptionNode,
      setRef,
      switchTab,
      closeTwoFA,
      triggerWebengageEvent,
      paymentFailureHalfCardContext,
      paymentFailureHalfCardConfig,
      kvpairs,
      offersConfig,
      inlineOffer,
      addMyntraInstrumentsData
    } = this;
    if (this.props.payMode === 'retry') {
      return (
        <PaymentRetryUI
          {...this.props}
          {...this.state}
          addMyntraInstrumentsData={addMyntraInstrumentsData}
          errorOptionNode={errorOptionNode}
          setRef={setRef}
          switchTab={switchTab}
          closeTwoFA={closeTwoFA}
          triggerWebengageEvent={triggerWebengageEvent}
          offersConfig={offersConfig}
          inlineOffer={inlineOffer}
        />
      );
    } else {
      return (
        <PaymentUI
          {...this.props}
          {...this.state}
          addMyntraInstrumentsData={addMyntraInstrumentsData}
          errorOptionNode={errorOptionNode}
          setRef={setRef}
          switchTab={switchTab}
          closeTwoFA={closeTwoFA}
          triggerWebengageEvent={triggerWebengageEvent}
          paymentFailureHalfCardContext={paymentFailureHalfCardContext}
          paymentFailureHalfCardConfig={paymentFailureHalfCardConfig}
          kvpairs={kvpairs}
          offersConfig={offersConfig}
          inlineOffer={inlineOffer}
        />
      );
    }
  }
}

Payment.propTypes = {
  cartData: PropTypes.object,
  error: PropTypes.object,
  paymentOptions: PropTypes.object,
  loading: PropTypes.bool,
  bankDiscount: PropTypes.number
};

export default Payment;
