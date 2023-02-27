import React, { useCallback, useState } from 'react';
import get from 'lodash/get';

import ToolTip from 'commonComp/ToolTip';
import CartConstants from 'commonBrowserUtils/CartConstants';
import { priceChangeTypes } from 'commonUtils/constants';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { isApp, restrictMultipleClickOnLink } from 'commonBrowserUtils/Helper';
import {
  getAttachedProductItemOffer,
  getFreeGiftUrl
} from 'commonBrowserUtils/CartHelper';
import XceleratorTag from '../../../common/XceleratorTag';
import ExpiryDate from '../../../common/ExpiryDate';
import { windowEvents, navigationHeader } from 'commonUtils/constants';

// Styles
import Style from './itemContainer.base.css';

import PriceDrop from 'iconComp/PriceDrop.jsx';
import Info from 'iconComp/Info.jsx';
import DropDown from 'iconComp/DropDown.jsx';
import Close from 'iconComp/Close.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';

import {
  Amount,
  CommonItemContainer,
  AttachProductDiscount,
  ItemCouponDiscount,
  ItemDiscount,
  ItemImage,
  ItemPersonalizedDiscount,
  LowUnitCountMessage,
  OOSMessage,
  EssentialTag,
  PreOrderTag,
  ProductUnavailableMessage,
  Quantity,
  QuantityNotAvailableMessage,
  RemoveDialog,
  WishlistDialog,
  ReturnInfo,
  SellerData,
  Size,
  SizeNotAvailableMessage,
  StrikedAmount,
  StyleOffersPopup,
  Urgency,
  EBMessage,
  SelectionIndicator,
  DeselectComboDialog,
  DeselectAttachedProductDialog,
  ServiceabilityInfo,
  MoveOutOfBagModal,
  CartViews,
  getPriceChangeIcon,
  GiftItemLabel
} from '../../../common/ItemComponents';

import { SizeDialog, QtyDialog } from '../../Dialogs';

import { OfferDiscountText } from '../../../common/ItemOfferComponents';

import FineJwellery from '../../../common/FineJwellery';
import ReturnPeriod from '../../../common/ReturnPeriod';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import {
  getAvailability,
  getEarlyBirdMessage,
  getItemName
} from 'commonBrowserUtils/CartHelper';
import { currencyValue, throttle, isPWA } from 'commonBrowserUtils/Helper';
import ButtonV2 from 'commonComp/ButtonV2';
import ViewSimilarButton from '../../ViewSimilar/ViewSimilarButton';
import Modal from 'commonComp/Modal';
import ViewSimilarStrip from '../../ViewSimilar/ViewSimilarStrip';
import ViewSimilarStripModal from '../../ViewSimilar/ViewSimilarStripModal';

const IMAGE_SIZE = { width: 111, height: 148 };
const AOC_V2_STRIP_HEIGHT = 61;
const { NO_CHANGE, INCREASED } = priceChangeTypes;

