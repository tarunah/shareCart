import React from 'react';
import Styles from '../priceDropAlert.base.css';
import PropTypes from 'prop-types';
import Rupee from 'iconComp/Rupee.jsx';
import PriceDrop from 'iconComp/PriceDrop.jsx';

const PriceDropStrip = ({ amount, showPDModal, threshold }) => {
  const showDropAmount = amount >= threshold;
  const priceDropText = showDropAmount
    ? 'Bag price dropped by'
    : 'Bag price has dropped';
  return (
    <div className={Styles.priceDropStrip}>
      <PriceDrop className={Styles.priceDropIcon} />
      {priceDropText}
      {showDropAmount && (
        <b>
          {' '}
          <Rupee className={Styles.rupeeIcon} />
          {amount}
        </b>
      )}
      .{' '}
      <span className={Styles.viewDetails} onClick={showPDModal}>
        View Details
      </span>
    </div>
  );
};

PriceDropStrip.propTypes = {
  amount: PropTypes.number,
  threshold: PropTypes.number,
  showPDModal: PropTypes.func
};

export default PriceDropStrip;
