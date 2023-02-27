const url = require('url');
const mcookies = require('@myntra/myx/lib/server/cookies');

const get = require('lodash/get');
const set = require('lodash/set');
const values = require('lodash/values');
const pick = require('lodash/pick');

const atlas = require('./atlas');
const Logger = require('./logger');
const { isFeatureEnabled } = require('../../utils/FeaturesManager');
const { getKVPairValue } = require('../../utils/KVPairManager');
const {
  cookieKeys,
  confirmationScreenTypes: screenTypes
} = require('../../utils/constants');
const {
  orderAddressByUnifiedId,
  bountyFetch,
  styleGetPdpDataBulk,
  paymentLog,
  feedbackSurvey
} = require('../circuitBreakers/services');

const logContext = {
  context: 'confirmationUtils'
};

const fmt = val => {
  if (val === undefined || Number.isNaN(val)) {
    return '0.00';
  }
  return Number(val).toFixed(2);
};

// Constants
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';
const styleDataFields = [
  'ageGroup',
  'articleType',
  'gender',
  'id',
  'masterCategory',
  'brandDetailsEntry',
  'name',
  'price',
  'brandName',
  'articleNumber',
  'productDisplayName',
  'productTypeName',
  'productTypeId',
  'subCategory',
  'styleImages'
];

