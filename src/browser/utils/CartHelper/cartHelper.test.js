import {
  getMaEventData,
  getAvailability,
  getOOSItems,
  getProductsValidity,
  handleCartPlaceOrder,
  getUrgencyMessage,
  getEarlyBirdMessage,
  getPricingInfo,
  getShippingSavings,
  getShippingTipUIData,
  getTaxBreakup,
  isValidCart,
  isCartCodServiceable,
  getPriceChangeInfo,
  getSKUPrice,
  getSizesList,
  isPriceConstantAcrossSelectedSellerAndBBW,
  getMinPriceAndSellerCount,
  getDisplaySeller
} from '.';
import { currencyValue } from 'commonBrowserUtils/Helper';
import sinon from 'sinon';

import {
  ProductsWithOffer,
  ProductsWithOfferOOS,
  ProductsWithPrelaunch,
  noFreeShippingData,
  freeShippingData,
  cartMockData,
  priceChangedProducts,
  productListWithOffer
} from 'testUtils/cartMockData';

describe('Cart Helper', () => {
  let productDeliveryInfo = [];

  beforeEach(() => {
    window.SHELL = {
      redirectTo: sinon.spy()
    };
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };

    productDeliveryInfo = [...cartMockData.serviceability.productDeliveryInfo];
  });

  it('getMaEventData - should return MA event data for cart', () => {
    const result = getMaEventData(
      ProductsWithOffer.products,
      ProductsWithOffer.offers
    );
    expect(result).toEqual([
      {
        entity_id: 2364443,
        entity_name: 'Nike Men Blue Printed AS M NK BRT SS DRY GFX T-shirt',
        entity_optional_attributes: {
          inv_count: 10198,
          price: 8380,
          qty: 4,
          brand: 'Nike',
          disc: 3368.759912109375,
          mrp: 8380,
          name: 'Nike Men Blue Printed AS M NK BRT SS DRY GFX T-shirt',
          skuId: 15197759
        },
        entity_type: 'product'
      }
    ]);
  });

  it('getAvailability - size available', () => {
    const product = ProductsWithOffer.products[0];
    const data = {
      sizes: product.sizes,
      selectedSize: product.sizes[0],
      quantity: product.quantity,
      selectedSeller: product.selectedSeller
    };
    const result = getAvailability(data);
    expect(result).toEqual({
      oos: false,
      quantityAvailable: true,
      sizeAvailable: true
    });
  });

  it('getAvailability - size not available', () => {
    const product = ProductsWithOffer.products[0];
    const data = {
      sizes: product.sizes,
      selectedSize: product.sizes[1],
      quantity: product.quantity,
      selectedSeller: product.selectedSeller
    };
    const result = getAvailability(data);
    expect(result).toEqual({
      oos: false,
      quantityAvailable: true,
      sizeAvailable: false
    });
  });

  it('should validate cart', () => {
    expect(isValidCart(cartMockData)).toEqual(true);

    cartMockData.conflict = { state: 'CONFLICTED' };
    expect(isValidCart(cartMockData)).toEqual(false);

    cartMockData.conflict = { state: 'NOT_CONFLICTED' };
    cartMockData.flags.checkoutReady = { value: false };
    expect(isValidCart(cartMockData)).toEqual(false);

    cartMockData.flags.checkoutReady = { value: true };
    cartMockData.price.mrp = 300000;
    expect(isValidCart(cartMockData)).toEqual(false);

    cartMockData.price.mrp = 6775;
    cartMockData.products = [];
    expect(isValidCart(cartMockData)).toEqual(false);
  });

  it('isCartCodServiceable - check if cart is serviceable by cod - empty cart data', () => {
    const result = isCartCodServiceable();
    expect(result).toEqual(false);
  });

  it('isCartCodServiceable - check if cart is serviceable by cod - invalid cart data', () => {
    let result = isCartCodServiceable(null);
    expect(result).toEqual(false);
    result = isCartCodServiceable(undefined);
    expect(result).toEqual(false);
  });

  it('isCartCodServiceable - check if cart is serviceable by cod - Normal shipping', () => {
    const result = isCartCodServiceable(cartMockData);
    expect(result).toEqual(true);
  });

  it('isCartCodServiceable - check if cart is serviceable by cod - shipping data invalid', () => {
    let result = isCartCodServiceable({
      shippingData: {
        method: 'test'
      },
      serviceability: {}
    });
    expect(result).toEqual(false);
    result = isCartCodServiceable({
      serviceability: {}
    });
    expect(result).toEqual(false);
  });

  it('isCartCodServiceable - check if cart is serviceable by cod - serviceability invalid', () => {
    let result = isCartCodServiceable({
      shippingData: {
        method: 'NORMAL'
      },
      serviceability: {}
    });
    expect(result).toEqual(false);
    result = isCartCodServiceable({
      shippingData: {
        method: 'NORMAL'
      }
    });
    expect(result).toEqual(false);
  });

  it('getOOSItems - should return out of stock items if selectedForCheckout', () => {
    const result = getOOSItems(ProductsWithOfferOOS.products);
    expect(result[0].id).toEqual(2364443);
  });

  it('getOOSItems - should return out of stock items', () => {
    const result = getOOSItems(ProductsWithOffer.products);
    expect(result).toEqual([]);
  });

  it('getOOSItems - should not return out of stock items if selectedForCheckout is false', () => {
    const products = [
      { ...ProductsWithOfferOOS.products[0], selectedForCheckout: false }
    ];
    const result = getOOSItems(products);
    expect(result).toEqual([]);
  });

  it('getProductsValidity - should return { valid: true, reason: "" } if all the items are available and selectedForCheckout is true', () => {
    const result = getProductsValidity(ProductsWithOffer.products, false);
    expect(result).toEqual({ valid: true, reason: '' });
  });

  it('getProductsValidity - should return { valid: false, reason: "prelaunch" } if atleast one item is prelaunch and selectedForCheckout is true but checkout is disabled', () => {
    const result = getProductsValidity(ProductsWithPrelaunch.products, true);
    expect(result).toEqual({ valid: false, reason: 'prelaunch' });
  });

  it('getProductsValidity - should return { valid: true, reason: "" } even if any one item is prelaunch and selectedForCheckout is true but checkout is not disabled', () => {
    const result = getProductsValidity(ProductsWithPrelaunch.products, false);
    expect(result).toEqual({ valid: true, reason: '' });
  });

  it('getProductsValidity - should return { valid: false, reason: "oos" } if atleast one item is oos and selectedForCheckout is true', () => {
    const result = getProductsValidity(ProductsWithOfferOOS.products, true);
    expect(result).toEqual({ valid: false, reason: 'oos' });
  });

  it('getProductsValidity - should return { valid: true, reason: "" } if atleast one item is oos and its not selected for checkout', () => {
    const result = getProductsValidity(
      [{ ...ProductsWithOfferOOS.products[0], selectedForCheckout: false }],
      true
    );
    expect(result).toEqual({ valid: true, reason: '' });
  });

  it('handleCartPlaceOrder - cart not available', () => {
    const testFn1 = sinon.spy();
    const data = {
      products: ProductsWithOfferOOS.products,
      total: 250000,
      virtualBundleConflict: false,
      disabled: false,
      displayCartModal: testFn1
    };
    const result = handleCartPlaceOrder(data);
    expect(testFn1).toHaveProperty('callCount', 1);
    expect(testFn1.getCall(0).args[0].header).toEqual(
      'Move Out Of Stock Items'
    );
  });

  it('handleCartPlaceOrder - total > 200000', () => {
    const alert = sinon.spy();
    window.SHELL = { alert };
    const data = {
      products: [],
      total: 250000,
      virtualBundleConflict: false,
      disabled: false
    };
    handleCartPlaceOrder(data);
    expect(alert.getCall(0).args[1].message).toEqual(
      "You've selected more than the allowed limit of Rs. 2,00,000 items, please remove some items to place order."
    );
  });

  it('handleCartPlaceOrder - if selected product count > 50', () => {
    const alert = sinon.spy();
    window.SHELL = { alert };
    const data = {
      products: [],
      selectedProductCount: 51,
      total: 120000,
      virtualBundleConflict: false,
      disabled: false
    };
    handleCartPlaceOrder(data);
    expect(alert.getCall(0).args[1].message).toEqual(
      "You've selected more than the allowed limit of 50 items, please remove some items to place order."
    );
  });

  it('handleCartPlaceOrder - if no product is selected', () => {
    const alert = sinon.spy();
    const updateDynamicStyles = sinon.spy();
    window.SHELL = { alert };
    const data = {
      products: [],
      selectedProductCount: 0,
      total: 0,
      virtualBundleConflict: false,
      disabled: false,
      updateDynamicStyles
    };
    handleCartPlaceOrder(data);
    expect(alert.getCall(0).args[1].message).toEqual(
      'Select at least one item in bag to place order.'
    );
    expect(updateDynamicStyles.calledOnce).toBe(true);
  });

  it('handleCartPlaceOrder - virtualBundleConflict', () => {
    const testFn1 = sinon.spy();
    const data = {
      products: [],
      total: 20000,
      virtualBundleConflict: true,
      disabled: false,
      displayCartModal: testFn1
    };
    const result = handleCartPlaceOrder(data);
    expect(testFn1).toHaveProperty('callCount', 1);
    expect(testFn1.getCall(0).args[0].header).toEqual(
      'Item(s) repeated in your bag'
    );
  });

  it('handleCartPlaceOrder - disabled', () => {
    const testFn1 = sinon.spy();
    const data = {
      products: [],
      total: 20000,
      virtualBundleConflict: false,
      disabled: true,
      displayCartModal: testFn1
    };
    const result = handleCartPlaceOrder(data);
    expect(testFn1).toHaveProperty('callCount', 1);
  });

  it('handleCartPlaceOrder - hasExpressCheckoutAB', () => {
    const testFn1 = sinon.spy();
    const data = {
      products: [],
      total: 20000,
      virtualBundleConflict: false,
      hasExpressCheckoutAB: true,
      toggleExpressCheckoutHalfCard: testFn1
    };
    const result = handleCartPlaceOrder(data);
    expect(testFn1).toHaveProperty('callCount', 1);
  });

  it('handleCartPlaceOrder - When NO ExpressCheckoutAB, it should be redirected to Address', () => {
    const testFn1 = sinon.spy();
    const data = {
      products: [],
      total: 20000,
      virtualBundleConflict: false,
      hasExpressCheckoutAB: false,
      toggleExpressCheckoutHalfCard: testFn1
    };
    const result = handleCartPlaceOrder(data);
    expect(window.SHELL.redirectTo).toHaveProperty('callCount', 1);
  });

  it('handleCartPlaceOrder - Should call style violation', () => {
    window._checkout_ = {
      __myx_features__: {
        'cart.styleCapping': true
      }
    };
    document.cookie = 'ilgim=true';

    const testFn1 = sinon.spy();
    const testFn2 = sinon.spy();
    const data = {
      products: [],
      total: 20000,
      virtualBundleConflict: false,
      hasExpressCheckoutAB: false,
      toggleExpressCheckoutHalfCard: testFn1,
      handleCartAction: testFn2
    };
    handleCartPlaceOrder(data);
    expect(testFn2).toHaveProperty('callCount', 1);
  });

  it('getUrgencyMessage - returns urgency message', () => {
    window._checkout_ = {
      __myx_ab__: {
        'urgency.ab': '1'
      }
    };
    let data = {
      urgencyInfo: {
        addToCartCount: 27,
        quantitySold: 0
      }
    };
    let result = getUrgencyMessage(data);
    expect(result).toEqual('In 27+ bags right now');

    data = {
      urgencyInfo: {
        addToCartCount: 27,
        quantitySold: 5
      }
    };
    result = getUrgencyMessage(data);
    expect(result).toEqual('5+ Shoppers have bought this');
  });

  it('getEarlyBirdMessage - returns early bird message', () => {
    window._checkout_ = {
      __myx_ab__: {
        'earlybird.ab': '1'
      }
    };
    const data = {
      discountInfo: {
        type: 512
      },
      inventory: 10
    };
    const result = getEarlyBirdMessage(data);
    expect(result).toEqual('10 left at this discount');
  });

  it('getPricingInfo - returns pricing info', () => {
    const data = {
      price: {
        mrp: 1000,
        total: 1000,
        discounts: {
          data: [
            {
              name: 'coupon',
              value: 20
            }
          ]
        },
        charges: {
          data: [
            {
              name: 'shipping',
              value: 10
            }
          ]
        }
      }
    };

    const { discountInfo, chargesInfo, mrp, total } = getPricingInfo(data);

    expect(discountInfo.coupon).toEqual(20);
    expect(discountInfo.totalDiscount).toEqual(20);
    expect(chargesInfo.shipping).toEqual(10);
    expect(mrp).toEqual(1000);
    expect(total).toEqual(1000);
  });

  it('getShippingSavings should return correct shipping savings with free shipping', () => {
    const chargesData = cartMockData.price.charges.data;
    const shippingSavings = getShippingSavings(chargesData, freeShippingData);
    expect(shippingSavings).toBe(100);
  });

  it('getShippingTipUIData should return correct UI data when no free shipping', () => {
    const data = getShippingTipUIData(noFreeShippingData);

    expect(data).toMatchObject({
      minMore: 199,
      tipText1: 'Shop for',
      tipText2: 'convenience fee.',
      tipText3: 'on this order.',
      spriteName: 'ship-charge'
    });
  });

  it('getShippingTipUIData should return correct UI data when free shipping', () => {
    const data = getShippingTipUIData(freeShippingData);

    expect(data).toMatchObject({
      minMore: 0,
      tipText1: 'Yay!',
      tipText2: 'No convenience fee',
      tipText3: 'on this order.',
      spriteName: 'ship-free'
    });
  });

  describe('tax breakup', () => {
    let mockProducts, mockPrice;

    beforeEach(() => {
      mockPrice = {
        charges: {
          data: [
            {
              name: 'tax',
              value: 579.2
            }
          ]
        }
      };

      mockProducts = [
        {
          gender: 'Men',
          articleType: 'Flip Flops',
          articleTypeId: 127,
          brand: 'Nike',
          id: 1421326,
          name: 'Nike Men Blue Printed Chroma Flip-Flops',
          offerId: '',
          price: {
            mrp: 1395,
            total: 1395,
            subTotal: 1395,
            charges: { data: [{ name: 'tax', value: 139.5 }] }
          },
          quantity: 1
        },
        {
          gender: 'Women',
          articleType: 'Tshirts',
          articleTypeId: 90,
          brand: 'Roadster',
          id: 632366,
          name: 'Roadster Off-White & Orange Ombre-Dyed T-shirt',
          offerId: '',
          price: {
            mrp: 299,
            total: 299,
            subTotal: 299,
            charges: { data: [{ name: 'tax', value: 29.9 }] }
          },
          quantity: 1
        },
        {
          gender: 'Men',
          articleType: 'Tshirts',
          articleTypeId: 90,
          brand: 'Puma',
          id: 1532,
          name: 'Puma Men Grey Striped Henley Neck T-shirt',
          offerId: '',
          price: {
            mrp: 1200,
            total: 1000,
            subTotal: 1000,
            charges: { data: [{ name: 'tax', value: 120 }] }
          },
          quantity: 1
        },
        {
          gender: 'Men',
          articleType: 'Tshirts',
          articleTypeId: 90,
          brand: 'Puma',
          id: 1531,
          name: 'Puma Men Grey Solid Henley Neck T-shirt',
          offerId: '',
          price: {
            mrp: 1000,
            total: 1000,
            subTotal: 1000,
            charges: { data: [{ name: 'tax', value: 100 }] }
          },
          quantity: 1
        },
        {
          gender: 'Unisex',
          articleType: 'Bedsheets',
          articleTypeId: 321,
          brand: 'Cortina',
          id: 1517087,
          name:
            'Cortina Multicoloured Cotton 220 TC Fine Double Bedsheet with 2 Pillow Covers',
          offerId: '',
          price: {
            mrp: 1898,
            total: 1898,
            subTotal: 1898,
            charges: { data: [{ name: 'tax', value: 189.8 }] }
          },
          quantity: 1
        }
      ];
    });

    it('should list taxes for product in descending order of added at', () => {
      const result = getTaxBreakup(mockPrice, mockProducts);
      expect(result.totalTax).toEqual(currencyValue(579.2));
      expect(result.taxByProduct[0].name).toEqual(
        mockProducts[mockProducts.length - 1].name
      );
      expect(result.taxByProduct[1].name).toEqual(
        mockProducts[mockProducts.length - 2].name
      );
    });
  });

  // Given a list of products, it gives a json describing if the product prices have increased ('inc') or decreased ('dec')
  describe('Get Price Change Info', () => {
    it('Given a list of products, it should return an object containing only products that have price change and net diff', () => {
      const { products, netDiff } = getPriceChangeInfo(priceChangedProducts);
      expect(netDiff).toEqual(-212);
      expect(products.length).toEqual(3);
    });

    it('Given a list of products with no conflict, it should return 0 netDiff and empty products', () => {
      const { products, netDiff } = getPriceChangeInfo(cartMockData.products);
      expect(netDiff).toEqual(0);
      expect(products.length).toEqual(0);
    });
  });

  describe('getSKUPrice', () => {
    it('should return the prices of buybutton winner, if buyButtonWinner is true', () => {
      const mockProduct = productListWithOffer.productList1[0];
      const sellers = mockProduct.sizes[0].sellers;
      const selectedSellerPartnerId = 501;
      let result = getSKUPrice(sellers, selectedSellerPartnerId, true);

      expect(result).toEqual(sellers[0].price.subTotal);
    });

    it('should return userSelected seller price if buyButtonWinner is false', () => {
      const mockProduct = productListWithOffer.productList1[0];
      const sellers = mockProduct.sizes[0].sellers;
      const selectedSellerPartnerId = 501;
      let result = getSKUPrice(sellers, selectedSellerPartnerId, false);

      expect(result).toEqual(sellers[1].price.subTotal);
    });

    it('should not break the function and fallback to buyButton winner', () => {
      const mockProduct = productListWithOffer.productList1[0];
      const sellers = mockProduct.sizes[0].sellers;

      let result = getSKUPrice(sellers, undefined, false);
      expect(result).toEqual(sellers[0].price.subTotal);

      result = getSKUPrice(sellers, undefined, undefined);
      expect(result).toEqual(sellers[0].price.subTotal);

      result = getSKUPrice(sellers, null, undefined);
      expect(result).toEqual(sellers[0].price.subTotal);
    });
  });

  describe('getSizesList', () => {
    it('should return a list with userSelectedSeller price for user selected sku and buyButtonWinner price for other sku', () => {
      const mockProduct = productListWithOffer.productList1[0];
      const sizes = mockProduct.sizes;
      const selectedSellerPartnerId = 501;
      const selectedSkuId = 15197759;
      let result = getSizesList(sizes, selectedSellerPartnerId, selectedSkuId);

      expect(result[0].price).toEqual(6);
      expect(result[0].available).toEqual(true);
      expect(result[0].id).toEqual(sizes[0].skuId);

      expect(result[1].price).toEqual(680);
      expect(result[1].available).toEqual(true);
      expect(result[1].id).toEqual(sizes[1].skuId);
    });
  });

  it('should not break and return a list with buyButtonWinner price for all sku', () => {
    const mockProduct = productListWithOffer.productList1[0];
    const sizes = mockProduct.sizes;
    const selectedSkuId = 15197759;
    let result = getSizesList(sizes, null, selectedSkuId);

    expect(result[0].price).toEqual(68);
    expect(result[0].available).toEqual(true);
    expect(result[0].id).toEqual(sizes[0].skuId);

    expect(result[1].price).toEqual(680);
    expect(result[1].available).toEqual(true);
    expect(result[1].id).toEqual(sizes[1].skuId);

    result = getSizesList(sizes, undefined, selectedSkuId);

    expect(result[0].price).toEqual(68);
    expect(result[0].available).toEqual(true);
    expect(result[0].id).toEqual(sizes[0].skuId);

    expect(result[1].price).toEqual(680);
    expect(result[1].available).toEqual(true);
    expect(result[1].id).toEqual(sizes[1].skuId);
  });

  describe('isPriceConstantAcrossSelectedSellerAndBBW', () => {
    it('Should check if the price is same across user selected seller in user selected sku and buybutton winner for other sku', () => {
      let mockProduct = productListWithOffer.productList1[0];
      expect(
        isPriceConstantAcrossSelectedSellerAndBBW({ ...mockProduct })
      ).toBe(false);
      mockProduct = productListWithOffer.productList2[0];
      expect(
        isPriceConstantAcrossSelectedSellerAndBBW({ ...mockProduct })
      ).toBe(true);
    });

    it('should not break the ui and return the calculated with the available data', () => {
      let mockProduct = productListWithOffer.productList1[0];
      expect(
        isPriceConstantAcrossSelectedSellerAndBBW({
          ...mockProduct,
          selectedSeller: null
        })
      ).toBe(false);
      mockProduct = productListWithOffer.productList2[0];
      expect(
        isPriceConstantAcrossSelectedSellerAndBBW({
          ...mockProduct,
          selectedSeller: null
        })
      ).toBe(true);
      expect(
        isPriceConstantAcrossSelectedSellerAndBBW({
          ...mockProduct,
          selectedSeller: null
        })
      ).toBe(true);
    });
  });

  describe('getMinPriceAndSellerCount', () => {
    it('should return minimum price for a sku and seller count excluding BBW', () => {
      const mockProduct = productListWithOffer.productList1[0];
      const result = getMinPriceAndSellerCount(
        mockProduct.sizes[0].sellers,
        mockProduct.selectedSeller.partnerId,
        true
      );

      expect(result.minPrice).toEqual(6);
      expect(result.sellerCount).toEqual(1);
    });

    it('should return minimum price as defined for a sku if excluded sellers has the least price', () => {
      const mockProduct = productListWithOffer.productList1[0];
      mockProduct.selectedSeller.partnerId = 501;
      const result = getMinPriceAndSellerCount(
        mockProduct.sizes[0].sellers,
        mockProduct.selectedSeller.partnerId,
        false
      );

      expect(result.minPrice).toEqual(undefined);
      expect(result.sellerCount).toEqual(1);
    });

    it('should return minimum price for a sku and seller count excluding user selected seller', () => {
      const mockProduct = productListWithOffer.productList1[0];
      //changing the price and selected seller to a non BBW seller
      mockProduct.sizes[0].sellers[1].price.subTotal = 600;
      mockProduct.selectedSeller.partnerId = 501;
      const result = getMinPriceAndSellerCount(
        mockProduct.sizes[0].sellers,
        mockProduct.selectedSeller.partnerId,
        false
      );

      expect(result.minPrice).toEqual(68);
      expect(result.sellerCount).toEqual(1);
    });

    it('should not break the UI and return default objects excluding BBW, if selectedSeller is undefined', () => {
      const mockProduct = productListWithOffer.productList1[0];
      mockProduct.sizes[0].sellers[1].price.subTotal = 6;

      const result = getMinPriceAndSellerCount(
        mockProduct.sizes[0].sellers,
        undefined
      );
      expect(result.minPrice).toEqual(6);
      expect(result.sellerCount).toEqual(1);
    });

    it('should not break the UI and return default, if selectedSeller and sellers is undefined', () => {
      const result = getMinPriceAndSellerCount(undefined, undefined);
      expect(result.minPrice).toEqual(undefined);
      expect(result.sellerCount).toEqual(0);
    });
  });

  describe('getDisplaySeller', () => {
    it('should get the seller which is being selected by the user', () => {
      const { sizes } = productListWithOffer.productList1[0];
      const result = getDisplaySeller(500, sizes[0]);

      expect(result).toEqual(sizes[0].sellers[0]);
    });

    it('should return default object if inputs are not correct', () => {
      const defaultObj = {
        price: {},
        seller: {}
      };
      expect(getDisplaySeller(500, undefined)).toEqual(defaultObj);
      expect(getDisplaySeller(500, {})).toEqual(defaultObj);
      expect(getDisplaySeller(undefined, [])).toEqual(defaultObj);
    });
  });
});
