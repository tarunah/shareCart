import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  AndroidBridgeHelper,
  IOSBridgeHelper
} from 'commonBrowserUtils/JSBridgeHelper';
import {
  errorNotification,
  setCookie,
  getCookie,
  getUidx,
  isMyntAppEnabled,
  isSessionStorageEnabled,
  isWebkitEnabled,
  isLocalStorageEnabled,
  navigateTo
} from 'commonBrowserUtils/Helper';
import {
  getMynacoConfirmationScreenLoadData,
  getMynacoV3ConfirmationScreenLoadData
} from 'commonBrowserUtils/ConfirmationHelper';
import { resetPaymentRetrySession } from 'commonBrowserUtils/PaymentHelper';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import TokenManager from 'commonBrowserUtils/TokenManager';
import {
  cookieKeys,
  sessionStorageKeys,
  localStorageKeys,
  orderStates,
  confirmationScreenTypes as screenTypes
} from 'commonUtils/constants';
import { getQueryParam } from 'commonUtils/helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';

const DATA_KEY = '_checkout_.__myx_data__';
const boundFuncs = [
  'initConfirmPageData',
  'handleConfirmationAction',
  'toggleConfirmationModal',
  'cancelOrder',
  'retryPayment',
  'onSuccess',
  'onError',
  'showLoader',
  'getConfirmationPageData',
  'triggerDOPELoadEvent',
  'disableLoader',
  'claimReward'
];
const { featureTag } = getGrowthHackConfigValue('SCRATCHCARD_CONFIG');
const recordOrderComplete = data => {
  const storeOrderId = `${get(data, 'bountyOrder.storeOrderId')}`;
  const finalAmount = `${get(data, 'bountyOrder.payments.amount', 0) / 100}`;
  const shippingCharge = `${get(
    data,
    'bountyOrder.payments.charges.shipping',
    0
  ) / 100}`;

  AndroidBridgeHelper.recordOrderComplete(
    storeOrderId,
    finalAmount,
    shippingCharge
  );

  IOSBridgeHelper.recordOrderComplete({
    storeOrderId,
    finalAmount,
    shippingCharge
  });
};

const categoryMap = {
  af_acquisition_men: 'acquisition',
  af_acquisition_women: 'acquisition',
  af_acquisition_premium: 'acquisition',
  Acquisition: 'acquisition',
  af_purchase: 'purchase',
  'First Purchase': 'first_purchase'
};

const getGenderBasedProducts = (products, gender) =>
  products.filter(product => {
    const productGender = get(product, 'style.gender', '').toLowerCase();
    return productGender === gender || productGender === 'unisex';
  });

// Returns [{ item, style }] where item is bounty item and style is its corresponding style info
const getAllProducts = data =>
  get(data, 'productData.styles', []).reduce((acc, style) => {
    const items = get(data, 'bountyOrder.items', []).filter(
      item => item.styleId === style.id
    );
    items.forEach(item => {
      acc.push({ item, style });
    });
    return acc;
  }, []);

const getCustomEventValues = products => {
  const revenueList = products.map(
    product => get(product, 'item.payments.amount', 0) / 100
  );
  const totalRevenue = revenueList.reduce((acc, revenue) => acc + revenue, 0);
  const styleIds = products.map(product => get(product, 'item.styleId'));
  const styleNames = products.map(product =>
    get(product, 'style.productDisplayName')
  );
  const brands = products.map(product => get(product, 'style.brandName'));
  const categories = products.map(product =>
    get(product, 'style.masterCategory.typeName')
  );
  const quantities = products.map(product => get(product, 'item.quantity'));
  const genders = products.map(product => get(product, 'style.gender'));
  const storeOrderId = getQueryParam({
    name: 'orderid',
    optionalNames: ['orderId', 'storeOrderId']
  });
  let content = [];
  products.forEach((key, i) => {
    content.push({ id: styleIds[i], quantity: quantities[i] });
  });

  return [
    { key: 'af_content_type', value: 'product' },
    { key: 'af_content', value: JSON.stringify(content) },
    { key: 'af_user_name', value: '' },
    { key: 'af_first_name', value: '' },
    { key: 'af_product_gender', value: genders },
    { key: 'af_order_id', value: storeOrderId },
    { key: 'af_revenue', value: totalRevenue },
    { key: 'af_content_id_list', value: styleIds },
    { key: 'af_content_list', value: brands },
    { key: 'af_quantity_list', value: quantities },
    { key: 'af_cust_id', value: getUidx() },
    { key: 'af_receipt_id', value: storeOrderId },
    { key: 'af_revenue_list', value: revenueList },
    { key: 'af_content_type_list', value: categories },
    { key: 'af_product_info_list', value: styleNames }
  ];
};

