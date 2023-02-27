import React from 'react';
import PropTypes from 'prop-types';

import {
  isAndroidApp,
  isIOSApp,
  isMyntAppEnabled,
  isSessionStorageEnabled
} from 'commonBrowserUtils/Helper';
import ImageBanner from 'commonComp/ImageBanner';

import Styles from './myntraExp.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const mailSubject = 'Feedback - Myntra Android App';
const mailTo = `appfeedback@myntra.com?Subject=${mailSubject}`;

class RatingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedExp: !(
        isSessionStorageEnabled() &&
        sessionStorage.getItem(`${this.props.storeOrderId}-sharedExp`)
      )
    };
    this.isIOS = isIOSApp();
    this.storeOrderId = this.props.storeOrderId;
    this.shareExperience = this.shareExperience.bind(this);
    this.updateFeedbackAttempt = this.updateFeedbackAttempt.bind(this);
  }

  shareExperience() {
    this.setState({
      sharedExp: false
    });
    if (isSessionStorageEnabled()) {
      sessionStorage.setItem(`${this.props.storeOrderId}-sharedExp`, 'true');
    }
  }

  updateFeedbackAttempt(yesOptionPressed) {
    if (isAndroidApp()) {
      if (isMyntAppEnabled(['updateFeedbackAttempt'])) {
        MyntApp.updateFeedbackAttempt(yesOptionPressed);
      }

      if (yesOptionPressed && isMyntAppEnabled(['openStoreFromWeb'])) {
        MyntApp.openStoreFromWeb();
      } else if (!yesOptionPressed) {
        window.open('mailto:' + mailTo);
      }

      const feedbackType = yesOptionPressed ? 'Yes' : 'No';
      this.props.appFeedbackTriggerEvent(feedbackType);
    }
  }

  render() {
    return this.state.sharedExp &&
      !this.isIOS &&
      !isFeatureEnabled('RATING_WIDGET') ? (
      <div className={this.props.ratingClass || ''}>
        <div className={Styles.expContainer}>
          <div className={Styles.myntraExpIcon}>
            <ImageBanner name="mobile-exp" className={Styles.myntraMobile} />
          </div>
          <div className={Styles.subText}>
            <div>Would you like to spread some love?</div>
            <ImageBanner
              name="spread-love-stars"
              className={Styles.spreadLoveStars}
            />
          </div>
        </div>
        <div className={Styles.yesNoBlock} onClick={this.shareExperience}>
          <div
            className={Styles.notSatisfied}
            onClick={() => this.updateFeedbackAttempt(false)}
          >
            <a>
              <div>NO</div>
              <div>Give Feedback</div>
            </a>
          </div>
          <div
            className={Styles.satisfied}
            onClick={() => this.updateFeedbackAttempt(true)}
          >
            <a>
              <div>YES</div>
              <div>Rate us on Play Store</div>
            </a>
          </div>
        </div>
      </div>
    ) : null;
  }
}

RatingModule.propTypes = {
  storeOrderId: PropTypes.string,
  ratingClass: PropTypes.string,
  appFeedbackTriggerEvent: PropTypes.func
};

export default RatingModule;
