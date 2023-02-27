import React from 'react';
import get from 'lodash/get';

import CartManager from 'commonBrowserUtils/CartManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';

import { isLoggedIn } from 'commonBrowserUtils/Helper';
import { transformWishlistData, triggerWishListLoad } from './wishlistUtils';

const WishlistHoc = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        wishlistProducts: [],
        totalWishlistProductCount: 0,
        wishlistLimit: getGrowthHackConfigValue('CART_WISHLIST_LIMIT')
      };

      ['initComponent', 'refreshWishlistProducts', 'resetState'].forEach(
        method => {
          this[method] = this[method].bind(this);
        }
      );
    }

    componentDidMount() {
      if (isLoggedIn()) {
        const wishlistData = get(
          window,
          '_checkout_.__myx_data__.wishlistData',
          {}
        );
        this.initComponent(wishlistData, true);
      }
    }

    resetState() {
      this.setState({
        wishlistProducts: [],
        totalWishlistProductCount: 0
      });
    }

    componentDidUpdate() {
      if (isLoggedIn()) {
        const wishlistData = get(
          window,
          '_checkout_.__myx_data__.wishlistData',
          {}
        );
        wishlistData.totalCount !== undefined &&
          this.initComponent(wishlistData, true);
      }
    }

    initComponent(wishlistData, firstInit = false) {
      let products = get(wishlistData, 'styles', []);
      if (products.length > 0) {
        const totalWishlistProductCount =
          wishlistData.totalCount || products.length;
        products = transformWishlistData(products, this.state.wishlistLimit);
        /***************************************************************
         * Products will have item which are currently in stock        *
         * So we do a refresh if the first two products is OOS         *
         * and the component is just mounted. ie: products length is 0 *
         ***************************************************************/
        if (products.length === 0) {
          firstInit && this.refreshWishlistProducts();
        } else {
          let productsUpdated = false;
          for (let i = 0; i < this.state.wishlistLimit; i++) {
            productsUpdated |=
              get(products[i], 'id') !==
              get(this.state.wishlistProducts[i], 'id');
          }
          productsUpdated &&
            triggerWishListLoad(products, totalWishlistProductCount);
          this.setState({
            wishlistProducts: products,
            totalWishlistProductCount
          });
        }
      } else {
        /*
          When the last remaining product is added to cart, state will 
          still contain it. Hence, need to reset it back to empty.
        */
        this.resetState();
      }
    }

    refreshWishlistProducts() {
      CartManager.getPriceDroppedItems(this.initComponent, this.resetState);
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          refreshWishlistProducts={this.refreshWishlistProducts}
        />
      );
    }
  };
};

export default WishlistHoc;
