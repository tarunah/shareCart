import React from 'react';
import get from 'lodash/get';

import ImageBanner from 'commonComp/ImageBanner';
import FormatString from 'commonComp/FormatString';

import Styles from './loginShippingText.base.css';

import { isMobile, isLoggedIn } from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const NonLoggedInBanner = ({ analytics }) => {
  const message = get(
    getKVPairValue('LOGIN_NUDGE_SHIPPING_TIP'),
    'message',
    ''
  );
  const highlightedText = get(
    getKVPairValue('LOGIN_NUDGE_SHIPPING_TIP'),
    'highlightedText',
    ''
  );
  const eventName = 'SHIPPING_TIP_LOGINCTA_CLICK';
  return (
    <div
      className={`${Styles.loginDeliveryTip} ${
        isMobile() ? Styles.mobileContainer : ''
      } `}
    >
      <ImageBanner name="ship-charge" className={Styles.tipIcon} />
      <div className={Styles.loginTipMessage}>
        <div className={Styles.message}>
          {message.split(' ').map((msg, idx) => {
            return (
              <span key={idx}>
                <FormatString
                  highlightedText={highlightedText}
                  messageString={msg}
                  className={Styles.tipBold}
                />{' '}
              </span>
            );
          })}
        </div>
        <span>
          <a
            href="/login?referer=/checkout/cart"
            className={Styles.loginCTA}
            onClick={() => triggerEvent(eventName)}
          >
            LOGIN NOW
          </a>
        </span>
      </div>
    </div>
  );
};

const DisplayBanner = ({ shippingData, selectedProductCount, analytics }) => {
  const shippingDataText = get(shippingData, 'text', '');
  const notExclusive =
    shippingDataText.toLowerCase().indexOf('exclusively') === -1;
  const shipCharge = notExclusive && get(shippingData, 'meta.minMore');
  const minMore = Math.round(shipCharge) > 0 ? Math.round(shipCharge) : 0;
  return (
    <div>
      {selectedProductCount > 0 && minMore > 0 && !isLoggedIn() ? (
        <NonLoggedInBanner analytics={analytics} />
      ) : null}
    </div>
  );
};

const LoginShippingText = props => {
  const { shippingData, analytics, selectedProductCount } = props;

  return (
    <DisplayBanner
      shippingData={shippingData}
      analytics={analytics}
      selectedProductCount={selectedProductCount}
    />
  );
};

export default LoginShippingText;
