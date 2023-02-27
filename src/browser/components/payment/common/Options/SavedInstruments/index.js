import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import PropTypes from 'prop-types';

import PayNowHandler from '../../PayNowHandler';

//Utilities
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import {
  getUidx,
  errorNotification,
  successNotification,
  isAndroidApp
} from 'commonBrowserUtils/Helper';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import {
  getInstalledAppsPromise,
  getUPISupportedPgPromise
} from 'commonBrowserUtils/PaymentHelper';
import Loader from 'commonComp/Loader';

import PurgedCardInfo from '../../PurgedCardInfo';
import SavedInstrumentCardUI from './SavedInstrumentCardUI';

import Styles from './savedInstruments.base.css';

const VISIBLE_LIMIT = 3;

const boundFuncs = [
  'setCvv',
  'getModeAttributes',
  'getOptionUI',
  'getInstrumentRow',
  'submitCallback',
  'showMoreOptions',
  'removeSavedCard',
  'getInstrumentDetails',
  'selectInstrument',
  'isCVVOptional',
  'isValidCvv',
  'setActionButtonRef',
  'onActionButtonClick',
  'onRemoveSavedCard',
  'fireEvent',
  'toggleAllowTokenization',
  'setLoader'
];

class SavedInstruments extends React.PureComponent {
  constructor(props) {
    super(props);

    const instrumentListArr = this.getInstrumentDetails();
    this.state = {
      allowTokenization: false,
      tokenizationFlag: '',
      cardType: '',
      vpa: '',
      vpaAppName: '',
      cvv: '',
      cvvError: false,
      isOptionsCollapsed: props.deviceMode === 'mobile',
      selectedInstrumentId: '',
      selectedInstrumentType: '',
      installedApps: [],
      upiIntentEnabled: false,
      instrumentListArr,
      upiSupportedPG: [],
      loading: false
    };
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.fireEvent(instrumentListArr);
    this.savedCardAutoConsentInfo =
      get(getKVPairValue('SAVED_CARD_CONSENT'), 'autoConsent.savedCard') || {};
    this.isAutoConsentAutoChecked = get(
      this.savedCardAutoConsentInfo,
      'autoChecked',
      true
    );
    this.isCardAutoTokenizationEnabled = isFeatureEnabled(
      'PAYMENT_SAVE_CARD_AUTO_CONSENT'
    );
    this.isPurgedCardEnabled = get(
      getKVPairValue('SAVED_CARD_CONSENT').purgedCardInfo || {},
      'enabled.savedInstruments'
    );
  }

  fireEvent(instrumentListArr = []) {
    let typeOfCard = [];
    let bankNames = [];
    instrumentListArr.forEach(item => {
      typeOfCard.push(item.productType);
      bankNames.push(item.cardBankName);
    });
    const cartValue = get(this.props, 'cartData.price.subTotal');
    triggerEvent('SAVED_CARD_FLAG', {
      custom: {
        custom: {
          v1: getUidx(),
          v2: bankNames.join('_'),
          v3: typeOfCard.join('_'),
          v4: cartValue
        },
        widget_items: {
          data_set: {
            data: [
              {
                entity_name: 'payment_saved_cards_offers',
                entity_optional_attribute: {
                  uidx: getUidx(),
                  cartValue,
                  bankNames: bankNames.join('_'),
                  typeOfCard: typeOfCard.join('_')
                }
              }
            ]
          }
        }
      }
    });
  }

  setLoader(loading, callback) {
    this.setState({ loading }, callback);
  }

  toggleAllowTokenization() {
    this.setState(prevState => ({
      allowTokenization: !prevState.allowTokenization
    }));
  }

  isValidCvv() {
    return (
      this.state.cvv &&
      this.state.cvv.length >= 3 &&
      /^\d*$/.test(this.state.cvv)
    );
  }

  isCVVOptional() {
    const { instrumentListArr, selectedInstrumentId } = this.state;
    const card = instrumentListArr.find(
      card => card.instrumentId === selectedInstrumentId
    );
    return card && (card.cardType || '').toLowerCase() === 'maestro';
  }

  clearTabSelection(callback) {
    const { deviceMode, switchTab } = this.props;
    deviceMode === 'mobile' && switchTab('', { callback });
  }

  componentDidMount() {
    this.clearTabSelection();
    this.setInstalledAppsConfig();
    this.setUPIPGs();
    triggerEvent('SAVED_CARD_SELECTED');
  }

  clearSelection() {
    this.setState({
      selectedInstrumentId: '',
      selectedInstrumentType: '',
      cvv: '',
      cvvError: false,
      vpa: '',
      vpaAppName: ''
    });
    triggerEvent('CLOSE_SAVED_CARDS');
  }

