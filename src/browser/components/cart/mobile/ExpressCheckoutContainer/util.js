import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getInstrumentData } from 'commonBrowserUtils/PaymentHelper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

import ExpressConstants from './expressConstants';
const { VALID_PAYMENTS, PHONEPE, PAYMENT_NAME_MAP } = ExpressConstants;

const {
  CREDIT_CARD,
  DEBIT_CARD,
  COD,
  NETBANKING,
  UPI,
  VPA,
  SAVED_INSTRUMENT,
  WALLET_PM_NAME,
  INSTRUMENT_ELIGIBLE_CODE,
  SAVEDCARD_LIMIT_REACHED_CODE,
  SAVING_CARD_NOT_ALLOWED_CODE,
  BANK_MAP,
  CARD_TYPE
} = PaymentConstants;

const formatDate = d => {
  let today = new Date();
  today.setDate(today.getDate() + d);
  const [date, month, day, year] = today.toString().split(' ');
  return `${day} ${month}, ${year} (${date})`;
};

const transformString = str => (str || '').toLowerCase().replace(/\s/g, '');

const getDefaultBank = (bankList = []) => {
  return bankList.find(bank => bank.defaultBank) || bankList[0] || {};
};

const isPaymentInstrumentValid = (instrumentData = {}) => {
  const {
    type,
    code,
    paymentInstrumentDetails: { data = [] } = {}
  } = instrumentData;
  return (
    VALID_PAYMENTS.indexOf(type) !== -1 &&
    (code === INSTRUMENT_ELIGIBLE_CODE ||
      code === SAVEDCARD_LIMIT_REACHED_CODE ||
      code === SAVING_CARD_NOT_ALLOWED_CODE) &&
    !!data &&
    data.length
  );
};

const getPaymentModeFromWallet = (wallet = {}) => {
  return wallet.directIntegration
    ? PaymentConstants.WALLET_PM_DIRECT
    : PaymentConstants.WALLET_PM;
};

const getPaymentInstrumentList = (paymentObj = {}) => {
  let { paymentInstrumentDetails: { data } = {} } = paymentObj;
  data = data || [];
  return data;
};

const PRIORITY_WALLET_ID_LIST = [
  {
    id: 3,
    name: 'PayPal'
  },
  {
    id: 43,
    name: 'Airtel Money'
  },
  {
    id: 69,
    name: 'PayZapp'
  },
  {
    id: 46,
    name: 'Mobikwik'
  },
  {
    id: 2,
    name: 'Paytm'
  },
  {
    id: 67,
    name: 'FreeCharge'
  }
];

const nameNotTest = name => name && !transformString(name).includes('test');

const getDefaultWallet = (
  walletList = [],
  priority = PRIORITY_WALLET_ID_LIST
) => {
  if (!walletList.length) return {};
  const directWallet = walletList.filter(wallet => wallet.directIntegration);
  const filteredWallet = !directWallet.length ? walletList : directWallet;
  if (filteredWallet.length === 1 && nameNotTest(filteredWallet[0].name)) {
    return filteredWallet[0];
  }
  const { supportedWallets } = getKVPairValue('WALLET_CONFIG');
  let highPriorityWallet = filteredWallet[0];
  for (let i = 0; i < priority.length; i++) {
    let item = priority[i];
    // Returns the first wallet found based on priority
    highPriorityWallet = filteredWallet.find(wallet => {
      let walletCode = transformString(wallet && wallet.bankCode);
      let priorityWalletCode = transformString(item && item.bankCode);
      return (
        supportedWallets.indexOf(walletCode) > -1 &&
        (walletCode === priorityWalletCode ||
          walletCode.includes(priorityWalletCode))
      );
    });
    if (highPriorityWallet) {
      break;
    }
  }
  return highPriorityWallet;
};

