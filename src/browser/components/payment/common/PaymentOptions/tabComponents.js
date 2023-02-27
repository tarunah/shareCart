import React from 'react';

import { Tab } from 'commonComp/TabBar';
import {
  Card,
  NetBanking,
  Cod,
  Wallets,
  WalletTab,
  RecommendedInstruments,
  SavedInstruments,
  Upi,
  EMI,
  BNPL
} from '../Options';
import DisabledBNPL from './DisabledOptions/DisabledBNPL';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { showTab, disabledTab } from './paymentOptionsHelper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { ImmobilizedSprite } from 'commonComp/ImmobilizeComponent';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';
import Sprite from 'commonComp/Sprite';
import COLORS from 'commonResources/colors';
import get from 'lodash/get';

import Styles from './paymentOptions.base.css';

import CreditCardIcon from 'iconComp/CreditCard.jsx';
import UPIIcon from 'iconComp/UPI.jsx';
import NetBankingIcon from 'iconComp/NetBanking.jsx';
import WalletIcon from 'iconComp/Wallet.jsx';
import EMIIcon from 'iconComp/EMI.jsx';
import CODIcon from 'iconComp/COD.jsx';
import Star from 'iconComp/Star.jsx';
import Flipkart from 'iconComp/Flipkart.jsx';

const IconAnimation = ({ paymentInstrumentType = '' }) => {
  const isUpi = paymentInstrumentType === 'upi';
  const isCard = paymentInstrumentType === 'card';
  const iconConfig = getKVPairValue('PAYMENTS_ICON_REVAMP');
  const upiIcons = get(iconConfig, 'upi') || ['phonepe', 'googlepay', 'bhim'];
  const cardIcons = get(iconConfig, 'card') || ['rupay', 'mastercard', 'visa'];

  return isUpi
    ? upiIcons.map(icon => (
        <ImmobilizedSprite name={`logo-${icon}`} className={Styles[icon]} />
      ))
    : isCard
    ? cardIcons.map(icon => (
        <ImmobilizedSprite name={`cardv2-${icon}`} className={Styles[icon]} />
      ))
    : null;
};

const getTabDisplay = ({
  text,
  offerString,
  subText = '',
  icon,
  prefix = '',
  iconSize = {},
  showIconInfo = false,
  paymentInstrumentType = ''
}) => selected => {
  const SVGIcon = icon;
  const showIntrumentIconInfo =
    isFeatureEnabled('PAYMENT_ICON_REVAMP') && showIconInfo;
  return (
    <span className={Styles.tabDisplayContainer}>
      <div className={Styles.tabDisplayIcon}>
        <SVGIcon
          color={selected ? COLORS.watermelon : COLORS.black}
          {...iconSize}
          prefix={prefix}
        />
      </div>
      <p className={Styles.tabText}>
        <span className={Styles.tabDisplayText}>{text}</span>
        {subText}
        <span className={Styles.inlineOffer}>{offerString}</span>
      </p>
      {showIntrumentIconInfo && (
        <div className={Styles.fadein}>
          <IconAnimation paymentInstrumentType={paymentInstrumentType} />
        </div>
      )}
    </span>
  );
};

const getWalletTabDisplay = (walletCode = '') => {
  walletCode = walletCode.toLowerCase();
  const iconDisplayWallets = getKVPairValue('WALLET_CONFIG').iconDisplayWallets;

  if (iconDisplayWallets.indexOf(walletCode) !== -1) {
    return <Sprite name={`wallet-tab-${walletCode}`} />;
  } else {
    return <span>{walletCode.toUpperCase()}</span>;
  }
};

const {
  RECOMMENDED_INSTRUMENT,
  COD,
  SAVED_INSTRUMENT,
  SAVED_CARD,
  CARD_TYPE,
  CREDIT_CARD,
  DEBIT_CARD,
  UPI,
  NETBANKING,
  EMI_TYPE,
  WALLET_TYPE,
  WALLET_TAB_TYPE,
  AUTO_SUBMIT_TAB_TYPE,
  PAY_LATER,
  INSTRUMENT_ELIGIBLE_CODE
} = PaymentConstants;

