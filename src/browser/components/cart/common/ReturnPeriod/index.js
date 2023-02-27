import React from 'react';

import Styles from './returnPeriod.base.css';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import CartConstants from 'commonBrowserUtils/CartConstants';

import ReturnIcon from 'iconComp/ReturnIcon.jsx';

const ReturnPeriod = props => {
  if (
    !isFeatureEnabled('RETURN_POLICY_ON_NEW_USER') &&
    props.returnPeriod <= 30 &&
    props.returnable &&
    (!props.subCategoryTypeName ||
      (props.subCategoryTypeName &&
        props.subCategoryTypeName.toLowerCase() !==
          CartConstants.FINE_JWELLERY_SUBCATERGORY_TYPENAME))
  ) {
    return (
      <div>
        <div className={Styles.returnItem}>
          <div className={Styles.returnIcon}>
            <ReturnIcon />
          </div>
          <div className={Styles.returnText}>
            <span className={Styles.returnDays}>
              {props.returnPeriod} {props.returnPeriod > 1 ? 'days' : 'day'}
            </span>{' '}
            {'return available'}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ReturnPeriod;
