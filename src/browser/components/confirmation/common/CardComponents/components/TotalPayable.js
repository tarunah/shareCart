import React from 'react';

import get from 'lodash/get';
import { pluralizeText, currencyValue } from 'commonBrowserUtils/Helper';
import ItemsList from './ItemsList';
import Styles from '../cardComponents.base.css';

const TotalPayable = props => {
  const itemsCount = get(props, 'dataState.data.productData.styles', []).length;

  return (
    <div
      data-testid="totalPayable"
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      }`}
    >
      <div
        className={`${Styles.subcardHeading} ${Styles.headerContainer} ${Styles.totalPayableHeader}`}
      >
        <div>
          <div>Total payable amount</div>
          <div className={Styles.subCardSubHeading}>
            {pluralizeText(itemsCount, `Paying for ${itemsCount} item`)}
          </div>
        </div>
        <div>
          <div className={Styles.payableAmount}>
            ₹
            {currencyValue(
              get(props, 'dataState.data.bountyOrder.payments.amount') / 100
            )}
          </div>
        </div>
      </div>
      <ItemsList {...props} />
    </div>
  );
};

export default TotalPayable;
