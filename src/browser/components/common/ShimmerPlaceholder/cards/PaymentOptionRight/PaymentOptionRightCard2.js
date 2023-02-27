import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div className={concatClassNames(Styles.paymentRightBlock, className)}>
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12
      )}
    />
    <div>
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.line100)}
      />
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.line87)}
      />
    </div>
    <div className={Styles.pushRight}>
      <div
        className={concatClassNames(Styles.animatedBackground, Styles.rect43)}
      />
    </div>
  </div>
);
