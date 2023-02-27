import React from 'react';
import PropTypes from 'prop-types';

import { currencyValue } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

import Styles from '../savingsFomo.base.css';

const { MIGHT_MISS_SAVINGS, LEAVE_PAGE_CONFIRMATION } = Strings;

const SavingsFomoHeader = ({ totalSavings }) => (
  <div>
    <div className={Styles.header}>{MIGHT_MISS_SAVINGS}</div>
    <div className={Styles.savingsValue}>₹{currencyValue(totalSavings)}</div>
    <div className={Styles.savingsConfirmationText}>
      {LEAVE_PAGE_CONFIRMATION}
    </div>
  </div>
);

SavingsFomoHeader.propTypes = {
  totalSavings: PropTypes.number
};

export { SavingsFomoHeader };
