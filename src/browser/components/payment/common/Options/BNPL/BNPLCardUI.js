import React from 'react';
import get from 'lodash/get';

import Modal from 'commonComp/Modal';
import PaymentSubOption from '../../PaymentSubOption';
import ActionButton from '../../ActionButton';

import TNCIframe from './TNCIframe';
import LowSRMessage from '../../LowSRMessage';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './bnplCardUI.base.css';

import Rupee from 'iconComp/Rupee.jsx';

const ICON_CONFIG = {
  type: 'icon',
  position: 'right',
  name: 'Flipkart',
  iconSize: { width: 16, height: 16 },
  className: Styles.icon
};

export const BNPLCardUIContent = ({
  payMode,
  optionData,
  mobileValue,
  outstandingAmount,
  modalShow,
  errorMessage,
  className = '',
  setMobile,
  displayInput,
  hideTNCModal,
  onTNCSuccess
}) => {
  const disable = optionData.disable;
  return (
    <div className={className}>
      {displayInput(optionData) ? (
        <div>
          <div className={Styles.mobileNumberHeading}>
            Enter your mobile number registered with Flipkart.
          </div>
          <div
            className={`${Styles.mobileNumberInput} ${
              !!errorMessage ? Styles.inputError : ''
            }`}
          >
            <span className={Styles.extension}>+91-</span>
            <input
              className={Styles.input}
              maxLength="10"
              placeholder="Enter Mobile Number"
              value={mobileValue}
              onChange={setMobile}
            />
          </div>
          <div className={Styles.error}>{errorMessage}</div>
        </div>
      ) : (
        <div className={Styles.confirmContainer}>
          <div>
            Please confirm that you will pay the following amount through
            Flipkart Pay Later.
          </div>
          <div className={Styles.amount}>
            <Rupee className={Styles.rupeeIcon} />
            <span>{outstandingAmount}</span>
          </div>
        </div>
      )}
      <LowSRMessage
        show={disable || optionData.lowSuccessRate}
        instrumentType={PaymentConstants.PAY_LATER}
        instrumentName={optionData.name}
        className={Styles.lowSRMessage}
        disable={disable}
      />
      {modalShow && (
        <Modal
          className={Styles.tncModal}
          cancelCallback={hideTNCModal}
          enableBackButton={payMode !== 'retry'}
          cancelIconConfig={{ show: true }}
        >
          <TNCIframe
            src={`${optionData.tncUrl}&origin=${window.location.origin}`}
            successCallback={onTNCSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

const getDisplayText = () => {
  const cardNameConfig = getKVPairValue('PAYMENT_RECOMMENDED_CONFIG');
  const text = get(
    cardNameConfig,
    `${PaymentConstants.PAY_LATER}.name`,
    'Flipkart Pay Later'
  );
  return text;
};

export default ({
  rank,
  payMode,
  optionData,
  deviceMode,
  selectedId,
  classNames,
  idPrefix,
  selectInstrument,
  onActionButtonClick,
  ...contentProps
}) => {
  const selected = selectedId === 'paylater';
  const disable = optionData.disable;
  return (
    <PaymentSubOption
      key={`${idPrefix}paylater`}
      id={`${idPrefix}paylater`}
      selected={selected}
      iconConfig={ICON_CONFIG}
      displayName={getDisplayText()}
      classNames={classNames}
      onClickParams={{
        mobile: contentProps.getMobile(),
        authenticationRequired: optionData.authenticationRequired,
        instrumentType: optionData.instrumentType,
        paymentUrl: optionData.paymentUrl,
        rank
      }}
      onClick={selectInstrument}
    >
      {selected ? (
        <BNPLCardUIContent
          payMode={payMode}
          optionData={optionData}
          {...contentProps}
          className={Styles.content}
        />
      ) : null}
      <ActionButton
        text={
          optionData.authenticationRequired ? 'VERIFY & PAY' : 'PLACE ORDER'
        }
        onClick={onActionButtonClick}
        visible={selected && !disable}
        className={Styles.actionButton}
        deviceMode={deviceMode}
      />
    </PaymentSubOption>
  );
};
