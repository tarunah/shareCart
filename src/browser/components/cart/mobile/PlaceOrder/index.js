import React from 'react';
import PropTypes from 'prop-types';

import PlaceOrderContainer from '../../common/PlaceOrderContainer';
import PriorityCheckoutModal from './PriorityCheckoutModal';
import StickyButton from 'commonComp/StickyButton';
import AgreeBlock from './AgreeBlock';

import { handleCartPlaceOrder } from 'commonBrowserUtils/CartHelper';
import {
  chainFns,
  getUidx,
  isApp,
  pluralizeText
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import Styles from './placeOrder.base.css';
import { CheckoutConsumerHOC } from '@context/CheckoutContext';

const triggerProceedFromCartEvent = (mrp, totalSavings) => {
  triggerEvent('PROCEED_NEXT_FROM_CART', {
    maData: {
      value: mrp
    },
    custom: {
      custom: {
        v1: totalSavings
      }
    }
  });
};

const buttonClickHandler = props => {
  if (isApp()) {
    triggerProceedFromCartEvent(props.mrp, props.totalSavings);
  }
  props.triggerExpressCheckoutEvent && props.triggerExpressCheckoutEvent();
  handleCartPlaceOrder({ ...props, mode: 'mobile' });
};

const ItemsSelectionInfoStrip = ({ selectedProductCount }) => {
  const message =
    selectedProductCount > 0
      ? `${selectedProductCount} ${pluralizeText(
          selectedProductCount,
          'Item'
        )} selected for order`
      : `No Item selected, select at least one item to place order.`;
  return <div className={Styles.itemSelectedStrip}>{message}</div>;
};

const getStickyButtonBanner = ({
  selectedProductCount,
  pcConfig,
  togglePCModalDisplay,
  onPCConfirm,
  togglePCModal,
  showAgreeBlock = false
}) => {
  return (
    <React.Fragment>
      <ItemsSelectionInfoStrip selectedProductCount={selectedProductCount} />
      {showAgreeBlock && (
        <AgreeBlock
          config={pcConfig}
          checkoutOptionSelected={true}
          onCheckboxClick={chainFns(
            togglePCModalDisplay,
            togglePCModal,
            onPCConfirm
          )}
          maximize={togglePCModalDisplay}
          className={Styles.agreeBlock}
          minimized={true}
        />
      )}
    </React.Fragment>
  );
};

const PlaceOrder = props => {
  const placeOrderAction = () => {
    triggerEvent('CART_PLACE_ORDER', {
      custom: {
        widget: {
          name: 'bottom-nav',
          type: 'nav-bar',
          data_set: {
            data: [
              {
                entity_type: 'cart',
                entity_id: props.cartId,
                entity_name: props.total
              }
            ]
          }
        },
        widget_items: {
          name: 'place-order',
          type: 'button'
        },
        custom: {
          v1: getUidx()
        }
      }
    });
    buttonClickHandler(props);
  };

  return (
    <PlaceOrderContainer
      type="mobile"
      coverFeeOpted={props.coverFeeOpted}
      handleCartAction={props.handleCartAction}
      render={(
        { showPCModal, pcDisplay, pcConfirmed },
        pcConfig,
        { togglePCModal, togglePCModalDisplay, onPCConfirm }
      ) => (
        <div>
          {props.coverFeeApplicable ? (
            <div className={Styles.buttonContainer}>
              {pcConfirmed ? (
                <StickyButton
                  isCTAEnabled={props.isCTAEnabled}
                  text={props.placeOrderText}
                  total={props.total}
                  points={props.points}
                  updateDynamicStyles={props.updateDynamicStyles}
                  clickHandler={placeOrderAction}
                  cartItemsReturnInfo={props.cartItemsReturnInfo}
                  showReturnInfoBanner={props.showReturnInfoBanner}
                  selectedProductCount={props.selectedProductCount}
                  stickyBanner={getStickyButtonBanner({
                    selectedProductCount: props.selectedProductCount,
                    pcConfig,
                    togglePCModalDisplay,
                    onPCConfirm,
                    togglePCModal,
                    showAgreeBlock: true
                  })}
                  currentPage={props.currentPage}
                  totalQuantity={props.totalQuantity}
                />
              ) : (
                <div className={Styles.buttonBlock}>
                  <button className={Styles.button} onClick={togglePCModal}>
                    {pcConfig.buttonText}
                  </button>
                </div>
              )}
              {showPCModal && (
                <PriorityCheckoutModal
                  placeOrderText={props.placeOrderText}
                  config={pcConfig}
                  onConfirm={onPCConfirm}
                  cancelCallback={togglePCModal}
                  show={pcDisplay}
                  hideModal={togglePCModalDisplay}
                  pcConfirmed={pcConfirmed}
                  updateDynamicStyles={props.updateDynamicStyles}
                  placeOrderHandler={buttonClickHandler.bind({}, props)}
                  {...props}
                />
              )}
            </div>
          ) : (
            <StickyButton
              isCTAEnabled={props.isCTAEnabled}
              text={props.placeOrderText}
              total={props.total}
              points={props.points}
              updateDynamicStyles={props.updateDynamicStyles}
              clickHandler={buttonClickHandler.bind({}, props)}
              cartItemsReturnInfo={props.cartItemsReturnInfo}
              showReturnInfoBanner={props.showReturnInfoBanner}
              selectedProductCount={props.selectedProductCount}
              stickyBanner={getStickyButtonBanner({
                selectedProductCount: props.selectedProductCount
              })}
              currentPage={props.currentPage}
              totalQuantity={props.totalQuantity}
            />
          )}
        </div>
      )}
    />
  );
};

PlaceOrder.propTypes = {
  handleCartAction: PropTypes.func,
  displayCartModal: PropTypes.func,
  products: PropTypes.array,
  disabled: PropTypes.bool,
  virtualBundleConflict: PropTypes.bool,
  conflictState: PropTypes.string,
  total: PropTypes.number,
  points: PropTypes.number,
  coverFeeOpted: PropTypes.bool,
  coverFeeApplicable: PropTypes.bool,
  updateDynamicStyles: PropTypes.func,
  cartItemsReturnInfo: PropTypes.object,
  placeOrderText: PropTypes.string,
  cartId: PropTypes.string,
  showReturnInfoBanner: PropTypes.bool,
  selectedProductCount: PropTypes.number,
  currentPage: PropTypes.string
};

PlaceOrder.defaultProps = {
  placeOrderText: 'PLACE ORDER',
  showReturnInfoBanner: false,
  currentPage: ''
};

export default CheckoutConsumerHOC(PlaceOrder);
