import {
  productsCount,
  freeShipLostConditions,
  checkDisabledItem,
  getItemSavings,
  getchargesInfo,
  isFreeShippingLost
} from './';

import {
  ProductsList,
  orderLevelCharges,
  unavailableSizes,
  freeShipLostData
} from 'testUtils/cartMockData';

describe('freeShipLostUtil', () => {
  it('productsCount should return number of products which the not free gift', () => {
    const count = productsCount(ProductsList.itemsList);
    expect(count).toEqual(2);
  });

  it('calculateItemSaving should return savings of indiviadual product', () => {
    const savings = getItemSavings(ProductsList.itemsList[0].price);
    expect(savings).toEqual(100);
  });

  it('getchargesInfo should return charge information at order level', () => {
    const { shipChargeApplicable, giftWrapCharges } = getchargesInfo(
      orderLevelCharges
    );
    expect(!shipChargeApplicable).toEqual(true);
    expect(giftWrapCharges).toEqual(0);
  });

  it('checkDisabledItem should check if item is OOS, size not available,quantity not available, or virtualbundle conflict', () => {
    const {
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      selectedSeller,
      selectedForCheckout
    } = ProductsList.itemsList[0];
    const isItemDisabled = checkDisabledItem(
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      selectedSeller,
      selectedForCheckout
    );
    expect(isItemDisabled).toEqual(false);
  });

  it('isFreeShippingLost should return whether the user will lose free shipping when removing an item or not', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {
      isApp: true,
      isAndroid: true
    };
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantA';
    const {
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      selectedSeller,
      selectedForCheckout
    } = ProductsList.itemsList[0];
    const data = {
      ...freeShipLostData,
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      selectedSeller,
      products: ProductsList.itemsList,
      selectedForCheckout
    };
    const freeShippingLost = isFreeShippingLost(data);
    expect(freeShippingLost).toEqual(true);
  });

  it('isFreeShippingLost should return whether the user will lose free shipping when removing an item or not', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {
      isApp: true,
      isAndroid: true
    };
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantB';
    const {
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    } = ProductsList.itemsList[0];
    const data = {
      ...freeShipLostData,
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      products: ProductsList.itemsList
    };
    const freeShippingLost = isFreeShippingLost(data);
    expect(freeShippingLost).toEqual(false);
  });

  it('isFreeShippingLost should not return whether the user will lose free shipping when removing an item or not', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {
      isApp: true,
      isAndroid: false
    };
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantA';
    const {
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    } = ProductsList.itemsList[0];
    const data = {
      ...freeShipLostData,
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      products: ProductsList.itemsList
    };
    const freeShippingLost = isFreeShippingLost(data);
    expect(freeShippingLost).toEqual(false);
  });

  it('isFreeShippingLost should return whether the user will lose free shipping when removing an item or not', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {
      isApp: true,
      isAndroid: false
    };
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantB';
    const {
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    } = ProductsList.itemsList[0];
    const data = {
      ...freeShipLostData,
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      products: ProductsList.itemsList
    };
    const freeShippingLost = isFreeShippingLost(data);
    expect(freeShippingLost).toEqual(false);
  });

  it('isFreeShippingLost should return whether the user will lose free shipping when removing an item or not', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {
      isApp: true,
      isAndroid: true
    };
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantB';
    const {
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    } = ProductsList.itemsList[1];
    const data = {
      ...freeShipLostData,
      price,
      sizes,
      skuId,
      virtualBundleInfo,
      quantity,
      products: ProductsList.itemsList
    };
    const freeShippingLost = isFreeShippingLost(data);
    expect(freeShippingLost).toEqual(false);
  });

  it('checkDisabledItem should check if item is OOS, size not available,quantity not available, or virtualbundle conflict', () => {
    unavailableSizes[0].available = true;
    unavailableSizes[0].inventory = 1;
    ProductsList.itemsList[0].sizes = unavailableSizes;
    const {
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    } = ProductsList.itemsList[0];
    const isItemDisabled = checkDisabledItem(
      sizes,
      skuId,
      virtualBundleInfo,
      quantity
    );
    expect(isItemDisabled).toEqual(true);
  });

  it('freeShipLostConditions should return whether the conditions are met for FreeShipLostFeature', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {};
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantB';
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      isFirstTimeCustomer: true
    };
    const freeShipLostConditionsMet = freeShipLostConditions(
      userDetails,
      ProductsList.itemsList
    );
    expect(freeShipLostConditionsMet).toEqual(false);
  });

  it('freeShipLostConditions should return whether the conditions are met for FreeShipLostFeature', () => {
    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_deviceData__ = {};
    window._checkout_.__myx_ab__['cart.fsexp'] = 'VariantA';
    const freeShipLostConditionsMet = freeShipLostConditions(
      freeShipLostData.userDetails,
      ProductsList.itemsList
    );
    expect(freeShipLostConditionsMet).toEqual(true);
  });
});
