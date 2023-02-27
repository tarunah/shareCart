import React from 'react';

import get from 'lodash/get';
import ItemsList from './ItemsList';
import Styles from '../cardComponents.base.css';
import { pluralizeText } from 'commonBrowserUtils/Helper';

const ItemsPaid = props => {
  const {
    dataState: { data }
  } = props;

  const orderId = get(data, 'bountyOrder.storeOrderId', '');
  const itemsCount = get(props, 'dataState.data.productData.styles', []).length;

  return (
    <div
      data-testid="confirmation-itemspaid"
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      }`}
    >
      <div className={`${Styles.subcardHeading} ${Styles.headerContainer}`}>
        <div className={'itemCount'}>
          {pluralizeText(itemsCount, `Paid of ${itemsCount} item`)}
        </div>
        <div
          className={Styles.subCardSubHeading}
        >{`Order ID # ${orderId}`}</div>
      </div>
      <ItemsList {...props} />
    </div>
  );
};

export default ItemsPaid;