const getCustomEventCreator = updatedVersion => (eventType, eventValues) =>
  updatedVersion
    ? {
        eventType,
        category: categoryMap[eventType],
        eventValues
      }
    : eventType;

export const getCustomEvents = data => {
  const createCustomEvent = getCustomEventCreator(
    isMyntAppEnabled(['mynacoSendEventV2']) ||
      isWebkitEnabled(['mynacoSendEventV2'])
  );
  const allProducts = getAllProducts(data);
  const commonEventValues = getCustomEventValues(allProducts);

  const events = [createCustomEvent('Acquisition', commonEventValues)];
  getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true'
    ? events.push(createCustomEvent('First Purchase', commonEventValues))
    : events.push(createCustomEvent('af_purchase', commonEventValues));

  const menProducts = getGenderBasedProducts(allProducts, 'men');
  const womenProducts = getGenderBasedProducts(allProducts, 'women');
  const premiumProducts = allProducts.filter(
    product => get(product, 'item.payments.amount', 0) / 100 > 2000
  );

  menProducts.length !== 0 &&
    events.push(
      createCustomEvent('af_acquisition_men', getCustomEventValues(menProducts))
    );
  womenProducts.length !== 0 &&
    events.push(
      createCustomEvent(
        'af_acquisition_women',
        getCustomEventValues(womenProducts)
      )
    );
  premiumProducts.length !== 0 &&
    events.push(
      createCustomEvent(
        'af_acquisition_premium',
        getCustomEventValues(premiumProducts)
      )
    );

  return { events };
};

const defaultDependencyList = [
  'orderComplete',
  'webengage',
  'gtm',
  'events',
  'sizefit'
];
const TYPE_DEPENDENCY_MAP = {
  [screenTypes.orderSuccess]: defaultDependencyList,
  [screenTypes.payFailOrderSuccess]: defaultDependencyList,
  [screenTypes.payPendingCodElig]: [],
  [screenTypes.payPendingCodNotElig]: [],
  [screenTypes.payPendingPlacedOrder]: [],
  [screenTypes.paySuccess]: [],
  default: defaultDependencyList
};

const TYPE_EVENT_MAP = {
  [screenTypes.payFailOrderSuccess]: {
    page_load: 'DOPE_PAYMENT_FAILED_PAGE_LOAD',
    retry_payment: 'DOPE_PAYMENT_FAILED_RETRY_PAYMENT_CLICK',
    cancel_order: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_CLICK'
  },
  [screenTypes.payPendingCodElig]: {
    page_load: 'DOPE_RETRY_PAYMENT_PENDING',
    retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK',
    cancel_order: 'DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK'
  },
  [screenTypes.payPendingCodNotElig]: {
    page_load: 'DOPE_RETRY_PAYMENT_PENDING',
    retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK',
    cancel_order: 'DOPE_PAYMENT_PENDING_CANCEL_ORDER_CLICK'
  },
  [screenTypes.payPendingPlacedOrder]: {
    page_load: 'DOPE_RETRY_PAYMENT_PENDING',
    retry_payment: 'DOPE_PAYMENT_PENDING_RETRY_PAYMENT_CLICK'
  },
  [screenTypes.paySuccess]: {
    page_load: 'DOPE_RETRY_PAYMENT_COMPLETED'
  }
};

const getDOPEEventPayload = data => {
  const payload = {
    custom: {
      custom: {
        v1: get(data, 'bountyOrder.storeOrderId')
      }
    }
  };
  return payload;
};

