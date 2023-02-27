import React from 'react';

import Timer from '../Timer';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './retryTimer.base.css';

import TimerIcon from 'iconComp/Timer.jsx';

const RetryTimer = ({ mode, sessionEnabled, stopTimer, disabled }) => {
  !sessionEnabled && triggerEvent('DOPE_RETRY_PAYMENT_SESSION_EXPIRED');
  const timerConfig = getKVPairValue('PAYMENT_RETRY_TIMER');
  return (
    <div
      className={`${Styles.retryTimerContainer} ${
        mode === 'desktop' ? Styles.desktopContainer : Styles.mobileContainer
      } ${sessionEnabled ? Styles.timerEnabled : Styles.timerDisabled}`}
    >
      <span className={Styles.retryTextBlock}>
        <TimerIcon />
        <span className={Styles.retryText}>{`${
          sessionEnabled ? 'Complete payment in' : 'Session expired'
        }`}</span>
      </span>
      <Timer
        minutes={timerConfig.min || 15}
        seconds={timerConfig.sec || 0}
        disabled={disabled}
        stopCallback={stopTimer}
        className={Styles.timer}
        expanded={true}
      />
    </div>
  );
};

export default RetryTimer;
