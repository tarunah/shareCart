import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import loadComponent from 'commonUtils/loadComponent';

// Local Components
import ConfirmationScreen from '../common/ConfirmationScreen';

//Common components
import Buttons from 'commonComp/InlineButtonV3';
import Modal from 'commonComp/Modal';

//Utils
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  isSessionStorageEnabled,
  setDocTitleInMobile
} from 'commonBrowserUtils/Helper';
import { errorMessage } from 'commonBrowserUtils/ConfirmationConstants';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  sessionStorageKeys,
  confirmationScreenTypeVSHeaderMap as typeHeaderMap
} from 'commonUtils/constants';
import { getQueryParam } from 'commonUtils/helper';
import {
  confirmationSubComponentsConfig,
  modalContentGetter
} from '../common/confirmationCardsConfig';

// Styles
import Styles from './mobile.base.css';

const ErrorPage = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "errorPage" */
      'commonComp/ErrorPage'
    ),
  loaderProperties: { backdrop: false }
});

const docElement = document.documentElement,
  docBody = document.body;

let debouncedFn = () => {};

class ConfirmationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreBelow: true
    };
    this.cardContainerRef = null;
    this.observer = null;
    this.cardComponentRenderer = this.cardComponentRenderer.bind(this);
    this.moreBelowClickHandler = this.moreBelowClickHandler.bind(this);
    this.observerCallback = this.observerCallback.bind(this);
    this.setRef = this.setRef.bind(this);
    this.moreBelowScrollHandler = this.moreBelowScrollHandler.bind(this);
    this.cardComponentsToDisplay = null;
    this.isSavingInsiderEnabled = isFeatureEnabled(
      'CONFIRMATION_SAVING_INSIDER'
    );
  }

  moreBelowScrollHandler() {
    debouncedFn = this.state.showMoreBelow
      ? debounce(() => {
          const scrolledPercent =
            (docElement.scrollTop || docBody.scrollTop) /
            ((docElement.scrollHeight || docBody.scrollHeight) -
              docElement.clientHeight);

          if (!scrolledPercent || scrolledPercent > 0.3) {
            this.setState(
              {
                showMoreBelow: false
              },
              () => {
                document.removeEventListener('scroll', debouncedFn);
              }
            );
          }
        }, 10)
      : () => {};
    return debouncedFn;
  }

  moreBelowClickHandler() {
    try {
      window.scroll({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      window.scroll(window.innerHeight, 0);
    }
  }

  observerCallback(entry) {
    if (entry[0].isIntersecting) {
      this.observer.unobserve(entry[0].target);
      this.setState({
        showMoreBelow: false
      });
    }
  }

  setRef(node) {
    this.cardContainerRef = node;
  }

  cardComponentRenderer(cards = [], animate) {
    const {
      actionHandlers: { showLoader }
    } = this.props;

    // do not show animation when a user comes back to this page again
    const storeOrderId = getQueryParam({
      name: 'orderid',
      optionalNames: ['orderId', 'storeOrderId']
    });
    const showAnimation =
      animate &&
      isSessionStorageEnabled() &&
      !window.sessionStorage.getItem(`${storeOrderId}-loaded`);
    const orderedCards = [];
    cards.forEach((card, index) => {
      let CardComponent = confirmationSubComponentsConfig[card];
      CardComponent &&
        orderedCards.push(
          <CardComponent
            key={card}
            isSavingInsiderEnabled={this.isSavingInsiderEnabled}
            getModalContent={modalContentGetter(this.props.actionHandlers)}
            styleClass={`${Styles.confirmationCard} ${
              showAnimation ? Styles.slideUp : ''
            } ${Styles.cardBorder}`}
            {...this.props}
            mode={'mobile'}
            showLoader={showLoader}
          />
        );
    });
    return (this.cardComponentsToDisplay = (
      <div
        id="confirmation-cards-wrapper"
        className={Styles.confirmationCardContainer}
        ref={this.setRef}
      >
        {orderedCards}
      </div>
    ));
  }

  componentDidMount() {
    setDocTitleInMobile(
      typeHeaderMap[this.props.screenType] || typeHeaderMap.default
    );
    try {
      window.scroll({
        top: 1,
        left: 1,
        behavior: 'smooth'
      });
    } catch (e) {
      window.scroll(1, 1);
    }

    if (
      !this.cardContainerRef ||
      !this.cardContainerRef.lastElementChild ||
      this.cardContainerRef.clientHeight < window.innerHeight
    ) {
      this.setState({
        showMoreBelow: false
      });
    } else {
      try {
        this.observer = new IntersectionObserver(this.observerCallback, {
          threshold: 0.5,
          rootMargin: '0px',
          trackVisibility: true,
          delay: 100
        });
        this.observer.observe(this.cardContainerRef.lastElementChild);
      } catch (e) {
        document.addEventListener('scroll', this.moreBelowScrollHandler());
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', debouncedFn);
  }

  componentDidUpdate(prevProps) {
    const storeOrderId = get(
      prevProps,
      'dataState.data.bountyOrder.storeOrderId',
      ''
    );
    // once the animation is shown to users about their confirmation
    // we don't want it to be shown again
    isSessionStorageEnabled() &&
      storeOrderId &&
      window.sessionStorage.setItem(
        sessionStorageKeys.STOREID_LOADED(storeOrderId),
        'true'
      );
  }

  render() {
    const {
      cardComponentsToDisplay,
      cardComponentRenderer,
      moreBelowClickHandler,
      props: { dataState, actionHandlers, screenType },
      state: { showMoreBelow }
    } = this;
    const {
      confirmationModal: { show: showModal, params: modalParams },
      error
    } = dataState;

    let showFallback = false;
    let showError = false;
    let unauthorized = false;

    if (error) {
      unauthorized = error.httpStatus === 403;
      if (
        isFeatureEnabled('CONFIRMATION_FALLBACK') &&
        error.myntraReferer &&
        !unauthorized
      ) {
        showFallback = true;
      } else {
        showError = true;
      }
    }

    return (
      <div>
        {showError ? (
          <ErrorPage
            message={error.message || errorMessage}
            reload={!unauthorized && error.myntraReferer}
          />
        ) : (
          <ConfirmationScreen
            mode="mobile"
            type={screenType}
            cardComponentsToDisplay={cardComponentsToDisplay}
            cardComponentRenderer={cardComponentRenderer}
            showFallback={showFallback}
            dataState={{ ...dataState, showMoreBelow }}
            actionHandlers={{ ...actionHandlers, moreBelowClickHandler }}
          />
        )}
        {showModal && (
          <Modal
            className={Styles.modalContainer}
            halfCard={true}
            cancelCallback={() =>
              actionHandlers.toggleConfirmationModal({
                eventName: 'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE'
              })
            }
            cancelIconConfig={{ show: true }}
          >
            <div>
              <div className={Styles.modalHeader}>{modalParams.header}</div>
              <div className={Styles.modalDesc}>{modalParams.bodyHeader}</div>
              <div className={Styles.modalDesc}>
                {modalParams.bodyDescription}
              </div>
              <Buttons buttons={modalParams.buttons} />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

ConfirmationComponent.propTypes = {
  dataState: PropTypes.object,
  actionHandlers: PropTypes.object
};

export default ConfirmationComponent;