  setInstalledAppsConfig() {
    this.setLoader(true, () => {
      getInstalledAppsPromise().then(({ installedApps, upiSDKEnabled }) => {
        this.setState({
          installedApps,
          upiIntentEnabled:
            upiSDKEnabled && isFeatureEnabled('UPI_INTENT_ENABLED')
        });
        this.setLoader(false);
      });
    });
  }

  setUPIPGs() {
    this.setLoader(true, () => {
      getUPISupportedPgPromise().then(pgString => {
        pgString = pgString.replace(/[\[\] ]/g, '').split(',');
        this.setState({
          upiSupportedPG: pgString
        });
        this.setLoader(false);
      });
    });
  }

  setCvv(e = { target: {} }) {
    const {
      target: { value }
    } = e;
    this.setState({ cvv: value, cvvError: false });
  }

  getModeAttributes() {
    const {
      props: { bankDiscount },
      state: { upiIntentEnabled, installedApps, vpaAppName, upiSupportedPG }
    } = this;

    const appIntentEnabled =
      upiIntentEnabled && installedApps.indexOf(vpaAppName) !== -1;
    let upiPG = {};

    if (isAndroidApp() && appIntentEnabled) {
      upiPG['upiSupportedPG'] = upiSupportedPG;
    }

    let consent = {};
    if (this.isAutoConsentAutoChecked) {
      if (this.state.allowTokenization && this.state.tokenizationFlag) {
        consent['tokenizationConsent'] = 'true';
      }
    } else {
      if (!this.state.allowTokenization && this.state.tokenizationFlag) {
        consent['tokenizationConsent'] = 'true';
      }
    }
    return {
      useSavedCard: `${this.state.selectedInstrumentType === 'card'}`,
      useSavedVpa: `${this.state.selectedInstrumentType === 'vpa'}`,
      upiSdkEnabled: appIntentEnabled,
      cvvCode: this.state.cvv,
      otherCards: 'false',
      paymentInstrument: this.state.selectedInstrumentId,
      bankCashbackEligible: `${bankDiscount !== 0}`,
      bankCashbackAmount: bankDiscount,
      user: getUidx(),
      ...consent,
      ...upiPG
    };
  }

  getInstrumentDetails() {
    const {
      paymentConfig: { instrumentData }
    } = this.props;
    const savedInstruments = instrumentData[PaymentConstants.SAVED_INSTRUMENT];
    const dataArr = [
      ...(get(savedInstruments, 'paymentInstrumentDetails.data', []) || [])
    ];
    const inValidInstruments = [],
      validInstruments = [];

    dataArr.forEach(info => {
      if (
        info.expired ||
        info.inValid ||
        (info.cardType || '').toLowerCase() === 'maestro'
      ) {
        inValidInstruments.push(info);
      } else {
        validInstruments.push(info);
      }
    });

    return validInstruments.concat(inValidInstruments);
  }

  showMoreOptions() {
    this.setState({
      isOptionsCollapsed: false
    });
  }

  onRemoveSavedCard(instrumentId) {
    const { paymentConfig, updatePageData } = this.props;
    const updatedConfig = { ...paymentConfig };
    const { instrumentData } = updatedConfig;
    const { SAVED_INSTRUMENT } = PaymentConstants;
    const dataArr = get(
      instrumentData[SAVED_INSTRUMENT],
      'paymentInstrumentDetails.data',
      []
    );

    set(
      instrumentData[SAVED_INSTRUMENT],
      'paymentInstrumentDetails.data',
      dataArr.filter(item => {
        return item.instrumentId !== instrumentId;
      })
    );

    updatePageData(updatedConfig, { updateKey: 'paymentConfig' });
  }

  removeSavedCard(event) {
    const instrumentId = event.target.getAttribute('data-instrumentid');
    if (instrumentId) {
      const { instrumentListArr } = this.state;

      PaymentsManager.removeSavedCard(
        instrumentId,
        res => {
          successNotification({
            message: 'Card successfully removed.'
          });
          this.setState({
            instrumentListArr: instrumentListArr.filter(
              details => details.instrumentId !== instrumentId
            )
          });

          this.onRemoveSavedCard(instrumentId);

          triggerEvent('REMOVE_EXPIRED_CARD', {
            maData: {
              entity_type: 'remove expired card',
              entity_name: 'expired card',
              entity_id: instrumentId
            }
          });
        },
        errorNotification
      );
    }
  }

