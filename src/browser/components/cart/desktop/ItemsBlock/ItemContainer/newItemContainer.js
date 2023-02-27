import React, { useState, useEffect } from 'react';
import get from 'lodash/get';

// Common Components
import ToolTip from 'commonComp/ToolTip';
import CartConstants from 'commonBrowserUtils/CartConstants';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import {
  getAttachedProductItemOffer,
  getFreeGiftUrl
} from 'commonBrowserUtils/CartHelper';
import XceleratorTag from '../../../common/XceleratorTag';
// Cart common components
import { OfferDiscountText } from '../../../common/ItemOfferComponents';
import {
  ItemImage,
  Urgency,
  EBMessage,
  EssentialTag,
  PreOrderTag,
  SellerData,
  ImportSize,
  ImportQuantity,
  Amount,
  StrikedAmount,
  ItemTradeDiscount,
  ItemComboDiscount,
  ItemPersonalizedDiscount,
  ItemCouponDiscount,
  ReturnInfo,
  CommonItemContainer,
  RemoveDialog,
  WishlistDialog,
  AttachProductDiscount,
  StyleOffersPopup,
  OOSMessage,
  SizeNotAvailableMessage,
  QuantityNotAvailableMessage,
  LowUnitCountMessage,
  ProductUnavailableMessage,
  SelectionIndicator,
  DeselectComboDialog,
  DeselectAttachedProductDialog,
  ServiceabilityInfo,
  MoveOutOfBagModal,
  GiftItemLabel
} from '../../../common/ItemComponents';
import ButtonV2 from 'commonComp/ButtonV2';
import { SizeDialog, QtyDialog } from '../Dialogs';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  getAvailability,
  getEarlyBirdMessage,
  getItemName
} from 'commonBrowserUtils/CartHelper';
import ExpiryDate from '../../../common/ExpiryDate';
import useModal from 'customHooks/useModal';
import FineJwellery from '../../../common/FineJwellery';
import ReturnPeriod from '../../../common/ReturnPeriod';

// Styles
import Style from './itemContainer.base.css';
import Info from 'iconComp/Info.jsx';
import DropDown from 'iconComp/DropDown.jsx';
import Close from 'iconComp/Close.jsx';
import SampleSelectorModal from '../../../common/SampleSelectorModal';

const IMAGE_SIZE = { width: 111, height: 148 };

const PriceComponent = props => {
  const {
    price,
    discount,
    discountInfo,
    offerData,
    conflict,
    flags,
    quantity,
    id
  } = props;

  const isCartMessagingRevamp = isFeatureEnabled('CART_MESSAGING_REVAMP');
  let priceChangeToolTip = null;

  const [timerExpired, setTimerExpired] = useState(false);
  const timerCallback = () => {
    setTimerExpired(true);
  };

  if (isCartMessagingRevamp && get(conflict, 'price.state') === 'CONFLICTED') {
    priceChangeToolTip = (
      <ToolTip
        className={Style.priceChangeTooltip}
        elem={<Info className={Style.toolTipIcon} />}
        tipClass={Style.tipStyle}
      >
        <div className={Style.toolTipText}>
          {`Older Price: ₹${get(conflict, 'price.oldPrice')}`}
          {`\nNew Price: ₹${
            quantity > 1 ? price.subTotal / quantity : price.subTotal
          }`}
        </div>
      </ToolTip>
    );
  }

  if (price.mrp < 1) {
    return (
      <div className={Style.price}>
        <OfferDiscountText
          flags={flags}
          zeroMrp={true}
          styleId={id}
          {...offerData}
        />
      </div>
    );
  } else if (price.mrp === price.subTotal) {
    return (
      <div className={Style.price}>
        <Amount
          value={price.mrp}
          conflict={isCartMessagingRevamp ? {} : conflict}
          quantity={quantity}
        />
        <div className={Style.discountStrikedAmount}>
          <OfferDiscountText flags={flags} />
          {priceChangeToolTip}
        </div>
      </div>
    );
  } else {
    return (
      <div className={Style.price}>
        <Amount
          value={price.subTotal}
          conflict={isCartMessagingRevamp ? {} : conflict}
          quantity={quantity}
        />
        <div className={Style.discountBlock}>
          <StrikedAmount value={price.mrp} className={Style.strikedAmount} />
          {!offerData && !flags.freeItem && (
            <ItemTradeDiscount
              {...discount}
              discountInfo={discountInfo}
              timerExpired={timerExpired}
              timerCallback={timerCallback}
              className={Style.tradeDiscount}
            />
          )}
          <OfferDiscountText
            {...offerData}
            styleId={id}
            discountEntry={discount}
            className={flags.freeItem ? '' : Style.offerDiscountText}
            flags={flags}
          />
          {priceChangeToolTip}
        </div>
      </div>
    );
  }
};

