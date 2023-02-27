import get from 'lodash/get';
import { getUidx } from 'commonBrowserUtils/Helper';

const getProducts = (items, styles) => {
  return items.map(item => {
    const style = styles.find(style => style.id === item.styleId) || {};
    return {
      'Product ID': style.id || item.styleId,
      Product: style.productDisplayName,
      Brand: style.brandName,
      Quantity: item.quantity,
      'Article Type': get(style, 'articleType.typeName', ''),
      Category: get(style, 'masterCategory.typeName', ''),
      'Sub Category': get(style, 'subCategory.typeName', ''),
      'Discounted Price': get(item, 'payments.amount', 0) / 100,
      'SKU ID': item.skuId,
      Price: item.unitPrice,
      Discount: get(item, 'payments.discounts.product', 0) / 100,
      'Coupon Discount': get(item, 'payments.discounts.coupon', 0) / 100,
      'Try & Buy': get(item, 'flags.isTryAndBuy')
    };
  });
};

export const getConfirmationData = data => {
  const { styleIds, brands, articleTypes, categories, subCategories } = get(
    data,
    'productData.styles',
    []
  ).reduce(
    (acc, style) => {
      acc.styleIds.push(style.id);
      acc.brands.push(style.brandName);
      acc.articleTypes.push(get(style, 'articleType.typeName'));
      acc.categories.push(get(style, 'masterCategory.typeName'));
      acc.subCategories.push(get(style, 'subCategory.typeName'));

      return acc;
    },
    {
      styleIds: [],
      brands: [],
      articleTypes: [],
      categories: [],
      subCategories: []
    }
  );
  return {
    'Order ID': get(data, 'bountyOrder.storeOrderId'),
    Quantity: get(data, 'productData.styles.length'),
    Price: get(data, 'bountyOrder.payments.mrp', 0) / 100,
    Discount: get(data, 'bountyOrder.payments.discounts.product', 0) / 100,
    'Coupon Discount':
      get(data, 'bountyOrder.payments.discounts.coupon', 0) / 100,
    'Final Price': get(data, 'bountyOrder.payments.amount', 0) / 100,
    'Device Channel': get(
      window,
      '_checkout_.__myx_deviceData__.deviceChannel'
    ),
    'Payment Mode': get(data, 'bountyOrder.payments.method'),
    'Shipping Method': get(
      data,
      'bountyOrder.items.0.shippingMethod',
      'NORMAL'
    ),
    'Loyalty Points Used': get(
      data,
      'bountyOrder.flags.isLoyaltyPointsUsed',
      false
    ),
    'Product IDs': styleIds,
    Brands: brands,
    'Article Types': articleTypes,
    Categories: categories,
    'Sub categories': subCategories,
    'Products:': getProducts(
      get(data, 'bountyOrder.items', []),
      get(data, 'productData.styles', [])
    )
  };
};

const webengageEventConfig = {
  CHECKOUT_COMPLETE: data =>
    window.webengage.track('Checkout completed', getConfirmationData(data)),
  PAYMENT_VIEWED: data => window.webengage.track('payment_page_viewed', data),
  PAYMENT_FAILURE: data => window.webengage.track('payment_failure', data),
  ADDRESS_VIEWED: data => window.webengage.track('address_page_viewed', data)
};

export const initWebengage = () =>
  window.webengage && window.webengage.init('~7167db84');

export const triggerWebengage = (event, data) => {
  if (window.webengage) {
    window.webengage.user.login(getUidx());
    webengageEventConfig[event](data);
  }
};
