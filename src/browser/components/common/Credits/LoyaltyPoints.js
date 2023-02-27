import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ToolTip from 'commonComp/ToolTip';
import ImageBanner from 'commonComp/ImageBanner';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { currencyValue } from 'commonBrowserUtils/Helper';

import Styles from './credits.base.css';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import Info from 'iconComp/Info.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

class LoyaltyPoints extends React.PureComponent {
  render() {
    const {
      appliedLP,
      lpSellerDisabled,
      totalActivePoints,
      lpBalancePresent,
      lpBalance,
      loyaltyPointsApplicable,
      toggleLP,
      showBalance
    } = this.props;

    const lazyLoad =
      isFeatureEnabled('LP_BALANCE_LAZYLOAD') &&
      !appliedLP &&
      !lpBalancePresent;
    const showBalanceButton = lazyLoad || (appliedLP && !lpBalancePresent);

    const lpCheckboxDisabled =
      !appliedLP && (lazyLoad || !totalActivePoints || lpSellerDisabled);

    const mfuInfo = getKVPairValue('MFU_INFO_V2');

    return (
      <div className={Styles.creditBlock}>
        <div className={Styles.creditBlockMainArea}>
          <div
            className={Styles.toggleArea}
            onClick={lpCheckboxDisabled ? null : toggleLP}
          >
            {appliedLP ? (
              <CheckboxActive
                className={`lpCheckbox ${Styles.checkbox} ${
                  Styles.checkboxSelected
                } ${lpCheckboxDisabled ? Styles.disabled : ''}`}
              />
            ) : (
              <CheckboxInactive
                className={`lpCheckbox ${Styles.checkbox} ${
                  lpCheckboxDisabled ? Styles.disabled : ''
                }`}
              />
            )}
            <div className={Styles.headerText}>MynCash</div>
          </div>
          {showBalanceButton ? (
            <div className={Styles.rightBlock}>
              <span className={Styles.showBalanceButton} onClick={showBalance}>
                Show Balance
              </span>
            </div>
          ) : (
            appliedLP && (
              <div className={Styles.rightBlock}>
                <div className={Styles.usageInfo}>You saved</div>
                <div>
                  <span className={Styles.appliedAmount}>
                    {isFeatureEnabled('MFU') && (
                      <ImageBanner name="mfu-coin" className={Styles.mfuCoin} />
                    )}
                    <RupeeBold className={Styles.rupeeIcon} />
                    {currencyValue(appliedLP.value)}
                  </span>
                </div>
              </div>
            )
          )}
          <div className={Styles.balanceText}>
            {lpBalancePresent ? (
              <span>
                <span>
                  {'Total Active MynCash: '}
                  <Rupee className={Styles.balanceRupeeIcon} />
                  {currencyValue(
                    totalActivePoints * get(lpBalance, 'conversionFactor')
                  )}
                </span>
                <span className={Styles.lpTooltip}>
                  <ToolTip
                    elem={<Info className={Styles.lpTooltipIcon} />}
                    className={`${Styles.lpTooltipText} ${Styles.mfuV2Text}`}
                    tipStyle={{ left: '-2px', top: '-10px' }}
                  >
                    <div className={Styles.mfuTextContainer}>
                      <div className={Styles.mfuHeading}>
                        {mfuInfo.heading.replace('{points}', totalActivePoints)}
                      </div>
                      <div className={Styles.mfuDesc}>{mfuInfo.desc}</div>
                      <div className={Styles.mfuConversion}>
                        {mfuInfo.conversion}
                      </div>
                    </div>
                  </ToolTip>
                </span>
              </span>
            ) : appliedLP ? (
              <span>
                {'You saved: '}
                <Rupee className={Styles.balanceRupeeIcon} />
                {currencyValue(appliedLP.value)}
              </span>
            ) : null}
          </div>
        </div>
        {lpSellerDisabled ||
        (loyaltyPointsApplicable.value &&
          loyaltyPointsApplicable.remark === 'MIXED') ? (
          <div className={Styles.note}>
            <span>Please note:</span>{' '}
            {`MynCash is not applicable on any items sold by ${getKVPairValue(
              'PAYMENT_SELLERNAME'
            )}`}
          </div>
        ) : null}
      </div>
    );
  }
}

LoyaltyPoints.propTypes = {
  appliedLP: PropTypes.object,
  totalActivePoints: PropTypes.number,
  lpSellerDisabled: PropTypes.bool,
  lpBalance: PropTypes.object,
  loyaltyPointsApplicable: PropTypes.object,
  toggleLP: PropTypes.func
};

export default LoyaltyPoints;
