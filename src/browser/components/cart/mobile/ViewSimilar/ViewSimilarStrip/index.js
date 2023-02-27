import CartManager from 'commonBrowserUtils/CartManager';
import { errorNotification, getUidx } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';
import Loader from 'commonComp/Loader';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { find, get, isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import CartFiller from '../../CartFiller';
import SizePicker from '../SizePicker';
import Style from './viewSimilarStrip.base.css';

const addToCartMessageConfig = getKVPairValue('ADD_TO_CART_MESSAGING');
const itemAlreadyInCartMessage =
  get(addToCartMessageConfig, 'itemAlreadyPresent') ||
  Strings.ITEM_ALREADY_PRESENT_IN_CART;
const itemReachedMaxQtyMessage =
  get(addToCartMessageConfig, 'itemReachedMaxQty') ||
  Strings.ITEM_REACHED_MAX_QUANTITY_IN_CART;

const mapToFormat = data => {
  return data.map(d => ({
    id: d?.id,
    name: d?.name,
    brandName: d?.brand?.name,
    price: d?.price?.discounted,
    mrp: d?.price?.mrp,
    inventoryInfo: d?.sizes?.map(s => ({
      skuId: s?.skuId,
      label: s?.label,
      inventory: s?.sizeSellerData?.sellableInventoryCount,
      available: s?.available
    })),
    availableSizeData: d?.sizes?.map(s => s?.label)?.join(','),
    discount: d?.price?.mrp - d?.price?.discounted,
    discountDisplayLabel: d?.price?.discount?.label,
    defaultImage: d?.defaultImage
  }));
};

const ViewSimilarStrip = props => {
  const {
    handleCartAction,
    styleId,
    isMoveToBag = false,
    handleCloseModal
  } = props;
  const [selectedProduct, setSelectedProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isItemAlreadyInCart = useCallback(cartResponse => {
    const cartMessage = get(cartResponse, 'cartMessage');
    return get(cartMessage, 'message') === 'INCREASED_QUANTITY_IN_CART';
  }, []);

  const hasItemReachedMaxQuanityInCart = useCallback(cartResponse => {
    const cartMessage = get(cartResponse, 'cartMessage');
    return get(cartMessage, 'message') === 'MAXIMUM_ALLOWED_QUANTITY_REACHED';
  }, []);

  useEffect(() => {
    setIsLoading(true);
    CartManager.getSimilarProductsData(
      styleId,
      res => {
        setIsLoading(false);
        const products =
          find(res?.related || [], { type: 'Similar' })?.products || [];
        setSimilarProducts(mapToFormat(products));
      },
      err => {
        setIsLoading(false);
        SHELL.alert('error', {
          message: err
        });
      }
    );
  }, [styleId]);

  const triggerWidgetLoadEvent = useCallback(() => {
    const userUidx = getUidx();
    triggerEvent('CART_OOS_SIMILAR_LOAD_WIDGET', {
      custom: {
        custom: {
          v1: userUidx
        },
        widget: {
          name: 'cart-oos-similar',
          type: 'cart-oos-similar'
        },
        event_type: 'widgetLoad',
        event_category: 'Cart page - oos similar widget load'
      }
    });
  }, []);

  const triggerAddToCartEvent = useCallback((data, index) => {
    const product = (data || [])[0];
    const userUidx = getUidx();

    if (product) {
      triggerEvent('CART_OOS_SIMILAR_ADD_TO_CART', {
        maData: {
          entity_type: 'product',
          entity_name: 'cart-oos-similar',
          entity_id: get(product, 'id')
        },
        custom: {
          custom: {
            v1: userUidx
          },
          widget: {
            name: 'cart-oos-similar',
            type: 'cart-oos-similar',
            data_set: {
              data: [
                {
                  entity_type: 'cart',
                  entity_id: get(product, 'id')
                }
              ]
            }
          },
          widget_items: {
            data_set: {
              data: [
                {
                  entity_type: 'product',
                  entity_name: get(product, 'name'),
                  entity_id: get(product, 'id'),
                  entity_optional_attribute: {
                    h_position: index,
                    v_position: 0
                  }
                }
              ]
            }
          }
        },
        mynacoAttributes: {
          category: 'shopping',
          action: 'addToCart',
          label: get(product, 'id'),
          quantity: get(product, 'quantity')
        },
        mynacoV3: {
          templateData: {
            category: 'shopping',
            action: 'addToCart',
            label: get(product, 'id'),
            quantity: get(product, 'quantity')
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    triggerWidgetLoadEvent();
  }, [triggerWidgetLoadEvent]);

  const addToCart = useCallback(
    (data, index) => {
      handleCartAction(
        'addItems',
        data,
        res => {
          const isItemAlreadyInCartMsg = isItemAlreadyInCart(res) || false;
          const hasItemReachedMaxQuanityInCartMsg =
            hasItemReachedMaxQuanityInCart(res) || false;
          const toastMessage = isItemAlreadyInCartMsg
            ? itemAlreadyInCartMessage
            : hasItemReachedMaxQuanityInCartMsg
            ? itemReachedMaxQtyMessage
            : null;
          if (toastMessage) {
            SHELL.alert('info', {
              message: toastMessage
            });
          }
          if (handleCloseModal) {
            handleCloseModal();
          }
          triggerAddToCartEvent(data, index);
          handleCartAction('get');
        },
        err => {
          errorNotification(err ? { message: err.message } : {});
        },
        { keepPreviousState: true }
      );
    },
    [
      hasItemReachedMaxQuanityInCart,
      isItemAlreadyInCart,
      triggerAddToCartEvent,
      handleCloseModal
    ]
  );

  const addSizeToCart = useCallback(
    skuId => {
      const data = [
        {
          id: selectedProduct.product.id,
          skuId: skuId,
          quantity: 1
        }
      ];
      addToCart(data, selectedProduct.index);
    },
    [selectedProduct, addToCart]
  );

  const handleSizeSelector = (product, index) => {
    setSelectedProduct({ product, index });
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader show={isLoading} backdrop spinner />;
    } else if (similarProducts?.length === 0) {
      if (!isMoveToBag) {
        return (
          <div className={Style.noProductsFound}>
            {Strings.NO_PRODUCT_FOUND}
          </div>
        );
      }
    } else {
      return (
        <div
          className={`${Style.stripContainer} ${
            isMoveToBag ? Style.borderTop : ''
          }`}
        >
          {isEmpty(selectedProduct.product) ? (
            <div className={Style.heading}>Similar Products</div>
          ) : (
            <SizePicker
              sizes={selectedProduct.product.inventoryInfo}
              addSizeToCart={addSizeToCart}
            />
          )}
          <CartFiller
            customHeader
            isEnableHighlight
            isDisablePopup
            customCartFillerProduct={Style.firstProductClass}
            className={Style.productsContainer}
            products={similarProducts}
            handleSizeSelector={handleSizeSelector}
            addToCart={addToCart}
          />
          {isMoveToBag && <div className={Style.or}> Or </div>}
        </div>
      );
    }
  };

  return <div className={Style.viewSimilarStrip}>{renderContent()}</div>;
};

export default ViewSimilarStrip;
