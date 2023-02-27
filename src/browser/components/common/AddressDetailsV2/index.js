import React from 'react';
import PropTypes from 'prop-types';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import AddressButtonStrip from './AddressButtonStrip';

// Styles
import Style from './addressDetailsV2.base.css';

const NameAndTag = ({ name, showDefaultTag }) => {
  return (
    <div className={Style.name}>
      {name}
      {showDefaultTag && <span className={Style.defaultTag}>(Default)</span>}
    </div>
  );
};

const AddressType = ({ addressType, notServiceable }) => {
  return addressType ? (
    <div
      className={`${Style.addressType} ${
        notServiceable ? Style.notServiceable : ''
      }`}
    >
      {addressType}
    </div>
  ) : null;
};

const MobileNumber = ({ mobile }) => {
  return (
    <div className={Style.mobile}>
      <span>Mobile: </span>
      <span>{mobile}</span>
    </div>
  );
};

const LandMark = ({ isLandmarkEnabled, landmark }) => {
  return isLandmarkEnabled ? (
    <div className={Style.addressField}>{landmark}</div>
  ) : null;
};

const MinimizedAddress = ({ streetAddress, locality }) => {
  return (
    <div className={`${Style.minimizedAddress}`}>
      {`${streetAddress}, ${locality}`}
    </div>
  );
};

const FullAddress = ({
  streetAddress,
  locality,
  landmark,
  city,
  stateName,
  pincode,
  mobile
}) => {
  const isLandmarkEnabled =
    isFeatureEnabled('ADDRESS_LANDMARK') && landmark && landmark.trim();

  return (
    <div className={`${Style.address}`}>
      <div className={Style.addressField}>{streetAddress}</div>
      <div>{locality}</div>
      <LandMark isLandmarkEnabled={isLandmarkEnabled} landmark={landmark} />
      <div>{`${city}, ${stateName} - ${pincode}`}</div>
      <MobileNumber mobile={mobile} />
    </div>
  );
};

const AddressDetailsV2 = props => {
  const {
    addressInfo: {
      id,
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
    selectedAddressId,
    minimize,
    notServiceable,
    showDefaultTag,
    onAddressConfirmation,
    mode,
    handleEditAddressClick,
    handleDeleteAddressClick
  } = props;

  const isDesktop = mode === 'desktop';

  return (
    <div>
      <div>
        <div
          className={isDesktop ? Style.desktopAddressTitle : Style.addressTitle}
        >
          <NameAndTag
            name={name}
            showDefaultTag={showDefaultTag && isDefault}
          />
          <AddressType
            addressType={addressType}
            notServiceable={!minimize && notServiceable}
          />
        </div>
        {minimize ? (
          <MinimizedAddress streetAddress={streetAddress} locality={locality} />
        ) : (
          <React.Fragment>
            <FullAddress
              streetAddress={streetAddress}
              locality={locality}
              city={city}
              stateName={stateName}
              pincode={pincode}
              mobile={mobile}
              landmark={landmark}
            />
            <AddressButtonStrip
              isDeliveringHere={id === selectedAddressId}
              id={id}
              onAddressConfirmation={onAddressConfirmation}
              handleEditAddressClick={handleEditAddressClick}
              handleDeleteAddressClick={handleDeleteAddressClick}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

AddressDetailsV2.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  minimize: PropTypes.bool,
  showDefaultTag: PropTypes.bool
};

AddressDetailsV2.defaultProps = {
  minimize: false,
  showDefaultTag: false,
  hideAddressType: false
};

export default AddressDetailsV2;
