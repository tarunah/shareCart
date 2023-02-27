import React from 'react';
import get from 'lodash/get';

import {
  getComponent,
  getFormattedData
} from './recommendedInstrumentsComponentConfig';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import PayNowHandler from '../../PayNowHandler';
import PurgedCardInfo from '../../PurgedCardInfo';

import Styles from './recommendedInstrumentsUI.base.css';

const VISIBLE_LIMIT = 3;

class RecommendedInstrumentsUI extends React.Component {
  constructor(props) {
    super(props);

    const boundFuncs = ['filterInstrumentsForLowSR', 'getOptionUI'];

    boundFuncs.forEach(func => (this[func] = this[func].bind(this)));
    this.purgedCardInfoConfig =
      getKVPairValue('SAVED_CARD_CONSENT').purgedCardInfo || {};
  }

  filterInstrumentsForLowSR(instruments) {
    if (!isFeatureEnabled('LOW_SR_OPTIONS_REMOVE')) {
      return instruments;
    }

    const { instrumentState, instrumentStaticParams } = this.props;
    const filteredInstruments = instruments.filter((instrumentData, index) => {
      const instrumentType = instrumentData.type;

      if (instrumentType === PaymentConstants.UPI) {
        const optionData = get(
          instrumentData,
          'paymentInstrumentDetails.data.0'
        );
        const stateParams = instrumentState[instrumentType] || {};
        const staticParams = instrumentStaticParams[instrumentType] || {};
        const instrumentParams = { ...stateParams, ...staticParams };
        const formattedOptionData = getFormattedData(
          { ...optionData, instrumentType },
          instrumentParams
        );

        return formattedOptionData.show &&
          !(
            instrumentData.paymentInstrumentDetails &&
            Array.isArray(instrumentData.paymentInstrumentDetails.data) &&
            instrumentData.paymentInstrumentDetails.data.length > 0 &&
            instrumentData.paymentInstrumentDetails.data[0].lowSuccessRate
          )
          ? true
          : false;
      }

      return true;
    });

    return filteredInstruments.length > 0 ? filteredInstruments : instruments;
  }

  getOptionUI() {
    const {
      props: {
        instrumentList,
        payMode,
        cartData,
        paymentOptions,
        selectedId,
        instrumentState,
        deviceMode,
        bankDiscount,
        outstandingAmount,
        totalPayable,
        isOptionsCollapsed,
        instrumentStaticParams,
        showMoreOptions,
        selectInstrument,
        onActionButtonClick,
        updateBankDiscount,
        handlePaymentAction,
        setLoader,
        instrumentActionHandlers
      }
    } = this;

    const filteredInstrumentList = this.filterInstrumentsForLowSR(
      instrumentList
    );
    const isPurgedCardEnabled = get(
      this.purgedCardInfoConfig,
      'enabled.recommendedInstruments'
    );
    return (
      <div>
        <div
          className={`${
            deviceMode === 'mobile'
              ? Styles.recommendedInstrumentsMobileHeading
              : Styles.recommendedInstrumentsDesktopHeading
          }`}
        >
          Recommended Payment Options
        </div>
        {isPurgedCardEnabled && (
          <PurgedCardInfo
            deviceMode={deviceMode}
            show={get(this, 'props.paymentOptions.savedCardPurged')}
          />
        )}
        <div className={Styles.recommendedInstrumentContainer}>
          {filteredInstrumentList.map((instrumentData, index) => {
            const instrumentType = instrumentData.type;
            const paymentUrl = get(
              instrumentData,
              'paymentInstrumentDetails.paymentUrl'
            );
            const optionData = get(
              instrumentData,
              'paymentInstrumentDetails.data.0'
            );
            const stateParams = instrumentState[instrumentType] || {};
            const staticParams = instrumentStaticParams[instrumentType] || {};
            const instrumentParams = { ...stateParams, ...staticParams };
            const formattedOptionData = getFormattedData(
              { ...optionData, instrumentType, paymentUrl },
              instrumentParams
            );
            const actionHandlers = instrumentActionHandlers[instrumentType];
            const Component = getComponent(instrumentType);

            let containerClassName = '';
            if (deviceMode === 'mobile') {
              containerClassName =
                isOptionsCollapsed && index + 1 > VISIBLE_LIMIT
                  ? Styles.hide
                  : '';
              containerClassName += ` ${Styles.rowContainer}`;
            } else {
              containerClassName = Styles.fullWidth;
            }

            return (
              <Component
                context="reco"
                rank={index + 1}
                payMode={payMode}
                optionData={formattedOptionData}
                cartData={cartData}
                paymentOptions={paymentOptions}
                selectedId={selectedId}
                deviceMode={deviceMode}
                bankDiscount={bankDiscount}
                outstandingAmount={outstandingAmount}
                totalPayable={totalPayable}
                idPrefix={`reco_${instrumentType}-`}
                classNames={{
                  container: containerClassName,
                  text: Styles.text
                }}
                selectInstrument={selectInstrument}
                onActionButtonClick={onActionButtonClick}
                updateBankDiscount={updateBankDiscount}
                handlePaymentAction={handlePaymentAction}
                setLoader={setLoader}
                {...instrumentParams}
                {...actionHandlers}
              />
            );
          })}

          {isOptionsCollapsed && filteredInstrumentList.length > VISIBLE_LIMIT && (
            <div className={Styles.showMore} onClick={showMoreOptions}>
              {`+${filteredInstrumentList.length - VISIBLE_LIMIT} More option${
                filteredInstrumentList.length - VISIBLE_LIMIT > 1 ? `s` : ''
              }`}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      props: { payNowFormParams, instrumentList, selectedRank, ...restProps }
    } = this;
    const instrumentData = instrumentList[selectedRank - 1];
    const paymentInstrument =
      get(
        instrumentData,
        'paymentInstrumentDetails.data[0].paymentInstrumentType'
      ) || get(instrumentData, 'type');
    const cardType =
      get(instrumentData, 'paymentInstrumentDetails.data[0].cardType') || '';
    return (
      <PayNowHandler
        {...payNowFormParams}
        {...restProps}
        instrumentData={instrumentData}
        paymentInstrument={paymentInstrument}
        containerName={PaymentConstants.RECOMMENDED_INSTRUMENT}
        optionUI={this.getOptionUI()}
        actionData={{
          hide: true,
          disable:
            restProps.payMode === 'retry' && !restProps.retrySessionEnabled
        }}
        cardType={cardType}
      />
    );
  }
}

export default RecommendedInstrumentsUI;
