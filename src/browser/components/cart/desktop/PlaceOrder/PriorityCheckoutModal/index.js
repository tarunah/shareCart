import React from 'react';
import PropTypes from 'prop-types';

import PriorityCheckoutModalContainer from '../../../common/PriorityCheckoutModalContainer.js';
import Modal from 'commonComp/Modal';
import { chainFns } from 'commonBrowserUtils/Helper';
import { getSelectedSlotDateTime } from 'commonBrowserUtils/slotUtil';
import sanitize from 'commonUtils/Sanitize';

import Styles from './priorityCheckoutModal.base.css';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

const Header = () => (
  <div className={Styles.header}>
    <div className={Styles.headerText}>CHOOSE AN OPTION</div>
  </div>
);

const EarlyCheckout = ({
  selected,
  checkoutOptionSelected,
  config,
  selectBlock,
  selectCheckoutOption,
  onConfirm,
  onClose
}) => (
  <div
    id="earlyCheckout"
    data-testid="earlyCheckout"
    className={`${selected === 'earlyCheckout' ? Styles.selected : ''} ${
      Styles.earlyCheckoutBlock
    } ${Styles.block}`}
    onClick={selectBlock}
  >
    <div className={Styles.imageContainer}>
      <img src={config.option1.image} className={Styles.headerImage} />
    </div>
    <div className={Styles.blockHeader}>{config.option1.header}</div>
    <div className={`${selected === 'earlyCheckout' ? '' : Styles.hide}`}>
      <div
        data-testid="ea-confirm-cb"
        className={Styles.confirmationOption}
        onClick={selectCheckoutOption}
      >
        {checkoutOptionSelected ? (
          <CheckboxActive className={`${Styles.icon} ${Styles.checked}`} />
        ) : (
          <CheckboxInactive className={Styles.icon} />
        )}
        <span className={Styles.bold}>{config.agreeText}</span>
      </div>
      <div>
        <button
          className={`${Styles.confirm} ${
            checkoutOptionSelected ? '' : Styles.hide
          }`}
          onClick={chainFns(onConfirm, onClose)}
        >
          CONFIRM
        </button>
      </div>
    </div>
    <ul
      className={`${Styles.mainList} ${
        selected === 'earlyCheckout' ? Styles.hide : ''
      }`}
    >
      {config.option1.linesLevel2.map((line, index) => (
        <li
          key={index}
          className={Styles.eachList}
          dangerouslySetInnerHTML={{ __html: sanitize(line) }}
        />
      ))}
    </ul>
  </div>
);

const WaitForSale = ({ selected, config, selectBlock }) => {
  const slot = getSelectedSlotDateTime();
  return (
    <div
      id="waitForSale"
      data-testid="waitForSale"
      className={`${selected === 'waitForSale' ? Styles.selected : ''} ${
        Styles.waitForSaleBlock
      } ${Styles.block}`}
      onClick={selectBlock}
    >
      <div className={Styles.imageContainer}>
        <img src={config.option2.image} className={Styles.headerImage} />
      </div>
      <div className={Styles.blockHeader}>{config.option2.header}</div>
      <ul className={Styles.mainList}>
        {config.option2.linesLevel2.map((line, index) => (
          <li
            key={index}
            className={Styles.eachList}
            dangerouslySetInnerHTML={{ __html: sanitize(line) }}
          />
        ))}
        {slot && (
          <li className={Styles.eachList}>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitize(config.option2.slotLine.replace('$slot', slot))
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

const PriorityCheckoutModal = ({ config, onConfirm, cancelCallback }) => (
  <PriorityCheckoutModalContainer
    closeModal={cancelCallback}
    render={(
      { selected, checkoutOptionSelected },
      { selectBlock, selectCheckoutOption }
    ) => (
      <Modal
        className={Styles.modal}
        cancelCallback={cancelCallback}
        cancelIconConfig={{ show: true }}
      >
        {onClose => (
          <div>
            <Header />
            <div className={Styles.modalBody}>
              <EarlyCheckout
                config={config}
                selected={selected}
                checkoutOptionSelected={checkoutOptionSelected}
                selectBlock={selectBlock}
                selectCheckoutOption={selectCheckoutOption}
                onConfirm={onConfirm}
                onClose={onClose}
              />
              <WaitForSale
                config={config}
                selected={selected}
                selectBlock={selectBlock}
              />
            </div>
          </div>
        )}
      </Modal>
    )}
  />
);

PriorityCheckoutModal.propTypes = {
  config: PropTypes.object,
  onConfirm: PropTypes.func,
  cancelCallback: PropTypes.func
};

export default PriorityCheckoutModal;
