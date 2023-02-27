import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { sessionStorageKeys, localStorageKeys } from 'commonUtils/constants';
import { isGiftcardContext } from 'commonUtils/helper';
import { browserStatsdClient } from 'commonBrowserUtils/browserStatsdMiddleware';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  isSessionStorageEnabled,
  getUidx,
  navigateTo,
  isLocalStorageEnabled
} from 'commonBrowserUtils/Helper';
import { getPaymentFailureCount } from 'commonBrowserUtils/PaymentHelper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import sanitize from 'commonUtils/Sanitize';

import PaymentFailureHalfCard from './PaymentFailureHalfCard';

import Styles from './paymentError.base.css';

class PaymentError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHalfCard: true
    };
    this.paymentErrorKV = getKVPairValue('PAYMENT_ERROR');
    this.errorRedirect = this.errorRedirect.bind(this);
    this.paymentAttributes = this.getPaymentAttributes();
    this.failedPaymentMode = this.getFailedPaymentMode();
    this.closePaymentFailureModal = this.closePaymentFailureModal.bind(this);
  }

  closePaymentFailureModal() {
    this.setState({ showHalfCard: false });
  }

  getErrorCode() {
    this.setState({ showHalfCard: true });
    return get(this.props, 'errorAttributes.code', '');
  }

  getErrorCodeDisplayOverride() {
    return get(this.props, 'errorAttributes.codeDisplayOverride', '');
  }

  componentDidMount() {
    //scroll to top of the screen
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    const errorCode = this.getErrorCode();
    if (errorCode) {
      const path = 'checkout.PAYMENTERRORCODE.Error.' + errorCode;
      this.increaseOnlineFailureCount();
      browserStatsdClient.increment(path);
    }
  }

  getError() {
    const { paymentErrorKV } = this;
    const errorCode = this.getErrorCodeDisplayOverride() || this.getErrorCode();
    const error = paymentErrorKV[errorCode] || paymentErrorKV.default;

    return typeof error === 'string'
      ? { heading: 'Sorry, your order could not be placed.', desc: error }
      : error;
  }

  errorRedirect() {
    const error = this.getError();
    navigateTo(error.redirect);
  }

  increaseOnlineFailureCount() {
    const cartContext = get(this.props, 'errorAttributes.cartContext', '');
    const error = this.getError();
    const errorCode = this.getErrorCode();

    triggerEvent('PAYMENT_ERROR', {
      gaLabel: errorCode,
      mynacoAttributes: {
        errorCode: errorCode,
        errorMessage: error.desc
      },
      custom: {
        custom: {
          v1: errorCode,
          v2: true //true -> paynow json enabled
        }
      }
    });
    this.props.analytics('triggerWebengage')('PAYMENT_FAILURE', {
      error: error.desc
    });
    if (errorCode === '1064') {
      // Special handling for CART_UIDX_MISMATCH
      SHELL.redirectTo('/login?referer=/checkout/payment');
      return;
    }
    if (
      !isGiftcardContext({ cartContext }) &&
      PaymentConstants.ONLINE_ERROR_CODES.indexOf(errorCode) !== -1 &&
      isSessionStorageEnabled()
    ) {
      const failureCountMap = JSON.stringify({
        [getUidx()]: +getPaymentFailureCount() + 1
      });
      sessionStorage.setItem(
        sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT,
        failureCountMap
      );
    }
  }

  componentDidUpdate() {
    //scroll to top of the screen
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.getErrorCode() && this.increaseOnlineFailureCount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.errorAttributes.updateCounter !==
        nextProps.errorAttributes.updateCounter || !nextState.showHalfCard
    );
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
      if (paymentModeName === PaymentConstants.COD) {
        return paymentModeName;
      }
    }
    return '';
  }

  render() {
    const { showPaymentFailureHalfCard } = this.props;
    const { failedPaymentMode } = this;
    const errorCode = this.getErrorCode();
    //this is done so that wrong catpcha and expired captcha is not consider for payment failure half card
    const isCODFailure =
      failedPaymentMode === PaymentConstants.COD &&
      (errorCode === '1004' || errorCode === '1095');
    if (showPaymentFailureHalfCard && !isCODFailure) {
      return (
        <PaymentFailureHalfCard
          {...this.props}
          showHalfCard={this.state.showHalfCard}
          closePaymentFailureModal={this.closePaymentFailureModal}
        />
      );
    } else if (errorCode) {
      const error = this.getError();

      return (
        <div id={this.props.id} className={Styles.errorContainer}>
          <div className={Styles.heading}>{error.heading}</div>
          <div
            className={Styles.desc}
            dangerouslySetInnerHTML={{ __html: sanitize(error.desc) }}
          />
          {error.redirect && (
            <div className={Styles.button} onClick={this.errorRedirect}>
              {error.buttonText}
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

PaymentError.propTypes = {
  errorAttributes: PropTypes.object
};

PaymentError.defaultProps = {
  showPaymentFailureHalfCard: false
};

export default PaymentError;
