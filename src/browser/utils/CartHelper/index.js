import get from 'lodash/get';
import reverse from 'lodash/reverse';

import { getAbtest } from 'commonUtils/abtestManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { sessionStorageKeys } from 'commonUtils/constants';
import { getQueryParam, isGiftcardContext } from 'commonUtils/helper';

import CartConstants, {
  invalidItemsReason
} from 'commonBrowserUtils/CartConstants';
import AddressConstants from 'commonBrowserUtils/AddressConstants';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import {
  isSessionStorageEnabled,
  currencyValue,
  isLoggedIn,
  navigateTo,
  stampAddressAndRedirect,
  isReturnAbuser,
  isApp,
  getUidx,
  isFreeEarlyAccess,
  formatDate,
  getDateDiff
} from 'commonBrowserUtils/Helper';
import { priceChangeTypes, userActionTypes } from 'commonUtils/constants';
const { INCREASED, DECREASED } = priceChangeTypes;

import CartCountHandler from 'commonBrowserUtils/CartCountHandler';

const isValidCart = cart =>
  get(cart, 'conflict.state') !== 'CONFLICTED' &&
  !!(get(cart, 'products') || []).length &&
  get(cart, 'flags.checkoutReady.value') &&
  getTotal(get(cart, 'price'), getCartFields()) <= 200000;

const checkExchangeCart = cart => !!get(cart, 'exchangeProductDetail');

const getAppliedInstrument = (type, cartData) =>
  get(cartData, 'price.instruments.data', []).find(
    instrument => instrument.name === type && instrument.value > 0
  );

const getShowCreditConfig = () => {
  const isCartCreditEnabled = isFeatureEnabled('CART_CREDIT');
  const cartCreditsConfig = getKVPairValue('CART_CREDIT_CONFIG');
  const mfuEnabled = isFeatureEnabled('MFU');
  return {
    showGC: isCartCreditEnabled && cartCreditsConfig.giftCard.show,
    showLP:
      mfuEnabled ||
      (isCartCreditEnabled && cartCreditsConfig.loyaltyPoints.show)
  };
};

const checkOOS = product =>
  !product.sizes ||
  product.sizes.length === 0 ||
  product.sizes.find(size => size.skuId === product.skuId && !size.available);

const getOOSItems = products =>
  (products || []).filter(
    product => get(product, 'selectedForCheckout') && checkOOS(product)
  );

const getItemName = (brandName = '', itemName = '') =>
  (!itemName.indexOf(brandName)
    ? itemName.substr(brandName.length)
    : itemName
  ).trim();

const getUnavailableItems = products =>
  products.filter(product => product.flags.preLaunchProduct);

const getAvailability = ({
  sizes = [],
  selectedSize = {},
  quantity,
  selectedSeller = {}
}) => {
  let oos = false,
    sizeAvailable = true,
    quantityAvailable = true;
  const { available } = selectedSize;
  const { inventory = 0 } = selectedSeller || {};
  if (!available) {
    !sizes.find(size => size.available)
      ? (oos = true)
      : (sizeAvailable = false);
  } else {
    quantityAvailable = quantity <= inventory;
  }

  return { oos, sizeAvailable, quantityAvailable };
};

const getProductsValidity = (products, notReadyForCheckout, isExchangeCart) => {
  const validity = { valid: true, reason: '' };
  products
    .filter(product => get(product, 'selectedForCheckout', false))
    .some(product => {
      const {
        sizes,
        skuId,
        quantity,
        selectedSeller,
        productServiceabilityInfo
      } = product;
      const selectedSize = (sizes || []).find(e => e.skuId === skuId) || {};
      const { oos, sizeAvailable, quantityAvailable } = getAvailability({
        sizes,
        selectedSize,
        quantity,
        selectedSeller
      });

      if (oos || !sizeAvailable || !quantityAvailable) {
        validity.valid = false;
        validity.reason = invalidItemsReason.OOS;
      } else if (notReadyForCheckout && product.flags.preLaunchProduct) {
        validity.valid = false;
        validity.reason = invalidItemsReason.PRELAUNCH;
      } else if (
        (isFeatureEnabled('ADDRESS_ON_CART_V2') || isExchangeCart) &&
        get(productServiceabilityInfo, 'pincodeInfo.serviceable') === false
      ) {
        validity.valid = false;
        validity.reason = invalidItemsReason.NON_SERVICEABLE;
      }

      return !validity.valid;
    });

  return validity;
};

const isExpressCheckoutAddressClicked = () =>
  !!(
    isSessionStorageEnabled() &&
    sessionStorage.getItem(sessionStorageKeys.XPRESS_CHECKOUT_EDIT_ADDR_CLICKED)
  );

const getCartContext = () =>
  getQueryParam({ name: 'cartContext' }) || 'default';

const toggleOosCartHc = displayCartModal => {
  const { hcHeading, hcCopy } = getGrowthHackConfigValue(
    'CART_OOS_BULK_WISHLIST'
  );
  const modalContent = {
    header: hcHeading,
    body: hcCopy,
    sprite: 'oos',
    context: invalidItemsReason.OOS
  };
  displayCartModal(modalContent);
};

