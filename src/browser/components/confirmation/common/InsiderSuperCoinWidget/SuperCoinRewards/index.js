import React, { useRef } from 'react';

import Styles from './superCoinRewards.base.css';

import ChevronDown from 'iconComp/ChevronDown.jsx';
import Image from 'commonComp/Image';

const RewardItem = ({ imageUrl = '', title = '', onClick }) => (
  <div className={Styles.rewardItemWrapper} onClick={onClick}>
    <div className={Styles.rewardItemImage}>
      <Image
        className={Styles.rewardItemImg}
        bounce={false}
        src={imageUrl}
        height={'100%'}
      />
    </div>
    <div className={Styles.rewardItemInfo}>
      <p className={Styles.rewardItemTitle}>{title}</p>
    </div>
  </div>
);

const SuperCoinRewards = ({
  analyticsData = {},
  carouselHeight = 'auto',
  rewardsList = [],
  rewardItemCtaLink = '',
  setCarouselHeight,
  superCoinRewardsTitle = '',
  showProgressBar = false
}) => {
  const rewardsCarouselWrapperRef = useRef(null);

  const onChevronClick = () => {
    const { customAnalytics, widgetName } = analyticsData;
    triggerEvent('INSIDER_SUPERCOIN_WIDGET_CHEVRON_CLICK', {
      custom: {
        widget: {
          name: widgetName
        },
        widget_items: {
          name:
            carouselHeight == 0
              ? 'insider_benefits_expand_click'
              : 'insider_benefits_collapse_click'
        },
        custom: { ...customAnalytics }
      }
    });
    if (carouselHeight == 0) {
      setCarouselHeight(
        (rewardsCarouselWrapperRef.current &&
          rewardsCarouselWrapperRef.current.clientHeight) ||
          'auto'
      );
      return;
    }
    setCarouselHeight('0');
  };

  const handleRewardItemClick = (title, index) => {
    const { customAnalytics, widgetName } = analyticsData;
    triggerEvent('INSIDER_SUPERCOIN_WIDGET_REWARD_CLICK', {
      custom: {
        widget: {
          name: widgetName,
          type: 'carousel',
          data_set: {
            data: {
              entity_value: title,
              h_position: index + 1
            }
          }
        },
        widget_items: {
          name: 'insider_benefits_rewards_click'
        },
        custom: { ...customAnalytics }
      }
    });
    rewardItemCtaLink && (window.location.href = rewardItemCtaLink);
  };

  return (
    <div className={Styles.superCoinRewardsContainer}>
      <div className={Styles.superCoinRewardsTitle}>
        {superCoinRewardsTitle}
        {showProgressBar && (
          <ChevronDown
            onClick={onChevronClick}
            className={Styles.superCoinRewardsChevronWhite}
            style={{
              transform:
                carouselHeight != 0 ? 'rotate(270deg)' : 'rotate(90deg)'
            }}
          />
        )}
      </div>
      <div
        className={Styles.superCoinRewardsCarouselWrapper}
        style={{
          height:
            carouselHeight === 'auto' ? carouselHeight : `${carouselHeight}px`
        }}
      >
        <div
          ref={rewardsCarouselWrapperRef}
          className={Styles.superCoinRewardsCarousel}
        >
          {(rewardsList || []).map((item = {}, index) => (
            <RewardItem
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              onClick={() => handleRewardItemClick(item.title, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperCoinRewards;
