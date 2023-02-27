import React from 'react';
import get from 'lodash/get';

import Captcha from 'commonComp/Captcha';
import PaymentSubOption from '../../PaymentSubOption';
import ActionButton from '../../ActionButton';
import Strings from 'commonBrowserUtils/Strings';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './codCardUI.base.css';

const ICON_CONFIG = {
  type: 'icon',
  position: 'right',
  name: 'COD',
  iconSize: { width: 20, height: 14 },
  className: Styles.icon
};

export const CodCardUIContent = ({
  errorMessage,
  captchaEnabled,
  className = '',
  setCaptchaRef,
  setLoader,
  setCaptchaDetails,
  errorAttribute
}) => {
  const infoMessage = getKVPairValue('COD_INFO_MESSAGE');
  const codHelpText =
    get(getKVPairValue('COD_HELP_TEXT'), 'helpText') ||
    get(Strings, 'COD_HELP_TEXT');
  return (
    <div className={className}>
      {infoMessage ? (
        <div className={Styles.infoMessage}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={Styles.errorMessage}>{errorMessage}</div>
      ) : null}
      {captchaEnabled ? (
        <Captcha
          ref={setCaptchaRef}
          setLoader={setLoader}
          setCaptchaDetails={setCaptchaDetails}
          errorAttribute={errorAttribute}
        />
      ) : null}
      <div className={Styles.helpText}>
        <div className={Styles.helpText}>{` ${codHelpText} `}</div>
      </div>
    </div>
  );
};

const getDisplayText = cartData => {
  const cardNameConfig = getKVPairValue('PAYMENT_RECOMMENDED_CONFIG');
  const shippingMethod = get(cartData, 'shippingData.method', 'NORMAL');
  const cardOnDelivery = get(
    cartData,
    `serviceability.${
      shippingMethod === 'NORMAL' ? 'standardShippingInfo' : 'valueShippingInfo'
    }.flags.cardOnDelivery.value`,
    false
  );
  const text = get(
    cardNameConfig,
    `${cardOnDelivery ? 'cardCod' : 'cod'}.name`,
    'Pay on delivery (Cash/UPI)'
  );
  return text;
};

export default ({
  rank,
  optionData,
  cartData,
  deviceMode,
  selectedId,
  classNames,
  idPrefix,
  selectInstrument,
  onActionButtonClick,
  ...contentProps
}) => {
  const selected = selectedId === 'cod';
  return (
    <PaymentSubOption
      key={`${idPrefix}cod`}
      id={`${idPrefix}cod`}
      selected={selected}
      iconConfig={ICON_CONFIG}
      displayName={getDisplayText(cartData)}
      classNames={classNames}
      onClickParams={{
        twoFAEnabled: contentProps.twoFAEnabled,
        instrumentType: optionData.instrumentType,
        paymentUrl: optionData.paymentUrl,
        rank
      }}
      onClick={selectInstrument}
    >
      {selected ? (
        <CodCardUIContent {...contentProps} className={Styles.content} />
      ) : null}
      <ActionButton
        text="PLACE ORDER"
        onClick={onActionButtonClick}
        visible={selected}
        className={Styles.actionButton}
        deviceMode={deviceMode}
      />
    </PaymentSubOption>
  );
};
