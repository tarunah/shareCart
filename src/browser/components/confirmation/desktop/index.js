import React from 'react';
import PropTypes from 'prop-types';

// Local Components
import ConfirmationScreen from '../common/ConfirmationScreen';

//Common components
import Buttons from 'commonComp/InlineButtonV3';
import Modal from 'commonComp/Modal';
import ErrorPage from 'commonComp/ErrorPage';

// Utils
import { errorMessage } from 'commonBrowserUtils/ConfirmationConstants';
import { confirmationScreenTypeVSHeaderMap as typeHeaderMap } from 'commonUtils/constants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import {
  confirmationSubComponentsConfig,
  modalContentGetter
} from '../common/confirmationCardsConfig';

// Styles
import Styles from './desktop.base.css';

class ConfirmationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.cardComponentRenderer = this.cardComponentRenderer.bind(this);
    this.cardComponentsToDisplay = null;
  }

  componentDidMount() {
    SHELL.setActivePage(
      typeHeaderMap[this.props.screenType] || typeHeaderMap.default
    );
  }

  cardComponentRenderer(cards = []) {
    const {
      actionHandlers: { showLoader }
    } = this.props;

    const orderedCards = [];
    cards.forEach(card => {
      let CardComponent = confirmationSubComponentsConfig[card];
      CardComponent &&
        orderedCards.push(
          <CardComponent
            key={card}
            getModalContent={modalContentGetter(this.props.actionHandlers)}
            styleClass={Styles.confirmationCard}
            mode={'desktop'}
            showLoader={showLoader}
            {...this.props}
          />
        );
    });
    return (this.cardComponentsToDisplay = (
      <div className={Styles.confirmationCardContainer}>{orderedCards}</div>
    ));
  }

  render() {
    const {
      cardComponentsToDisplay,
      cardComponentRenderer,
      props: { dataState, actionHandlers, screenType }
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
          <div className={Styles.container}>
            <center className={Styles.cardLayout}>
              <div className={Styles.cardContainer}>
                <ConfirmationScreen
                  mode="desktop"
                  type={screenType}
                  cardComponentsToDisplay={cardComponentsToDisplay}
                  cardComponentRenderer={cardComponentRenderer}
                  showFallback={showFallback}
                  dataState={{ ...dataState }}
                  actionHandlers={{ ...actionHandlers }}
                />
                {showModal && (
                  <Modal
                    className={Styles.modalContainer}
                    halfCard={false}
                    cancelCallback={() =>
                      actionHandlers.toggleConfirmationModal({
                        eventName:
                          'DOPE_PAYMENT_FAILED_CANCEL_ORDER_MODAL_CLOSE'
                      })
                    }
                    cancelIconConfig={{ show: true }}
                  >
                    <div>
                      <div className={Styles.modalHeader}>
                        {modalParams.header}
                      </div>
                      <div className={Styles.modalDesc}>
                        {modalParams.bodyHeader}
                      </div>
                      <div className={Styles.modalDesc}>
                        {modalParams.bodyDescription}
                      </div>
                      <Buttons buttons={modalParams.buttons} />
                    </div>
                  </Modal>
                )}
              </div>
            </center>
          </div>
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
