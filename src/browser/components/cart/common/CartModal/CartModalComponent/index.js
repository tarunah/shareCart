import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Styles from './cartModalComponent.base.css';

import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';
import ImageBanner from 'commonComp/ImageBanner';
import Image from 'commonComp/Image';
import ConfirmOrCancelModal from 'commonComp/ConfirmOrCancelModal';

import { getUidx, isLoggedIn } from 'commonBrowserUtils/Helper';
import {
  getItemName,
  getSnackBarStyleOverrides
} from 'commonBrowserUtils/CartHelper';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import { eventsObj } from './cartModalComponentEvents';

const cartModalFncs = ['removeItems', 'unselectItems', 'moveToWishlist'];

export const cartModalConstants = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  WISHLIST_SUCCESS: 'successfully moved to wishlist.',
  REMOVE_SUCCESS: 'removed from bag.',
  UNSELECT_SUCCESS: 'successfully unselected from bag.',
  WISHLIST_FAILURE: 'move items to wishlist',
  REMOVE_FAILURE: 'remove items',
  UNSELECT_FAILURE: 'unselect items',
  MOVE_TO_WISHLIST: 'Move to Wishlist',
  REMOVE: 'Remove',
  UNSELECT: 'Unselect Items',
  OOS: 'oos',
  DEFAULT_BUTTON_TEXT: 'OKAY, GOT IT'
};

