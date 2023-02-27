import { currencyValue } from './Helper';
import {
  OrderTotalFields,
  ExtraTotalPayableFields
} from './priceBreakupFields';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const getDisplayName = (options = {}) => {
  const priceDetailsMap = {
    mrp: 'Total MRP',
    discount: 'Discount on MRP',
    bag: 'Value Shipping',
    coupon: 'Coupon Discount',
    shipping: 'Convenience Fee',
    giftwrap: 'Gift Wrap Charges',
    giftcard: 'Myntra Credit used',
    loyaltypoints: 'MynCash used',
    tax: 'Tax',
    orderTotal: 'Total Amount',
    bank: 'Bank Discount',
    total: 'Total Amount Payable',
    coverfee: 'Early Access Fee',
    trynbuy: 'Try & Buy Fee',
    donation: 'Social Work Donation',
    effectiveExchangeItemPrice: 'Exchange credit',
    refundOrderTotal: 'Total Refund',
    refundTotal: 'Total Amount Refundable',
    orderTotalBeforeCredits: 'Order Total',
    ...(getKVPairValue('PRICE_DETAILS_TEXT').fields || {})
  };

  switch (options.shippingMethod) {
    case 'EXPRESS':
      priceDetailsMap.shipping = `Next Day ${priceDetailsMap.shipping}`;
      break;
    case 'SDD':
      priceDetailsMap.shipping = `Same Day ${priceDetailsMap.shipping}`;
      break;
    default:
  }
  return priceDetailsMap;
};

const indexOfName = (array, name) => {
  return array.map(obj => obj.name).indexOf(name);
};

const formatData = (data, fields, options = {}, props = {}) => {
  data = data || [];
  const priorityCheckoutConfig = getKVPairValue('PRIORITY_CHECKOUT');

  return data
    .filter(priceInfo => {
      const index = indexOfName(fields, priceInfo.name);
      const fieldExists = index !== -1;
      let value = fieldExists && priceInfo[fields[index].accessKey || 'value'];
      value = value ? currencyValue(value) : '0';
      const valueExists = value !== '0';

      // Creating exception for coverfee & trynbuy to allow '0'
      if (
        priceInfo.name === 'coverfee' ||
        (options.tryAndBuyOpted && priceInfo.name === 'trynbuy')
      ) {
        return fieldExists;
      }

      return fieldExists && valueExists;
    })
    .map(priceInfo => {
      const index = indexOfName(fields, priceInfo.name);
      const field = fields[index];
      const priceDetailArgs = {
        name: getDisplayName(options)[priceInfo.name],
        value: priceInfo[field.accessKey || 'value'],
        type: field.type,
        show: !field.hide,
        key: index,
        field: priceInfo.name
      };

      // Creating exception for coverfee to show striked amount when coverfee is enabled
      if (priceInfo.name === 'coverfee' && priceInfo.value === 0) {
        priceDetailArgs.displayValue = priorityCheckoutConfig.charges;
        priceDetailArgs.type = 'freeCoverFee';
      } else if (
        options.tryAndBuyOpted &&
        priceInfo.name === 'trynbuy' &&
        priceInfo.value === 0
      ) {
        priceDetailArgs.displayValue = getKVPairValue('TNB_PRICE');
        priceDetailArgs.type = 'freeTryAndBuyFee';
      }

      return { ...priceDetailArgs, ...props[priceInfo.name] };
    });
};

//sort is required to maintain order of fields in price break up
const sortData = data => {
  data = data || [];
  return data.sort((a, b) => a.key - b.key);
};

const findTotal = (orderTotal, data = [], fields) => {
  let total = orderTotal;
  data.forEach(obj => {
    ExtraTotalPayableFields.indexOf(fields[obj.key].name) !== -1 &&
      (total =
        total +
        (obj.type.toLowerCase().includes('discount') ? -obj.value : obj.value));
  });
  return total;
};

const findOrderTotal = (mrp = 0, data = [], fields) => {
  let orderTotal = mrp;
  data.forEach(obj => {
    OrderTotalFields.indexOf(fields[obj.key].name) !== -1 &&
      (orderTotal =
        orderTotal +
        (obj.type.toLowerCase().includes('discount') ? -obj.value : obj.value));
  });
  return orderTotal;
};

const formatPrice = data => {
  data = data || [];
  data.forEach(
    priceInfo =>
      (priceInfo.displayValue =
        priceInfo.displayValue || currencyValue(priceInfo.value))
  );
  return data;
};

