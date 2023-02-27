import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { isMobile } from 'commonBrowserUtils/Helper';

import Styles from './privacyPolicy.base.css';

const onLinkClick = (event, eventProps) => {
  triggerEvent(event, {
    custom: {
      custom: {
        v1: eventProps.total
      }
    }
  });
};

const PrivacyPolicy = ({ page, ...eventProps }) => {
  const privacyPolicy = getKVPairValue('PRIVACY_POLICY');
  const _isMobile = isMobile();
  const enabled =
    isFeatureEnabled('PRIVACY_POLICY') &&
    (privacyPolicy.pages || []).indexOf(page) !== -1;

  return enabled ? (
    <div className={Styles.container}>
      <span>By continuing, you agree to Myntra's </span>
      <a
        href={get(privacyPolicy, 'termsOfUse.link', '/termsofuse')}
        target={!_isMobile ? '_blank' : ''}
        className={Styles.link}
        onClick={() => onLinkClick('TERMS_OF_USE_CLICK', eventProps)}
      >
        {get(privacyPolicy, 'termsOfUse.text', 'Terms of Use')}
      </a>
      <span> and </span>
      <a
        href={get(privacyPolicy, 'privacy.link', '/privacypolicy')}
        target={!_isMobile ? '_blank' : ''}
        className={Styles.link}
        onClick={() => onLinkClick('PRIVACY_POLICY_CLICK', eventProps)}
      >
        {get(privacyPolicy, 'privacy.text', 'Privacy Policy')}
      </a>
    </div>
  ) : null;
};

PrivacyPolicy.propTypes = {
  page: PropTypes.string.isRequired,
  analytics: PropTypes.string,
  total: PropTypes.number
};

export default PrivacyPolicy;
