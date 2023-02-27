import React from 'react';
import PropTypes from 'prop-types';

import PriorityCheckoutModalContainer from '../../../common/PriorityCheckoutModalContainer.js';
import Modal from 'commonComp/Modal';
import StickyButton from 'commonComp/StickyButton';
import AgreeBlock from '../AgreeBlock';

import { chainFns } from 'commonBrowserUtils/Helper';
import { getSelectedSlotDateTime } from 'commonBrowserUtils/slotUtil';
import sanitize from 'commonUtils/Sanitize';

import Styles from './priorityCheckoutModal.base.css';

const Header = ({ title }) => (
  <div className={Styles.header}>
    <div className={Styles.headerText}>{title}</div>
  </div>
);

const EarlyCheckoutHeader = ({ config }) => (
  <div>
    <div className={Styles.image}>
      <img src={config.option1.image} />
    </div>
    <div className={Styles.blockHeader}>{config.option1.header}</div>
  </div>
);

const WaitForSaleHeader = ({ config }) => (
  <div>
    <div className={Styles.image}>
      <img src={config.option2.image} />
    </div>
    <div className={Styles.blockHeader}>{config.option2.header}</div>
  </div>
);

// Component shown when 'Early Checkout' section is selected
const EarlyCheckoutContent = ({
  selected,
  config,
  checkoutOptionSelected,
  selectCheckoutOption,
  onConfirm,
  pcConfirmed,
  placeOrderHandler,
  total,
  points,
  updateDynamicStyles,
  placeOrderText
}) => (
  <div className={selected === 'earlyCheckout' ? '' : Styles.hide}>
    <div className={Styles.mainList}>
      {config.option1.linesLevel2.map((line, index) => (
        <div
          key={index}
          className={Styles.eachList}
          dangerouslySetInnerHTML={{ __html: sanitize(line) }}
        />
      ))}
    </div>
    <AgreeBlock
      config={config}
      checkoutOptionSelected={checkoutOptionSelected}
      onCheckboxClick={chainFns(selectCheckoutOption, onConfirm)}
    />
    {checkoutOptionSelected && pcConfirmed && (
      <StickyButton
        className={Styles.stickyButton}
        text={placeOrderText}
        total={total}
        points={points}
        updateDynamicStyles={updateDynamicStyles}
        clickHandler={placeOrderHandler}
      />
    )}
  </div>
);

// Component shown when 'Wait for sale' section is selected
const WaitForSaleContent = ({ selected, config, cancelCallback }) => {
  const slot = getSelectedSlotDateTime();
  return (
    <div className={selected === 'waitForSale' ? '' : Styles.hide}>
      <div className={Styles.mainList}>
        {config.option2.linesLevel2.map((line, index) => (
          <div
            key={index}
            className={Styles.eachList}
            dangerouslySetInnerHTML={{ __html: sanitize(line) }}
          />
        ))}
        {slot && (
          <div className={Styles.eachList}>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitize(config.option2.slotLine.replace('$slot', slot))
              }}
            />
          </div>
        )}
      </div>
      <div className={Styles.closeButton}>
        <button className={Styles.button} onClick={cancelCallback}>
          OK, GOT IT
        </button>
      </div>
    </div>
  );
};

// Component initally shown when Priority Checkout Modal is opened.
const ModalDisplayContent = ({ selected, config, selectBlock }) => {
  const slot = getSelectedSlotDateTime();
  return (
    <div
      className={`${Styles.modalDisplayContent} ${
        selected === '' ? '' : Styles.hide
      }`}
    >
      <div
        id="earlyCheckout"
        className={`${Styles.modalDisplayBlock} ${Styles.earlyCheckoutBlock}`}
        onClick={selectBlock}
      >
        <EarlyCheckoutHeader config={config} />
        <div className={Styles.modalDisplayBlockContent}>
          {config.option1.linesLevel1.map((line, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: sanitize(line) }}
            />
          ))}
        </div>
      </div>
      <div
        id="waitForSale"
        className={Styles.modalDisplayBlock}
        onClick={selectBlock}
      >
        <WaitForSaleHeader config={config} />
        <div className={Styles.modalDisplayBlockContent}>
          {config.option2.linesLevel1.map((line, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: sanitize(line) }}
            />
          ))}
          {slot && (
            <span
              dangerouslySetInnerHTML={{
                __html: sanitize(config.option2.slotLine.replace('$slot', slot))
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getModalContent = props => (
  <div>
    <ModalDisplayContent {...props} />
    <EarlyCheckoutContent {...props} />
    <WaitForSaleContent {...props} />
  </div>
);

const PriorityCheckoutModal = ({
  config,
  cancelCallback,
  show,
  hideModal,
  coverFeeOpted,
  updateDynamicStyles,
  ...modalContentProps
}) => (
  <PriorityCheckoutModalContainer
    coverFeeOpted={coverFeeOpted}
    render={(
      { selected, checkoutOptionSelected },
      { selectBlock, selectCheckoutOption }
    ) => {
      const title =
        selected === '' ? (
          'CHOOSE AN OPTION'
        ) : selected === 'earlyCheckout' ? (
          <EarlyCheckoutHeader config={config} />
        ) : (
          <WaitForSaleHeader config={config} />
        );

      const headerCancel = checkoutOptionSelected ? hideModal : cancelCallback;
      return (
        show && (
          <Modal
            halfCard={true}
            cancelCallback={headerCancel}
            cancelIconConfig={{ show: true }}
          >
            {onCancel => (
              <div>
                <Header title={title} />
                <div className={Styles.modalBody}>
                  {getModalContent({
                    selected,
                    config,
                    checkoutOptionSelected,
                    selectBlock,
                    selectCheckoutOption,
                    cancelCallback: onCancel,
                    updateDynamicStyles,
                    ...modalContentProps
                  })}
                </div>
              </div>
            )}
          </Modal>
        )
      );
    }}
  />
);

PriorityCheckoutModal.propTypes = {
  config: PropTypes.object,
  onConfirm: PropTypes.func,
  cancelCallback: PropTypes.func,
  show: PropTypes.bool,
  hideModal: PropTypes.func,
  pcConfirmed: PropTypes.bool,
  total: PropTypes.number,
  points: PropTypes.number,
  placeOrderText: PropTypes.string,
  placeOrderHandler: PropTypes.func,
  coverFeeOpted: PropTypes.bool,
  updateDynamicStyles: PropTypes.func
};

export default PriorityCheckoutModal;
