import React from 'react';
import Styles from './trackOrders.base.css';
import PropTypes from 'prop-types';
import ImageBanner from 'commonComp/ImageBanner';

const TrackOrdersModule = props => {
  return (
    <div className={`${Styles.bagContainer} ${props.trackOrdersClass}`}>
      <div className={Styles.myntraBagIcon}>
        <ImageBanner name="shopping-bag" className={Styles.shoppingBag} />
      </div>
      <div className={Styles.subText}>
        <div>Track & manage your orders easily</div>
        <div
          className={Styles.viewOrdersButton}
          onClick={props.viewOrdersTriggerEvent}
        >
          <a
            href={`/my/order/details?storeOrderId=${props.storeOrderId}&fromConfirmation=true`}
          >
            View Orders
          </a>
        </div>
      </div>
    </div>
  );
};

TrackOrdersModule.propTypes = {
  trackOrdersClass: PropTypes.string,
  storeOrderId: PropTypes.string,
  viewOrdersTriggerEvent: PropTypes.func
};

export default TrackOrdersModule;
