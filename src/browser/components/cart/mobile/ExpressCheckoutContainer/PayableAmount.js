import React from 'react';
import PropTypes from 'prop-types';

import { currencyValue } from 'commonBrowserUtils/Helper';

import Style from './expresscheckout.base.css';
import ExpressConstants from './expressConstants';
import RupeeBold from 'iconComp/RupeeBold.jsx';
const { PAYABLE_TXT } = ExpressConstants;

const PayableAmount = ({ finalAmount, showPayable }) => {
  const roundedMRP = currencyValue(finalAmount);
  return (
    showPayable && (
      <div className={Style.finalAmount}>
        {PAYABLE_TXT}:{' '}
        <b>
          <RupeeBold className={Style.rupeeStyle} />
          {roundedMRP}
        </b>{' '}
        <span>(Inc. of Tax)</span>
      </div>
    )
  );
};

PayableAmount.propTypes = {
  data: PropTypes.object,
  hasChecked: PropTypes.bool,
  finalAmount: PropTypes.number,
  showPayable: PropTypes.bool
};

export default PayableAmount;
