import React from 'react';

import { getProfileEmail, getProfileMobile } from 'commonBrowserUtils/Helper';
import Phone from 'iconComp/Phone.jsx';
import Mail from 'iconComp/Mail.jsx';
import Styles from '../cardComponents.base.css';

const UpdatesSent = props => {
  const mail = getProfileEmail();
  return (
    <div
      data-testid="updatesSent"
      className={`${props.styleClass} ${
        props.mode === 'desktop'
          ? Styles.desktopSubCardContainer
          : Styles.subcardContainer
      }`}
    >
      <div className={Styles.subcardHeading}>Updates sent to</div>
      <div className={Styles.subcardDesc}>
        <div className={Styles.updatesSentCardContact}>
          <Phone className={Styles.updatesSentCardIcon} />
          <span>{getProfileMobile()}</span>
        </div>
        {mail ? (
          <div>
            <Mail className={Styles.updatesSentCardIcon} />
            <span>{mail}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UpdatesSent;
