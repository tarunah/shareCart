import React, { Fragment } from 'react';
import Styles from '../../rewards.css';
import Button from 'commonComp/Button';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
const { stringLiterals } = getGrowthHackConfigValue('SCRATCHCARD_CONFIG');
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { DISCOUNT_TYPES } = scratchCardRetentionConfig;

function SuccessCard(props) {
  const { couponDetails, onCTAPress } = props;
  const removeURLHash = () => {
    window.ckrrhistory && window.ckrrhistory.goBack();
  };
  const handleBtnClick = key => {
    removeURLHash();
    onCTAPress(key);
  };
  return (
    <div className={`${Styles.successCard} `}>
      <div className={Styles.modalDescription}>
        {couponDetails.discountType === DISCOUNT_TYPES.PERCENTAGE ? (
          <Fragment>
            Win up to ₹{couponDetails.conditionMax} Off on orders above ₹
            {couponDetails.conditionMin}
          </Fragment>
        ) : (
          <Fragment>
            Win {couponDetails.shortDesc} on orders above ₹
            {couponDetails.conditionMin}
          </Fragment>
        )}
      </div>
      <Button
        className={`${Styles.primary}`}
        onClick={() => handleBtnClick('EXPLORE_PRODUCTS')}
      >
        {stringLiterals.SHOP}
      </Button>
      <Button
        className={`${Styles.secondary} ${Styles.marginTopButton}`}
        onClick={() => handleBtnClick('EXPLORE_MORE')}
      >
        {stringLiterals.KNOW_MORE}
      </Button>
    </div>
  );
}

export default SuccessCard;
