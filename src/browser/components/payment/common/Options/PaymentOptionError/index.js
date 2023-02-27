import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getUidx } from 'commonBrowserUtils/Helper';

import Styles from './paymentOptionError.base.css';
import Warning from 'iconComp/Warning.jsx';

/*
 * Shows error at option level.
 *
 * Requires:
 * 1. "code" to get message from the kvpair
 * 2. "paymentInstrumentDetails" to get instrument specific info.
 *
 * eg.
 * code: 3007,
 * errorMessage: "COD amount should be between {minCOD} and {maxCOD}",
 * paymentInstrumentDetails: { instrumentData: data: [{ minCOD: 100, maxCOD: 10000, ... }] }
 *
 * PlaceHolders in kvpair should match with keys in instrumentData.
 */

class PaymentOptionError extends React.Component {
  constructor(props) {
    super(props);

    this.errorMessagesMap = getKVPairValue('PAYMENT_OPTIONS_ERROR');
  }

  componentDidMount() {
    const errorCode = this.props.code;
    const errorMessage = this.getMessage();
    const uidx = getUidx();

    triggerEvent('GET_PAYMENT_OPTIONS_ERROR', {
      gaLabel: `${errorCode}:${errorMessage}:${uidx}`
    });
  }

  getMessage() {
    const { code, paymentInstrumentDetails } = this.props;

    const instrumentData = get(paymentInstrumentDetails, 'data.0');
    let errorMessage =
      this.errorMessagesMap[code] || this.errorMessagesMap.default;
    const keys = errorMessage.match(/{[\w]+}/g);

    if (keys && instrumentData) {
      keys.forEach(key => {
        const placeHolder = key.substring(1, key.length - 1);
        if (instrumentData[placeHolder]) {
          errorMessage = errorMessage.replace(key, instrumentData[placeHolder]);
        }
      });
    }
    return errorMessage;
  }

  render() {
    const { className, option, children } = this.props;

    return (
      <div className={`${Styles.errorBlock} ${className || ''}`}>
        <Warning className={Styles.errorIcon} />
        <div className={Styles.heading}>{option} is not available</div>
        <div>
          <div className={Styles.desc}>{this.getMessage()}</div>
          {children}
        </div>
      </div>
    );
  }
}

PaymentOptionError.propTypes = {
  className: PropTypes.string,
  option: PropTypes.string,
  code: PropTypes.number,
  paymentInstrumentDetails: PropTypes.object
};

export default PaymentOptionError;
