import React, { useState } from 'react';

import Styles from './superCoinProgressBar.base.css';

import Check from 'iconComp/Check.jsx';
import CrownIcon from 'iconComp/InsiderLogoNew.jsx';
import ImageBanner from 'commonComp/ImageBanner';
import ToolTip from 'commonComp/ToolTip';

const getTrialArrowStyles = progressBarCss => {
  const width = Number(progressBarCss.primaryWidth.replace('%', ''));
  switch (true) {
    case width < 20:
      return { left: '20%' };
    case width > 80:
      return { left: '80%' };
    default:
      return { left: progressBarCss.primaryWidth };
  }
};
const TooltipBody = ({
  title = '',
  message = '',
  userName = '',
  tierName = '',
  isTrialUser = false,
  progressBarCss = {}
}) => {
  let tooltipBodyClass = `${
    tierName === 'Select' ? Styles.progressBarTooltipSelect : ''
  }`;
  let trialArrowStyles = {};
  if (isTrialUser) {
    tooltipBodyClass = Styles.trialUserTooltip;
    trialArrowStyles = getTrialArrowStyles(progressBarCss);
  }
  const tooltipArrowClass =
    isTrialUser || tierName === 'Elite'
      ? Styles.progressBarTooltipArrowTrial
      : '';
  if (!message) return null;
  return (
    <>
      <div className={`${Styles.progressBarTooltip} ${tooltipBodyClass}`}>
        {title && (
          <div className={Styles.progressBarTooltipTitle}>
            {title.replace('{{userName}}', userName)}
          </div>
        )}
        <div>{message}</div>
        <div
          className={`${Styles.progressBarTooltipArrow} ${tooltipArrowClass}`}
          style={trialArrowStyles}
        ></div>
      </div>
    </>
  );
};

const getTierLevelsForInsiders = ({ tierNames, tierName }) => {
  const totalTiers = tierNames.length;
  let activeTierIndex = tierNames.indexOf(tierName);
  activeTierIndex =
    activeTierIndex === totalTiers - 1 ? activeTierIndex : activeTierIndex + 1;

  return tierNames.map((tier, index) => {
    const isActiveTier = index <= activeTierIndex;
    const isLastTier = index + 1 === totalTiers;
    return (
      <div className={Styles.tierLevelContainer} key={index}>
        <div
          className={
            isActiveTier ? Styles.activeTierCheck : Styles.inactiveTierCheck
          }
        >
          {isActiveTier ? <Check /> : null}
        </div>
        <div
          className={
            activeTierIndex === index
              ? Styles.activeTierName
              : Styles.inactiveTierName
          }
        >
          {tier}
        </div>
        {isLastTier &&
          (isActiveTier ? (
            <CrownIcon className={Styles.crownIconInactive} />
          ) : (
            <ImageBanner
              name="crownIconDisabled"
              className={Styles.crownIconInactive}
            />
          ))}
      </div>
    );
  });
};

const getTierLevelsForTrialUsers = ({ progressBarLevels }) =>
  progressBarLevels.map((level, index) => {
    const isLastTier = index + 1 === progressBarLevels.length;
    const isActiveTier = index === 0;
    return (
      <div className={Styles.tierLevelContainer} key={index}>
        <div
          className={
            isActiveTier
              ? Styles.activeTierCheck
              : isLastTier
              ? Styles.inactiveTierCheck
              : Styles.blankTierCheck
          }
        >
          {isActiveTier ? <Check /> : null}
        </div>
        <div className={Styles.trialTierLevelName}>{level}</div>
        {isLastTier && (
          <ImageBanner
            name="crownIconDisabled"
            className={Styles.crownIconInactive}
          />
        )}
      </div>
    );
  });

const getTooltipContent = (config, isTrialUser) => {
  const { tooltipTitle, tooltipMessage, insiderTrials = {} } = config;
  const {
    defaultTooltipTitle = '',
    defaultTooltipMessage = ''
  } = insiderTrials;

  if (isTrialUser) {
    return {
      tooltipTitle: defaultTooltipTitle,
      tooltipMessage: defaultTooltipMessage
    };
  }
  return { tooltipTitle: tooltipTitle, tooltipMessage: tooltipMessage };
};

const ProgressBar = ({
  progressBarCss = {},
  tierName = '',
  userName = '',
  config = {},
  isTrialUser = false
}) => {
  const { tierNames = [], insiderTrials = {} } = config;
  const { progressBarLevels = [] } = insiderTrials;
  const [showTooltip, setShowTooltip] = useState(false);
  const renderTooltip = () => setShowTooltip(true);
  const { tooltipTitle, tooltipMessage } = getTooltipContent(
    config,
    isTrialUser
  );

  return (
    <div className={Styles.superCoinProgressBar}>
      <div className={Styles.progressBarBackground}>
        <div className={Styles.tierLevels}>
          {isTrialUser
            ? getTierLevelsForTrialUsers({ progressBarLevels })
            : getTierLevelsForInsiders({ tierNames, tierName })}
        </div>
        <div
          className={Styles.barOverlay}
          onTransitionEnd={renderTooltip}
          style={{ width: progressBarCss.primaryWidth }}
        >
          <div className={Styles.tooltipMainContainer}>
            {showTooltip && (
              <ToolTip
                className={Styles.superCoinTooltipBaseMessage}
                containerClass={Styles.superCoinTooltipContainer}
                isShownDefault={true}
                tipClass={Styles.superCoinTooltip}
                toolTipRefClass={Styles.superCoinToolTipRef}
              >
                <TooltipBody
                  title={tooltipTitle}
                  message={tooltipMessage}
                  userName={userName}
                  tierName={tierName}
                  isTrialUser={isTrialUser}
                  progressBarCss={progressBarCss}
                />
              </ToolTip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
