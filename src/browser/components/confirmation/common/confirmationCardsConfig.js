import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { isApp } from 'commonBrowserUtils/Helper';

import loadComponent from 'commonUtils/loadComponent';

import {
  A2HS,
  FitAssist,
  Rating,
  TrackOrders,
  PromoOffer,
  PromoOfferDesktop,
  ContinueShopping,
  PastOrderSavingsModule,
  InsiderSuperCoinWidget,
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
  Header,
  Footer,
  PayAtConvenience,
  ViewOrder,
  DeliveryDetailsWidget,
  FeedbackSurveyWidget,
  ScratchCardBanner,
  NotifWidget
} from './CardComponents';

const Recommendations = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "confirmation_common_recommendations" */
      './Recommendations'
    ),
  loaderProperties: { backdrop: false }
});

export const confirmationSubComponentsConfig = {
  InsiderSuperCoinWidget,
  PastOrderSavingsWidget: isFeatureEnabled('CONFIRMATION_TOTAL_SAVINGS')
    ? PastOrderSavingsModule
    : null,
  A2HS,
  FitAssist,
  Rating: isApp() ? Rating : null,
  Recommendations: isFeatureEnabled('CONFIRMATION_CROSS_SELL')
    ? Recommendations
    : null,
  TrackOrders,
  PromoOffer,
  PromoOfferDesktop,
  ContinueShopping,
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
  Header,
  Footer,
  PayAtConvenience: isFeatureEnabled('DOPE') ? PayAtConvenience : null,
  ViewOrder,
  DeliveryDetailsWidget,
  FeedbackSurveyWidget,
  ScratchCardBanner,
  NotifWidget
};

const CARDACTION_GETMODALCONTENT_MAP = {
  WaitingForPayment_Cancel: actionHandlers => ({
    header: 'Cancel Order?',
    bodyHeader: `Are you sure you want to cancel the order?`,
    bodyDescription: `We are still confirming the payment status with your bank. We will notify you once we get the status from the bank.`,
    buttons: [
      {
        text: 'CANCEL ORDER',
        type: 'secondary',
        clickHandler: actionHandlers.cancelOrder
      },
      {
        text: 'STAY HERE',
        clickHandler: actionHandlers.toggleConfirmationModal
      }
    ]
  }),
  WaitingForPayment_Retry: actionHandlers => ({
    header: 'Retry Payment?',
    bodyHeader: `Are you sure you want to retry the payment?`,
    bodyDescription: `Your ongoing payment will be cancelled and if the amount was debited from your account, it will be refunded automatically within 72 hours.`,
    buttons: [
      {
        text: 'RETRY PAYMENT',
        type: 'secondary',
        clickHandler: actionHandlers.retryPayment
      },
      {
        text: 'WAIT FOR SOMETIME',
        clickHandler: actionHandlers.toggleConfirmationModal
      }
    ]
  }),
  OrderPlacedAsPOD_Cancel: actionHandlers => ({
    header: 'Cancel Order?',
    bodyHeader: `Are you sure you want to cancel the order?`,
    bodyDescription: `You can pay online using the Pay Now option from orders or you can Pay on Delivery through Cash, Card or UPI`,
    buttons: [
      {
        text: 'CANCEL ORDER',
        type: 'secondary',
        clickHandler: actionHandlers.cancelOrder
      },
      {
        text: 'KEEP THIS ORDER',
        clickHandler: () =>
          actionHandlers.toggleConfirmationModal({
            eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_KEEP_CLICK'
          })
      }
    ],
    eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_OPEN'
  })
};

export const modalContentGetter = actionHandlers => cardAction =>
  CARDACTION_GETMODALCONTENT_MAP[cardAction](actionHandlers);
