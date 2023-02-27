import React from 'react';

import get from 'lodash/get';
import TrackOrdersModule from '../../TrackOrdersModule';
import { viewOrdersTriggerEvent } from '../index';

const TrackOrders = props => {
  const {
    dataState: { data },
    styleClass
  } = props;

  const orderId = get(data, 'bountyOrder.storeOrderId', '');

  return (
    <TrackOrdersModule
      trackOrdersClass={styleClass}
      viewOrdersTriggerEvent={() => viewOrdersTriggerEvent(orderId)}
      storeOrderId={orderId}
    />
  );
};

export default TrackOrders;
