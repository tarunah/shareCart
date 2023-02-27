import React, { useEffect, useState } from 'react';
import useModal from 'customHooks/useModal';
import { currencyValue } from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isVariantEnabled } from 'commonUtils/FeaturesManager';

import Styles from '../credits.base.css';

import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import ArrowRight from 'iconComp/ArrowRight.jsx';
import SuperCoin from 'iconComp/SuperCoin.jsx';
import Modal from 'commonComp/Modal';
import { SUPERCOINS_CREDIT } from 'commonBrowserUtils/Strings';

const SuperCoinsCredit = props => {
  const [isModalOpen, toggleModal] = useModal(false);
  const [isCheckBoxSelected, setCheckBoxVisibilty] = useState(false);
  const showHalfCardFlow =
    isVariantEnabled('PAY_VIA_SUPERCOINS_DOUBLE_CONSENT') ||
    isVariantEnabled('PAY_VIA_SUPERCOINS_DOUBLE_CONSENT_NON_INSIDER');

  const {
    redeemableSupercoins = 0,
    equivalentMyntraCredit = 0,
    applySupercoinsCb = () => {},
    cartId,
    disableSuperCoins
  } = props;
  useEffect(() => {
    triggerEvent('CART_SUPERCOINS_CREDIT_WIDGET_LOAD', {
      maData: {},
      custom: {
        widget_items: {
          data_set: {
            data: { entity_name: 'redeem_supercoins', entity_id: cartId }
          }
        }
      }
    });
  }, []);

  const scHeaderText = getKVPairValue('SUPERCOINS_CREDIT').scTxt;

  const closeModal = () => {
    toggleModal();
    setCheckBoxVisibilty(false);
  };
  const triggerClickEvent = isRedeem => {
    triggerEvent('CART_SUPERCOINS_CREDIT_WIDGET_CLICK', {
      maData: {},
      custom: {
        widget_items: {
          data_set: {
            data: {
              entity_name: isRedeem ? 'redeem_supercoins' : 'open_half_card',
              entity_id: cartId
            }
          }
        }
      }
    });
  };
  const openModal = () => {
    triggerEvent('CART_SUPERCOINS_HALF_CARD_CREDIT_SCREEN_LOAD', {
      maData: {},
      custom: {
        widget_items: {
          data_set: {
            data: { entity_name: 'redeem_supercoins', entity_id: cartId }
          }
        }
      }
    });
    triggerClickEvent(false);
    toggleModal();
    setCheckBoxVisibilty(true);
  };

  const initRedeemFlow = () => {
    triggerClickEvent(true);
    applySupercoinsCb();
  };

  const handleConfirm = () => {
    closeModal();
    applySupercoinsCb();
  };

  return (
    <div className={Styles.creditBlock}>
      <div className={Styles.creditBlockMainArea}>
        <div
          className={Styles.toggleArea}
          onClick={
            disableSuperCoins
              ? null
              : showHalfCardFlow
              ? openModal
              : initRedeemFlow
          }
        >
          {isCheckBoxSelected ? (
            <CheckboxActive
              className={`gcCheckbox ${Styles.checkbox}
              ${Styles.checkboxSelected}
              ${disableSuperCoins ? Styles.disabled : ''}`}
            />
          ) : (
            <CheckboxInactive
              className={`gcCheckbox
              ${Styles.checkbox}
              ${disableSuperCoins ? Styles.disabled : ''}`}
            />
          )}
          <div className={Styles.headerText}>
            {scHeaderText.split(' ').map((word, idx) => {
              switch (word) {
                case '$SC_ICON$':
                  return (
                    <span className={Styles.scIcon}>
                      <SuperCoin key={idx} />
                    </span>
                  );
                case '$RS_ICON$':
                  return (
                    <Rupee key={idx} className={Styles.balanceRupeeIcon} />
                  );
                case '$NEW_TAG$':
                  return (
                    <span key={idx} className={Styles.newTag}>
                      new
                    </span>
                  );
                case '$SC_BAL$':
                  return currencyValue(redeemableSupercoins);
                case '$MC_BAL$':
                  return currencyValue(equivalentMyntraCredit);
                default:
                  return (
                    <React.Fragment key={idx}>{` ${word} `}</React.Fragment>
                  );
              }
            })}
          </div>
        </div>
        <div className={`${Styles.note} ${Styles.scNote}`}>
          <span>Note:</span>
          {SUPERCOINS_CREDIT.widgetNote}
        </div>
        {isModalOpen && (
          <Modal
            className={Styles.mobileModal}
            cancelCallback={closeModal}
            cancelIconConfig={{ show: true }}
            halfCard={true}
          >
            <div>
              <div className={Styles.modalHeading}>
                Converting SuperCoins into Myntra Credit
              </div>
              <div className={Styles.conversionContainer}>
                <div className={Styles.scConversion}>
                  <SuperCoin height={14} />{' '}
                  <span className={`${Styles.bold} ${Styles.size}`}>
                    {currencyValue(redeemableSupercoins)}
                  </span>{' '}
                  <br />
                  SuperCoins
                </div>
                <ArrowRight className={Styles.arrow} />
                <div className={Styles.mcConversion}>
                  <Rupee width={10} height={13} />
                  <span className={`${Styles.bold} ${Styles.size}`}>
                    {currencyValue(equivalentMyntraCredit)}
                  </span>{' '}
                  <br />
                  Myntra Credit
                </div>
              </div>
              <div className={Styles.modalNoteText}>
                <span className={Styles.bold}>NOTE:</span>
                {SUPERCOINS_CREDIT.popUpNote}
              </div>
              <div className={Styles.modalBtnContainer}>
                <button
                  className={`${Styles.modalBtn} ${Styles.btnCancel}`}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={`${Styles.modalBtn} ${Styles.btnConfirm}`}
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SuperCoinsCredit;
