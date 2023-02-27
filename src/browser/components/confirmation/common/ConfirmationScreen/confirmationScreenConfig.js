import get from 'lodash/get';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { confirmationScreenTypes as screenTypes } from 'commonUtils/constants';

const getDefaultConfig = mode => {
  return get(getKVPairValue('CONFIRMATION_PAGE_CONFIG'), `widgets.${mode}`);
};

const TYPE_GETCARDS_MAP = {
  [screenTypes.orderSuccess]: mode =>
    mode === 'desktop'
      ? ['OrderConfirmedDesktop', ...getDefaultConfig(mode)]
      : getDefaultConfig(mode),
  [screenTypes.payFailOrderSuccess]: mode => {
    let list = ['OrderPlacedAsPOD', ...getDefaultConfig(mode)];
    if (list.includes('ScratchCardBanner')) {
      list.splice(list.indexOf('ScratchCardBanner'), 1);
    }

    return list;
  },
  [screenTypes.payPendingCodElig]: () => [
    'WaitingForPayment',
    'PaymentPendingNote'
  ],
  [screenTypes.payPendingCodNotElig]: () => ['WaitingForPayment'],
  [screenTypes.payPendingPlacedOrder]: () => ['WaitingForPayment'],
  [screenTypes.paySuccess]: () => [
    'PaymentSuccessful',
    'UpdatesSent',
    'SuccessCTA'
  ],
  default: mode =>
    mode === 'desktop'
      ? ['OrderConfirmedDesktop', ...getDefaultConfig(mode)]
      : getDefaultConfig(mode)
};

const TYPE_GETFALLBACKCARDS_MAP = {
  [screenTypes.orderSuccess]: mode =>
    mode === 'mobile'
      ? ['Header', 'TrackOrders', 'ContinueShopping', 'Footer']
      : ['OrderConfirmedDesktop', 'SuccessCTA'],
  [screenTypes.payFailOrderSuccess]: mode =>
    mode === 'mobile'
      ? [
          'OrderPlacedAsPOD',
          'DeliveryDetailsWidget',
          'NotifWidget',
          'ContinueShopping',
          'Footer'
        ]
      : ['OrderPlacedAsPOD', 'DeliveryDetailsWidget', 'SuccessCTA'],
  [screenTypes.payPendingCodElig]: () => [
    'WaitingForPayment',
    'PaymentPendingNote'
  ],
  [screenTypes.payPendingCodNotElig]: () => ['WaitingForPayment'],
  [screenTypes.payPendingPlacedOrder]: () => ['WaitingForPayment'],
  [screenTypes.paySuccess]: () => [
    'PaymentSuccessful',
    'UpdatesSent',
    'SuccessCTA'
  ],
  default: mode =>
    mode === 'mobile'
      ? ['Header', 'TrackOrders', 'ContinueShopping', 'Footer']
      : ['OrderConfirmedDesktop', 'SuccessCTA']
};

export const cardsGetter = type =>
  TYPE_GETCARDS_MAP[type] || TYPE_GETCARDS_MAP.default;

export const fallbackCardsGetter = type =>
  TYPE_GETFALLBACKCARDS_MAP[type] || TYPE_GETFALLBACKCARDS_MAP.default;
