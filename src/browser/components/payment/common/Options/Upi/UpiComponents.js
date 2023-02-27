import React, { useState } from 'react';
import get from 'lodash/get';

import ActionButton from '../../ActionButton';
import PaymentSubOption from '../../PaymentSubOption';
import InputWithDropdown from 'commonComp/InputWithDropdown';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getOfferString } from 'commonBrowserUtils/PaymentHelper';
import Styles from './upiComponents.base.css';
import LowSRMessage from '../../LowSRMessage';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import Info from 'iconComp/Info.jsx';
import OfferBanner from '../../OfferBanner';

const DisplayOffers = ({ optionData }) => {
  const numberOfOffers = get(optionData, 'offerDetails', '').length || 0;
  let offerString = numberOfOffers > 0 ? getOfferString(numberOfOffers) : '';
  return (
    <p className={Styles.cardText}>
      <span className={Styles.displayMain}>{optionData.displayName}</span>
      <span className={Styles.inlineOffer}>{offerString}</span>
    </p>
  );
};
const VISIBLE_LIMIT = get(getKVPairValue('UPI_CONFIG'), 'visible_limit') || 3;

class OptionUI extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsCollapsed: props.deviceMode === 'mobile'
    };
    this.showMoreOptions = this.showMoreOptions.bind(this);
  }

  showMoreOptions() {
    this.setState({
      isOptionsCollapsed: false
    });
  }

  render() {
    const {
      setRef,
      appsConfig,
      selectApp,
      offerData,
      selectedAppId,
      onActionButtonClick,
      deviceMode,
      ...vpaFieldProps
    } = this.props;
    const { isOptionsCollapsed } = this.state;
    let upiListLength = 0;
    return (
      <div ref={setRef}>
        {deviceMode !== 'mobile' && (
          <div className={Styles.heading}>Pay using UPI</div>
        )}
        <div>
          {Object.keys(appsConfig)
            .sort(
              (key1, key2) => appsConfig[key1].order - appsConfig[key2].order
            )
            .map(id => {
              let containerClassName = '';
              if (appsConfig[id].show) {
                if (deviceMode === 'mobile') {
                  containerClassName =
                    isOptionsCollapsed && upiListLength + 1 > VISIBLE_LIMIT
                      ? Styles.hide
                      : '';
                }
                upiListLength++;
              }
              return (
                <UPIApp
                  key={id}
                  optionData={appsConfig[id]}
                  selectedId={selectedAppId}
                  idPrefix={'upiApp-'}
                  selectInstrument={selectApp}
                  onActionButtonClick={onActionButtonClick}
                  deviceMode={deviceMode}
                  classNames={{ container: containerClassName }}
                  offerData={offerData}
                  {...vpaFieldProps}
                />
              );
            })}
        </div>
        {isOptionsCollapsed && upiListLength > VISIBLE_LIMIT && (
          <div className={Styles.showMore} onClick={this.showMoreOptions}>
            {`+${upiListLength - VISIBLE_LIMIT} More UPI option${
              upiListLength - VISIBLE_LIMIT > 1 ? `s` : ''
            }`}
          </div>
        )}
      </div>
    );
  }
}

