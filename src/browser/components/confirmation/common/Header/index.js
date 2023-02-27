import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { viewOrdersTriggerEvent } from '../CardComponents';

import Styles from './header.base.css';

import ConfirmTick from 'iconComp/ConfirmTick.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pulse: false
    };
  }

  componentDidMount() {
    const successIcon = document.getElementById('successIcon');
    successIcon &&
      successIcon.addEventListener('animationend', () => {
        this.setState({
          pulse: true
        });
      });
  }

  render() {
    const {
      props: { storeOrderId },
      state: { pulse }
    } = this;
    const partnerOffer = getKVPairValue('PARTNER_OFFER');

    return (
      <div className={Styles.container}>
        <div
          id="successIcon"
          className={`${Styles.iconBlock} ${pulse ? Styles.pulse : ''}`}
        >
          <ConfirmTick className={Styles.confirmTick} />
        </div>
        <div className={Styles.heading}>Order Confirmed</div>
        <div className={Styles.desc}>
          You will receive an order confirmation email shortly with the expected
          delivery date.
        </div>
        {!isFeatureEnabled('CONFIRMATION_VIEW_ORDER_DISABLE') && (
          <div onClick={() => viewOrdersTriggerEvent(storeOrderId)}>
            <a
              href={`/my/order/details?storeOrderId=${storeOrderId}&fromConfirmation=true`}
              className={Styles.link}
            >
              View Order
            </a>
          </div>
        )}
        {get(partnerOffer, 'data.enabled') ? (
          <div className={Styles.partnerOffer}>
            <a className={Styles.link} href={get(partnerOffer, 'data.link')}>
              {get(partnerOffer, 'data.title')}
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

Header.propTypes = {
  storeOrderId: PropTypes.string,
  showLoader: PropTypes.func
};

export default Header;