const ItemDetails = ({
  id,
  skuId = '',
  name,
  brand,
  itemUrl,
  selectedSize,
  selectedSeller,
  subCategoryTypeName,
  oos,
  sizeAvailable,
  quantityAvailable,
  quantity,
  price,
  conflict,
  urgencyInfo,
  appliedCoupons,
  discountInfo,
  flags,
  toggleSizeDialog,
  toggleQuantityDialog,
  toggleStyleOffersPopup,
  offerId,
  couponApplied,
  offerData,
  comboComplete,
  styleOffers = [],
  prelaunch,
  systemAttributes: sysAttributes,
  productServiceabilityInfo,
  selectedForCheckout,
  isExchangeCart,
  masterCategoryTypeName,
  updateDeliveryEstimates,
  mexpressVisible,
  mexpressPlusVisible,
  setMexpressVisibility,
  setMexpressPlusVisibility,
  fineJwellerySteps,
  returnPeriod
}) => {
  const {
    discounts: { data: discountData }
  } = price;
  const itemOffers = getAttachedProductItemOffer(appliedCoupons) || {};
  const discount = DiscountUtil.getTradeDiscount(discountData);
  const personalizedCoupon = appliedCoupons
    ? appliedCoupons.find(
        data =>
          data.couponBucketType === CartConstants.PERSONALISED_COUPON_BUCKET
      )
    : {};
  const couponDiscount = discountData.find(data => data.name === 'coupon');
  const { inventory } = selectedSize;
  const ebMessage = getEarlyBirdMessage({ discountInfo, inventory });
  const itemName = getItemName(brand, name);
  let showQuantityNotAvailable = false,
    showEBMessage = false,
    showLowUnitCount = false,
    showProductUnavailable = false,
    showSizeNotAvailable = false,
    showExpiryDate = false,
    showServiceability = selectedForCheckout;

  const { hazmat, fragile, expirable } = flags;
  let expiryDate = null;

  if (expirable) {
    showExpiryDate =
      isFeatureEnabled('EXPIRY_BPC') &&
      get(selectedSeller, 'earlierExpiryDate');
    showExpiryDate && (expiryDate = get(selectedSeller, 'expiryDate'));
  }
  if (!oos) {
    if (prelaunch) {
      showProductUnavailable = true;
      showServiceability = false;
    } else if (!sizeAvailable) {
      showSizeNotAvailable = true;
      showServiceability = false;
      showExpiryDate = false;
    } else if (!quantityAvailable) {
      showQuantityNotAvailable = true;
      showServiceability = false;
      showExpiryDate = false;
    } else if (ebMessage) {
      showEBMessage = true;
    } else if (inventory < getKVPairValue('QUANTITY_LIMIT')) {
      showLowUnitCount = true;
    }
  } else {
    showServiceability = false;
    showExpiryDate = false;
  }

  const showEssentialTag =
    isFeatureEnabled('ESSENTIAL_TAG') && (hazmat || fragile);

  const showFineJwelleryReturn = isFeatureEnabled('SHOW_FINE_JWELLERY_RETURN');

  const triggerMexpressEvent = () => {
    if (!mexpressVisible) {
      setMexpressVisibility(() =>
        triggerEvent('MEXPRESS_LOAD', {
          custom: {
            widget: {
              name: 'mexpress-productload',
              data_set: {
                data: {
                  styleId: id,
                  skuID: skuId
                }
              }
            }
          }
        })
      );
    }
  };

  const triggerMexpressPlusEvent = deliveryEst => {
    if (!mexpressPlusVisible) {
      setMexpressPlusVisibility(() =>
        triggerEvent('MEXPRESS_PLUS_LOAD', {
          custom: {
            widget: {
              name: 'mexpressplus-productload',
              data_set: {
                data: {
                  styleId: id,
                  skuID: skuId,
                  deliveryEst: deliveryEst
                }
              }
            }
          }
        })
      );
    }
  };

  return (
    <div className={Style.details}>
      {showEssentialTag ? (
        <EssentialTag />
      ) : (
        <XceleratorTag
          xceleratorTagsPriorityList={getKVPairValue(
            'CART_XCELERATOR_TAG_PRIORITY'
          )}
          sysAttributes={sysAttributes}
        />
      )}
      <Urgency urgencyInfo={urgencyInfo} />

      {flags.freeItem ? (
        <div>
          <div className={Style.brand}>{brand}</div>
          <div className={Style.itemName}>{itemName}</div>
        </div>
      ) : (
        <div>
          <div className={Style.brand}>{brand}</div>
          <a className={Style.itemLink} href={itemUrl}>
            {itemName}
          </a>
        </div>
      )}
      <PreOrderTag show={flags.preOrderEnabled} />
      <SellerData selectedSeller={selectedSeller} conflict={conflict} />
      <div className={Style.sizeAndQtyContainer}>
        {!oos ? (
          <div className={Style.sizeAndQty}>
            <ImportSize
              {...selectedSize}
              oos={oos}
              available={sizeAvailable}
              toggleDialog={toggleSizeDialog}
              price={price}
              offerData={offerData}
              discount={discount}
              flags={flags}
              conflict={conflict}
              quantity={quantity}
            />
            {!showSizeNotAvailable ? (
              <ImportQuantity
                quantity={quantity}
                oos={oos}
                size={sizeAvailable}
                isFree={flags.freeItem}
                available={quantityAvailable}
                toggleDialog={toggleQuantityDialog}
              />
            ) : (
              <SizeNotAvailableMessage />
            )}
          </div>
        ) : (
          <OOSMessage />
        )}
        {/* {showLowUnitCount && <LowUnitCountMessage lowUnitCount={inventory} />} */}
      </div>
      {showProductUnavailable && <ProductUnavailableMessage />}
      {showQuantityNotAvailable && <QuantityNotAvailableMessage />}
      {/* <PriceComponent
        price={price}
        offerData={offerData}
        discount={discount}
        flags={flags}
        conflict={conflict}
        quantity={quantity}
        id={id}
        discountInfo={discountInfo}
      /> */}
      {showEBMessage && <EBMessage message={ebMessage} />}
      <div>
        {offerId && comboComplete && (
          <ItemComboDiscount {...discount} className={Style.discount} />
        )}
        <ItemPersonalizedDiscount {...personalizedCoupon} />
        <AttachProductDiscount
          isExchangeCart={isExchangeCart}
          itemOffers={itemOffers}
        />
        <ItemCouponDiscount
          itemOffers={itemOffers}
          {...couponDiscount}
          couponApplied={couponApplied}
          className={`${Style.discount} ${Style.couponDiscount}`}
        />
      </div>

      {showFineJwelleryReturn && (
        <FineJwellery
          mode="desktop"
          subCategoryTypeName={subCategoryTypeName}
          returnPeriod={returnPeriod}
          fineJwellerySteps={fineJwellerySteps}
          styleId={id}
          skuID={skuId}
        />
      )}

      {/* <ReturnPeriod
        returnPeriod={returnPeriod}
        subCategoryTypeName={subCategoryTypeName}
        returnable={get(flags, 'returnable')}
        exchangeable={get(flags, 'exchangeable')}
      /> */}

      {styleOffers.length > 0 && (
        <div className={Style.bankOfferText} onClick={toggleStyleOffersPopup}>
          + {styleOffers.length} Bank{' '}
          {styleOffers.length > 1 ? 'Offers' : 'Offer'} Available
          <DropDown className={Style.dropDown} />
        </div>
      )}
      <ReturnInfo
        returnable={get(flags, 'returnable')}
        exchangeable={get(flags, 'exchangeable')}
        freeItem={get(flags, 'freeItem')}
        masterCategory={masterCategoryTypeName}
      />
      <ServiceabilityInfo
        show={showServiceability}
        serviceabilityInfo={productServiceabilityInfo}
        isExchangeCart={isExchangeCart}
        updateDeliveryEstimates={updateDeliveryEstimates}
        triggerMexpressEvent={triggerMexpressEvent}
        triggerMexpressPlusEvent={triggerMexpressPlusEvent}
      />
      <ExpiryDate expiryDate={expiryDate} showExpiryDate={showExpiryDate} />
    </div>
  );
};

