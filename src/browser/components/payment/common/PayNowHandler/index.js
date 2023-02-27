import React from 'react';
import get from 'lodash/get';

import PayNowAjax from '../PayNowAjax';

import { getCartContext } from 'commonBrowserUtils/CartHelper';

const PayNowHandler = props => {
  const { cartData, modeAttributes = {}, ...restProps } = props;
  const addressUnifiedId = get(cartData, 'unifiedAddressId', '');
  const cartId = get(cartData, 'id', '');
  const cartContext =
    (get(cartData, 'context') || '').toLowerCase() || getCartContext();
  return (
    <PayNowAjax
      cartId={cartId}
      cartContext={cartContext}
      addressUnifiedId={addressUnifiedId}
      modeAttributes={modeAttributes}
      {...restProps}
    />
  );
};

export default PayNowHandler;
