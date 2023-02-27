import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Style
import Style from './paymentFailureHalfCard.base.css';

// Common Components
import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';
import { isLocalStorageEnabled, getUidx } from 'commonBrowserUtils/Helper';
import { localStorageKeys } from 'commonUtils/constants';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import sanitize from 'commonUtils/Sanitize';
import PayNowHandler from '../../PayNowHandler';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import PaymentFailure from 'iconComp/PaymentFailure.jsx';

const {
  PAY_LATER,
  CARD_TYPE,
  COD,
  EMI_PM_NAME,
  NETBANKING,
  SAVED_INSTRUMENT,
  UPI,
  WALLET_PM_NAME,
  WALLET_PM_DIRECT,
  WALLET_PM,
  INSTRUMENT_ELIGIBLE_CODE,
  FAILURE_BUTTON_TEXT_MAP
} = PaymentConstants;

const {
  TRY_RETRY_TEXT,
  TRY_COD_TEXT,
  TRY_OTHER_TEXT
} = FAILURE_BUTTON_TEXT_MAP;

const isRetryEligible = [
  PAY_LATER,
  EMI_PM_NAME,
  NETBANKING,
  UPI,
  WALLET_PM_NAME
];

const boundFuncs = ['triggerHalfCardLoadEvent'];

class PaymentFailureHalfCard extends React.Component {
  constructor(props) {
    super(props);
    this.userUidx = getUidx();
    this.paymentAttributes = this.getPaymentAttributes();
    this.failedPaymentMode = this.getFailedPaymentMode();
    this.codEligible =
      get(this.props.instrumentDataMap[COD], 'code', 0) ===
      INSTRUMENT_ELIGIBLE_CODE;
    this.isDopeUserConsentEnabled = isFeatureEnabled('DOPE_USER_CONSENT');
    [this.primaryCta, this.secondaryCta] = this.initializeCta();
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const {
      failedPaymentMode,
      primaryCta,
      secondaryCta,
      triggerHalfCardLoadEvent
    } = this;

    if (
      failedPaymentMode &&
      this.props.showHalfCard &&
      (primaryCta.text || secondaryCta.text)
    ) {
      triggerHalfCardLoadEvent();
    }
  }

  getPaymentAttributes() {
    let paymentAttributes = {};
    if (isLocalStorageEnabled()) {
      try {
        paymentAttributes =
          JSON.parse(
            localStorage.getItem(localStorageKeys.PAYMENT_MODE_ATTRIBUTES)
          ) || {};
      } catch (e) {
        paymentAttributes = {};
      }
    }
    if (
      !isEmpty(paymentAttributes) &&
      get(paymentAttributes, 'paymentModeName', null).indexOf('retry-') !== -1
    ) {
      paymentAttributes.paymentModeName = paymentAttributes.paymentModeName.replace(
        'retry-',
        ''
      );
    }

    return paymentAttributes;
  }

  getFailedPaymentMode() {
    const { paymentAttributes } = this;
    const { paymentMode, paymentModeName } = paymentAttributes || {};
    if (paymentMode && paymentModeName) {
      switch (paymentModeName) {
        case PAY_LATER:
        case CARD_TYPE:
        case EMI_PM_NAME:
        case NETBANKING:
        case WALLET_PM_NAME:
        case COD:
          return paymentModeName;
        case SAVED_INSTRUMENT:
        case UPI:
          const {
            modeAttributes: { upiSdkEnabled }
          } = paymentAttributes || {};
          const code = get(this.props, 'errorAttributes.code');
          if (!upiSdkEnabled || code) {
            if (paymentModeName === UPI) {
              return paymentModeName;
            } else {
              return paymentMode;
            }
          }
          return '';
      }
    }
    if (paymentMode === WALLET_PM_DIRECT || paymentMode === WALLET_PM) {
      return WALLET_PM_NAME;
    }

    return '';
  }

  getCta(text, onClick) {
    return {
      text: text,
      onButtonClick: onClick
    };
  }