  async selectInstrument(val) {
    const selectedInstrumentId = val.slice(16);

    if (selectedInstrumentId === this.state.selectedInstrumentId) {
      return;
    }

    const { instrumentListArr } = this.state;

    const instrumentData = instrumentListArr.find(
      obj => obj.instrumentId === selectedInstrumentId
    );

    const appName = (instrumentData.appName || '')
      .toLowerCase()
      .replace(/\s/g, '');

    this.setState(
      {
        allowTokenization: false,
        tokenizationFlag: '',
        cardType: instrumentData.cardType,
        selectedInstrumentId,
        selectedInstrumentType: instrumentData.paymentInstrumentType,
        cvv: '',
        cvvError: false,
        vpa: instrumentData.vpa || '',
        vpaAppName: appName
      },
      () => {
        this.clearTabSelection();
      }
    );

    try {
      if (
        instrumentData.paymentInstrumentType === 'card' &&
        !instrumentData.tokenizationConsent
      ) {
        const { eligibleForTokenization } = await PaymentsManager.getCardType(
          instrumentData.maskedCardNumber
        );
        if (eligibleForTokenization) {
          this.setState({
            allowTokenization: true,
            tokenizationFlag: true
          });
        } else {
          this.setState({
            tokenizationFlag: false
          });
        }
      }
    } catch (e) {}
  }

  getInstrumentRow(instrumentInfo, index) {
    const {
      state: {
        selectedInstrumentId,
        isOptionsCollapsed,
        cvv,
        cvvError,
        allowTokenization,
        tokenizationFlag
      },
      props: {
        cartData,
        updateBankDiscount,
        handlePaymentAction,
        deviceMode,
        payMode,
        paymentOptions,
        retryGCappliedValue
      },
      removeSavedCard,
      selectInstrument,
      setCvv,
      onActionButtonClick,
      toggleAllowTokenization
    } = this;
    let containerClassName = '';

    if (deviceMode === 'mobile') {
      containerClassName =
        isOptionsCollapsed && index + 1 > VISIBLE_LIMIT ? Styles.hide : '';
    } else {
      containerClassName = Styles.fullWidth;
    }

    return (
      <SavedInstrumentCardUI
        payMode={payMode}
        optionData={instrumentInfo}
        selectedId={selectedInstrumentId}
        cartData={cartData}
        deviceMode={deviceMode}
        idPrefix="savedinstrument-"
        cvv={cvv}
        cvvError={cvvError}
        paymentOptions={paymentOptions}
        retryGCappliedValue={retryGCappliedValue}
        classNames={{ container: containerClassName }}
        selectInstrument={selectInstrument}
        removeSavedCard={removeSavedCard}
        setCvv={setCvv}
        updateBankDiscount={updateBankDiscount}
        handlePaymentAction={handlePaymentAction}
        onActionButtonClick={onActionButtonClick}
        toggleAllowTokenization={toggleAllowTokenization}
        allowTokenization={
          this.isAutoConsentAutoChecked ? allowTokenization : !allowTokenization
        }
        tokenizationFlag={tokenizationFlag}
      />
    );
  }

  getOptionUI() {
    const {
      state: { instrumentListArr, isOptionsCollapsed },
      props: { deviceMode },
      isPurgedCardEnabled
    } = this;

    let isSavedCardPresent = false;
    isSavedCardPresent = instrumentListArr.some(instrument => {
      return (
        instrument.paymentInstrumentType === 'card' &&
        !instrument.expired &&
        !instrument.disable &&
        !instrument.invalid
      );
    });

    return (
      <div>
        {deviceMode === 'mobile' ? (
          <div className={Styles.savedInstrumentMobileHeading}>
            SAVED PAYMENT OPTIONS
          </div>
        ) : (
          <div className={Styles.savedInstrumentDesktopHeading}>
            Pay using saved options
          </div>
        )}

        {isPurgedCardEnabled && (
          <PurgedCardInfo
            deviceMode={deviceMode}
            show={get(this, 'props.paymentOptions.savedCardPurged')}
            isSavedCardPresent={isSavedCardPresent}
          />
        )}
        <div className={Styles.savedInstrumentContainer}>
          {instrumentListArr.map(this.getInstrumentRow)}
          {isOptionsCollapsed && instrumentListArr.length > VISIBLE_LIMIT && (
            <div className={Styles.showMore} onClick={this.showMoreOptions}>
              {`+${instrumentListArr.length - VISIBLE_LIMIT} More saved option${
                instrumentListArr.length - VISIBLE_LIMIT > 1 ? `s` : ''
              }`}
            </div>
          )}
        </div>
      </div>
    );
  }

