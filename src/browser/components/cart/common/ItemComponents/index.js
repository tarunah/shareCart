import React, { useEffect, useRef } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Common components
import ImageBanner from 'commonComp/ImageBanner';
import Image from 'commonComp/Image';
import Modal from 'commonComp/Modal';
import { FadeInAndOut, DelayedRender } from 'commonComp/Animation';
import Timer from 'commonComp/Timer';
import discountInPercentage from './Discount/discountInPercentage';
import discountInRupee from './Discount/discountInRupee';
// Utils
import { getDeliverRangeInfo, getDeliveryDateRange } from '@myntra/range-util';
import {
  getUrgencyMessage,
  getAttachedProductItemOffer,
  triggerAttachedProductsEvent,
  triggerFrgLoadEvent,
  getEstimate
} from 'commonBrowserUtils/CartHelper';
import {
  currencyValue,
  isLoggedIn,
  restrictMultipleClickOnLink,
  setViewportReference,
  getSingularOrPluralText,
  getHoursDiff,
  getRoundedTime
} from 'commonBrowserUtils/Helper';
import { getCookie, setCookie } from 'commonUtils/helper';
import {
  getItemSavings,
  isFreeShippingLost
} from 'commonBrowserUtils/FreeShipLostUtil';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import CartConstants from 'commonBrowserUtils/CartConstants';
import { cookieKeys } from 'commonUtils/constants';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';

// Styles
import Style from './itemComponents.base.css';
import ToolTip from 'commonComp/ToolTip';

import Item from '../Item';
import { OfferHeader, OfferFooter } from '../ItemOfferComponents';
import { ItemGroupHeader } from '../ItemGroupComponents';
import ConfirmOrCancelModal, {
  ModalContent
} from 'commonComp/ConfirmOrCancelModal';

import Info from 'iconComp/Info.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import DropDown from 'iconComp/DropDown.jsx';
import PriceDrop from 'iconComp/PriceDrop.jsx';
import Check from 'iconComp/Check.jsx';
import OfferIcon from 'iconComp/Offers.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import ProductInactive from 'iconComp/ProductInactive.jsx';
import GreenTruck from 'iconComp/GreenTruck.jsx';
import Eye from 'iconComp/Eye.jsx';
import Gift from 'iconComp/Gift.jsx';
import MExpress from 'iconComp/MExpress.jsx';
import ReturnLeft from 'iconComp/ReturnLeft.jsx';
import PlusIcon from 'iconComp/PlusIcon.jsx';

import {
  isMobileMode,
  formatDate,
  getDateDiff,
  getTimeBasedDate,
  getFullDateDiff
} from 'commonBrowserUtils/Helper';
import { getAbtest } from 'commonUtils/abtestManager';
import sanitize from 'commonUtils/Sanitize';
import Strings, { DELIVERY_TEXT } from '../../../../utils/Strings';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import ViewSimilarStrip from '../../mobile/ViewSimilar/ViewSimilarStrip';

export const ItemComboDiscount = props => {
  const { value, className } = props;
  const comboDiscount = value ? currencyValue(value) : '0';
  if (comboDiscount !== '0') {
    return (
      <div className={`${Style.itemComboDiscount} ${className || ''}`}>
        {' '}
        Combo Discount: <Rupee className={Style.comboRupeeIcon} />
        {comboDiscount}
      </div>
    );
  }
  return null;
};

export const ItemCouponDiscount = props => {
  const {
    value: couponValue,
    couponApplied,
    className,
    itemOffers = {}
  } = props;

  const isCatalogueY = get(itemOffers, 'catalogueType') === 'attached_discount';
  const additionalOfferValue = isCatalogueY
    ? get(itemOffers, 'couponDiscount')
    : 0;
  let couponDiscount = couponValue ? couponValue - additionalOfferValue : '0';
  if (couponDiscount <= 0) {
    couponDiscount = '0';
  }
  if (couponApplied) {
    if (couponDiscount !== '0') {
      return (
        <div className={`${Style.itemCouponDiscount} ${className || ''}`}>
          {' '}
          Coupon Discount: <Rupee className={Style.comboRupeeIcon} />
          {currencyValue(couponDiscount)}
        </div>
      );
    }
  }
  return null;
};

export const AttachProductDiscount = props => {
  const { itemOffers, isExchangeCart } = props;
  const isCatalogueY = get(itemOffers, 'catalogueType') === 'attached_discount';
  if (isCatalogueY && !isExchangeCart) {
    return (
      <div className={`${Style.itemCouponDiscount}`}>
        {get(itemOffers, 'description')}
      </div>
    );
  }
  return null;
};

export const ItemPersonalizedDiscount = props => {
  const { coupon, className } = props;
  if (coupon) {
    return (
      <div className={`${Style.itemPersonalizedDiscount} ${className || ''}`}>
        Pre-Applied deal <span>{`${coupon}`}</span>
      </div>
    );
  } else {
    return null;
  }
};

export const ItemTradeDiscount = props => {
  let {
    meta,
    value,
    discountInfo = {},
    timerExpired = false,
    timerCallback = () => {}
  } = props;

  let unit, discountInPercent, discountInValue;

  meta = meta || {};

  const { discountTimerStartTime = 0, discountTimerEndTime = 0 } = discountInfo;
  const isDiscountTimerEnabled =
    isFeatureEnabled('DISCOUNT_EXPIRY_TIMER') &&
    discountTimerStartTime &&
    new Date().getTime() > discountTimerStartTime &&
    !timerExpired;

  unit = meta.unit;
  discountInPercent = meta.value;
  discountInValue = value ? currencyValue(value) : '0';

  if (unit === 'PERCENT') {
    return discountInPercentage(
      `${discountInPercent}% OFF`,
      Style.itemDiscount,
      isDiscountTimerEnabled,
      discountTimerEndTime,
      timerCallback
    );
  } else if (discountInValue !== '0') {
    return discountInRupee(
      discountInValue,
      Style.itemDiscount,
      isDiscountTimerEnabled,
      discountTimerEndTime,
      timerCallback
    );
  }
  return null;
};

export const ItemDiscount = props => {
  const {
    price,
    offerId,
    comboComplete,
    comboDiscountClass,
    discountInfo,
    timerExpired = false,
    timerCallback = () => {}
  } = props;
  const {
    discounts: { data: discountData }
  } = price;
  const discount = DiscountUtil.getTradeDiscount(discountData);
  return offerId && comboComplete ? (
    <ItemComboDiscount {...discount} className={comboDiscountClass} />
  ) : (
    <ItemTradeDiscount
      {...discount}
      discountInfo={discountInfo}
      timerExpired={timerExpired}
      timerCallback={timerCallback}
    />
  );
};

