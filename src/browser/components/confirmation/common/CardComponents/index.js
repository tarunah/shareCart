import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getBannerConfigValue } from 'commonUtils/BannerConfigManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  confirmationScreenTypes as screenTypes,
  cookieKeys
} from 'commonUtils/constants';
import {
  getCookie,
  gotoHomePage,
  gotoOrders,
  isAndroidApp,
  isIOSApp
} from 'commonBrowserUtils/Helper';
import { getViewOrder } from 'commonBrowserUtils/ConfirmationHelper';
import loadComponent from 'commonUtils/loadComponent';

import Button from 'commonComp/Button';
import Buttons from 'commonComp/InlineButtonV3';

import A2HS from '../A2HS';
import FitAssistModule from '../FitAssistModule';
import Header from '../Header';
import Footer from '../Footer';

import InsiderSuperCoin from '../InsiderSuperCoinWidget';
import FeedbackSurveyWidget from '../FeedbackSurveyWidget';

import Styles from './cardComponents.base.css';

import Check from 'iconComp/Check.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';
import MagicWand from 'iconComp/MagicWand.jsx';
import ChevronDown from 'iconComp/ChevronDown.jsx';
import ItemPack from 'iconComp/ItemPack.jsx';
import ItemHandOver from 'iconComp/ItemHandOver.jsx';
import ConfirmTick from 'iconComp/ConfirmTick.jsx';
import Notification from 'iconComp/Notification.jsx';
import SlickCarousel from '../SlickCarousel';
import {
  AndroidBridgeHelper,
  IOSBridgeHelper
} from 'commonBrowserUtils/JSBridgeHelper';

const PastOrderSavingsModule = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_pastOrderSavingsModule" */
      '../PastOrderSavingsModule'
    ),
  loaderProperties: { backdrop: true }
});

const Rating = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_rating" */
      './components/Rating'
    ),
  loaderProperties: { backdrop: true }
});

const TrackOrders = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_trackOrders" */
      './components/TrackOrders'
    ),
  loaderProperties: { backdrop: true }
});

const WaitingForPayment = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_waitingForPayment" */
      './components/WaitingForPayment'
    ),
  loaderProperties: { backdrop: true }
});

const PaymentPendingNote = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_paymentPendingNote" */
      './components/PaymentPendingNote'
    ),
  loaderProperties: { backdrop: true }
});

const OrderPlacedAsPOD = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_orderPlacedAsPOD" */
      './components/OrderPlacedAsPOD'
    ),
  loaderProperties: { backdrop: true }
});

const PaymentSuccessful = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_paymentSuccessful" */
      './components/PaymentSuccessful'
    ),
  loaderProperties: { backdrop: true }
});

const ItemsPaid = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_itemsPaid" */
      './components/ItemsPaid'
    ),
  loaderProperties: { backdrop: true }
});

const UpdatesSent = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_updatesSent" */
      './components/UpdatesSent'
    ),
  loaderProperties: { backdrop: true }
});

const TotalPayable = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_totalPayable" */
      './components/TotalPayable'
    ),
  loaderProperties: { backdrop: true }
});

const ViewOrder = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_viewOrder" */
      './components/ViewOrder'
    ),
  loaderProperties: { backdrop: true }
});

const PayAtConvenience = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_payAtConvenience" */
      './components/PayAtConvenience'
    ),
  loaderProperties: { backdrop: true }
});

const ScratchCardBanner = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_cardComponents_scratchCardBanner" */
      './components/ScratchCardBanner'
    ),
  loaderProperties: { backdrop: true }
});

const FitAssist = props => {
  return <FitAssistModule fitAssistClass={props.styleClass} {...props} />;
};

const viewOrdersTriggerEvent = orderId => {
  triggerEvent('ORDER_CONFIRM_VIEW_ORDERS', {
    maData: {
      entity_id: orderId,
      entity_type: 'order'
    },
    custom: {
      widget: {
        name: 'view_orders',
        type: 'button'
      },
      event_type: 'widgetClick',
      event_category: 'Order Confirmation Page'
    }
  });
};

const onOfferClick = (url, showLoader) => {
  triggerEvent('PARTNER_BANNER_CLICKED', {
    gaLabel: url
  });

  typeof showLoader === 'function' && showLoader();
};

