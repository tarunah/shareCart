import React from 'react';
import debounce from 'lodash/debounce';
import { isElementInView, getUidx } from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import Image from 'commonComp/Image';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { checkoutPage } from 'commonUtils/constants';
import Styles from './myntraValuesStrip.base.css';

let debouncedFn = () => {};

const fireEvent = currentPage => {
  triggerEvent('MYNTRA_VALUES_STRIP_LOAD', {
    custom: {
      custom: {
        v1: getUidx()
      },
      widget: {
        name: `${currentPage}_myntra_values_load`,
        type: 'banner'
      }
    }
  });
};

const scrollIntoViewHandler = (node, currentPage) => {
  debouncedFn = debounce(() => {
    if (isElementInView(node)) {
      fireEvent(currentPage);
      document.removeEventListener('scroll', debouncedFn);
    }
  }, 200);
  return debouncedFn;
};

const setReference = (node, currentPage) => {
  try {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          fireEvent(currentPage);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 1
      }
    );
    node && observer.observe(node);
  } catch (e) {
    node &&
      document.addEventListener(
        'scroll',
        scrollIntoViewHandler(node, currentPage)
      );
  }
};

const getImageUrl = props => {
  const currentPage = props.currentPage;
  const myntraValuesUrl = getKVPairValue('MYNTRA_VALUES_IMG');
  if (
    currentPage === checkoutPage.CART &&
    !isFeatureEnabled('CART_TRUST_AND_SAFETY_MARKER')
  ) {
    return myntraValuesUrl.contactlessBannerUrl;
  } else if (
    currentPage === checkoutPage.PAYMENT &&
    isFeatureEnabled('PAYMENT_VALUE_STRIP')
  ) {
    return myntraValuesUrl.paymentBannerUrl;
  }
};

const MyntraValuesStrip = React.memo(props => {
  const imgUrl = getImageUrl(props);
  return imgUrl ? (
    <div ref={node => setReference(node, props.currentPage)}>
      <Image
        className={Styles.stripImg}
        src={imgUrl}
        showBackgroundColor={false}
      />
    </div>
  ) : null;
});

export default MyntraValuesStrip;
