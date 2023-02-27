import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ToolTip from 'commonComp/ToolTip';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { CART_INSIDER_REWARDS as Strings } from 'commonBrowserUtils/Strings';

import Styles from './components.base.css';

import Info from 'iconComp/Info.jsx';
import SuperCoin from 'iconComp/SuperCoin.jsx';
import SuperCoin2X from 'iconComp/SuperCoin2X.jsx';
import SuperCoin3X from 'iconComp/SuperCoin3X.jsx';
import InsiderLogoNew from 'iconComp/InsiderLogoNew.jsx';

const triggerInfoClick = (tierName, points, shouldTriggerEvent) => {
  shouldTriggerEvent &&
    triggerEvent('INSIDER_REWARDS_INFO_CLICK', {
      custom: {
        custom: {
          v1: tierName,
          v2: points
        },
        widget: {
          name: 'cart_supercoins_widget_info',
          type: 'button'
        },
        event_type: 'widgetItemClick'
      }
    });
};

export const InsiderToolTip = ({
  toolTipText = '',
  shouldTriggerEvent = false,
  tierName,
  points
}) => {
  return toolTipText ? (
    <ToolTip
      elem={
        <Info
          onClick={() => triggerInfoClick(tierName, points, shouldTriggerEvent)}
          className={Styles.tooltipInfoIcon}
        />
      }
      className={`${Styles.toolTipText} ${Styles.toolTipInsider}`}
      tipStyle={{ left: '3px', top: '-6px' }}
    >
      {toolTipText}
    </ToolTip>
  ) : null;
};

InsiderToolTip.propTypes = {
  insiderConfig: PropTypes.object
};

const Title = ({ tierName }) => (
  <div className={Styles.title}>
    <span className={Styles.privilegeTextGold}>
      {tierName.toUpperCase()}
      {' - '}
    </span>
    <span className={Styles.privilegeTextGrey}>
      {Strings.BENEFIT_ON_THIS_PURCHASE}
    </span>
  </div>
);

const CoinsEarnedText = ({ points, tooltip, coinMultiplier }) => {
  const strikePoints = Math.floor(points / Math.max(1, coinMultiplier));
  return (
    <div className={Styles.coinsEarnedText}>
      You'll earn
      {coinMultiplier > 1 && (
        <div>
          {' '}
          <span className={Styles.strikedPoints}>{strikePoints}</span>
        </div>
      )}
      <div className={Styles.superCoin}>
        <SuperCoin />
      </div>
      <span className={Styles.bold}>{points} SuperCoins</span>
      <span className={Styles.InsiderToolTip}>{tooltip}</span>
    </div>
  );
};

export const InsiderTrialUserProgress = ({ insiderDetails, cartData }) => {
  const requiredAmountToUpgrade = get(
    insiderDetails,
    'data.tierProgressInfo.requiredAmountToUpgrade',
    0
  );
  const tierProgressPercent = get(
    insiderDetails,
    'data.tierProgressInfo.tierProgressPercent',
    0
  );
  const insiderTrialsConfig = get(
    getKVPairValue('CONFIRMATION_PAGE_CONFIG'),
    'insiderSuperCoin.insiderTrials',
    {}
  );
  const {
    shopMoreMessage = '',
    upgradeCartMessage = '',
    goalAmount = 0
  } = insiderTrialsConfig;

  if (!shopMoreMessage || !upgradeCartMessage) return null;
  const currentCartValue = Math.ceil(get(cartData, 'price.total', 0));
  const requiredAmountToEndTrial = requiredAmountToUpgrade - currentCartValue;
  let progressPercent =
    tierProgressPercent + (currentCartValue / goalAmount) * 100;
  progressPercent = progressPercent > 100 ? 100 : progressPercent;

  useEffect(() => {
    const message =
      requiredAmountToEndTrial > 0
        ? shopMoreMessage.replace(
            '{{requiredAmount}}',
            `₹${requiredAmountToEndTrial}`
          )
        : `Congratulations! ${upgradeCartMessage}`;
    triggerEvent('INSIDER_TRIALS_WIDGET_LOAD', {
      custom: {
        widget: {
          name: 'trialprogressbar_load',
          type: 'card'
        },
        custom: {
          custom_variable_v1: requiredAmountToUpgrade,
          custom_variable_v2: message
        }
      }
    });
  }, [currentCartValue]);

  return (
    <div className={Styles.insiderTrialUserProgressContainer}>
      {requiredAmountToEndTrial > 0 ? (
        <>
          <div className={Styles.shopMoreMessage}>
            {shopMoreMessage.split(/({{requiredAmount}})/g).map((item, index) =>
              item === '{{requiredAmount}}' ? (
                <span key={index} className={Styles.requiredAmountToEndTrial}>
                  ₹{requiredAmountToEndTrial}
                </span>
              ) : (
                <span key={index}>{` ${item}`}</span>
              )
            )}
          </div>
          <div>
            <div className={Styles.progressBarTrial}>
              <div
                className={Styles.progressBarFilled}
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div className={Styles.progressBarTrialAmount}>
                {goalAmount - requiredAmountToEndTrial}/{goalAmount}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <span className={Styles.insiderTrialColorGreen}>
            Congratulations!{' '}
          </span>
          {upgradeCartMessage}
        </div>
      )}
    </div>
  );
};

