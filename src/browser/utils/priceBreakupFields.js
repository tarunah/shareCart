import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getShowCreditConfig } from 'commonBrowserUtils/CartHelper';
import { isGiftcardContext } from 'commonUtils/helper';

let getCartFields = () => {
  const { showGC: showUsedGC, showLP: showUsedLP } = getShowCreditConfig();

  let cartFields = [
    { name: 'mrp', type: 'normal' },
    {
      name: 'discount',
      type: 'discount',
      accessKey: 'value'
    },
    { name: 'bag', type: 'discount' },
    {
      name: 'tax',
      type: 'tax'
    },
    {
      name: 'coupon',
      type: 'couponDiscount',
      accessKey: 'value',
      default: {
        displayText: 'Apply Coupon',
        type: 'action'
      }
    },
    { name: 'orderTotalBeforeCredits', type: 'normal' },
    { name: 'giftwrap', type: 'normal' },
    { name: 'coverfee', type: 'normal' },
    { name: 'trynbuy', type: 'normal' },
    { name: 'donation', type: 'normal' },
    {
      name: 'shipping',
      type: 'shipping',
      default: {
        displayText: 'FREE',
        type: 'shipping'
      }
    },
    { name: 'effectiveExchangeItemPrice', type: 'instrumentDiscount' }
  ];

  showUsedGC &&
    cartFields.push({ name: 'giftcard', type: 'instrumentDiscount' });
  showUsedLP &&
    cartFields.push({ name: 'loyaltypoints', type: 'instrumentDiscount' });
  cartFields.push({ name: 'orderTotal', type: 'total' });

  return cartFields;
};

const getAddressFields = () => {
  const { showGC: showUsedGC, showLP: showUsedLP } = getShowCreditConfig();
  const showFreeDeliveryPrice = isFeatureEnabled('FREE_DELIVERY_STRIKE');

  let addressFields = [
    { name: 'mrp', type: 'normal' },
    {
      name: 'discount',
      type: 'discount',
      accessKey: 'value'
    },
    {
      name: 'tax',
      type: 'tax'
    },
    {
      name: 'coupon',
      type: 'discount',
      accessKey: 'value'
    },
    { name: 'orderTotalBeforeCredits', type: 'normal' },
    { name: 'giftwrap', type: 'normal' },
    { name: 'coverfee', type: 'normal' },
    { name: 'trynbuy', type: 'normal' },
    { name: 'donation', type: 'normal' },
    { name: 'bag', type: 'discount' },
    {
      name: 'shipping',
      type: 'shipping',
      default: {
        displayText: 'FREE',
        type: 'shipping'
      }
    },
    { name: 'effectiveExchangeItemPrice', type: 'instrumentDiscount' }
  ];

  showUsedGC &&
    addressFields.push({ name: 'giftcard', type: 'instrumentDiscount' });
  showUsedLP &&
    addressFields.push({ name: 'loyaltypoints', type: 'instrumentDiscount' });
  addressFields.push({ name: 'orderTotal', type: 'total' });

  return addressFields;
};

const getPaymentFields = () => {
  const showFreeDeliveryPrice = isFeatureEnabled('FREE_DELIVERY_STRIKE');
  return [
    { name: 'mrp', type: 'normal' },
    {
      name: 'discount',
      type: 'discount',
      accessKey: 'value'
    },
    {
      name: 'tax',
      type: 'tax'
    },
    {
      name: 'coupon',
      type: 'discount',
      accessKey: 'value'
    },
    { name: 'orderTotalBeforeCredits', type: 'normal' },
    { name: 'giftwrap', type: 'normal' },
    { name: 'coverfee', type: 'normal' },
    { name: 'donation', type: 'normal' },
    { name: 'trynbuy', type: 'normal' },
    { name: 'bag', type: 'discount' },
    {
      name: 'shipping',
      type: 'shipping',
      default: !isGiftcardContext()
        ? {
            displayText: 'FREE',
            type: 'shipping'
          }
        : null
    },
    { name: 'giftcard', type: 'instrumentDiscount' },
    { name: 'loyaltypoints', type: 'instrumentDiscount' },
    { name: 'effectiveExchangeItemPrice', type: 'instrumentDiscount' },
    { name: 'orderTotal', type: 'total' },
    { name: 'bank', type: 'bankDiscount' },
    { name: 'total', type: 'total' }
  ];
};

const OrderTotalFields = [
  'mrp',
  'discount',
  'bag',
  'coupon',
  'shipping',
  'giftwrap',
  'coverfee',
  'trynbuy',
  'giftcard',
  'loyaltypoints',
  'tax',
  'effectiveExchangeItemPrice',
  'orderTotalBeforeCredits',
  'donation'
];

const ExtraTotalPayableFields = ['bank'];

export {
  getCartFields,
  getAddressFields,
  getPaymentFields,
  OrderTotalFields,
  ExtraTotalPayableFields
};