const createRecommendedInstrument = ({
  paymentConfig: { instrumentData },
  mode,
  tabNameConfig,
  inlineOffer,
  ...restProps
}) => {
  const text = get(
    tabNameConfig,
    `${RECOMMENDED_INSTRUMENT}.name`,
    'Recommended'
  );
  return (
    <Tab
      id={RECOMMENDED_INSTRUMENT}
      display={getTabDisplay({
        text,
        icon: Star,
        iconSize: { width: 14, height: 14 }
      })}
      content={
        <RecommendedInstruments
          instrumentData={instrumentData[RECOMMENDED_INSTRUMENT]}
          deviceMode={mode}
          inlineOffer={inlineOffer}
          {...restProps}
        />
      }
      show={showTab(
        RECOMMENDED_INSTRUMENT,
        instrumentData[RECOMMENDED_INSTRUMENT],
        {
          mode
        }
      )}
    />
  );
};

const createPayLater = ({
  paymentConfig: { instrumentData },
  mode,
  outstandingAmount,
  tabNameConfig,
  ...restProps
}) => {
  const text = get(tabNameConfig, `${PAY_LATER}.name`, 'Flipkart Pay Later');
  return (
    <Tab
      id={PAY_LATER}
      display={getTabDisplay({
        text,
        icon: Flipkart,
        prefix: 'flipkart-paylater',
        iconSize: { width: 16, height: 16 }
      })}
      disabledContent={
        <DisabledBNPL
          instrumentData={instrumentData.BNPL}
          payMode={restProps.payMode}
        />
      }
      content={
        <BNPL
          deviceMode={mode}
          outstandingAmount={outstandingAmount}
          instrumentData={instrumentData.BNPL}
          {...restProps}
        />
      }
      show={showTab(PAY_LATER, instrumentData[PAY_LATER])}
      disabled={disabledTab(PAY_LATER, instrumentData[PAY_LATER])}
    />
  );
};

const createSavedInstrument = ({
  paymentConfig: { instrumentData },
  paymentConfig,
  mode,
  bankDiscount,
  tabNameConfig,
  inlineOffer,
  ...restProps
}) => {
  const text = get(
    tabNameConfig,
    `${SAVED_INSTRUMENT}.name`,
    'Saved Payment Options'
  );

  const { phase2Enabled = false, purgedCardInfo } = getKVPairValue(
    'SAVED_CARD_CONSENT'
  );
  const isSaveCardPurged =
    get(restProps, 'paymentOptions.savedCardPurged', false) &&
    mode === 'desktop' &&
    phase2Enabled &&
    get(purgedCardInfo, 'enabled.savedInstruments');
  return (
    <Tab
      id={SAVED_INSTRUMENT}
      display={getTabDisplay({
        text,
        icon: Star,
        iconSize: { width: 14, height: 14 }
      })}
      content={
        <SavedInstruments
          bankDiscount={bankDiscount}
          paymentConfig={paymentConfig}
          deviceMode={mode}
          inlineOffer={inlineOffer}
          {...restProps}
        />
      }
      show={
        isSaveCardPurged ||
        showTab(SAVED_INSTRUMENT, instrumentData[SAVED_INSTRUMENT], {
          mode
        })
      }
    />
  );
};

const createCard = ({
  paymentConfig: { instrumentData },
  mode,
  bankDiscount,
  inlineOffer,
  tabNameConfig,
  ...restProps
}) => {
  const text = get(tabNameConfig, `${CARD_TYPE}.name`, 'Credit/Debit Card');
  const offer = get(inlineOffer, 'paymentInstruments.card', '');
  const offerCount = offer.length;
  const offerString = getOfferString(offerCount);

  return (
    <Tab
      id={CARD_TYPE}
      display={getTabDisplay({
        text,
        icon: CreditCardIcon,
        offerString,
        iconSize: { width: 18, height: 12 },
        showIconInfo: true,
        paymentInstrumentType: 'card'
      })}
      content={
        <Card
          instrumentData={{
            debit: instrumentData[DEBIT_CARD],
            credit: instrumentData[CREDIT_CARD]
          }}
          savedCardInstrumentData={instrumentData[SAVED_CARD]}
          deviceMode={mode}
          bankDiscount={bankDiscount}
          offer={offer}
          {...restProps}
        />
      }
      show={
        showTab(CREDIT_CARD, instrumentData[CREDIT_CARD]) &&
        showTab(DEBIT_CARD, instrumentData[DEBIT_CARD])
      }
    />
  );
};

