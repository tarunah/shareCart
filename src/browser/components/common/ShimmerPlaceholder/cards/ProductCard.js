import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(Styles.timelineItem, Styles.flexRow, className)}
    data-testid="shimmer-productCard"
  >
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.image,
        Styles.marginRight12
      )}
    />
    <div className={concatClassNames(Styles.flexColumn, Styles.productInfo)}>
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.lineFullWidth
        )}
      />
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line176,
          Styles.marginTop4
        )}
      />
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line96,
          Styles.marginTop8
        )}
      />

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop12)}>
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line96,
            Styles.marginRight12
          )}
        />
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line96)}
        />
      </div>

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop12)}>
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line48,
            Styles.marginRight12
          )}
        />
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line48)}
        />
      </div>

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop12)}>
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.rect16,
            Styles.marginRight12
          )}
        />
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line24)}
        />
      </div>
    </div>
  </div>
);
