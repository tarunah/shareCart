import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ImageBanner from 'commonComp/ImageBanner';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './recommendationMsg.base.css';

class RecommendationMsg extends React.Component {
  constructor(props) {
    super(props);
    this.msgHeading = get(
      getKVPairValue('CONFIRMATION_PROFILE_TAGGING'),
      'recommendationMsgHeading'
    );
    this.msgSubText = get(
      getKVPairValue('CONFIRMATION_PROFILE_TAGGING'),
      'recommendationMsgSubText'
    );
  }
  render() {
    return (
      <div
        className={
          this.props.showAllTaggedMessage
            ? Styles.allTaggedBlock
            : Styles.hidden
        }
      >
        <div className={Styles.mfaLogo}>
          <ImageBanner name="mfa-no-text" />
          <div>MYNTRA FIT ASSIST</div>
        </div>
        <div className={Styles.allTaggedMessage} id="orderConfirmThanksMsg">
          <div className={Styles.thanksMessage}>{this.msgHeading}</div>
          <div className={Styles.thanksSubText}>{this.msgSubText}</div>
        </div>
      </div>
    );
  }
}

RecommendationMsg.propTyes = {
  showAllTaggedMessage: PropTypes.bool
};

export default RecommendationMsg;