const handleCartPlaceOrderNavigation = ({
  hasExpressCheckoutAB,
  toggleExpressCheckoutHalfCard,
  updateStyleViolation,
  unifiedAddressId,
  handleAddressAction,
  handleCartAction,
  isExchangeCart,
  price,
  updateCheckoutState,
  selectedAddress
}) => {
  let callback;
  if (isExchangeCart) {
    callback = () => handleCartPlaceOrderRedirection(isExchangeCart, price);
  } else if (hasExpressCheckoutAB && !isExpressCheckoutAddressClicked()) {
    callback = toggleExpressCheckoutHalfCard;
  } else if (isVariantEnabled('AOC_V2_VARIANT3')) {
    callback = () =>
      stampAddressAndRedirect(
        unifiedAddressId,
        handleAddressAction,
        updateCheckoutState,
        selectedAddress
      );
  } else {
    callback = () => handleCartPlaceOrderRedirection(isExchangeCart, price);
  }
  if (isFeatureEnabled('STYLE_CAPPING')) {
    handleCartAction(
      'getStyleViolation',
      null,
      res => {
        if (res && !!get(res, 'violatedProducts', []).length) {
          updateStyleViolation(res);
        } else {
          callback && callback();
        }
      },
      err => {
        callback && callback();
      },
      {
        keepPreviousState: true
      }
    );
  } else {
    callback && callback();
  }
};

const handleCartPlaceOrder = ({
  products,
  total,
  virtualBundleConflict,
  conflictState,
  disabled,
  disabledRemark,
  displayCartModal,
  hasExpressCheckoutAB,
  toggleExpressCheckoutHalfCard,
  handleCartAction,
  selectedProductCount,
  mode,
  updateDynamicStyles,
  price,
  isExchangeCart,
  unifiedAddressId,
  handleAddressAction,
  updateStyleViolation,
  updateCheckoutState,
  selectedAddress
}) => {
  const handleNavigationProps = {
    hasExpressCheckoutAB,
    toggleExpressCheckoutHalfCard,
    updateStyleViolation,
    unifiedAddressId,
    handleAddressAction,
    handleCartAction,
    isExchangeCart,
    price,
    updateCheckoutState,
    selectedAddress
  };

  const styleOverrides = getSnackBarStyleOverrides(mode);
  const productsValidity = getProductsValidity(
    products,
    disabled,
    isExchangeCart
  );
  const modalContentMap = getKVPairValue('CART_MODAL_CONTENT');

  if (!productsValidity.valid) {
    if (productsValidity.reason === 'oos') {
      toggleOosCartHc(displayCartModal);
    } else {
      displayCartModal({
        ...modalContentMap[productsValidity.reason],
        context: productsValidity.reason
      });
    }
  } else if (total > 200000) {
    SHELL.alert('info', {
      message:
        "You've selected more than the allowed limit of Rs. 2,00,000 items, please remove some items to place order.",
      styleOverrides
    });
  } else if (selectedProductCount > 50) {
    SHELL.alert('info', {
      message:
        "You've selected more than the allowed limit of 50 items, please remove some items to place order.",
      styleOverrides
    });
  } else if (selectedProductCount === 0) {
    SHELL.alert('info', {
      message: 'Select at least one item in bag to place order.',
      styleOverrides
    });
    updateDynamicStyles('highlightProductsSelection', true);
  } else if (virtualBundleConflict) {
    displayCartModal(modalContentMap.vbConflict);
  } else if (conflictState === 'CONFLICTED') {
    handleCartAction(
      'resolveConflict',
      null,
      () => {
        handleCartPlaceOrderNavigation(handleNavigationProps);
      },
      null,
      {
        keepPreviousState: true,
        message:
          'Prices of one or more items have changed. Please click on "GOT IT" button'
      }
    );
  } else if (disabled) {
    const errorMaps = getKVPairValue('CART_NOT_READY_ERROR');
    displayCartModal({
      header: get(errorMaps, 'header'),
      body:
        get(errorMaps, `message.${disabledRemark}`) ||
        get(errorMaps, `message.default`)
    });
  } else {
    handleCartPlaceOrderNavigation(handleNavigationProps);
  }
};

const getSnackBarStyleOverrides = mode => {
  if (mode === 'mobile') {
    return {
      notifyMainDiv: 'bottom: 105px;',
      notifyTextDiv:
        'width: auto;min-height:40px;font-size:14px;text-align:left;'
    };
  } else {
    return {
      notifyMainDiv: 'top: 78px;max-width:328px',
      notifyTextDiv: 'width: auto;font-size:14px;text-align:left;'
    };
  }
};

const handleCartPlaceOrderRedirection = (isExchangeCart, price) => {
  let url = '/checkout/address';
  if (isExchangeCart) {
    url =
      get(price, 'userAction') === userActionTypes.REFUND
        ? '/my/refund?context=exchange'
        : '/checkout/payment';
  }
  const redirectionUrl = isLoggedIn() ? url : '/login?referer=/checkout/cart';
  if (window.location.hash.includes('#')) {
    window.ckrrhistory && window.ckrrhistory.goBack();
    setTimeout(() => {
      navigateTo(redirectionUrl);
    }, 0);
  } else {
    navigateTo(redirectionUrl);
  }
};

