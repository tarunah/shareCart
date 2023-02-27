import React from 'react';

import Styles from './giftWrapDetails.base.css';

import ImageBanner from 'commonComp/ImageBanner';

const GiftWrapDetails = () => {
  return (
    <div>
      <div className={Styles.header}>
        <div className={Styles.title}>HOW DOES IT WORK?</div>
        <div className={Styles.line} />
      </div>
      <div className={Styles.content}>
        <div className={Styles.row}>
          <ImageBanner name="giftwrap-card" className={Styles.sprite} />
          <div className={Styles.title}>Personalised card</div>
          <div className={Styles.info}>
            Your message will be printed on a card placed inside the package.
          </div>
        </div>
        <div className={Styles.row}>
          <ImageBanner name="giftwrap-invoice" className={Styles.sprite} />
          <div className={Styles.title}>Invoice will be included</div>
          <div className={Styles.info}>
            The receiver will get an invoice showing the amount you pay or the
            discount applied.
          </div>
        </div>
        <div className={Styles.row}>
          <ImageBanner name="giftwrap-tag" className={Styles.sprite} />
          <div className={Styles.title}>
            Original product tags will be retained
          </div>
          <div className={Styles.info}>
            Original product tags with MRP will be left intact in-case you’d
            like to exchange for a different size.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftWrapDetails;
