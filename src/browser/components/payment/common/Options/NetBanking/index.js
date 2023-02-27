import React from 'react';
import PropTypes from 'prop-types';

// Style Imports.
import Styles from './netBanking.base.css';

import PayNowHandler from '../../PayNowHandler';
import ActionButton from '../.../../../ActionButton';
import PaymentOptionError from '../PaymentOptionError';
import LowSRMessage from '../../LowSRMessage';
import NetBankingCardUI from './NetBankingCardUI';

import Modal from 'commonComp/Modal';
import Sprite from 'commonComp/Sprite';
// Utils
import get from 'lodash/get';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import DropDown from 'iconComp/DropDown.jsx';
import {
  getOfferString,
  addOffersToInstrumentDetails,
  inlineOfferWidgetLoadEvent
} from 'commonBrowserUtils/PaymentHelper';

class NetBanking extends React.Component {
  constructor(props) {
    super(props);
    const data =
      get(props, 'instrumentData.paymentInstrumentDetails.data', []) || [];
    const popularBank = [],
      otherBanks = [];
    data.map(info => {
      if (info.popular) {
        popularBank.push(info);
      } else {
        otherBanks.push(info);
      }
    });
    this.state = {
      selectedBankId: '',
      showOtherBankModal: false,
      popularBank,
      otherBanks
    };

    [
      'selectBank',
      'submitCallback',
      'getSelectedInfo',
      'toggleOtherBankModal',
      'selectOtherBank',
      'setActionButtonRef',
      'onActionButtonClick',
      'setOtherBankRef'
    ].forEach(method => (this[method] = this[method].bind(this)));
    const { offer, instrumentData } = this.props;
    this.props.updateBankDiscount(0);
    isFeatureEnabled('INLINE_OFFER') &&
      addOffersToInstrumentDetails(offer, instrumentData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.showOtherBankModal &&
      this.state.showOtherBankModal &&
      this.selectedOtherBankRef &&
      this.selectedOtherBankRef.scrollIntoView
    ) {
      this.selectedOtherBankRef.scrollIntoView({ block: 'end' });
    }
  }

  componentWillUnmount() {
    const { updateStickyButton } = this.props;
    updateStickyButton && updateStickyButton({ enabled: true });
  }

  selectBank(val) {
    const { updateStickyButton } = this.props;
    const id = val.slice(11);
    const selectedBank = this.getSelectedInfo(id);
    if (id) {
      triggerEvent('NETBANKING_SELECT', {
        gaLabel: selectedBank.name
      });
      inlineOfferWidgetLoadEvent(
        'netbanking',
        selectedBank.name,
        selectedBank.offerDetails ? true : false
      );
      this.setState({
        selectedBankId: id
      });
    }
    updateStickyButton &&
      updateStickyButton({ enabled: !selectedBank.disable });
  }

  selectOtherBank(e) {
    this.selectBank(e.currentTarget.getAttribute('data-value'));
    this.toggleOtherBankModal();
  }

  getModeAttributes() {
    return {
      paymentProviderId: this.state.selectedBankId
    };
  }

  getSelectedInfo(id, dataArr) {
    return (
      (
        dataArr ||
        get(this, 'props.instrumentData.paymentInstrumentDetails.data', []) ||
        []
      ).find(info => `${info.id}` === id) || {}
    );
  }

  toggleOtherBankModal() {
    this.setState({
      showOtherBankModal: !this.state.showOtherBankModal
    });
  }

  setOtherBankRef(selected) {
    if (selected) {
      return node => {
        this.selectedOtherBankRef = node;
      };
    }
  }

