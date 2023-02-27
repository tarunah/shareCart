import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Style from './donationStrip.base.css';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import PillView from 'commonComp/PillView';
import {
  getProfileEmail,
  currencyValue,
  isLoggedIn
} from 'commonBrowserUtils/Helper';
import AutoSubmitEmail from './AutoSubmitEmail';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import KnowMore from './KnowMore';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

const stripComma = amount => +(amount || '').replace(',', '');

const createAlert = (mode, message) => {
  const styleOverrides = getSnackBarStyleOverrides(mode);
  SHELL.alert('info', {
    styleOverrides,
    message
  });
};

const DonationStrip = props => {
  const donationConfig = getKVPairValue('DONATION_VALUES') || {};
  const LIST = [...donationConfig.values];
  const MAXIMUM_DONATION = donationConfig.maximumDonation || 10000;
  const prefix = '₹';

  const handleCartAction = get(props, 'handleCartAction');
  const donationAmount = get(props, 'donationAmount', 0);
  const containerClassName = get(props, 'containerClassName', '');
  const isMobile = get(props, 'mode') === 'mobile';
  const selectedProductsCount = get(props, 'selectedProductsCount');
  const otherText = isMobile ? 'Enter Amount' : 'Other';

  const otherField = LIST[LIST.length - 1] === 'other';
  const pillValues = otherField ? LIST.slice(0, LIST.length - 1) : LIST;
  const initialOtherState =
    LIST.indexOf(donationAmount) === -1 && !!donationAmount
      ? donationAmount
      : '';

  const [other, setOther] = useState(initialOtherState);
  const [otherSelected, setOtherSelected] = useState(initialOtherState !== '');

  const isDonationSelected = !!donationAmount;

  const isEmailEmpty = isDonationSelected && !getProfileEmail() && isLoggedIn();

  useEffect(() => {
    triggerEvent('DONATION_WIDGET_SHOWN');
  }, []);

  const apply = amount => {
    if (selectedProductsCount < 1) {
      createAlert(
        get(props, 'mode'),
        'Select at least one item in bag to donate.'
      );
      setOther('');
      setOtherSelected(false);
    } else if (amount > MAXIMUM_DONATION) {
      handleCartAction('applyDonation', { amount: MAXIMUM_DONATION }, () =>
        createAlert(
          get(props, 'mode'),
          'You can donate maximum Rs. 10,000 on this order.'
        )
      );
      setOther(MAXIMUM_DONATION);
      triggerEvent('DONATION_WIDGET_APPLY', {
        custom: { custom: { v1: MAXIMUM_DONATION } }
      });
    } else if (amount < 1) {
      handleCartAction('removeDonation');
      setOther('');
      setOtherSelected(false);
    } else {
      handleCartAction('applyDonation', { amount });
      triggerEvent('DONATION_WIDGET_APPLY', {
        custom: { custom: { v1: amount } }
      });
    }
  };

  const onPillClick = e => {
    setOther('');
    setOtherSelected(false);
    const node = get(e, 'currentTarget');
    const amount = +node.getAttribute('data-key');
    apply(amount);
  };

  const onCheckboxClick = e => {
    if (selectedProductsCount < 1) {
      createAlert(
        get(props, 'mode'),
        'Select at least one item in bag to donate.'
      );
      return;
    }
    if (isDonationSelected) {
      handleCartAction('removeDonation');
      setOther('');
      setOtherSelected(false);
    } else {
      triggerEvent('DONATION_WIDGET_APPLY', {
        custom: { custom: { v1: LIST[0] } }
      });
      handleCartAction('applyDonation', { amount: LIST[0] });
    }
  };

  const onFocus = () => {
    setOtherSelected(true);
  };

  const onBlur = () => {
    if (other !== '') {
      apply(other);
      return;
    }
    setOther('');
    setOtherSelected(false);
  };

  const onChange = e => {
    let value = get(e, 'currentTarget.value');
    value = stripComma(value);
    setOther(value);
  };

  /***************************************************************************
   *  KeyCode 48 - 57 corresponds to 0 - 9 values, 8 correspond to backspace *
   ***************************************************************************/
  const handleKeyInput = event => {
    const keyCode = event.which ? event.which : event.keyCode;
    const specialKeys = [8];
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      specialKeys.indexOf(keyCode) !== -1
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={`${Style.bodyContainer} ${containerClassName}`}>
      <div className={Style.titleContainer}>
        {isDonationSelected ? (
          <CheckboxActive
            className={`${Style.icon} ${Style.watermelon}`}
            onClick={onCheckboxClick}
          />
        ) : (
          <CheckboxInactive className={Style.icon} onClick={onCheckboxClick} />
        )}
        {donationConfig.modalConfig.title}
        {isMobile && (
          <KnowMore
            className={Style.mobileKnowMore}
            isMobile={true}
            modalConfig={donationConfig.modalConfig}
          />
        )}
      </div>

      <PillView
        mode={props.mode}
        pillClassName={Style.pill}
        prefix={prefix}
        pillValues={pillValues}
        selectedValue={donationAmount}
        onPillClick={onPillClick}
        className={Style.pillContainer}
        valueTransformation={currencyValue}
        otherSelected={otherSelected}
        renderOther={
          otherField
            ? () => (
                <React.Fragment>
                  {otherSelected && prefix}
                  <input
                    className={`${Style.input} ${
                      isMobile ? Style.inputMobile : ''
                    } ${otherSelected ? Style.selectedInput : ''}`}
                    value={other === '' ? other : currencyValue(other)}
                    type="tel"
                    maxLength={6}
                    onFocus={onFocus}
                    placeholder={otherSelected ? '' : otherText}
                    onKeyPress={handleKeyInput}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </React.Fragment>
              )
            : null
        }
      />
      {donationConfig.body && (
        <div className={Style.bodyText}>{donationConfig.body}</div>
      )}
      {isEmailEmpty ? (
        <AutoSubmitEmail
          className={Style.emailContainer}
          titleText={donationConfig.enterEmailText}
        />
      ) : (
        donationConfig.receiptText
      )}
      {!isMobile && (
        <KnowMore
          className={Style.desktopKnowMore}
          isMobile={false}
          modalConfig={donationConfig.modalConfig}
        />
      )}
    </div>
  );
};

DonationStrip.propTypes = {
  handleCartAction: PropTypes.func.isRequired,
  donationAmount: PropTypes.number.isRequired,
  containerClassName: PropTypes.string,
  selectedProductsCount: PropTypes.number.isRequired
};

const DonationStripBlock = props => {
  const isMobile = props.mode === 'mobile';
  const donationConfig = getKVPairValue('DONATION_VALUES') || {};
  return (
    <React.Fragment>
      <div className={isMobile ? Style.mobileHeader : Style.desktopHeader}>
        {donationConfig.bannerTitle}
      </div>
      <DonationStrip
        {...props}
        containerClassName={
          isMobile ? Style.mobileBodyContainer : Style.desktopBodyContainer
        }
      />
    </React.Fragment>
  );
};

DonationStripBlock.propTypes = {
  mode: PropTypes.string.isRequired,
  handleCartAction: PropTypes.func.isRequired,
  donationAmount: PropTypes.number.isRequired,
  selectedProductsCount: PropTypes.number.isRequired
};

DonationStripBlock.defaultProps = {
  handleCartAction: () => {}
};

export default DonationStripBlock;
