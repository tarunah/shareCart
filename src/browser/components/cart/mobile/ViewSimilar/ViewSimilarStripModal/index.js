import React, { useCallback } from 'react';
import Modal from 'commonComp/Modal';
import ViewSimilarStrip from '../ViewSimilarStrip';
import Style from './viewSimilarStripModal.base.css';

const ViewSimilarStripModal = props => {
  const { handlToggleSimilarModal, handleCartAction, styleId } = props;

  const handleClose = useCallback(() => {
    handlToggleSimilarModal();
  }, []);

  return (
    <Modal
      show={true}
      halfCard={true}
      className={Style.viewStripContainer}
      cancelCallback={handleClose}
    >
      <ViewSimilarStrip
        handleCartAction={handleCartAction}
        styleId={styleId}
        handleCloseModal={handleClose}
      />
    </Modal>
  );
};

export default ViewSimilarStripModal;
