import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ className }) => (
  <div
    className={concatClassNames(Styles.timelineItem, Styles.flexRow, className)}
    data-testid="shimmer-addressCard"
  >
    <div className={Styles.flexColumn}>
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.line240)}
      />
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line176,
          Styles.marginTop4
        )}
      />
    </div>
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.line48,
        Styles.pushRight
      )}
    />
  </div>
);
