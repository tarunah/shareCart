import React, { useState, Fragment, useEffect } from 'react';

import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Confetti from 'commonComp/Confetti';
import PopupModal from '../../RewardsModule/index';
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { CARD_STATES } = scratchCardRetentionConfig;
import { isAndroidApp, isIOSApp, navigateTo } from 'commonBrowserUtils/Helper';
import Styles from '../cardComponents.base.css';
import {
  AndroidBridgeHelper,
  IOSBridgeHelper
} from 'commonBrowserUtils/JSBridgeHelper';

const ScratchCardBanner = props => {
  const [showPopUp, setPopUp] = useState(false);
  const [showBanner, setBannerState] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [SCRATCH_CARD_ID, setScratchCardId] = useState(null);
  const [isAlreadyScratched, setAlreadyScratched] = useState(false);
  const [showConfetti, setConfetti] = useState(false);
  const { confirmationBanner, featureTag } = getGrowthHackConfigValue(
    'SCRATCHCARD_CONFIG'
  );
  const { claimReward } = props && props.actionHandlers;

  useEffect(() => {
    if (!props.eligibilityAPILoaded) return;
    const { isEligible, scratchCardId } = props.isEligibleForCard;
    if (!isEligible || !isFeatureEnabled('SCRATCHCARD_RETENTION')) {
      const rewardState = 'REWARD_NOT_SHOWN';
      if (isAndroidApp()) {
        AndroidBridgeHelper.onRewardFlowDone(rewardState);
      } else if (isIOSApp()) {
        IOSBridgeHelper.onRewardFlowDone({ rewardState });
      }
    }
    if (isEligible) {
      setBannerState(isEligible);
      setScratchCardId(scratchCardId);
      if (isEligible && isFeatureEnabled('SCRATCHCARD_RETENTION')) {
        setTimeout(() => {
          setConfetti(true);
          setTimeout(() => {
            setPopUp(true);
          }, 1000);
          setTimeout(() => {
            setConfetti(false);
          }, 3000);
        }, 500);
        triggerEvent('SCRATCH_CARD_WIDGET_LOAD', {
          maData: {
            entity_optional_attributes: {
              experiment_id: 'TBA',
              featureTag
            }
          },
          custom: {
            event_type: 'widgetLoad',
            event_category: 'Order Confirmation Page',
            action: 'Scratch card widget load',
            widget: {
              name: 'scratch_card',
              type: 'card',
              v_position: 0
            }
          }
        });
      }
    }
  }, [props.eligibilityAPILoaded]);

  const copyAction = () => {
    triggerEvent('COUPON_COPY', {
      maData: {
        entity_optional_attributes: {
          featureTag,
          scratchCardId: cardDetails.id,
          scratchCardStatus: cardDetails.status,
          couponBrandImg: cardDetails.couponBrandImg,
          listPageUrl: cardDetails.listPageUrl,
          expiryDate: cardDetails.expiryDate,
          couponCode: cardDetails.couponCode
        }
      },
      custom: {
        event_category: 'Scratched card',
        event_type: 'widgetClick',
        action: 'scratch card copy click',
        widget: {
          name: 'scratch_card',
          type: 'card'
        }
      }
    });
  };

  const onReveal = () => {
    triggerEvent('CARD_REVEAL', {
      maData: {
        entity_optional_attributes: {
          featureTag,
          scratchCardId: cardDetails.id,
          scratchCardStatus: cardDetails.status,
          couponBrandImg: cardDetails.couponBrandImg,
          listPageUrl: cardDetails.listPageUrl,
          expiryDate: cardDetails.expiryDate,
          couponCode: cardDetails.couponCode
        }
      },
      custom: {
        event_category: 'Scratched card',
        event_type: 'widgetClick',
        action: 'Scratch_card_dismiss',
        widget: {
          name: 'scratch_card',
          type: 'card'
        }
      }
    });
  };

  const handleScratch = (successCB, errorCB) => {
    claimReward(
      SCRATCH_CARD_ID,
      (data = {}) => {
        setCardDetails(data);
        successCB(data);
        setAlreadyScratched(true);
        triggerEvent('CARD_SCRATCH', {
          maData: {
            entity_optional_attributes: {
              featureTag,
              scratchCardId: data.id,
              scratchCardStatus: data.status,
              couponBrandImg: data.couponBrandImg,
              listPageUrl: data.listPageUrl,
              expiryDate: data.expiryDate
            }
          },
          custom: {
            event_category: 'Unscratch card',
            event_type: 'widgetClick',
            action: 'Scratch_card_scratch',
            widget: {
              name: 'scratch_card',
              type: 'button'
            }
          }
        });
      },
      error => {
        errorCB(error);
      }
    );
  };

  const onPopClose = (isScratched = false) => {
    setPopUp(false);
    let rewardState = '';
    if (!isScratched) {
      triggerEvent('DISMISS_BEFORE_SCRATCH', {
        maData: {
          entity_optional_attributes: {
            featureTag,
            scratchCardId: cardDetails.id,
            scratchCardStatus: cardDetails.status,
            couponBrandImg: cardDetails.couponBrandImg,
            listPageUrl: cardDetails.listPageUrl,
            expiryDate: cardDetails.expiryDate
          }
        },
        custom: {
          event_category: 'Unscratch card',
          event_type: 'widgetClick',
          action: 'Scratch_card_dismiss',
          widget: {
            name: 'scratch_card',
            type: 'button'
          }
        }
      });
      rewardState = 'REWARD_NOT_CLAIMED';
    } else {
      triggerEvent('DISMISS_AFTER_SCRATCH', {
        maData: {
          entity_optional_attributes: {
            featureTag,
            scratchCardId: cardDetails.id,
            scratchCardStatus: cardDetails.status,
            couponBrandImg: cardDetails.couponBrandImg,
            listPageUrl: cardDetails.listPageUrl,
            expiryDate: cardDetails.expiryDate
          }
        },
        custom: {
          event_category: 'Scratched card',
          event_type: 'widgetClick',
          action: 'rewards_card_close',
          widget: {
            name: 'scratch_card',
            type: 'button'
          }
        }
      });
      rewardState = cardDetails.couponCode
        ? 'REWARD_CLAIM_SUCCESS'
        : 'REWARD_CLAIM_FAIL';
    }
    if (isAndroidApp()) {
      AndroidBridgeHelper.onRewardFlowDone(rewardState);
    } else if (isIOSApp()) {
      IOSBridgeHelper.onRewardFlowDone({ rewardState });
    }
  };
  const onBannerClick = () => {
    setPopUp(true);
    triggerEvent('SCRATCH_CARD_WIDGET_CLICK', {
      maData: {
        entity_optional_attributes: {
          featureTag
        }
      },
      custom: {
        event_type: 'widgetClick',
        event_category: 'Order Confirmation Page',
        action: 'Scratch card widget click',
        widget: {
          name: 'scratch_card',
          type: 'card',
          v_position: 0
        }
      }
    });
    if (cardDetails.status === CARD_STATES.UNSCRATCHED) {
      triggerEvent('UNSCRATCH_CARD_VIEW', {
        maData: {
          entity_optional_attributes: {
            featureTag,
            scratchCardId: cardDetails.id,
            scratchCardStatus: cardDetails.status,
            couponBrandImg: cardDetails.couponBrandImg,
            listPageUrl: cardDetails.listPageUrl,
            expiryDate: cardDetails.expiryDate
          }
        },
        custom: {
          event_category: 'Unscratch card',
          event_type: 'widgetLoad',
          action: 'Unscratched_card_view',
          widget: {
            name: 'scratch_card',
            type: 'list-item'
          }
        }
      });
    }
  };
  const onCTAPress = CTAType => {
    switch (CTAType) {
      case 'EXPLORE_PRODUCTS': {
        triggerEvent('EXPLORE_PRODUCTS_CLICK', {
          maData: {
            entity_optional_attributes: {
              featureTag,
              scratchCardId: cardDetails.id,
              scratchCardStatus: cardDetails.status,
              couponBrandImg: cardDetails.couponBrandImg,
              listPageUrl: cardDetails.listPageUrl,
              expiryDate: cardDetails.expiryDate
            }
          },
          custom: {
            event_category: 'Scratched card',
            event_type: 'widgetClick',
            action: 'Explore products click',
            widget: {
              name: 'scratch_card',
              type: 'button',
              v_position: 0
            }
          }
        });
        setTimeout(() => {
          navigateTo(cardDetails.listPageUrl);
        }, 1);
        break;
      }
      case 'EXPLORE_MORE': {
        triggerEvent('EXPLORE_MORE', {
          maData: {
            entity_optional_attributes: {
              featureTag,
              scratchCardId: cardDetails.id,
              scratchCardStatus: cardDetails.status,
              couponBrandImg: cardDetails.couponBrandImg,
              listPageUrl: cardDetails.listPageUrl,
              expiryDate: cardDetails.expiryDate
            }
          },
          custom: {
            event_category: 'Scratched card',
            event_type: 'widgetClick',
            action: 'know more click',
            widget: {
              name: 'scratch_card',
              type: 'button',
              v_position: 0
            }
          }
        });
        setTimeout(() => {
          navigateTo('/growth/myprizes');
        }, 1);
        break;
      }
      default: {
        break;
      }
    }
  };
  return showBanner && isFeatureEnabled('SCRATCHCARD_RETENTION') ? (
    <Fragment>
      <div className={Styles.scratchCardBanner}>
        <img onClick={onBannerClick} src={confirmationBanner} />
      </div>
      {showConfetti ? <Confetti showConfetti={showConfetti} /> : null}
      {showPopUp ? (
        <PopupModal
          onPopupDismiss={isScratched => onPopClose(isScratched)}
          isAlreadyScratched={isAlreadyScratched}
          cardDetailsFetchedAlready={cardDetails}
          featureTag={featureTag}
          handleScratch={handleScratch}
          onReveal={onReveal}
          copyAction={copyAction}
          onCTAPress={onCTAPress}
        />
      ) : null}
    </Fragment>
  ) : null;
};

export default ScratchCardBanner;