export const getPriceChangeIcon = ({ value, conflict = {}, quantity }) => {
  const oldPrice = conflict.oldPrice;
  const newPrice = quantity > 1 ? value / quantity : value;
  return oldPrice > newPrice ? (
    <PriceDrop className={Style.priceDropIcon} />
  ) : null;
};

export const Amount = ({
  value,
  className,
  conflict,
  quantity,
  bold = true
}) => {
  conflict = conflict || {};
  const previousAmount = get(conflict, 'price.oldPrice', null);
  return (
    <div
      className={`${Style.price} ${bold ? Style.bold : ''} ${className || ''}`}
    >
      {get(conflict, 'price.state') === 'CONFLICTED' ? (
        <ToolTip
          className={`${Style.priceChangeTooltip} ${Style.toolTipText}`}
          elem={
            <div>
              {getPriceChangeIcon({ value, conflict, quantity })}
              <RupeeBold className={`${Style.rupeeIcon}`} />
              <span> {currencyValue(value)}</span>
            </div>
          }
        >
          The previous price of this item was{' '}
          <div className={Style.previousAmount}>
            <RupeeBold className={`${Style.rupeeIconTooltip}`} />
            {previousAmount && currencyValue(previousAmount)}
          </div>
        </ToolTip>
      ) : (
        <div>
          {bold ? (
            <RupeeBold className={Style.rupeeBoldIcon} />
          ) : (
            <Rupee className={Style.rupeeBoldIcon} />
          )}
          {currencyValue(value)}
        </div>
      )}
    </div>
  );
};

export const StrikedAmount = ({ value, className, iconClassName }) => {
  const isDiscountTimerEnabled = isFeatureEnabled('DISCOUNT_EXPIRY_TIMER');
  return (
    <span
      className={`${
        isDiscountTimerEnabled
          ? Style.discountStrikedAmount
          : Style.strikedAmount
      }`}
    >
      <span className={`${Style.price} ${Style.strike} ${className || ''}`}>
        <RupeeStriked className={`${Style.rupeeIcon} ${iconClassName || ''}`} />
        {currencyValue(value)}
      </span>
    </span>
  );
};

export const EssentialTag = () => (
  <div className={Style.essentialTag}>Essential</div>
);

export const PreOrderTag = ({ show }) =>
  show ? <div className={Style.preOrderTag}>PRE-ORDER</div> : null;

export const SellerData = props => {
  const { selectedSeller, conflict } = props;
  const { name = '' } = selectedSeller || {};
  const { seller = {} } = conflict || {};
  const oldSeller =
    seller && seller.state === 'CONFLICTED'
      ? (seller.oldSeller || {}).name
      : null;
  return name ? (
    <div className={Style.sellerContainer}>
      <div className={Style.sellerData}>Sold by: {name}</div>
      {oldSeller && (
        <ToolTip
          className={Style.sellerToolTip}
          elem={<Info className={Style.toolTipIcon} />}
          tipClass={Style.tipStyle}
        >
          <div>
            Seller of this item has changed from{' '}
            <span className={Style.bold}>{oldSeller}</span> to{' '}
            <span className={Style.bold}>{name}</span>.
          </div>
        </ToolTip>
      )}
    </div>
  ) : null;
};

export const Size = ({ label, toggleDialog, available, oos }) => (
  <div className={Style.size} onClick={!oos ? toggleDialog : null}>
    <span className={available && !oos ? '' : Style.unavailable}>
      Size: {label}
    </span>
    {!oos && <DropDown className={Style.dropDown} />}
  </div>
);

export const ImportSize = ({ label, toggleDialog, available, oos }) => (
  <div className={Style.size}>
    <span className={available && !oos ? '' : Style.unavailable}>
      Size: {label}
    </span>
    {/* {!oos && <DropDown className={Style.dropDown} />} */}
  </div>
);

export const Quantity = ({
  quantity,
  toggleDialog,
  available,
  oos,
  size,
  isFree
}) => {
  const toggleEnabled = !oos && size && !isFree;
  return (
    <div
      className={Style.quantity}
      onClick={toggleEnabled ? toggleDialog : null}
    >
      <span className={available && !oos ? '' : Style.unavailable}>
        Qty: {quantity}
      </span>
      {/* {toggleEnabled && <DropDown className={Style.dropDown} />} */}
    </div>
  );
};

export const ImportQuantity = ({
  quantity,
  toggleDialog,
  available,
  oos,
  size,
  isFree
}) => {
  const toggleEnabled = !oos && size && !isFree;
  return (
    <div
      className={Style.quantity}
    >
      <span className={available && !oos ? '' : Style.unavailable}>
        Qty: {quantity}
      </span>
      {/* {toggleEnabled && <DropDown className={Style.dropDown} />} */}
    </div>
  );
};

export const QuantityNotAvailableMessage = () => (
  <div className={Style.availabilityMessage}>
    Selected quantity not available
  </div>
);

export const EBMessage = ({ message }) => (
  <div className={Style.availabilityMessage}>{message}</div>
);

export const ProductUnavailableMessage = () => (
  <div className={Style.availabilityMessage}>Product Unavailable</div>
);

export const SizeNotAvailableMessage = () => (
  <div className={Style.sizeNotAvailable}>Size not available</div>
);

export const OOSMessage = () => {
  return <div className={Style.oosMessage}>Item out of stock</div>;
};

export const LowUnitCountMessage = ({ lowUnitCount }) => (
  <div className={Style.lowUnitCount}>{`${lowUnitCount} left`}</div>
);

export const Urgency = ({ urgencyInfo }) => {
  const urgencyMsg = getUrgencyMessage({ urgencyInfo });
  return urgencyMsg ? <div className={Style.urgency}>{urgencyMsg}</div> : null;
};

