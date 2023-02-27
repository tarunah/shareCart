import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getDeliverRangeInfo, getDeliveryDateRange } from '@myntra/range-util';

// Styles
import Style from './serviceability.base.css';

// Utils
import { getAbtest } from 'commonUtils/abtestManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  transformImageUrl,
  getUidx,
  getTimeBasedDate,
  getDateDiff,
  getFullDateDiff
} from 'commonBrowserUtils/Helper';

import {
  getEstimatedDate,
  getChangedShippingEstimate,
  getNotServiceableMessage
} from 'commonBrowserUtils/AddressHelper';
import Strings from 'commonBrowserUtils/Strings';
import Timer from 'commonComp/Timer';

const TryAndBuyInfo = ({
  tryNBuyServiceable,
  tryNBuyAvailable,
  tryNBuyApplicable
}) => {
  const enabled = isFeatureEnabled('TRY_AND_BUY');
  if (!enabled || !tryNBuyAvailable || !tryNBuyApplicable) {
    return null;
  }

  return <div className={Style.tryNBuyInfo}>Eligible for Try & Buy</div>;
};

class DeliverEstimation extends React.Component {
  constructor(props) {
    super(props);
    this.showDaysToDelivery = isFeatureEnabled('DAYS_TO_DELIVERY');
    this.userUidx = getUidx();
    this.rangeBasedDate = null;
  }

