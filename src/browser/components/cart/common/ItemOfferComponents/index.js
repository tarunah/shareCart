import React, { useEffect, useState } from 'react';
import get from 'lodash/get';

// common components
import Pluralize from '../../../common/Pluralize';

// style
import Style from './itemOfferComponents.base.css';

import { ItemTradeDiscount } from '../ItemComponents';

import sanitize from 'commonUtils/Sanitize';
import { SAMPLE_SELECTOR } from 'commonBrowserUtils/Strings';

import Rupee from 'iconComp/Rupee.jsx';
import Gift from 'iconComp/Gift.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';
import ComboComplete from 'iconComp/ComboComplete.jsx';
import {
  triggerFrgLoadEvent,
  getFreeGiftUrl
} from 'commonBrowserUtils/CartHelper';
import CartConstants from 'commonBrowserUtils/CartConstants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isApp, isDesktop } from 'commonBrowserUtils/Helper';
import Modal from 'commonComp/Modal';
import useModal from 'customHooks/useModal';
import SampleSelectorModal from '../SampleSelectorModal';

const ComboUrl = props => {
  let { data, type } = props;
  const { comboInfo, currentCount } = data;
  let comboMinMoreData = comboInfo;
  if (comboInfo.length > 1) {
    comboMinMoreData = [...comboInfo];
    comboMinMoreData.sort((b, a) => b.minMore - a.minMore);
  }
  const { minMore } = get(comboMinMoreData, '0', {});
  const textData = {
    value: minMore + currentCount,
    text: 'item'
  };
  const comboURL =
    '/online-fashion-store?f=' + encodeURIComponent('Offers:' + type);
  return (
    <a href={comboURL} className={Style.comboAddItem}>
      <span className={Style.plus}>
        + Add {minMore} <Pluralize {...textData} />
      </span>
    </a>
  );
};

const ComboMessage = props => {
  const { data } = props;
  const { comboInfo, currentCount } = data;
  let comboMinMoreData = comboInfo;
  if (comboInfo.length > 1) {
    comboMinMoreData = [...comboInfo];
    comboMinMoreData.sort((b, a) => b.minMore - a.minMore);
  }
  const { minMore, salePrice, percent } = get(comboMinMoreData, '0', {});
  const textData = {
    value: minMore + currentCount,
    text: 'item'
  };

  return (
    <div className={Style.comboMessage}>
      {percent ? (
        <div>
          Get {percent}% off on {textData.value} <Pluralize {...textData} />
        </div>
      ) : (
        <div>
          Get {`${textData.value} `}
          <Pluralize {...textData} /> for{' '}
          <Rupee className={Style.smallerRupeeIcon} />
          {salePrice}
        </div>
      )}
    </div>
  );
};

