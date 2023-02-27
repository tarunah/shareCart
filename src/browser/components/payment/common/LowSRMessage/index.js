import React from 'react';
import PropTypes from 'prop-types';

import { getUidx } from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Style from './lowSRMessage.base.css';

const MESSAGE = {
  new_card: 'This bank',
  card: 'This bank',
  vpa: 'This payment option'
};

class LowSRMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  fireEvents() {
    const {
      instrumentName,
      instrumentType,
      binNumber = null,
      disable
    } = this.props;
    const uidx = getUidx();
    const payload = {
      uidx,
      [instrumentType]: binNumber || instrumentName //bin number for new cc/dc
    };
    disable
      ? triggerEvent('LOW_SR_DISABLE_INSTRUMENT', {
          gaLabel: JSON.stringify(payload),
          maData: payload
        })
      : triggerEvent('LOW_SR_MESSAGE_DISPLAY', {
          gaLabel: JSON.stringify(payload),
          maData: payload
        });
  }

  componentDidMount() {
    this.props.show && this.fireEvents();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.show &&
      prevProps.instrumentName !== this.props.instrumentName &&
      this.fireEvents();
  }

  render() {
    const {
      instrumentName,
      className = '',
      instrumentType,
      show,
      disable
    } = this.props;
    if (!show) return null;
    const { lowSuccessRate, highFailureRate } = getKVPairValue(
      'LOW_SR_MESSAGES'
    );
    const message = disable ? highFailureRate : lowSuccessRate;
    return (
      <div className={`${Style.lowSRMessage} ${className}`}>
        {`${MESSAGE[instrumentType] ||
          MESSAGE[instrumentName] ||
          instrumentName} ${message}`}
      </div>
    );
  }
}

LowSRMessage.propTypes = {
  instrumentName: PropTypes.string.isRequired,
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired
};

export default LowSRMessage;
