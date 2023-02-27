import { getKVPairValue } from 'commonUtils/KVPairManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
const {
  COD,
  NETBANKING,
  UPI,
  WALLET_TYPE,
  SAVED_INSTRUMENT
} = PaymentConstants;

export default {
  HEADER_MAPPING: {
    addressList: 'Select Address',
    payments: 'Change Payment',
    arrival: 'Expected Delivery Time',
    default: ''
  },
  PAYMENT_NAME_MAP: {
    netbanking: 'Net Banking',
    upi: 'UPI',
    wallet: 'Wallet',
    cod: 'Pay On Delivery'
  },
  DEFAULT: 'default',
  ARRIVAL: 'arrival',
  PAYMENT: 'payment',
  ADDRESS: 'address',
  ADDRESS_LIST: 'addressList',
  TRY_AND_BUY: 'tryAndBuy',
  MODE: 'mobile',
  SELLER_INFO_CREDIT: `Myntra Credit is not applicable on any items sold by ${getKVPairValue(
    'PAYMENT_SELLERNAME'
  )}`,
  SELLER_INFO_LOYALTY: `MynCash is not applicable on any items sold by ${getKVPairValue(
    'PAYMENT_SELLERNAME'
  )}`,
  LOYALTY_MSG: 'Use MynCash',
  CREDIT_MSG: 'Use Myntra Credits',
  LOYALTY: 'loyalty',
  CREDIT: 'credit',
  PAYABLE_TXT: 'Amount Payable',
  PAY_VIA: 'Pay Via',
  CHANGE: 'Change',
  VIEW: 'View',
  SWIPE_FACTOR: 0.4,
  SWIPE_TO_ORDER: 'SWIPE TO PLACE ORDER',
  PLACE_ORDER: 'PLACE ORDER NOW',
  PAY: 'PAY',
  CASHBACK_ERROR:
    'Could not check the discount amount for this card. Please check again.',
  OFFER_ELIGIBILITY: ' Check Offer Eligibility',
  CASHBACK_RETRY_MSG:
    ' Can not check for bank discount eligibility, please retry after 30 minutes. T&C Apply',
  VALID_PAYMENTS: [UPI, COD, NETBANKING, WALLET_TYPE, SAVED_INSTRUMENT],
  PHONEPE: 'phonepe',
  MAESTRO: 'maestro',
  KLASS_OVERRIDE_LIST: [
    'hdfc',
    'icici',
    'kotak',
    'sbi',
    'pnb',
    'axis',
    'payu',
    'airtelmoney',
    'googlepay',
    'cod'
  ],
  XPRESS_EVENT_MAP: {
    address: 'XPRESS_ARRIVAL_MORE_OPTIONS',
    addressList: 'XPRESS_ADDRESS_CLICK',
    arrival: 'XPRESS_ARRIVAL_INFO',
    payment: 'XPRESS_PAYMENT_CLICK',
    tryAndBuy: 'XPRESS_TRY_AND_BUY_CLICK'
  },
  STANDARD_DELIVERY: 'Standard Delivery (Free)',
  EXPRESS_DELIVERY: 'Express Delivery (Free)',
  MORE_OPTIONS: 'More Options',
  DELIVERY_DATE: 'Delivery Date',
  SUBMIT: 'SUBMIT',
  CAPTCHA_REQUIRED: 'Captcha Verification required'
};