const onContinueShoppingClick = () => {
  // this handler function is not working for iOS, commenting out till it is fixed from app side
  // if (
  //   typeof webkit !== 'undefined' &&
  //   typeof get(webkit, 'messageHandlers.handleDonePress.postMessage') ===
  //     'function'
  // ) {
  //   webkit.messageHandlers.handleDonePress.postMessage();
  //   return;
  // }
  gotoHomePage();
};

const PromoOffer = props => {
  const promoOfferConfig = getBannerConfigValue('PROMOTIONAL_OFFER');
  if (get(promoOfferConfig, 'enabled') === false) {
    return null;
  }

  const promoOffers = get(promoOfferConfig, 'offers', []);
  const slideInterval = get(promoOfferConfig, 'slideInterval', 2000);
  let promoBlockClass = `${props.styleClass} `;
  promoOffers.length > 1 && (promoBlockClass += Styles.carouselPromoBlock);

  return promoOffers.length >= 1 ? (
    <div className={promoBlockClass}>
      <SlickCarousel slideInterval={slideInterval}>
        {promoOffers.map(({ image, url }, index) => (
          <div
            id={`promoOffer-${index}`}
            key={`promoOffer-${index}`}
            className={Styles.promoOffer}
            onClick={() => onOfferClick(url, props.showLoader)}
          >
            <a href={url}>
              <img className={Styles.promoOfferImage} src={image} />
            </a>
          </div>
        ))}
      </SlickCarousel>
    </div>
  ) : null;
};

const PromoOfferDesktop = props => {
  const promoOfferConfig = getBannerConfigValue('PROMOTIONAL_OFFER');
  if (get(promoOfferConfig, 'enabled') === false) {
    return null;
  }

  const [selectedPromoOffer, setSelectedOffer] = useState(
    get(promoOfferConfig, 'offers.0') ? 0 : -1
  );

  const selectPromoOffer = e => {
    const action = e.currentTarget.getAttribute('data-action');
    const nextIndex =
      action === 'next' ? selectedPromoOffer + 1 : selectedPromoOffer - 1;

    setSelectedOffer(nextIndex);
  };

  const promoOffers = (get(promoOfferConfig, 'offers') || []).filter(
    obj => !obj.disabledForDesktop
  );
  const prevOfferDisabled = selectedPromoOffer === 0;
  const nextOfferDisabled = selectedPromoOffer === promoOffers.length - 1;

  return selectedPromoOffer !== -1 ? (
    <div
      className={`${props.styleClass} ${Styles.desktopSubCardContainer} ${Styles.promoOfferBlockDesktop}`}
    >
      <ChevronRight
        className={`${Styles.prevArrow} ${
          prevOfferDisabled ? Styles.disabled : ''
        }`}
        data-action="previous"
        onClick={prevOfferDisabled ? null : selectPromoOffer}
      />
      <div className={Styles.offers}>
        {promoOffers.map(({ image, url }, index) => (
          <div
            id={`promoOffer-${index}`}
            key={`promoOffer-${index}`}
            className={`${Styles.promoOfferDesktop} ${
              selectedPromoOffer !== index ? Styles.hide : ''
            }`}
            data-url={url}
            onClick={() => onOfferClick(url)}
          >
            <a href={url}>
              <img className={Styles.promoOfferImageDesktop} src={image} />
            </a>
          </div>
        ))}
      </div>
      <ChevronRight
        className={`${Styles.nextArrow} ${
          nextOfferDisabled ? Styles.disabled : ''
        }`}
        data-action="next"
        onClick={nextOfferDisabled ? null : selectPromoOffer}
      />
    </div>
  ) : null;
};

const ContinueShopping = props => {
  return (
    <div className={`${props.styleClass} ${Styles.continueShoppingContainer}`}>
      <div className={Styles.continueShoppingCaption}>
        <div>Keep creating your wardrobe</div>
      </div>
      <Button
        className={Styles.continueShoppingButton}
        onClick={onContinueShoppingClick}
      >
        CONTINUE SHOPPING
      </Button>
    </div>
  );
};

