import React from 'react';

import { getQueryParam } from 'commonUtils/helper';
import ConfirmTick from 'iconComp/ConfirmTick.jsx';
import Styles from '../cardComponents.base.css';

const PaymentSuccessful = props => {
  const amount = getQueryParam({ name: 'amount' });
  return (
    <div
      data-testid="paymentSuccessful"
      className={`${props.styleClass} ${Styles.statusCardContainer} ${
        props.mode === 'desktop' ? Styles.desktopStatusCardContainer : ''
      }`}
    >
      <ConfirmTick className={Styles.confirmTick} />
      <div
        className={`${Styles.statusCardHeading} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardHeading : ''
        } ${Styles.statusSuccessHeading}`}
      >
        Payment successful
      </div>
      <div
        className={`${Styles.statusCardDesc} ${Styles.paySuccessDesc} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardDesc : ''
        }`}
      >
        <span>We have received a payment</span>
        {amount ? (
          <span>
            <span> of</span>
            <span className={Styles.paymentAmount}>{` Rs. ${amount} `}</span>
          </span>
        ) : (
          <span> </span>
        )}
        <span>
          for your order. You will shortly get a email confirmation for this
          payment.
        </span>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