const ItemComponent = ({
  itemProps,
  state,
  actionHandlers,
  options,
  offerData,
  freeShipLostData,
  cartLevelFlags,
  dynamicStyles,
  offerComplete,
  updateDeliveryEstimates,
  comboComplete,
  updateDynamicStyles,
  mexpressVisible,
  mexpressPlusVisible,
  setMexpressPlusVisibility,
  setMexpressVisibility,
  lazyloadImage
}) => {
  const {
    showSizeDialog,
    showQuantityDialog,
    showComboDialogue,
    showAttachedProductsDeselectDialog,
    showMoveOutOfBagDialogue
  } = state;
  const {
    sizes,
    selectedSize,
    quantity,
    flags,
    selectedSeller,
    selectedForCheckout,
    isFirstItem = false,
    freeGiftBaseStyle
  } = itemProps;

  const { oos, sizeAvailable, quantityAvailable } = getAvailability({
    sizes,
    selectedSize,
    quantity,
    selectedSeller
  });
  const prelaunch =
    !get(cartLevelFlags, 'checkoutReady.value') && flags.preLaunchProduct;

  const itemOffers =
    getAttachedProductItemOffer(get(itemProps, 'appliedCoupons')) || {};
  const isAttachedProductEnable =
    isFeatureEnabled('ATTACHED_PRODUCTS') &&
    get(itemOffers, 'catalogueType') === 'attached_base' &&
    !get(itemProps, 'isExchangeCart');

  const isImageCachingEnabled = isFeatureEnabled('CART_IMAGE_CACHING');
  const isFreeGiftBaseItem =
    !get(itemProps, 'flags.freeItem', false) &&
    get(offerData, 'discountType', 0) ===
      CartConstants.FREE_GIFT_DISCOUNT_TYPE &&
    get(offerData, 'hasFreeItem', false);

  const isFreeGiftV1 =
    get(flags, 'freeItem', false) &&
    get(offerData, 'showFrgListPage', false) === false;

  const isSampleSelectorEnabled = isFeatureEnabled('SAMPLE_SELECTOR');

  const isFreeGiftV2 =
    isSampleSelectorEnabled &&
    get(itemProps, 'flags.freeItem', false) &&
    get(offerData, 'showFrgListPage', false);

  const freeGiftUrl = getFreeGiftUrl(freeGiftBaseStyle, true);

  const itemUrl = get(flags, 'freeItem')
    ? `${itemProps.itemUrl}&isFreeGift=true`
    : itemProps.itemUrl;

  const [isModalOpen, toggleModal] = useModal(false);
  const cancelIconConfig = { show: true, className: Style.modalCloseIcon };

  const handlePostMessage = e => {
    const postMessage = get(e, 'data', '');
    if (postMessage === CartConstants.FREE_GIFT_IFRAME_POSTMESSAGE) {
      window && window.location.reload();
    }
  };

  const fineJwellerySteps = get(itemProps, 'fineJwellerySteps');
  const returnPeriod = get(itemProps, 'returnPeriod');

  // Effect to handle post message from iframe for sample selector.
  useEffect(() => {
    window.addEventListener('message', handlePostMessage, false);
    return () => {
      window.removeEventListener('message', handlePostMessage, false);
    };
  }, []);

  // Effect to add a loader to iframe(sample selector) to avoid M-shell(Home page) display.
  useEffect(() => {
    if (isModalOpen) {
      const iframeDom = window.document.getElementById('iframeFrg');
      const iframeLoader = window.document.getElementById('iframeLoader');
      iframeDom &&
        iframeDom.addEventListener('load', () => {
          iframeLoader.style.display = 'none';
          iframeDom.style.opacity = 1;
        });
      return () => {
        iframeDom &&
          iframeDom.removeEventListener('load', () => {
            iframeLoader.style.display = 'none';
            iframeDom.style.opacity = 1;
          });
      };
    }
  }, [isModalOpen]);
  return (
    <React.Fragment>
      <div>
        {get(itemProps, 'flags.freeItem') && (
          <GiftItemLabel
            className={
              itemProps.itemDisabled
                ? Style.oosGiftItemContainer
                : Style.giftItemContainer
            }
            width={16}
            height={16}
          />
        )}
      </div>
      <div
        className={`${Style.item} ${
          itemProps.itemDisabled ? Style.disabledItem : ''
        }`}
      >
        <div className={Style.itemLeft}>
          {/* <SelectionIndicator
            className={Style.selectionIndicator}
            selectedForCheckout={selectedForCheckout}
            dynamicStyles={dynamicStyles}
            updateDynamicStyles={updateDynamicStyles}
            onClick={
              offerComplete && selectedForCheckout
                ? actionHandlers.toggleComboDialogue
                : isAttachedProductEnable
                ? actionHandlers.toggleAttachedProductsDialog
                : actionHandlers.toggleSelection
            }
            isFree={flags.freeItem}
            isFirstItem={isFirstItem}
          /> */}
          <ItemImage
            itemUrl={itemUrl}
            itemImage={itemProps.itemImage}
            flags={itemProps.flags}
            imageSize={{
              width: IMAGE_SIZE.width,
              height: IMAGE_SIZE.height
            }}
            useCachedImage={isImageCachingEnabled}
            lazyloadImage={lazyloadImage}
          />
        </div>
        <div className={Style.itemRight} style="padding-top: 25px; padding-left: 15px">
          <ItemDetails
            {...itemProps}
            {...actionHandlers}
            {...options}
            oos={oos}
            sizeAvailable={sizeAvailable}
            quantityAvailable={quantityAvailable}
            prelaunch={prelaunch}
            offerData={offerData}
            comboComplete={comboComplete}
            cartLevelFlags={cartLevelFlags}
            updateDeliveryEstimates={updateDeliveryEstimates}
            mexpressVisible={mexpressVisible}
            mexpressPlusVisible={mexpressPlusVisible}
            setMexpressPlusVisibility={setMexpressPlusVisibility}
            setMexpressVisibility={setMexpressVisibility}
            fineJwellerySteps={fineJwellerySteps}
            returnPeriod={returnPeriod}
          />
        </div>
        {!isFreeGiftV1 && (
          <div
            onClick={
              isFreeGiftBaseItem
                ? actionHandlers.toggleRemoveDialog
                : !isSampleSelectorEnabled && get(flags, 'freeItem') && oos
                ? actionHandlers.remove
                : actionHandlers.toggleMoveOutOfBagDialogue
            }
          >
            {/* <Close className={Style.closeIcon} /> */}
          </div>
        )}
        {isFreeGiftV2 && (
          <ButtonV2
            className={Style.button}
            containerClassname={Style.buttonContainer}
            text="CHANGE FREE GIFT"
            onClick={toggleModal}
          />
        )}
        {isModalOpen && (
          <SampleSelectorModal
            toggleModal={toggleModal}
            cancelIconConfig={cancelIconConfig}
            freeGiftUrl={freeGiftUrl}
          />
        )}
        {showSizeDialog && (
          <SizeDialog
            className={Style.editModal}
            {...itemProps}
            {...actionHandlers}
          />
        )}
        {showQuantityDialog && (
          <QtyDialog
            className={Style.editModal}
            {...itemProps}
            {...actionHandlers}
          />
        )}
        <WishlistDialog
          {...itemProps}
          {...actionHandlers}
          show={state.showWishlistDialog}
          halfCard={false}
          freeShipLostData={freeShipLostData}
          selectedForCheckout={selectedForCheckout}
        />
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={showMoveOutOfBagDialogue}
          {...actionHandlers}
          freeGiftUrl={freeGiftUrl}
          toggleSampleSelectorModal={toggleModal}
          image={itemProps.itemImage}
          flags={flags}
          mode="desktop"
        />
        <RemoveDialog
          {...itemProps}
          {...actionHandlers}
          show={state.showRemoveDialog}
          halfCard={false}
          offerData={offerData}
          freeShipLostData={freeShipLostData}
          selectedForCheckout={selectedForCheckout}
        />
        <DeselectComboDialog
          showComboDialogue={showComboDialogue}
          {...actionHandlers}
          image={itemProps.itemImage}
        />
        <DeselectAttachedProductDialog
          showAttachedProductsDeselectDialog={
            showAttachedProductsDeselectDialog
          }
          {...actionHandlers}
          itemOffers={itemOffers}
          image={itemProps.itemImage}
          halfCard={false}
          styleId={itemProps.id}
        />
        <StyleOffersPopup
          heading="Offers on this product"
          styleOffers={itemProps.styleOffers}
          {...actionHandlers}
          show={state.showStyleOffersPopup}
          halfCard={false}
          className={Style.infoModal}
        />
      </div>
    </React.Fragment>
  );
};

const ItemContainer = props => {
  const discountType = get(props, 'itemGroup.groupData.discountType', 0);
  const comboComplete = get(props, 'itemGroup.groupData.comboComplete');
  const hasFreeItem = get(props, 'itemGroup.groupData.hasFreeItem', false);
  const freeGiftOOS = !!get(
    props,
    'itemGroup.groupData.frgSlabComboParams',
    []
  ).find(slab =>
    get(slab, 'freeGiftInfo', []).find(
      gift => get(gift, 'outOfStock', false) === true
    )
  );
  const offerComplete =
    discountType === CartConstants.FREE_GIFT_DISCOUNT_TYPE
      ? hasFreeItem && !freeGiftOOS
      : get(props, 'itemGroup.groupData.conditionComplete');

  return (
    <div
      className={
        props.itemGroup.groupedBy === CartConstants.GROUP_BY_OFFER
          ? offerComplete
            ? Style.comboOfferComplete
            : Style.comboOfferInComplete
          : Style.itemMargin
      }
    >
      <CommonItemContainer
        {...props}
        itemComponent={ItemComponent}
        offerComplete={offerComplete}
        comboComplete={comboComplete}
      />
    </div>
  );
};

export default ItemContainer;
