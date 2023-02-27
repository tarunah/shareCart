import React from 'react';
import PropTypes from 'prop-types';
import PriceDetail from '../PriceDetail';
import { onEnteringViewport, getUidx, isApp } from 'commonBrowserUtils/Helper';

import Styles from './priceBreakUp.base.css';

const fireEvent = () => {
  if (isApp()) {
    triggerEvent('PRICE_BLOCK_SCROLL_INTO_VIEW', {
      custom: {
        custom: {
          v1: getUidx()
        },
        widget: {
          name: `price_block_seen`,
          type: 'card'
        }
      }
    });
  }
};

const setReference = node => {
  try {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          fireEvent();
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
      document.addEventListener('scroll', onEnteringViewport(node, fireEvent));
  }
};

const PriceBreakup = ({ priceDetails, ...props }) => (
  <div className={Styles.orderSummary} id="priceBlock" ref={setReference}>
    {priceDetails.map(priceInfo => (
      <PriceDetail
        key={`{price-${(priceInfo.name || ' ').replace(' ', '-')}}`}
        {...priceInfo}
        {...props}
      />
    ))}
  </div>
);

PriceBreakup.propTypes = {
  priceDetails: PropTypes.array
};

export default PriceBreakup;