export const ReturnInfo = ({
  returnable,
  exchangeable,
  returnPeriod,
  cartItemsReturnInfo,
  freeItem,
  masterCategory = '',
  isNewUser = false
}) => {
  let highlightedMessage, message;

  /* Show return policy on item card if
    1. AB variant is `oncard` OR
    2. AB variant is `onstrip` but all products don't have the same return policy
  */
  const productsSameReturnPolicy =
    get(cartItemsReturnInfo, 'sameReturnPeriod', false) &&
    (get(cartItemsReturnInfo, 'allReturnable', false) ||
      get(cartItemsReturnInfo, 'allExchangeable', false));
  const showNewReturnPolicyOnCard =
    isFeatureEnabled('RETURN_POLICY_ON_ITEM_CARD') ||
    (isFeatureEnabled('RETURN_POLICY_ON_INFO_STRIP') &&
      (!productsSameReturnPolicy ||
        get(cartItemsReturnInfo, 'cartCount') == 1));

  if (showNewReturnPolicyOnCard) {
    if (returnable) {
      highlightedMessage = `${returnPeriod} Days Easy Return`;
      if (!exchangeable) {
        message = ' (non exchangable)';
      }
    } else if (exchangeable) {
      highlightedMessage = `${returnPeriod} Days Easy Exchange`;
      message = ' (non returnable)';
    }
  } else {
    if (!returnable && exchangeable) {
      highlightedMessage = 'Exchange Only';
    }
  }

  const isNewUserReturnPolicyFgEnable = isFeatureEnabled(
    'RETURN_POLICY_ON_NEW_USER'
  );
  const isShowNewUserReturnPolicy =
    isNewUserReturnPolicyFgEnable && (isNewUser || !isLoggedIn());

  if (isShowNewUserReturnPolicy) {
    if (returnable) {
      highlightedMessage = `Hassle free ${getSingularOrPluralText(
        returnPeriod,
        'Day',
        'Days',
        true
      )} Return`;
      if (!exchangeable) {
        message = ' (non exchangable)';
      }
    } else if (exchangeable) {
      highlightedMessage = `Hassle free ${getSingularOrPluralText(
        returnPeriod,
        'Day',
        'Days',
        true
      )} Exchange`;
      message = ' (non returnable)';
    }
  }

  if (!returnable && !exchangeable) {
    highlightedMessage = 'Not returnable';
  }

  if (
    masterCategory.toLowerCase() === 'personal care' &&
    !freeItem &&
    isFeatureEnabled('BPC_RETURN')
  ) {
    highlightedMessage = get(getKVPairValue('BPC_RETURN'), 'message') || '';
  }

  return message || highlightedMessage ? (
    <div className={Style.returnInfoContainer}>
      <div className={Style.returnPolicyMessage}>
        {isShowNewUserReturnPolicy && (
          <div className={Style.deliveryIconStyle}>
            <ReturnLeft className={Style.returnLeftIcon} />
          </div>
        )}
        <div className={`${Style.messageText} ${Style.message}`}>
          <span className={isShowNewUserReturnPolicy ? '' : Style.highlight}>
            {highlightedMessage}
          </span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export const FreeShipLostText = ({ itemSavings }) => {
  return (
    <div>
      <div className={Style.benefitsAlertText}>
        You may have to
        <span className={Style.benefitsLoseText}>
          {' '}
          pay convenience fee{itemSavings === 0 ? '!' : ''}
        </span>
        {itemSavings > 0 && (
          <span>
            <span> and miss out on saving </span>
            <span className={`${Style.currencyValue} ${Style.itemSavingValue}`}>
              <Rupee className={Style.rupeeIconGreen} />
              {currencyValue(itemSavings)}
            </span>
          </span>
        )}
      </div>
      <div>Do you still want to remove it?</div>
    </div>
  );
};

export const FreeShipLostSubText = ({ shippingChargeLimit }) => {
  return (
    <div>
      <span>No convenience fee for orders above </span>
      <span className={Style.currencyValue}>
        <Rupee className={Style.rupeeIconGrey} />
        {currencyValue(shippingChargeLimit)}.
      </span>
    </div>
  );
};

export const RemoveItemBenefitsDialog = ({ freeShipLostData }) => {
  return (
    <div className={Style.removeDialogText}>
      <div className={Style.removeDialogTextHeading}>
        <RemoveItemDialogText freeShipLostData={freeShipLostData} />
      </div>
      <div className={Style.removeDialogTextSubHeading}>
        <RemoveItemDialogSubText freeShipLostData={freeShipLostData} />
      </div>
    </div>
  );
};

export const RemoveItemDialogText = ({ freeShipLostData }) => {
  const { isFreeShipLost, itemSavings } = freeShipLostData || {};
  if (isFreeShipLost) {
    return <FreeShipLostText itemSavings={itemSavings} />;
  } else {
    return 'Remove Item';
  }
};

export const RemoveItemDialogSubText = ({ freeShipLostData }) => {
  const { isFreeShipLost, shippingChargeLimit } = freeShipLostData || {};
  if (isFreeShipLost) {
    return <FreeShipLostSubText shippingChargeLimit={shippingChargeLimit} />;
  } else {
    return 'Are you sure you want to remove this item?';
  }
};

export const AttachedProductWarningModal = props => {
  const {
    image,
    showModal,
    cancelCallback,
    halfCard,
    itemOffers,
    button1Config,
    button2Config,
    heading,
    description,
    context,
    styleId
  } = props;

  const payload = {
    context,
    action: 'cancel',
    styleId
  };

  const btnClassName = Style.warningButton;
  const offerAmount = (get(itemOffers, 'offerAmounts') || []).reduce(
    (sum, offerAmount) => {
      return (sum += offerAmount);
    },
    0
  );

  return (
    <ConfirmOrCancelModal
      showModal={showModal}
      modalConfig={{
        className: halfCard ? '' : Style.warningModal,
        cancelCallback: () =>
          triggerAttachedProductsEvent(payload, cancelCallback),
        cancelIconConfig: { show: true },
        halfCard
      }}
      button1Config={button1Config}
      button2Config={button2Config}
      btnClassName={btnClassName}
    >
      <div className={Style.warningHeading}>{heading}</div>
      <div className={Style.warningContent}>
        <div className={Style.modelDialogImage}>
          {image && <Image src={image} width={50} height={66} visible="true" />}
        </div>
        <div className={Style.removeDialogText}>
          <div className={Style.removeDialogTextHeading}>{description}</div>
          <div className={Style.warningTextSubHeading}>
            <ImageBanner
              name="additional-offer"
              className={Style.warningIcon}
              width={40}
            />
            <div className={Style.warningDescription}>
              You will lose{' '}
              <span className={Style.offerAmount}>
                &#8377;{currencyValue(offerAmount)} Offer{' '}
              </span>
              if you remove this item.
            </div>
          </div>
        </div>
      </div>
    </ConfirmOrCancelModal>
  );
};

const FreeGiftV2RemoveModal = props => {
  const {
    cancelCallback,
    image,
    heading,
    halfCard,
    showModal,
    remove,
    messageType,
    freeGiftButtonConfig
  } = props;

  const description = 'Are you sure you want to remove this item?';
  const primaryButtonConfig = {
    text: 'REMOVE',
    clickHandler: remove,
    className: Style.removeInlineButton
  };

  const warningCallouts = {
    hasFreeGift: `You will lose <span class=${Style.offerAmount}>added free gift</span> if you remove this item.`,
    addFreeGift: `You are eligible for a <span class=${Style.offerAmount}>free gift</span> on this item`,
    retainFreeGift: `This is a <span class=${Style.offerAmount}>free gift item</span>.You will lose this offer`
  };

  const warningText = get(warningCallouts, `${messageType}`, '');

  return (
    <ConfirmOrCancelModal
      showModal={showModal}
      modalConfig={{
        cancelCallback,
        cancelIconConfig: { show: true },
        halfCard,
        className: halfCard
          ? Style.freeGiftModalMobile
          : Style.freeGiftModalDesktop
      }}
      button1Config={primaryButtonConfig}
      button2Config={freeGiftButtonConfig}
    >
      <div className={Style.warningHeading}>{heading}</div>
      <div className={Style.warningContent}>
        <div className={Style.modelDialogImage}>
          {image && <Image src={image} width={50} height={66} visible="true" />}
        </div>
        <div className={Style.freeGiftRemoveDialogText}>
          <div className={Style.freeGiftRemoveDialogTextHeading}>
            {description}
          </div>
          <div className={Style.freeGiftWarningTextSubHeading}>
            <Gift width={24} height={25} />
            <div
              className={`${Style.warningDescription} ${Style.warningTextMargin}`}
              dangerouslySetInnerHTML={{ __html: sanitize(warningText) }}
            />
          </div>
        </div>
      </div>
    </ConfirmOrCancelModal>
  );
};

export const RemoveItemModal = props => {
  const { image, showModal, cancelCallback, halfCard, className } = props;
  let { freeShipLostData } = props;

  const { price, shippingData } = freeShipLostData;

  const itemSavings = getItemSavings(price);
  const isFreeShipLost = isFreeShippingLost(freeShipLostData);
  const shippingChargeLimit = shippingData && shippingData.shippingChargeLimit;
  const benefitsLost = isFreeShipLost;

  freeShipLostData = {
    ...freeShipLostData,
    isFreeShipLost,
    shippingChargeLimit,
    itemSavings
  };

  const button1Config = {
    text: 'Remove',
    clickHandler: props.removeCallback,
    className: Style.inlineButton
  };

  const button2Config = {
    text: benefitsLost ? "Don't Remove" : 'MOVE TO WISHLIST',
    clickHandler: benefitsLost ? cancelCallback : props.moveToWishlistCallback,
    className: `${Style.moveSC} ${Style.inlineButton}`
  };

  const btnClassName = benefitsLost
    ? Style.benefitsLostDialogActionSC
    : Style.removeDialogActionSC;

  return (
    <ConfirmOrCancelModal
      showModal={showModal}
      modalConfig={{
        className: className || Style.infoModal,
        cancelCallback,
        cancelIconConfig: { show: true },
        halfCard
      }}
      button1Config={button1Config}
      button2Config={button2Config}
      btnClassName={btnClassName}
    >
      <div className={Style.removeDialogContent}>
        <div className={Style.modelDialogImage}>
          {image && <Image src={image} width={58} height={77} visible="true" />}
        </div>
        <RemoveItemBenefitsDialog freeShipLostData={freeShipLostData} />
      </div>
    </ConfirmOrCancelModal>
  );
};

export const ItemImage = ({
  itemUrl,
  itemImage,
  flags,
  imageSize: { width, height },
  options = {},
  onImageClick,
  useCachedImage,
  lazyloadImage
}) => {
  const onItemImageClick = event => {
    restrictMultipleClickOnLink(event);
    onImageClick && onImageClick();
  };

  let itemImageComponent = null;
  if (flags.isFree) {
    itemImageComponent = (
      <Image
        src={itemImage}
        width={width}
        height={height}
        visible="true"
        useCachedImage={useCachedImage}
        lazyLoad={lazyloadImage}
      />
    );
  } else if (options.newTabRedirection) {
    itemImageComponent = (
      <a href={itemUrl} rel="" target="_blank" onClick={onItemImageClick}>
        <Image
          src={itemImage}
          width={width}
          height={height}
          visible="true"
          useCachedImage={useCachedImage}
          lazyLoad={lazyloadImage}
        />
      </a>
    );
  } else {
    itemImageComponent = (
      <a href={itemUrl} onClick={onItemImageClick}>
        <Image
          src={itemImage}
          width={width}
          height={height}
          visible="true"
          useCachedImage={useCachedImage}
          lazyLoad={lazyloadImage}
        />
      </a>
    );
  }
  return itemImageComponent;
};

export const RemoveDialog = props => {
  const {
    className,
    show,
    itemImage,
    toggleRemoveDialog,
    wishlistFromRemove,
    remove,
    halfCard,
    price,
    sizes,
    quantity,
    skuId,
    virtualBundleInfo,
    selectedSeller,
    selectedForCheckout,
    isExchangeCart,
    id,
    offerData = {}
  } = props;

  let { freeShipLostData } = props;
  freeShipLostData = {
    ...freeShipLostData,
    price,
    sizes,
    quantity,
    skuId,
    selectedSeller: selectedSeller || {},
    virtualBundleInfo,
    selectedForCheckout,
    isExchangeCart
  };
  const payload = {
    context: 'remove',
    action: 'keep',
    styleId: id
  };

  const button1Config = {
    text: 'Remove',
    clickHandler: remove,
    className: Style.removeInlineButton
  };

  const button2Config = {
    text: 'Keep this Item',
    clickHandler: () =>
      triggerAttachedProductsEvent(payload, toggleRemoveDialog),
    className: Style.removeInlineButton2
  };

  const heading = 'Remove Item?';
  const description = 'Are you sure you want to remove this item?';
  const itemOffers = getAttachedProductItemOffer(get(props, 'appliedCoupons'));
  const showWarningModal =
    isFeatureEnabled('ATTACHED_PRODUCTS') &&
    get(itemOffers, 'catalogueType') === 'attached_base' &&
    !isExchangeCart;

  const { hasFreeItem = false, conditionComplete, discountType } = offerData;
  const isFreeGiftBaseItem =
    discountType === CartConstants.FREE_GIFT_DISCOUNT_TYPE &&
    !!(hasFreeItem || conditionComplete);

  const freeGiftButtonConfig = hasFreeItem
    ? {
        text: 'KEEP THIS ITEM',
        clickHandler: toggleRemoveDialog,
        className: Style.removeInlineButton2
      }
    : {
        text: 'MOVE TO WISHLIST',
        clickHandler: wishlistFromRemove,
        className: Style.removeInlineButton2
      };

  if (showWarningModal) {
    return (
      <AttachedProductWarningModal
        styleId={id}
        image={itemImage}
        itemOffers={itemOffers}
        cancelCallback={toggleRemoveDialog}
        halfCard={halfCard}
        showModal={show}
        button1Config={button1Config}
        button2Config={button2Config}
        heading={heading}
        description={description}
        context="remove"
      />
    );
  } else if (isFreeGiftBaseItem) {
    return (
      <FreeGiftV2RemoveModal
        image={itemImage}
        cancelCallback={toggleRemoveDialog}
        halfCard={halfCard}
        showModal={show}
        heading={heading}
        remove={remove}
        messageType={hasFreeItem ? 'hasFreeGift' : 'addFreeGift'}
        freeGiftButtonConfig={freeGiftButtonConfig}
      />
    );
  } else {
    return (
      <RemoveItemModal
        className={className || ''}
        image={itemImage}
        cancelCallback={toggleRemoveDialog}
        moveToWishlistCallback={wishlistFromRemove}
        removeCallback={remove}
        halfCard={halfCard}
        freeShipLostData={freeShipLostData}
        showModal={show}
      />
    );
  }
};

export const WishlistDialog = props => {
  const {
    show,
    itemImage,
    toggleWishlistDialog,
    moveToWishlist,
    halfCard,
    id,
    isExchangeCart
  } = props;

  const payload = {
    context: 'wishlist',
    action: 'keep',
    styleId: id
  };

  const button1Config = {
    text: 'Move to Wishlist',
    clickHandler: () => moveToWishlist('Wishlist'),
    className: Style.removeInlineButton
  };

  const button2Config = {
    text: 'Keep this Item',
    clickHandler: () =>
      triggerAttachedProductsEvent(payload, toggleWishlistDialog),
    className: Style.removeInlineButton2
  };

  const heading = 'Move to wishlist Item?';
  const description = 'Are you sure you want to move this item to wishlist?';

  const itemOffers = getAttachedProductItemOffer(get(props, 'appliedCoupons'));
  const showWarningModal =
    isFeatureEnabled('ATTACHED_PRODUCTS') &&
    get(itemOffers, 'catalogueType') === 'attached_base' &&
    !isExchangeCart;
  if (showWarningModal) {
    return (
      <AttachedProductWarningModal
        styleId={id}
        image={itemImage}
        itemOffers={itemOffers}
        halfCard={halfCard}
        cancelCallback={toggleWishlistDialog}
        showModal={show}
        button1Config={button1Config}
        button2Config={button2Config}
        heading={heading}
        description={description}
        context="wishlist"
      />
    );
  }
  return null;
};

export const DeselectAttachedProductDialog = props => {
  const {
    showAttachedProductsDeselectDialog,
    halfCard,
    toggleAttachedProductsDialog,
    toggleSelection,
    image,
    styleId,
    itemOffers
  } = props;

  const payload = {
    context: 'deselect',
    action: 'keep',
    styleId
  };

  const button1Config = {
    text: 'Deselect Item',
    clickHandler: toggleSelection,
    className: Style.removeInlineButton
  };

  const button2Config = {
    text: 'Keep this Item',
    clickHandler: () =>
      triggerAttachedProductsEvent(payload, toggleAttachedProductsDialog),
    className: Style.removeInlineButton2
  };

  const heading = 'Deselect Item?';
  const description = 'Are you sure you want to deselect this item?';
  const showWarningModal =
    isFeatureEnabled('ATTACHED_PRODUCTS') &&
    get(itemOffers, 'catalogueType') === 'attached_base';
  if (showWarningModal) {
    return (
      <AttachedProductWarningModal
        styleId={styleId}
        image={image}
        itemOffers={itemOffers}
        cancelCallback={toggleAttachedProductsDialog}
        halfCard={halfCard}
        showModal={showAttachedProductsDeselectDialog}
        button1Config={button1Config}
        button2Config={button2Config}
        heading={heading}
        description={description}
        context="deselect"
      />
    );
  }
  return null;
};

export const DeselectComboDialog = props => {
  const {
    showComboDialogue,
    mode,
    toggleComboDialogue,
    toggleSelection,
    image
  } = props;
  const isMobile = mode === 'mobile';
  return (
    <ConfirmOrCancelModal
      showModal={showComboDialogue}
      modalConfig={{
        halfCard: isMobile,
        cancelCallback: toggleComboDialogue,
        cancelIconConfig: { show: true, className: '' },
        className: isMobile ? Style.modalMobile : Style.modalDesktop
      }}
      button1Config={{
        text: 'DESELECT ITEM',
        clickHandler: toggleSelection
      }}
      button2Config={{
        text: 'KEEP THE COMBO',
        clickHandler: toggleComboDialogue,
        className: Style.rightButton
      }}
    >
      <ModalContent
        imageConfig={{ imageSrc: image }}
        title="Deselect item(s)"
        text="A combo has applied on this item. Are you sure you want to deselect and dismiss the combo?"
        textClassName={Style.comboText}
      />
    </ConfirmOrCancelModal>
  );
};

export const MoveOutOfBagModal = props => {
  const {
    showMoveOutOfBagDialogue,
    toggleMoveOutOfBagDialogue,
    isShowSimilarProducts = false,
    handleCartAction,
    styleId,
    remove,
    moveToWishlist,
    image,
    mode,
    freeGiftUrl = '',
    toggleSampleSelectorModal = () => {},
    flags = {}
  } = props;
  const isMobile = isMobileMode(mode);
  const isFreeGift = get(flags, 'freeItem');
  const heading = 'Remove Gift Item?';
  const freeGiftButtonConfig = isFeatureEnabled('SAMPLE_SELECTOR')
    ? {
        text: 'CHANGE FREE GIFT',
        clickHandler: e => {
          toggleMoveOutOfBagDialogue(e, () => {
            if (isMobile) {
              SHELL.redirectTo(freeGiftUrl);
            } else {
              toggleSampleSelectorModal && toggleSampleSelectorModal();
            }
          });
        },
        className: Style.removeInlineButton2
      }
    : {
        text: 'KEEP THIS ITEM',
        clickHandler: toggleMoveOutOfBagDialogue,
        className: Style.removeInlineButton2
      };
  if (isFreeGift) {
    return (
      <FreeGiftV2RemoveModal
        image={image}
        cancelCallback={toggleMoveOutOfBagDialogue}
        halfCard={isMobile}
        showModal={showMoveOutOfBagDialogue}
        heading={heading}
        remove={remove}
        messageType={'retainFreeGift'}
        freeGiftButtonConfig={freeGiftButtonConfig}
      />
    );
  } else {
    return (
      <ConfirmOrCancelModal
        showModal={showMoveOutOfBagDialogue}
        modalConfig={{
          halfCard: isMobile,
          cancelCallback: toggleMoveOutOfBagDialogue,
          cancelIconConfig: { show: true, className: Style.modalCloseIcon },
          className: `${isMobile ? Style.modalMobile : Style.modalDesktop} ${
            Style.modalMoveOutOfBag
          }`
        }}
        button1Config={{
          text: 'REMOVE',
          clickHandler: remove
        }}
        button2Config={{
          text: 'MOVE TO WISHLIST',
          clickHandler: moveToWishlist,
          className: Style.rightButton
        }}
      >
        <ModalContent
          imageConfig={{
            imageSrc: image,
            imgWidth: 48,
            imgHeight: 64
          }}
          title="Move from Bag"
          text={
            isShowSimilarProducts
              ? Strings.CONSIDER_SIMILAR_ITEMS
              : Strings.MOVE_ITEMS_TO_BAG
          }
        />
        {isShowSimilarProducts && (
          <ViewSimilarStrip
            styleId={styleId}
            handleCartAction={handleCartAction}
            isMoveToBag={true}
          />
        )}
      </ConfirmOrCancelModal>
    );
  }
};

const CommonItemContainerHeader = ({
  itemsList,
  groupData,
  groupedBy,
  isSampleSelectorEnabled
}) => {
  if (groupedBy === CartConstants.GROUP_BY_OFFER) {
    return (
      <OfferHeader
        offerData={groupData}
        isSampleSelectorEnabled={isSampleSelectorEnabled}
        itemsList={itemsList}
      />
    );
  } else if (groupedBy !== CartConstants.NO_GROUP_ITEMS) {
    const itemCount = itemsList.reduce(
      (itemCount, item) => itemCount + item.quantity,
      0
    );

    return <ItemGroupHeader header={groupData.name} itemCount={itemCount} />;
  } else {
    return null;
  }
};

const CommonItemContainerFooter = ({
  groupData,
  isSampleSelectorEnabled,
  itemsList
}) => {
  const isFreeGift =
    get(groupData, 'discountType') === CartConstants.FREE_GIFT_DISCOUNT_TYPE;
  const hasFreeItem = get(groupData, 'hasFreeItem', false);
  const unlockableSlab = get(groupData, 'frgSlabComboParams', []).find(
    ({ minMore }) => minMore > 0
  );

  if (
    !isFreeGift ||
    !isSampleSelectorEnabled ||
    !unlockableSlab ||
    !hasFreeItem
  )
    return null;
  useEffect(() => {
    triggerFrgLoadEvent(itemsList, groupData, 'free_gift_upgrade', true);
  }, [groupData.id]);

  return <OfferFooter unlockableSlab={unlockableSlab} itemsList={itemsList} />;
};

export const ToolTipMessage = ({
  className = '',
  style = {},
  children,
  onClick
}) => (
  <div>
    <div className={`${Style.toolTipContainer} ${className}`} style={style}>
      {children}
    </div>
    <div />
  </div>
);

export class SelectionIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolTip:
        props.isFirstItem && !getCookie(cookieKeys.SELECTIVE_CHECKOUT_TOOLTIP)
    };
    this.onCTAClick = this.onCTAClick.bind(this);
    this.selectionIndication = React.createRef();
  }

  componentDidMount() {
    const {
      props: { updateDynamicStyles, isFirstItem },
      selectionIndication
    } = this;
    isFirstItem &&
      get(selectionIndication, 'current', false) &&
      selectionIndication.current.addEventListener('animationend', () => {
        updateDynamicStyles('highlightProductsSelection', false);
      });
  }

  onCTAClick(e) {
    const SELECTIVE_TOOLTIP_COOKIE_EXPIRY = 3600 * 24 * 365 * 1000;

    this.setState({ showToolTip: false });
    setCookie(
      cookieKeys.SELECTIVE_CHECKOUT_TOOLTIP,
      true,
      SELECTIVE_TOOLTIP_COOKIE_EXPIRY
    );
    e.stopPropagation();
  }

  render() {
    const {
      selectedForCheckout,
      dynamicStyles,
      className,
      onClick,
      isFree
    } = this.props;
    const { showToolTip } = this.state;
    if (isFree) return null;
    const iconClassName = selectedForCheckout
      ? Style.activeProduct
      : Style.inactiveProduct;
    const highlight =
      !selectedForCheckout &&
      get(dynamicStyles, 'highlightProductsSelection', false);
    const productInactiveClass = !selectedForCheckout
      ? highlight
        ? Style.noOpacity
        : Style.reduceOpacity
      : '';

    return (
      <div
        className={`${Style.selectionIconContainer} ${className}`}
        onClick={onClick}
      >
        {this.props.isFirstItem && (
          <React.Fragment>
            {showToolTip && (
              <div
                className={Style.invisibleBackDrop}
                onClick={this.onCTAClick}
              />
            )}
            <DelayedRender delay={300}>
              <FadeInAndOut display={showToolTip}>
                <ToolTipMessage>
                  <div>
                    Select items that you want to buy now and proceed. Remaining
                    items will stay in your bag.
                  </div>
                  <div className={Style.toolTipCTA} onClick={this.onCTAClick}>
                    Ok, Got it
                  </div>
                </ToolTipMessage>
              </FadeInAndOut>
            </DelayedRender>
          </React.Fragment>
        )}
        <div
          className={`${Style.animationContainer} ${
            highlight ? Style.selectionHighlight : ''
          }`}
          ref={this.selectionIndication}
        >
          {selectedForCheckout ? (
            <CheckboxActive
              className={`${iconClassName} ${productInactiveClass}`}
            />
          ) : (
            <ProductInactive
              className={`${iconClassName} ${productInactiveClass}`}
            />
          )}
        </div>
      </div>
    );
  }
}

