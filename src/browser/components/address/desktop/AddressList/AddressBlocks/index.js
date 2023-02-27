import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './addressBlocks.base.css';

// Components
import AddressDetails from 'commonComp/AddressDetails';
import AddressServiceability from '../AddressServiceability';
import { NudgeBannerWithCTA } from 'commonComp/NudgeBanner';
import {
  showLandmarkNudge,
  setLandmarkCookie
} from 'commonBrowserUtils/AddressHelper';
import Strings from 'commonBrowserUtils/Strings';
import { numbers } from 'commonUtils/constants';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInactive from 'iconComp/RadioInactive.jsx';

export const AddressBlock = React.memo(
  ({
    addressInfo,
    selected,
    onClickHandler,
    selectedShippingData,
    serviceabilityFlags,
    serviceable,
    flags
  }) => {
    const valid = serviceable && addressInfo.checkoutAllowed;
    const isLandmarkEnabled = isFeatureEnabled('ADDRESS_LANDMARK');
    useEffect(() => {
      if (isLandmarkEnabled && !addressInfo.landmark && selected) {
        setLandmarkCookie(numbers.ZERO);
      }
    }, []);

    const showNudgeBanner =
      isLandmarkEnabled &&
      serviceable &&
      !addressInfo.landmark &&
      selected &&
      showLandmarkNudge(numbers.ZERO);

    let errorMsg = '';
    if (!serviceable) {
      errorMsg = getKVPairValue('NON_SERVICEABLE_ADDRESS_ERROR');
    } else if (!addressInfo.checkoutAllowed) {
      errorMsg =
        'Please add house, street and locality details to improve your address or ensure mobile number is valid, before proceeding further.';
    }
    return (
      <div
        className={`${Style.block}
      ${selected ? (valid ? Style.serviceable : Style.notServiceable) : ''}`}
        onClick={onClickHandler}
        id={addressInfo.id}
        data-action="select"
      >
        <div className={Style.innerBlock}>
          {selected ? (
            <RadioActive className={Style.radioIcon} />
          ) : (
            <RadioInactive className={Style.radioIcon} />
          )}
          <AddressDetails
            className={Style.addressDetail}
            addressInfo={addressInfo}
            minimize={true}
            notServiceable={selected && !!errorMsg}
            mode="desktop"
          />

          {selected && serviceable && (
            <AddressServiceability
              {...flags}
              selectedShippingData={selectedShippingData}
              serviceabilityFlags={serviceabilityFlags}
            />
          )}
          {selected && errorMsg && (
            <div className={Style.error}>{errorMsg}</div>
          )}
          {selected ? (
            <div className={Style.btns}>
              <button className={Style.remove} data-action="remove">
                Remove
              </button>
              <button className={Style.edit} data-action="showModal">
                Edit
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        {showNudgeBanner && (
          <NudgeBannerWithCTA
            message={Strings.LANDMARK_MAIN_NUDGE}
            className={Style.nudgeContainer}
            cta={Strings.LANDMARK_CTA}
            action="showModal"
            fieldName={Strings.LANDMARK_FIELD}
          />
        )}
      </div>
    );
  }
);

AddressBlock.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired
};

AddressBlock.defaultProps = {
  selected: false
};