const getPaymentModeObj = (
  paymentType,
  instrumentData = {},
  finalAmount,
  priorityList
) => {
  const {
    paymentInstrumentDetails: { data, paymentUrl } = {}
  } = instrumentData;

  let walletObj;
  let paymentMode = paymentType,
    paymentModeName = paymentType;
  switch (paymentType) {
    case UPI:
      paymentMode = UPI;
      paymentModeName = UPI;
      break;
    case NETBANKING:
      paymentMode = NETBANKING;
      paymentModeName = NETBANKING;
      break;
    case WALLET_PM_NAME:
      paymentModeName = WALLET_PM_NAME;
      walletObj = getDefaultWallet(data, priorityList);
      paymentMode = getPaymentModeFromWallet(walletObj);
      break;
    case SAVED_INSTRUMENT:
      const paymentInstrumentData = getDefaultSavedInstrument(instrumentData);
      const savedInstrumentType = get(
        paymentInstrumentData,
        'paymentInstrumentType',
        ''
      );
      const isVpa = savedInstrumentType === VPA;
      paymentMode = isVpa ? UPI : CREDIT_CARD;
      paymentModeName = SAVED_INSTRUMENT;
      break;
    case COD:
      paymentMode = COD;
      paymentModeName = COD;
      break;
  }
  if (finalAmount === 0) {
    paymentMode = paymentModeName = PaymentConstants.FREE_PURCHASE;
  }
  return { paymentMode, paymentModeName, paymentUrl };
};

const isValidCard = card => !(card.expired || card.inValid);

const getDefaultSavedInstrument = savedInstrumentData => {
  const data = getPaymentInstrumentList(savedInstrumentData);
  return data.find(savedInstrument => {
    if (savedInstrument.paymentInstrumentType === VPA) {
      return savedInstrument;
    } else if (savedInstrument.paymentInstrumentType === CARD_TYPE) {
      return isValidCard(savedInstrument);
    }
    return false;
  });
};

const getDefaultPaymentInstrument = (paymentsData = {}) => {
  if (isFeatureEnabled('RECOMMENDED_OPTIONS')) {
    return paymentsData.recommendedPaymentInstrumentDetails[0];
  }

  const { lastPaymentOption = COD } = paymentsData;

  let paymentType =
    lastPaymentOption === CREDIT_CARD || lastPaymentOption === DEBIT_CARD
      ? SAVED_INSTRUMENT
      : lastPaymentOption;
  const savedInstrumentData = getPaymentInstrumentByType(
    paymentsData,
    SAVED_INSTRUMENT
  );
  const hasValidSavedInstrument = getDefaultSavedInstrument(
    savedInstrumentData
  );

  if (paymentType === UPI) {
    let upiData = getPaymentInstrumentByType(paymentsData, UPI);
    let upiList = getPaymentInstrumentList(upiData);
    let defaultUPI = getDefaultBank(upiList);
    let upiName = ((defaultUPI && defaultUPI.name) || '').toLowerCase();
    upiName = upiName.replace(/\s/g, '');
    let isPhonePe = upiName.includes(PHONEPE);
    if (!isPhonePe) {
      paymentType = SAVED_INSTRUMENT;
    }
  }

  if (
    paymentType === SAVED_INSTRUMENT &&
    !hasValidSavedInstrument //Resort to COD if no match found
  ) {
    paymentType = COD;
  }
  return getInstrumentData(paymentsData, paymentType);
};

const getPaymentInstrumentByType = (paymentOptions = {}, type) => {
  const { paymentInstrumentDetails = [] } = paymentOptions;
  return paymentInstrumentDetails.find(instrument => instrument.type === type);
};

const getCreditTitle = (hasLoyalty, hasGC) => {
  let creditTitle = '';
  if (hasLoyalty && hasGC) {
    creditTitle = 'Myntra Credit & MynCash';
  } else if (hasLoyalty && !hasGC) {
    creditTitle = 'MynCash';
  } else if (hasGC && !hasLoyalty) {
    creditTitle = 'Myntra Credits';
  }
  return creditTitle;
};

const formatDateFromEpoch = epoch => {
  if (epoch == null) return;
  const d = new Date(Number(epoch));
  const [date, month, day, year] = d.toString().split(' ');
  return `${day} ${month}, ${year} (${date})`;
};

const getDeliveryByType = (shippingEstimates, type) => {
  if (shippingEstimates == null) return;
  const delivery = get(
    shippingEstimates.find(
      ({ shippingMethod = '' }) => shippingMethod === type
    ),
    'promiseDate'
  );
  if (delivery !== undefined) return Number(delivery);
};

const getProductDeliveryDate = shippingEstimates => {
  if (shippingEstimates == null) return;

  if (isFeatureEnabled('SPEED_11')) {
    const expressDelivery = getDeliveryByType(shippingEstimates, 'EXPRESS');
    if (expressDelivery !== undefined) return expressDelivery;
  }

  const normalDelivery = getDeliveryByType(shippingEstimates, 'NORMAL');
  return normalDelivery;
};