export const CommonItemContainer = props => {
  const {
    itemGroup,
    handleCartAction,
    options,
    imageSize,
    itemComponent: ItemComponent,
    freeShipLostData,
    cartLevelFlags,
    cartItemsReturnInfo,
    priceChangedList,
    showPriceChangeAlert,
    dynamicStyles,
    offerComplete,
    comboComplete,
    updateDynamicStyles,
    isExchangeCart,
    updateDeliveryEstimates,
    mexpressVisible,
    mexpressPlusVisible,
    setMexpressPlusVisibility,
    setMexpressVisibility,
    lazyloadImage = false
  } = props;

  const { groupData, groupedBy, itemsList } = itemGroup || {};

  const freeGiftBaseStyle = itemsList.find(
    ({ flags }) => get(flags, 'freeItem', false) === false
  );

  const isSampleSelectorEnabled = isFeatureEnabled('SAMPLE_SELECTOR');

  return (
    <div>
      <CommonItemContainerHeader
        {...itemGroup}
        isSampleSelectorEnabled={isSampleSelectorEnabled}
      />
      {itemsList.map((eachItem, itemIndex) => {
        return (
          <Item
            key={eachItem.itemId}
            handleCartAction={handleCartAction}
            isFirstItem={itemIndex === 0 && get(options, 'groupIndex') === 0}
            freeGiftBaseStyle={freeGiftBaseStyle}
            {...eachItem}
            imageSize={imageSize}
            priceChangedList={priceChangedList}
            isExchangeCart={isExchangeCart}
            fineJwellerySteps={get(props, 'fineJwellerySteps', {})}
            render={(itemProps, state, actionHandlers) => (
              <ItemComponent
                itemProps={itemProps}
                state={state}
                actionHandlers={actionHandlers}
                options={options}
                offerData={
                  groupedBy === CartConstants.GROUP_BY_OFFER
                    ? groupData
                    : undefined
                }
                freeShipLostData={freeShipLostData}
                cartLevelFlags={cartLevelFlags}
                cartItemsReturnInfo={cartItemsReturnInfo}
                priceChangedList={priceChangedList}
                showPriceChangeAlert={showPriceChangeAlert}
                updateDynamicStyles={updateDynamicStyles}
                dynamicStyles={dynamicStyles}
                offerComplete={offerComplete}
                updateDeliveryEstimates={updateDeliveryEstimates}
                comboComplete={comboComplete}
                mexpressVisible={mexpressVisible}
                mexpressPlusVisible={mexpressPlusVisible}
                setMexpressPlusVisibility={setMexpressPlusVisibility}
                setMexpressVisibility={setMexpressVisibility}
                handleCartAction={handleCartAction}
                lazyloadImage={lazyloadImage}
              />
            )}
          />
        );
      })}
      <CommonItemContainerFooter
        {...itemGroup}
        isSampleSelectorEnabled={isSampleSelectorEnabled}
      />
    </div>
  );
};

