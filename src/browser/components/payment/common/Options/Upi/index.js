import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pick from 'lodash/pick';

import PayNowHandler from '../../PayNowHandler';
import PaymentOptionError from '../PaymentOptionError';
import { OptionUI } from './UpiComponents';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import {
  getInstalledAppsPromise,
  getUPISupportedPgPromise,
  addOffersToInstrumentDetails,
  inlineOfferWidgetLoadEvent
} from 'commonBrowserUtils/PaymentHelper';
import { scrollIntoView, isApp, isAndroidApp } from 'commonBrowserUtils/Helper';
import Loader from 'commonComp/Loader';

const optionUIHandlers = [
  'selectApp',
  'selectHandle',
  'onInputChange',
  'toggleCheckbox',
  'toggleHandles',
  'toggleSaveInfo',
  'onActionButtonClick',
  'setRef'
];

export const sanitizeName = name => {
  /*
   convert to lowercase and remove spaces
  */
  return name.toLowerCase().replace(/\s/g, '');
};

class Upi extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appsConfig: this.appsConfigCallback({}),
      selectedAppId: '',
      vpa: '',
      selectedHandle: '',
      handlesShown: false,
      saveCheck: true,
      saveInfoShow: false,
      error: '',
      upiSupportedPG: [],
      loading: false
    };

    [
      'getValidity',
      'submitCallback',
      'setActionButtonRef',
      'appsConfigCallback',
      'setUPIPGs',
      'filterAppsForLowSR',
      'setLoader',
      ...optionUIHandlers
    ].forEach(method => (this[method] = this[method].bind(this)));

    this.handles = getKVPairValue('UPI_CONFIG').vpaHandles;
    const { offer, instrumentData } = this.props;
    this.props.updateBankDiscount(0);
    isFeatureEnabled('INLINE_OFFER') &&
      addOffersToInstrumentDetails(offer, instrumentData);
  }

  componentDidMount() {
    this.setLoader(true, () => {
      const appsConfigPromise = this.getAppsConfigPromise();
      this.setUPIPGs();
      appsConfigPromise.then(appsConfig => {
        this.setState({ appsConfig: this.filterAppsForLowSR(appsConfig) });
        this.setLoader(false);
      });
    });
  }

  setLoader(loading, callback) {
    this.setState({ loading }, callback);
  }

  filterAppsForLowSR(apps) {
    if (!isFeatureEnabled('LOW_SR_OPTIONS_REMOVE')) {
      return apps;
    }
    const filteredApps = {};

    const keys = Object.keys(apps);

    keys.forEach(key => {
      if (!apps[key].hasLowSR && apps[key].show) {
        filteredApps[key] = apps[key];
      }
    });

    return Object.keys(filteredApps).length > 0 ? filteredApps : apps;
  }

  sortUPI() {
    let supportedUPI =
      isFeatureEnabled('PAYMENT_OPTION_REORDER') &&
      get(this.props, 'cartData.userDetails.isFirstTimeCustomer', false)
        ? getKVPairValue('UPI_CONFIG').firstTimeCustomerUPI
        : getKVPairValue('UPI_CONFIG').supportedUPI;
    supportedUPI = isFeatureEnabled('GPAY_ABOVE_PHONEPE')
      ? getKVPairValue('UPI_CONFIG').gpayFirst
      : supportedUPI;
    const allUPI =
      get(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];
    const paymentPersonalizationConfig =
      getKVPairValue('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
    if (
      (isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT3') ||
        isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT4')) &&
      get(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')
    ) {
      return allUPI.filter(
        upi => supportedUPI.indexOf(upi.bankCode.toLowerCase()) !== -1
      );
    } else {
      return supportedUPI.reduce((acc, upiCode) => {
        const upi = allUPI.find(upiObj => {
          const bankCode = upiObj.bankCode.toLowerCase();
          return bankCode === upiCode;
        });
        upi && acc.push(upi);
        return acc;
      }, []);
    }
  }

  getModeAttributes() {
    const {
      state: {
        appsConfig,
        vpa,
        selectedHandle,
        selectedAppId,
        saveCheck,
        upiSupportedPG
      }
    } = this;

    let baseModeAttributes = {
      paymentProviderId: selectedAppId || '',
      vpa: vpa ? `${vpa}${selectedHandle}` : '',
      upiSdkEnabled: get(appsConfig, `${selectedAppId}.intentEnabled`, '') || ''
    };

    if (isAndroidApp() && vpa === '') {
      baseModeAttributes['upiSupportedPG'] = upiSupportedPG;
    }

    return {
      ...baseModeAttributes,
      saveVpa: saveCheck ? 'on' : ''
    };
  }

  appsConfigCallback({ upiSDKEnabled = false, installedApps = [] }) {
    const {
      instrumentData: { type: instrumentType }
    } = this.props;

    const upiList = this.sortUPI();
    const _isApp = isApp();
    this.upiIntentEnabled =
      upiSDKEnabled && isFeatureEnabled('UPI_INTENT_ENABLED');
    return upiList.reduce(
      (acc, upiOption, order) => {
        const bankCode = upiOption.bankCode.toLowerCase();
        const name = sanitizeName(bankCode);
        const isOtherUPI = bankCode === 'otherupi';
        const isGooglePay = bankCode === 'googlepay';
        const appIntentEnabled =
          installedApps.indexOf(name) !== -1 && this.upiIntentEnabled;
        /*
         * App will be shown if
         *  - it is listed in UPI_CONFIG.supportedUPI
         *  - it is popular
         *  - if not popular, it favors intent flow (app is installed, upi intent FG is enabled and upi sdk is enabled)
         * App will show vpa field if
         *   - it is "Others UPI" option
         *   - it is "Google Pay" option and it does not favor intent flow
         * App will show vpa field with handles if
         *  - it is "Google Pay"
         */
        acc[`${upiOption.id}`] = {
          id: upiOption.id,
          name,
          displayName: upiOption.name,
          bankCode,
          show: _isApp ? appIntentEnabled || isOtherUPI : upiOption.popular,
          vpaWithHandle: isGooglePay,
          vpa: isOtherUPI || (isGooglePay && !appIntentEnabled),
          intentEnabled: appIntentEnabled,
          instrumentType,
          hasLowSR: upiOption.lowSuccessRate,
          disable: upiOption.disable,
          order,
          offerDetails: upiOption.offerDetails
        };
        return acc;
      },
      {} //initial value
    );
  }

  getAppsConfigPromise() {
    return new Promise(resolve => {
      getInstalledAppsPromise().then(({ installedApps, upiSDKEnabled }) => {
        resolve(
          this.appsConfigCallback({
            installedApps,
            upiSDKEnabled
          })
        );
      });
    });
  }

  setUPIPGs() {
    getUPISupportedPgPromise().then(pgString => {
      pgString = pgString.replace(/[\[\] ]/g, '').split(',');
      this.setState({
        upiSupportedPG: pgString
      });
    });
  }

  onInputChange(e) {
    this.setState({
      vpa: e.currentTarget.value
    });
  }

  toggleHandles() {
    this.setState(prevState => ({ handlesShown: !prevState.handlesShown }));
  }

  toggleCheckbox() {
    this.setState(prevState => ({ saveCheck: !prevState.saveCheck }));
  }

  toggleSaveInfo() {
    this.setState(prevState => ({ saveInfoShow: !prevState.saveInfoShow }));
  }

  selectHandle(e) {
    this.setState({
      selectedHandle: e.currentTarget.id.slice(6),
      handlesShown: false
    });
  }

  selectApp(val) {
    const appId = val.slice(7);
    if (appId !== this.state.selectedAppId) {
      const app = this.state.appsConfig[appId];

      triggerEvent('PAYMENT_UPI_OPTION_SELECT', { gaLabel: app.name });
      inlineOfferWidgetLoadEvent(
        'upi',
        app.name,
        app.offerDetails ? true : false
      );
      this.setState({
        selectedAppId: appId,
        vpa: '',
        error: '',
        selectedHandle: app.vpaWithHandle ? this.handles[0] : ''
      });
    }
  }

  getValidity() {
    const {
      state: { appsConfig, vpa, selectedAppId }
    } = this;
    const validity = { valid: true, message: '', toast: false };

    if (!selectedAppId) {
      validity.valid = false;
      validity.message = 'Select a payment option to place order.';
      validity.toast = true;
    }

    const isVPAEmpty =
      selectedAppId && appsConfig[selectedAppId].vpa && !(vpa && vpa.trim());

    if (isVPAEmpty) {
      validity.valid = false;
      validity.message = 'Please enter UPI ID';
    }

    return validity;
  }

  setRef(node) {
    this.optionUI = node;
  }

  setActionButtonRef(node) {
    this.actionButton = node;
  }

  onActionButtonClick(e) {
    e.preventDefault();
    this.actionButton.click();
  }

  getOptionUI() {
    const {
      state,
      handles,
      props: { deviceMode }
    } = this;
    return (
      <OptionUI
        {...state}
        handles={handles}
        deviceMode={deviceMode}
        {...pick(this, optionUIHandlers)}
      />
    );
  }

  scrollToView() {
    scrollIntoView(this.optionUI, {
      behavior: 'smooth',
      block: 'center'
    });
  }

  triggerSubmitEvent() {
    const app = this.state.appsConfig[this.state.selectedAppId];
    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: `${PaymentConstants.UPI}, ${app.name}`,
          v2: PaymentConstants.UPI,
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
  }

  submitCallback(done) {
    const {
      state: { vpa, selectedHandle },
      getValidity
    } = this;

    const validity = getValidity();
    if (validity.valid) {
      if (vpa) {
        PaymentsManager.validateVPA(
          `${vpa}${selectedHandle}`,
          () => {
            this.triggerSubmitEvent();
            done();
          },
          err => {
            this.setLoader(false);
            this.setState({
              error: err.message
            });
            this.scrollToView();
          }
        );
      } else {
        this.triggerSubmitEvent();
        done();
      }
    } else {
      if (validity.toast) {
        SHELL.alert('info', {
          message: validity.message,
          styleOverrides: {
            notifyMainDiv: `bottom: 82px;`
          }
        });
      } else {
        this.setState({
          error: validity.message
        });
        this.scrollToView();
      }
      this.setLoader(false);
    }
  }

  render() {
    const {
      props,
      props: {
        instrumentData: {
          code,
          paymentInstrumentDetails: { paymentUrl }
        },
        payMode,
        retrySessionEnabled
      }
    } = this;

    const loading = this.state.loading;

    return code === PaymentConstants.INSTRUMENT_ELIGIBLE_CODE ? (
      <React.Fragment>
        <PayNowHandler
          {...props}
          paymentUrl={paymentUrl}
          paymentMode={PaymentConstants.UPI}
          paymentModeName={PaymentConstants.UPI}
          formAttributes={{ noValidate: true }}
          modeAttributes={this.getModeAttributes()}
          optionUI={this.getOptionUI()}
          submitCallback={this.submitCallback}
          setActionButtonRef={this.setActionButtonRef}
          actionData={{
            hide: true,
            disable: payMode === 'retry' && !retrySessionEnabled
          }}
          paymentInstrument={PaymentConstants.UPI}
        />
        <Loader show={loading} backdrop={true} />
      </React.Fragment>
    ) : (
      <PaymentOptionError option="UPI" code={code} />
    );
  }
}

Upi.propTypes = {
  mode: PropTypes.string,
  updateStickyButton: PropTypes.func
};

Upi.defaultProps = {
  updateStickyButton: () => {}
};

export default Upi;
