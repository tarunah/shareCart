import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Buttons from 'commonComp/InlineButtonV2';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import {
  errorNotification,
  getUidx,
  currencyValue,
  isIOSApp,
  isAndroidApp,
  getSelectedProductsCount,
  getImageUrl,
  isMyntAppEnabled,
  isWebkitEnabled,
  isMobile,
  isLoggedIn
} from 'commonBrowserUtils/Helper';

import ConfirmOrCancelModal from 'commonComp/ConfirmOrCancelModal';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Style from './bulkActionStrip.css';

import Share from 'iconComp/Share.jsx';
import Delete from 'iconComp/Delete.jsx';
import NewWishlist from 'iconComp/NewWishlist.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxIntermediate from 'iconComp/CheckboxIntermediate.jsx';
import ProductInactive from 'iconComp/ProductInactive.jsx';

const SELECTION_STATE = {
  ALL_SELECTED: 'ALL_SELECTED',
  PARTIALLY_SELECTED: 'PARTIALLY_SELECTED',
  SELECTED_NOTHING: 'SELECTED_NOTHING'
};

const SCREEN_NAME = 'cart';

const getMAEventPayload = products => {
  return products.map(product => get(product, 'itemId')).join('|');
};

class BulkActionStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showConfirmationModal: false, userAction: '', count: 0 };
    [
      'selectAllProducts',
      'deselectProducts',
      'bulkMoveToWishlist',
      'bulkRemove',
      'shellAlert',
      'getConfirmationModalCallback',
      'hideConfirmationModal',
      'bulkShare'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  getConfirmationTitle() {
    const { userAction, count } = this.state;
    return userAction === 'wishlist'
      ? `Move ${count} ${count > 1 ? 'items' : 'item'} to wishlist`
      : `Remove ${count} ${count > 1 ? 'items' : 'item'}`;
  }

  getConfirmationMessage() {
    const { userAction, count } = this.state;
    return `Are you sure you want to ${
      userAction === 'wishlist' ? 'move' : 'remove'
    } ${count} ${count > 1 ? 'items' : 'item'} from bag.`;
  }

  getConfirmationModalCallback(userAction) {
    return () => {
      const { products } = this.props;

      const selectedProductsCount = getSelectedProductsCount(products);

      if (selectedProductsCount === 0) {
        const message =
          userAction === 'wishlist'
            ? 'Select any item to move to wishlist.'
            : 'Select any item to remove from bag.';

        this.shellAlert(message);
      } else {
        this.setState({
          showConfirmationModal: true,
          userAction,
          count: selectedProductsCount
        });
      }
    };
  }

  hideConfirmationModal() {
    this.setState({ showConfirmationModal: false, userAction: '', count: 0 });
  }

  shellAlert(message) {
    const { mode } = this.props;
    const styleOverrides = getSnackBarStyleOverrides(mode);

    SHELL.alert('info', { message, styleOverrides });
  }

  getFailureCallback(isWishlist = true) {
    const message = `Failed to ${
      isWishlist ? 'move items to wishlist' : 'remove items'
    }, please try again.`;
    const callback = () => this.shellAlert(message);
    return callback;
  }

  getSuccessCallback(itemCount, isWishlist = true) {
    const message = `${itemCount} ${itemCount > 1 ? 'items' : 'item'} ${
      isWishlist ? 'successfully moved to wishlist' : 'removed from bag'
    }. `;
    const callback = () => this.shellAlert(message);
    return callback;
  }

  selectAllProducts() {
    const { handleCartAction, products } = this.props;

    const payload = (products || []).map(product => ({
      itemId: get(product, 'itemId'),
      selectedForCheckout: true,
      quantity: get(product, 'quantity'),
      sellerPartnerId: get(product, 'sellerPartnerId'),
      skuId: get(product, 'skuId')
    }));
    const eventPayload = getMAEventPayload(payload);

    triggerEvent('SELECTED_ALL_PRODUCTS', {
      custom: {
        custom: { v1: eventPayload, v2: getUidx() }
      },
      mynacoAttributes: {
        selectedForCheckout: true,
        quantity: (products || [])
          .filter(
            product =>
              !get(product, 'selectedForCheckout') &&
              !get(product, 'flags.freeItem')
          )
          .reduce(
            (quantity, product) => quantity + get(product, 'quantity', 0),
            0
          )
      }
    });

    handleCartAction('updateItems', payload, null, errorNotification);
  }

  deselectProducts() {
    const { handleCartAction, products } = this.props;

    const payload = (products || [])
      .filter(
        product =>
          get(product, 'selectedForCheckout') && !get(product, 'flags.freeItem')
      )
      .map(product => ({
        itemId: get(product, 'itemId'),
        selectedForCheckout: false,
        quantity: get(product, 'quantity'),
        sellerPartnerId: get(product, 'sellerPartnerId'),
        skuId: get(product, 'skuId')
      }));
    const eventPayload = getMAEventPayload(payload);

    triggerEvent('DESELECTED_ALL_PRODUCTS', {
      custom: {
        custom: { v1: eventPayload, v2: getUidx() }
      },
      mynacoAttributes: {
        selectedForCheckout: false,
        quantity: (products || [])
          .filter(
            product =>
              get(product, 'selectedForCheckout') &&
              !get(product, 'flags.freeItem')
          )
          .reduce(
            (quantity, product) => quantity + get(product, 'quantity', 0),
            0
          )
      }
    });

    handleCartAction('updateItems', payload, null, errorNotification);
  }

  bulkMoveToWishlist() {
    const { products, handleCartAction } = this.props;

    if (!isLoggedIn()) {
      this.hideConfirmationModal();
      //adding delay to avoid history.goBack from Modal unmount
      setTimeout(() => {
        SHELL.redirectTo('/login?referer=/checkout/cart');
      }, 0);
    } else {
      const payload = (products || [])
        .filter(
          product =>
            get(product, 'selectedForCheckout') &&
            !get(product, 'flags.freeItem')
        )
        .map((product = {}) => ({
          itemId: get(product, 'itemId'),
          id: get(product, 'id'),
          skuId: get(product, 'skuId')
        }));
      const eventPayload = getMAEventPayload(payload);

      const maEventPayload = (products || [])
        .filter(
          product =>
            get(product, 'selectedForCheckout') &&
            !get(product, 'flags.freeItem')
        )
        .map((product = {}) => ({
          styleId: get(product, 'id'),
          skuId: get(product, 'skuId'),
          sellerId: get(product, 'selectedSeller.partnerId')
        }));

      triggerEvent('BULKMOVE_TO_WISHLIST', {
        custom: {
          custom: { v1: eventPayload, v2: getUidx() }
        },
        maData: {
          entity_optional_attributes: {
            entity_data: maEventPayload
          }
        },
        mynacoAttributes: {
          selectedForCheckout: false,
          quantity: (products || [])
            .filter(
              product =>
                get(product, 'selectedForCheckout') &&
                !get(product, 'flags.freeItem')
            )
            .reduce(
              (quantity, product) => quantity + get(product, 'quantity', 0),
              0
            )
        }
      });

      const successCallBack = this.getSuccessCallback(payload.length);
      const failureCallback = this.getFailureCallback();

      handleCartAction(
        'bulkMoveToWishlist',
        payload,
        successCallBack,
        failureCallback
      );
      this.hideConfirmationModal();
    }
  }

  bulkShare() {
    const { products = [] } = this.props;
    const {
      shareTitleSingle,
      shareTitleMultiple,
      shareSubject,
      shareMinError,
      shareMaxError,
      shareMaxNum,
      shareBodyPrefix,
      shareImageSize
    } = getKVPairValue('CART_SHARE');
    const selectedProducts = products.filter(
      product =>
        get(product, 'selectedForCheckout') && !get(product, 'flags.freeItem')
    );
    if (selectedProducts.length === 0) {
      this.shellAlert(shareMinError);
      return;
    }
    if (selectedProducts.length > shareMaxNum) {
      this.shellAlert(shareMaxError.replace('%shareMaxNum%', shareMaxNum));
      return;
    }

    triggerEvent('CART_SHARE_CLICK', {
      custom: {
        custom: {
          v1: selectedProducts.map(product => get(product, 'itemId')).join('|')
        }
      }
    });

    const imageUrl = getImageUrl(
      get(selectedProducts, '[0].images[0].secureSrc', ''),
      shareImageSize.height,
      shareImageSize.width
    );
    const shareUrl = `${window.location.origin}/${selectedProducts[0].landingPageUrl}`;
    const shareTitle =
      selectedProducts.length === 1
        ? shareTitleSingle
        : shareTitleMultiple.replace('%itemsCount%', selectedProducts.length);
    const shareBody = `${shareBodyPrefix}\n\n${selectedProducts.reduce(
      (acc, item, index) => {
        return `${acc}${index + 1}. ${item.name}: ${window.location.origin}/${
          item.landingPageUrl
        }\n\n`;
      },
      ''
    )}`;

    if (isAndroidApp() && isMyntAppEnabled(['handleShare'])) {
      MyntApp.handleShare(
        shareSubject,
        shareTitle,
        imageUrl,
        shareBody,
        shareUrl,
        SCREEN_NAME
      );
    } else if (isIOSApp() && isWebkitEnabled(['handleShare'])) {
      webkit.messageHandlers.handleShare.postMessage(
        `dialogTitle=${shareTitle}|body=${shareBody}|subject=${shareSubject}`
      );
    } else if (navigator && navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: shareBody
        })
        .catch(reason => {
          console.error(reason);
        });
    }
  }

  bulkRemove() {
    const { products, handleCartAction } = this.props;

    const payload = (products || [])
      .filter(
        product =>
          get(product, 'selectedForCheckout') && !get(product, 'flags.freeItem')
      )
      .map((product = {}) => ({
        itemId: get(product, 'itemId')
      }));
    const eventPayload = (products || [])
      .filter(
        product =>
          get(product, 'selectedForCheckout') && !get(product, 'flags.freeItem')
      )
      .map((product = {}) => ({
        styleId: get(product, 'id'),
        skuId: get(product, 'skuId'),
        sellerId: get(product, 'selectedSeller.partnerId')
      }));

    triggerEvent('BULK_REMOVE', {
      custom: {
        custom: { v1: getUidx() }
      },
      maData: {
        entity_optional_attributes: {
          entity_data: eventPayload
        }
      },
      mynacoAttributes: {
        selectedForCheckout: false,
        quantity: (products || [])
          .filter(
            product =>
              get(product, 'selectedForCheckout') &&
              !get(product, 'flags.freeItem')
          )
          .reduce(
            (quantity, product) => quantity + get(product, 'quantity', 0),
            0
          )
      }
    });

    const successCallBack = this.getSuccessCallback(payload.length, false);
    const failureCallback = this.getFailureCallback(false);

    handleCartAction('removeItems', payload, successCallBack, failureCallback);
    this.hideConfirmationModal();
  }

  getDesktopButtons() {
    const showRemoveConfirmation = this.getConfirmationModalCallback('remove');
    const showBulkWishlistConfirmation = this.getConfirmationModalCallback(
      'wishlist'
    );
    return (
      <Buttons
        containerClassName={Style.desktopButton}
        button1={{
          text: 'REMOVE',
          clickHandler: showRemoveConfirmation,
          className: `${Style.desktopBulkRemove}`
        }}
        button2={{
          text: 'MOVE TO WISHLIST',
          clickHandler: showBulkWishlistConfirmation,
          className: `${Style.desktopBulkWishlist}`
        }}
        btnClassName={Style.desktopActionButton}
      />
    );
  }

  getMobileButtons() {
    const showRemoveConfirmation = this.getConfirmationModalCallback('remove');
    const showBulkWishlistConfirmation = this.getConfirmationModalCallback(
      'wishlist'
    );
    return (
      <div className={Style.mobileButtonContainer}>
        {isFeatureEnabled('CHECKOUT_SHARE') &&
          (isMyntAppEnabled(['handleShare']) ||
            isWebkitEnabled(['handleShare']) ||
            (isMobile() && navigator && navigator.share)) && (
            <div onClick={this.bulkShare} className={Style.iconDiv}>
              <Share />
            </div>
          )}
        <div onClick={showRemoveConfirmation} className={Style.iconDiv}>
          <Delete />
        </div>
        <div onClick={showBulkWishlistConfirmation} className={Style.iconDiv}>
          <NewWishlist />
        </div>
      </div>
    );
  }

  getClickableCartTotalComponent(total) {
    const cartTotal = this.getCartTotalComponent(total, Style.waterMelon);
    return (
      <span
        onClick={this.props.scrollToPriceBlock}
        data-source="ClickableCartTotal"
        className={Style.waterMelon}
      >
        {cartTotal}
      </span>
    );
  }

  getCartTotalComponent(total, className = '') {
    return (
      <span>
        {' ('}
        <RupeeBold className={`${className} ${Style.rupeeIcon}`} />
        {currencyValue(total)}
        {')'}
      </span>
    );
  }

  render() {
    const { selectedProductCount, totalItemsCount, mode, total } = this.props;
    const { showConfirmationModal, userAction } = this.state;
    const isMobile = mode === 'mobile';
    const titleClassName = !isMobile ? Style.desktopTitle : '';
    const closeIconClassName = !isMobile ? Style.desktopCloseIcon : '';
    let iconClass = '',
      iconName = '',
      onBulkAction = () => {};

    const message = `${selectedProductCount}/${totalItemsCount} ITEMS SELECTED`;
    const cartState =
      selectedProductCount === totalItemsCount
        ? SELECTION_STATE.ALL_SELECTED
        : selectedProductCount === 0
        ? SELECTION_STATE.SELECTED_NOTHING
        : SELECTION_STATE.PARTIALLY_SELECTED;

    switch (cartState) {
      case SELECTION_STATE.ALL_SELECTED:
        iconName = 'CheckboxActive';
        iconClass = Style.activeIcon;
        onBulkAction = this.deselectProducts;
        break;
      case SELECTION_STATE.PARTIALLY_SELECTED:
        iconName = 'CheckboxIntermediate';
        iconClass = Style.activeIcon;
        onBulkAction = this.deselectProducts;
        break;
      case SELECTION_STATE.SELECTED_NOTHING:
        iconName = 'ProductInactive';
        iconClass = Style.inActiveIcon;
        onBulkAction = this.selectAllProducts;
    }
    const totalComponent =
      !isMobile || total === 0
        ? ''
        : this.getClickableCartTotalComponent(total);
    const IconComponents = {
      CheckboxActive,
      CheckboxIntermediate,
      ProductInactive
    };
    const SVGIcon = IconComponents[iconName];
    return (
      <div
        className={isMobile ? Style.mobileContainer : Style.desktopContainer}
      >
        <div className={Style.selectionIcon} onClick={onBulkAction}>
          <SVGIcon className={iconClass} />
        </div>
        <div className={Style.message}>
          <span className={Style.itemSelected}>{message}</span>
          {totalComponent}
        </div>
        {isMobile ? this.getMobileButtons() : this.getDesktopButtons()}
        <ConfirmOrCancelModal
          showModal={showConfirmationModal}
          modalConfig={{
            halfCard: isMobile,
            cancelCallback: this.hideConfirmationModal,
            cancelIconConfig: { show: true, className: closeIconClassName },
            className: isMobile
              ? Style.confirmationModalMobile
              : Style.confirmationModalDesktop
          }}
          button1Config={{
            text: userAction === 'wishlist' ? 'CANCEL' : 'REMOVE',
            clickHandler:
              userAction === 'wishlist'
                ? this.hideConfirmationModal
                : this.bulkRemove
          }}
          button2Config={{
            text: 'MOVE TO WISHLIST',
            clickHandler: this.bulkMoveToWishlist,
            className: Style.waterMelon
          }}
          btnClassName={Style.buttonWidth}
        >
          <div className={`${Style.confirmationTitle} ${titleClassName}`}>
            {this.getConfirmationTitle()}
          </div>
          <div className={Style.confirmationText}>
            {this.getConfirmationMessage()}
          </div>
        </ConfirmOrCancelModal>
      </div>
    );
  }
}

BulkActionStrip.propTypes = {
  selectedProductCount: PropTypes.number,
  totalItemsCount: PropTypes.number,
  mode: PropTypes.string,
  products: PropTypes.array,
  handleCartAction: PropTypes.func
};

export default BulkActionStrip;
