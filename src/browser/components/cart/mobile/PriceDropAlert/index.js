import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PriceDropStrip from './PriceDropStrip';
import PriceDropModal from './PriceDropModal';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import Styles from './priceDropAlert.base.css';

class PriceChangeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPriceDropModal: false
    };
    const { subtitle } = getKVPairValue('CART_PRICE_CHANGE_CONFIG');
    this.priceChangeTxt = subtitle;
    ['togglePriceDropModal', 'triggerPriceChangeDetailClick'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    this.triggerShowPriceAlert();
  }

  togglePriceDropModal() {
    this.setState(prevState => {
      if (!prevState.showPriceDropModal) {
        this.triggerPriceChangeDetailClick();
      }
      return { showPriceDropModal: !prevState.showPriceDropModal };
    });
  }

  triggerPriceChangeDetailClick() {
    triggerEvent('CART_PRICE_CHANGE_DETAILS_CLICK', {
      custom: {
        widget: {
          name: 'cart_price_drop',
          type: 'card'
        },
        widget_items: {
          name: 'view_details_click',
          type: 'button'
        }
      }
    });
  }

  triggerShowPriceAlert() {
    triggerEvent('CART_PRICE_CHANGE_STRIP_LOAD', {
      custom: {
        widget: {
          name: 'cart_price_drop',
          type: 'card'
        },
        custom: {
          v1: this.props.netDrop
        }
      }
    });
  }

  render() {
    const { showPriceDropModal } = this.state;
    const { products, netDrop, threshold } = this.props;
    const { togglePriceDropModal, subtitle } = this;
    return (
      <div className={Styles.priceChangeContainer}>
        <PriceDropStrip
          amount={netDrop}
          threshold={threshold}
          showPDModal={togglePriceDropModal}
        />
        {showPriceDropModal && (
          <PriceDropModal
            cancelModal={togglePriceDropModal}
            totalDrop={netDrop}
            products={products}
            priceChangeTxt={subtitle}
          />
        )}
      </div>
    );
  }
}

PriceChangeContainer.propTypes = {
  products: PropTypes.array,
  netDrop: PropTypes.number,
  threshold: PropTypes.number
};

export default PriceChangeContainer;
