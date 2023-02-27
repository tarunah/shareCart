import React from 'react';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import { checkoutPage } from 'commonUtils/constants';

import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import { bool, isLoggedIn } from 'commonBrowserUtils/Helper';
import {
  getNonServiceableItems,
  getOOSItems,
  getPriceChangeInfo,
  toggleOosCartHc
} from 'commonBrowserUtils/CartHelper';
import { invalidItemsReason } from 'commonBrowserUtils/CartConstants';

// common component
import ImageBanner from 'commonComp/ImageBanner';
import BankOffers from 'commonComp/BankOffers';
import Offers from 'commonComp/OffersV2';
import Modal from 'commonComp/Modal';
import Image from 'commonComp/Image';
import LoginShippingText from 'commonComp/LoginShippingText';

import { SavingsFeedback } from '../HeaderComponents';

import Styles from './messageContainer.base.css';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import PriceDrop from 'iconComp/PriceDrop.jsx';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

// -----------------------------------------------------------------------------
const renderModalComponent = (title, body, props) => {
  const { mode } = props;
  const isDesktop = mode === 'desktop';

  return (
    <Modal
      halfCard={!isDesktop}
      className={`${
        isDesktop ? Styles.desktopModalContainer : Styles.mobileModalContainer
      }`}
      cancelCallback={props.closeAll}
      cancelIconConfig={{
        show: true
      }}
      disableBackdropClick={true}
    >
      <div className={Styles.modalHeader}>{title}</div>
      <div>{body}</div>
    </Modal>
  );
};

// -----------------------------------------------------------------------------
export const getOfferComponent = props => {
  if (props.isExchangeCart) {
    return null;
  }

  const price = get(props, 'price');
  const config = getKVPairValue('CART_OFFER_MESSAGES');

  const messages = get(config, 'cart.messages', []);
  const total = getTotal(DiscountUtil.getPrice(price), getCartFields());
  const mode = get(props, 'mode');
  if (get(config, 'cart.enabled', false)) {
    if (isFeatureEnabled('VISUAL_OFFER')) {
      return (
        <BankOffers
          messages={messages}
          currentPage={checkoutPage.CART}
          total={total}
          mode={mode}
          titleInCaptital={props.bankOffertitleInCaptital}
          bankOfferTitleStyle={props.bankOfferTitleStyle}
          bankOfferPillContainer={props.bankOfferPillContainer}
        />
      );
    }
    return (
      <Offers
        title={'Available Offers'}
        messages={messages}
        defaultMessageCount={1}
        enabled={
          bool(get(config, 'cart.enabled', false)) && messages.length > 0
        }
      />
    );
  }
  return null;
};

// -----------------------------------------------------------------------------
export const getServiceableComponent = props => {
  const nonServiceableItems = getNonServiceableItems(props.products);
  if (nonServiceableItems && nonServiceableItems.length > 0) {
    const { pincode } = UserLocationDetailsUtil.getLocation();
    const notServiceableMsg = get(props, 'cartMessageConfig.unserviceable', '');
    const pincodeText = <span className={Styles.highlightText}>{pincode}</span>;
    const cartModal = getKVPairValue('CART_MODAL_CONTENT');
    const showCartModal = () =>
      props.displayCartModal({
        ...cartModal.nonServiceable,
        context: invalidItemsReason.NON_SERVICEABLE
      });
    return (
      <div className={Styles.container}>
        <ImageBanner name="ship-charge" className={Styles.nonServiceableIcon} />
        <div className={Styles.messageText}>
          {notServiceableMsg.split('%').map(text => {
            if (text === 'pincode') {
              return pincodeText;
            }
            return text;
          })}
        </div>
        <div className={Styles.viewDetails} onClick={showCartModal}>
          VIEW
        </div>
      </div>
    );
  }

  return null;
};

// -----------------------------------------------------------------------------
export const getPriceIncreaseComponent = props => {
  let component = null;

  if (get(props, 'conflict.price.state') === 'CONFLICTED') {
    const { netDiff, products } = getPriceChangeInfo(
      get(props, 'products') || []
    );
    if (netDiff >= 0) {
      let messageText = get(props, 'cartMessageConfig.priceChange', '');

      if (get(props, 'conflict.seller.state') === 'CONFLICTED') {
        messageText = get(props, 'cartMessageConfig.priceAndSellerChange', '');
      }

      component = (
        <div className={Styles.container}>
          <ImageBanner name="price-change" className={Styles.priceChangeIcon} />
          <div className={Styles.messageText}>{messageText}</div>
        </div>
      );
    }
  }

  return component;
};