const unescapeHTML = str => {
  const escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  if (str == null) {
    return '';
  }

  return String(str).replace(/\&([^;]+);/g, (entity, entityCode) => {
    let match;

    if (entityCode in escapeChars) {
      return escapeChars[entityCode];
    } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
      return String.fromCharCode(parseInt(match[1], 16));
    } else if ((match = entityCode.match(/^#(\d+)$/))) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};

const getCartDataForAtlas = orderData => {
  const cartData = {};
  let totalDiscount =
    (values(get(orderData, 'bountyOrder.payments.discounts', {})) || []).reduce(
      (acc, val) => acc + val,
      0
    ) / 100;

  get(orderData, 'bountyOrder.items', []).forEach(item => {
    let itemDiscount =
      (values(get(item, 'payments.discounts', {})) || []).reduce(
        (acc, val) => acc + val,
        0
      ) / 100;

    let style =
      get(orderData, 'productData.styles', []).find(
        style => style.id === item.styleId
      ) || {};
    const options = get(orderData, 'productData.styleOptions', []).find(
      option => option.styleId === style.id
    );
    const skuInfo =
      get(options, 'styleOptions', []).find(
        option => option.skuId === item.skuId
      ) || {};

    cartData[`${item.styleId}_${item.skuId}`] = {
      gift_card_amount: '0.00',
      warehouseid: '0',
      style_id: String(item.styleId),
      orderid: String(get(orderData, 'bountyOrder.storeOrderId')),
      itemid: '',
      item_status: item.status,
      difference_refund: null,
      tax_rate: fmt(get(item, 'payments.taxRate')),
      cart_discount_split_on_ratio: '0.00',
      actual_product_price: fmt(item.unitPrice),
      product: '',
      productId: '',
      productStyleId: String(item.styleId),
      producTypeId: String(style.productTypeId),
      productPrice: fmt(item.unitPrice),
      quantity: String(item.quantity),
      totalPrice: fmt(get(item, 'payments.amount') / 100),
      total: fmt(get(orderData, 'bountyOrder.payments.amount') / 100),
      discountRuleId: String(item.discountRuleId),
      discountRuleRevId: String(item.discountRuleRevId),
      discount: fmt(itemDiscount),
      totalDiscount: fmt(totalDiscount),
      quantity_breakup: `${skuInfo.unifiedSize || skuInfo.value}:${
        item.quantity
      }`,
      promotion_id: null,
      addonid: null,
      pos_unit_mrp: null,
      pos_total_amount: null,
      unitPrice: fmt(item.unitPrice),
      taxamount: fmt(get(item, 'payments.charges.gst') / 100),
      coupon_discount: fmt(get(item, 'payments.discounts.coupon') / 100),
      item_loyalty_points_used: '0.00',
      loyalty_points_conversion_factor: '1',
      cashdiscount: fmt(
        get(orderData, 'bountyOrder.payments.instruments.cashRedeemed') / 100
      ),
      cashCouponCode: null,
      payment_surcharge: '0.00',
      total_amount: fmt(get(orderData, 'bountyOrder.payments.amount') / 100),
      sku_id: String(item.skuId),
      discount_quantity: String(item.discountedQuantity),
      supply_type: item.supplyType,
      seller_id: item.sellerPartnerId
        ? String(item.sellerPartnerId)
        : String(item.sellerId),
      optionCount: 0,
      productStyleName: style.productDisplayName,
      productTypeLabel: get(style, 'articleType.typeName'),
      article_number:
        typeof style.articleNumber === 'string'
          ? style.articleNumber.substr(0, 10)
          : '',
      article_type: String(get(style, 'articleType.id')),
      product_display_name: style.productDisplayName,
      typename: get(style, 'masterCategory.typeName'),
      defaultCustomizationId: null,
      productStyleType: 'P',
      productTypeLabel: get(style, 'articleType.typeName'),
      designImagePath: get(style, 'styleImages.default.path'),
      final_size: String(skuInfo.unifiedSize || skuInfo.value || ''),
      final_quantity: String(item.quantity),
      final_size_replaced: get(skuInfo, 'value', ''),
      productCatLabel: `${get(style, 'articleType.typeName')}|${get(
        style,
        'brandDetailsEntry.name'
      )}`,
      storeOrderId: String(get(orderData, 'bountyOrder.storeOrderId')),
      totalProductPrice: fmt(get(item, 'payments.amount') / 100),
      couponDiscount: fmt(get(item, 'payments.discounts.coupon') / 100),
      cartDiscount: '0.00',
      totalMyntCashUsage: fmt(
        get(orderData, 'bountyOrder.payments.instruments.cashRedeemed') / 100
      ),
      loyalty_credit: '0.00',
      discountAmount: itemDiscount
    };
  });

  return cartData;
};

const prepareAtlasData = (orderData, paymentLog = {}) => {
  const instrumentDetails = paymentLog.instrumentDetails || {};
  const atlasData = {
    page: 'confirmation',
    isResp: true,
    orderData: {
      orderId: get(orderData, 'bountyOrder.storeOrderId'),
      paymentData: {
        time_return: instrumentDetails.returnTime,
        is_tampered: instrumentDetails.isTampered,
        is_complete: instrumentDetails.isComplete,
        is_flagged: instrumentDetails.isFlagged,
        amountToBePaid: instrumentDetails.amountToBePaid,
        amountPaid: instrumentDetails.amountPaid,
        completedVia: instrumentDetails.completedVia,
        user_agent: instrumentDetails.userAgent,
        ip_address: instrumentDetails.ipAddress,
        is_inline: instrumentDetails.isInline,
        time_insert: instrumentDetails.insertTime,
        response_code: instrumentDetails.responseCode,
        response_message: instrumentDetails.responseMessage,
        gatewayResponse: instrumentDetails.gatewayResponse,
        orderid: paymentLog.orderId,
        login: paymentLog.login,
        amount: paymentLog.amount,
        payment_gateway_name: instrumentDetails.gatewayName,
        payment_option: instrumentDetails.paymentOption,
        payment_issuer: instrumentDetails.paymentIssuer,
        time_transaction: instrumentDetails.transactionTime,
        bank_transaction_id: instrumentDetails.bankTransactionId,
        payment_gateway_id: instrumentDetails.gatewayPaymentId,
        card_bank_name: instrumentDetails.cardBankName,
        bin_number: instrumentDetails.binNumber,
        coupon: get(orderData, 'bountyOrder.payments.couponCode'),
        cash_coupon_code: '',
        cash_redeemed: fmt(
          get(orderData, 'bountyOrder.payments.instruments.cashRedeemed') / 100
        ),
        coupon_discount:
          get(orderData, 'bountyOrder.payments.discounts.coupon') / 100
      },
      cartData: getCartDataForAtlas(orderData),
      styleIdsWithOldSizeChartClicked: null,
      styleIdsWithNewSizeChartClicked: null
    }
  };

  return atlasData;
};

const triggerAtlasEvent = (req, ...args) => {
  const data = prepareAtlasData(...args);
  atlas.track(req, data, () => {}, {
    log: process.env.NODE_ENV !== 'production'
  });
};

// Return error in a particular format.
const error = (e, message, tokensUpdated) => ({
  httpStatus: e.status || 500,
  message: get(e, 'response.body.message') || message,
  status: tokensUpdated ? 'UPDATE_TOKENS' : 'ERROR'
});

// Return error in a particular format.
const errorFormat = (error, service) => ({
  error,
  service
});

// Fetches and returns bounty response.
const getBounty = req => {
  return new Promise((resolve, reject) => {
    bountyFetch
      .fire(req)
      .then(data => resolve(data))
      .catch(error => reject(errorFormat(error, 'bountyFetch')));
  });
};

// Extracts styleIds and skuIds from order. Returns object containing styleIds and skuIds.
const getStylesAndSkus = order => {
  const styleId = [];
  const skuIds = [];

  get(order, 'items', []).forEach(item => {
    styleId.push(item.styleId);
    skuIds.push(item.skuId);
  });

  return { styleId, skuIds };
};

// Picks only the required fields from style data
const sanitizeStyleResp = style => {
  return pick(style, styleDataFields);
};

// Fetches Style data. Calls 'GetPdpDataBulk' method in Style service.
// Logic taken from old checkout.
// Returns object containing styles and skuIds
// Styles and skus for particular age-groups and article-types, are populated first (for size and fit).
const getStyleData = (req, res, order) => {
  const styles = [];
  const skus = [];
  const styleOptions = [];
  const { styleId, skuIds } = getStylesAndSkus(order);
  let taggableProductsCount = 0;

  return new Promise((resolve, reject) => {
    styleGetPdpDataBulk
      .fire(req, res, { data: { styleId } })
      .then(resp => {
        get(resp, 'data', []).forEach((params, index) => {
          const style = get(params, 'cmsEntry', {});
          const {
            ageGroup,
            masterCategory: { typeName: category } = {}
          } = style;
          if (
            (ageGroup === 'Adults-Men' ||
              ageGroup === 'Adults-Women' ||
              ageGroup === 'Adults-Unisex') &&
            (category === 'Apparel' || category === 'Footwear')
          ) {
            styles.unshift(sanitizeStyleResp(style));
            skus.unshift(skuIds[index]);
            taggableProductsCount++;
          } else {
            styles.push(sanitizeStyleResp(style));
            skus.push(skuIds[index]);
          }

          styleOptions.push(get(params, 'styleOptionsList', {}));
        });

        resolve({
          styles,
          skus,
          styleOptions,
          taggableProductsCount
        });
      })
      .catch(error => reject(errorFormat(error, 'styleGetPdpDataBulk')));
  });
};

// If item is not eGiftCard type, then it fetches address data by id.
// Picks few fields from the data and returns it.
const getAddressData = (req, res, order) => {
  let eGiftCard;
  if (isFeatureEnabled('CONFIRMATION_ADDRESSTYPE_ENABLE', null, req)) {
    get(order, 'items', []).forEach(item => {
      if (item.flags.isGiftCard && order.address.unifiedAddressId) {
        eGiftCard = true;
      }
    });
  }

  if (!eGiftCard && order.address.unifiedAddressId) {
    return new Promise(resolve => {
      orderAddressByUnifiedId
        .fire(req, res, { unifiedAddressId: order.address.unifiedAddressId })
        .then(data => {
          const keys = [
            'id',
            'user.name',
            'user.mobile',
            'streetAddress',
            'locality',
            'city',
            'state.name',
            'state.code',
            'pincode',
            'addressType',
            'unifiedId'
          ];
          const delivery = pick(data, keys);
          keys.forEach(key => {
            set(delivery, key, unescapeHTML(get(delivery, key)));
          });
          resolve(delivery);
        })
        .catch(error => {
          Logger.logError(
            req,
            `Unable to fetch order address by unified id ${order.address.unifiedAddressId}`,
            logContext,
            error
          );
          resolve({});
        });
    });
  } else {
    return Promise.resolve({});
  }
};

// Fetches payment log.
const getPaymentLog = (req, order) => {
  if (get(order, 'bountyOrder.payments.ppsId')) {
    return new Promise(resolve => {
      paymentLog
        .fire(req, { order })
        .then(data => resolve(get(data, 'data.0')))
        .catch(error => {
          if (error.status === 'UPDATE_TOKENS') {
            Logger.logInfo(`Tokens need to be updated`, logContext, error);
          } else {
            Logger.logError(
              req,
              'Unable to fetch payment log',
              logContext,
              error
            );
          }
          resolve({});
        });
    });
  } else {
    Logger.logError(
      req,
      'ppsId not present for getting paymentLog',
      logContext
    );
    return Promise.resolve({});
  }
};

// Fetches order data needed for confirmation page.
const getOrderData = async function(req, res, hasDependency) {
  try {
    let dataToSend = { resStatus: STATUS_SUCCESS };

    const bountyOrder = hasDependency('bounty') && (await getBounty(req));
    const stylePromise = hasDependency('style')
      ? getStyleData(req, res, bountyOrder)
      : Promise.resolve();
    const deliveryPromise = hasDependency('address')
      ? getAddressData(req, res, bountyOrder)
      : Promise.resolve();

    const [productData, delivery] = await Promise.all([
      stylePromise,
      deliveryPromise
    ]);

    bountyOrder && (dataToSend.bountyOrder = bountyOrder);
    productData && (dataToSend.productData = productData);
    delivery && (dataToSend.delivery = delivery);

    return dataToSend;
  } catch (e) {
    return { resStatus: STATUS_ERROR, resError: e };
  }
};

const createFeedbackSurvey = function(req, res, hasDependency) {
  return new Promise(resolve => {
    const cookies = mcookies(req, res);
    const storeOrderId =
      get(req, 'query.orderid') ||
      get(req, 'query.orderId') ||
      get(req, 'query.storeOrderId');
    const isFeedbackGiven = cookies.get(
      `${cookieKeys.FEEDBACK_SURVEY_ON_ORDER_ID}_${storeOrderId}`
    );

    if (
      !(
        hasDependency('feedbackSurvey') &&
        get(
          getKVPairValue('CONFIRMATION_PAGE_CONFIG', req),
          'showFeedbackSurveyWidget',
          false
        )
      ) ||
      isFeedbackGiven
    ) {
      return resolve({});
    }

    feedbackSurvey
      .fire(req)
      .then(response => {
        const data = get(response, 'data.0');

        if (data && get(data, 'status') === 'SENT') {
          resolve({
            feedbackSurvey: {
              authenticationKey: get(data, 'authenticationKey'),
              id: get(data, 'id'),
              list: get(data, 'surveyEntry.surveyQuestionList.0')
            }
          });
        } else {
          resolve({});
        }
      })
      .catch(error => {
        if (error.status === 'UPDATE_TOKENS') {
          Logger.logInfo(`Tokens need to be updated`, logContext, error);
        } else {
          Logger.logError(
            req,
            'Unable to create feedback survey',
            logContext,
            error
          );
        }
        resolve({});
      });
  });
};

const errorMap = {
  403: 'You are unauthorized to view details of this order.',
  default: 'Something went wrong. Please reload.'
};

const defaultDependencyList = [
  'bounty',
  'style',
  'address',
  'sizeProfiles',
  'atlas',
  'feedbackSurvey'
];
const TYPE_DEPENDENCY_MAP = {
  [screenTypes.orderSuccess]: defaultDependencyList,
  [screenTypes.payFailOrderSuccess]: defaultDependencyList,
  [screenTypes.payPendingCodElig]: ['bounty'],
  [screenTypes.payPendingCodNotElig]: ['bounty'],
  [screenTypes.payPendingPlacedOrder]: ['bounty'],
  [screenTypes.paySuccess]: ['bounty'],
  default: defaultDependencyList
};

const dependencyChecker = type => dep => {
  const dependencies = TYPE_DEPENDENCY_MAP[type] || TYPE_DEPENDENCY_MAP.default;
  return dependencies.indexOf(dep) !== -1;
};

// Fetches complete data required for confirmation page.
// Order data and size profiles are fetched in parallel.
// If order data fetch is successful, data is sent with status SUCCESS otherwise ERROR.
const getConfirmationData = async function(
  req,
  res,
  successCallback,
  errorCallback
) {
  const hasDependency = dependencyChecker(req.query.paymentState);

  const promises = [
    getOrderData(req, res, hasDependency),
    createFeedbackSurvey(req, res, hasDependency)
  ];

  const response = await Promise.all(promises);

  const orderResp = get(response, '0') || {};

  if (orderResp.resStatus === STATUS_ERROR) {
    const httpStatus = get(orderResp, 'resError.error.errorLog.status', 500);
    const refererHost =
      url.parse(get(req, 'headers.referer') || '').hostname || '';

    errorCallback({
      httpStatus,
      status: get(orderResp, 'resError.error.status', 'ERROR'),
      message: errorMap[httpStatus] || errorMap.default,
      myntraReferer: refererHost.indexOf('myntra.com') !== -1,
      errorLog: get(orderResp, 'resError.error.errorLog'),
      error: get(orderResp, 'resError')
    });
  } else {
    if (
      !isFeatureEnabled('ATLAS_DISABLED', null, req) &&
      hasDependency('atlas')
    ) {
      const paymentLog = await getPaymentLog(req, orderResp);
      triggerAtlasEvent(req, orderResp, paymentLog);
    }

    delete orderResp.resStatus;
    successCallback({
      ...orderResp,
      ...(get(response, '1') || {}),
      httpStatus: 200
    });
  }
};

module.exports = {
  getConfirmationData
};