const getUrgencyMessage = ({ urgencyInfo }) => {
  let abVal = getAbtest('URGENCY_AB');
  abVal = abVal.slice(-1);

  let urgencyMessageKV = getKVPairValue('URGENCY_MESSAGE');
  let message;

  if (urgencyInfo && urgencyMessageKV && abVal !== '0') {
    const { addToCartCount, quantitySold } = urgencyInfo;

    if (quantitySold > 0 && urgencyMessageKV.purchased) {
      message = urgencyMessageKV.purchased.replace('{0}', quantitySold);
    } else if (addToCartCount && urgencyMessageKV.atc) {
      message = urgencyMessageKV.atc.replace('{0}', addToCartCount);
    }
  }

  return message;
};

const getEarlyBirdMessage = ({ discountInfo, inventory }) => {
  let abVal = getAbtest('EARLYBIRD_AB');
  abVal = abVal.slice(-1);

  let earlyBirdMessage;

  if (discountInfo && discountInfo.type === 512 && abVal !== '0') {
    earlyBirdMessage = getKVPairValue('EARLYBIRD_MESSAGE').replace(
      '{0}',
      inventory
    );
  }

  return earlyBirdMessage;
};

const getSelectedSize = product =>
  get(product, 'sizes', []).find(size => size.skuId === product.skuId) || {};

const getOffer = (offers, offerId) =>
  offers.find(offer => offer.id === offerId) || {};

const getPricingInfo = data => {
  const discountInfo = get(data, 'price.discounts.data', []).reduce(
    (acc, discount) => {
      acc[discount.name] = discount.value;
      acc.totalDiscount += discount.value;
      return acc;
    },
    { totalDiscount: 0 }
  );
  const chargesInfo = get(data, 'price.charges.data', []).reduce(
    (acc, charge) => {
      acc[charge.name] = charge.value;
      return acc;
    },
    {}
  );

  return {
    discountInfo,
    chargesInfo,
    mrp: get(data, 'price.mrp'),
    total: get(data, 'price.total')
  };
};

const getMaEventData = (products = [], offers, mynacoV3 = false) =>
  products.map(product => {
    const offer = getOffer(offers, product.offerId);
    const selectedSize = getSelectedSize(product);

    //Adding shipping estimate and mexpress method data in screen load
    const shippingEstimates = get(
      product,
      'productServiceabilityInfo.pincodeInfo.shippingEstimates',
      []
    );
    let estimate = isFeatureEnabled('SPEED_11')
      ? shippingEstimates.find(entry => entry.shippingMethod === 'EXPRESS')
      : null;
    estimate = !estimate
      ? shippingEstimates.find(entry => entry.shippingMethod === 'NORMAL')
      : estimate;
    const isMexpress = estimate
      ? get('estimate.expressLabelMap', 'MEXPRESS', '')
      : false;

    return mynacoV3
      ? {
          entity_id: product.id,
          entity_type: 'product',
          entity_name: product.name,
          entity_optional_attributes: {
            selectedForCheckout: product.selectedForCheckout,
            inv_count: selectedSize.inventory,
            price: get(product, 'price.subTotal'),
            qty: product.quantity,
            name: product.name,
            mrp: product.price.mrp,
            disc: (
              get(product, 'price.discounts.data', []).find(
                disc => disc.name === 'coupon'
              ) || {}
            ).value,
            brand: product.brand,
            skuId: product.skuId
          }
        }
      : {
          entity_id: product.id,
          entity_type: 'product',
          entity_name: product.name,
          entity_optional_attributes: {
            name: product.name,
            skuId: product.skuId,
            qty: product.quantity,
            price: product.price.mrp,
            inv_count: selectedSize.inventory,
            mrp: product.price.mrp,
            disc: (
              get(product, 'price.discounts.data', []).find(
                disc => disc.name === 'coupon'
              ) || {}
            ).value,
            brand: product.brand
          }
        };
  });

const getMynacoCartScreenLoadData = (data, mynacoV3 = false) => {
  const { discountInfo, chargesInfo, mrp, total } = getPricingInfo(data);
  const products = (get(data, 'products') || []).map(product => {
    const size = getSelectedSize(product);
    const productInfo = mynacoV3
      ? {
          brand: product.brand,
          id: product.id,
          mrp: get(product, 'price.mrp'),
          name: product.name,
          position: -1,
          price: get(product, 'price.total'),
          quantity: product.quantity,
          size: {
            availableQuantity: get(product, 'selectedSeller.inventory')
          },
          skuId: product.skuId,
          type: product.articleTypeId,
          selectedForCheckout: product.selectedForCheckout
        }
      : {
          'Style-Id': product.id,
          'Style-Name': product.name,
          SKU: product.skuId,
          'Size-Details': {
            skuId: size.skuId,
            available: size.available,
            availableQuantity: size.inventory
          },
          Price: get(product, 'price.total'),
          MRP: get(product, 'price.mrp'),
          Quantity: product.quantity,
          Brand: product.brand,
          'Article-Type': product.articleTypeId,
          selectedForCheckout: product.selectedForCheckout
        };

    let sellerPartnerId;
    if ((sellerPartnerId = get(product, 'selectedSeller.partnerId'))) {
      productInfo['Size-Details'] &&
        (productInfo['Size-Details'].itemAvailabilityDetailMap = {
          [sellerPartnerId]: {
            sellerPartnerId,
            sellerName: get(product, 'selectedSeller.name'),
            supplyType: get(product, 'selectedSeller.supplyType'),
            availableInWarehouses: get(product, 'selectedSeller.warehouses')
          }
        });
    }

    return productInfo;
  });

  return {
    'Cart-MRP': mrp,
    'Cart-TD': discountInfo.totalDiscount,
    'Product-taxes': chargesInfo.tax,
    'Cart-Shipping': chargesInfo.shipping,
    'Cart-total-amt': total,
    products
  };
};

