import get from 'lodash/get';
import includes from 'lodash/includes';
import { getCookie, getProfileDetails } from 'commonBrowserUtils/Helper';
import { getPricingInfo } from 'commonBrowserUtils/CartHelper';
import { cookieKeys } from 'commonUtils/constants';

!window.gtag &&
  (window.gtag = function() {
    window.dataLayer && window.dataLayer.push(arguments);
  });

export const pushGTMCartData = data => {
  const products = get(data, 'products', []);
  const { discountInfo, chargesInfo, mrp, total } = getPricingInfo(data);

  const cartData = {
    cartIsGiftOrder: get(data, 'giftOrder.active'),
    cartAmount: total,
    cartTotalAmount: total,
    cartMrp: mrp,
    cartCartLevelDiscount: discountInfo.bag,
    cartCouponDiscount: discountInfo.coupon,
    cartCashDiscount: discountInfo.mynts,
    dataTotalCashBackAmount: discountInfo.mynts,
    cartCashBackAmountDisplayOnCart: discountInfo.mynts,
    cartShippingCharge: chargesInfo.shipping || 0,
    cartGiftCharge: chargesInfo.giftwrap || 0,
    cartSavings: discountInfo.totalDiscount,
    cartProductAdded: 0,
    CartProductIdList: products.map(product => product.id),
    cartSociomanticString: JSON.stringify(
      products.map(product => ({
        identifier: product.id,
        amount: get(product, 'price.mrp'),
        currency: 'INR',
        quantity: product.quantity
      }))
    ),
    event: 'gtm.load'
  };

  const cartProducts = [];
  let cartTotalQuantity = 0;
  let cartNanigansString = '';

  Array.from(Array(5)).forEach((val, i) => {
    cartData[`CartProductId${i + 1}`] = get(products, `${i}.id`, '');
    cartData[`CartProductAmount${i + 1}`] = get(products, `${i}.price.mrp`, '');
    cartData[`CartProductQuantity${i + 1}`] = get(
      products,
      `${i}.quantity`,
      ''
    );
  });

  products.forEach((product, i) => {
    cartProducts.push({ id: product.id });
    cartTotalQuantity += product.quantity;
    cartData[`cartItem${i}`] = product.id;
    cartNanigansString += `qty[${i}]=${product.quantity}&value[${i}]=${get(
      product,
      'price.mrp'
    )}&sku[${i}]=${product.skuId}&`;
  });

  cartData['cartTotalQuantity'] = cartTotalQuantity;
  cartData['cartItems'] = cartProducts;
  cartData['cartNanigansString'] = cartNanigansString.slice(0, -1);

  window.dataLayer && window.dataLayer.push(cartData);
};

