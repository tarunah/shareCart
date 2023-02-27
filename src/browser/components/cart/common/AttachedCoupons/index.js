import React, { useState } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Styles from './attachedCoupons.base.css';

import ImageBanner from 'commonComp/ImageBanner';
import Modal from 'commonComp/Modal';
import useModal from 'customHooks/useModal';
import { throttle } from 'commonBrowserUtils/Helper';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import Myntra from 'iconComp/Myntra.jsx';
import GreenTick from 'iconComp/GreenTick.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';

const triggerClickEvents = (event, callBackFunc) => {
  triggerEvent(event);
  callBackFunc && callBackFunc();
};

const ShowOfferCard = ({
  couponList,
  type,
  analytics,
  toggleModal,
  setLoader,
  mode
}) => {
  const isAppliedCoupon = type === 'applied';
  const isMobile = mode === 'mobile';
  return couponList.map(offer => (
    <div className={Styles.offers}>
      <div className={Styles.offerHeader}>
        <div className={Styles.offerHeaderText}>
          <Myntra className={Styles.myntraIcon} />
          {offer.offerText}
        </div>
        <ImageBanner
          name="offer-background"
          className={Styles.backgroundIcon}
        />
      </div>
      <div className={Styles.offerText}>
        {offer.offerDescription}
        {isAppliedCoupon ? (
          <div className={Styles.applied}>
            <GreenTick className={Styles.appliedIcon} />
            <span className={Styles.appliedText}> OFFER APPLIED</span>
          </div>
        ) : (
          <div className={Styles.viewItem}>
            <a
              href={offer.tagLink}
              className={Styles.viewItemCTA}
              onClick={() => {
                setLoader && setLoader(true);
                triggerClickEvents(
                  'ATTACHED_PRODUCT_VIEW_ITEMS_CLICK',
                  isMobile && toggleModal,
                  analytics
                );
              }}
            >
              VIEW ITEMS
            </a>
          </div>
        )}
      </div>
    </div>
  ));
};

const AttachProducts = props => {
  const [hasScrolled, setScrollClass] = useState(false);
  const {
    mode,
    attachedProductOffers,
    analytics,
    isExchangeCart,
    setLoader
  } = props;
  if (isEmpty(attachedProductOffers)) {
    return null;
  }
  const [isModalOpen, toggleModal] = useModal(false);
  const cancelIconConfig = { show: true, className: Styles.modalCloseIcon };
  const appliedOfferCount = get(
    attachedProductOffers,
    'appliedOffers.length',
    0
  );
  const applicableOfferCount = get(
    attachedProductOffers,
    'applicableOffers.length',
    0
  );
  const totalOffers = applicableOfferCount + appliedOfferCount;
  const isOfferApplied = appliedOfferCount > 0;
  const title =
    appliedOfferCount > 0
      ? `${appliedOfferCount}/${totalOffers} Offer${
          totalOffers > 1 ? `s` : ''
        } Applied On Your Bag`
      : `${applicableOfferCount} Offer${
          applicableOfferCount > 1 ? `s` : ''
        } On Your Bag`;
  const isMobile = mode === 'mobile';
  const renderComponent =
    !isExchangeCart && isFeatureEnabled('ATTACHED_PRODUCTS') && totalOffers > 0;

  const handleScroll = e => {
    const scrollPosition = get(e, 'srcElement.scrollTop');
    if (scrollPosition >= 10 && !hasScrolled) {
      setScrollClass(true);
    } else if (scrollPosition < 10 && hasScrolled) {
      setScrollClass(false);
    }
  };

  return (
    renderComponent && (
      <div
        className={`${Styles.attachProductContainer} ${
          !isMobile ? Styles.desktopContainer : ''
        }`}
      >
        <div
          className={
            isOfferApplied
              ? Styles.innerContainerApplied
              : Styles.innerContainer
          }
        >
          <div>
            <div
              className={Styles.attachCoupon}
              onClick={() => {
                triggerClickEvents(
                  'ATTACHED_PRODUCT_TOUCH_POINT_CLICK',
                  toggleModal
                );
              }}
            >
              <ImageBanner
                name="additional-offer"
                className={Styles.attachProductIcon}
              />
              <div className={Styles.title}>{title}</div>
              <ChevronRight className={Styles.attachProductArrowIcon} />
            </div>
            {isModalOpen && (
              <Modal
                className={Styles.modalWidth}
                halfCard={isMobile}
                cancelCallback={toggleModal}
                cancelIconConfig={cancelIconConfig}
              >
                <div
                  className={`${Styles.modalHeading} ${
                    hasScrolled ? Styles.modalHeadingScroll : ''
                  }`}
                >
                  Offers on your bag
                  <div className={Styles.modalSubText}>
                    {`${appliedOfferCount}/${totalOffers} Offer${
                      totalOffers > 1 ? `s` : ''
                    } Applied`}
                  </div>
                </div>
                <div
                  onScroll={throttle(handleScroll, 70)}
                  className={Styles.scroll}
                >
                  <div className={Styles.modalContainer}>
                    <div className={Styles.offerContainer}>
                      <ShowOfferCard
                        couponList={attachedProductOffers.appliedOffers}
                        type="applied"
                        analytics={analytics}
                        toggleModal={toggleModal}
                        setLoader={setLoader}
                        mode={mode}
                      />
                      <ShowOfferCard
                        couponList={attachedProductOffers.applicableOffers}
                        type="applicable"
                        analytics={analytics}
                        toggleModal={toggleModal}
                        setLoader={setLoader}
                        mode={mode}
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AttachProducts;