export const StyleOffersPopup = props => {
  const {
    heading,
    styleOffers,
    halfCard = true,
    className,
    show,
    isMobile
  } = props;

  return show ? (
    <Modal
      className={className || Style.infoModal}
      cancelCallback={props.toggleStyleOffersPopup}
      cancelIconConfig={{ show: true, className: Style.offerModalCancel }}
      halfCard={halfCard}
    >
      <div className={Style.styleOffersPopup}>
        <OfferIcon className={Style.offerIcon} />
        <div className={Style.offersPopupHeading}>{heading}</div>
        <ul className={Style.offerList}>
          {styleOffers.map((offer, key) => {
            return (
              <li className={Style.listItem} key={key}>
                {offer.ruleMessage}
                <a
                  className={Style.melonBold}
                  href={`/online-fashion-store?f=${encodeURIComponent(
                    'Bank Offers:' + offer.ruleTitle
                  )}`}
                  target={isMobile ? '_self' : '_blank'}
                  onClick={restrictMultipleClickOnLink}
                >
                  View Eligible Products {'>'}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  ) : null;
};

const OrderBy = ({ estimate, updateDeliveryEstimates }) => {
  const dateDiff = getFullDateDiff(estimate);
  if (dateDiff.hours >= 0 && dateDiff.minutes >= 0 && dateDiff.seconds >= 0) {
    return (
      <div>
        {`If ordered within `}
        <Timer
          hours={dateDiff.hours}
          minutes={dateDiff.minutes}
          seconds={dateDiff.seconds}
          className={Style.orderByTimer}
          stopCallback={updateDeliveryEstimates}
        />
      </div>
    );
  } else {
    return null;
  }
};

const RangeBasedDates = (promiseDate, showRangeBasedDate) => {
  const RangeBasedBucketName = getAbtest('RANGE_BASED_PROMISE');
  const rangeBasedInfo = getDeliverRangeInfo(
    Number(promiseDate),
    RangeBasedBucketName
  );

  if (rangeBasedInfo?.isRangeApplicable) {
    !showRangeBasedDate.current &&
      triggerEvent('RANGE_BASED_PROMISE', {
        custom: {
          custom: {
            v1: new Date(Number(promiseDate))
          }
        }
      });
    showRangeBasedDate.current = true;
    return getDeliveryDateRange(
      Number(promiseDate),
      RangeBasedBucketName,
      rangeBasedInfo.diff
    );
  }
  return formatDate(promiseDate);
};

export const DeliveryEstimate = ({
  shippingEstimates,
  updateDeliveryEstimates,
  triggerMexpressEvent,
  triggerMexpressPlusEvent
}) => {
  const showRangeBasedDate = useRef(null);
  let estimate,
    shippingMethod,
    deliveryIcon,
    isSpeed11 = false,
    config = {};

  let est = getEstimate(shippingEstimates);
  if (!est) return null;
  estimate = est?.estimate;
  isSpeed11 = est?.isSpeed11;

  const { orderWithinTimer, deliveryTimer } = getKVPairValue(
    'MEXPRESSPLUS_CONFIG'
  );
  const daysDiff = getDateDiff('', estimate.promiseDate);
  const hoursDiff = getHoursDiff('', estimate.promiseDate);
  const mexpress = get(estimate, 'expressLabelMap.MEXPRESS', '');
  const mexpressplus = get(estimate, 'expressLabelMap.MEXPRESSPLUS', '');
  shippingMethod = estimate.shippingMethod;
  if (isVariantEnabled('MEXPRESSPLUS_VARIANT_C') && mexpressplus) {
    const deliveryBy = getRoundedTime(estimate.promiseDate);
    const deliveryEst =
      shippingMethod &&
      deliveryTimer &&
      shippingMethod in deliveryTimer &&
      hoursDiff <= deliveryTimer[shippingMethod]
        ? deliveryBy.hours + deliveryBy.suffix + ' today'
        : 'today';
    deliveryIcon = (
      <span>
        <MExpress className={Style.expressIcon} />
        <span
          className={`${Style.expressText} ${Style.mexpressPlus}`}
          ref={node =>
            setViewportReference(
              node,
              { threshold: 1 },
              triggerMexpressPlusEvent(deliveryEst)
            )
          }
        >
          EXPRESS
          <span className={Style.expressPlusIcon}>
            <PlusIcon className={Style.plusicon} />
          </span>
        </span>
      </span>
    );
    return (
      <div>
        <div className={`${Style.message} ${Style.deliveryDateContainer}`}>
          <div className={Style.deliveryIconStyle}>{deliveryIcon}</div>
          <div className={`${Style.messageText} ${Style.message}`}>
            <span>
              {'Delivery by '}
              <span className={Style.mexpressplusDeliverTime}>
                {deliveryEst}
              </span>
            </span>
          </div>
        </div>
        <div className={Style.orderWithinTimer}>
          {hoursDiff <= orderWithinTimer && (
            <OrderBy
              estimate={estimate.orderBy}
              updateDeliveryEstimates={updateDeliveryEstimates}
            />
          )}
        </div>
      </div>
    );
  } else if (!isVariantEnabled('MEXPRESSPLUS_VARIANT_A') && mexpress) {
    deliveryIcon = (
      <span>
        <MExpress className={Style.expressIcon} />
        <span
          className={Style.expressText}
          ref={node =>
            setViewportReference(node, { threshold: 1 }, triggerMexpressEvent)
          }
        >
          EXPRESS
        </span>
      </span>
    );
    config = {
      showTime: false,
      thresholdDays: daysDiff
    };
  } else {
    deliveryIcon = isSpeed11 ? (
      <GreenTruck className={Style.greenTruckIcon} />
    ) : (
      <Check className={Style.checkIcon} />
    );
  }
  const date =
    isSpeed11 || mexpress
      ? getTimeBasedDate(estimate.promiseDate, config)
      : RangeBasedDates(estimate.promiseDate, showRangeBasedDate);

  const orderByEnabled = isFeatureEnabled('CART_ITEM_ORDER_BY');
  return (
    <div>
      <div className={`${Style.message} ${Style.deliveryDateContainer}`}>
        <div className={Style.deliveryIconStyle}>{deliveryIcon}</div>
        <div className={`${Style.messageText} ${Style.message}`}>
          <span>
            {showRangeBasedDate.current
              ? DELIVERY_TEXT.deliveryBetween
              : date.includes('days')
              ? DELIVERY_TEXT.deliveryIn
              : DELIVERY_TEXT.deliveryBy}
          </span>
          <span
            className={`${Style.highlightedMessage} ${
              isSpeed11 ? Style.speed11Highlight : ''
            }`}
          >
            {` ${date}`}
          </span>
        </div>
      </div>
      <div className={Style.orderWithinTimer}>
        {isSpeed11 && orderByEnabled && (
          <OrderBy
            estimate={estimate.orderBy}
            updateDeliveryEstimates={updateDeliveryEstimates}
          />
        )}
      </div>
    </div>
  );
};

export const ServiceabilityInfo = ({
  serviceabilityInfo,
  show,
  isExchangeCart,
  updateDeliveryEstimates,
  triggerMexpressEvent,
  triggerMexpressPlusEvent
}) => {
  if (
    (!isFeatureEnabled('ADDRESS_ON_CART_V2') && !isExchangeCart) ||
    !serviceabilityInfo ||
    !show
  ) {
    return null;
  }
  const serviceable =
    get(serviceabilityInfo, 'pincodeInfo.serviceable') || false;

  if (!serviceable) {
    return (
      <div className={Style.serviceabilityErrorMessage}>
        {(getKVPairValue('NON_SERVICEABLE_CART_ERROR') || {}).item}
      </div>
    );
  }

  const { alterationAvailable, tryNBuyAvailable } = serviceabilityInfo;
  const shippingEstimates = get(
    serviceabilityInfo,
    'pincodeInfo.shippingEstimates',
    []
  );
  const showAvailableService =
    !isExchangeCart && !isFeatureEnabled('HIDE_AVAILABLE_SERVICE_INFO');

  return (
    <div className={Style.messageContainer}>
      {serviceable && !isEmpty(shippingEstimates) && (
        <DeliveryEstimate
          shippingEstimates={shippingEstimates}
          updateDeliveryEstimates={updateDeliveryEstimates}
          triggerMexpressEvent={triggerMexpressEvent}
          triggerMexpressPlusEvent={triggerMexpressPlusEvent}
        />
      )}

      {showAvailableService && tryNBuyAvailable && (
        <div className={Style.message}>
          <Check className={Style.checkIcon} />
          Eligible for Try & Buy
        </div>
      )}

      {showAvailableService && alterationAvailable && (
        <div className={Style.message}>
          <Check className={Style.checkIcon} />
          Eligible for Alteration
        </div>
      )}
    </div>
  );
};

export const CartViews = props => {
  const { liveViews } = props;
  const { cartViewText } = getGrowthHackConfigValue('CART_VIEWS');
  return (
    <div className={Style.cartViewsContainer}>
      <Eye width={16} height={16} />
      <span className={Style.cartViewCount}>{liveViews}</span>
      <span className={Style.cartViewText}>{cartViewText}</span>
    </div>
  );
};

export const GiftItemLabel = ({ className, width, height }) => {
  return (
    <div className={`${className} ${Style.giftIconContainer}`}>
      <span className={Style.giftIcon}>
        <Gift width={width} height={height} />
      </span>
    </div>
  );
};
