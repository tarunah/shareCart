import React from 'react';
import get from 'lodash/get';

import useModal from 'customHooks/useModal';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { confirmationScreenTypes as screenTypes } from 'commonUtils/constants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { CONVENIENCE_PAY_WIDGET } from 'commonBrowserUtils/Strings';
import { payAtConvenienceURL } from 'commonBrowserUtils/ConfirmationConstants';
import Image from 'commonComp/Image';
import Modal from 'commonComp/Modal';
import ConveniencePay from '../../ConveniencePay';
import Styles from '../cardComponents.base.css';

const PayAtConvenience = props => {
  const [isModalOpen, toggleModal] = useModal(false);
  const convenienceConfig =
    getKVPairValue('CONFIRMATION_PAGE_CONFIG').convenienceFee || {};
  const convenienceFeeHeading =
    get(convenienceConfig, 'heading') || get(CONVENIENCE_PAY_WIDGET, 'heading');
  const convenienceFeeDescription =
    get(convenienceConfig, 'description') ||
    get(CONVENIENCE_PAY_WIDGET, 'description');
  return (props.screenType === screenTypes.orderSuccess || !props.screenType) &&
    isFeatureEnabled('DOPE') ? (
    <div
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      } ${Styles.positionRelative}`}
    >
      <div className={Styles.cardHeading}>
        <span>{convenienceFeeHeading} </span>
        <div className={Styles.highlight}>New</div>
      </div>
      <Image
        src={payAtConvenienceURL}
        className={Styles.payAtConvenienceImage}
        nonCloudinary={true}
        showBackgroundColor={false}
        width="134"
        height="97"
      />
      <div className={Styles.cardDesc}>{convenienceFeeDescription}</div>

      <div className={Styles.seeHowLink} onClick={toggleModal}>
        See How
      </div>
      {isModalOpen && (
        <Modal
          cancelCallback={toggleModal}
          className={
            props.mode === 'desktop' ? Styles.desktopModal : Styles.mobileModal
          }
          cancelIconConfig={{ show: true }}
        >
          <ConveniencePay />
        </Modal>
      )}
    </div>
  ) : null;
};

export default PayAtConvenience;
