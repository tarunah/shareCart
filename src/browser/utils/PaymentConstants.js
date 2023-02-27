const currentYear = new Date().getFullYear();
const years = [...Array(30).fill()].map((_, index) => currentYear + index);

const PAYMENT_INSTRUMENT = {
  COD: 'cod',
  SAVED_INSTRUMENT: 'savedinstrument',
  RECOMMENDED_INSTRUMENT: 'recommendedInstrument',
  SAVED_CARD: 'savedcard',
  SAVED_VPA: 'savedvpa',
  MYNTRA_CREDIT: 'myntraCredit',
  FREE_PURCHASE: 'myntracredit',
  LOYALTY_POINTS: 'loyalitypoints',
  GIFTCARD: 'giftcard',
  UPI: 'upi',
  EMI: 'emi',
  NETBANKING: 'netbanking',
  PAY_LATER: 'paylater',
  WALLET: 'wallet',
  CARD_TYPE: 'card',
  VPA: 'vpa'
};

const LOW_SR_FILTER_EXCLUSIONS = [
  PAYMENT_INSTRUMENT.UPI,
  PAYMENT_INSTRUMENT.WALLET,
  PAYMENT_INSTRUMENT.RECOMMENDED_INSTRUMENT,
  PAYMENT_INSTRUMENT.SAVED_INSTRUMENT
];

export default {
  LOW_SR_FILTER_EXCLUSIONS,
  ...PAYMENT_INSTRUMENT,
  INSTRUMENT_ELIGIBLE_CODE: 3000,
  INSTRUMENT_NOT_ELIGIBLE_CODE: 3001,
  SAVEDCARD_LIMIT_REACHED_CODE: 3020,
  SAVING_CARD_NOT_ALLOWED_CODE: 3019,
  RETURN_ABUSER_CODE: 3009,
  EMI_PM: 'netbanking',
  EMI_PM_NAME: 'emi',
  EMI_TYPE: 'emi',
  PHONEPE_UPI_PM: 'netbanking',
  BNPL_NO_PROVIDER_DATA: 20001,
  BNPL_NO_ACTIVE_ACCOUNT: 20002,
  BNPL_USER_NOT_ELIGIBLE: 20003,
  BNPL_PROVIDER_DATA_INCOMPLETE: 20004,
  BNPL_ERROR_RESPONSE_FROM_PROVIDER: 20005,
  BNPL_USER_NOT_WHITELISTED: 20006,
  ONLINE_ERROR_CODES: ['1001'],
  WALLET_TYPE: 'wallet',
  WALLET_TAB_TYPE: 'walletTab',
  WALLET_PM: 'netbanking',
  WALLET_PM_DIRECT: 'wallet',
  WALLET_PM_NAME: 'wallet',
  CREDIT_CARD: 'creditcard',
  DEBIT_CARD: 'debitcard',
  CAPTCHA_CHARACTER_LENGTH: 4,
  AVAILABLE_CARD_IMAGES: [
    'VISA',
    'MASTERCARD',
    'AMEX',
    'MAESTRO',
    'DINERS',
    'RUPAY',
    'DISCOVER'
  ],
  PAYMENT_ERROR_OPTIONS_ID: 'PAYMENT_ERROR_OPTIONS_ID',
  EXPIRY_EXEMPTED_CARDS: ['MAESTRO', 'NONE'],
  AUTO_SUBMIT_TAB_TYPE: 'autoSubmitTab',
  BANK_MESSAGE_MAP: {
    '11005': 'This card is not eligible for instant discount',
    '11001': 'This card is not eligible for instant discount',
    '11002':
      'Max discount limit reached for this card. If your recent payment transaction has failed, please try after 30 minutes',
    '11006': 'Please add more items for min order value to avail the benefits'
  },
  MONTHS: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ],
  YEARS: years,
  OTP_SERVICE_THRESHOLD: 3,
  SAVE_CARDS_INFO_MAP: {
    '3019': 'We have temporarily disabled saving cards',
    '3020':
      'You have already saved the maximum number of cards allowed. Please delete some cards to save newer cards.'
  },
  BANK_MAP: {
    citibank: 'citi',
    'hdfc bank': 'hdfc',
    'icici bank': 'icici',
    'state bank of india': 'sbi',
    'axis bank': 'axis',
    kotak: 'kotak',
    sbi: 'sbi',
    'standard chartered bank': 'stanc',
    stanc: 'stanc',
    'airtel money': 'airtel',
    paypal: 'paypal',
    payzapp: 'payzapp',
    mobikwik: 'mobikwik',
    paytm: 'paytm',
    freecharge: 'freecharge',
    'google pay': 'googlepay',
    phonepeupi: 'phonepeupi',
    'other upi': 'otherupi',
    phonepe: 'phonepe'
  },
  TWO_FA_PAYMENT_MODE_MAPPING: {
    mc: 'MYNTRACREDIT',
    lp: 'LOYALTYPOINTS'
  },
  PAYNOW_TEMPLATE_CODE: {
    HTML_TEMPLATE: 100,
    REDIRECT_TEMPLATE: 101,
    PHONEPE_JS_TEMPLATE: 102,
    PHONEPE_ANDROID_TEMPLATE: 103,
    ORDER_SUCCESS_TEMPLATE: 104,
    ERROR_TEMPLATE: 105
  },
  PAYNOW_ERROR_CODE: {
    DEFAULT_PAYMENT_FAILURE_ERROR_CODE: 1001
  },
  INSTRUMENT_LOADING_MESSAGE: {
    [PAYMENT_INSTRUMENT.NETBANKING]: 'Connecting with Bank',
    [PAYMENT_INSTRUMENT.EMI]: 'Getting EMI Options',
    [PAYMENT_INSTRUMENT.UPI]: 'Processing UPI Payment',
    [PAYMENT_INSTRUMENT.WALLET]: 'Opening Wallet',
    [PAYMENT_INSTRUMENT.COD]: 'Placing Order',
    [PAYMENT_INSTRUMENT.CARD_TYPE]: 'Connecting with Bank',
    [PAYMENT_INSTRUMENT.VPA]: 'Processing UPI Payment'
  },
  FAILURE_BUTTON_TEXT_MAP: {
    TRY_RETRY_TEXT: 'RETRY',
    TRY_OTHER_TEXT: 'TRY OTHER PAYMENT OPTION',
    TRY_COD_TEXT: 'PLACE ORDER AS PAY ON DELIVERY'
  },
  CHARGES_FOR_PLUTUS: {
    shipping: true,
    giftwrap: true,
    cod: true,
    coverfee: true,
    trynbuy: true,
    donation: true
  }
};
