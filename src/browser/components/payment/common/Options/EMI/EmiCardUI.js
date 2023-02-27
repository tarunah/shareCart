import React from 'react';
import get from 'lodash/get';

import ActionButton from '../../ActionButton';
import PaymentSubOption from '../../PaymentSubOption';
import LowSRMessage from '../../LowSRMessage';
import EMILimitMessage from './EMILimitMessage';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getEmiEligibility } from 'commonBrowserUtils/PaymentHelper';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';

import Styles from './emiCardUI.base.css';
import OfferBanner from '../../OfferBanner';

const Display = ({ name, subText }) => (
  <span>
    <span className={Styles.displayMain}>{name}</span>
    <span className={Styles.displaySub}>{subText}</span>
  </span>
);

const DisplayOffers = ({ optionData }) => {
  const numberOfOffers = get(optionData, 'offerDetails', '').length || 0;
  let offerString = numberOfOffers > 0 ? getOfferString(numberOfOffers) : '';
  return (
    <p className={Styles.cardText}>
      <span className={Styles.displayMain}>{optionData.name}</span>
      <span className={Styles.inlineOffer}>{offerString}</span>
    </p>
  );
};

export default ({
  context,
  rank,
  optionData,
  deviceMode,
  selectedId,
  idPrefix,
  classNames,
  selectInstrument,
  onActionButtonClick
}) => {
  const iconConfig = getKVPairValue('EMI_CONFIG').iconDisplayEMI;
  const { lowSuccessRate: hasLowSR } = optionData;
  let name = optionData.name.toLowerCase();
  name = name.replace(/\s/g, ''); //remove spaces
  const selected = selectedId === `${optionData.id}`;
  const iconName = iconConfig.indexOf(name) !== -1 ? name : 'creditcardemi';
  const { emiLimit, code } = optionData;
  const isEMIEligible = getEmiEligibility(code);
  const disabled = optionData.disable;
  const showEMILimitMessage = !isEMIEligible && !disabled;
  const offerData = optionData.offerDetails || '';
  const renderedCarouselItems = offerData
    ? offerData.map(data => {
        return <div key={data.message}>{data.message}</div>;
      })
    : null;
  if (selected && (disabled || !isEMIEligible)) {
    selectInstrument(`emi-`);
  }
  return (
    <PaymentSubOption
      key={`${idPrefix}${optionData.id}`}
      id={`${idPrefix}${optionData.id}`}
      selected={selected && isEMIEligible}
      iconName={`wallet-${iconName}`}
      iconConfig={{ position: context === 'reco' ? 'right' : 'left' }}
      displayName={<DisplayOffers optionData={optionData} />}
      offerData={offerData}
      classNames={classNames}
      onClickParams={{
        name: optionData.name,
        rank,
        instrumentType: optionData.instrumentType,
        paymentUrl: optionData.paymentUrl
      }}
      onClick={selectInstrument}
      disabled={disabled || !isEMIEligible}
    >
      {showEMILimitMessage && (
        <EMILimitMessage emiLimit={emiLimit} code={code} />
      )}

      {selected && renderedCarouselItems && (
        <OfferBanner
          selected={selected}
          offerData={offerData}
          deviceMode={deviceMode}
          name={optionData.name}
        />
      )}

      {!showEMILimitMessage && (
        <LowSRMessage
          instrumentType={optionData.instrumentType}
          instrumentName={optionData.name}
          className={Styles.lowSRMessage}
          show={(selected && hasLowSR) || disabled}
          disable={disabled}
        />
      )}
      <ActionButton
        text="PAY NOW"
        onClick={onActionButtonClick}
        visible={selected && isEMIEligible}
        className={Styles.actionButton}
        deviceMode={deviceMode}
      />
    </PaymentSubOption>
  );
};
