import React from 'react';

import { CART_INSIDER_REWARDS as Strings } from 'commonBrowserUtils/Strings';
import Modal from 'commonComp/Modal';
import ImageBanner from 'commonComp/ImageBanner';

import Styles from './benefitsModal.base.css';

const BenefitsModal = ({ showModal, onClose, tierName, bannerName }) =>
  showModal && (
    <Modal
      cancelCallback={onClose}
      className={Styles.modal}
      cancelIconConfig={{ show: true, className: Styles.closeIcon }}
      halfCard={true}
    >
      <div className={Styles.title}>
        {Strings.BENEFITS_MODAL_TITLE.replace('<tier>', tierName.toUpperCase())}
      </div>
      <ImageBanner name={bannerName} className={Styles.banner} />
    </Modal>
  );

export default BenefitsModal;