const getLiveMetricData = (products = []) => {
  let skuIdList = '',
    liveMetricFlag = '',
    liveMetricCount = '';
  products.map((product, index) => {
    const { minLimit } = getGrowthHackConfigValue('CART_VIEWS');
    const showFlag =
      isApp() && get(product, 'urgencyInfo.pdpCount', 0) >= minLimit;
    if (index === 0) {
      skuIdList = skuIdList + product.id;
      liveMetricCount =
        liveMetricCount + get(product, 'urgencyInfo.pdpCount', 0);
      liveMetricFlag = liveMetricFlag + showFlag;
    } else {
      skuIdList = skuIdList + '_' + product.id;
      liveMetricCount =
        liveMetricCount + '_' + get(product, 'urgencyInfo.pdpCount', 0);
      liveMetricFlag = liveMetricFlag + '_' + showFlag;
    }
  });
  return { skuIdList, liveMetricFlag, liveMetricCount };
};

const getFrgEventData = (products = [], offers = []) => {
  const frgOffers = offers.filter(
    offer =>
      get(offer, 'discountType', 0) === CartConstants.FREE_GIFT_DISCOUNT_TYPE
  );
  const frgData = frgOffers.map(offer => {
    const frgProducts = products.filter(
      product => product.offerId === offer.id
    );
    const {
      conditionComplete = false,
      frgSlabComboParams = [],
      showFrgListPage = false,
      hasFreeItem = false
    } = offer;
    const baseSlab = frgSlabComboParams.find(slab => get(slab, 'minMore') > 0);
    const freeGift = (frgProducts || []).find(
      product => get(product, 'flags.freeItem') === true
    );
    const baseItems = (frgProducts || []).filter(
      product => get(product, 'flags.freeItem') === false
    );
    const estimate =
      (
        get(
          freeGift,
          'productServiceabilityInfo.pincodeInfo.shippingEstimates'
        ) || []
      ).find(entry => entry.shippingMethod === 'NORMAL') || {};
    const deliveryDate = estimate.promiseDate
      ? formatDate(estimate.promiseDate)
      : '';

    return {
      entity_optional_attributes: {
        gift_type: !showFrgListPage
          ? 'fixed'
          : frgSlabComboParams.length > 1
          ? 'tiered'
          : 'single_tier',
        eligibility: conditionComplete ? 1 : 0,
        tier1_eligibility_gap:
          frgSlabComboParams.length > 1
            ? get(frgSlabComboParams, '0.minMore', '')
            : '',
        tier2_eligibility_gap:
          frgSlabComboParams.length > 1
            ? get(frgSlabComboParams, '1.minMore', '')
            : '',
        tier3_eligibility_gap:
          frgSlabComboParams.length > 1
            ? get(frgSlabComboParams, '2.minMore', '')
            : '',
        threshold_gap: conditionComplete ? '' : get(baseSlab, 'minMore', ''),
        delivery_date: hasFreeItem ? deliveryDate : '',
        gift_item_id: get(freeGift, 'id', ''),
        data: (baseItems || []).map(item => {
          const estimateData =
            (
              get(
                item,
                'productServiceabilityInfo.pincodeInfo.shippingEstimates'
              ) || []
            ).find(entry => entry.shippingMethod === 'NORMAL') || {};
          const delivery = estimateData.promiseDate
            ? formatDate(estimateData.promiseDate)
            : '';

          return {
            style_id: get(item, 'id'),
            price: get(item, 'price.total', 0),
            qty: get(item, 'quantity', 0),
            delivery_date: delivery
          };
        })
      }
    };
  });

  return frgData;
};

const getFrgWidgetData = (
  products = [],
  offer = {},
  resetEligibility = false
) => {
  const {
    conditionComplete = false,
    frgSlabComboParams = [],
    showFrgListPage = false,
    hasFreeItem = false
  } = offer;
  const baseSlab = frgSlabComboParams.find(slab => get(slab, 'minMore') > 0);
  const freeGift = products.find(
    product => get(product, 'flags.freeItem') === true
  );
  const baseItems = products.filter(
    product => get(product, 'flags.freeItem') === false
  );
  const estimate =
    (
      get(
        freeGift,
        'productServiceabilityInfo.pincodeInfo.shippingEstimates'
      ) || []
    ).find(entry => entry.shippingMethod === 'NORMAL') || {};
  const deliveryDate = estimate.promiseDate
    ? formatDate(estimate.promiseDate)
    : '';

  return {
    entity_optional_attributes: {
      gift_type: !showFrgListPage
        ? 'fixed'
        : frgSlabComboParams.length > 1
        ? 'tiered'
        : 'single_tier',
      eligibility: resetEligibility ? 0 : conditionComplete ? 1 : 0,
      tier1_eligibility_gap:
        frgSlabComboParams.length > 1
          ? get(frgSlabComboParams, '0.minMore', '')
          : '',
      tier2_eligibility_gap:
        frgSlabComboParams.length > 1
          ? get(frgSlabComboParams, '1.minMore', '')
          : '',
      tier3_eligibility_gap:
        frgSlabComboParams.length > 1
          ? get(frgSlabComboParams, '2.minMore', '')
          : '',
      threshold_gap:
        conditionComplete && !resetEligibility
          ? ''
          : get(baseSlab, 'minMore', ''),
      delivery_date: hasFreeItem ? deliveryDate : '',
      gift_item_id: get(freeGift, 'id', ''),
      data: (baseItems || []).map(item => {
        const estimateData =
          (
            get(
              item,
              'productServiceabilityInfo.pincodeInfo.shippingEstimates'
            ) || []
          ).find(entry => entry.shippingMethod === 'NORMAL') || {};
        const delivery = estimateData.promiseDate
          ? formatDate(estimateData.promiseDate)
          : '';

        return {
          style_id: get(item, 'id'),
          price: get(item, 'price.total', 0),
          qty: get(item, 'quantity', 0),
          delivery_date: delivery
        };
      })
    }
  };
};

