import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import TwoLinesWithRadio from './cards/TwoLinesWithRadio';
import AddressCard from './cards/AddressCard';
import InfoCard from './cards/InfoCard';
import BtnCard from './cards/BtnCard';
import ProductCard from './cards/ProductCard';
import GiftCard from './cards/GiftCard';
import PriceContainer from './cards/PriceContainer';
import PaymentOptionCard from './cards/PaymentOptionCard';

import Styles from './shimmerPlaceholder.base.css';

const ShimmerPlaceholder = ({ type, mode, container = '' }) => {
  switch (type) {
    case 'payment': {
      if (mode === 'mobile') {
        return (
          <div className={Styles.mobileLayout} data-testid="shimmer-mobile">
            {Array(3)
              .fill('')
              .map((a, i) => (
                <TwoLinesWithRadio
                  className={Styles.marginTop12}
                  key={`twoLinesWithRadio_${i}`}
                />
              ))}
            <PriceContainer className={Styles.marginTop12} />
          </div>
        );
      } else if (mode === 'desktop') {
        if (container === 'left') {
          return (
            <div
              className={concatClassNames(
                Styles.desktopLeft,
                Styles.desktopLeftPayment,
                Styles.desktopPaymentOption
              )}
            >
              <PaymentOptionCard />
            </div>
          );
        } else if (container === 'right') {
          return (
            <div
              className={concatClassNames(
                Styles.desktopRight,
                Styles.desktopRightPayment
              )}
            >
              <InfoCard className={Styles.paddingLRZero} line={1} />
              <div className={Styles.borderBottom} />
              <PriceContainer className={Styles.paddingLRZero} />
            </div>
          );
        }
      }
    }

    default: {
    }
  }

  if (mode === 'desktop') {
    return (
      <div className={Styles.desktopLayout} data-testid="shimmer-desktop">
        <div className={Styles.desktopLeft}>
          <AddressCard className={Styles.borderBox} />
          <InfoCard className={Styles.borderBox} />
          <BtnCard />

          {Array(2)
            .fill('')
            .map((a, i) => (
              <ProductCard
                className={Styles.borderBox}
                key={`productCard_${i}`}
              />
            ))}

          <InfoCard className={Styles.borderBox} line={1} />
        </div>
        <div className={Styles.desktopRight}>
          <InfoCard className={Styles.paddingLRZero} line={1} />
          <div className={Styles.borderBottom} />
          <GiftCard className={Styles.paddingLRZero} />
          <div className={Styles.borderBottom} />
          <PriceContainer className={Styles.paddingLRZero} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={Styles.mobileLayout} data-testid="shimmer-mobile">
        <AddressCard />
        <InfoCard />
        <BtnCard />

        {Array(2)
          .fill('')
          .map((a, i) => (
            <ProductCard key={`productCard_${i}`} />
          ))}

        <InfoCard line={1} />
        <GiftCard />
        <PriceContainer />
      </div>
    );
  }
};

export default ShimmerPlaceholder;
