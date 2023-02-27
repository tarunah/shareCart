import React from 'react';

import Styles from './collectCoins.base.css';

import ImageBanner from 'commonComp/ImageBanner';

const CollectCoinsContainer = ({
  acceleratedEarning = {},
  collectCoinsMessage = '',
  coinsToCollect = 0,
  tierName = ''
}) => {
  const acceleratedEarningConfig = acceleratedEarning[tierName];

  const getCollectCoinsText = collectCoinsMessage => {
    return collectCoinsMessage
      .split(/({{superCoinToCollect}})/g)
      .map((item, index) =>
        item === '{{superCoinToCollect}}' ? (
          <span key={index} className={Styles.superCoinToCollectBold}>
            <ImageBanner
              className={Styles.superCoinToCollectIcon}
              name="superCoinIcon"
            />
            {coinsToCollect} SuperCoins
          </span>
        ) : (
          <span key={index}>{item}</span>
        )
      );
  };

  return (
    <div className={Styles.collectCoinsContainer}>
      {!!(acceleratedEarningConfig || []).length && (
        <div className={Styles.acceleratedEarningContainer}>
          <div className={Styles.acceleratedEarningIcon}>
            {acceleratedEarningConfig[0]}
            <ImageBanner
              className={Styles.superCoinToCollectIcon}
              name="superCoinIcon"
            />
          </div>
          <div className={Styles.acceleratedEarningDesc}>
            {acceleratedEarningConfig[1]}
          </div>
        </div>
      )}
      <div className={Styles.collectCoinsText}>
        {getCollectCoinsText(collectCoinsMessage)}
      </div>
    </div>
  );
};

export default CollectCoinsContainer;
