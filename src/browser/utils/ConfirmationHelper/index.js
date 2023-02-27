import get from 'lodash/get';
import { cookieKeys } from 'commonUtils/constants';
import { getCookie } from 'commonBrowserUtils/Helper';

const getMynacoConfirmationScreenLoadData = data => {
  const products = get(data, 'bountyOrder.items', []).map(item => {
    const style =
      get(data, 'productData.styles', []).find(
        style => style.id === item.styleId
      ) || {};
    const options = get(data, 'productData.styleOptions', []).find(
      option => option.styleId === style.id
    );
    const skuInfo =
      get(options, 'styleOptions', []).find(
        option => option.skuId === item.skuId
      ) || {};
    return {
      'Style-Id': style.id,
      'Style-Name': style.productDisplayName,
      Brand: style.brandName,
      Size: skuInfo.unifiedSize || skuInfo.value,
      Quantity: item.quantity,
      'Article-Type': get(style, 'articleType.typeName', ''),
      Category: get(style, 'masterCategory.typeName', ''),
      SKU: item.skuId,
      Price: get(item, 'payments.amount', 0) / 100,
      Gender: style.gender
    };
  });

  return {
    id: get(data, 'bountyOrder.displayStoreOrderId'),
    revenue: get(data, 'bountyOrder.payments.amount', 0) / 100,
    tax: get(data, 'bountyOrder.payments.charges.gst', 0) / 100,
    shipping: get(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
    medium: get(window, '_checkout_.__myx_traffic__.medium'),
    source: get(window, '_checkout_.__myx_traffic__.source'),
    storeOrderId: get(data, 'bountyOrder.storeOrderId'),
    'first-order': getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
    'storefront-id': '', // styleRevenueAdjusted6 needs to be in myx.ab which is different ab middleware.
    products
  };
};

const getMynacoV3ConfirmationScreenLoadData = data => {
  const mProductList = get(data, 'bountyOrder.items', []).map(item => {
    const style =
      get(data, 'productData.styles', []).find(
        style => style.id === item.styleId
      ) || {};
    const options = get(data, 'productData.styleOptions', []).find(
      option => option.id === style.id
    );
    const skuInfo =
      get(options, 'styleOptions', []).find(
        option => option.skuId === item.skuId
      ) || {};
    return {
      id: style.id,
      name: style.productDisplayName,
      brand: style.brandName,
      quantity: item.quantity,
      size: skuInfo.unifiedSize || skuInfo.value,
      type: get(style, 'articleType.typeName', ''),
      category: get(style, 'masterCategory.typeName', ''),
      skuId: item.skuId,
      price: get(item, 'payments.amount', 0) / 100,
      mrp: get(item, 'payments.mrp', 0),
      gender: style.gender,
      position: -1,
      variant: style.sizes
    };
  });

  const maData = get(data, 'bountyOrder.items', []).map(item => {
    const style =
      get(data, 'productData.styles', []).find(
        style => style.id === item.styleId
      ) || {};
    const options = get(data, 'productData.styleOptions', []).find(
      option => option.id === style.id
    );
    const skuInfo =
      get(options, 'styleOptions', []).find(
        option => option.skuId === item.skuId
      ) || {};
    return {
      entity_optional_attributes: {
        size: style.sizes,
        inv_count: -1,
        price: get(item, 'payments.amount', 0) / 100,
        qty: item.quantity,
        name: style.productDisplayName,
        mrp: get(item, 'payments.mrp', 0),
        disc: 0,
        category: get(style, 'masterCategory.typeName', ''),
        brand: style.brandName,
        skuId: item.skuId
      },
      entity_id: style.id,
      entity_name: style.productDisplayName,
      entity_type: style.productTypeGroup
    };
  });

  return {
    ecommerce: {
      transaction: {
        couponCode: '',
        id: get(data, 'bountyOrder.displayStoreOrderId'),
        revenue: get(data, 'bountyOrder.payments.amount', 0) / 100,
        shipping: get(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
        tax: get(data, 'bountyOrder.payments.charges.gst', 0) / 100
      },
      firstOrder: getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true',
      storeFrontId: '', // styleRevenueAdjusted6 needs to be in myx.ab which is different ab middleware.
      productListName: '',
      mProductList,
      type: 'purchase',
      checkout: {
        step: 0
      }
    },
    widget_items: {
      data_set: {
        data: maData
      }
    }
  };
};

const gotoInsiderPage = () =>
  (window.location.href = '/myntrainsider?cache=false');

const getViewOrder = storeOrderId => () =>
  (window.location.href = `/my/order/details?storeOrderId=${storeOrderId}&fromConfirmation=true`);

export {
  getMynacoConfirmationScreenLoadData,
  getMynacoV3ConfirmationScreenLoadData,
  gotoInsiderPage,
  getViewOrder
};
