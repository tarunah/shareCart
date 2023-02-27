import React from 'react';
import PropTypes from 'prop-types';

import { currencyValue } from 'commonBrowserUtils/Helper';
import Style from './expresscheckout.base.css';
import ExpressConstants from './expressConstants';
const { SWIPE_FACTOR, SWIPE_TO_ORDER, PAY } = ExpressConstants;
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import get from 'lodash/get';
import Rupee from 'iconComp/Rupee.jsx';
const { COD } = PaymentConstants;

const Arrow = ({ opacity }) => {
  return <div className={Style.arrow} style={{ opacity }} />;
};

Arrow.propTypes = {
  opacity: PropTypes.number
};

const Arrows = ({ showAnim }) => {
  return (
    <div className={`${Style.arrows} ${showAnim ? Style.animateArrows : ''}`}>
      <Arrow opacity={1} />
      <Arrow opacity={0.8} />
      <Arrow opacity={0.5} />
    </div>
  );
};

Arrow.propTypes = {
  showAnim: PropTypes.bool
};

const ActionTxt = ({ finalAmount, text = PAY, showAmount }) => {
  return (
    <div>
      <span className={Style.actionTxt}>{text}</span>
      {showAmount && (
        <span>
          <Rupee className={Style.rupeeWhite} />
          <span>{currencyValue(finalAmount)}</span>
        </span>
      )}
    </div>
  );
};

ActionTxt.propTypes = {
  finalAmount: PropTypes.number,
  text: PropTypes.string,
  showAmount: PropTypes.bool
};

let startX,
  diff = 0,
  hasSwiped = false;

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.state = {
      showAnim: true
    };
    this.arrows = null;
    this.btnLength = 0;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchStart(e) {
    this.setState(
      {
        showAnim: false
      },
      () => {
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        e.preventDefault();
      }
    );
  }

  onTouchMove(e) {
    let event = e.changedTouches[0];
    let end = 0;
    if (event.pageX) end = event.pageX;
    else if (event.clientX) end = event.clientX;
    diff = end - startX;
    if (diff > 0 && diff < this.btnLength * SWIPE_FACTOR) {
      this.arrows.style.left = 10 + diff + 'px';
    }
    if (diff >= this.btnLength * SWIPE_FACTOR && !hasSwiped) {
      hasSwiped = true;
      this.arrows.style.opacity = 0;
      this.props.payNow();
    }
  }

  onTouchEnd() {
    const isTwoFAVisible = get(this.props.twoFA, 'display', false);
    this.setState({
      showAnim: true
    });
    if (!hasSwiped) {
      this.arrows.style.left = 10 + 'px';
    } else if (isTwoFAVisible || this.props.isCaptchaVisible) {
      hasSwiped = false;
      this.arrows.style.left = 10 + 'px';
      this.arrows.style.opacity = 1;
    }
  }

  componentDidMount() {
    if (this.arrows) {
      this.btnLength = this.actionBtn.offsetWidth;
      this.arrows.addEventListener('touchstart', this.onTouchStart, false);
      this.arrows.addEventListener('touchmove', this.onTouchMove, false);
      this.arrows.addEventListener('touchend', this.onTouchEnd, false);
    }
  }

  componentWillUnmount() {
    if (this.arrows) {
      this.arrows.removeEventListener('touchstart', this.onTouchStart, false);
      this.arrows.removeEventListener('touchmove', this.onTouchMove, false);
      this.arrows.removeEventListener('touchend', this.onTouchEnd, false);
    }
  }

  setRef(node) {
    this.arrows = node;
  }

  render() {
    const isCOD = this.props.paymentType === COD;
    const { finalAmount } = this.props.expressCheckoutData;
    let actionTxt = PAY;
    if (!finalAmount || isCOD) {
      actionTxt = SWIPE_TO_ORDER;
    }
    const payNow = actionTxt !== SWIPE_TO_ORDER ? this.props.payNow : () => {};
    const showAmount = !!(!isCOD && finalAmount);
    return (
      <div className={Style.payNow} ref={elm => (this.actionBtn = elm)}>
        <div className={Style.actionButton} onClick={payNow}>
          <div className={Style.arrowWrapper} ref={this.setRef}>
            {this.props.paymentType === COD || !finalAmount ? (
              <Arrows showAnim={this.state.showAnim} />
            ) : null}
          </div>
          <ActionTxt
            finalAmount={finalAmount}
            text={actionTxt}
            showAmount={showAmount}
          />
        </div>
      </div>
    );
  }
}

export default ActionButton;

ActionButton.propTypes = {
  payNow: PropTypes.func,
  expressCheckoutData: PropTypes.object,
  paymentType: PropTypes.string,
  twoFA: PropTypes.object
};

ActionButton.defaultProps = {
  payNow: () => {},
  expressCheckoutData: {},
  paymentType: ''
};