class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false,
      error: null,
      confirmationModal: { show: false, params: {} }
    };

    this.isEligibleForCard = {};
    this.eligibilityAPILoaded = false;
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    this.storeOrderId = getQueryParam({
      name: 'orderid',
      optionalNames: ['orderId', 'storeOrderId']
    });

    this.type = getQueryParam({ name: 'paymentState' });
  }

  componentDidMount() {
    this.hasDependency('orderComplete') &&
      setCookie(cookieKeys.ORDER_CONFIRMED, '1');

    // Clear ftc cookie on unload
    window.addEventListener('beforeunload', () => {
      setCookie(cookieKeys.FIRST_TIME_CUSTOMER, '', 0); // deleting firstTimeCustomer cookie on unload
    });

    resetPaymentRetrySession();
    setCookie(cookieKeys.ORDER_ADDRESS_ID, '', 0); // Deleting oai cookie
    setCookie(cookieKeys.ORDER_ADDRESS_UNIFIED_ID, '', 0);
    setCookie(cookieKeys.GIFT_ORDER_ADDRESS_ID, '', 0); // deleting giftcard order address id cookie
    if (isFeatureEnabled('ADDRESS_ON_CART_V2')) {
      UserLocationDetailsUtil.setLocation({
        pincode: '',
        addressId: 0,
        addressName: '',
        unifiedId: ''
      });
    }
    if (isSessionStorageEnabled()) {
      sessionStorage.setItem(
        sessionStorageKeys.PAYMENT_ONLINE_FAILURE_COUNT,
        '{}'
      ); //resetting payment failure count
    }
    if (isLocalStorageEnabled()) {
      localStorage.removeItem(localStorageKeys.GIFTCARD_PURCHASE_DETAILS);
    }
    this.props.analytics('setPageContext')('Checkout-confirmation'); // Set Page Context
    ProfileManager.fetchDetails(this.initConfirmPageData);
    triggerEvent('VIEW_ORDER_CONFIRMATION', {
      maData: {
        entity_optional_attributes: {
          orderId: (this.storeOrderId = getQueryParam({
            name: 'orderid',
            optionalNames: ['orderId', 'storeOrderId']
          })),
          experiment_id: 'TBA',
          featureTag
        }
      },
      custom: {
        event_type: 'screenLoad',
        event_category: 'Order confirmation page',
        action: 'View'
      }
    });
  }

  componentDidUpdate() {
    if (!this.firstUpdate && this.state.data) {
      const {
        state: { data }
      } = this;

      if (this.hasDependency('events')) {
        const styles = get(data, 'productData.styles', []);
        get(data, 'bountyOrder.items', []).forEach(item => {
          const style = styles.find(
            styleDetails => styleDetails.id === item.styleId
          );
          if (style) {
            triggerEvent('CONFIRMATION_EC_ADD_PRODUCT', {
              gaData: {
                name: 'addProduct',
                data: {
                  id: item.styleId,
                  name: style.name,
                  brand: style.brandName,
                  price: get(item, 'payments.amount', 0) / 100,
                  quantity: item.quantity,
                  variant: item.skuId,
                  sellerPartnerId: item.sellerPartnerId
                }
              }
            });
          }
        });

        const orderDetails = get(data, 'bountyOrder', null);
        if (orderDetails) {
          triggerEvent('CONFIRMATION_EC_PURCHASE', {
            gaData: {
              name: 'setAction',
              category: 'purchase',
              data: {
                id: orderDetails.storeOrderId,
                affiliation: 'Myntra.com',
                revenue: get(orderDetails, 'payments.amount', 0) / 100,
                tax: get(orderDetails, 'payments.charges.gst', 0) / 100,
                shipping:
                  get(orderDetails, 'payments.charges.shipping', 0) / 100,
                coupon: get(orderDetails, 'payments.couponCode', '')
              }
            }
          });
        }

        const mynacoAttributes = getMynacoConfirmationScreenLoadData(data);
        const entity_id = getQueryParam({
          name: 'orderid',
          optionalNames: ['orderId', 'storeOrderId']
        });
        const mynacoV3 = {
          templateData: {
            ...getMynacoV3ConfirmationScreenLoadData(data),
            entity_id,
            entity_type: 'order',
            type: 'Checkout',
            variant: 'react'
          }
        };
        let defaultWidgetItems = {
          data_set: {
            data: []
          }
        };
        const widget_items = defaultWidgetItems;

        if (get(mynacoV3, 'templateData.widget_items.data_set.data')) {
          widget_items = {
            ...get(mynacoV3, 'templateData.widget_items')
          };
        }

        widget_items.data_set.data = widget_items.data_set.data.map(data => {
          if (!get(data, 'entity_type')) {
            return { ...data, entity_type: 'product' };
          }
          return data;
        });

        const eventPayload = {
          customEvents: getCustomEvents(data),
          mynacoAttributes,
          mynacoV3,
          maData: {
            entity_id,
            entity_type: 'order'
          },
          custom: {
            custom: {
              v1: get(window, '_checkout_.__myx_traffic__.medium', ''),
              v2: get(window, '_checkout_.__myx_traffic__.source', '')
            },
            widget_items: { ...widget_items }
          }
        };
        // Trigger confirmation screen load event
        triggerEvent('CONFIRMATION_SCREEN_LOAD', eventPayload);
      }

      // Push GTM data
      this.hasDependency('gtm') &&
        this.props.analytics('pushGTMConfirmationData')(data);

      if (this.hasDependency('webengage')) {
        // Start and trigger webengage event
        this.props.analytics('initWebengage')();
        this.props.analytics('triggerWebengage')('CHECKOUT_COMPLETE', data);
      }

      // Track Size and fit
      this.hasDependency('sizefit') &&
        this.props.analytics('trackSizeFit')(data);

      // Trigger DOPE MA Events
      this.triggerDOPELoadEvent();

      // Mark order complete
      this.hasDependency('orderComplete') && recordOrderComplete(data);

      // Update count
      CartCountHandler.updateState();
      CartCountHandler.triggerUpdate('confirmation');

      this.firstUpdate = true;
    }
  }

  triggerDOPELoadEvent() {
    const payload = getDOPEEventPayload(this.state.data);
    triggerEvent(get(TYPE_EVENT_MAP[this.type], 'page_load'), payload);
  }

  hasDependency(dep) {
    const dependencies =
      TYPE_DEPENDENCY_MAP[this.type] || TYPE_DEPENDENCY_MAP.default;
    return dependencies.indexOf(dep) !== -1;
  }

  onSuccess(data) {
    this.setState({
      data,
      loading: false
    });
  }

  onError(error) {
    if (get(error, 'error.status') === 'UPDATE_TOKENS') {
      TokenManager.refreshToken(this.getConfirmationPageData);
    } else {
      this.setState({ error, loading: false });
    }
  }

  showLoader() {
    this.setState({
      loading: true
    });
  }

  disableLoader() {
    this.setState({
      loading: false
    });
  }

  toggleConfirmationModal(modalParams) {
    if (this.type === screenTypes.payFailOrderSuccess) {
      const payload = getDOPEEventPayload(this.state.data);
      modalParams && triggerEvent(get(modalParams, 'eventName'), payload);
    }
    this.setState(prevState => {
      const {
        confirmationModal: { show }
      } = prevState;
      return {
        confirmationModal: {
          show: !show,
          params: show ? {} : modalParams
        }
      };
    });
  }

  retryPayment() {
    const payload = getDOPEEventPayload(this.state.data);
    triggerEvent(get(TYPE_EVENT_MAP[this.type], 'retry_payment'), payload);
    const ppsId = get(this, 'state.data.bountyOrder.payments.ppsId');
    const referrer =
      [screenTypes.payPendingCodElig, screenTypes.payPendingCodNotElig].indexOf(
        this.type
      ) !== -1
        ? orderStates.PENDING
        : orderStates.PLACED_FRESH;
    const redirectURL = `/checkout/payment?mode=retry&ppsid=${ppsId}&referrer=${referrer}`;

    navigateTo(redirectURL);
  }

  cancelOrder() {
    this.showLoader();
    const payload = getDOPEEventPayload(this.state.data);
    triggerEvent(get(TYPE_EVENT_MAP[this.type], 'cancel_order'), payload);
    const referrer =
      [screenTypes.payPendingCodElig, screenTypes.payPendingCodNotElig].indexOf(
        this.type
      ) !== -1
        ? 'ordercancelled'
        : '';

    const redirectURL = referrer ? `/checkout/cart?referrer=${referrer}` : '/';
    //set cancel order modal cookie to false
    if (referrer) {
      setCookie(cookieKeys.CART_CANCEL_ORDER_MODAL, 'false');
    }
    // call cancel order api
    // on success, redirect to redirectURL
    // on failure, show error notification
    ConfirmationManager.cancelOrder(
      this.storeOrderId,
      res => {
        this.toggleConfirmationModal();
        setTimeout(() => {
          navigateTo(redirectURL);
        }, 0);
      },
      err => {
        this.disableLoader();
        this.toggleConfirmationModal();
        const config = {
          message: 'Something went wrong. Please try agin!',
          delay: 5000
        };
        errorNotification(config);
      }
    );
  }

  getConfirmationPageData() {
    const orderId = getQueryParam({
      name: 'orderid',
      optionalNames: ['orderId', 'storeOrderId']
    });
    Promise.all([
      ConfirmationManager.getPageData(this.storeOrderId),
      ConfirmationManager.getProfile(),
      this.type === screenTypes.paySuccessCodUserConsent
        ? Promise.resolve({})
        : ConfirmationManager.createScratchCardIfEligible({
            featureTag,
            featureIdentifier: orderId
          })
    ])
      .then(([pageData, profileData, scratchResponse]) => {
        this.isEligibleForCard = scratchResponse;
        this.eligibilityAPILoaded = true;
        this.onSuccess({
          ...pageData,
          profiles: get(profileData, 'data.sizeProfile.profileList', [])
        });
      })
      .catch(error => {
        this.onError(error);
      });
  }
  claimReward(id, successCB, errorCB) {
    const timeoutId = setTimeout(() => {
      errorCB('API Timeout');
    }, 10000);
    ConfirmationManager.claimReward(id)
      .then(data => {
        successCB(data);
        clearTimeout(timeoutId);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        errorCB(err);
      });
  }

  initConfirmPageData() {
    this.setState({
      loading: true
    });
    const data = get(window, DATA_KEY, null);
    if (data) {
      if (data.status === 'UPDATE_TOKENS') {
        TokenManager.refreshToken(this.getConfirmationPageData);
      } else if (data.httpStatus === 401) {
        SHELL.redirectTo(`/login?force=true&referer=${window.location.href}`);
      } else if (data.httpStatus === 200) {
        const orderId = getQueryParam({
          name: 'orderid',
          optionalNames: ['orderId', 'storeOrderId']
        });
        Promise.all([
          ConfirmationManager.getProfile(),
          this.type === screenTypes.paySuccessCodUserConsent
            ? Promise.resolve({})
            : ConfirmationManager.createScratchCardIfEligible({
                featureTag,
                featureIdentifier: orderId
              })
        ])
          .then(([response, scratchResponse]) => {
            this.isEligibleForCard = scratchResponse;
            this.eligibilityAPILoaded = true;
            this.onSuccess({
              ...data,
              profiles: get(response, 'data.sizeProfile.profileList', [])
            });
          })
          .catch(e => {
            this.setState({
              data: {
                ...data,
                profiles: []
              },
              loading: false
            });
          });
      } else {
        this.onError(data);
      }
      window._checkout_.__myx_data__ = null;
    } else {
      this.getConfirmationPageData();
    }
  }

  handleConfirmationAction(action, data, onSuccess, onError, options) {
    ConfirmationManager[action](
      data,
      res => {
        onSuccess && onSuccess(res);
      },
      err => {
        onError && onError(err);
        errorNotification(options);
      }
    );
  }

  render() {
    const {
      props: { render, analytics },
      state
    } = this;
    return (
      <div>
        {render({
          actionHandlers: pick(this, boundFuncs),
          dataState: state,
          screenType: this.type,
          analytics,
          eligibilityAPILoaded: this.eligibilityAPILoaded,
          isEligibleForCard: this.isEligibleForCard
        })}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  render: PropTypes.func
};

export default ConfirmationPage;