// -----------------------------------------------------------------------------
export const getPriceDecreaseComponent = props => {
  let component = null;

  if (get(props, 'conflict.price.state') === 'CONFLICTED') {
    const { netDiff, products } = getPriceChangeInfo(
      get(props, 'products') || []
    );
    if (netDiff < 0) {
      const priceDropMsg = get(props, 'cartMessageConfig.bagPriceDrop', '');
      const priceText = (
        <span className={Styles.highlightText}>
          <RupeeBold className={Styles.rupeeIcon} />
          {Math.abs(netDiff)}
        </span>
      );
      const title = priceDropMsg
        .split('%')
        .map(text => (text === 'price' ? priceText : text));

      const { isPriceDetailsOpen, isModalOpen } = props;

      const priceDropDetails = (
        <div className={Styles.priceDropBody}>
          {products.map(obj => (
            <div className={Styles.priceDropCard}>
              <Image src={obj.image} width={33} height={44} visible="true" />
              <div className={Styles.priceDropCardDetails}>
                <div className={Styles.highlightText}>{obj.brand}</div>
                <div className={Styles.priceDropInfo}>
                  {obj.diff < 0 ? `Price dropped by ` : `Price changed by `}
                  <PriceDrop
                    className={
                      obj.diff < 0
                        ? Styles.priceDropInfoIcon
                        : Styles.priceChangeInfoIcon
                    }
                  />
                  <div className={Styles.highlightText}>
                    {' '}
                    <RupeeBold className={Styles.rupeeIcon} />
                    {Math.abs(obj.diff)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

      component = (
        <div className={Styles.priceDropContainer}>
          <div className={Styles.priceDropHeader}>
            <PriceDrop className={Styles.priceDropIcon} />
            <div className={Styles.messageText}>{title}</div>
            <div
              className={Styles.viewDetails}
              onClick={() => props.toggleSwitch('isPriceDetailsOpen')}
            >
              View
            </div>
          </div>
          {isPriceDetailsOpen &&
            (isModalOpen
              ? priceDropDetails
              : renderModalComponent(
                  <div className={Styles.priceDropInfo}>
                    <PriceDrop className={Styles.priceDropIcon} />
                    <div className={Styles.messageText}>{title}</div>
                  </div>,
                  priceDropDetails,
                  props
                ))}
        </div>
      );
    }
  }

  return component;
};

// -----------------------------------------------------------------------------
export const getOOSComponent = props => {
  const oosItems = getOOSItems(get(props, 'products') || []);
  if (!oosItems || !oosItems.length) {
    return null;
  }

  return (
    <div className={Styles.container}>
      <ImageBanner name="oos" className={Styles.oosIcon} />
      <div className={Styles.messageText}>
        <span className={Styles.highlightText}>Item(s) out of stock.</span>
      </div>
      <div
        className={Styles.viewDetails}
        onClick={() => toggleOosCartHc(props.displayCartModal)}
      >
        View
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
export const getVBConflictComponent = props => {
  if (get(props, 'virtualBundleConflict')) {
    return (
      <div className={Styles.container}>
        <ImageBanner name="oos" className={Styles.priceChangeIcon} />
        <div className={Styles.messageText}>
          <span className={Styles.highlightText}>
            Items repeated in your bag.
          </span>
          {` Please move one of the item to proceed.`}
        </div>
      </div>
    );
  }

  return null;
};

// -----------------------------------------------------------------------------
export const getCombinedMessageComponent = (childCompArr, props) => {
  const count = childCompArr.length;
  if (count) {
    const title = `${count} important message${
      count > 1 ? 's' : ''
    } for items in your Bag.`;

    return (
      <div className={Styles.combinedMessageContainer}>
        <div className={Styles.combinedMessageStrip}>
          <div>{title}</div>
          <div
            className={Styles.viewDetails}
            onClick={() => props.toggleSwitch('isModalOpen')}
          >
            View
          </div>
        </div>
        {props.isModalOpen && renderModalComponent(title, childCompArr, props)}
      </div>
    );
  }

  return null;
};

// -----------------------------------------------------------------------------
export const getSavingsFeedbackComponent = props => {
  const { price, isSavingsFeedbackEnabled, savingsFeedbackConfig } = props;
  return isSavingsFeedbackEnabled &&
    Math.round(get(price, 'totalSavings', 0)) > 0 ? (
    <SavingsFeedback
      price={price}
      savingsFeedbackConfig={savingsFeedbackConfig}
    />
  ) : null;
};

// -----------------------------------------------------------------------------
export const getLoginNudgeComponent = props => {
  const { shippingData, selectedProductCount, analytics } = props;
  if (isLoggedIn() || selectedProductCount === 0) {
    return null;
  }

  return (
    <LoginShippingText
      shippingData={shippingData}
      selectedProductCount={selectedProductCount}
      analytics={analytics}
    />
  );
};
