import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(Styles.flexRow, Styles.paymentOptionContainer)}
    data-testid="shimmer-paymentOptionLeftCard1"
  >
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12
      )}
    />
    <div className={concatClassNames(Styles.animatedBackground, className)} />
  </div>
);
