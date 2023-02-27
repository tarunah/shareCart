import React from 'react';

// Style Imports.
import Style from './notifications.base.css';

import { isGiftcardContext } from 'commonUtils/helper';

const InfoNotification = props => {
  const { heading, info } = props;
  return (
    <div className={Style.infoContainer}>
      <div className={Style.heading}>{heading}</div>
      <div className={Style.info}>{info}</div>
    </div>
  );
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {isGiftcardContext() && (
          <InfoNotification
            heading="Please Note"
            info="International Cards are not allowed for Giftcard/Topup purchase"
          />
        )}
      </div>
    );
  }
}

export default Notifications;
