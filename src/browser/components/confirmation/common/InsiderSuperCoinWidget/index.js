import React, { useEffect, useRef, useState } from 'react';
import get from 'lodash/get';

import Styles from './insiderSuperCoinWidget.base.css';

import ChevronRight from 'iconComp/ChevronRight.jsx';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import IntersectionObserverComponent from 'commonComp/IntersectionObserverComponent';
import Loader from 'commonComp/Loader';
import SuperCoinHeader from './SuperCoinHeader';
import CollectCoinsContainer from './CollectCoinsContainer';
import ProgressBar from './ProgressBar';
import SuperCoinRewards from './SuperCoinRewards';
import { getItem } from 'commonBrowserUtils/LocalStorageUtils';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { localStorageKeys } from 'commonUtils/constants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const getUpgradedTierProgressPercent = ({
  tierName,
  isInsiderTrialUser,
  tierProgressPercent
}) => {
  if (isInsiderTrialUser) {
    return { primaryPercent: tierProgressPercent };
  }
  switch (tierName) {
    case 'Select':
      return { primaryPercent: 50 };
    case 'Elite':
    case 'Icon':
      return { primaryPercent: 100 };
  }
};

/**
 * Checks localStorage for myntraInsider info from myProfile key.
 * If myProfile key is not available, it returns true and relies on
 * API response for checking this info
 */
const getInsiderStatus = () => {
  const isUserInsider = getItem((localStorageKeys || {}).USER_PROFILE, true);
  return (
    !isUserInsider ||
    get(isUserInsider, 'details.myntraInsider.status', '') === 'active'
  );
};

const CtaContainer = ({
  allRewardsCtaLink = '',
  allRewardsCtaText = '',
  analyticsData = {}
}) => {
  const allRewardsCtaClickHandler = () => {
    const { customAnalytics, widgetName } = analyticsData;
    triggerEvent('INSIDER_SUPERCOIN_WIDGET_CTA_CLICK', {
      custom: {
        widget: {
          name: widgetName,
          type: 'button'
        },
        widget_items: {
          name: 'insider_benefits_view_rewards_click'
        },
        custom: { ...customAnalytics }
      }
    });
    allRewardsCtaLink && (window.location.href = allRewardsCtaLink);
  };

  return (
    <div className={Styles.allRewardsCtaContainer}>
      <span
        className={Styles.allRewardsCtaContainerText}
        onClick={allRewardsCtaClickHandler}
      >
        {allRewardsCtaText}{' '}
        <ChevronRight className={Styles.allRewardsCtaContainerChevron} />
      </span>
    </div>
  );
};

