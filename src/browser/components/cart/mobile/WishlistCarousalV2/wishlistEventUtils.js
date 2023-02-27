import React from 'react';
import get from 'lodash/get';

const triggerWishListInViewPort = (totalWishlistProductCount = 0) => {
  totalWishlistProductCount > 0 &&
    triggerEvent('WISHLIST_IN_VIEW_PORT', {
      custom: {
        custom: { v1: totalWishlistProductCount },
        widget: {
          name: 'cart_wishlist_reco_flag'
        },
        event_type: 'other'
      }
    });
};

const triggerOnSKUSelector = (product = {}) => {
  triggerEvent('WISHLIST_SIZE_SELECTOR_CLICK', {
    custom: {
      widget: {
        name: 'cart_recommendations',
        type: 'list'
      },
      widget_items: {
        name: 'add_to_bag_cta',
        type: 'button'
      },
      custom: {
        v1: product.id,
        v2: product.price
      },
      event_type: 'widgetItemClick'
    }
  });
};

const triggerAddToBag = product => {
  triggerEvent('WISHLIST_ADD_TO_CART', {
    custom: {
      widget: {
        name: 'wishlist-card',
        type: 'wishlist-card',
        data_set: {
          data: [
            {
              entity_type: 'cart',
              entity_id: get(product, 'id')
            }
          ]
        }
      },
      widget_items: {
        data_set: {
          data: [
            {
              entity_type: 'product',
              entity_name: get(product, 'name'),
              entity_id: get(product, 'id')
            }
          ]
        }
      }
    }
  });
};

const triggerWishlistOnProductClick = (product = {}) => {
  triggerEvent('WISHLIST_PRODUCT_CLICK', {
    custom: {
      widget: {
        name: 'cart_wishlist_card',
        type: 'list'
      },
      widget_items: {
        name: 'product_click'
      },
      custom: {
        v1: product.id,
        v2: product.price
      },
      event_type: 'widgetItemClick'
    }
  });
};

const triggerRecoHalfCardClose = (product = {}) => {
  triggerEvent('RECO_HALFCARD_CLOSE', {
    custom: {
      widget: {
        name: 'cart_recommendations',
        type: 'list'
      },
      widget_items: {
        name: 'add_to_bag_close',
        type: 'button'
      },
      custom: {
        v1: product.id,
        v2: product.price
      },
      event_type: 'widgetItemClick'
    }
  });
};
export {
  triggerWishListInViewPort,
  triggerRecoHalfCardClose,
  triggerOnSKUSelector,
  triggerWishlistOnProductClick,
  triggerAddToBag
};
