import { cardsGetter, fallbackCardsGetter } from './confirmationScreenConfig';
import { confirmationScreenTypes as screenTypes } from 'commonUtils/constants';

describe('confirmationScreenConfig exports are working properly', () => {
  it('returns correct list of cards for desktop for all screens', () => {
    expect(cardsGetter(screenTypes.orderSuccess)('desktop')).toEqual([
      'OrderConfirmedDesktop',
      'DeliveryDetailsWidget',
      'PayAtConvenience',
      'PromoOfferDesktop',
      'SuccessCTA'
    ]);
    expect(cardsGetter(screenTypes.payFailOrderSuccess)('desktop')).toEqual([
      'OrderPlacedAsPOD',
      'DeliveryDetailsWidget',
      'PayAtConvenience',
      'PromoOfferDesktop',
      'SuccessCTA'
    ]);
    expect(cardsGetter(screenTypes.payPendingCodElig)('desktop')).toEqual([
      'WaitingForPayment',
      'PaymentPendingNote'
    ]);
    expect(cardsGetter(screenTypes.payPendingCodNotElig)('desktop')).toEqual([
      'WaitingForPayment'
    ]);
    expect(cardsGetter(screenTypes.payPendingPlacedOrder)('desktop')).toEqual([
      'WaitingForPayment'
    ]);
    expect(cardsGetter(screenTypes.paySuccess)('desktop')).toEqual([
      'PaymentSuccessful',
      'UpdatesSent',
      'SuccessCTA'
    ]);
  });

  it('returns correct list of cards for mobile for all screens', () => {
    expect(cardsGetter(screenTypes.orderSuccess)('mobile')).toEqual([
      'ScratchCardBanner',
      'PromoOffer',
      'DeliveryDetailsWidget',
      'FitAssist',
      'PayAtConvenience',
      'ExchangeInfoWidget',
      'FeedbackSurveyWidget',
      'InsiderSuperCoinWidget',
      'NotifWidget',
      'Recommendations',
      'A2HS',
      'ContinueShopping',
      'Footer'
    ]);

    expect(cardsGetter(screenTypes.payFailOrderSuccess)('mobile')).toEqual([
      'OrderPlacedAsPOD',
      'PromoOffer',
      'DeliveryDetailsWidget',
      'FitAssist',
      'PayAtConvenience',
      'ExchangeInfoWidget',
      'FeedbackSurveyWidget',
      'InsiderSuperCoinWidget',
      'NotifWidget',
      'Recommendations',
      'A2HS',
      'ContinueShopping',
      'Footer'
    ]);
    expect(cardsGetter(screenTypes.payPendingCodElig)('mobile')).toEqual([
      'WaitingForPayment',
      'PaymentPendingNote'
    ]);
    expect(cardsGetter(screenTypes.payPendingCodNotElig)('mobile')).toEqual([
      'WaitingForPayment'
    ]);
    expect(cardsGetter(screenTypes.payPendingPlacedOrder)('mobile')).toEqual([
      'WaitingForPayment'
    ]);
    expect(cardsGetter(screenTypes.paySuccess)('mobile')).toEqual([
      'PaymentSuccessful',
      'UpdatesSent',
      'SuccessCTA'
    ]);
  });

  it('returns correct list of fallback cards for desktop for all screens', () => {
    expect(fallbackCardsGetter(screenTypes.orderSuccess)('desktop')).toEqual([
      'OrderConfirmedDesktop',
      'SuccessCTA'
    ]);
    expect(
      fallbackCardsGetter(screenTypes.payFailOrderSuccess)('desktop')
    ).toEqual(['OrderPlacedAsPOD', 'DeliveryDetailsWidget', 'SuccessCTA']);
    expect(
      fallbackCardsGetter(screenTypes.payPendingCodElig)('desktop')
    ).toEqual(['WaitingForPayment', 'PaymentPendingNote']);
    expect(
      fallbackCardsGetter(screenTypes.payPendingCodNotElig)('desktop')
    ).toEqual(['WaitingForPayment']);
    expect(
      fallbackCardsGetter(screenTypes.payPendingPlacedOrder)('desktop')
    ).toEqual(['WaitingForPayment']);
    expect(fallbackCardsGetter(screenTypes.paySuccess)('desktop')).toEqual([
      'PaymentSuccessful',
      'UpdatesSent',
      'SuccessCTA'
    ]);
  });

  it('returns correct list of fallback cards for mobile for all screens', () => {
    expect(fallbackCardsGetter(screenTypes.orderSuccess)('mobile')).toEqual([
      'Header',
      'TrackOrders',
      'ContinueShopping',
      'Footer'
    ]);
    expect(
      fallbackCardsGetter(screenTypes.payFailOrderSuccess)('mobile')
    ).toEqual([
      'OrderPlacedAsPOD',
      'DeliveryDetailsWidget',
      'NotifWidget',
      'ContinueShopping',
      'Footer'
    ]);
    expect(
      fallbackCardsGetter(screenTypes.payPendingCodElig)('mobile')
    ).toEqual(['WaitingForPayment', 'PaymentPendingNote']);
    expect(
      fallbackCardsGetter(screenTypes.payPendingCodNotElig)('mobile')
    ).toEqual(['WaitingForPayment']);
    expect(
      fallbackCardsGetter(screenTypes.payPendingPlacedOrder)('mobile')
    ).toEqual(['WaitingForPayment']);
    expect(fallbackCardsGetter(screenTypes.paySuccess)('mobile')).toEqual([
      'PaymentSuccessful',
      'UpdatesSent',
      'SuccessCTA'
    ]);
  });
});
