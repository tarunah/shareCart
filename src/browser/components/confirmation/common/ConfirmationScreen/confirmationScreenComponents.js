import React, { useEffect } from 'react';
import get from 'lodash/get';

import Loader from 'commonComp/Loader';
import CouponBanner from '../../common/CouponBanner';
import SuccessAnimation from '../SuccessAnimation';
import { MoreBelow } from '../CardComponents';

import {
  getChromeVersion,
  getCookie,
  getUidx,
  isAndroidApp,
  isIOSApp,
  isSessionStorageEnabled,
  setCookie
} from 'commonBrowserUtils/Helper';
import { getQueryParam } from 'commonUtils/helper';
import {
  sessionStorageKeys,
  cookieKeys,
  confirmationScreenTypes as screenTypes
} from 'commonUtils/constants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import Styles from './confirmationScreen.base.css';
import {
  AndroidBridgeHelper,
  IOSBridgeHelper
} from 'commonBrowserUtils/JSBridgeHelper';

const chromeVersion = getChromeVersion();

const CardWrapper = ({
  cards,
  cardComponentsToDisplay,
  cardComponentRenderer,
  children
}) => {
  const storeOrderId = getQueryParam({
    name: 'orderid',
    optionalNames: ['orderId', 'storeOrderId']
  });

  return (
    <div className={Styles.confirmationComp}>
      {children}
      {cardComponentsToDisplay || cardComponentRenderer(cards, false)}
      <div
        className="tfc-order-notify"
        data-userid={getUidx()}
        data-orderid={storeOrderId}
      />
    </div>
  );
};

const Screen = ({
  type,
  mode,
  cards,
  showFallback,
  fallbackCards,
  cardComponentsToDisplay,
  cardComponentRenderer,
  dataState: { data, loading, showMoreBelow },
  actionHandlers: { moreBelowClickHandler }
}) => {
  if (data) {
    let extraComponentsToRender = <Loader show={loading} backdrop={true} />;
    useEffect(() => {
      if (
        cards.indexOf('ScratchCardBanner') === -1 &&
        (!type ||
          type === screenTypes.orderSuccess ||
          type === screenTypes.paySuccessCodUserConsent)
      ) {
        const rewardState = 'REWARD_NOT_SHOWN';
        if (isAndroidApp()) {
          AndroidBridgeHelper.onRewardFlowDone(rewardState);
        } else if (isIOSApp()) {
          IOSBridgeHelper.onRewardFlowDone({ rewardState });
        }
      }
    }, []);
    if (!type || type === screenTypes.orderSuccess) {
      const storeOrderId = get(data, 'bountyOrder.storeOrderId');
      const showAnimation =
        mode === 'mobile' &&
        isSessionStorageEnabled() &&
        !window.sessionStorage.getItem(
          sessionStorageKeys.STOREID_LOADED(storeOrderId)
        ) &&
        (!chromeVersion || chromeVersion > 43);

      const deliveryPreferenceEnabled = isFeatureEnabled('DELIVERY_PREFERENCE');
      const deliveryPreference = getCookie(
        cookieKeys.DELIVERY_PREFERENCE_COOKIE
      );
      if (deliveryPreferenceEnabled && typeof deliveryPreference === 'string') {
        const orderID = get(data, 'bountyOrder.storeOrderId');
        triggerEvent('DELIVERY_PREFERENCE_ORDER', {
          maData: {
            entity_type: 'order',
            entity_name: deliveryPreference,
            entity_id: orderID
          }
        });

        // Remove delivery preference cookie on confirmation
        setCookie(cookieKeys.DELIVERY_PREFERENCE_COOKIE, '', 0);
        // Remove auto credit apply off cookie on confirmation
        setCookie(cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE, '', 0);
      }

      extraComponentsToRender = (
        <React.Fragment>
          <Loader show={loading} backdrop={true} />
          {isFeatureEnabled('CONFIRMATION_COUPON_BANNER') && (
            <CouponBanner mode={mode} />
          )}
          <div className={!showMoreBelow ? Styles.invisible : ''}>
            <MoreBelow moreBelowClickHandler={moreBelowClickHandler} />
          </div>
          {showAnimation && <SuccessAnimation />}
        </React.Fragment>
      );
    }

    return (
      <CardWrapper
        cardComponentsToDisplay={cardComponentsToDisplay}
        cardComponentRenderer={cardComponentRenderer}
        cards={cards}
        mode={mode}
      >
        {extraComponentsToRender}
      </CardWrapper>
    );
  } else if (showFallback) {
    return (
      <CardWrapper
        cardComponentsToDisplay={cardComponentsToDisplay}
        cardComponentRenderer={cardComponentRenderer}
        cards={fallbackCards}
        mode={mode}
      />
    );
  } else {
    return <Loader show={loading} backdrop={true} />;
  }
};

export { Screen };
