import React, { useState, useEffect, Fragment, useRef } from 'react';

import Button from 'commonComp/Button';
import Styles from './rewards.css';
import ScratchCard from './ScratchCard';
import Cross from 'iconComp/Cross.jsx';

import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { FEATURE_FLAG, CARD_STATES } = scratchCardRetentionConfig;

const DEFAULT_BG =
  'https://assets.myntassets.com/assets/images/2022/3/11/d797b8a5-e708-4c4c-9c3d-8bb4c95ed5a31646997301271-sc_theme_1.png';
export const POPUP_MODAL_WRAPPER = 'popUpModalWrapper';
const { themes, eors, stringLiterals } = getGrowthHackConfigValue(
  'SCRATCHCARD_CONFIG'
);

const HRD_THEME = eors;

import SuccessCard from './Components/SuccessCard/SuccessCard';

function PopupModal(props) {
  let {
    onPopupDismiss,
    handleScratch,
    onReveal,
    copyAction,
    themeBackground,
    featureTag,
    isAlreadyScratched,
    cardDetailsFetchedAlready,
    onCTAPress
  } = props;
  const [showToast, setToast] = useState(false);
  const [couponDetails, setCouponDetails] = useState({});
  const [isScratched, setScratched] = useState(false);
  const [isCouponEmpty, setCouponEmpty] = useState(false);
  const [isError, setError] = useState(false);
  const [isScratchCardLoading, setScratchCardLoading] = useState(false);
  const [shouldDisappear, hideInfo] = useState(false);
  const [shouldAnimate, setAnimate] = useState(false);
  let closeIcon = useRef();
  let footerElm = useRef();
  let cardRef = useRef();
  let wrapperRef = useRef();
  let USED = false;
  let SCRATCHED_EXPIRED = false;
  let timer = false;
  if (!themeBackground) {
    if (featureTag === FEATURE_FLAG.HRD) {
      themeBackground = HRD_THEME;
    } else {
      themeBackground =
        (Array.isArray(themes) &&
          themes.length &&
          themes[parseInt((Math.random() * 10) % themes.length)]) ||
        DEFAULT_BG;
    }
  }
  const removeURLHash = () => {
    window.ckrrhistory && window.ckrrhistory.goBack();
  };
  const handleButtonClick = isScratched => {
    removeURLHash();
    onPopupDismiss(isScratched);
  };
  const stopBodyScrolling = stopScrolling => {
    if (stopScrolling) {
      document.body.setAttribute('class', Styles.stopScroll);
    } else {
      document.body.removeAttribute('class');
    }
  };
  const onCouponCopy = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setToast(true);
    copyAction();
    timer = setTimeout(() => setToast(false), 3000);
  };
  const onCardScratched = () => {
    setError(false);
    setScratchCardLoading(true);
    handleScratch(
      data => {
        if (!data || !data.couponCode) {
          setCouponEmpty(true);
        } else {
          setCouponDetails(data);
          USED = data.status === CARD_STATES.USED;
          SCRATCHED_EXPIRED = data.status === CARD_STATES.SCRATCHED_EXPIRED;
        }
        onReveal();
        setScratchCardLoading(false);
        setScratched(true);
      },
      err => {
        setError(true);
        setCouponEmpty(true);
        setScratchCardLoading(false);
        setScratched(true);
      }
    );
  };

  function renderFooter(state) {
    if (isScratched) {
      if (isError) {
        return (
          <Fragment>
            <div className={Styles.modalDescription}>
              {stringLiterals.ERROR_DESCRIPTION}
            </div>
            <Button
              className={`${Styles.secondary} ${Styles.marginTopButton}`}
              onClick={handleButtonClick}
            >
              {stringLiterals.SECONDARY_TEXT}
            </Button>
          </Fragment>
        );
      } else if (isCouponEmpty) {
        return (
          <Fragment>
            <div className={Styles.modalDescription}>
              {stringLiterals.COUPON_EMPTY}
            </div>
            <Button
              className={`${Styles.secondary} ${Styles.marginTopButton}`}
              onClick={handleButtonClick}
            >
              {stringLiterals.SECONDARY_TEXT}
            </Button>
          </Fragment>
        );
      } else {
        return (
          <SuccessCard couponDetails={couponDetails} onCTAPress={onCTAPress} />
        );
      }
    }
    switch (state) {
      case USED: {
        return (
          <Fragment>
            <div className={Styles.unScratchedHeading}>
              {stringLiterals.WELL_DONE}
            </div>
            <div className={Styles.modalDescription}>
              {stringLiterals.ALREADY_CLAIMED}
            </div>
            <Button
              className={`${Styles.secondary} ${Styles.marginTopButton}`}
              onClick={handleButtonClick}
            >
              {stringLiterals.SECONDARY_TEXT}
            </Button>
          </Fragment>
        );
      }
      case SCRATCHED_EXPIRED: {
        return (
          <Fragment>
            <div className={Styles.modalDescription}>
              {stringLiterals.REWARD_EXPIRED}
            </div>
            <Button
              className={`${Styles.secondary} ${Styles.marginTopButton}`}
              onClick={handleButtonClick}
            >
              {stringLiterals.SECONDARY_TEXT}
            </Button>
          </Fragment>
        );
      }
      default: {
        return (
          <div
            ref={footerElm}
            className={`${Styles.scratchInfo} ${
              shouldAnimate ? Styles.slideUp : ''
            }`}
          >
            <div className={Styles.unScratchedHeading}>
              {stringLiterals.UNLOCKED_CARD}
            </div>
          </div>
        );
      }
    }
  }
  const closeModal = () => {
    removeURLHash();
    onPopupDismiss(isScratched);
  };
  useEffect(() => {
    stopBodyScrolling(true);
    setAnimate(true);
    if (isAlreadyScratched) {
      setScratched(true);
      if (!cardDetailsFetchedAlready || !cardDetailsFetchedAlready.couponCode) {
        setCouponEmpty(true);
      } else {
        setCouponDetails(cardDetailsFetchedAlready);
      }
    }
    window.ckrrhistory && window.ckrrhistory.push('#modal');
    return () => {
      stopBodyScrolling(false);
    };
  }, []);

  return (
    <Fragment>
      <div
        id={POPUP_MODAL_WRAPPER}
        className={`${Styles.modalWrapper}
        ${shouldAnimate ? Styles.animateWrapper : ''}
        ${!isAlreadyScratched ? Styles.transitionWrapper : ''}
        `}
        ref={wrapperRef}
      >
        <Cross
          onClick={closeModal}
          className={`${Styles.crossIcon}
          ${shouldAnimate ? Styles.reveal : ''}
          ${!isAlreadyScratched ? Styles.crossAnimate : ''}
          `}
          closeIcon={closeIcon}
        />

        <div className={Styles.scratchWrapper}>
          {!isAlreadyScratched ? (
            <div
              className={`${Styles.scrubText} ${
                shouldAnimate ? Styles.fadeText : ''
              } ${shouldDisappear ? Styles.disappear : ''}`}
            >
              {stringLiterals.SCRUB}
            </div>
          ) : null}

          <ScratchCard
            scratchImage={themeBackground}
            rewardTitle={couponDetails.couponTitle}
            logo={couponDetails.couponBrandImg}
            couponCode={couponDetails.couponCode}
            expiryDate={couponDetails.expiryDate}
            onCouponCopy={onCouponCopy}
            onScratched={onCardScratched}
            status={couponDetails.status}
            isCouponEmpty={isCouponEmpty}
            isLoading={isScratchCardLoading}
            cardRef={cardRef}
            hideInfo={hideInfo}
            isAlreadyScratched={isScratched}
            isError={isError}
          />
          <div className={Styles.modalFooter}>
            {renderFooter(couponDetails.state)}
          </div>
        </div>
        {showToast
          ? SHELL.alert('info', {
              message: stringLiterals.TOAST,
              styleOverrides: {
                notifyMainDiv:
                  'position: absolute;top: 40px;left: 50%;right: 50%;transform: translate(-50%, 0);width:max-content;'
              }
            })
          : null}
      </div>
    </Fragment>
  );
}

export default PopupModal;