const InsiderSuperCoinWidget = props => {
  const config = get(
    getKVPairValue('CONFIRMATION_PAGE_CONFIG'),
    'insiderSuperCoin',
    {}
  );
  const {
    acceleratedEarning = {},
    headerMessage = '',
    collectCoinsMessage = '',
    superCoinRewardsTitle = '',
    rewardsList = '',
    rewardItemCtaLink = '',
    allRewardsCtaLink = '',
    allRewardsCtaText = ''
  } = config;
  const orderItems = get(props, 'dataState.data.bountyOrder.items', []);
  const userName = get(props, 'dataState.data.delivery.user.name', '');
  const insiderTrialsEnabled = isFeatureEnabled('CHECKOUT_INSIDER_TRIAL');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUserInsider, setIsUserInsider] = useState(getInsiderStatus());
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressBarCss, setProgressBarCss] = useState({});
  const [coinsToCollect, setCoinsToCollect] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState('auto');
  const [isTrialUser, setIsTrialUser] = useState(false);
  const [requiredAmountToEndTrial, setRequiredAmountToEndTrial] = useState(0);
  const tierProgressPercentRef = useRef({
    primaryPercent: 0
  });
  const tierNameRef = useRef('');
  const amountToUpgradeRef = useRef(0);
  const trialUserTitle = get(config, 'insiderTrials.title', '');
  const analyticsData = {
    widgetName: 'insider_benefits_callout',
    customAnalytics: {
      custom_variable_v1: tierNameRef.current,
      custom_variable_v2: coinsToCollect,
      custom_variable_v3: showProgressBar ? 'upgrade' : 'earning',
      custom_variable_v4: isTrialUser,
      custom_variable_v5: amountToUpgradeRef.current
    }
  };

  useEffect(() => {
    if (!isUserInsider || !(Object.keys(config) || []).length) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    let orderAmount = 0;
    const itemEntries = orderItems.map(item => {
      const amount = get(item, 'payments.amount', 0) / 100;
      orderAmount += amount;
      return {
        styleId: item.styleId,
        skuId: item.skuId || '',
        amount
      };
    });
    setIsLoading(true);
    let data;
    try {
      data = await Promise.all([
        ConfirmationManager.getInsiderDetails(),
        ConfirmationManager.getOrderPoints({ itemEntries })
      ]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    const [insiderDetails = {}, orderPointsData = {}] = data || [];
    setupStateData(insiderDetails, orderPointsData, orderAmount);
  };

  const setupStateData = (insiderDetails, orderPointsData, orderAmount) => {
    const isUserInsiderActive = get(insiderDetails, 'data.isInsider', false);
    setIsUserInsider(isUserInsiderActive);
    const tierName = get(insiderDetails, 'data.tierProgressInfo.tierName', '');
    // If user is not an insider, we don't want to show the widget
    if (!isUserInsiderActive || !tierName || !orderPointsData) {
      setIsError(true);
      return;
    }

    tierNameRef.current = tierName;
    // Trial Pack Info
    const isInsiderTrialUser =
      insiderTrialsEnabled &&
      get(insiderDetails, 'data.tierProgressInfo.isTrialUser', false);
    const coinsToCollect = get(orderPointsData, 'totalPoints', 0);
    const amountToUpgrade = getAmountToUpgrade({
      insiderDetails,
      isInsiderTrialUser,
      tierName
    });
    const tierProgressPercent = get(
      insiderDetails,
      'data.tierProgressInfo.tierProgressPercent',
      0
    );
    const shouldShowProgressBar =
      isInsiderTrialUser ||
      (orderAmount >= amountToUpgrade && tierName !== 'Icon');

    if (shouldShowProgressBar) {
      setShowProgressBar(true);
      tierProgressPercentRef.current = getUpgradedTierProgressPercent({
        tierName,
        isInsiderTrialUser,
        tierProgressPercent
      });
      setCarouselHeight('0');
    } else {
      setCarouselHeight('auto');
    }
    amountToUpgradeRef.current = amountToUpgrade;
    setRequiredAmountToEndTrial(amountToUpgrade - orderAmount);
    setIsTrialUser(isInsiderTrialUser);
    setCoinsToCollect(coinsToCollect);
  };

  const getAmountToUpgrade = ({
    insiderDetails,
    isInsiderTrialUser,
    tierName
  }) => {
    const requiredAmountToUpgradeTrial = get(
      insiderDetails,
      'data.tierProgressInfo.requiredAmountToUpgrade',
      0
    );
    if (isInsiderTrialUser) return requiredAmountToUpgradeTrial;

    const requiredAmountToUpgradeToElite = get(
      insiderDetails,
      'data.tierProgressInfo.requiredAmountToUpgradeToElite',
      0
    );
    const requiredAmountToUpgradeToIcon = get(
      insiderDetails,
      'data.tierProgressInfo.requiredAmountToUpgradeToIcon',
      0
    );
    const amountToUpgrade =
      tierName === 'Select'
        ? requiredAmountToUpgradeToElite
        : tierName === 'Elite'
        ? requiredAmountToUpgradeToIcon
        : 0;
    return amountToUpgrade;
  };

  const startProgressBarAnimation = () => {
    setTimeout(() => {
      setProgressBarCss({
        primaryWidth: `${tierProgressPercentRef.current.primaryPercent}%`
      });
    }, 100);
  };

  const showAccents = () =>
    !!(
      tierNameRef.current === 'Icon' ||
      (showProgressBar && tierNameRef.current === 'Elite')
    );

  const sendWidgetLoadAnalytics = () => {
    const { customAnalytics, widgetName } = analyticsData;
    triggerEvent('INSIDER_SUPERCOIN_WIDGET_LOAD', {
      custom: {
        widget: {
          name: widgetName,
          type: 'card'
        },
        custom: { ...customAnalytics }
      }
    });
  };

  // Don't show the widget if the user is not an insider or there is an error
  if (!(Object.keys(config) || []).length || !isUserInsider || isError)
    return null;

  if (isLoading) return <Loader show className={Styles.superCoinLoader} />;

  return (
    <div
      className={`${props.insiderSuperCoinClass} ${
        Styles.insiderSuperCoinContainer
      } ${showAccents() ? Styles.goldenAccent : ''}`}
    >
      <div className={`${showAccents() ? Styles.goldenAccentTop : ''}`}></div>
      <IntersectionObserverComponent
        id="sc-analytics-sensor"
        triggerAction={sendWidgetLoadAnalytics}
      />
      <SuperCoinHeader
        headerMessage={headerMessage}
        tierName={tierNameRef.current}
        isTrialUser={isTrialUser}
        trialUserTitle={trialUserTitle}
      />
      <CollectCoinsContainer
        acceleratedEarning={acceleratedEarning}
        collectCoinsMessage={collectCoinsMessage}
        coinsToCollect={coinsToCollect}
        tierName={tierNameRef.current}
      />
      {showProgressBar && (
        <>
          <ProgressBar
            userName={userName}
            tierName={tierNameRef.current}
            config={config}
            progressBarCss={progressBarCss}
            isTrialUser={isTrialUser}
            requiredAmountToEndTrial={requiredAmountToEndTrial}
          />
          <IntersectionObserverComponent
            id="sc-progress-bar-sensor"
            triggerAction={startProgressBarAnimation}
          />
        </>
      )}
      <SuperCoinRewards
        analyticsData={analyticsData}
        carouselHeight={carouselHeight}
        rewardsList={rewardsList}
        rewardItemCtaLink={rewardItemCtaLink}
        setCarouselHeight={setCarouselHeight}
        superCoinRewardsTitle={superCoinRewardsTitle}
        showProgressBar={showProgressBar}
      />
      <CtaContainer
        allRewardsCtaLink={allRewardsCtaLink}
        allRewardsCtaText={allRewardsCtaText}
        analyticsData={analyticsData}
      />
    </div>
  );
};

export default InsiderSuperCoinWidget;
