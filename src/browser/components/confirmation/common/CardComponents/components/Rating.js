import React, { useCallback } from 'react';

import get from 'lodash/get';
import RatingModule from '../../RatingModule';
import { isMyntAppEnabled } from 'commonBrowserUtils/Helper';
import wkPromiseHandler from 'commonBrowserUtils/WkPromiseHandler';

const Rating = props => {
  const {
    dataState: { data }
  } = props;

  const canRateApp = useCallback(() => {
    if (isMyntAppEnabled(['canShowRateOptionWeb'])) {
      return MyntApp.canShowRateOptionWeb();
    } else {
      return wkPromiseHandler
        .callWKHandler(['canShowRateOptionWeb'])
        .then(result => result)
        .catch(() => false);
    }
  }, [isMyntAppEnabled, wkPromiseHandler]);

  const orderId = get(data, 'bountyOrder.storeOrderId', '');

  const appFeedbackTriggerEvent = (feedbackType, orderId) => {
    triggerEvent('ORDER_CONFIRM_APP_FEEDBACK', {
      maData: {
        entity_id: orderId,
        entity_type: 'order'
      },
      custom: {
        widget: {
          name: 'app_feedback',
          type: 'button'
        },
        widget_items: {
          name: feedbackType,
          type: 'button'
        },
        event_type: 'widgetClick',
        event_category: 'Order Confirmation Page'
      }
    });
  };

  return (
    canRateApp() && (
      <RatingModule
        storeOrderId={get(data, 'bountyOrder.storeOrderId', '')}
        ratingClass={props.styleClass}
        appFeedbackTriggerEvent={feedbackType =>
          appFeedbackTriggerEvent(feedbackType, orderId)
        }
      />
    )
  );
};

export default Rating;
