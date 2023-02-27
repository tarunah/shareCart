import React from 'react';
import PropTypes from 'prop-types';

import Style from './expresscheckout.base.css';

import {
  currencyValue,
  isValidAmount,
  getUidx
} from 'commonBrowserUtils/Helper';
import { getCreditTitle } from './util.js';
import ToolTip from 'commonComp/ToolTip';
import { MiniHeaderNav } from './ExpressCheckoutComponents';
import ExpressConstants from './expressConstants';
import Info from 'iconComp/Info.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

const {
  SELLER_INFO_CREDIT,
  SELLER_INFO_LOYALTY,
  LOYALTY_MSG,
  CREDIT_MSG,
  LOYALTY,
  CREDIT
} = ExpressConstants;

const createMarkup = (str, amount, total, info, showOnlyTotal, toggleFn) => {
  const hideTotal = amount === total;
  return (
    <div className={Style.markupWrapper}>
      <div className={Style.creditMarkup} onClick={toggleFn}>
        <div>{str}:&nbsp;</div>
        <b>
          <Rupee className={Style.rupeeStyle} />
          {showOnlyTotal ? currencyValue(total) : currencyValue(amount)}
        </b>{' '}
        {!hideTotal && !showOnlyTotal && (
          <span>
            &nbsp; out of{' '}
            <b>
              <Rupee className={Style.rupeeStyle} />
              {currencyValue(total)}
            </b>{' '}
          </span>
        )}
      </div>
      {info && (
        <ToolTip
          elem={<Info className={Style.tooltipInfoIcon} />}
          className={Style.toolTipText}
          tipStyle={{ left: '1px', top: '-8px' }}
        >
          {info}
        </ToolTip>
      )}
    </div>
  );
};

