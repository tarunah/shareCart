import React from 'react';
import get from 'lodash/get';

import Styles from './emilimitmessage.base.css';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import sanitize from 'commonUtils/Sanitize';

const EMILimitMessage = props => {
  const { emiLimit, code } = props;
  const emiEligibilityCodeConfig =
    getKVPairValue('EMI_ELIGIBILITY_CODE')[code] || {};
  const message = get(emiEligibilityCodeConfig, 'message', '').replace(
    '{amount}',
    `&#8377;` + emiLimit
  );
  return (
    <div
      className={Styles.container}
      dangerouslySetInnerHTML={{ __html: sanitize(message) }}
    ></div>
  );
};

export default EMILimitMessage;
