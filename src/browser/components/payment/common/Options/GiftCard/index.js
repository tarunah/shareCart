import React from 'react';

import Style from './giftcard.base.css';

import GiftCardModal from './GiftCardModal';
import GiftWrap from 'iconComp/GiftWrap.jsx';

class GiftCard extends React.Component {
  constructor() {
    super();
    this.state = { showModal: false };
    ['toggleModal'].forEach(method => (this[method] = this[method].bind(this)));
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { mode, className } = this.props;
    return (
      <div className={`${Style.container} ${className}`}>
        <GiftWrap className={Style.giftIcon} />
        <span className={Style.title}>Have a Gift Card?</span>
        <span className={Style.apply} onClick={this.toggleModal}>
          {mode === 'mobile' ? 'APPLY' : 'APPLY GIFT CARD'}
        </span>
        {this.state.showModal && (
          <GiftCardModal {...this.props} cancelCallback={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default GiftCard;