  componentDidMount() {
    const { pincode, serviceable, styleId } = this.props;

    if (!serviceable) {
      triggerEvent('NOT_SERVICEABLE_ADDRESS_ITEM', {
        gaLabel: `${pincode}_${styleId}`
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { pincode, serviceable, styleId } = this.props;

    if (!serviceable && prevProps.serviceable !== serviceable) {
      triggerEvent('NOT_SERVICEABLE_ADDRESS_ITEM', {
        gaLabel: `${pincode}_${styleId}`
      });
    }
  }

  render() {
    const {
      image,
      tryNBuyInfo,
      showLabel,
      shippingMethod,
      tryNBuyServiceable,
      expressDeliveryAvailable,
      expressDeliveryThreshold,
      isAllEssentialItemsServiceable,
      pincode,
      tryNBuyApplicable,
      serviceable,
      isEssential,
      eligibileShippingAttribute,
      shippingEstimates = [],
      updateDeliveryEstimates
    } = this.props;

    const imageUrl = transformImageUrl(image.secureSrc, '64', '48', '100');

    let estimate,
      isSpeed11,
      estimateInDays,
      isExpressDeliveryItem,
      estimatedDate,
      showOrderBy,
      orderByDateDiff,
      estimateMap = {
        HYPERLOCAL: [],
        SDD: [],
        EXPRESS: [],
        NORMAL: [],
        VALUE_SHIPPING: []
      };
    if (shippingEstimates.length > 0) {
      shippingEstimates.forEach((est, idx) => {
        est && est.shippingMethod && estimateMap[est.shippingMethod]?.push(est);
      });
      if (estimateMap.HYPERLOCAL.length > 0) {
        estimate = estimateMap.HYPERLOCAL[0];
      } else if (estimateMap.SDD.length > 0) {
        estimate = estimateMap.SDD[0];
      } else if (
        isFeatureEnabled('SPEED_11') &&
        estimateMap.EXPRESS.length > 0
      ) {
        estimate = estimateMap.EXPRESS[0];
        isSpeed11 = true;
      } else if (estimateMap.NORMAL.length > 0) {
        estimate = estimateMap.NORMAL[0];
      } else if (estimateMap.VALUE_SHIPPING.length > 0) {
        estimate = estimateMap.VALUE_SHIPPING[0];
      }

      if (isSpeed11) {
        estimateInDays = getDateDiff(new Date(), get(estimate, 'promiseDate'));
        estimatedDate = getTimeBasedDate(get(estimate, 'promiseDate'));
      } else {
        const currentDate = new Date();
        estimateInDays = getDateDiff(currentDate, get(estimate, 'promiseDate'));

        isExpressDeliveryItem =
          expressDeliveryAvailable &&
          isFeatureEnabled('SHOW_EXPRESS_DELIVERY') &&
          estimateInDays <= expressDeliveryThreshold;

        estimateInDays = getChangedShippingEstimate(
          estimateInDays,
          estimate?.shippingMethod,
          pincode
        );
        estimatedDate = getEstimatedDate(estimateInDays);
      }

      triggerEvent('ADDRESS_DAYS_TO_DELIVERY', {
        custom: {
          custom: {
            v1: this.userUidx,
            v2: estimateInDays,
            v3: shippingMethod,
            v4: eligibileShippingAttribute
          },
          widget: {
            name: 'address_delivery_time',
            type: 'card'
          },
          event_type: 'widgetLoad'
        }
      });
      orderByDateDiff = getFullDateDiff(get(estimate, 'orderBy'));
      showOrderBy =
        orderByDateDiff.hours >= 0 &&
        orderByDateDiff.minutes >= 0 &&
        orderByDateDiff.seconds >= 0 &&
        isSpeed11 &&
        isFeatureEnabled('CART_ITEM_ORDER_BY');
    }

    const getRangeBasedDates = promiseDate => {
      const RangeBasedBucketName = getAbtest('RANGE_BASED_PROMISE');
      const rangeBasedInfo = getDeliverRangeInfo(
        Number(promiseDate),
        RangeBasedBucketName
      );
      if (
        rangeBasedInfo?.isRangeApplicable &&
        promiseDate &&
        !this.showDaysToDelivery &&
        !isSpeed11
      ) {
        this.rangeBasedDate = getDeliveryDateRange(
          Number(promiseDate),
          RangeBasedBucketName,
          rangeBasedInfo.diff
        );
        return 'Delivery between';
      }

      this.rangeBasedDate = `${estimatedDate}${
        this.showDaysToDelivery && !isSpeed11
          ? ` - in ${estimateInDays} ${estimateInDays > 1 ? 'Days' : 'Day'}`
          : ''
      }`;

      return Strings.DELIVERY_ESTIMATED_MESSAGE;
    };
    const deliveryOrderNowAB = isFeatureEnabled('ADDRESS_DELIVERY_ORDER_NOW');
    const preText =
      deliveryOrderNowAB === 'orderNowStart'
        ? Strings.DELIVERY_ORDER_NOW_START
        : deliveryOrderNowAB === 'orderNowEnd'
        ? Strings.DELIVERY_ORDER_NOW_END_PART1
        : getRangeBasedDates(estimate?.promiseDate);
    const postText =
      deliveryOrderNowAB === 'orderNowEnd'
        ? Strings.DELIVERY_ORDER_NOW_END_PART2
        : '';
    return (
      <div className={Style.deliveryContainer}>
        <img src={imageUrl} className={Style.imgStyle} />
        <div className={Style.deliveryInfo}>
          {isFeatureEnabled('ESSENTIAL_TAG') && isEssential && (
            <div className={Style.essentialTag}>Essential</div>
          )}
          {serviceable ? (
            <div>
              <div>
                {showLabel &&
                  (isExpressDeliveryItem ? (
                    <span className={Style.expressDeliveryLabel}>
                      {'Express Delivery by '}
                    </span>
                  ) : (
                    <span>{`${preText} `}</span>
                  ))}
                <span className={Style.estimatedDate}>
                  {this.rangeBasedDate || estimatedDate}
                </span>
                {postText && <span>{` ${postText}`}</span>}
                {showOrderBy && (
                  <div>
                    <span
                      className={Style.orderByTimer}
                    >{`Order within `}</span>
                    <Timer
                      hours={orderByDateDiff.hours}
                      minutes={orderByDateDiff.minutes}
                      seconds={orderByDateDiff.seconds}
                      className={Style.orderByTimer}
                      stopCallback={updateDeliveryEstimates}
                    />
                  </div>
                )}
              </div>
              <TryAndBuyInfo
                tryNBuyAvailable={tryNBuyInfo.enabled}
                tryNBuyServiceable={tryNBuyServiceable}
                tryNBuyApplicable={tryNBuyApplicable}
              />
            </div>
          ) : (
            <div className={Style.notServiceableMsg}>
              {getNotServiceableMessage({
                isAllEssentialItemsServiceable,
                type: 'item',
                pincode
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const ShippingNotification = ({ noBorder }) => {
  let show = isFeatureEnabled('SHIPPING_NOTIFICATION');
  let className = Style.notification;

  if (noBorder) {
    className += ` ${Style.noBorder}`;
  }
  return show ? (
    <div className={className}>
      <span className={Style.note}>Please Note: </span>
      {getKVPairValue('SHIPPING_MESSAGE')}
    </div>
  ) : null;
};

class Serviceability extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      productDeliveryInfo,
      addressInfo: { pincode },
      showLabel,
      shippingData,
      tryNBuyServiceable,
      expressDeliveryAvailable,
      expressDeliveryThreshold,
      headerClassName,
      tryNBuyApplicable,
      isAllEssentialItemsServiceable,
      eligibileShippingAttribute,
      updateDeliveryEstimates
    } = this.props;

    return (
      <div className={Style.container}>
        <div className={`${Style.title} ${headerClassName}`}>
          DELIVERY ESTIMATES
        </div>
        <ShippingNotification noBorder={!!headerClassName} />
        <div className={Style.list}>
          {productDeliveryInfo.map(info => (
            <DeliverEstimation
              {...info}
              key={`items_${info.id}`}
              showLabel={showLabel}
              shippingMethod={shippingData.method}
              tryNBuyServiceable={tryNBuyServiceable}
              expressDeliveryAvailable={expressDeliveryAvailable}
              expressDeliveryThreshold={expressDeliveryThreshold}
              pincode={pincode}
              tryNBuyApplicable={tryNBuyApplicable}
              isAllEssentialItemsServiceable={isAllEssentialItemsServiceable}
              eligibileShippingAttribute={eligibileShippingAttribute}
              updateDeliveryEstimates={updateDeliveryEstimates}
            />
          ))}
        </div>
      </div>
    );
  }
}

Serviceability.propTypes = {
  showTitle: PropTypes.bool,
  showLabel: PropTypes.bool,
  shippingData: PropTypes.object.isRequired,
  productDeliveryInfo: PropTypes.array.isRequired,
  expressDeliveryAvailable: PropTypes.bool,
  expressDeliveryThreshold: PropTypes.number,
  tryNBuyApplicable: PropTypes.bool,
  updateDeliveryEstimates: PropTypes.func
};

Serviceability.defaultProps = {
  showTitle: true,
  showLabel: true,
  expressDeliveryAvailable: false
};

export default Serviceability;