class BalanceAmount extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoyalty = this.toggleLoyalty.bind(this);
    this.toggleCredit = this.toggleCredit.bind(this);
    this.LPeventTriggered = false;
    this.GCeventTriggered = false;
  }

  componentDidUpdate() {
    const {
      hasLoyalty,
      hasCredit,
      gcBalance,
      lpBalance
    } = this.hasCreditBalance(this.props);
    const uidx = getUidx();
    if (hasLoyalty && !this.LPeventTriggered) {
      this.triggerLPLoadEvent(uidx, lpBalance);
    }
    if (hasCredit && !this.GCeventTriggered) {
      this.triggerGCLoadEvent(uidx, gcBalance);
    }
  }

  triggerLPLoadEvent(uidx, lpBalance) {
    triggerEvent('XPRESS_POINTS_LOAD', {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card'
        },
        widget_items: {
          name: 'myntra-points',
          type: 'button'
        },
        custom: {
          v1: uidx,
          v2: lpBalance
        }
      }
    });
    this.LPeventTriggered = true;
  }

  triggerGCLoadEvent(uidx, gcBalance) {
    triggerEvent('XPRESS_CREDIT_LOAD', {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card'
        },
        widget_items: {
          name: 'myntra-credit',
          type: 'button'
        },
        custom: {
          v1: uidx,
          v2: gcBalance
        }
      }
    });
    this.GCeventTriggered = true;
  }

  toggleCredit() {
    const {
      gcObj: { gcBalance, creditChecked, gcApplicable } = {},
      updateCredit
    } = this.props;
    const gcSellerDisabled = !gcApplicable.value;
    const gcCheckboxDisabled = !isValidAmount(gcBalance) || gcSellerDisabled;
    if (gcCheckboxDisabled) return;
    updateCredit(!creditChecked);
  }

  toggleLoyalty() {
    const {
      lpObj: { loyaltyChecked, lpApplicable, lpBalance } = {},
      updateLoyalty
    } = this.props;
    const lpSellerDisabled = !lpApplicable.value;
    const lpCheckboxDisabled = !isValidAmount(lpBalance) || lpSellerDisabled;
    if (lpCheckboxDisabled) return;
    updateLoyalty(!loyaltyChecked);
  }

  getMarkupFor(type) {
    const {
      gcObj: { gcBalance, gcAmount, creditChecked, gcApplicable },
      lpObj: { lpBalance, lpAmount, loyaltyChecked, lpApplicable },
      loyaltyInfo: { conversion, finalAmount, orderTotal }
    } = this.props;

    let finalMarkup;
    let toggleFn = () => {};
    let appliableCredit = gcAmount || Math.min(finalAmount, gcBalance);
    const maxLoyalty = Math.round(conversion * parseInt(orderTotal, 10));
    const usableLoyalty = Math.min(maxLoyalty, lpBalance);

    const gcInfo =
      !gcApplicable.value ||
      (gcApplicable.value && gcApplicable.remark === 'MIXED')
        ? SELLER_INFO_CREDIT
        : null;
    const lpInfo =
      !lpApplicable.value ||
      (lpApplicable.value && lpApplicable.remark === 'MIXED')
        ? SELLER_INFO_LOYALTY
        : null;
    const showOnlyGCTotal = gcInfo && !creditChecked;
    const showOnlyLPTotal = lpInfo && !loyaltyChecked;
    if (type === LOYALTY) {
      toggleFn = this.toggleLoyalty;
      finalMarkup = createMarkup(
        LOYALTY_MSG,
        loyaltyChecked ? lpAmount : usableLoyalty,
        lpBalance,
        lpInfo,
        showOnlyLPTotal,
        toggleFn
      );
    }

    if (type === CREDIT) {
      toggleFn = this.toggleCredit;
      finalMarkup = createMarkup(
        CREDIT_MSG,
        creditChecked ? gcAmount : appliableCredit,
        gcBalance,
        gcInfo,
        showOnlyGCTotal,
        toggleFn
      );
    }

    return <div className={Style.loyaltyInfo}>{finalMarkup}</div>;
  }

  getLoyaltyMarkup() {
    const {
      lpObj: { loyaltyChecked, lpApplicable, lpBalance } = {}
    } = this.props;
    const lpSellerDisabled = !lpApplicable.value;
    const lpCheckboxDisabled = !isValidAmount(lpBalance) || lpSellerDisabled;
    return (
      <div className={Style.loyaltyCheck}>
        <input
          type="checkbox"
          className={`${Style.hiddenInput} ${Style.loyaltyInput}`}
          onChange={this.toggleLoyalty}
        />
        {loyaltyChecked ? (
          <CheckboxActive
            className={`${Style.checkboxActiveIcon} ${
              lpCheckboxDisabled ? Style.inputDisable : ''
            }`}
          />
        ) : (
          <CheckboxInactive
            className={`${Style.checkboxIcon} ${
              lpCheckboxDisabled ? Style.inputDisable : ''
            }`}
          />
        )}
        <div>{this.getMarkupFor(LOYALTY)}</div>
      </div>
    );
  }

  getCreditMarkup() {
    const {
      gcObj: { gcBalance, creditChecked, gcApplicable }
    } = this.props;

    const gcSellerDisabled = !gcApplicable.value;
    const gcCheckboxDisabled = !isValidAmount(gcBalance) || gcSellerDisabled;
    return (
      <div className={Style.creditCheck}>
        <input
          type="checkbox"
          className={`${Style.hiddenInput} ${Style.creditInput}`}
          onChange={this.toggleCredit}
        />
        {creditChecked ? (
          <CheckboxActive
            className={`${Style.checkboxActiveIcon} ${
              gcCheckboxDisabled ? Style.inputDisable : ''
            }`}
          />
        ) : (
          <CheckboxInactive
            className={`${Style.checkboxIcon} ${
              gcCheckboxDisabled ? Style.inputDisable : ''
            }`}
          />
        )}
        <div>{this.getMarkupFor(CREDIT)}</div>
      </div>
    );
  }

  hasCreditBalance(data) {
    const { gcObj, lpObj } = data || this.props;
    const { gcBalance = 0 } = gcObj;
    const { lpBalance = 0 } = lpObj;
    const hasLoyalty = parseInt(lpBalance, 10) > 0;
    const hasCredit = parseInt(gcBalance, 10) > 0;
    return {
      hasLoyalty,
      hasCredit,
      gcBalance,
      lpBalance
    };
  }

  render() {
    const { hasLoyalty, hasCredit } = this.hasCreditBalance();
    let sectionTitle = getCreditTitle(hasLoyalty, hasCredit);
    return (
      <div className={Style.balanceAmountWrapper}>
        {hasLoyalty || hasCredit ? (
          <MiniHeaderNav header={sectionTitle} />
        ) : null}
        <div className={Style.balanceAmount}>
          {hasLoyalty ? this.getLoyaltyMarkup() : null}
          {hasCredit ? this.getCreditMarkup() : null}
        </div>
      </div>
    );
  }
}

export default BalanceAmount;

BalanceAmount.propTypes = {
  gcObj: PropTypes.object,
  lpObj: PropTypes.object,
  updateLoyalty: PropTypes.func,
  updateCredit: PropTypes.func,
  loyaltyInfo: PropTypes.object
};

BalanceAmount.defaultProps = {
  gcObj: {},
  lpObj: {},
  updateLoyalty: () => {},
  updateCredit: () => {},
  loyaltyInfo: {}
};
