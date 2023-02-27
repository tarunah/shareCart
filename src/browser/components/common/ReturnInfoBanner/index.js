import React from 'react';
import PropTypes from 'prop-types';

import Style from './returnInfoBanner.base.css';

// Utils
import get from 'lodash/get';
import { throttle } from 'commonBrowserUtils/Helper';

class ReturnInfoBanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animateBannerUp: false,
      animateBannerDown: false
    };
    this.lastOffset = 0;
    this.isAndroidDevice = get(
      window,
      '_checkout_.__myx_deviceData__.isAndroid',
      false
    );

    this.handleScroll = this.handleScroll.bind(this);
    this.throttledScrollListener = throttle(this.handleScroll, 10);
  }

  handleScroll() {
    // Chrome, Firefox, Opera, Safari and IE Edge support window.scrollY
    // IE >= 9 supports window.pageYOffset
    // If both of the above fail, we calculate scroll position manually
    // scroll can be defined on `body`, or on `documentElement` or both!
    const offset =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);
    this.setState({
      animateBannerUp: offset > this.lastOffset,
      animateBannerDown: offset < this.lastOffset
    });
    this.lastOffset = offset;
  }

  componentDidMount() {
    // `handleScroll` is used to identify scroll direction. We then set state
    // and apply classes (for animations) based on scroll direction. The animations
    // should only be there on android devices (sticky button issue in ios). For all
    // IOS, we do not attach an event listener for scroll
    this.isAndroidDevice &&
      window.addEventListener('scroll', this.throttledScrollListener);
  }

  componentWillUnmount() {
    this.isAndroidDevice &&
      window.removeEventListener('scroll', this.throttledScrollListener);
  }

  render() {
    const {
      show,
      cartItemsReturnInfo: {
        commonReturnPeriod,
        allReturnable,
        allExchangeable
      } = {}
    } = this.props;

    let returnInfoString;

    if (allReturnable && allExchangeable) {
      returnInfoString = `${commonReturnPeriod} days easy return and exchange`;
    } else if (allReturnable) {
      returnInfoString = `${commonReturnPeriod} days easy return`;
    } else if (allExchangeable) {
      returnInfoString = `${commonReturnPeriod} days easy exchange`;
    }
    returnInfoString = `${returnInfoString} on all items.`;

    let returnInfoBannerClass = '';
    if (this.state.animateBannerUp) {
      returnInfoBannerClass = Style.animateBannerUp;
    } else if (this.state.animateBannerDown) {
      returnInfoBannerClass = Style.animateBannerDown;
    }

    return (
      show && (
        <div className={`${Style.returnInfoBanner} ${returnInfoBannerClass}`}>
          <span className={Style.text}>{returnInfoString}</span>
        </div>
      )
    );
  }
}

ReturnInfoBanner.propTypes = {
  show: PropTypes.bool.isRequired,
  cartItemsReturnInfo: PropTypes.object
};

export default ReturnInfoBanner;