const VPAField = ({
  error,
  saveInfoShow,
  saveCheck,
  toggleSaveInfo,
  toggleCheckbox,
  onInputChange,
  vpa,
  handles,
  withHandle,
  selectedHandle,
  handlesShown,
  toggleHandles,
  selectHandle,
  deviceMode,
  hasLowSR,
  instrumentName,
  instrumentType
}) => (
  <div className={Styles.vpaField}>
    <InputWithDropdown
      inputContainerClass={Styles.inputWithDropdown}
      withDropdown={withHandle}
      entries={handles}
      selectedEntry={selectedHandle}
      entriesShown={handlesShown}
      toggleEntries={toggleHandles}
      selectEntry={selectHandle}
      deviceMode={deviceMode}
      placeholder="Enter UPI ID here"
      onChange={onInputChange}
      value={vpa}
      error={error}
    />
    <LowSRMessage
      instrumentType={instrumentType}
      instrumentName={instrumentName}
      className={Styles.lowSRMessage}
      show={hasLowSR}
    />
    {!!vpa && (
      <div className={Styles.saveUpiBlock}>
        {saveCheck ? (
          <CheckboxActive
            className={`${Styles.checkIcon} ${Styles.checked}`}
            onClick={toggleCheckbox}
          />
        ) : (
          <CheckboxInactive
            className={Styles.checkIcon}
            onClick={toggleCheckbox}
          />
        )}
        <span className={Styles.saveText}>Save UPI ID for faster payments</span>
        <Info className={Styles.saveInfoIcon} onClick={toggleSaveInfo} />
        {saveInfoShow ? (
          <div className={Styles.saveInfo}>
            Save your UPI ID with us to make your next purchase quick and easy.
            Your UPI ID information will be 100% safe with us. We do not save
            your MPIN.
          </div>
        ) : null}
      </div>
    )}
  </div>
);

const UPIApp = ({
  context,
  rank,
  optionData: app,
  selectedId,
  selectInstrument,
  onActionButtonClick,
  deviceMode,
  idPrefix,
  classNames,
  optionData,
  ...vpaFieldProps
}) => {
  const iconDisplayUPI = getKVPairValue('UPI_CONFIG').iconDisplayUPI;

  const appId = `${app.id}`;
  const selected = selectedId === appId;
  const displayIcon =
    iconDisplayUPI.indexOf(app.bankCode) !== -1 ? app.bankCode : 'otherupi';
  const hasLowSR = app.hasLowSR;
  const disabled = app.disable;
  const instrumentName = app.name === 'googlepay' ? 'Google Pay' : 'UPI';
  const offerData = optionData.offerDetails || '';
  const renderedCarouselItems = offerData
    ? offerData.map(data => {
        return <div key={data.message}>{data.message}</div>;
      })
    : null;
  return app.show ? (
    <PaymentSubOption
      id={`${idPrefix}${appId}`}
      key={`${idPrefix}${appId}`}
      selected={selected}
      iconName={`logo-${displayIcon}`}
      iconConfig={{ position: context === 'reco' ? 'right' : 'left' }}
      displayName={<DisplayOffers optionData={app} />}
      classNames={classNames}
      onClickParams={{
        name: app.displayName,
        vpaRequired: app.vpa,
        intentEnabled: app.intentEnabled,
        vpa: vpaFieldProps.vpa,
        vpaWithHandle: app.vpaWithHandle,
        selectedHandle: vpaFieldProps.selectedHandle,
        saveCheck: vpaFieldProps.saveCheck,
        instrumentType: app.instrumentType,
        paymentUrl: app.paymentUrl,
        rank
      }}
      offerData={offerData}
      onClick={selectInstrument}
      disabled={disabled}
    >
      {selected ? (
        app.vpa ? (
          <VPAField
            {...vpaFieldProps}
            deviceMode={deviceMode}
            withHandle={app.vpaWithHandle}
            hasLowSR={hasLowSR}
            instrumentName={instrumentName}
            instrumentType={app.instrumentType}
          />
        ) : (
          <LowSRMessage
            instrumentType={app.instrumentType}
            instrumentName={app.displayName}
            className={Styles.lowSRMessage}
            show={hasLowSR}
          />
        )
      ) : (
        <LowSRMessage
          instrumentType={app.instrumentType}
          instrumentName={app.displayName}
          className={Styles.lowSRMessage}
          show={disabled}
          disable={disabled}
        />
      )}

      {selected && renderedCarouselItems && (
        <OfferBanner
          selected={selected}
          offerData={offerData}
          deviceMode={deviceMode}
          name={app.displayName}
        />
      )}

      <ActionButton
        text="PAY NOW"
        className={Styles.actionButton}
        onClick={onActionButtonClick}
        visible={selected}
        deviceMode={deviceMode}
      />
    </PaymentSubOption>
  ) : null;
};

export { OptionUI, UPIApp };
