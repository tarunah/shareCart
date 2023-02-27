import React from 'react';
import PropTypes from 'prop-types';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isApp, setDocTitleInMobile, isPWA } from 'commonBrowserUtils/Helper';

import Styles from './paynowLoader.base.css';

import Myntra from 'iconComp/Myntra.jsx';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const { INSTRUMENT_LOADING_MESSAGE } = PaymentConstants;
const PLEASE_WAIT_MESSAGE = 'Please Wait...';

const CodLoader = props => {
  const { className, paymentInstrument } = props;
  const loadingMessage = INSTRUMENT_LOADING_MESSAGE[paymentInstrument];
  return (
    <div className={`${Styles.overlay} ${className}`}>
      <div className={Styles.codBackdrop} />
      <div className={Styles.codLoaderContainer}>
        <Myntra height={60} width={65} />
        <div className={Styles.codMessageContainer}>
          <div className={Styles.loaderMessage}>{loadingMessage}</div>
          <div>{PLEASE_WAIT_MESSAGE}</div>
        </div>
      </div>
    </div>
  );
};

class PayNowLoader extends React.Component {
  componentWillUnmount() {
    const { deviceMode } = this.props;
    const isMobile = deviceMode === 'mobile';
    isMobile &&
      setDocTitleInMobile('PAYMENT', {
        hideStepNumber: isFeatureEnabled('CHECKOUT_STEPS_MWEB')
      });
  }

  componentDidMount() {
    const { deviceMode } = this.props;
    const isMobile = deviceMode === 'mobile';
    isMobile && setDocTitleInMobile('PROCESSING PAYMENT');
  }

  render() {
    const { className, paymentInstrument } = this.props;
    const loadingMessage = INSTRUMENT_LOADING_MESSAGE[paymentInstrument] || '';
    return paymentInstrument === PaymentConstants.COD ? (
      <CodLoader {...this.props} />
    ) : (
      <div className={`${Styles.overlay} ${className ? className : ''}`}>
        <div
          className={`${Styles.backdrop} ${isPWA() ? Styles.pwaPadding : null}`}
        />
        <div className={Styles.messageContainer}>
          <Myntra height={75} width={80} className={Styles.myntraIcon} />
          <div className={Styles.loaderMessage}>{loadingMessage}</div>
          <div>{PLEASE_WAIT_MESSAGE}</div>
        </div>
        <div className={Styles.caution}>
          Do not press back or close the {isApp() ? 'app' : 'browser'}.
        </div>
      </div>
    );
  }
}

PayNowLoader.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string
};

PayNowLoader.defaultProps = {
  show: false
};

export default PayNowLoader;