const getDeliveryDates = serviceabilityData => {
  if (serviceabilityData == null) return;
  return serviceabilityData.map(({ shippingEstimates }) =>
    getProductDeliveryDate(shippingEstimates)
  );
};

const getMinDeliveryDate = serviceabilityData => {
  if (serviceabilityData == null) return;
  const minDelivery = getDeliveryDates(serviceabilityData).reduce(
    (v1, v2) => (v1 < v2 ? v1 : v2),
    Number.POSITIVE_INFINITY
  );
  if (minDelivery != Number.POSITIVE_INFINITY)
    return formatDateFromEpoch(minDelivery);
};

const getMaxDeliveryDate = serviceabilityData => {
  if (serviceabilityData == null) return;
  const maxDelivery = getDeliveryDates(serviceabilityData).reduce(
    (v1, v2) => (v1 > v2 ? v1 : v2),
    Number.NEGATIVE_INFINITY
  );
  if (maxDelivery != Number.NEGATIVE_INFINITY)
    return formatDateFromEpoch(maxDelivery);
};

const getDefaultUPI = (data = []) =>
  data.find(
    entry => entry.name && entry.name.toLowerCase().includes(PHONEPE)
  ) || {};

const getSpriteObj = (instrumentData, paymentType) => {
  let spriteName,
    bankName = '',
    paymentName,
    defaultBank,
    payerName,
    vpa,
    walletName;
  const { walletPriority } = getGrowthHackConfigValue('XPRESS_CHECKOUT_CONFIG');
  const iconDisplayUPI = getKVPairValue('UPI_CONFIG').iconDisplayUPI;
  let { paymentInstrumentDetails: { data } = {}, type } = instrumentData;
  data = data || [];
  paymentName = PAYMENT_NAME_MAP[paymentType];
  const paymentInstrumentData = getDefaultSavedInstrument(instrumentData);
  const savedInstrumentType = get(
    paymentInstrumentData,
    'paymentInstrumentType',
    ''
  );

  if (type === NETBANKING) {
    defaultBank = getDefaultBank(data) || {};
    bankName = defaultBank.name || '';
    spriteName = `wallet-${BANK_MAP[bankName.toLowerCase()] || 'bank'}`;
  }

  if (type === UPI) {
    // Currently being used only for PhonePE
    defaultBank = getDefaultUPI(data) || {};
    bankName = defaultBank.name || '';
    let name = bankName.toLowerCase();
    name = name.replace(/\s/g, '');
    const displayIcon = iconDisplayUPI.indexOf(name) !== -1 ? name : 'otherupi';
    spriteName = `upi-${displayIcon}`;
  }

  if (type === SAVED_INSTRUMENT && savedInstrumentType === VPA) {
    bankName = (paymentInstrumentData.appName || '').toLowerCase();
    payerName = paymentInstrumentData.payerAccountName;
    vpa = paymentInstrumentData.vpa;
    bankName = bankName.replace(/\s/g, '');

    const displayIcon =
      iconDisplayUPI.indexOf(bankName) !== -1 ? bankName : 'otherupi';
    spriteName = `upi-${displayIcon}`;
  }

  if (type === WALLET_PM_NAME) {
    defaultBank = getDefaultWallet(data, walletPriority) || {};
    bankName = defaultBank.name || 'bank';
    walletName = bankName.toLowerCase().replace(/\s/g, '');
    spriteName =
      walletName === 'paypal'
        ? `wallet-tab-${walletName}`
        : `wallet-${walletName}`;
  }
  return {
    bankName,
    spriteName,
    paymentName,
    payerName,
    vpa
  };
};

export {
  formatDate,
  formatDateFromEpoch,
  isValidCard,
  getPaymentInstrumentList,
  isPaymentInstrumentValid,
  getDefaultPaymentInstrument,
  getPaymentInstrumentByType,
  getDefaultSavedInstrument,
  getPaymentModeObj,
  getDefaultWallet,
  getDefaultBank,
  getCreditTitle,
  getProductDeliveryDate,
  getMinDeliveryDate,
  getMaxDeliveryDate,
  getSpriteObj
};
