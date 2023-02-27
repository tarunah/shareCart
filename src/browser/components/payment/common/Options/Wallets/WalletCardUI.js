import React from 'react';
import get from 'lodash/get';

import ActionButton from '../../ActionButton';
import PaymentSubOption from '../../PaymentSubOption';
import LowSRMessage from '../../LowSRMessage';

import { sanitizeName } from './walletHelper';

import Styles from './walletCardUI.base.css';
import OfferBanner from '../../OfferBanner';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';

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
  optionData: wallet,
  optionData,
  selectedId,
  deviceMode,
  totalPayable,
  idPrefix,
  classNames,
  selectInstrument,
  onActionButtonClick
}) => {
  const walletName = sanitizeName(wallet.bankCode);
  const walletId = wallet.id;
  const hasLowSR = wallet.lowSuccessRate;
  const selected = selectedId === `${walletId}`;
  const disabled = wallet.disable;
  const offerData = optionData.offerDetails || '';
  const display = <DisplayOffers optionData={wallet} />;
  const renderedCarouselItems = offerData
    ? offerData.map(data => {
        return <div key={data.message}>{data.message}</div>;
      })
    : null;
  return (
    <PaymentSubOption
      key={`${idPrefix}${walletId}`}
      id={`${idPrefix}${walletId}`}
      selected={selected}
      iconName={`logo-${walletName}`}
      iconConfig={{ position: context === 'reco' ? 'right' : 'left' }}
      displayName={display}
      classNames={classNames}
      onClickParams={{
        name: wallet.name,
        totalPayable,
        instrumentType: wallet.instrumentType,
        directIntegration: wallet.directIntegration,
        paymentUrl: wallet.paymentUrl,
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
          name={wallet.name}
        />
      )}

      <LowSRMessage
        instrumentType={wallet.instrumentType}
        instrumentName={wallet.name}
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