const getShippingSavings = (chargesData, shippingData = {}) => {
  /* shipping charge on current cart
      Try & Buy charge comes in this field as well */
  const shippingCharge =
    (chargesData.find(field => field.name === 'shipping') || {}).value || 0;
  const { shippingApplicableCharge = 0 } = shippingData;
  const shippingSavings = shippingApplicableCharge - shippingCharge;
  return shippingSavings > 0 ? shippingSavings : 0;
};

const getShippingTipUIData = (shippingData, showNewUserShippingTip) => {
  const shippingDataText = get(shippingData, 'text', '');
  const notExclusive =
    shippingDataText.toLowerCase().indexOf('exclusively') === -1;
  const shipCharge = notExclusive && get(shippingData, 'meta.minMore');
  const minMore = Math.round(shipCharge) > 0 ? Math.round(shipCharge) : 0;
  const categories = get(shippingData, 'meta.categories', '');
  const categorySpecificTipText = categories
    ? `from ${categories} category`
    : '';
  return {
    minMore,
    tipText1: minMore ? 'Shop for' : 'Yay!',
    tipText2: minMore ? 'convenience fee.' : 'No convenience fee',
    tipText3: showNewUserShippingTip
      ? 'on your first order.'
      : 'on this order.',
    spriteName: minMore ? 'ship-charge' : 'ship-free',
    categorySpecificTipText
  };
};

const showCartNewUserPropositions = isFirstTimeCustomer => {
  return isFeatureEnabled('CART_NEW_USER_PROPOSITIONS') && isFirstTimeCustomer;
};

const goToWishlist = () => (window.location.href = '/wishlist');

/**
 * The ArticleGender `ID` is a composite key of `articleTypeId` and `gender`.
 * compositeKey = `articleTypeId - gender` eg: 90-Mens
 * textData = `gender + articleType` eg: Mens Tshirts
 * NOTE: We do not show genders like `Unisex` so we create the composite key as `articleTypeId` and textData as `articleType` here
 **/
const getArticleGenderData = product => {
  if (CartConstants.GENDER_BLACKLIST.indexOf(product.gender) === -1) {
    return {
      id: `${product.articleTypeId}-${product.gender}`,
      name: `${product.gender} ${product.articleType}`
    };
  } else {
    return {
      id: `${product.articleTypeId}`,
      name: `${product.articleType}`
    };
  }
};

// NOTE: Products are reversed to mimic the buying behavior. Last product added should be shown first
const getTaxBreakup = (price, products) => {
  return {
    taxByProduct: reverse([...products]).map(
      ({ name, price: productPrice }) => ({
        name,
        tax: currencyValue(
          (productPrice.charges.data.find(info => info.name === 'tax') || {})
            .value || 0
        )
      })
    ),
    totalTax: currencyValue(
      (price.charges.data.find(info => info.name === 'tax') || {}).value || 0
    )
  };
};

const getSubTotal = (product, noTax) => {
  const mrp = get(product, 'price.mrp', 0);
  const taxCharges = get(product, 'price.charges.data', []).filter(
    charge => charge.name === 'tax'
  );
  const tax = noTax ? 0 : get(taxCharges, '0.value', 0);
  const discount = get(product, 'price.discounts.data', []).reduce(
    (totalDiscount, discount) => totalDiscount + discount.value,
    0
  );
  return mrp + tax - discount;
};

const getCartItemsReturnInfo = products => {
  // Check if all products are returnable
  const allReturnable = products.every(
    product => get(product, 'flags.returnable', false) === true
  );
  // Check if all products are returnable
  const allExchangeable = products.every(
    product => get(product, 'flags.exchangeable', false) === true
  );
  // Check if all products have the same return period
  const sameReturnPeriod = products.every(
    product => get(product, 'returnPeriod') === get(products[0], 'returnPeriod')
  );

  const cartItemsReturnInfo = {
    allReturnable,
    allExchangeable,
    sameReturnPeriod,
    commonReturnPeriod: sameReturnPeriod
      ? get(products[0], 'returnPeriod')
      : null,
    cartCount: products.length
  };
  return cartItemsReturnInfo;
};

