import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { ItemContainer } from './ItemContainer';
// Cart Common Components
import AddToWishlist from '../../common/AddToWishlist';
import CartItemList from '../../common/CartItemList';
// Utilities
import { getAvailability } from 'commonBrowserUtils/CartHelper';
import { isLocalStorageEnabled } from 'commonBrowserUtils/Helper';
import CartManager from 'commonBrowserUtils/CartManager';
import { getFreeShipLostData } from 'commonBrowserUtils/FreeShipLostUtil';
import { localStorageKeys } from 'commonUtils/constants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import {
  throttle,
  getScrollSpeed,
  isLoggedIn
} from 'commonBrowserUtils/Helper';

const boundFuncs = [
  'handleScroll',
  'setMexpressVisibility',
  'setMexpressPlusVisibility'
];

class ItemsBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mexpressVisible: false,
      mexpressPlusVisible: false
    };

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    this.productsContainerRef = React.createRef();
    this.throttledScrollListener = throttle(this.handleScroll, 5);
    this.snackBar = false;
  }

  handleScroll() {
    const SCROLL_SPEED_LIMIT = 5;
    const productContainer = get(this, 'productsContainerRef.current', null);
    if (!productContainer) {
      return;
    }
    const productEndingLine =
      productContainer.offsetTop + productContainer.clientHeight;
    const middleLineOffset = screen.height * 0.75;
    const currentMiddleLine = middleLineOffset + window.scrollY;
    const speed = getScrollSpeed();

    if (productContainer.offsetTop < currentMiddleLine) {
      if (productEndingLine < currentMiddleLine || speed < 0) {
        if (this.snackBar) {
          this.props.togglePriceDetailsSnackBar();
          this.snackBar = false;
        }
      } else {
        if (!this.snackBar && speed > 0 && speed < SCROLL_SPEED_LIMIT) {
          this.props.togglePriceDetailsSnackBar();
          this.snackBar = true;
        }
      }
    }
  }
  setMexpressVisibility(callback) {
    this.setState(prevState => {
      if (!prevState.mexpressVisible) {
        callback && callback();
      }
      return {
        mexpressVisible: true,
        mexpressPlusVisible: prevState.mexpressPlusVisible
      };
    });
  }

  setMexpressPlusVisibility(callback) {
    this.setState(prevState => {
      if (!prevState.mexpressPlusVisible) {
        callback && callback();
      }
      return {
        mexpressVisible: prevState.mexpressVisible,
        mexpressPlusVisible: true
      };
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.throttledScrollListener);

    this.notifyMe();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollListener);
  }

  notifyMe() {
    if (isFeatureEnabled('NOTIFY_ME')) {
      const products = get(this.props, 'data.products', []);
      // Get previously subscribed products
      let subscribedProducts = isLocalStorageEnabled()
        ? JSON.parse(
            localStorage.getItem(localStorageKeys.NOTIFY_ME_STORAGE_KEY)
          )
        : {};

      subscribedProducts = get(subscribedProducts, 'products', {});
      // Should save oos products in cart
      let oosProductsToSave = {};
      // Should subscribe only new oos products
      let oosProductsToSubscribe = [];

      // Identify products which are not available
      products.forEach(product => {
        const { sizes = [], id, skuId, quantity, selectedSeller } = product;
        const selectedSize = sizes.find(e => e.skuId === skuId);
        const { oos, sizeAvailable, quantityAvailable } = getAvailability({
          sizes,
          selectedSize,
          quantity,
          selectedSeller
        });

        // If product is available, don't subscribe
        if (!oos && sizeAvailable && quantityAvailable) return;

        const oosObjKey = `${id}-${skuId}`;
        oosProductsToSave[oosObjKey] = true;
        // Subscribe only if not subscribed previously
        if (!subscribedProducts.hasOwnProperty(oosObjKey)) {
          oosProductsToSubscribe.push({ styleId: id, skuId: skuId });
        }
      });

      // If any unavailable product, not subscribed previously
      if (oosProductsToSubscribe.length) {
        CartManager.notifyMe(
          oosProductsToSubscribe,
          res => {
            /* Save new subscribed products to local storage.
              We don't want to keep subscribed products in local
              storage forever, hence overwrite previously saved */
            isLocalStorageEnabled() &&
              localStorage.setItem(
                localStorageKeys.NOTIFY_ME_STORAGE_KEY,
                JSON.stringify({
                  products: oosProductsToSave
                })
              );
          },
          err => {
            console.log('Error [ notifyMe ]: service call', err);
          }
        );
      }
    }
  }
  render() {
    const {
      data: cartData,
      total,
      cartItemsReturnInfo,
      priceChangedList,
      showPriceChangeAlert,
      updateDynamicStyles,
      dynamicStyles,
      isExchangeCart,
      updateDeliveryEstimates,
      fineJwellerySteps
    } = this.props;

    if (cartData) {
      const freeShipLostData = getFreeShipLostData(cartData);
      const { mexpressVisible, mexpressPlusVisible } = this.state;

      return (
        <div ref={this.productsContainerRef}>
          <CartItemList
            data={cartData}
            handleCartAction={this.props.handleCartAction}
            render={(
              cartItemsGroup,
              options,
              handleCartAction,
              lazyloadImage
            ) => (
              <ItemContainer
                key={options.key}
                itemGroup={cartItemsGroup}
                handleCartAction={handleCartAction}
                options={options}
                freeShipLostData={freeShipLostData}
                valueReturnProps={this.valueReturnProps}
                cartItemsReturnInfo={cartItemsReturnInfo}
                cartLevelFlags={cartData.flags}
                priceChangedList={priceChangedList}
                showPriceChangeAlert={showPriceChangeAlert}
                dynamicStyles={dynamicStyles}
                updateDynamicStyles={updateDynamicStyles}
                isExchangeCart={isExchangeCart}
                updateDeliveryEstimates={updateDeliveryEstimates}
                mexpressVisible={mexpressVisible}
                mexpressPlusVisible={mexpressPlusVisible}
                setMexpressPlusVisibility={this.setMexpressPlusVisibility}
                setMexpressVisibility={this.setMexpressVisibility}
                fineJwellerySteps={fineJwellerySteps}
                lazyloadImage={lazyloadImage}
              />
            )}
          />
          {isLoggedIn() && <AddToWishlist />}
        </div>
      );
    }
    return null;
  }
}

ItemsBlock.propTypes = {
  priceChangedList: PropTypes.array,
  data: PropTypes.object,
  total: PropTypes.number,
  cartItemsReturnInfo: PropTypes.object,
  showPriceChangeAlert: PropTypes.bool
};

export default ItemsBlock;
