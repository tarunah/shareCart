const CIRCUIT_BREAKER_NAMES = {
  cartPage: 'cartPage',
  paymentPage: 'paymentPage',
  confirmationPage: 'confirmationPage',
  cartFetch: 'cartFetch',
  cartSetAddress: 'cartSetAddress',
  addressById: 'addressById',
  orderAddressByUnifiedId: 'orderAddressByUnifiedId',
  addressAll: 'addressAll',
  giftcardFetch: 'giftcardFetch',
  loyaltyFetch: 'loyaltyFetch',
  bountyFetch: 'bountyFetch',
  styleGetPdpDataBulk: 'styleGetPdpDataBulk',
  paymentLog: 'paymentLog',
  sizeProfilesFetch: 'sizeProfilesFetch',
  feedbackSurvey: 'feedbackSurvey',
  priceDropWishlistItems: 'priceDropWishlistItems',
  aggregatePaymentData: 'aggregatePaymentData'
};

const CIRCUIT_BREAKER_SWITCH_KEY = 'checkout.circuit.breaker.config';

module.exports = {
  CIRCUIT_BREAKER_NAMES,
  CIRCUIT_BREAKER_SWITCH_KEY
};
