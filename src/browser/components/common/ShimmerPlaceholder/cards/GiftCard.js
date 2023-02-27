import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(
      Styles.timelineItem,
      Styles.flexColumn,
      className
    )}
    data-testid="shimmer-giftCard"
  >
    <div
      className={concatClassNames(Styles.animatedBackground, Styles.line176)}
    />
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.horizontalBox,
        Styles.marginTop12
      )}
    />
  </div>
);
