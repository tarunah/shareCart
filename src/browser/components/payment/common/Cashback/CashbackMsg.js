import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Style from './cashback.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const CASHBACK_ERR =
  'Could not check the discount amount for this card. Please check again.';
const ELIGIBILITY_CHECK = ' Check Offer Eligibility';
const isInlineOfferForCardEnabled = isFeatureEnabled('INLINE_OFFER_CARD');

const CashbackMsg = props => {
  const {
    data: { state = {}, icbRetryCount, onClickEligibility }
  } = props.data;
  if (state.icb && state.icb.show) {
    const { code, message, error } = state.icb;
    if (
      error &&
      (!isInlineOfferForCardEnabled || props.data.data.props.isClicked)
    ) {
      if (state.currentRetryCount <= icbRetryCount) {
        return (
          <div className={Style.cashbackError}>
            <div>{CASHBACK_ERR}</div>
            <span className={Style.retryBtn} onClick={onClickEligibility}>
              {ELIGIBILITY_CHECK}
            </span>
          </div>
        );
      } else {
        return (
          <div>
            Can not check for bank discount eligibility, please retry after 30
            minutes. T&C Apply
          </div>
        );
      }
    } else if (code) {
      return <div className={Style.cashbackInfo} />;
    } else if (message) {
      if (isInlineOfferForCardEnabled && props.data.data.props.isClicked) {
        let msg = message
          .replace('Get', '')
          .replace('available on item', 'applied')
          .replace('available on all items', 'applied')
          .replace('applieds', 'applied')
          .replace('-', '');
        return <div className={Style.cashbackMessageInline}>{msg}</div>;
      }
      return (
        <div
          className={
            isInlineOfferForCardEnabled &&
            !get(props, 'data.data.props.isNewCard')
              ? Style.cashbackMessageInline
              : Style.cashbackMessage
          }
        >
          {message}
        </div>
      );
    }
  } else if (state.deff.show) {
    return <div className={Style.cashbackMessage}>{state.deff.message}</div>;
  }
  return null;
};

CashbackMsg.propTypes = {
  data: PropTypes.object
};

export default CashbackMsg;
