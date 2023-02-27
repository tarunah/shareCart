import React from 'react';

import Styles from './giftWrapPage.base.css';

import GiftWrapDetails from '../../../../common/GiftWrap/GiftWrapDetails';
import GiftWrapForm from '../../../../common/GiftWrap/GiftWrapForm';

import ImageBanner from 'commonComp/ImageBanner';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';

const GiftWrapPage = props => {
  const {
    giftOrder: { data: details }
  } = props.data;
  setDocTitleInMobile('GIFT WRAP');
  return (
    <div>
      <div className={Styles.container}>
        <div className={Styles.imageContainer}>
          <ImageBanner name="giftwrap-1" className={Styles.img1} />
          <ImageBanner name="giftwrap-2" className={Styles.img2} />
        </div>
        <div className={Styles.form}>
          <GiftWrapForm
            details={details}
            showNotification={true}
            handleCartAction={props.handleCartAction}
            goBack={props.goBack}
          />
        </div>
        <div className={Styles.moreDetails}>
          <GiftWrapDetails />
        </div>
      </div>
    </div>
  );
};

export default GiftWrapPage;
