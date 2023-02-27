import React from 'react';
import PropTypes from 'prop-types';

import Buttons from 'commonComp/InlineButtonV2';
import Modal from 'commonComp/Modal';
import Image from 'commonComp/Image';

import Style from './confirmOrCancelModal.css';

const ConfirmOrCancelModal = props => {
  const {
    showModal,
    modalConfig,
    children,
    button1Config,
    button2Config,
    btnClassName = '',
    containerClassName = ''
  } = props;
  return showModal ? (
    <Modal {...modalConfig}>
      <div>
        <div>{children}</div>
        <Buttons
          button1={button1Config}
          button2={button2Config}
          btnClassName={`${btnClassName} ${Style.buttonClass}`}
          containerClassName={containerClassName}
        />
      </div>
    </Modal>
  ) : null;
};

ConfirmOrCancelModal.propTypes = {
  showModal: PropTypes.bool,
  modalConfig: PropTypes.object,
  children: PropTypes.node,
  button1Config: PropTypes.object,
  button2Config: PropTypes.object,
  btnClassName: PropTypes.string,
  containerClassName: PropTypes.string
};

export default ConfirmOrCancelModal;

export const ModalContent = props => {
  const {
    imageConfig,
    title,
    text,
    textClassName = '',
    modalContainerClass = ''
  } = props;
  return (
    <React.Fragment>
      <div className={`${Style.modelDialogImage} ${modalContainerClass}`}>
        <Image
          src={imageConfig.imageSrc}
          width={imageConfig.imgWidth || 51}
          height={imageConfig.imgHeight || 68}
          visible="true"
        />
      </div>
      <div className={`${textClassName} ${Style.modalText}`}>
        <div className={Style.modalTitle}>{title}</div>
        <div>{text}</div>
      </div>
    </React.Fragment>
  );
};

ModalContent.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  imageConfig: PropTypes.object
};
