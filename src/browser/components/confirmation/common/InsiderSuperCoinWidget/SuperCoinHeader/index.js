import React from 'react';
import get from 'lodash/get';

import Styles from './superCoinHeader.base.css';

import CrownIcon from 'iconComp/InsiderLogoNew.jsx';
import ImageBanner from 'commonComp/ImageBanner';
import Myntra from 'iconComp/Myntra.jsx';

const SuperCoinHeader = ({
  headerMessage = '',
  tierName = '',
  isTrialUser = false,
  trialUserTitle = ''
}) => (
  <div className={Styles.superCoinHeader}>
    <div className={Styles.tierNameContainer}>
      <CrownIcon className={Styles.crownIcon} />
      {headerMessage.split(/({{tierName}})/g).map((item, index) =>
        item === '{{tierName}}' ? (
          <span key={index} className={Styles.tierNameText}>
            {tierName}
            {isTrialUser ? ` ${trialUserTitle}` : ''}
          </span>
        ) : (
          <span key={index}>&nbsp;{item}</span>
        )
      )}
    </div>
    <div className={Styles.insiderLogoContainer}>
      <Myntra className={Styles.myntraLogo} />
      <ImageBanner
        className={Styles.insiderLogoSuperCoin}
        name="insiderLogoSuperCoin"
      />
    </div>
  </div>
);

export default SuperCoinHeader;
