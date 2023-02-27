import React from 'react';
import Styles from './returnAbuser.base.css';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import { isLoggedIn, isReturnAbuser } from 'commonBrowserUtils/Helper';
import get from 'lodash/get';

const getReturnAbuserData = (type, subType, shippingCharge = 149) => {
  const key = `${type}.${subType}`;
  const returnAbuserData = {
    noCod: {
      message: 'Pay on Delivery is not available for this order.',
      popUp: {
        title: 'Why is Pay on Delivery not available?',
        content:
          'We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal policies. We reserve the right to disable pay on delivery option if the order exceeds the pay on delivery limit or if the account violates any of these:'
      }
    },
    noFd: {
      message:
        "Based on Myntra's Fair Usage Policy, Convenience fee is applicable for this order.",
      popUp: {
        title: "Myntra's Fair Usage Policy",
        content: `We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal returns policy. These accounts typically return most of the item bought or choose to not accept our shipments. Hence our regular customers deprived of the opportunity to buy these items. To protect the rights of our customers, we reserve the right to collect convenience fee of Rs. ${shippingCharge} for all orders and disable pay on delivery option for accounts which have high percentage of returns and shipments not accepted by value of orders placed.`
      }
    },
    noFdNoCod: {
      message:
        'Convenience fee is applicable and Pay on Delivey is not available for this order.',
      popUp: {
        title:
          'Why Convenience fee is applicable & Pay on Delivery is not available?',
        content:
          'We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal policies. We reserve the right to disable pay on delivery option if the order exceeds the pay on delivey limit or if the account violates any of these:'
      }
    }
  };
  return get(returnAbuserData, key);
};

export const ReturnAbuserModal = props => {
  const { type, shippingCharge } = props;
  const details = getReturnAbuserData(type, 'popUp', shippingCharge) || {};
  return (
    <Modal
      style={{
        width: '30%',
        top: '25%',
        minWidth: '288px',
        fontSize: '12px'
      }}
      cancelCallback={props.cancelCallback}
    >
      <div className={Styles.header}>{details.title}</div>
      <div className={Styles.details}>
        <div>{details.content}</div>
        {props.type !== 'noFd' && (
          <div>
            <ul>
              <li>Myntra's Fair Usage Policy</li>
              <li>Myntra's Email Verification Policy</li>
            </ul>
            <div className={Styles.faq}>
              For more details, please check the FAQs.
            </div>
          </div>
        )}
      </div>
      <button className={Styles.cancelButton} onClick={props.cancelCallback}>
        OK, GOT IT
      </button>
    </Modal>
  );
};

class ReturnAbuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  render() {
    let { returnAbuser, cod, shippingCharge } = this.props;
    const _isReturnAbuser = isReturnAbuser(returnAbuser);
    const maxCOD = get(cod, 'maxCod');
    if (isLoggedIn() && (_isReturnAbuser || maxCOD === 0)) {
      let type = 'noCod';
      if (_isReturnAbuser && shippingCharge !== 0) {
        type = maxCOD === 0 ? 'noFdNoCod' : 'noFd';
      }
      return (
        <div className={Styles.info}>
          <div className={Styles.headerText}>Please Note</div>
          <span className={Styles.textMessage}>
            {getReturnAbuserData(type, 'message') || ''}
          </span>
          <span className={Styles.link} onClick={this.toggleModal}>
            Why?
          </span>
          {this.state.showModal && (
            <ReturnAbuserModal
              type={type}
              cancelCallback={this.toggleModal}
              shippingCharge={shippingCharge}
            />
          )}
        </div>
      );
    }
    return null;
  }
}

ReturnAbuser.propTypes = {
  maxCOD: PropTypes.number
};

export default ReturnAbuser;
