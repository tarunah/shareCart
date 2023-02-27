import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';

import { getMinDeliveryDate } from './util.js';
import Constants from './expressConstants';
import { MiniHeaderNav } from './ExpressCheckoutComponents';
import Style from './expresscheckout.base.css';

const ItemArrivalInfo = props => {
  const {
    showDetails,
    serviceabilityData = [],
    serviceabilityFlags = {}
  } = props;

  const date = getMinDeliveryDate(serviceabilityData);
  if (date === undefined) return;

  const hasMultipleItems = serviceabilityData.length > 1;
  const {
    arrivalInfoForMulti,
    arrivalInfoForSingle
  } = getGrowthHackConfigValue('XPRESS_CHECKOUT_CONFIG');
  const arrivalInfoTxt = hasMultipleItems
    ? arrivalInfoForMulti
    : arrivalInfoForSingle;

  const typesApplicable = {
    EXPRESS: !!get(serviceabilityFlags, 'expressShipping.value'),
    SDD: !!get(serviceabilityFlags, 'sddShipping.value'),
    VALUE_SHIPPING: !!get(serviceabilityFlags, 'valueShipping.value')
  };
  const isChargeableDelivery =
    (isFeatureEnabled('SDD') && typesApplicable.SDD) ||
    (isFeatureEnabled('VALUE_SHIPPING') && typesApplicable.VALUE_SHIPPING);
  const isExpress = isFeatureEnabled('SPEED_11') && typesApplicable.EXPRESS;
  const showMoreOptions =
    isChargeableDelivery && !isVariantEnabled('AOC_V2_VARIANT3');
  const header = showMoreOptions
    ? isExpress
      ? Constants.EXPRESS_DELIVERY
      : Constants.STANDARD_DELIVERY
    : Constants.DELIVERY_DATE;

  return (
    <div
      className={Style.arrivalInfoWrapper}
      onClick={!showMoreOptions ? () => showDetails('arrival') : undefined}
    >
      <MiniHeaderNav
        header={header}
        link={showMoreOptions ? Constants.MORE_OPTIONS : null}
        action={showDetails}
        section={Constants.ADDRESS}
      />
      <div className={Style.arrivalInfo}>
        <div>
          {arrivalInfoTxt} <b>{date}</b>
        </div>
        {!showMoreOptions && (
          <div>
            <span className={Style.rightArrow} />
          </div>
        )}
      </div>
    </div>
  );
};

ItemArrivalInfo.propTypes = {
  data: PropTypes.object,
  showDetails: PropTypes.func
};

ItemArrivalInfo.defaultProps = {
  data: {},
  showDetails: () => {}
};

export default ItemArrivalInfo;
