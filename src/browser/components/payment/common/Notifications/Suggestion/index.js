import React from 'react';
import ImageBanner from 'commonComp/ImageBanner';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getPaymentFailureCount } from 'commonBrowserUtils/PaymentHelper';

import Style from './suggestion.base.css';

class SuggestionNotification extends React.Component {
  constructor(props) {
    super(props);
    this.onTipClick = this.onTipClick.bind(this);
  }

  onTipClick() {
    triggerEvent('CONVERT_TO_COD', {
      gaLabel: getPaymentFailureCount()
    });

    this.props.switchTab(PaymentConstants.COD, { keepTabOpen: true });
  }

  render() {
    return (
      <div
        className={`${Style.container} ${
          this.props.mode === 'desktop' ? Style.desktopContainer : ''
        }`}
      >
        <div className={Style.textContainer}>
          <ImageBanner name="bulb" className={Style.bulbImage} />
          <div className={Style.infoBlock}>
            <div className={Style.title}>
              Having trouble with your payments?
            </div>
            <div className={Style.tip} onClick={this.onTipClick}>
              PAY VIA CASH ON DELIVERY
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestionNotification;
