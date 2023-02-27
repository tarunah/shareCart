import React from 'react';
import Timer from 'commonComp/Timer';
import { getFullDateDiff } from 'commonBrowserUtils/Helper';

const discountInPercentage = (
  discountInPercent,
  discountStyle,
  isDiscountTimerEnabled,
  discountTimerEndTime,
  timerCallback
) => {
  const timerData = getFullDateDiff(discountTimerEndTime);
  const { hours = 0, minutes = 0, seconds = 0, total = 0 } = timerData;

  return isDiscountTimerEnabled && total > 0 ? (
    <div className={discountStyle}>
      {`${discountInPercent} for `}
      <Timer
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        stopCallback={timerCallback}
      />
    </div>
  ) : (
    <span className={discountStyle}>{discountInPercent}</span>
  );
};

export default discountInPercentage;
