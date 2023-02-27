import React, { useState } from 'react';
import get from 'lodash/get';

import Styles from './offerBanner.base.css';
import SlickCarousel from '../../../confirmation/common/SlickCarousel';
import Info from 'iconComp/Info.jsx';
import Modal from 'commonComp/Modal';
import { INLINE_OFFER } from 'commonBrowserUtils/Strings';
import { getKVPairValue } from 'commonUtils/KVPairManager';

const tncClickEvent = name => {
  triggerEvent('INLINE_OFFER_TNC_CLICK', {
    custom: {
      custom: {
        v1: name
      }
    }
  });
};

export default ({ selected, offerData, deviceMode, name = '' }) => {
  const [showTncModal, toggleTncModal] = useState(false);
  const [tnc, updateTnc] = useState([]);
  const interval = get(getKVPairValue('INLINE_OFFERS'), 'interval', 3) * 1000;

  return (
    offerData.length >= 1 && (
      <div
        className={`${Styles.offerContainer} ${
          name === 'card' && deviceMode == 'mobile' ? Styles.mobileCard : ''
        }`}
      >
        <SlickCarousel slideInterval={interval} isPaymentPage={true}>
          {offerData.map((data, index) => (
            <div
              key={`offer-${index}`}
              id={`offer-${index}`}
              className={Styles.offerSlide}
            >
              <div className={Styles.offerBody}>
                <div className={Styles.offerHeading}>{data.heading}</div>
                <p className={Styles.offerMessage}>{data.message}</p>
              </div>
              {data?.tnc && (
                <div
                  className={Styles.infoIcon}
                  onClick={() => {
                    toggleTncModal(!showTncModal);
                    updateTnc(data.tnc);
                    tncClickEvent(name);
                  }}
                >
                  <span id="offer-banner-info-icon">
                    <Info />
                  </span>
                </div>
              )}
            </div>
          ))}
        </SlickCarousel>

        {tnc && showTncModal ? (
          <Modal
            className={
              deviceMode === 'mobile'
                ? Styles.mobileModalContainer
                : Styles.desktopModalContainer
            }
            cancelIconConfig={{ show: true, className: Styles.cancelIcon }}
            cancelCallback={() => toggleTncModal(!showTncModal)}
            halfCard={deviceMode === 'mobile'}
          >
            <div className={Styles.tncHeading}>{INLINE_OFFER.tnc}</div>
            <ul>
              {tnc.map((data, index) => (
                <li>
                  <div className={Styles.tncBody}>{data}</div>
                </li>
              ))}
            </ul>
          </Modal>
        ) : null}
      </div>
    )
  );
};