const getQuantityList = inventory =>
  Array.from(Array(Math.min(getKVPairValue('QUANTITY_LIMIT'), inventory))).map(
    (val, index) => ({
      display: index + 1,
      id: index + 1,
      available: true
    })
  );

const getSizesList = (sizes, selectedSellerPartnerId, userSelectedSkuId) => {
  const list = sizes.map(({ label, skuId, available, sellers }) => ({
    display: label,
    id: skuId,
    available,
    sellers,
    price: getSKUPrice(
      sellers,
      selectedSellerPartnerId,
      skuId !== userSelectedSkuId
    )
  }));
  return list;
};

const isCartCodServiceable = cartData => {
  // Check for cart servcieability
  const shippingMethod = get(cartData, 'shippingData.method') || '';
  const serviceability = get(cartData, 'serviceability');
  if (shippingMethod && serviceability) {
    const shippingInfoFlags = get(
      cartData,
      `serviceability.${
        AddressConstants.shippingMethodInfoFromKey[shippingMethod.toUpperCase()]
      }.flags`
    );
    if (
      get(shippingInfoFlags, 'cardOnDelivery.value') &&
      get(shippingInfoFlags, 'cashOnDelivery.value')
    ) {
      return true;
    }
  }
  return false;
};

const getShippingInfo = cartData => {
  const shippingMethod = get(cartData, 'shippingData.method') || '';
  const serviceability = get(cartData, 'serviceability');
  if (shippingMethod && serviceability) {
    return get(
      cartData,
      `serviceability.${
        AddressConstants.shippingMethodInfoFromKey[shippingMethod.toUpperCase()]
      }`,
      null
    );
  } else {
    return null;
  }
};

const getPriceChangeInfo = (products = []) => {
  let netDiff = 0;
  const list = products
    .map(product => {
      const {
        price: { subTotal } = {},
        images,
        brand,
        name,
        quantity,
        id
      } = product;
      if (get(product, 'conflict.price.state') === 'CONFLICTED') {
        const oldPrice = get(product, 'conflict.price.oldPrice');
        const diff = Math.floor(subTotal / quantity - oldPrice);
        netDiff = netDiff + diff;
        return {
          diff,
          brand,
          name,
          image: images[0] && images[0].secureSrc,
          type: diff > 0 ? INCREASED : DECREASED,
          id
        };
      }
    })
    .filter(Boolean);
  return {
    netDiff,
    products: list || []
  };
};

//do not count freeItem
const getTotalItemsCount = products =>
  (products || []).filter(product => !get(product, 'flags.freeItem')).length;

const changeSizeAndSellerUtil = ({
  e,
  oldSkuId,
  quantity,
  handleCartAction,
  callBack,
  itemId,
  id,
  oldPartnerId
}) => {
  const skuId = +e.currentTarget.skuId;
  const sellerPartnerId = +e.currentTarget.sellerPartnerId;
  const payLoad = {
    sku_id: skuId,
    seller_partner_id: sellerPartnerId
  };
  skuId &&
    oldSkuId &&
    oldSkuId !== skuId &&
    triggerEvent('EDIT_SIZE', {
      gaLabel: `${id}|${skuId}|${oldSkuId}|${sellerPartnerId}`,
      mynacoAttributes: payLoad,
      maData: {
        entity_optional_attributes: payLoad,
        entity_id: id
      }
    });
  oldPartnerId &&
    sellerPartnerId &&
    oldPartnerId !== sellerPartnerId &&
    triggerEvent('EDIT_SELLER', {
      gaLabel: `${id}|${skuId}|${sellerPartnerId}|${oldPartnerId}`,
      mynacoAttributes: {
        ...payLoad,
        style_id: id
      },
      maData: {
        entity_optional_attributes: payLoad,
        entity_id: id
      }
    });
  handleCartAction('updateItems', [
    {
      itemId,
      skuId,
      quantity,
      sellerPartnerId
    }
  ]);
  callBack && callBack();
};

const changeQuantityUtil = ({
  e,
  oldQuantity,
  itemId,
  skuId,
  handleCartAction,
  sellerPartnerId,
  callBack
}) => {
  callBack && callBack();
  const quantity = +e.currentTarget.id;
  triggerEvent('EDIT_QUANTITY', {
    gaLabel: `${skuId}|${quantity}|${oldQuantity}|${sellerPartnerId}`
  });
  handleCartAction(
    'updateItems',
    [
      {
        itemId,
        skuId,
        quantity,
        sellerPartnerId
      }
    ],
    CartCountHandler.updateState
  );
};

const getSKUPrice = (
  sellers = [{}],
  selectedSellerPartnerId,
  showBuyButtonWinnerPrice
) => {
  const buyButtonwinner =
    sellers.find(({ seller = {} }) => seller.inventory > 0) || sellers[0];
  const userSelectedSeller = showBuyButtonWinnerPrice
    ? buyButtonwinner
    : sellers.find(
        ({ seller }) => seller.partnerId === selectedSellerPartnerId
      ) || buyButtonwinner;
  const price = get(userSelectedSeller, 'price.subTotal');
  return price;
};

