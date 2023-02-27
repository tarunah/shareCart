import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Functional Imports.
import CartManager from 'commonBrowserUtils/CartManager';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import {
  errorNotification,
  isReturnAbuser,
  isApp,
  onEnteringViewport
} from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const addToCartMessageConfig = getKVPairValue('ADD_TO_CART_MESSAGING');
const itemAlreadyInCartMessage =
  get(addToCartMessageConfig, 'itemAlreadyPresent') ||
  Strings.ITEM_ALREADY_PRESENT_IN_CART;
const itemReachedMaxQtyMessage =
  get(addToCartMessageConfig, 'itemReachedMaxQty') ||
  Strings.ITEM_REACHED_MAX_QUANTITY_IN_CART;

class CartFillerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    [
      'initComponentData',
      'createCartFillerPayload',
      'addToCart',
      'triggerCartFillerLoadEvent',
      'triggerAddToCartEvent',
      'onPillClick',
      'isItemAlreadyInCart',
      'hasItemReachedMaxQuanityInCart',
      'setReference'
    ].forEach(method => (this[method] = this[method].bind(this)));

    this.articleList = [];

    this.state = {
      data: this.props.data,
      heading: props.customHeader || 'You may also like:',
      products: [],
      currentArticle: 'All',
      loading: false
    };
  }

  componentDidMount() {
    this.initComponentData(true);
  }

  createCartFillerPayload() {
    const { data } = this.props;
    const { price = {}, products: cartProducts = [], coupons = [] } = data;
    const { currentArticle } = this.state;
    const version = isFeatureEnabled('CART_FILLER_V2') ? 'v2' : 'v1';
    const maxCount =
      version === 'v2' ? getKVPairValue('CART_FILLER_CONFIG').maxCount : 0;
    let payload = {};

    if (cartProducts.length) {
      const appliedCoupons = [];
      let cartPrice = getTotal(price, getCartFields());

      coupons.forEach(coupon => {
        if (get(coupon, 'status').toUpperCase() === 'SUCCESS') {
          appliedCoupons.push(get(coupon, 'code'));
        }
      });

      const items = cartProducts.map(cartProduct => {
        let selectedSize = (get(cartProduct, 'sizes') || []).find(
          size => size.skuId === cartProduct.skuId
        );
        selectedSize = selectedSize || {};
        const warehouses = selectedSize.warehouses || '';
        let wareHouseIds = warehouses.split(',');
        wareHouseIds = wareHouseIds.map(Number);

        return {
          styleId: get(cartProduct, 'id'),
          skuId: get(cartProduct, 'skuId'),
          price: get(cartProduct, 'price.subTotal'),
          brand: get(cartProduct, 'brand'),
          selectedForCheckout: get(cartProduct, 'selectedForCheckout'),
          articleTypeId: get(cartProduct, 'articleTypeId'),
          gender: get(cartProduct, 'gender'),
          size: selectedSize.label,
          addedTime: get(cartProduct, 'itemAddTime'),
          wareHouseIds
        };
      });
      payload = {
        items,
        cartPrice,
        currentArticle,
        version,
        maxCount,
        freeShippingThreshold:
          get(data, 'shippingData.shippingChargeLimit') || 0,
        coupons: appliedCoupons
      };
    }
    return payload;
  }

  getContainerHeading(data) {
    // Heading logic.
    const cartCharges = get(data, 'price.charges.data', []);
    const shippingCharge =
      cartCharges.find(charge => get(charge, 'name') === 'shipping') || {};
    const _isReturnAbuser = isReturnAbuser(
      get(data, 'userDetails.returnAbuser')
    );
    const heading =
      shippingCharge.value > 0 && !_isReturnAbuser
        ? 'Get Free Shipping by adding more:'
        : 'You may also like:';
    return heading;
  }

  initComponentData(isCartLoad = false) {
    const { data } = this.props;
    const { products: cartProducts = [] } = data;
    const payload = this.createCartFillerPayload();
    const { errorMessage, emptyPillMessage } = getKVPairValue(
      'CART_FILLER_CONFIG'
    );

    if (!isEmpty(payload)) {
      CartManager.getCartFillerdata(
        payload,
        res => {
          let products = get(res, 'cartFillerStyles') || [];
          if (
            isEmpty(this.articleList) ||
            this.state.currentArticle === 'All'
          ) {
            this.articleList = get(res, 'articleList') || [];
          }
          if (products.length || this.articleList.length) {
            this.props.successCB();
            // Filter out cart products
            products = products.filter(
              ({ id }) =>
                !cartProducts.find(({ id: styleId }) => styleId === id)
            );

            // Filter out out of stock products
            products = products.filter(({ inventoryInfo = [] }) =>
              inventoryInfo.find(({ inventory }) => inventory > 0)
            );

            this.setState(
              {
                heading: this.getContainerHeading(data),
                products,
                loading: false
              },
              () => {
                if (!products.length) {
                  SHELL.alert('info', {
                    message: emptyPillMessage
                  });
                }
                this.triggerCartFillerLoadEvent();
              }
            );
          } else {
            this.props.errorCB();
            this.setState({
              loading: false,
              products: [],
              currentArticle: 'All'
            });
          }
        },
        err => {
          this.props.errorCB();
          this.setState({
            loading: false,
            products: []
          });
          if (!isCartLoad) {
            SHELL.alert('error', {
              message: errorMessage
            });
          }
        }
      );
    } else {
      this.props.errorCB();
      this.setState({
        loading: false,
        products: [],
        currentArticle: 'All'
      });
    }
  }

  isItemAlreadyInCart(cartResponse) {
    const cartMessage = get(cartResponse, 'cartMessage');
    return get(cartMessage, 'message') === 'INCREASED_QUANTITY_IN_CART';
  }

  hasItemReachedMaxQuanityInCart(cartResponse) {
    const cartMessage = get(cartResponse, 'cartMessage');
    return get(cartMessage, 'message') === 'MAXIMUM_ALLOWED_QUANTITY_REACHED';
  }

  addToCart(data, index) {
    this.setState({
      currentArticle: 'All'
    });
    this.props.handleCartAction(
      'addItems',
      data,
      res => {
        try {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        } catch (err) {
          window.scroll(0, 0);
        }

        const isItemAlreadyInCart = this.isItemAlreadyInCart(res) || false;
        const hasItemReachedMaxQuanityInCart =
          this.hasItemReachedMaxQuanityInCart(res) || false;
        const toastMessage = isItemAlreadyInCart
          ? itemAlreadyInCartMessage
          : hasItemReachedMaxQuanityInCart
          ? itemReachedMaxQtyMessage
          : null;
        if (toastMessage) {
          SHELL.alert('info', {
            message: toastMessage
          });
        }
        this.triggerAddToCartEvent(data, index);
        this.props.handleCartAction('get');
      },
      err => {
        console.log('Error [ Cart Filler ]: Add to CART', err);
        errorNotification(err ? { message: err.message } : {});
      },
      { keepPreviousState: true }
    );
  }

  /**
   * Madalytics Events.
   * 1. Cart Filler Load event.
   * 2. Add to Cart event.
   */

  triggerCartFillerLoadEvent() {
    const { data } = this.props;
    const { products = [] } = this.state;

    const widgetItems = products.map((product, key) => {
      return {
        entity_type: 'product',
        entity_name: get(product, 'name'),
        entity_id: get(product, 'id'),
        entity_optional_attribute: {
          h_position: key,
          v_position: 0
        }
      };
    });

    triggerEvent('CART_FILLER_LOAD', {
      maData: {
        entity_type: 'products',
        entity_name: 'cart-filler',
        entity_id: get(data, 'id')
      },
      custom: {
        custom: {
          v1: this.props.customHeader
        },
        widget: {
          name: 'cart-filler',
          type: 'cart-filler',
          data_set: {
            data: [
              {
                entity_type: 'cart',
                entity_id: get(data, 'id')
              }
            ]
          }
        },
        widget_items: {
          data_set: {
            data: widgetItems
          }
        }
      }
    });
  }

  triggerAddToCartEvent(data, index) {
    const product = (data || [])[0];
    if (product) {
      triggerEvent('CART_FILLER_ADD_TO_CART', {
        maData: {
          entity_type: 'product',
          entity_name: 'cart-filler',
          entity_id: get(product, 'id')
        },
        custom: {
          custom: {
            v1: this.props.customHeader
          },
          widget: {
            name: 'cart-filler',
            type: 'cart-filler',
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
                  entity_id: get(product, 'id'),
                  entity_optional_attribute: {
                    h_position: index,
                    v_position: 0
                  }
                }
              ]
            }
          }
        },
        mynacoAttributes: {
          category: 'shopping',
          action: 'addToCart',
          label: get(product, 'id'),
          quantity: get(product, 'quantity')
        },
        mynacoV3: {
          templateData: {
            category: 'shopping',
            action: 'addToCart',
            label: get(product, 'id'),
            quantity: get(product, 'quantity')
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      get(this.props.data, 'modifiedAt') !== get(prevProps.data, 'modifiedAt')
    ) {
      this.setState(
        {
          currentArticle: 'All'
        },
        () => {
          this.initComponentData(true);
        }
      );
    }
  }

  onPillClick(e) {
    let article = get(e, 'currentTarget.dataset.key');

    if (article === this.state.currentArticle) {
      return;
    }

    triggerEvent('AT_PILL_CLICK', {
      custom: {
        custom: {
          v1: article
        }
      }
    });

    this.setState(
      {
        currentArticle: article,
        loading: true
      },
      this.initComponentData
    );
  }

  setReference(node) {
    if (!isApp()) return;

    const triggerInViewPort = () => {
      const totalWishlistProductCount = get(
        this,
        'props.totalWishlistProductCount',
        0
      );
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

    try {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          const entry = entries[0];
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            triggerInViewPort();
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 1
        }
      );
      node && observer.observe(node);
    } catch (e) {
      node &&
        document.addEventListener(
          'scroll',
          onEnteringViewport(node, triggerInViewPort)
        );
    }
  }

  render() {
    const { render, history } = this.props;
    return (
      <div ref={this.setReference}>
        {render({
          history,
          heading: this.state.heading,
          products: this.state.products,
          articleList: this.articleList,
          currentArticle: this.state.currentArticle,
          loading: this.state.loading,
          onPillClick: this.onPillClick,
          addToCart: this.addToCart
        })}
      </div>
    );
  }
}

CartFillerContainer.propTypes = {
  render: PropTypes.func,
  data: PropTypes.object,
  errorCB: PropTypes.func,
  successCB: PropTypes.func,
  customHeader: PropTypes.string
};

CartFillerContainer.defaultProps = {
  errorCB: () => {},
  successCB: () => {},
  customHeader: ''
};

export default CartFillerContainer;
