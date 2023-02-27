import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import PayNowHandler from '../../PayNowHandler';
import PaymentOptionError from '../PaymentOptionError';
import EmiCardUI from './EmiCardUI';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import {
  addOffersToInstrumentDetails,
  inlineOfferWidgetLoadEvent
} from 'commonBrowserUtils/PaymentHelper';

import Styles from './emi.base.css';

export const sanitizeName = name => {
  /*
   convert to lowercase and remove spaces
  */
  return name.toLowerCase().replace(/\s/g, '');
};

class EMI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEMIId: ''
    };

    [
      'selectEMI',
      'setActionButtonRef',
      'onActionButtonClick',
      'getValidity',
      'submitCallback'
    ].forEach(method => (this[method] = this[method].bind(this)));
    this.emiList = this.sortEMI();
    const { offer, instrumentData } = this.props;
    this.props.updateBankDiscount(0);
    isFeatureEnabled('INLINE_OFFER') &&
      addOffersToInstrumentDetails(offer, instrumentData);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevInstrumentData = get(prevProps, 'instrumentData') || {};
    const currentInstrumentData = get(this, 'props.instrumentData');
    if (prevInstrumentData !== currentInstrumentData) {
      this.emiList = this.sortEMI();
    }
  }

  sortEMI() {
    const supportedEMI = getKVPairValue('EMI_CONFIG').supportedEMI;
    const paymentPersonalizationConfig =
      getKVPairValue('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
    const allEMI =
      get(this, 'props.instrumentData.paymentInstrumentDetails.data', []) || [];

    if (
      (isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT3') ||
        isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT4')) &&
      get(paymentPersonalizationConfig, 'enablePaymentSubOptionPersonalization')
    ) {
      return allEMI.filter(
        emi => supportedEMI.indexOf(sanitizeName(emi.name)) !== -1
      );
    } else {
      return supportedEMI.reduce((acc, emiName) => {
        const emi = allEMI.find(emiObj => {
          const name = sanitizeName(emiObj.name);
          return name === emiName;
        });
        emi && acc.push(emi);
        return acc;
      }, []);
    }
  }

  getModeAttributes() {
    return {
      paymentProviderId: this.state.selectedEMIId || ''
    };
  }

  getEMIDetails(id) {
    return this.emiList.find(emi => `${emi.id}` === id);
  }

  selectEMI(value) {
    const id = value.slice(4);
    this.setState({
      selectedEMIId: id
    });
    const app = this.getEMIDetails(id);
    inlineOfferWidgetLoadEvent(
      'emi',
      app.name,
      app.offerDetails ? true : false
    );
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
      props: {
        deviceMode,
        instrumentData: {
          type = '',
          paymentInstrumentDetails: { paymentUrl }
        } = {}
      },
      onActionButtonClick
    } = this;
    return (
      <div className={Styles.emiContainer}>
        {deviceMode !== 'mobile' && (
          <div className={Styles.heading}>Select EMI Option</div>
        )}
        <div>
          {this.emiList.map(option => {
            return (
              <EmiCardUI
                optionData={{ ...option, instrumentType: type, paymentUrl }}
                deviceMode={deviceMode}
                selectedId={this.state.selectedEMIId}
                idPrefix={'emi-'}
                selectInstrument={this.selectEMI}
                onActionButtonClick={onActionButtonClick}
              />
            );
          })}
        </div>
      </div>
    );
  }

  getValidity() {
    const validity = { valid: true, message: '', toast: false };

    if (!this.state.selectedEMIId) {
      validity.valid = false;
      validity.message = 'Select a payment option to place order.';
      validity.toast = true;
    }

    return validity;
  }

  submitCallback(done) {
    const validity = this.getValidity();

    if (validity.valid) {
      const name = (this.getEMIDetails(this.state.selectedEMIId) || {}).name;
      triggerEvent('PAYMENT_OPTION_SUBMIT', {
        custom: {
          custom: {
            v1: `${PaymentConstants.EMI_TYPE}, ${name}`,
            v2: PaymentConstants.EMI_TYPE,
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
      }

      this.props.setLoader(false);
    }
  }

  render() {
    const { props } = this;
    const {
      instrumentData: {
        code,
        paymentInstrumentDetails: { paymentUrl }
      },
      payMode,
      retrySessionEnabled
    } = this.props;
    return code === PaymentConstants.INSTRUMENT_ELIGIBLE_CODE ? (
      <PayNowHandler
        {...props}
        paymentUrl={paymentUrl}
        paymentMode={PaymentConstants.EMI_PM}
        paymentModeName={PaymentConstants.EMI_PM_NAME}
        formAttributes={{ noValidate: true }}
        optionUI={this.getOptionUI()}
        modeAttributes={this.getModeAttributes()}
        setActionButtonRef={this.setActionButtonRef}
        actionData={{
          hide: true,
          disable: payMode === 'retry' && !retrySessionEnabled
        }}
        submitCallback={this.submitCallback}
        paymentInstrument={PaymentConstants.EMI}
      />
    ) : (
      <PaymentOptionError option="EMI" code={code} />
    );
  }
}

EMI.propTypes = {
  mode: PropTypes.string,
  updateStickyButton: PropTypes.func
};

EMI.defaultProps = {
  updateStickyButton: () => {}
};

export default EMI;