export class CartModalDetailedComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.userUidx = getUidx();
    this.isModeMobile = props.mode === 'mobile';
    cartModalFncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  moveToWishlist() {
    if (!isLoggedIn()) {
      this.props.cancelCallback && this.props.cancelCallback();
      //adding delay to avoid history.goBack from Modal unmount
      setTimeout(() => {
        SHELL.redirectTo('/login?referer=/checkout/cart');
      }, 0);
    } else {
      const {
        props: { handleCartAction, invalidProducts, showDetailedOosModal }
      } = this;

      if (showDetailedOosModal) {
        eventsObj.oosWidgetButtonClickEvent(
          this.userUidx,
          cartModalConstants.MOVE_TO_WISHLIST,
          invalidProducts.length
        );
      }

      handleCartAction(
        'bulkMoveToWishlist',
        invalidProducts.map(item => ({
          itemId: item.itemId,
          id: item.id,
          skuId: item.skuId
        })),
        () => this.successCb(cartModalConstants.WISHLIST_SUCCESS),
        () => this.errorCb(cartModalConstants.WISHLIST_FAILURE)
      );
    }
  }

  removeItems() {
    const {
      props: { handleCartAction, invalidProducts, showDetailedOosModal }
    } = this;
    triggerEvent('CLICK_REMOVE_OOS');

    if (showDetailedOosModal) {
      eventsObj.oosWidgetButtonClickEvent(
        this.userUidx,
        cartModalConstants.REMOVE,
        invalidProducts.length
      );
    }

    handleCartAction(
      'removeItems',
      invalidProducts.map(item => ({ itemId: item.itemId })),
      () => this.successCb(cartModalConstants.REMOVE_SUCCESS),
      () => this.errorCb(cartModalConstants.REMOVE_FAILURE)
    );
  }

  unselectItems() {
    const {
      handleCartAction,
      invalidProducts,
      showDetailedOosModal
    } = this.props;
    const payload = (invalidProducts || [])
      .filter(
        item => get(item, 'selectedForCheckout') && !get(item, 'flags.freeItem')
      )
      .map(item => ({
        itemId: get(item, 'itemId'),
        selectedForCheckout: false,
        quantity: get(item, 'quantity'),
        sellerPartnerId: get(item, 'sellerPartnerId'),
        skuId: get(item, 'skuId')
      }));
    const eventPayload = payload.map(item => get(item, 'itemId')).join('|');
    triggerEvent('DESELECTED_ALL_PRODUCTS', {
      custom: {
        custom: { v1: eventPayload, v2: getUidx() }
      }
    });

    if (showDetailedOosModal) {
      eventsObj.oosWidgetButtonClickEvent(
        this.userUidx,
        cartModalConstants.UNSELECT_FAILURE,
        invalidProducts.length
      );
    }

    handleCartAction(
      'updateItems',
      payload,
      () => this.successCb(cartModalConstants.UNSELECT_SUCCESS),
      () => this.errorCb(cartModalConstants.UNSELECT_FAILURE)
    );
  }

  successCb(actionText) {
    CartCountHandler.updateState();
    const invalidProductsCount = this.props.invalidProducts.length;
    this.props.cancelCallback();
    if (this.props.showDetailedOosModal) {
      eventsObj.shellMessageLoadEvent(
        this.userUidx,
        cartModalConstants.SUCCESS
      );
    }
    SHELL.alert('info', {
      message: `${invalidProductsCount} ${
        invalidProductsCount === 1 ? 'Item' : 'Items'
      } ${actionText}`,
      styleOverrides: getSnackBarStyleOverrides(this.props.mode)
    });
  }

  errorCb(actionText) {
    if (this.props.showDetailedOosModal) {
      eventsObj.shellMessageLoadEvent(
        this.userUidx,
        cartModalConstants.FAILURE
      );
    }
    SHELL.alert('info', {
      message: `Failed to ${actionText}, please try again.`,
      styleOverrides: getSnackBarStyleOverrides(this.props.mode)
    });
  }

  renderItems(invalidProducts) {
    return (
      <div className={`${Styles.blockPadding} ${Styles.productsBlock}`}>
        {invalidProducts.map((item, index) => (
          <div key={`oosItem-${index}`} className={Styles.blockPadding}>
            <div className={Styles.itemImage}>
              <Image
                src={get(item, 'images[0].secureSrc')}
                width={33}
                height={44}
                visible="true"
              />
            </div>
            <div className={Styles.productDetails}>
              <div className={Styles.brandName}>{item.brand}</div>
              <div>{getItemName(item.brand, item.name)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  getButtonConfig(action, className = '') {
    let clickHandler;

    switch (action) {
      case cartModalConstants.MOVE_TO_WISHLIST:
        clickHandler = this.moveToWishlist;
        break;
      case cartModalConstants.REMOVE:
        clickHandler = this.removeItems;
        break;
      case cartModalConstants.UNSELECT:
        clickHandler = this.unselectItems;
        break;
    }

    return { text: action, clickHandler, className };
  }

  render() {
    const {
      className,
      cancelCallback,
      halfCard,
      cancelIconConfig,
      header,
      body,
      invalidProducts,
      sprite,
      secondaryButton,
      primaryButton
    } = this.props;
    return (
      <ConfirmOrCancelModal
        showModal={true}
        modalConfig={{
          halfCard: halfCard,
          cancelCallback: cancelCallback,
          cancelIconConfig: cancelIconConfig,
          className: className
        }}
        button1Config={this.getButtonConfig(secondaryButton)}
        button2Config={this.getButtonConfig(
          primaryButton,
          Styles.primaryButton
        )}
        btnClassName={Styles.unselectBtnClassName}
        containerClassName={Styles.btnContainer}
      >
        <div className={Styles.modalHeader}>
          <ImageBanner name={sprite || 'oos'} className={Styles.modalIcon} />
          <span className={Styles.modalHeaderText}>{header}</span>
        </div>
        <div className={Styles.bodyContainer}>
          <div className={Styles.modalBodyText}>{body}</div>
          {invalidProducts.length > 0 && this.renderItems(invalidProducts)}
        </div>
      </ConfirmOrCancelModal>
    );
  }
}

export class CartModalDefaultComponent extends React.PureComponent {
  render() {
    const {
      className,
      cancelCallback,
      halfCard,
      cancelIconConfig,
      header,
      body,
      sprite
    } = this.props;
    return (
      <Modal
        className={className}
        cancelCallback={cancelCallback}
        halfCard={halfCard}
        cancelIconConfig={cancelIconConfig}
      >
        <div className={Styles.modalHeader}>
          <ImageBanner name={sprite || 'oos'} className={Styles.modalIcon} />
          <span className={Styles.modalHeaderText}>{header}</span>
        </div>
        <div className={Styles.bodyContainer}>
          <div className={Styles.modalBodyText}>{body}</div>
          <Button className={Styles.singleButton} onClick={cancelCallback}>
            {cartModalConstants.DEFAULT_BUTTON_TEXT}
          </Button>
        </div>
      </Modal>
    );
  }
}
