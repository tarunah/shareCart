import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(
      Styles.flexRow,
      Styles.paymentOptionContainer,
      className
    )}
    data-testid="shimmer-paymentOptionLeftCard5"
  >
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12
      )}
    />
    <div>
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.line95)}
      />
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.line104)}
      />
    </div>
  </div>
);
