import React from 'react';
import { Link } from 'react-router-dom';

import ImageBanner from 'commonComp/ImageBanner';

import Styles from './giftWrap.base.css';

import Close from 'iconComp/Close.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';

export const ApplyGiftWrapUI = () => (
  <Link to="/checkout/cart/giftwrap">
    <div className={Styles.container}>
      <div className={Styles.content}>
        <ImageBanner name="gift" className={Styles.gift} />
        <div className={Styles.title}>Buying for a loved one?</div>
        <div>Gift wrap and personalised message on card</div>
        <div className={Styles.price}>
          <span>Only for </span>
          <Rupee className={Styles.rupeeIcon} />
          <span>25</span>
        </div>
      </div>
      <ChevronRight className={Styles.arrowIcon} />
    </div>
  </Link>
);

export const AppliedGiftWrapUI = props => (
  <div className={Styles.container}>
    <div className={`${Styles.content} ${Styles.applied}`}>
      <ImageBanner name="gift" className={Styles.gift} />
      <div className={Styles.title}>Yay! Gift Wrapping applied</div>
      <div className={Styles.message}>
        Your order will be gift wrapped with message
      </div>
      <Link to="/checkout/cart/giftwrap" className={Styles.edit}>
        EDIT MESSAGE
      </Link>
    </div>
    <Close className={Styles.closeIcon} onClick={props.removeGiftWrap} />
  </div>
);

class GiftWrap extends React.Component {
  constructor(props) {
    super(props);
    this.removeGiftWrap = this.removeGiftWrap.bind(this);
  }

  removeGiftWrap() {
    this.props.handleCartAction('removeGiftwrap', []);
  }

  render() {
    return (
      <div>
        <div className={Styles.header}>GIFTING & PERSONALISATION</div>
        {!this.props.active ? (
          <ApplyGiftWrapUI />
        ) : (
          <AppliedGiftWrapUI removeGiftWrap={this.removeGiftWrap} />
        )}
      </div>
    );
  }
}

export default GiftWrap;
