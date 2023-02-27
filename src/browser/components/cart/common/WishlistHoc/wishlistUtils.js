import securify from 'commonBrowserUtils/securify';
import get from 'lodash/get';

const secure = securify();

const getSellerInfo = data => {
  let inventoryInfo = (get(data, 'inventoryInfo') || []).find(
    info => info.skuId === get(data, 'selectedSku')
  );
  if (!inventoryInfo || !inventoryInfo.available) {
    inventoryInfo =
      (get(data, 'inventoryInfo') || []).find(
        inventory => inventory.available
      ) ||
      get(data, 'inventoryInfo.0') ||
      {};
  }
  const selectedSellerPartnerId = get(data, 'selectedSellerPartnerId');
  let sellerInfo;
  if (inventoryInfo.skuId === get(data, 'selectedSku')) {
    sellerInfo = (get(inventoryInfo, 'sellersData') || []).find(
      seller =>
        seller.sellerPartnerId === selectedSellerPartnerId &&
        seller.availableCount > 0
    );
  }
  if (!sellerInfo) {
    sellerInfo = get(inventoryInfo, 'sellersData.0');
  }
  return {
    sellerInfo,
    selectedSellerPartnerId
  };
};

const sortProducts = (products, attr, orderBy = 'asc') => {
  const sortedProducts = products.sort(
    (product1, product2) =>
      (parseFloat(product1[attr]) - parseFloat(product2[attr])) *
      (orderBy === 'asc' ? 1 : -1)
  );
  return sortedProducts;
};

const excludeOutOfStockSizes = product => {
  return product.inventoryInfo.filter(item => item.available);
};

const getSecureImages = images => {
  return images.map(image => ({
    secureSrc: secure(get(image, 'src'))
  }));
};

const transformWishlistData = (wishlistProducts, wishlistLimit) => {
  const products = wishlistProducts.reduce((accum, product, index) => {
    const inventoryInfo = excludeOutOfStockSizes(product);
    /*
      Although we don't get OOS sizes in the wishlist API response, 
      this has been kept for the sake of consistency with WishlistCarousalV1
    */

    const {
      sellerInfo: { discountedPrice, discountDisplayLabel } = {}
    } = getSellerInfo(product);
    if (inventoryInfo.length) {
      accum.push({
        inventoryInfo,
        styleImages: getSecureImages(product.images),
        brandName: product.brand,
        availableSizeData: product.sizes,
        category: product.category,
        discountDisplayLabel,
        id: product.id,
        mrp: product.mrp,
        name: product.name,
        price: discountedPrice,
        h_position: index,
        v_position: 0
      });
    }
    return accum;
  }, []);
  products = sortProducts(products, 'price', 'asc');
  products = products.slice(0, wishlistLimit);
  return products;
};

const triggerWishListLoad = (products = [], totalCount = 0) => {
  const v2 = products.map(product => `${product.id}`).join('_');

  const v3 = products.map(product => `${product.price}`).join('_');

  triggerEvent('WISHLIST_CARD_LOAD', {
    custom: {
      custom: {
        v1: totalCount,
        v2,
        v3
      },
      widget: {
        name: 'cart_wishlist_card',
        type: 'list'
      },
      event_type: 'widgetLoad'
    }
  });
};

export {
  getSellerInfo,
  excludeOutOfStockSizes,
  getSecureImages,
  sortProducts,
  transformWishlistData,
  triggerWishListLoad
};
