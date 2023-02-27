import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './addressFormUI.base.css';

// Components
import Button from 'commonComp/Button';
import Input from 'commonComp/InputV2';
import Loader from 'commonComp/Loader';
import CheckoutSteps from 'commonComp/CheckoutSteps';
import LocalityOptions from './LocalityOptions';
import AddressLocationSuggestion from './AddressLocationSuggestion';
import ArrowLeft from 'iconComp/ArrowLeft.jsx';

import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { NudgeBanner } from 'commonComp/NudgeBanner';
import {
  showLandmarkNudge,
  setLandmarkCookie
} from 'commonBrowserUtils/AddressHelper';
import { numbers } from 'commonUtils/constants';
import Strings from 'commonBrowserUtils/Strings';

import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import MapPointSVG from 'iconComp/MapPoint.jsx';
import sanitize from 'commonUtils/Sanitize';
const { text: SOCIAL_PROOFING_TEMPLATE } = getKVPairValue(
  'SOCIAL_PROOFING_TEXT'
);

const AddressType = ({
  addressType,
  errorMessage,
  notAvailableDays,
  setAddressType
}) => (
  <div className={Style.addressTypes}>
    <div
      className={`${Style.addressTypeIcon} ${
        addressType === 'HOME' ? Style.selectedAddressType : ''
      }`}
      id="addressType-home"
      data-value="HOME"
      onClick={setAddressType}
    >
      Home
    </div>

    <div
      className={`${Style.addressTypeIcon} ${
        addressType === 'OFFICE' ? Style.selectedAddressType : ''
      }`}
      id="addressType-office"
      data-value="OFFICE"
      onClick={setAddressType}
    >
      Work
    </div>

    {addressType !== 'HOME' && (
      <OfficeDays
        notAvailableDays={notAvailableDays}
        setAddressType={setAddressType}
      />
    )}
    <div className={Style.error}>{errorMessage}</div>
  </div>
);

const OfficeDays = ({ notAvailableDays, setAddressType }) => {
  const notAvailable = notAvailableDays.reduce((a, val) => {
    a[val] = true;
    return a;
  }, {});

  return (
    <div className={Style.subAddress}>
      {['SATURDAY', 'SUNDAY'].map(day => (
        <div
          className={Style.subAddressDay}
          id={`notAvailableDays-${day}`}
          data-value={`${!notAvailable[day]}`}
          key={`notAvailableDays-${day}`}
          onClick={setAddressType}
        >
          {notAvailable[day] ? (
            <CheckboxInactive className={Style.checkboxIcon} />
          ) : (
            <CheckboxActive className={Style.selectedCheckboxIcon} />
          )}
          <div
            className={Style.subAddressLabel}
            id={`notAvailableDays-${day}-label`}
            data-value={`${!notAvailable[day]}`}
          >
            Open on {day.toLowerCase()}
          </div>
        </div>
      ))}
    </div>
  );
};