const createNetBanking = ({
  paymentConfig: { instrumentData },
  mode,
  tabNameConfig,
  inlineOffer,
  ...restProps
}) => {
  const offer = get(inlineOffer, 'paymentInstruments.netbanking', '');
  const text = get(tabNameConfig, `${NETBANKING}.name`, 'Net Banking');
  const count = getOfferCount(
    offer,
    get(instrumentData, 'netbanking.paymentInstrumentDetails.data', '')
  );
  const offerString = getOfferString(count);

  return (
    <Tab
      id={NETBANKING}
      display={getTabDisplay({
        text,
        offerString,
        icon: NetBankingIcon,
        iconSize: { width: 18, height: 16 }
      })}
      content={
        <NetBanking
          instrumentData={instrumentData[NETBANKING]}
          offer={offer}
          deviceMode={mode}
          {...restProps}
        />
      }
      show={showTab(NETBANKING, instrumentData[NETBANKING])}
    />
  );
};

const createCOD = ({
  paymentConfig: { instrumentData },
  mode,
  tabNameConfig,
  ...restProps
}) => {
  const { cartData } = restProps;
  const shippingMethod = get(cartData, 'shippingData.method', 'NORMAL');
  const cardOnDelivery = get(
    cartData,
    `serviceability.${
      shippingMethod === 'NORMAL' ? 'standardShippingInfo' : 'valueShippingInfo'
    }.flags.cardOnDelivery.value`,
    false
  );
  const text = get(
    tabNameConfig,
    `${cardOnDelivery ? 'cardCod' : 'cod'}.name`,
    'Pay on delivery (Cash/UPI)'
  );

  let newUserCodNudgeText =
    isFeatureEnabled('NEW_USER_COD_NUDGE') &&
    get(cartData, 'userDetails.isFirstTimeCustomer') &&
    get(instrumentData[COD], 'code') === INSTRUMENT_ELIGIBLE_CODE &&
    get(getGrowthHackConfigValue('NEW_USER_COD_NUDGE'), 'text', '');
  newUserCodNudgeText = newUserCodNudgeText && (
    <div className={Styles.greenText}>{newUserCodNudgeText}</div>
  );

  return (
    <Tab
      id={COD}
      display={getTabDisplay({
        text,
        subText: newUserCodNudgeText,
        icon: CODIcon,
        iconSize: { width: 20, height: 14 }
      })}
      content={
        <Cod
          instrumentData={instrumentData[COD]}
          deviceMode={mode}
          {...restProps}
        />
      }
      show={showTab(COD, instrumentData[COD])}
    />
  );
};

const createUPI = ({
  paymentConfig: { instrumentData },
  mode,
  tabNameConfig,
  inlineOffer,
  upiAppsCount,
  ...restProps
}) => {
  const offer = get(inlineOffer, 'paymentInstruments.upi', '');
  const text = get(tabNameConfig, `${UPI}.name`, 'PhonePe/BHIM UPI');

  return (
    <Tab
      id={UPI}
      display={getTabDisplay({
        text,
        icon: UPIIcon,
        iconSize: { width: 18, height: 12 },
        showIconInfo: true,
        paymentInstrumentType: 'upi',
        offerString: getOfferString(upiAppsCount)
      })}
      content={
        <Upi
          instrumentData={instrumentData[UPI]}
          deviceMode={mode}
          offer={offer}
          {...restProps}
        />
      }
      show={showTab(UPI, instrumentData[UPI])}
    />
  );
};

