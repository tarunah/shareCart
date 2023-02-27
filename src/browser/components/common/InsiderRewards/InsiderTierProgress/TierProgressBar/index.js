import React from 'react';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import TierCheck from 'iconComp/TierCheck.jsx';
import InsiderLogoNew from 'iconComp/InsiderLogoNew.jsx';

import Styles from './tierProgressBar.base.css';

import { SCENARIOS } from '../utils.js';

const TierDetails = ({
  tierName,
  index,
  upgradeTierIndex,
  scenario,
  upgradeAmount,
  tiersCount
}) => {
  const isUpgradeScenario = scenario === SCENARIOS.UPGRADE;
  const lastCheckedIndex = upgradeTierIndex - (isUpgradeScenario ? 0 : 1);
  // If it's upgrade scenario, upgradeTierIndex (upgraded tier) will also be checked
  const isUpgradeTier = index === upgradeTierIndex;
  const hasUpgradedToTier = isUpgradeScenario && isUpgradeTier;
  const isChecked = index <= lastCheckedIndex;

  return (
    <div
      className={`${Styles.tierDetails}
			${index === 0 ? Styles.firstTier : ''}
			${index + 1 === tiersCount ? Styles.lastTier : ''}`}
    >
      {tierName === 'Icon' && (
        <InsiderLogoNew
          height="26px"
          width="35px"
          className={!isUpgradeTier ? Styles.insiderLogo : ''}
        />
      )}
      {isChecked ? (
        <div
          className={`${Styles.checkedTier} ${
            hasUpgradedToTier ? Styles.upgradedTier : ''
          }`}
        >
          <TierCheck height="19px" width="19px" />
        </div>
      ) : (
        <div className={Styles.uncheckedTier} />
      )}
      <div
        className={`${Styles.tierName} ${
          isChecked ? Styles.checkedTierName : ''
        }
				${isUpgradeTier ? Styles.upgradeTierName : ''}`}
      >
        {tierName}
      </div>
      {isUpgradeTier && !hasUpgradedToTier && (
        <div className={Styles.upgradeAmtText}>
          Shop for
          <br />
          <RupeeBold className={Styles.upgradeAmtRupee} />
          <b>{upgradeAmount}</b> more
        </div>
      )}
    </div>
  );
};

const TierProgressBar = ({
  upgradeTierIndex,
  tierNames,
  currentProgressPercent,
  purchaseProgressPercent,
  scenario,
  upgradeAmount,
  animate = false
}) => {
  return (
    <div className={Styles.tierContainer}>
      <div className={Styles.progressContainer}>
        <div
          className={`${Styles.currentProgressBar} ${
            animate ? Styles.animate : ''
          }`}
          style={{ width: `${currentProgressPercent}%` }}
        />
        <div className={Styles.progressPoint} />
        <div
          className={`${Styles.purchaseProgressBar} ${
            animate ? Styles.animate : ''
          }`}
          style={{ width: `${purchaseProgressPercent}%` }}
        />
      </div>
      {tierNames.map((name, index) => (
        <TierDetails
          tierName={name}
          index={index}
          upgradeTierIndex={upgradeTierIndex}
          scenario={scenario}
          upgradeAmount={upgradeAmount}
          key={index}
          tiersCount={tierNames.length}
        />
      ))}
    </div>
  );
};

export default TierProgressBar;