export const pushGTMConfirmationData = data => {
  const styles = get(data, 'productData.styles', []).map(style => style.id);
  const profile = getProfileDetails();
  const deviceData = get(window, '_checkout_.__myx_deviceData__', {});
  const {
    pageName,
    source,
    medium,
    channel,
    campaign,
    octaneUserHash
  } = getDataLayerAttributes('confirmation');

  const confirmationData = {
    pageName,
    source: source,
    medium: medium,
    campaign: campaign,
    campaignId: campaign,
    channel: channel,
    octaneUserHash: octaneUserHash,
    userEmail: profile.uidx,
    userHashId: profile.userHashId,
    deviceName: deviceData.deviceName,
    deviceType: deviceData.deviceType,
    isLoggedIn: profile.uidx ? '1' : '0',
    isBuyer: getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true' ? '0' : '1',
    isBuyerCookie: '1',
    transactionId: get(data, 'bountyOrder.displayStoreOrderId'),
    transactionTotal: get(data, 'bountyOrder.payments.amount', 0) / 100,
    transactionShipping:
      get(data, 'bountyOrder.payments.charges.shipping', 0) / 100,
    transactionShippingZipcode: get(data, 'delivery.pincode'),
    transactionShippingCity: get(data, 'delivery.city'),
    transactionPaymentType: get(data, 'bountyOrder.payments.method'),
    transactionPromoCode: get(data, 'bountyOrder.payments.couponCode', ''),
    transactionQuantity: get(data, 'bountyOrder.items', []).length,
    transactionProducts: JSON.stringify(
      get(data, 'bountyOrder.items', []).map(item => ({
        id: item.styleId,
        price: get(item, 'payments.amount', 0) / 100,
        quantity: get(item, 'quantity')
      }))
    ),
    transactionProductIds: styles.join(','),
    isFirstOrder: getCookie(cookieKeys.FIRST_TIME_CUSTOMER) === 'true' ? 1 : 0,
    orderSociomanticString: JSON.stringify(
      get(data, 'bountyOrder.items', []).map(item => ({
        identifier: item.styleId,
        amount: get(item, 'payments.amount', 0) / 100,
        currency: 'INR',
        quantity: get(item, 'quantity')
      }))
    )
  };

  Array.from(Array(5)).forEach((val, i) => {
    confirmationData[`CartProductId${i + 1}`] = get(
      data,
      `bountyOrder.items.${i}.styleId`,
      ''
    );
    confirmationData[`CartProductAmount${i + 1}`] =
      get(data, `bountyOrder.items.${i}.payments.amount`, 0) / 100;
    confirmationData[`CartProductQuantity${i + 1}`] = get(
      data,
      `bountyOrder.items.${i}.quantity`,
      ''
    );
  });

  let cartNanigansString = '';
  get(data, 'bountyOrder.items', []).forEach((item, i) => {
    cartNanigansString += `qty[${i}]=${item.quantity}&value[${i}]=${get(
      item,
      'payments.amount',
      0
    ) / 100}&sku[${i}]=${item.skuId}&`;
  });

  confirmationData.orderNanigansString = cartNanigansString.slice(0, -1);

  styles.forEach((style, index) => {
    confirmationData[`transactionItem${index}`] = style;
  });

  window.dataLayer && window.dataLayer.push(confirmationData);
};

const getDataLayerAttributes = page => {
  const traffic = get(window, '_checkout_.__myx_traffic__', {});
  let source, channel, medium, campaign, maSessionParsed;

  // initializing values with traffic data
  if (includes(window.location.search, 'utm_source')) {
    source = 'direct';
  } else {
    source = traffic.source;
  }
  channel = traffic.channel;
  medium = traffic.medium;
  campaign = traffic.campaign;

  let maSession =
    page === 'confirmation' &&
    getCookie(cookieKeys.DATALAYER_MA_SESSION, false);
  maSession = maSession || getCookie(cookieKeys.MA_SESSION, false);
  if (maSession) {
    try {
      maSessionParsed = JSON.parse(maSession);
      source = maSessionParsed.utm_source;
      channel = maSessionParsed.utm_channel;
      medium = maSessionParsed.utm_medium;
      campaign = maSessionParsed.utm_campaign;
    } catch (e) {}
  }

  return {
    pageName: page || traffic.pageName,
    octaneUserHash: traffic.octaneUserHash,
    source,
    channel,
    medium,
    campaign
  };
};

export const pushDataLayerObjectForGTM = (data, page) => {
  const profile = getProfileDetails();
  const deviceData = get(window, '_checkout_.__myx_deviceData__', {});

  const {
    pageName,
    source,
    medium,
    channel,
    campaign
  } = getDataLayerAttributes(page);

  window.dataLayer &&
    window.dataLayer.push({
      pageName: pageName || 'newcart',
      utmCampaign: campaign,
      campaign: campaign,
      medium: medium,
      source: source,
      channel: channel,
      userEmail: profile.uidx,
      userHashId: profile.userHashId,
      isLoggedIn: profile.uidx ? '1' : '0',
      isBuyer: get(data, 'userDetails.isFirstTimeCustomer') ? '0' : '1',
      deviceName: deviceData.deviceName,
      deviceType: deviceData.deviceType
    });
};