const getMinPrice = (userSelectedSeller, otherSeller) => {
  let minPrice = otherSeller.reduce(
    (minimumPrice, { price }) =>
      price.subTotal < minimumPrice ? price.subTotal : minimumPrice,
    get(userSelectedSeller, 'price.subTotal', Infinity)
  );
  minPrice >= get(userSelectedSeller, 'price.subTotal') &&
    (minPrice = undefined);
  return minPrice;
};

const getMinPriceAndSellerCount = (
  sellers = [{ seller: {} }],
  selectedPartnerIdInResponse,
  showBuyButtonWinnerPrice = true
) => {
  const buyButtonwinner = sellers.find(
    ({ seller = {} }) => seller.inventory > 0
  );
  if (!buyButtonwinner) return { sellerCount: 0 };

  const userSelectedSeller = showBuyButtonWinnerPrice
    ? buyButtonwinner
    : sellers.find(
        ({ seller }) =>
          seller.partnerId === selectedPartnerIdInResponse &&
          seller.inventory > 0
      ) || buyButtonwinner;
  const otherSeller = sellers.filter(
    ({ seller }) =>
      seller.partnerId !== userSelectedSeller.seller.partnerId &&
      seller.inventory > 0
  );

  const sellerCount = otherSeller.length;
  const minPrice = getMinPrice(userSelectedSeller, otherSeller);
  return {
    minPrice,
    sellerCount
  };
};

const checkForQueryParams = url => {
  const slicedUrl = url.split('/');
  const lastSlice = slicedUrl[slicedUrl.length] || '';
  return lastSlice.indexOf('&') > -1 &&
    lastSlice.indexOf('=') > -1 &&
    lastSlice.indexOf('?') > -1
    ? true
    : false;
};

const getBuyButtonWinnerForSize = sellers => {
  return (
    sellers.find(({ seller }) => seller.inventory > 0) || {
      seller: {},
      price: {}
    }
  );
};

const getSelectedSeller = (sellers, selectedPartnerId) => {
  return selectedPartnerId
    ? sellers.find(({ seller }) => seller.partnerId === selectedPartnerId)
    : { seller: {}, price: {} };
};

const isPriceConstantAcrossSelectedSellerAndBBW = args => {
  const { sizes, skuInResponse, selectedSeller } = args;
  const selectedPartnerId = (selectedSeller || {}).partnerId;
  const buyButtonWinnerArray = [];
  sizes.forEach(({ sellers, available, skuId }) => {
    available &&
      (skuId === skuInResponse && selectedPartnerId
        ? buyButtonWinnerArray.push(
            getSelectedSeller(sellers, selectedPartnerId)
          )
        : buyButtonWinnerArray.push(getBuyButtonWinnerForSize(sellers)));
  });
  const bbwPrice = (buyButtonWinnerArray[0] || { price: {} }).price.subTotal;
  return buyButtonWinnerArray.reduce(
    (isSame, { price }) => price.subTotal === bbwPrice && isSame,
    true
  );
};

const getDisplaySeller = (selectedPartnerId, selectedSize) => {
  const defaultResult = {
    price: {},
    seller: {}
  };
  if (!selectedSize || !selectedSize.sellers) return defaultResult;
  if (selectedPartnerId)
    return selectedSize.sellers.find(
      ({ seller = {} }) => seller.partnerId === selectedPartnerId
    );
  else
    return (
      selectedSize.sellers.find(({ seller = {} }) => seller.inventory > 0) ||
      defaultResult
    );
};

const getNonServiceableItems = (products, isExchangeCart) => {
  if (!isFeatureEnabled('ADDRESS_ON_CART_V2') && !isExchangeCart) {
    return null;
  }

  return (products || []).filter(product => {
    if (
      get(product, 'selectedForCheckout') &&
      !checkOOS(product) &&
      get(product, 'productServiceabilityInfo.pincodeInfo.serviceable') ===
        false
    ) {
      return true;
    }
    return false;
  });
};

const getAttachedProduct = data => {
  if (
    get(data, 'catalogueType') === 'attached_discount' ||
    get(data, 'catalogueType') === 'attached_base'
  ) {
    return data;
  }
  return null;
};

const getAttachedProductItemOffer = appliedCoupons => {
  const itemOffer = appliedCoupons
    ? appliedCoupons.find(data => getAttachedProduct(data))
    : {};
  return itemOffer;
};

const getSelectedDonationAmount = price => {
  const charges = get(price, 'charges.data', []);
  const donationObject = charges.find(
    charge => get(charge, 'name', false) === 'donation'
  );
  return get(donationObject, 'value', 0);
};

const triggerAttachedProductsEvent = (payload = {}, callBackFunc) => {
  triggerEvent('ATTACHED_PRODUCTS_OPERATIONS', {
    custom: {
      custom: {
        v1: payload.context,
        v2: payload.action,
        v3: payload.styleId
      }
    }
  });
  callBackFunc && callBackFunc();
};

const skipExpressCheckout = (cartData = {}) => {
  // checks if order amount is in COD range and user is not return abuser
  const { returnAbuser, cod } = get(cartData, 'userDetails', {});
  const minCOD = get(cod, 'minCod', '0');
  const maxCOD = get(cod, 'maxCod');
  const _isReturnAbuser = isReturnAbuser(returnAbuser);
  const { subTotal } = get(cartData, 'price', {});
  const skip = _isReturnAbuser || subTotal <= minCOD || subTotal >= maxCOD;
  return skip;
};

