import React from 'react';

import { gotoOrders } from 'commonBrowserUtils/Helper';
import { confirmationScreenTypes as screenTypes } from 'commonUtils/constants';
import Buttons from 'commonComp/InlineButtonV3';
import Waiting from 'iconComp/Waiting.jsx';
import Styles from '../cardComponents.base.css';

const WaitingForPayment = props => {
  const customContainerClass =
    props.mode === 'mobile' &&
    [
      screenTypes.payPendingPlacedOrder,
      screenTypes.payPendingCodNotElig
    ].indexOf(props.screenType) !== -1
      ? Styles.soloCard
      : '';

  return (
    <div
      data-testid="waitingForPaymentContainer"
      className={`${props.styleClass} ${Styles.waitingForPaymentContainer} ${customContainerClass}`}
    >
      <Waiting className={Styles.waitingIcon} />
      <div
        className={`${Styles.statusCardHeading} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardHeading : ''
        } ${Styles.waitingForPaymentHeading}`}
      >
        Waiting for payment confirmation
      </div>
      <div
        className={`${Styles.statusCardDesc} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardDesc : ''
        }`}
      >
        We are confirming payment status with your bank. It may take upto 20
        minutes. In case you were not able to complete the payment, you can
        retry the payment now.
      </div>
      <Buttons
        containerClassName={`${Styles.statusCardButtons} ${
          props.mode === 'desktop' ? Styles.desktopStatusCardButtons : ''
        }`}
        buttons={[
          {
            text:
              props.screenType === screenTypes.payPendingPlacedOrder
                ? 'GO TO ORDERS'
                : 'CANCEL ORDER',
            type: 'secondary',
            clickHandler:
              props.screenType === screenTypes.payPendingPlacedOrder
                ? gotoOrders
                : () =>
                    props.actionHandlers.toggleConfirmationModal(
                      props.getModalContent('WaitingForPayment_Cancel')
                    )
          },
          {
            text: 'RETRY PAYMENT',
            clickHandler: () =>
              props.actionHandlers.toggleConfirmationModal(
                props.getModalContent('WaitingForPayment_Retry')
              )
          }
        ]}
      />
    </div>
  );
};

export default WaitingForPayment;
