import React from 'react';
import Styles from './mfu.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { currencyValue, shortNum } from 'commonBrowserUtils/Helper';
import ImageBanner from 'commonComp/ImageBanner';
import RupeeBold from 'iconComp/RupeeBold.jsx';

const MFU = ({ payable, points }) => {
  let mfuEnabled = isFeatureEnabled('MFU');
  return mfuEnabled && points ? (
    <div className={Styles.container}>
      <span className={Styles.bold}>
        <span>You pay </span>
        <RupeeBold className={Styles.rupeeIcon} />
        <span>{currencyValue(payable)}</span>
      </span>
      <span> + </span>
      <ImageBanner name="mfu-coin" className={Styles.mfuCoin} />
      <span>{` ${shortNum(points)} MynCash`}</span>
      <div className={Styles.info}>MynCash will be auto applied</div>
    </div>
  ) : null;
};

export default MFU;
