import React from 'react';
import PropTypes from 'prop-types';

// Utils
import get from 'lodash/get';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  getEstimatedDate,
  getChangedDeliveryPromise
} from 'commonBrowserUtils/AddressHelper';

// Components
import { RadioGroup, RadioButton } from 'commonComp/Radio';

import DeliveryBlocks from './DeliveryBlocks';

// Styles
import Style from './deliveryOptions.base.css';

import Rupee from 'iconComp/Rupee.jsx';

const shippingMethodKey = {
  normal: 'NORMAL',
  valueshipping: 'VALUE_SHIPPING',
  sdd: 'SDD',
  expressshipping: 'EXPRESS'
};

const shippingMethodValueMap = {
  NORMAL: 'normal',
  VALUE_SHIPPING: 'valueshipping',
  SDD: 'sdd',
  EXPRESS: 'expressshipping'
};

class DeliveryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.selectShippingMethod = this.selectShippingMethod.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  selectShippingMethod(value, onClickParams, e) {
    const toolTip = e.currentTarget.querySelector('.toolTip-base-container');
    if (toolTip && toolTip.contains(e.target)) {
      return;
    }

    const method = shippingMethodValueMap[value];
    const currentMethodKey = this.props.shippingData.method;
    if (value !== currentMethodKey) {
      let gaLabel = 'standard_delivery';
      method === 'expressshipping' && (gaLabel = 'next_day_delivery');
      method === 'sdd' && (gaLabel = 'same_day_delivery');
      triggerEvent('SHIPPING_METHOD_CLICK', { gaLabel });

      this.props.handleCartAction('applyShippingMethod', method);
    }
  }

  getOptions(type) {
    const {
      valueShippingInfo,
      sddShippingInfo,
      expressShippingInfo,
      shippingData: { method },
      productDeliveryInfo,
      addressInfo: { pincode },
      shippingCharge,
      serviceabilityFlags: {
        expressShipping: { value: expressShippingEnabled },
        sddShipping: { value: sddShippingEnabled },
        valueShipping: { value: valueShippingEnabled }
      }
    } = this.props;

    let isFestiveTime = false;
    let charges = shippingCharge;
    let deliveryPromise;
    let title;
    let highlightText;
    let tryNBuyEligible = true;
    let valueShippingCharge;

    switch (type) {
      case 'NORMAL': {
        deliveryPromise = getChangedDeliveryPromise({
          productDeliveryInfo,
          pincode,
          type
        });
        title = 'Standard Delivery';

        break;
      }

      case 'VALUE_SHIPPING': {
        if (!isFeatureEnabled('VALUE_SHIPPING') || !valueShippingEnabled) {
          return null;
        }

        deliveryPromise = getChangedDeliveryPromise({
          productDeliveryInfo,
          pincode,
          type
        });
        title = 'Value Shipping';
        highlightText = 'SPECIAL OFFER';

        valueShippingCharge = getKVPairValue('VALUE_SHIPPING_CHARGES');
        tryNBuyEligible = get(valueShippingInfo, 'flags.tryNBuy.value', false);

        break;
      }

      case 'SDD': {
        if (!isFeatureEnabled('SDD') || !sddShippingEnabled) {
          return null;
        }

        deliveryPromise = sddShippingInfo.deliveryPromise;
        deliveryPromise.minDays = -1;
        isFestiveTime = isFeatureEnabled('SDD_FESTIVE_OFFER');
        title = `${!deliveryPromise.maxDays ? 'Same' : 'Next'} Day Delivery`;
        highlightText = isFestiveTime ? 'FESTIVE OFFER' : '';
        charges = getKVPairValue('SDD_CHARGES');

        tryNBuyEligible = get(sddShippingInfo, 'flags.tryNBuy.value', false);
        break;
      }

      case 'EXPRESS': {
        if (!isFeatureEnabled('NDD') || !expressShippingEnabled) {
          return null;
        }

        deliveryPromise = expressShippingInfo.deliveryPromise;
        deliveryPromise.minDays = -2;
        let titleText = 'Tomorrow';
        if (deliveryPromise.maxDays > 1) {
          titleText = getEstimatedDate(deliveryPromise.maxDays, {
            hideYear: true
          });
        }

        title = (
          <span>
            {'Get it by '}
            {titleText}
            {', for '}
            <Rupee className={Style.boldRupeeIcon} />
            {getKVPairValue('NDD_CHARGES')}
          </span>
        );
        charges = getKVPairValue('NDD_CHARGES');

        tryNBuyEligible = get(
          expressShippingInfo,
          'flags.tryNBuy.value',
          false
        );

        break;
      }
      default: {
      }
    }

    return (
      <DeliveryBlocks
        type={type}
        title={title}
        highlightText={highlightText}
        tryNBuyEligible={!this.tryAndBuyOpted || tryNBuyEligible}
        isFestiveTime={isFestiveTime}
        charges={charges}
        valueShippingCharge={valueShippingCharge}
        {...deliveryPromise}
      />
    );
  }

  render() {
    const {
      shippingData: { method },
      className,
      headerClassName,
      canHide,
      products = []
    } = this.props;

    this.tryAndBuyOpted =
      (products.find(product => product.tryAndBuyOpted) || {}).tryAndBuyOpted ||
      false;

    const shippingOptions = ['NORMAL', 'VALUE_SHIPPING', 'SDD', 'EXPRESS']
      .map(
        (option, index) =>
          !!this.getOptions(option) && (
            <RadioButton
              key={`deliveryOption_${index}`}
              id={`deliveryOption_${index}`}
              className={`${Style.deliveryOption} ${className}`}
              classes={{ icon: Style.radioIcon }}
              value={option}
            >
              {this.getOptions(option)}
            </RadioButton>
          )
      )
      .filter(isNull => !!isNull);

    if (canHide && shippingOptions.length < 2) {
      return null;
    }

    return (
      <div className={Style.container}>
        <div className={`${Style.title} ${headerClassName}`}>
          CHOOSE DELIVERY SPEED
        </div>

        <RadioGroup
          className={Style.optionsContainer}
          name="deliveryOption"
          value={method}
          onChange={this.selectShippingMethod}
        >
          {shippingOptions}
        </RadioGroup>
      </div>
    );
  }
}

DeliveryOptions.propTypes = {
  shippingData: PropTypes.object.isRequired,
  standardShippingInfo: PropTypes.object.isRequired,
  valueShippingInfo: PropTypes.object.isRequired,
  sddShippingInfo: PropTypes.object.isRequired,
  expressShippingInfo: PropTypes.object.isRequired,
  products: PropTypes.array
};

export default DeliveryOptions;
