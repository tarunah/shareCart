import React from 'react';

import get from 'lodash/get';
import useModal from 'customHooks/useModal';
import { getViewOrder } from 'commonBrowserUtils/ConfirmationHelper';
import { getCloudinaryImage } from 'commonBrowserUtils/imageUtils';
import Image from 'commonComp/Image';
import { currencyValue } from 'commonBrowserUtils/Helper';
import Modal from 'commonComp/Modal';
import { onClickTriggerEvent } from '../index';
import ConveniencePay from '../../ConveniencePay';
import Styles from '../cardComponents.base.css';

const ViewOrder = props => {
  const {
    dataState: {
      data: {
        productData: { styles }
      }
    }
  } = props;

  const [isModalOpen, toggleModal] = useModal(false);
  const orderData = get(props, 'dataState.data.bountyOrder');
  return (
    <div
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      }`}
    >
      <div
        onClick={getViewOrder(
          get(props, 'dataState.data.bountyOrder.storeOrderId')
        )}
      >
        <div className={Styles.imageStack}>
          <div className={Styles.imageContainer}>
            <Image
              className={Styles.circularImage}
              src={getCloudinaryImage(
                `${get(styles[0], 'styleImages.default.securedDomain')}${get(
                  styles[0],
                  'styleImages.default.resolutionFormula'
                )}`,
                80,
                80
              )}
              width="40"
              height="40"
              nonCloudinary={true}
              showBackgroundColor={false}
            />
          </div>
          {styles.length > 1 ? (
            styles.length === 2 ? (
              <div
                className={`${Styles.imageContainer} ${Styles.overlayImage}`}
              >
                <Image
                  className={Styles.circularImage}
                  src={getCloudinaryImage(
                    `${get(
                      styles[1],
                      'styleImages.default.securedDomain'
                    )}${get(
                      styles[1],
                      'styleImages.default.resolutionFormula'
                    )}`,
                    80,
                    80
                  )}
                  width="40"
                  height="40"
                  nonCloudinary={true}
                  showBackgroundColor={false}
                />
              </div>
            ) : (
              <div
                className={`${Styles.imageContainer} ${Styles.overlayCount}`}
              >
                +{styles.length - 1}
              </div>
            )
          ) : (
            ''
          )}
        </div>
        <div className={Styles.cardHeading}>
          <span>Amount Payable </span>
          <span>
            ₹
            {currencyValue(
              get(
                props,
                'dataState.data.bountyOrder.payments.aggregateOrderAmount'
              ) / 100
            )}
          </span>
        </div>
        <div
          className={Styles.viewOrder}
          onClick={() => {
            onClickTriggerEvent(
              'DOPE_PAYMENT_FAILED_VIEW_ORDER_CLICK',
              orderData
            );
            getViewOrder(get(props, 'dataState.data.bountyOrder.storeOrderId'));
          }}
        >
          Track/View Order
        </div>
      </div>
      <div className={Styles.dashedLine} />
      <div className={Styles.subcardDesc}>
        <span>
          You can pay online using Pay Now option from orders or you can Pay on
          Delivery (Cash/UPI).
        </span>
        <span
          className={Styles.seeHow}
          onClick={() => {
            onClickTriggerEvent('DOPE_PAYMENT_FAILED_SEE_HOW_CLICK', orderData);
            toggleModal();
          }}
        >
          See How
        </span>
      </div>
      {isModalOpen && (
        <Modal
          cancelCallback={toggleModal}
          className={
            props.mode === 'desktop' ? Styles.desktopModal : Styles.mobileModal
          }
          cancelIconConfig={{ show: true }}
        >
          <ConveniencePay />
        </Modal>
      )}
    </div>
  );
};

export default ViewOrder;
