import React from 'react';
import PropTypes from 'prop-types';
import {
  myself,
  others,
  genderMap
} from 'commonBrowserUtils/ConfirmationConstants';
import { getUserFirstName } from 'commonBrowserUtils/Helper';

import Styles from './profileSelector.base.css';

// Keep all profiles that match currentProduct at the start and disable different gender profiles (except for Unisex product)
const sortProfiles = (product, profiles) => {
  const sortedProfiles = [];

  profiles.forEach(profile => {
    if (profile.gender === genderMap[product.gender]) {
      sortedProfiles.unshift({ ...profile });
    } else {
      sortedProfiles.push({
        ...profile,
        disabled: product.gender !== genderMap.Unisex
      });
    }
  });

  return sortedProfiles;
};

const getProfileButton = ({ selectProfile, selectedProfile }) => ({
  text,
  id,
  disabled
}) => (
  <div
    id={id}
    onClick={disabled ? null : selectProfile}
    className={`${Styles.profileButton} ${
      selectedProfile === id ? Styles.selected : ''
    } ${disabled ? Styles.disabled : ''} ${
      id !== others.id ? Styles.bold : ''
    }`}
  >
    {text}
  </div>
);

const ArrowLine = ({ straightLine }) => (
  <div
    className={`${Styles.arrowLine} ${straightLine ? Styles.straightLine : ''}`}
  >
    <div className={Styles.sideLine} />
    <div className={Styles.triangle} />
    <div className={Styles.sideLine} />
  </div>
);

const Selector = ({
  resetSelectorBlock,
  profiles,
  openSizeInfo,
  selectProfile,
  selectedProfile,
  currentProduct
}) => {
  const ProfileButton = getProfileButton({
    selectProfile,
    selectedProfile
  });
  const selectedProfileObj = profiles.find(
    profile => profile.pidx === selectedProfile
  );
  const sortedProfiles = sortProfiles(currentProduct, profiles);
  const userFirstName = getUserFirstName().trim();

  return (
    <div className={`${resetSelectorBlock ? Styles.fadeInOut : ''}`}>
      {sortedProfiles.length > 0 ? (
        <div className={Styles.profilesBlock}>
          {sortedProfiles.map(profile => (
            <ProfileButton
              key={profile.pidx}
              text={profile.name}
              id={profile.pidx}
              disabled={profile.disabled}
            />
          ))}
          <ProfileButton text={others.display} id={others.id} />
        </div>
      ) : (
        <div className={Styles.profilesBlock}>
          <ProfileButton
            text={userFirstName || myself.display}
            id={myself.id}
          />
          <ProfileButton text={others.display} id={others.id} />
        </div>
      )}
      {selectedProfileObj && !selectedProfileObj.complete && (
        <div className={Styles.inCompleteMessageBlock}>
          <div className={Styles.inCompleteText}>
            We don't have complete size information for
            <span
              className={Styles.inCompleteProfile}
            >{` ${selectedProfileObj.name}`}</span>
          </div>
          <div className={Styles.addDetails} onClick={openSizeInfo}>
            Add Details
          </div>
        </div>
      )}
    </div>
  );
};

class ProfileSelector extends React.Component {
  render() {
    const {
      props: {
        getCurrentProductIndex,
        showAllTaggedMessage,
        blankSlide,
        taggableProductsCount,
        ...selectorProps
      }
    } = this;

    const showSelector =
      !showAllTaggedMessage &&
      !blankSlide &&
      getCurrentProductIndex() < taggableProductsCount;

    return (
      <div className={Styles.profileSelectorContainer}>
        <ArrowLine straightLine={!showSelector} />
        {showSelector && <Selector {...selectorProps} />}
      </div>
    );
  }
}

ProfileSelector.propTypes = {
  profiles: PropTypes.array,
  selectedProfile: PropTypes.string,
  selectProfile: PropTypes.func,
  getCurrentProductIndex: PropTypes.func,
  currentProduct: PropTypes.object,
  showAllTaggedMessage: PropTypes.bool,
  blankSlide: PropTypes.bool,
  taggableProductsCount: PropTypes.number,
  openSizeInfo: PropTypes.func
};

export default ProfileSelector;