  getOptionUI() {
    const {
      deviceMode,
      payMode,
      offer,
      instrumentData: {
        type = '',
        paymentInstrumentDetails: { paymentUrl }
      } = {}
    } = this.props;
    const {
      popularBank,
      otherBanks,
      selectedBankId,
      showOtherBankModal
    } = this.state;

    const otherBankSelected = this.getSelectedInfo(selectedBankId, otherBanks);
    const {
      lowSuccessRate: otherBankHasLowSr,
      disable: otherBankDisabled
    } = otherBankSelected;
    return (
      <div className={Styles.netBankingContainer}>
        {deviceMode !== 'mobile' && (
          <div className={Styles.heading}>Net Banking</div>
        )}

        {popularBank.map(info => {
          return (
            <NetBankingCardUI
              optionData={{ ...info, instrumentType: type, paymentUrl }}
              selectedId={selectedBankId}
              deviceMode={deviceMode}
              idPrefix={'netbanking-'}
              selectInstrument={this.selectBank}
              onActionButtonClick={this.onActionButtonClick}
            />
          );
        })}

        <div
          className={`${Styles.otherBankDropDown} ${
            otherBankSelected.id ? Styles.selected : ''
          }`}
          onClick={this.toggleOtherBankModal}
        >
          <span className={Styles.entryName}>
            {otherBankSelected.name
              ? this.displayOffers(otherBankSelected)
              : 'Other Banks'}
          </span>
          <DropDown />
        </div>
        <LowSRMessage
          netBanking={true}
          instrumentType={type}
          instrumentName={otherBankSelected.name}
          className={Styles.lowSRMessage}
          show={otherBankHasLowSr || otherBankDisabled}
          disable={otherBankDisabled}
        />
        <ActionButton
          text="PAY NOW"
          className={Styles.actionButton}
          onClick={this.onActionButtonClick}
          visible={!!otherBankSelected.id}
          deviceMode={deviceMode}
          disabled={otherBankDisabled}
        />
        {showOtherBankModal && (
          <Modal
            cancelCallback={this.toggleOtherBankModal}
            className={
              deviceMode === 'mobile'
                ? Styles.mobileModalContainer
                : Styles.desktopModalContainer
            }
            cancelIconConfig={{ show: true, className: Styles.cancelIcon }}
            enableBackButton={payMode !== 'retry'}
            halfCard={deviceMode === 'mobile'}
          >
            <div className={Styles.modalHeading}>Select Bank</div>
            <div className={Styles.modalBody}>
              {otherBanks.map(info => (
                <div
                  className={`${Styles.bankInfo} ${
                    selectedBankId === `${info.id}` ? Styles.selected : ''
                  }`}
                  onClick={this.selectOtherBank}
                  data-value={`netbanking-${info.id}`}
                  ref={this.setOtherBankRef(selectedBankId === `${info.id}`)}
                >
                  <Sprite
                    name="logo-bankselection"
                    className={Styles.bankIcon}
                  />
                  <span>{this.displayOffers(info)}</span>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    );
  }

  displayOffers(optionData) {
    const numberOfOffers = get(optionData, 'offerDetails', '').length || 0;
    let offerString = numberOfOffers > 0 ? getOfferString(numberOfOffers) : '';
    return (
      <p className={Styles.tabText}>
        <span>{optionData.name}</span>
        <span className={Styles.inlineOffer}>{offerString}</span>
      </p>
    );
  }

  setActionButtonRef(node) {
    this.actionButton = node;
  }

  onActionButtonClick(e) {
    e.preventDefault();
    this.actionButton.click();
  }

  submitCallback(done) {
    if (!this.state.selectedBankId) {
      SHELL.alert('info', {
        message: 'Select a payment option to place order.',
        styleOverrides: {
          notifyMainDiv: `bottom: 82px;`
        }
      });
      this.props.setLoader(false);
      return;
    }

    const name = this.getSelectedInfo(this.state.selectedBankId).name;
    triggerEvent('NETBANKING_SUBMIT', {
      gaLabel: name || 'not selected'
    });

    triggerEvent('PAYMENT_OPTION_SUBMIT', {
      custom: {
        custom: {
          v1: `${PaymentConstants.NETBANKING}, ${name}`,
          v2: PaymentConstants.NETBANKING,
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

    done && done();
  }

  render() {
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
        {...this.props}
        paymentUrl={paymentUrl}
        paymentMode={PaymentConstants.NETBANKING}
        paymentModeName={PaymentConstants.NETBANKING}
        optionUI={this.getOptionUI()}
        actionData={{
          hide: true,
          disable: payMode === 'retry' && !retrySessionEnabled
        }}
        modeAttributes={this.getModeAttributes()}
        submitCallback={this.submitCallback}
        paymentInstrument={PaymentConstants.NETBANKING}
        setActionButtonRef={this.setActionButtonRef}
      />
    ) : (
      <PaymentOptionError option="Netbanking" code={code} />
    );
  }
}

NetBanking.propTypes = {
  instrumentData: PropTypes.object.isRequired
};

export default NetBanking;
