import React from 'react';

import get from 'lodash/get';
import Styles from '../cardComponents.base.css';
import Image from 'commonComp/Image';

const ItemsList = props => {
  return (
    <div>
      {get(props, 'dataState.data.productData.styles', []).map(style => {
        return (
          <div
            className={Styles.itemsListContainer}
            data-testid="confirmation-itemsList"
          >
            <Image
              src={`${get(style, 'styleImages.default.securedDomain')}${get(
                style,
                'styleImages.default.resolutionFormula'
              )}`}
              width={33}
              height={44}
              className={Styles.itemImage}
            />
            <div className={Styles.itemDesc}>
              <div className={Styles.brandName}>{style.brandName}</div>
              <div>{style.productDisplayName}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemsList;
