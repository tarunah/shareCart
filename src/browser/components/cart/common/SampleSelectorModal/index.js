import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'commonComp/Modal';
import Loader from 'commonComp/Loader';
import Style from './sampleSelectorModal.base.css';

// Component to display Iframe for desktop view of Free Sample Selector

const SampleSelectorModal = props => {
  const { toggleModal, cancelIconConfig, freeGiftUrl } = props;
  return (
    <Modal
      className={Style.modalWidth}
      halfCard={false}
      cancelCallback={toggleModal}
      cancelIconConfig={cancelIconConfig}
    >
      <div className={Style.modalContainer}>
        <div className={Style.modalHeader}>FREE GIFT OFFER</div>
        <div className={Style.modalFooter}>
          <div id="iframeLoader" data-testid="iframeLoader">
            <Loader show={true} backdrop={true} />
          </div>
          <iframe
            src={freeGiftUrl}
            height="100%"
            width="100%"
            className={Style.iframe}
            id="iframeFrg"
            data-testid="iframeFrg"
            style={{ opacity: 0 }}
          ></iframe>
        </div>
      </div>
    </Modal>
  );
};

export default SampleSelectorModal;

SampleSelectorModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  cancelIconConfig: PropTypes.object.isRequired,
  freeGiftUrl: PropTypes.string.isRequired
};