  submitCallback(done) {
    const {
      instrumentListArr,
      selectedInstrumentId,
      selectedInstrumentType,
      cvv,
      upiIntentEnabled,
      installedApps,
      vpaAppName
    } = this.state;

    let valid = false;
    let message = '';

    if (!selectedInstrumentId) {
      message = 'Select a payment option to place order.';
    } else if (selectedInstrumentType === 'card') {
      if (this.isCVVOptional() || this.isValidCvv()) {
        valid = true;
      } else {
        this.setState({ cvvError: true });
        if (cvv) {
          message = 'Invalid CVV, please enter a valid CVV.';
        } else {
          message = 'Enter CVV to place order.';
        }
      }
    } else if (selectedInstrumentType === 'vpa') {
      console.log(
        '[Checkout savedInstruments] upiSdkEnabled: ',
        upiIntentEnabled && installedApps.indexOf(vpaAppName) !== -1
      );
      valid = true;
    }

    if (valid) {
      const instrumentData = instrumentListArr.find(
        obj => obj.instrumentId === selectedInstrumentId
      );
      triggerEvent('CARD_SUBMIT');

      triggerEvent('PAYMENT_OPTION_SUBMIT', {
        custom: {
          custom: {
            v1: `${PaymentConstants.SAVED_INSTRUMENT}, ${instrumentData.paymentInstrumentType}`,
            v2: PaymentConstants.SAVED_INSTRUMENT,
            v3: this.props.rank,
            v4: isFeatureEnabled('RECOMMENDED_OPTIONS')
          },
          widget_items: {
            data_set: {
              entity_name: 'payment_option',
              entity_id: 'payment_option'
            }
          }
        }
      });

      done();
    } else {
      SHELL.alert('info', {
        message,
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.setLoader(false);
    }
  }

  onActionButtonClick(e) {
    e.preventDefault();
    this.actionButton.click();
  }

  setActionButtonRef(node) {
    this.actionButton = node;
  }

  render() {
    if (!this.state.instrumentListArr || !this.state.instrumentListArr.length) {
      const isSavedCardPurged = get(
        this,
        'props.paymentOptions.savedCardPurged'
      );
      if (isSavedCardPurged && isPurgedCardEnabled) {
        const {
          props: { deviceMode },
          isPurgedCardEnabled
        } = this;

        return (
          <div>
            {deviceMode === 'mobile' ? (
              <div className={Styles.savedInstrumentMobileHeading}>
                SAVED PAYMENT OPTIONS
              </div>
            ) : (
              <div className={Styles.savedInstrumentDesktopHeading}>
                Pay using saved options
              </div>
            )}
            {isPurgedCardEnabled && (
              <PurgedCardInfo
                deviceMode={deviceMode}
                show={isSavedCardPurged}
              />
            )}
          </div>
        );
      }
      return '';
    }

    const {
      props,
      props: {
        paymentConfig: { instrumentData },
        payMode,
        retrySessionEnabled
      },
      state: {
        selectedInstrumentType,
        cardType,
        allowTokenization,
        tokenizationFlag,
        loading
      }
    } = this;

    const {
      paymentInstrumentDetails: { paymentUrl }
    } = instrumentData[PaymentConstants.SAVED_INSTRUMENT];
    const isTokenizationConsentTaken =
      this.isCardAutoTokenizationEnabled &&
      this.isAutoConsentAutoChecked &&
      tokenizationFlag;
    return (
      <React.Fragment>
        <PayNowHandler
          {...props}
          allowTokenization={
            isTokenizationConsentTaken ? !allowTokenization : allowTokenization
          }
          isTokenizationConsentTaken={isTokenizationConsentTaken}
          cardType={cardType}
          paymentUrl={paymentUrl}
          paymentMode={
            selectedInstrumentType === 'vpa'
              ? PaymentConstants.UPI
              : PaymentConstants.CREDIT_CARD
          }
          paymentModeName={PaymentConstants.SAVED_INSTRUMENT}
          actionData={{
            hide: true,
            disable: payMode === 'retry' && !retrySessionEnabled
          }}
          optionUI={this.getOptionUI()}
          modeAttributes={this.getModeAttributes()}
          submitCallback={this.submitCallback}
          setActionButtonRef={this.setActionButtonRef}
          paymentInstrument={
            selectedInstrumentType === 'vpa'
              ? PaymentConstants.UPI
              : PaymentConstants.NETBANKING
          }
        />
        <Loader show={loading} backdrop={true} />
      </React.Fragment>
    );
  }
}

SavedInstruments.defaultProps = {
  switchTab: () => {}
};

SavedInstruments.propTypes = {
  cartData: PropTypes.object.isRequired,
  paymentConfig: PropTypes.object.isRequired,
  updatePageData: PropTypes.func.isRequired
};

export default SavedInstruments;
