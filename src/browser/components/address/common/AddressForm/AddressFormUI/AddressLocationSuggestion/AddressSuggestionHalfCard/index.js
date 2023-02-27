import React from 'react';
import PropTypes from 'prop-types';

import { RadioGroup, RadioButton } from 'commonComp/Radio';
import ButtonV2 from 'commonComp/ButtonV2';

import Style from './addressSuggestionHalfCard.css';

import LocationIcon from 'iconComp/Location.jsx';

const Address = ({ locality, city, state, pincode }) => (
  <div>
    <div>{locality}</div>
    <div>
      {city}, {state}. {pincode}
    </div>
  </div>
);

const AddressList = ({
  selectedLocality,
  selectLocality,
  options,
  pincode,
  city,
  state
}) => (
  <RadioGroup
    value={selectedLocality}
    onChange={selectLocality}
    className={Style.addressList}
  >
    {options.map(locality => (
      <RadioButton
        value={locality}
        className={Style.addressOption}
        classes={{ icon: Style.radioIcon }}
      >
        <Address
          locality={locality}
          city={city}
          state={state}
          pincode={pincode}
        />
      </RadioButton>
    ))}
  </RadioGroup>
);

const AddressSuggestionHalfCard = ({
  selectedLocality,
  options,
  pincode,
  city,
  state,
  selectLocality,
  confirmSelection,
  showOneSuggestion
}) => (
  <div className={Style.locationDetailsContainer}>
    <div className={Style.locationDetailTitle}>Current location details</div>
    {showOneSuggestion ? (
      <div className={`${Style.addressOption} ${Style.flexDisplay}`}>
        <LocationIcon className={Style.addressLocationIcon} />
        <Address
          locality={selectedLocality}
          city={city}
          state={state}
          pincode={pincode}
        />
      </div>
    ) : (
      <AddressList
        selectedLocality={selectedLocality}
        selectLocality={selectLocality}
        options={options}
        pincode={pincode}
        city={city}
        state={state}
      />
    )}
    <div className={Style.userInstruction}>
      You can edit or add details later
    </div>
    <ButtonV2
      containerClassname={Style.addLocationButtonContainer}
      classname={selectedLocality ? '' : Style.inactiveButton}
      onClick={selectedLocality ? confirmSelection : () => {}}
      text={'ADD LOCATION DETAILS'}
    />
  </div>
);

AddressSuggestionHalfCard.propTypes = {
  selectedLocality: PropTypes.string,
  options: PropTypes.array.isRequired,
  pincode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  selectLocality: PropTypes.func.isRequired,
  confirmSelection: PropTypes.func.isRequired,
  showOneSuggestion: PropTypes.bool.isRequired
};

export default AddressSuggestionHalfCard;
