import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Style
import Styles from './bankOffers.base.css';

// Common Components
import Sprite from 'commonComp/Sprite';
import Modal from 'commonComp/Modal';
import { VISUAL_BANK_OFFER } from 'commonBrowserUtils/Strings';

// Common Utils
import { getUidx, setViewportReference } from 'commonBrowserUtils/Helper';
import { checkoutPage } from 'commonUtils/constants';

import Offers from 'iconComp/Offers.jsx';

class BankOffers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showHc: false,
      offerMsg: {}
    };
    this.messages = props.messages.filter(msg => msg.pillMsg);
    this.offerCount = this.messages.length;
    this.isCartPage = props.currentPage === checkoutPage.CART;
    this.userUidx = getUidx();
    this.toggleHc = this.toggleHc.bind(this);
    this.isDesktop = props.mode;
    this.bankOfferTitleStyle = props.bankOfferTitleStyle || '';
    this.bankOfferPillContainerStyle = props.bankOfferPillContainerStyle || '';
    this.offerNameSent = {};
  }

  componentDidMount() {
    this.triggerLoadEvent();
  }

  triggerLoadEvent() {
    triggerEvent('BANK_OFFERS_LOAD', {
      maData: {
        value: this.props.total
      },
      custom: {
        custom: {
          v1: this.userUidx,
          v2: this.offerCount === 1 ? 'single' : 'multiple',
          v3: this.props.messages.map(msg => msg.offerName)
        },
        widget: {
          name: `${this.isCartPage ? 'cart' : 'payment'}_payment_offers_load`,
          type: 'card'
        },
        event_type: 'widgetLoad',
        event_category: `${
          this.isCartPage ? 'Cart' : 'Payment'
        } page - payment offers widget load`
      }
    });
  }

  triggerClickEvent(msg) {
    triggerEvent('BANK_OFFERS_CLICK', {
      maData: {
        value: this.props.total
      },
      custom: {
        custom: {
          v1: this.userUidx,
          v2: msg.offerName,
          v3: msg.position
        },
        widget: {
          name: `${this.isCartPage ? 'cart' : 'payment'}_payment_offers_click`,
          type: 'sub-card'
        },
        event_type: 'widgetItemClick',
        event_category: `${
          this.isCartPage ? 'Cart' : 'Payment'
        } page - payment offers click`
      }
    });
  }

  triggerCloseEvent(event) {
    triggerEvent('BANK_OFFERS_CLOSE', {
      custom: {
        custom: {
          v1: get(event, 'currentTarget.nodeName', '') === 'svg' ? true : false
        },
        widget: {
          name: `${this.isCartPage ? 'cart' : 'payment'}_payment_offers_close`,
          type: 'sub-card'
        },
        event_type: 'other',
        event_category: `${
          this.isCartPage ? 'Cart' : 'Payment'
        } page - payment offers close`
      }
    });
  }

  triggerImpressionEvent(offer, index) {
    if (offer.offerName in this.offerNameSent) return;
    this.offerNameSent[offer.offerName] = true;
    triggerEvent('BANK_OFFERS_VIEWED', {
      custom: {
        custom: {
          v1: offer.offerName,
          v2: index
        },
        widget: {
          name: `${this.isCartPage ? 'cart' : 'payment'}_payment_offers_viewed`,
          type: 'sub-card'
        },
        event_type: 'widget_item_load',
        event_category: `${
          this.isCartPage ? 'Cart' : 'Payment'
        } page - payment offers viewed`
      }
    });
  }

  toggleHc(msg) {
    this.setState(prevState => {
      if (!prevState.showHc) {
        this.triggerClickEvent(msg);
      } else {
        this.triggerCloseEvent(msg);
      }
      return { showHc: !prevState.showHc, offerMsg: msg };
    });
  }

  getOffer(offer, idx) {
    // added position of the bank offer
    offer['position'] = idx;
    let offerHTML = (
      <div
        className={`${Styles.offerContent} ${
          this.offerCount > 1 ? Styles.multiOffersContent : ''
        }`}
        onClick={() => this.toggleHc(offer)}
        ref={node =>
          setViewportReference(node, { threshold: 0.95 }, () =>
            this.triggerImpressionEvent(offer, idx)
          )
        }
      >
        <Sprite name={offer.iconName} />
        <span className={Styles.pillMsg}>{offer.pillMsg}</span>
      </div>
    );
    return offerHTML;
  }

  getTitle(offerCount) {
    if (offerCount === 1) {
      if (this.props.titleInCaptital) {
        return (
          <div className={this.bankOfferTitleStyle}>
            {VISUAL_BANK_OFFER.BANK_OFFER_CAPITAL_SINGULAR}
          </div>
        );
      }
      return (
        <div className={this.bankOfferTitleStyle}>
          {VISUAL_BANK_OFFER.BANK_OFFER_SINGULAR}
        </div>
      );
    }
    if (this.props.titleInCaptital) {
      return (
        <div className={this.bankOfferTitleStyle}>
          {VISUAL_BANK_OFFER.BANK_OFFER_CAPITAL_PLURAL} {`(${offerCount})`}
        </div>
      );
    }
    return (
      <div className={this.bankOfferTitleStyle}>
        {VISUAL_BANK_OFFER.BANK_OFFER_PLURAL} {`(${offerCount})`}
      </div>
    );
  }

  render() {
    if (this.offerCount) {
      return (
        <div
          className={`${Styles.offersContainer} ${this.props.className || ''} ${
            this.isDesktop === 'desktop' ? Styles.offersDesktopContainer : ''
          }`}
        >
          {this.getTitle(this.offerCount)}
          {this.offerCount === 1 ? (
            <div className={this.bankOfferPillContainerStyle}>
              {this.getOffer(this.messages[0], 1)}
            </div>
          ) : (
            <div
              className={`${Styles.pillContainer} ${this.bankOfferPillContainerStyle}`}
            >
              {this.messages.map((msg, index) => (
                <div
                  key={`promoOffer-${index}`}
                  className={
                    index != this.messages.length - 1 ? Styles.pill : ''
                  }
                >
                  {this.getOffer(msg, index + 1)}
                </div>
              ))}
            </div>
          )}
          {this.state.showHc && (
            <Modal
              className={
                this.isDesktop === 'desktop'
                  ? Styles.desktopModalContainer
                  : Styles.modal
              }
              cancelCallback={this.toggleHc}
              halfCard={true}
              cancelIconConfig={{ show: true, className: Styles.cancel }}
            >
              <div className={Styles.hcContainer}>
                <div className={Styles.hcTitle}>
                  <Offers className={Styles.discountIcon} />
                  <span className={Styles.heading}>
                    {this.state.offerMsg.offerName} Offer
                  </span>
                </div>
                <div className={Styles.hcBody}>
                  {this.state.offerMsg.message}
                </div>
              </div>
            </Modal>
          )}
        </div>
      );
    }
    return null;
  }
}

BankOffers.propTypes = {
  messages: PropTypes.array,
  currentPage: PropTypes.string,
  total: PropTypes.number
};

export default BankOffers;
