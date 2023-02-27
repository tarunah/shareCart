import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
// Utils
import {
  getAvailability,
  changeSizeAndSellerUtil,
  changeQuantityUtil,
  checkForQueryParams
} from 'commonBrowserUtils/CartHelper';
import {
  isLoggedIn,
  errorNotification,
  getUidx
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import { priceChangeTypes } from 'commonUtils/constants';
// Styles
import Style from './item.base.css';

class Item extends React.Component {
  constructor(props) {
    super(props);
    [
      'onMoveToWishlist',
      'toggleRemoveDialog',
      'toggleSizeDialog',
      'toggleQuantityDialog',
      'onRemove',
      'changeSizeAndSeller',
      'changeQuantity',
      'toggleStyleOffersPopup',
      'toggleSelection',
      'toggleComboDialogue',
      'toggleWishlistDialog',
      'toggleAttachedProductsDialog',
      'toggleMoveOutOfBagDialogue'
    ].forEach(fn => (this[fn] = this[fn].bind(this)));
    this.onRemoveMoveToWishlist = this.onMoveToWishlist.bind(this, 'Remove');

    this.actionHandlers = {
      moveToWishlist: this.onMoveToWishlist,
      toggleRemoveDialog: this.toggleRemoveDialog,
      toggleSizeDialog: this.toggleSizeDialog,
      toggleQuantityDialog: this.toggleQuantityDialog,
      remove: this.onRemove,
      changeSizeAndSeller: this.changeSizeAndSeller,
      changeQuantity: this.changeQuantity,
      wishlistFromRemove: this.onRemoveMoveToWishlist,
      toggleStyleOffersPopup: this.toggleStyleOffersPopup,
      toggleSelection: this.toggleSelection,
      toggleComboDialogue: this.toggleComboDialogue,
      toggleWishlistDialog: this.toggleWishlistDialog,
      toggleAttachedProductsDialog: this.toggleAttachedProductsDialog,
      toggleMoveOutOfBagDialogue: this.toggleMoveOutOfBagDialogue
    };

    this.state = {
      showRemoveDialog: false,
      showSizeDialog: false,
      showQuantityDialog: false,
      showStyleOffersPopup: false,
      showComboDialogue: false,
      showWishlistDialog: false,
      showAttachedProductsDeselectDialog: false,
      showMoveOutOfBagDialogue: false
    };

    props.isFirstItem && (this.firstItemRef = React.createRef());
  }

  toggleSelection(e) {
    const {
      itemId,
      selectedForCheckout,
      handleCartAction,
      selectedSeller,
      skuId,
      quantity,
      id,
      brand,
      articleType,
      price
    } = this.props;
    const sellerPartnerId = get(selectedSeller, 'partnerId', null);

    const eventPayload = {
      style_id: id,
      seller_partner_id: sellerPartnerId,
      sku_id: skuId,
      brand: brand,
      article_type: articleType,
      price: get(price, 'mrp', 0),
      discount_price: get(price, 'total', 0),
      quantity,
      selectedForCheckout: !selectedForCheckout
    };

    triggerEvent('TOGGLE_PRODUCT_SELECTION', {
      custom: {
        custom: {
          v1: `${itemId}|${selectedForCheckout}|${skuId}|${sellerPartnerId}`,
          v2: getUidx()
        }
      },
      mynacoAttributes: eventPayload
    });
    handleCartAction(
      'updateItems',
      [
        {
          itemId,
          selectedForCheckout: !selectedForCheckout,
          quantity,
          sellerPartnerId,
          skuId
        }
      ],
      null,
      errorNotification
    );
    this.setState({
      showComboDialogue: false,
      showAttachedProductsDeselectDialog: false
    });
    e.preventDefault();
  }

  toggleComboDialogue(e) {
    this.setState(prevState => ({
      showComboDialogue: !prevState.showComboDialogue
    }));
    e.preventDefault();
  }

  toggleAttachedProductsDialog() {
    this.setState(prevState => ({
      showAttachedProductsDeselectDialog: !prevState.showAttachedProductsDeselectDialog
    }));
  }

  toggleMoveOutOfBagDialogue(e, callBack) {
    this.setState(
      prevState => ({
        showMoveOutOfBagDialogue: !prevState.showMoveOutOfBagDialogue
      }),
      () => {
        triggerEvent('MOVE_OUT_OF_BAG_BUTTON_CLICK');
        callBack && callBack();
      }
    );
    e.preventDefault();
  }

  onMoveToWishlist(context) {
    if (!isLoggedIn()) {
      if (context === 'Remove') {
        this.toggleRemoveDialog();
      } else if (context === 'Wishlist') {
        this.toggleWishlistDialog();
      } else {
        this.toggleMoveOutOfBagDialogue(context);
      }
      //adding delay to avoid history.goBack from Modal unmount
      setTimeout(() => {
        SHELL.redirectTo('/login?referer=/checkout/cart');
      }, 0);
    } else {
      if (context === 'Remove') {
        this.toggleRemoveDialog();
      }
      if (context === 'Wishlist') {
        this.toggleWishlistDialog();
      }
      const {
        props: {
          handleCartAction,
          skuId,
          itemId,
          id,
          name,
          quantity,
          selectedSeller,
          brand,
          articleType,
          price
        }
      } = this;
      const sellerPartnerId = (selectedSeller || {}).partnerId;
      const payLoad = {
        style_id: id,
        seller_partner_id: sellerPartnerId,
        sku_id: skuId,
        brand: brand,
        article_type: articleType,
        price: get(price, 'mrp', 0),
        discount_price: get(price, 'total', 0)
      };

      triggerEvent('SELECTIVE_ENHANCED_WISHLIST');

      triggerEvent('MOVE_TO_WISHLIST_APP', {
        mynacoAttributes: {
          ...payLoad,
          style_id: id,
          quantity
        },
        maData: {
          entity_optional_attributes: payLoad,
          entity_id: id
        }
      });
      triggerEvent('MOVE_TO_WISHLIST', {
        gaLabel: id,
        mynacoAttributes: {
          ...payLoad,
          style_id: id
        },
        maData: {
          entity_optional_attributes: payLoad,
          entity_id: id
        }
      });
      handleCartAction(
        'moveToWishlist',
        {
          skuId,
          itemId,
          id,
          sellerPartnerId
        },
        () => {
          triggerEvent('MOVE_TO_WISHLIST_SUCCESS', {
            maData: {
              entity_type: 'product',
              entity_name: name,
              entity_id: id || 'No Style Id Found',
              seller_partner_id: sellerPartnerId
            },
            custom: {
              widget: {
                name: 'Checkout-move-to-wishlist',
                type: 'move-to-wishlist'
              }
            }
          });
          CartCountHandler.updateState();
        }
      );
    }
  }

  shouldItemDisable() {
    const {
      sizes,
      skuId,
      quantity,
      virtualBundleInfo,
      selectedSeller,
      productServiceabilityInfo,
      selectedForCheckout,
      isExchangeCart
    } = this.props;

    if (
      (isFeatureEnabled('ADDRESS_ON_CART_V2') || isExchangeCart) &&
      selectedForCheckout &&
      get(productServiceabilityInfo, 'pincodeInfo.serviceable') === false
    ) {
      return true;
    }

    const { virtualBundleConflict } = virtualBundleInfo || {};
    const { oos, sizeAvailable, quantityAvailable } = getAvailability({
      sizes,
      selectedSize: this.getUserSelectedSize(sizes, skuId),
      quantity,
      selectedSeller
    });

    return oos || !sizeAvailable || !quantityAvailable || virtualBundleConflict;
  }

  toggleRemoveDialog() {
    this.setState(prevState => ({
      showRemoveDialog: !prevState.showRemoveDialog
    }));
  }

  toggleWishlistDialog() {
    this.setState(prevState => ({
      showWishlistDialog: !prevState.showWishlistDialog
    }));
  }

  toggleSizeDialog() {
    this.setState(prevState => ({
      showSizeDialog: !prevState.showSizeDialog
    }));
  }

  toggleQuantityDialog() {
    this.setState(prevState => ({
      showQuantityDialog: !prevState.showQuantityDialog
    }));
  }

  toggleStyleOffersPopup() {
    this.setState(prevState => ({
      showStyleOffersPopup: !prevState.showStyleOffersPopup
    }));
  }

  changeSizeAndSeller(e) {
    const {
      props: {
        id,
        skuId: oldSkuId,
        selectedSeller,
        itemId,
        quantity,
        handleCartAction
      }
    } = this;
    const oldPartnerId = (selectedSeller || {}).partnerId;
    changeSizeAndSellerUtil({
      e,
      id,
      oldSkuId,
      itemId,
      quantity,
      handleCartAction,
      callBack: this.toggleSizeDialog(),
      oldPartnerId
    });
  }

  changeQuantity(e) {
    const {
      props: {
        itemId,
        skuId,
        quantity: oldQuantity,
        handleCartAction,
        selectedSeller
      }
    } = this;
    const sellerPartnerId = selectedSeller && selectedSeller.partnerId;
    changeQuantityUtil({
      e,
      itemId,
      skuId,
      oldQuantity,
      handleCartAction,
      sellerPartnerId,
      callBack: this.toggleQuantityDialog
    });
  }

  onRemove() {
    this.setState({ showRemoveDialog: false });
    const {
      props: {
        id,
        itemId,
        handleCartAction,
        price,
        quantity,
        skuId,
        selectedSeller
      }
    } = this;
    const discount = get(price, 'discounts.data', []).reduce((acc, disc) => {
      disc.name === 'discount' && (acc.tradeDiscount = disc.value);
      disc.name === 'coupon' && (acc.couponDiscount = disc.value);
      return acc;
    }, {});

    const sellerPartnerId = (selectedSeller || {}).partnerId;
    const payload = {
      style_id: id,
      sku_id: skuId,
      seller_id: sellerPartnerId
    };

    triggerEvent('SELECTIVE_ENHANCED_REMOVE');

    triggerEvent('REMOVE_ITEM', {
      gaLabel: { style: id, discount },
      mynacoAttributes: { quantity },
      custom: {
        custom: {
          v1: id
        }
      },
      maData: {
        entity_optional_attributes: payload
      }
    });

    handleCartAction(
      'removeItems',
      [
        {
          itemId
        }
      ],
      CartCountHandler.updateState
    );
  }

  getUserSelectedSize(sizeData, sku) {
    if (sizeData) {
      return sizeData.find(e => e.skuId === sku) || {};
    }
  }

  getPriceChangeType() {
    const { priceChangedList = [], id } = this.props;
    const matchedProduct = priceChangedList.find(product => product.id === id);
    return matchedProduct ? matchedProduct.type : priceChangeTypes.NO_CHANGE;
  }

  render() {
    const { props, actionHandlers } = this;
    const { images, landingPageUrl, sizes, skuId, isFirstItem } = props;
    const selectedSeller = props.selectedSeller || {};
    const sellerPartnerId = selectedSeller.partnerId;
    const selectedSize = this.getUserSelectedSize(sizes, skuId);
    const priceChangeType = this.getPriceChangeType();
    const connector = checkForQueryParams(landingPageUrl) ? '&' : '?';
    const itemUrl = `/${landingPageUrl}${connector}mini=true&skuId=${skuId}&sellerPartnerId=${sellerPartnerId}`;
    const itemImage = images ? images[0].secureSrc : null;
    const firstItemTop = get(this, 'firstItemRef.current.offsetTop', 0);

    return (
      <div className={Style.item} ref={isFirstItem ? this.firstItemRef : null}>
        {props.render(
          {
            ...props,
            firstItemTop,
            selectedSeller,
            selectedSize,
            itemUrl,
            itemImage,
            itemDisabled: this.shouldItemDisable(),
            priceChangeType
          },
          this.state,
          actionHandlers
        )}
      </div>
    );
  }
}

Item.propTypes = {
  handleCartAction: PropTypes.func,
  render: PropTypes.func,
  priceChangedList: PropTypes.array
};

export default Item;
