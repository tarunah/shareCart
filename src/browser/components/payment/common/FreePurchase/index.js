import React from 'react';
import PropTypes from 'prop-types';

import PayNowHandler from '../PayNowHandler';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getInstrumentData } from 'commonBrowserUtils/PaymentHelper';

import Styles from './freePurchase.base.css';

class FreePurchase extends React.Component {
  componentDidMount() {
    this.props.updateStickyButton({ text: 'PLACE ORDER' });
  }

  componentWillUnmount() {
    this.props.updateStickyButton({ text: 'PAY NOW' });
  }

  render() {
    const { props } = this;
    const myntraCreditInstrumentData = getInstrumentData(
      this.props.paymentOptions,
      PaymentConstants.MYNTRA_CREDIT
    );
    const {
      paymentInstrumentDetails: { paymentUrl }
    } = myntraCreditInstrumentData;
    return (
      <div
        className={`${Styles.container} ${
          props.mode === 'desktop'
            ? Styles.desktopContainer
            : Styles.mobileContainer
        }`}
      >
        <div className={Styles.heading}>Yay! no additional amount to pay</div>
        <div className={Styles.desc}>
          You have no outstanding amount to pay. Click "Place Order" button to
          place this order.
        </div>
        <PayNowHandler
          {...props}
          paymentUrl={paymentUrl}
          paymentMode={PaymentConstants.FREE_PURCHASE}
          paymentModeName={PaymentConstants.FREE_PURCHASE}
          formAttributes={{ novalidate: true }}
          deviceMode={props.mode}
          actionData={{
            name: 'PLACE ORDER',
            className: Styles.submitButton
          }}
        />
      </div>
    );
  }
}

FreePurchase.propTypes = {
  mode: PropTypes.string,
  updateStickyButton: PropTypes.func
};

FreePurchase.defaultProps = {
  updateStickyButton: () => {}
};

export default FreePurchase;
