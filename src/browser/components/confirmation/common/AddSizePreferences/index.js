import React from 'react';

import { genderMap } from 'commonBrowserUtils/ConfirmationConstants';

import Styles from './addSizePreferences.base.css';

const updateNow = ({
  articleType,
  gender,
  profileId,
  profileName,
  productName,
  styleId,
  subCategory
}) => {
  let url = `/size-finder?parent=ORDER_CONFIRMATION&sizeFinderRoute=cart&articleType=${articleType}&gender=${genderMap[gender]}&productName=${productName}&styleId=${styleId}&subCategory=${subCategory}`;
  if (profileId && profileName) {
    url += `&pidx=${profileId}&editProfile=${profileName}`;
  }
  SHELL.redirectTo(url);
};

const AddSizePreferences = ({ product, profile }) => (
  <div className={Styles.container}>
    <img
      src="https://constant.myntassets.com/checkout/assets/img/sizeFinder.png"
      width={60}
      height={60}
    />
    <div className={Styles.textContainer}>
      <div
        className={Styles.textHeading}
      >{`Add ${product.subCategory} Size Preferences`}</div>
      <div className={Styles.textDesc}>
        To recommend the right size on your next purchase
      </div>
      <div
        className={Styles.updateButton}
        onClick={() => updateNow({ ...product, ...profile })}
      >
        UPDATE NOW
      </div>
    </div>
  </div>
);

export default AddSizePreferences;