const isPriorityCheckoutEnabled = cartData => {
  const enabled = get(cartData, 'flags.coverFeeApplicable.value');
  const isFreeAccess = isFreeEarlyAccess(
    get(cartData, 'flags.coverFeeApplicable.remark')
  );

  return enabled || isFreeAccess;
};

const triggerExpressCheckoutFlag = (cartData = {}, isAddressSelected) => {
  const shouldTrigger =
    isAddressSelected &&
    isApp() &&
    isFeatureEnabled('ADDRESS_ON_CART_V2') &&
    !isPriorityCheckoutEnabled(cartData) &&
    !isGiftcardContext() &&
    !checkExchangeCart(cartData) &&
    !skipExpressCheckout(cartData);

  shouldTrigger &&
    triggerEvent('XPRESS_CHECKOUT_FLAG', {
      custom: {
        custom: {
          v1: getUidx()
        },
        widget: {
          name: 'cart_express_checkout_flag'
        },
        event_type: 'other'
      }
    });
};

const triggerFrgLoadEvent = (
  itemsList,
  groupData,
  widgetItemName,
  resetEligibility = false
) => {
  triggerEvent('FRG_CART_LOAD', {
    custom: {
      widget: {
        name: 'cart_free_gift_load',
        type: 'card'
      },
      widget_items: {
        name: widgetItemName,
        data_set: {
          data: getFrgWidgetData(itemsList, groupData, resetEligibility)
        }
      },
      event_type: 'widgetLoad'
    }
  });
};

const getFreeGiftUrl = (freeGiftBaseStyle, isApp, slabName = '') => {
  let url = '';
  let queryParams = {
    baseStyleId: get(freeGiftBaseStyle, 'id', 0).toString(),
    sellerPartnerId: get(
      freeGiftBaseStyle,
      'selectedSeller.partnerId',
      0
    ).toString(),
    skuId: get(freeGiftBaseStyle, 'skuId', 0).toString(),
    src: 'cart'
  };
  if (slabName) {
    queryParams = {
      ...queryParams,
      slabName: slabName
    };
  }
  url = isApp
    ? `/free-gift-list?baseStyleId=${get(
        freeGiftBaseStyle,
        'id',
        ''
      )}&sellerPartnerId=${get(
        freeGiftBaseStyle,
        'selectedSeller.partnerId',
        ''
      )}&skuId=${get(freeGiftBaseStyle, 'skuId', '')}&src=cart${
        slabName ? `&slabName=${slabName}` : ''
      }`
    : `/free-gift-list?query=${JSON.stringify(queryParams)}`;
  return url;
};

const getEstimate = shippingEstimates => {
  let estimate,
    isSpeed11 = false,
    estimateMap = {
      HYPERLOCAL: [],
      SDD: [],
      EXPRESS: [],
      NORMAL: [],
      VALUE_SHIPPING: []
    };
  shippingEstimates.forEach((estimate, idx) => {
    estimate &&
      estimate.shippingMethod &&
      estimateMap[estimate.shippingMethod]?.push(estimate);
  });

  if (estimateMap.HYPERLOCAL.length > 0) {
    estimate = estimateMap.HYPERLOCAL[0];
  } else if (estimateMap.SDD.length > 0) {
    estimate = estimateMap.SDD[0];
  } else if (isFeatureEnabled('SPEED_11') && estimateMap.EXPRESS.length > 0) {
    estimate = estimateMap.EXPRESS[0];
    isSpeed11 = true;
  } else if (estimateMap.NORMAL.length > 0) {
    estimate = estimateMap.NORMAL[0];
  } else if (estimateMap.VALUE_SHIPPING.length > 0) {
    estimate = estimateMap.VALUE_SHIPPING[0];
  } else {
    return null;
  }
  return { estimate, isSpeed11 };
};

export {
  isValidCart,
  checkExchangeCart,
  getAppliedInstrument,
  getShowCreditConfig,
  getOOSItems,
  getItemName,
  getSizesList,
  getQuantityList,
  getCartItemsReturnInfo,
  getCartContext,
  getSubTotal,
  getTaxBreakup,
  getArticleGenderData,
  goToWishlist,
  showCartNewUserPropositions,
  getShippingTipUIData,
  getShippingSavings,
  getMynacoCartScreenLoadData,
  getMaEventData,
  handleCartPlaceOrder,
  getUnavailableItems,
  getAvailability,
  getUrgencyMessage,
  getEarlyBirdMessage,
  getPricingInfo,
  getProductsValidity,
  isCartCodServiceable,
  getShippingInfo,
  getPriceChangeInfo,
  getTotalItemsCount,
  changeSizeAndSellerUtil,
  changeQuantityUtil,
  getSKUPrice,
  getMinPriceAndSellerCount,
  checkForQueryParams,
  isPriceConstantAcrossSelectedSellerAndBBW,
  getDisplaySeller,
  getSnackBarStyleOverrides,
  getNonServiceableItems,
  toggleOosCartHc,
  getAttachedProductItemOffer,
  triggerAttachedProductsEvent,
  getSelectedDonationAmount,
  getLiveMetricData,
  isPriorityCheckoutEnabled,
  triggerExpressCheckoutFlag,
  getFrgEventData,
  triggerFrgLoadEvent,
  getFreeGiftUrl,
  getEstimate
};
