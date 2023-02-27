import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Style from './stickyButton.base.css';

import {
  currencyValue,
  shortNum,
  isElementInView,
  scrollIntoView
} from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import ImageBanner from 'commonComp/ImageBanner';
import ReturnInfoBanner from 'commonComp/ReturnInfoBanner';
import { checkoutPage } from 'commonUtils/constants';
import SavingsCallout from 'commonComp/SavingsCallout';

import ArrowRight from 'iconComp/ArrowRight.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';

const StrikeOffMRP = props => {
  return (
    <span className={Style.strikeOff}>
      {/* Ascii for Ruppee icon */}
      &#8377;{currencyValue(get(props, 'totalMRP'))}
    </span>
  );
};
class StickyButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isPaymentInvisibilityEnabled =
      props.currentPage === checkoutPage.CART ||
      props.currentPage === checkoutPage.ADDRESS;
    this.scrollToPriceBlock = this.scrollToPriceBlock.bind(this);
    this.getButtonContainer = this.getButtonContainer.bind(this);
    this.strikeOffMRPEnabled = isFeatureEnabled('PAYMENT_STRIKE_OFF_MRP');
  }

  getElementForAnimation() {
    this.priceBlock = document.getElementById('priceBlock');
    const priceBlockHeader = document.getElementById('priceBlockHeader');

    priceBlockHeader &&
      priceBlockHeader.addEventListener('animationend', () => {
        this.props.updateDynamicStyles('animatePriceBlockHeader', false);
      });
  }

  componentDidMount() {
    this.getElementForAnimation();
  }

  componentDidUpdate(newProps) {
    if (newProps.totalQuantity !== this.props.totalQuantity) {
      this.getElementForAnimation();
    }
  }

  scrollToPriceBlock() {
    const headerHeight = 56;
    const stickyButtonHeight = 71;
    if (
      this.priceBlock &&
      isElementInView(this.priceBlock, stickyButtonHeight, headerHeight)
    ) {
      this.props.updateDynamicStyles('animatePriceBlockHeader', true);
    } else {
      scrollIntoView(this.priceBlock, { behavior: 'smooth', block: 'center' });
    }
  }

  update(newState) {
    this.setState(newState);
  }

  getButton(className) {
    return (
      <button
        id="placeOrderButton"
        className={`${className} ${
          this.props.enabled ? '' : Style.placeOrderDisabled
        } ${this.props.isCTAEnabled ? Style.placeOrderButtonWithIcon : ''} ${
          this.isPaymentInvisibilityEnabled ? Style.fullWidthButton : ''
        }`}
        onClick={this.props.clickHandler}
        disabled={!this.props.enabled}
      >
        {this.props.text}
        {this.props.isCTAEnabled ? <ArrowRight /> : null}
      </button>
    );
  }

  getButtonContainer() {
    let { total, points, totalMRP, currentPage } = this.props;
    const showMRPStrikeOff =
      currentPage === checkoutPage.PAYMENT &&
      this.strikeOffMRPEnabled &&
      totalMRP > total;

    let mfuEnabled = points > 0 && isFeatureEnabled('MFU');
    return (
      <React.Fragment>
        {mfuEnabled ? (
          <div className={Style.container}>
            {!this.isPaymentInvisibilityEnabled && (
              <button className={Style.mfuPriceDetails}>
                <div className={Style.priceBlock}>
                  {showMRPStrikeOff ? (
                    <StrikeOffMRP totalMRP={totalMRP} />
                  ) : null}
                  <RupeeBold className={Style.rupee} />
                  <span className={Style.total}>{currencyValue(total)}</span>
                  <span>{` + `}</span>
                  <ImageBanner name="mfu-coin" className={Style.mfuCoin} />
                  <span>{` ${shortNum(points)} MynCash`}</span>
                </div>
                <div className={Style.mfuInfo}>
                  MynCash will be auto applied
                </div>
                <div
                  className={Style.viewDetails}
                  onClick={this.scrollToPriceBlock}
                >
                  {total < 0 ? 'VIEW REFUND DETAILS' : 'VIEW DETAILS'}
                </div>
              </button>
            )}
            {this.getButton(Style.mfuPlaceOrderButton)}
          </div>
        ) : (
          <div className={Style.container}>
            {!this.isPaymentInvisibilityEnabled && (
              <div
                className={`${Style.priceDetails} ${Style.priceDetailsLeft}`}
              >
                <div
                  onClick={this.scrollToPriceBlock}
                  className={Style.inlineBlock}
                >
                  <span className={Style.priceBlock}>
                    {showMRPStrikeOff ? (
                      <StrikeOffMRP totalMRP={totalMRP} />
                    ) : null}
                    <span className={Style.total}>
                      <span className={Style.totalRupeeIcon}>
                        <RupeeBold className={Style.rupee} />
                      </span>
                      {currencyValue(total)}
                    </span>
                  </span>
                  <div className={Style.viewDetails}>
                    {total < 0 ? 'VIEW REFUND DETAILS' : 'VIEW DETAILS'}
                  </div>
                </div>
              </div>
            )}
            {this.getButton(Style.placeOrderButton)}
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    let {
      className,
      cartItemsReturnInfo,
      showReturnInfoBanner,
      stickyBanner = null,
      currentPage,
      isPaymentCalloutEnabled
    } = this.props;

    return (
      <div
        className={`${Style.StickyComponent} ${
          currentPage === checkoutPage.CART ? Style.extraPaddingTop : ''
        }`}
      >
        <ReturnInfoBanner
          show={showReturnInfoBanner}
          cartItemsReturnInfo={cartItemsReturnInfo}
        />
        <div className={`${Style.stickyButton} ${className}`}>
          {stickyBanner}
          {isPaymentCalloutEnabled === 'sticky_bottom' ? (
            <SavingsCallout {...this.props} isSticky={true} />
          ) : null}
          {this.getButtonContainer()}
        </div>
      </div>
    );
  }
}

StickyButton.propTypes = {
  text: PropTypes.string,
  total: PropTypes.number,
  points: PropTypes.number,
  clickHandler: PropTypes.func,
  className: PropTypes.string,
  updateDynamicStyles: PropTypes.func,
  enabled: PropTypes.bool,
  showReturnInfoBanner: PropTypes.bool,
  currentPage: PropTypes.string
};

StickyButton.defaultProps = {
  showReturnInfoBanner: false,
  className: '',
  enabled: true,
  currentPage: ''
};

export default StickyButton;
