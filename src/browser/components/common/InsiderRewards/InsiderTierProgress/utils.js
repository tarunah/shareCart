import get from 'lodash/get';

import { getSubTotal } from 'commonBrowserUtils/CartHelper';

const randomRange = (min, max) => Math.random() * (max - min) + min;

const MAX_ANIM_COUNT = 2;
// maximum no. of times confetti and tier progress bar animations should play

const SCENARIOS = {
  UPGRADE: 'upgrade',
  CLOSE_TO_UPGRADE: 'closeToUpgrade',
  RETENTION: 'retention'
  /*
    upgrade: if the user upgrades to a tier with current purchase
    closeToUpgrade: if the user progressed towards next tier
    retention: if the user has to retain the current tier first before
      progressing/upgrading
  */
};

// Check out these configs in Confetti for more
const confettiConfig = {
  totalCount: 20,
  gravity: 0.35
};

// Check out these configs in Confetti for more
const getConfettoConfig = () => ({
  velocity: {
    x: Math.random() > 0.5 ? 5 : -5,
    y: randomRange(-6, -11)
  },
  randomModifier: 0
});

// Check out these configs in Confetti for more
const confettiConfigProps = {
  confettiConfig,
  getConfettoConfig
};

/*
  Keys to fetch data from API response.
  Format -> name: [path, default_value]
*/
const dataKeys = {
  progressInfo: ['data.tierProgressInfo', {}],
  currentTierName: ['data.tierProgressInfo.tierName', 'Select'],
  tierProgressPercent: ['data.tierProgressInfo.tierProgressPercent', 0],
  superCoinMultiplier: ['data.tierProgressInfo.supercoinsMultiplier', 1],
  upgradeAmountKeys: [
    ['', 0],
    // there is no amt to upgrade to Select, added for consistency
    ['data.tierProgressInfo.requiredAmountToUpgradeToElite', 0],
    ['data.tierProgressInfo.requiredAmountToUpgradeToIcon', 0]
  ]
  /*
    tierProgressPercent: % user has progressed since cur tier beginning
      ie. 50% for a Select means midway between Select and Elite
  */
};

const getFromAPIResponse = (data, key) =>
  dataKeys[key] && get(data, dataKeys[key][0], dataKeys[key][1]);

const calcPurchaseAmount = products =>
  Math.floor(products.reduce((tot, product) => getSubTotal(product) + tot, 0));

/*
  Calculates total % user has progressed since the first tier.
*/
const calcCurrentProgress = (
  tierNames,
  currentTierIndex,
  currentTierProgress
) => {
  const gaps = tierNames.length - 1;
  const progressTillCurrentTier = (currentTierIndex * 100) / gaps;
  const progressAfterCurrentTier = currentTierProgress / gaps;
  const currentProgress = Math.floor(
    progressTillCurrentTier + progressAfterCurrentTier
  );
  return Math.min(100, currentProgress);
};

/*
  Calculates extra progress user makes with the current purchase (%).
  Note: here extra means % the user progressed after the current position
    in the whole insider journey.
*/
const calcPurchaseProgress = ({
  tierNames,
  currentTierIndex,
  upgradeTierIndex,
  scenario,
  purchaseAmount,
  currentUpgradeAmount,
  tierUpgradeAmounts,
  currentProgress
}) => {
  let purchaseProgress = 0;
  const gaps = tierNames.length - 1;
  if (scenario === SCENARIOS.UPGRADE) {
    const progressTillUpgradeTier = (upgradeTierIndex * 100) / gaps;
    const remainingAmount = purchaseAmount - currentUpgradeAmount;
    const progressAfterUpgradeTier =
      (remainingAmount * 100) /
      Math.max(1, tierUpgradeAmounts[upgradeTierIndex] * gaps);
    purchaseProgress =
      progressTillUpgradeTier - currentProgress + progressAfterUpgradeTier;
  } else {
    const tierUpgradeAmount = tierUpgradeAmounts[currentTierIndex];
    purchaseProgress =
      (purchaseAmount * 100) / Math.max(1, tierUpgradeAmount * gaps);
  }
  /*
    progressTillUpgradeTier: % progress from first tier till upgraded tier
    currentProgress: % progress from first tier till current position in insider journey
    progressAfterUpgradeTier: % progress just after upgraded tier
  */
  purchaseProgress = Math.floor(purchaseProgress);
  purchaseProgress = Math.min(100 - currentProgress, purchaseProgress);
  // currentProgress + purchaseProgress can't exceed 100%
  return purchaseProgress;
};

/*
  Calculates if the scenario is upgrade or close to upgrade and corresponding index.
*/
const getScenario = (config, purchaseAmount) => {
  let scenario = SCENARIOS.CLOSE_TO_UPGRADE,
    upgradeTierIndex = config.currentTierIndex + 1;

  // Checks if it is upgrade scenario
  config.currentUpgradeAmounts.forEach((upgradeAmount, index) => {
    const canUpgradeToTier = purchaseAmount >= upgradeAmount;
    if (canUpgradeToTier && index > config.currentTierIndex) {
      upgradeTierIndex = index;
      scenario = SCENARIOS.UPGRADE;
    }
  });
  return [scenario, upgradeTierIndex];
};

/*
  Retrieves amount need to upgrade for each tier from API response.
*/
const getCurrentUpgradeAmounts = data =>
  dataKeys.upgradeAmountKeys.reduce((accum, key) => {
    accum.push(get(data, key[0], key[1]));
    return accum;
  }, []);

const triggerInViewPort = ({
  tierNames,
  currentTierIndex,
  scenario,
  upgradeTierIndex,
  extraAmountForUpgrade,
  points,
  mrp
}) =>
  triggerEvent('INSIDER_REWARDS_IN_VIEW_PORT', {
    custom: {
      custom: {
        v1:
          currentTierIndex + 1 === tierNames.length
            ? 'max_tier'
            : scenario === SCENARIOS.UPGRADE
            ? 'upgraded_tier'
            : 'close_to_new_tier',
        v2: `${tierNames[currentTierIndex]}_${tierNames[upgradeTierIndex]}`,
        v3: points,
        v4: extraAmountForUpgrade
      },
      widget: {
        name: 'cart_supercoins_widget_load',
        type: 'card',
        data_set: {
          data: [
            {
              entity_name: mrp
            }
          ]
        }
      },
      widget_items: {
        name: 'is_insider'
      },
      event_type: 'widgetLoad'
    }
  });

const triggerModalToggle = (tierName, isModalShown) =>
  triggerEvent(`INSIDER_REWARDS_MODAL_${isModalShown ? 'CLOSE' : 'OPEN'}`, {
    custom: {
      custom: {
        v1: tierName
      },
      widget: {
        name: `cart_supercoins_${
          isModalShown ? 'halfcard_close' : 'widget_view_benefits'
        }`,
        type: 'button'
      },
      event_type: 'widgetItemClick'
    }
  });

export {
  SCENARIOS,
  MAX_ANIM_COUNT,
  confettiConfigProps,
  getFromAPIResponse,
  calcPurchaseAmount,
  calcCurrentProgress,
  calcPurchaseProgress,
  getCurrentUpgradeAmounts,
  getScenario,
  triggerInViewPort,
  triggerModalToggle
};
