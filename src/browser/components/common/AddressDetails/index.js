import React from 'react';
import PropTypes from 'prop-types';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

// Styles
import Style from './addressDetails.base.css';

const AddressDetails = props => {
  const {
    addressInfo: {
      addressType,
      isDefault,
      city,
      pincode,
      locality,
      landmark,
      streetAddress,
      state: { name: stateName },
      user: { name, mobile }
    },
    className,
    minimize,
    notServiceable,
    showDefaultTag,
    hideAddressType,
    mode
  } = props;

  const defaultTagToShow =
    showDefaultTag && isDefault ? (
      <span className={Style.defaultTag}>(Default)</span>
    ) : (
      ''
    );
  const isDesktop = mode === 'desktop';
  const isLandmarkEnabled =
    isFeatureEnabled('ADDRESS_LANDMARK') && landmark && landmark.trim();

  return minimize ? (
    <div>
      <div>
        <div
          className={isDesktop ? Style.desktopAddressTitle : Style.addressTitle}
        >
          <div className={Style.name}>
            {name} {defaultTagToShow}
          </div>
          {!hideAddressType && addressType && (
            <div className={Style.addressType}>{addressType}</div>
          )}
        </div>
        <div className={`${Style.addressField} ${className}`}>
          {`${streetAddress}, ${locality}`}
        </div>
        {isLandmarkEnabled ? (
          <div className={Style.addressField}>{landmark}</div>
        ) : (
          ''
        )}
        <span>{`${city}${isDesktop ? `, ${stateName}` : ''} - `}</span>
        <span>{pincode}</span>
      </div>
      {isDesktop ? (
        <div className={Style.mobile}>
          <span>Mobile: </span>
          <span>{mobile}</span>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div>
      <div
        className={isDesktop ? Style.desktopAddressTitle : Style.addressTitle}
      >
        <div className={Style.name}>
          {name} {defaultTagToShow}
        </div>
        {!hideAddressType && addressType && (
          <div
            className={`${Style.addressType} ${
              notServiceable ? Style.notServiceable : ''
            }`}
          >
            {addressType}
          </div>
        )}
      </div>
      <div className={`${Style.address} ${className}`}>
        <div className={Style.addressField}>{streetAddress}</div>
        <div>{locality}</div>
        {isLandmarkEnabled ? (
          <div className={Style.addressField}>{landmark}</div>
        ) : (
          ''
        )}
        <div>{`${city}, ${stateName} ${pincode}`}</div>
        <div className={Style.mobile}>
          <span>Mobile: </span>
          <span>{mobile}</span>
        </div>
      </div>
    </div>
  );
};

AddressDetails.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  minimize: PropTypes.bool,
  showDefaultTag: PropTypes.bool
};

AddressDetails.defaultProps = {
  minimize: false,
  showDefaultTag: false,
  hideAddressType: false
};

export default AddressDetails;
