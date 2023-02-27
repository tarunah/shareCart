import React from 'react';
import PropTypes from 'prop-types';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { currencyValue, isValidAmount } from 'commonBrowserUtils/Helper';

import Styles from './credits.base.css';

import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import Rupee from 'iconComp/Rupee.jsx';

class MyntraCredit extends React.PureComponent {
  render() {
    const {
      appliedGC,
      totalGCBalance,
      totalGCBalancePresent,
      gcSellerDisabled,
      toggleGC,
      showBalance,
      giftcardApplicable
    } = this.props;

    const lazyLoad =
      isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD') &&
      !appliedGC &&
      !totalGCBalancePresent;
    const showBalanceButton = lazyLoad || (appliedGC && !totalGCBalancePresent);

    const gcCheckboxDisabled =
      !appliedGC &&
      (lazyLoad || !isValidAmount(totalGCBalance) || gcSellerDisabled);

    return (
      <div className={Styles.creditBlock}>
        <div className={Styles.creditBlockMainArea}>
          <div
            className={Styles.toggleArea}
            onClick={gcCheckboxDisabled ? null : toggleGC}
          >
            {appliedGC ? (
              <CheckboxActive
                className={`gcCheckbox ${Styles.checkbox} ${
                  Styles.checkboxSelected
                } ${gcCheckboxDisabled ? Styles.disabled : ''}`}
              />
            ) : (
              <CheckboxInactive
                className={`gcCheckbox ${Styles.checkbox} ${
                  gcCheckboxDisabled ? Styles.disabled : ''
                }`}
              />
            )}
            <div className={Styles.headerText}>Myntra Credit</div>
          </div>
          {showBalanceButton ? (
            <div className={Styles.rightBlock}>
              <span className={Styles.showBalanceButton} onClick={showBalance}>
                Show Balance
              </span>
            </div>
          ) : (
            appliedGC && (
              <div className={Styles.rightBlock}>
                <div className={Styles.usageInfo}>You used</div>
                <div>
                  <span className={Styles.appliedAmount}>
                    <RupeeBold className={Styles.rupeeIcon} />
                    {currencyValue(appliedGC.value)}
                  </span>
                </div>
              </div>
            )
          )}
          <div className={Styles.balanceText}>
            {appliedGC && totalGCBalance ? (
              <span>
                {'Remaining Balance: '}
                <Rupee className={Styles.balanceRupeeIcon} />
                {currencyValue(totalGCBalance - appliedGC.value)}
              </span>
            ) : totalGCBalancePresent ? (
              <span>
                {'Available Balance: '}
                <Rupee className={Styles.balanceRupeeIcon} />
                {currencyValue(totalGCBalance)}
              </span>
            ) : appliedGC ? (
              <span>
                {'You Used: '}
                <Rupee className={Styles.balanceRupeeIcon} />
                {currencyValue(appliedGC.value)}
              </span>
            ) : null}
          </div>
        </div>
        {gcSellerDisabled ||
        (giftcardApplicable.value && giftcardApplicable.remark === 'MIXED') ? (
          <div className={Styles.note}>
            <span>Please note:</span>{' '}
            {`Myntra Credit is not applicable on any items sold by ${getKVPairValue(
              'PAYMENT_SELLERNAME'
            )}`}
          </div>
        ) : null}
      </div>
    );
  }
}

MyntraCredit.propTypes = {
  appliedGC: PropTypes.object,
  totalGCBalance: PropTypes.number,
  totalGCBalancePresent: PropTypes.bool,
  gcSellerDisabled: PropTypes.bool,
  giftcardApplicable: PropTypes.object,
  toggleGC: PropTypes.func,
  showBalance: PropTypes.func
};

export default MyntraCredit;
