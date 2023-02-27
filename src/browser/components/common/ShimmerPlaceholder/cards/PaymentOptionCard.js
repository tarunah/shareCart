import React from 'react';
import { concatClassNames } from 'commonBrowserUtils/Helper';

import Styles from '../shimmerPlaceholder.base.css';

import PaymentOptionLeftCard1 from './PaymentOptionLeft/PaymentOptionLeftCard1';
import PaymentOptionLeftCard2 from './PaymentOptionLeft/PaymentOptionLeftCard2';
import PaymentOptionRightCard1 from './PaymentOptionRight/PaymentOptionRightCard1';
import PaymentOptionRightCard2 from './PaymentOptionRight/PaymentOptionRightCard2';

export default ({ className = '' }) => (
  <>
    <div className={Styles.paymentDekstopContiner}>
      <div className={Styles.paymentOptionLeft}>
        <PaymentOptionLeftCard1 className={Styles.line148} />
        <PaymentOptionLeftCard1 className={Styles.line109} />
        <PaymentOptionLeftCard1 className={Styles.line148} />
        <PaymentOptionLeftCard1 className={Styles.line76} />
        <PaymentOptionLeftCard1 className={Styles.line109} />
        <PaymentOptionLeftCard1 className={Styles.line33} />
        <PaymentOptionLeftCard2 />
        <PaymentOptionLeftCard1 className={Styles.line76} />
        <div
          className={concatClassNames(
            Styles.flexRow,
            Styles.paymentOptionContainer,
            Styles.paymentOptionContainerEnd
          )}
        />
      </div>
      <div className={Styles.paymentOptionRight}>
        <div
          className={concatClassNames(
            Styles.flexRow,
            Styles.paymentOptionContainerRight,
            className
          )}
          data-testid="shimmer-paymentOptionRightCard1"
        >
          <div
            className={concatClassNames(
              Styles.animatedBackground,
              Styles.line176,
              Styles.marginBottom34,
              Styles.marginTop4
            )}
          />
          <PaymentOptionRightCard1 />
          <PaymentOptionRightCard1 />
          <PaymentOptionRightCard2 />
          <PaymentOptionRightCard1 />
          <PaymentOptionRightCard1 />
          <PaymentOptionRightCard2 className={Styles.unsetBorder} />
        </div>
      </div>
    </div>
  </>
);