  getRetryEligibleCta() {
    let primaryCta = {
        text: '',
        onButtonClick: () => {}
      },
      secondaryCta = {
        text: '',
        onButtonClick: () => {}
      };
    const {
      codEligible,
      getCta,
      submitRetryForm,
      toggleToPaymentMode,
      failedPaymentMode,
      props: { halfCardConfig, closePaymentFailureModal }
    } = this;
    const failedInstrumentEligible =
      get(this.props.instrumentDataMap[failedPaymentMode], 'code', 0) ===
      INSTRUMENT_ELIGIBLE_CODE;

    const cta1 = get(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT);
    const cta2 = get(halfCardConfig, 'podCTA', TRY_COD_TEXT);
    if (codEligible && failedInstrumentEligible) {
      primaryCta = getCta(cta1, submitRetryForm);
      secondaryCta = getCta(cta2, toggleToPaymentMode.bind(this, COD));
    } else if (failedInstrumentEligible) {
      primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
      secondaryCta = getCta(TRY_RETRY_TEXT, submitRetryForm);
    } else {
      primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
    }

    return [primaryCta, secondaryCta];
  }

  getCodRetryCta() {
    let primaryCta = {
        text: '',
        onButtonClick: () => {}
      },
      secondaryCta = {
        text: '',
        onButtonClick: () => {}
      };
    const { codEligible, getCta, toggleToPaymentMode } = this;

    const { closePaymentFailureModal } = this.props;
    if (codEligible) {
      primaryCta = getCta(TRY_RETRY_TEXT, toggleToPaymentMode.bind(this, COD));
      secondaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
    } else {
      primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
    }

    return [primaryCta, secondaryCta];
  }

  getDefaultCta() {
    let primaryCta = {
        text: '',
        onButtonClick: () => {}
      },
      secondaryCta = {
        text: '',
        onButtonClick: () => {}
      };
    const {
      codEligible,
      getCta,
      toggleToPaymentMode,
      failedPaymentMode,
      paymentAttributes,
      props: { halfCardConfig, closePaymentFailureModal }
    } = this;

    const retryCtaText = get(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT);
    const podCtaText = get(halfCardConfig, 'podCTA', TRY_COD_TEXT);
    if (codEligible) {
      primaryCta =
        failedPaymentMode === CARD_TYPE
          ? getCta(
              retryCtaText,
              toggleToPaymentMode.bind(this, paymentAttributes.paymentModeName)
            )
          : getCta(retryCtaText, closePaymentFailureModal);
      secondaryCta = getCta(podCtaText, toggleToPaymentMode.bind(this, COD));
    } else {
      primaryCta = getCta(TRY_OTHER_TEXT, closePaymentFailureModal);
    }

    return [primaryCta, secondaryCta];
  }

  initializeCta() {
    const { failedPaymentMode } = this;
    let primaryCta = {
        text: '',
        onButtonClick: () => {}
      },
      secondaryCta = {
        text: '',
        onButtonClick: () => {}
      };
    if (failedPaymentMode) {
      if (isRetryEligible.indexOf(failedPaymentMode) !== -1) {
        [primaryCta, secondaryCta] = this.getRetryEligibleCta();
      } else if (failedPaymentMode === COD) {
        [primaryCta, secondaryCta] = this.getCodRetryCta();
      } else {
        [primaryCta, secondaryCta] = this.getDefaultCta();
      }
    }

    return [primaryCta, secondaryCta];
  }

  getModeAttributes(modeAttributes) {
    return {
      ...modeAttributes
    };
  }

  getPaymentForm() {
    const { paymentAttributes } = this;
    return (
      <PayNowHandler
        {...this.props}
        paymentUrl={paymentAttributes.paymentUrl}
        paymentMode={paymentAttributes.paymentMode}
        paymentInstrument={paymentAttributes.paymentInstrument}
        paymentModeName={`retry-${paymentAttributes.paymentModeName}`}
        modeAttributes={this.getModeAttributes(
          paymentAttributes.modeAttributes
        )}
        deviceMode={this.props.mode}
        actionData={{ enabled: true, hide: true }}
        paymentFailureHalfCard={true}
      />
    );
  }

  submitRetryForm() {
    const submitBtn = document.getElementById(
      `action-retry-${this.paymentAttributes.paymentModeName}`
    );
    submitBtn && submitBtn.click();
  }

  toggleToPaymentMode(modeName) {
    this.props.switchTab(modeName);
    this.props.closePaymentFailureModal();
  }

  onClickHandler(cta) {
    this.triggerClickEvent(cta.text);
    cta.onButtonClick.call(this);
  }