const AddressFormUI = props => {
  const {
    addressInfo: {
      addressType,
      city,
      name,
      mobile,
      state,
      id,
      isDefault,
      locality,
      pincode,
      streetAddress,
      landmark,
      notAvailableDays
    },
    errorInfo,
    loading,
    serviceabilityError,
    localityOptions,
    setValue,
    setAddressType,
    showHeader,
    formClass,
    mode,
    showBack,
    onBack,
    setLocalityDetails,
    socialProofingData
  } = props;

  const title = id ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS';
  const btnText = id ? 'SAVE ADDRESS' : 'ADD ADDRESS';

  const hideCheckoutSteps = isVariantEnabled('AOC_V2_VARIANT3');

  const isAddressSuggestionEnabled = isFeatureEnabled(
    'ADDRESS_LOCATION_SUGGESTION'
  );
  const pincodeErrorMessage =
    (errorInfo.id === 'pincode' && errorInfo.message) ||
    (serviceabilityError && serviceabilityError);

  const isLandmarkEnabled = isFeatureEnabled('ADDRESS_LANDMARK');

  useEffect(() => {
    if (isLandmarkEnabled && id && !landmark) {
      setLandmarkCookie(numbers.ONE);
    }
  }, []);

  const showNudgeBanner =
    isLandmarkEnabled && id && !landmark && showLandmarkNudge(numbers.ONE);

  const tagConfig = {
    showTag: showNudgeBanner,
    containerClassName: Style.tagContainer,
    text: Strings.NEW,
    textClassName: Style.textContainer
  };

  const { count: socialProofCount, city: socialProofCity } =
    socialProofingData || {};
  const finalSocialProofText =
    socialProofCount &&
    SOCIAL_PROOFING_TEMPLATE.replace(
      '{count}',
      `<b>${socialProofCount}</b>`
    ).replace('{city}', `<b>${socialProofCity}</b>`);

  return (
    <div className={Style.container}>
      {/* <CheckoutSteps currentPage={'Address'} hideSteps={hideCheckoutSteps} /> */}
      {showHeader && (
        <div className={Style.header}>
          {showBack ? (
            <ArrowLeft onClick={onBack} className={Style.back} />
          ) : (
            ''
          )}{' '}
          {title}
        </div>
      )}

      <div className={Style.scrollable}>
        {showNudgeBanner && (
          <NudgeBanner
            message={Strings.LANDMARK_EDIT_NUDGE}
            className={Style.nudgeContainer}
          />
        )}
        <div className={Style.formHeader}>CONTACT DETAILS</div>
        <div className={`${Style.form} ${formClass}`}>
          <Input
            label="Name*"
            id="name"
            type="text"
            onChange={setValue}
            value={name}
            errorMessage={errorInfo.id === 'name' && errorInfo.message}
            className={Style.inputRow}
          />
          <Input
            label="Mobile No*"
            id="mobile"
            type="tel"
            onChange={setValue}
            value={mobile}
            maxLength="10"
            errorMessage={errorInfo.id === 'mobile' && errorInfo.message}
          />
        </div>

        <div className={Style.formHeader}>ADDRESS</div>
        <div className={`${Style.form} ${formClass}`}>
          <div className={Style.pincodeBlock}>
            <div className={Style.inputContainer}>
              <Input
                label="Pin Code*"
                id="pincode"
                type="tel"
                maxLength="6"
                onChange={setValue}
                onBlur={props.getPincodeValidity}
                value={pincode}
                className={
                  isAddressSuggestionEnabled ? Style.halfWidthPincodeBlock : ''
                }
                loader={
                  <Loader
                    show={loading}
                    className={Style.pincodeLoder}
                    containerClassName={Style.pincodeLoderContainer}
                  />
                }
              />
              {isAddressSuggestionEnabled && (
                <AddressLocationSuggestion
                  setLocalityDetails={setLocalityDetails}
                />
              )}
            </div>
            {finalSocialProofText && (
              <div className={Style.socialProofBanner}>
                <MapPointSVG />
                <div
                  className={Style.socialProofText}
                  dangerouslySetInnerHTML={(function() {
                    return { __html: sanitize(finalSocialProofText) };
                  })()}
                />
              </div>
            )}
            {pincodeErrorMessage && (
              <div className={Style.errorMessage}>{pincodeErrorMessage}</div>
            )}
          </div>
          <Input
            label="Address (House No, Building, Street, Area)*"
            id="streetAddress"
            type="text"
            row="3"
            onChange={setValue}
            value={streetAddress}
            errorMessage={errorInfo.id === 'streetAddress' && errorInfo.message}
            styleOverrides={{
              inputClass:
                errorInfo.id === 'streetAddress'
                  ? Style.highlightAddressError
                  : ''
            }}
            className={Style.inputRow}
          />

          <LocalityOptions
            options={localityOptions}
            loading={loading}
            onChange={setValue}
            value={locality}
            errorMessage={errorInfo.id === 'locality' && errorInfo.message}
            mode={mode}
          />
          {isLandmarkEnabled ? (
            <Input
              label={
                id
                  ? 'Near by Landmark (Optional)'
                  : 'Landmark (e.g. near XYZ bank)'
              }
              id="landmark"
              type="text"
              onChange={setValue}
              value={landmark}
              errorMessage={errorInfo.id === 'landmark' && errorInfo.message}
              className={
                showNudgeBanner
                  ? `${Style.inputRow} ${Style.nudgeInputRow}`
                  : Style.inputRow
              }
              styleOverrides={{
                inputClass: showNudgeBanner ? Style.nudgeInput : ''
              }}
              tagConfig={tagConfig}
            />
          ) : (
            ''
          )}
          <div className={Style.cityContainer}>
            <Input
              label="City / District*"
              id="city"
              type="text"
              disabled="disabled"
              value={city}
              className={`${Style.halfWidth}`}
            />
            <Input
              label="State*"
              id="state"
              type="text"
              disabled="disabled"
              value={state.name}
              className={`${Style.halfWidth}`}
            />
          </div>
        </div>

        <div className={Style.formHeader}>SAVE ADDRESS AS</div>
        <div className={`${Style.form} ${formClass}`}>
          <AddressType
            addressType={addressType}
            notAvailableDays={notAvailableDays || []}
            setAddressType={setAddressType}
            errorMessage={errorInfo.id === 'addressType' && errorInfo.message}
          />
        </div>

        <div className={`${Style.form} ${formClass}`}>
          <div
            className={Style.isDefault}
            onClick={setValue}
            id="isDefault-icon"
            data-value={`${isDefault}`}
          >
            {isDefault ? (
              <CheckboxActive className={Style.selectedCheckboxIcon} />
            ) : (
              <CheckboxInactive className={Style.checkboxIcon} />
            )}
            <span className={Style.defaultAddress}>
              Make this my default address
            </span>
          </div>
        </div>
      </div>

      <div className={Style.footer}>
        <Button className={Style.saveBtn} onClick={props.saveHandler}>
          {btnText}
        </Button>
      </div>
    </div>
  );
};

AddressFormUI.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  errorInfo: PropTypes.object.isRequired,
  getPincodeValidity: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  localityOptions: PropTypes.array.isRequired,
  saveHandler: PropTypes.func.isRequired,
  serviceabilityError: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  showHeader: PropTypes.bool
};

export default AddressFormUI;
