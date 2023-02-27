import React from 'react';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { currencyValue, roundNumber } from 'commonBrowserUtils/Helper';

// Style Related Imports.
import Styles from './successBanner.base.css';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import Myntra from 'iconComp/Myntra.jsx';
import TickCircle from 'iconComp/TickCircle.jsx';
import PointsCoin from 'iconComp/PointsCoin.jsx';
import InsiderLogo from 'iconComp/InsiderLogo.jsx';
import SuperCoinWithLine from 'iconComp/SuperCoinWithLine.jsx';

const BANNER_NAME = {
  CONFIRM: 'confirmation',
  INSIDER: 'insider'
};

class SuccessBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerToShow: BANNER_NAME.CONFIRM,
      animationDone: false
    };

    this.config = getKVPairValue('CONFIRMATION_PAGE_CONFIG');
    this.showInsiderBanner =
      get(this, 'props.insiderRewards.enrolmentStatus') === 'ENROLLED' &&
      get(this, 'props.insiderRewards.totalPoints', 0) !== 0;
    this.setRefs = this.setRefs.bind(this);
    this.bannerClick = this.bannerClick.bind(this);
  }

  componentDidMount() {
    const displayBannerTime = get(this, 'config.displayBannerTime', 3000);

    if (this.confirmationRefs) {
      this.confirmationRefs.onanimationend = () => {
        this.currentTimmer = setTimeout(() => {
          this.setState(() => {
            return this.showInsiderBanner
              ? { bannerToShow: BANNER_NAME.INSIDER }
              : { animationDone: true };
          });
        }, displayBannerTime);
      };
    }

    if (this.insiderRefs) {
      this.insiderRefs.onanimationend = () => {
        this.currentTimmer = setTimeout(() => {
          this.setState({ animationDone: true });
        }, displayBannerTime);
      };
    }
  }

  setRefs(node) {
    switch (get(node, 'dataset.name')) {
      case BANNER_NAME.CONFIRM:
        this.confirmationRefs = node;
        break;
      case BANNER_NAME.INSIDER:
        this.insiderRefs = node;
        break;
      default:
    }
  }

  bannerClick(event) {
    clearTimeout(this.currentTimmer);

    switch (event.currentTarget.getAttribute('data-name')) {
      case BANNER_NAME.CONFIRM:
        this.setState(() => {
          return this.showInsiderBanner
            ? { bannerToShow: BANNER_NAME.INSIDER }
            : { animationDone: true };
        });
        break;
      case BANNER_NAME.INSIDER:
        this.setState({ animationDone: true });
        break;
      default:
    }
  }

  getConfirmationBanner() {
    const {
      header = 'Order Confirmed',
      message = 'You saved %price% on this order',
      backgroundImage,
      bannerImage
    } = get(this, 'config.confirmationBanner') || {};

    const mrp = get(this, 'props.bountyOrder.payments.mrp', 0) / 100;
    const allDiscounts =
      get(this, 'props.bountyOrder.payments.discounts') || {};
    let discount = 0;
    let discountMessage = '';
    for (let key in allDiscounts) {
      discount += allDiscounts[key] / 100;
    }

    if (discount > 100 || roundNumber((discount / mrp) * 100, 2) >= 10) {
      discountMessage = message.split('%').map(text =>
        text === 'price' ? (
          <span className={Styles.greenText}>
            {discount > 100 ? <RupeeBold className={Styles.rupeeGreen} /> : ''}
            {currencyValue(discount)}
          </span>
        ) : (
          text
        )
      );
    }

    let containerClassName = Styles.bannerContainer;
    if (this.state.bannerToShow !== BANNER_NAME.CONFIRM) {
      containerClassName += ` ${Styles.hideBanner}`;
    }

    return (
      <div
        className={containerClassName}
        data-name={BANNER_NAME.CONFIRM}
        onClick={this.bannerClick}
      >
        <img src={backgroundImage} className={Styles.backgroundImage} />
        <div
          ref={this.setRefs}
          className={Styles.slideUpAnimation}
          data-name={BANNER_NAME.CONFIRM}
        >
          <img src={bannerImage} className={Styles.baloons} />
          <TickCircle />
          <div className={Styles.header}>{header}</div>
          <div className={Styles.text}>{discountMessage}</div>
        </div>
      </div>
    );
  }

  getInsiderBanner() {
    if (!this.showInsiderBanner) {
      return null;
    }
    const isEnrolled =
      get(this, 'props.insiderRewards.enrolmentStatus') === 'ENROLLED';
    const totalPoints = get(this, 'props.insiderRewards.totalPoints', 0);

    const isSupercoinEnabled = get(
      this,
      'props.insiderRewards.isSupercoinEnabled',
      0
    );

    const {
      header = 'Insider Points on your way',
      headerSupercoins = 'SuperCoins on your way',
      backgroundImage
    } = get(this, 'config.insiderBanner') || {};

    let containerClassName = Styles.bannerContainer;
    if (this.state.bannerToShow !== BANNER_NAME.INSIDER) {
      containerClassName += ` ${Styles.hideBanner}`;
    }
    const insidePointClassName =
      totalPoints.toString().length > 4
        ? Styles.insiderPointSmall
        : Styles.insiderPoint;

    return (
      <div
        className={containerClassName}
        data-name={BANNER_NAME.INSIDER}
        onClick={this.bannerClick}
      >
        <img src={backgroundImage} className={Styles.backgroundImage} />
        <div
          ref={this.setRefs}
          className={Styles.slideUpAnimation}
          data-name={BANNER_NAME.INSIDER}
        >
          <div className={Styles.insiderPointContainer}>
            {isSupercoinEnabled ? (
              <SuperCoinWithLine id="confirmationCoin" />
            ) : (
              <PointsCoin id="insiderBannerCoin" />
            )}
            <div className={insidePointClassName}>{totalPoints}</div>
          </div>
          <div className={Styles.header}>
            {isSupercoinEnabled ? headerSupercoins : header}
          </div>
          <div className={Styles.logoContainer}>
            <Myntra className={Styles.myntraLogo} />
            <InsiderLogo className={Styles.insiderLogo} id="insiderBanner" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      state: { animationDone }
    } = this;

    let containerClassName = Styles.container;
    if (animationDone) {
      containerClassName += ` ${Styles.hideBanner}`;
    }

    return (
      <div className={containerClassName}>
        {this.getConfirmationBanner()}
        {this.getInsiderBanner()}
      </div>
    );
  }
}

export default SuccessBanner;
