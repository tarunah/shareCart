import React from 'react';

import { concatClassNames } from 'commonBrowserUtils/Helper/index';

import Styles from '../shimmerPlaceholder.base.css';

const PriceContainer = ({ className = '' }) => {
  return (
    <div
      className={concatClassNames(
        Styles.timelineItem,
        Styles.flexColumn,
        className
      )}
      data-testid="shimmer-priceContainer"
    >
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line176,
          Styles.marginTop8
        )}
      />

      <div className={Styles.borderBottom} />

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop16)}>
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line56)}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line56,
            Styles.pushRight
          )}
        />
      </div>

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop16)}>
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line96)}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line56,
            Styles.pushRight
          )}
        />
      </div>

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop16)}>
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line176
          )}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line56,
            Styles.pushRight
          )}
        />
      </div>

      <div className={Styles.borderBottom} />

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop16)}>
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line56)}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line56,
            Styles.pushRight
          )}
        />
      </div>
      <div className={Styles.marginTop8} />
    </div>
  );
};

export default PriceContainer;
