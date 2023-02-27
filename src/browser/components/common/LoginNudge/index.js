import React from 'react';

import ImageBanner from 'commonComp/ImageBanner';
import { isMobile } from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './loginNudge.base.css';

const LoginNudge = props => {
  const loginNudgeTip = getKVPairValue('LOGIN_NUDGE_ITEMLIST_TIP');
  const eventName = 'ITEMLIST_LOGINCTA_CLICK';
  return (
    <div
      className={`${Styles.mainContainer} ${
        isMobile() ? Styles.mobileContainer : ''
      } `}
    >
      <ImageBanner name="products-blurred" className={Styles.messageIcon} />
      <div className={Styles.messageContainer}>
        <div className={Styles.message}>{loginNudgeTip}</div>
        <a
          href="/login?referer=/checkout/cart"
          className={Styles.loginCTA}
          onClick={() => triggerEvent(eventName)}
        >
          LOGIN NOW
        </a>
      </div>
    </div>
  );
};

export default LoginNudge;
