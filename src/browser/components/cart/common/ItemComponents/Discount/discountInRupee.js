import React from 'react';
import Timer from 'commonComp/Timer';
import { getFullDateDiff } from 'commonBrowserUtils/Helper';

import Rupee from 'iconComp/Rupee.jsx';
import Style from '../itemComponents.base.css';

const discountInRupee = (
  discountInValue,
  discountStyle,
  isDiscountTimerEnabled,
  discountTimerEndTime,
  timerCallback
) => {
  const timerData = getFullDateDiff(discountTimerEndTime);
  const { hours = 0, minutes = 0, seconds = 0, total = 0 } = timerData;

  return isDiscountTimerEnabled && total > 0 ? (
    <div className={discountStyle}>
      <Rupee className={Style.tradeRupeeIcon} />
      <span>
        {`${discountInValue} OFF for `}
        <Timer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          stopCallback={timerCallback}
        />
      </span>
    </div>
  ) : (
    <span className={discountStyle}>
      <Rupee className={Style.tradeRupeeIcon} />
      <span>{discountInValue} OFF</span>
    </span>
  );
};

export default discountInRupee;
