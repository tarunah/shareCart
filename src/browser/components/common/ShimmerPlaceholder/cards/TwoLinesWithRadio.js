import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(Styles.timelineItem, Styles.flexRow, className)}
    data-testid="shimmer-twoLinesWithRadio"
  >
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12
      )}
    />

    <div
      className={concatClassNames(Styles.flexColumn, Styles.paymentInstrument)}
    >
      <div className={Styles.flexRow}>
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line96)}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line96,
            Styles.pushRight
          )}
        />
      </div>

      <div className={concatClassNames(Styles.flexRow, Styles.marginTop8)}>
        <div
          className={concatClassNames(Styles.animatedBackground, Styles.line48)}
        />
        <div
          className={concatClassNames(
            Styles.animatedBackground,
            Styles.line48,
            Styles.pushRight
          )}
        />
      </div>
    </div>
  </div>
);