const MoreBelow = props => {
  return (
    <div
      id="moreBelow"
      className={Styles.seeMoreContainer}
      onClick={props.moreBelowClickHandler}
    >
      <span className={Styles.seeMoreText}>More Below</span>
      <ChevronDown className={Styles.arrowIcon} />
    </div>
  );
};

const InsiderSuperCoinWidget = props => {
  if (isFeatureEnabled('CONFIRMATION_INSIDER_SUPERCOIN'))
    return (
      <InsiderSuperCoin insiderSuperCoinClass={props.styleClass} {...props} />
    );
  return null;
};

const ExchangeInfoWidget = props => {
  const items = get(props, 'dataState.data.bountyOrder.items') || [];

  if (!items.some(obj => get(obj, 'flags.isOpenEndedExchangeOrder'))) {
    return null;
  }

  const { header, steps = [] } =
    get(getKVPairValue('STYLE_EXCHANGE'), 'confirm') || {};

  const IconComponents = {
    ItemHandOver,
    ItemPack
  };

  return (
    <div className={`${Styles.exchangeContainer} ${props.styleClass}`}>
      <div className={Styles.headerContainer}>
        <div className={Styles.header}>What Next?</div>
        {header}
      </div>

      <div>
        <div className={Styles.stepContainer}>
          <div className={Styles.checkIconContainer}>
            <Check className={Styles.checkIcon} />
          </div>
          <div className={Styles.greenText}>Exchange Request Submitted</div>
        </div>
        {steps.map((obj, i) => {
          const SVGIcon = IconComponents[obj.icon];
          return (
            <div className={Styles.stepContainer} key={`steps_${i}`}>
              {i + 1 < steps.length && <div className={Styles.dashedStep} />}
              <div className={Styles.iconContainer}>{i + 1}</div>
              <div className={Styles.text}>{obj.text}</div>
              <SVGIcon className={Styles.iconImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderConfirmedDesktop = props => {
  return (
    <div
      className={`${props.styleClass} ${Styles.statusCardContainer} ${Styles.desktopStatusCardContainer}`}
    >
      <ConfirmTick className={Styles.confirmTick} />
      <div
        className={`${Styles.statusCardHeading} ${Styles.desktopStatusCardHeading} ${Styles.statusSuccessHeading}`}
      >
        Order confirmed
      </div>
      <div
        className={`${Styles.statusCardDesc} ${Styles.desktopStatusCardDesc}`}
      >
        Your order is confirmed. You will receive an order confirmation
        email/SMS shortly with the expected delivery date for your items.
      </div>
    </div>
  );
};

const isNotifWidgetEnabled = () => {
  const { androidEnabled, iOSEnabled } = get(
    getKVPairValue('CONFIRMATION_PAGE_CONFIG'),
    'notifWidgetSwitch'
  );
  const notifEnabledCookieVal = parseInt(
    getCookie(cookieKeys.NOTIFICATION_ENABLED)
  );
  return (
    !isNaN(notifEnabledCookieVal) &&
    !Boolean(notifEnabledCookieVal) &&
    ((androidEnabled && isAndroidApp()) || (iOSEnabled && isIOSApp()))
  );
};

const triggerWidgetLoadEvent = () => {
  triggerEvent('ORDER_CONFIRM_LOAD_NOTIF_WIDGET', {
    custom: {
      widget: {
        name: 'load_notif_widget',
        type: 'button'
      },
      event_category: 'Order Confirmation Page'
    }
  });
};

const triggerWidgetClickEvent = () => {
  triggerEvent('ORDER_CONFIRM_CLICK_NOTIF_WIDGET', {
    custom: {
      widget: {
        name: 'click_notif_widget',
        type: 'button'
      },
      event_category: 'Order Confirmation Page'
    }
  });
};

const handleNotificationSettingClick = () => {
  triggerWidgetClickEvent();
  if (isAndroidApp()) {
    AndroidBridgeHelper.openAppSettings();
  } else if (isIOSApp()) {
    IOSBridgeHelper.openAppSettings();
  }
};

const NotifWidget = props => {
  useEffect(() => {
    isNotifWidgetEnabled() && triggerWidgetLoadEvent();
  }, []);

  return (
    isNotifWidgetEnabled() && (
      <div className={`${props.styleClass} ${Styles.notifSection}`}>
        <Notification />
        <div>
          <div className={Styles.notifInfo}>
            Get live updates about your orders.
          </div>
          <div
            className={Styles.notifLinkButton}
            onClick={handleNotificationSettingClick}
          >
            TURN ON NOTIFICATIONS
            <ChevronRight className={Styles.iconRight} />
          </div>
        </div>
      </div>
    )
  );
};

const onClickTriggerEvent = (eventName, orderDetails) => {
  const payload = {
    custom: {
      custom: {
        v1: get(orderDetails, 'storeOrderId')
      }
    }
  };
  triggerEvent(eventName, payload);
};

const SuccessCTA = props => {
  return (
    <Buttons
      containerClassName={
        props.mode === 'desktop'
          ? Styles.successCTAContainerDesktop
          : Styles.subcardContainer
      }
      buttons={[
        {
          text: 'CONTINUE SHOPPING',
          type: 'secondary',
          clickHandler: onContinueShoppingClick
        },
        {
          text:
            props.screenType === screenTypes.paySuccess
              ? 'GO TO ORDERS'
              : 'VIEW ORDER',
          className: Styles.primaryCTAButton,
          clickHandler:
            props.screenType === screenTypes.paySuccess
              ? gotoOrders
              : getViewOrder(
                  get(props, 'dataState.data.bountyOrder.storeOrderId')
                )
        }
      ]}
    />
  );
};

const DeliveryDetailsWidget = props => {
  const delivery = get(props, 'dataState.data.delivery');
  if (!delivery || isEmpty(delivery)) {
    return null;
  }

  const name = get(delivery, 'user.name') || '';
  const mobile = get(delivery, 'user.mobile') || '';
  const streetAddress = get(delivery, 'streetAddress') || '';
  const locality = get(delivery, 'locality') || '';
  const city = get(delivery, 'city') || '';
  const state = get(delivery, 'state.name') || '';
  const pincode = get(delivery, 'pincode') || '';
  const storeOrderId =
    get(props, 'dataState.data.bountyOrder.storeOrderId') || '';
  const link = `/my/item/details?storeOrderId=${storeOrderId}`;
  const { icon, note } = get(
    getKVPairValue('CONFIRMATION_PAGE_CONFIG'),
    'deliveryInfo'
  );

  return (
    <div className={`${props.styleClass} ${Styles.deliveryContainer}`}>
      <div className={Styles.deliveryTopSection}>
        <div className={Styles.deliveryInfo}>
          Delivering to:
          <div className={Styles.deliverHeader}>
            <div className={Styles.deliverName}>{name}</div>
            <div>{` | ${mobile}`}</div>
          </div>
          <div className={Styles.deliverAddress}>
            {`${streetAddress}, ${locality}, ${city}, ${state}- ${pincode}`}
          </div>
          <a
            className={Styles.orderDetailsButton}
            href={link}
            onClick={() => {
              triggerEvent('ORDER_DETAILS_BTN_CLICK', {
                custom: { custom: { v1: storeOrderId } }
              });
            }}
          >
            {`ORDER DETAILS `}
            <ChevronRight className={Styles.iconRight} />
          </a>
        </div>
        <img className={Styles.orderDetailsIcon} src={icon} />
      </div>
      <div className={Styles.deliveryFooter}>
        <MagicWand className={Styles.wand} />
        {note}
      </div>
    </div>
  );
};

export {
  InsiderSuperCoinWidget,
  FitAssist,
  A2HS,
  PastOrderSavingsModule,
  Rating,
  TrackOrders,
  PromoOffer,
  PromoOfferDesktop,
  ContinueShopping,
  MoreBelow,
  viewOrdersTriggerEvent,
  ExchangeInfoWidget,
  OrderConfirmedDesktop,
  WaitingForPayment,
  PaymentPendingNote,
  OrderPlacedAsPOD,
  PaymentSuccessful,
  ItemsPaid,
  UpdatesSent,
  SuccessCTA,
  TotalPayable,
  PayAtConvenience,
  ViewOrder,
  Header,
  Footer,
  DeliveryDetailsWidget,
  FeedbackSurveyWidget,
  onClickTriggerEvent,
  ScratchCardBanner,
  NotifWidget
};
