import React from 'react';
import PropTypes from 'prop-types';

import ImageBanner from 'commonComp/ImageBanner';

import {
  getShippingTipUIData,
  showCartNewUserPropositions
} from 'commonBrowserUtils/CartHelper';
import { isReturnAbuser, isLoggedIn } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

//Styles
import Styles from './shippingTip.base.css';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';

import RupeeBold from 'iconComp/RupeeBold.jsx';

const HighlightedText = ({ text }) => (
  <span className={Styles.highlightedText}>{text}</span>
);
const Price = ({ price }) =>
  price > 0 ? (
    <span className={Styles.strikedPrice}>&#8377;{price}</span>
  ) : null;
const FormatString = ({ messageString, price, highlightedText }) => {
  if (messageString === '{highlightedText}') {
    return <HighlightedText text={highlightedText} />;
  } else if (messageString === '{price}') {
    return <Price price={price} />;
  } else {
    return <span>{messageString}</span>;
  }
};

const DisplayBanner = ({
  shippingData,
  charges,
  isCartFreeShippingEnabled,
  isFirstTimeCustomer,
  shippingTipData
}) => {
  const deliveryCharge = charges.find(charge => charge.name === 'shipping');

  if (deliveryCharge && !shippingTipData.minMore) {
    return null;
  }

  const freeShippingTemplate =
    (isCartFreeShippingEnabled &&
      getGrowthHackConfigValue('CART_FREE_SHIPPING_TEMPLATE')) ||
    {};

  let freeShipMsg = freeShippingTemplate.repeatUserMessage;
  if (isFirstTimeCustomer) {
    freeShipMsg = freeShippingTemplate.newUserMessage;
  }

  const isCartMessagingRevamp = isFeatureEnabled('CART_MESSAGING_REVAMP');

  return (
    <div>
      <div
        className={`${
          isCartMessagingRevamp
            ? Styles.deliveryTipContainer
            : Styles.deliveryTip
        } ${
          isCartMessagingRevamp && !shippingTipData.minMore ? Styles.free : ''
        }`}
      >
        <ImageBanner
          name={shippingTipData.spriteName}
          className={Styles.tipIcon}
        />
        {!deliveryCharge && freeShipMsg ? (
          <div
            className={
              isCartMessagingRevamp
                ? Styles.messageContainer
                : Styles.tipMessage
            }
          >
            {freeShipMsg.split(' ').map((msg, idx) => {
              return (
                <span key={idx}>
                  <FormatString
                    highlightedText={freeShippingTemplate.highlightedText}
                    price={shippingData.shippingApplicableCharge}
                    messageString={msg}
                  />{' '}
                </span>
              );
            })}
          </div>
        ) : (
          <div
            className={
              isCartMessagingRevamp
                ? Styles.messageContainer
                : Styles.tipMessage
            }
          >
            {shippingTipData.tipText1}
            {shippingTipData.minMore > 0 && (
              <div className={Styles.minPrice}>
                <RupeeBold className={Styles.rupeeIconRed} />
                <span className={Styles.tipRed}>
                  {shippingTipData.minMore}
                  &nbsp;
                </span>
              </div>
            )}
            {shippingTipData.minMore > 0 &&
              `more ${shippingTipData.categorySpecificTipText} to avoid`}
            <span className={Styles.tipBold}>
              &nbsp;
              {shippingTipData.tipText2}
              &nbsp;
            </span>
            {shippingTipData.minMore === 0 && shippingTipData.tipText3}
          </div>
        )}
      </div>
    </div>
  );
};

const ShippingTip = props => {
  const {
    returnAbuser,
    isFirstTimeCustomer,
    shippingData,
    total,
    charges,
    analytics
  } = props;
  const _isReturnAbuser = isReturnAbuser(returnAbuser);
  const showNewUserShippingTip = showCartNewUserPropositions(
    isFirstTimeCustomer
  );
  const isCartFreeShippingEnabled = isFeatureEnabled('CART_MESSAGING_REVAMP');

  const shippingTipData = getShippingTipUIData(
    shippingData,
    showNewUserShippingTip
  );
  const isLoginNudgeEnabled = shippingTipData.minMore > 0 && !isLoggedIn();
  // ShippingTip is always shown for new user irrespective of the total cart value
  if (
    !_isReturnAbuser &&
    !isLoginNudgeEnabled &&
    (Math.round(total) <= 4500 ||
      showNewUserShippingTip ||
      isCartFreeShippingEnabled)
  ) {
    return (
      <DisplayBanner
        shippingData={shippingData}
        charges={charges}
        isCartFreeShippingEnabled={isCartFreeShippingEnabled}
        isFirstTimeCustomer={isFirstTimeCustomer}
        analytics={analytics}
        shippingTipData={shippingTipData}
      />
    );
  }

  return null;
};

ShippingTip.propTypes = {
  mrp: PropTypes.number,
  shippingData: PropTypes.object
};

export default ShippingTip;
