import React from 'react';

// Utilities
import { getAbtest } from 'commonUtils/abtestManager';
import { getAvailability } from 'commonBrowserUtils/CartHelper';
import get from 'lodash/get';
import { isAndroidApp, isReturnAbuser } from 'commonBrowserUtils/Helper';

//return products count which are not gift items(as in free)
export const productsCount = products => {
  let count = 0;
  products &&
    products.forEach(product => {
      product.flags && !product.flags.freeItem && (count += 1);
    });
  return count;
};

//conditions match only if free ship experiment is not enabled,
//not a return abuser , is mobile and product count is not equal to 1
export const freeShipLostConditions = (
  { returnAbuser, isFirstTimeCustomer = false },
  products
) => {
  const freeShipExp = getAbtest('FREE_SHIPPING') === 'VariantB';
  const _isReturnAbuser = isReturnAbuser(returnAbuser);
  return (
    !_isReturnAbuser &&
    !isFirstTimeCustomer &&
    !freeShipExp &&
    productsCount(products) != 1
  );
};

// return selected size by the user
export const getUserSelectedSize = (sizeData = [], sku) => {
  return sizeData.find(e => e.skuId === sku) || {};
};

// check whether item is OOS, size not available,
// quantity not available, or virtualbundle conflict
export const checkDisabledItem = (
  sizes,
  skuId,
  virtualBundleInfo,
  quantity,
  selectedSeller,
  selectedForCheckout
) => {
  const { virtualBundleConflict } = virtualBundleInfo || {};
  const { oos, sizeAvailable, quantityAvailable } = getAvailability({
    sizes,
    selectedSize: getUserSelectedSize(sizes, skuId),
    quantity,
    selectedSeller
  });
  return (
    oos ||
    !sizeAvailable ||
    !quantityAvailable ||
    virtualBundleConflict ||
    !selectedForCheckout
  );
};

//calculate the savings at item level i.e for specific item only
export const getItemSavings = price => {
  let itemSavings = 0;
  get(price, 'discounts.data', []).forEach(discount => {
    itemSavings += discount.value;
  });
  return itemSavings;
};

// get order Level Charges info
export const getchargesInfo = charges => {
  const { data = [] } = charges || {};
  const {
    shipping: shipChargeApplicable = 0,
    giftwrap: giftWrapCharges = 0
  } = data.reduce((acc, charge) => {
    acc[charge.name] = charge.value;
    return acc;
  });
  return { shipChargeApplicable, giftWrapCharges };
};

//checks if the item to be removed brings the total payable amount
//below the free shipping threshold(shippingChargeLimit)
//returns true if freeShipping was available and is now lost due to removal of item
export const isFreeShippingLost = ({
  userDetails,
  products,
  price: { subTotal } = {},
  subTotal: totalPayable,
  shippingData: { shippingApplicableCharge, shippingChargeLimit } = {},
  charges,
  sizes,
  skuId,
  virtualBundleInfo,
  quantity,
  selectedSeller,
  selectedForCheckout,
  isExchangeCart
}) => {
  if (!isAndroidApp() || isExchangeCart) {
    return false;
  }

  const totalItemPrice = Math.round(subTotal);
  totalPayable = Math.round(totalPayable);
  shippingApplicableCharge = Math.round(shippingApplicableCharge);
  const { shipChargeApplicable, giftWrapCharges } = getchargesInfo(charges);
  const isItemDisabled = checkDisabledItem(
    sizes,
    skuId,
    virtualBundleInfo,
    quantity,
    selectedSeller,
    selectedForCheckout
  );
  const freeShipLost =
    !shipChargeApplicable &&
    shippingApplicableCharge > 0 &&
    totalPayable - totalItemPrice - giftWrapCharges < shippingChargeLimit;
  return (
    freeShipLostConditions(userDetails, products) &&
    !isItemDisabled &&
    freeShipLost
  );
};

//returns the data required for all the above functions
export const getFreeShipLostData = ({
  shippingData,
  userDetails,
  products,
  price: { subTotal, charges } = {}
}) => {
  return {
    subTotal,
    shippingData,
    userDetails,
    products,
    charges
  };
};
