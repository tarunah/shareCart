import React from 'react';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  getOfferComponent,
  getServiceableComponent,
  getPriceIncreaseComponent,
  getPriceDecreaseComponent,
  getOOSComponent,
  getVBConflictComponent,
  getSavingsFeedbackComponent,
  getLoginNudgeComponent,
  getCombinedMessageComponent
} from './components';

import Styles from './messageContainer.base.css';

const ComponentMapping = {
  Offer: getOfferComponent,
  Serviceable: getServiceableComponent,
  PriceIncreaseConflict: getPriceIncreaseComponent,
  PriceDecreaseConflict: getPriceDecreaseComponent,
  OutOfStock: getOOSComponent,
  VirtualBundleConflict: getVBConflictComponent,
  SavingsFeedback: getSavingsFeedbackComponent,
  LoginNudge: getLoginNudgeComponent
};

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isPriceDetailsOpen: false
    };

    ['toggleSwitch', 'closeAll'].forEach(
      method => (this[method] = this[method].bind(this))
    );

    this.cartMessageConfig = getKVPairValue('CART_MESSAGES_CONFIG');
    this.displaySequence = get(
      this.cartMessageConfig,
      'config.displaySequence'
    ) || [
      'Serviceable',
      'Offer',
      'LoginNudge',
      'SavingsFeedback',
      'OutOfStock',
      'VirtualBundleConflict',
      'PriceIncreaseConflict',
      'PriceDecreaseConflict'
    ];
    this.combinedComponent =
      get(
        this.cartMessageConfig,
        'config.combinedMessageContainer.component'
      ) || [];
  }

  toggleSwitch(type) {
    this.setState(state => ({
      [type]: !state[type]
    }));
  }

  closeAll() {
    this.setState({
      isModalOpen: false,
      isPriceDetailsOpen: false
    });
  }

  render() {
    const { toggleSwitch, closeAll, cartMessageConfig } = this;

    const propsToPass = {
      ...this.props,
      ...this.state,
      cartMessageConfig,
      toggleSwitch,
      closeAll
    };

    const componentArray = [];
    const combinedComponent = [];

    this.combinedComponent.forEach((item, i) => {
      const Component =
        ComponentMapping[item] && ComponentMapping[item](propsToPass);
      if (Component) {
        combinedComponent.push(Component);
      }
    });
    const isCombinedContainerVisible = combinedComponent.length > 1;

    this.displaySequence.forEach((item, i) => {
      if (
        isCombinedContainerVisible &&
        this.combinedComponent.indexOf(item) >= 0
      ) {
        return;
      }

      const Component =
        ComponentMapping[item] && ComponentMapping[item](propsToPass);

      if (Component) {
        componentArray.push(Component);
      }
    });

    return (
      <div className={Styles.messageContainer}>
        {componentArray}
        {isCombinedContainerVisible
          ? getCombinedMessageComponent(combinedComponent, propsToPass)
          : null}
      </div>
    );
  }
}

export default MessageContainer;
