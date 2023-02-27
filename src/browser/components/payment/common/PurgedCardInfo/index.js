import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './purgedCardInfo.base.css';

const PurgedCardInfo = props => {
  const saveCardTokenizationConfig = getKVPairValue('SAVED_CARD_CONSENT') || {};
  const { phase2Enabled } = saveCardTokenizationConfig;
  if (!props.show || !phase2Enabled) {
    return null;
  }
  const {
    genericMessage = 'Your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
    customizedMessage = 'Some of your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
    url = '/faqs',
    urlText = 'Learn More',
    showFAQ = true
  } = get(saveCardTokenizationConfig, 'purgedCardInfo') || {};
  const { deviceMode, isSavedCardPresent } = props;
  return (
    <div
      className={`${
        deviceMode === 'mobile' ? Styles.container : Styles.deskTopContainer
      }`}
    >
      <div className={Styles.box}>
        <div className={`${showFAQ ? Styles.text : Styles.textFullWidth}`}>
          {isSavedCardPresent ? customizedMessage : genericMessage}
        </div>
        {showFAQ && (
          <a className={Styles.link} href={url}>
            {urlText}
          </a>
        )}
      </div>
    </div>
  );
};

PurgedCardInfo.propTypes = {
  show: PropTypes.bool,
  deviceMode: PropTypes.string,
  isSavedCardPresent: PropTypes.bool
};

PurgedCardInfo.defaultProps = {
  isSavedCardPresent: false
};

export default PurgedCardInfo;
