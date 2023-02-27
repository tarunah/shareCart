import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { CART_INSIDER_REWARDS as Strings } from 'commonBrowserUtils/Strings';
import useModal from 'customHooks/useModal';

import Styles from './insiderTierProgress.base.css';

import TierProgressBar from './TierProgressBar';
import BenefitsModal from './BenefitsModal';
import Confetti, { ANIM_STATES } from 'commonComp/ConfettiV2';

import {
  SCENARIOS,
  confettiConfigProps,
  getFromAPIResponse,
  calcPurchaseAmount,
  calcCurrentProgress,
  calcPurchaseProgress,
  getCurrentUpgradeAmounts,
  getScenario,
  triggerInViewPort,
  MAX_ANIM_COUNT,
  triggerModalToggle
} from './utils';

/*
	Calculates and returns data related to the progress the user makes
	in the current tier with the current purchase.
*/
const getPurchaseProgressData = (config, purchaseAmount) => {
  const [scenario, upgradeTierIndex] = getScenario(config, purchaseAmount);
  const currentUpgradeAmount =
    config.currentUpgradeAmounts[upgradeTierIndex] || 0;
  const extraAmountForUpgrade = Math.max(
    0,
    currentUpgradeAmount - purchaseAmount
  );
  const purchaseProgress = calcPurchaseProgress({
    ...config,
    upgradeTierIndex,
    scenario,
    purchaseAmount,
    currentUpgradeAmount
  });

  return {
    scenario,
    extraAmountForUpgrade,
    purchaseProgress,
    upgradeTierIndex
  };
  /*
		scenario: upgrade or close to upgrade
		upgradeTierIndex: tier user is upgrading to with current purchase
			or is close to upgrade to (ie. next tier)
		extraAmountForUpgrade: amt needed to upgrade after this purchase
		purchaseProgress: extra progress user makes with the current purchase (%)
	*/
};

/*
	Sets purchase related data in state which is eventually added to config ref
	variable in getConfig function.
*/
const setPurchaseData = (config, selectedProducts, setPurchaseProgressData) => {
  const purchaseAmount = calcPurchaseAmount(selectedProducts);

  useEffect(() => {
    setPurchaseProgressData(getPurchaseProgressData(config, purchaseAmount));
  }, [config, purchaseAmount]);
  // only update purchase related data when purchase amt changes
};

/*
	Sets config for the whole component in 'config' state variable.
*/
const getConfig = props => {
  const {
    insiderDetails = {},
    selectedProducts = [],
    setPurchaseProgressData
  } = props;
  // insiderDetails: data fetched from API
  const [config, setConfig] = useState({
    tierNames: [],
    currentTierIndex: 0,
    currentProgress: 0,
    tierUpgradeAmounts: [],
    currentUpgradeAmounts: [],
    bannerNames: []
  });

  useEffect(() => {
    const GHConfig = getKVPairValue('CART_INSIDER_PROGRESS');
    const tierNames = GHConfig.tierNames;
    const currentTierIndex = tierNames.indexOf(
      getFromAPIResponse(insiderDetails, 'currentTierName')
    );
    const currentTierProgress = getFromAPIResponse(
      insiderDetails,
      'tierProgressPercent'
    );

    setConfig({
      tierNames,
      currentTierIndex,
      currentProgress: calcCurrentProgress(
        tierNames,
        currentTierIndex,
        currentTierProgress
      ),
      tierUpgradeAmounts: GHConfig.tierUpgradeAmounts || [],
      currentUpgradeAmounts: getCurrentUpgradeAmounts(insiderDetails),
      bannerNames: GHConfig.bannerNames || []
    });
    /*
			currentProgress: before the current purchase, total % user has progressed
				since the first tier
			tierUpgradeAmounts: total amount gaps between consecutive tiers
			currentUpgradeAmounts: amount needed to upgrade to each tier
		*/
  }, [insiderDetails]);

  setPurchaseData(config, selectedProducts, setPurchaseProgressData);

  return config;
};

/*
	Updates animations when component comes into or goes out of view.
*/
const updateAnimation = ({
  eventData,
  setAnimate,
  setShowProgress,
  observer,
  entry,
  animCountRef
}) => {
  if (
    entry.isIntersecting &&
    entry.intersectionRatio === 1 &&
    animCountRef.current < MAX_ANIM_COUNT
  ) {
    !animCountRef.current && triggerInViewPort(eventData);
    // trigger the event only once
    animCountRef.current++;
    setAnimate(true);
    setShowProgress(true);
    // start animations when comp in view
  } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
    if (animCountRef.current === MAX_ANIM_COUNT) {
      observer.disconnect();
      setAnimate(false);
      setShowProgress(true);
      // stop observing & stop animation but keep showing static progress bar UI
    } else {
      setAnimate(false);
      setShowProgress(false);
      // stop animation and hide progress bar UI when comp goes out of view
    }
  }
};