export const EarlyAccessText = ({ cartData }) => {
  const cfaRemark = get(cartData, 'flags.coverFeeApplicable.remark') || '';
  const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
  const privilegeUserMap = getKVPairValue('FREE_EARLY_ACCESS_FOR_INSIDER');

  return (
    !!privilegeUserMap[cfaRemark] && (
      <div className={`${Styles.EarlyAccessText}`}>
        {pcConfig.freeEarlyAccessText || Strings.EARLY_ACCESS_FREE}
        <span className={`${Styles.EarlyAccessSaveText}`}>
          {' '}
          Save ₹{pcConfig.charges}
        </span>
      </div>
    )
  );
};

export const InsiderRewardsTextV2 = ({
  points = 0,
  tooltip,
  tierName = '',
  coinMultiplier = 1
}) => {
  return (
    <div className={Styles.rewardsTextContainer}>
      <div className={Styles.coinMultiplier}>
        {coinMultiplier === 2 && <SuperCoin2X />}
        {coinMultiplier === 3 && <SuperCoin3X />}
      </div>
      <div className={Styles.rewardsText}>
        <InsiderLogoNew
          className={Styles.insiderCrown}
          height="24px"
          width="24px"
        />
        <Title tierName={tierName} />
        <div className={Styles.flexBreak} />
        <CoinsEarnedText
          points={points}
          tooltip={tooltip}
          coinMultiplier={coinMultiplier}
        />
      </div>
    </div>
  );
};

export const InsiderRewardsText = ({
  points,
  cartData,
  tooltip,
  isSupercoinEnabled
}) => {
  const cfaRemark = get(cartData, 'flags.coverFeeApplicable.remark') || '';
  const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
  const privilegeUserMap = getKVPairValue('FREE_EARLY_ACCESS_FOR_INSIDER');

  if (!!privilegeUserMap[cfaRemark]) {
    return (
      <div
        className={`${Styles.privilegeContainer} ${
          !isSupercoinEnabled ? Styles.bold : ''
        }`}
      >
        <div className={Styles.privilegeHeader}>
          <span className={Styles.privilegeText}>
            {privilegeUserMap?.[cfaRemark]}
          </span>
          PRIVILEGES ON THIS PURCHASE
        </div>
        <div className={Styles.insiderInfoText}>
          <span className={Styles.privilegeEarnText}>You will earn</span>
          {isSupercoinEnabled && <SuperCoin />}
          <span className={`${Styles.bold} ${Styles.insiderPointsText}`}>
            {points}
          </span>
          <span className={Styles.bold}>
            {isSupercoinEnabled ? 'SuperCoins' : 'Insider points'}
          </span>
          <span className={Styles.InsiderToolTip}>{tooltip}</span>
        </div>
        <div>
          {pcConfig.freeEarlyAccessText || 'Get Early Access for free!'}
          <span className={`${Styles.bold} ${Styles.insiderSaveText}`}>
            Save ₹{pcConfig.charges}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${Styles.insiderInfoText} ${
        !isSupercoinEnabled ? Styles.bold : ''
      }`}
    >
      <span className={Styles.insiderEarnText}>You will earn</span>
      {isSupercoinEnabled && <SuperCoin />}
      <span
        className={`${isSupercoinEnabled ? Styles.bold : Styles.textGreen} ${
          Styles.insiderPointsText
        }`}
      >
        {points}
      </span>
      {isSupercoinEnabled ? (
        <span className={Styles.bold}>{'SuperCoins'}</span>
      ) : (
        'Insider points'
      )}
      <span className={Styles.insiderPurchaseText}>on this purchase</span>
      {tooltip}
    </div>
  );
};

InsiderRewardsText.propTypes = {
  points: PropTypes.number
};
