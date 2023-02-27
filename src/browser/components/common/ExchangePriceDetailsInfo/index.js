import React from 'react';

import Styles from './exchangePriceDetailsInfo.base.css';
import Info from 'iconComp/Info.jsx';

const ExchangePriceDetailsInfo = () => (
  <div className={Styles.container} id="priceBlock">
    <div className={Styles.phContainer}>
      <div className={`${Styles.ph} ${Styles.div1}`} />
      <div className={`${Styles.ph} ${Styles.div2}`} />
    </div>
    <div className={Styles.phContainer}>
      <div className={`${Styles.ph} ${Styles.div3}`} />
      <div className={`${Styles.ph} ${Styles.div4}`} />
    </div>

    <div className={Styles.infoContainer}>
      <Info className={Styles.infoIcon} fill="#ff5722" />
      <div className={Styles.infoMessage}>
        <span className={Styles.bold}>Keep only one new item in you bag</span>
        {` to see the payment details for this exchange`}
      </div>
    </div>
  </div>
);

export default ExchangePriceDetailsInfo;
