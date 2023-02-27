import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Input from 'commonComp/InputV2';
import Button from 'commonComp/Button';
import Modal from 'commonComp/Modal';
import PaymentOptionError from '../../PaymentOptionError';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { errorNotification } from 'commonBrowserUtils/Helper';
import config from '@config';

// Style Imports.
import Style from './giftCardModal.base.css';

const validationRules = {
  gcNumber: {
    rule: /^\d{16}$/,
    message: 'Gift card number should be a 16 digits long number.',
    invalidGCNumber:
      'Invalid Gift card number. Please enter valid Gift card number'
  },
  gcPin: {
    rule: /^\d{6}$/,
    message: 'Gift card pin should be a 6 digit long number.'
  }
};

class GiftCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gcNumber: '',
      gcPin: '',
      error: {
        gcNumber: '',
        gcPin: ''
      }
    };

    this.addToMyntraCredit = this.addToMyntraCredit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  validate() {
    const {
      state: { gcNumber, gcPin }
    } = this;
    const { prefix } = config('giftcard');
    const gcNumberValid = validationRules.gcNumber.rule.test(gcNumber);
    const invalidGCNumber = !gcNumber.startsWith(prefix);
    const gcPinValid = validationRules.gcPin.rule.test(gcPin);

    if (!gcNumberValid || !gcPinValid || invalidGCNumber) {
      this.setState({
        error: {
          gcNumber: invalidGCNumber
            ? validationRules.gcNumber.invalidGCNumber
            : !gcNumberValid
            ? validationRules.gcNumber.message
            : '',
          gcPin: !gcPinValid ? validationRules.gcPin.message : ''
        }
      });
      return false;
    } else {
      this.setState({
        error: {
          gcNumber: '',
          gcPin: ''
        }
      });

      return true;
    }
  }

  addToMyntraCredit() {
    const {
      state: { gcNumber, gcPin },
      props: { handlePaymentAction, refreshPageData }
    } = this;

    if (this.validate()) {
      handlePaymentAction(
        'addGiftCard',
        { giftCardNumber: gcNumber, pin: gcPin },
        {
          keepPreviousState: true
        },
        res => {
          this.props.cancelCallback();
          const balance = get(res, 'amount.balance');
          triggerEvent('GIFTCARD_SUCCESS', { gaLabel: balance });
          SHELL.alert('info', {
            message: `<div class=${Style.notification}>Successfully added <span class=${Style.message}>${balance} Myntra Credit.</span></div>`,
            styleOverrides: {
              notifyMainDiv: `bottom: 82px;`
            }
          });
          refreshPageData({ addedGiftcard: true });
        },
        err => {
          triggerEvent('GIFTCARD_FAILURE', {
            gaLabel: err.message || 'Unable to add giftcard'
          });
          errorNotification(err);
        }
      );
    }
  }

  onInputChange(e) {
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value
    });
  }

  render() {
    const {
      state: { gcPin, gcNumber, error },
      onInputChange,
      addToMyntraCredit,
      props: {
        instrumentData: { code, paymentInstrumentDetails },
        payMode,
        updateStickyButton,
        cancelCallback
      }
    } = this;
    return (
      <Modal
        className={Style.modal}
        cancelIconConfig={{ show: true }}
        cancelCallback={cancelCallback}
        enableBackButton={payMode !== 'retry'}
      >
        <div className={Style.heading}>Apply Gift Card</div>
        {PaymentConstants.INSTRUMENT_ELIGIBLE_CODE === code ? (
          <div>
            <div className={Style.note}>
              Gift card value will be added to your Myntra Credit.
            </div>
            <Input
              id="gcNumber"
              label="16 Digits Gift Card Number"
              value={gcNumber}
              maxLength="16"
              type="tel"
              errorMessage={error.gcNumber}
              onChange={onInputChange}
              className={Style.input}
            />
            <Input
              id="gcPin"
              label="6 Digits Gift Card Pin"
              value={gcPin}
              maxLength="6"
              type="tel"
              pattern="\d*"
              errorMessage={error.gcPin}
              onChange={onInputChange}
              className={Style.input}
            />
            <Button
              className={Style.addButton}
              onClick={addToMyntraCredit}
              disabled={!gcNumber || !gcPin}
            >
              Add to Myntra Credit
            </Button>
          </div>
        ) : (
          <PaymentOptionError
            option="Giftcard"
            code={code}
            className={Style.errorBlock}
            paymentInstrumentDetails={paymentInstrumentDetails}
            updateStickyButton={updateStickyButton}
          />
        )}
      </Modal>
    );
  }
}

GiftCard.propTypes = {
  mode: PropTypes.string,
  instrumentData: PropTypes.object,
  handlePaymentAction: PropTypes.func,
  refreshPageData: PropTypes.func,
  updateStickyButton: PropTypes.func
};

GiftCard.defaultProps = {
  updateStickyButton: () => {}
};

export default GiftCard;
