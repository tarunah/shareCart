import get from 'lodash/get';

import { isSessionStorageEnabled } from 'commonBrowserUtils/Helper';
import { getPaymentFailureCount } from 'commonBrowserUtils/PaymentHelper';
import { isGiftcardContext } from 'commonUtils/helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const {
  RECOMMENDED_INSTRUMENT,
  SAVED_INSTRUMENT,
  INSTRUMENT_ELIGIBLE_CODE,
  INSTRUMENT_NOT_ELIGIBLE_CODE,
  GIFTCARD,
  WALLET_TYPE,
  AUTO_SUBMIT_TAB_TYPE,
  SAVEDCARD_LIMIT_REACHED_CODE,
  PAY_LATER,
  BNPL_NO_PROVIDER_DATA,
  BNPL_NO_ACTIVE_ACCOUNT,
  BNPL_USER_NOT_ELIGIBLE,
  BNPL_PROVIDER_DATA_INCOMPLETE,
  BNPL_ERROR_RESPONSE_FROM_PROVIDER,
  BNPL_USER_NOT_WHITELISTED,
  SAVING_CARD_NOT_ALLOWED_CODE
} = PaymentConstants;

const showTab = (option, instrumentData = {}, config = {}) => {
  const { code } = instrumentData;
  let show = false;
  if (
    code === INSTRUMENT_ELIGIBLE_CODE ||
    (config.tabType !== AUTO_SUBMIT_TAB_TYPE &&
      get(getKVPairValue('PAYMENT_OPTIONS_ERROR'), code, false))
  ) {
    show = true;
  }
  if (code === INSTRUMENT_NOT_ELIGIBLE_CODE) {
    show = false;
  }

  switch (option) {
    case RECOMMENDED_INSTRUMENT:
      return config.mode !== 'mobile' && (instrumentData || []).length > 0;
    case SAVED_INSTRUMENT:
      (code === SAVEDCARD_LIMIT_REACHED_CODE ||
        code === SAVING_CARD_NOT_ALLOWED_CODE) &&
        (show = true);
      return (
        show &&
        config.mode !== 'mobile' &&
        (get(instrumentData, 'paymentInstrumentDetails.data', []) || [])
          .length > 0
      );
    case PAY_LATER:
      const { providerCode } =
        (get(instrumentData, 'paymentInstrumentDetails.data') || []).find(
          paymentType => paymentType.id === 1
        ) || {};
      return (
        code === INSTRUMENT_ELIGIBLE_CODE &&
        providerCode &&
        [
          BNPL_NO_PROVIDER_DATA,
          BNPL_PROVIDER_DATA_INCOMPLETE,
          BNPL_ERROR_RESPONSE_FROM_PROVIDER,
          BNPL_USER_NOT_WHITELISTED
        ].indexOf(providerCode) === -1
      );
    case WALLET_TYPE:
      const walletData = get(instrumentData, 'paymentInstrumentDetails.data');
      return (
        show &&
        (!walletData || !!walletData.find(wallet => !wallet.directDisplay))
      );
    case GIFTCARD:
      return show && config.outstandingAmount !== '0';
    default:
      return show;
  }
};

const showSuggestionNotification = ({ code } = {}, outstandingAmount) => {
  if (
    code === INSTRUMENT_ELIGIBLE_CODE &&
    !isGiftcardContext() &&
    isSessionStorageEnabled()
  ) {
    const failureCount = +getPaymentFailureCount();
    const failureThreshold = getKVPairValue('ONLINE_PAYMENT_FAILURE_THRESHOLD');
    return failureCount >= failureThreshold && outstandingAmount !== '0';
  }
  return false;
};

const showSavedInstrumentsInMobile = (
  mode,
  savedInstruments,
  outstandingAmount
) =>
  mode === 'mobile' &&
  savedInstruments &&
  savedInstruments.length > 0 &&
  outstandingAmount !== '0';

const showRecommendedInstrumentsInMobile = (
  mode,
  recommendedInstruments,
  outstandingAmount
) =>
  isFeatureEnabled('RECOMMENDED_OPTIONS') &&
  mode === 'mobile' &&
  recommendedInstruments &&
  recommendedInstruments.length > 0 &&
  outstandingAmount !== '0';

const disabledTab = (option, instrumentData) => {
  switch (option) {
    case PAY_LATER:
      const { providerCode } =
        (get(instrumentData, 'paymentInstrumentDetails.data') || []).find(
          paymentType => paymentType.id === 1
        ) || {};
      return (
        providerCode === BNPL_NO_ACTIVE_ACCOUNT ||
        providerCode === BNPL_USER_NOT_ELIGIBLE
      );
    default:
      return false;
  }
};

export {
  showTab,
  showSuggestionNotification,
  showSavedInstrumentsInMobile,
  showRecommendedInstrumentsInMobile,
  disabledTab
};
