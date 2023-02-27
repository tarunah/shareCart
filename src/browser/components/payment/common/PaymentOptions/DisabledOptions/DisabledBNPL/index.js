import React from 'react';

import Style from './disabledBNPL.base.css';

import Modal from 'commonComp/Modal';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const { BNPL_NO_ACTIVE_ACCOUNT, BNPL_USER_NOT_ELIGIBLE } = PaymentConstants;

const message = {
  [BNPL_NO_ACTIVE_ACCOUNT]:
    'Your Flipkart Pay Later account has been deactivated, please check your Pay Later account status with Flipkart. You may use another payment method for this transaction.',
  [BNPL_USER_NOT_ELIGIBLE]:
    'Your order can not be paid with Flipkart Pay Later as you may not have sufficient Pay Later balance,  your Pay Later bill may be overdue or your Flipkart account may have been blocked. Please use another payment method.'
};

class DisabledBNPL extends React.Component {
  constructor() {
    super();
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const {
      instrumentData: { providerCode },
      payMode
    } = this.props;
    return (
      <div>
        <span className={Style.notAvailable}>Not available on this order</span>
        <span className={Style.why} onClick={this.toggleModal}>
          Why?
        </span>
        {this.state.showModal && (
          <Modal
            className={Style.modal}
            cancelCallback={this.toggleModal}
            enableBackButton={payMode !== 'retry'}
          >
            {onCancel => (
              <div>
                <div className={Style.header}>
                  Flipkart Pay Later not available
                </div>
                <div className={Style.message}>{message[providerCode]}</div>
                <div className={Style.okay} onClick={onCancel}>
                  OKAY
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    );
  }
}

export default DisabledBNPL;