  triggerHalfCardLoadEvent() {
    const { code, outstandingAmount } = this.props;
    const { primaryCta, secondaryCta, userUidx } = this;
    triggerEvent('PAYMENT_FAILURE_HALFCARD_LOAD', {
      maData: {
        value: outstandingAmount
      },
      custom: {
        custom: {
          v1: userUidx,
          v2: [primaryCta.text, secondaryCta.text],
          v4: code
        },
        widget: {
          name: 'payment_failure_widget',
          type: 'card'
        }
      }
    });
  }

  triggerClickEvent(clickEventData) {
    const { code, outstandingAmount } = this.props;
    const { primaryCta, secondaryCta, userUidx } = this;
    triggerEvent('PAYMENT_FAILURE_HALFCARD_CLICK', {
      maData: {
        value: outstandingAmount
      },
      custom: {
        custom: {
          v1: userUidx,
          v2: [primaryCta.text, secondaryCta.text],
          v3: clickEventData,
          v4: code
        },
        widget: {
          name: 'payment_failure_widget',
          type: 'card'
        }
      }
    });
  }

  render() {
    const {
      halfCardConfig,
      outstandingAmount,
      mode,
      showHalfCard,
      closePaymentFailureModal
    } = this.props;
    const {
      primaryCta,
      secondaryCta,
      failedPaymentMode,
      isDopeUserConsentEnabled,
      paymentAttributes
    } = this;
    const buttonTextOptions = [primaryCta.text, secondaryCta.text];
    const show =
      failedPaymentMode &&
      showHalfCard &&
      (primaryCta.text || secondaryCta.text);

    const retryText = isDopeUserConsentEnabled
      ? get(halfCardConfig, 'retryCTA', TRY_RETRY_TEXT)
      : TRY_RETRY_TEXT;
    let text1 = '',
      text2 = '',
      text = '';

    if (isDopeUserConsentEnabled) {
      text = get(halfCardConfig, 'ucretryfirst.text');
      text1 = get(halfCardConfig, 'ucretryfirst.highlightedText1');
      text2 = get(halfCardConfig, 'ucretryfirst.highlightedText2');
    } else {
      text = get(halfCardConfig, 'text');
    }
    const { paymentMode = '' } = paymentAttributes || {};
    let isFailedPaymentModeCard = false;
    isFailedPaymentModeCard =
      paymentMode === PaymentConstants.CREDIT_CARD && isDopeUserConsentEnabled;
    const ecomText = get(halfCardConfig, 'ecomText');

    return (
      show && (
        <div>
          {buttonTextOptions.indexOf(retryText) !== -1 && this.getPaymentForm()}
          <Modal
            className={mode === 'desktop' ? Style.desktopModal : Style.modal}
            cancelCallback={closePaymentFailureModal}
            halfCard={mode === 'mobile'}
            cancelIconConfig={{ show: true, className: Style.cancel }}
          >
            <div className={Style.header}>
              <PaymentFailure className={Style.paymentFailureIcon} />
              <span className={Style.headerText}>Payment Failed</span>
            </div>
            <div className={Style.container}>
              <div className={Style.failureText}>
                {isDopeUserConsentEnabled
                  ? text.split(' ').map((text, idx) => {
                      return (
                        <span
                          id={idx}
                          className={`${
                            text.includes('text') ? Style.textBold : ''
                          }`}
                        >
                          {(text.includes('{text1}') &&
                            text.replace('{text1}', text1)) ||
                            (text.includes('{text2}') &&
                              text.replace('{text2}', text2)) ||
                            text}{' '}
                        </span>
                      );
                    })
                  : text}
                {isFailedPaymentModeCard && (
                  <div
                    className={Style.ecomText}
                    dangerouslySetInnerHTML={{ __html: sanitize(ecomText) }}
                  />
                )}
              </div>
              <span className={Style.toPayText}>
                {' '}
                To Pay: <RupeeBold />
                {outstandingAmount}
              </span>
              {primaryCta.text && (
                <Button
                  className={Style.primaryCta}
                  onClick={() => this.onClickHandler(primaryCta)}
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta.text && (
                <Button
                  className={Style.secondaryCta}
                  onClick={() => this.onClickHandler(secondaryCta)}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          </Modal>
        </div>
      )
    );
  }
}

PaymentFailureHalfCard.propTypes = {
  halfCardConfig: PropTypes.object,
  outstandingAmount: PropTypes.string,
  instrumentDataMap: PropTypes.object,
  switchTab: PropTypes.func,
  code: PropTypes.string
};

export default PaymentFailureHalfCard;