const getRef = ({
  purchaseProgressData,
  mrp,
  points,
  config,
  setAnimate,
  setShowProgress,
  animCountRef
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const eventData = {
      ...purchaseProgressData,
      ...config,
      mrp,
      points
    };
    const observer =
      window.IntersectionObserver &&
      new window.IntersectionObserver(
        (entries, observer) =>
          updateAnimation({
            eventData,
            setAnimate,
            setShowProgress,
            entry: entries[0],
            observer,
            animCountRef
          }),
        {
          rootMargin: '0px 0px -80px 0px',
          // 80px because of sticky place order button
          threshold: [0, 1]
        }
      );
    ref.current && observer && observer.observe(ref.current);
    return () => observer && observer.disconnect();
  }, [purchaseProgressData, config, mrp, points]);
  return ref;
};

// For UPGRADE and CLOSE_TO_UPGRADE scenarios
const UpgradeComp = props => {
  const [animate, setAnimate] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  // control to show/hide progress bar UI
  const [purchaseProgressData, setPurchaseProgressData] = useState({});
  const [isModalShown, toggleModalState] = useModal();
  const animCountRef = useRef(0);
  // count of how many times animations have been played

  const config = getConfig({ ...props, setPurchaseProgressData });
  const {
    tierNames = getKVPairValue('CART_INSIDER_PROGRESS').tierNames,
    currentTierIndex = 0,
    currentProgress = 0,
    bannerNames = []
  } = config;
  const {
    purchaseProgress = 0,
    upgradeTierIndex = 1,
    scenario = SCENARIOS.CLOSE_TO_UPGRADE,
    extraAmountForUpgrade = 0
  } = purchaseProgressData;
  // all the purchase related data
  const upgradeTierName = tierNames[upgradeTierIndex] || '';

  const toggleModal = () => {
    triggerModalToggle(upgradeTierName, isModalShown);
    toggleModalState();
  };

  const ref = getRef({
    purchaseProgressData,
    mrp: props.mrp,
    points: props.points,
    config,
    setAnimate,
    setShowProgress,
    animCountRef
  });

  const iconIndex = tierNames.indexOf('Icon');
  if (currentTierIndex + 1 === tierNames.length) return null;
  // For the last tier, there is no UPGRADE or CLOSE_TO_UPGRADE scenario

  return (
    <div
      className={`${Styles.insiderContainer} ${
        upgradeTierIndex === iconIndex ? Styles.iconContainer : ''
      }`}
      ref={ref}
    >
      {scenario === SCENARIOS.UPGRADE && (
        <Confetti
          className={Styles.confetti}
          {...confettiConfigProps}
          animState={animate ? ANIM_STATES.PLAY : ANIM_STATES.STOP}
        />
      )}
      <div className={Styles.upgradeMsg}>
        {scenario === SCENARIOS.CLOSE_TO_UPGRADE
          ? Strings.CLOSE_TO_UPGRADE_MSG
          : Strings.UPGRADE_MSG.replace(
              '<tier>',
              upgradeTierName.toUpperCase()
            )}
      </div>
      <div className={Styles.viewBenefits} onClick={toggleModal}>
        {Strings.VIEW_BENEFITS}
      </div>
      <TierProgressBar
        upgradeTierIndex={upgradeTierIndex}
        tierNames={tierNames}
        scenario={scenario}
        currentProgressPercent={showProgress ? currentProgress : 0}
        purchaseProgressPercent={showProgress ? purchaseProgress : 0}
        upgradeAmount={extraAmountForUpgrade}
        animate={animate}
      />
      <BenefitsModal
        showModal={isModalShown}
        onClose={toggleModal}
        tierName={upgradeTierName.toUpperCase()}
        bannerName={bannerNames[upgradeTierIndex]}
      />
    </div>
  );
};

const InsiderTierProgress = props => {
  return <UpgradeComp {...props} />;
  // Retention case is planned for later.
};

InsiderTierProgress.propTypes = {
  insiderDetails: PropTypes.object.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  mrp: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired
};

export default InsiderTierProgress;
