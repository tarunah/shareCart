import React from 'react';

import { getNotServiceableMessage } from 'commonBrowserUtils/AddressHelper';

// Styles
import Style from './notServiceableHeader.base.css';

const goToCart = pincode => () => {
  triggerEvent('NOT_SERVICEABLE_ADDRESS_GO_TO_BAG', { gaLabel: pincode });
  SHELL.redirectTo('/checkout/cart');
};

const NotServiceableHeader = ({
  isAllEssentialItemsServiceable,
  pincode,
  className = ''
}) => {
  return (
    <div className={`${Style.container} ${className}`}>
      <div>
        {getNotServiceableMessage({
          isAllEssentialItemsServiceable,
          type: 'header',
          pincode
        })}
      </div>
      <div className={Style.button} onClick={goToCart(pincode)}>
        GO TO BAG
      </div>
    </div>
  );
};

export default NotServiceableHeader;
