import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

export default ({ className = '' }) => (
  <div
    className={concatClassNames(Styles.flexRow, Styles.btnContainer, className)}
    data-testid="shimmer-btnCard"
  >
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12
      )}
    />
    <div
      className={concatClassNames(Styles.animatedBackground, Styles.line176)}
    />
    <div
      className={concatClassNames(
        Styles.animatedBackground,
        Styles.rect24,
        Styles.marginRight12,
        Styles.pushRight
      )}
    />
    <div
      className={concatClassNames(Styles.animatedBackground, Styles.rect24)}
    />
  </div>
);
