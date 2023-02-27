import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Style from './specialOffer.base.css';

// Utils
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Rupee from 'iconComp/Rupee.jsx';

const SpecialOffer = ({ show, className }) => {
  return show ? (
    <div className={`${Style.container} ${className}`}>
      <div className={Style.title}>Special Offer</div>
      <div>
        <span className={Style.bold}>
          <span>Get </span>
          <Rupee className={Style.icon} />
          <span>{getKVPairValue('VALUE_SHIPPING_CHARGES')}</span>
          <span> off </span>
        </span>
        <span>by selecting Value Shipping.</span>
      </div>
    </div>
  ) : null;
};

SpecialOffer.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string
};

SpecialOffer.defaultProps = {
  show: false,
  className: ''
};

export default SpecialOffer;
