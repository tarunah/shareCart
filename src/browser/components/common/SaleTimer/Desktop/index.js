import React from 'react';
import Timer from '../Timer';
import { getSaleBannerData } from '../util';

import Styles from './saletimer.base.css';

class SaleTimer extends React.PureComponent {
  constructor() {
    super();
    this.onTimerExpiry = this.onTimerExpiry.bind(this);
  }

  onTimerExpiry() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.show &&
      triggerEvent('SALE_TIMER_LOAD', {
        custom: {
          widget: {
            name: 'checkout-timer',
            type: 'sale_timer'
          }
        }
      });
  }
  render() {
    const {
      props: { priceRevealData, saleBannerData, enabled }
    } = this;
    const {
      showTimer,
      timerLabel,
      timerEndDate,
      timerImage
    } = getSaleBannerData(priceRevealData, saleBannerData);

    this.show = showTimer && enabled;

    return this.show ? (
      <div className={Styles.container}>
        {timerImage && (
          <img src={timerImage} height="50" className={Styles.image} />
        )}
        <div className={Styles.timer}>
          <div
            className={`${Styles.label} ${!timerImage ? Styles.inline : ''}`}
          >
            {timerLabel}
          </div>
          <Timer
            endDate={timerEndDate}
            onTimerExpiry={this.onTimerExpiry}
            digitStyle={{ fontSize: '20px', width: '23px' }}
            labelStyle={{ fontSize: '14px' }}
          />
        </div>
      </div>
    ) : null;
  }
}

SaleTimer.defaultProps = {
  enabled: true
};

export default SaleTimer;
