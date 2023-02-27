import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ line = 4, className = '' }) => (
  <div
    className={concatClassNames(
      Styles.timelineItem,
      Styles.flexColumn,
      className
    )}
    data-testid="shimmer-infoCard"
  >
    <div className={Styles.flexRow}>
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.rect24,
          Styles.marginRight12
        )}
      />
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          line == 1 ? Styles.line176 : Styles.line96
        )}
      />
    </div>
    {line >= 2 && (
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.lineFullWidth,
          Styles.marginTop8
        )}
      />
    )}
    {line >= 3 && (
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line176,
          Styles.marginTop4
        )}
      />
    )}
    {line === 4 && (
      <div
        className={concatClassNames(
          Styles.animatedBackground,
          Styles.line96,
          Styles.marginTop12
        )}
      />
    )}
  </div>
);
