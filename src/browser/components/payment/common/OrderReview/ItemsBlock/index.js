import React from 'react';
import get from 'lodash/get';
import { getItemName } from 'commonBrowserUtils/CartHelper';
import { isVariantEnabled } from 'commonUtils/FeaturesManager';
import Image from 'commonComp/Image';
import { currencyValue, isMobile } from 'commonBrowserUtils/Helper';
import { DeliveryEstimate } from '../../../../cart/common/ItemComponents';
import Styles from './ItemsBlock.base.css';

const getSize = (sizes, skuId) => {
  let label = '';
  sizes.map(size => {
    if (size.skuId == skuId) {
      label = size.label;
    }
  });
  return label;
};

const IMAGE_SIZE = {
  height: 87,
  width: 66
};

const IMAGE_SIZE_PRICE = {
  height: 110,
  width: 84
};

const ItemsBlock = props => {
  const { cartProducts } = props;
  return (
    <>
      {cartProducts.map(product => {
        const size = getSize(product?.sizes, product?.skuId);
        const itemName = getItemName(product?.brand, product?.name);
        return (
          <div className={Styles.item}>
            <div
              className={isMobile() ? Styles.leftMobile : Styles.leftDesktop}
            >
              {isVariantEnabled('ORDER_REVIEW_PRICE_ENABLED') ? (
                <Image
                  src={product.images[0]?.secureSrc}
                  height={IMAGE_SIZE_PRICE.height}
                  width={IMAGE_SIZE_PRICE.width}
                />
              ) : (
                <Image
                  src={product.images[0]?.secureSrc}
                  height={IMAGE_SIZE.height}
                  width={IMAGE_SIZE.width}
                />
              )}
            </div>
            <div
              className={isMobile() ? Styles.rightMobile : Styles.rightDesktop}
            >
              <div className={Styles.brandName}>{product.brand}</div>
              <span className={Styles.productName}>{itemName}</span>
              <div className={Styles.sizeQty}>
                <span className={Styles.size}>Size: {size}</span>
                <span className={Styles.quantity}>Qty: {product.quantity}</span>
              </div>
              {isVariantEnabled('ORDER_REVIEW_PRICE_ENABLED') &&
                (get(product, 'price.subTotal') >= 1 ? (
                  <div className={Styles.price}>
                    ₹{currencyValue(product.price.subTotal)}
                  </div>
                ) : (
                  <div className={Styles.freeGift}>Free Gift</div>
                ))}
              <DeliveryEstimate
                shippingEstimates={get(
                  product,
                  'productServiceabilityInfo.pincodeInfo.shippingEstimates'
                )}
                updateDeliveryEstimates={() => {}}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ItemsBlock;