const setFreeCharges = (data, options = {}) => {
  if (options.freeEarlyAccess) {
    const fieldExists = data.find(charge => charge.name === 'coverfee');

    if (!fieldExists) {
      data.push({ name: 'coverfee', value: 0 });
    }
  }

  if (options.tryAndBuyOpted) {
    const fieldExists = data.find(charge => charge.name === 'trynbuy');

    if (!fieldExists) {
      data.push({ name: 'trynbuy', value: 0 });
    }
  }

  return data;
};

const showTotalPayable = (data = [], fields) => {
  return (
    data
      .map(obj => obj.key)
      .filter(key => ExtraTotalPayableFields.indexOf(fields[key].name) !== -1)
      .length !== 0
  );
};

let transformPriceDetails = (
  data,
  fields,
  options = {},
  props = {},
  isItemsSelected = true
) => {
  if (!data) {
    return [];
  }
  const displayName = getDisplayName(options);
  const mrp = data.mrp;
  const mrpData = {
    name: displayName['mrp'],
    value: mrp,
    type: 'normal',
    show: true,
    key: indexOfName(fields, 'mrp'),
    field: 'mrp'
  };

  data.charges.data = setFreeCharges(data.charges.data, options);

  const discountsData = formatData(data.discounts.data, fields, options, props);
  const chargesData = formatData(data.charges.data, fields, options, props);
  const instrumentsData = formatData(
    data.instruments.data,
    fields,
    options,
    props
  );

  let finalData = [...discountsData, ...chargesData, ...instrumentsData];
  const orderTotalBeforeCredits = [];

  if (data.effectiveExchangeItemPrice) {
    finalData.push({
      name: displayName['effectiveExchangeItemPrice'],
      value: data.effectiveExchangeItemPrice,
      type: 'instrumentDiscount',
      show: true,
      key: indexOfName(fields, 'effectiveExchangeItemPrice'),
      field: 'effectiveExchangeItemPrice'
    });

    orderTotalBeforeCredits.push({
      name: displayName['orderTotalBeforeCredits'],
      value: 0,
      displayValue: currencyValue(
        findOrderTotal(mrp, [...discountsData], fields)
      ),
      type: 'normal',
      show: true,
      key: indexOfName(fields, 'orderTotalBeforeCredits'),
      field: 'orderTotalBeforeCredits'
    });
  }

  const orderTotal = findOrderTotal(mrp, finalData, fields);
  const orderTotalData = {
    name:
      orderTotal < 0
        ? displayName['refundOrderTotal']
        : displayName['orderTotal'],
    value: orderTotal,
    type: 'total',
    show: true,
    key: indexOfName(fields, 'orderTotal'),
    field: 'orderTotal'
  };

  finalData = [
    mrpData,
    ...orderTotalBeforeCredits,
    ...finalData,
    orderTotalData
  ];

  if (showTotalPayable(finalData, fields)) {
    const total = findTotal(orderTotal, finalData, fields);

    finalData.push({
      name: total < 0 ? displayName['refundTotal'] : displayName['total'],
      value: total,
      type: 'total',
      show: true,
      key: indexOfName(fields, 'total'),
      field: 'total'
    });
  }

  finalData = formatPrice(finalData);
  if (isItemsSelected) {
    fields.forEach((field, index) => {
      if (
        field.default &&
        indexOfName(finalData, displayName[field.name]) === -1
      ) {
        finalData.push({
          ...field.default,
          ...{
            name: displayName[field.name],
            show:
              options && options.hasOwnProperty(field.name)
                ? options[field.name].show
                : true,
            key: index,
            field: field.name
          },
          ...(props[field.name] || {})
        });
      }
    });
  }
  return sortData(finalData);
};

let getTotal = (data, fields) => {
  const {
    mrp,
    discounts,
    charges,
    instruments,
    effectiveExchangeItemPrice
  } = data;
  let total = mrp;
  discounts.data.forEach(
    obj => indexOfName(fields, obj.name) !== -1 && (total = total - obj.value)
  );
  charges.data.forEach(
    obj => indexOfName(fields, obj.name) !== -1 && (total = total + obj.value)
  );
  instruments.data.forEach(
    obj => indexOfName(fields, obj.name) !== -1 && (total = total - obj.value)
  );
  total -= effectiveExchangeItemPrice || 0;
  return total;
};

const getConfirmationTotalSavings = (discount = {}) => {
  const keys = Object.keys(discount);
  let savedAmt = 0;
  keys.forEach(key => {
    savedAmt += parseInt(discount[key], 10) / 100;
  });

  savedAmt = isNaN(savedAmt) || savedAmt <= 0 ? 0 : savedAmt;
  return savedAmt;
};

export {
  transformPriceDetails,
  getTotal,
  getDisplayName,
  getConfirmationTotalSavings
};
