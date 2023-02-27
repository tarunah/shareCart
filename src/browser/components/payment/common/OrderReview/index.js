import get from 'lodash/get';
import React, { useEffect } from 'react';
import Accordian from 'commonComp/Accordian';
import { Tab } from 'commonComp/TabBar';
import Styles from './orderReview.base.css';
import Strings from 'commonBrowserUtils/Strings';
import { ImageStack } from './ImageStack';
import ItemsBlock from './ItemsBlock';
import { getDeliveryEstimateRange } from 'commonBrowserUtils/Helper';

const getHeading = cartProducts => {
  return (
    <div>
      <div className={Styles.leftHeading}>
        <ImageStack cartProducts={cartProducts} />
      </div>
      <div className={Styles.rightHeading}>
        <div className={Styles.heading}>
          {Strings.ORDER_REVIEW_HEADING} ({(cartProducts || []).length})
        </div>
        <div className={Styles.subText}>
          {Strings.DELIVERY_ESTIMATED_MESSAGE}
          <span className={Styles.deliveryDates}>
            {' '}
            {getDeliveryEstimateRange(cartProducts)}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderReview = props => {
  const { cartData, mode } = props;
  let cartProducts = cartData.products.filter(
    product => product.selectedForCheckout
  );
  useEffect(() => {
    triggerEvent('ORDER_REVIEW_WIDGET_LOAD', {
      custom: {
        custom: {
          v1: cartProducts.length
        },
        widget: {
          name: 'payment_review_order'
        }
      }
    });
  }, []);

  const clickEvent = state => {
    triggerEvent('ORDER_REVIEW_WIDGET_CLICK', {
      custom: {
        custom: {
          v1: cartProducts.length,
          v2: state
        },
        widget: 'payment_review_order'
      }
    });
  };

  return (
    <div>
      <div
        className={`${Styles.paymentOptionsBlock} ${
          mode === 'desktop' ? Styles.paymentOptionsBlockBorder : ''
        }`}
      >
        <Accordian
          defaultSelect={false}
          mode={mode}
          isOrderReview={true}
          isFirstTimeCustomer={get(
            cartData,
            'userDetails.isFirstTimeCustomer',
            false
          )}
          onTabClick={clickEvent}
          onSwitchTab={() => {}}
        >
          <Tab
            id="orderReview"
            display={getHeading(cartProducts)}
            show={true}
            content={<ItemsBlock cartProducts={cartProducts} />}
          />
        </Accordian>
      </div>
    </div>
  );
};

export default OrderReview;
