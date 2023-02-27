import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utilities
import { getSecureUrl } from '../../../../mobile/EmptyStateBlock';

// Styles
import Styles from './cardCarousal.base.css';

const PADDING_LEFT = 165 + 15; // padding left plus the margin between the img
const FRACTION_DIGITS = 4;
const IMAGE_WIDTH = 300;

class CardCarousal extends Component {
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.setRef = this.setRef.bind(this);
    this.animateOnScroll = this.animateOnScroll.bind(this);
  }

  setRef(node) {
    this.myRef = node;
  }

  onMove() {
    if (this.myRef) {
      this.myRef.previousElementSibling.style.opacity = (
        this.myRef.scrollLeft / PADDING_LEFT
      ).toFixed(FRACTION_DIGITS);
    }
  }

  animateOnScroll() {
    this.props.opacityFactor && window.requestAnimationFrame(this.onMove);
  }

  render() {
    const paddingReq = this.props.title || this.props.subTitle;
    return (
      <div
        className={
          this.props.coverImg
            ? `${Styles.coverCardContainer} ${Styles.coverBgStyle}`
            : Styles.cardContents
        }
        style={
          this.props.coverImg
            ? {
                backgroundImage: `url(${getSecureUrl(
                  this.props.coverImg,
                  IMAGE_WIDTH
                )})`
              }
            : { background: 'none' }
        }
      >
        {paddingReq && (
          <div className={Styles.coverTitle}>
            <span className={Styles.coverTitleHeader}>{this.props.title}</span>
            <span className={Styles.coverSubTitle}>{this.props.subTitle}</span>
          </div>
        )}
        <div>
          {this.props.opacityFactor && this.props.coverImg && (
            <div className={Styles.whiteBg} />
          )}
          <div
            ref={this.setRef}
            onScroll={this.animateOnScroll}
            className={
              this.props.coverImg
                ? `${Styles.coverCardContents} ${paddingReq &&
                    Styles.coverLeftPadding}`
                : Styles.cardContents
            }
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

CardCarousal.propType = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  opacityFactor: PropTypes.bool
};

CardCarousal.defaultProps = {
  opacityFactor: false
};
export default CardCarousal;