const createWallet = ({
  paymentConfig: { instrumentData, walletConfig },
  mode,
  tabNameConfig,
  inlineOffer,
  ...restProps
}) => {
  const text = get(tabNameConfig, `${WALLET_TYPE}.name`, 'Paytm/Wallets');
  const offer = get(inlineOffer, 'paymentInstruments.wallet', '');
  const count = getOfferCount(
    offer,
    get(instrumentData, 'wallet.paymentInstrumentDetails.data'),
    getKVPairValue('WALLET_CONFIG').supportedWallets
  );
  const offerString = getOfferString(count);

  const WalletFragment = (
    <React.Fragment>
      <Tab
        id={WALLET_TYPE}
        display={getTabDisplay({
          text,
          offerString,
          icon: WalletIcon,
          iconSize: { width: 18, height: 16 }
        })}
        content={
          <Wallets
            instrumentData={instrumentData[WALLET_TYPE]}
            deviceMode={mode}
            offer={offer}
            {...restProps}
          />
        }
        show={showTab(WALLET_TYPE, instrumentData[WALLET_TYPE])}
      />
      {walletConfig.walletTabs.map(wallet => {
        const id = wallet.name.toLowerCase();
        return (
          <Tab
            key={id}
            id={id}
            display={getWalletTabDisplay(wallet.bankCode)}
            content={
              <WalletTab
                wallet={wallet}
                instrumentData={instrumentData[WALLET_TYPE]}
                deviceMode={mode}
                {...restProps}
              />
            }
            show={showTab(WALLET_TAB_TYPE, instrumentData[WALLET_TYPE], {
              tabType: AUTO_SUBMIT_TAB_TYPE
            })}
          />
        );
      })}
    </React.Fragment>
  );

  return WalletFragment.props.children;
};

const createEMI = ({
  paymentConfig: { instrumentData },
  mode,
  tabNameConfig,
  inlineOffer,
  ...restProps
}) => {
  const text = get(tabNameConfig, `${EMI_TYPE}.name`, 'EMI');
  const offer = get(inlineOffer, 'paymentInstruments.emi', '');
  const count = getOfferCount(
    offer,
    get(instrumentData, 'emi.paymentInstrumentDetails.data'),
    getKVPairValue('EMI_CONFIG').supportedEMIBankCode
  );
  const offerString = getOfferString(count);

  return (
    <Tab
      id={EMI_TYPE}
      display={getTabDisplay({
        text,
        offerString,
        icon: EMIIcon,
        iconSize: { width: 18, height: 16 }
      })}
      content={
        <EMI
          instrumentData={instrumentData[EMI_TYPE]}
          deviceMode={mode}
          offer={offer}
          {...restProps}
        />
      }
      show={showTab(EMI_TYPE, instrumentData[EMI_TYPE], {
        tabType: AUTO_SUBMIT_TAB_TYPE
      })}
    />
  );
};

const getOfferCount = (offer, instrumentData, switchConfig) => {
  if (!offer) return 0;
  let count = 0;
  offer.forEach(off => {
    const code = off.bankCode.toLowerCase();
    if (!switchConfig || switchConfig.indexOf(code) != -1) {
      (instrumentData || []).forEach(data => {
        if (data.bankCode.toLowerCase() == code && !data.disable) {
          count += off.offerDetails.length;
        }
      });
    }
  });
  return count;
};

const getTabCreator = type => INSTRUMENT_TABCREATOR_MAP[type];

const INSTRUMENT_TABCREATOR_MAP = {
  [RECOMMENDED_INSTRUMENT]: createRecommendedInstrument,
  [PAY_LATER]: createPayLater,
  [SAVED_INSTRUMENT]: createSavedInstrument,
  [CARD_TYPE]: createCard,
  [NETBANKING]: createNetBanking,
  [COD]: createCOD,
  [UPI]: createUPI,
  [WALLET_TYPE]: createWallet,
  [EMI_TYPE]: createEMI
};

export { getTabCreator, getTabDisplay };