const StaggeredCombo = props => {
  let { conditionComplete, data } = props;
  let { currentCount } = data || {};
  const textData = {
    value: currentCount,
    text: 'item'
  };
  return (
    <div
      className={`${Style.comboContainer} ${
        conditionComplete ? Style.comboComplete : Style.comboInComplete
      }`}
    >
      {conditionComplete ? (
        <ComboComplete className={Style.comboCompleteIcon} />
      ) : (
        ''
      )}
      <div className={Style.comboHeaderText}>
        You have got {data.appliedDiscountPercent}% off on {`${currentCount}`}{' '}
        <Pluralize {...textData} />
      </div>
      {!conditionComplete ? (
        <div>
          <ComboMessage {...props} />
          <ComboUrl {...props} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const FixedCombo = props => {
  let { conditionComplete, data = {}, type } = props;
  let { currentCount } = data;
  const textData = {
    value: currentCount,
    text: 'item'
  };
  return (
    <div
      className={`${Style.comboContainer} ${
        conditionComplete ? Style.comboComplete : Style.comboInComplete
      }`}
    >
      {conditionComplete ? (
        <ComboComplete className={Style.comboCompleteIcon} />
      ) : (
        ''
      )}
      <div className={Style.comboHeaderText}>
        You have got {` ${currentCount} `} <Pluralize {...textData} /> {'for '}
        <span className={Style.price}>
          <Rupee className={Style.rupeeIcon} />
          {`${data.appliedSalePrice}`}
        </span>
      </div>
      {!conditionComplete ? (
        <div>
          <ComboMessage {...props} />
          <ComboUrl {...props} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const FreeConditionalOffer = props => {
  let { conditionComplete, comboComplete, message, comboURL } = props;
  try {
    message = decodeURIComponent(message);
  } catch (e) {}
  const conditionCompleteHeading = comboComplete
    ? 'Yay! Combo offer applied'
    : 'Great Choice! You got the best discount';

  return (
    <div className={Style.comboContainer}>
      <div className={`${conditionComplete ? Style.conditionComplete : ''}`}>
        <span className={Style.comboStatus}>
          {conditionComplete ? (
            <span>
              <ComboComplete className={Style.comboCompleteIcon} />
              <span>{conditionCompleteHeading}</span>
            </span>
          ) : (
            'COMBO OFFER'
          )}
        </span>
        <div
          className={Style.comboMessage}
          dangerouslySetInnerHTML={{ __html: sanitize(message) }}
        />
        {!conditionComplete && (
          <a href={comboURL} className={Style.comboAddItem}>
            +ADD ITEM
          </a>
        )}
      </div>
    </div>
  );
};

const initFreeConditionalOffer = (props, comboURL) => {
  return <FreeConditionalOffer {...props} comboURL={comboURL} />;
};

const getBxGyUrl = props => {
  const { type } = props;
  const comboURI = `Offers:${type}`;
  return `/online-fashion-store?userQuery=false&p=1&f=${encodeURIComponent(
    comboURI
  )}`;
};

const BxGy = props => {
  return initFreeConditionalOffer(props, getBxGyUrl(props));
};

const BxGyTd = props => {
  return initFreeConditionalOffer(props, getBxGyUrl(props));
};

const getTitleConfig = ({ conditionComplete, hasFreeItem }) => {
  if (hasFreeItem)
    return {
      title:
        getKVPairValue('SAMPLE_SELECTOR').freeGiftAdded ||
        SAMPLE_SELECTOR.freeGiftAdded,
      className: ''
    };
  if (conditionComplete)
    return {
      title: SAMPLE_SELECTOR.giftAvailable,
      className: Style.conditionCompleteTitle
    };
  return { title: SAMPLE_SELECTOR.getGift, className: '' };
};

const getFreeGiftV1Config = ({
  conditionComplete,
  hasFreeItem,
  requiredAmount = 0
}) => {
  if (hasFreeItem)
    return {
      title:
        getKVPairValue('SAMPLE_SELECTOR').freeGiftAdded ||
        SAMPLE_SELECTOR.freeGiftAdded,
      message: SAMPLE_SELECTOR.editFreeGiftCallout,
      className: ''
    };
  if (conditionComplete)
    return {
      title: SAMPLE_SELECTOR.availFreeGift,
      message: SAMPLE_SELECTOR.selectFreeGiftCallout,
      className: Style.conditionCompleteTitle
    };
  return {
    title: SAMPLE_SELECTOR.getGiftWorth.replace('{0}', requiredAmount),
    message: SAMPLE_SELECTOR.viewFreeGiftCallout,
    className: ''
  };
};

const FreeGiftTitle = ({ title, className = '' }) => (
  <div className={`${Style.freeGiftTitle} ${className}`}>{title}</div>
);

const FreeGiftConditionContainer = ({
  title,
  titleClass = '',
  containerClass = '',
  message,
  freeGiftUrl,
  showFrgListPage = false
}) => {
  const [isModalOpen, toggleModal] = useModal(false);
  const cancelIconConfig = { show: true, className: Style.modalCloseIcon };

  const handlePostMessage = e => {
    const postMessage = get(e, 'data', '');
    if (postMessage === CartConstants.FREE_GIFT_IFRAME_POSTMESSAGE) {
      window && window.location.reload();
    }
  };

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

  return !isDesktop() || !showFrgListPage ? (
    <a
      className={`${Style.freeGiftContainer} ${containerClass}`}
      href={freeGiftUrl}
    >
      <Gift />
      <div className={Style.freeGiftTextContainer}>
        <FreeGiftTitle title={title} className={titleClass} />
        <div>{message}</div>
      </div>
      <ChevronRight className={Style.rightIcon} />
    </a>
  ) : (
    <div className={containerClass}>
      <div className={Style.freeGiftContainer} onClick={toggleModal}>
        <Gift />
        <div className={Style.freeGiftTextContainer}>
          <FreeGiftTitle title={title} className={titleClass} />
          <div>{message}</div>
        </div>
        <ChevronRight className={Style.rightIcon} />
      </div>
      {isModalOpen && (
        <SampleSelectorModal
          toggleModal={toggleModal}
          cancelIconConfig={cancelIconConfig}
          freeGiftUrl={freeGiftUrl}
        />
      )}
    </div>
  );
};

const FreeGiftOOSContainer = ({ isFreeGiftV1 = false }) => {
  const title = SAMPLE_SELECTOR.freeGiftOOSTitle;
  const message = isFreeGiftV1
    ? SAMPLE_SELECTOR.freeGiftOOSCallout
    : SAMPLE_SELECTOR.freeGiftOOSMessage;
  return (
    <div className={Style.freeGiftHeaderContainer}>
      <div className={Style.freeGiftTextContainer}>
        <FreeGiftTitle title={title} />
        <div>{message}</div>
      </div>
    </div>
  );
};

const FreeGiftComboContainer = props => {
  return props.isGiftOOS ? (
    <FreeGiftOOSContainer />
  ) : (
    <div className={Style.conditionCompleteContainer}>
      <FreeGiftTitle {...props} />
    </div>
  );
};

const FreeGiftV2 = ({
  conditionComplete,
  hasFreeItem,
  message,
  showFrgListPage,
  type,
  itemsList = [],
  frgSlabComboParams = []
}) => {
  const baseItem = itemsList.find(
    ({ flags }) => get(flags, 'freeItem', false) === false
  );
  let freeGiftUrl = ``;
  if (showFrgListPage) {
    freeGiftUrl = getFreeGiftUrl(baseItem, isApp() || isDesktop());
  } else {
    freeGiftUrl = `/online-fashion-store?userQuery=false&p=1&f=${encodeURIComponent(
      'Offers:' + type
    )}`;
  }

  const { title, className } = getTitleConfig({
    conditionComplete,
    hasFreeItem
  });

  const isGiftOOS = !!frgSlabComboParams.find(slab =>
    get(slab, 'freeGiftInfo', []).find(
      gift => get(gift, 'outOfStock', false) === true
    )
  );

  useEffect(() => {
    if (!hasFreeItem) {
      const widgetItemName = conditionComplete
        ? 'free_gift_choose'
        : 'free_gift_get';
      triggerFrgLoadEvent(
        itemsList,
        { conditionComplete, hasFreeItem, showFrgListPage, frgSlabComboParams },
        widgetItemName
      );
    }
  }, [type]);

  return hasFreeItem ? (
    <FreeGiftComboContainer
      title={title}
      className={className}
      isGiftOOS={isGiftOOS}
    />
  ) : (
    <FreeGiftConditionContainer
      title={title}
      titleClass={className}
      message={message}
      freeGiftUrl={freeGiftUrl}
      showFrgListPage={showFrgListPage}
    />
  );
};

const FreeGiftV1 = ({
  conditionComplete,
  hasFreeItem,
  frgSlabComboParams = []
}) => {
  const unlockableSlab = frgSlabComboParams.find(({ minMore }) => minMore > 0);
  const requiredAmount = get(unlockableSlab, 'minMore', 0);
  const { title, className, message } = getFreeGiftV1Config({
    conditionComplete,
    hasFreeItem,
    requiredAmount
  });
  const isGiftOOS = !!frgSlabComboParams.find(slab =>
    get(slab, 'freeGiftInfo', []).find(
      gift => get(gift, 'outOfStock', false) === true
    )
  );

  return isGiftOOS ? (
    <FreeGiftOOSContainer isFreeGiftV1={true} />
  ) : (
    <div className={Style.freeGiftHeaderContainer}>
      <Gift />
      <div className={Style.freeGiftTextContainer}>
        <FreeGiftTitle title={title} className={className} />
        <div>{message}</div>
      </div>
    </div>
  );
};

const ConditionalOffer = props => {
  let { id } = props;
  return initFreeConditionalOffer(
    props,
    `/online-fashion-store?userQuery=false&p=1&f=${encodeURIComponent(
      `dre_comboId:${id}`
    )}`
  );
};

export const OfferDiscountText = props => {
  const {
    discountType,
    discountEntry,
    className,
    flags = {},
    zeroMrp,
    frgSlabComboParams = [],
    styleId,
    showFrgListPage
  } = props;
  if (discountType === 4 || flags.freeItem) {
    const freeGiftCategory =
      frgSlabComboParams.length > 1
        ? frgSlabComboParams.find(slab =>
            get(slab, 'freeGiftInfo', []).find(
              freeItem => get(freeItem, 'styleId', 0) === styleId
            )
          ) || { slabName: '' }
        : { slabName: '' };
    if (zeroMrp) {
      const freeGiftMessage = `${
        showFrgListPage ? freeGiftCategory.slabName : ''
      } Free Gift`;

      return <span className={Style.freeGiftText}>{freeGiftMessage}</span>;
    }
    return (
      <span className={`${Style.freeGiftText} ${className || ''}`}>
        {freeGiftCategory.slabName} Free Gift
      </span>
    );
  } else if (discountType === 8) {
    return (
      <ItemTradeDiscount
        {...discountEntry}
        className={`${Style.offerDiscountText} ${className || ''}`}
      />
    );
  }
  return null;
};

export const OfferHeader = props => {
  const { offerData = {}, isSampleSelectorEnabled, itemsList } = props;
  let { discountType = {}, showFrgListPage = false } = offerData;
  const isFreeGiftV2 =
    isSampleSelectorEnabled ||
    (discountType === CartConstants.FREE_GIFT_DISCOUNT_TYPE &&
      !showFrgListPage);
  switch (discountType) {
    case 256:
      return <StaggeredCombo {...offerData} />;
    case 128:
      return <FixedCombo {...offerData} />;
    case 4:
    case 2048:
      return isFreeGiftV2 ? (
        <FreeGiftV2 {...offerData} itemsList={itemsList} />
      ) : (
        <FreeGiftV1 {...offerData} />
      );
    case 8:
      return <ConditionalOffer {...offerData} />;
    case 2:
      return <BxGy {...offerData} />;
    case 1024:
      return <BxGyTd {...offerData} />;
    default:
      return null;
  }
};

export const OfferFooter = ({ unlockableSlab, itemsList = [] }) => {
  const title = SAMPLE_SELECTOR.unlockFreeGiftTitle.replace(
    '{0}',
    unlockableSlab.slabName
  );
  const message = SAMPLE_SELECTOR.unlockGiftMessage.replace(
    '{0}',
    unlockableSlab.minMore
  );
  const baseItem = itemsList.find(
    ({ flags }) => get(flags, 'freeItem', false) === false
  );
  const freeGiftUrl = getFreeGiftUrl(
    baseItem,
    isApp() || isDesktop(),
    unlockableSlab.slabName
  );

  return (
    <FreeGiftConditionContainer
      title={title}
      message={message}
      containerClass={Style.footerContainer}
      freeGiftUrl={freeGiftUrl}
      showFrgListPage={true}
    />
  );
};
