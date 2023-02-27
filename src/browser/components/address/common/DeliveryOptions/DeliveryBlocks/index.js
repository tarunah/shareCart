import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './deliveryBlocks.base.css';

// Components
import ToolTip from 'commonComp/ToolTip';

// Utils
import { getEstimatedDate } from 'commonBrowserUtils/AddressHelper';

import Rupee from 'iconComp/Rupee.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import Info from 'iconComp/Info.jsx';

const getDeliveryDates = (minDays, maxDays) => {
  return minDays === maxDays
    ? getEstimatedDate(maxDays, { hideYear: true })
    : `${getEstimatedDate(minDays, {
        hideYear: true
      })} - ${getEstimatedDate(maxDays, { hideYear: true })}`;
};

const DeliveryBlocks = props => {
  const {
    title,
    highlightText,
    charges,
    maxDays,
    minDays,
    tryNBuyEligible,
    isFestiveTime,
    valueShippingCharge
  } = props;

  let subTitle = (
    <div>
      <span>Get it by {getDeliveryDates(props.minDays, maxDays)} | </span>
      {charges ? (
        <span>
          <span>Convenience fee </span>
          <Rupee className={Style.rupeeIcon} />
          <span>{charges}</span>
        </span>
      ) : (
        'No convenience fee'
      )}
    </div>
  );

  const orderDay = maxDays ? ' tommorow' : '';

  if (minDays < 0) {
    if (minDays === -1) {
      subTitle = (
        <div>
          Get by tomorrow 8 PM |<span> Delivery Charge </span>
          <Rupee className={Style.rupeeIcon} />
          <span>{charges}</span>
        </div>
      );
    } else {
      subTitle = `For orders placed before 7 PM ${orderDay}.`;
    }
  }

  if (isFestiveTime) {
    subTitle = (
      <div>
        <div>For orders placed before 11 AM {orderDay}.</div>
        <div>
          <span>Delivey Charge </span>
          <Rupee className={Style.rupeeIcon} />
          <span className={Style.strike}>149</span>
          <span> Now just for </span>
          <Rupee className={Style.rupeeIcon} />
          {charges}
        </div>
      </div>
    );
  }

  if (valueShippingCharge) {
    subTitle = (
      <div>
        <span className={Style.deliveryDates}>
          Get it by {getDeliveryDates(minDays, maxDays)} |{' '}
        </span>
        <span className={Style.save}>
          <span>Save </span>
          <RupeeBold className={Style.rupeeIcon} />
          <span>{valueShippingCharge} </span>
        </span>
        {charges >= valueShippingCharge && (
          <span>
            <span>( </span>
            <Rupee className={Style.rupeeIcon} />
            <span>{charges - valueShippingCharge} </span>
            <Rupee className={Style.rupeeIcon} />
            <span className={Style.strike}>{charges}</span>
            <span>)</span>
          </span>
        )}
        <ToolTip
          elem={<Info className={Style.tooltipInfoIcon} />}
          className={Style.toolTipText}
          tipStyle={{
            top: -6,
            left: -2
          }}
        >
          Value Shipping will be applied as an additional discount on the order
          value. The shipments will take 5 more days than Standard Delivery
          date.
        </ToolTip>
      </div>
    );
  }

  return (
    <div className={Style.deliveryOption}>
      <div className={Style.title}>
        {title}
        {highlightText && (
          <span className={Style.highlight}>{highlightText}</span>
        )}
      </div>

      {subTitle}

      {!tryNBuyEligible && (
        <div className={Style.tryNBuyInfo}>
          Try & Buy is not available with this option
        </div>
      )}
    </div>
  );
};

DeliveryBlocks.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  minDays: PropTypes.number,
  maxDays: PropTypes.number,
  charges: PropTypes.number,
  isFestiveTime: PropTypes.bool,
  tryNBuyEligible: PropTypes.bool
};

export default DeliveryBlocks;
