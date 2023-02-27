import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import {
  CartModalDetailedComponent,
  CartModalDefaultComponent,
  cartModalConstants
} from './CartModalComponent';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import { invalidItemsReason } from 'commonBrowserUtils/CartConstants';

import Styles from './cartModal.base.css';

class CartModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isModeMobile = props.mode === 'mobile';

    this.addressOnCart = isFeatureEnabled('ADDRESS_ON_CART_V2');

    this.oosItems = get(props, 'oosItems', []).filter(
      item => get(item, 'flags.freeItem', false) === false
    );
    this.nonServiceableItems = (
      get(props, 'nonServiceableItems', []) || []
    ).filter(item => get(item, 'flags.freeItem', false) === false);
    this.showDetailedOosModal =
      this.oosItems.length > 0 && props.context === invalidItemsReason.OOS;
    this.showDetailedUnserviceableModal =
      this.nonServiceableItems &&
      props.context === invalidItemsReason.NON_SERVICEABLE &&
      this.nonServiceableItems.length > 0 &&
      this.addressOnCart;

    // Extend conditions to show detailed modal in the below variable
    this.showDetailedModal =
      this.showDetailedOosModal || this.showDetailedUnserviceableModal;

    // Function to accumulate and show invalid products inside the detailed modal
    this.invalidProducts = this.getInvalidProducts();
  }

  getInvalidProducts() {
    if (this.showDetailedOosModal) {
      return this.oosItems;
    } else if (this.showDetailedUnserviceableModal)
      return this.nonServiceableItems;
    else return [];
  }

  getParsedHeader(text) {
    let result = text;

    if (!this.showDetailedOosModal && this.showDetailedUnserviceableModal) {
      const { pincode } = UserLocationDetailsUtil.getLocation();
      result = text.replace('%pincode%', pincode);
    }

    return result;
  }

  getCTAConfig() {
    let secondaryButton = cartModalConstants.REMOVE,
      primaryButton = cartModalConstants.MOVE_TO_WISHLIST;

    if (this.showDetailedOosModal) {
      secondaryButton = cartModalConstants.UNSELECT;
    } else if (this.showDetailedUnserviceableModal) {
      secondaryButton = cartModalConstants.MOVE_TO_WISHLIST;
      primaryButton = cartModalConstants.UNSELECT;
    }

    return { secondaryButton, primaryButton };
  }

  render() {
    const {
      cancelCallback,
      header,
      body,
      analytics,
      handleCartAction,
      sprite
    } = this.props;
    const parsedHeader = this.getParsedHeader(header);

    if (this.showDetailedModal) {
      const { secondaryButton, primaryButton } = this.getCTAConfig();

      return (
        <CartModalDetailedComponent
          className={
            this.isModeMobile ? Styles.mobileModal : Styles.desktopModal
          }
          cancelCallback={cancelCallback}
          halfCard={this.isModeMobile}
          cancelIconConfig={{
            show: true,
            className: Styles.cancel
          }}
          secondaryButton={secondaryButton}
          primaryButton={primaryButton}
          header={parsedHeader}
          body={body}
          sprite={sprite}
          invalidProducts={this.invalidProducts}
          showDetailedOosModal={this.showDetailedOosModal}
          analytics={analytics}
          mode={this.props.mode}
          handleCartAction={handleCartAction}
        />
      );
    }
    return (
      <CartModalDefaultComponent
        className={this.isModeMobile ? Styles.mobileModal : Styles.desktopModal}
        cancelCallback={cancelCallback}
        halfCard={this.isModeMobile}
        cancelIconConfig={{
          show: false
        }}
        header={parsedHeader}
        body={body}
        sprite={sprite}
      />
    );
  }
}

CartModal.propTypes = {
  cancelCallback: PropTypes.func,
  handleCartAction: PropTypes.func,
  oosItems: PropTypes.array,
  analytics: PropTypes.func,
  mode: PropTypes.string
};

CartModal.defaultProps = {
  oosItems: []
};

export default CartModal;