const PriceComponent = props => {
  const {
    price,
    offerData,
    comboComplete,
    discount,
    flags = {},
    conflict,
    quantity,
    priceChangeType,
    id,
    showPriceChangeAlert
  } = props;
  const isCartMessagingRevamp = isFeatureEnabled('CART_MESSAGING_REVAMP');
  const isCartStrikeOffMRP = isFeatureEnabled('CART_STRIKE_OFF_MRP');
  const priceChanged = priceChangeType !== NO_CHANGE;
  const isInc = priceChangeType === INCREASED;
  let priceToShow = price.subTotal;
  const priceIncIcon = showPriceChangeAlert && priceChanged && isInc && (
    <PriceDrop className={Style.priceIncIcon} />
  );
  const priceDecIcon =
    get(conflict, 'price.state') === 'CONFLICTED' &&
    getPriceChangeIcon({ value: priceToShow, conflict, quantity });

  let priceChangeToolTip = null;

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
            quantity > 1 ? priceToShow / quantity : priceToShow
          }`}
        </div>
      </ToolTip>
    );
  }

  const amount = <Amount value={priceToShow} quantity={quantity} />;

  var comp = null;
  if (price.mrp < 1) {
    comp = (
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
    comp = (
      <div className={Style.price}>
        {!isCartMessagingRevamp && priceIncIcon}
        {amount}
        <OfferDiscountText flags={flags} />
        {priceChangeToolTip}
      </div>
    );
  } else {
    const isDiscountTimerEnabled = isFeatureEnabled('DISCOUNT_EXPIRY_TIMER');
    const strikedAmount = (
      <StrikedAmount value={price.mrp} className={Style.strikedAmount} />
    );

    comp = (
      <div
        className={`${Style.price} ${isDiscountTimerEnabled &&
          Style.discountInfo}`}
      >
        {!isCartMessagingRevamp && priceIncIcon}
        {!isCartMessagingRevamp && priceDecIcon}
        {isCartStrikeOffMRP ? [strikedAmount, amount] : [amount, strikedAmount]}
        <OfferDiscountText
          {...offerData}
          styleId={id}
          discountEntry={discount}
          flags={flags}
        />
        {!flags.freeItem && (
          <ItemDiscount {...props} comboComplete={comboComplete} />
        )}
        {priceChangeToolTip}
      </div>
    );
  }
  if (!isCartMessagingRevamp && get(conflict, 'price.state') === 'CONFLICTED') {
    const oldPrice = get(conflict, 'price.oldPrice', null);
    const toolTipComp = (
      <ToolTip
        className={`${Style.oldPriceTooltip} ${Style.bold}`}
        elem={comp}
        tipClass={Style.oldPriceTooltipStyle}
      >
        The previous price of this item was{' '}
        <div className={Style.oldPrice}>
          <RupeeBold className={`${Style.tooltipRupeeIcon}`} />
          {oldPrice && currencyValue(oldPrice)}
        </div>
      </ToolTip>
    );
    comp = toolTipComp;
  }

  return comp;
};

const ItemDetails = ({
  id,
  skuId = '',
  name,
  brand,
  itemUrl,
  selectedSeller,
  selectedSize,
  subCategoryTypeName,
  oos,
  sizeAvailable,
  quantityAvailable,
  quantity,
  price,
  conflict,
  urgencyInfo,
  discountInfo,
  flags,
  appliedCoupons,
  toggleSizeDialog,
  toggleQuantityDialog,
  toggleStyleOffersPopup,
  offerId,
  couponApplied,
  offerData,
  comboComplete,
  styleOffers = [],
  prelaunch,
  returnPeriod,
  cartItemsReturnInfo = {},
  systemAttributes: sysAttributes,
  priceChangeType,
  showPriceChangeAlert,
  productServiceabilityInfo,
  selectedForCheckout,
  isExchangeCart,
  masterCategoryTypeName,
  updateDeliveryEstimates,
  mexpressVisible,
  mexpressPlusVisible,
  handleCartAction,
  setMexpressPlusVisibility,
  setMexpressVisibility,
  isNewUser,
  fineJwellerySteps
}) => {
  const isShowViewSimilar =
    (oos || !sizeAvailable) && isFeatureEnabled('CART_OOS_SIMILAR');
  const [isShowViewSimilarModal, setIsShowViewSimilarModal] = useState(false);
  const itemOffers = getAttachedProductItemOffer(appliedCoupons) || {};
  let { inventory } = selectedSize;
  const ebMessage = getEarlyBirdMessage({ discountInfo, inventory });
  const {
    discounts: { data: discountData }
  } = price;

  const { hazmat, fragile, expirable } = flags;
  let showExpiryDate = false;
  let expiryDate = null;

  if (expirable) {
    showExpiryDate =
      isFeatureEnabled('EXPIRY_BPC') &&
      get(selectedSeller, 'earlierExpiryDate');
    showExpiryDate && (expiryDate = get(selectedSeller, 'expiryDate'));
  }

  const discount = DiscountUtil.getTradeDiscount(discountData);
  const couponDiscount = discountData.find(data => data.name === 'coupon');
  const itemName = getItemName(brand, name);
  let showQuantityNotAvailable = false,
    showEBMessage = false,
    showLowUnitCount = false,
    showProductUnavailable = false,
    showSizeNotAvailable = false,
    showServiceability = selectedForCheckout;

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
    } else if (
      inventory < getKVPairValue('QUANTITY_LIMIT') ||
      (isApp() &&
        inventory <= getGrowthHackConfigValue('FOMO_INVENTORY_THRESHOLD'))
    ) {
      showLowUnitCount = true;
    }
  } else {
    showServiceability = false;
  }

  const personalizedCoupon = appliedCoupons
    ? appliedCoupons.find(
        data =>
          data.couponBucketType === CartConstants.PERSONALISED_COUPON_BUCKET
      ) || {}
    : {};

  const showEssentialTag =
    isFeatureEnabled('ESSENTIAL_TAG') && (hazmat || fragile);

  const showFineJwelleryReturn = isFeatureEnabled('SHOW_FINE_JWELLERY_RETURN');

  const showFomo =
    isApp() &&
    inventory <= getGrowthHackConfigValue('FOMO_INVENTORY_THRESHOLD') &&
    !oos;

  const liveCartViews = get(urgencyInfo, 'pdpCount');
  const { minLimit } = getGrowthHackConfigValue('CART_VIEWS');
  const showCartViews = liveCartViews >= minLimit;

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

  const handlToggleSimilarModal = useCallback(() => {
    setIsShowViewSimilarModal(vsm => !vsm);
  }, []);

  const [timerExpired, setTimerExpired] = useState(false);

  const timerCallback = () => {
    setTimerExpired(true);
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
          <a
            className={Style.itemLink}
            href={itemUrl}
            onClick={restrictMultipleClickOnLink}
          >
            {itemName}
          </a>
        </div>
      )}
      <PreOrderTag show={flags.preOrderEnabled} />
      <SellerData selectedSeller={selectedSeller} conflict={conflict} />
      {showCartViews && <CartViews liveViews={liveCartViews} />}
      <div
        className={`${Style.sizeAndQtyContainer} ${
          showFomo ? Style.sizeAndQtyFomo : ''
        }`}
      >
        {!oos ? (
          <div className={Style.sizeAndQty}>
            <Size
              {...selectedSize}
              oos={oos}
              available={sizeAvailable}
              toggleDialog={toggleSizeDialog}
            />
            {!showSizeNotAvailable ? (
              <Quantity
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
        {showLowUnitCount && <LowUnitCountMessage lowUnitCount={inventory} />}
      </div>
      {showProductUnavailable && <ProductUnavailableMessage />}
      {showQuantityNotAvailable && <QuantityNotAvailableMessage />}
      <PriceComponent
        price={price}
        offerId={offerId}
        discount={discount}
        discountInfo={discountInfo}
        timerExpired={timerExpired}
        timerCallback={timerCallback}
        offerData={offerData}
        comboComplete={comboComplete}
        conflict={conflict}
        flags={flags}
        quantity={quantity}
        priceChangeType={priceChangeType}
        showPriceChangeAlert={showPriceChangeAlert}
        id={id}
      />
      {isShowViewSimilar && (
        <ViewSimilarButton onClick={handlToggleSimilarModal} />
      )}
      {isShowViewSimilarModal && (
        <ViewSimilarStripModal
          styleId={id}
          handleCartAction={handleCartAction}
          handlToggleSimilarModal={handlToggleSimilarModal}
        />
      )}

      {showEBMessage && <EBMessage message={ebMessage} />}
      <ItemPersonalizedDiscount {...personalizedCoupon} />
      <AttachProductDiscount
        isExchangeCart={isExchangeCart}
        itemOffers={itemOffers}
      />
      <ItemCouponDiscount
        itemOffers={itemOffers}
        {...couponDiscount}
        couponApplied={couponApplied}
      />
      {showFineJwelleryReturn && (
        <FineJwellery
          mode="mobile"
          returnPeriod={returnPeriod}
          subCategoryTypeName={subCategoryTypeName}
          fineJwellerySteps={fineJwellerySteps}
          id={id}
          skuID={skuId}
        />
      )}

      <ReturnPeriod
        returnPeriod={returnPeriod}
        subCategoryTypeName={subCategoryTypeName}
        returnable={get(flags, 'returnable')}
        exchangeable={get(flags, 'exchangeable')}
      />

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
        returnPeriod={returnPeriod}
        cartItemsReturnInfo={cartItemsReturnInfo}
        freeItem={get(flags, 'freeItem')}
        masterCategory={masterCategoryTypeName}
        isNewUser={isNewUser}
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

class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.productRef = React.createRef();
    this.topScreenBoundary = isPWA()
      ? navigationHeader.HEIGHT + AOC_V2_STRIP_HEIGHT
      : AOC_V2_STRIP_HEIGHT;
    ['onScroll'].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const isFirstItem = get(this.props, 'itemProps.isFirstItem', false);
    if (isFirstItem) {
      this.throttledScroll = throttle(this.onScroll, 50);
      window.addEventListener('scroll', this.throttledScroll);
    }
  }

  componentWillUnmount() {
    const isFirstItem = get(this.props, 'itemProps.isFirstItem', false);
    isFirstItem && window.removeEventListener('scroll', this.throttledScroll);
  }

  onScroll() {
    const firstItemTop = get(this, 'props.itemProps.firstItemTop');
    const node = get(this, 'productRef.current', null);
    if (!node) return;
    const firstProductScrolled =
      node.getBoundingClientRect().top + node.clientHeight <
      this.topScreenBoundary;
    window.dispatchEvent(
      new CustomEvent(
        `${
          firstProductScrolled
            ? windowEvents.SLIDE_OUT_OF_VIEW_EVENT_NAME
            : windowEvents.SLIDE_INTO_VIEW_EVENT_NAME
        }`,
        { detail: { topBorder: firstItemTop + node.clientHeight - 61 } }
      )
    );
  }

  render() {
    const {
      itemProps,
      state,
      actionHandlers,
      options,
      offerData,
      freeShipLostData,
      cartLevelFlags,
      cartItemsReturnInfo,
      showPriceChangeAlert,
      highlightProductsSelection,
      offerComplete,
      comboComplete,
      dynamicStyles,
      updateDynamicStyles,
      updateDeliveryEstimates,
      mexpressVisible,
      mexpressPlusVisible,
      setMexpressVisibility,
      setMexpressPlusVisibility,
      handleCartAction,
      lazyloadImage
    } = this.props;

    const {
      sizes,
      selectedSize,
      quantity,
      flags,
      selectedSeller = {},
      selectedForCheckout,
      isFirstItem = false,
      freeGiftBaseStyle
    } = itemProps;
    const isCartOosSimilarEnabled = isFeatureEnabled('CART_OOS_SIMILAR');
    const { oos, sizeAvailable, quantityAvailable } = getAvailability({
      sizes,
      selectedSize,
      quantity,
      selectedSeller
    });
    const prelaunch =
      !get(cartLevelFlags, 'checkoutReady.value') && flags.preLaunchProduct;
    const {
      showSizeDialog,
      showQuantityDialog,
      showComboDialogue,
      showAttachedProductsDeselectDialog,
      showMoveOutOfBagDialogue
    } = state;

    const itemOffers =
      getAttachedProductItemOffer(get(itemProps, 'appliedCoupons')) || {};
    const isAttachedProductEnable =
      isFeatureEnabled('ATTACHED_PRODUCTS') &&
      get(itemOffers, 'catalogueType') === 'attached_base' &&
      !get(itemProps, 'isExchangeCart');

    const isImageCachingEnabled = isFeatureEnabled('CART_IMAGE_CACHING');

    const isSampleSelectorEnabled = isFeatureEnabled('SAMPLE_SELECTOR');

    const isNewUser = get(
      freeShipLostData,
      'userDetails.isFirstTimeCustomer',
      false
    );

    const isFreeGiftV2 =
      isSampleSelectorEnabled &&
      get(itemProps, 'flags.freeItem', false) &&
      get(offerData, 'showFrgListPage', false);

    const isFreeGiftBaseItem =
      !get(itemProps, 'flags.freeItem', false) &&
      get(offerData, 'discountType', 0) ===
        CartConstants.FREE_GIFT_DISCOUNT_TYPE &&
      (get(offerData, 'hasFreeItem', false) ||
        get(offerData, 'conditionComplete', false));

    const isFreeGiftV1 =
      get(itemProps, 'flags.freeItem', false) &&
      get(offerData, 'showFrgListPage', false) === false;

    const freeGiftUrl = getFreeGiftUrl(freeGiftBaseStyle, isApp());

    const itemUrl = get(flags, 'freeItem')
      ? `${itemProps.itemUrl}&isFreeGift=true`
      : itemProps.itemUrl;

    const fineJwellerySteps = get(itemProps, 'fineJwellerySteps');
    const returnPeriod = get(itemProps, 'returnPeriod');

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
              width={14}
              height={14}
            />
          )}
        </div>
        <div
          className={`${Style.item} ${
            itemProps.itemDisabled ? Style.disabledItem : ''
          }`}
          ref={this.productRef}
        >
          <SelectionIndicator
            className={Style.selectionIndicator}
            selectedForCheckout={selectedForCheckout}
            highlightProductsSelection={highlightProductsSelection}
            dynamicStyles={dynamicStyles}
            updateDynamicStyles={updateDynamicStyles}
            onClick={
              offerComplete && selectedForCheckout
                ? actionHandlers.toggleComboDialogue
                : isAttachedProductEnable
                ? actionHandlers.toggleAttachedProductsDialog
                : actionHandlers.toggleSelection
            }
            isFirstItem={isFirstItem}
            isFree={flags.freeItem}
          />
          <div className={Style.itemLeft}>
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
          <div className={Style.itemRight}>
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
              cartItemsReturnInfo={cartItemsReturnInfo}
              showPriceChangeAlert={showPriceChangeAlert}
              updateDeliveryEstimates={updateDeliveryEstimates}
              mexpressVisible={mexpressVisible}
              mexpressPlusVisible={mexpressPlusVisible}
              setMexpressVisibility={setMexpressVisibility}
              setMexpressPlusVisibility={setMexpressPlusVisibility}
              handleCartAction={handleCartAction}
              isNewUser={isNewUser}
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
              <Close className={Style.closeIcon} />
            </div>
          )}
          {isFreeGiftV2 && (
            <ButtonV2
              className={Style.button}
              containerClassname={Style.buttonContainer}
              text="CHANGE FREE GIFT"
              onClick={() => SHELL.redirectTo(freeGiftUrl)}
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
          <MoveOutOfBagModal
            showMoveOutOfBagDialogue={showMoveOutOfBagDialogue}
            {...actionHandlers}
            freeGiftUrl={freeGiftUrl}
            flags={get(itemProps, 'flags')}
            image={itemProps.itemImage}
            mode="mobile"
            handleCartAction={handleCartAction}
            styleId={itemProps?.id}
            isShowSimilarProducts={
              (oos || !sizeAvailable) && isCartOosSimilarEnabled
            }
          />
          <DeselectComboDialog
            showComboDialogue={showComboDialogue}
            {...actionHandlers}
            image={itemProps.itemImage}
            mode="mobile"
          />
          <DeselectAttachedProductDialog
            showAttachedProductsDeselectDialog={
              showAttachedProductsDeselectDialog
            }
            {...actionHandlers}
            itemOffers={itemOffers}
            image={itemProps.itemImage}
            halfCard={true}
            styleId={itemProps.id}
          />
          <WishlistDialog
            {...itemProps}
            {...actionHandlers}
            show={state.showWishlistDialog}
            halfCard={true}
          />
          <RemoveDialog
            {...itemProps}
            {...actionHandlers}
            show={state.showRemoveDialog}
            halfCard={true}
            offerData={offerData}
            className={Style.infoModal}
            freeShipLostData={freeShipLostData}
            selectedForCheckout={selectedForCheckout}
          />
          <StyleOffersPopup
            heading="Offers on this product"
            styleOffers={itemProps.styleOffers}
            {...actionHandlers}
            show={state.showStyleOffersPopup}
            halfCard={true}
            isMobile={true}
            className={Style.infoModal}
          />
        </div>
      </React.Fragment>
    );
  }
}

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
      key={props.key}
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

export { ItemContainer, PriceComponent };
