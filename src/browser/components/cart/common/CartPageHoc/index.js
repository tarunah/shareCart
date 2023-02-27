import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Data Managers
import CartManager from 'commonBrowserUtils/CartManager';
import TokenManager from 'commonBrowserUtils/TokenManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import AddressStateHOC from 'commonComp/AddressStateHOC';
import WishlistHoc from '../WishlistHoc';

import {
  getMaEventData,
  getMynacoCartScreenLoadData,
  checkExchangeCart,
  getLiveMetricData,
  getFrgEventData
} from 'commonBrowserUtils/CartHelper';
import {
  errorNotification,
  setCookie,
  getCookie,
  isReturnAbuser,
  isApp,
  getDeliveryEstimatesUtil
} from 'commonBrowserUtils/Helper';
import { getQueryParam } from 'commonUtils/helper';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import { cookieKeys } from 'commonUtils/constants';

import CartConstants from 'commonBrowserUtils/CartConstants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const CartPageHoc = WrappedComponent => {
  const ChildComponent = AddressStateHOC(WishlistHoc(WrappedComponent));

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isExchangeCart: false,
        loading: true,
        error: null,
        showExpressCheckoutHalfCard: false,
        cartModal: { show: false, params: {} },
        dynamicStyles: { highlightProductsSelection: false },
        cancelOrderModal: false,
        isStyleCappingModalShown: false
      };
      [
        'onActionSuccess',
        'onActionError',
        'handleCartAction',
        'toggleCartModal',
        'toggleExpressCheckoutHalfCard',
        'updateDynamicStyles',
        'updatePageData',
        'setLoader',
        'getCartPageData',
        'updateServiceability',
        'updateCredits',
        'updateStyleViolation',
        'toggleCancelOrderModal',
        'toggleStyleCappingModal',
        'initCartPageData'
      ].forEach(method => (this[method] = this[method].bind(this)));

      this.creditsBalance = {
        lpBalance: null,
        gcBalance: null,
        scBalance: null
      };
      this.styleCappingData = [];
    }

    componentDidMount() {
      window.addEventListener('beforeunload', () => {
        CartCountHandler.triggerUpdate();
      });
      this.props.analytics('setPageContext')('Checkout-cart');
      setCookie(cookieKeys.ORDER_CONFIRMED, '', 0);
      ProfileManager.fetchDetails(this.initCartPageData);

      if (
        getQueryParam({ name: 'referrer' }) === 'ordercancelled' &&
        getCookie(cookieKeys.CART_CANCEL_ORDER_MODAL) === 'false'
      ) {
        this.setState({
          cancelOrderModal: true
        });
      }
      if (
        getQueryParam({ name: 'referrer' }) === 'styleviolation' &&
        isFeatureEnabled('STYLE_CAPPING')
      ) {
        CartManager.getStyleViolation(
          null,
          res => {
            if (res && !!get(res, 'violatedProducts', []).length) {
              this.updateStyleViolation(res);
            }
          },
          null
        );
      }
    }

    componentWillUnmount() {
      this.props.setCartStoreData(this.state.data);
      CartCountHandler.triggerUpdate();

      this.props.setPaymentStoreData({
        gcBalance: this.creditsBalance.gcBalance,
        lpBalance: this.creditsBalance.lpBalance
      });
    }

    didQuantityUpdate(prevState, state) {
      const prevQuantity = prevState.data?.products
        .filter(product => product?.selectedForCheckout)
        .reduce((acc, product) => (acc += product.quantity), 0);
      const currQuantity = state.data?.products
        .filter(product => product?.selectedForCheckout)
        .reduce((acc, product) => (acc += product.quantity), 0);
      if (prevQuantity !== currQuantity) {
        return true;
      }
      return false;
    }

    componentDidUpdate(prevProps, prevState) {
      // Handling Page load analytics
      if (!this.firstUpdate) {
        const data = get(this, 'state.data', {});
        if (data) {
          this.props.analytics('pushGTMCartData')(data);
          this.props.analytics('pushDataLayerObjectForGTM')(data);
          triggerEvent('CART_SCREEN_LOAD', {
            mynacoV3: {
              templateData: {
                widget_items: {
                  data_set: {
                    data: getMaEventData(
                      get(data, 'products'),
                      get(data, 'offers'),
                      true
                    )
                  }
                },
                ecommerce: {
                  checkout: {
                    options: 'Cart-Load',
                    step: 1
                  },
                  firstOrder:
                    getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
                  productListName: '',
                  type: 'checkout',
                  mProductList: getMynacoCartScreenLoadData(data, true)
                    .products,
                  storeFrontId: '',
                  transaction: ''
                }
              }
            },
            mynacoAttributes: getMynacoCartScreenLoadData(data),
            maData: {
              entity_id: get(this, 'state.data.id'),
              entity_type: 'cart'
            },
            custom: {
              widget_items: {
                data_set: {
                  data: getMaEventData(
                    get(data, 'products'),
                    get(data, 'offers')
                  )
                }
              }
            }
          });
          const {
            skuIdList,
            liveMetricFlag,
            liveMetricCount
          } = getLiveMetricData(get(data, 'products'));
          triggerEvent('LIVE_CUST_LOAD', {
            custom: {
              custom: {
                v1: skuIdList,
                v2: liveMetricFlag,
                v3: liveMetricCount
              },
              widget: {
                name: 'cart_live_cust_metric'
              },
              event_type: 'widgetLoad'
            }
          });
          if (
            !!get(data, 'offers', []).find(
              offer =>
                get(offer, 'discountType', 0) ===
                CartConstants.FREE_GIFT_DISCOUNT_TYPE
            )
          ) {
            triggerEvent('FRG_CART_LOAD', {
              custom: {
                widget: {
                  name: 'cart_free_gift_load',
                  type: 'card'
                },
                widget_items: {
                  data_set: {
                    data: getFrgEventData(
                      get(data, 'products'),
                      get(data, 'offers')
                    )
                  }
                },
                event_type: 'widgetLoad'
              }
            });
          }

          !get(data, 'count') &&
            triggerEvent('CART_EMPTY_LOAD', {
              maData: {
                entity_id: get(this, 'state.data.id'),
                entity_type: 'cart'
              }
            });

          isReturnAbuser(get(data, 'userDetails.returnAbuser')) &&
            triggerEvent('FRAUD_USER');
          setCookie(
            cookieKeys.FIRST_TIME_CUSTOMER,
            get(data, 'userDetails.isFirstTimeCustomer')
          ); // set firstTimeCustomer cookie
          this.firstUpdate = true;
        }
      }
      if (this.didQuantityUpdate(prevState, this.state)) {
        isFeatureEnabled('CART_COUNT_EVENT') &&
          triggerEvent('CART_COUNT_EVENT', {
            custom: {
              custom: {
                v1: (this.state.data?.products || [])
                  .filter(product => product?.selectedForCheckout)
                  .reduce((acc, product) => (acc += product.quantity), 0)
              }
            },
            mynacoAttributes: {
              quantity: (this.state.data?.products || [])
                .filter(product => product?.selectedForCheckout)
                .reduce((acc, product) => (acc += product.quantity), 0)
            }
          });
      }
    }

    toggleCartModal(modalParams) {
      this.setState(prevState => {
        const { cartModal } = prevState;
        const { show } = cartModal;
        return {
          cartModal: {
            show: !show,
            params: show ? {} : modalParams
          }
        };
      });
    }

    toggleCancelOrderModal() {
      this.setState(prevState => {
        return {
          cancelOrderModal: !prevState.cancelOrderModal
        };
      });
    }

    toggleStyleCappingModal() {
      this.setState(prevState => {
        return {
          isStyleCappingModalShown: !prevState.isStyleCappingModalShown
        };
      });
    }

    updateDynamicStyles(key, value) {
      this.setState({
        dynamicStyles: { ...this.state.dynamicStyles, [key]: value }
      });
    }

    setPageData(data, callback) {
      const { cartData = {} } = data;
      if (cartData.code) {
        this.onActionError(cartData.error);
      } else {
        const isExchangeCart = checkExchangeCart(cartData);
        this.setState({
          data: cartData,
          loading: false,
          isExchangeCart
        });
      }
    }

    getCartPageData() {
      this.setState({ loading: true }, () => {
        CartManager.getPageData(
          {
            cartMerge: true,
            cached: false,
            unselected: true
          },
          this.onActionSuccess,
          this.onActionError
        );
      });
    }

    toggleExpressCheckoutHalfCard() {
      this.setState(prevState => ({
        showExpressCheckoutHalfCard: !prevState.showExpressCheckoutHalfCard
      }));
    }

    initCartPageData() {
      const cartStoreData = this.props.getCartStoreData();
      this.setState({
        loading: true,
        error: null,
        data: cartStoreData,
        isExchangeCart: cartStoreData ? checkExchangeCart(cartStoreData) : false
      });

      const data = get(window, '_checkout_.__myx_data__');
      if (data) {
        if (data.httpStatus === 200) {
          this.setPageData(data);
        } else if (data.status === 'UPDATE_TOKENS') {
          TokenManager.refreshToken(this.getCartPageData);
        } else {
          this.setState({ loading: false, error: {} });
        }
        window._checkout_.__myx_data__ = null;
      } else {
        this.getCartPageData();
      }
    }

    onActionSuccess(responseData, callback) {
      window._checkout_.__myx_data__ = responseData;
      this.setPageData(responseData, callback);
    }

    onActionError(error) {
      if (get(error, 'error.status') === 'UPDATE_TOKENS') {
        TokenManager.refreshToken(this.getCartPageData);
      } else {
        this.setState({ error, loading: false });
      }
    }

    updatePageData(res = {}, options) {
      // keepPreviousState is for when we don't want to update state after an api response is fetched. Currently used in resolveConflict action.
      !options.keepPreviousState &&
        this.setState(prevState => ({
          data: res,
          isExchangeCart: checkExchangeCart(res),
          dynamicStyles: {
            ...prevState.dynamicStyles,
            highlightProductsSelection: false
          }
        }));
    }

    setLoader(loading, callback) {
      this.setState({ loading }, callback);
    }

    handleCartAction(
      action,
      data,
      successCallback,
      errorCallback,
      options = {},
      headers = {}
    ) {
      this.setState({ loading: true, error: null });
      CartManager[action](
        data,
        res => {
          this.setState({ loading: false });
          this.updatePageData(res, options);
          successCallback && successCallback(res);
        },
        err => {
          this.setState({ loading: false, error: err });
          errorCallback ? errorCallback(err) : errorNotification(options);
        },
        headers
      );
    }

    updateServiceability(
      obj,
      successCallback,
      errorCallback,
      options = {
        showErrorToast: true
      }
    ) {
      this.handleCartAction(
        'getCartServiceability',
        obj.pincode,
        res => {
          successCallback(res);
        },
        err => {
          options.showErrorToast &&
            SHELL.alert('info', {
              message: get(err, 'message'),
              styleOverrides: {
                notifyMainDiv: `bottom: 82px;`
              }
            });
          errorCallback && errorCallback();
        }
      );
    }

    updateCredits(creditsBalance) {
      if (creditsBalance.gcBalance) {
        this.creditsBalance.gcBalance = creditsBalance.gcBalance;
      }
      if (creditsBalance.lpBalance) {
        this.creditsBalance.lpBalance = creditsBalance.lpBalance;
      }
      if (creditsBalance.scBalance) {
        this.creditsBalance.scBalance = creditsBalance.scBalance;
      }
    }

    updateStyleViolation(data) {
      this.styleCappingData = get(data, 'violatedProducts', []);
      this.toggleStyleCappingModal();
    }

    render() {
      let {
        props,
        state,
        handleCartAction,
        updatePageData,
        toggleCartModal,
        updateDynamicStyles,
        setLoader,
        toggleExpressCheckoutHalfCard,
        updateStyleViolation,
        toggleStyleCappingModal,
        updateServiceability,
        updateCredits,
        creditsBalance,
        styleCappingData,
        toggleCancelOrderModal
      } = this;
      return (
        <ChildComponent
          {...state}
          {...props}
          toggleCancelOrderModal={toggleCancelOrderModal}
          updateStyleViolation={updateStyleViolation}
          toggleStyleCappingModal={toggleStyleCappingModal}
          updateServiceability={updateServiceability}
          handleCartAction={handleCartAction}
          updatePageData={updatePageData}
          toggleCartModal={toggleCartModal}
          updateDynamicStyles={updateDynamicStyles}
          setLoader={setLoader}
          toggleExpressCheckoutHalfCard={toggleExpressCheckoutHalfCard}
          updateCredits={updateCredits}
          updateDeliveryEstimates={getDeliveryEstimatesUtil(
            handleCartAction,
            'get'
          )}
          creditsBalance={creditsBalance}
          styleCappingData={styleCappingData}
        />
      );
    }
  };
};

CartPageHoc.propTypes = {
  analytics: PropTypes.func,
  storeData: PropTypes.func,
  updateStoreData: PropTypes.func
};

CartPageHoc.defaultProps = {
  updateStoreData: () => {},
  storeData: () => {},
  analytics: () => {}
};

export default CartPageHoc;
