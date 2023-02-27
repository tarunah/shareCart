import React from 'react';

import ActionButton from '../../ActionButton';
import PaymentSubOption from '../../PaymentSubOption';
import LowSRMessage from '../../LowSRMessage';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

import Styles from './netbankingCardUI.base.css';
import get from 'lodash/get';
import OfferBanner from '../../OfferBanner';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';

const Display = ({ name, subText }) => (
  <span>
    <span className={Styles.displayMain}>{name}</span>
    <span className={Styles.displaySub}>{subText}</span>
  </span>
);

const DisplayOffers = ({ optionData, subText }) => {
  const offer = get(optionData, 'offerDetails', '');
  const numberOfOffers = offer.length || 0;
  let offerString = numberOfOffers > 0 ? getOfferString(numberOfOffers) : '';
  return (
    <span>
      <p className={Styles.cardText}>
        <span className={Styles.displayMain}>{optionData.name}</span>
        <span className={Styles.inlineOffer}>{offerString}</span>
      </p>
      <p className={Styles.displaySub}>{subText}</p>
    </span>
  );
};

export default ({
  context,
  rank,
  optionData,
  selectedId,
  deviceMode,
  idPrefix,
  classNames,
  selectInstrument,
  onActionButtonClick
}) => {
  const disabled = optionData.disable;
  const selected = selectedId === `${optionData.id}`;
  const hasLowSR = optionData.lowSuccessRate;
  const display =
    context === 'reco' ? (
      <DisplayOffers optionData={optionData} subText="Netbanking" />
    ) : (
      <DisplayOffers optionData={optionData} subText="" />
    );
  const offerData = optionData.offerDetails || '';
  const renderedCarouselItems = offerData
    ? offerData.map(data => {
        return <div key={data.message}>{data.message}</div>;
      })
    : null;
  return (
    <PaymentSubOption
      key={`${idPrefix}${optionData.id}`}
      id={`${idPrefix}${optionData.id}`}
      selected={selected}
      iconName={`logo-${PaymentConstants.BANK_MAP[
        optionData.name.toLowerCase()
      ] || 'bank'}`}
      offerData={offerData}
      iconConfig={{ position: context === 'reco' ? 'right' : 'left' }}
      displayName={display}
      classNames={classNames}
      onClickParams={{
        name: optionData.name,
        instrumentType: optionData.instrumentType,
        paymentUrl: optionData.paymentUrl,
        rank
      }}
      onClick={selectInstrument}
      disabled={disabled}
    >
      {selected && renderedCarouselItems && (
        <OfferBanner
          selected={selected}
          offerData={offerData}
          deviceMode={deviceMode}
          name={optionData.name}
        />
      )}

      <LowSRMessage
        netBanking={true}
        instrumentType={optionData.instrumentType}
        instrumentName={optionData.name}
        className={Styles.lowSRMessage}
        show={(selected && hasLowSR) || disabled}
        disable={disabled}
      />
      <ActionButton
        text="PAY NOW"
        className={Styles.actionButton}
        onClick={onActionButtonClick}
        visible={selected}
        deviceMode={deviceMode}
      />
    </PaymentSubOption>
  );
};
