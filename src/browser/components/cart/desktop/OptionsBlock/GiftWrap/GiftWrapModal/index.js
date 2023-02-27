import React from 'react';
import Styles from './giftWrapModal.base.css';

import GiftWrapDetails from '../../../../common/GiftWrap/GiftWrapDetails';
import GiftWrapForm from '../../../../common/GiftWrap/GiftWrapForm';

import Modal from 'commonComp/Modal';
import ImageBanner from 'commonComp/ImageBanner';

const GiftWrapModal = props => (
  <Modal
    className={Styles.modal}
    cancelCallback={props.goBack}
    cancelIconConfig={{ show: true }}
  >
    {onCancel => (
      <div className={Styles.container}>
        <div className={Styles.left}>
          <GiftWrapForm {...props} goBack={onCancel} />
        </div>
        <div className={Styles.right}>
          <div className={Styles.images}>
            <ImageBanner name="giftwrap-1" />
            <ImageBanner name="giftwrap-2" className={Styles.giftWrapImg} />
          </div>
          <GiftWrapDetails />
        </div>
      </div>
    )}
  </Modal>
);

export default GiftWrapModal;
