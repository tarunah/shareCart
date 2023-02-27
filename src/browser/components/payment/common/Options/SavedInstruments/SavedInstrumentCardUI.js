import React from 'react';
import get from 'lodash/get';

import { RadioButton } from 'commonComp/Radio';
import InstrumentCard from './InstrumentCard';
import ActionButton from '../../ActionButton';

import Styles from './savedInstrumentCardUI.base.css';

export default ({
  rank,
  payMode,
  optionData: instrumentInfo,
  selectedId,
  cartData,
  deviceMode,
  idPrefix,
  bankDiscount,
  cvv,
  cvvError,
  paymentOptions,
  retryGCappliedValue,
  installedApps,
  upiIntentEnabled,
  classNames,
  selectInstrument,
  removeSavedCard,
  setCvv,
  updateBankDiscount,
  handlePaymentAction,
  onActionButtonClick,
  toggleAllowTokenization,
  allowTokenization,
  tokenizationFlag
}) => {
  const selected = instrumentInfo.instrumentId === selectedId;
  const maestroCard =
    (instrumentInfo.cardType || '').toLowerCase() === 'maestro';
  const disable = instrumentInfo.disable;

  if (instrumentInfo.expired || instrumentInfo.inValid || maestroCard) {
    return (
      <InstrumentCard
        id={`${idPrefix}${instrumentInfo.instrumentId}`}
        removeSavedCard={removeSavedCard}
        className={`${Styles.expiredCard} ${classNames.container}`}
        toggleAllowTokenization={toggleAllowTokenization}
        allowTokenization={allowTokenization}
        tokenizationFlag={tokenizationFlag}
        deviceMode={deviceMode}
        {...instrumentInfo}
      />
    );
  }

  return (
    <div className={`${Styles.rowContainer} ${classNames.container}`}>
      <RadioButton
        classes={{
          root: Styles.radioContainer,
          icon: Styles.radioIcon
        }}
        key={`${idPrefix}${instrumentInfo.instrumentId}`}
        id={`${idPrefix}${instrumentInfo.instrumentId}`}
        onClickParams={{
          name: instrumentInfo.paymentInstrumentType,
          cvv,
          vpa: instrumentInfo.vpa,
          appName: (instrumentInfo.appName || '')
            .toLowerCase()
            .replace(/\s/g, ''),
          upiIntentEnabled,
          installedApps,
          bankDiscount,
          instrumentType: instrumentInfo.instrumentType,
          paymentInstrumentType: instrumentInfo.paymentInstrumentType,
          paymentUrl: instrumentInfo.paymentUrl,
          rank
        }}
        onClick={selectInstrument}
        checked={selected}
        disabled={disable}
      >
        <InstrumentCard
          payMode={payMode}
          cartData={cartData}
          setCvv={setCvv}
          cvv={cvv}
          cvvError={cvvError}
          updateBankDiscount={updateBankDiscount}
          handlePaymentAction={handlePaymentAction}
          removeSavedCard={removeSavedCard}
          selected={selected}
          disable={disable}
          paymentOptions={paymentOptions}
          retryGCappliedValue={retryGCappliedValue}
          toggleAllowTokenization={toggleAllowTokenization}
          allowTokenization={allowTokenization}
          tokenizationFlag={tokenizationFlag}
          deviceMode={deviceMode}
          {...instrumentInfo}
        />
      </RadioButton>
      {deviceMode === 'desktop' && selected && (
        <ActionButton
          text="PAY NOW"
          className={Styles.actionButton}
          onClick={onActionButtonClick}
          visible={selected}
          deviceMode={deviceMode}
        />
      )}
    </div>
  );
};
